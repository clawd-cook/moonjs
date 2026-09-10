// Statement AST nodes: cover ES2023+ complete statement grammar.
//
// Same encoding as Expr: `Stmt = { span, kind }`, `StmtKind` is `pub(all)` for
// cross-package matching, variants labelled M2..M5 in comments are those
// whose *lowering* the M1 compiler defers.

///|
/// Statement AST node. `span` covers the source range that produced this
/// statement; `kind` is the variant payload.
pub struct Stmt {
  span : @util.SourceSpan
  kind : StmtKind
} derive(@debug.Debug)

///|
/// Constructor. Same field-order-stability rationale as `Expr::new`.
pub fn Stmt::new(kind : StmtKind, span : @util.SourceSpan) -> Stmt {
  { span, kind, }
}

///|
/// Statement variants. `pub(all)` so parser and compiler can construct and
/// match variants across the ast/parser/compiler package boundary.
///
/// Variants tagged **M2**..**M5** in their doc comment are parsed today but
/// deferred by the M1 compiler (raises `NotImplementedYet`).
pub(all) enum StmtKind {
  /// Block statement `{ ... }`. Different from `FunctionDecl.body`
  /// (`Block` struct) even though both wrap `Array[Stmt]` — the block *as
  /// statement* introduces a lexical scope for `let`/`const`, while a
  /// function body's outer braces don't create an extra one.
  BlockStmt(body~ : Array[Stmt])
  /// An expression used as a statement: `foo();`.
  ExprStmt(expr~ : Expr)
  /// `if (cond) cons else alt`. `alt` is `None` for a plain `if`.
  /// (`test` is a MoonBit reserved keyword.)
  If(cond~ : Expr, cons~ : Stmt, alt~ : Stmt?)
  /// `while (cond) body`.
  While(cond~ : Expr, body~ : Stmt)
  /// `do body while (cond);`.
  DoWhile(body~ : Stmt, cond~ : Expr)
  /// C-style `for (init; cond; update) body`. `init` may be a var
  /// declaration, an expression, or absent.
  For(init~ : ForInit?, cond~ : Expr?, update~ : Expr?, body~ : Stmt)
  /// `for (x in obj) body`. **M2** to lower.
  ForIn(left~ : ForBinding, right~ : Expr, body~ : Stmt)
  /// `for (x of iter) body` or `for await (x of iter) body`. **M2** to
  /// lower (M4 for `await`).
  ForOf(left~ : ForBinding, right~ : Expr, body~ : Stmt, is_await~ : Bool)
  /// `switch (disc) { case ...: ...; default: ... }`.
  Switch(disc~ : Expr, cases~ : Array[SwitchCase])
  /// `break;` or `break label;`.
  Break(label~ : String?)
  /// `continue;` or `continue label;`.
  Continue(label~ : String?)
  /// `return;` or `return expr;`.
  Return(arg~ : Expr?)
  /// `throw expr;`.
  Throw(arg~ : Expr)
  /// `try { body } catch (param) { ... } finally { ... }`. `catch_` and
  /// `finally_` are both optional (spec requires at least one), but parser
  /// enforces that; the AST just represents the shape.
  Try(body~ : Array[Stmt], catch_~ : CatchClause?, finally_~ : Array[Stmt]?)
  /// `label: body`.
  Labeled(label~ : String, body~ : Stmt)
  /// `var x = 1, y;` / `let x = 1;` / `const x = 1;` / `using x = ...;` /
  /// `await using x = ...;` (last two are TC39 explicit resource management,
  /// scheduled beyond M2 for lowering).
  VarDecl(kind~ : VarKind, decls~ : Array[VarDeclarator])
  /// `function foo() { ... }` at statement position.
  FunctionDecl(
    id~ : String,
    params~ : Array[Pattern],
    body~ : Block,
    is_async~ : Bool,
    is_generator~ : Bool
  )
  /// `class C extends B { ... }`. **M2**.
  ClassDecl(id~ : String, super_class~ : Expr?, body~ : ClassBody)
  /// The empty statement (`;`). Represents a token slot with no side effect;
  /// parser emits it inside for-init if the init clause is skipped, and
  /// elsewhere at explicit `;` occurrences the user typed.
  Empty
  /// `with (obj) body`. **M2** and non-strict-only.
  With(obj~ : Expr, body~ : Stmt)
  /// `import ...` module declaration. **M5** — see `module.mbt`.
  ImportDeclStmt(ImportDecl)
  /// `export ...` module declaration. **M5** — see `module.mbt`.
  ExportDeclStmt(ExportDecl)
} derive(@debug.Debug)

///|
/// Kind of variable declaration. `Var` is function-scoped and hoisted;
/// `Let` and `Const` are block-scoped with TDZ. `Using` / `AwaitUsing` are
/// TC39 explicit resource management.
pub(all) enum VarKind {
  Var
  Let
  Const
  Using
  AwaitUsing
} derive(Eq, @debug.Debug)

///|
/// One declarator in a `VarDecl`. `pat` is the binding pattern (a plain
/// identifier for simple `var x = 1;` or a destructuring pattern for
/// `let {a, b} = obj;`). `init` is the optional initialiser.
pub struct VarDeclarator {
  pat : Pattern
  init : Expr?
} derive(@debug.Debug)

///|
/// Construct a `VarDeclarator`.
pub fn VarDeclarator::new(pat : Pattern, init : Expr?) -> VarDeclarator {
  { pat, init, }
}

///|
/// Initialiser variant for the C-style `for` loop's first clause. `InitVar`
/// declares fresh bindings; `InitExpr` runs an expression for side effects.
pub(all) enum ForInit {
  InitVar(kind~ : VarKind, decls~ : Array[VarDeclarator])
  InitExpr(Expr)
} derive(@debug.Debug)

///|
/// Binding side of `for-in` and `for-of`: either a fresh declaration or an
/// existing lvalue pattern (`for (x of it)` where `x` was declared earlier).
pub(all) enum ForBinding {
  BindingVar(kind~ : VarKind, decls~ : Array[VarDeclarator])
  BindingPat(Pattern)
} derive(@debug.Debug)

///|
/// One `case` (or `default`) of a `switch` statement. `cond = None` marks
/// the default clause. `body` is the statement list up to the next
/// `case`/`default` or the end of the switch (fallthrough is legal).
/// (Field named `cond` rather than `test` because `test` is a MoonBit
/// reserved keyword when used as a named argument.)
pub struct SwitchCase {
  cond : Expr?
  body : Array[Stmt]
} derive(@debug.Debug)

///|
/// Construct a `SwitchCase`.
pub fn SwitchCase::new(cond : Expr?, body : Array[Stmt]) -> SwitchCase {
  { cond, body, }
}

///|
/// The `catch (param) { body }` clause. `param` is `None` for the
/// optional-catch-binding syntax `catch { ... }` (ES2019).
pub struct CatchClause {
  param : Pattern?
  body : Array[Stmt]
} derive(@debug.Debug)

///|
/// Construct a `CatchClause`.
pub fn CatchClause::new(param : Pattern?, body : Array[Stmt]) -> CatchClause {
  { param, body, }
}

///|
/// Function body wrapper. Separate from `StmtKind::BlockStmt` because a
/// function's outer braces do not introduce an extra lexical scope, and the
/// two types have different downstream consumers (compiler wants to
/// distinguish "this block is a function body" from "this block introduces
/// a scope").
pub struct Block {
  body : Array[Stmt]
} derive(@debug.Debug)

///|
/// Construct a `Block`.
pub fn Block::new(body : Array[Stmt]) -> Block {
  { body, }
}
