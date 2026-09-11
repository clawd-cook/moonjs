// Expression compilation: lower an `@ast.Expr` into the current chunk's opcode
// stream, leaving one value on the operand stack.

///|
/// Compile a single expression, leaving exactly one value on the stack. All
/// M1 in-scope expression variants are handled here; unsupported variants
/// (arrow, class, template, regexp, optional chaining, spread, yield, await,
/// tagged template) raise `CompileError`.
fn compile_expr(c : Compiler, expr : @ast.Expr) -> Result[Unit, CompileError] {
  let loc = expr.span.start
  match expr.kind {
    Undefined_ => {
      c.top().chunk.emit(@bytecode.OP_PUSH_UNDEF, 0, 0, 0, loc)
      Ok(())
    }
    Null_ => {
      c.top().chunk.emit(@bytecode.OP_PUSH_NULL, 0, 0, 0, loc)
      Ok(())
    }
    Boolean_(true) => {
      c.top().chunk.emit(@bytecode.OP_PUSH_TRUE, 0, 0, 0, loc)
      Ok(())
    }
    Boolean_(false) => {
      c.top().chunk.emit(@bytecode.OP_PUSH_FALSE, 0, 0, 0, loc)
      Ok(())
    }
    NumberLit(d) => compile_number_lit(c, d, loc)
    StringLit(s) => {
      let idx = c.top().chunk.add_const(Str(s))
      c.top().chunk.emit_wide_u32(
        @bytecode.OP_PUSH_CONST,
        idx.reinterpret_as_uint(),
        loc,
      )
      Ok(())
    }
    Identifier(name) => compile_identifier_get(c, name, loc)
    This_ => {
      c.top().chunk.emit(@bytecode.OP_GET_THIS, 0, 0, 0, loc)
      Ok(())
    }
    Binary(op~, lhs~, rhs~) => compile_binary(c, op, lhs, rhs, loc)
    Logical(op~, lhs~, rhs~) => compile_logical(c, op, lhs, rhs, loc)
    Unary(op~, arg~, prefix~) => compile_unary(c, op, arg, prefix, loc)
    Update(op~, arg~, prefix~) => compile_update(c, op, arg, prefix, loc)
    Assign(op~, lhs~, rhs~) => compile_assign(c, op, lhs, rhs, loc)
    Cond(cond~, cons~, alt~) => compile_cond(c, cond, cons, alt, loc)
    Member(obj~, prop~) => {
      match compile_expr(c, obj) {
        Err(e) => return Err(e)
        Ok(_) => ()
      }
      let idx = c.str_const(prop)
      c.top().chunk.emit_wide_u32(
        @bytecode.OP_GET_PROP,
        idx.reinterpret_as_uint(),
        loc,
      )
      Ok(())
    }
    IndexAccess(obj~, index~) => {
      match compile_expr(c, obj) {
        Err(e) => return Err(e)
        Ok(_) => ()
      }
      match compile_expr(c, index) {
        Err(e) => return Err(e)
        Ok(_) => ()
      }
      c.top().chunk.emit(@bytecode.OP_GET_ELEM, 0, 0, 0, loc)
      Ok(())
    }
    Call(callee~, args~) => compile_call(c, callee, args, loc)
    New(callee~, args~) => compile_new(c, callee, args, loc)
    ObjectLit(props~) => compile_object_lit(c, props, loc)
    ArrayLit(elements~) => compile_array_lit(c, elements, loc)
    FnExpr(id~, params~, body~, is_async~, is_generator~) => {
      if is_async || is_generator {
        return Err(
          CompileError(msg="async / generator function requires M2", loc~),
        )
      }
      match compile_function_template(c, id, params, body, loc) {
        Err(e) => return Err(e)
        Ok(nested_idx) => {
          c.top().chunk.emit_wide_u32(
            @bytecode.OP_NEW_CLOSURE,
            nested_idx.reinterpret_as_uint(),
            loc,
          )
          Ok(())
        }
      }
    }
    Sequence(exprs~) => {
      if exprs.length() == 0 {
        c.top().chunk.emit(@bytecode.OP_PUSH_UNDEF, 0, 0, 0, loc)
        return Ok(())
      }
      let mut i = 0
      while i < exprs.length() {
        match compile_expr(c, exprs[i]) {
          Err(e) => return Err(e)
          Ok(_) => ()
        }
        if i < exprs.length() - 1 {
          c.top().chunk.emit(@bytecode.OP_DROP, 0, 0, 0, exprs[i].span.start)
        }
        i = i + 1
      }
      Ok(())
    }
    // M2+ variants:
    ArrowFn(..) => Err(CompileError(msg="arrow function requires M2", loc~))
    ClassExpr(..) => Err(CompileError(msg="class expression requires M2", loc~))
    TemplateLit(..) =>
      Err(CompileError(msg="template literal requires M2", loc~))
    TaggedTemplate(..) =>
      Err(CompileError(msg="tagged template requires M2", loc~))
    RegExpLit(..) => Err(CompileError(msg="regexp literal requires M4", loc~))
    OptionalMember(..) | OptionalIndex(..) | OptionalCall(..) =>
      Err(CompileError(msg="optional chaining requires M2", loc~))
    YieldExpr(..) => Err(CompileError(msg="yield requires M2", loc~))
    AwaitExpr(..) => Err(CompileError(msg="await requires M4", loc~))
    Super_ => Err(CompileError(msg="super requires M2", loc~))
  }
}

