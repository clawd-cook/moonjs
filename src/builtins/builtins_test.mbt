// Blackbox tests for the builtins package. Focus on structural invariants
// (prototype chain, constructors, wired properties) rather than end-to-end
// JS scripts — the full VM integration path is exercised via
// `src/vm/vm_test.mbt`.

///|
test "Builtins::new produces distinct prototype objects" {
  let bi = @builtins.Builtins::new()
  let a : @value.JSValue = @value.Object(bi.object_proto())
  let b : @value.JSValue = @value.Object(bi.function_proto())
  let c : @value.JSValue = @value.Object(bi.array_proto())
  let d : @value.JSValue = @value.Object(bi.string_proto())
  let e : @value.JSValue = @value.Object(bi.error_proto())
  assert_true(a != b)
  assert_true(a != c)
  assert_true(a != d)
  assert_true(a != e)
  assert_true(b != c)
  assert_true(b != e)
}

///|
test "Object.prototype's proto is Null" {
  let bi = @builtins.Builtins::new()
  @test.assert_eq(bi.object_proto().proto, @value.Null)
}

///|
test "Function.prototype's proto is Object.prototype" {
  let bi = @builtins.Builtins::new()
  match bi.function_proto().proto {
    Object(p) => assert_true(physical_equal(p, bi.object_proto()))
    _ => fail("Function.prototype's proto should be Object.prototype")
  }
}

///|
test "Array.prototype's proto is Object.prototype" {
  let bi = @builtins.Builtins::new()
  match bi.array_proto().proto {
    Object(p) => assert_true(physical_equal(p, bi.object_proto()))
    _ => fail("Array.prototype's proto should be Object.prototype")
  }
}

///|
test "String.prototype's proto is Object.prototype" {
  let bi = @builtins.Builtins::new()
  match bi.string_proto().proto {
    Object(p) => assert_true(physical_equal(p, bi.object_proto()))
    _ => fail("String.prototype's proto should be Object.prototype")
  }
}

///|
test "Error.prototype's proto is Object.prototype" {
  let bi = @builtins.Builtins::new()
  match bi.error_proto().proto {
    Object(p) => assert_true(physical_equal(p, bi.object_proto()))
    _ => fail("Error.prototype's proto should be Object.prototype")
  }
}

///|
test "Error.prototype has name=\"Error\" and message=\"\"" {
  let bi = @builtins.Builtins::new()
  @test.assert_eq(bi.error_proto().get_own("name"), Some(@value.Str("Error")))
  @test.assert_eq(bi.error_proto().get_own("message"), Some(@value.Str("")))
}

///|
test "TypeError.prototype has name=\"TypeError\"" {
  let bi = @builtins.Builtins::new()
  @test.assert_eq(
    bi.type_error_proto().get_own("name"),
    Some(@value.Str("TypeError")),
  )
}

///|
test "TypeError.prototype's proto is Error.prototype" {
  let bi = @builtins.Builtins::new()
  match bi.type_error_proto().proto {
    Object(p) => assert_true(physical_equal(p, bi.error_proto()))
    _ => fail("TypeError.prototype's proto should be Error.prototype")
  }
}

///|
test "RangeError.prototype has name=\"RangeError\"" {
  let bi = @builtins.Builtins::new()
  @test.assert_eq(
    bi.range_error_proto().get_own("name"),
    Some(@value.Str("RangeError")),
  )
}

///|
test "SyntaxError.prototype has name=\"SyntaxError\"" {
  let bi = @builtins.Builtins::new()
  @test.assert_eq(
    bi.syntax_error_proto().get_own("name"),
    Some(@value.Str("SyntaxError")),
  )
}

///|
test "ReferenceError.prototype has name=\"ReferenceError\"" {
  let bi = @builtins.Builtins::new()
  @test.assert_eq(
    bi.reference_error_proto().get_own("name"),
    Some(@value.Str("ReferenceError")),
  )
}

