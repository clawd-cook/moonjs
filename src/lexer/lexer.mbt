// Core lexer state and dispatch.
//
// The lexer keeps a single mutable cursor into the source `String`, tracking
// UTF-16 code unit offset plus line / line-start for cheap column arithmetic.
// Every consumer (`lex_next`) is idempotent given the same state — the
// parser can look ahead only via a wrapper that re-lexes on rewind.
//
// The `template_states` stack captures template-literal contexts we're
// currently inside. Each entry records how many braces of interpolation depth
// we have opened; a closing `}` at depth 0 in the current template context
// resumes template body scanning.

///|
/// Per-context state for a template literal we're currently inside. Every
/// `${...}` interpolation pushes an entry; the matching `}` pops it and
/// resumes template scanning.
///
/// Package-private — external callers never see this type.
priv struct TemplateCtx {
  mut brace_depth : Int
}

///|
/// The lexer state carried through `lex_next` calls.
///
/// All fields are internal — external callers use `Lexer::new` and
/// `Lexer::lex_next`. The struct is public so it can appear in signatures,
/// but its layout is not part of the API.
///
/// - `source`: full source string (UTF-16 code units, mirroring JS semantics).
/// - `pos`: index of the next code unit to consume.
/// - `line`: current 1-based line number.
/// - `line_start`: code-unit offset of the start of `line`; column is
///   `pos - line_start`.
/// - `filename`: passed through to error locations; not used by the lexer
///   itself.
/// - `template_states`: stack of active template-interpolation contexts.
pub struct Lexer {
  priv source : String
  priv mut pos : Int
  priv mut line : Int
  priv mut line_start : Int
  priv filename : String
  priv template_states : Array[TemplateCtx]
}

///|
/// Build a fresh lexer over `source`. `filename` is remembered so `LexError`
/// callers can pass it along without threading a separate parameter.
pub fn Lexer::new(source : String, filename : String) -> Lexer {
  { source, pos: 0, line: 1, line_start: 0, filename, template_states: [], }
}

///|
/// The lexer's filename accessor, exposed so parser / error-reporter code can
/// pull it out of the lexer instead of threading it separately.
pub fn Lexer::filename_of(self : Lexer) -> String {
  self.filename
}

///|
/// Length of the source in UTF-16 code units.
fn Lexer::source_len(self : Lexer) -> Int {
  self.source.length()
}

///|
/// Read the code unit at `pos + offset` without advancing. Returns `-1` past
/// EOF so callers can compare against `-1` with a plain `Int`.
fn Lexer::peek(self : Lexer, offset : Int) -> Int {
  let p = self.pos + offset
  if p < 0 || p >= self.source.length() {
    -1
  } else {
    self.source.get(p).unwrap().to_int()
  }
}

///|
/// Current column (0-based). The lexer feeds this into `SourceLoc::new`,
/// which narrows to `UInt16`.
fn Lexer::col(self : Lexer) -> Int {
  self.pos - self.line_start
}

///|
/// Build a `SourceLoc` for the current cursor position.
fn Lexer::loc_here(self : Lexer) -> @util.SourceLoc {
  @util.SourceLoc::new(self.line, self.col())
}

///|
/// Emit a span from `start_loc` to the current cursor.
fn Lexer::span_from(
  self : Lexer,
  start_loc : @util.SourceLoc,
) -> @util.SourceSpan {
  @util.SourceSpan::new(start_loc, self.loc_here())
}

///|
/// Advance the cursor past a line terminator (either `\n`, `\r`, or `\r\n`).
/// Caller guarantees `self.pos` points at one of them; this function updates
/// `line` / `line_start` accordingly.
fn Lexer::consume_line_terminator(self : Lexer) -> Unit {
  let c = self.peek(0)
  if c == 0x0D {
    // \r or \r\n — treat as one line ending in either case.
    self.pos = self.pos + 1
    if self.peek(0) == 0x0A {
      self.pos = self.pos + 1
    }
  } else {
    // \n, LS (U+2028), or PS (U+2029)
    self.pos = self.pos + 1
  }
  self.line = self.line + 1
  self.line_start = self.pos
}

///|
/// True iff `c` is an ES line terminator: `\n`, `\r`, U+2028, U+2029.
fn is_line_terminator(c : Int) -> Bool {
  c == 0x0A || c == 0x0D || c == 0x2028 || c == 0x2029
}

