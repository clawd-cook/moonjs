// Statement parsing.
//
// Dispatches on the current token to produce `@ast.Stmt` nodes. In-scope
// statements (see Step 6a scope): Block, Empty, ExprStmt, If, While, DoWhile,
// For (classic), Return, Break, Continue, Throw, Try, Labeled, VarDecl,
// FunctionDecl. Out-of-scope statements (Switch, With, Debugger, Class,
// ForIn/ForOf, Import/Export) explicitly error with a "requires Step 6b"
// message so downstream harness failures are informative.

///|
/// Parse a single statement or declaration. Called from `parse_script` and
/// from block bodies.
fn Parser::parse_stmt(self : Parser) -> Result[@ast.Stmt, ParseError] {
  let start = self.current.span.start
  match self.current.kind {
    LBrace => self.parse_block_stmt(start)
    Semi => {
      match self.advance() {
        Err(e) => return Err(e)
        Ok(_) => ()
      }
      Ok(@ast.Stmt::new(Empty, @util.SourceSpan::new(start, self.prev_end)))
    }
    KeywordTok(kind~) =>
      match kind {
        Var_ => self.parse_var_decl(start, Var)
        Let_ => self.parse_var_decl(start, Let)
        Const_ => self.parse_var_decl(start, Const)
        If_ => self.parse_if_stmt(start)
        While_ => self.parse_while_stmt(start)
        Do_ => self.parse_do_while_stmt(start)
        For_ => self.parse_for_stmt(start)
        Return_ => self.parse_return_stmt(start)
        Break_ => self.parse_break_stmt(start)
        Continue_ => self.parse_continue_stmt(start)
        Throw_ => self.parse_throw_stmt(start)
        Try_ => self.parse_try_stmt(start)
        Function_ => self.parse_function_decl(start)
        // Out-of-scope for 6a — explicit error for informative harness output.
        Class_ => Err(ParseError(msg="class requires Step 6b", loc=start))
        Switch_ => Err(ParseError(msg="switch requires Step 6b", loc=start))
        With_ => Err(ParseError(msg="with requires Step 6b", loc=start))
        Debugger_ => Err(ParseError(msg="debugger requires Step 6b", loc=start))
        Import_ => Err(ParseError(msg="import requires Step 6b", loc=start))
        Export_ => Err(ParseError(msg="export requires Step 6b", loc=start))
        // async / await are not KeywordTok in this lexer; `async` is
        // IdentifierTok("async") and handled in `parse_maybe_labeled_or_expr`
        // fallback.
        _ => self.parse_expr_stmt_or_labeled(start)
      }
    _ => self.parse_expr_stmt_or_labeled(start)
  }
}

///|
/// After `{`. Consume the brace, parse zero or more statements up to the
/// closing brace.
fn Parser::parse_block_stmt(
  self : Parser,
  start : @util.SourceLoc,
) -> Result[@ast.Stmt, ParseError] {
  // Consume `{`.
  match self.advance() {
    Err(e) => return Err(e)
    Ok(_) => ()
  }
  let stmts : Array[@ast.Stmt] = []
  let loop_r : Result[Unit, ParseError] = for _s = 0 {
    match self.current.kind {
      RBrace => break Ok(())
      Eof =>
        break Err(
          ParseError(msg="unterminated block", loc=self.current.span.start),
        )
      _ =>
        match self.parse_stmt() {
          Err(e) => break Err(e)
          Ok(s) => {
            stmts.push(s)
            continue 0
          }
        }
    }
  }
  match loop_r {
    Err(e) => return Err(e)
    Ok(_) => ()
  }
  // Consume `}`.
  match self.advance() {
    Err(e) => return Err(e)
    Ok(_) => ()
  }
  Ok(
    @ast.Stmt::new(
      BlockStmt(body=stmts),
      @util.SourceSpan::new(start, self.prev_end),
    ),
  )
}