///|
test "All Error subclass prototypes chain to Error.prototype" {
  let bi = @builtins.Builtins::new()
  for
    proto in [
      bi.range_error_proto(),
      bi.syntax_error_proto(),
      bi.reference_error_proto(),
    ] {
    match proto.proto {
      Object(p) => assert_true(physical_equal(p, bi.error_proto()))
      _ => fail("Error subclass prototype should chain to Error.prototype")
    }
  }
}

///|
test "install_into registers all constructors as globals" {
  let bi = @builtins.Builtins::new()
  let globals = @value.Object::new(@value.Shape::new(), @value.Null)
  bi.install_into(globals)
  assert_true(globals.has_own("Object"))
  assert_true(globals.has_own("Error"))
  assert_true(globals.has_own("TypeError"))
  assert_true(globals.has_own("RangeError"))
  assert_true(globals.has_own("SyntaxError"))
  assert_true(globals.has_own("ReferenceError"))
  assert_true(globals.has_own("undefined"))
  assert_true(globals.has_own("NaN"))
  assert_true(globals.has_own("Infinity"))
  assert_true(globals.has_own("globalThis"))
}

///|
test "install_into installs Object global as NativeFn" {
  let bi = @builtins.Builtins::new()
  let globals = @value.Object::new(@value.Shape::new(), @value.Null)
  bi.install_into(globals)
  match globals.get_own("Object") {
    Some(NativeFn(nf)) => @test.assert_eq(nf.name(), "Object")
    _ => fail("Object global should be a NativeFn(\"Object\")")
  }
}

///|
test "install_into: globalThis identity" {
  let bi = @builtins.Builtins::new()
  let globals = @value.Object::new(@value.Shape::new(), @value.Null)
  bi.install_into(globals)
  match globals.get_own("globalThis") {
    Some(Object(g)) => assert_true(physical_equal(g, globals))
    _ => fail("globalThis should be the globals object itself")
  }
}

///|
test "install_into: NaN and Infinity are Number values" {
  let bi = @builtins.Builtins::new()
  let globals = @value.Object::new(@value.Shape::new(), @value.Null)
  bi.install_into(globals)
  match globals.get_own("NaN") {
    Some(Number(d)) => assert_true(d.is_nan())
    _ => fail("NaN should be Number(NaN)")
  }
  match globals.get_own("Infinity") {
    Some(Number(d)) => assert_true(d.is_pos_inf())
    _ => fail("Infinity should be Number(+Inf)")
  }
}

///|
test "Object constructor .prototype === Object.prototype" {
  let bi = @builtins.Builtins::new()
  let globals = @value.Object::new(@value.Shape::new(), @value.Null)
  bi.install_into(globals)
  match globals.get_own("Object") {
    Some(NativeFn(nf)) =>
      match nf.prototype() {
        Object(p) => assert_true(physical_equal(p, bi.object_proto()))
        _ => fail("Object.prototype should be an Object")
      }
    _ => fail("Object should be a NativeFn")
  }
}

///|
test "TypeError constructor .prototype === TypeError.prototype" {
  let bi = @builtins.Builtins::new()
  let globals = @value.Object::new(@value.Shape::new(), @value.Null)
  bi.install_into(globals)
  match globals.get_own("TypeError") {
    Some(NativeFn(nf)) =>
      match nf.prototype() {
        Object(p) => assert_true(physical_equal(p, bi.type_error_proto()))
        _ => fail("TypeError.prototype should be an Object")
      }
    _ => fail("TypeError should be a NativeFn")
  }
}

///|
test "Error.prototype.constructor === Error" {
  let bi = @builtins.Builtins::new()
  match bi.error_proto().get_own("constructor") {
    Some(NativeFn(nf)) => @test.assert_eq(nf.name(), "Error")
    _ => fail("Error.prototype.constructor should be Error NativeFn")
  }
}
