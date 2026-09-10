// Object / Shape / PropMeta: the heap-object representation.
//
// Design notes:
//
// - Each `Object` owns its own `Shape` (no shape-tree sharing in M1). This is
//   deliberate — the "many objects of the same shape" memory optimisation is
//   an M6 concern and adding it now would freeze compiler / VM code against an
//   API we won't fully use for months. The `Shape` API here is compatible
//   with future sharing: `add_property` only appends to `keys_ordered`, so
//   later steps can introduce a transition tree without rewriting callers.
//
// - `ObjectRef` / `ShapeRef` are type aliases, not `@ref.Ref` wrappers. In
//   MoonBit, a struct with `mut` fields already gives shared-mutation
//   semantics through pointer identity, which is exactly what "reference to
//   Object" means. See value.mbt's JSValue doc for the fuller rationale.
//
// - `PropMeta` packs `writable / enumerable / configurable / accessor` into a
//   single `Byte`. Bit 3 (accessor) is always 0 in M1 — accessor properties
//   arrive in M3. We reserve the bit now so M3 doesn't have to change the
//   struct layout.

///|
/// Property attributes packed into a byte. Bit layout:
///
/// ```
///  bit 3   |  bit 2       |  bit 1       |  bit 0
///  accessor|  configurable|  enumerable  |  writable
/// ```
///
/// M1 never sets bit 3 — accessor properties (getter/setter) arrive in M3.
/// Reserving the bit now keeps the byte layout stable across milestones so
/// serialised bytecode / snapshot tests written against M1 stay valid.
pub struct PropMeta {
  slot_idx : Int
  attrs : Byte
} derive(Eq, @debug.Debug)

///|
/// Bit masks for `PropMeta.attrs`. Public because the compiler and VM both
/// need to construct property meta with specific attribute combinations
/// (e.g. `Object.defineProperty` in M3 with `{writable: false}`).
pub const ATTR_WRITABLE : Byte = 0x01

///|
pub const ATTR_ENUMERABLE : Byte = 0x02

///|
pub const ATTR_CONFIGURABLE : Byte = 0x04

///|
pub const ATTR_ACCESSOR : Byte = 0x08

///|
/// Default "data property" attrs: writable, enumerable, configurable, and NOT
/// an accessor. This matches the defaults used by JS object literal syntax
/// (`{a: 1}`) and by `[[DefineOwnProperty]]` when the descriptor omits a
/// field. M1's compiler emits these for every property; M3 gains the ability
/// to pick different attrs at emit time.
pub const ATTR_DEFAULT_DATA : Byte = 0x07 // writable | enumerable | configurable

///|
/// Convenience constructor for a data property with default attrs.
pub fn PropMeta::data(slot_idx : Int) -> PropMeta {
  { slot_idx, attrs: ATTR_DEFAULT_DATA, }
}

///|
/// General-purpose constructor. Callers pass an explicit `attrs` byte —
/// typically composed by `lor`-ing the `ATTR_*` constants — so unit tests and
/// M3's `Object.defineProperty` implementation can express non-default
/// combinations (e.g. writable-only, or accessor). `PropMeta::data` is the
/// preferred shortcut for the very common all-true data case.
pub fn PropMeta::new(slot_idx : Int, attrs : Byte) -> PropMeta {
  { slot_idx, attrs, }
}

///|
pub fn PropMeta::is_writable(self : PropMeta) -> Bool {
  self.attrs.land(ATTR_WRITABLE) != (0 : Byte)
}

///|
pub fn PropMeta::is_enumerable(self : PropMeta) -> Bool {
  self.attrs.land(ATTR_ENUMERABLE) != (0 : Byte)
}

///|
pub fn PropMeta::is_configurable(self : PropMeta) -> Bool {
  self.attrs.land(ATTR_CONFIGURABLE) != (0 : Byte)
}

///|
pub fn PropMeta::is_accessor(self : PropMeta) -> Bool {
  self.attrs.land(ATTR_ACCESSOR) != (0 : Byte)
}

