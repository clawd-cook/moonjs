// Class-related AST nodes and shared PropertyKey type.
//
// Class syntax is fully parsed in M1 (parser is complete per PRD Q4) but not
// compiled: `ClassExpr` / `ClassDecl` variants raise `NotImplementedYet` at
// lowering time. **M2** picks up class lowering.
//
// `PropertyKey` lives here because it's shared between object literal
// properties (in expr.mbt), object destructuring keys (in pattern.mbt), and
// class member names.

///|
/// Property key. Used by object literals, object destructuring, and class
/// members. Named-key forms:
///
/// - `IdKey("foo")`: bare identifier key `{ foo: 1 }`.
/// - `StringKey("foo")`: quoted string `{ "foo": 1 }`.
/// - `NumberKey(1.5)`: numeric key `{ 1.5: 1 }` (JS coerces to string at
///   runtime).
/// - `ComputedKey(expr)`: `{ [expr]: 1 }` — key evaluated at runtime.
/// - `PrivateKey("x")`: `#x` in a class body. **M2**.
///
/// Note we do NOT keep a `BigInt` key variant even though ES allows one in
/// principle; BigInt literals as object keys are not part of the grammar
/// (`{ 1n: 2 }` is a syntax error) — BigInt keys only arise through the
/// runtime `ToPropertyKey` cast which is not an AST concern.
pub(all) enum PropertyKey {
  IdKey(String)
  StringKey(String)
  NumberKey(Double)
  ComputedKey(Expr)
  PrivateKey(String)
} derive(@debug.Debug)

///|
/// The body of a class: an ordered list of members. Ordering matters because
/// static field initialisers run in source order and constructor / instance
/// fields interleave.
pub struct ClassBody {
  members : Array[ClassMember]
} derive(@debug.Debug)

///|
/// Construct a `ClassBody`.
pub fn ClassBody::new(members : Array[ClassMember]) -> ClassBody {
  { members, }
}

///|
/// One member of a class body.
///
/// - `MethodDefMember`: `foo() {}`, `constructor() {}`, `get x() {}`,
///   `#priv() {}`, `static bar() {}` — everything with parentheses+body.
/// - `PropDefMember`: `x = 1;`, `static y = 2;`, `#z;` — field declarations.
/// - `StaticBlock`: `static { ... }` — ES2022 static initialisation block.
pub(all) enum ClassMember {
  MethodDefMember(MethodDef)
  PropDefMember(PropDef)
  StaticBlock(body~ : Array[Stmt])
} derive(@debug.Debug)

///|
/// Method definition inside a class or object literal shorthand.
///
/// - `key`: the method's name (identifier, string, number, computed, or
///   private).
/// - `kind`: constructor / regular method / getter / setter.
/// - `is_static`: prefixed `static` in a class body.
/// - `is_private`: name is a `#privateName` (redundant with `PrivateKey`
///   but flagged explicitly for cheap filtering).
/// - `params`, `body`, `is_async`, `is_generator`: function metadata.
pub struct MethodDef {
  key : PropertyKey
  kind : MethodKind
  is_static : Bool
  is_private : Bool
  params : Array[Pattern]
  body : Block
  is_async : Bool
  is_generator : Bool
} derive(@debug.Debug)

///|
/// Construct a `MethodDef`.
pub fn MethodDef::new(
  key : PropertyKey,
  kind : MethodKind,
  is_static : Bool,
  is_private : Bool,
  params : Array[Pattern],
  body : Block,
  is_async : Bool,
  is_generator : Bool,
) -> MethodDef {
  { key, kind, is_static, is_private, params, body, is_async, is_generator, }
}

///|
/// Which flavour of method definition. `Constructor` is `constructor() {}`
/// inside a class body; `Method` is any regular `foo()`; `Getter` /
/// `Setter` are accessor variants (also usable in object literals via
/// dedicated `ObjectProperty` variants, but classes fold them into
/// `MethodDef`).
pub(all) enum MethodKind {
  Constructor
  Method
  Getter
  Setter
} derive(Eq, @debug.Debug)

///|
/// Class field / property declaration: `name = value` or `name;`.
/// `value = None` for a plain declaration without initialiser.
pub struct PropDef {
  key : PropertyKey
  value : Expr?
  is_static : Bool
  is_private : Bool
} derive(@debug.Debug)

///|
/// Construct a `PropDef`.
pub fn PropDef::new(
  key : PropertyKey,
  value : Expr?,
  is_static : Bool,
  is_private : Bool,
) -> PropDef {
  { key, value, is_static, is_private, }
}
