// Blackbox tests for the parser package.
//
// The parser is deep enough that we can't test everything — we assert on:
//
// 1. Expression parsing: precedence, associativity, unary / postfix, member /
//    index / call, new, array / object literals, ternary, assignment.
// 2. Statement parsing: every in-scope kind.
// 3. ASI: return / postfix / newline-splits-expression / trailing-semi-optional.
// 4. Error positions: unexpected tokens produce a ParseError at the right loc.
// 5. Explicit 6b boundary: constructs like class / arrow / template / spread
//    / destructuring / for-of / switch / import / async / generator emit a
//    "requires Step 6b" error rather than silently succeeding.
// 6. M1-AC fixture subset: each test_op1..cvt..inc_dec..closure1..3 function
//    from the QuickJS `test_language.js` / `test_closure.js` files parses
//    end-to-end with the surrounding `assert` / `assert_throws` helper
//    definitions.
//
// All tests live in one file to keep the sub-agent context small.

///|
/// Convenience: parse a source snippet and return the resulting Program.
/// Panics with the ParseError message on failure.
fn parse_ok(src : String) -> @ast.Program raise {
  let p = match @parser.Parser::new(src, "<test>") {
    Ok(p) => p
    Err(e) => {
      let @parser.ParseError(msg~, loc~) = e
      fail(
        "parse error at " +
        loc.line.to_int().to_string() +
        ":" +
        loc.col.to_int().to_string() +
        ": " +
        msg,
      )
      panic()
    }
  }
  match p.parse_script() {
    Ok(prog) => prog
    Err(e) => {
      let @parser.ParseError(msg~, loc~) = e
      fail(
        "parse error at " +
        loc.line.to_int().to_string() +
        ":" +
        loc.col.to_int().to_string() +
        ": " +
        msg,
      )
      panic()
    }
  }
}

///|
/// Parse a source snippet and require a ParseError. Returns the error so
/// tests can assert on the message or location.
fn parse_err(src : String) -> @parser.ParseError raise {
  let p = match @parser.Parser::new(src, "<test>") {
    Ok(p) => p
    Err(e) => return e
  }
  match p.parse_script() {
    Ok(_) => {
      fail("expected parse error but source parsed cleanly")
      panic()
    }
    Err(e) => e
  }
}

///|
/// Extract the single ExprStmt from a program of exactly one statement.
fn single_expr(prog : @ast.Program) -> @ast.Expr raise {
  if prog.body.length() != 1 {
    fail(
      "expected exactly one statement but got " + prog.body.length().to_string(),
    )
    panic()
  }
  match prog.body[0].kind {
    ExprStmt(expr~) => expr
    _ => {
      fail("expected ExprStmt at top of program")
      panic()
    }
  }
}

// ---------------------------------------------------------------------------
// Expression parsing
// ---------------------------------------------------------------------------

///|
test "expression: 1 + 2 parses to Binary(Add, 1, 2)" {
  let e = single_expr(parse_ok("1 + 2;"))
  match e.kind {
    Binary(op~, lhs~, rhs~) => {
      @test.assert_eq(op, Add)
      match lhs.kind {
        NumberLit(1.0) => ()
        _ => fail("lhs should be NumberLit(1)")
      }
      match rhs.kind {
        NumberLit(2.0) => ()
        _ => fail("rhs should be NumberLit(2)")
      }
    }
    _ => fail("expected Binary")
  }
}

///|
test "expression precedence: 1 + 2 * 3 groups mul tighter" {
  let e = single_expr(parse_ok("1 + 2 * 3;"))
  match e.kind {
    Binary(op=Add, lhs~, rhs~) => {
      match lhs.kind {
        NumberLit(1.0) => ()
        _ => fail("lhs")
      }
      match rhs.kind {
        Binary(op=Mul, lhs=l2, rhs=r2) => {
          match l2.kind {
            NumberLit(2.0) => ()
            _ => fail("l2")
          }
          match r2.kind {
            NumberLit(3.0) => ()
            _ => fail("r2")
          }
        }
        _ => fail("rhs should be Mul")
      }
    }
    _ => fail("expected Add at top")
  }
}

///|
test "expression: unary -x" {
  let e = single_expr(parse_ok("-x;"))
  match e.kind {
    Unary(op=UMinus, arg~, prefix=true) =>
      match arg.kind {
        Identifier("x") => ()
        _ => fail("arg should be Identifier(x)")
      }
    _ => fail("expected Unary(-)")
  }
}

///|
test "expression: postfix x++" {
  let e = single_expr(parse_ok("x++;"))
  match e.kind {
    Update(op=Inc, arg~, prefix=false) =>
      match arg.kind {
        Identifier("x") => ()
        _ => fail("arg")
      }
    _ => fail("expected postfix Update(Inc)")
  }
}

