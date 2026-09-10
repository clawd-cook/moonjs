// Value package: JSValue sum type, primitive + heap-object variants.
// Owner milestone: M1. New variants (Sym in M3, BigInt in M4) must be additive
// so bytecode / VM code encoded against M1 continues to work.

///|
/// The tagged runtime representation of every JS value produced by the engine.
///
/// `Int32` is the "fast path" for small integers that the JS spec still models
/// as `Number(Double)`; the VM promotes to `Number` on overflow or non-integer
/// results. Bit operations (`|`, `&`, `<<`, `>>>`, ...) always land back in
/// `Int32` per ES `ToInt32` / `ToUint32`. This step (M1 Step 2) only defines
/// the representation — the arithmetic promotion rules live in the VM
/// (Step 8) and are intentionally not implemented here.
///
/// `Str` uses MoonBit `String`, which is already UTF-16 code units and matches
/// JS string semantics directly (`s[i]` gives a `UInt16` charcode).
///
/// `Object` holds a heap-shared `ObjectRef`. `ObjectRef` and `ShapeRef` alias
/// their underlying structs rather than wrapping them in `@ref.Ref`: MoonBit
/// structs with mutable fields already have reference semantics (mutation
/// through any alias is visible through every alias), so the extra `Ref`
/// indirection design.md sketched would be pure overhead. This deviation is
/// noted in the design deviations section of the check report.
///
/// Equality is implemented manually rather than derived: primitives use
/// structural equality but `Object` requires identity (`physical_equal`) to
/// match JS `===` semantics for objects. `Int32` and `Number` are treated as
/// distinct variants (never equal to each other) at this layer — the VM will
/// add ES `Abstract Equality` and `Strict Equality` conversions in Step 8.
pub(all) enum JSValue {
  Undefined
  Null
  Bool(Bool)
  Int32(Int)
  Number(Double)
  Str(String)
  Object(ObjectRef)
} derive(@debug.Debug)

///|
/// Manual `Eq` because deriving is impossible: `Object(ObjectRef)` needs
/// physical (identity) equality to match JS `===` for objects, and primitives
/// need per-variant structural equality. `Int32(1) != Number(1.0)` at this
/// layer — VM Step 8 owns the promotion rules that would coerce between them.
pub impl Eq for JSValue with fn equal(self : JSValue, other : JSValue) -> Bool {
  match (self, other) {
    (Undefined, Undefined) => true
    (Null, Null) => true
    (Bool(a), Bool(b)) => a == b
    (Int32(a), Int32(b)) => a == b
    (Number(a), Number(b)) => a == b
    (Str(a), Str(b)) => a == b
    (Object(a), Object(b)) => physical_equal(a, b)
    _ => false
  }
}
