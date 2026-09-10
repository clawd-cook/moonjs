// Compiler: AST -> Bytecode lowering.
//
// The compiler walks the AST tree produced by the parser and emits M1 opcodes
// into a `@bytecode.Chunk`. Design references: design.md §7 (compiler algorithm,
// TDZ, upvalue capture), design.md §4.3 (opcode table), design.md §7.3 (unsupported
// nodes).
//
// Architecture: a single top-level `Compiler` value owns a stack of
// `FunctionCompiler` frames — the outermost is the script itself, and each
// nested function pushes a new frame that resolves upvalues via the frames
// beneath it. Compilation of a `Program` emits directly into the top-level
// script chunk and returns it; nested function templates end up in
// `chunk.nested_chunks` and are referenced by `OP_NEW_CLOSURE nested_idx`.
//
// M1 semantics simplifications (documented deviations from strict spec):
//
// - TDZ (temporal dead zone) is elided: `let x` without an initialiser is
//   treated as `let x = undefined`. Complete TDZ modeling is left to M6.
// - `??` (nullish coalescing) is compiled as `l == null ? r : l` — this
//   emits inline (no separate opcode). Same for `??=` / `&&=` / `||=`.
// - `+x` (unary plus) emits as `0 + x` — no dedicated `ToNumber` opcode.
// - `typeof <identifier>` when the identifier is not a local/upvalue emits
//   `OP_GET_GLOBAL_OR_UNDEF <name>; OP_TYPEOF` — added as opcode 0x17 in this
//   step (see bytecode/opcode.mbt).
// - `this` is stored in a dedicated `Frame.this_val` field (see design.md
//   §8.1) rather than a local slot. `This_` compiles to `OP_GET_THIS`
//   (opcode 0x18, introduced in this step). This avoids interference with
//   parameter slot numbering and matches the design's Frame layout.
// - Reserved-keyword-in-identifier positions (e.g. `a.if`, `{if: 1}`) work
//   because the parser normalises those to `IdKey(String)` / `Member.prop:
//   String` — the compiler treats them as plain strings.

///|
/// Compilation error carrying a source location. Modeled after `LexError` /
/// `ParseError` (both `pub(all) suberror` with a single constructor); callers
/// treat it as an opaque error value except when they want to display the
/// message + location.
pub(all) suberror CompileError {
  CompileError(msg~ : String, loc~ : @util.SourceLoc)
} derive(@debug.Debug)

///|
/// Entry-point compiler. Stateless from the outside — construct with
/// `Compiler::new()`, call `compile_script`, discard. Kept as a struct rather
/// than a bare function so M2+ can add compiler-wide state (interners, symbol
/// tables) without changing the public API.
///
/// Internally holds the stack of `FunctionCompiler` frames during a single
/// `compile_script` call; each call resets the stack. No cross-call state
/// leaks — safe to reuse the same `Compiler` for successive scripts.
pub struct Compiler {
  priv fn_stack : Array[FunctionCompiler]
}

///|
/// Construct a fresh compiler. Kept trivial so callers do not need to know
/// there is a mutable stack inside.
pub fn Compiler::new() -> Compiler {
  { fn_stack: [], }
}