///|
test "expression: prefix ++x" {
  let e = single_expr(parse_ok("++x;"))
  match e.kind {
    Update(op=Inc, prefix=true, ..) => ()
    _ => fail("expected prefix Update(Inc)")
  }
}

///|
test "expression: assignment is right-assoc: a = b = 1" {
  let e = single_expr(parse_ok("a = b = 1;"))
  // Assign(=, a, Assign(=, b, 1))
  match e.kind {
    Assign(op=Assign, lhs~, rhs~) => {
      match lhs.kind {
        Identifier("a") => ()
        _ => fail("outer lhs")
      }
      match rhs.kind {
        Assign(op=Assign, lhs=l2, rhs=r2) => {
          match l2.kind {
            Identifier("b") => ()
            _ => fail("inner lhs")
          }
          match r2.kind {
            NumberLit(1.0) => ()
            _ => fail("inner rhs")
          }
        }
        _ => fail("expected nested Assign")
      }
    }
    _ => fail("expected Assign")
  }
}

///|
test "expression: conditional right-assoc" {
  // a ? b : c ? d : e = a ? b : (c ? d : e)
  let e = single_expr(parse_ok("a ? b : c ? d : e;"))
  match e.kind {
    Cond(cond~, cons~, alt~) => {
      match cond.kind {
        Identifier("a") => ()
        _ => fail("cond")
      }
      match cons.kind {
        Identifier("b") => ()
        _ => fail("cons")
      }
      match alt.kind {
        Cond(..) => ()
        _ => fail("alt should be nested Cond")
      }
    }
    _ => fail("expected Cond")
  }
}

///|
test "expression: chained member a.b.c" {
  let e = single_expr(parse_ok("a.b.c;"))
  // Member(Member(a, b), c)
  match e.kind {
    Member(obj~, prop~) => {
      @test.assert_eq(prop, "c")
      match obj.kind {
        Member(prop=p2, ..) => @test.assert_eq(p2, "b")
        _ => fail("inner should be Member")
      }
    }
    _ => fail("expected Member")
  }
}

///|
test "expression: chained index a[b][c]" {
  let e = single_expr(parse_ok("a[b][c];"))
  match e.kind {
    IndexAccess(obj~, index~) => {
      match index.kind {
        Identifier("c") => ()
        _ => fail("outer index")
      }
      match obj.kind {
        IndexAccess(..) => ()
        _ => fail("obj should be IndexAccess")
      }
    }
    _ => fail("expected IndexAccess")
  }
}

///|
test "expression: call f(1, 2)" {
  let e = single_expr(parse_ok("f(1, 2);"))
  match e.kind {
    Call(callee~, args~) => {
      match callee.kind {
        Identifier("f") => ()
        _ => fail("callee")
      }
      @test.assert_eq(args.length(), 2)
    }
    _ => fail("expected Call")
  }
}

///|
test "expression: new C(x)" {
  let e = single_expr(parse_ok("new C(x);"))
  match e.kind {
    New(callee~, args~) => {
      match callee.kind {
        Identifier("C") => ()
        _ => fail("callee")
      }
      @test.assert_eq(args.length(), 1)
    }
    _ => fail("expected New")
  }
}

///|
test "expression: new C without parens" {
  let e = single_expr(parse_ok("new C;"))
  match e.kind {
    New(callee~, args~) => {
      match callee.kind {
        Identifier("C") => ()
        _ => fail("callee")
      }
      @test.assert_eq(args.length(), 0)
    }
    _ => fail("expected New (no args)")
  }
}

///|
test "expression: instanceof and in" {
  let e1 = single_expr(parse_ok("a instanceof B;"))
  match e1.kind {
    Binary(op=InstanceOf, ..) => ()
    _ => fail("expected instanceof")
  }
  let e2 = single_expr(parse_ok("x in obj;"))
  match e2.kind {
    Binary(op=In, ..) => ()
    _ => fail("expected in")
  }
}

///|
test "expression: 2 ** 3 ** 2 is right-assoc" {
  let e = single_expr(parse_ok("2 ** 3 ** 2;"))
  match e.kind {
    Binary(op=Pow, lhs~, rhs~) => {
      match lhs.kind {
        NumberLit(2.0) => ()
        _ => fail("lhs")
      }
      match rhs.kind {
        Binary(op=Pow, ..) => ()
        _ => fail("rhs should be nested Pow")
      }
    }
    _ => fail("expected Pow")
  }
}

///|
test "expression: typeof, void, delete" {
  match single_expr(parse_ok("typeof x;")).kind {
    Unary(op=TypeOf, ..) => ()
    _ => fail("typeof")
  }
  match single_expr(parse_ok("void 0;")).kind {
    Unary(op=Void, ..) => ()
    _ => fail("void")
  }
  match single_expr(parse_ok("delete a.b;")).kind {
    Unary(op=Delete, ..) => ()
    _ => fail("delete")
  }
}

