// Comparison / equality operators implementing ECMA-262 §7.2 (abstract
// equality, strict equality, abstract relational comparison).

///|
/// ES `x === y` — Strict Equality Comparison. Same-type + same-value.
///
/// - Different types → false. Exception (M1 pragmatic decision): `Int32(n)`
///   and `Number(n as Double)` compare equal, because our Int32 fast path
///   is a storage detail, not a JS-visible type. JS only has "number" as a
///   type at the language level.
/// - `NaN` never equals anything (including itself).
/// - `+0 === -0` → true (both are numeric zero; JS spec).
/// - `undefined === undefined`, `null === null` → true.
/// - Strings: character-by-character equality.
/// - Booleans: same boolean.
/// - Objects: identity (physical_equal).
fn js_strict_eq(x : @value.JSValue, y : @value.JSValue) -> Bool {
  match (x, y) {
    (Undefined, Undefined) => true
    (Null, Null) => true
    (Bool(a), Bool(b)) => a == b
    // Number-family cross-comparison: Int32 vs Number, Number vs Int32,
    // Int32 vs Int32, Number vs Number.
    (Int32(a), Int32(b)) => a == b
    (Int32(a), Number(b)) => a.to_double() == b
    (Number(a), Int32(b)) => a == b.to_double()
    (Number(a), Number(b)) =>
      // JS spec: NaN !== NaN. Double::equal already respects this.
      a == b
    (Str(a), Str(b)) => a == b
    (Object(a), Object(b)) => physical_equal(a, b)
    _ => false
  }
}

///|
/// ES `x == y` — Abstract Equality Comparison (aka "loose equality").
///
/// Rules (ECMA-262 7.2.14):
/// - Same type → StrictEquals.
/// - null == undefined (both directions) → true.
/// - Number vs String → ToNumber(String) then StrictEquals.
/// - Bool → ToNumber(Bool) then re-run.
/// - Object vs primitive → ToPrimitive(Object) then re-run. M1 stub: since
///   ToPrimitive on an Object returns Undefined (no method dispatch yet),
///   the recursion terminates: Object == Undefined is Object == null? No —
///   only null / undefined satisfy the "== primitive" branch. So M1 falls
///   through to `false` for Object == primitive comparisons where the
///   primitive isn't null/undefined. Documented deviation.
fn js_loose_eq(x : @value.JSValue, y : @value.JSValue) -> Bool {
  match (x, y) {
    // Same-type: delegate to strict.
    (Undefined, Undefined) => true
    (Null, Null) => true
    (Bool(_), Bool(_)) | (Str(_), Str(_)) => js_strict_eq(x, y)
    // null / undefined cross-equal.
    (Null, Undefined) | (Undefined, Null) => true
    // Numeric family: Int32 and Number are both "number" per JS semantics.
    (Int32(_), Int32(_))
    | (Int32(_), Number(_))
    | (Number(_), Int32(_))
    | (Number(_), Number(_)) => js_strict_eq(x, y)
    // Number/Int32 vs String → convert String to Number.
    (Int32(_), Str(_)) | (Number(_), Str(_)) =>
      js_strict_eq(x, Number(to_number(y)))
    (Str(_), Int32(_)) | (Str(_), Number(_)) =>
      js_strict_eq(Number(to_number(x)), y)
    // Bool → ToNumber, re-run.
    (Bool(_), _) => js_loose_eq(Number(to_number(x)), y)
    (_, Bool(_)) => js_loose_eq(x, Number(to_number(y)))
    // Object == Object → identity (same as strict).
    (Object(a), Object(b)) => physical_equal(a, b)
    // Object == null / undefined per spec: false. Only "IsHTMLDDA" hosts
    // permit true; we don't have those.
    (Object(_), Null)
    | (Null, Object(_))
    | (Object(_), Undefined)
    | (Undefined, Object(_)) => false
    // Object vs Number / String: would call ToPrimitive(Object) then re-run.
    // M1 without method dispatch → false. Documented.
    _ => false
  }
}

///|
/// ES `x < y` (with `left_first` = true) — Abstract Relational Comparison
/// as per ECMA-262 7.2.13, returning `Some(true) | Some(false) | None`,
/// where `None` corresponds to the spec's `undefined` result (NaN case).
///
/// - Both strings → lexicographic (UTF-16 code-unit-wise).
/// - Otherwise → ToNumber on both. If either is NaN → None.
fn abstract_relational(x : @value.JSValue, y : @value.JSValue) -> Bool? {
  // If both are strings, compare lexicographically (UTF-16 code units).
  match (x, y) {
    (Str(a), Str(b)) => Some(a < b)
    _ => {
      let a = to_number(x)
      let b = to_number(y)
      if a.is_nan() || b.is_nan() {
        None
      } else {
        Some(a < b)
      }
    }
  }
}

///|
/// JS `x < y`. Returns Bool; NaN → false.
fn js_lt(x : @value.JSValue, y : @value.JSValue) -> Bool {
  match abstract_relational(x, y) {
    Some(b) => b
    None => false
  }
}

///|
/// JS `x > y`. Uses abstract relational with operands swapped.
fn js_gt(x : @value.JSValue, y : @value.JSValue) -> Bool {
  match abstract_relational(y, x) {
    Some(b) => b
    None => false
  }
}

///|
/// JS `x <= y`. Defined as `!(y < x)` (with NaN → false override).
fn js_le(x : @value.JSValue, y : @value.JSValue) -> Bool {
  match abstract_relational(y, x) {
    Some(b) => !b
    None => false
  }
}

///|
/// JS `x >= y`. Defined as `!(x < y)` with NaN → false.
fn js_ge(x : @value.JSValue, y : @value.JSValue) -> Bool {
  match abstract_relational(x, y) {
    Some(b) => !b
    None => false
  }
}