///|
/// Same as `parse_block_stmt` but returns the raw statement list (no wrapper
/// StmtKind). Used for function bodies, try / catch / finally bodies, etc.
fn Parser::parse_stmt_list_braced(
  self : Parser,
) -> Result[Array[@ast.Stmt], ParseError] {
  match self.expect(fn(k) { k is LBrace }, "expected '{'") {
    Err(e) => return Err(e)
    Ok(_) => ()
  }
  let stmts : Array[@ast.Stmt] = []
  let loop_r : Result[Unit, ParseError] = for _s = 0 {
    match self.current.kind {
      RBrace => break Ok(())
      Eof =>
        break Err(
          ParseError(msg="unterminated block", loc=self.current.span.start),
        )
      _ =>
        match self.parse_stmt() {
          Err(e) => break Err(e)
          Ok(s) => {
            stmts.push(s)
            continue 0
          }
        }
    }
  }
  match loop_r {
    Err(e) => return Err(e)
    Ok(_) => ()
  }
  match self.advance() {
    Err(e) => return Err(e)
    Ok(_) => ()
  }
  Ok(stmts)
}

///|
/// `var x = 1, y;` / `let ...` / `const ...`. `start` is the location of the
/// keyword; caller already peeked it. `parse_var_decl` consumes the keyword,
/// the declarator list, and the trailing `;` (ASI-aware).
fn Parser::parse_var_decl(
  self : Parser,
  start : @util.SourceLoc,
  kind : @ast.VarKind,
) -> Result[@ast.Stmt, ParseError] {
  // Consume var / let / const.
  match self.advance() {
    Err(e) => return Err(e)
    Ok(_) => ()
  }
  let decls : Array[@ast.VarDeclarator] = []
  let loop_r : Result[Unit, ParseError] = for _s = 0 {
    match self.parse_var_declarator() {
      Err(e) => break Err(e)
      Ok(d) => {
        decls.push(d)
        match self.current.kind {
          Comma =>
            match self.advance() {
              Err(e) => break Err(e)
              Ok(_) => continue 0
            }
          _ => break Ok(())
        }
      }
    }
  }
  match loop_r {
    Err(e) => return Err(e)
    Ok(_) => ()
  }
  match self.expect_semi() {
    Err(e) => return Err(e)
    Ok(_) => ()
  }
  Ok(
    @ast.Stmt::new(
      VarDecl(kind~, decls~),
      @util.SourceSpan::new(start, self.prev_end),
    ),
  )
}

///|
/// One declarator: identifier optionally followed by `= expr`. 6a doesn't
/// support destructuring on the LHS.
fn Parser::parse_var_declarator(
  self : Parser,
) -> Result[@ast.VarDeclarator, ParseError] {
  let start = self.current.span.start
  // Only IdentPat for now — destructuring is 6b.
  match self.current.kind {
    LBrace | LBracket =>
      return Err(ParseError(msg="destructuring requires Step 6b", loc=start))
    _ => ()
  }
  let name = match self.expect_ident() {
    Err(e) => return Err(e)
    Ok(n) => n
  }
  let pat = @ast.Pattern::new(
    IdentPat(name~),
    @util.SourceSpan::new(start, self.prev_end),
  )
  let init : @ast.Expr? = match self.current.kind {
    EqTok => {
      match self.advance() {
        Err(e) => return Err(e)
        Ok(_) => ()
      }
      match self.parse_assignment_expr(true) {
        Err(e) => return Err(e)
        Ok(e) => Some(e)
      }
    }
    _ => None
  }
  Ok(@ast.VarDeclarator::new(pat, init))
}

