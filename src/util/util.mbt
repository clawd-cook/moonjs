// Util package: shared helpers used across the MoonJS pipeline.
// Owner milestone: M1 (populated by Step 1); later milestones may extend.

///|
/// Source-code location expressed as `(line, col)`, both 1-based.
///
/// M1 uses `UInt16` fields because the parallel `Array[SourceLoc]` attached to
/// every `Chunk` easily reaches millions of entries in real workloads: two
/// bytes per field is enough for essentially all JS files, and it halves the
/// debug-info footprint compared to `Int`. Sources exceeding 65535 lines / cols
/// clamp to 0 by convention (documented in the parent design).
pub struct SourceLoc {
  line : UInt16
  col : UInt16
} derive(Eq, Hash, @debug.Debug)

///|
/// Build a `SourceLoc` from plain integers. Callers usually get them from the
/// lexer as `Int`, so this constructor centralizes the narrowing conversion
/// and avoids scattering `.to_uint16()` calls around the codebase.
pub fn SourceLoc::new(line : Int, col : Int) -> SourceLoc {
  { line: line.to_uint16(), col: col.to_uint16(), }
}

///|
/// Range of source code between two `SourceLoc`s. Every AST node carries one so
/// that later passes (compiler, error reporter) can attribute bytecode and
/// diagnostics back to the exact original span.
pub struct SourceSpan {
  start : SourceLoc
  end : SourceLoc
} derive(Eq, @debug.Debug)

///|
/// Build a span from two locations. Provided as a stable constructor even
/// though the struct is fully public so callers do not need to know the field
/// order; if we later add optional metadata to spans (e.g. a source index),
/// callers won't have to change.
pub fn SourceSpan::new(start : SourceLoc, end : SourceLoc) -> SourceSpan {
  { start, end, }
}

///|
/// Deduplicating string pool.
///
/// Interners are created per owner (each `Chunk`, each `Shape`, the compiler
/// itself) rather than as a single global. Keeping them local avoids
/// synchronisation, matches the isolation contract described in
/// `design.md` §1, and lets `strip_debug()` drop an entire pool at once when
/// M6 pushes size-sensitive release builds.
///
/// The returned ids are small non-negative integers assigned in the order the
/// strings were first interned. Ids from one `Interner` are meaningless in
/// another instance.
pub struct Interner {
  priv index : @hashmap.HashMap[String, Int]
  priv strings : Array[String]
}

///|
/// Create an empty interner. `HashMap([])` starts at the stdlib default
/// capacity, which is fine for the volumes we handle in M1; larger owners
/// (test262 driver in M6) can wrap this with a pre-sized backing map later.
pub fn Interner::new() -> Interner {
  { index: @hashmap.HashMap([]), strings: [], }
}

///|
/// Return the id assigned to `s`, allocating a fresh id the first time the
/// string is seen. Two subsequent `intern` calls with equal `String`s always
/// return the same `Int`.
pub fn Interner::intern(self : Interner, s : String) -> Int {
  match self.index.get(s) {
    Some(id) => id
    None => {
      let id = self.strings.length()
      self.strings.push(s)
      self.index.set(s, id)
      id
    }
  }
}

///|
/// Look up the string associated with an id. `id` must have been produced by a
/// prior `intern` call on the same interner; passing anything else aborts
/// because a bad id is a compiler bug (this API is internal — end-user JS can
/// never reach it, so we prefer a hard abort over a `Result` on every access).
pub fn Interner::resolve(self : Interner, id : Int) -> String {
  if id < 0 || id >= self.strings.length() {
    abort("Interner::resolve: invalid id " + id.to_string())
  }
  self.strings[id]
}

///|
/// Number of distinct strings currently held. Used mostly by tests; also handy
/// when serialising a pool for debug output.
pub fn Interner::length(self : Interner) -> Int {
  self.strings.length()
}
