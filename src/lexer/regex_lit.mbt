// Regular-expression literal lexer.
//
// A regex literal is `/body/flags` where:
//   - body is one or more RegularExpressionChar, which is any source char
//     except a bare `/`, `\`, LineTerminator, or `[` (special class start).
//   - `\` followed by any non-LineTerminator char is an escape.
//   - `[...]` is a character class; inside, `/` is not treated as terminator.
//   - flags are an IdentifierPart+ suffix, typically `g`, `i`, `m`, `s`, `u`,
//     `y`, `d`.
//
// The M1 lexer captures the raw pattern text (between the delimiters) and the
// flags separately; parsing the pattern is deferred to M4's `regexp` package.

///|
/// Lex a regex literal. Precondition: the current cursor points at the
/// opening `/` and the parser has already decided (via `allow_regex=true`)
/// that this is a regex, not a divide operator.
fn Lexer::lex_regex(
  self : Lexer,
  start_loc : @util.SourceLoc,
) -> Result[Token, LexError] {
  self.pos = self.pos + 1 // consume opening `/`
  let body = StringBuilder()
  let mut in_class = false
  let scan : Result[Unit, LexError] = for _s = 0 {
    let c = self.peek(0)
    if c == -1 || is_line_terminator(c) {
      break Err(LexError(msg="unterminated regex literal", loc=start_loc))
    }
    if c == 0x2F && !in_class {
      self.pos = self.pos + 1
      break Ok(())
    }
    if c == 0x5B {
      in_class = true
      body.write_char(c.unsafe_to_char())
      self.pos = self.pos + 1
      continue 0
    }
    if c == 0x5D && in_class {
      in_class = false
      body.write_char(c.unsafe_to_char())
      self.pos = self.pos + 1
      continue 0
    }
    if c == 0x5C {
      // Escape: consume `\` + next char (verbatim in pattern).
      let n = self.peek(1)
      if n == -1 || is_line_terminator(n) {
        break Err(LexError(msg="invalid regex escape", loc=self.loc_here()))
      }
      body.write_char(c.unsafe_to_char())
      body.write_char(n.unsafe_to_char())
      self.pos = self.pos + 2
      continue 0
    }
    body.write_char(c.unsafe_to_char())
    self.pos = self.pos + 1
    continue 0
  }
  match scan {
    Err(e) => return Err(e)
    Ok(_) => ()
  }
  // Flags — an IdentifierPart+ suffix. ES grammar allows any IdentifierPart,
  // but in practice the flags are a small ASCII letter set; M1 accepts any
  // ident-continue chars and lets M4 validate.
  let flags = StringBuilder()
  while self.pos < self.source.length() {
    let c = self.peek(0)
    if c == -1 {
      break
    }
    if is_ident_continue_ascii(c) || is_ident_char_nonascii(c) {
      flags.write_char(c.unsafe_to_char())
      self.pos = self.pos + 1
    } else {
      break
    }
  }
  Ok(
    Token::new(
      RegExpTok(pattern=body.to_string(), flags=flags.to_string()),
      self.span_from(start_loc),
    ),
  )
}