///|
/// Structural descriptor of an object's properties, separate from the values
/// themselves. In M1 every object has its own `Shape` — sharing is deferred
/// to M6 (see file-level notes).
///
/// `keys_ordered` records insertion order because JS `for-in`, `Object.keys`,
/// and `JSON.stringify` all iterate in insertion order for string keys. M1
/// has no consumer of this array yet, but recording the order now costs
/// almost nothing and locks in the invariant so later milestones can rely on
/// it without a migration.
pub struct Shape {
  props : @hashmap.HashMap[String, PropMeta]
  keys_ordered : Array[String]
} derive(@debug.Debug)

///|
/// Create an empty shape. `HashMap([])` starts at the stdlib default
/// capacity, which is fine for M1 workloads.
pub fn Shape::new() -> Shape {
  { props: @hashmap.HashMap([]), keys_ordered: [], }
}

///|
/// A JS object as seen by the runtime.
///
/// - `shape`: the `Shape` describing which properties live at which slot.
///   `mut` because a future M6 optimisation may re-point the object at a
///   shared shape after a transition.
/// - `slots`: values indexed by `PropMeta.slot_idx`. Kept the same length as
///   `shape.keys_ordered` by every mutating API.
/// - `proto`: prototype chain link. `Null` for `Object.prototype` itself and
///   `Object(_)` for every other object.
/// - `extensible`: JS `[[Extensible]]` internal slot. `false` after
///   `Object.preventExtensions`. In M1 nothing calls that, so it stays
///   `true`, but VM opcode `set_own` already respects it.
pub struct Object {
  mut shape : Shape
  slots : Array[JSValue]
  mut proto : JSValue
  mut extensible : Bool
} derive(@debug.Debug)

///|
/// Type alias for "reference to an `Object`". MoonBit structs with mutable
/// fields already carry pointer identity, so no `@ref.Ref` wrapper is
/// necessary. See value.mbt for the fuller rationale.
pub type ObjectRef = Object

///|
/// Type alias for "reference to a `Shape`". Same rationale as `ObjectRef`.
pub type ShapeRef = Shape

///|
/// Create a new object with the given shape and prototype. The `slots` array
/// starts filled with `Undefined` — one entry per key already present in the
/// shape. In M1 all callers pass a fresh `Shape::new()`, so this path
/// normally allocates an empty `slots` and lets `add_property` grow both
/// arrays in lockstep. Once shape sharing arrives, this constructor will
/// need to seed `slots` with `Undefined` values for the pre-existing keys —
/// hence the loop below.
pub fn Object::new(shape : ShapeRef, proto : JSValue) -> ObjectRef {
  let slots : Array[JSValue] = []
  for _ in 0..<shape.keys_ordered.length() {
    slots.push(Undefined)
  }
  { shape, slots, proto, extensible: true, }
}

///|
/// Replace the object's prototype link. JS `Object.setPrototypeOf`. Not used
/// by the M1 opcode set (the compiler emits closures whose prototype is
/// resolved by builtin init), but VM builtins in Step 9 need it to wire
/// `Function.prototype` etc. Also keeps the `mut proto` field's mutability
/// honest for the type checker.
pub fn Object::set_proto(obj : ObjectRef, proto : JSValue) -> Unit {
  obj.proto = proto
}

///|
/// Replace the object's shape reference. Used by shape-transition code (M6);
/// in M1 no caller reaches for this, but declaring the setter keeps `mut
/// shape` in Object's field list without a dead-code warning.
pub fn Object::set_shape(obj : ObjectRef, shape : ShapeRef) -> Unit {
  obj.shape = shape
}

///|
/// Flip the object to non-extensible (`Object.preventExtensions`). No new
/// properties can then be added; existing writes still respect their
/// per-property `writable` bit.
pub fn Object::prevent_extensions(obj : ObjectRef) -> Unit {
  obj.extensible = false
}