///|
/// Compile a parsed `Program` into a top-level `Chunk`. On success the chunk
/// contains everything needed to execute: opcodes, constant pool, source
/// locations, nested function templates. On failure returns a `CompileError`
/// pointing at the first offending AST node.
///
/// `filename` is stored in the chunk (and every nested chunk) for stack-trace
/// rendering by the VM in Step 8.
pub fn Compiler::compile_script(
  self : Compiler,
  program : @ast.Program,
  filename : String,
) -> Result[@bytecode.Chunk, CompileError] {
  // Top-level chunk. param_count = 0, no params; `this` is bound to
  // `undefined` at script level and accessed via OP_GET_THIS.
  let chunk = @bytecode.Chunk::new("<top>", filename, 0)
  let fc = FunctionCompiler::new(chunk, is_top_level=true)
  self.fn_stack.push(fc)
  // Hoist function declarations to the top of the script.
  match hoist_and_compile_body(self, program.body, is_script=true) {
    Err(e) => return Err(e)
    Ok(_) => ()
  }
  let _ = self.fn_stack.pop()
  // Every chunk needs a terminating return to make the VM main loop exit
  // cleanly. Emit at the last known source location (or (1,1) if empty).
  let last_loc = if chunk.source_locs.length() > 0 {
    chunk.source_locs[chunk.source_locs.length() - 1]
  } else {
    @util.SourceLoc::new(1, 1)
  }
  chunk.emit(@bytecode.OP_RETURN_UNDEF, 0, 0, 0, last_loc)
  Ok(chunk)
}

///|
/// One block scope's contribution to lexical bookkeeping. Only `let`/`const`
/// bindings register a scope depth (used to reject same-depth redeclaration
/// and — in a future TDZ-complete milestone — to detect access before
/// initialisation).
///
/// The compiler never shrinks `local_count` on scope exit — MoonBit's stack
/// runs on a fixed-size FixedArray per function, and reusing slots requires
/// analysis we defer to M6.
///
/// M1 only reads `name` and `slot` — additional invariants (kind, depth,
/// initialized, is_captured) are omitted here because their consumers live in
/// M6 / Step 8 respectively; adding them now would produce unused-field
/// warnings under `--deny-warn`. Step 8 (VM) will re-introduce the
/// `is_captured` flag when it wires upvalue close-on-return.
priv struct LocalDecl {
  name : String
  slot : Int
}

///|
/// A pending patch site for `break` / `continue`. `pc` is the index (into
/// `chunk.code`) of the emitted jump instruction; the compiler rewrites its
/// operand once the branch target is known.
priv struct LoopFrame {
  break_patches : Array[Int]
  continue_patches : Array[Int]
  label : String?
}

///|
/// A labeled statement's frame — used both for labeled loops (which are also
/// `LoopFrame`s in the loop stack) and for labeled non-loop statements
/// (labeled block, labeled if, ...). For non-loop labels, only `break` targets
/// this frame; `continue` errors.
priv struct LabelFrame {
  name : String
  break_patches : Array[Int]
  is_loop : Bool
}

///|
/// State for compiling one function body (or the top-level script).
///
/// Owns the `Chunk` under construction, the flat list of `locals`, and stacks
/// for tracking break/continue jump patch sites. A nested function compilation
/// pushes a new `FunctionCompiler` onto `Compiler.fn_stack`; identifier
/// resolution walks the stack from top to bottom.
priv struct FunctionCompiler {
  chunk : @bytecode.Chunk
  locals : Array[LocalDecl]
  upvalue_names : Array[String]
  mut scope_depth : Int
  loop_stack : Array[LoopFrame]
  label_stack : Array[LabelFrame]
  is_top_level : Bool
}

///|
fn FunctionCompiler::new(
  chunk : @bytecode.Chunk,
  is_top_level~ : Bool,
) -> FunctionCompiler {
  {
    chunk,
    locals: [],
    upvalue_names: [],
    scope_depth: 0,
    loop_stack: [],
    label_stack: [],
    is_top_level,
  }
}

///|
/// Current (top) function-compiler frame. Aborts if the stack is empty —
/// callers should only reach this while inside `compile_script`.
fn Compiler::top(self : Compiler) -> FunctionCompiler {
  if self.fn_stack.length() == 0 {
    abort("Compiler::top: fn_stack is empty (internal invariant broken)")
  }
  self.fn_stack[self.fn_stack.length() - 1]
}

// ---------------------------------------------------------------------------
// Scope helpers
// ---------------------------------------------------------------------------

