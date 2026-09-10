// Blackbox tests for the ast package: node construction, span preservation,
// and debug_inspect snapshots. Exercises the public API only; internals
// hide behind the constructor helpers.
//
// We do NOT exhaustively cover every variant — the point of these tests is
// (a) confirm the wrapper struct + `pub(all) enum` encoding works end-to-end,
// (b) lock in the Debug output shape so downstream snapshot tests
// (parser/compiler) have a stable baseline, and (c) verify that every module
// (expr/stmt/pattern/class/module) constructs and prints without runtime
// errors. Variant-specific correctness is the parser's / compiler's concern.

///|
/// Trivial `SourceSpan` used by every test that doesn't care about the loc.
fn span0() -> @util.SourceSpan {
  @util.SourceSpan::new(@util.SourceLoc::new(1, 0), @util.SourceLoc::new(1, 0))
}

///|
test "Expr::new preserves span and kind" {
  let s = @util.SourceSpan::new(
    @util.SourceLoc::new(1, 0),
    @util.SourceLoc::new(1, 5),
  )
  let e = @ast.Expr::new(NumberLit(42.0), s)
  @test.assert_eq(e.span, s)
  match e.kind {
    NumberLit(n) => @test.assert_eq(n, 42.0)
    _ => fail("expected NumberLit")
  }
}

///|
test "Expr literal variants debug_inspect" {
  let e_undef = @ast.Expr::new(Undefined_, span0())
  debug_inspect(
    e_undef.kind,
    content=(
      #|Undefined_
    ),
  )
  let e_null = @ast.Expr::new(Null_, span0())
  debug_inspect(e_null.kind, content="Null_")
  let e_bool = @ast.Expr::new(Boolean_(true), span0())
  debug_inspect(e_bool.kind, content="Boolean_(true)")
  let e_num = @ast.Expr::new(NumberLit(3.14), span0())
  debug_inspect(e_num.kind, content="NumberLit(3.14)")
  let e_str = @ast.Expr::new(StringLit("hi"), span0())
  debug_inspect(e_str.kind, content="StringLit(\"hi\")")
  let e_this = @ast.Expr::new(This_, span0())
  debug_inspect(e_this.kind, content="This_")
  let e_super = @ast.Expr::new(Super_, span0())
  debug_inspect(e_super.kind, content="Super_")
  let e_id = @ast.Expr::new(Identifier("x"), span0())
  debug_inspect(e_id.kind, content="Identifier(\"x\")")
}

///|
test "Binary expression 1 + 2 constructs and inspects" {
  // "1 + 2" AST: Binary(Add, NumberLit(1), NumberLit(2))
  let one = @ast.Expr::new(NumberLit(1.0), span0())
  let two = @ast.Expr::new(NumberLit(2.0), span0())
  let e = @ast.Expr::new(Binary(op=Add, lhs=one, rhs=two), span0())
  match e.kind {
    Binary(op~, lhs~, rhs~) => {
      @test.assert_eq(op, Add)
      match lhs.kind {
        NumberLit(1.0) => ()
        _ => fail("lhs should be NumberLit(1.0)")
      }
      match rhs.kind {
        NumberLit(2.0) => ()
        _ => fail("rhs should be NumberLit(2.0)")
      }
    }
    _ => fail("expected Binary")
  }
}

///|
test "Logical expression short-circuit uses LogOp" {
  let a = @ast.Expr::new(Identifier("a"), span0())
  let b = @ast.Expr::new(Identifier("b"), span0())
  let e = @ast.Expr::new(Logical(op=And, lhs=a, rhs=b), span0())
  match e.kind {
    Logical(op~, ..) => @test.assert_eq(op, And)
    _ => fail("expected Logical")
  }
}