///|
/// True iff `c` is an ES whitespace that is *not* a line terminator: tab, VT,
/// FF, space, NBSP, ZWNBSP. Broader Unicode Space_Separator is deferred to
/// M4's unicode table swap-in.
fn is_whitespace_non_lt(c : Int) -> Bool {
  c == 0x09 || // TAB
  c == 0x0B || // VT
  c == 0x0C || // FF
  c == 0x20 || // SPACE
  c == 0xA0 || // NBSP
  c == 0xFEFF // ZWNBSP / BOM
}

///|
/// Consume whitespace and comments starting at the current cursor. Returns
/// `Ok(())` when comfortable at a token start; returns `LexError` when a
/// block comment is unterminated.
///
/// Also handles the leading `#!` hashbang on the very first line: recognised
/// only when `pos` is 0. Everything up to the next line terminator is dropped
/// like a `//` comment.
fn Lexer::skip_trivia(self : Lexer) -> Result[Unit, LexError] {
  // Hashbang: only at the very first byte of the source.
  if self.pos == 0 && self.peek(0) == 0x23 && self.peek(1) == 0x21 {
    // Skip until newline / EOF.
    while self.pos < self.source_len() && !is_line_terminator(self.peek(0)) {
      self.pos = self.pos + 1
    }
  }
  for _s = 0 {
    let c = self.peek(0)
    if c == -1 {
      break Ok(())
    }
    if is_whitespace_non_lt(c) {
      self.pos = self.pos + 1
      continue 0
    }
    if is_line_terminator(c) {
      self.consume_line_terminator()
      continue 0
    }
    if c == 0x2F && self.peek(1) == 0x2F {
      // Line comment: skip to end of line (do not consume the terminator).
      self.pos = self.pos + 2
      while self.pos < self.source_len() && !is_line_terminator(self.peek(0)) {
        self.pos = self.pos + 1
      }
      continue 0
    }
    if c == 0x2F && self.peek(1) == 0x2A {
      // Block comment: /* ... */. Not nested per ES.
      let start_loc = self.loc_here()
      self.pos = self.pos + 2
      let mut terminated = false
      while self.pos < self.source_len() {
        let cur = self.peek(0)
        if cur == 0x2A && self.peek(1) == 0x2F {
          self.pos = self.pos + 2
          terminated = true
          break
        }
        if is_line_terminator(cur) {
          self.consume_line_terminator()
        } else {
          self.pos = self.pos + 1
        }
      }
      if !terminated {
        break Err(LexError(msg="unterminated block comment", loc=start_loc))
      }
      continue 0
    }
    // Non-trivia token starts here.
    break Ok(())
  }
}

///|
/// Main entry point. `allow_regex` should be `true` at expression-start
/// positions (statement start, after an operator / punctuator / keyword that
/// begins a new expression) and `false` immediately after an operand
/// position (identifier, literal, `)`, `]`, postfix `++`/`--`). The parser
/// (Step 6) is responsible for tracking this bit.
///
/// The lexer always returns a token — either a well-formed one, an `Eof`
/// sentinel at end of source, or a `LexError` for malformed input.
pub fn Lexer::lex_next(
  self : Lexer,
  allow_regex : Bool,
) -> Result[Token, LexError] {
  match self.skip_trivia() {
    Err(e) => return Err(e)
    Ok(_) => ()
  }
  if self.pos >= self.source_len() {
    let loc = self.loc_here()
    return Ok(Token::new(Eof, @util.SourceSpan::new(loc, loc)))
  }
  let c = self.peek(0)
  let start_loc = self.loc_here()

  // Identifier / keyword / unicode-escape identifier start.
  if is_ident_start_ascii(c) || is_ident_char_nonascii(c) || c == 0x5C {
    return self.lex_identifier_or_keyword(start_loc)
  }
  // Number literal (also `.` followed by digit).
  if c >= 0x30 && c <= 0x39 {
    return self.lex_number(start_loc)
  }
  if c == 0x2E {
    // `.` — could be `...`, `.5`, or a bare dot.
    if self.peek(1) == 0x2E && self.peek(2) == 0x2E {
      self.pos = self.pos + 3
      return Ok(Token::new(Ellipsis, self.span_from(start_loc)))
    }
    let n = self.peek(1)
    if n >= 0x30 && n <= 0x39 {
      return self.lex_number(start_loc)
    }
    self.pos = self.pos + 1
    return Ok(Token::new(Dot, self.span_from(start_loc)))
  }
  // String literal.
  if c == 0x22 || c == 0x27 {
    return self.lex_string(start_loc, c)
  }
  // Template literal head / no-substitution template.
  if c == 0x60 {
    return self.lex_template_start(start_loc)
  }
  // Punctuators and structural characters.
  self.lex_punctuator(start_loc, allow_regex, c)
}

