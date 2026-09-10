# M1 - Technical Design

Task: `m1-core-vm`. 本文档承接 `prd.md`，落实所有跨模块的数据结构、指令集、算法细节。执行顺序在 `implement.md`。

## 0. 模块清单与依赖

M1 涉及以下 `src/` 子包（parent 前置准备已创建）：

```
src/util/          — 共享工具（不依赖任何本项目其他包）
src/value/         — JSValue, Shape, Object                        依赖: util
src/ast/           — AST 节点定义                                  依赖: util
src/bytecode/      — Opcode, Chunk, SourceLoc                      依赖: util, value（Chunk 的常量池含 JSValue）
src/lexer/         — Token, Lexer                                  依赖: util
src/parser/        — Parser                                        依赖: util, ast, lexer
src/compiler/      — AST → Bytecode                                依赖: util, ast, bytecode, value
src/vm/            — Frame, 主循环, 异常传播                       依赖: util, value, bytecode
src/builtins/      — Object/Function/Error/... 骨架                依赖: util, value, vm
```

顶层 re-export 面（`moonjs.mbt` / `moon.pkg` 根包）：`Engine`, `Engine::new`, `Engine::eval_script(source: String, filename: String) -> Result[JSValue, JSException]`.

Test harness 独立位于 `tests/quickjs_harness/`，依赖顶层 `moonjs`。

## 1. `src/util`

- `SourceLoc { line: UInt16, col: UInt16 }`：M1 全局用的最小 loc 类型。构造用 `SourceLoc::new(line: Int, col: Int)`（内部 `to_uint16()`；理论 wraparound，真实源码 <65535 行不触发）。
- `SourceSpan { start: SourceLoc, end: SourceLoc }`：AST 节点用。
- `InternedString`：M1 内 identifier / property key 池化（`HashMap[String, Int]` + `Array[String]`），常量池、shape key、error message key 都用 interned id。M1 只做最简单的池；M6 优化时可加 small-string optimization。

## 2. `src/value`

### 2.1 JSValue

```moonbit
pub(all) enum JSValue {
  Undefined
  Null
  Bool(Bool)
  Int32(Int)
  Number(Double)
  Str(String)
  Object(ObjectRef)
} derive(@debug.Debug)
pub impl Eq for JSValue      // 手动实现: Object 用 physical_equal（身份相等），其余按 variant 结构相等
```

- 用 `pub(all) enum` 而非 `pub enum`：外部包（compiler / vm / builtins）必须能直接 pattern-match variant constructor 与构造 variant，`pub enum` 只暴露类型名不暴露 constructor。
- `Eq` 不能 derive：JS 语义要求 `{} === {}` 为 false（对象身份相等），所以 `JSValue::Object(o1) == JSValue::Object(o2)` 走 `physical_equal(o1, o2)`；其它 variant 结构相等。手写 `impl Eq for JSValue`。

- `Int32` 表示范围：`Int.min_value ..= Int.max_value`（32-bit signed）。任何算术若结果超出该范围，或涉及非整数，一律走 `Number(Double)`。
- 位运算（`|` `&` `^` `~` `<<` `>>` `>>>`）遵循 ES `ToInt32` / `ToUint32`：先把两侧转 `Int32`，做位运算，返回 `Int32`（`>>>` 语义上是 `Uint32`，但值仍能存进 `Int32` 的位模式；调用方按 `>>>` 时 reinterpret 为 `Uint`）。
- **不做**内部子类型（如 QuickJS 的 `smallint` / `bigfloat`）。M1 就 Int32 + Double 两条快路径。

### 2.2 Object & Shape

```moonbit
pub struct Object {
  mut shape: ShapeRef
  slots: Array[JSValue]                // 与 shape.keys_ordered.length 对齐；grow 时同步
  mut proto: JSValue                   // Object(_) 或 Null
  mut extensible: Bool
  // M2+ 追加: private_slots, class_id, ...
}

pub struct Shape {
  props: @hashmap.HashMap[String, PropMeta]   // MoonBit stdlib hashmap
  keys_ordered: Array[String]                  // 插入顺序
  // M6 优化: parent: ShapeRef?, transitions: HashMap[Key, ShapeRef]  // M1 不实现
}

pub struct PropMeta {
  slot_idx: Int
  attrs: Byte                           // bit0=writable, bit1=enumerable, bit2=configurable, bit3=accessor(M3 起)
}

pub typealias Object as ObjectRef       // MoonBit struct 已具备指针身份语义: mut 字段跨别名共享
pub typealias Shape as ShapeRef         // 无需再包一层 @ref.Ref
```

