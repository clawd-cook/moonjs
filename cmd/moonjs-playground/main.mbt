// cmd/moonjs-playground/main.mbt — playground ESM entry.
//
// `eval_and_format(source, filename)` is called by the docs website's
// `<Playground>` React component. It compiles + runs the source in a fresh
// engine that has a `print(...)` global installed, then formats the result
// (or the uncaught exception) into JS-visible strings.
//
// Design references:
// - .trellis/tasks/09-11-web-playground/prd.md   (Q1..Q6, AC, R1..R8)
// - .trellis/tasks/09-11-web-playground/design.md (module map, EvalOutput
//   contract, JS-like value formatter table, error-formatter shape)
// - .trellis/spec/backend/quality-guidelines.md   (all MoonBit style rules)
//
// Because the MoonBit js target emits ESM with `export { name as ... }`, a
// public struct like `EvalOutput` whose fields are declared `pub` on the
// MoonBit side surfaces to the caller as a plain object with the same field
// names. The React component reads `.kind`, `.value`, `.error`, `.stdout`
// straight off the returned value.

///|
/// The bundled result of a single playground evaluation.
///
/// - `kind` is `"ok"` when the script completed normally, `"error"` when an
///   exception escaped `eval_script`. (Parse / compile errors surface as
///   `SyntaxError`-shaped `JSException` values inside `eval_script`, so they
///   land in the `"error"` bucket automatically.)
/// - `value` is the JS-like string form of the completion value on success
///   (empty on error).
/// - `error` is the formatted stack trace on failure (empty on success).
/// - `stdout` is whatever `print(...)` calls emitted during the run — always
///   present, even when the run raised an exception.
///
/// All four fields are `pub` so the generated `.d.ts` exposes them and the JS
/// consumer can read them as plain properties on the returned object.
pub struct EvalOutput {
  kind : String
  value : String
  error : String
  stdout : String
}

///|
/// Shared stdout buffer. `install_print` appends to `contents` from the
/// `print` NativeFn, and `eval_and_format` snapshots it into the returned
/// `EvalOutput.stdout`. Reset to `""` at the start of every call.
///
/// Non-reentrant: a JS engine is single-threaded and the playground gates
/// every call through a Run button, so cross-call contamination is not a
/// concern for M1.
///
/// Wrapped in a struct with a `mut` field because MoonBit does not allow
/// `let mut` at module scope; a struct with a `mut` field is the idiomatic
/// substitute (MoonBit structs are reference-typed).
priv struct StdoutBuf {
  mut contents : String
}

///|
/// The single, module-level stdout buffer instance.
let stdout_buf : StdoutBuf = { contents: "", }

///|
/// Entry point invoked by the React component. Creates a fresh engine (so
/// no state leaks between Run clicks), installs the playground `print`
/// global, runs `eval_script`, and formats the outcome.
///
/// **Source transformation** — M1's compiler emits `OP_DROP` after every
/// top-level `ExprStmt`, so a naked `1 + 2` at the top level yields
/// `Undefined` from `Engine::eval_script`. To recover REPL-like semantics
/// we split `source` into `(prefix, trailing_expr)`, wrap into
/// `var _r; <prefix> _r = (<trailing_expr>);`, run that, then read `_r`
/// from the engine's global object. This mirrors the trick used by
/// `src/vm/vm_test.mbt::eval_expr_on`.
///
/// The wrapped run is tried first. If it fails (typically because the tail
/// is a statement rather than an expression, e.g. `throw new Error(...)`),
/// we re-run the original source unmodified so parse / runtime errors
/// surface with their real location.
#export_name("eval_and_format")
pub fn eval_and_format(source : String, filename : String) -> EvalOutput {
  stdout_buf.contents = ""
  let engine = @vm.Engine::new()
  install_print(engine)
  let (transformed, has_expr) = wrap_source_for_result(source)
  if has_expr {
    // Try the wrapped version first.
    let saved_stdout = stdout_buf.contents
    match engine.eval_script(transformed, filename) {
      Ok(_) => {
        let final_val = engine.globals.get_own("_r").unwrap_or(@value.Undefined)
        return {
          kind: "ok",
          value: format_js_value(final_val),
          error: "",
          stdout: stdout_buf.contents,
        }
      }
      Err(_) =>
        // Wrapped attempt failed — probably the tail is a statement
        // (throw, if, ...). Reset side-effects and fall through to the
        // raw eval.
        stdout_buf.contents = saved_stdout
    }
    // Fall through: re-run on a fresh engine so the wrapped attempt's side
    // effects don't leak.
    let engine2 = @vm.Engine::new()
    install_print(engine2)
    match engine2.eval_script(source, filename) {
      Ok(v) =>
        {
          kind: "ok",
          value: format_js_value(v),
          error: "",
          stdout: stdout_buf.contents,
        }
      Err(exc) =>
        {
          kind: "error",
          value: "",
          error: format_exception(exc),
          stdout: stdout_buf.contents,
        }
    }
  } else {
    match engine.eval_script(source, filename) {
      Ok(v) =>
        {
          kind: "ok",
          value: format_js_value(v),
          error: "",
          stdout: stdout_buf.contents,
        }
      Err(exc) =>
        {
          kind: "error",
          value: "",
          error: format_exception(exc),
          stdout: stdout_buf.contents,
        }
    }
  }
}

