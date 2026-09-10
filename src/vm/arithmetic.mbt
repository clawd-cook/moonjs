// JS binary/unary arithmetic implementation, called from the main-loop op
// arms. Kept separate from `vm.mbt` so the arithmetic rules — which are
// dense but self-contained — can be tested in isolation and evolved without
// forcing a re-read of the loop dispatch.
//
// Fast-path rule: two `Int32` operands stay in `Int32` when the result fits
// in a signed 32-bit range. Overflow / non-integer results promote to
// `Number(Double)`. This keeps the hot integer path allocation-free (well,
// as free as MoonBit's variant allocation lets us — see design.md §12.1).

///|
/// JS `x + y`. When either operand is a String, JS concatenates ToString(x)
/// with ToString(y). Otherwise, numeric addition on ToNumber-coerced
/// operands, preserving the Int32 fast path.
fn js_add(x : @value.JSValue, y : @value.JSValue) -> @value.JSValue {
  // String path: either operand string → concat both after ToString.
  match (x, y) {
    (Str(_), _) | (_, Str(_)) => Str(to_string(x) + to_string(y))
    (Int32(a), Int32(b)) => int32_add(a, b)
    _ => Number(to_number(x) + to_number(y))
  }
}

///|
/// Add two Int32 values, promoting to `Number(Double)` on overflow.
/// Detection: perform the add on `Int64` and check if the result is outside
/// the signed 32-bit range.
fn int32_add(a : Int, b : Int) -> @value.JSValue {
  let sum : Int64 = a.to_int64() + b.to_int64()
  if sum >= -2147483648L && sum <= 2147483647L {
    Int32(sum.to_int())
  } else {
    Number(sum.to_double())
  }
}

///|
/// JS `x - y`. Numeric subtraction on ToNumber-coerced operands. Int32 fast
/// path preserved when both operands are Int32 and the result fits.
fn js_sub(x : @value.JSValue, y : @value.JSValue) -> @value.JSValue {
  match (x, y) {
    (Int32(a), Int32(b)) => {
      let diff : Int64 = a.to_int64() - b.to_int64()
      if diff >= -2147483648L && diff <= 2147483647L {
        Int32(diff.to_int())
      } else {
        Number(diff.to_double())
      }
    }
    _ => Number(to_number(x) - to_number(y))
  }
}

///|
/// JS `x * y`. Numeric multiplication with Int32 fast path.
fn js_mul(x : @value.JSValue, y : @value.JSValue) -> @value.JSValue {
  match (x, y) {
    (Int32(a), Int32(b)) => {
      let prod : Int64 = a.to_int64() * b.to_int64()
      if prod >= -2147483648L && prod <= 2147483647L {
        Int32(prod.to_int())
      } else {
        Number(prod.to_double())
      }
    }
    _ => Number(to_number(x) * to_number(y))
  }
}

///|
/// JS `x / y`. Always returns `Number` — even integer division: `4 / 2` in
/// JS is `2` (a Number, which for us we still emit as Number for
/// consistency because JS `Number.isInteger(4/2)` is true regardless of
/// storage). Division by zero yields ±Infinity / NaN per IEEE-754.
fn js_div(x : @value.JSValue, y : @value.JSValue) -> @value.JSValue {
  let a = to_number(x)
  let b = to_number(y)
  let r = a / b
  // JS division returns Number even when result is integral. Rebuild Int32
  // only if the result is an integer AND both inputs were Int32 (rare — most
  // code that reaches division wants Number). Simpler and spec-faithful:
  // always return Number here.
  Number(r)
}

///|
/// JS `x % y`. Remainder with IEEE-754 rules. NaN / division-by-zero
/// behaviour follows the standard `Double::mod` semantics.
fn js_mod(x : @value.JSValue, y : @value.JSValue) -> @value.JSValue {
  match (x, y) {
    (Int32(a), Int32(b)) =>
      if b != 0 {
        // JS `%` on integers matches truncated remainder (sign of dividend).
        Int32(a - a / b * b)
      } else {
        Number(@double.not_a_number)
      }
    _ => {
      let a = to_number(x)
      let b = to_number(y)
      Number(a.mod(b))
    }
  }
}

///|
/// JS `x ** y`. `Math.pow`. Always Number.
fn js_pow(x : @value.JSValue, y : @value.JSValue) -> @value.JSValue {
  let a = to_number(x)
  let b = to_number(y)
  Number(@math.pow(a, b))
}