- MoonBit 结构体默认按引用传递，`mut` 字段跨别名共享——不需要再包 `Ref[T]`。design 早期草案写 `Ref[Object]` 是 C-思维遗物，`typealias` 已足够。
- `PropMeta.attrs` 是 `Byte`（MoonBit 里 8-bit unsigned 就叫 `Byte`，没有 `UInt8`）。位掩码常量 `ATTR_WRITABLE=0x01 / ATTR_ENUMERABLE=0x02 / ATTR_CONFIGURABLE=0x04 / ATTR_ACCESSOR=0x08 / ATTR_DEFAULT_DATA=0x07`。
- Cross-package mutation：MoonBit 里 `mut` 字段不能跨包直接赋值，需要在 `value` 包内提供 setter。M1 提供 `Object::set_proto` / `Object::set_shape` / `Object::prevent_extensions`。所有 slot 修改仍走 `Object::add_property` / `Object::set_own` 高层 API，VM 层不直接触碰 `slots`。

- **M1 简化**：每个 object 一个独立 Shape（不做 shape 共享 / 转移树）。add property = shape.props.set + keys_ordered.push + object.slots.push。这样"多 object 相同外形"的内存优化留给 M6。
- **原型链查找**：`fn get_property(obj: ObjectRef, key: String) -> JSValue`：从 `obj` 起顺 `proto` 链找，miss 到 `Null` 返 `Undefined`；每一跳都是 `shape.props.get(key)`。
- **顺序契约**：`keys_ordered` 只用来枚举（`for-in` in M2、`Object.keys` in M3），M1 无消费者但结构建立。

### 2.3 JSException（异常值）

```moonbit
pub struct JSException {
  value: JSValue                        // 抛出的值本身（通常是 Error object）
  stack: Array[StackFrameInfo]          // 抓取时组装
}
pub struct StackFrameInfo {
  chunk_name: String                    // 函数名 / "<anonymous>" / "<top>"
  filename: String
  loc: SourceLoc
}
```

## 3. `src/ast`

覆盖 ES2023+ 完整语法。M1 只列出关键结构（详细字段在实现时定，且要为 M2 语义预留字段占位而不是"到时再改"）：

```moonbit
pub enum Expr {
  // Literal
  Undefined_
  Null_
  Boolean_(Bool)
  NumberLit(Double)
  StringLit(String)
  RegExpLit(pattern~ : String, flags~ : String)     // M4 才编译，M1 parser 认得
  TemplateLit(quasis~ : Array[String], exprs~ : Array[Expr])  // M2 才编译
  Identifier(String)
  This_
  Super_                                                       // M2 才编译

  // Binary / Unary
  Binary(op~ : BinOp, lhs~ : Expr, rhs~ : Expr)
  Logical(op~ : LogOp, lhs~ : Expr, rhs~ : Expr)
  Unary(op~ : UnaryOp, arg~ : Expr, prefix~ : Bool)
  Update(op~ : UpdateOp, arg~ : Expr, prefix~ : Bool)   // ++ --
  Assign(op~ : AssignOp, lhs~ : Expr, rhs~ : Expr)
  Cond(test~ : Expr, cons~ : Expr, alt~ : Expr)

  // Access
  Member(obj~ : Expr, prop~ : String, computed~ : Bool)
  IndexAccess(obj~ : Expr, index~ : Expr)
  OptionalMember(...)                                          // M2
  OptionalCall(...)                                            // M2

  // Call / new
  Call(callee~ : Expr, args~ : Array[Argument])
  New(callee~ : Expr, args~ : Array[Argument])

  // Object / Array literal
  ObjectLit(props~ : Array[ObjectProperty])
  ArrayLit(elements~ : Array[ArrayElement])                    // 允许 hole 与 spread

  // Function
  FnExpr(...)
  ArrowFn(...)                                                 // M2
  ClassExpr(...)                                               // M2

  // Etc
  Sequence(exprs~ : Array[Expr])
  Spread(arg~ : Expr)                                          // M2
  YieldExpr(...)                                               // M2
  AwaitExpr(...)                                               // M4
  TaggedTemplate(...)                                          // M2
} with SourceSpan

pub enum Stmt {
  Block(body~ : Array[Stmt])
  ExprStmt(expr~ : Expr)
  If(test~ : Expr, cons~ : Stmt, alt~ : Stmt?)
  While(test~ : Expr, body~ : Stmt)
  DoWhile(body~ : Stmt, test~ : Expr)
  For(init~ : ForInit?, test~ : Expr?, update~ : Expr?, body~ : Stmt)
  ForIn(...)                                                    // M2
  ForOf(...)                                                    // M2
  Switch(disc~ : Expr, cases~ : Array[SwitchCase])
  Break(label~ : String?)
  Continue(label~ : String?)
  Return(arg~ : Expr?)
  Throw(arg~ : Expr)
  Try(body~ : Block, catch_~ : CatchClause?, finally_~ : Block?)
  Labeled(label~ : String, body~ : Stmt)
  VarDecl(kind~ : VarKind, decls~ : Array[VarDeclarator])
  FunctionDecl(...)
  ClassDecl(...)                                                // M2
  Empty
  With(obj~ : Expr, body~ : Stmt)                               // M2
  ImportDecl(...)                                               // M5
  ExportDecl(...)                                               // M5
} with SourceSpan

pub enum VarKind { Var; Let; Const; Using; AwaitUsing }
```

