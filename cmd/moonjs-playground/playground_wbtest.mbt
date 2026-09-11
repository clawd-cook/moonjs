// Whitebox tests for the moonjs-playground package.
//
// These are executed natively (via `moon test --target native`) and verify
// that the MoonBit-side `eval_and_format` API produces the expected
// `EvalOutput` shape: value / stdout / error strings for the sample inputs
// the docs Playground exercises. The JS-target smoke test (invoking the
// linked bundle from Node) lives in the site build workflow, not here.
//
// Whitebox rather than blackbox because the package is a `foreign_library`
// (cmd-style crate). Blackbox tests import the package as `@name`, which is
// only supported for regular libraries — for a foreign_library / executable
// we reference the module-level functions directly, without an `@` prefix.

///|
test "eval_and_format: 1 + 2 -> ok, value 3" {
  let out = eval_and_format("1 + 2", "<t>")
  @test.assert_eq(out.kind, "ok")
  @test.assert_eq(out.value, "3")
  @test.assert_eq(out.error, "")
  @test.assert_eq(out.stdout, "")
}

///|
test "eval_and_format: print then 42 -> stdout and value" {
  let out = eval_and_format("print(\"hello\"); 42", "<t>")
  @test.assert_eq(out.kind, "ok")
  @test.assert_eq(out.value, "42")
  @test.assert_eq(out.stdout, "hello\n")
}

///|
test "eval_and_format: throw new Error(\"boom\") -> error kind with message" {
  let out = eval_and_format("throw new Error(\"boom\")", "<t>")
  @test.assert_eq(out.kind, "error")
  @test.assert_eq(out.value, "")
  assert_true(out.error.contains("boom"))
  // Stack line format: `    at <chunk> (<file>:<line>:<col>)`.
  assert_true(out.error.contains("at "))
  assert_true(out.error.contains(":"))
}

///|
test "eval_and_format: function returning \"x\" -> quoted string value" {
  let src =
    #|function f(){return "x"} f()
  let out = eval_and_format(src, "<t>")
  @test.assert_eq(out.kind, "ok")
  @test.assert_eq(out.value, "\"x\"")
}

///|
test "eval_and_format: undefined literal" {
  let out = eval_and_format("undefined", "<t>")
  @test.assert_eq(out.kind, "ok")
  @test.assert_eq(out.value, "undefined")
}

///|
test "eval_and_format: null literal" {
  let out = eval_and_format("null", "<t>")
  @test.assert_eq(out.kind, "ok")
  @test.assert_eq(out.value, "null")
}

///|
test "eval_and_format: booleans" {
  let t = eval_and_format("true", "<t>")
  @test.assert_eq(t.value, "true")
  let f = eval_and_format("false", "<t>")
  @test.assert_eq(f.value, "false")
}

///|
test "eval_and_format: fib(6) -> 8" {
  let src =
    #|function fib(n) { return n < 2 ? n : fib(n-1) + fib(n-2); }
    #|fib(6)
  let out = eval_and_format(src, "<t>")
  @test.assert_eq(out.kind, "ok")
  @test.assert_eq(out.value, "8")
}

///|
test "eval_and_format: consecutive calls reset stdout" {
  let a = eval_and_format("print(\"first\"); 1", "<t>")
  @test.assert_eq(a.stdout, "first\n")
  let b = eval_and_format("2", "<t>")
  @test.assert_eq(b.stdout, "")
}

///|
test "eval_and_format: print with multiple args -> space-joined" {
  let out = eval_and_format("print(\"a\", 1, true); undefined", "<t>")
  @test.assert_eq(out.stdout, "a 1 true\n")
}

///|
test "eval_and_format: SyntaxError from parser is surfaced as error" {
  let out = eval_and_format("var x = ;", "<t>")
  @test.assert_eq(out.kind, "error")
  assert_true(out.error.length() > 0)
}

///|
test "eval_and_format: NaN and Infinity" {
  let n = eval_and_format("NaN", "<t>")
  @test.assert_eq(n.value, "NaN")
  let inf = eval_and_format("Infinity", "<t>")
  @test.assert_eq(inf.value, "Infinity")
  let neg_inf = eval_and_format("-Infinity", "<t>")
  @test.assert_eq(neg_inf.value, "-Infinity")
}

///|
test "engine_smoke returns 0" {
  @test.assert_eq(engine_smoke(), 0)
}