///|
/// Push a number literal. Uses `OP_PUSH_I32` (with 24-bit inline or wide) when
/// the value is an integer that fits in 32-bit signed; otherwise adds to the
/// constant pool as `JSValue::Number(d)` and emits `OP_PUSH_CONST`.
fn compile_number_lit(
  c : Compiler,
  d : Double,
  loc : @util.SourceLoc,
) -> Result[Unit, CompileError] {
  let chunk = c.top().chunk
  // Try to fit as a 32-bit signed integer literal.
  let as_int = d.to_int()
  if as_int.to_double() == d && d >= -2147483648.0 && d <= 2147483647.0 {
    chunk.emit_wide_i32(@bytecode.OP_PUSH_I32, as_int, loc)
    Ok(())
  } else {
    // Constant pool fallback.
    let idx = chunk.add_const(Number(d))
    chunk.emit_wide_u32(@bytecode.OP_PUSH_CONST, idx.reinterpret_as_uint(), loc)
    Ok(())
  }
}

///|
/// Emit code to read an identifier's value onto the stack: local slot,
/// upvalue slot, or global name.
fn compile_identifier_get(
  c : Compiler,
  name : String,
  loc : @util.SourceLoc,
) -> Result[Unit, CompileError] {
  let chunk = c.top().chunk
  match c.resolve(name) {
    RefLocal(slot) =>
      chunk.emit_wide_u32(
        @bytecode.OP_GET_LOCAL,
        slot.reinterpret_as_uint(),
        loc,
      )
    RefUpvalue(idx) =>
      chunk.emit_wide_u32(
        @bytecode.OP_GET_UPVALUE,
        idx.reinterpret_as_uint(),
        loc,
      )
    RefGlobal => {
      let name_idx = c.str_const(name)
      chunk.emit_wide_u32(
        @bytecode.OP_GET_GLOBAL,
        name_idx.reinterpret_as_uint(),
        loc,
      )
    }
  }
  Ok(())
}

///|
/// Emit code to write the value on top of the stack to an identifier target.
/// Consumes the top-of-stack value and leaves a duplicate of it on the stack
/// (so the assignment expression yields the assigned value).
fn compile_identifier_set(
  c : Compiler,
  name : String,
  loc : @util.SourceLoc,
) -> Result[Unit, CompileError] {
  let chunk = c.top().chunk
  // Dup so the SET_* opcode's consumption still leaves a copy for the
  // assignment-expression's result.
  chunk.emit(@bytecode.OP_DUP, 0, 0, 0, loc)
  match c.resolve(name) {
    RefLocal(slot) =>
      chunk.emit_wide_u32(
        @bytecode.OP_SET_LOCAL,
        slot.reinterpret_as_uint(),
        loc,
      )
    RefUpvalue(idx) =>
      chunk.emit_wide_u32(
        @bytecode.OP_SET_UPVALUE,
        idx.reinterpret_as_uint(),
        loc,
      )
    RefGlobal => {
      let name_idx = c.str_const(name)
      chunk.emit_wide_u32(
        @bytecode.OP_SET_GLOBAL,
        name_idx.reinterpret_as_uint(),
        loc,
      )
    }
  }
  Ok(())
}

///|
/// Compile a binary operator. `In` and `InstanceOf` fold in here rather than
/// living separately, since they are ES-level `Binary` variants in the AST.
fn compile_binary(
  c : Compiler,
  op : @ast.BinOp,
  lhs : @ast.Expr,
  rhs : @ast.Expr,
  loc : @util.SourceLoc,
) -> Result[Unit, CompileError] {
  match compile_expr(c, lhs) {
    Err(e) => return Err(e)
    Ok(_) => ()
  }
  match compile_expr(c, rhs) {
    Err(e) => return Err(e)
    Ok(_) => ()
  }
  let opcode : Byte = match op {
    Add => @bytecode.OP_ADD
    Sub => @bytecode.OP_SUB
    Mul => @bytecode.OP_MUL
    Div => @bytecode.OP_DIV
    Mod => @bytecode.OP_MOD
    Pow => @bytecode.OP_POW
    BitAnd => @bytecode.OP_BAND
    BitOr => @bytecode.OP_BOR
    BitXor => @bytecode.OP_BXOR
    Shl => @bytecode.OP_SHL
    Shr => @bytecode.OP_SHR
    UShr => @bytecode.OP_USHR
    Eq => @bytecode.OP_EQ
    Ne => @bytecode.OP_NE
    StrictEq => @bytecode.OP_SEQ
    StrictNe => @bytecode.OP_SNE
    Lt => @bytecode.OP_LT
    Le => @bytecode.OP_LE
    Gt => @bytecode.OP_GT
    Ge => @bytecode.OP_GE
    In => @bytecode.OP_IN
    InstanceOf => @bytecode.OP_INSTANCEOF
  }
  c.top().chunk.emit(opcode, 0, 0, 0, loc)
  Ok(())
}