（枚举里带 M2..M5 变体，是"parser 完整"策略的实现。M1 compiler 遇到这些变体统一抛 `NotImplementedYet`。）

## 4. `src/bytecode`

### 4.1 Chunk

```moonbit
pub struct Chunk {
  code: Array[UInt]                     // 每 UInt 是一条指令（LE: op | A<<8 | B<<16 | C<<24）
  const_pool: Array[JSValue]
  source_locs: Array[SourceLoc]         // len == code.len
  name: String                          // 函数名或 "<top>"
  filename: String
  param_count: Int
  local_count: Int
  upvalue_slots: Array[UpvalueSlotDecl] // 编译期决定的 upvalue 捕获来源
  nested_chunks: Array[ChunkRef]        // 内部 function template（供 new_closure 指令使用）
  is_strict: Bool                       // M2 起真正消费；M1 一律 false
}

pub struct UpvalueSlotDecl {
  from_kind: UpvalueFromKind            // Local | ParentUpvalue
  from_idx: Int
}
pub enum UpvalueFromKind { Local; ParentUpvalue }
```

### 4.2 Opcode encoding

```moonbit
pub struct Instr {
  op: UInt8
  a: UInt8
  b: UInt8
  c: UInt8
}

// Encoding: (a as UInt) | (b as UInt << 8) | (c as UInt << 16) | ...
// M1 用 32-bit LE，helper:
pub fn encode(op: UInt8, a: UInt8, b: UInt8, c: UInt8) -> UInt
pub fn decode(instr: UInt) -> (UInt8, UInt8, UInt8, UInt8)
```

**wide 前缀**：当 operand 需要 >8 bit（例如 constant pool index >255、jump offset >127），在指令前 emit `wide` opcode，紧跟的下一条指令的 A/B/C 语义仍不变，但取 operand 时把 wide 的 24-bit 拼接进去。**M1 至少支持 `wide` for `push_const`、`jump` / `jump_if_*`、`get_local` / `set_local`**（其它按需追加）。

### 4.3 Opcode 表（M1 完整）

编号连续分配（`0x00..0x4F` 预留 M1 核心，`0x50..` 留给后续里程碑）。

