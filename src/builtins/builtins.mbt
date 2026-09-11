// Builtins package: constructors, prototypes, and global-object seeding for
// the ECMAScript standard library skeleton.
//
// This is Step 9's core deliverable. M1 only lands the objects that AC
// requires:
//
//   - Object / Object.prototype
//   - Function.prototype (no `Function` constructor — `new Function(...)`
//     needs eval, which is M2+)
//   - Array.prototype (fresh `[]` links its proto here)
//   - String.prototype (skeleton; `test_op2` uses `instanceof String`)
//   - Error / Error.prototype
//   - TypeError, RangeError, SyntaxError, ReferenceError (constructors and
//     prototypes, each of whose proto is Error.prototype)
//
// M3 will inflate this package with the real `Object.prototype.toString`,
// `Array.prototype.push`, etc. — for M1 the prototypes are near-empty:
// they carry `name` / `message` where JS spec demands it and otherwise
// serve as identity anchors for `instanceof`.
//
// Design notes:
//
// - Prototypes are built with `Object::new(Shape::new(), Null)`, so a fresh
//   prototype's `[[Prototype]]` starts as `Null`. We then use `set_proto`
//   to link them appropriately (e.g. Function.prototype's proto is
//   Object.prototype).
// - Constructors are `@value.NativeFunction`. Their `.prototype` is wired
//   via `set_prototype` after both objects exist.
// - `install_into(globals)` registers each constructor as a global by name
//   plus the value-shaped globals (`undefined`, `NaN`, `Infinity`,
//   `globalThis`).

///|
/// The M1 builtin registry. Owns the prototype objects and constructor
/// values that get exposed on the global object.
///
/// This struct is intentionally not `pub(all)`: the vm package only needs
/// to construct one, read the prototype references, and install into a
/// globals object. Field access outside `builtins` goes through accessors.
pub struct Builtins {
  object_proto : @value.Object
  function_proto : @value.Object
  array_proto : @value.Object
  string_proto : @value.Object
  error_proto : @value.Object
  type_error_proto : @value.Object
  range_error_proto : @value.Object
  syntax_error_proto : @value.Object
  reference_error_proto : @value.Object
  object_ctor : @value.NativeFunction
  error_ctor : @value.NativeFunction
  type_error_ctor : @value.NativeFunction
  range_error_ctor : @value.NativeFunction
  syntax_error_ctor : @value.NativeFunction
  reference_error_ctor : @value.NativeFunction
}

///|
/// Accessor: Object.prototype. Used by the VM when it materialises a fresh
/// object literal (`{}` or `new Object`) — the new object's `[[Prototype]]`
/// must be Object.prototype so `hasOwnProperty` etc. work in later
/// milestones.
pub fn Builtins::object_proto(self : Builtins) -> @value.Object {
  self.object_proto
}

///|
/// Accessor: Function.prototype. Not used by VM opcodes yet in M1 (function
/// values don't have proto links to Function.prototype until we grow real
/// callable objects — Step 9 lays the pieces, later milestones connect
/// them). Exposed for symmetry.
pub fn Builtins::function_proto(self : Builtins) -> @value.Object {
  self.function_proto
}

///|
/// Accessor: Array.prototype. The VM's `OP_NEW_ARRAY` links a fresh array's
/// proto here.
pub fn Builtins::array_proto(self : Builtins) -> @value.Object {
  self.array_proto
}

///|
/// Accessor: String.prototype. Used for `String` instance links (M3 grows
/// this to include real string methods).
pub fn Builtins::string_proto(self : Builtins) -> @value.Object {
  self.string_proto
}

///|
/// Accessor: Error.prototype.
pub fn Builtins::error_proto(self : Builtins) -> @value.Object {
  self.error_proto
}

///|
/// Accessor: TypeError.prototype.
pub fn Builtins::type_error_proto(self : Builtins) -> @value.Object {
  self.type_error_proto
}

///|
/// Accessor: RangeError.prototype.
pub fn Builtins::range_error_proto(self : Builtins) -> @value.Object {
  self.range_error_proto
}

///|
/// Accessor: SyntaxError.prototype.
pub fn Builtins::syntax_error_proto(self : Builtins) -> @value.Object {
  self.syntax_error_proto
}