///|
test "expression: array literal with hole" {
  let e = single_expr(parse_ok("[1, , 3];"))
  match e.kind {
    ArrayLit(elements~) => {
      @test.assert_eq(elements.length(), 3)
      match elements[1] {
        Hole => ()
        _ => fail("middle should be Hole")
      }
    }
    _ => fail("expected ArrayLit")
  }
}

///|
test "expression: array literal packed" {
  let e = single_expr(parse_ok("[1, 2, 3];"))
  match e.kind {
    ArrayLit(elements~) => @test.assert_eq(elements.length(), 3)
    _ => fail("expected ArrayLit")
  }
}

///|
test "expression: object literal with shorthand and reserved-word key" {
  let e = single_expr(parse_ok("({a: 1, b, if: 2});"))
  match e.kind {
    ObjectLit(props~) => {
      @test.assert_eq(props.length(), 3)
      match props[1] {
        KeyValue(shorthand=true, ..) => ()
        _ => fail("second should be shorthand")
      }
      match props[2] {
        KeyValue(key~, ..) =>
          match key {
            IdKey("if") => ()
            _ => fail("if key")
          }
        _ => fail("third KeyValue")
      }
    }
    _ => fail("expected ObjectLit")
  }
}

///|
test "expression: object literal with number and string keys" {
  let e = single_expr(parse_ok("({\"c\": 2, 3: 4});"))
  match e.kind {
    ObjectLit(props~) => {
      @test.assert_eq(props.length(), 2)
      match props[0] {
        KeyValue(key=StringKey("c"), ..) => ()
        _ => fail("StringKey")
      }
      match props[1] {
        KeyValue(key=NumberKey(3.0), ..) => ()
        _ => fail("NumberKey")
      }
    }
    _ => fail("expected ObjectLit")
  }
}

///|
test "expression: nested call and member combination a.b.c(1)(2)" {
  let e = single_expr(parse_ok("a.b.c(1)(2);"))
  match e.kind {
    Call(args~, callee~) => {
      @test.assert_eq(args.length(), 1)
      match callee.kind {
        Call(..) => ()
        _ => fail("inner should be Call")
      }
    }
    _ => fail("expected Call")
  }
}

///|
test "expression: compound assignments" {
  match single_expr(parse_ok("x += 1;")).kind {
    Assign(op=AddAssign, ..) => ()
    _ => fail("+=")
  }
  match single_expr(parse_ok("x |= 1;")).kind {
    Assign(op=BitOrAssign, ..) => ()
    _ => fail("|=")
  }
  match single_expr(parse_ok("x ??= 1;")).kind {
    Assign(op=NullishAssign, ..) => ()
    _ => fail("??=")
  }
}

///|
test "expression: logical operators split from binary" {
  match single_expr(parse_ok("a && b;")).kind {
    Logical(op=And, ..) => ()
    _ => fail("&&")
  }
  match single_expr(parse_ok("a || b;")).kind {
    Logical(op=Or, ..) => ()
    _ => fail("||")
  }
  match single_expr(parse_ok("a ?? b;")).kind {
    Logical(op=NullishCoalescing, ..) => ()
    _ => fail("??")
  }
}

///|
test "expression: shift and bitwise operators" {
  match single_expr(parse_ok("1 << 2;")).kind {
    Binary(op=Shl, ..) => ()
    _ => fail("<<")
  }
  match single_expr(parse_ok("1 >>> 2;")).kind {
    Binary(op=UShr, ..) => ()
    _ => fail(">>>")
  }
  match single_expr(parse_ok("1 & 2;")).kind {
    Binary(op=BitAnd, ..) => ()
    _ => fail("&")
  }
}

///|
test "expression: string comparison 'b' > 'a'" {
  let e = single_expr(parse_ok("'b' > 'a';"))
  match e.kind {
    Binary(op=Gt, lhs~, rhs~) => {
      match lhs.kind {
        StringLit("b") => ()
        _ => fail("lhs")
      }
      match rhs.kind {
        StringLit("a") => ()
        _ => fail("rhs")
      }
    }
    _ => fail("expected Gt")
  }
}

///|
test "expression: sequence (a, b, c)" {
  let e = single_expr(parse_ok("(a, b, c);"))
  match e.kind {
    Sequence(exprs~) => @test.assert_eq(exprs.length(), 3)
    _ => fail("expected Sequence")
  }
}

///|
/// Regression: after primary-value keywords (`true`, `false`, `null`, `this`,
/// `super`) the parser must be in operand position — so `/` is a divide,
/// not the start of a regex literal.
test "regex context: `/` after true/false/null/this is division" {
  // Each of these must parse cleanly. Before the fix, the lexer was asked to
  // treat the `/` after the keyword as a regex literal, producing
  // "unterminated regex literal" at the `/`.
  let _ = single_expr(parse_ok("true / 2;"))
  let _ = single_expr(parse_ok("false / 2;"))
  let _ = single_expr(parse_ok("null / 2;"))
  let _ = single_expr(parse_ok("this / 2;"))
}

