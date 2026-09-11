// M1 Acceptance-Criteria harness. Runs the seven "must pass" fixtures from
// quickjs/tests/test_language.js and quickjs/tests/test_closure.js end-to-
// end through the top-level `Engine::eval_script` API.
//
// Each fixture is composed as:
//   assert-helper prelude
// + verbatim function body from the quickjs test file
// + a top-level invocation of the function
//
// The quickjs `assert(actual, expected, message)` helper uses two features
// M1 does not implement: `arguments.length` (variadic access) and
// `isNaN(x)` (global builtin function). Both live in later milestones (M2
// resp. M3). Rather than block M1 AC on those, we substitute an M1-safe
// assert that:
//
// - defaults `expected` to `true` by checking `expected === undefined`
//   (no `arguments.length` needed);
// - detects NaN via the JS `x !== x` idiom (works for any Number without
//   depending on the `isNaN` global);
// - throws an `Error` with a diagnostic message on mismatch.
//
// The rest of each fixture is copied verbatim from the source file. If a
// specific line inside a fixture depends on a runtime feature that M1
// doesn't have yet (for example `(19686109595169230000).toString()` at
// the tail of `test_cvt`, which needs `Number.prototype.toString`), that
// line stays in the fixture and the test will simply report the failure —
// the M1 AC lets us document such gaps for later milestones without
// gating M1.
//
// Design note: these tests intentionally use `@moonjs.eval_script` (the
// public top-level API) rather than compile-and-run helpers in
// `vm_test.mbt`. That way any regression in the module's outward surface
// (Engine wiring, error surface, filename propagation) is caught here.

///|
/// Standard M1-safe assert helper prepended to every fixture. Uses only M1
/// features:
///
/// - `expected === undefined` guard (no `arguments.length`).
/// - `x !== x` NaN detection (no `isNaN`).
/// - `throw Error(...)` — string concat is enough of a message.
const ASSERT_PRELUDE : String =
  #|function assert(actual, expected, message) {
  #|  if (expected === undefined) expected = true;
  #|  if (actual === expected) return;
  #|  // NaN case: NaN !== NaN, so both operands NaN → treat as equal.
  #|  if (actual !== actual && expected !== expected) return;
  #|  var msg = message ? " (" + message + ")" : "";
  #|  throw Error("assertion failed: got |" + actual + "|" +
  #|              ", expected |" + expected + "|" + msg);
  #|}
  #|

///|
/// Body of test_op1 from quickjs/tests/test_language.js lines 50-117. Kept
/// verbatim as a raw multi-line string so future updates to the source
/// (should the quickjs upstream evolve) can be re-applied by copy-paste.
const TEST_OP1_BODY : String =
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
  #|

///|
/// Body of test_cvt from lines 119-135.
const TEST_CVT_BODY : String =
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
  #|

///|
/// Body of test_inc_dec from lines 152-199.
const TEST_INC_DEC_BODY : String =
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
  #|

///|
/// Body of the top-level `F` constructor from lines 201-204 plus test_op2 from
/// lines 206-231. test_op2 depends on `F` being in scope.
const TEST_OP2_BODY : String =
  #|function F(x)
  #|{
  #|    this.x = x;
  #|}
  #|
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
  #|

///|
/// Body of test_closure1 from quickjs/tests/test_closure.js lines 51-71.
const TEST_CLOSURE1_BODY : String =
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
  #|

///|
/// Body of test_closure2 from lines 73-87.
const TEST_CLOSURE2_BODY : String =
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
  #|

///|
/// Body of test_closure3 from lines 89-113.
const TEST_CLOSURE3_BODY : String =
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
  #|

///|
/// Diagnostic string for a JSValue — enough to inspect thrown exception
/// messages when a fixture fails.
fn ac_describe(v : @value.JSValue) -> String {
  match v {
    Undefined => "undefined"
    Null => "null"
    Bool(b) => b.to_string()
    Int32(i) => i.to_string()
    Number(d) => d.to_string()
    Str(s) => "\"" + s + "\""
    Object(o) =>
      // If it's an Error-family object, extract name + message so failures
      // in the assert helper produce a legible diagnostic.
      match (o.get_property("name"), o.get_property("message")) {
        (Str(n), Str(m)) => n + ": " + m
        (Str(n), _) => n
        _ => "[object]"
      }
    Function(f) => "[function " + f.name() + "]"
    NativeFn(nf) => "[native " + nf.name() + "]"
  }
}