///|
/// JS unary `-x`. Preserves Int32 for `Int32(x)` when `-x` still fits (i.e.
/// x != Int.min_value). Otherwise promotes to Number.
///
/// Also, `-0` is a JS thing: `-Int32(0)` should ideally produce `Number(-0.0)`
/// per JS semantics (`Object.is(-0, 0)` is false; typeof (-0) is "number").
/// M1 preserves the Int32 fast path even for `-0` — matches QuickJS's small-
/// integer handling and lets subsequent arithmetic use the fast path. Full
/// -0 fidelity is deferred to M6.
fn js_neg(x : @value.JSValue) -> @value.JSValue {
  match x {
    Int32(i) =>
      if i == -2147483648 {
        // Would overflow signed 32-bit; promote.
        Number(-i.to_double())
      } else {
        Int32(-i)
      }
    _ => Number(-to_number(x))
  }
}

///|
/// JS `~x`. Bitwise NOT after `ToInt32`. Always Int32 result.
fn js_bnot(x : @value.JSValue) -> @value.JSValue {
  Int32(to_int32(x).lnot())
}

///|
/// JS `x & y`. Bitwise AND after `ToInt32` on both.
fn js_band(x : @value.JSValue, y : @value.JSValue) -> @value.JSValue {
  Int32(to_int32(x).land(to_int32(y)))
}

///|
/// JS `x | y`. Bitwise OR after `ToInt32`.
fn js_bor(x : @value.JSValue, y : @value.JSValue) -> @value.JSValue {
  Int32(to_int32(x).lor(to_int32(y)))
}

///|
/// JS `x ^ y`. Bitwise XOR after `ToInt32`.
fn js_bxor(x : @value.JSValue, y : @value.JSValue) -> @value.JSValue {
  Int32(to_int32(x).lxor(to_int32(y)))
}

///|
/// JS `x << y`. Left shift. Shift count is masked with `0x1F` (JS masks the
/// low 5 bits of the RHS). Result is Int32.
fn js_shl(x : @value.JSValue, y : @value.JSValue) -> @value.JSValue {
  let lhs = to_int32(x)
  let shift = to_uint32(y).land(0x1FU).reinterpret_as_int()
  // Perform the shift as unsigned to avoid MoonBit undefined-behavior on
  // shifting a negative Int; reinterpret back to signed.
  let u = lhs.reinterpret_as_uint()
  let shifted = u << shift
  Int32(shifted.reinterpret_as_int())
}

///|
/// JS `x >> y`. Signed (arithmetic) right shift. Shift count is masked with
/// `0x1F`.
fn js_shr(x : @value.JSValue, y : @value.JSValue) -> @value.JSValue {
  let lhs = to_int32(x)
  let shift = to_uint32(y).land(0x1FU).reinterpret_as_int()
  Int32(lhs >> shift)
}

///|
/// JS `x >>> y`. Unsigned right shift. Shift count is masked with `0x1F`.
/// The result is a Uint32 stored in Int32's bit slot; the JS-visible value
/// (as a Number) is `to_uint32(result)` — but since our operand stack holds
/// Int32 in the fast path, we push the bit pattern and let downstream
/// conversions (e.g. `assert(v >= 0)`) go through `to_number` which
/// reinterprets correctly.
///
/// M1 subtlety: `-4 >>> 1` must produce `0x7FFFFFFE` (positive number in
/// JS). Storing that in Int32 gives us `0x7FFFFFFE` which is positive and
/// prints as `2147483646`. If the top bit is set, we would store as a
/// negative Int32 — but JS never allows the top bit to be set after `>>>`
/// with a nonzero shift because `>>>` inherently makes the result unsigned.
/// Special case: `x >>> 0` when x has top bit set would produce a value
/// > 2^31-1 → we must promote to Number.
fn js_ushr(x : @value.JSValue, y : @value.JSValue) -> @value.JSValue {
  let lhs = to_uint32(x)
  let shift = to_uint32(y).land(0x1FU).reinterpret_as_int()
  let result = lhs >> shift
  // If result fits in signed 32-bit non-negative range, stay Int32.
  if result <= 2147483647U {
    Int32(result.reinterpret_as_int())
  } else {
    // >>> can produce values in [2^31, 2^32) which don't fit in signed
    // Int32; promote to Number so the JS-visible value is correct.
    Number(result.to_double())
  }
}