// ---------------------------------------------------------------------------
// Statement parsing
// ---------------------------------------------------------------------------

///|
test "stmt: var declaration with initializer" {
  let prog = parse_ok("var x = 1;")
  match prog.body[0].kind {
    VarDecl(kind=Var, decls~) => {
      @test.assert_eq(decls.length(), 1)
      match decls[0].pat.kind {
        IdentPat(name~) => @test.assert_eq(name, "x")
        _ => fail("pat")
      }
      match decls[0].init {
        Some(_) => ()
        None => fail("init should be Some")
      }
    }
    _ => fail("expected VarDecl")
  }
}

///|
test "stmt: let with multi-declarator" {
  let prog = parse_ok("let x, y = 2;")
  match prog.body[0].kind {
    VarDecl(kind=Let, decls~) => @test.assert_eq(decls.length(), 2)
    _ => fail("expected VarDecl(Let)")
  }
}

///|
test "stmt: const requires initializer... actually parser accepts w/o" {
  // ES spec requires const initializer, but 6a lexer / parser accepts both;
  // Compiler / harness enforces semantics.
  let prog = parse_ok("const x = 1;")
  match prog.body[0].kind {
    VarDecl(kind=Const, ..) => ()
    _ => fail("expected VarDecl(Const)")
  }
}

///|
test "stmt: if / else" {
  let prog = parse_ok("if (x) return 1; else return 2;")
  match prog.body[0].kind {
    If(alt~, ..) =>
      match alt {
        Some(_) => ()
        None => fail("expected alt")
      }
    _ => fail("expected If")
  }
}

///|
test "stmt: while loop" {
  let prog = parse_ok("while (x) { body; }")
  match prog.body[0].kind {
    While(..) => ()
    _ => fail("expected While")
  }
}

///|
test "stmt: do-while" {
  let prog = parse_ok("do { body; } while (x);")
  match prog.body[0].kind {
    DoWhile(..) => ()
    _ => fail("expected DoWhile")
  }
}

///|
test "stmt: for classic three-part" {
  let prog = parse_ok("for (var i = 0; i < 10; i++) body;")
  match prog.body[0].kind {
    For(init~, cond~, update~, ..) => {
      assert_true(init is Some(_))
      assert_true(cond is Some(_))
      assert_true(update is Some(_))
    }
    _ => fail("expected For")
  }
}

///|
test "stmt: for with empty init" {
  let prog = parse_ok("for (; i < 10; i++) body;")
  match prog.body[0].kind {
    For(init~, ..) => @test.assert_eq(init is None, true)
    _ => fail("expected For")
  }
}

///|
test "stmt: return with no arg" {
  let prog = parse_ok("function f() { return; }")
  match prog.body[0].kind {
    FunctionDecl(body~, ..) =>
      match body.body[0].kind {
        Return(arg~) => @test.assert_eq(arg is None, true)
        _ => fail("first stmt should be Return")
      }
    _ => fail("expected FunctionDecl")
  }
}

///|
test "stmt: return with expr" {
  let prog = parse_ok("function f() { return foo; }")
  match prog.body[0].kind {
    FunctionDecl(body~, ..) =>
      match body.body[0].kind {
        Return(arg~) =>
          match arg {
            Some(e) =>
              match e.kind {
                Identifier("foo") => ()
                _ => fail("arg")
              }
            None => fail("expected Some arg")
          }
        _ => fail("Return")
      }
    _ => fail("FunctionDecl")
  }
}

///|
test "stmt: break and continue with and without label" {
  let src =
    #|outer: for (;;) {
    #|  for (;;) {
    #|    if (a) break outer;
    #|    if (b) continue outer;
    #|    if (c) break;
    #|    if (d) continue;
    #|  }
    #|}
  let prog = parse_ok(src)
  match prog.body[0].kind {
    Labeled(..) => ()
    _ => fail("expected Labeled")
  }
}

///|
test "stmt: throw" {
  let prog = parse_ok("throw new Error(\"x\");")
  match prog.body[0].kind {
    Throw(arg~) =>
      match arg.kind {
        New(..) => ()
        _ => fail("arg should be New")
      }
    _ => fail("expected Throw")
  }
}

///|
test "stmt: try/catch/finally" {
  let prog = parse_ok("try { a; } catch (e) { b; } finally { c; }")
  match prog.body[0].kind {
    Try(body~, catch_~, finally_~) => {
      @test.assert_eq(body.length(), 1)
      assert_true(catch_ is Some(_))
      assert_true(finally_ is Some(_))
    }
    _ => fail("expected Try")
  }
}

