// Expression AST nodes: cover ES2023+ complete expression grammar.
//
// Encoding choice (Option A from design.md §3): every node is wrapped in a
// small struct that pairs a `SourceSpan` with the variant payload. This keeps
// span-carrying orthogonal to variant shape — every match on `e.kind` sees a
// plain sum type, and every span read is `e.span` without touching the
// variant. Alternatives considered: (B) inline span in each variant — very
// repetitive at both construction and match sites; (C) parallel arrays —
// overkill for M1.
//
// M1 compiler will lower a subset of these variants (see design.md §7.3);
// unimplemented variants raise `NotImplementedYet` at lowering time. The
// enum is `pub(all)` so parser (writes) and compiler (reads) can both
// pattern-match variants across package boundaries.

///|
/// Expression AST node. `span` covers the source-code range that produced this
/// expression (start-inclusive, end-exclusive by convention). `kind` is the
/// actual variant payload.
pub struct Expr {
  span : @util.SourceSpan
  kind : ExprKind
} derive(@debug.Debug)

///|
/// Constructor. Provided so callers do not need to know the field order and
/// so we can later add optional metadata (e.g. a parenthesization hint) to
/// `Expr` without breaking every parser call site.
pub fn Expr::new(kind : ExprKind, span : @util.SourceSpan) -> Expr {
  { span, kind, }
}