///|
/// Accessor: ReferenceError.prototype.
pub fn Builtins::reference_error_proto(self : Builtins) -> @value.Object {
  self.reference_error_proto
}

///|
/// Create a fresh set of M1 builtin objects. The order of operations is
/// tightly coupled to prototype-chain rules — read the inline comments to
/// see why each `set_proto` / `set_prototype` call happens where it does.
pub fn Builtins::new() -> Builtins {
  // Step 1: allocate the root prototype (Object.prototype).
  // Object.prototype's [[Prototype]] is Null. All other prototypes point
  // here directly or through the Error prototype chain.
  let object_proto = @value.Object::new(@value.Shape::new(), @value.Null)

  // Step 2: sibling prototypes whose proto is Object.prototype.
  let function_proto = @value.Object::new(
    @value.Shape::new(),
    @value.Object(object_proto),
  )
  let array_proto = @value.Object::new(
    @value.Shape::new(),
    @value.Object(object_proto),
  )
  let string_proto = @value.Object::new(
    @value.Shape::new(),
    @value.Object(object_proto),
  )
  let error_proto = @value.Object::new(
    @value.Shape::new(),
    @value.Object(object_proto),
  )

  // Step 3: Error subclass prototypes. Their proto is Error.prototype so
  // `new TypeError() instanceof Error` is `true` per JS spec.
  let type_error_proto = @value.Object::new(
    @value.Shape::new(),
    @value.Object(error_proto),
  )
  let range_error_proto = @value.Object::new(
    @value.Shape::new(),
    @value.Object(error_proto),
  )
  let syntax_error_proto = @value.Object::new(
    @value.Shape::new(),
    @value.Object(error_proto),
  )
  let reference_error_proto = @value.Object::new(
    @value.Shape::new(),
    @value.Object(error_proto),
  )

  // Step 4: seed the `name` and `message` properties on each Error-family
  // prototype. JS spec: `Error.prototype.name === "Error"`,
  // `Error.prototype.message === ""`. `String.prototype`, `Array.prototype`,
  // `Object.prototype` do NOT get these — they carry (eventually) their own
  // method tables instead.
  error_proto.add_property(
    "name",
    @value.Str("Error"),
    @value.ATTR_DEFAULT_DATA,
  )
  error_proto.add_property("message", @value.Str(""), @value.ATTR_DEFAULT_DATA)
  type_error_proto.add_property(
    "name",
    @value.Str("TypeError"),
    @value.ATTR_DEFAULT_DATA,
  )
  type_error_proto.add_property(
    "message",
    @value.Str(""),
    @value.ATTR_DEFAULT_DATA,
  )
  range_error_proto.add_property(
    "name",
    @value.Str("RangeError"),
    @value.ATTR_DEFAULT_DATA,
  )
  range_error_proto.add_property(
    "message",
    @value.Str(""),
    @value.ATTR_DEFAULT_DATA,
  )
  syntax_error_proto.add_property(
    "name",
    @value.Str("SyntaxError"),
    @value.ATTR_DEFAULT_DATA,
  )
  syntax_error_proto.add_property(
    "message",
    @value.Str(""),
    @value.ATTR_DEFAULT_DATA,
  )
  reference_error_proto.add_property(
    "name",
    @value.Str("ReferenceError"),
    @value.ATTR_DEFAULT_DATA,
  )
  reference_error_proto.add_property(
    "message",
    @value.Str(""),
    @value.ATTR_DEFAULT_DATA,
  )

  // Step 5: allocate the constructor NativeFunctions.
  let object_ctor = @value.NativeFunction::new("Object", true, object_impl)
  let error_ctor = @value.NativeFunction::new("Error", true, error_impl)
  let type_error_ctor = @value.NativeFunction::new(
    "TypeError", true, error_impl,
  )
  let range_error_ctor = @value.NativeFunction::new(
    "RangeError", true, error_impl,
  )
  let syntax_error_ctor = @value.NativeFunction::new(
    "SyntaxError", true, error_impl,
  )
  let reference_error_ctor = @value.NativeFunction::new(
    "ReferenceError", true, error_impl,
  )

  // Step 6: wire the .prototype on each constructor. The VM's OP_CONSTRUCT
  // reads this to set the new receiver's [[Prototype]].
  object_ctor.set_prototype(@value.Object(object_proto))
  error_ctor.set_prototype(@value.Object(error_proto))
  type_error_ctor.set_prototype(@value.Object(type_error_proto))
  range_error_ctor.set_prototype(@value.Object(range_error_proto))
  syntax_error_ctor.set_prototype(@value.Object(syntax_error_proto))
  reference_error_ctor.set_prototype(@value.Object(reference_error_proto))

  // Step 7: wire each Error-family prototype's `constructor` property back
  // to its constructor. JS: `Error.prototype.constructor === Error`.
  error_proto.add_property(
    "constructor",
    @value.NativeFn(error_ctor),
    @value.ATTR_DEFAULT_DATA,
  )
  type_error_proto.add_property(
    "constructor",
    @value.NativeFn(type_error_ctor),
    @value.ATTR_DEFAULT_DATA,
  )
  range_error_proto.add_property(
    "constructor",
    @value.NativeFn(range_error_ctor),
    @value.ATTR_DEFAULT_DATA,
  )
  syntax_error_proto.add_property(
    "constructor",
    @value.NativeFn(syntax_error_ctor),
    @value.ATTR_DEFAULT_DATA,
  )
  reference_error_proto.add_property(
    "constructor",
    @value.NativeFn(reference_error_ctor),
    @value.ATTR_DEFAULT_DATA,
  )
  object_proto.add_property(
    "constructor",
    @value.NativeFn(object_ctor),
    @value.ATTR_DEFAULT_DATA,
  )
  {
    object_proto,
    function_proto,
    array_proto,
    string_proto,
    error_proto,
    type_error_proto,
    range_error_proto,
    syntax_error_proto,
    reference_error_proto,
    object_ctor,
    error_ctor,
    type_error_ctor,
    range_error_ctor,
    syntax_error_ctor,
    reference_error_ctor,
  }
}