///|
test "Unary and Update operators" {
  let x = @ast.Expr::new(Identifier("x"), span0())
  // typeof x
  let e_typeof = @ast.Expr::new(Unary(op=TypeOf, arg=x, prefix=true), span0())
  match e_typeof.kind {
    Unary(op~, prefix~, ..) => {
      @test.assert_eq(op, TypeOf)
      @test.assert_eq(prefix, true)
    }
    _ => fail("expected Unary")
  }
  // x++
  let e_postinc = @ast.Expr::new(Update(op=Inc, arg=x, prefix=false), span0())
  match e_postinc.kind {
    Update(op~, prefix~, ..) => {
      @test.assert_eq(op, Inc)
      @test.assert_eq(prefix, false)
    }
    _ => fail("expected Update")
  }
}

///|
test "Assign expression covers compound ops" {
  let x = @ast.Expr::new(Identifier("x"), span0())
  let one = @ast.Expr::new(NumberLit(1.0), span0())
  let e = @ast.Expr::new(Assign(op=AddAssign, lhs=x, rhs=one), span0())
  match e.kind {
    Assign(op~, ..) => @test.assert_eq(op, AddAssign)
    _ => fail("expected Assign")
  }
}

///|
test "Cond ternary preserves branches" {
  let c = @ast.Expr::new(Identifier("c"), span0())
  let a = @ast.Expr::new(Identifier("a"), span0())
  let b = @ast.Expr::new(Identifier("b"), span0())
  let e = @ast.Expr::new(Cond(cond=c, cons=a, alt=b), span0())
  match e.kind {
    Cond(..) => ()
    _ => fail("expected Cond")
  }
}

///|
test "Member and IndexAccess distinguish static from computed" {
  let obj = @ast.Expr::new(Identifier("obj"), span0())
  let m = @ast.Expr::new(Member(obj~, prop="p"), span0())
  match m.kind {
    Member(prop~, ..) => @test.assert_eq(prop, "p")
    _ => fail("expected Member")
  }
  let idx = @ast.Expr::new(NumberLit(0.0), span0())
  let i = @ast.Expr::new(IndexAccess(obj~, index=idx), span0())
  match i.kind {
    IndexAccess(..) => ()
    _ => fail("expected IndexAccess")
  }
}

///|
test "Call arguments include ArgExpr and ArgSpread" {
  let f = @ast.Expr::new(Identifier("f"), span0())
  let a = @ast.Expr::new(Identifier("a"), span0())
  let b = @ast.Expr::new(Identifier("b"), span0())
  let args : Array[@ast.Argument] = [ArgExpr(a), ArgSpread(b)]
  let call = @ast.Expr::new(Call(callee=f, args~), span0())
  match call.kind {
    Call(args~, ..) => @test.assert_eq(args.length(), 2)
    _ => fail("expected Call")
  }
}

///|
test "ArrayLit supports Hole, Item, Spread" {
  let a = @ast.Expr::new(NumberLit(1.0), span0())
  let b = @ast.Expr::new(NumberLit(2.0), span0())
  let arr : Array[@ast.ArrayElement] = [Item(a), Hole, ArrayElementSpread(b)]
  let e = @ast.Expr::new(ArrayLit(elements=arr), span0())
  match e.kind {
    ArrayLit(elements~) => @test.assert_eq(elements.length(), 3)
    _ => fail("expected ArrayLit")
  }
}

///|
test "ObjectLit KeyValue and MethodShorthand" {
  let one = @ast.Expr::new(NumberLit(1.0), span0())
  let params : Array[@ast.Pattern] = []
  let body = @ast.Block::new([])
  let meta = @ast.FnMeta::new(params, body, false, false)
  let props : Array[@ast.ObjectProperty] = [
    KeyValue(key=IdKey("a"), value=one, shorthand=false),
    MethodShorthand(key=IdKey("m"), fn_meta=meta),
  ]
  let e = @ast.Expr::new(ObjectLit(props~), span0())
  match e.kind {
    ObjectLit(props~) => @test.assert_eq(props.length(), 2)
    _ => fail("expected ObjectLit")
  }
}

