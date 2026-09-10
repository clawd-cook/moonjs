// Binding-pattern AST nodes: destructuring, function parameters, catch bindings.
//
// Patterns share the same span-wrapper encoding as Expr / Stmt for
// consistency. The parser produces them everywhere a binding position accepts
// destructuring; the M1 compiler only lowers `IdentPat` (bare identifier)
// bindings — anything else raises `NotImplementedYet` since destructuring is
// **M2**.

///|
/// Binding pattern node. `span` covers the source range that produced this
/// pattern.
pub struct Pattern {
  span : @util.SourceSpan
  kind : PatternKind
} derive(@debug.Debug)

///|
/// Construct a `Pattern`.
pub fn Pattern::new(kind : PatternKind, span : @util.SourceSpan) -> Pattern {
  { span, kind, }
}

///|
/// Pattern variants.
///
/// - `IdentPat` is the trivial "bare name" case — the only kind M1 lowers.
/// - `ObjectPat` / `ArrayPat` are destructuring; the `rest` field
///   captures `{a, ...rest}` / `[a, ...rest]` respectively. **M2**.
/// - `AssignPat` is a default value: `function f(x = 1)` becomes
///   `AssignPat(IdentPat("x"), NumberLit(1.0))`. **M2**.
pub(all) enum PatternKind {
  IdentPat(name~ : String)
  /// `props` is the list of destructured properties; `rest` names the
  /// remainder object (`{a, b, ...rest}` → rest = Some("rest")).
  ObjectPat(props~ : Array[ObjectPatProp], rest~ : String?)
  /// `elements` may include `PatHole` for `[a, , b]`. `rest` is the tail
  /// pattern for `[a, ...tail]` — a full `Pattern` because `[a, ...[b,c]]`
  /// is legal.
  ArrayPat(elements~ : Array[ArrayPatElement], rest~ : Pattern?)
  /// Default-value wrapper: `left = right` at a binding position.
  AssignPat(left~ : Pattern, right~ : Expr)
} derive(@debug.Debug)

///|
/// One property in an object destructuring pattern.
///
/// - `key`: the object-literal-style key we destructure by.
/// - `value`: the pattern the value binds to (may recursively destructure).
/// - `computed`: `true` for `{[expr]: x}`.
/// - `shorthand`: `true` for `{x}` (equivalent to `{x: x}`).
pub struct ObjectPatProp {
  key : PropertyKey
  value : Pattern
  computed : Bool
  shorthand : Bool
} derive(@debug.Debug)

///|
/// Construct an `ObjectPatProp`.
pub fn ObjectPatProp::new(
  key : PropertyKey,
  value : Pattern,
  computed : Bool,
  shorthand : Bool,
) -> ObjectPatProp {
  { key, value, computed, shorthand, }
}

///|
/// One element in an array destructuring pattern. `PatHole` is `[a, , b]`'s
/// skipped slot; `PatItem` binds to a pattern (which may itself be another
/// destructuring).
pub(all) enum ArrayPatElement {
  PatHole
  PatItem(Pattern)
} derive(@debug.Debug)