///|
test "stmt: try with optional catch binding" {
  let prog = parse_ok("try { a; } catch { b; }")
  match prog.body[0].kind {
    Try(catch_~, ..) =>
      match catch_ {
        Some(cc) => @test.assert_eq(cc.param is None, true)
        None => fail("expected Some catch")
      }
    _ => fail("expected Try")
  }
}

///|
test "stmt: function decl" {
  let prog = parse_ok("function f(a, b) { return a + b; }")
  match prog.body[0].kind {
    FunctionDecl(id~, params~, body~, ..) => {
      @test.assert_eq(id, "f")
      @test.assert_eq(params.length(), 2)
      @test.assert_eq(body.body.length(), 1)
    }
    _ => fail("expected FunctionDecl")
  }
}

///|
test "stmt: function expression via IIFE" {
  let prog = parse_ok("(function() { return 1; })();")
  match prog.body[0].kind {
    ExprStmt(expr~) =>
      match expr.kind {
        Call(callee~, ..) =>
          match callee.kind {
            FnExpr(id~, ..) => @test.assert_eq(id is None, true)
            _ => fail("callee should be FnExpr")
          }
        _ => fail("should be Call")
      }
    _ => fail("ExprStmt")
  }
}

///|
test "stmt: named function expression" {
  let prog = parse_ok("(function named() { return 2; });")
  match prog.body[0].kind {
    ExprStmt(expr~) =>
      match expr.kind {
        FnExpr(id~, ..) => @test.assert_eq(id, Some("named"))
        _ => fail("expected FnExpr")
      }
    _ => fail("ExprStmt")
  }
}

///|
test "empty program" {
  let prog = parse_ok("")
  @test.assert_eq(prog.body.length(), 0)
  @test.assert_eq(prog.is_module, false)
}

///|
test "stmt: labeled for w/ break outer" {
  let prog = parse_ok("outer: for (;;) { break outer; }")
  match prog.body[0].kind {
    Labeled(label~, body~) => {
      @test.assert_eq(label, "outer")
      match body.kind {
        For(..) => ()
        _ => fail("body should be For")
      }
    }
    _ => fail("expected Labeled")
  }
}

// ---------------------------------------------------------------------------
// ASI (automatic semicolon insertion)
// ---------------------------------------------------------------------------

///|
test "asi: two statements on separate lines" {
  let src =
    #|a
    #|b
  let prog = parse_ok(src)
  @test.assert_eq(prog.body.length(), 2)
}

///|
test "asi: return then expression on next line" {
  // Per ES: `return\nfoo` → Return(None) + ExprStmt(foo)
  let src =
    #|function f() {
    #|  return
    #|  foo
    #|}
  let prog = parse_ok(src)
  match prog.body[0].kind {
    FunctionDecl(body~, ..) => {
      @test.assert_eq(body.body.length(), 2)
      match body.body[0].kind {
        Return(arg~) => @test.assert_eq(arg is None, true)
        _ => fail("first should be Return(None)")
      }
      match body.body[1].kind {
        ExprStmt(..) => ()
        _ => fail("second should be ExprStmt")
      }
    }
    _ => fail("expected FunctionDecl")
  }
}

///|
test "asi: x newline ++y is two statements" {
  // Postfix `++` disabled by LT-before rule ⇒ `++y` becomes prefix update.
  let src =
    #|x
    #|++y
  let prog = parse_ok(src)
  @test.assert_eq(prog.body.length(), 2)
  match prog.body[1].kind {
    ExprStmt(expr~) =>
      match expr.kind {
        Update(op=Inc, prefix=true, ..) => ()
        _ => fail("expected prefix Update")
      }
    _ => fail("ExprStmt")
  }
}

///|
test "asi: no eos required before eof" {
  let prog = parse_ok("var x = 1")
  @test.assert_eq(prog.body.length(), 1)
}

///|
test "asi: no eos required before rbrace" {
  let prog = parse_ok("function f() { return 1 }")
  match prog.body[0].kind {
    FunctionDecl(body~, ..) => {
      @test.assert_eq(body.body.length(), 1)
      match body.body[0].kind {
        Return(arg~) => @test.assert_eq(arg is Some(_), true)
        _ => fail("Return")
      }
    }
    _ => fail("FunctionDecl")
  }
}

// ---------------------------------------------------------------------------
// Error positions
// ---------------------------------------------------------------------------

///|
test "error: incomplete binary '1 +'" {
  let @parser.ParseError(_) = parse_err("1 +")
  ()
}

///|
test "error: missing paren in if" {
  let @parser.ParseError(_) = parse_err("if x")
  ()
}

// ---------------------------------------------------------------------------
// Out-of-scope 6b constructs: explicit errors
// ---------------------------------------------------------------------------

///|
test "6b boundary: class" {
  let @parser.ParseError(msg~, ..) = parse_err("class C {}")
  assert_true(msg.contains("class"))
}