///|
/// Compile a short-circuit logical operator (`&&`, `||`, `??`).
///
/// Emission pattern:
///
/// - `l && r`: eval l; dup; if_false skip; drop; eval r; end.
/// - `l || r`: eval l; dup; if_true skip; drop; eval r; end.
/// - `l ?? r`: JS `== null` is true iff the value is null or undefined,
///   exactly the nullish check. Emit `dup; push_null; eq_loose;
///   if_false <keep_l>; drop; eval r; jump <end>; <keep_l>: (l stays); <end>`.
///   Cost: 2 extra opcodes vs a dedicated `is_nullish`, M1 acceptable.
fn compile_logical(
  c : Compiler,
  op : @ast.LogOp,
  lhs : @ast.Expr,
  rhs : @ast.Expr,
  loc : @util.SourceLoc,
) -> Result[Unit, CompileError] {
  let chunk = c.top().chunk
  match op {
    And => {
      match compile_expr(c, lhs) {
        Err(e) => return Err(e)
        Ok(_) => ()
      }
      chunk.emit(@bytecode.OP_DUP, 0, 0, 0, loc)
      chunk.emit_wide_u32(@bytecode.OP_JUMP_IF_FALSE, 0x1000000, loc)
      let jif_pc = chunk.code.length() - 2
      chunk.emit(@bytecode.OP_DROP, 0, 0, 0, loc)
      match compile_expr(c, rhs) {
        Err(e) => return Err(e)
        Ok(_) => ()
      }
      chunk.patch_jump(jif_pc, chunk.code.length())
      Ok(())
    }
    Or => {
      match compile_expr(c, lhs) {
        Err(e) => return Err(e)
        Ok(_) => ()
      }
      chunk.emit(@bytecode.OP_DUP, 0, 0, 0, loc)
      chunk.emit_wide_u32(@bytecode.OP_JUMP_IF_TRUE, 0x1000000, loc)
      let jit_pc = chunk.code.length() - 2
      chunk.emit(@bytecode.OP_DROP, 0, 0, 0, loc)
      match compile_expr(c, rhs) {
        Err(e) => return Err(e)
        Ok(_) => ()
      }
      chunk.patch_jump(jit_pc, chunk.code.length())
      Ok(())
    }
    NullishCoalescing => {
      match compile_expr(c, lhs) {
        Err(e) => return Err(e)
        Ok(_) => ()
      }
      chunk.emit(@bytecode.OP_DUP, 0, 0, 0, loc)
      chunk.emit(@bytecode.OP_PUSH_NULL, 0, 0, 0, loc)
      chunk.emit(@bytecode.OP_EQ, 0, 0, 0, loc)
      chunk.emit_wide_u32(@bytecode.OP_JUMP_IF_FALSE, 0x1000000, loc)
      let jif_pc = chunk.code.length() - 2
      chunk.emit(@bytecode.OP_DROP, 0, 0, 0, loc)
      match compile_expr(c, rhs) {
        Err(e) => return Err(e)
        Ok(_) => ()
      }
      chunk.emit_wide_i32(@bytecode.OP_JUMP, 0x1000000, loc)
      let end_j_pc = chunk.code.length() - 2
      chunk.patch_jump(jif_pc, chunk.code.length())
      chunk.patch_jump(end_j_pc, chunk.code.length())
      Ok(())
    }
  }
}

///|
/// Compile a unary prefix expression: `+ - ! ~ typeof void delete`.
fn compile_unary(
  c : Compiler,
  op : @ast.UnaryOp,
  arg : @ast.Expr,
  _prefix : Bool,
  loc : @util.SourceLoc,
) -> Result[Unit, CompileError] {
  let chunk = c.top().chunk
  match op {
    UPlus => {
      // JS unary `+` is ToNumber(arg). We can't lower to `0 + arg` because
      // JS `+` string-concatenates when either operand is a String; e.g.
      // `+"5"` must produce Number 5, but `0 + "5"` would produce "05".
      // Use the dedicated OP_TO_NUMBER opcode (0x19) added for this.
      match compile_expr(c, arg) {
        Err(e) => return Err(e)
        Ok(_) => ()
      }
      chunk.emit(@bytecode.OP_TO_NUMBER, 0, 0, 0, loc)
      Ok(())
    }
    UMinus => {
      match compile_expr(c, arg) {
        Err(e) => return Err(e)
        Ok(_) => ()
      }
      chunk.emit(@bytecode.OP_NEG, 0, 0, 0, loc)
      Ok(())
    }
    LogicalNot => {
      match compile_expr(c, arg) {
        Err(e) => return Err(e)
        Ok(_) => ()
      }
      chunk.emit(@bytecode.OP_NOT, 0, 0, 0, loc)
      Ok(())
    }
    BitNot => {
      match compile_expr(c, arg) {
        Err(e) => return Err(e)
        Ok(_) => ()
      }
      chunk.emit(@bytecode.OP_BNOT, 0, 0, 0, loc)
      Ok(())
    }
    TypeOf => {
      // Special case: `typeof foo` where foo is an undeclared identifier
      // must NOT throw — emit GET_GLOBAL_OR_UNDEF instead of GET_GLOBAL.
      // For declared locals / upvalues, normal GET is fine (they exist).
      match arg.kind {
        Identifier(name) =>
          match c.resolve(name) {
            RefLocal(slot) =>
              chunk.emit_wide_u32(
                @bytecode.OP_GET_LOCAL,
                slot.reinterpret_as_uint(),
                arg.span.start,
              )
            RefUpvalue(idx) =>
              chunk.emit_wide_u32(
                @bytecode.OP_GET_UPVALUE,
                idx.reinterpret_as_uint(),
                arg.span.start,
              )
            RefGlobal => {
              let name_idx = c.str_const(name)
              chunk.emit_wide_u32(
                @bytecode.OP_GET_GLOBAL_OR_UNDEF,
                name_idx.reinterpret_as_uint(),
                arg.span.start,
              )
            }
          }
        _ =>
          match compile_expr(c, arg) {
            Err(e) => return Err(e)
            Ok(_) => ()
          }
      }
      chunk.emit(@bytecode.OP_TYPEOF, 0, 0, 0, loc)
      Ok(())
    }
    Void => {
      match compile_expr(c, arg) {
        Err(e) => return Err(e)
        Ok(_) => ()
      }
      chunk.emit(@bytecode.OP_DROP, 0, 0, 0, loc)
      chunk.emit(@bytecode.OP_PUSH_UNDEF, 0, 0, 0, loc)
      Ok(())
    }
    Delete =>
      match arg.kind {
        Member(obj~, prop~) => {
          match compile_expr(c, obj) {
            Err(e) => return Err(e)
            Ok(_) => ()
          }
          let idx = c.str_const(prop)
          chunk.emit_wide_u32(
            @bytecode.OP_DELETE_PROP,
            idx.reinterpret_as_uint(),
            loc,
          )
          Ok(())
        }
        IndexAccess(obj~, index~) => {
          match compile_expr(c, obj) {
            Err(e) => return Err(e)
            Ok(_) => ()
          }
          match compile_expr(c, index) {
            Err(e) => return Err(e)
            Ok(_) => ()
          }
          chunk.emit(@bytecode.OP_DELETE_ELEM, 0, 0, 0, loc)
          Ok(())
        }
        _ => {
          // delete of a non-reference always returns true and has no effect.
          // Still evaluate for side-effects.
          match compile_expr(c, arg) {
            Err(e) => return Err(e)
            Ok(_) => ()
          }
          chunk.emit(@bytecode.OP_DROP, 0, 0, 0, loc)
          chunk.emit(@bytecode.OP_PUSH_TRUE, 0, 0, 0, loc)
          Ok(())
        }
      }
  }
}

