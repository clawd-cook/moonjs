// Expression parsing (Pratt-style).
//
// Precedence (higher = tighter):
//
//   1  Assignment (right-assoc): = += -= *= /= %= **= <<= >>= >>>= &= |= ^=
//                                &&= ||= ??=
//   2  Conditional (right-assoc): ?:
//   3  Nullish coalescing: ??
//   4  Logical OR: ||
//   5  Logical AND: &&
//   6  Bitwise OR: |
//   7  Bitwise XOR: ^
//   8  Bitwise AND: &
//   9  Equality: == != === !==
//   10 Relational: < <= > >= in instanceof
//   11 Shift: << >> >>>
//   12 Additive: + -
//   13 Multiplicative: * / %
//   14 Exponent (right-assoc): **
//   15 Unary prefix (via parse_unary_expr): + - ! ~ typeof void delete ++x --x
//   16 Postfix: x++ x--
//   17 LeftHandSide: member `.` / index `[]` / call `()` / `new`
//   18 Primary
//
// `parse_assignment_expr(allow_in)` is the "assignment level" entry point:
// callers that want an expression without a top-level comma (function args,
// object property values, etc.) call this. `parse_expr_allow_comma` wraps
// with sequence flattening for use in `ExpressionStatement`, `for` header
// clauses, and grouped expressions.
//
// `allow_in` threads down to the relational level so that
// `for (var x = a in b; ...)` does not consume `in` as a relational operator
// when we are inside a for-init clause. In 6a we still recognize `in`
// generally in expressions (test_op2 uses `"x" in a`) — but for-init passes
// `allow_in=false` explicitly.

///|
/// Parse an expression including a top-level comma (`Sequence`). Callers:
/// ExpressionStatement, `(...)` groups, initializer clauses (`for` header,
/// var declarator init after `=`).
fn Parser::parse_expr_allow_comma(
  self : Parser,
  allow_in : Bool,
) -> Result[@ast.Expr, ParseError] {
  let first = match self.parse_assignment_expr(allow_in) {
    Err(e) => return Err(e)
    Ok(e) => e
  }
  self.maybe_wrap_sequence(first, allow_in)
}

///|
/// After parsing one assignment-level expression, if the next token is `,`,
/// gather more into a Sequence.
fn Parser::maybe_wrap_sequence(
  self : Parser,
  first : @ast.Expr,
  allow_in : Bool,
) -> Result[@ast.Expr, ParseError] {
  match self.current.kind {
    Comma => {
      let exprs : Array[@ast.Expr] = [first]
      let start = first.span.start
      let loop_r : Result[Unit, ParseError] = for _s = 0 {
        match self.current.kind {
          Comma =>
            match self.advance() {
              Err(e) => break Err(e)
              Ok(_) =>
                match self.parse_assignment_expr(allow_in) {
                  Err(e) => break Err(e)
                  Ok(e) => {
                    exprs.push(e)
                    continue 0
                  }
                }
            }
          _ => break Ok(())
        }
      }
      match loop_r {
        Err(e) => return Err(e)
        Ok(_) => ()
      }
      Ok(
        @ast.Expr::new(
          Sequence(exprs~),
          @util.SourceSpan::new(start, self.prev_end),
        ),
      )
    }
    _ => Ok(first)
  }
}

///|
/// Parse a single "assignment expression" — everything at Pratt precedence
/// >= 1 (assignment level). The name matches the ES production. Includes
/// yield / arrow, but 6a defers those: `yield` is a keyword-reserved word
/// that we error on if not inside a generator (which we don't support in 6a).
fn Parser::parse_assignment_expr(
  self : Parser,
  allow_in : Bool,
) -> Result[@ast.Expr, ParseError] {
  // yield: 6b feature.
  match self.current.kind {
    KeywordTok(kind=Yield_) =>
      return Err(
        ParseError(msg="yield requires Step 6b", loc=self.current.span.start),
      )
    _ => ()
  }
  let lhs = match self.parse_unary_expr() {
    Err(e) => return Err(e)
    Ok(e) => e
  }
  // From unary level, continue at prec 1 (assignment) to include assignment,
  // conditional (prec 2), and binary chain (prec 3..14).
  self.finish_expr_from(lhs, 1, allow_in)
}

