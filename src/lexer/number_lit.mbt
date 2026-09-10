// Number-literal lexer.
//
// ES2023+ number forms covered:
//   - decimal: `0`, `[1-9][0-9]*`, optional `.` fraction, optional `e[+-]?E`
//     exponent
//   - hex: `0x[0-9a-fA-F]+`
//   - octal: `0o[0-7]+`
//   - binary: `0b[01]+`
//   - legacy octal: `0[0-7]+` (non-strict only; lex accepts, semantic rejection
//     is a strict-mode / parser concern for M2)
//   - numeric separator `_` allowed between digits (but not at edges nor
//     doubled up).
//
// BigInt suffix `n` is *not* supported in M1 — the AST doesn't have a BigInt
// variant yet. We emit `LexError` if we see a well-formed number followed by
// `n`, which is easier to explain than silently ignoring the suffix.

///|
/// Entry point for number literals. `start_loc` is captured before the
/// leading digit / dot so the resulting token span is correct.
fn Lexer::lex_number(
  self : Lexer,
  start_loc : @util.SourceLoc,
) -> Result[Token, LexError] {
  let first = self.peek(0)
  // Leading `.` cases were already dispatched by the main loop; here we may
  // still see `.` as the first char if the caller reached us that way.
  if first == 0x2E {
    return self.lex_number_after_dot(start_loc)
  }
  if first == 0x30 {
    // Could be 0x.., 0o.., 0b.., 0..., 0.5, 0e5, or legacy octal / plain 0.
    let n = self.peek(1)
    if n == 0x78 || n == 0x58 {
      // hex
      self.pos = self.pos + 2
      return self.lex_number_radix(start_loc, 16)
    }
    if n == 0x6F || n == 0x4F {
      self.pos = self.pos + 2
      return self.lex_number_radix(start_loc, 8)
    }
    if n == 0x62 || n == 0x42 {
      self.pos = self.pos + 2
      return self.lex_number_radix(start_loc, 2)
    }
    // Legacy octal `0[0-7]+` — only if next digit is [0-7] and NO `.` / `e`
    // appears (that would be a decimal). We look ahead conservatively: if all
    // digits up to the first non-digit are 0-7 AND we do not hit `.`, `e`, or
    // `8`/`9`, treat as legacy octal. Otherwise fall through to decimal.
    if n >= 0x30 && n <= 0x39 {
      if self.looks_like_legacy_octal() {
        // Consume leading `0`.
        self.pos = self.pos + 1
        return self.lex_number_radix(start_loc, 8)
      }
    }
    // Otherwise decimal.
  }
  self.lex_number_decimal(start_loc)
}

///|
/// Return `true` if the current cursor points at `0<octal-digit>+` and no
/// `.` / `e` / `E` / `8` / `9` appear before the token ends. We do this
/// scan without mutating state.
fn Lexer::looks_like_legacy_octal(self : Lexer) -> Bool {
  // First digit is at pos+1; check every subsequent digit until we hit a
  // non-digit / non-separator.
  let mut i = self.pos + 1
  let mut saw_octal_only = true
  while i < self.source_len() {
    let c = self.source.get(i).unwrap().to_int()
    if c >= 0x30 && c <= 0x37 {
      i = i + 1
    } else if c == 0x38 || c == 0x39 {
      saw_octal_only = false
      i = i + 1
    } else if c == 0x2E || c == 0x65 || c == 0x45 {
      // `.` / `e` / `E` → decimal.
      return false
    } else {
      break
    }
  }
  saw_octal_only
}

