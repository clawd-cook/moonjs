///|
/// MoonJS CLI entry point.
/// Milestone M1: demonstrates the top-level `eval_script` API by running a
/// small in-memory JS snippet.
/// Milestone M5: implements `run <file>`, `-e <code>`, and QuickJS-compatible
/// argv parsing.
fn main {
  println("moonjs (M1 scaffold)")
  let program =
    #|var x = 1;
    #|var y = 2;
    #|x + y;
    #|

  match @lib.eval_script(program, "<inline>") {
    Ok(_) => println("ok: eval_script ran without exception")
    Err(exc) =>
      // Uncaught exception — dump the value's shape as diagnostic. Full
      // stack-trace formatting is M2+.
      println("uncaught: " + describe(exc.value))
  }
}

///|
/// Compact string form for a JSValue — enough to prove the CLI is wiring the
/// engine correctly. Real `toString` semantics live inside the engine and
/// are exercised by tests.
fn describe(v : @lib.JSValue) -> String {
  match v {
    Undefined => "undefined"
    Null => "null"
    Bool(b) => b.to_string()
    Int32(i) => i.to_string()
    Number(d) => d.to_string()
    Str(s) => "\"" + s + "\""
    Object(_) => "[object]"
    Function(_) => "[function]"
    NativeFn(_) => "[native]"
  }
}
