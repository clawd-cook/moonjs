// Blackbox tests for the lexer package.
//
// We only import the public API surface — this ensures the parser (Step 6)
// can build against the same interface without visibility hacks.
//
// Test taxonomy:
//   - Punctuator coverage (every kind lexes correctly, longest-match rules).
//   - Keyword vs identifier disambiguation.
//   - Number literals (decimal / hex / octal / binary / separator / edge cases).
//   - String literals (all escape families, line continuation).
//   - Template literals (no-substitution, head/tail, nested).
//   - Regex vs divide context sensitivity.
//   - Comment handling.
//   - Position tracking / span correctness.
//   - Errors (unterminated string / template / regex, invalid escape,
//     invalid number, BigInt suffix).

///|
/// Helper: lex a full source (allow-regex initially) and return every token
/// up to and including `Eof`. Panics on `LexError`.
fn lex_all(src : String) -> Array[@lexer.Token] raise {
  let l = @lexer.Lexer::new(src, "<test>")
  let out : Array[@lexer.Token] = []
  let mut allow_regex = true
  let mut done = false
  while !done {
    match l.lex_next(allow_regex) {
      Ok(tok) => {
        // Decide the next `allow_regex` based on the current token: after an
        // operand (Number/String/Identifier/RParen/RBracket) `/` is Slash;
        // after everything else (including operators, keywords like `return`,
        // etc.) `/` starts a regex. Keeping this state machine simple: any
        // punctuator that isn't a closing paren/bracket / postfix returns
        // regex-allowed context. Identifiers / literals / closers return
        // divide-context.
        allow_regex = match tok.kind {
          IdentifierTok(_)
          | NumberTok(..)
          | StringTok(_)
          | TemplateNoSubTok(..)
          | TemplateTailTok(..)
          | RParen
          | RBracket
          | PlusPlus
          | MinusMinus => false
          _ => true
        }
        let is_eof = match tok.kind {
          Eof => true
          _ => false
        }
        out.push(tok)
        if is_eof {
          done = true
        }
      }
      Err(e) => {
        let @lexer.LexError(msg~, loc~) = e
        fail(
          "lex error: " +
          msg +
          " at " +
          loc.line.to_int().to_string() +
          ":" +
          loc.col.to_int().to_string(),
        )
      }
    }
  }
  out
}

///|
/// Try to lex the source and return the first `LexError`. Fails the test if
/// the source lexes cleanly.
fn expect_lex_error(src : String) -> @lexer.LexError raise {
  let l = @lexer.Lexer::new(src, "<test>")
  let mut allow_regex = true
  while true {
    match l.lex_next(allow_regex) {
      Ok(tok) => {
        allow_regex = match tok.kind {
          IdentifierTok(_)
          | NumberTok(..)
          | StringTok(_)
          | TemplateNoSubTok(..)
          | TemplateTailTok(..)
          | RParen
          | RBracket
          | PlusPlus
          | MinusMinus => false
          _ => true
        }
        match tok.kind {
          Eof => fail("expected error but source lexed to EOF")
          _ => ()
        }
      }
      Err(e) => return e
    }
  }
  fail("unreachable")
}

///|
/// Extract just the TokenKinds from a token stream — makes assertions concise.
fn kinds(toks : Array[@lexer.Token]) -> Array[@lexer.TokenKind] {
  let out : Array[@lexer.TokenKind] = []
  for t in toks {
    out.push(t.kind)
  }
  out
}

// ---------------------------------------------------------------------------
// Punctuator coverage
// ---------------------------------------------------------------------------

///|
test "single-character punctuators" {
  let toks = kinds(lex_all("( ) [ ] { } , ; : . ~ ! ? @"))
  // The last is Eof.
  @test.assert_eq(toks.length(), 15)
  match toks[0] {
    LParen => ()
    _ => fail("expected LParen")
  }
  match toks[13] {
    At => ()
    _ => fail("expected At")
  }
}