///|
/// Compile `++x` / `--x` (prefix) and `x++` / `x--` (postfix).
///
/// Prefix produces the incremented value on the stack; postfix produces the
/// pre-increment value on the stack. Target may be Identifier, Member, or
/// IndexAccess — other targets error at compile time.
///
/// For Member and IndexAccess we use a temporary local slot to preserve the
/// old value across the write. Allocating a temp bumps `local_count` per
/// occurrence; this is acceptable overhead for M1 (avoids introducing an
/// OVER / ROT3 opcode that isn't otherwise needed).
fn compile_update(
  c : Compiler,
  op : @ast.UpdateOp,
  arg : @ast.Expr,
  prefix : Bool,
  loc : @util.SourceLoc,
) -> Result[Unit, CompileError] {
  let chunk = c.top().chunk
  let add_or_sub : Byte = match op {
    Inc => @bytecode.OP_ADD
    Dec => @bytecode.OP_SUB
  }
  match arg.kind {
    Identifier(name) => {
      match compile_identifier_get(c, name, loc) {
        Err(e) => return Err(e)
        Ok(_) => ()
      }
      // JS spec: ++/-- first coerces the LHS to Number, then increments.
      // Without ToNumber, `let a = true; a++;` would try to do `true + 1`
      // and leave `Number(2.0)` behind, but `a++` should first ToNumber(true)
      // → 1, then produce Number(2) — and the pre-increment value bound to
      // any postfix consumer should be `1`, not `true`.
      chunk.emit(@bytecode.OP_TO_NUMBER, 0, 0, 0, loc)
      // stack: old(ToNumber'd)
      if prefix {
        // Compute new, write back leaving new on top.
        chunk.emit_wide_i32(@bytecode.OP_PUSH_I32, 1, loc)
        chunk.emit(add_or_sub, 0, 0, 0, loc)
        // stack: new
        match compile_identifier_set(c, name, loc) {
          Err(e) => return Err(e)
          Ok(_) => ()
        }
        // SET_LOCAL / SET_UPVALUE / SET_GLOBAL peek — stack still: new.
        Ok(())
      } else {
        // Postfix: stash old in a temp, compute new, write, restore old.
        let temp_old = chunk.alloc_local()
        chunk.emit(@bytecode.OP_DUP, 0, 0, 0, loc) // old, old
        chunk.emit_wide_u32(
          @bytecode.OP_SET_LOCAL,
          temp_old.reinterpret_as_uint(),
          loc,
        )
        // SET_LOCAL peeks, so stack still: old, old.
        chunk.emit(@bytecode.OP_DROP, 0, 0, 0, loc) // stack: old
        chunk.emit_wide_i32(@bytecode.OP_PUSH_I32, 1, loc)
        chunk.emit(add_or_sub, 0, 0, 0, loc) // stack: new
        // Write new to the identifier.
        match c.resolve(name) {
          RefLocal(slot) =>
            chunk.emit_wide_u32(
              @bytecode.OP_SET_LOCAL,
              slot.reinterpret_as_uint(),
              loc,
            )
          RefUpvalue(idx) =>
            chunk.emit_wide_u32(
              @bytecode.OP_SET_UPVALUE,
              idx.reinterpret_as_uint(),
              loc,
            )
          RefGlobal => {
            let name_idx = c.str_const(name)
            chunk.emit_wide_u32(
              @bytecode.OP_SET_GLOBAL,
              name_idx.reinterpret_as_uint(),
              loc,
            )
          }
        }
        // SET_* peeked new; stack still: new. Drop it and restore old.
        chunk.emit(@bytecode.OP_DROP, 0, 0, 0, loc)
        chunk.emit_wide_u32(
          @bytecode.OP_GET_LOCAL,
          temp_old.reinterpret_as_uint(),
          loc,
        )
        // stack: old
        Ok(())
      }
    }
    Member(obj~, prop~) =>
      compile_update_member(c, op, obj, prop, prefix, loc, add_or_sub)
    IndexAccess(obj~, index~) =>
      compile_update_index(c, op, obj, index, prefix, loc, add_or_sub)
    _ =>
      Err(
        CompileError(
          msg="cannot apply ++/-- to non-reference",
          loc=arg.span.start,
        ),
      )
  }
}

