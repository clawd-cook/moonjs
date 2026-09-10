// Blackbox tests for the value package: JSValue, Object/Shape, PropMeta,
// JSException. These exercise only the public API — internals hide behind
// the helper functions.

///|
test "JSValue primitive construction and equality" {
  // Same-variant equality.
  let a : @value.JSValue = Bool(true)
  let b : @value.JSValue = Bool(true)
  @test.assert_eq(a, b)
  // Different bool payload.
  assert_true(a != Bool(false))
  // Distinct variants are not equal, even when their numeric payload matches.
  assert_true((Int32(1) : @value.JSValue) != Number(1.0))
  // Undefined and Null are distinct.
  assert_true((Undefined : @value.JSValue) != Null)
  // Str equality is structural.
  @test.assert_eq((Str("hello") : @value.JSValue), Str("hello"))
  assert_true((Str("hello") : @value.JSValue) != Str("world"))
}

///|
test "JSValue Undefined and Null equal themselves" {
  @test.assert_eq((Undefined : @value.JSValue), Undefined)
  @test.assert_eq((Null : @value.JSValue), Null)
}

///|
test "JSValue debug output is stable per variant" {
  debug_inspect((Undefined : @value.JSValue), content="Undefined")
  debug_inspect((Null : @value.JSValue), content="Null")
  debug_inspect((Bool(true) : @value.JSValue), content="Bool(true)")
  debug_inspect((Int32(42) : @value.JSValue), content="Int32(42)")
  debug_inspect((Number(3.14) : @value.JSValue), content="Number(3.14)")
  debug_inspect((Str("hi") : @value.JSValue), content="Str(\"hi\")")
}

///|
test "PropMeta::data sets default data-property attrs" {
  let m = @value.PropMeta::data(3)
  @test.assert_eq(m.slot_idx, 3)
  assert_true(m.is_writable())
  assert_true(m.is_enumerable())
  assert_true(m.is_configurable())
  assert_true(!m.is_accessor())
}

///|
test "PropMeta attribute predicates read each bit" {
  let only_writable = @value.PropMeta::new(0, @value.ATTR_WRITABLE)
  assert_true(only_writable.is_writable())
  assert_true(!only_writable.is_enumerable())
  assert_true(!only_writable.is_configurable())
  assert_true(!only_writable.is_accessor())
  let only_enum = @value.PropMeta::new(0, @value.ATTR_ENUMERABLE)
  assert_true(!only_enum.is_writable())
  assert_true(only_enum.is_enumerable())
  let only_cfg = @value.PropMeta::new(0, @value.ATTR_CONFIGURABLE)
  assert_true(only_cfg.is_configurable())
  let only_acc = @value.PropMeta::new(0, @value.ATTR_ACCESSOR)
  assert_true(only_acc.is_accessor())
  assert_true(!only_acc.is_writable())
}

///|
test "Object::new produces empty extensible object" {
  let shape = @value.Shape::new()
  let obj = @value.Object::new(shape, Null)
  @test.assert_eq(obj.slots.length(), 0)
  assert_true(obj.extensible)
  @test.assert_eq(obj.proto, Null)
}

///|
test "Object::add_property inserts and preserves order" {
  let obj = @value.Object::new(@value.Shape::new(), Null)
  @value.Object::add_property(obj, "a", Int32(1), @value.ATTR_DEFAULT_DATA)
  @value.Object::add_property(obj, "b", Int32(2), @value.ATTR_DEFAULT_DATA)
  @value.Object::add_property(obj, "c", Int32(3), @value.ATTR_DEFAULT_DATA)
  // Insertion order preserved in keys_ordered.
  @test.assert_eq(obj.shape.keys_ordered, ["a", "b", "c"])
  // slot_idx assignment is dense and in insertion order.
  @test.assert_eq(obj.slots[0], Int32(1))
  @test.assert_eq(obj.slots[1], Int32(2))
  @test.assert_eq(obj.slots[2], Int32(3))
}

///|
test "Object::get_own returns Some for own, None otherwise" {
  let obj = @value.Object::new(@value.Shape::new(), Null)
  @value.Object::add_property(obj, "x", Str("value"), @value.ATTR_DEFAULT_DATA)
  match @value.Object::get_own(obj, "x") {
    Some(v) => @test.assert_eq(v, Str("value"))
    None => fail("expected Some(Str)")
  }
  @test.assert_eq(@value.Object::get_own(obj, "y"), None)
}

///|
test "has_own vs has_property with prototype chain" {
  // Build a prototype B with property "x".
  let proto_b = @value.Object::new(@value.Shape::new(), Null)
  @value.Object::add_property(
    proto_b,
    "x",
    Int32(100),
    @value.ATTR_DEFAULT_DATA,
  )
  // Object A inherits from B; has no own "x".
  let a = @value.Object::new(@value.Shape::new(), Object(proto_b))
  assert_true(!@value.Object::has_own(a, "x"))
  assert_true(@value.Object::has_property(a, "x"))
  // Neither sees "y" anywhere.
  assert_true(!@value.Object::has_own(a, "y"))
  assert_true(!@value.Object::has_property(a, "y"))
}