///|
/// Attach every M1 builtin to a global object. Called from `Engine::new`
/// after the empty globals object is constructed. The identity of `globals`
/// is what `globalThis` points at, so we register it last.
pub fn Builtins::install_into(self : Builtins, globals : @value.Object) -> Unit {
  // Constructors.
  globals.add_property(
    "Object",
    @value.NativeFn(self.object_ctor),
    @value.ATTR_DEFAULT_DATA,
  )
  globals.add_property(
    "Error",
    @value.NativeFn(self.error_ctor),
    @value.ATTR_DEFAULT_DATA,
  )
  globals.add_property(
    "TypeError",
    @value.NativeFn(self.type_error_ctor),
    @value.ATTR_DEFAULT_DATA,
  )
  globals.add_property(
    "RangeError",
    @value.NativeFn(self.range_error_ctor),
    @value.ATTR_DEFAULT_DATA,
  )
  globals.add_property(
    "SyntaxError",
    @value.NativeFn(self.syntax_error_ctor),
    @value.ATTR_DEFAULT_DATA,
  )
  globals.add_property(
    "ReferenceError",
    @value.NativeFn(self.reference_error_ctor),
    @value.ATTR_DEFAULT_DATA,
  )

  // Value-shaped globals.
  globals.add_property("undefined", @value.Undefined, @value.ATTR_DEFAULT_DATA)
  globals.add_property("NaN", @value.Number(js_nan()), @value.ATTR_DEFAULT_DATA)
  globals.add_property(
    "Infinity",
    @value.Number(js_infinity()),
    @value.ATTR_DEFAULT_DATA,
  )
  // `globalThis` is the global object itself.
  globals.add_property(
    "globalThis",
    @value.Object(globals),
    @value.ATTR_DEFAULT_DATA,
  )
}

// ---------------------------------------------------------------------------
// Constructor impls
// ---------------------------------------------------------------------------