```
// 0x00-0x0F: Push / Stack
0x00 nop        (0 pop, 0 push)
0x01 push_undef (0, 1)
0x02 push_null  (0, 1)
0x03 push_true  (0, 1)
0x04 push_false (0, 1)
0x05 push_i32   (0, 1)   A=high8 B=mid8 C=low8 (仅支持 24-bit 有符号 i32；超范围前缀 wide)
0x06 push_const (0, 1)   A=const_pool_idx (超 255 用 wide)
0x07 dup        (1, 2)
0x08 drop       (1, 0)
0x09 swap       (2, 2)
0x0A pop        (1, 0)   // 与 drop 同义，保留 QuickJS 命名一致

// 0x10-0x1F: 变量
0x10 get_local    (0, 1)   A=slot_idx
0x11 set_local    (1, 0)   A=slot_idx
0x12 get_upvalue  (0, 1)   A=uv_idx
0x13 set_upvalue  (1, 0)   A=uv_idx
0x14 get_global   (0, 1)   A=const_pool_idx (存 name string)
0x15 set_global   (1, 0)   A=const_pool_idx
0x16 declare_global (0, 0) A=const_pool_idx  B=kind (0=var,1=let,2=const)

// 0x20-0x2F: 算术 / 位 / 比较（0 参操作数，全从栈顶取）
0x20 add   (2, 1)
0x21 sub   (2, 1)
0x22 mul   (2, 1)
0x23 div   (2, 1)
0x24 mod   (2, 1)
0x25 pow   (2, 1)
0x26 neg   (1, 1)
0x27 bnot  (1, 1)
0x28 band  (2, 1)
0x29 bor   (2, 1)
0x2A bxor  (2, 1)
0x2B shl   (2, 1)
0x2C shr   (2, 1)
0x2D ushr  (2, 1)
0x2E eq    (2, 1)
0x2F ne    (2, 1)

// 0x30-0x3F: 比较续 / 逻辑 / 类型
0x30 seq        (2, 1)
0x31 sne        (2, 1)
0x32 lt         (2, 1)
0x33 le         (2, 1)
0x34 gt         (2, 1)
0x35 ge         (2, 1)
0x36 not        (1, 1)
0x37 typeof     (1, 1)
0x38 instanceof (2, 1)
0x39 in_        (2, 1)

// 0x40-0x4F: 对象 / 数组 / 函数 / 控制流 / 异常
0x40 new_object (0, 1)
0x41 define_prop (2, 1)   // stack: obj, val -> obj  A=const_pool_idx(name)
0x42 get_prop    (1, 1)   // stack: obj -> val   A=const_pool_idx(name)
0x43 set_prop    (2, 1)   // stack: obj, val -> val  A=const_pool_idx(name)
0x44 get_elem    (2, 1)   // stack: obj, key -> val
0x45 set_elem    (3, 1)   // stack: obj, key, val -> val
0x46 delete_prop (1, 1)   // stack: obj -> bool   A=const_pool_idx(name)
0x47 delete_elem (2, 1)   // stack: obj, key -> bool
0x48 new_array   (0, 1)   A=hint_length
0x49 array_push  (2, 1)   // stack: arr, val -> arr

0x50 new_closure (0, 1)   A=nested_chunks_idx
0x51 call        (n+1, 1) A=argc  // stack: fn, arg1..argn -> ret
0x52 call_method (n+2, 1) A=argc  // stack: this, fn, args -> ret（供 `a.f()` 编译）
0x53 construct   (n+1, 1) A=argc
0x54 return_val  (1, 0)
0x55 return_undef (0, 0)

0x60 jump         (0, 0) 24-bit signed offset from next pc
0x61 jump_if_true (1, 0) 24-bit signed offset
0x62 jump_if_false(1, 0) 24-bit signed offset

0x70 throw        (1, 0)
0x71 enter_try    (0, 0) A=catch_offset_hi B=catch_offset_lo  // 相对 pc；无 catch=0xFFFF；有 finally 在 catch 里 chain
0x72 leave_try    (0, 0)

0xFE wide         (0, 0)  // 前缀，见 §4.2
0xFF halt         (0, 0)  // 未使用，保留
```

**总计 ~50 条 M1 opcode**，位于 `0x00-0x7F`，后续里程碑用 `0x80-` 追加。

### 4.4 常量池策略

- 每个 chunk 独立常量池。相同字符串常量在池内去重（用 `InternedString`）。
- Number 常量：能装进 24-bit signed 用 `push_i32`；否则进常量池 `push_const`。
- Function template：**不进常量池**，进 `chunk.nested_chunks`，`new_closure` 指令按 `nested_chunks_idx` 引用。

## 5. `src/lexer`

### 5.1 Token

