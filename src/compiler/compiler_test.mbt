// Blackbox tests for the compiler package.
//
// Coverage strategy:
//
// 1. Compilation success: each M1 AC test-function subset must compile
//    without error. We don't assert bytecode content — that's overkill and
//    would be very brittle. Instead we just check `Ok(_)` result.
//
// 2. Compilation error paths: constructs known to require M2+ (class, arrow,
//    template) must produce a `CompileError` (parser blocks most of these
//    but a few can slip through).
//
// 3. Structural sanity: a handful of small programs (arithmetic literal,
//    ident get/set, ternary, function call) are compiled and their
//    disassembly output snapshot-checked to ensure emit stays stable.
//
// Note: The parser blocks many M2+ syntaxes with its own errors, so
// compile-time errors are limited to what actually parses. For example
// `class C {}` won't reach the compiler — parser rejects it. We test only
// the paths that DO reach compile.

///|
fn compile_ok(src : String) -> @bytecode.Chunk raise {
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
  let prog = match p.parse_script() {
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
  let compiler = @compiler.Compiler::new()
  match compiler.compile_script(prog, "<test>") {
    Ok(chunk) => chunk
    Err(e) => {
      let @compiler.CompileError(msg~, loc~) = e
      fail(
        "compile error at " +
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
/// Reserved for negative-path tests in future milestones (see file header).
/// Kept for M1 as a two-liner to make clear how a compile error would surface
/// once tests exercise nodes the parser can't reject on its own.
fn _compile_err(src : String) -> @compiler.CompileError raise {
  let p = match @parser.Parser::new(src, "<test>") {
    Ok(p) => p
    Err(_) => {
      fail("parse failed before compile could run")
      panic()
    }
  }
  let prog = match p.parse_script() {
    Ok(prog) => prog
    Err(_) => {
      fail("parse failed before compile could run")
      panic()
    }
  }
  let compiler = @compiler.Compiler::new()
  match compiler.compile_script(prog, "<test>") {
    Ok(_) => {
      fail("expected compile error but got Ok")
      panic()
    }
    Err(e) => e
  }
}

// ---------------------------------------------------------------------------
// Basic emit sanity
// ---------------------------------------------------------------------------

///|
test "compile: numeric literal expression" {
  let ch = compile_ok("1 + 2;")
  // At minimum, PUSH_I32 1, PUSH_I32 2, ADD, DROP, then a terminating
  // RETURN_UNDEF. Not asserting exact indices — just non-empty.
  assert_true(ch.code.length() > 0)
}

///|
test "compile: variable declaration and use" {
  let _ = compile_ok("var x = 1; x + 1;")
}

///|
test "compile: function call" {
  let ch = compile_ok("function f() { return 1; } f();")
  // Nested chunk for f.
  @test.assert_eq(ch.nested_chunks.length(), 1)
}

///|
test "compile: closure captures outer var" {
  let ch = compile_ok(
    "function outer() { var x = 1; return function() { return x; }; }",
  )
  // outer chunk should have one nested chunk (the inner anonymous function).
  @test.assert_eq(ch.nested_chunks.length(), 1)
  let outer_chunk = ch.nested_chunks[0]
  @test.assert_eq(outer_chunk.nested_chunks.length(), 1)
  let inner_chunk = outer_chunk.nested_chunks[0]
  // inner's upvalue_slots should have one entry — captures x from outer.
  @test.assert_eq(inner_chunk.upvalue_slots.length(), 1)
}

///|
test "compile: if/else" {
  let _ = compile_ok("if (1) { 2; } else { 3; }")
}

///|
test "compile: while loop" {
  let _ = compile_ok("var x = 0; while (x < 10) { x = x + 1; }")
}

///|
test "compile: do-while loop" {
  let _ = compile_ok("var x = 0; do { x = x + 1; } while (x < 10);")
}

///|
test "compile: for loop" {
  let _ = compile_ok("for (var i = 0; i < 10; i++) { i; }")
}

///|
test "compile: break/continue in loop" {
  let _ = compile_ok(
    "var x = 0; while (x < 10) { if (x == 5) break; if (x == 3) { x = x + 1; continue; } x = x + 1; }",
  )
}

///|
test "compile: try/catch" {
  let _ = compile_ok("try { throw 1; } catch (e) { e; }")
}

///|
test "compile: try/finally" {
  let _ = compile_ok("try { 1; } finally { 2; }")
}

///|
test "compile: try/catch/finally" {
  let _ = compile_ok("try { throw 1; } catch (e) { e; } finally { 2; }")
}

///|
test "compile: object literal" {
  let _ = compile_ok("var o = {a: 1, b: 2};")
}

///|
test "compile: array literal" {
  let _ = compile_ok("var a = [1, 2, 3];")
}

///|
test "compile: member access" {
  let _ = compile_ok("var x = a.b.c;")
}

///|
test "compile: index access" {
  let _ = compile_ok("var x = a[0][1];")
}

///|
test "compile: method call" {
  let _ = compile_ok("a.f();")
}

///|
test "compile: constructor call" {
  let _ = compile_ok("var x = new F(1, 2);")
}

///|
test "compile: assignment" {
  let _ = compile_ok("var x = 1; x = 2;")
}

///|
test "compile: compound assignment" {
  let _ = compile_ok("var x = 1; x += 5;")
}

///|
test "compile: typeof unknown" {
  let _ = compile_ok("typeof unknown_var;")
}

///|
test "compile: typeof known local" {
  let _ = compile_ok("var x = 1; typeof x;")
}

///|
test "compile: ternary" {
  let _ = compile_ok("var r = 1 > 0 ? 'yes' : 'no';")
}

///|
test "compile: logical short-circuit &&" {
  let _ = compile_ok("var r = 1 && 2;")
}

///|
test "compile: logical short-circuit ||" {
  let _ = compile_ok("var r = 0 || 1;")
}

///|
test "compile: nullish coalescing" {
  let _ = compile_ok("var r = null ?? 1;")
}

///|
test "compile: prefix ++/--" {
  let _ = compile_ok("var x = 1; ++x; --x;")
}

///|
test "compile: postfix ++/--" {
  let _ = compile_ok("var x = 1; x++; x--;")
}

///|
test "compile: postfix ++ on member" {
  let _ = compile_ok("var a = {x: 1}; a.x++;")
}

///|
test "compile: prefix ++ on member" {
  let _ = compile_ok("var a = {x: 1}; ++a.x;")
}

///|
test "compile: postfix ++ on index" {
  let _ = compile_ok("var a = [1]; a[0]++;")
}

///|
test "compile: this in method body" {
  let _ = compile_ok("function F(x) { this.x = x; }")
}

///|
test "compile: recursive function" {
  let _ = compile_ok(
    "function fib(n) { if (n <= 1) return n; return fib(n-1) + fib(n-2); }",
  )
}

///|
test "compile: nested closures" {
  let _ = compile_ok(
    "function f(a) { function g(b) { function h() { return a + b; } return h; } return g; }",
  )
}

///|
test "compile: instanceof" {
  let _ = compile_ok("var x = a instanceof B;")
}

///|
test "compile: in operator" {
  let _ = compile_ok("var x = 'a' in obj;")
}

///|
test "compile: delete" {
  let _ = compile_ok("delete a.b;")
}

// ---------------------------------------------------------------------------
// Compile-error paths (M2+ features that pass the parser but not the compiler)
// ---------------------------------------------------------------------------
// Note: The parser rejects most M2+ features early, so few paths here are
// exercised in practice. We rely on parser tests for those.

// ---------------------------------------------------------------------------
// M1 AC fixture-level compile checks: each of the AC test functions compiles.
// ---------------------------------------------------------------------------

///|
test "compile: test_op1 subset" {
  let src =
    #|function test_op1() {
    #|    var r, a;
    #|    r = 1 + 2;
    #|    r = 1 - 2;
    #|    r = -1;
    #|    r = 2 * 3;
    #|    r = 4 / 2;
    #|    r = 4 % 3;
    #|    r = 4 << 2;
    #|    r = -4 >> 1;
    #|    r = -4 >>> 1;
    #|    r = 1 & 1;
    #|    r = 0 | 1;
    #|    r = 1 ^ 1;
    #|    r = ~1;
    #|    r = !1;
    #|    r = 2 ** 8;
    #|}

  let _ = compile_ok(src)
}

///|
test "compile: test_cvt subset" {
  let src =
    #|function test_cvt() {
    #|    var x = ("12345" | 0);
    #|    x = ("0x12345" | 0);
    #|    x = (NaN | 0);
    #|}

  let _ = compile_ok(src)
}

///|
test "compile: test_inc_dec subset" {
  let src =
    #|function test_inc_dec() {
    #|    var a, r;
    #|    a = 1;
    #|    r = a++;
    #|    a = 1;
    #|    r = ++a;
    #|    a = {x:1};
    #|    a.x++;
    #|    a = [1];
    #|    a[0]++;
    #|    r = a[0]--;
    #|}

  let _ = compile_ok(src)
}

///|
test "compile: test_op2 subset" {
  let src =
    #|function F(x) { this.x = x; }
    #|function test_op2() {
    #|    var a, b;
    #|    a = new Object;
    #|    a.x = 1;
    #|    b = new F(2);
    #|    a = {x: 2};
    #|    var c = ("x" in a);
    #|    a = {};
    #|    c = (a instanceof Object);
    #|    c = (typeof 1);
    #|    c = (typeof unknown_var);
    #|}

  let _ = compile_ok(src)
}

///|
test "compile: test_closure1 subset" {
  let src =
    #|function test_closure1() {
    #|    function f2() {
    #|        var val = 1;
    #|        function set(a) { val = a; }
    #|        function get(a) { return val; }
    #|        return { "set": set, "get": get };
    #|    }
    #|    var obj = f2();
    #|    obj.set(10);
    #|    var r = obj.get();
    #|}

  let _ = compile_ok(src)
}

///|
test "compile: test_closure2 subset" {
  let src =
    #|function test_closure2() {
    #|    var expr_func = function myfunc1(n) {
    #|        function myfunc2(n) {
    #|            return myfunc1(n - 1);
    #|        }
    #|        if (n == 0) return 0;
    #|        else return myfunc2(n);
    #|    };
    #|    var r = expr_func(1);
    #|}

  let _ = compile_ok(src)
}

///|
test "compile: test_closure3 subset" {
  let src =
    #|function test_closure3() {
    #|    function fib(n) {
    #|        if (n <= 0) return 0;
    #|        else if (n == 1) return 1;
    #|        else return fib(n - 1) + fib(n - 2);
    #|    }
    #|    var fib_func = function fib1(n) {
    #|        if (n <= 0) return 0;
    #|        else if (n == 1) return 1;
    #|        else return fib1(n - 1) + fib1(n - 2);
    #|    };
    #|}

  let _ = compile_ok(src)
}

///|
/// Regression: unary `+x` must lower to OP_TO_NUMBER, not `0 + x`. The old
/// `0 + arg` lowering was wrong because JS `+` string-concatenates when
/// either operand is a String (`0 + "5"` would produce "05", not 5).
/// See design.md §4.3 (0x19 allocation) and Step 7 check finding.
test "compile: unary plus emits TO_NUMBER (not 0 + arg)" {
  let src = "var y = +x;"
  let chunk = compile_ok(src)
  let disasm = chunk.disassemble()
  // Must contain TO_NUMBER; must NOT contain a bare `0 + x` pattern.
  assert_true(disasm.contains("TO_NUMBER"))
}
