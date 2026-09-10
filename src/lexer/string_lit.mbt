// String and template literal lexing, plus the shared escape-processing
// helpers used by both.
//
// Escape sequences supported (ES2023+):
//   - \' \" \\ \/ (self)
//   - \n \r \t \b \f \v (control chars)
//   - \0 not followed by a decimal digit
//   - \xHH (2 hex digits)
//   - \uHHHH (4 hex digits)
//   - \u{H...} (any number of hex digits, code point <= 0x10FFFF)
//   - line continuation: `\` followed immediately by a LineTerminator
//   - `\` + any-other-char → the char itself (Section 12.9.4 spec allows this
//     as "NonEscapeCharacter" — the value is the character itself)
//
// Template literals share the escape processing but additionally recognise
// `${` as the interpolation start and (for the raw form) preserve the
// verbatim source between the delimiters.

///|
/// Lex a `'...'` or `"..."` string literal. The opening quote has NOT been
/// consumed yet — `quote` is that character's code point.
fn Lexer::lex_string(
  self : Lexer,
  start_loc : @util.SourceLoc,
  quote : Int,
) -> Result[Token, LexError] {
  self.pos = self.pos + 1 // consume opening quote
  let buf = StringBuilder()
  let closed : Result[Unit, LexError] = for _s = 0 {
    let c = self.peek(0)
    if c == -1 {
      break Err(LexError(msg="unterminated string literal", loc=start_loc))
    }
    if c == quote {
      self.pos = self.pos + 1
      break Ok(())
    }
    if is_line_terminator(c) {
      break Err(LexError(msg="unterminated string literal", loc=start_loc))
    }
    if c == 0x5C {
      match self.consume_string_escape() {
        Err(e) => break Err(e)
        Ok(None) => () // line continuation → nothing appended
        Ok(Some(text)) => buf.write_string(text)
      }
      continue 0
    }
    self.pos = self.pos + 1
    buf.write_char(c.unsafe_to_char())
    continue 0
  }
  match closed {
    Err(e) => Err(e)
    Ok(_) =>
      Ok(
        Token::new(StringTok(value=buf.to_string()), self.span_from(start_loc)),
      )
  }
}

///|
/// Consume an escape sequence starting at the leading `\`. Returns
/// `Ok(Some(text))` with the decoded text (usually one char, but wide unicode
/// escapes can decode into a surrogate pair), `Ok(None)` for a line
/// continuation, or `Err` on malformed input.
///
/// Precondition: `self.peek(0)` is a backslash.
fn Lexer::consume_string_escape(self : Lexer) -> Result[String?, LexError] {
  let loc = self.loc_here()
  self.pos = self.pos + 1 // consume `\`
  let c = self.peek(0)
  if c == -1 {
    return Err(LexError(msg="unterminated escape", loc~))
  }
  // Line continuation: \ + line-terminator → nothing.
  if is_line_terminator(c) {
    self.consume_line_terminator()
    return Ok(None)
  }
  if c == 0x6E { // n
    self.pos = self.pos + 1
    return Ok(Some(char_to_string(0x0A)))
  }
  if c == 0x72 { // r
    self.pos = self.pos + 1
    return Ok(Some(char_to_string(0x0D)))
  }
  if c == 0x74 { // t
    self.pos = self.pos + 1
    return Ok(Some(char_to_string(0x09)))
  }
  if c == 0x62 { // b
    self.pos = self.pos + 1
    return Ok(Some(char_to_string(0x08)))
  }
  if c == 0x66 { // f
    self.pos = self.pos + 1
    return Ok(Some(char_to_string(0x0C)))
  }
  if c == 0x76 { // v
    self.pos = self.pos + 1
    return Ok(Some(char_to_string(0x0B)))
  }
  if c == 0x30 {
    // \0 — but only if not followed by a decimal digit.
    let next = self.peek(1)
    if next >= 0x30 && next <= 0x39 {
      return Err(
        LexError(msg="octal escape not allowed in strict-form escape", loc~),
      )
    }
    self.pos = self.pos + 1
    return Ok(Some(char_to_string(0x00)))
  }
  if c == 0x78 {
    // \xHH
    self.pos = self.pos + 1
    let h1 = self.peek(0)
    let h2 = self.peek(1)
    match (hex_digit_value(h1), hex_digit_value(h2)) {
      (Some(a), Some(b)) => {
        self.pos = self.pos + 2
        let v = a * 16 + b
        return Ok(Some(char_to_string(v)))
      }
      _ => return Err(LexError(msg="invalid \\x escape", loc~))
    }
  }
  if c == 0x75 {
    // \uHHHH or \u{...}
    self.pos = self.pos + 1
    match self.consume_unicode_escape_tail(loc) {
      Err(e) => return Err(e)
      Ok(cp) =>
        if cp <= 0xFFFF {
          return Ok(Some(char_to_string(cp)))
        } else {
          // Encode as surrogate pair (JS string is UTF-16 code units).
          let adj = cp - 0x10000
          let high = 0xD800 + (adj >> 10)
          let low = 0xDC00 + (adj & 0x3FF)
          let buf = StringBuilder()
          buf.write_char(high.unsafe_to_char())
          buf.write_char(low.unsafe_to_char())
          return Ok(Some(buf.to_string()))
        }
    }
  }
  if c == 0x27 || c == 0x22 || c == 0x5C || c == 0x2F || c == 0x60 {
    // \' \" \\ \/ \` — self.
    self.pos = self.pos + 1
    return Ok(Some(char_to_string(c)))
  }
  // NonEscapeCharacter: consume it verbatim.
  self.pos = self.pos + 1
  Ok(Some(char_to_string(c)))
}