///|
/// Declare a new local slot for a `let`/`const` binding at the current scope
/// depth. Returns the slot index. Same-depth redeclaration of a
/// `let`/`const` is a `SyntaxError` — but detecting that correctly requires
/// distinguishing `var` (hoisted, redeclare-ok) from `let`/`const`, which
/// M1's simplified scope handles: `var` bindings are all pre-declared at
/// depth 0 during hoisting; the local-declare path here is `let`/`const` only.
///
/// The `kind` parameter is currently unused (see LocalDecl doc) but kept in
/// the signature so future TDZ / redeclare-check work doesn't need every
/// caller updated. Silence the unused-arg lint by pattern-matching to `_`.
fn FunctionCompiler::declare_local(
  self : FunctionCompiler,
  name : String,
  _kind : @ast.VarKind,
) -> Int {
  let slot = self.chunk.alloc_local()
  self.locals.push({ name, slot, })
  slot
}

///|
/// Find a local slot by name, searching from most-recent declaration
/// backward. Returns the slot index if the name is bound in this function's
/// scope; `None` otherwise (caller then tries upvalue / global resolution).
fn FunctionCompiler::find_local(self : FunctionCompiler, name : String) -> Int? {
  let mut i = self.locals.length() - 1
  while i >= 0 {
    if self.locals[i].name == name {
      return Some(self.locals[i].slot)
    }
    i = i - 1
  }
  None
}

///|
/// Placeholder for a future "mark this local as captured by a nested
/// function" hook. Currently a no-op — VM Step 8 will re-introduce the flag
/// on `LocalDecl` and consume it at frame-return time to decide which locals
/// need closing over (see design.md §8.3).
fn FunctionCompiler::mark_captured(
  self : FunctionCompiler,
  _slot : Int,
) -> Unit {
  let _ = self
  ()
}

///|
/// Resolve an identifier reference. Returns one of:
///
/// - `RefLocal(slot)`: the name binds to a local in the current function.
/// - `RefUpvalue(idx)`: the name binds through the upvalue capture plan.
///   The upvalue was either newly allocated (and the chain of
///   `add_upvalue` calls was walked up the fn_stack) or was already present.
/// - `RefGlobal`: not resolved anywhere below — treat as a global.
priv enum Resolution {
  RefLocal(Int)
  RefUpvalue(Int)
  RefGlobal
}

///|
/// Try to resolve `name` as an upvalue in the function at `depth` (0 = top of
/// stack). Recursively walks outer functions, allocating capture slots as it
/// goes. Returns `None` if no enclosing scope defines the name (globals fall
/// through to `RefGlobal` at the caller).
fn Compiler::resolve_upvalue(
  self : Compiler,
  depth : Int,
  name : String,
) -> Int? {
  // If `depth` is the outermost frame, we can only resolve here — no parent
  // to close over from. `depth == fn_stack.length() - 1` is the script itself.
  if depth >= self.fn_stack.length() - 1 {
    return None
  }
  let parent_depth = depth + 1
  let parent = self.fn_stack[self.fn_stack.length() - 1 - parent_depth]
  match parent.find_local(name) {
    Some(slot) => {
      parent.mark_captured(slot)
      // Add an upvalue slot on `self.fn_stack[depth]`'s chunk.
      let this_fn = self.fn_stack[self.fn_stack.length() - 1 - depth]
      Some(this_fn_add_upvalue(this_fn, name, Local, slot))
    }
    None =>
      // Try further outward.
      match self.resolve_upvalue(parent_depth, name) {
        Some(parent_upvalue_idx) => {
          let this_fn = self.fn_stack[self.fn_stack.length() - 1 - depth]
          Some(
            this_fn_add_upvalue(
              this_fn,
              name,
              ParentUpvalue,
              parent_upvalue_idx,
            ),
          )
        }
        None => None
      }
  }
}