///|
test "FnExpr with parameters" {
  let x_pat = @ast.Pattern::new(IdentPat(name="x"), span0())
  let params = [x_pat]
  let body = @ast.Block::new([])
  let e = @ast.Expr::new(
    FnExpr(id=Some("foo"), params~, body~, is_async=false, is_generator=false),
    span0(),
  )
  match e.kind {
    FnExpr(id~, params~, ..) => {
      @test.assert_eq(id, Some("foo"))
      @test.assert_eq(params.length(), 1)
    }
    _ => fail("expected FnExpr")
  }
}

///|
test "ArrowFn body is either ExprBody or BlockBody" {
  let x_pat = @ast.Pattern::new(IdentPat(name="x"), span0())
  let x = @ast.Expr::new(Identifier("x"), span0())
  let arrow = @ast.Expr::new(
    ArrowFn(params=[x_pat], body=ExprBody(x), is_async=false),
    span0(),
  )
  match arrow.kind {
    ArrowFn(body~, ..) =>
      match body {
        ExprBody(_) => ()
        _ => fail("expected ExprBody")
      }
    _ => fail("expected ArrowFn")
  }
}

///|
test "If statement carries alt branch when present" {
  let cond = @ast.Expr::new(Identifier("c"), span0())
  let cons = @ast.Stmt::new(Empty, span0())
  let alt = @ast.Stmt::new(Empty, span0())
  let s = @ast.Stmt::new(If(cond~, cons~, alt=Some(alt)), span0())
  match s.kind {
    If(alt~, ..) =>
      match alt {
        Some(_) => ()
        None => fail("expected Some alt")
      }
    _ => fail("expected If")
  }
}

///|
test "For loop with declaration and update" {
  let x_pat = @ast.Pattern::new(IdentPat(name="i"), span0())
  let zero = @ast.Expr::new(NumberLit(0.0), span0())
  let decl = @ast.VarDeclarator::new(x_pat, Some(zero))
  let ten = @ast.Expr::new(NumberLit(10.0), span0())
  let i = @ast.Expr::new(Identifier("i"), span0())
  let cond = @ast.Expr::new(Binary(op=Lt, lhs=i, rhs=ten), span0())
  let update = @ast.Expr::new(Update(op=Inc, arg=i, prefix=false), span0())
  let body = @ast.Stmt::new(Empty, span0())
  let s = @ast.Stmt::new(
    For(
      init=Some(InitVar(kind=Let, decls=[decl])),
      cond=Some(cond),
      update=Some(update),
      body~,
    ),
    span0(),
  )
  match s.kind {
    For(init~, cond~, update~, ..) => {
      assert_true(init is Some(_))
      assert_true(cond is Some(_))
      assert_true(update is Some(_))
    }
    _ => fail("expected For")
  }
}

///|
test "Try/catch/finally shape" {
  let param = @ast.Pattern::new(IdentPat(name="e"), span0())
  let catch_ = @ast.CatchClause::new(Some(param), [])
  let s = @ast.Stmt::new(
    Try(body=[], catch_=Some(catch_), finally_=Some([])),
    span0(),
  )
  match s.kind {
    Try(catch_~, finally_~, ..) => {
      assert_true(catch_ is Some(_))
      assert_true(finally_ is Some(_))
    }
    _ => fail("expected Try")
  }
}

///|
test "VarDecl with multiple declarators" {
  let a_pat = @ast.Pattern::new(IdentPat(name="a"), span0())
  let b_pat = @ast.Pattern::new(IdentPat(name="b"), span0())
  let one = @ast.Expr::new(NumberLit(1.0), span0())
  let s = @ast.Stmt::new(
    VarDecl(kind=Let, decls=[
      @ast.VarDeclarator::new(a_pat, Some(one)),
      @ast.VarDeclarator::new(b_pat, None),
    ]),
    span0(),
  )
  match s.kind {
    VarDecl(kind~, decls~) => {
      @test.assert_eq(kind, Let)
      @test.assert_eq(decls.length(), 2)
    }
    _ => fail("expected VarDecl")
  }
}