///|
test "arithmetic and compound punctuators" {
  // Use identifiers between operators to keep divide vs regex unambiguous.
  let toks = kinds(lex_all("a + a - a * a / a % a ** a"))
  // 7 identifiers + 6 operators + Eof = 14
  @test.assert_eq(toks.length(), 14)
  match toks[1] {
    Plus => ()
    _ => fail("Plus")
  }
  match toks[11] {
    StarStar => ()
    _ => fail("StarStar")
  }
  // Compound assignments — spaces / identifiers keep divide/regex unambiguous.
  let toks2 = kinds(lex_all("a += b -= c *= d **= e /= f %= g"))
  // 7 idents + 6 operators + Eof = 14
  @test.assert_eq(toks2.length(), 14)
  match toks2[5] {
    StarEq => ()
    _ => fail("StarEq")
  }
  match toks2[7] {
    StarStarEq => ()
    _ => fail("StarStarEq")
  }
  match toks2[9] {
    SlashEq => ()
    _ => fail("SlashEq")
  }
  match toks2[11] {
    PercentEq => ()
    _ => fail("PercentEq")
  }
}

///|
test "comparison and equality operators" {
  let toks = kinds(lex_all("< > <= >= == != === !=="))
  @test.assert_eq(toks.length(), 9)
  match toks[6] {
    EqEqEq => ()
    _ => fail("EqEqEq")
  }
  match toks[7] {
    BangEqEq => ()
    _ => fail("BangEqEq")
  }
}

///|
test "shift operators: longest match" {
  // The trickiest set — >>>= must be one token, not >>> then =.
  let toks = kinds(lex_all(">> >>> >>= >>>= << <<="))
  @test.assert_eq(toks.length(), 7)
  match toks[0] {
    GtGt => ()
    _ => fail("GtGt")
  }
  match toks[1] {
    GtGtGt => ()
    _ => fail("GtGtGt")
  }
  match toks[2] {
    GtGtEq => ()
    _ => fail("GtGtEq")
  }
  match toks[3] {
    GtGtGtEq => ()
    _ => fail("GtGtGtEq")
  }
  match toks[4] {
    LtLt => ()
    _ => fail("LtLt")
  }
  match toks[5] {
    LtLtEq => ()
    _ => fail("LtLtEq")
  }
}

///|
test "logical and nullish operators" {
  let toks = kinds(lex_all("&& || ?? &&= ||= ??="))
  @test.assert_eq(toks.length(), 7)
  match toks[3] {
    AmpAmpEq => ()
    _ => fail("AmpAmpEq")
  }
  match toks[5] {
    QuestionQuestionEq => ()
    _ => fail("QuestionQuestionEq")
  }
}

///|
test "increment / decrement and arrow" {
  let toks = kinds(lex_all("++ -- => ..."))
  @test.assert_eq(toks.length(), 5)
  match toks[0] {
    PlusPlus => ()
    _ => fail("PlusPlus")
  }
  match toks[2] {
    Arrow => ()
    _ => fail("Arrow")
  }
  match toks[3] {
    Ellipsis => ()
    _ => fail("Ellipsis")
  }
}

///|
test "optional chaining tokens" {
  let toks = kinds(lex_all("?. ? ??"))
  @test.assert_eq(toks.length(), 4)
  match toks[0] {
    QuestionDot => ()
    _ => fail("QuestionDot")
  }
  match toks[2] {
    QuestionQuestion => ()
    _ => fail("QuestionQuestion")
  }
}

///|
test "?.digit disambiguates to Question then dot-number" {
  // Per ES: ?. followed by a decimal digit is NOT optional chaining. This
  // lets `x?.5` mean `(x) ? (.5) : ...` — well, only inside a ternary; in
  // practice tokenizer just emits Question here and lets parser handle it.
  let toks = kinds(lex_all("a?.5"))
  match toks[0] {
    IdentifierTok(name~) => @test.assert_eq(name, "a")
    _ => fail("IdentifierTok(a)")
  }
  match toks[1] {
    Question => ()
    _ => fail("Question")
  }
  match toks[2] {
    NumberTok(value~, is_int~) => {
      @test.assert_eq(value, 0.5)
      @test.assert_eq(is_int, false)
    }
    _ => fail("NumberTok(.5)")
  }
}

