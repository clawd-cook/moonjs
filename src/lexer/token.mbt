// Token types produced by the M1 lexer. Every token carries the range of
// source it spans so the parser (Step 6) and compiler (Step 7) can attribute
// bytecode back to precise line/col locations.
//
// Design decisions worth noting:
//
// - `TokenKind` is `pub(all) enum` so the parser can pattern-match variants
//   directly. `Token` is a wrapper `{kind, span}` mirroring how AST nodes are
//   built.
//
// - Every `Keyword` variant has a trailing underscore. MoonBit's own
//   reserved words (`if`, `else`, `for`, `while`, `return`, `break`,
//   `continue`, `try`, `catch`, `type`, `fn`) would collide otherwise; the
//   remaining variants get the suffix too for readability so callers never
//   have to think about which JS keyword happens to alias a MoonBit keyword.
//   `Finally_` doubles as the mitigation for the soft-reserved MoonBit
//   `finally`.
//
// - The `EqTok` name for bare `=` avoids visual confusion with `EqEq` /
//   `EqEqEq` at read sites.
//
// - `PrivateIdentTok` covers `#foo`-style private class members; the lexer
//   recognises the shape now so the M2 parser has something to build against.
//
// - Number literals carry both the parsed `Double` value and an `is_int` bit
//   so the compiler can pick `push_i32` vs the constant-pool path without a
//   post-hoc detection of "was this literal a decimal?" That bit is set for
//   integer-form literals (hex / oct / bin / decimal integers without a
//   fraction or exponent).

///|
/// A lexed token: a kind plus the source range it spans.
pub struct Token {
  kind : TokenKind
  span : @util.SourceSpan
} derive(@debug.Debug)

///|
/// Construct a token from its kind and span. Kept as an explicit constructor
/// (rather than a bare struct literal at call sites) so future extensions to
/// the struct — e.g. attaching a "preceded-by-line-terminator" flag for ASI —
/// only require adding one parameter here.
pub fn Token::new(kind : TokenKind, span : @util.SourceSpan) -> Token {
  { kind, span, }
}

///|
/// The shape of the token — value payload where applicable, plain variant
/// otherwise. `pub(all)` so the parser can pattern-match.
pub(all) enum TokenKind {
  // ---- Literals ----
  /// Numeric literal. `is_int=true` when the source form was an integer (no
  /// dot, no exponent), regardless of magnitude: `1`, `0xFF`, `0b101` all set
  /// `is_int=true`; `1.0`, `1e2` set `is_int=false`.
  NumberTok(value~ : Double, is_int~ : Bool)
  /// String literal after escape decoding.
  StringTok(value~ : String)
  /// `` `foo${ `` — head chunk of a template with interpolation.
  TemplateHeadTok(cooked~ : String, raw~ : String)
  /// `` }bar${ `` — middle chunk between interpolations.
  TemplateMiddleTok(cooked~ : String, raw~ : String)
  /// `` }baz` `` — tail chunk closing a template.
  TemplateTailTok(cooked~ : String, raw~ : String)
  /// `` `foo` `` — template with no `${...}`.
  TemplateNoSubTok(cooked~ : String, raw~ : String)
  /// Regular-expression literal. Emitted only when `allow_regex=true`.
  RegExpTok(pattern~ : String, flags~ : String)
  /// Plain identifier — every name that isn't a reserved word.
  IdentifierTok(name~ : String)
  /// Reserved word.
  KeywordTok(kind~ : Keyword)
  /// `#name` — class-body private identifier.
  PrivateIdentTok(name~ : String)

  // ---- Punctuators ----
  LParen
  RParen
  LBrace
  RBrace
  LBracket
  RBracket
  Comma
  Semi
  Colon
  Dot
  Ellipsis
  Question
  QuestionDot
  QuestionQuestion
  Arrow
  Plus
  Minus
  Star
  StarStar
  Slash
  Percent
  Amp
  Pipe
  Caret
  Tilde
  Bang
  Lt
  Gt
  LtEq
  GtEq
  EqEq
  EqEqEq
  BangEq
  BangEqEq
  EqTok
  PlusEq
  MinusEq
  StarEq
  SlashEq
  PercentEq
  StarStarEq
  LtLtEq
  GtGtEq
  GtGtGtEq
  AmpEq
  PipeEq
  CaretEq
  AmpAmp
  PipePipe
  AmpAmpEq
  PipePipeEq
  QuestionQuestionEq
  LtLt
  GtGt
  GtGtGt
  PlusPlus
  MinusMinus
  At
  Hash

  // ---- meta ----
  /// Sentinel returned when the source is exhausted. Callers loop until they
  /// see this variant.
  Eof
} derive(@debug.Debug)

///|
/// Reserved words recognised by the ES2023+ lexer.
///
/// Every variant has the `_` suffix to steer clear of MoonBit reserved words
/// (see file-level notes).
///
/// **Contextual keywords** (`async`, `await`, `let`, `static`, `yield` when
/// non-strict, etc.) are *not* enumerated here — the lexer emits them as plain
/// `IdentifierTok` and the parser decides based on context. The two
/// exceptions are:
///   - `Let_` — needed by the parser for `let[...]` vs `let x` disambiguation,
///     so we tag it at lex time even though ES treats `let` as contextual.
///   - `Enum_` — reserved but unused; emitting it lets us detect stray uses.
pub(all) enum Keyword {
  Break_
  Case_
  Catch_
  Class_
  Const_
  Continue_
  Debugger_
  Default_
  Delete_
  Do_
  Else_
  Export_
  Extends_
  Finally_
  For_
  Function_
  If_
  Import_
  In_
  Instanceof_
  Let_
  New_
  Null_
  Return_
  Super_
  Switch_
  This_
  Throw_
  True_
  False_
  Try_
  Typeof_
  Var_
  Void_
  While_
  With_
  Yield_
  Enum_
} derive(Eq, @debug.Debug)

///|
/// Error produced by the lexer when it cannot form a valid token. Callers
/// receive it via `Result[Token, LexError]` from `Lexer::lex_next`.
pub(all) suberror LexError {
  LexError(msg~ : String, loc~ : @util.SourceLoc)
} derive(@debug.Debug)