///|
/// Add (or reuse) an upvalue slot on a function's chunk. Deduplicates by
/// `(from_kind, from_idx)` — if the same capture source is already tracked,
/// return the existing index.
fn this_fn_add_upvalue(
  fc : FunctionCompiler,
  name : String,
  from_kind : @bytecode.UpvalueFromKind,
  from_idx : Int,
) -> Int {
  for i in 0..<fc.chunk.upvalue_slots.length() {
    let uv = fc.chunk.upvalue_slots[i]
    if uv.from_kind == from_kind && uv.from_idx == from_idx {
      return i
    }
  }
  let idx = fc.chunk.add_upvalue(
    @bytecode.UpvalueSlotDecl::new(from_kind, from_idx),
  )
  fc.upvalue_names.push(name)
  idx
}

///|
/// Resolve an identifier at the current top-of-stack function. Delegates to
/// `resolve_upvalue` when the local table doesn't contain the name.
fn Compiler::resolve(self : Compiler, name : String) -> Resolution {
  let top = self.top()
  match top.find_local(name) {
    Some(slot) => RefLocal(slot)
    None =>
      match self.resolve_upvalue(0, name) {
        Some(idx) => RefUpvalue(idx)
        None => RefGlobal
      }
  }
}

///|
/// Add a string to the current chunk's constant pool as a `JSValue::Str`.
/// Returns the pool index — used as the operand for opcodes that take a name.
fn Compiler::str_const(self : Compiler, s : String) -> Int {
  self.top().chunk.add_const(Str(s))
}

// ---------------------------------------------------------------------------
// Hoisting / body compile
// ---------------------------------------------------------------------------

///|
/// Compile a statement list, performing hoisting up-front:
///
/// - Function declarations bind their name eagerly (before the first
///   statement runs), matching ES `FunctionDeclaration` hoisting.
/// - `var` declarations pre-allocate their local slot / global name (their
///   value is `undefined` until the actual initialiser runs — but the slot
///   / global exists so `typeof x` / early reads see `undefined`).
///
/// `is_script` toggles between top-level (declarations become globals) and
/// function-body (declarations become locals). Nested block scopes call
/// `compile_stmt_list_scoped` instead, which increments `scope_depth` but
/// does not hoist (block-scoped `let`/`const` don't hoist).
fn hoist_and_compile_body(
  c : Compiler,
  body : Array[@ast.Stmt],
  is_script~ : Bool,
) -> Result[Unit, CompileError] {
  // Pre-pass: collect names to hoist. In a function body, hoisted names
  // become locals declared at depth 0 (before any block-scoped declaration).
  // At script level, hoisted `var` bindings become globals (declared via
  // `OP_DECLARE_GLOBAL`), and function declarations get their closure emitted
  // and stored in a global.
  let hoisted_fns : Array[
    (String, Array[@ast.Pattern], @ast.Block, @util.SourceLoc),
  ] = []
  let hoisted_vars : Array[(String, @util.SourceLoc)] = []
  collect_hoisted(body, hoisted_fns, hoisted_vars)
  // Emit hoisted `var` declarations first (function names may shadow — the
  // spec says function declaration binding wins).
  if is_script {
    for entry in hoisted_vars {
      let (name, loc) = entry
      let idx = c.str_const(name)
      // 0=var kind.
      let top = c.top()
      top.chunk.emit_wide_u32(
        @bytecode.OP_DECLARE_GLOBAL,
        idx.reinterpret_as_uint(),
        loc,
      )
    }
  } else {
    let top = c.top()
    for entry in hoisted_vars {
      let (name, _loc) = entry
      // Only declare if not already declared as a parameter / earlier var.
      match top.find_local(name) {
        Some(_) => ()
        None => {
          let _ = top.declare_local(name, Var)
        }
      }
    }
  }
  // Emit hoisted function declarations second.
  for entry in hoisted_fns {
    let (name, params, block, loc) = entry
    match compile_function_template(c, Some(name), params, block, loc) {
      Err(e) => return Err(e)
      Ok(nested_idx) => {
        let top = c.top()
        top.chunk.emit_wide_u32(
          @bytecode.OP_NEW_CLOSURE,
          nested_idx.reinterpret_as_uint(),
          loc,
        )
        if is_script {
          // Global binding.
          let name_idx = c.str_const(name)
          top.chunk.emit_wide_u32(
            @bytecode.OP_DECLARE_GLOBAL,
            name_idx.reinterpret_as_uint(),
            loc,
          )
          top.chunk.emit_wide_u32(
            @bytecode.OP_SET_GLOBAL,
            name_idx.reinterpret_as_uint(),
            loc,
          )
          top.chunk.emit(@bytecode.OP_DROP, 0, 0, 0, loc)
        } else {
          // Local binding. Declare (or reuse) the slot.
          let slot = match top.find_local(name) {
            Some(s) => s
            None => top.declare_local(name, Var)
          }
          top.chunk.emit_wide_u32(
            @bytecode.OP_SET_LOCAL,
            slot.reinterpret_as_uint(),
            loc,
          )
          top.chunk.emit(@bytecode.OP_DROP, 0, 0, 0, loc)
        }
      }
    }
  }
  // Compile the body statements. Function declarations are skipped here
  // because the hoist pass has already emitted their closures.
  for stmt in body {
    match stmt.kind {
      FunctionDecl(..) => () // already hoisted
      _ =>
        match compile_stmt(c, stmt) {
          Err(e) => return Err(e)
          Ok(_) => ()
        }
    }
  }
  Ok(())
}