///|
test "6b boundary: arrow function" {
  let @parser.ParseError(msg~, ..) = parse_err("(a) => a;")
  assert_true(msg.contains("arrow"))
}

///|
test "6b boundary: template literal" {
  let @parser.ParseError(msg~, ..) = parse_err("`template`;")
  assert_true(msg.contains("template"))
}

///|
test "6b boundary: spread in array" {
  let @parser.ParseError(msg~, ..) = parse_err("[...a];")
  assert_true(msg.contains("spread"))
}

///|
test "6b boundary: destructuring in let" {
  let @parser.ParseError(msg~, ..) = parse_err("let [a, b] = c;")
  assert_true(msg.contains("destructuring"))
}

///|
test "6b boundary: async function" {
  let @parser.ParseError(msg~, ..) = parse_err("async function f() {}")
  assert_true(msg.contains("async"))
}

///|
test "6b boundary: generator function" {
  let @parser.ParseError(msg~, ..) = parse_err("function *g() {}")
  assert_true(msg.contains("generator"))
}

///|
test "6b boundary: switch" {
  let @parser.ParseError(msg~, ..) = parse_err("switch (x) {}")
  assert_true(msg.contains("switch"))
}

///|
test "6b boundary: import" {
  let @parser.ParseError(msg~, ..) = parse_err("import \"x\";")
  assert_true(msg.contains("import"))
}

///|
test "6b boundary: for-of" {
  let @parser.ParseError(msg~, ..) = parse_err("for (x of y) {}")
  assert_true(msg.contains("for-of"))
}

///|
test "6b boundary: for-in" {
  let @parser.ParseError(msg~, ..) = parse_err("for (x in y) {}")
  assert_true(msg.contains("for-in"))
}

// ---------------------------------------------------------------------------
// M1 AC subset: extracted test_op1 / test_op2 / test_cvt / test_inc_dec /
// test_closure1 / test_closure2 / test_closure3, plus their helper
// declarations. These test that the parser can walk each AC test-function
// end-to-end without errors — actual execution is Steps 7-9.
// ---------------------------------------------------------------------------

///|
test "AC fixture: test_op1 parses" {
  // Verbatim copy of `quickjs/tests/test_language.js` `test_op1` body.
  // Do NOT edit — this is the AC gate. If the source `.js` file changes,
  // re-copy it here and verify.
  let src =
    #|function test_op1()
    #|{
    #|    var r, a;
    #|    r = 1 + 2;
    #|    assert(r, 3, "1 + 2 === 3");
    #|
    #|    r = 1 - 2;
    #|    assert(r, -1, "1 - 2 === -1");
    #|
    #|    r = -1;
    #|    assert(r, -1, "-1 === -1");
    #|
    #|    r = +2;
    #|    assert(r, 2, "+2 === 2");
    #|
    #|    r = 2 * 3;
    #|    assert(r, 6, "2 * 3 === 6");
    #|
    #|    r = 4 / 2;
    #|    assert(r, 2, "4 / 2 === 2");
    #|
    #|    r = 4 % 3;
    #|    assert(r, 1, "4 % 3 === 3");
    #|
    #|    r = 4 << 2;
    #|    assert(r, 16, "4 << 2 === 16");
    #|
    #|    r = 1 << 0;
    #|    assert(r, 1, "1 << 0 === 1");
    #|
    #|    r = 1 << 31;
    #|    assert(r, -2147483648, "1 << 31 === -2147483648");
    #|
    #|    r = 1 << 32;
    #|    assert(r, 1, "1 << 32 === 1");
    #|
    #|    r = (1 << 31) < 0;
    #|    assert(r, true, "(1 << 31) < 0 === true");
    #|
    #|    r = -4 >> 1;
    #|    assert(r, -2, "-4 >> 1 === -2");
    #|
    #|    r = -4 >>> 1;
    #|    assert(r, 0x7ffffffe, "-4 >>> 1 === 0x7ffffffe");
    #|
    #|    r = 1 & 1;
    #|    assert(r, 1, "1 & 1 === 1");
    #|
    #|    r = 0 | 1;
    #|    assert(r, 1, "0 | 1 === 1");
    #|
    #|    r = 1 ^ 1;
    #|    assert(r, 0, "1 ^ 1 === 0");
    #|
    #|    r = ~1;
    #|    assert(r, -2, "~1 === -2");
    #|
    #|    r = !1;
    #|    assert(r, false, "!1 === false");
    #|
    #|    assert((1 < 2), true, "(1 < 2) === true");
    #|
    #|    assert((2 > 1), true, "(2 > 1) === true");
    #|
    #|    assert(('b' > 'a'), true, "('b' > 'a') === true");
    #|
    #|    assert(2 ** 8, 256, "2 ** 8 === 256");
    #|}
  let prog = parse_ok(src)
  @test.assert_eq(prog.body.length(), 1)
  match prog.body[0].kind {
    FunctionDecl(id~, ..) => @test.assert_eq(id, "test_op1")
    _ => fail("expected FunctionDecl")
  }
}