///|
test "FunctionDecl carries id and metadata" {
  let x = @ast.Pattern::new(IdentPat(name="x"), span0())
  let body = @ast.Block::new([])
  let s = @ast.Stmt::new(
    FunctionDecl(
      id="foo",
      params=[x],
      body~,
      is_async=false,
      is_generator=false,
    ),
    span0(),
  )
  match s.kind {
    FunctionDecl(id~, params~, ..) => {
      @test.assert_eq(id, "foo")
      @test.assert_eq(params.length(), 1)
    }
    _ => fail("expected FunctionDecl")
  }
}

///|
test "Break and Continue with and without label" {
  let s1 = @ast.Stmt::new(Break(label=None), span0())
  match s1.kind {
    Break(label~) => @test.assert_eq(label, None)
    _ => fail("expected Break")
  }
  let s2 = @ast.Stmt::new(Continue(label=Some("outer")), span0())
  match s2.kind {
    Continue(label~) => @test.assert_eq(label, Some("outer"))
    _ => fail("expected Continue")
  }
}

///|
test "Pattern::new preserves span and kind" {
  let span = @util.SourceSpan::new(
    @util.SourceLoc::new(2, 4),
    @util.SourceLoc::new(2, 5),
  )
  let p = @ast.Pattern::new(IdentPat(name="q"), span)
  @test.assert_eq(p.span, span)
  match p.kind {
    IdentPat(name~) => @test.assert_eq(name, "q")
    _ => fail("expected IdentPat")
  }
}

///|
test "Destructuring pattern shapes construct" {
  let a_pat = @ast.Pattern::new(IdentPat(name="a"), span0())
  let b_pat = @ast.Pattern::new(IdentPat(name="b"), span0())
  // { a, b } = ...
  let obj_pat = @ast.Pattern::new(
    ObjectPat(
      props=[
        @ast.ObjectPatProp::new(IdKey("a"), a_pat, false, true),
        @ast.ObjectPatProp::new(IdKey("b"), b_pat, false, true),
      ],
      rest=None,
    ),
    span0(),
  )
  match obj_pat.kind {
    ObjectPat(props~, ..) => @test.assert_eq(props.length(), 2)
    _ => fail("expected ObjectPat")
  }
  // [a, , b]
  let arr_pat = @ast.Pattern::new(
    ArrayPat(elements=[PatItem(a_pat), PatHole, PatItem(b_pat)], rest=None),
    span0(),
  )
  match arr_pat.kind {
    ArrayPat(elements~, ..) => @test.assert_eq(elements.length(), 3)
    _ => fail("expected ArrayPat")
  }
}

///|
test "Class members: method / prop / static block" {
  let body = @ast.Block::new([])
  let m = @ast.MethodDef::new(
    IdKey("foo"),
    Method,
    false,
    false,
    [],
    body,
    false,
    false,
  )
  let prop = @ast.PropDef::new(IdKey("x"), None, true, false)
  let members : Array[@ast.ClassMember] = [
    MethodDefMember(m),
    PropDefMember(prop),
    StaticBlock(body=[]),
  ]
  let cb = @ast.ClassBody::new(members)
  @test.assert_eq(cb.members.length(), 3)
}

///|
test "Program is script vs module" {
  let script = @ast.Program::new([], false)
  @test.assert_eq(script.is_module, false)
  let mod = @ast.Program::new([], true)
  @test.assert_eq(mod.is_module, true)
}

///|
test "ImportDecl variants" {
  let specs : Array[@ast.ImportSpecifier] = [
    Default(local_name="foo"),
    Namespace(local_name="ns"),
    Named(imported="a", local_name="b"),
  ]
  let imp = @ast.ImportDecl::new("mod", specs, [
    @ast.ImportAttribute::new("type", "json"),
  ])
  @test.assert_eq(imp.source, "mod")
  @test.assert_eq(imp.specifiers.length(), 3)
  @test.assert_eq(imp.attrs.length(), 1)
}