///|
/// Walk a statement list collecting names that should be hoisted:
///
/// - Function declarations: `FunctionDecl(id, params, body)` — collected
///   fully so the caller can build the nested chunk in one pass.
/// - `var` declarations: name only (initialisers stay in-place and run when
///   the source-order statement executes).
///
/// Does NOT descend into nested function bodies (each function's hoisting
/// is done separately when that function is compiled). Descends into
/// block statements, if/else branches, loop bodies, try/catch/finally so
/// hoisting picks up `var`s declared inside those constructs.
fn collect_hoisted(
  body : Array[@ast.Stmt],
  hoisted_fns : Array[
    (String, Array[@ast.Pattern], @ast.Block, @util.SourceLoc),
  ],
  hoisted_vars : Array[(String, @util.SourceLoc)],
) -> Unit {
  for stmt in body {
    collect_hoisted_stmt(stmt, hoisted_fns, hoisted_vars)
  }
}

///|
fn collect_hoisted_stmt(
  stmt : @ast.Stmt,
  hoisted_fns : Array[
    (String, Array[@ast.Pattern], @ast.Block, @util.SourceLoc),
  ],
  hoisted_vars : Array[(String, @util.SourceLoc)],
) -> Unit {
  match stmt.kind {
    FunctionDecl(id~, params~, body~, is_async~, is_generator~) =>
      if !is_async && !is_generator {
        hoisted_fns.push((id, params, body, stmt.span.start))
      }
    VarDecl(kind=Var, decls~) =>
      for d in decls {
        match d.pat.kind {
          IdentPat(name~) => hoisted_vars.push((name, d.pat.span.start))
          _ => () // destructured var — compile step will error; skip hoist
        }
      }
    BlockStmt(body~) => collect_hoisted(body, hoisted_fns, hoisted_vars)
    If(cons~, alt~, ..) => {
      collect_hoisted_stmt(cons, hoisted_fns, hoisted_vars)
      match alt {
        Some(s) => collect_hoisted_stmt(s, hoisted_fns, hoisted_vars)
        None => ()
      }
    }
    While(body~, ..) => collect_hoisted_stmt(body, hoisted_fns, hoisted_vars)
    DoWhile(body~, ..) => collect_hoisted_stmt(body, hoisted_fns, hoisted_vars)
    For(init~, body~, ..) => {
      match init {
        Some(InitVar(kind=Var, decls~)) =>
          for d in decls {
            match d.pat.kind {
              IdentPat(name~) => hoisted_vars.push((name, d.pat.span.start))
              _ => ()
            }
          }
        _ => ()
      }
      collect_hoisted_stmt(body, hoisted_fns, hoisted_vars)
    }
    Try(body~, catch_~, finally_~) => {
      collect_hoisted(body, hoisted_fns, hoisted_vars)
      match catch_ {
        Some(c) => collect_hoisted(c.body, hoisted_fns, hoisted_vars)
        None => ()
      }
      match finally_ {
        Some(fbody) => collect_hoisted(fbody, hoisted_fns, hoisted_vars)
        None => ()
      }
    }
    Labeled(body~, ..) => collect_hoisted_stmt(body, hoisted_fns, hoisted_vars)
    _ => ()
  }
}