///|
/// Expression variants. `pub(all)` because the parser constructs variants and
/// the compiler pattern-matches them; both live in different packages, and
/// `pub enum` would only expose the type name, not the constructors.
///
/// Some variants are M2..M4 syntax. The parser (also completed in M1) needs
/// to emit them so full-file parsing works today; the M1 compiler raises
/// `NotImplementedYet` on encounter. Variants labelled with a milestone in
/// their doc comment are the ones whose *lowering* is deferred.
pub(all) enum ExprKind {
  /// The literal token `undefined`. Trailing underscore because `Undefined`
  /// is already a JSValue variant name in the value package and we prefer
  /// consistent trailing-underscore for all "reserved-ish" JS keywords used
  /// as variant constructors.
  Undefined_
  /// The literal `null`.
  Null_
  /// A boolean literal (`true` or `false`).
  Boolean_(Bool)
  /// A numeric literal. Design.md §3 keeps this as a single `Double`; the
  /// compiler decides at emit time whether it fits in `push_i32` or needs
  /// `push_const`. If tests later show a need to remember "was written as
  /// integer" for source-map fidelity, add a companion flag then.
  NumberLit(Double)
  /// A string literal (already un-escaped by the lexer).
  StringLit(String)
  /// A template literal. `quasis` are the raw string chunks between `${...}`
  /// holes, and `exprs` are the hole expressions. Invariant:
  /// `quasis.length == exprs.length + 1`. `` `abc${x}def` `` becomes
  /// `TemplateLit(quasis=["abc","def"], exprs=[x])`. **M2** for compile.
  TemplateLit(quasis~ : Array[String], exprs~ : Array[Expr])
  /// A regexp literal. Lexer captures the raw pattern and flags; the actual
  /// regexp engine is **M4**.
  RegExpLit(pattern~ : String, flags~ : String)
  /// A bare identifier (variable / global reference).
  Identifier(String)
  /// The literal keyword `this`.
  This_
  /// The literal keyword `super` (used in `super.foo` or `super()`). **M2**.
  Super_
  /// Binary operation: arithmetic, bitwise, comparison, `in`, `instanceof`.
  Binary(op~ : BinOp, lhs~ : Expr, rhs~ : Expr)
  /// Short-circuit logical operators (`&&`, `||`, `??`). Kept separate from
  /// `Binary` because their evaluation semantics (short-circuit vs. both
  /// evaluated) differ, and the compiler emits different bytecode for them.
  Logical(op~ : LogOp, lhs~ : Expr, rhs~ : Expr)
  /// Unary op (`+ - ! ~ typeof void delete`). `prefix` is always `true`
  /// today — kept as a field because `++`/`--` share the "prefix vs postfix"
  /// distinction and mirroring it here keeps the parser's operator-table
  /// switch uniform.
  Unary(op~ : UnaryOp, arg~ : Expr, prefix~ : Bool)
  /// Increment / decrement (`++`, `--`). `prefix=true` for `++x`,
  /// `prefix=false` for `x++`.
  Update(op~ : UpdateOp, arg~ : Expr, prefix~ : Bool)
  /// Assignment (`=`, `+=`, `**=`, `||=`, `??=`, `&&=`, ...). The LHS is an
  /// Expr rather than a Pattern because ES allows the same syntactic form as
  /// an expression `[a, b] = arr` (destructuring assignment); parser
  /// validates the shape at lowering time.
  Assign(op~ : AssignOp, lhs~ : Expr, rhs~ : Expr)
  /// Conditional / ternary: `cond ? cons : alt`. (`test` is a MoonBit
  /// reserved keyword, so we spell out `cond`.)
  Cond(cond~ : Expr, cons~ : Expr, alt~ : Expr)
  /// Static member access: `obj.prop`. `prop` is the identifier name.
  /// Computed access uses `IndexAccess` instead.
  Member(obj~ : Expr, prop~ : String)
  /// Computed index access: `obj[expr]`. Used for `arr[i]` and
  /// `obj["computed"]` alike.
  IndexAccess(obj~ : Expr, index~ : Expr)
  /// Optional chaining member access: `obj?.prop`. `optional` records
  /// whether the `?.` is at THIS hop (as opposed to earlier in a chain such
  /// as `a?.b.c` where `.c` is a non-optional continuation). **M2**.
  OptionalMember(obj~ : Expr, prop~ : String, optional~ : Bool)
  /// Optional chaining index: `obj?.[expr]`. Same `optional` semantics as
  /// `OptionalMember`. **M2**.
  OptionalIndex(obj~ : Expr, index~ : Expr, optional~ : Bool)
  /// Optional chaining call: `fn?.(args)`. Same `optional` semantics. **M2**.
  OptionalCall(callee~ : Expr, args~ : Array[Argument], optional~ : Bool)
  /// Function call `f(args)`.
  Call(callee~ : Expr, args~ : Array[Argument])
  /// Constructor call `new f(args)`.
  New(callee~ : Expr, args~ : Array[Argument])
  /// Object literal `{ a: 1, [computed]: 2, ...rest, method() {}, get x() {} }`.
  ObjectLit(props~ : Array[ObjectProperty])
  /// Array literal `[a, , b, ...c]`. Holes and spreads are variants of
  /// `ArrayElement`.
  ArrayLit(elements~ : Array[ArrayElement])
  /// Function expression: `function foo() { ... }` or `function() { ... }`.
  /// `id` is `Some` if the expression uses a name (which becomes visible
  /// inside the body but not outside).
  FnExpr(
    id~ : String?,
    params~ : Array[Pattern],
    body~ : Block,
    is_async~ : Bool,
    is_generator~ : Bool
  )
  /// Arrow function: `(x) => x + 1` or `x => { return x + 1; }`. **M2**.
  ArrowFn(params~ : Array[Pattern], body~ : ArrowBody, is_async~ : Bool)
  /// Class expression: `class C extends B { ... }`. **M2**.
  ClassExpr(id~ : String?, super_class~ : Expr?, body~ : ClassBody)
  /// Comma-separated expressions `(a, b, c)` — value is the last one.
  Sequence(exprs~ : Array[Expr])
  /// `yield`, `yield expr`, or `yield*`. `delegate=true` for `yield*`.
  /// `arg` is `None` for a bare `yield;`. **M2**.
  YieldExpr(arg~ : Expr?, delegate~ : Bool)
  /// `await expr`. **M4** (async/await).
  AwaitExpr(arg~ : Expr)
  /// Tagged template: `` tag`quasi` `` where `quasi` is a `TemplateLit`. **M2**.
  TaggedTemplate(tag~ : Expr, quasi~ : Expr)
} derive(@debug.Debug)

