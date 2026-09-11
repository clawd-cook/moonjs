---
description: MoonJS 如何表示 JavaScript 值 —— JSValue variant、Object + Shape、函数、Int32 快路径。
---

# 值与对象

## JSValue

覆盖所有 JS 运行时值的核心 sum type：

```moonbit
pub(all) enum JSValue {
  Undefined
  Null
  Bool(Bool)
  Int32(Int)          // -2^31..2^31-1 快路径
  Number(Double)      // IEEE-754
  Str(String)         // MoonBit String —— 天然 UTF-16 code unit，与 JS 对齐
  Object(Object)
  Function(Function)          // 用户定义的字节码函数
  NativeFn(NativeFunction)    // MoonBit 定义的可调用
} derive(@debug.Debug)
pub impl Eq for JSValue      // 手写；Object/Function/NativeFn 走 physical_equal
```

`pub(all) enum` 让 variant 成为公共 API 的一部分 —— 每个下游对 `JSValue` 的 `match` 都会被类型系统检查，"仅增不减"的跨里程碑契约由此获得强制力。在后续里程碑新增 variant 是 breaking change，所有 match 站点必须在同一次提交中更新。

## Int32 快路径

两侧都是 `Int32` 且结果能装进 32-bit signed 时，算术留在 `Int32`。溢出提升为 `Number(Double)`。位运算总是经过 `ToInt32` / `ToUint32` 返回 `Int32`。

按 JS spec：`+0 === -0` 为 `true`；`NaN === NaN` 为 `false`。`Int32(x)` 与 `Number(y)` 的严格相等在 `x.to_double() == y` 时为 `true` —— 两者在 JS 里都是 Number。

## Object 与 Shape

每个对象拥有独立 `Shape`（M1 简化：不做 shape 共享 / 转移树；M6 优化）。

```moonbit
pub struct Object {
  mut shape: Shape
  slots: Array[JSValue]           // 长度 = shape.keys_ordered.length
  mut proto: JSValue              // Object(_) 或 Null
  mut extensible: Bool
}
pub struct Shape {
  props: HashMap[String, PropMeta]
  keys_ordered: Array[String]     // 插入顺序 —— 用于 for-in / Object.keys
}
pub struct PropMeta {
  slot_idx: Int
  attrs: Byte                     // bit0=writable, bit1=enumerable, bit2=configurable, bit3=accessor (M3+)
}
```

属性查找通过 `Object::get_property` 走原型链。`Object::has_own` 与 `Object::has_property` 分别对应 `Object.hasOwn` 与 `in` 运算符。

## Function

用户定义函数是堆上的 `Function` 值：

```moonbit
pub struct Function {
  chunk_id: Int                // 索引进 Engine.chunk_registry
  upvalues: Array[Upvalue]     // 捕获的 cell
  name: String
  is_constructor: Bool
  mut prototype: JSValue       // OP_NEW_CLOSURE 设置；instanceof 与 new 用到
}
```

`Chunk` 不能作为 `Function` 的直接字段（会引入 `value ↔ bytecode` 循环依赖），所以 Engine 保存 `chunk_registry: Array[Chunk]`，`Function.chunk_id` 是不透明索引。

## Upvalue

M1 对每个 local slot 用统一的堆 cell（`frame.locals: Array[Upvalue]`）。这简化了闭包语义：内层函数捕获的外层变量只是同一个 `Upvalue` cell 的另一次读取，不需要"作用域退出时 close"。代价是每个 local 声明一次堆分配；收益是 VM 简单得多。

## NativeFunction

`NativeFunction` 包装 MoonBit 定义的可调用：

```moonbit
pub struct NativeFunction {
  name: String
  is_constructor: Bool
  impl_: (JSValue, Array[JSValue]) -> Result[JSValue, NativeError]
  mut prototype: JSValue
}
```

内置对象（`Object`、`Error`、`TypeError`、`RangeError`、`SyntaxError`、`ReferenceError`、`String`）都是 `NativeFn`，由 `Builtins::install_into` 安装到全局作用域。它们的 `prototype` 字段连到相应的 prototype `Object`，因此 `new Error(...) instanceof Error` 能沿正确的链走。

## 异常

```moonbit
pub struct JSException {
  value: JSValue                          // 通常是 Error 家族对象
  stack: Array[StackFrameInfo]            // throw 时抓取
}
pub struct StackFrameInfo {
  chunk_name: String
  filename: String
  loc: SourceLoc
}
```

`propagate_exception` 走 caller 链，每帧追加一个 `StackFrameInfo`，同时在每帧的 `try_stack` 查匹配 `TryHandler`。未被捕获的异常从 `Engine::eval_script` 返回 `Err(JSException)`。