```moonbit
pub enum Token {
  // Literals
  NumberTok(value~ : Double, is_int~ : Bool)
  StringTok(value~ : String)
  TemplateHeadTok(cooked~ : String, raw~ : String)     // 后续拼接
  TemplateMiddleTok(cooked~ : String, raw~ : String)
  TemplateTailTok(cooked~ : String, raw~ : String)
  RegExpTok(pattern~ : String, flags~ : String)
  IdentifierTok(name~ : String)
  KeywordTok(kind~ : Keyword)

  // Punctuators (全集，约 50 个)
  LParen; RParen; LBrace; RBrace; LBracket; RBracket
  Comma; Semi; Colon; Dot; Ellipsis; Question; QuestionDot; QuestionQuestion
  Arrow
  Plus; Minus; Star; StarStar; Slash; Percent
  Amp; Pipe; Caret; Tilde; Bang
  Lt; Gt; LtEq; GtEq
  EqEq; EqEqEq; BangEq; BangEqEq
  Eq; PlusEq; MinusEq; StarEq; SlashEq; PercentEq
  StarStarEq; LtLtEq; GtGtEq; GtGtGtEq
  AmpEq; PipeEq; CaretEq
  AmpAmp; PipePipe; AmpAmpEq; PipePipeEq; QuestionQuestionEq
  LtLt; GtGt; GtGtGt
  PlusPlus; MinusMinus
  At                                                        // decorator (M2+)
  Hash                                                       // private field (M2+)

  // EOF / meta
  Eof
} with SourceSpan
```

### 5.2 上下文相关

- **regex vs divide**：lexer 提供 `lex_next(allow_regex: Bool) -> Token`；由 parser 在每次调用前判断上下文（表达式起点 → regex；操作数后 → divide）。
- **template literal**：进入 `${` 后回到"普通表达式"模式，`}` 结束时切回 template body。用一个 stack 记录嵌套。
- **`\u{...}` escape in identifier**：识别后展开到最终字符串。

## 6. `src/parser`

### 6.1 结构

- 递归下降，`Parser { lexer, current, prev_end, ... }`。
- 无 tokenize-then-parse 两阶段：token 按需 pull。
- 关键循环：`parse_expression(precedence)` 走 Pratt。
- ASI：遇到 `LineTerminatorSequence` 时按 spec 规则允许省略 `;`。

### 6.2 上下文敏感解析

- **Arrow function 参数**：先尝试解析 `(...)`，遇到 `=>` 时回溯把 `Expr` 转成 `Params`。M1 parser 支持解析（`ArrowFn` AST 已定义），compiler 抛 `NotImplementedYet`。
- **`let[...]` 起始的语句**：ES 规范要求解析为 `LexicalDeclaration` 或 `ExpressionStatement`（`let` as identifier）—— peek 后续 token 决定。
- **异常提示**：所有 parser error 抛 `ParseError { msg, loc }`，被 Engine 层组装成 `SyntaxError` throw 到 JS 层，位置精确到 offending token 的 col。

## 7. `src/compiler`

### 7.1 Scope & Upvalue 分析

- 每个 function 一次遍历 AST，收集：
  - `locals: Array[LocalDecl] { name, kind: VarKind, slot_idx }`
  - `upvalues: Array[UpvalueSlotDecl]`（引用外层的哪个 local / upvalue）
  - `is_captured: Set[slot_idx]`（本 function 的哪些 local 被内层闭包引用）
- 生成指令时对 identifier 引用做 resolve：`local | upvalue | global`。
- `let` / `const` TDZ：在其 declarator 之前访问抛 `ReferenceError`。M1 用简单方式：declarator 位置之前 emit `push_undef; set_local_TDZ_marker` 后续访问检查一个 sentinel（用一个特殊 JSValue `Undefined_TDZ` variant？—— 不行，会污染 sum type。改用：**编译期分析**保证 TDZ 位置抛静态检查即可；M1 只对最简 case 报错，完整语义留 M6 修 test262 边界）。

### 7.2 Emit

- Compiler 状态：`Chunk builder`（code / const / locs / const dedup map / label patch list）。
- 跳转：先 emit `jump 0`，记录 patch site；目标位置确定后回填 offset。
- 循环 break/continue：`loop_stack: Array[LoopFrame { break_patches, continue_patches, label? }]`。
- try-catch：`enter_try catch_offset` 指令 emit 时先占位，`catch` 位置确定后回填。

### 7.3 未实现节点

```moonbit
match node {
  ArrowFn(_) => raise_compile_error("arrow function not implemented in M1")
  ClassExpr(_) | ClassDecl(_) => raise_compile_error("class not implemented in M1")
  // ...
}
```

Compile error 由 harness 视为该函数不可执行，M1 fixture 不含这些语句。