///|
/// Continue Pratt parsing from an already-parsed unary-level expression at a
/// minimum precedence `min_prec`. Precedence 2 = conditional; 1 = assignment.
/// Assignment is right-associative and handled specially.
fn Parser::finish_expr_from(
  self : Parser,
  lhs_in : @ast.Expr,
  min_prec : Int,
  allow_in : Bool,
) -> Result[@ast.Expr, ParseError] {
  // First: handle assignment (prec 1) if allowed.
  //
  // Assignment is right-associative: parse lhs, if `=` (or compound) is next,
  // parse rhs at prec 1 recursively.
  let lhs = match self.try_finish_binary_chain(lhs_in, min_prec, allow_in) {
    Err(e) => return Err(e)
    Ok(e) => e
  }
  // After the binary chain we sit at conditional / assignment level.
  // Conditional first (prec 2).
  let lhs = match self.current.kind {
    Question =>
      if min_prec <= 2 {
        match self.parse_conditional_tail(lhs, allow_in) {
          Err(e) => return Err(e)
          Ok(e) => e
        }
      } else {
        lhs
      }
    _ => lhs
  }
  // Assignment (prec 1).
  match assign_op_of(self.current.kind) {
    Some(op) if min_prec <= 1 => {
      match self.advance() {
        Err(e) => return Err(e)
        Ok(_) => ()
      }
      let rhs = match self.parse_assignment_expr(allow_in) {
        Err(e) => return Err(e)
        Ok(e) => e
      }
      let span = @util.SourceSpan::new(lhs.span.start, rhs.span.end)
      Ok(@ast.Expr::new(Assign(op~, lhs~, rhs~), span))
    }
    _ => Ok(lhs)
  }
}

///|
/// Parse the `? cons : alt` tail. `cond` is already parsed.
fn Parser::parse_conditional_tail(
  self : Parser,
  cond : @ast.Expr,
  allow_in : Bool,
) -> Result[@ast.Expr, ParseError] {
  match self.advance() {
    Err(e) => return Err(e)
    Ok(_) => ()
  }
  // Per ES: the `cons` branch parses AssignmentExpression with `In` allowed
  // (spec's grammar), so we pass `true` here. `alt` similarly.
  let cons = match self.parse_assignment_expr(true) {
    Err(e) => return Err(e)
    Ok(e) => e
  }
  match self.expect(fn(k) { k is Colon }, "expected ':' in conditional") {
    Err(e) => return Err(e)
    Ok(_) => ()
  }
  let alt = match self.parse_assignment_expr(allow_in) {
    Err(e) => return Err(e)
    Ok(e) => e
  }
  let span = @util.SourceSpan::new(cond.span.start, alt.span.end)
  Ok(@ast.Expr::new(Cond(cond~, cons~, alt~), span))
}

///|
/// Loop over binary operators (precedence 3..14). At each step, look up the
/// operator table; if the current operator's precedence is >= `min_prec`,
/// consume it and parse the RHS at precedence+1 (or the same precedence for
/// right-assoc), then splice.
fn Parser::try_finish_binary_chain(
  self : Parser,
  lhs_in : @ast.Expr,
  min_prec : Int,
  allow_in : Bool,
) -> Result[@ast.Expr, ParseError] {
  let mut lhs = lhs_in
  let loop_r : Result[Unit, ParseError] = for _s = 0 {
    let op_info = self.peek_binop(allow_in)
    match op_info {
      None => break Ok(())
      Some((prec, right_assoc, kind_of_op)) => {
        if prec < min_prec || prec < 3 {
          break Ok(())
        }
        match self.advance() {
          Err(e) => break Err(e)
          Ok(_) => ()
        }
        // For right-assoc (only ** at prec 14), parse RHS at same precedence.
        let next_min = if right_assoc { prec } else { prec + 1 }
        let rhs_unary = match self.parse_unary_expr() {
          Err(e) => break Err(e)
          Ok(e) => e
        }
        let rhs = match
          self.try_finish_binary_chain(rhs_unary, next_min, allow_in) {
          Err(e) => break Err(e)
          Ok(e) => e
        }
        let span = @util.SourceSpan::new(lhs.span.start, rhs.span.end)
        lhs = match kind_of_op {
          BinOpTag(op) => @ast.Expr::new(Binary(op~, lhs~, rhs~), span)
          LogOpTag(op) => @ast.Expr::new(Logical(op~, lhs~, rhs~), span)
        }
        continue 0
      }
    }
  }
  match loop_r {
    Err(e) => Err(e)
    Ok(_) => Ok(lhs)
  }
}

///|
/// Union of BinOp / LogOp so the operator table can carry both flavours.
priv enum BinOpKind {
  BinOpTag(@ast.BinOp)
  LogOpTag(@ast.LogOp)
}