///|
/// Prefix / postfix `++` / `--` for `obj.prop`. See compile_update.
fn compile_update_member(
  c : Compiler,
  _op : @ast.UpdateOp,
  obj : @ast.Expr,
  prop : String,
  prefix : Bool,
  loc : @util.SourceLoc,
  add_or_sub : Byte,
) -> Result[Unit, CompileError] {
  let chunk = c.top().chunk
  let name_idx = c.str_const(prop)
  match compile_expr(c, obj) {
    Err(e) => return Err(e)
    Ok(_) => ()
  }
  chunk.emit(@bytecode.OP_DUP, 0, 0, 0, loc) // obj, obj
  chunk.emit_wide_u32(
    @bytecode.OP_GET_PROP,
    name_idx.reinterpret_as_uint(),
    loc,
  )
  // stack: obj, old
  // JS spec: ToNumber first, then increment. See compile_update for rationale.
  chunk.emit(@bytecode.OP_TO_NUMBER, 0, 0, 0, loc)
  // stack: obj, old(ToNumber'd)
  if prefix {
    chunk.emit_wide_i32(@bytecode.OP_PUSH_I32, 1, loc)
    chunk.emit(add_or_sub, 0, 0, 0, loc)
    // stack: obj, new
    chunk.emit_wide_u32(
      @bytecode.OP_SET_PROP,
      name_idx.reinterpret_as_uint(),
      loc,
    )
    // SET_PROP consumes obj+val and pushes val (new). stack: new.
    Ok(())
  } else {
    // Postfix: stash old in a temp local so we can restore it after the write.
    let temp_old = chunk.alloc_local()
    // stack: obj, old
    chunk.emit(@bytecode.OP_DUP, 0, 0, 0, loc) // obj, old, old
    chunk.emit_wide_u32(
      @bytecode.OP_SET_LOCAL,
      temp_old.reinterpret_as_uint(),
      loc,
    )
    // SET_LOCAL peeks; stack: obj, old, old.
    chunk.emit(@bytecode.OP_DROP, 0, 0, 0, loc) // stack: obj, old
    chunk.emit_wide_i32(@bytecode.OP_PUSH_I32, 1, loc)
    // stack: obj, old, 1
    chunk.emit(add_or_sub, 0, 0, 0, loc)
    // stack: obj, new
    chunk.emit_wide_u32(
      @bytecode.OP_SET_PROP,
      name_idx.reinterpret_as_uint(),
      loc,
    )
    // stack: new (SET_PROP pops [obj, val] and pushes val)
    chunk.emit(@bytecode.OP_DROP, 0, 0, 0, loc)
    // stack: (empty)
    chunk.emit_wide_u32(
      @bytecode.OP_GET_LOCAL,
      temp_old.reinterpret_as_uint(),
      loc,
    )
    // stack: old
    Ok(())
  }
}

///|
/// Prefix / postfix `++` / `--` for `obj[idx]`. Same temp-slot strategy as
/// compile_update_member, but we need temps for both obj and idx since each
/// may have side-effects and must be evaluated exactly once.
fn compile_update_index(
  c : Compiler,
  _op : @ast.UpdateOp,
  obj : @ast.Expr,
  index : @ast.Expr,
  prefix : Bool,
  loc : @util.SourceLoc,
  add_or_sub : Byte,
) -> Result[Unit, CompileError] {
  let chunk = c.top().chunk
  // Evaluate obj once, stash in temp_obj.
  match compile_expr(c, obj) {
    Err(e) => return Err(e)
    Ok(_) => ()
  }
  let temp_obj = chunk.alloc_local()
  chunk.emit(@bytecode.OP_DUP, 0, 0, 0, loc)
  chunk.emit_wide_u32(
    @bytecode.OP_SET_LOCAL,
    temp_obj.reinterpret_as_uint(),
    loc,
  )
  // SET_LOCAL peeks; stack: obj, obj.
  chunk.emit(@bytecode.OP_DROP, 0, 0, 0, loc)
  // stack: obj
  match compile_expr(c, index) {
    Err(e) => return Err(e)
    Ok(_) => ()
  }
  let temp_idx = chunk.alloc_local()
  chunk.emit(@bytecode.OP_DUP, 0, 0, 0, loc)
  chunk.emit_wide_u32(
    @bytecode.OP_SET_LOCAL,
    temp_idx.reinterpret_as_uint(),
    loc,
  )
  // stack: obj, idx, idx
  chunk.emit(@bytecode.OP_DROP, 0, 0, 0, loc)
  // stack: obj, idx
  chunk.emit(@bytecode.OP_GET_ELEM, 0, 0, 0, loc)
  // stack: old
  // JS spec: ToNumber first, then increment.
  chunk.emit(@bytecode.OP_TO_NUMBER, 0, 0, 0, loc)
  // stack: old(ToNumber'd)
  let temp_old = chunk.alloc_local()
  chunk.emit(@bytecode.OP_DUP, 0, 0, 0, loc)
  chunk.emit_wide_u32(
    @bytecode.OP_SET_LOCAL,
    temp_old.reinterpret_as_uint(),
    loc,
  )
  // stack: old, old
  chunk.emit(@bytecode.OP_DROP, 0, 0, 0, loc)
  // stack: old
  chunk.emit_wide_i32(@bytecode.OP_PUSH_I32, 1, loc)
  // stack: old, 1
  chunk.emit(add_or_sub, 0, 0, 0, loc)
  // stack: new
  let temp_new = chunk.alloc_local()
  chunk.emit(@bytecode.OP_DUP, 0, 0, 0, loc)
  chunk.emit_wide_u32(
    @bytecode.OP_SET_LOCAL,
    temp_new.reinterpret_as_uint(),
    loc,
  )
  // stack: new, new
  chunk.emit(@bytecode.OP_DROP, 0, 0, 0, loc)
  // stack: new
  chunk.emit(@bytecode.OP_DROP, 0, 0, 0, loc)
  // stack: (empty)
  // Write obj[idx] = new.
  chunk.emit_wide_u32(
    @bytecode.OP_GET_LOCAL,
    temp_obj.reinterpret_as_uint(),
    loc,
  )
  chunk.emit_wide_u32(
    @bytecode.OP_GET_LOCAL,
    temp_idx.reinterpret_as_uint(),
    loc,
  )
  chunk.emit_wide_u32(
    @bytecode.OP_GET_LOCAL,
    temp_new.reinterpret_as_uint(),
    loc,
  )
  // stack: obj, idx, new
  chunk.emit(@bytecode.OP_SET_ELEM, 0, 0, 0, loc)
  // stack: new (SET_ELEM pops [obj, idx, new] and pushes val)
  chunk.emit(@bytecode.OP_DROP, 0, 0, 0, loc)
  // Push the final result.
  if prefix {
    chunk.emit_wide_u32(
      @bytecode.OP_GET_LOCAL,
      temp_new.reinterpret_as_uint(),
      loc,
    )
  } else {
    chunk.emit_wide_u32(
      @bytecode.OP_GET_LOCAL,
      temp_old.reinterpret_as_uint(),
      loc,
    )
  }
  Ok(())
}

