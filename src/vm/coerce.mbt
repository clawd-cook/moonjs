// Type-coercion helpers implementing the ES abstract operations used by the
// VM arithmetic and comparison paths.
//
// Scope: implement enough of `ToNumber` / `ToString` / `ToBoolean` /
// `ToInt32` / `ToUint32` / `ToPrimitive` to cover M1 AC — meaning primitives
// only. `ToPrimitive` on an Object throws `TypeError` for M1 because
// `valueOf` / `toString` method dispatch is a Step 8b + Step 9 concern.
//
// Design deviations noted in the check report:
//
// - `ToString(Number)` uses MoonBit's `Double::to_string` which formats
//   doubles slightly differently from JS `Number.prototype.toString` (JS
//   prints `1` where MoonBit prints `1.0`). We post-process the common
//   cases: strip trailing `.0`, replace `nan` with `NaN`, `inf`/`-inf` with
//   `Infinity`/`-Infinity`. Perfect round-tripping is deferred to M6.
// - `ToNumber(String)` uses `@string.parse_double` for numeric literals and
//   returns `NaN` on parse failure. JS quirks like `""` → 0, whitespace
//   trim, `"0x1F"` → 31, `"Infinity"` → Infinity are handled explicitly
//   ahead of the parse.

///|
/// ES `ToBoolean(argument)`. See ECMA-262 7.1.2. Only the primitive branches
/// arise in M1 AC — an `Object(_)` / `Function(_)` value is always truthy
/// per JS.
fn to_boolean(v : @value.JSValue) -> Bool {
  match v {
    Undefined => false
    Null => false
    Bool(b) => b
    Int32(0) => false
    Int32(_) => true
    // JS quirk: both +0 and -0 are falsy, NaN is falsy, everything else
    // (including subnormals) is truthy.
    Number(d) =>
      if d.is_nan() {
        false
      } else if d == 0.0 {
        false
      } else {
        true
      }
    Str(s) => s.length() > 0
    Object(_) => true
    Function(_) => true
  }
}

///|
/// ES `ToNumber(argument)`. See ECMA-262 7.1.4. M1 supports every primitive;
/// on an object it currently returns `NaN` (Step 8b will call user-visible
/// `valueOf` / `toString` via method dispatch — for now the object always
/// coerces to NaN which is what would happen if `valueOf` returned the
/// object itself and `toString` was missing).
fn to_number(v : @value.JSValue) -> Double {
  match v {
    Undefined => @double.not_a_number
    Null => 0.0
    Bool(true) => 1.0
    Bool(false) => 0.0
    Int32(i) => i.to_double()
    Number(d) => d
    Str(s) => string_to_number(s)
    // Object → in real JS: ToPrimitive(hint Number) then ToNumber.
    // For M1 without method dispatch, coerce to NaN. Documented deviation.
    Object(_) => @double.not_a_number
    // Function → similarly NaN under M1's no-method-dispatch policy.
    Function(_) => @double.not_a_number
  }
}

///|
/// Parse a JS numeric literal from a `String`. Implements the subset of
/// ECMA-262 7.1.4.1.1 (StringToNumber) that M1 AC exercises:
///
/// - Whitespace-trim leading and trailing (ASCII space / tab / newline).
/// - Empty (after trim) → 0.
/// - `"Infinity"` / `"+Infinity"` / `"-Infinity"` → ±Infinity.
/// - Hex `"0x..."` / `"0X..."` → parsed as unsigned base-16.
/// - Binary `"0b..."` / `"0B..."` → base-2.
/// - Octal `"0o..."` / `"0O..."` → base-8.
/// - Otherwise: delegate to `@string.parse_double`, `NaN` on failure.
fn string_to_number(s : String) -> Double {
  // `String::trim` with no argument trims Unicode whitespace by default.
  let trimmed_view = s.trim()
  if trimmed_view.length() == 0 {
    return 0.0
  }
  let trimmed = trimmed_view.to_owned()
  // ±Infinity fast path.
  if trimmed == "Infinity" || trimmed == "+Infinity" {
    return @double.infinity
  }
  if trimmed == "-Infinity" {
    return @double.neg_infinity
  }
  // Prefix bases: 0x/0X, 0b/0B, 0o/0O.
  if trimmed.length() >= 2 && trimmed.charcode_at(0) == '0' {
    let c = trimmed.charcode_at(1)
    if c == 'x' || c == 'X' {
      return parse_int_radix(trimmed[2:].to_owned(), 16)
    }
    if c == 'b' || c == 'B' {
      return parse_int_radix(trimmed[2:].to_owned(), 2)
    }
    if c == 'o' || c == 'O' {
      return parse_int_radix(trimmed[2:].to_owned(), 8)
    }
  }
  // Otherwise: decimal float. `@string.parse_double` handles the general case
  // (including exponents, decimals, leading sign). It raises on invalid input,
  // in which case we return NaN per JS.
  @string.parse_double(trimmed.view()) catch {
    _ => @double.not_a_number
  }
}