///|
/// Peek the current token for a binary operator. Returns None if the token is
/// not a binary operator. Handles `in` / `instanceof` via `allow_in`.
fn Parser::peek_binop(
  self : Parser,
  allow_in : Bool,
) -> (Int, Bool, BinOpKind)? {
  match self.current.kind {
    // 14 exponent, right-assoc
    StarStar => Some((14, true, BinOpTag(Pow)))
    // 13 multiplicative
    Star => Some((13, false, BinOpTag(Mul)))
    Slash => Some((13, false, BinOpTag(Div)))
    Percent => Some((13, false, BinOpTag(Mod)))
    // 12 additive
    Plus => Some((12, false, BinOpTag(Add)))
    Minus => Some((12, false, BinOpTag(Sub)))
    // 11 shift
    LtLt => Some((11, false, BinOpTag(Shl)))
    GtGt => Some((11, false, BinOpTag(Shr)))
    GtGtGt => Some((11, false, BinOpTag(UShr)))
    // 10 relational
    Lt => Some((10, false, BinOpTag(Lt)))
    LtEq => Some((10, false, BinOpTag(Le)))
    Gt => Some((10, false, BinOpTag(Gt)))
    GtEq => Some((10, false, BinOpTag(Ge)))
    KeywordTok(kind=Instanceof_) => Some((10, false, BinOpTag(InstanceOf)))
    KeywordTok(kind=In_) =>
      if allow_in {
        Some((10, false, BinOpTag(In)))
      } else {
        None
      }
    // 9 equality
    EqEq => Some((9, false, BinOpTag(Eq)))
    BangEq => Some((9, false, BinOpTag(Ne)))
    EqEqEq => Some((9, false, BinOpTag(StrictEq)))
    BangEqEq => Some((9, false, BinOpTag(StrictNe)))
    // 8 bit-and
    Amp => Some((8, false, BinOpTag(BitAnd)))
    // 7 bit-xor
    Caret => Some((7, false, BinOpTag(BitXor)))
    // 6 bit-or
    Pipe => Some((6, false, BinOpTag(BitOr)))
    // 5 logical-and
    AmpAmp => Some((5, false, LogOpTag(And)))
    // 4 logical-or
    PipePipe => Some((4, false, LogOpTag(Or)))
    // 3 nullish
    QuestionQuestion => Some((3, false, LogOpTag(NullishCoalescing)))
    _ => None
  }
}

///|
/// If the current token starts an assignment operator, return its AssignOp
/// enum value. Detects `=` / `+=` / `-=` / etc.
fn assign_op_of(k : @lexer.TokenKind) -> @ast.AssignOp? {
  match k {
    EqTok => Some(Assign)
    PlusEq => Some(AddAssign)
    MinusEq => Some(SubAssign)
    StarEq => Some(MulAssign)
    SlashEq => Some(DivAssign)
    PercentEq => Some(ModAssign)
    StarStarEq => Some(PowAssign)
    LtLtEq => Some(ShlAssign)
    GtGtEq => Some(ShrAssign)
    GtGtGtEq => Some(UShrAssign)
    AmpEq => Some(BitAndAssign)
    PipeEq => Some(BitOrAssign)
    CaretEq => Some(BitXorAssign)
    AmpAmpEq => Some(AndAssign)
    PipePipeEq => Some(OrAssign)
    QuestionQuestionEq => Some(NullishAssign)
    _ => None
  }
}

///|
/// Parse a unary-level expression: prefix `+ - ! ~ typeof void delete ++x --x`
/// followed by a postfix-level LHS expression. Falls through to
/// `parse_lhs_expr` for the underlying operand.
fn Parser::parse_unary_expr(self : Parser) -> Result[@ast.Expr, ParseError] {
  let start = self.current.span.start
  match self.current.kind {
    Plus => {
      match self.advance() {
        Err(e) => return Err(e)
        Ok(_) => ()
      }
      let arg = match self.parse_unary_expr() {
        Err(e) => return Err(e)
        Ok(e) => e
      }
      Ok(
        @ast.Expr::new(
          Unary(op=UPlus, arg~, prefix=true),
          @util.SourceSpan::new(start, arg.span.end),
        ),
      )
    }
    Minus => {
      match self.advance() {
        Err(e) => return Err(e)
        Ok(_) => ()
      }
      let arg = match self.parse_unary_expr() {
        Err(e) => return Err(e)
        Ok(e) => e
      }
      Ok(
        @ast.Expr::new(
          Unary(op=UMinus, arg~, prefix=true),
          @util.SourceSpan::new(start, arg.span.end),
        ),
      )
    }
    Bang => {
      match self.advance() {
        Err(e) => return Err(e)
        Ok(_) => ()
      }
      let arg = match self.parse_unary_expr() {
        Err(e) => return Err(e)
        Ok(e) => e
      }
      Ok(
        @ast.Expr::new(
          Unary(op=LogicalNot, arg~, prefix=true),
          @util.SourceSpan::new(start, arg.span.end),
        ),
      )
    }
    Tilde => {
      match self.advance() {
        Err(e) => return Err(e)
        Ok(_) => ()
      }
      let arg = match self.parse_unary_expr() {
        Err(e) => return Err(e)
        Ok(e) => e
      }
      Ok(
        @ast.Expr::new(
          Unary(op=BitNot, arg~, prefix=true),
          @util.SourceSpan::new(start, arg.span.end),
        ),
      )
    }
    KeywordTok(kind=Typeof_) => {
      match self.advance() {
        Err(e) => return Err(e)
        Ok(_) => ()
      }
      let arg = match self.parse_unary_expr() {
        Err(e) => return Err(e)
        Ok(e) => e
      }
      Ok(
        @ast.Expr::new(
          Unary(op=TypeOf, arg~, prefix=true),
          @util.SourceSpan::new(start, arg.span.end),
        ),
      )
    }
    KeywordTok(kind=Void_) => {
      match self.advance() {
        Err(e) => return Err(e)
        Ok(_) => ()
      }
      let arg = match self.parse_unary_expr() {
        Err(e) => return Err(e)
        Ok(e) => e
      }
      Ok(
        @ast.Expr::new(
          Unary(op=Void, arg~, prefix=true),
          @util.SourceSpan::new(start, arg.span.end),
        ),
      )
    }
    KeywordTok(kind=Delete_) => {
      match self.advance() {
        Err(e) => return Err(e)
        Ok(_) => ()
      }
      let arg = match self.parse_unary_expr() {
        Err(e) => return Err(e)
        Ok(e) => e
      }
      Ok(
        @ast.Expr::new(
          Unary(op=Delete, arg~, prefix=true),
          @util.SourceSpan::new(start, arg.span.end),
        ),
      )
    }
    PlusPlus => {
      match self.advance() {
        Err(e) => return Err(e)
        Ok(_) => ()
      }
      let arg = match self.parse_unary_expr() {
        Err(e) => return Err(e)
        Ok(e) => e
      }
      Ok(
        @ast.Expr::new(
          Update(op=Inc, arg~, prefix=true),
          @util.SourceSpan::new(start, arg.span.end),
        ),
      )
    }
    MinusMinus => {
      match self.advance() {
        Err(e) => return Err(e)
        Ok(_) => ()
      }
      let arg = match self.parse_unary_expr() {
        Err(e) => return Err(e)
        Ok(e) => e
      }
      Ok(
        @ast.Expr::new(
          Update(op=Dec, arg~, prefix=true),
          @util.SourceSpan::new(start, arg.span.end),
        ),
      )
    }
    _ => self.parse_postfix_expr()
  }
}