///|
test "ExportDecl variants" {
  let e1 : @ast.ExportDecl = ExportNamed(
    specifiers=[@ast.ExportSpecifier::new("a", "b")],
    source=None,
  )
  match e1 {
    ExportNamed(specifiers~, source~) => {
      @test.assert_eq(specifiers.length(), 1)
      @test.assert_eq(source, None)
    }
    _ => fail("expected ExportNamed")
  }
  let e2 : @ast.ExportDecl = ExportAll(source="./x", exported=Some("ns"))
  match e2 {
    ExportAll(source~, exported~) => {
      @test.assert_eq(source, "./x")
      @test.assert_eq(exported, Some("ns"))
    }
    _ => fail("expected ExportAll")
  }
  let one = @ast.Expr::new(NumberLit(1.0), span0())
  let e3 : @ast.ExportDecl = ExportDefault(DefExpr(one))
  match e3 {
    ExportDefault(DefExpr(_)) => ()
    _ => fail("expected ExportDefault(DefExpr)")
  }
}

///|
test "Compound AST 1 + 2 debug snapshot" {
  // Full round-trip: build the AST for `1 + 2`, then snapshot the Debug
  // output. Locks the encoding so downstream parser snapshots have a stable
  // baseline.
  let one_span = @util.SourceSpan::new(
    @util.SourceLoc::new(1, 0),
    @util.SourceLoc::new(1, 1),
  )
  let two_span = @util.SourceSpan::new(
    @util.SourceLoc::new(1, 4),
    @util.SourceLoc::new(1, 5),
  )
  let plus_span = @util.SourceSpan::new(
    @util.SourceLoc::new(1, 0),
    @util.SourceLoc::new(1, 5),
  )
  let one = @ast.Expr::new(NumberLit(1.0), one_span)
  let two = @ast.Expr::new(NumberLit(2.0), two_span)
  let plus = @ast.Expr::new(Binary(op=Add, lhs=one, rhs=two), plus_span)
  debug_inspect(
    plus,
    content=(
      #|{
      #|  span: { start: { line: 1, col: 0 }, end: { line: 1, col: 5 } },
      #|  kind: Binary(
      #|    op=Add,
      #|    lhs={
      #|      span: { start: { line: 1, col: 0 }, end: { line: 1, col: 1 } },
      #|      kind: NumberLit(1),
      #|    },
      #|    rhs={
      #|      span: { start: { line: 1, col: 4 }, end: { line: 1, col: 5 } },
      #|      kind: NumberLit(2),
      #|    },
      #|  ),
      #|}
    ),
  )
}

///|
test "If-else statement debug snapshot" {
  let s = @ast.Stmt::new(
    If(
      cond=@ast.Expr::new(Boolean_(true), span0()),
      cons=@ast.Stmt::new(Empty, span0()),
      alt=Some(@ast.Stmt::new(Empty, span0())),
    ),
    span0(),
  )
  // We don't pin the exact Debug output for the whole subtree here (it would
  // be enormous). Instead we assert on the outer shape via a match — the
  // snapshot in the 1+2 test already covers Debug format stability.
  match s.kind {
    If(cond~, ..) =>
      match cond.kind {
        Boolean_(true) => ()
        _ => fail("cond should be Boolean_(true)")
      }
    _ => fail("expected If")
  }
}

///|
test "BinOp equality (used by parser table)" {
  @test.assert_eq((Add : @ast.BinOp), Add)
  assert_true((Add : @ast.BinOp) != Sub)
  assert_true((Eq : @ast.BinOp) != StrictEq)
}

///|
test "VarKind covers M1..M4 declaration flavours" {
  assert_true((Var : @ast.VarKind) != Let)
  assert_true((Let : @ast.VarKind) != Const)
  assert_true((Const : @ast.VarKind) != Using)
  assert_true((Using : @ast.VarKind) != AwaitUsing)
}