///|
/// Compile a function template. Creates a new `FunctionCompiler`, pushes it
/// on the stack, compiles the body, then pops. The result is the index of the
/// nested chunk inside the parent's `nested_chunks` array (used as operand to
/// `OP_NEW_CLOSURE`).
///
/// `id_opt` is the function's name for display / debug (`"<anonymous>"` for
/// unnamed function expressions).
///
/// Package-private helper — the entry point is `Compiler::compile_script`.
fn compile_function_template(
  c : Compiler,
  id_opt : String?,
  params : Array[@ast.Pattern],
  body : @ast.Block,
  loc : @util.SourceLoc,
) -> Result[Int, CompileError] {
  // Ensure params are plain identifiers (M1 restriction).
  for p in params {
    match p.kind {
      IdentPat(..) => ()
      _ =>
        return Err(
          CompileError(
            msg="destructured / default parameters require M2",
            loc=p.span.start,
          ),
        )
    }
  }
  let name = match id_opt {
    Some(n) => n
    None => "<anonymous>"
  }
  let parent_chunk = c.top().chunk
  let filename = parent_chunk.filename
  // Chunk::new sets local_count = param_count. Params occupy slots
  // 0..param_count-1. `this` lives outside the locals table — see design.md
  // §8.1's `Frame.this_val`; compiler emits OP_GET_THIS for it.
  let child = @bytecode.Chunk::new(name, filename, params.length())
  let fc = FunctionCompiler::new(child, is_top_level=false)
  c.fn_stack.push(fc)
  // Register parameters as locals. `Chunk::new` already advanced
  // `local_count` to params.length(); we mirror that in the compiler's
  // `locals` array without additional alloc_local calls, so the slot indices
  // match `chunk.local_count`'s pre-loop value.
  for i in 0..<params.length() {
    let p = params[i]
    let pname = match p.kind {
      IdentPat(name~) => name
      _ => "<?>"
    }
    fc.locals.push({ name: pname, slot: i, })
  }
  // If the function expression has a name, bind that name as a local visible
  // inside the body (so recursive references work). ES spec sets up an outer
  // scope; we approximate by declaring a local of the name. Assignment inside
  // rebinds — imperfect but sufficient for M1's AC (test_closure2 exercises
  // this via `var expr_func = function myfunc1(n) { ... myfunc1(n-1) ... }`).
  match id_opt {
    Some(fn_name) =>
      match fc.find_local(fn_name) {
        Some(_) => ()
        None => {
          // For a named function expression, the name binds to the function
          // value. The VM populates this slot at call time when it sees the
          // chunk's `self_binding_slot` field set.
          let slot = fc.declare_local(fn_name, Const)
          child.set_self_binding_slot(slot)
        }
      }
    None => ()
  }
  // Body: hoist function decls / vars, then compile statements in order.
  match hoist_and_compile_body(c, body.body, is_script=false) {
    Err(e) => {
      let _ = c.fn_stack.pop()
      return Err(e)
    }
    Ok(_) => ()
  }
  // Ensure the function always returns something (fallthrough → undefined).
  child.emit(@bytecode.OP_RETURN_UNDEF, 0, 0, 0, loc)
  let _ = c.fn_stack.pop()
  let idx = parent_chunk.add_nested(child)
  Ok(idx)
}