///|
/// `new Object()` / `Object()` — for M1 both variants return an empty object
/// whose proto is Object.prototype. When called with `new`, the VM has
/// already allocated the receiver with the right proto and passes it as
/// `this_val`; we simply return it. When called without `new`,
/// `this_val` will be Undefined, and we allocate a fresh proto-less object
/// here. (Step 9 doesn't have access to `Object.prototype` from inside the
/// impl closure — the VM's OP_CONSTRUCT does the wiring; on plain call we
/// return Undefined and let the caller ignore the return.)
///
/// The signature must be a static function because MoonBit closures over
/// non-`Copy` captures aren't valid in native-function bodies. Anything the
/// impl needs to reach must come through `this_val` or `args`.
fn object_impl(
  this_val : @value.JSValue,
  _args : Array[@value.JSValue],
) -> Result[@value.JSValue, @value.NativeError] {
  match this_val {
    Object(_) => Ok(this_val)
    _ => {
      // Called without `new`. Return an empty object; the caller can wire
      // proto after. (M1 doesn't currently exercise this path.)
      let obj = @value.Object::new(@value.Shape::new(), @value.Null)
      Ok(@value.Object(obj))
    }
  }
}

///|
/// `new Error(message)` / `Error(message)` — sets `this.message` to
/// `String(args[0])` when args has content. The VM has already created the
/// receiver with the right proto (Error.prototype / TypeError.prototype /
/// etc.), so this impl only needs to install the message.
///
/// Returns `Ok(Undefined)` so `adjust_ctor_return` uses `this_val` — that
/// preserves the receiver with all its wired properties. Called without
/// `new`, `this_val` will be `Undefined`; we still fabricate a plain
/// object and return it as an Object value (the VM's non-`new` fallthrough
/// won't reach adjust_ctor_return).
///
/// The subclass-name is embedded via the prototype chain: the VM wires
/// `Object::new(shape, proto=Error/TypeError/...prototype)` before invoking
/// this impl, so `error_obj.name` reads through the prototype and yields
/// the right subclass name.
fn error_impl(
  this_val : @value.JSValue,
  args : Array[@value.JSValue],
) -> Result[@value.JSValue, @value.NativeError] {
  match this_val {
    Object(obj) => {
      if args.length() > 0 {
        let msg = value_to_display_string(args[0])
        if not_undefined(args[0]) {
          obj.add_property("message", @value.Str(msg), @value.ATTR_DEFAULT_DATA)
        }
      }
      Ok(@value.Undefined)
    }
    // Called without `new`. JS spec: same as with `new`. We fabricate a
    // proto-less object here; this path isn't exercised by M1 AC.
    _ => {
      let obj = @value.Object::new(@value.Shape::new(), @value.Null)
      if args.length() > 0 && not_undefined(args[0]) {
        let msg = value_to_display_string(args[0])
        obj.add_property("message", @value.Str(msg), @value.ATTR_DEFAULT_DATA)
      }
      Ok(@value.Object(obj))
    }
  }
}

///|
/// True iff `v` is not `Undefined`. Used by error constructor to skip the
/// message assignment when no argument was supplied (`new Error()` should
/// leave `message` inherited from the prototype as "").
fn not_undefined(v : @value.JSValue) -> Bool {
  match v {
    Undefined => false
    _ => true
  }
}

///|
/// Coerce a JSValue to its display string form for error messages. The full
/// `ToString` operation lives in the vm package (with proper NaN / -0 /
/// scientific-notation handling); builtins is intentionally kept separate
/// from `vm`, so we duplicate a minimal subset here. M3 can lift this into
/// a shared helper once the layering settles.
fn value_to_display_string(v : @value.JSValue) -> String {
  match v {
    Undefined => "undefined"
    Null => "null"
    Bool(true) => "true"
    Bool(false) => "false"
    Int32(i) => i.to_string()
    Number(d) => d.to_string()
    Str(s) => s
    Object(_) => "[object Object]"
    Function(f) => "function " + f.name() + "() { [native code] }"
    NativeFn(nf) => "function " + nf.name() + "() { [native code] }"
  }
}

///|
/// A JS NaN value. Duplicated from vm (`@double.not_a_number`) to keep this
/// package free of a math dependency; we only need one constant.
fn js_nan() -> Double {
  0.0 / 0.0
}

///|
/// JS +Infinity.
fn js_infinity() -> Double {
  1.0 / 0.0
}