///|
/// `if (cond) cons [else alt]`.
fn Parser::parse_if_stmt(
  self : Parser,
  start : @util.SourceLoc,
) -> Result[@ast.Stmt, ParseError] {
  // Consume `if`.
  match self.advance() {
    Err(e) => return Err(e)
    Ok(_) => ()
  }
  match self.expect(fn(k) { k is LParen }, "expected '(' after 'if'") {
    Err(e) => return Err(e)
    Ok(_) => ()
  }
  let cond = match self.parse_expr_allow_comma(true) {
    Err(e) => return Err(e)
    Ok(e) => e
  }
  match self.expect(fn(k) { k is RParen }, "expected ')' after if-condition") {
    Err(e) => return Err(e)
    Ok(_) => ()
  }
  let cons = match self.parse_stmt() {
    Err(e) => return Err(e)
    Ok(s) => s
  }
  let alt : @ast.Stmt? = match self.current.kind {
    KeywordTok(kind=Else_) => {
      match self.advance() {
        Err(e) => return Err(e)
        Ok(_) => ()
      }
      match self.parse_stmt() {
        Err(e) => return Err(e)
        Ok(s) => Some(s)
      }
    }
    _ => None
  }
  Ok(
    @ast.Stmt::new(
      If(cond~, cons~, alt~),
      @util.SourceSpan::new(start, self.prev_end),
    ),
  )
}

///|
/// `while (cond) body`.
fn Parser::parse_while_stmt(
  self : Parser,
  start : @util.SourceLoc,
) -> Result[@ast.Stmt, ParseError] {
  match self.advance() {
    Err(e) => return Err(e)
    Ok(_) => ()
  }
  match self.expect(fn(k) { k is LParen }, "expected '(' after 'while'") {
    Err(e) => return Err(e)
    Ok(_) => ()
  }
  let cond = match self.parse_expr_allow_comma(true) {
    Err(e) => return Err(e)
    Ok(e) => e
  }
  match
    self.expect(fn(k) { k is RParen }, "expected ')' after while-condition") {
    Err(e) => return Err(e)
    Ok(_) => ()
  }
  self.in_loop = self.in_loop + 1
  let body = self.parse_stmt()
  self.in_loop = self.in_loop - 1
  let body = match body {
    Err(e) => return Err(e)
    Ok(s) => s
  }
  Ok(
    @ast.Stmt::new(
      While(cond~, body~),
      @util.SourceSpan::new(start, self.prev_end),
    ),
  )
}

///|
/// `do body while (cond);`.
fn Parser::parse_do_while_stmt(
  self : Parser,
  start : @util.SourceLoc,
) -> Result[@ast.Stmt, ParseError] {
  match self.advance() {
    Err(e) => return Err(e)
    Ok(_) => ()
  }
  self.in_loop = self.in_loop + 1
  let body_r = self.parse_stmt()
  self.in_loop = self.in_loop - 1
  let body = match body_r {
    Err(e) => return Err(e)
    Ok(s) => s
  }
  match
    self.expect(
      fn(k) { k is KeywordTok(kind=While_) },
      "expected 'while' after do-body",
    ) {
    Err(e) => return Err(e)
    Ok(_) => ()
  }
  match self.expect(fn(k) { k is LParen }, "expected '(' after 'while'") {
    Err(e) => return Err(e)
    Ok(_) => ()
  }
  let cond = match self.parse_expr_allow_comma(true) {
    Err(e) => return Err(e)
    Ok(e) => e
  }
  match self.expect(fn(k) { k is RParen }, "expected ')' after do-while cond") {
    Err(e) => return Err(e)
    Ok(_) => ()
  }
  match self.expect_semi() {
    Err(e) => return Err(e)
    Ok(_) => ()
  }
  Ok(
    @ast.Stmt::new(
      DoWhile(body~, cond~),
      @util.SourceSpan::new(start, self.prev_end),
    ),
  )
}