///|
/// Parse an LHS expression, then optionally postfix `++` / `--`. ASI: postfix
/// `++`/`--` is disabled if the operator is preceded by a line terminator.
fn Parser::parse_postfix_expr(self : Parser) -> Result[@ast.Expr, ParseError] {
  let lhs = match self.parse_lhs_expr() {
    Err(e) => return Err(e)
    Ok(e) => e
  }
  self.finish_postfix_from(lhs)
}

///|
/// Apply postfix `++` / `--` on top of an already-parsed LHS expression.
/// Used both by `parse_postfix_expr` and by `parse_expr_stmt_or_labeled` when
/// it has consumed the leading identifier tentatively for label detection.
fn Parser::finish_postfix_from(
  self : Parser,
  lhs : @ast.Expr,
) -> Result[@ast.Expr, ParseError] {
  // ASI: no LineTerminator allowed between operand and postfix `++`/`--`.
  if self.had_lt_before() {
    return Ok(lhs)
  }
  match self.current.kind {
    PlusPlus => {
      let end = self.current.span.end
      match self.advance() {
        Err(e) => return Err(e)
        Ok(_) => ()
      }
      Ok(
        @ast.Expr::new(
          Update(op=Inc, arg=lhs, prefix=false),
          @util.SourceSpan::new(lhs.span.start, end),
        ),
      )
    }
    MinusMinus => {
      let end = self.current.span.end
      match self.advance() {
        Err(e) => return Err(e)
        Ok(_) => ()
      }
      Ok(
        @ast.Expr::new(
          Update(op=Dec, arg=lhs, prefix=false),
          @util.SourceSpan::new(lhs.span.start, end),
        ),
      )
    }
    _ => Ok(lhs)
  }
}

///|
/// Left-hand-side expression: a primary followed by any combination of
/// member (`.`, `[...]`) and call (`()`, `new`) forms. Handles `new` as a
/// prefix.
fn Parser::parse_lhs_expr(self : Parser) -> Result[@ast.Expr, ParseError] {
  let primary = match self.current.kind {
    KeywordTok(kind=New_) => self.parse_new_expr()
    _ => self.parse_primary_expr()
  }
  let primary = match primary {
    Err(e) => return Err(e)
    Ok(e) => e
  }
  self.continue_expr_after_primary(primary)
}

