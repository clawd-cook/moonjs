// Parser core: struct definition, error type, primitives.
//
// Recursive-descent parser producing the AST defined in src/ast. Pratt-style
// expression parsing lives in expr.mbt; statement / declaration parsing lives
// in stmt.mbt. Everything here is package-private except `Parser`,
// `Parser::new`, `Parser::parse_script`, and `ParseError`.
//
// Context / regex-vs-divide handling: the lexer needs a hint at every `lex_next`
// call whether `/` should start a regex literal (expression position) or be a
// divide operator (operand position). We pick this by inspecting the token
// just consumed — after IdentifierTok / NumberTok / StringTok / a closing
// paren/bracket / postfix `++` `--` we're at an operand position, and `/`
// should be a divide. After anything else (operators, `{`, `(`, `[`, `,`, `;`,
// keywords like `return` / `throw` / `new`) we're at an expression position and
// `/` should start a regex.
//
// ASI: we detect a "line terminator before the current token" via
// `current.span.start.line != prev_end.line`. Callers that care (e.g. after
// `throw`, `return`, `break x`, `continue x`, postfix `++`) consult
// `had_lt_before`.

///|
/// Parser state.
///
/// - `lexer`: pulls tokens from the underlying source.
/// - `current`: the current lookahead token; consumed by `advance`.
/// - `prev_end`: end-of-span of the token most recently consumed. Used to
///   detect "there was a line terminator between the previous token and the
///   current one" for ASI.
/// - `filename`: mirrored from the lexer for error reporting.
/// - `in_loop`: nesting depth of loop bodies — `break;` / `continue;` (without
///   a label) require this to be > 0.
/// - `labels`: currently-in-scope labels, checked when parsing `break L;` /
///   `continue L;`.
pub struct Parser {
  priv lexer : @lexer.Lexer
  priv mut current : @lexer.Token
  priv mut prev_end : @util.SourceLoc
  priv mut in_loop : Int
  priv labels : Array[String]
}

///|
/// Parser error. Carries a location so callers can render precise diagnostics.
pub(all) suberror ParseError {
  ParseError(msg~ : String, loc~ : @util.SourceLoc)
} derive(@debug.Debug)

///|
/// Construct a parser over `source`. Advances the lexer once to prime
/// `current`; a `LexError` on the very first token is surfaced as `ParseError`.
pub fn Parser::new(
  source : String,
  filename : String,
) -> Result[Parser, ParseError] {
  let l = @lexer.Lexer::new(source, filename)
  // First token is always in expression-start position; allow regex.
  match l.lex_next(true) {
    Err(e) => {
      let @lexer.LexError(msg~, loc~) = e
      Err(ParseError(msg~, loc~))
    }
    Ok(tok) =>
      Ok({
        lexer: l,
        current: tok,
        prev_end: @util.SourceLoc::new(1, 0),
        in_loop: 0,
        labels: [],
      })
  }
}

///|
/// Consume the current token and lex the next one. Uses the token being
/// consumed to decide whether the next lex should allow a regex literal at
/// `/`. Callers that need a specific override should use `advance_with_regex`
/// (present for symmetry / future extension; not currently needed).
fn Parser::advance(self : Parser) -> Result[Unit, ParseError] {
  let allow_regex = match self.current.kind {
    IdentifierTok(_)
    | NumberTok(..)
    | StringTok(_)
    | TemplateNoSubTok(..)
    | TemplateTailTok(..)
    | RParen
    | RBracket
    | PlusPlus
    | MinusMinus
    // Primary-value keywords sit in operand position, so `/` after them is a
    // divide operator, not a regex. Without this, `true / 2` misparses the `/`
    // as the start of a regex literal.
    | KeywordTok(kind=True_)
    | KeywordTok(kind=False_)
    | KeywordTok(kind=Null_)
    | KeywordTok(kind=This_)
    | KeywordTok(kind=Super_) => false
    _ => true
  }
  self.prev_end = self.current.span.end
  match self.lexer.lex_next(allow_regex) {
    Err(e) => {
      let @lexer.LexError(msg~, loc~) = e
      Err(ParseError(msg~, loc~))
    }
    Ok(tok) => {
      self.current = tok
      Ok(())
    }
  }
}

///|
/// Convenience: return a fresh `ParseError` at the *current* token's start
/// location.
fn Parser::error(self : Parser, msg : String) -> ParseError {
  ParseError(msg~, loc=self.current.span.start)
}

///|
/// True iff there was a line terminator between the previous token's end
/// and the current token's start.
fn Parser::had_lt_before(self : Parser) -> Bool {
  self.current.span.start.line != self.prev_end.line
}

///|
/// Consume the current token when it matches; else raise `ParseError` with
/// `msg`.
fn Parser::expect(
  self : Parser,
  matcher : (@lexer.TokenKind) -> Bool,
  msg : String,
) -> Result[Unit, ParseError] {
  if matcher(self.current.kind) {
    self.advance()
  } else {
    Err(self.error(msg))
  }
}

///|
/// ASI-aware `;` consumer. Accepts:
///   1. Explicit `;` — consume it.
///   2. `}` — do not consume, the enclosing block consumes it.
///   3. `Eof` — do not consume.
///   4. Any other token when preceded by a line terminator — do nothing (ASI).
/// Otherwise error.
fn Parser::expect_semi(self : Parser) -> Result[Unit, ParseError] {
  match self.current.kind {
    Semi => self.advance()
    RBrace | Eof => Ok(())
    _ =>
      if self.had_lt_before() {
        Ok(())
      } else {
        Err(self.error("expected ';'"))
      }
  }
}

///|
/// Read a plain identifier name. Rejects reserved words. Contextual
/// keywords like `async` / `await` are already `IdentifierTok` at lex time so
/// they pass through.
fn Parser::expect_ident(self : Parser) -> Result[String, ParseError] {
  match self.current.kind {
    IdentifierTok(name~) =>
      match self.advance() {
        Err(e) => Err(e)
        Ok(_) => Ok(name)
      }
    _ => Err(self.error("expected identifier"))
  }
}

///|
/// Parse a full program. In 6a we always produce `is_module=false` — module
/// syntax (Import / Export at top level) is out of scope and errors early.
pub fn Parser::parse_script(self : Parser) -> Result[@ast.Program, ParseError] {
  let body : Array[@ast.Stmt] = []
  let done : Result[Unit, ParseError] = for _s = 0 {
    match self.current.kind {
      Eof => break Ok(())
      _ =>
        match self.parse_stmt() {
          Err(e) => break Err(e)
          Ok(s) => {
            body.push(s)
            continue 0
          }
        }
    }
  }
  match done {
    Err(e) => Err(e)
    Ok(_) => Ok(@ast.Program::new(body, false))
  }
}