// ---------------------------------------------------------------------------
// Keyword recognition
// ---------------------------------------------------------------------------

///|
test "reserved words lex to KeywordTok" {
  let toks = kinds(lex_all("if else for while return break continue"))
  match toks[0] {
    KeywordTok(kind~) => @test.assert_eq(kind, If_)
    _ => fail("KeywordTok(If_)")
  }
  match toks[6] {
    KeywordTok(kind~) => @test.assert_eq(kind, Continue_)
    _ => fail("KeywordTok(Continue_)")
  }
}

///|
test "let, class, function, this, super lex to keywords" {
  let toks = kinds(lex_all("let class function this super new"))
  match toks[0] {
    KeywordTok(kind~) => @test.assert_eq(kind, Let_)
    _ => fail("Let_")
  }
  match toks[5] {
    KeywordTok(kind~) => @test.assert_eq(kind, New_)
    _ => fail("New_")
  }
}

///|
test "similar-looking identifiers stay identifiers" {
  let toks = kinds(lex_all("iff letter functionx returns"))
  match toks[0] {
    IdentifierTok(name~) => @test.assert_eq(name, "iff")
    _ => fail("iff")
  }
  match toks[1] {
    IdentifierTok(name~) => @test.assert_eq(name, "letter")
    _ => fail("letter")
  }
  match toks[2] {
    IdentifierTok(name~) => @test.assert_eq(name, "functionx")
    _ => fail("functionx")
  }
}

///|
test "contextual async / await / static are identifiers at lex time" {
  let toks = kinds(lex_all("async await static yield"))
  match toks[0] {
    IdentifierTok(name~) => @test.assert_eq(name, "async")
    _ => fail("async")
  }
  match toks[1] {
    IdentifierTok(name~) => @test.assert_eq(name, "await")
    _ => fail("await")
  }
  match toks[2] {
    IdentifierTok(name~) => @test.assert_eq(name, "static")
    _ => fail("static")
  }
  // `yield` IS in the reserved list.
  match toks[3] {
    KeywordTok(kind~) => @test.assert_eq(kind, Yield_)
    _ => fail("Yield_")
  }
}

// ---------------------------------------------------------------------------
// Number literals
// ---------------------------------------------------------------------------

///|
test "decimal integer literal" {
  let toks = kinds(lex_all("123"))
  match toks[0] {
    NumberTok(value~, is_int~) => {
      @test.assert_eq(value, 123.0)
      @test.assert_eq(is_int, true)
    }
    _ => fail("NumberTok(123)")
  }
}

///|
test "decimal float and exponent" {
  let toks = kinds(lex_all("1.5 1e10 1E-3 .5"))
  match toks[0] {
    NumberTok(value~, is_int~) => {
      @test.assert_eq(value, 1.5)
      @test.assert_eq(is_int, false)
    }
    _ => fail("1.5")
  }
  match toks[1] {
    NumberTok(value~, is_int~) => {
      @test.assert_eq(value, 1.0e10)
      @test.assert_eq(is_int, false)
    }
    _ => fail("1e10")
  }
  match toks[2] {
    NumberTok(value~, is_int~) => {
      @test.assert_eq(value, 1.0e-3)
      @test.assert_eq(is_int, false)
    }
    _ => fail("1E-3")
  }
  match toks[3] {
    NumberTok(value~, ..) => @test.assert_eq(value, 0.5)
    _ => fail(".5")
  }
}

///|
test "hex number literal" {
  let toks = kinds(lex_all("0xFF 0X10 0xdeadbeef"))
  match toks[0] {
    NumberTok(value~, is_int~) => {
      @test.assert_eq(value, 255.0)
      @test.assert_eq(is_int, true)
    }
    _ => fail("0xFF")
  }
  match toks[1] {
    NumberTok(value~, ..) => @test.assert_eq(value, 16.0)
    _ => fail("0X10")
  }
  match toks[2] {
    NumberTok(value~, ..) => @test.assert_eq(value, 3735928559.0)
    _ => fail("0xdeadbeef")
  }
}