///|
/// Consume `.`, `[...]`, `(...)` continuation after we already have a primary
/// (or new-expression) parsed. `?.` / `?.[]` / `?.()` are 6b.
fn Parser::continue_expr_after_primary(
  self : Parser,
  primary : @ast.Expr,
) -> Result[@ast.Expr, ParseError] {
  let mut lhs = primary
  let loop_r : Result[Unit, ParseError] = for _s = 0 {
    match self.current.kind {
      Dot => {
        match self.advance() {
          Err(e) => break Err(e)
          Ok(_) => ()
        }
        // Property name — reserved words are permitted here (`a.if` is legal).
        let name = match self.current.kind {
          IdentifierTok(name~) => name
          KeywordTok(kind~) => keyword_lexeme(kind)
          _ => break Err(self.error("expected property name after '.'"))
        }
        let end = self.current.span.end
        match self.advance() {
          Err(e) => break Err(e)
          Ok(_) => ()
        }
        lhs = @ast.Expr::new(
          Member(obj=lhs, prop=name),
          @util.SourceSpan::new(lhs.span.start, end),
        )
        continue 0
      }
      LBracket => {
        match self.advance() {
          Err(e) => break Err(e)
          Ok(_) => ()
        }
        let index = match self.parse_expr_allow_comma(true) {
          Err(e) => break Err(e)
          Ok(e) => e
        }
        let end = self.current.span.end
        match self.expect(fn(k) { k is RBracket }, "expected ']' after index") {
          Err(e) => break Err(e)
          Ok(_) => ()
        }
        lhs = @ast.Expr::new(
          IndexAccess(obj=lhs, index~),
          @util.SourceSpan::new(lhs.span.start, end),
        )
        continue 0
      }
      LParen => {
        // Call
        let args = match self.parse_arguments() {
          Err(e) => break Err(e)
          Ok(a) => a
        }
        // Detect arrow after `(...)` and emit clear error — arrow is 6b.
        match self.current.kind {
          Arrow =>
            break Err(
              ParseError(
                msg="arrow function requires Step 6b",
                loc=self.current.span.start,
              ),
            )
          _ => ()
        }
        lhs = @ast.Expr::new(
          Call(callee=lhs, args~),
          @util.SourceSpan::new(lhs.span.start, self.prev_end),
        )
        continue 0
      }
      QuestionDot =>
        break Err(
          ParseError(
            msg="optional chaining requires Step 6b",
            loc=self.current.span.start,
          ),
        )
      TemplateHeadTok(..) | TemplateNoSubTok(..) =>
        break Err(
          ParseError(
            msg="tagged template requires Step 6b",
            loc=self.current.span.start,
          ),
        )
      _ => break Ok(())
    }
  }
  match loop_r {
    Err(e) => Err(e)
    Ok(_) => Ok(lhs)
  }
}

///|
/// Parse `new Foo`, `new Foo()`, `new Foo(args)`. `new.target` is 6b.
///
/// Grammar note: `new` in ES chains — `new new Foo()` is legal. We recursively
/// parse `new` prefix, then optionally attach arguments if we see `(`.
fn Parser::parse_new_expr(self : Parser) -> Result[@ast.Expr, ParseError] {
  let start = self.current.span.start
  match self.advance() {
    Err(e) => return Err(e)
    Ok(_) => ()
  }
  // Reject `new.target` — 6b.
  match self.current.kind {
    Dot =>
      return Err(
        ParseError(
          msg="new.target requires Step 6b",
          loc=self.current.span.start,
        ),
      )
    _ => ()
  }
  // Parse the callee. `new` recursively allows `new Foo`.
  let callee = match self.current.kind {
    KeywordTok(kind=New_) => self.parse_new_expr()
    _ => self.parse_primary_expr()
  }
  let mut callee = match callee {
    Err(e) => return Err(e)
    Ok(e) => e
  }
  // A `new` operand can have any number of `.foo` / `[expr]` chained onto it
  // BEFORE the optional `(args)`. So chain member access here, then check for
  // args.
  let inner_loop : Result[Unit, ParseError] = for _s = 0 {
    match self.current.kind {
      Dot => {
        match self.advance() {
          Err(e) => break Err(e)
          Ok(_) => ()
        }
        let name = match self.current.kind {
          IdentifierTok(name~) => name
          KeywordTok(kind~) => keyword_lexeme(kind)
          _ => break Err(self.error("expected property name after '.'"))
        }
        let end = self.current.span.end
        match self.advance() {
          Err(e) => break Err(e)
          Ok(_) => ()
        }
        callee = @ast.Expr::new(
          Member(obj=callee, prop=name),
          @util.SourceSpan::new(callee.span.start, end),
        )
        continue 0
      }
      LBracket => {
        match self.advance() {
          Err(e) => break Err(e)
          Ok(_) => ()
        }
        let index = match self.parse_expr_allow_comma(true) {
          Err(e) => break Err(e)
          Ok(e) => e
        }
        let end = self.current.span.end
        match self.expect(fn(k) { k is RBracket }, "expected ']' after index") {
          Err(e) => break Err(e)
          Ok(_) => ()
        }
        callee = @ast.Expr::new(
          IndexAccess(obj=callee, index~),
          @util.SourceSpan::new(callee.span.start, end),
        )
        continue 0
      }
      _ => break Ok(())
    }
  }
  match inner_loop {
    Err(e) => return Err(e)
    Ok(_) => ()
  }
  // Optional argument list.
  let args : Array[@ast.Argument] = match self.current.kind {
    LParen =>
      match self.parse_arguments() {
        Err(e) => return Err(e)
        Ok(a) => a
      }
    _ => []
  }
  Ok(
    @ast.Expr::new(
      New(callee~, args~),
      @util.SourceSpan::new(start, self.prev_end),
    ),
  )
}