///|
/// `for (init; cond; update) body`. In 6a we only support the classic three-
/// clause form — `for-in` / `for-of` bail out with a clear error.
fn Parser::parse_for_stmt(
  self : Parser,
  start : @util.SourceLoc,
) -> Result[@ast.Stmt, ParseError] {
  match self.advance() {
    Err(e) => return Err(e)
    Ok(_) => ()
  }
  match self.expect(fn(k) { k is LParen }, "expected '(' after 'for'") {
    Err(e) => return Err(e)
    Ok(_) => ()
  }
  // ---- Init ----
  let init : @ast.ForInit? = match self.current.kind {
    Semi => None
    KeywordTok(kind=Var_) =>
      match self.parse_for_init_var(Var) {
        Err(e) => return Err(e)
        Ok(v) => Some(v)
      }
    KeywordTok(kind=Let_) =>
      match self.parse_for_init_var(Let) {
        Err(e) => return Err(e)
        Ok(v) => Some(v)
      }
    KeywordTok(kind=Const_) =>
      match self.parse_for_init_var(Const) {
        Err(e) => return Err(e)
        Ok(v) => Some(v)
      }
    _ =>
      // Expression init. `in` must not be treated as a relational operator
      // here (would produce `for-in`, which we don't support in 6a).
      match self.parse_expr_allow_comma(false) {
        Err(e) => return Err(e)
        Ok(e) => Some(InitExpr(e))
      }
  }
  // Detect for-in / for-of syntactically and refuse.
  match self.current.kind {
    KeywordTok(kind=In_) =>
      return Err(
        ParseError(msg="for-in requires Step 6b", loc=self.current.span.start),
      )
    IdentifierTok(name="of") =>
      return Err(
        ParseError(msg="for-of requires Step 6b", loc=self.current.span.start),
      )
    _ => ()
  }
  match self.expect(fn(k) { k is Semi }, "expected ';' in for-init") {
    Err(e) => return Err(e)
    Ok(_) => ()
  }
  let cond : @ast.Expr? = match self.current.kind {
    Semi => None
    _ =>
      match self.parse_expr_allow_comma(true) {
        Err(e) => return Err(e)
        Ok(e) => Some(e)
      }
  }
  match self.expect(fn(k) { k is Semi }, "expected ';' after for-cond") {
    Err(e) => return Err(e)
    Ok(_) => ()
  }
  let update : @ast.Expr? = match self.current.kind {
    RParen => None
    _ =>
      match self.parse_expr_allow_comma(true) {
        Err(e) => return Err(e)
        Ok(e) => Some(e)
      }
  }
  match self.expect(fn(k) { k is RParen }, "expected ')' after for-header") {
    Err(e) => return Err(e)
    Ok(_) => ()
  }
  self.in_loop = self.in_loop + 1
  let body_r = self.parse_stmt()
  self.in_loop = self.in_loop - 1
  let body = match body_r {
    Err(e) => return Err(e)
    Ok(s) => s
  }
  Ok(
    @ast.Stmt::new(
      For(init~, cond~, update~, body~),
      @util.SourceSpan::new(start, self.prev_end),
    ),
  )
}

///|
/// Consumes `var|let|const` and the comma-separated declarator list. Used only
/// inside for-init where we do NOT consume a trailing `;` (the for-header owns
/// that).
fn Parser::parse_for_init_var(
  self : Parser,
  kind : @ast.VarKind,
) -> Result[@ast.ForInit, ParseError] {
  match self.advance() {
    Err(e) => return Err(e)
    Ok(_) => ()
  }
  let decls : Array[@ast.VarDeclarator] = []
  let loop_r : Result[Unit, ParseError] = for _s = 0 {
    match self.parse_var_declarator() {
      Err(e) => break Err(e)
      Ok(d) => {
        decls.push(d)
        match self.current.kind {
          Comma =>
            match self.advance() {
              Err(e) => break Err(e)
              Ok(_) => continue 0
            }
          _ => break Ok(())
        }
      }
    }
  }
  match loop_r {
    Err(e) => return Err(e)
    Ok(_) => ()
  }
  Ok(InitVar(kind~, decls~))
}

///|
/// `return [expr];`. ASI: if a line terminator separates `return` and the next
/// token, treat as `return;`.
fn Parser::parse_return_stmt(
  self : Parser,
  start : @util.SourceLoc,
) -> Result[@ast.Stmt, ParseError] {
  match self.advance() {
    Err(e) => return Err(e)
    Ok(_) => ()
  }
  // If there's a line terminator immediately after `return`, we treat it as
  // `return;` regardless of what comes next.
  let arg : @ast.Expr? = match self.current.kind {
    Semi | RBrace | Eof => None
    _ =>
      if self.had_lt_before() {
        None
      } else {
        match self.parse_expr_allow_comma(true) {
          Err(e) => return Err(e)
          Ok(e) => Some(e)
        }
      }
  }
  match self.expect_semi() {
    Err(e) => return Err(e)
    Ok(_) => ()
  }
  Ok(@ast.Stmt::new(Return(arg~), @util.SourceSpan::new(start, self.prev_end)))
}

