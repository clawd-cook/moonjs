// UpvalueSlotDecl: compile-time description of how a function template captures
// values from the enclosing scope. Consumed by `Chunk`'s `upvalue_slots` field
// and by the VM's `new_closure` opcode implementation (M1 Step 8).
//
// See design.md §7.1 for the scope-analysis algorithm and §8.3 for the runtime
// resolution.

///|
/// Where does an upvalue slot come from? Either a local slot in the
/// immediately-enclosing function (`Local`) or another upvalue slot on the
/// enclosing function (`ParentUpvalue`, which lets the compiler chain captures
/// through several nesting levels without every level having to be a direct
/// consumer).
pub(all) enum UpvalueFromKind {
  Local
  ParentUpvalue
} derive(Eq, @debug.Debug)

///|
/// One capture-plan entry. `from_idx` indexes into the enclosing function's
/// `locals` array (when `from_kind = Local`) or its `upvalues` array (when
/// `from_kind = ParentUpvalue`).
pub struct UpvalueSlotDecl {
  from_kind : UpvalueFromKind
  from_idx : Int
} derive(Eq, @debug.Debug)

///|
/// Explicit constructor so callers do not need to know the field order — the
/// enclosing `Chunk` uses `Array[UpvalueSlotDecl]`, and later milestones may
/// grow this struct (e.g. an `is_mutable` bit for `const` capture).
pub fn UpvalueSlotDecl::new(
  from_kind : UpvalueFromKind,
  from_idx : Int,
) -> UpvalueSlotDecl {
  { from_kind, from_idx, }
}