///|
/// `( arg1, arg2, ... )`. 6a does not accept `...spread` inside args.
fn Parser::parse_arguments(
  self : Parser,
) -> Result[Array[@ast.Argument], ParseError] {
  match self.expect(fn(k) { k is LParen }, "expected '(' before args") {
    Err(e) => return Err(e)
    Ok(_) => ()
  }
  let args : Array[@ast.Argument] = []
  match self.current.kind {
    RParen => {
      match self.advance() {
        Err(e) => return Err(e)
        Ok(_) => ()
      }
      return Ok(args)
    }
    _ => ()
  }
  let loop_r : Result[Unit, ParseError] = for _s = 0 {
    match self.current.kind {
      Ellipsis =>
        break Err(
          ParseError(msg="spread requires Step 6b", loc=self.current.span.start),
        )
      _ => ()
    }
    let e = match self.parse_assignment_expr(true) {
      Err(e) => break Err(e)
      Ok(e) => e
    }
    args.push(ArgExpr(e))
    match self.current.kind {
      Comma =>
        match self.advance() {
          Err(e) => break Err(e)
          Ok(_) => continue 0
        }
      RParen => break Ok(())
      _ => break Err(self.error("expected ',' or ')' in argument list"))
    }
  }
  match loop_r {
    Err(e) => return Err(e)
    Ok(_) => ()
  }
  match self.expect(fn(k) { k is RParen }, "expected ')' after arguments") {
    Err(e) => return Err(e)
    Ok(_) => ()
  }
  Ok(args)
}

///|
/// Parse a primary expression: literal, identifier, `this`, grouped
/// `(...)`, array literal, object literal, function expression.
fn Parser::parse_primary_expr(self : Parser) -> Result[@ast.Expr, ParseError] {
  let start = self.current.span.start
  match self.current.kind {
    NumberTok(value~, ..) => {
      match self.advance() {
        Err(e) => return Err(e)
        Ok(_) => ()
      }
      Ok(
        @ast.Expr::new(
          NumberLit(value),
          @util.SourceSpan::new(start, self.prev_end),
        ),
      )
    }
    StringTok(value~) => {
      match self.advance() {
        Err(e) => return Err(e)
        Ok(_) => ()
      }
      Ok(
        @ast.Expr::new(
          StringLit(value),
          @util.SourceSpan::new(start, self.prev_end),
        ),
      )
    }
    KeywordTok(kind=True_) => {
      match self.advance() {
        Err(e) => return Err(e)
        Ok(_) => ()
      }
      Ok(
        @ast.Expr::new(
          Boolean_(true),
          @util.SourceSpan::new(start, self.prev_end),
        ),
      )
    }
    KeywordTok(kind=False_) => {
      match self.advance() {
        Err(e) => return Err(e)
        Ok(_) => ()
      }
      Ok(
        @ast.Expr::new(
          Boolean_(false),
          @util.SourceSpan::new(start, self.prev_end),
        ),
      )
    }
    KeywordTok(kind=Null_) => {
      match self.advance() {
        Err(e) => return Err(e)
        Ok(_) => ()
      }
      Ok(@ast.Expr::new(Null_, @util.SourceSpan::new(start, self.prev_end)))
    }
    KeywordTok(kind=This_) => {
      match self.advance() {
        Err(e) => return Err(e)
        Ok(_) => ()
      }
      Ok(@ast.Expr::new(This_, @util.SourceSpan::new(start, self.prev_end)))
    }
    KeywordTok(kind=Super_) =>
      Err(ParseError(msg="super requires Step 6b", loc=start))
    KeywordTok(kind=Function_) => self.parse_function_expr(start)
    KeywordTok(kind=Class_) =>
      Err(ParseError(msg="class requires Step 6b", loc=start))
    IdentifierTok(name~) => {
      match self.advance() {
        Err(e) => return Err(e)
        Ok(_) => ()
      }
      // `undefined` is just a reserved-word-like global identifier in ES; we
      // still emit `Identifier("undefined")` since it's an identifier at the
      // lexer level.
      Ok(
        @ast.Expr::new(
          Identifier(name),
          @util.SourceSpan::new(start, self.prev_end),
        ),
      )
    }
    LParen => self.parse_grouped_expr(start)
    LBracket => self.parse_array_literal(start)
    LBrace => self.parse_object_literal(start)
    RegExpTok(..) =>
      Err(ParseError(msg="regex literal requires Step 6b", loc=start))
    TemplateHeadTok(..) | TemplateNoSubTok(..) =>
      Err(ParseError(msg="template literal requires Step 6b", loc=start))
    _ => Err(self.error("unexpected token in expression"))
  }
}