///|
/// `break [label];`. Same ASI story as `return` — no LT before the label.
fn Parser::parse_break_stmt(
  self : Parser,
  start : @util.SourceLoc,
) -> Result[@ast.Stmt, ParseError] {
  match self.advance() {
    Err(e) => return Err(e)
    Ok(_) => ()
  }
  let label : String? = match self.current.kind {
    Semi | RBrace | Eof => None
    IdentifierTok(name~) =>
      if self.had_lt_before() {
        None
      } else {
        match self.advance() {
          Err(e) => return Err(e)
          Ok(_) => Some(name)
        }
      }
    _ => None
  }
  match self.expect_semi() {
    Err(e) => return Err(e)
    Ok(_) => ()
  }
  Ok(@ast.Stmt::new(Break(label~), @util.SourceSpan::new(start, self.prev_end)))
}

///|
/// `continue [label];`. Mirror of `parse_break_stmt`.
fn Parser::parse_continue_stmt(
  self : Parser,
  start : @util.SourceLoc,
) -> Result[@ast.Stmt, ParseError] {
  match self.advance() {
    Err(e) => return Err(e)
    Ok(_) => ()
  }
  let label : String? = match self.current.kind {
    Semi | RBrace | Eof => None
    IdentifierTok(name~) =>
      if self.had_lt_before() {
        None
      } else {
        match self.advance() {
          Err(e) => return Err(e)
          Ok(_) => Some(name)
        }
      }
    _ => None
  }
  match self.expect_semi() {
    Err(e) => return Err(e)
    Ok(_) => ()
  }
  Ok(
    @ast.Stmt::new(
      Continue(label~),
      @util.SourceSpan::new(start, self.prev_end),
    ),
  )
}

///|
/// `throw expr;`. ES bans a line terminator between `throw` and the argument.
fn Parser::parse_throw_stmt(
  self : Parser,
  start : @util.SourceLoc,
) -> Result[@ast.Stmt, ParseError] {
  match self.advance() {
    Err(e) => return Err(e)
    Ok(_) => ()
  }
  if self.had_lt_before() {
    return Err(
      ParseError(
        msg="no line terminator allowed after 'throw'",
        loc=self.current.span.start,
      ),
    )
  }
  let arg = match self.parse_expr_allow_comma(true) {
    Err(e) => return Err(e)
    Ok(e) => e
  }
  match self.expect_semi() {
    Err(e) => return Err(e)
    Ok(_) => ()
  }
  Ok(@ast.Stmt::new(Throw(arg~), @util.SourceSpan::new(start, self.prev_end)))
}