///|
/// Consume a complete identifier name (start char + continuation chars),
/// returning the decoded string. Used by both regular identifiers and
/// private-identifier lexing.
///
/// `missing_msg` is the error message to use when the first character is not a
/// valid identifier start — the two callers surface subtly different errors so
/// we parameterise it. `err_loc` is where that error is anchored (typically the
/// captured start position of the whole token).
fn Lexer::consume_identifier_name(
  self : Lexer,
  missing_msg : String,
  err_loc : @util.SourceLoc,
) -> Result[String, LexError] {
  let buf = StringBuilder()
  // First code unit: may be an escape.
  match self.consume_ident_char(true) {
    Err(e) => return Err(e)
    Ok(None) => return Err(LexError(msg=missing_msg, loc=err_loc))
    Ok(Some(ch)) => buf.write_char(ch)
  }
  // Subsequent code units.
  let cont : Result[Unit, LexError] = for _s = 0 {
    match self.consume_ident_char(false) {
      Err(e) => break Err(e)
      Ok(None) => break Ok(())
      Ok(Some(ch)) => {
        buf.write_char(ch)
        continue 0
      }
    }
  }
  match cont {
    Err(e) => Err(e)
    Ok(_) => Ok(buf.to_string())
  }
}

///|
/// Lex an identifier / keyword starting at `start_loc`. Handles `\uHHHH` and
/// `\u{H...}` escapes in both start and continuation positions.
fn Lexer::lex_identifier_or_keyword(
  self : Lexer,
  start_loc : @util.SourceLoc,
) -> Result[Token, LexError] {
  let name = self.consume_identifier_name(
    "expected identifier start", start_loc,
  )
  match name {
    Err(e) => return Err(e)
    Ok(name) => {
      let span = self.span_from(start_loc)
      match resolve_keyword(name) {
        Some(kw) => Ok(Token::new(KeywordTok(kind=kw), span))
        None => Ok(Token::new(IdentifierTok(name~), span))
      }
    }
  }
}

///|
/// Try to consume a single identifier char (start or continuation). Returns
/// `Ok(Some(ch))` when a valid character was consumed, `Ok(None)` when the
/// next character is not part of an identifier, `Err` on malformed unicode
/// escape.
fn Lexer::consume_ident_char(
  self : Lexer,
  is_start : Bool,
) -> Result[Char?, LexError] {
  let c = self.peek(0)
  if c == -1 {
    return Ok(None)
  }
  // Unicode escape: \uHHHH or \u{H...}.
  if c == 0x5C {
    if self.peek(1) != 0x75 {
      return Err(
        LexError(msg="invalid escape in identifier", loc=self.loc_here()),
      )
    }
    let esc_loc = self.loc_here()
    self.pos = self.pos + 2 // consume `\u`
    match self.consume_unicode_escape_tail(esc_loc) {
      Err(e) => return Err(e)
      Ok(code) => {
        let ok = if is_start {
          is_ident_start_ascii(code) || is_ident_char_nonascii(code)
        } else {
          is_ident_continue_ascii(code) || is_ident_char_nonascii(code)
        }
        if !ok {
          return Err(
            LexError(
              msg="escape does not resolve to an identifier char",
              loc=esc_loc,
            ),
          )
        }
        return Ok(Some(code.unsafe_to_char()))
      }
    }
  }
  let ok = if is_start {
    is_ident_start_ascii(c) || is_ident_char_nonascii(c)
  } else {
    is_ident_continue_ascii(c) || is_ident_char_nonascii(c)
  }
  if ok {
    self.pos = self.pos + 1
    Ok(Some(c.unsafe_to_char()))
  } else {
    Ok(None)
  }
}