///|
/// Compile an assignment expression. Target must be Identifier, Member, or
/// IndexAccess. Compound assignments (`+=` etc.) read the LHS, apply the
/// op with the RHS, then write back. Simple `=` just writes the RHS.
fn compile_assign(
  c : Compiler,
  op : @ast.AssignOp,
  lhs : @ast.Expr,
  rhs : @ast.Expr,
  loc : @util.SourceLoc,
) -> Result[Unit, CompileError] {
  match op {
    Assign => compile_assign_simple(c, lhs, rhs, loc)
    _ => compile_assign_compound(c, op, lhs, rhs, loc)
  }
}

///|
/// Plain `lhs = rhs`. Compile rhs, then store into the target, leaving the
/// value on the stack for the expression's result.
fn compile_assign_simple(
  c : Compiler,
  lhs : @ast.Expr,
  rhs : @ast.Expr,
  loc : @util.SourceLoc,
) -> Result[Unit, CompileError] {
  let chunk = c.top().chunk
  match lhs.kind {
    Identifier(name) => {
      match compile_expr(c, rhs) {
        Err(e) => return Err(e)
        Ok(_) => ()
      }
      compile_identifier_set(c, name, loc)
    }
    Member(obj~, prop~) => {
      match compile_expr(c, obj) {
        Err(e) => return Err(e)
        Ok(_) => ()
      }
      match compile_expr(c, rhs) {
        Err(e) => return Err(e)
        Ok(_) => ()
      }
      let name_idx = c.str_const(prop)
      chunk.emit_wide_u32(
        @bytecode.OP_SET_PROP,
        name_idx.reinterpret_as_uint(),
        loc,
      )
      // SET_PROP already leaves val on the stack.
      Ok(())
    }
    IndexAccess(obj~, index~) => {
      match compile_expr(c, obj) {
        Err(e) => return Err(e)
        Ok(_) => ()
      }
      match compile_expr(c, index) {
        Err(e) => return Err(e)
        Ok(_) => ()
      }
      match compile_expr(c, rhs) {
        Err(e) => return Err(e)
        Ok(_) => ()
      }
      chunk.emit(@bytecode.OP_SET_ELEM, 0, 0, 0, loc)
      Ok(())
    }
    _ => Err(CompileError(msg="invalid assignment target", loc=lhs.span.start))
  }
}

///|
/// Compound assign `x <op>= y`. For `&&=`, `||=`, `??=` we lower to short-
/// circuit sequences; other compound assigns lower to `x = x <op> y` with
/// duplicated LHS reads.
fn compile_assign_compound(
  c : Compiler,
  op : @ast.AssignOp,
  lhs : @ast.Expr,
  rhs : @ast.Expr,
  loc : @util.SourceLoc,
) -> Result[Unit, CompileError] {
  // For the M1 subset, only compound-add / -sub etc. on identifiers are
  // exercised by the AC. Full support for compound assign on Member / Index
  // is possible but verbose (needs the temp-slot pattern from
  // compile_update_member). For M1 we implement the identifier path fully
  // and the Member/Index paths with the same temp-slot strategy.
  match op {
    AndAssign | OrAssign | NullishAssign =>
      // These are short-circuit; not exercised in M1 AC. Reject cleanly.
      return Err(
        CompileError(
          msg="short-circuit compound assign (&&=, ||=, ??=) requires M2",
          loc~,
        ),
      )
    _ => ()
  }
  let bin_op = binop_of_assign(op)
  match lhs.kind {
    Identifier(name) => {
      // Read x, eval rhs, apply op, write x, leave value.
      match compile_identifier_get(c, name, loc) {
        Err(e) => return Err(e)
        Ok(_) => ()
      }
      match compile_expr(c, rhs) {
        Err(e) => return Err(e)
        Ok(_) => ()
      }
      c.top().chunk.emit(bin_op, 0, 0, 0, loc)
      compile_identifier_set(c, name, loc)
    }
    Member(obj~, prop~) => {
      // temp_obj = obj; read obj.prop; op with rhs; write obj.prop.
      let chunk = c.top().chunk
      match compile_expr(c, obj) {
        Err(e) => return Err(e)
        Ok(_) => ()
      }
      chunk.emit(@bytecode.OP_DUP, 0, 0, 0, loc) // obj, obj
      let name_idx = c.str_const(prop)
      chunk.emit_wide_u32(
        @bytecode.OP_GET_PROP,
        name_idx.reinterpret_as_uint(),
        loc,
      )
      // stack: obj, old
      match compile_expr(c, rhs) {
        Err(e) => return Err(e)
        Ok(_) => ()
      }
      chunk.emit(bin_op, 0, 0, 0, loc)
      // stack: obj, new
      chunk.emit_wide_u32(
        @bytecode.OP_SET_PROP,
        name_idx.reinterpret_as_uint(),
        loc,
      )
      // stack: new
      Ok(())
    }
    IndexAccess(obj~, index~) => {
      let chunk = c.top().chunk
      // Evaluate obj and idx once each; stash in temps.
      match compile_expr(c, obj) {
        Err(e) => return Err(e)
        Ok(_) => ()
      }
      let temp_obj = chunk.alloc_local()
      chunk.emit(@bytecode.OP_DUP, 0, 0, 0, loc)
      chunk.emit_wide_u32(
        @bytecode.OP_SET_LOCAL,
        temp_obj.reinterpret_as_uint(),
        loc,
      )
      // stack: obj
      match compile_expr(c, index) {
        Err(e) => return Err(e)
        Ok(_) => ()
      }
      let temp_idx = chunk.alloc_local()
      chunk.emit(@bytecode.OP_DUP, 0, 0, 0, loc)
      chunk.emit_wide_u32(
        @bytecode.OP_SET_LOCAL,
        temp_idx.reinterpret_as_uint(),
        loc,
      )
      // stack: obj, idx
      chunk.emit(@bytecode.OP_GET_ELEM, 0, 0, 0, loc)
      // stack: old
      match compile_expr(c, rhs) {
        Err(e) => return Err(e)
        Ok(_) => ()
      }
      chunk.emit(bin_op, 0, 0, 0, loc)
      // stack: new
      chunk.emit_wide_u32(
        @bytecode.OP_GET_LOCAL,
        temp_obj.reinterpret_as_uint(),
        loc,
      )
      // stack: new, obj
      chunk.emit_wide_u32(
        @bytecode.OP_GET_LOCAL,
        temp_idx.reinterpret_as_uint(),
        loc,
      )
      // stack: new, obj, idx
      // Now we need [obj, idx, new] with new on top. new is at the bottom.
      // Use a temp for new too.
      let temp_new = chunk.alloc_local()
      // Currently top: idx. 2nd: obj. 3rd: new.
      // Rearrange via: drop idx / obj (temps hold them), get_local new,
      // then re-push obj, idx, new. That's cleaner:
      chunk.emit(@bytecode.OP_DROP, 0, 0, 0, loc) // drop idx (we still have temp_idx)
      chunk.emit(@bytecode.OP_DROP, 0, 0, 0, loc) // drop obj (we still have temp_obj)
      // stack: new
      chunk.emit(@bytecode.OP_DUP, 0, 0, 0, loc)
      chunk.emit_wide_u32(
        @bytecode.OP_SET_LOCAL,
        temp_new.reinterpret_as_uint(),
        loc,
      )
      chunk.emit(@bytecode.OP_DROP, 0, 0, 0, loc)
      // stack: (empty)
      chunk.emit_wide_u32(
        @bytecode.OP_GET_LOCAL,
        temp_obj.reinterpret_as_uint(),
        loc,
      )
      chunk.emit_wide_u32(
        @bytecode.OP_GET_LOCAL,
        temp_idx.reinterpret_as_uint(),
        loc,
      )
      chunk.emit_wide_u32(
        @bytecode.OP_GET_LOCAL,
        temp_new.reinterpret_as_uint(),
        loc,
      )
      // stack: obj, idx, new
      chunk.emit(@bytecode.OP_SET_ELEM, 0, 0, 0, loc)
      // stack: new
      Ok(())
    }
    _ => Err(CompileError(msg="invalid assignment target", loc=lhs.span.start))
  }
}