///|
/// `try { ... } [catch (e) { ... }] [finally { ... }]`. At least one of catch
/// / finally must be present.
fn Parser::parse_try_stmt(
  self : Parser,
  start : @util.SourceLoc,
) -> Result[@ast.Stmt, ParseError] {
  match self.advance() {
    Err(e) => return Err(e)
    Ok(_) => ()
  }
  let body = match self.parse_stmt_list_braced() {
    Err(e) => return Err(e)
    Ok(sl) => sl
  }
  let catch_ : @ast.CatchClause? = match self.current.kind {
    KeywordTok(kind=Catch_) => {
      match self.advance() {
        Err(e) => return Err(e)
        Ok(_) => ()
      }
      let param : @ast.Pattern? = match self.current.kind {
        LParen => {
          match self.advance() {
            Err(e) => return Err(e)
            Ok(_) => ()
          }
          // Destructuring in the catch param is deferred to 6b.
          let p_start = self.current.span.start
          match self.current.kind {
            LBrace | LBracket =>
              return Err(
                ParseError(
                  msg="destructuring in catch requires Step 6b",
                  loc=p_start,
                ),
              )
            _ => ()
          }
          let name = match self.expect_ident() {
            Err(e) => return Err(e)
            Ok(n) => n
          }
          match
            self.expect(fn(k) { k is RParen }, "expected ')' after catch-param") {
            Err(e) => return Err(e)
            Ok(_) => ()
          }
          Some(
            @ast.Pattern::new(
              IdentPat(name~),
              @util.SourceSpan::new(p_start, self.prev_end),
            ),
          )
        }
        _ => None
      }
      let cbody = match self.parse_stmt_list_braced() {
        Err(e) => return Err(e)
        Ok(sl) => sl
      }
      Some(@ast.CatchClause::new(param, cbody))
    }
    _ => None
  }
  let finally_ : Array[@ast.Stmt]? = match self.current.kind {
    KeywordTok(kind=Finally_) => {
      match self.advance() {
        Err(e) => return Err(e)
        Ok(_) => ()
      }
      match self.parse_stmt_list_braced() {
        Err(e) => return Err(e)
        Ok(sl) => Some(sl)
      }
    }
    _ => None
  }
  match (catch_, finally_) {
    (None, None) =>
      return Err(
        ParseError(
          msg="try must be followed by catch or finally",
          loc=self.current.span.start,
        ),
      )
    _ => ()
  }
  Ok(
    @ast.Stmt::new(
      Try(body~, catch_~, finally_~),
      @util.SourceSpan::new(start, self.prev_end),
    ),
  )
}

///|
/// `function name(params) { body }` at statement position. 6a doesn't support
/// async / generator / default params / rest / destructured params.
fn Parser::parse_function_decl(
  self : Parser,
  start : @util.SourceLoc,
) -> Result[@ast.Stmt, ParseError] {
  match self.advance() {
    Err(e) => return Err(e)
    Ok(_) => ()
  }
  // Reject generator early.
  match self.current.kind {
    Star =>
      return Err(
        ParseError(
          msg="generator requires Step 6b",
          loc=self.current.span.start,
        ),
      )
    _ => ()
  }
  let id = match self.expect_ident() {
    Err(e) => return Err(e)
    Ok(n) => n
  }
  let params = match self.parse_function_params() {
    Err(e) => return Err(e)
    Ok(p) => p
  }
  let body_stmts = match self.parse_stmt_list_braced() {
    Err(e) => return Err(e)
    Ok(sl) => sl
  }
  let body = @ast.Block::new(body_stmts)
  Ok(
    @ast.Stmt::new(
      FunctionDecl(id~, params~, body~, is_async=false, is_generator=false),
      @util.SourceSpan::new(start, self.prev_end),
    ),
  )
}

///|
/// `( a, b, c )` — plain-identifier parameter list. Refuses default / rest /
/// destructuring.
fn Parser::parse_function_params(
  self : Parser,
) -> Result[Array[@ast.Pattern], ParseError] {
  match self.expect(fn(k) { k is LParen }, "expected '(' before params") {
    Err(e) => return Err(e)
    Ok(_) => ()
  }
  let params : Array[@ast.Pattern] = []
  match self.current.kind {
    RParen => {
      match self.advance() {
        Err(e) => return Err(e)
        Ok(_) => ()
      }
      return Ok(params)
    }
    _ => ()
  }
  let loop_r : Result[Unit, ParseError] = for _s = 0 {
    match self.current.kind {
      LBrace | LBracket =>
        break Err(
          ParseError(
            msg="destructured params require Step 6b",
            loc=self.current.span.start,
          ),
        )
      Ellipsis =>
        break Err(
          ParseError(
            msg="rest params require Step 6b",
            loc=self.current.span.start,
          ),
        )
      _ => ()
    }
    let p_start = self.current.span.start
    let name = match self.expect_ident() {
      Err(e) => break Err(e)
      Ok(n) => n
    }
    // Default `=` is 6b.
    match self.current.kind {
      EqTok =>
        break Err(
          ParseError(
            msg="default parameters require Step 6b",
            loc=self.current.span.start,
          ),
        )
      _ => ()
    }
    params.push(
      @ast.Pattern::new(
        IdentPat(name~),
        @util.SourceSpan::new(p_start, self.prev_end),
      ),
    )
    match self.current.kind {
      Comma =>
        match self.advance() {
          Err(e) => break Err(e)
          Ok(_) => continue 0
        }
      RParen => break Ok(())
      _ =>
        break Err(
          ParseError(
            msg="expected ',' or ')' in param list",
            loc=self.current.span.start,
          ),
        )
    }
  }
  match loop_r {
    Err(e) => return Err(e)
    Ok(_) => ()
  }
  match self.expect(fn(k) { k is RParen }, "expected ')' after params") {
    Err(e) => return Err(e)
    Ok(_) => ()
  }
  Ok(params)
}