## 8. `src/vm`

### 8.1 主循环

```moonbit
pub fn Engine::run(self : Engine, initial : Frame) -> Result[JSValue, JSException] {
  let mut frame = initial
  loop {
    let instr = frame.chunk.code[frame.pc]
    frame.pc += 1
    let (op, a, b, c) = decode(instr)
    match op {
      0x01 => frame.stack.push(Undefined)
      0x05 => {
        let value = sign_extend24(a, b, c)
        frame.stack.push(Int32(value))
      }
      // ... 每条 opcode 一个 arm
      0x70 => {
        // throw
        let val = frame.stack.pop()
        let exc = JSException::from(val, capture_stack(frame))
        match unwind(&frame, exc) {
          Handled => continue
          Unhandled(e) => return Err(e)
        }
      }
      // ...
    }
  }
}
```

- 每条 arm 是内联的，避免函数调用开销。
- `capture_stack(frame)`：从 frame 起顺 caller 链一直到根，用 `frame.pc - 1` 查 `chunk.source_locs`（`-1` 因 pc 已递增）。

### 8.2 Call / Return

- `call` 指令：
  1. 从栈弹 argc + 1 个值（fn + argN...arg1，或按具体压栈顺序）。
  2. 校验 fn 是 callable Object（否则 throw TypeError）。
  3. 创建 new Frame：`locals` fixed-size 分配，先按 `param_count` 填参数（多参丢弃，少参补 undefined）、其余置 `Undefined`；`upvalues` 按 fn 的 `upvalue_slots` 从 caller frame resolve。
  4. Push 到 frame 链，切 `frame = new_frame`。
- `return_val` / `return_undef`：
  1. 弹返回值。
  2. 遍历 `frame.is_captured` 中被闭包引用的 slot，把 `UpvalueRef::OnStack` 迁移为 `UpvalueRef::Closed(Ref{value: current_local_value})`。
  3. `frame = frame.caller`，把返回值 push 到 caller 的 operand stack。

### 8.3 Upvalue lifecycle

- Compiler 在 nested function template 的 `UpvalueSlotDecl` 记录"从哪来"（Local 或 ParentUpvalue）。
- `new_closure` 执行时：为每个 upvalue slot 创建 `UpvalueRef::OnStack(caller_frame, local_idx)` 或复用 `caller.upvalues[uv_idx]`。
- `get_upvalue idx`：
  ```
  match frame.upvalues[idx] {
    OnStack(f, i) => f.locals[i]
    Closed(r) => r.value
  }
  ```
- `set_upvalue idx`：镜像。
- Frame return 时 close 所有属于该 frame 的 upvalue：把 `OnStack(this_frame, i)` 变成 `Closed(Ref{value: this_frame.locals[i]})`（所有其他 upvalue 共享该 Ref）。
  - 实现：Frame 里保留 `open_upvalues: Array[UpvalueRefRef]`，是"当前 frame 是 upvalue owner 的所有 ref 引用"。return 时逐个赋值 close。

### 8.4 异常传播

- `throw` 逻辑（§8.1 已简述），unwind 步骤：
  1. 若 `frame.try_stack` 非空，pop 顶部 handler，把异常 push 到 operand stack（catch 变量装载），跳到 `handler.catch_pc`，返回 `Handled`。
  2. 否则 return 到 caller，重复。
  3. 一路到根 frame 仍无 handler → return `Unhandled(exception)`。
- Finally 处理：`enter_finally` / `leave_finally` 配合 —— M1 spec：try/finally 无 catch 时，finally 结束后重新抛；有 catch 且 catch 内 throw 时，finally 结束后抛 catch 的异常。**M1 用最直接的语义**：`enter_try` 同时记录 `catch_pc`（若有）和 `finally_pc`（若有），throw 时先跳 catch（若有），catch 结束前跳 finally；finally 结束后按 pending completion 决定继续 / re-throw / return。（QuickJS 用一个 completion 值栈。）

## 9. `src/builtins`（M1 骨架）

每个 builtin 在 `Engine::new` 时注册到全局对象。M1 只放骨架：constructor + prototype 对象；method table 大多是 `NotImplementedYet` stub 或不注册。

