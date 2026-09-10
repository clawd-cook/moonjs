// Blackbox tests for the util package: SourceLoc, SourceSpan, Interner.
// These exercise the public API only — internal fields are hidden.

///|
test "SourceLoc equality and construction" {
  let a = @util.SourceLoc::new(1, 5)
  let b = @util.SourceLoc::new(1, 5)
  let c = @util.SourceLoc::new(2, 5)
  @test.assert_eq(a, b)
  assert_true(a != c)
  @test.assert_eq(a.line, (1 : UInt16))
  @test.assert_eq(a.col, (5 : UInt16))
}

///|
test "SourceLoc debug output" {
  // Debug-derived output is stable enough to snapshot; keeps regressions
  // visible if we ever change the field layout.
  let loc = @util.SourceLoc::new(3, 12)
  debug_inspect(loc, content="{ line: 3, col: 12 }")
}

///|
test "SourceSpan equality and accessors" {
  let start = @util.SourceLoc::new(1, 0)
  let end = @util.SourceLoc::new(1, 10)
  let span = @util.SourceSpan::new(start, end)
  @test.assert_eq(span.start, start)
  @test.assert_eq(span.end, end)
  @test.assert_eq(span, @util.SourceSpan::new(start, end))
}

///|
test "SourceSpan debug output" {
  let span = @util.SourceSpan::new(
    @util.SourceLoc::new(1, 0),
    @util.SourceLoc::new(2, 4),
  )
  debug_inspect(
    span,
    content="{ start: { line: 1, col: 0 }, end: { line: 2, col: 4 } }",
  )
}

///|
test "Interner dedups identical strings" {
  let pool = @util.Interner::new()
  let a = pool.intern("foo")
  let b = pool.intern("foo")
  @test.assert_eq(a, b)
  @test.assert_eq(pool.length(), 1)
}

///|
test "Interner assigns distinct ids to different strings" {
  let pool = @util.Interner::new()
  let a = pool.intern("foo")
  let b = pool.intern("bar")
  let c = pool.intern("baz")
  assert_true(a != b)
  assert_true(b != c)
  assert_true(a != c)
  @test.assert_eq(pool.length(), 3)
}

///|
test "Interner resolve round-trips" {
  let pool = @util.Interner::new()
  let id_foo = pool.intern("foo")
  let id_bar = pool.intern("bar")
  @test.assert_eq(pool.resolve(id_foo), "foo")
  @test.assert_eq(pool.resolve(id_bar), "bar")
  // resolving after further interns still works
  let _ = pool.intern("baz")
  @test.assert_eq(pool.resolve(id_foo), "foo")
}

///|
test "Interner handles empty string" {
  let pool = @util.Interner::new()
  let id_empty = pool.intern("")
  let id_empty2 = pool.intern("")
  @test.assert_eq(id_empty, id_empty2)
  @test.assert_eq(pool.resolve(id_empty), "")
  @test.assert_eq(pool.length(), 1)
}

///|
test "Interner assigns ids starting at 0 in insertion order" {
  // The stable numbering is relied on by callers that store ids in bytecode
  // constant-pool references, so pin it in a test.
  let pool = @util.Interner::new()
  @test.assert_eq(pool.intern("first"), 0)
  @test.assert_eq(pool.intern("second"), 1)
  @test.assert_eq(pool.intern("third"), 2)
  // repeats reuse ids
  @test.assert_eq(pool.intern("first"), 0)
  @test.assert_eq(pool.intern("second"), 1)
}