///|
/// The catch-all for statements that begin with an identifier / literal /
/// operator: could be a labeled statement (identifier followed by `:`) or an
/// expression statement.
///
/// Two-token lookahead workaround: we snapshot the identifier via `current`,
/// advance, and if the new current is `:`, we know it's a label; else we've
/// consumed the ident and must feed it back into the expression parser as a
/// `Identifier` expression.
fn Parser::parse_expr_stmt_or_labeled(
  self : Parser,
  start : @util.SourceLoc,
) -> Result[@ast.Stmt, ParseError] {
  match self.current.kind {
    IdentifierTok(name~) => {
      // Consume the identifier tentatively.
      let ident_span = self.current.span
      match self.advance() {
        Err(e) => return Err(e)
        Ok(_) => ()
      }
      match self.current.kind {
        Colon => {
          // Labeled statement.
          match self.advance() {
            Err(e) => return Err(e)
            Ok(_) => ()
          }
          self.labels.push(name)
          let body_r = self.parse_stmt()
          let _ = self.labels.pop()
          let body = match body_r {
            Err(e) => return Err(e)
            Ok(s) => s
          }
          return Ok(
            @ast.Stmt::new(
              Labeled(label=name, body~),
              @util.SourceSpan::new(start, self.prev_end),
            ),
          )
        }
        _ => {
          // Not a label — treat the swallowed ident as the LHS of an
          // expression.
          //
          // Detect `async function ...` here: if the swallowed ident was
          // "async" and current is `function`, produce a clear 6b error.
          if name == "async" {
            match self.current.kind {
              KeywordTok(kind=Function_) =>
                return Err(
                  ParseError(msg="async function requires Step 6b", loc=start),
                )
              _ => ()
            }
          }
          let ident_expr = @ast.Expr::new(Identifier(name), ident_span)
          // Continue parsing the expression from where the ident sits by
          // handing it to `continue_expr_after_primary` and then applying the
          // postfix / binary / assignment layers that
          // `parse_postfix_expr` / `parse_assignment_expr` would.
          let lhs_member = match self.continue_expr_after_primary(ident_expr) {
            Err(e) => return Err(e)
            Ok(e) => e
          }
          let lhs = match self.finish_postfix_from(lhs_member) {
            Err(e) => return Err(e)
            Ok(e) => e
          }
          let full = match self.finish_expr_from(lhs, 1, true) {
            Err(e) => return Err(e)
            Ok(e) => e
          }
          // Comma sequence at ExpressionStatement top level.
          let full = match self.maybe_wrap_sequence(full, true) {
            Err(e) => return Err(e)
            Ok(e) => e
          }
          match self.expect_semi() {
            Err(e) => return Err(e)
            Ok(_) => ()
          }
          return Ok(
            @ast.Stmt::new(
              ExprStmt(expr=full),
              @util.SourceSpan::new(start, self.prev_end),
            ),
          )
        }
      }
    }
    _ => ()
  }
  // Non-identifier expression statement.
  let e = match self.parse_expr_allow_comma(true) {
    Err(e) => return Err(e)
    Ok(e) => e
  }
  match self.expect_semi() {
    Err(e) => return Err(e)
    Ok(_) => ()
  }
  Ok(
    @ast.Stmt::new(
      ExprStmt(expr=e),
      @util.SourceSpan::new(start, self.prev_end),
    ),
  )
}
