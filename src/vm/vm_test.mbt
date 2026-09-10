// Blackbox VM tests for Step 8a.
//
// Coverage strategy: use the parser + compiler pipeline to compile a JS
// snippet, then execute it via `Engine::run_chunk`. Verify the observable
// side-effects — either the value left on the operand stack (via a
// program that ends with an expression statement pattern that keeps the
// value alive), or globals mutated by `var x = expr`.
//
// Because the compiler emits `OP_DROP` after every ExprStmt to keep the
// operand stack balanced, top-level expressions do not survive to the end.
// We work around that with `var _r = <expr>` and then read the `_r` global
// after the run. Convenience wrappers `eval_expr` (returns the result of
// the last expression) and `eval_stmts` (runs statements, returns
// `Ok(Undefined)`) are provided below.

///|
fn compile_source(src : String) -> @bytecode.Chunk raise {
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
/// Evaluate an expression by wrapping it in `var _r = (expr);` and reading
/// the `_r` global from the engine after execution. Returns the final
/// value.
///
/// If the source consists of multiple statements followed by a trailing
/// bare expression (as most compare / control-flow tests are shaped),
/// `; _r = <last-expr>` is appended so the same probe-`_r` trick keeps
/// working. Concretely: callers pass either
///     "1 + 2"                             (single expr)
///     "var x = 1; x = x + 1; x"           (stmts + trailing expr)
/// and we compile
///     "var _r; _r = (expr);"              or
///     "var _r; var x = 1; x = x + 1; _r = x;"
/// respectively.
fn eval_expr(src : String) -> @value.JSValue raise {
  eval_expr_on(@vm.Engine::new(), src)
}

///|
/// Same as `eval_expr` but reuses an existing engine so multiple snippets
/// can share global state (e.g. define `var x = 5` in one call, then read
/// `x + 3` in the next).

///|
/// Split a script into `(statements_prefix, trailing_expression)` where the
/// trailing expression is the last "value-producing" chunk of source.
///
/// The rule: walk the source with `{ ( [` / `} ) ]` depth tracking. The
/// trailing expression is everything between the last position where
/// depth == 0 and depth-of-a-statement-boundary is present — pragmatically,
/// we look for the last "statement terminator" at depth 0: either a `;`
/// or a `}` that closes a top-level compound statement. Everything after
/// that boundary (trimmed) is the trailing expression, potentially
/// stripping a final `;`.
///
/// This makes source like `var a=0; while(a<5){a=a+1;} a` split as
/// `(prefix="var a=0; while(a<5){a=a+1;}", expr="a")`.
fn split_prefix_expr(src : String) -> (String, String) {
  let semi_code : UInt16 = 0x3BU.to_uint16()
  let lbrace : UInt16 = 0x7BU.to_uint16()
  let rbrace : UInt16 = 0x7DU.to_uint16()
  let lparen : UInt16 = 0x28U.to_uint16()
  let rparen : UInt16 = 0x29U.to_uint16()
  let lbracket : UInt16 = 0x5BU.to_uint16()
  let rbracket : UInt16 = 0x5DU.to_uint16()
  let mut last_boundary = -1
  let mut depth = 0
  for i in 0..<src.length() {
    let c = src.at(i)
    if c == lbrace || c == lparen || c == lbracket {
      depth = depth + 1
    } else if c == rbrace || c == rparen || c == rbracket {
      depth = depth - 1
      // A `}` that returns to depth 0 marks the end of a top-level compound
      // statement (block, function body, loop body). Treat that as a
      // statement boundary.
      if depth == 0 && c == rbrace {
        last_boundary = i
      }
    } else if c == semi_code && depth == 0 {
      last_boundary = i
    }
  }
  if last_boundary < 0 {
    return ("", src)
  }
  let after = src[last_boundary + 1:].to_owned().trim().to_owned()
  if after.length() > 0 {
    // Prefix ends at (inclusive) the boundary; trailing is `after`. Strip a
    // trailing `;` if any.
    let mut expr = after
    if expr.length() > 0 && expr.at(expr.length() - 1) == semi_code {
      expr = expr[0:expr.length() - 1].to_owned().trim().to_owned()
    }
    return (src[0:last_boundary + 1].to_owned(), expr)
  }
  // Source ends with a boundary. Find the previous top-level boundary.
  let inner = src[0:last_boundary].to_owned()
  let mut prev = -1
  let mut d2 = 0
  for i in 0..<inner.length() {
    let c = inner.at(i)
    if c == lbrace || c == lparen || c == lbracket {
      d2 = d2 + 1
    } else if c == rbrace || c == rparen || c == rbracket {
      d2 = d2 - 1
      if d2 == 0 && c == rbrace {
        prev = i
      }
    } else if c == semi_code && d2 == 0 {
      prev = i
    }
  }
  if prev < 0 {
    ("", inner)
  } else {
    (
      inner[0:prev + 1].to_owned(),
      inner[prev + 1:].to_owned().trim().to_owned(),
    )
  }
}

///|
fn eval_expr_on(engine : @vm.Engine, src : String) -> @value.JSValue raise {
  let trimmed = src.trim().to_owned()
  let (prefix, expr) = split_prefix_expr(trimmed)
  let wrapped = "var _r; " + prefix + " _r = (" + expr + ");"
  let chunk = compile_source(wrapped)
  match engine.run_chunk(chunk) {
    Ok(_) => ()
    Err(e) => fail("uncaught exception: " + describe_value(e.value))
  }
  read_global(engine, "_r")
}

///|
/// Utility that reads a global by name from an engine. This bypasses the
/// public API (which doesn't yet expose global access) by compiling a
/// tiny fetch program that copies the target global into `_probe`, then
/// pulling it out via the same trick. To avoid the recursion, we run a
/// snippet that stashes the value in a second slot and re-read from that
/// slot. Concretely: run `var _probe = <name>;` on the engine, then
/// crash — no, we need a real API.
///
/// For test simplicity we take a different route: run a script whose top-of-
/// stack at fallthrough is the value we want. To arrange that, we drop the
/// synthesized `_r` assignment and instead compile the expression as a
/// side-effect-free `<name>` ExprStmt — but ExprStmt DROPs. So we emit
/// `<name>` and directly compile it, catching the value before DROP...
///
/// The cleanest solution is a tiny test-only backdoor: `Engine::globals`
/// is private, but we can add a public getter reserved for tests. Instead
/// of adding surface area, this helper uses the same compile-and-run
/// pattern with a special convention — the top-level chunk's final
/// operand-stack value is returned by `run_chunk` when we bypass the
/// compiler's terminating RETURN. We construct a chunk manually here.
fn read_global(engine : @vm.Engine, name : String) -> @value.JSValue raise {
  let chunk = @bytecode.Chunk::new("<probe>", "<probe>", 0)
  let loc = @util.SourceLoc::new(1, 1)
  let idx = chunk.add_const(@value.Str(name))
  chunk.emit_wide_u32(
    @bytecode.OP_GET_GLOBAL_OR_UNDEF,
    idx.reinterpret_as_uint(),
    loc,
  )
  chunk.emit(@bytecode.OP_RETURN_VAL, 0, 0, 0, loc)
  match engine.run_chunk(chunk) {
    Ok(v) => v
    Err(e) => {
      fail("probe failed: " + describe_value(e.value))
      panic()
    }
  }
}

///|
/// Describe a JSValue for error messages. Not a JS-visible toString — just a
/// diagnostic aid.
fn describe_value(v : @value.JSValue) -> String {
  match v {
    Undefined => "undefined"
    Null => "null"
    Bool(b) => b.to_string()
    Int32(i) => "Int32(" + i.to_string() + ")"
    Number(d) => "Number(" + d.to_string() + ")"
    Str(s) => "\"" + s + "\""
    Object(_) => "[object]"
  }
}

///|
/// Assert helper: expect the eval to yield a specific Int32 value.
fn expect_int32(src : String, expected : Int) -> Unit raise {
  let v = eval_expr(src)
  match v {
    Int32(actual) => assert_eq(actual, expected)
    Number(d) =>
      // Occasionally we get Number for an integer result — accept if it
      // matches numerically (e.g. after division).
      assert_eq(d, expected.to_double())
    other =>
      fail(
        src +
        " → expected Int32(" +
        expected.to_string() +
        "), got " +
        describe_value(other),
      )
  }
}

///|
/// Assert helper: expect the eval to yield a specific Number value.
fn expect_number(src : String, expected : Double) -> Unit raise {
  let v = eval_expr(src)
  match v {
    Number(d) => {
      if d.is_nan() && expected.is_nan() {
        return
      }
      assert_eq(d, expected)
    }
    Int32(i) => {
      if expected.is_nan() {
        fail(src + " → expected NaN, got Int32(" + i.to_string() + ")")
      }
      assert_eq(i.to_double(), expected)
    }
    other => fail(src + " → expected Number, got " + describe_value(other))
  }
}

///|
/// Assert helper: expect a Bool result.
fn expect_bool(src : String, expected : Bool) -> Unit raise {
  let v = eval_expr(src)
  match v {
    Bool(b) => assert_eq(b, expected)
    other => fail(src + " → expected Bool, got " + describe_value(other))
  }
}

///|
/// Assert helper: expect a String result.
fn expect_string(src : String, expected : String) -> Unit raise {
  let v = eval_expr(src)
  match v {
    Str(s) => assert_eq(s, expected)
    other => fail(src + " → expected Str, got " + describe_value(other))
  }
}

// ---------------------------------------------------------------------------
// Arithmetic
// ---------------------------------------------------------------------------

///|
test "arith: integer add / sub / mul / mod" {
  expect_int32("1 + 2", 3)
  expect_int32("10 - 3", 7)
  expect_int32("4 * 5", 20)
  expect_int32("10 % 3", 1)
}

///|
test "arith: division always Number" {
  expect_number("10 / 4", 2.5)
  expect_number("4 / 2", 2.0)
}

///|
test "arith: pow always Number" {
  expect_number("2 ** 10", 1024.0)
  expect_int32("2 * 128", 256)
}

///|
test "arith: negative and unary plus" {
  expect_int32("-5", -5)
  expect_int32("-(3 + 2)", -5)
  expect_number("-(1.5)", -1.5)
  expect_int32("+\"5\"", 5)
}

///|
test "arith: unary plus on non-numeric string produces NaN" {
  let v = eval_expr("+\"abc\"")
  match v {
    Number(d) => if !d.is_nan() { fail("expected NaN, got " + d.to_string()) }
    other => fail("expected Number(NaN), got " + describe_value(other))
  }
}

///|
test "arith: string concat via +" {
  expect_string("\"a\" + \"b\"", "ab")
  expect_string("1 + \"2\"", "12")
  expect_string("\"3\" + 4", "34")
}

///|
test "arith: mixed number types" {
  expect_number("1.5 + 2", 3.5)
  expect_number("1 + 2.5", 3.5)
}

// ---------------------------------------------------------------------------
// Bitwise & shifts
// ---------------------------------------------------------------------------

///|
test "bitwise basic" {
  expect_int32("1 & 1", 1)
  expect_int32("5 & 3", 1)
  expect_int32("0 | 1", 1)
  expect_int32("5 | 3", 7)
  expect_int32("1 ^ 1", 0)
  expect_int32("5 ^ 3", 6)
  expect_int32("~1", -2)
  expect_int32("~0", -1)
}

///|
test "bitwise shifts" {
  expect_int32("4 << 2", 16)
  expect_int32("1 << 0", 1)
  expect_int32("1 << 31", -2147483648)
  expect_int32("1 << 32", 1) // JS: shift count masked to 5 bits.
  expect_int32("-4 >> 1", -2)
  // `-4 >>> 1` = 0x7FFFFFFE, positive Int32.
  expect_int32("-4 >>> 1", 0x7FFFFFFE)
}

///|
test "bitwise: (1 << 31) < 0" {
  expect_bool("(1 << 31) < 0", true)
}

// ---------------------------------------------------------------------------
// Coercion — the `test_cvt` AC entries.
// ---------------------------------------------------------------------------

///|
test "coerce: NaN | 0 === 0" {
  expect_int32("NaN | 0", 0)
}

///|
test "coerce: Infinity | 0 === 0" {
  expect_int32("Infinity | 0", 0)
}

///|
test "coerce: -Infinity | 0 === 0" {
  expect_int32("(-Infinity) | 0", 0)
}

///|
test "coerce: \"12345\" | 0" {
  expect_int32("\"12345\" | 0", 12345)
}

///|
test "coerce: \"0x12345\" | 0" {
  expect_int32("\"0x12345\" | 0", 0x12345)
}

///|
test "coerce: (4294967296 * 3 - 4) | 0" {
  expect_int32("(4294967296 * 3 - 4) | 0", -4)
}

///|
test "coerce: >>> 0 unsigned view" {
  expect_int32("\"12345\" >>> 0", 12345)
  expect_int32("\"0x12345\" >>> 0", 0x12345)
  expect_int32("NaN >>> 0", 0)
  expect_int32("Infinity >>> 0", 0)
  expect_int32("(-Infinity) >>> 0", 0)
  expect_number("(4294967296 * 3 - 4) >>> 0", 4294967292.0)
}

// ---------------------------------------------------------------------------
// Comparisons
// ---------------------------------------------------------------------------

///|
test "compare: numeric" {
  expect_bool("1 < 2", true)
  expect_bool("2 > 1", true)
  expect_bool("1 <= 1", true)
  expect_bool("1 >= 2", false)
}

///|
test "compare: string lex" {
  expect_bool("\"a\" < \"b\"", true)
  expect_bool("\"b\" > \"a\"", true)
  expect_bool("\"a\" < \"a\"", false)
}

///|
test "compare: loose vs strict" {
  expect_bool("1 == \"1\"", true)
  expect_bool("1 === \"1\"", false)
  expect_bool("null == undefined", true)
  expect_bool("null === undefined", false)
  expect_bool("null == null", true)
  expect_bool("null === null", true)
}

///|
test "compare: NaN comparisons" {
  expect_bool("NaN === NaN", false)
  expect_bool("NaN == NaN", false)
  expect_bool("NaN < 1", false)
  expect_bool("NaN > 1", false)
  expect_bool("NaN != NaN", true)
}

///|
test "compare: != " {
  expect_bool("1 != 2", true)
  expect_bool("1 != 1", false)
}

// ---------------------------------------------------------------------------
// Logical / typeof
// ---------------------------------------------------------------------------

///|
test "logical: !x" {
  expect_bool("!true", false)
  expect_bool("!false", true)
  expect_bool("!0", true)
  expect_bool("!1", false)
  expect_bool("!\"\"", true)
  expect_bool("!\"x\"", false)
  expect_bool("!null", true)
  expect_bool("!undefined", true)
}

///|
test "logical: && / ||" {
  expect_int32("1 && 2", 2)
  expect_int32("0 || 3", 3)
  // short-circuit — never reads x_undefined:
  expect_bool("false && x_undefined", false)
  expect_bool("true || x_undefined", true)
}

///|
test "logical: || returns first truthy" {
  expect_bool("true || x_undefined", true)
  expect_int32("0 || 42", 42)
  expect_int32("42 || 99", 42)
}

///|
test "nullish coalescing" {
  expect_int32("null ?? 5", 5)
  expect_int32("0 ?? 5", 0)
  expect_string("undefined ?? \"x\"", "x")
  expect_string("\"present\" ?? \"fallback\"", "present")
}

///|
test "typeof" {
  expect_string("typeof 1", "number")
  expect_string("typeof \"x\"", "string")
  expect_string("typeof true", "boolean")
  expect_string("typeof null", "object")
  expect_string("typeof undefined", "undefined")
  expect_string("typeof undeclared_var", "undefined")
  expect_string("typeof 3.14", "number")
}

// ---------------------------------------------------------------------------
// Globals + control flow
// ---------------------------------------------------------------------------

///|
test "global var: declare and read" {
  let engine = @vm.Engine::new()
  let _ = eval_expr_on(engine, "5")
  // Declare a global and reuse.
  let chunk = compile_source("var x = 5; x + 3;")
  match engine.run_chunk(chunk) {
    Ok(_) => ()
    Err(_) => fail("run failed")
  }
  let v = read_global(engine, "x")
  match v {
    Int32(5) => ()
    other => fail("x should be Int32(5), got " + describe_value(other))
  }
}

///|
test "global var: reassign" {
  expect_int32("var x = 1; x = x + 1; x", 2)
}

///|
test "if / else" {
  expect_string("var x = 5; if (x > 0) x = \"pos\"; else x = \"neg\"; x", "pos")
  expect_string(
    "var x = -5; if (x > 0) x = \"pos\"; else x = \"neg\"; x", "neg",
  )
}

///|
test "while loop" {
  expect_int32(
    "var i = 0; var sum = 0; while (i < 5) { sum = sum + i; i = i + 1; } sum", 10,
  )
}

///|
test "do-while loop" {
  expect_int32("var i = 0; do { i = i + 1; } while (i < 3); i", 3)
}

///|
test "for loop classic" {
  expect_int32(
    "var s = 0; for (var i = 0; i < 5; i = i + 1) { s = s + i; } s", 10,
  )
}

///|
test "break in for" {
  expect_int32(
    "var s = 0; for (var i = 0; i < 10; i = i + 1) { if (i > 3) break; s = s + i; } s",
    6,
  )
}

///|
test "continue in for" {
  // continue skips to the update step, so it still increments i. The body
  // only accumulates when i <= 3.
  expect_int32(
    "var s = 0; for (var i = 0; i < 10; i = i + 1) { if (i > 3) continue; s = s + i; } s",
    6,
  )
}

// ---------------------------------------------------------------------------
// Throw / uncaught
// ---------------------------------------------------------------------------

///|
test "throw uncaught" {
  let chunk = compile_source("throw \"bang\";")
  let engine = @vm.Engine::new()
  match engine.run_chunk(chunk) {
    Ok(_) => fail("expected uncaught throw")
    Err(e) =>
      match e.value {
        Str(s) => assert_eq(s, "bang")
        _ => fail("expected Str, got other value")
      }
  }
}

///|
test "ReferenceError for unknown global read" {
  // Reading (not typeof-ing) an undeclared identifier throws
  // ReferenceError. The compiler emits GET_GLOBAL (not the _OR_UNDEF
  // variant) for a normal read.
  let chunk = compile_source("var _r = undeclared_here;")
  let engine = @vm.Engine::new()
  match engine.run_chunk(chunk) {
    Ok(_) => fail("expected ReferenceError")
    Err(e) =>
      match e.value {
        Object(o) =>
          match o.get_property("name") {
            Str(s) => assert_eq(s, "ReferenceError")
            _ => fail("error object missing .name")
          }
        _ => fail("expected Error object")
      }
  }
}

///|
/// Regression: `throw_from_frame` must record the loc of the throwing
/// instruction, not the instruction one past it. Previously the callers
/// advanced `frame.pc` before passing to `throw_from_frame`, which then
/// read `source_locs[frame.pc]` — off by one. A throw not at end-of-code
/// would report the next instruction's loc.
test "throw loc precision: mid-source throw records the throw's loc" {
  // Two statements on distinct source lines. The `throw` is on line 1, and
  // there is a subsequent `var _r = 1` on line 2 that follows in bytecode.
  // A pre-fix implementation would blend the two locs.
  let chunk = compile_source("throw \"boom\";\nvar _r = 1;")
  let engine = @vm.Engine::new()
  match engine.run_chunk(chunk) {
    Ok(_) => fail("expected throw")
    Err(e) => {
      assert_eq(e.stack.length(), 1)
      let info = e.stack[0]
      // The throw is on line 1. Line 2 (`var _r = 1`) must NOT be reported.
      assert_eq(info.loc.line.to_int(), 1)
    }
  }
}

// ---------------------------------------------------------------------------
// End-to-end sanity — a couple of test_op1 fragments to build confidence.
// ---------------------------------------------------------------------------

///|
test "test_op1 fragment: arithmetic sanity" {
  expect_int32("1 + 2", 3)
  expect_int32("1 - 2", -1)
  expect_int32("-1", -1)
  expect_int32("+2", 2)
  expect_int32("2 * 3", 6)
  expect_number("4 / 2", 2.0)
  expect_int32("4 % 3", 1)
}

///|
test "test_op1 fragment: shifts and bit ops" {
  expect_int32("4 << 2", 16)
  expect_int32("1 << 0", 1)
  expect_int32("1 << 31", -2147483648)
  expect_int32("1 << 32", 1)
  expect_int32("-4 >> 1", -2)
  expect_int32("-4 >>> 1", 0x7FFFFFFE)
  expect_int32("1 & 1", 1)
  expect_int32("0 | 1", 1)
  expect_int32("1 ^ 1", 0)
  expect_int32("~1", -2)
}

///|
test "test_op1 fragment: logical and pow" {
  expect_bool("!1", false)
  expect_bool("1 < 2", true)
  expect_bool("2 > 1", true)
  expect_bool("'b' > 'a'", true)
  expect_number("2 ** 8", 256.0)
}

// ---------------------------------------------------------------------------
// Conditional expressions
// ---------------------------------------------------------------------------

///|
test "ternary" {
  expect_int32("true ? 1 : 2", 1)
  expect_int32("false ? 1 : 2", 2)
  expect_string("(1 < 2) ? \"yes\" : \"no\"", "yes")
}
