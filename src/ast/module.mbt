// Module-syntax AST nodes: `import`, `export`, and top-level `Program`.
//
// Module syntax is parsed today (Q4 decision: parser is complete in M1) but
// its lowering / linking is **M5**. M1 compiler raises `NotImplementedYet`
// on `ImportDeclStmt` / `ExportDeclStmt`.

///|
/// Top-level script or module. `is_module = true` for ECMAScript modules
/// (which enable strict-mode-by-default and allow import/export), else it's
/// a classic script. Storing this as a flag rather than a `Script | Module`
/// variant keeps downstream `Program`-consuming code single-branch.
pub struct Program {
  body : Array[Stmt]
  is_module : Bool
} derive(@debug.Debug)

///|
/// Construct a `Program`.
pub fn Program::new(body : Array[Stmt], is_module : Bool) -> Program {
  { body, is_module, }
}

///|
/// `import ... from "source"` declaration.
///
/// - `source`: the module specifier string.
/// - `specifiers`: named / default / namespace bindings introduced.
/// - `attrs`: ES2025 import attributes (`with { type: "json" }`). Empty for
///   plain imports.
pub struct ImportDecl {
  source : String
  specifiers : Array[ImportSpecifier]
  attrs : Array[ImportAttribute]
} derive(@debug.Debug)

///|
/// Construct an `ImportDecl`.
pub fn ImportDecl::new(
  source : String,
  specifiers : Array[ImportSpecifier],
  attrs : Array[ImportAttribute],
) -> ImportDecl {
  { source, specifiers, attrs, }
}

///|
/// One binding introduced by an import. `local_name` is the name the
/// import binds into the current module's scope. (The word `local` is a
/// MoonBit reserved keyword, so we spell out `local_name` to avoid clashing.)
///
/// - `Default(local_name)`: `import foo from "mod"` → `local_name="foo"`.
/// - `Namespace(local_name)`: `import * as ns from "mod"` →
///   `local_name="ns"`.
/// - `Named(imported, local_name)`: `import { a as b } from "mod"` →
///   `imported="a", local_name="b"`. When not renamed, both match.
pub(all) enum ImportSpecifier {
  Default(local_name~ : String)
  Namespace(local_name~ : String)
  Named(imported~ : String, local_name~ : String)
} derive(@debug.Debug)

///|
/// A single `with { key: "value" }` import attribute. ES2025 restricts
/// attribute values to string literals, so `value: String` is fine.
pub struct ImportAttribute {
  key : String
  value : String
} derive(@debug.Debug)

///|
/// Construct an `ImportAttribute`.
pub fn ImportAttribute::new(key : String, value : String) -> ImportAttribute {
  { key, value, }
}

///|
/// `export ...` declaration.
///
/// - `ExportNamed`: `export { a, b as c };` or `export { a } from "mod";`
///   (`source` is `Some` for re-exports).
/// - `ExportDefault(decl)`: `export default expr;` where expr may be an
///   expression, a function declaration, or a class declaration.
/// - `ExportAll(source, exported)`: `export * from "mod"` (`exported = None`)
///   or `export * as ns from "mod"` (`exported = Some("ns")`).
pub(all) enum ExportDecl {
  ExportNamed(specifiers~ : Array[ExportSpecifier], source~ : String?)
  ExportDefault(DefaultExport)
  ExportAll(source~ : String, exported~ : String?)
} derive(@debug.Debug)

///|
/// One rename entry in `export { local_name as exported }`. When unrenamed,
/// both fields match. (`local` renamed to `local_name` to avoid the
/// MoonBit reserved keyword.)
pub struct ExportSpecifier {
  local_name : String
  exported : String
} derive(@debug.Debug)

///|
/// Construct an `ExportSpecifier`.
pub fn ExportSpecifier::new(
  local_name : String,
  exported : String,
) -> ExportSpecifier {
  { local_name, exported, }
}

///|
/// The payload of `export default ...`. `DefExpr` covers the general
/// `export default expr;` form; `DefFn` and `DefClass` are the two hoisted
/// declarations spec-permitted specifically after `default`. We keep them
/// as distinct variants (rather than folding into `DefExpr` with a special
/// case) because they behave differently at link time — a
/// `function foo() {}` after `default` still hoists a name binding into the
/// module scope, whereas `export default (function foo() {})` does not.
pub(all) enum DefaultExport {
  DefExpr(Expr)
  DefFn(
    id~ : String?,
    params~ : Array[Pattern],
    body~ : Block,
    is_async~ : Bool,
    is_generator~ : Bool
  )
  DefClass(id~ : String?, super_class~ : Expr?, body~ : ClassBody)
} derive(@debug.Debug)