///|
/// Append a new data property. Preconditions:
///
/// - `key` must NOT already be present in `obj.shape`. Callers verify this
///   with `has_own` first; violating the precondition aborts because a
///   duplicate insertion would silently corrupt `keys_ordered` / `slots`
///   alignment. `[[DefineOwnProperty]]`'s "update existing" branch lives in
///   `set_own`.
///
/// M1 caller list: the compiler emitting `define_prop`, the object literal
/// evaluator in the VM, and internal builtin initialisation.
pub fn Object::add_property(
  obj : ObjectRef,
  key : String,
  value : JSValue,
  attrs : Byte,
) -> Unit {
  if obj.shape.props.contains(key) {
    abort("Object::add_property: key already present: " + key)
  }
  let slot_idx = obj.slots.length()
  obj.shape.props.set(key, { slot_idx, attrs, })
  obj.shape.keys_ordered.push(key)
  obj.slots.push(value)
}

///|
/// Fetch an own property value without walking the prototype chain. Returns
/// `None` if `obj` does not own `key`. Analogous to
/// `Object.getOwnPropertyDescriptor(obj, key)?.value` for data properties.
pub fn Object::get_own(obj : ObjectRef, key : String) -> JSValue? {
  match obj.shape.props.get(key) {
    Some(meta) => Some(obj.slots[meta.slot_idx])
    None => None
  }
}

///|
/// True iff `obj` owns `key`. No prototype walk. Corresponds to the
/// `Object.hasOwn(obj, key)` builtin (added in ES2022) and to
/// `Object.prototype.hasOwnProperty.call(obj, key)`.
pub fn Object::has_own(obj : ObjectRef, key : String) -> Bool {
  obj.shape.props.contains(key)
}

///|
/// JS `[[Get]]` for data properties: walk the prototype chain and return the
/// first hit, or `Undefined` if the chain ends without finding `key`.
/// Accessors (getter/setter) are ignored — they will be handled in M3 when
/// `PropMeta.attrs` bit 3 becomes meaningful.
///
/// The chain terminates when `proto` is anything other than `Object(_)`
/// (typically `Null`, but any non-object proto is treated as end-of-chain).
/// There is no explicit cycle guard: JS prohibits proto chains that produce
/// cycles, and constructing one requires `Object.setPrototypeOf` which is
/// not implemented in M1.
pub fn Object::get_property(obj : ObjectRef, key : String) -> JSValue {
  for cur = obj {
    match cur.shape.props.get(key) {
      Some(meta) => break cur.slots[meta.slot_idx]
      None =>
        match cur.proto {
          Object(next) => continue next
          _ => break Undefined
        }
    }
  }
}

///|
/// JS `in` operator (`key in obj`): does `obj` or any prototype own `key`?
pub fn Object::has_property(obj : ObjectRef, key : String) -> Bool {
  for cur = obj {
    if cur.shape.props.contains(key) {
      break true
    } else {
      match cur.proto {
        Object(next) => continue next
        _ => break false
      }
    }
  }
}

///|
/// Set an own property. Returns whether the write "succeeded" in the sense
/// that the VM should NOT throw a `TypeError`:
///
/// - If `key` is an existing own property:
///   - Writable → update the slot; return `true`.
///   - Non-writable → return `false` (VM throws `TypeError` in strict mode;
///     silently ignores in sloppy mode — M1 defers that decision to the VM).
/// - If `key` is not an own property:
///   - Extensible → append a fresh data property with default attrs;
///     return `true`.
///   - Non-extensible → return `false`.
///
/// This function does NOT walk the prototype chain; JS `[[Set]]` with proto
/// walk is more subtle (a non-writable data property on the proto stops the
/// set) and lives in the VM.
pub fn Object::set_own(obj : ObjectRef, key : String, value : JSValue) -> Bool {
  match obj.shape.props.get(key) {
    Some(meta) =>
      if meta.is_writable() {
        obj.slots[meta.slot_idx] = value
        true
      } else {
        false
      }
    None =>
      if obj.extensible {
        Object::add_property(obj, key, value, ATTR_DEFAULT_DATA)
        true
      } else {
        false
      }
  }
}