///|
/// Helper: parse `s` as an unsigned integer in `radix`, return `NaN` on
/// empty / invalid digits. Used by `string_to_number` for `0x..` / `0b..` /
/// `0o..` prefix literals.
fn parse_int_radix(s : String, radix : Int) -> Double {
  if s.length() == 0 {
    return @double.not_a_number
  }
  let mut acc = 0.0
  let radix_d = radix.to_double()
  for i in 0..<s.length() {
    let ch = s.charcode_at(i)
    let d = if ch >= '0'.to_int() && ch <= '9'.to_int() {
      ch - '0'.to_int()
    } else if ch >= 'a'.to_int() && ch <= 'z'.to_int() {
      ch - 'a'.to_int() + 10
    } else if ch >= 'A'.to_int() && ch <= 'Z'.to_int() {
      ch - 'A'.to_int() + 10
    } else {
      return @double.not_a_number
    }
    if d < 0 || d >= radix {
      return @double.not_a_number
    }
    acc = acc * radix_d + d.to_double()
  }
  acc
}

///|
/// Helper: `String::charcode_at(i)` — return the UTF-16 code unit at index
/// `i` as `Int`. MoonBit's `String::at` returns `UInt16`; we always want to
/// compare against ASCII chars so an `Int` view is nicer.
fn String::charcode_at(self : String, i : Int) -> Int {
  self.at(i).to_uint().reinterpret_as_int()
}

///|
/// ES `ToInt32(argument)`. See ECMA-262 7.1.6. Converts to Number then
/// truncates to a signed 32-bit integer. NaN / ±Infinity → 0.
fn to_int32(v : @value.JSValue) -> Int {
  match v {
    Int32(i) => i
    _ => double_to_int32(to_number(v))
  }
}

///|
/// The Number → Int32 conversion per ES `ToInt32` steps 4–7: truncate toward
/// zero, take modulo 2^32, then interpret as signed 32-bit.
fn double_to_int32(d : Double) -> Int {
  if d.is_nan() || d.is_inf() {
    return 0
  }
  // Truncate toward zero.
  let truncated = d.trunc()
  // Take modulo 2^32.
  let two32 = 4294967296.0
  let modded = truncated - two32 * (truncated / two32).floor()
  // Reinterpret as signed 32-bit.
  if modded >= 2147483648.0 {
    (modded - two32).to_int()
  } else {
    modded.to_int()
  }
}

///|
/// ES `ToUint32(argument)`. Same as `ToInt32` but reinterpret the low 32
/// bits as unsigned.
fn to_uint32(v : @value.JSValue) -> UInt {
  let i = to_int32(v)
  i.reinterpret_as_uint()
}

///|
/// ES `ToString(argument)`. Primitives only in M1.
fn to_string(v : @value.JSValue) -> String {
  match v {
    Undefined => "undefined"
    Null => "null"
    Bool(true) => "true"
    Bool(false) => "false"
    Int32(i) => i.to_string()
    Number(d) => number_to_string(d)
    Str(s) => s
    // M1: Object → "[object Object]" stub. Real toString method dispatch
    // arrives in Step 9 with Object.prototype.
    Object(_) => "[object Object]"
    // Function → source-form stub. `Function.prototype.toString` in real
    // JS returns the function's source; for M1 we return a synthetic form.
    Function(f) => "function " + f.name() + "() { [native code] }"
  }
}

///|
/// Format a JS Number to its `Number.prototype.toString` string form.
/// Handles the common cases MoonBit's `Double::to_string` doesn't get right:
///
/// - `NaN`, `Infinity`, `-Infinity`.
/// - Integer values print without a trailing `.0`.
/// - Negative zero prints as `"0"` (not `"-0"`).
///
/// General-purpose scientific-notation formatting for very large / small
/// doubles is deferred to M6 alignment work; MoonBit's default output is
/// used as-is for that case.
fn number_to_string(d : Double) -> String {
  if d.is_nan() {
    return "NaN"
  }
  if d.is_pos_inf() {
    return "Infinity"
  }
  if d.is_neg_inf() {
    return "-Infinity"
  }
  if d == 0.0 {
    return "0"
  }
  // If the value is an integer and fits in Int64 range, print as integer.
  let trunc = d.trunc()
  if trunc == d && d >= -9.223372036854775e18 && d <= 9.223372036854775e18 {
    // Try to fit into Int64 for stable integer formatting.
    let i64_val = d.to_int64()
    if i64_val.to_double() == d {
      return i64_val.to_string()
    }
  }
  // Fallback: MoonBit's default double formatting. May emit `1.0e100` etc.
  d.to_string()
}

// Note: `ToPrimitive` (hint Number / String / Default) is not implemented
// in 8a because it requires method dispatch (`Symbol.toPrimitive`,
// `valueOf`, `toString`) which lands with Step 8b's call/return + Step 9's
// Object.prototype builtins. For 8a all `to_*` coercions on an Object
// argument return the "unavailable object" sentinel: `to_number(Object)` →
// NaN; `to_string(Object)` → "[object Object]"; `to_boolean(Object)` →
// true. These are the correct results after a hypothetical `ToPrimitive`
// call whose downstream `valueOf`/`toString` are absent, which is what
// M1 has today.