///|
/// Map an `AssignOp` to its corresponding binary opcode.
fn binop_of_assign(op : @ast.AssignOp) -> Byte {
  match op {
    AddAssign => @bytecode.OP_ADD
    SubAssign => @bytecode.OP_SUB
    MulAssign => @bytecode.OP_MUL
    DivAssign => @bytecode.OP_DIV
    ModAssign => @bytecode.OP_MOD
    PowAssign => @bytecode.OP_POW
    ShlAssign => @bytecode.OP_SHL
    ShrAssign => @bytecode.OP_SHR
    UShrAssign => @bytecode.OP_USHR
    BitAndAssign => @bytecode.OP_BAND
    BitOrAssign => @bytecode.OP_BOR
    BitXorAssign => @bytecode.OP_BXOR
    // Assign / AndAssign / OrAssign / NullishAssign don't map to a binary op;
    // callers guard against these.
    _ => @bytecode.OP_NOP
  }
}

///|
/// Ternary `cond ? cons : alt`.
fn compile_cond(
  c : Compiler,
  cond : @ast.Expr,
  cons : @ast.Expr,
  alt : @ast.Expr,
  loc : @util.SourceLoc,
) -> Result[Unit, CompileError] {
  let chunk = c.top().chunk
  match compile_expr(c, cond) {
    Err(e) => return Err(e)
    Ok(_) => ()
  }
  chunk.emit_wide_u32(@bytecode.OP_JUMP_IF_FALSE, 0x1000000, loc)
  let jif_pc = chunk.code.length() - 2
  match compile_expr(c, cons) {
    Err(e) => return Err(e)
    Ok(_) => ()
  }
  chunk.emit_wide_i32(@bytecode.OP_JUMP, 0x1000000, loc)
  let j_pc = chunk.code.length() - 2
  chunk.patch_jump(jif_pc, chunk.code.length())
  match compile_expr(c, alt) {
    Err(e) => return Err(e)
    Ok(_) => ()
  }
  chunk.patch_jump(j_pc, chunk.code.length())
  Ok(())
}

///|
/// Function call `f(args)`. If the callee is a Member / IndexAccess we emit
/// `OP_CALL_METHOD` with the receiver on the stack; otherwise plain `OP_CALL`.
fn compile_call(
  c : Compiler,
  callee : @ast.Expr,
  args : Array[@ast.Argument],
  loc : @util.SourceLoc,
) -> Result[Unit, CompileError] {
  let chunk = c.top().chunk
  // Validate no ArgSpread.
  for a in args {
    match a {
      ArgSpread(_) =>
        return Err(CompileError(msg="spread argument requires M2", loc~))
      _ => ()
    }
  }
  match callee.kind {
    Member(obj~, prop~) => {
      // Stack for CALL_METHOD: this, fn, args...
      match compile_expr(c, obj) {
        Err(e) => return Err(e)
        Ok(_) => ()
      }
      // Dup this for property lookup.
      chunk.emit(@bytecode.OP_DUP, 0, 0, 0, loc) // this, this
      let name_idx = c.str_const(prop)
      chunk.emit_wide_u32(
        @bytecode.OP_GET_PROP,
        name_idx.reinterpret_as_uint(),
        loc,
      )
      // stack: this, fn
      for a in args {
        match a {
          ArgExpr(e) =>
            match compile_expr(c, e) {
              Err(err) => return Err(err)
              Ok(_) => ()
            }
          ArgSpread(_) => ()
        }
      }
      // stack: this, fn, args...
      chunk.emit_wide_u32(
        @bytecode.OP_CALL_METHOD,
        args.length().reinterpret_as_uint(),
        loc,
      )
      Ok(())
    }
    IndexAccess(obj~, index~) => {
      match compile_expr(c, obj) {
        Err(e) => return Err(e)
        Ok(_) => ()
      }
      chunk.emit(@bytecode.OP_DUP, 0, 0, 0, loc) // this, this
      match compile_expr(c, index) {
        Err(e) => return Err(e)
        Ok(_) => ()
      }
      chunk.emit(@bytecode.OP_GET_ELEM, 0, 0, 0, loc)
      // stack: this, fn
      for a in args {
        match a {
          ArgExpr(e) =>
            match compile_expr(c, e) {
              Err(err) => return Err(err)
              Ok(_) => ()
            }
          ArgSpread(_) => ()
        }
      }
      chunk.emit_wide_u32(
        @bytecode.OP_CALL_METHOD,
        args.length().reinterpret_as_uint(),
        loc,
      )
      Ok(())
    }
    _ => {
      // Plain call: fn, args...
      match compile_expr(c, callee) {
        Err(e) => return Err(e)
        Ok(_) => ()
      }
      for a in args {
        match a {
          ArgExpr(e) =>
            match compile_expr(c, e) {
              Err(err) => return Err(err)
              Ok(_) => ()
            }
          ArgSpread(_) => ()
        }
      }
      chunk.emit_wide_u32(
        @bytecode.OP_CALL,
        args.length().reinterpret_as_uint(),
        loc,
      )
      Ok(())
    }
  }
}