///|
/// Run an M1 AC fixture: `ASSERT_PRELUDE + body + invocation`. Fails the
/// MoonBit test on parse / compile / uncaught-runtime exception; the
/// diagnostic includes the JSException's value so a failed `assert` inside
/// the fixture is legible.
fn run_ac_fixture(
  fixture_name : String,
  body : String,
  invocation : String,
) -> Unit raise {
  let source = ASSERT_PRELUDE + body + invocation
  let engine = @vm.Engine::new()
  match engine.eval_script(source, fixture_name) {
    Ok(_) => ()
    Err(exc) =>
      fail(
        fixture_name +
        " failed: " +
        ac_describe(exc.value) +
        " (stack depth=" +
        exc.stack.length().to_string() +
        ")",
      )
  }
}

// ---------------------------------------------------------------------------
// AC fixtures
// ---------------------------------------------------------------------------

///|
/// M1 AC: test_op1 — primitives, arithmetic, shifts, comparisons.
test "M1 AC test_op1" {
  run_ac_fixture("test_language.js#test_op1", TEST_OP1_BODY, "test_op1();\n")
}

///|
/// M1 AC: test_cvt — ToNumber / ToInt32 / ToUint32 conversions.
///
/// The final assertion in this fixture — `(19686109595169230000).toString()`
/// — depends on `Number.prototype.toString`, which is Step 9/M3 territory.
/// M1 currently doesn't dispatch Number method calls, so this assertion is
/// expected to fail. The rest of the fixture (bitwise coercion) exercises
/// exclusively M1 features.
test "M1 AC test_cvt" {
  run_ac_fixture("test_language.js#test_cvt", TEST_CVT_BODY, "test_cvt();\n")
}

///|
/// M1 AC: test_inc_dec — ++ / -- pre/post on identifier, member, index.
test "M1 AC test_inc_dec" {
  run_ac_fixture(
    "test_language.js#test_inc_dec",
    TEST_INC_DEC_BODY,
    "test_inc_dec();\n",
  )
}

///|
/// M1 AC: test_op2 — `new`, `in`, `instanceof`, `typeof`, reserved-word
/// object keys.
test "M1 AC test_op2" {
  run_ac_fixture("test_language.js#test_op2", TEST_OP2_BODY, "test_op2();\n")
}

///|
/// M1 AC: test_closure1 — returning an object with get/set closures over a
/// shared local.
test "M1 AC test_closure1" {
  run_ac_fixture(
    "test_closure.js#test_closure1",
    TEST_CLOSURE1_BODY,
    "test_closure1();\n",
  )
}

///|
/// M1 AC: test_closure2 — named function expression self-recursion via a
/// nested inner function.
test "M1 AC test_closure2" {
  run_ac_fixture(
    "test_closure.js#test_closure2",
    TEST_CLOSURE2_BODY,
    "test_closure2();\n",
  )
}

///|
/// M1 AC: test_closure3 — recursive `fib` (both declaration form and named
/// function expression form).
test "M1 AC test_closure3" {
  run_ac_fixture(
    "test_closure.js#test_closure3",
    TEST_CLOSURE3_BODY,
    "test_closure3();\n",
  )
}

///|
/// M1 AC: sequenced top-level invocation of test_closure1..3 in one script.
/// Mirrors the actual `test_closure.js` tail (`test_closure1();
/// test_closure2(); test_closure3();`).
test "M1 AC test_closure1..3 sequence" {
  let sequence = "test_closure1(); test_closure2(); test_closure3();\n"
  let combined = TEST_CLOSURE1_BODY +
    "\n" +
    TEST_CLOSURE2_BODY +
    "\n" +
    TEST_CLOSURE3_BODY +
    "\n"
  run_ac_fixture(
    "test_closure.js#test_closure1..3 sequence", combined, sequence,
  )
}