///|
/// Read digits (with `_` separators) in the given radix, returning them as
/// a decoded integer as a `Double`. Radix 2, 8, or 16. Called after the
/// prefix (`0x`, `0o`, `0b`, or a lone `0` in legacy octal mode) is consumed.
fn Lexer::lex_number_radix(
  self : Lexer,
  start_loc : @util.SourceLoc,
  radix : Int,
) -> Result[Token, LexError] {
  let mut value : Double = 0.0
  let mut count = 0
  let mut prev_underscore = false
  let scan : Result[Unit, LexError] = for _s = 0 {
    let c = self.peek(0)
    if c == 0x5F {
      // separator
      if count == 0 || prev_underscore {
        break Err(
          LexError(msg="invalid numeric separator", loc=self.loc_here()),
        )
      }
      prev_underscore = true
      self.pos = self.pos + 1
      continue 0
    }
    let digit = if radix == 16 {
      hex_digit_value(c)
    } else if radix == 8 {
      octal_digit_value(c)
    } else {
      binary_digit_value(c)
    }
    match digit {
      Some(d) => {
        prev_underscore = false
        value = value * radix.to_double() + d.to_double()
        count = count + 1
        self.pos = self.pos + 1
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
    return Err(LexError(msg="expected digits", loc=start_loc))
  }
  if prev_underscore {
    return Err(LexError(msg="trailing numeric separator", loc=start_loc))
  }
  // Reject BigInt suffix explicitly.
  if self.peek(0) == 0x6E {
    return Err(LexError(msg="BigInt not supported in M1", loc=start_loc))
  }
  Ok(Token::new(NumberTok(value~, is_int=true), self.span_from(start_loc)))
}

///|
/// Read a decimal number literal: integer part, optional fraction, optional
/// exponent, optional BigInt suffix.
fn Lexer::lex_number_decimal(
  self : Lexer,
  start_loc : @util.SourceLoc,
) -> Result[Token, LexError] {
  // Integer part.
  let mut has_int_digits = false
  let mut prev_underscore = false
  let int_scan : Result[Unit, LexError] = for _s = 0 {
    let c = self.peek(0)
    if c >= 0x30 && c <= 0x39 {
      has_int_digits = true
      prev_underscore = false
      self.pos = self.pos + 1
      continue 0
    }
    if c == 0x5F {
      if !has_int_digits || prev_underscore {
        break Err(
          LexError(msg="invalid numeric separator", loc=self.loc_here()),
        )
      }
      prev_underscore = true
      self.pos = self.pos + 1
      continue 0
    }
    break Ok(())
  }
  match int_scan {
    Err(e) => return Err(e)
    Ok(_) => ()
  }
  if prev_underscore {
    return Err(LexError(msg="trailing numeric separator", loc=start_loc))
  }
  // Fractional part.
  let mut is_int = true
  if self.peek(0) == 0x2E {
    // Only treat `.` as fraction if what follows is a digit or the mantissa
    // has some digits already (e.g. `1.` is a number literal `1.0`).
    let n = self.peek(1)
    if (n >= 0x30 && n <= 0x39) || has_int_digits {
      is_int = false
      self.pos = self.pos + 1
      let mut prev_us = false
      let frac_scan : Result[Unit, LexError] = for _s = 0 {
        let c = self.peek(0)
        if c >= 0x30 && c <= 0x39 {
          prev_us = false
          self.pos = self.pos + 1
          continue 0
        }
        if c == 0x5F {
          if prev_us {
            break Err(
              LexError(msg="invalid numeric separator", loc=self.loc_here()),
            )
          }
          prev_us = true
          self.pos = self.pos + 1
          continue 0
        }
        break Ok(())
      }
      match frac_scan {
        Err(e) => return Err(e)
        Ok(_) => ()
      }
      if prev_us {
        return Err(LexError(msg="trailing numeric separator", loc=start_loc))
      }
    }
  }
  // Exponent part.
  if self.peek(0) == 0x65 || self.peek(0) == 0x45 {
    is_int = false
    self.pos = self.pos + 1
    if self.peek(0) == 0x2B || self.peek(0) == 0x2D {
      self.pos = self.pos + 1
    }
    let mut count = 0
    let mut prev_us = false
    let exp_scan : Result[Unit, LexError] = for _s = 0 {
      let c = self.peek(0)
      if c >= 0x30 && c <= 0x39 {
        prev_us = false
        count = count + 1
        self.pos = self.pos + 1
        continue 0
      }
      if c == 0x5F {
        if count == 0 || prev_us {
          break Err(
            LexError(msg="invalid numeric separator", loc=self.loc_here()),
          )
        }
        prev_us = true
        self.pos = self.pos + 1
        continue 0
      }
      break Ok(())
    }
    match exp_scan {
      Err(e) => return Err(e)
      Ok(_) => ()
    }
    if count == 0 {
      return Err(LexError(msg="missing exponent", loc=start_loc))
    }
    if prev_us {
      return Err(LexError(msg="trailing numeric separator", loc=start_loc))
    }
  }
  // Reject BigInt suffix `n`.
  if self.peek(0) == 0x6E {
    return Err(LexError(msg="BigInt not supported in M1", loc=start_loc))
  }
  // Parse the accumulated substring.
  let end = self.pos
  let literal = self.source.unsafe_substring(
    start=start_loc_offset(self, start_loc),
    end~,
  )
  let cleaned = strip_underscores(literal)
  let value = parse_double_or_fail(cleaned) catch {
    _ => return Err(LexError(msg="invalid number literal", loc=start_loc))
  }
  Ok(Token::new(NumberTok(value~, is_int~), self.span_from(start_loc)))
}

///|
/// Recover the byte offset from a `SourceLoc` snapshotted earlier during this
/// lexer's scan. `start_loc.col` is `pos - line_start` at the moment of
/// capture, and lines haven't wrapped through the number (numbers do not
/// contain line terminators), so we can rebuild the offset without keeping a
/// separate int.
fn start_loc_offset(l : Lexer, start : @util.SourceLoc) -> Int {
  // Convert UInt16 -> Int.
  let col = start.col.to_int()
  // Since a number literal never crosses a line, `line_start` at the time of
  // capture equals the current `line_start`. Callers guarantee this.
  l.line_start + col
}

///|
/// Numeric-separator (`_`) stripper. ES lexer accepts them anywhere between
/// digits; parsers of the resulting text (i.e. the stdlib `parse_double`)
/// don't accept them.
fn strip_underscores(s : String) -> String {
  let buf = StringBuilder()
  for i in 0..<s.length() {
    let c = s.get(i).unwrap().to_int()
    if c != 0x5F {
      buf.write_char(c.unsafe_to_char())
    }
  }
  buf.to_string()
}

///|
/// Wrapper around `@string.parse_double`. The stdlib API raises on failure;
/// we convert that to a plain `Result`-style flow via MoonBit's `try / catch`.
/// The `raise` is retained so callers use `try / catch`; `_ignore` below
/// makes the "raise never triggers with our sanitised input" branch happy.
fn parse_double_or_fail(s : String) -> Double raise {
  @string.parse_double(s.view())
}

///|
/// Consume a number that started with `.` (no integer part). E.g. `.5`.
fn Lexer::lex_number_after_dot(
  self : Lexer,
  start_loc : @util.SourceLoc,
) -> Result[Token, LexError] {
  // We know source[pos] == '.' and source[pos+1] is a digit.
  self.pos = self.pos + 1 // consume `.`
  let mut prev_us = false
  let frac_scan : Result[Unit, LexError] = for _s = 0 {
    let c = self.peek(0)
    if c >= 0x30 && c <= 0x39 {
      prev_us = false
      self.pos = self.pos + 1
      continue 0
    }
    if c == 0x5F {
      if prev_us {
        break Err(
          LexError(msg="invalid numeric separator", loc=self.loc_here()),
        )
      }
      prev_us = true
      self.pos = self.pos + 1
      continue 0
    }
    break Ok(())
  }
  match frac_scan {
    Err(e) => return Err(e)
    Ok(_) => ()
  }
  if prev_us {
    return Err(LexError(msg="trailing numeric separator", loc=start_loc))
  }
  // Optional exponent.
  if self.peek(0) == 0x65 || self.peek(0) == 0x45 {
    self.pos = self.pos + 1
    if self.peek(0) == 0x2B || self.peek(0) == 0x2D {
      self.pos = self.pos + 1
    }
    let mut count = 0
    while self.pos < self.source_len() {
      let c = self.peek(0)
      if c >= 0x30 && c <= 0x39 {
        count = count + 1
        self.pos = self.pos + 1
      } else {
        break
      }
    }
    if count == 0 {
      return Err(LexError(msg="missing exponent", loc=start_loc))
    }
  }
  if self.peek(0) == 0x6E {
    return Err(LexError(msg="BigInt not supported in M1", loc=start_loc))
  }
  let literal = self.source.unsafe_substring(
    start=start_loc_offset(self, start_loc),
    end=self.pos,
  )
  let cleaned = strip_underscores(literal)
  let value = parse_double_or_fail(cleaned) catch {
    _ => return Err(LexError(msg="invalid number literal", loc=start_loc))
  }
  Ok(Token::new(NumberTok(value~, is_int=false), self.span_from(start_loc)))
}