///|
/// `( expr )`. May be a grouped expression, an arrow-fn param list, or a
/// sequence. 6a treats a trailing `=>` as an error (arrow is 6b).
fn Parser::parse_grouped_expr(
  self : Parser,
  start : @util.SourceLoc,
) -> Result[@ast.Expr, ParseError] {
  match self.advance() {
    Err(e) => return Err(e)
    Ok(_) => ()
  }
  // Handle the immediately-closing `()` — could only be an arrow zero-param;
  // that's 6b.
  match self.current.kind {
    RParen => {
      match self.advance() {
        Err(e) => return Err(e)
        Ok(_) => ()
      }
      match self.current.kind {
        Arrow =>
          return Err(
            ParseError(msg="arrow function requires Step 6b", loc=start),
          )
        _ =>
          return Err(
            ParseError(
              msg="empty parentheses require an arrow function",
              loc=start,
            ),
          )
      }
    }
    _ => ()
  }
  let inner = match self.parse_expr_allow_comma(true) {
    Err(e) => return Err(e)
    Ok(e) => e
  }
  match self.expect(fn(k) { k is RParen }, "expected ')' after expression") {
    Err(e) => return Err(e)
    Ok(_) => ()
  }
  // Detect `(x) => ...` — arrow fn, 6b.
  match self.current.kind {
    Arrow =>
      return Err(
        ParseError(
          msg="arrow function requires Step 6b",
          loc=self.current.span.start,
        ),
      )
    _ => ()
  }
  // Reassign the span to include the parentheses (start .. prev_end).
  Ok(@ast.Expr::new(inner.kind, @util.SourceSpan::new(start, self.prev_end)))
}

///|
/// Array literal `[a, b, , c]`. Holes allowed, spread deferred to 6b.
fn Parser::parse_array_literal(
  self : Parser,
  start : @util.SourceLoc,
) -> Result[@ast.Expr, ParseError] {
  match self.advance() {
    Err(e) => return Err(e)
    Ok(_) => ()
  }
  let elems : Array[@ast.ArrayElement] = []
  match self.current.kind {
    RBracket => {
      match self.advance() {
        Err(e) => return Err(e)
        Ok(_) => ()
      }
      return Ok(
        @ast.Expr::new(
          ArrayLit(elements=elems),
          @util.SourceSpan::new(start, self.prev_end),
        ),
      )
    }
    _ => ()
  }
  let loop_r : Result[Unit, ParseError] = for _s = 0 {
    match self.current.kind {
      Ellipsis =>
        break Err(
          ParseError(msg="spread requires Step 6b", loc=self.current.span.start),
        )
      Comma => {
        // A leading `,` — this is a hole; consume and iterate.
        elems.push(Hole)
        match self.advance() {
          Err(e) => break Err(e)
          Ok(_) => continue 0
        }
      }
      RBracket => break Ok(())
      _ => ()
    }
    let e = match self.parse_assignment_expr(true) {
      Err(e) => break Err(e)
      Ok(e) => e
    }
    elems.push(Item(e))
    match self.current.kind {
      Comma =>
        match self.advance() {
          Err(e) => break Err(e)
          Ok(_) => continue 0
        }
      RBracket => break Ok(())
      _ => break Err(self.error("expected ',' or ']' in array literal"))
    }
  }
  match loop_r {
    Err(e) => return Err(e)
    Ok(_) => ()
  }
  match
    self.expect(fn(k) { k is RBracket }, "expected ']' after array elements") {
    Err(e) => return Err(e)
    Ok(_) => ()
  }
  Ok(
    @ast.Expr::new(
      ArrayLit(elements=elems),
      @util.SourceSpan::new(start, self.prev_end),
    ),
  )
}