///|
/// Wrap the incoming source so the last expression is assigned to a synthetic
/// `_r` global. Returns `(wrapped_source, has_expr)` where `has_expr` is true
/// iff a trailing expression was found and wrapped; when false, the caller
/// falls back to the raw `eval_script` completion (which will be `Undefined`).
///
/// The split rule mirrors `src/vm/vm_test.mbt::split_prefix_expr`: walk with
/// bracket-depth tracking, find the last depth-0 statement boundary
/// (a `;` or a `}` returning to depth 0), and treat everything after as the
/// trailing expression. If the trailing text is empty (source ends with a
/// statement terminator), the previous boundary's tail is used instead.
fn wrap_source_for_result(source : String) -> (String, Bool) {
  let trimmed = source.trim().to_owned()
  if trimmed.length() == 0 {
    return (trimmed, false)
  }
  let (prefix, expr) = split_prefix_expr(trimmed)
  if expr.length() == 0 {
    return (trimmed, false)
  }
  ("var _r; " + prefix + " _r = (" + expr + ");", true)
}

///|
/// Split a source string into `(prefix_statements, trailing_expression)`.
/// See `wrap_source_for_result` for the split contract.
fn split_prefix_expr(src : String) -> (String, String) {
  let semi_code : UInt16 = 0x3BU.to_uint16()
  let lbrace : UInt16 = 0x7BU.to_uint16()
  let rbrace : UInt16 = 0x7DU.to_uint16()
  let lparen : UInt16 = 0x28U.to_uint16()
  let rparen : UInt16 = 0x29U.to_uint16()
  let lbracket : UInt16 = 0x5BU.to_uint16()
  let rbracket : UInt16 = 0x5DU.to_uint16()
  let mut last_boundary = -1
  let mut depth = 0
  for i in 0..<src.length() {
    let c = src.at(i)
    if c == lbrace || c == lparen || c == lbracket {
      depth = depth + 1
    } else if c == rbrace || c == rparen || c == rbracket {
      depth = depth - 1
      if depth == 0 && c == rbrace {
        last_boundary = i
      }
    } else if c == semi_code && depth == 0 {
      last_boundary = i
    }
  }
  if last_boundary < 0 {
    return ("", src)
  }
  let after = src[last_boundary + 1:].to_owned().trim().to_owned()
  if after.length() > 0 {
    let mut expr = after
    if expr.length() > 0 && expr.at(expr.length() - 1) == semi_code {
      expr = expr[0:expr.length() - 1].to_owned().trim().to_owned()
    }
    return (src[0:last_boundary + 1].to_owned(), expr)
  }
  // Source ends with a boundary. Scan the inner region for a previous
  // boundary so the LAST statement (before the trailing terminator) becomes
  // the reported expression.
  let inner = src[0:last_boundary].to_owned()
  let mut prev = -1
  let mut d2 = 0
  for i in 0..<inner.length() {
    let c = inner.at(i)
    if c == lbrace || c == lparen || c == lbracket {
      d2 = d2 + 1
    } else if c == rbrace || c == rparen || c == rbracket {
      d2 = d2 - 1
      if d2 == 0 && c == rbrace {
        prev = i
      }
    } else if c == semi_code && d2 == 0 {
      prev = i
    }
  }
  if prev < 0 {
    ("", inner)
  } else {
    (
      inner[0:prev + 1].to_owned(),
      inner[prev + 1:].to_owned().trim().to_owned(),
    )
  }
}