- `Object`：constructor 支持 `new Object` / `Object()`（返回空对象）；`Object.prototype` 是所有对象的原型；`Object.prototype.hasOwnProperty`、`Object.prototype.toString`、`Object.prototype.valueOf`（M3 补齐真正实现，M1 用 stub：toString 返 `"[object Object]"`；hasOwnProperty 走 shape 查）。
- `Function`：`Function.prototype` 是所有 function 的原型；不支持 `new Function(...)`（M1 无 eval）。
- `Error` 家族：`Error` / `TypeError` / `RangeError` / `SyntaxError` / `ReferenceError`。每个是一个 constructor，创建 `{name, message, stack}` 对象；`.prototype.toString` 返 `"<name>: <message>"`。
- `String`：`String.prototype` 骨架；`String()` / `new String()` 简单转换（`test_op2` 里的 `instanceof String` 只需要 constructor 存在）。
- 顶层 `undefined` / `NaN` / `Infinity` / `globalThis` / `Math`（`Math.pow` 供 `**` fallback，也可不建 M1 只让 opcode 直接算）：其它 builtin 到 M3 建全。

## 10. Test harness

- 位置：`tests/quickjs_harness/`（新 package）。
- 依赖顶层 `moonjs`。
- 生成 fixture `tests/quickjs_harness/fixtures/test_language_m1.js`：
  ```js
  // 从 quickjs/tests/test_language.js 抽取 test_op1/test_op2/test_cvt/test_inc_dec
  // 顶层放置 harness assert / assert_throws / gc()（no-op），然后依次调用 4 个 test_*
  ```
- 生成 fixture `tests/quickjs_harness/fixtures/test_closure_m1.js`：
  ```js
  // 从 quickjs/tests/test_closure.js 抽取 assert + f + g1 顶层调用 + test_closure1..3
  // 顶层调用 test_closure1(); test_closure2(); test_closure3();
  ```
- Blackbox test：`tests/quickjs_harness/quickjs_harness_test.mbt`：
  ```moonbit
  test "test_language.js M1 subset" {
    let src = @fs.read_to_string("tests/quickjs_harness/fixtures/test_language_m1.js")
    let engine = @moonjs.Engine::new()
    match engine.eval_script(src, "test_language_m1.js") {
      Ok(_) => ()
      Err(e) => panic(e.to_string())
    }
  }
  ```
  （若 MoonBit stdlib 没有 `fs` 便捷 API，用 `@moonbitlang/core/io` 或读文件 utility；M1 implement 阶段确认能力。）

## 11. Parser error location 测试

- `parse-error-column.js` / `global-reference-column.js` 分析：读原文件、抽取里面对 col 的具体 assert，若 assert 依赖 M2+ 特性则跳过；否则做为 M1 harness fixture 单独跑，验证 MoonJS 报出的 SyntaxError / ReferenceError.stack 中 col 一致。

## 12. 关键实现风险

1. **MoonBit sum type 里含引用（`ObjectRef`）的 variant 是否会引入意外拷贝**：M1 实现开始时先做一个 spike，测算 `JSValue` sum type 在算术热路径的性能与内存表现。若显著劣化到影响 test262 的可运行时长（M6 才知道），M6 可考虑退化成 dual-representation operand stack（primitive vs object 分栈）。M1 不预优化。
2. **TDZ 语义**：`let x; console.log(x); x = 1;` 是合法的（`x` 声明后就退出 TDZ）；MoonJS 需要精准建模。M1 采用"declarator 位置之后视为已初始化"简化模型；完全对齐 spec 留待 M6 冲刺时纠偏。
3. **精确异常 stack**：函数 `caller` 链需要正确维护（尤其 tail call 优化时不能丢帧）。M1 不做 tail call 优化，保留完整链。
4. **Chunk 引用**：MoonBit 里 `Ref[T]` 与 GC 交互，M1 spike 时验证 `Frame.caller: FrameRef?` 循环引用不会造成泄漏（MoonBit GC 支持循环回收，但结构复杂时值得实测）。

## 13. Cross-milestone hooks

M1 主动预留、M2..M4 填充的钩子：

- `Frame.suspend_state: Option[SuspendState]`（M2 generator 挂起用）—— M1 定义字段但 `None`。
- `Object.private_slots: Array[JSValue]?` —— M2 class private field 用。
- `Chunk.is_strict: Bool` —— M2 strict mode 用。
- `PropMeta.kind: Data | Accessor` —— M3 accessor 用；M1 只放 `Data`。