///|
test "octal and binary number literals" {
  let toks = kinds(lex_all("0o17 0O7 0b101 0B10"))
  match toks[0] {
    NumberTok(value~, is_int~) => {
      @test.assert_eq(value, 15.0)
      @test.assert_eq(is_int, true)
    }
    _ => fail("0o17")
  }
  match toks[1] {
    NumberTok(value~, ..) => @test.assert_eq(value, 7.0)
    _ => fail("0O7")
  }
  match toks[2] {
    NumberTok(value~, ..) => @test.assert_eq(value, 5.0)
    _ => fail("0b101")
  }
  match toks[3] {
    NumberTok(value~, ..) => @test.assert_eq(value, 2.0)
    _ => fail("0B10")
  }
}

///|
test "numeric separator" {
  let toks = kinds(lex_all("1_000 0xFF_FF 1_2.3_4"))
  match toks[0] {
    NumberTok(value~, ..) => @test.assert_eq(value, 1000.0)
    _ => fail("1_000")
  }
  match toks[1] {
    NumberTok(value~, ..) => @test.assert_eq(value, 65535.0)
    _ => fail("0xFF_FF")
  }
  match toks[2] {
    NumberTok(value~, ..) => @test.assert_eq(value, 12.34)
    _ => fail("1_2.3_4")
  }
}

///|
test "BigInt suffix is a lex error in M1" {
  let e = expect_lex_error("123n")
  let @lexer.LexError(msg~, ..) = e
  assert_true(msg.contains("BigInt"))
}

///|
test "0 followed by non-octal digit falls back to decimal" {
  // 09 is not legacy octal; it's a decimal 9 (or SyntaxError in strict, but
  // lex-level allows). Our lexer eats it as 9.
  let toks = kinds(lex_all("09"))
  match toks[0] {
    NumberTok(value~, ..) => @test.assert_eq(value, 9.0)
    _ => fail("0-then-9 decimal")
  }
}

///|
test "legacy octal 0[0-7]+" {
  let toks = kinds(lex_all("017"))
  match toks[0] {
    NumberTok(value~, is_int~) => {
      @test.assert_eq(value, 15.0)
      @test.assert_eq(is_int, true)
    }
    _ => fail("017")
  }
}

// ---------------------------------------------------------------------------
// String literals
// ---------------------------------------------------------------------------

///|
test "double-quoted string" {
  let toks = kinds(lex_all("\"hello\""))
  match toks[0] {
    StringTok(value~) => @test.assert_eq(value, "hello")
    _ => fail("double-quoted")
  }
}

///|
test "single-quoted string" {
  let toks = kinds(lex_all("'world'"))
  match toks[0] {
    StringTok(value~) => @test.assert_eq(value, "world")
    _ => fail("single-quoted")
  }
}

///|
test "string with common escapes" {
  let toks = kinds(lex_all("\"a\\nb\\tc\\\\d\\\"e\""))
  match toks[0] {
    StringTok(value~) => @test.assert_eq(value, "a\nb\tc\\d\"e")
    _ => fail("escapes")
  }
}

///|
test "hex and unicode escapes" {
  let toks = kinds(lex_all("\"\\x41\\u0042\\u{43}\""))
  match toks[0] {
    StringTok(value~) => @test.assert_eq(value, "ABC")
    _ => fail("hex+unicode escapes")
  }
}

///|
test "line continuation in string" {
  // "abc\<newline>def" → "abcdef"
  let src = "\"abc\\\ndef\""
  let toks = kinds(lex_all(src))
  match toks[0] {
    StringTok(value~) => @test.assert_eq(value, "abcdef")
    _ => fail("line continuation")
  }
}

///|
test "unterminated string errors" {
  let @lexer.LexError(msg~, ..) = expect_lex_error("\"unterminated")
  assert_true(msg.contains("unterminated"))
}

///|
test "string with embedded newline is an error" {
  let @lexer.LexError(msg~, ..) = expect_lex_error("\"line1\nline2\"")
  assert_true(msg.contains("unterminated"))
}

