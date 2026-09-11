// Function + Upvalue: runtime representation of a JS function value and the
// heap cells that carry captured variables across closures.
//
// Both types live in the `value` package so that `JSValue::Function` (below)
// can carry a payload without introducing a value → bytecode import cycle.
// Because `Chunk` is defined in the bytecode package (which itself imports
// value), we cannot store a direct `Chunk` reference inside `Function`.
// Instead each compiled chunk is registered with the `Engine`'s chunk
// registry and gets a stable `chunk_id : Int`; the `Function` value only
// remembers that id and its captured upvalues. VM Step 8b1 owns the
// registration handshake — see `src/vm/vm.mbt`.

///|
/// A shared heap cell used by JS closure semantics. `Upvalue` is *the*
/// storage for any variable that might be closed over: the enclosing
/// function's local slot holds an `Upvalue`, and every closure that
/// captures the variable holds the SAME `Upvalue`. Reads and writes go
/// through `.get()` / `.set()`, giving the JS-visible "modifying x in the
/// closure updates x in the outer function" behaviour.
///
/// M1 simplification: every local slot in a `Frame` is an `Upvalue` cell
/// (uniform), regardless of whether the compiler determined the local is
/// actually captured. This costs one small heap alloc per local, but
/// avoids the state machine of "open vs closed" upvalues from Lua-style
/// implementations. M6 can revisit if profiling shows it matters.
pub struct Upvalue {
  mut value : JSValue
} derive(@debug.Debug)

///|
/// Allocate a fresh upvalue cell initialised to `v`.
pub fn Upvalue::new(v : JSValue) -> Upvalue {
  { value: v, }
}

///|
/// Read the current value stored in the cell.
pub fn Upvalue::get(self : Upvalue) -> JSValue {
  self.value
}

///|
/// Write a new value into the cell. All aliases of the cell observe the
/// update — this is the whole point of the type.
pub fn Upvalue::set(self : Upvalue, v : JSValue) -> Unit {
  self.value = v
}

///|
/// A runtime JS function. Carries four pieces of information:
///
/// - `chunk_id`: opaque handle into the current `Engine`'s chunk registry.
///   The Engine is responsible for handing out and resolving these ids.
///   Value-package code never dereferences the id itself.
/// - `upvalues`: shared `Upvalue` cells captured from the enclosing scope,
///   one per `UpvalueSlotDecl` in the underlying chunk. `OP_GET_UPVALUE` /
///   `OP_SET_UPVALUE` read/write through these cells.
/// - `name`: display name used for `Function.name`, stack traces, and the
///   disassembler. `"<anonymous>"` for unnamed function expressions.
/// - `is_constructor`: `false` for arrow functions once M2 lands; always
///   `true` in M1 (only ordinary functions exist).
/// - `prototype`: the `.prototype` object exposed via `f.prototype` and used
///   as the `[[Prototype]]` for `new f(...)`'s freshly-allocated receiver.
///   The VM populates this when `OP_NEW_CLOSURE` runs: a fresh empty Object
///   whose own `[[Prototype]]` links to `Object.prototype`. Consulted by
///   `OP_INSTANCEOF` to walk the receiver's proto chain looking for
///   identity match, and by `OP_CONSTRUCT` to set the new receiver's
///   proto. (Introduced in M1 Step 8b2.)
///
/// `Function` deliberately does NOT include a `home_object` / `bound_this`
/// slot in M1. Method dispatch relies on the caller supplying `this` via
/// `OP_CALL_METHOD`; there is no bound-function form yet.
pub struct Function {
  chunk_id : Int
  upvalues : Array[Upvalue]
  name : String
  is_constructor : Bool
  mut prototype : JSValue
} derive(@debug.Debug)

///|
/// Constructor. All fields except `prototype` are set at creation; the
/// prototype defaults to `Undefined` and is populated by the VM when the
/// Function value is produced via `OP_NEW_CLOSURE`. (Kept mutable so the
/// VM can wire the prototype after the value is constructed, matching the
/// two-step dance used by `NativeFunction::set_prototype`.)
pub fn Function::new(
  chunk_id : Int,
  upvalues : Array[Upvalue],
  name : String,
  is_constructor : Bool,
) -> Function {
  { chunk_id, upvalues, name, is_constructor, prototype: Undefined, }
}

///|
/// Accessor for the chunk id. Exposed so vm-package code can look up the
/// backing `Chunk` in the Engine's registry.
pub fn Function::chunk_id(self : Function) -> Int {
  self.chunk_id
}

///|
/// Accessor for the captured upvalues array. Callers get the same array
/// reference the `Function` holds; reads via `Upvalue::get` observe the
/// current value in the shared cell.
pub fn Function::upvalues(self : Function) -> Array[Upvalue] {
  self.upvalues
}

///|
/// The function's display name.
pub fn Function::name(self : Function) -> String {
  self.name
}

///|
/// Whether `new f(...)` is permitted. Always true in M1 (arrow functions
/// arrive in M2 and are the first non-constructor callable).
pub fn Function::is_constructor(self : Function) -> Bool {
  self.is_constructor
}

///|
/// The `.prototype` object attached to this function value. `Undefined`
/// until the VM populates it via `set_prototype` (which happens inside
/// `OP_NEW_CLOSURE` for every user function, so JS-visible reads of
/// `f.prototype` always land on a real Object). Consulted by
/// `OP_INSTANCEOF` and `OP_CONSTRUCT`.
pub fn Function::prototype(self : Function) -> JSValue {
  self.prototype
}

///|
/// Rewire the `.prototype` object. Called by `OP_NEW_CLOSURE` in the VM
/// immediately after the Function value is allocated (the VM knows the
/// engine's Object.prototype and thus can wire the prototype's own
/// `[[Prototype]]` correctly — the value package does not).
pub fn Function::set_prototype(self : Function, proto : JSValue) -> Unit {
  self.prototype = proto
}