///|
/// Install a `print(...)` NativeFn onto the engine's global object. Each
/// argument is stringified with the same JS-like formatter used for the
/// final `value` field; args are joined with a single space; a trailing
/// newline is appended. Returns `Undefined` (matching QuickJS `std.print`).
fn install_print(engine : @vm.Engine) -> Unit {
  let nf = @value.NativeFunction::new("print", false, print_impl)
  engine.globals.add_property(
    "print",
    @value.NativeFn(nf),
    @value.ATTR_DEFAULT_DATA,
  )
}

///|
/// The MoonBit body for the `print` NativeFn. Kept as a top-level function so
/// no closure state escapes; the buffer it writes to is module-level.
///
/// Strings are rendered UNQUOTED (matching QuickJS `std.print` / `console.log`
/// semantics for the top level of arguments). Other values use the shared
/// display formatter.
fn print_impl(
  _this_val : @value.JSValue,
  args : Array[@value.JSValue],
) -> Result[@value.JSValue, @value.NativeError] {
  let buf = StringBuilder()
  for i in 0..<args.length() {
    if i > 0 {
      buf.write_char(' ')
    }
    buf.write_string(js_value_as_display_string(args[i]))
  }
  buf.write_char('\n')
  stdout_buf.contents = stdout_buf.contents + buf.to_string()
  Ok(@value.Undefined)
}

///|
/// Format a JSValue in a JS-like display form. Table matches design.md §2.4.
///
/// - `Undefined` -> `undefined`
/// - `Null` -> `null`
/// - `Bool` -> `true` / `false`
/// - `Int32` -> decimal integer
/// - `Number` -> integer form for integer-valued doubles, otherwise
///   `Double::to_string`; `NaN` / `Infinity` / `-Infinity` handled explicitly
/// - `Str(s)` -> JSON-style escaped, quoted string
/// - `Object` -> `[object Object]`
/// - `Function` -> `[Function: <name>]` (falls back to `anonymous`)
/// - `NativeFn` -> `[native]`
fn format_js_value(v : @value.JSValue) -> String {
  match v {
    Undefined => "undefined"
    Null => "null"
    Bool(true) => "true"
    Bool(false) => "false"
    Int32(i) => i.to_string()
    Number(d) => format_number(d)
    Str(s) => quote_string(s)
    Object(_) => "[object Object]"
    Function(f) => {
      let name = f.name()
      if name.length() == 0 {
        "[Function: anonymous]"
      } else {
        "[Function: " + name + "]"
      }
    }
    NativeFn(_) => "[native]"
  }
}

///|
/// Format a `Double` following JS `Number.prototype.toString` for the common
/// cases (NaN / +-Infinity / integer-valued / general). See design.md §2.4.
fn format_number(d : Double) -> String {
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
  let trunc = d.trunc()
  if trunc == d && d >= -9.223372036854775e18 && d <= 9.223372036854775e18 {
    let i64_val = d.to_int64()
    if i64_val.to_double() == d {
      return i64_val.to_string()
    }
  }
  d.to_string()
}

///|
/// JSON-style escape + quote a string. Backslashes, double quotes, and the
/// common control characters get escaped; the rest are written through.
/// This is deliberately independent of any JSON library so the playground
/// bundle does not pull in `moonbitlang/core/json`.
fn quote_string(s : String) -> String {
  let buf = StringBuilder()
  buf.write_char('"')
  let n = s.length()
  for i in 0..<n {
    let unit = s.at(i)
    let c = unit.to_uint().reinterpret_as_int()
    if c == 0x5C {
      // backslash
      buf.write_string("\\\\")
    } else if c == 0x22 {
      // double quote
      buf.write_string("\\\"")
    } else if c == 0x0A {
      buf.write_string("\\n")
    } else if c == 0x0D {
      buf.write_string("\\r")
    } else if c == 0x09 {
      buf.write_string("\\t")
    } else if c == 0x08 {
      buf.write_string("\\b")
    } else if c == 0x0C {
      buf.write_string("\\f")
    } else if c < 0x20 {
      buf.write_string("\\u")
      buf.write_string(pad_hex4(c))
    } else {
      // For code units >= 0x20 (including the surrogate range), write the
      // raw UTF-16 unit. `unsafe_to_char` is fine here because the code
      // unit was fetched from a MoonBit String and we are appending back
      // into a MoonBit String — the round trip is bit-identical.
      buf.write_char(unit.unsafe_to_char())
    }
  }
  buf.write_char('"')
  buf.to_string()
}