// ---------------------------------------------------------------------------
// Templates
// ---------------------------------------------------------------------------

///|
test "template without substitution" {
  let toks = kinds(lex_all("`hello world`"))
  match toks[0] {
    TemplateNoSubTok(cooked~, raw~) => {
      @test.assert_eq(cooked, "hello world")
      @test.assert_eq(raw, "hello world")
    }
    _ => fail("NoSub template")
  }
}

///|
test "template with one substitution" {
  // `foo ${bar} baz` → Head + Ident + Tail
  let toks = kinds(lex_all("`foo ${bar} baz`"))
  match toks[0] {
    TemplateHeadTok(cooked~, ..) => @test.assert_eq(cooked, "foo ")
    _ => fail("TemplateHeadTok")
  }
  match toks[1] {
    IdentifierTok(name~) => @test.assert_eq(name, "bar")
    _ => fail("IdentifierTok(bar)")
  }
  match toks[2] {
    TemplateTailTok(cooked~, ..) => @test.assert_eq(cooked, " baz")
    _ => fail("TemplateTailTok")
  }
}

///|
test "template with two substitutions produces Middle" {
  // `a${1}b${2}c` → Head("a") + 1 + Middle("b") + 2 + Tail("c")
  let toks = kinds(lex_all("`a${1}b${2}c`"))
  match toks[0] {
    TemplateHeadTok(cooked~, ..) => @test.assert_eq(cooked, "a")
    _ => fail("head")
  }
  match toks[2] {
    TemplateMiddleTok(cooked~, ..) => @test.assert_eq(cooked, "b")
    _ => fail("middle")
  }
  match toks[4] {
    TemplateTailTok(cooked~, ..) => @test.assert_eq(cooked, "c")
    _ => fail("tail")
  }
}

///|
test "nested templates handle brace stack correctly" {
  // `${ `x` }` → Head("") + NoSub("x") + Tail("")
  let toks = kinds(lex_all("`${`x`}`"))
  match toks[0] {
    TemplateHeadTok(..) => ()
    _ => fail("outer head")
  }
  match toks[1] {
    TemplateNoSubTok(cooked~, ..) => @test.assert_eq(cooked, "x")
    _ => fail("inner no-sub")
  }
  match toks[2] {
    TemplateTailTok(..) => ()
    _ => fail("outer tail")
  }
}

///|
test "template with LBrace inside interp does not resume prematurely" {
  // `${{ a: 1 }}` — the `}` after `1` closes the object, not the template.
  let toks = kinds(lex_all("`${{a:1}}`"))
  match toks[0] {
    TemplateHeadTok(..) => ()
    _ => fail("head")
  }
  // Then: LBrace, Ident(a), Colon, Number(1), RBrace, Tail
  match toks[1] {
    LBrace => ()
    _ => fail("LBrace")
  }
  let last = toks[toks.length() - 2] // before Eof
  match last {
    TemplateTailTok(..) => ()
    _ => fail("Tail")
  }
}

///|
test "unterminated template is an error" {
  let @lexer.LexError(msg~, ..) = expect_lex_error("`foo")
  assert_true(msg.contains("unterminated"))
}

// ---------------------------------------------------------------------------
// Identifiers
// ---------------------------------------------------------------------------

///|
test "identifier basic ASCII" {
  let toks = kinds(lex_all("foo bar _baz $q q1"))
  match toks[0] {
    IdentifierTok(name~) => @test.assert_eq(name, "foo")
    _ => fail("foo")
  }
  match toks[2] {
    IdentifierTok(name~) => @test.assert_eq(name, "_baz")
    _ => fail("_baz")
  }
  match toks[3] {
    IdentifierTok(name~) => @test.assert_eq(name, "$q")
    _ => fail("$q")
  }
  match toks[4] {
    IdentifierTok(name~) => @test.assert_eq(name, "q1")
    _ => fail("q1")
  }
}

