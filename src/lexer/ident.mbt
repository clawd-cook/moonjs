// Identifier / keyword recognition.
//
// Split into three concerns:
//
// 1. Character predicates (`is_ident_start_ascii`, `is_ident_continue_ascii`).
//    ES's UnicodeIDStart / UnicodeIDContinue is fully general but the M1 fast
//    path handles ASCII only. Non-ASCII code points >= 0x80 are permitted
//    conservatively; the full Unicode categorisation lands in M4 when the
//    unicode tables package is built. This matches design.md §5.1: "M1 uses
//    ASCII fast path plus recognition of `\uHHHH` and `\u{...}` escapes."
//
// 2. Unicode escape decoding inside identifiers (`\uHHHH` and `\u{...}`).
//    Emitted at the source level but expanded before the resolve step so that
//    `abc` and `\u{61}bc` produce the identical `IdentifierTok("abc")`.
//
// 3. Reserved-word resolution (`resolve_keyword`). A single big if-chain: an
//    if-chain compiles to a jump table for short strings and is trivially
//    correct without a hashmap allocation per token.

///|
/// True for the ASCII characters permitted at the *start* of an identifier
/// per ES: letters, `_`, `$`. UnicodeIDStart also allows a huge extra set;
/// M1 defers that to the escape path (`\u...`) and to the M4 unicode tables.
fn is_ident_start_ascii(c : Int) -> Bool {
  (c >= 0x41 && c <= 0x5A) || // A-Z
  (c >= 0x61 && c <= 0x7A) || // a-z
  c == 0x5F || // _
  c == 0x24 // $
}

///|
/// True for ASCII characters permitted *inside* an identifier: everything
/// that starts one, plus digits.
fn is_ident_continue_ascii(c : Int) -> Bool {
  is_ident_start_ascii(c) || (c >= 0x30 && c <= 0x39) // 0-9
}

///|
/// Conservative "code point could be a Unicode identifier character" test.
/// Returns `true` for anything above the ASCII range (0x80+). This over-
/// approximates ES's UnicodeIDStart / IDContinue, which is fine for M1
/// because the ES *reserved words* are all ASCII and never conflict; a real
/// unicode table swap-in is M4's job.
fn is_ident_char_nonascii(c : Int) -> Bool {
  c >= 0x80
}

///|
/// Resolve a decoded identifier string to a keyword, if it matches one of the
/// reserved words the M1 lexer tags at lex time (`Let_`, `Enum_`, and the
/// full ES reserved list).
///
/// Returns `None` when the string is an ordinary identifier (including
/// contextual keywords like `async` / `await` / `static` — the parser handles
/// those). The lookup is a straight if-chain: `String::equal` short-circuits
/// on length, so a handful of comparisons is plenty for the ~40 keywords.
fn resolve_keyword(name : String) -> Keyword? {
  if name == "break" {
    Some(Break_)
  } else if name == "case" {
    Some(Case_)
  } else if name == "catch" {
    Some(Catch_)
  } else if name == "class" {
    Some(Class_)
  } else if name == "const" {
    Some(Const_)
  } else if name == "continue" {
    Some(Continue_)
  } else if name == "debugger" {
    Some(Debugger_)
  } else if name == "default" {
    Some(Default_)
  } else if name == "delete" {
    Some(Delete_)
  } else if name == "do" {
    Some(Do_)
  } else if name == "else" {
    Some(Else_)
  } else if name == "export" {
    Some(Export_)
  } else if name == "extends" {
    Some(Extends_)
  } else if name == "finally" {
    Some(Finally_)
  } else if name == "for" {
    Some(For_)
  } else if name == "function" {
    Some(Function_)
  } else if name == "if" {
    Some(If_)
  } else if name == "import" {
    Some(Import_)
  } else if name == "in" {
    Some(In_)
  } else if name == "instanceof" {
    Some(Instanceof_)
  } else if name == "let" {
    Some(Let_)
  } else if name == "new" {
    Some(New_)
  } else if name == "null" {
    Some(Null_)
  } else if name == "return" {
    Some(Return_)
  } else if name == "super" {
    Some(Super_)
  } else if name == "switch" {
    Some(Switch_)
  } else if name == "this" {
    Some(This_)
  } else if name == "throw" {
    Some(Throw_)
  } else if name == "true" {
    Some(True_)
  } else if name == "false" {
    Some(False_)
  } else if name == "try" {
    Some(Try_)
  } else if name == "typeof" {
    Some(Typeof_)
  } else if name == "var" {
    Some(Var_)
  } else if name == "void" {
    Some(Void_)
  } else if name == "while" {
    Some(While_)
  } else if name == "with" {
    Some(With_)
  } else if name == "yield" {
    Some(Yield_)
  } else if name == "enum" {
    Some(Enum_)
  } else {
    None
  }
}