///|
/// Pad an integer < 0x10000 into a 4-hex-digit string (lowercase).
fn pad_hex4(n : Int) -> String {
  let hex = "0123456789abcdef"
  let d3 = (n >> 12) & 0xF
  let d2 = (n >> 8) & 0xF
  let d1 = (n >> 4) & 0xF
  let d0 = n & 0xF
  let buf = StringBuilder()
  buf.write_char(hex.at(d3).unsafe_to_char())
  buf.write_char(hex.at(d2).unsafe_to_char())
  buf.write_char(hex.at(d1).unsafe_to_char())
  buf.write_char(hex.at(d0).unsafe_to_char())
  buf.to_string()
}

///|
/// Format a `JSException` into a multi-line stack-trace string. Matches
/// design.md §2.5:
///
/// - First line: `"<name>: <message>"` when the thrown value is an Object
///   carrying `name` / `message` properties; otherwise the raw formatted
///   value.
/// - Each subsequent line: `    at <chunk_name> (<filename>:<line>:<col>)`.
///   Empty filenames render as `<inline>` so browser consumers see something
///   parseable.
fn format_exception(exc : @value.JSException) -> String {
  let head = format_exception_head(exc.value)
  let buf = StringBuilder()
  buf.write_string(head)
  for i in 0..<exc.stack.length() {
    let frame = exc.stack[i]
    let file = if frame.filename.length() == 0 {
      "<inline>"
    } else {
      frame.filename
    }
    buf.write_string("\n    at ")
    buf.write_string(frame.chunk_name)
    buf.write_string(" (")
    buf.write_string(file)
    buf.write_string(":")
    buf.write_string(frame.loc.line.to_int().to_string())
    buf.write_string(":")
    buf.write_string(frame.loc.col.to_int().to_string())
    buf.write_string(")")
  }
  buf.to_string()
}

///|
/// Extract the `"<name>: <message>"` header from a thrown value. When the
/// value is an Object carrying `name` and/or `message` properties (either
/// own or inherited from the Error prototype chain), format them per the
/// standard JS `Error.prototype.toString` shape. Otherwise fall back to the
/// generic value formatter.
fn format_exception_head(v : @value.JSValue) -> String {
  match v {
    Object(obj) => {
      let name_val = obj.get_property("name")
      let message_val = obj.get_property("message")
      let has_name = match name_val {
        Undefined => false
        _ => true
      }
      let has_message = match message_val {
        Undefined => false
        _ => true
      }
      let name_str = if has_name {
        js_value_as_display_string(name_val)
      } else {
        "Error"
      }
      let msg_str = if has_message {
        js_value_as_display_string(message_val)
      } else {
        ""
      }
      if msg_str.length() == 0 {
        name_str
      } else {
        name_str + ": " + msg_str
      }
    }
    _ => format_js_value(v)
  }
}

///|
/// Coerce a JSValue to its plain (unquoted) display string. Used for
/// composing the exception header: `name` and `message` come out of the
/// object as `Str(...)` and should render without JSON quotes.
fn js_value_as_display_string(v : @value.JSValue) -> String {
  match v {
    Undefined => "undefined"
    Null => "null"
    Bool(true) => "true"
    Bool(false) => "false"
    Int32(i) => i.to_string()
    Number(d) => format_number(d)
    Str(s) => s
    Object(_) => "[object Object]"
    Function(f) => {
      let name = f.name()
      if name.length() == 0 {
        "[Function: anonymous]"
      } else {
        "[Function: " + name + "]"
      }
    }
    NativeFn(_) => "[native]"
  }
}

///|
/// Reserved: keep `@lib` on the import list so downstream milestones that
/// grow the playground surface (e.g. calling `@lib.new_engine()` directly)
/// don't have to touch `moon.pkg`. Consumed via this trivial helper so the
/// `unused_import` diagnostic stays green.
pub fn engine_smoke() -> Int {
  let _ = @lib.new_engine()
  0
}