///|
test "identifier with unicode escape" {
  // a = 'a', \u{62} = 'b'
  let toks = kinds(lex_all("\\u0061bc \\u{62}cd"))
  match toks[0] {
    IdentifierTok(name~) => @test.assert_eq(name, "abc")
    _ => fail("escape a-bc")
  }
  match toks[1] {
    IdentifierTok(name~) => @test.assert_eq(name, "bcd")
    _ => fail("escape b-cd")
  }
}

///|
test "private identifier" {
  let toks = kinds(lex_all("#foo #bar"))
  match toks[0] {
    PrivateIdentTok(name~) => @test.assert_eq(name, "foo")
    _ => fail("#foo")
  }
  match toks[1] {
    PrivateIdentTok(name~) => @test.assert_eq(name, "bar")
    _ => fail("#bar")
  }
}

// ---------------------------------------------------------------------------
// Regex vs divide
// ---------------------------------------------------------------------------

///|
test "regex at expression position" {
  // At the start of a statement, `/re/g` is a regex literal.
  let toks = kinds(lex_all("/re/g"))
  match toks[0] {
    RegExpTok(pattern~, flags~) => {
      @test.assert_eq(pattern, "re")
      @test.assert_eq(flags, "g")
    }
    _ => fail("regex expected")
  }
}

///|
test "divide after operand" {
  // `1 / 2` → Number, Slash, Number.
  let toks = kinds(lex_all("1 / 2"))
  match toks[1] {
    Slash => ()
    _ => fail("Slash expected")
  }
}

///|
test "regex with char class containing slash" {
  let toks = kinds(lex_all("/[/]/"))
  match toks[0] {
    RegExpTok(pattern~, ..) => @test.assert_eq(pattern, "[/]")
    _ => fail("regex with class")
  }
}

///|
test "regex with escape" {
  let toks = kinds(lex_all("/\\d+/"))
  match toks[0] {
    RegExpTok(pattern~, ..) => @test.assert_eq(pattern, "\\d+")
    _ => fail("regex escape")
  }
}

///|
test "unterminated regex is an error" {
  let @lexer.LexError(msg~, ..) = expect_lex_error("/unterminated\n")
  assert_true(msg.contains("regex"))
}

// ---------------------------------------------------------------------------
// Comments and whitespace
// ---------------------------------------------------------------------------

///|
test "line comment is skipped" {
  let toks = kinds(lex_all("// hello\nbar"))
  match toks[0] {
    IdentifierTok(name~) => @test.assert_eq(name, "bar")
    _ => fail("bar after //")
  }
}

///|
test "block comment is skipped" {
  let toks = kinds(lex_all("/* hello */bar"))
  match toks[0] {
    IdentifierTok(name~) => @test.assert_eq(name, "bar")
    _ => fail("bar after /* */")
  }
}

///|
test "unterminated block comment is an error" {
  let @lexer.LexError(msg~, ..) = expect_lex_error("/* not closed")
  assert_true(msg.contains("block comment"))
}

///|
test "hashbang on first line is skipped" {
  let toks = kinds(lex_all("#!/usr/bin/env moonjs\nfoo"))
  match toks[0] {
    IdentifierTok(name~) => @test.assert_eq(name, "foo")
    _ => fail("foo after hashbang")
  }
}

///|
test "hashbang NOT skipped when not at line 1 col 0" {
  // At `foo` position, `#` starts a private identifier.
  let toks = kinds(lex_all("foo\n#!bar"))
  match toks[0] {
    IdentifierTok(name~) => @test.assert_eq(name, "foo")
    _ => fail("foo")
  }
  match toks[1] {
    PrivateIdentTok(..) => fail("shouldn't be a private ident with `!`")
    Hash => ()
    _ => fail("Hash")
  }
}

// ---------------------------------------------------------------------------
// Position tracking
// ---------------------------------------------------------------------------

///|
test "token span records start and end column" {
  let l = @lexer.Lexer::new("foo bar", "<test>")
  let a = match l.lex_next(true) {
    Ok(t) => t
    Err(_) => {
      fail("lex a")
      panic()
    }
  }
  let b = match l.lex_next(false) {
    Ok(t) => t
    Err(_) => {
      fail("lex b")
      panic()
    }
  }
  // Line is 1, 1-based; column is 0-based.
  @test.assert_eq(a.span.start.line, (1 : UInt16))
  @test.assert_eq(a.span.start.col, (0 : UInt16))
  @test.assert_eq(a.span.end.col, (3 : UInt16))
  @test.assert_eq(b.span.start.col, (4 : UInt16))
  @test.assert_eq(b.span.end.col, (7 : UInt16))
}