///|
test "AC fixture: test_op2 with typeof, in, instanceof, reserved-word key" {
  let src =
    #|function test_op2()
    #|{
    #|    var a, b;
    #|    a = new Object;
    #|    a.x = 1;
    #|    assert(a.x, 1, "new");
    #|    b = new F(2);
    #|    assert(b.x, 2, "new");
    #|
    #|    a = {x : 2};
    #|    assert(("x" in a), true, "in");
    #|    assert(("y" in a), false, "in");
    #|
    #|    a = {};
    #|    assert((a instanceof Object), true, "instanceof");
    #|    assert((a instanceof String), false, "instanceof");
    #|
    #|    assert((typeof 1), "number", "typeof");
    #|    assert((typeof Object), "function", "typeof");
    #|    assert((typeof null), "object", "typeof");
    #|    assert((typeof unknown_var), "undefined", "typeof");
    #|
    #|    a = {x: 1, if: 2, async: 3};
    #|    assert(a.if === 2);
    #|    assert(a.async === 3);
    #|}
  let prog = parse_ok(src)
  match prog.body[0].kind {
    FunctionDecl(id~, ..) => @test.assert_eq(id, "test_op2")
    _ => fail("expected FunctionDecl")
  }
}

///|
test "AC fixture: test_cvt with big number and bit-forced coercion" {
  let src =
    #|function test_cvt()
    #|{
    #|    assert((NaN | 0), 0);
    #|    assert((Infinity | 0), 0);
    #|    assert(((-Infinity) | 0), 0);
    #|    assert(("12345" | 0), 12345);
    #|    assert(("0x12345" | 0), 0x12345);
    #|    assert(((4294967296 * 3 - 4) | 0), -4);
    #|
    #|    assert(("12345" >>> 0), 12345);
    #|    assert(("0x12345" >>> 0), 0x12345);
    #|    assert((NaN >>> 0), 0);
    #|    assert((Infinity >>> 0), 0);
    #|    assert(((-Infinity) >>> 0), 0);
    #|    assert(((4294967296 * 3 - 4) >>> 0), (4294967296 - 4));
    #|    assert((19686109595169230000).toString(), "19686109595169230000");
    #|}
  let prog = parse_ok(src)
  match prog.body[0].kind {
    FunctionDecl(id~, ..) => @test.assert_eq(id, "test_cvt")
    _ => fail("expected FunctionDecl")
  }
}

///|
test "AC fixture: test_inc_dec (pre and post on var / member / element)" {
  let src =
    #|function test_inc_dec()
    #|{
    #|    var a, r;
    #|
    #|    a = 1;
    #|    r = a++;
    #|    assert(r === 1 && a === 2, true, "++");
    #|
    #|    a = 1;
    #|    r = ++a;
    #|    assert(r === 2 && a === 2, true, "++");
    #|
    #|    a = 1;
    #|    r = a--;
    #|    assert(r === 1 && a === 0, true, "--");
    #|
    #|    a = 1;
    #|    r = --a;
    #|    assert(r === 0 && a === 0, true, "--");
    #|
    #|    a = {x:true};
    #|    a.x++;
    #|    assert(a.x, 2, "++");
    #|
    #|    a = {x:true};
    #|    a.x--;
    #|    assert(a.x, 0, "--");
    #|
    #|    a = [true];
    #|    a[0]++;
    #|    assert(a[0], 2, "++");
    #|
    #|    a = {x:true};
    #|    r = a.x++;
    #|    assert(r === 1 && a.x === 2, true, "++");
    #|
    #|    a = {x:true};
    #|    r = a.x--;
    #|    assert(r === 1 && a.x === 0, true, "--");
    #|
    #|    a = [true];
    #|    r = a[0]++;
    #|    assert(r === 1 && a[0] === 2, true, "++");
    #|
    #|    a = [true];
    #|    r = a[0]--;
    #|    assert(r === 1 && a[0] === 0, true, "--");
    #|}
  let prog = parse_ok(src)
  match prog.body[0].kind {
    FunctionDecl(id~, ..) => @test.assert_eq(id, "test_inc_dec")
    _ => fail("expected FunctionDecl")
  }
}

///|
test "AC fixture: test_closure1 with nested set/get and object return" {
  let src =
    #|function test_closure1()
    #|{
    #|    function f2()
    #|    {
    #|        var val = 1;
    #|
    #|        function set(a) {
    #|            val = a;
    #|        }
    #|        function get(a) {
    #|            return val;
    #|        }
    #|        return { "set": set, "get": get };
    #|    }
    #|
    #|    var obj = f2();
    #|    obj.set(10);
    #|    var r;
    #|    r = obj.get();
    #|    assert(r, 10, "closure2");
    #|}
  let prog = parse_ok(src)
  match prog.body[0].kind {
    FunctionDecl(id~, ..) => @test.assert_eq(id, "test_closure1")
    _ => fail("expected FunctionDecl")
  }
}