///|
test "get_property walks prototype chain" {
  let proto_b = @value.Object::new(@value.Shape::new(), Null)
  @value.Object::add_property(
    proto_b,
    "x",
    Int32(100),
    @value.ATTR_DEFAULT_DATA,
  )
  let a = @value.Object::new(@value.Shape::new(), Object(proto_b))
  // Inherited value.
  @test.assert_eq(@value.Object::get_property(a, "x"), Int32(100))
  // Chain terminates at Null → Undefined.
  @test.assert_eq(@value.Object::get_property(a, "y"), Undefined)
}

///|
test "get_property prefers own over prototype" {
  let proto_b = @value.Object::new(@value.Shape::new(), Null)
  @value.Object::add_property(
    proto_b,
    "x",
    Int32(100),
    @value.ATTR_DEFAULT_DATA,
  )
  let a = @value.Object::new(@value.Shape::new(), Object(proto_b))
  @value.Object::add_property(a, "x", Int32(42), @value.ATTR_DEFAULT_DATA)
  @test.assert_eq(@value.Object::get_property(a, "x"), Int32(42))
}

///|
test "set_own overwrites writable existing property" {
  let obj = @value.Object::new(@value.Shape::new(), Null)
  @value.Object::add_property(obj, "x", Int32(1), @value.ATTR_DEFAULT_DATA)
  assert_true(@value.Object::set_own(obj, "x", Int32(99)))
  @test.assert_eq(@value.Object::get_own(obj, "x"), Some(Int32(99)))
}

///|
test "set_own returns false on non-writable existing" {
  let obj = @value.Object::new(@value.Shape::new(), Null)
  // Only enumerable+configurable, NOT writable.
  let non_writable_attrs = @value.ATTR_ENUMERABLE.lor(@value.ATTR_CONFIGURABLE)
  @value.Object::add_property(obj, "x", Int32(1), non_writable_attrs)
  assert_true(!@value.Object::set_own(obj, "x", Int32(99)))
  // Value unchanged.
  @test.assert_eq(@value.Object::get_own(obj, "x"), Some(Int32(1)))
}

///|
test "set_own adds new property when extensible" {
  let obj = @value.Object::new(@value.Shape::new(), Null)
  assert_true(@value.Object::set_own(obj, "brand_new", Str("val")))
  @test.assert_eq(@value.Object::get_own(obj, "brand_new"), Some(Str("val")))
}

///|
test "set_own refuses new property when non-extensible" {
  let obj = @value.Object::new(@value.Shape::new(), Null)
  @value.Object::prevent_extensions(obj)
  assert_true(!@value.Object::set_own(obj, "nope", Int32(1)))
  @test.assert_eq(@value.Object::get_own(obj, "nope"), None)
}

///|
test "Object::set_proto rewires prototype link" {
  let proto1 = @value.Object::new(@value.Shape::new(), Null)
  let proto2 = @value.Object::new(@value.Shape::new(), Null)
  @value.Object::add_property(
    proto2,
    "z",
    Str("z_val"),
    @value.ATTR_DEFAULT_DATA,
  )
  let obj = @value.Object::new(@value.Shape::new(), Object(proto1))
  @test.assert_eq(@value.Object::get_property(obj, "z"), Undefined)
  @value.Object::set_proto(obj, Object(proto2))
  @test.assert_eq(@value.Object::get_property(obj, "z"), Str("z_val"))
}

///|
test "JSValue Object identity equality" {
  // Two distinct Object instances with the same shape / contents are NOT
  // equal at the JSValue layer — mirrors JS `{} !== {}`.
  let a = @value.Object::new(@value.Shape::new(), Null)
  let b = @value.Object::new(@value.Shape::new(), Null)
  let va : @value.JSValue = Object(a)
  let vb : @value.JSValue = Object(b)
  assert_true(va != vb)
  // But same reference compares equal.
  @test.assert_eq(va, va)
  let va2 : @value.JSValue = Object(a)
  @test.assert_eq(va, va2)
}

///|
test "JSException construction and Debug" {
  let stack = [
    @value.StackFrameInfo::new("<top>", "eval.js", @util.SourceLoc::new(1, 5)),
  ]
  let exc = @value.JSException::new(Str("boom"), stack)
  @test.assert_eq(exc.value, Str("boom"))
  @test.assert_eq(exc.stack.length(), 1)
  @test.assert_eq(exc.stack[0].chunk_name, "<top>")
  @test.assert_eq(exc.stack[0].filename, "eval.js")
  @test.assert_eq(exc.stack[0].loc, @util.SourceLoc::new(1, 5))
}

///|
test "StackFrameInfo debug output" {
  let frame = @value.StackFrameInfo::new(
    "myFunc",
    "app.js",
    @util.SourceLoc::new(7, 12),
  )
  debug_inspect(
    frame,
    content=(
      #|{
      #|  chunk_name: "myFunc",
      #|  filename: "app.js",
      #|  loc: { line: 7, col: 12 },
      #|}
    ),
  )
}