///|
test "line tracking increments on newline" {
  let l = @lexer.Lexer::new("foo\nbar", "<test>")
  let _ = l.lex_next(true)
  let b = match l.lex_next(false) {
    Ok(t) => t
    Err(_) => {
      fail("lex b")
      panic()
    }
  }
  @test.assert_eq(b.span.start.line, (2 : UInt16))
  @test.assert_eq(b.span.start.col, (0 : UInt16))
}

///|
test "line tracking handles CRLF as one line increment" {
  let l = @lexer.Lexer::new("foo\r\nbar", "<test>")
  let _ = l.lex_next(true)
  let b = match l.lex_next(false) {
    Ok(t) => t
    Err(_) => {
      fail("lex b")
      panic()
    }
  }
  @test.assert_eq(b.span.start.line, (2 : UInt16))
}

// ---------------------------------------------------------------------------
// Small integration sanity checks — bits and pieces from test_language.js /
// test_closure.js to give the parser a leg up. We do NOT lex the entire
// files here (MoonBit doesn't ship a straightforward file-I/O API for
// tests); Step 6 will lex them end-to-end via a Bytes-backed reader when
// the parser tests run.
// ---------------------------------------------------------------------------

///|
test "sample: assert function declaration lexes to EOF" {
  let src =
    #|function assert(actual, expected, message) {
    #|    if (arguments.length == 1)
    #|        expected = true;
    #|    if (actual === expected)
    #|        return;
    #|    throw Error("failed");
    #|}
  let toks = lex_all(src)
  // Should end with Eof; no LexError; token count sanity: at least dozens.
  assert_true(toks.length() > 20)
  match toks[toks.length() - 1].kind {
    Eof => ()
    _ => fail("expected EOF sentinel")
  }
}

///|
test "sample: test_op1-style arithmetic and assignment lexes cleanly" {
  let src =
    #|function test_op1() {
    #|    var r;
    #|    r = 1 + 2;
    #|    r = 1 - 2;
    #|    r = -1;
    #|    r = +2;
    #|    r = 2 * 3;
    #|    r = 4 / 2;
    #|    r = 4 % 3;
    #|    r = 4 << 2;
    #|    r = -4 >> 1;
    #|    r = -4 >>> 1;
    #|    r = 1 & 1;
    #|    r = 0 | 1;
    #|    r = 1 ^ 1;
    #|    r = ~1;
    #|    r = !1;
    #|    r = 2 ** 8;
    #|}
  let toks = lex_all(src)
  match toks[toks.length() - 1].kind {
    Eof => ()
    _ => fail("expected EOF")
  }
}

///|
test "sample: nested-closure fragment (test_closure3 fib) lexes cleanly" {
  let src =
    #|function fib(n)
    #|{
    #|    if (n <= 0)
    #|        return 0;
    #|    else if (n == 1)
    #|        return 1;
    #|    else
    #|        return fib(n - 1) + fib(n - 2);
    #|}
    #|var g1 = f(1, 2, 3);
    #|assert(fib(6), 8, "fib");
  let toks = lex_all(src)
  match toks[toks.length() - 1].kind {
    Eof => ()
    _ => fail("expected EOF")
  }
}

///|
test "sample: template with interpolation and division" {
  // `foo ${a + b} bar` — no regex involved, checks Head/Tail with expression.
  let src =
    #|var s = `x ${a + b} y`;
  let toks = lex_all(src)
  let mut saw_head = false
  let mut saw_tail = false
  for t in toks {
    match t.kind {
      TemplateHeadTok(..) => saw_head = true
      TemplateTailTok(..) => saw_tail = true
      _ => ()
    }
  }
  assert_true(saw_head)
  assert_true(saw_tail)
}