///|
/// After consuming the `\u`, read either 4 fixed hex digits or `{H...}` and
/// return the code point. Position is left immediately after the escape.
fn Lexer::consume_unicode_escape_tail(
  self : Lexer,
  loc : @util.SourceLoc,
) -> Result[Int, LexError] {
  if self.peek(0) == 0x7B {
    // \u{H...}
    self.pos = self.pos + 1
    let mut value = 0
    let mut count = 0
    let scan : Result[Unit, LexError] = for _s = 0 {
      let c = self.peek(0)
      match hex_digit_value(c) {
        Some(v) => {
          value = value * 16 + v
          count = count + 1
          self.pos = self.pos + 1
          if value > 0x10FFFF {
            break Err(LexError(msg="unicode escape out of range", loc~))
          }
          continue 0
        }
        None => break Ok(())
      }
    }
    match scan {
      Err(e) => return Err(e)
      Ok(_) => ()
    }
    if count == 0 {
      return Err(LexError(msg="empty unicode escape", loc~))
    }
    if self.peek(0) != 0x7D {
      return Err(LexError(msg="unterminated unicode escape", loc~))
    }
    self.pos = self.pos + 1
    Ok(value)
  } else {
    // \uHHHH — exactly four hex digits.
    let mut value = 0
    for _ in 0..<4 {
      let c = self.peek(0)
      match hex_digit_value(c) {
        Some(v) => {
          value = value * 16 + v
          self.pos = self.pos + 1
        }
        None => return Err(LexError(msg="expected 4 hex digits", loc~))
      }
    }
    Ok(value)
  }
}

///|
/// Decode a single hex digit character (0-9 / a-f / A-F). Returns `None` for
/// non-hex or EOF.
fn hex_digit_value(c : Int) -> Int? {
  if c >= 0x30 && c <= 0x39 {
    Some(c - 0x30)
  } else if c >= 0x41 && c <= 0x46 {
    Some(c - 0x41 + 10)
  } else if c >= 0x61 && c <= 0x66 {
    Some(c - 0x61 + 10)
  } else {
    None
  }
}

///|
/// Decode an octal digit character (0-7). `None` for out-of-range / EOF.
fn octal_digit_value(c : Int) -> Int? {
  if c >= 0x30 && c <= 0x37 {
    Some(c - 0x30)
  } else {
    None
  }
}

///|
/// Decode a binary digit character (0-1). `None` otherwise.
fn binary_digit_value(c : Int) -> Int? {
  if c == 0x30 || c == 0x31 {
    Some(c - 0x30)
  } else {
    None
  }
}