///|
/// Binary operator. Covers arithmetic, bitwise, comparison, and JS-specific
/// `in` / `instanceof`. Logical short-circuit operators (`&&`, `||`, `??`)
/// live in `LogOp` because their evaluation strategy differs.
pub(all) enum BinOp {
  Add
  Sub
  Mul
  Div
  Mod
  Pow
  BitAnd
  BitOr
  BitXor
  Shl
  Shr
  UShr
  Eq
  Ne
  StrictEq
  StrictNe
  Lt
  Le
  Gt
  Ge
  In
  InstanceOf
} derive(Eq, @debug.Debug)

///|
/// Logical / short-circuit operator. Split from `BinOp` because these three
/// evaluate their RHS conditionally, and the compiler emits jumps rather
/// than a straight binary opcode for them.
pub(all) enum LogOp {
  And
  Or
  NullishCoalescing
} derive(Eq, @debug.Debug)

///|
/// Unary operator (excluding `++` / `--`, which are `UpdateOp`).
pub(all) enum UnaryOp {
  UPlus
  UMinus
  LogicalNot
  BitNot
  TypeOf
  Void
  Delete
} derive(Eq, @debug.Debug)

///|
/// Update operator: prefix / postfix `++` and `--`. Prefix vs. postfix is
/// carried in the `Update` variant's `prefix` field, not here.
pub(all) enum UpdateOp {
  Inc
  Dec
} derive(Eq, @debug.Debug)

///|
/// Assignment operator. `Assign` covers plain `=`; the rest are compound
/// assignments.
pub(all) enum AssignOp {
  Assign
  AddAssign
  SubAssign
  MulAssign
  DivAssign
  ModAssign
  PowAssign
  ShlAssign
  ShrAssign
  UShrAssign
  BitAndAssign
  BitOrAssign
  BitXorAssign
  AndAssign
  OrAssign
  NullishAssign
} derive(Eq, @debug.Debug)

///|
/// Call-site argument. `ArgSpread(Expr)` corresponds to `f(...arr)`.
pub(all) enum Argument {
  ArgExpr(Expr)
  ArgSpread(Expr)
} derive(@debug.Debug)

///|
/// Element of an array literal. `Hole` is `[, ,]`'s empty position;
/// `Item(Expr)` is a normal value; `ArrayElementSpread(Expr)` is `[...arr]`.
pub(all) enum ArrayElement {
  Hole
  Item(Expr)
  ArrayElementSpread(Expr)
} derive(@debug.Debug)

///|
/// Property in an object literal.
///
/// - `KeyValue`: `{ key: value }` or shorthand `{ key }` (shorthand=true
///   means `value` was inferred from `key` being a bare identifier).
/// - `MethodShorthand`: `{ foo() { ... } }`.
/// - `Getter` / `Setter`: `{ get foo() { ... } }` / `{ set foo(v) { ... } }`.
///   Both are **M3** for compile (accessor properties); M1 parser sees them.
/// - `SpreadProp`: `{ ...obj }`. **M2** for compile.
pub(all) enum ObjectProperty {
  KeyValue(key~ : PropertyKey, value~ : Expr, shorthand~ : Bool)
  MethodShorthand(key~ : PropertyKey, fn_meta~ : FnMeta)
  Getter(key~ : PropertyKey, params~ : Array[Pattern], body~ : Block)
  Setter(key~ : PropertyKey, params~ : Array[Pattern], body~ : Block)
  SpreadProp(Expr)
} derive(@debug.Debug)

///|
/// The body of an arrow function. `x => x + 1` uses `ExprBody`;
/// `x => { return x + 1; }` uses `BlockBody`.
pub(all) enum ArrowBody {
  ExprBody(Expr)
  BlockBody(Block)
} derive(@debug.Debug)

///|
/// Shared function-body metadata used by object-literal method shorthand
/// (`{ foo() { ... } }`) and by class methods. Kept as a distinct type from
/// `FnExpr` because those shorthand methods do not carry their own name
/// (the enclosing property key supplies it).
pub struct FnMeta {
  params : Array[Pattern]
  body : Block
  is_async : Bool
  is_generator : Bool
} derive(@debug.Debug)

///|
/// Construct a `FnMeta`.
pub fn FnMeta::new(
  params : Array[Pattern],
  body : Block,
  is_async : Bool,
  is_generator : Bool,
) -> FnMeta {
  { params, body, is_async, is_generator, }
}