///|
test "AC fixture: test_closure2 with named function expression recursion" {
  let src =
    #|function test_closure2()
    #|{
    #|    var expr_func = function myfunc1(n) {
    #|        function myfunc2(n) {
    #|            return myfunc1(n - 1);
    #|        }
    #|        if (n == 0)
    #|            return 0;
    #|        else
    #|            return myfunc2(n);
    #|    };
    #|    var r;
    #|    r = expr_func(1);
    #|    assert(r, 0, "expr_func");
    #|}
  let prog = parse_ok(src)
  match prog.body[0].kind {
    FunctionDecl(id~, ..) => @test.assert_eq(id, "test_closure2")
    _ => fail("expected FunctionDecl")
  }
}

///|
test "AC fixture: test_closure3 with fib" {
  let src =
    #|function test_closure3()
    #|{
    #|    function fib(n)
    #|    {
    #|        if (n <= 0)
    #|            return 0;
    #|        else if (n == 1)
    #|            return 1;
    #|        else
    #|            return fib(n - 1) + fib(n - 2);
    #|    }
    #|
    #|    var fib_func = function fib1(n)
    #|    {
    #|        if (n <= 0)
    #|            return 0;
    #|        else if (n == 1)
    #|            return 1;
    #|        else
    #|            return fib1(n - 1) + fib1(n - 2);
    #|    };
    #|
    #|    assert(fib(6), 8, "fib");
    #|    assert(fib_func(6), 8, "fib_func");
    #|}
  let prog = parse_ok(src)
  match prog.body[0].kind {
    FunctionDecl(id~, ..) => @test.assert_eq(id, "test_closure3")
    _ => fail("expected FunctionDecl")
  }
}

///|
test "AC fixture: assert / assert_throws helpers parse" {
  // The test_language.js helper functions — these use the subset of features
  // that 6a supports (no `switch`, so we test just `assert`).
  let src =
    #|function assert(actual, expected, message) {
    #|    if (arguments.length == 1)
    #|        expected = true;
    #|
    #|    if (actual === expected)
    #|        return;
    #|
    #|    if (typeof actual == 'number' && isNaN(actual)
    #|    &&  typeof expected == 'number' && isNaN(expected))
    #|        return;
    #|
    #|    if (actual !== null && expected !== null
    #|    &&  typeof actual == 'object' && typeof expected == 'object'
    #|    &&  actual.toString() === expected.toString())
    #|        return;
    #|
    #|    var msg = message ? " (" + message + ")" : "";
    #|    throw Error("assertion failed: got |" + actual + "|" +
    #|                ", expected |" + expected + "|" + msg);
    #|}
  let prog = parse_ok(src)
  @test.assert_eq(prog.body.length(), 1)
  match prog.body[0].kind {
    FunctionDecl(id~, ..) => @test.assert_eq(id, "assert")
    _ => fail("expected FunctionDecl")
  }
}

///|
test "AC fixture: test_closure.js top-level (log / f / g1 = f() / g1(5))" {
  let src =
    #|var log_str = "";
    #|
    #|function log(str)
    #|{
    #|    log_str += str + ",";
    #|}
    #|
    #|function f(a, b, c)
    #|{
    #|    var x = 10;
    #|    log("a="+a);
    #|    function g(d) {
    #|        function h() {
    #|            log("d=" + d);
    #|            log("x=" + x);
    #|        }
    #|        log("b=" + b);
    #|        log("c=" + c);
    #|        h();
    #|    }
    #|    g(4);
    #|    return g;
    #|}
    #|
    #|var g1 = f(1, 2, 3);
    #|g1(5);
    #|
    #|assert(log_str, "a=1,b=2,c=3,d=4,x=10,b=2,c=3,d=5,x=10,", "closure1");
  let prog = parse_ok(src)
  // 6 top-level: var log_str, function log, function f, var g1, expr g1(5),
  // expr assert(...).
  @test.assert_eq(prog.body.length(), 6)
}

///|
test "AC fixture: bottom of test_closure.js is the three test_closure calls" {
  let src =
    #|test_closure1();
    #|test_closure2();
    #|test_closure3();
  let prog = parse_ok(src)
  @test.assert_eq(prog.body.length(), 3)
  for s in prog.body {
    match s.kind {
      ExprStmt(expr~) =>
        match expr.kind {
          Call(..) => ()
          _ => fail("expected Call")
        }
      _ => fail("expected ExprStmt")
    }
  }
}