///|
/// Dispatch based on the leading code unit for punctuators and structural
/// characters. `allow_regex` lets `/` open a regex literal at expression
/// positions.
fn Lexer::lex_punctuator(
  self : Lexer,
  start_loc : @util.SourceLoc,
  allow_regex : Bool,
  c : Int,
) -> Result[Token, LexError] {
  // Structural / one-char punctuators come first; the two-char / three-char
  // punctuators fall through to explicit branches.
  if c == 0x28 {
    self.pos = self.pos + 1
    return Ok(Token::new(LParen, self.span_from(start_loc)))
  }
  if c == 0x29 {
    self.pos = self.pos + 1
    return Ok(Token::new(RParen, self.span_from(start_loc)))
  }
  if c == 0x5B {
    self.pos = self.pos + 1
    return Ok(Token::new(LBracket, self.span_from(start_loc)))
  }
  if c == 0x5D {
    self.pos = self.pos + 1
    return Ok(Token::new(RBracket, self.span_from(start_loc)))
  }
  if c == 0x7B {
    // `{` — inside a template interpolation, this counts against the depth.
    if self.template_states.length() > 0 {
      let top = self.template_states[self.template_states.length() - 1]
      top.brace_depth = top.brace_depth + 1
    }
    self.pos = self.pos + 1
    return Ok(Token::new(LBrace, self.span_from(start_loc)))
  }
  if c == 0x7D {
    // `}` — closing brace. If we're inside a template interpolation and the
    // depth would drop to 0 with this close, do NOT emit `RBrace`; instead
    // resume template scanning.
    if self.template_states.length() > 0 {
      let top = self.template_states[self.template_states.length() - 1]
      if top.brace_depth == 0 {
        // Resume template body — consume the `}` and lex template body.
        self.pos = self.pos + 1
        return self.lex_template_resume(start_loc)
      }
      top.brace_depth = top.brace_depth - 1
    }
    self.pos = self.pos + 1
    return Ok(Token::new(RBrace, self.span_from(start_loc)))
  }
  if c == 0x2C {
    self.pos = self.pos + 1
    return Ok(Token::new(Comma, self.span_from(start_loc)))
  }
  if c == 0x3B {
    self.pos = self.pos + 1
    return Ok(Token::new(Semi, self.span_from(start_loc)))
  }
  if c == 0x3A {
    self.pos = self.pos + 1
    return Ok(Token::new(Colon, self.span_from(start_loc)))
  }
  if c == 0x7E {
    self.pos = self.pos + 1
    return Ok(Token::new(Tilde, self.span_from(start_loc)))
  }
  if c == 0x40 {
    self.pos = self.pos + 1
    return Ok(Token::new(At, self.span_from(start_loc)))
  }
  if c == 0x23 {
    // `#name` — private identifier. Bare `#` on its own is a lex error.
    self.pos = self.pos + 1
    let name_start = self.peek(0)
    if is_ident_start_ascii(name_start) ||
      is_ident_char_nonascii(name_start) ||
      name_start == 0x5C {
      // Reuse identifier logic to capture just the name portion.
      match
        self.consume_identifier_name("expected identifier after #", start_loc) {
        Err(e) => return Err(e)
        Ok(name) =>
          return Ok(
            Token::new(PrivateIdentTok(name~), self.span_from(start_loc)),
          )
      }
    }
    return Ok(Token::new(Hash, self.span_from(start_loc)))
  }
  // Question / OptChain / ?? / ??=
  if c == 0x3F {
    self.pos = self.pos + 1
    let n = self.peek(0)
    if n == 0x2E {
      // Only `?.` when NOT followed by a decimal digit (per ES optional chaining spec).
      let after = self.peek(1)
      if after >= 0x30 && after <= 0x39 {
        return Ok(Token::new(Question, self.span_from(start_loc)))
      }
      self.pos = self.pos + 1
      return Ok(Token::new(QuestionDot, self.span_from(start_loc)))
    }
    if n == 0x3F {
      self.pos = self.pos + 1
      if self.peek(0) == 0x3D {
        self.pos = self.pos + 1
        return Ok(Token::new(QuestionQuestionEq, self.span_from(start_loc)))
      }
      return Ok(Token::new(QuestionQuestion, self.span_from(start_loc)))
    }
    return Ok(Token::new(Question, self.span_from(start_loc)))
  }
  // + / ++ / +=
  if c == 0x2B {
    self.pos = self.pos + 1
    let n = self.peek(0)
    if n == 0x2B {
      self.pos = self.pos + 1
      return Ok(Token::new(PlusPlus, self.span_from(start_loc)))
    }
    if n == 0x3D {
      self.pos = self.pos + 1
      return Ok(Token::new(PlusEq, self.span_from(start_loc)))
    }
    return Ok(Token::new(Plus, self.span_from(start_loc)))
  }
  // - / -- / -=
  if c == 0x2D {
    self.pos = self.pos + 1
    let n = self.peek(0)
    if n == 0x2D {
      self.pos = self.pos + 1
      return Ok(Token::new(MinusMinus, self.span_from(start_loc)))
    }
    if n == 0x3D {
      self.pos = self.pos + 1
      return Ok(Token::new(MinusEq, self.span_from(start_loc)))
    }
    return Ok(Token::new(Minus, self.span_from(start_loc)))
  }
  // * / ** / *= / **=
  if c == 0x2A {
    self.pos = self.pos + 1
    let n = self.peek(0)
    if n == 0x2A {
      self.pos = self.pos + 1
      if self.peek(0) == 0x3D {
        self.pos = self.pos + 1
        return Ok(Token::new(StarStarEq, self.span_from(start_loc)))
      }
      return Ok(Token::new(StarStar, self.span_from(start_loc)))
    }
    if n == 0x3D {
      self.pos = self.pos + 1
      return Ok(Token::new(StarEq, self.span_from(start_loc)))
    }
    return Ok(Token::new(Star, self.span_from(start_loc)))
  }
  // / — divide, /=, or regex.
  if c == 0x2F {
    if allow_regex {
      return self.lex_regex(start_loc)
    }
    self.pos = self.pos + 1
    if self.peek(0) == 0x3D {
      self.pos = self.pos + 1
      return Ok(Token::new(SlashEq, self.span_from(start_loc)))
    }
    return Ok(Token::new(Slash, self.span_from(start_loc)))
  }
  // % / %=
  if c == 0x25 {
    self.pos = self.pos + 1
    if self.peek(0) == 0x3D {
      self.pos = self.pos + 1
      return Ok(Token::new(PercentEq, self.span_from(start_loc)))
    }
    return Ok(Token::new(Percent, self.span_from(start_loc)))
  }
  // & / && / &= / &&=
  if c == 0x26 {
    self.pos = self.pos + 1
    let n = self.peek(0)
    if n == 0x26 {
      self.pos = self.pos + 1
      if self.peek(0) == 0x3D {
        self.pos = self.pos + 1
        return Ok(Token::new(AmpAmpEq, self.span_from(start_loc)))
      }
      return Ok(Token::new(AmpAmp, self.span_from(start_loc)))
    }
    if n == 0x3D {
      self.pos = self.pos + 1
      return Ok(Token::new(AmpEq, self.span_from(start_loc)))
    }
    return Ok(Token::new(Amp, self.span_from(start_loc)))
  }
  // | / || / |= / ||=
  if c == 0x7C {
    self.pos = self.pos + 1
    let n = self.peek(0)
    if n == 0x7C {
      self.pos = self.pos + 1
      if self.peek(0) == 0x3D {
        self.pos = self.pos + 1
        return Ok(Token::new(PipePipeEq, self.span_from(start_loc)))
      }
      return Ok(Token::new(PipePipe, self.span_from(start_loc)))
    }
    if n == 0x3D {
      self.pos = self.pos + 1
      return Ok(Token::new(PipeEq, self.span_from(start_loc)))
    }
    return Ok(Token::new(Pipe, self.span_from(start_loc)))
  }
  // ^ / ^=
  if c == 0x5E {
    self.pos = self.pos + 1
    if self.peek(0) == 0x3D {
      self.pos = self.pos + 1
      return Ok(Token::new(CaretEq, self.span_from(start_loc)))
    }
    return Ok(Token::new(Caret, self.span_from(start_loc)))
  }
  // ! / != / !==
  if c == 0x21 {
    self.pos = self.pos + 1
    if self.peek(0) == 0x3D {
      self.pos = self.pos + 1
      if self.peek(0) == 0x3D {
        self.pos = self.pos + 1
        return Ok(Token::new(BangEqEq, self.span_from(start_loc)))
      }
      return Ok(Token::new(BangEq, self.span_from(start_loc)))
    }
    return Ok(Token::new(Bang, self.span_from(start_loc)))
  }
  // = / == / === / =>
  if c == 0x3D {
    self.pos = self.pos + 1
    let n = self.peek(0)
    if n == 0x3D {
      self.pos = self.pos + 1
      if self.peek(0) == 0x3D {
        self.pos = self.pos + 1
        return Ok(Token::new(EqEqEq, self.span_from(start_loc)))
      }
      return Ok(Token::new(EqEq, self.span_from(start_loc)))
    }
    if n == 0x3E {
      self.pos = self.pos + 1
      return Ok(Token::new(Arrow, self.span_from(start_loc)))
    }
    return Ok(Token::new(EqTok, self.span_from(start_loc)))
  }
  // < / <= / << / <<=
  if c == 0x3C {
    self.pos = self.pos + 1
    let n = self.peek(0)
    if n == 0x3D {
      self.pos = self.pos + 1
      return Ok(Token::new(LtEq, self.span_from(start_loc)))
    }
    if n == 0x3C {
      self.pos = self.pos + 1
      if self.peek(0) == 0x3D {
        self.pos = self.pos + 1
        return Ok(Token::new(LtLtEq, self.span_from(start_loc)))
      }
      return Ok(Token::new(LtLt, self.span_from(start_loc)))
    }
    return Ok(Token::new(Lt, self.span_from(start_loc)))
  }
  // > / >= / >> / >>> / >>= / >>>=
  if c == 0x3E {
    self.pos = self.pos + 1
    let n = self.peek(0)
    if n == 0x3D {
      self.pos = self.pos + 1
      return Ok(Token::new(GtEq, self.span_from(start_loc)))
    }
    if n == 0x3E {
      self.pos = self.pos + 1
      let n2 = self.peek(0)
      if n2 == 0x3E {
        self.pos = self.pos + 1
        if self.peek(0) == 0x3D {
          self.pos = self.pos + 1
          return Ok(Token::new(GtGtGtEq, self.span_from(start_loc)))
        }
        return Ok(Token::new(GtGtGt, self.span_from(start_loc)))
      }
      if n2 == 0x3D {
        self.pos = self.pos + 1
        return Ok(Token::new(GtGtEq, self.span_from(start_loc)))
      }
      return Ok(Token::new(GtGt, self.span_from(start_loc)))
    }
    return Ok(Token::new(Gt, self.span_from(start_loc)))
  }
  Err(LexError(msg="unexpected character", loc=start_loc))
}