///|
/// Constructor call `new f(args)`. Stack layout: fn, args...
fn compile_new(
  c : Compiler,
  callee : @ast.Expr,
  args : Array[@ast.Argument],
  loc : @util.SourceLoc,
) -> Result[Unit, CompileError] {
  let chunk = c.top().chunk
  for a in args {
    match a {
      ArgSpread(_) =>
        return Err(CompileError(msg="spread argument requires M2", loc~))
      _ => ()
    }
  }
  match compile_expr(c, callee) {
    Err(e) => return Err(e)
    Ok(_) => ()
  }
  for a in args {
    match a {
      ArgExpr(e) =>
        match compile_expr(c, e) {
          Err(err) => return Err(err)
          Ok(_) => ()
        }
      ArgSpread(_) => ()
    }
  }
  chunk.emit_wide_u32(
    @bytecode.OP_CONSTRUCT,
    args.length().reinterpret_as_uint(),
    loc,
  )
  Ok(())
}

///|
/// Object literal `{a: 1, b: 2, x}`. Emits `NEW_OBJECT`, then for each
/// key-value pair evaluates the value and calls `DEFINE_PROP`. Unsupported
/// property kinds (methods, getters, setters, spread, computed, private)
/// raise CompileError.
fn compile_object_lit(
  c : Compiler,
  props : Array[@ast.ObjectProperty],
  loc : @util.SourceLoc,
) -> Result[Unit, CompileError] {
  let chunk = c.top().chunk
  chunk.emit(@bytecode.OP_NEW_OBJECT, 0, 0, 0, loc)
  for p in props {
    match p {
      KeyValue(key~, value~, shorthand=_) => {
        let key_name = match key {
          IdKey(n) => n
          StringKey(s) => s
          NumberKey(d) => number_key_to_string(d)
          ComputedKey(_) =>
            return Err(CompileError(msg="computed key requires M2", loc~))
          PrivateKey(_) =>
            return Err(CompileError(msg="private field requires M2", loc~))
        }
        match compile_expr(c, value) {
          Err(e) => return Err(e)
          Ok(_) => ()
        }
        // stack: obj, val
        let name_idx = c.str_const(key_name)
        chunk.emit_wide_u32(
          @bytecode.OP_DEFINE_PROP,
          name_idx.reinterpret_as_uint(),
          value.span.start,
        )
        // stack: obj (DEFINE_PROP consumes val and leaves obj)
      }
      MethodShorthand(..) =>
        return Err(CompileError(msg="method shorthand requires M2", loc~))
      Getter(..) => return Err(CompileError(msg="getter requires M3", loc~))
      Setter(..) => return Err(CompileError(msg="setter requires M3", loc~))
      SpreadProp(_) =>
        return Err(CompileError(msg="spread property requires M2", loc~))
    }
  }
  Ok(())
}

///|
/// Convert a number-key to its JS-canonical string form. Matches
/// ES `ToPropertyKey` for the numeric case.
fn number_key_to_string(d : Double) -> String {
  let as_int = d.to_int()
  if as_int.to_double() == d && d >= -2147483648.0 && d <= 2147483647.0 {
    as_int.to_string()
  } else {
    d.to_string()
  }
}

///|
/// Array literal `[a, b, ...c]`. Emits `NEW_ARRAY`, then for each element
/// either an item (evaluate + ARRAY_PUSH) or a hole (push undefined + push).
/// Spread requires M2.
fn compile_array_lit(
  c : Compiler,
  elements : Array[@ast.ArrayElement],
  loc : @util.SourceLoc,
) -> Result[Unit, CompileError] {
  let chunk = c.top().chunk
  // Hint length as A operand of NEW_ARRAY.
  chunk.emit_wide_u32(
    @bytecode.OP_NEW_ARRAY,
    elements.length().reinterpret_as_uint(),
    loc,
  )
  for el in elements {
    match el {
      Item(e) => {
        match compile_expr(c, e) {
          Err(err) => return Err(err)
          Ok(_) => ()
        }
        chunk.emit(@bytecode.OP_ARRAY_PUSH, 0, 0, 0, e.span.start)
      }
      Hole => {
        chunk.emit(@bytecode.OP_PUSH_UNDEF, 0, 0, 0, loc)
        chunk.emit(@bytecode.OP_ARRAY_PUSH, 0, 0, 0, loc)
      }
      ArrayElementSpread(_) =>
        return Err(CompileError(msg="array spread requires M2", loc~))
    }
  }
  Ok(())
}