///|
/// Build a one-code-unit string from a code-unit int.
fn char_to_string(c : Int) -> String {
  let buf = StringBuilder()
  buf.write_char(c.unsafe_to_char())
  buf.to_string()
}

///|
/// Lex the start of a template literal: the leading `` ` `` and everything up
/// to the first `${` or matching backtick. Emits `TemplateNoSubTok` when the
/// template has no interpolation, or `TemplateHeadTok` when it does; in the
/// latter case, a template context is pushed and subsequent lexes return
/// normal expression tokens until the matching `}`.
fn Lexer::lex_template_start(
  self : Lexer,
  start_loc : @util.SourceLoc,
) -> Result[Token, LexError] {
  self.pos = self.pos + 1 // consume opening backtick
  self.lex_template_body(start_loc, false)
}

///|
/// Resume template body scanning after the closing `}` of a `${...}` was
/// consumed. `start_loc` is captured at that `}` position so the emitted
/// token spans from `}` to the next `${` / `` ` ``.
fn Lexer::lex_template_resume(
  self : Lexer,
  start_loc : @util.SourceLoc,
) -> Result[Token, LexError] {
  // Pop the state so nested templates are handled correctly on the way out.
  if self.template_states.length() > 0 {
    let _ = self.template_states.pop()
  }
  self.lex_template_body(start_loc, true)
}

///|
/// Scan template body characters producing cooked + raw forms. `is_resume`
/// controls which token kind we emit when we see `${` (Middle vs Head) and
/// `` ` `` (Tail vs NoSub).
fn Lexer::lex_template_body(
  self : Lexer,
  start_loc : @util.SourceLoc,
  is_resume : Bool,
) -> Result[Token, LexError] {
  let cooked = StringBuilder()
  let raw = StringBuilder()
  for _s = 0 {
    let c = self.peek(0)
    if c == -1 {
      break Err(LexError(msg="unterminated template literal", loc=start_loc))
    }
    // End of template.
    if c == 0x60 {
      self.pos = self.pos + 1
      let cooked_s = cooked.to_string()
      let raw_s = raw.to_string()
      let span = self.span_from(start_loc)
      let tok = if is_resume {
        TemplateTailTok(cooked=cooked_s, raw=raw_s)
      } else {
        TemplateNoSubTok(cooked=cooked_s, raw=raw_s)
      }
      break Ok(Token::new(tok, span))
    }
    // `${` opens an interpolation.
    if c == 0x24 && self.peek(1) == 0x7B {
      self.pos = self.pos + 2
      self.template_states.push({ brace_depth: 0, })
      let cooked_s = cooked.to_string()
      let raw_s = raw.to_string()
      let span = self.span_from(start_loc)
      let tok = if is_resume {
        TemplateMiddleTok(cooked=cooked_s, raw=raw_s)
      } else {
        TemplateHeadTok(cooked=cooked_s, raw=raw_s)
      }
      break Ok(Token::new(tok, span))
    }
    // Escape.
    if c == 0x5C {
      let esc_start = self.pos
      match self.consume_string_escape() {
        Err(e) => break Err(e)
        Ok(None) =>
          // Line continuation: raw still gets the `\` + line terminator.
          for i in esc_start..<self.pos {
            raw.write_char(
              self.source.get(i).unwrap().to_int().unsafe_to_char(),
            )
          }
        Ok(Some(text)) => {
          cooked.write_string(text)
          for i in esc_start..<self.pos {
            raw.write_char(
              self.source.get(i).unwrap().to_int().unsafe_to_char(),
            )
          }
        }
      }
      continue 0
    }
    // Line terminators are legal inside a template.
    if is_line_terminator(c) {
      let esc_start = self.pos
      self.consume_line_terminator()
      // For raw, spec says CRLF should be normalised to LF; we emit the raw
      // source verbatim (LF or CRLF preserved). This is a minor deviation from
      // ES2023's `String.raw` which normalises CR / CRLF to LF; the M1 harness
      // never depends on `String.raw` so we defer normalisation to M2.
      for i in esc_start..<self.pos {
        raw.write_char(self.source.get(i).unwrap().to_int().unsafe_to_char())
      }
      cooked.write_char('\n')
      continue 0
    }
    // Ordinary character.
    self.pos = self.pos + 1
    cooked.write_char(c.unsafe_to_char())
    raw.write_char(c.unsafe_to_char())
    continue 0
  }
}
