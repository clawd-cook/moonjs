// Public entry point for the MoonJS engine.
//
// The primary API is:
//     let engine = @moonjs.Engine::new()
//     match engine.eval_script(source, filename) {
//       Ok(value) => ...
//       Err(exc)  => ...
//     }
//
// Both `Engine` and its associated value / exception types are re-exported
// from the internal packages as type aliases. This keeps every downstream
// call site in a single `@moonjs.*` namespace and lets us reshape the
// underlying package layout in later milestones without breaking callers.

///|
/// The MoonJS execution engine. See `src/vm` for its implementation.
pub type Engine = @vm.Engine

///|
/// A JavaScript runtime value. See `src/value` for the enum definition and
/// the associated helper methods (`Object`, `Function`, etc.).
pub type JSValue = @value.JSValue

///|
/// An unhandled JS exception. `.value` is the thrown JSValue (typically an
/// `Error`-family object); `.stack` is the captured stack trace.
pub type JSException = @value.JSException

///|
/// A JavaScript object. Exposed here so users of the public API can inspect
/// object results (e.g. read a property from a returned Object).
pub type Object = @value.Object

///|
/// Construct a fresh MoonJS engine with the standard M1 builtins installed.
/// Equivalent to `@vm.Engine::new()`; provided at the module root for
/// discoverability.
pub fn new_engine() -> Engine {
  @vm.Engine::new()
}

///|
/// One-shot helper: create a fresh engine and evaluate a script on it.
/// Convenient for M1 smoke tests and REPL-like usage; for anything that
/// needs to share state across evaluations, construct an `Engine` manually
/// and call `eval_script` on it repeatedly.
pub fn eval_script(
  source : String,
  filename : String,
) -> Result[JSValue, JSException] {
  @vm.Engine::eval_script(@vm.Engine::new(), source, filename)
}
