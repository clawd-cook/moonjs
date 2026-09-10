// JSException + StackFrameInfo: the runtime value of a thrown exception.
//
// Kept in a dedicated file (rather than lumped into value.mbt) because the VM
// (Step 8) will grow this API — pushing frames as it unwinds, formatting the
// `stack` string for `Error.prototype.stack`, etc. — and colocating the
// eventual growth in one file keeps blame history readable.

///|
/// A JS exception in flight, with the value being thrown plus a captured
/// stack trace ready to be formatted into `Error.prototype.stack`.
///
/// `value` is the actual JS value the program `throw`ed — usually an
/// `Object(_)` holding a properly-constructed `Error` (with `.name`,
/// `.message`, `.stack`), but JS permits throwing any value so this stays a
/// plain `JSValue`.
///
/// `stack` is captured eagerly at throw time. M1 attaches every frame in the
/// caller chain; M6 may optionally lazy-format the string form for cheaper
/// try/catch that never reads `.stack`.
pub struct JSException {
  value : JSValue
  stack : Array[StackFrameInfo]
} derive(@debug.Debug)

///|
/// Constructor for `JSException`. Explicit over field-literal syntax so
/// callers (VM `throw` handling, host layer) do not need to know or lock in
/// the field order — later milestones may add e.g. an `is_uncatchable`
/// marker.
pub fn JSException::new(
  value : JSValue,
  stack : Array[StackFrameInfo],
) -> JSException {
  { value, stack, }
}

///|
/// One frame of a captured stack trace. `chunk_name` is the function name for
/// user functions, `"<anonymous>"` for anonymous function expressions,
/// `"<top>"` for the top-level script frame. `filename` matches whatever the
/// engine received via `Engine::eval_script`. `loc` is the source location of
/// the currently-executing instruction (or the call site, depending on which
/// frame in the chain we are looking at) — see design.md §8.1 for the exact
/// convention the VM uses when composing this array.
pub struct StackFrameInfo {
  chunk_name : String
  filename : String
  loc : @util.SourceLoc
} derive(Eq, @debug.Debug)

///|
/// Constructor for `StackFrameInfo`. Same field-order-stability rationale as
/// `JSException::new`.
pub fn StackFrameInfo::new(
  chunk_name : String,
  filename : String,
  loc : @util.SourceLoc,
) -> StackFrameInfo {
  { chunk_name, filename, loc, }
}
