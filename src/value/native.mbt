// NativeFunction: a JS-callable function implemented in MoonBit code.
//
// This is Step 9's bridge between the VM and the builtin machinery: an
// `Object` / `Error` / `TypeError` constructor exposed to script code is a
// `JSValue::NativeFn(NativeFunction)` whose `impl` field is a MoonBit closure
// invoked by `OP_CALL` / `OP_CONSTRUCT` inside the interpreter loop.
//
// Rationale for a dedicated variant (rather than reusing `Function`):
// - `Function` carries a `chunk_id` referencing bytecode; a native function
//   has no bytecode.
// - The VM must dispatch differently for the two — a bytecode function
//   creates a new `Frame`, a native function calls its `impl` synchronously
//   inline. Two variants make the dispatch fall out of a single `match`.
// - `NativeFn` participates in the JS `===` "objects compare by identity"
//   rule via `physical_equal`, same as `Object` / `Function`.
//
// Cross-package cycle avoidance: `NativeFunction::impl` uses `JSValue` in its
// signature so the whole type lives in the `value` package. The builtins
// package (which constructs the impl closures) imports `value`; nothing in
// `value` needs to know about builtins.

///|
/// Error payload for a native function's failure path. Native functions do
/// not directly construct `JSException` values — they return
/// `Result[JSValue, NativeError]`, and the VM converts the error to a proper
/// exception with a real Error object and captured stack trace.
///
/// `name` is one of "Error" / "TypeError" / "RangeError" / "SyntaxError" /
/// "ReferenceError". The VM uses this to pick the corresponding Error
/// prototype when it wraps the message into a JS Error object.
pub struct NativeError {
  name : String
  message : String
} derive(@debug.Debug)

///|
/// Constructor for a native error. Callers pass the error class name and the
/// user-visible message.
pub fn NativeError::new(name : String, message : String) -> NativeError {
  { name, message, }
}

///|
/// Accessor for the error class name.
pub fn NativeError::name(self : NativeError) -> String {
  self.name
}

///|
/// Accessor for the error message.
pub fn NativeError::message(self : NativeError) -> String {
  self.message
}

///|
/// A native (MoonBit-defined) JS-callable function. Its runtime shape:
///
/// - `name`: display name — surfaces via `Function.name`, `typeof`, and in
///   error messages ("X is not a function"). "" for anonymous.
/// - `is_constructor`: whether `new X(...)` is permitted. `true` for
///   `Object` / `Error` / etc. Native functions that must not be constructed
///   (e.g. `parseInt` in later milestones) set this to `false`.
/// - `impl`: the MoonBit body. Signature `(this_val, args) -> Result[return,
///   error]`. `this_val` is the receiver:
///   - For a plain call `X(a, b)`, `this_val` is `Undefined`.
///   - For a method call `obj.X(a, b)`, `this_val` is `Object(obj)`.
///   - For `new X(a, b)`, `this_val` is a freshly-created object whose
///     `[[Prototype]]` is `X.prototype` (see `OP_CONSTRUCT` in vm.mbt).
/// - `prototype`: the `.prototype` object attached to this function value.
///   Written by builtin initialisation via `set_prototype`, then consulted
///   by `OP_CONSTRUCT` when instantiating a new receiver. `Undefined` if
///   never assigned.
pub struct NativeFunction {
  name : String
  is_constructor : Bool
  impl_ : (JSValue, Array[JSValue]) -> Result[JSValue, NativeError]
  mut prototype : JSValue
} derive(@debug.Debug)

///|
/// Constructor for a native function. Sets `prototype` to `Undefined`;
/// builtins install a real prototype object via `set_prototype` after both
/// the function value and its prototype have been allocated (this two-step
/// dance is unavoidable because a constructor's prototype often refers back
/// to the constructor via `.constructor`, so neither can be fully wired
/// until both exist).
pub fn NativeFunction::new(
  name : String,
  is_constructor : Bool,
  impl_ : (JSValue, Array[JSValue]) -> Result[JSValue, NativeError],
) -> NativeFunction {
  { name, is_constructor, impl_, prototype: Undefined, }
}

///|
/// Function name. Used for `Function.name` and stack traces.
pub fn NativeFunction::name(self : NativeFunction) -> String {
  self.name
}

///|
/// Whether `new X(...)` is permitted.
pub fn NativeFunction::is_constructor(self : NativeFunction) -> Bool {
  self.is_constructor
}

///|
/// The `.prototype` object. `Undefined` until `set_prototype` runs.
pub fn NativeFunction::prototype(self : NativeFunction) -> JSValue {
  self.prototype
}

///|
/// Rewire the `.prototype` object. Called by builtin initialisation once the
/// constructor and its prototype have both been allocated.
pub fn NativeFunction::set_prototype(
  self : NativeFunction,
  proto : JSValue,
) -> Unit {
  self.prototype = proto
}

///|
/// Invoke the native function's body. The VM does not call this directly;
/// it goes through the higher-level `call` helper that also handles the
/// `Result[JSValue, NativeError] → JSException` conversion. This accessor
/// exists so callers that already have both `this` and args in hand can
/// invoke without duplicating the boilerplate.
pub fn NativeFunction::call(
  self : NativeFunction,
  this_val : JSValue,
  args : Array[JSValue],
) -> Result[JSValue, NativeError] {
  (self.impl_)(this_val, args)
}