///|
/// Object literal `{ a: 1, b, "c": 2, 3: "d", if: 4 }`. 6a supports key-value
/// with identifier / string / number / reserved-word keys, and shorthand
/// (`{ x }`). Getter / setter / method shorthand / computed keys / spread are
/// 6b.
fn Parser::parse_object_literal(
  self : Parser,
  start : @util.SourceLoc,
) -> Result[@ast.Expr, ParseError] {
  match self.advance() {
    Err(e) => return Err(e)
    Ok(_) => ()
  }
  let props : Array[@ast.ObjectProperty] = []
  match self.current.kind {
    RBrace => {
      match self.advance() {
        Err(e) => return Err(e)
        Ok(_) => ()
      }
      return Ok(
        @ast.Expr::new(
          ObjectLit(props~),
          @util.SourceSpan::new(start, self.prev_end),
        ),
      )
    }
    _ => ()
  }
  let loop_r : Result[Unit, ParseError] = for _s = 0 {
    // Refuse spread and computed keys early.
    match self.current.kind {
      Ellipsis =>
        break Err(
          ParseError(msg="spread requires Step 6b", loc=self.current.span.start),
        )
      LBracket =>
        break Err(
          ParseError(
            msg="computed key requires Step 6b",
            loc=self.current.span.start,
          ),
        )
      _ => ()
    }
    // Extract the key. Also remember its text (for shorthand path).
    let key_start = self.current.span.start
    let (key, key_ident_name) = match self.current.kind {
      IdentifierTok(name~) => {
        match self.advance() {
          Err(e) => break Err(e)
          Ok(_) => ()
        }
        (@ast.PropertyKey::IdKey(name), Some(name))
      }
      KeywordTok(kind~) => {
        let n = keyword_lexeme(kind)
        match self.advance() {
          Err(e) => break Err(e)
          Ok(_) => ()
        }
        (@ast.PropertyKey::IdKey(n), None)
      }
      StringTok(value~) => {
        match self.advance() {
          Err(e) => break Err(e)
          Ok(_) => ()
        }
        (@ast.PropertyKey::StringKey(value), None)
      }
      NumberTok(value~, ..) => {
        match self.advance() {
          Err(e) => break Err(e)
          Ok(_) => ()
        }
        (@ast.PropertyKey::NumberKey(value), None)
      }
      _ => break Err(self.error("expected property key"))
    }
    // Now expect `:` (KeyValue), or shorthand path (comma / rbrace after
    // ident), or `(` (method shorthand, which is 6b).
    match self.current.kind {
      Colon => {
        match self.advance() {
          Err(e) => break Err(e)
          Ok(_) => ()
        }
        let v = match self.parse_assignment_expr(true) {
          Err(e) => break Err(e)
          Ok(e) => e
        }
        props.push(KeyValue(key~, value=v, shorthand=false))
      }
      LParen =>
        break Err(
          ParseError(
            msg="method shorthand requires Step 6b",
            loc=self.current.span.start,
          ),
        )
      Comma | RBrace =>
        // Shorthand path: only valid if the key was a bare identifier.
        match key_ident_name {
          Some(n) => {
            let v = @ast.Expr::new(
              Identifier(n),
              @util.SourceSpan::new(key_start, self.prev_end),
            )
            props.push(KeyValue(key~, value=v, shorthand=true))
          }
          None => break Err(self.error("expected ':' after property key"))
        }
      EqTok =>
        break Err(
          ParseError(
            msg="object destructuring default requires Step 6b",
            loc=self.current.span.start,
          ),
        )
      _ => break Err(self.error("expected ':' or shorthand in object literal"))
    }
    match self.current.kind {
      Comma =>
        match self.advance() {
          Err(e) => break Err(e)
          Ok(_) => continue 0
        }
      RBrace => break Ok(())
      _ => break Err(self.error("expected ',' or '}' in object literal"))
    }
  }
  match loop_r {
    Err(e) => return Err(e)
    Ok(_) => ()
  }
  match
    self.expect(fn(k) { k is RBrace }, "expected '}' after object literal") {
    Err(e) => return Err(e)
    Ok(_) => ()
  }
  Ok(
    @ast.Expr::new(
      ObjectLit(props~),
      @util.SourceSpan::new(start, self.prev_end),
    ),
  )
}

///|
/// Function expression: `function [name](params) { body }`.
fn Parser::parse_function_expr(
  self : Parser,
  start : @util.SourceLoc,
) -> Result[@ast.Expr, ParseError] {
  match self.advance() {
    Err(e) => return Err(e)
    Ok(_) => ()
  }
  // Reject `function*`.
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
  let id : String? = match self.current.kind {
    IdentifierTok(name~) => {
      match self.advance() {
        Err(e) => return Err(e)
        Ok(_) => ()
      }
      Some(name)
    }
    _ => None
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
    @ast.Expr::new(
      FnExpr(id~, params~, body~, is_async=false, is_generator=false),
      @util.SourceSpan::new(start, self.prev_end),
    ),
  )
}

///|
/// Lexeme spelling of a `Keyword` — used when a reserved word appears in a
/// position where an identifier-shaped name is permitted (object key, member
/// access after `.`).
fn keyword_lexeme(k : @lexer.Keyword) -> String {
  match k {
    Break_ => "break"
    Case_ => "case"
    Catch_ => "catch"
    Class_ => "class"
    Const_ => "const"
    Continue_ => "continue"
    Debugger_ => "debugger"
    Default_ => "default"
    Delete_ => "delete"
    Do_ => "do"
    Else_ => "else"
    Export_ => "export"
    Extends_ => "extends"
    Finally_ => "finally"
    For_ => "for"
    Function_ => "function"
    If_ => "if"
    Import_ => "import"
    In_ => "in"
    Instanceof_ => "instanceof"
    Let_ => "let"
    New_ => "new"
    Null_ => "null"
    Return_ => "return"
    Super_ => "super"
    Switch_ => "switch"
    This_ => "this"
    Throw_ => "throw"
    True_ => "true"
    False_ => "false"
    Try_ => "try"
    Typeof_ => "typeof"
    Var_ => "var"
    Void_ => "void"
    While_ => "while"
    With_ => "with"
    Yield_ => "yield"
    Enum_ => "enum"
  }
}
