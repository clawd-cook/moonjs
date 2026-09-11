---
description: How MoonJS represents JavaScript values — JSValue variants, Object + Shape, functions, and the Int32 fast path.
---

# Values and objects

## JSValue

The core sum type over all JS runtime values:

```moonbit
pub(all) enum JSValue {
  Undefined
  Null
  Bool(Bool)
  Int32(Int)          // -2^31..2^31-1 fast path
  Number(Double)      // IEEE-754
  Str(String)         // MoonBit String — already UTF-16 code units, matches JS
  Object(Object)
  Function(Function)  // user-defined bytecode function
  NativeFn(NativeFunction)  // MoonBit-defined callable
} derive(@debug.Debug)
pub impl Eq for JSValue      // manual; Object/Function/NativeFn use physical_equal
```

`pub(all) enum` makes the variants part of the public API — every downstream `match` on `JSValue` is compiler-checked, so the "additive-only" cross-milestone contract has teeth. Adding a variant in a later milestone is a breaking change and all match sites must be updated in the same commit.

## Int32 fast path

Arithmetic where both operands are `Int32` and the result fits in 32-bit signed stays in `Int32`. Overflow promotes to `Number(Double)`. Bitwise operators always go through `ToInt32` / `ToUint32` and return `Int32`.

`+0 === -0` is `true` per JS spec; `NaN === NaN` is `false`. Strict equality on `Int32(x)` vs `Number(y)` is `true` when `x.to_double() == y` — both are Number in JS.

## Object and Shape

Each object owns a `Shape` (M1 simplification: no shape-sharing / transition tree; M6 optimization target).

```moonbit
pub struct Object {
  mut shape: Shape
  slots: Array[JSValue]           // length = shape.keys_ordered.length
  mut proto: JSValue              // Object(_) or Null
  mut extensible: Bool
}
pub struct Shape {
  props: HashMap[String, PropMeta]
  keys_ordered: Array[String]     // insertion order — for-in / Object.keys ordering
}
pub struct PropMeta {
  slot_idx: Int
  attrs: Byte                     // bit0=writable, bit1=enumerable, bit2=configurable, bit3=accessor (M3+)
}
```

Property lookup walks the prototype chain via `Object::get_property`. `Object::has_own` and `Object::has_property` mirror `Object.hasOwn` and the `in` operator respectively.

## Function

User-defined functions are heap `Function` values with:

```moonbit
pub struct Function {
  chunk_id: Int                // index into Engine.chunk_registry
  upvalues: Array[Upvalue]     // captured cells
  name: String
  is_constructor: Bool
  mut prototype: JSValue       // set at OP_NEW_CLOSURE; used by instanceof and new
}
```

`Chunk` cannot be a direct field on `Function` (that would introduce a circular `value ↔ bytecode` dependency), so the Engine keeps a `chunk_registry: Array[Chunk]` and `Function.chunk_id` is an opaque index into it.

## Upvalue

M1 uses uniform heap cells for every local slot (`frame.locals: Array[Upvalue]`). This simplifies closure semantics: an outer variable captured by an inner function is just another read of the same `Upvalue` cell, no "close on scope exit" needed. Cost is one heap allocation per local declaration; benefit is a much simpler VM.

## NativeFunction

`NativeFunction` wraps a MoonBit-defined callable:

```moonbit
pub struct NativeFunction {
  name: String
  is_constructor: Bool
  impl_: (JSValue, Array[JSValue]) -> Result[JSValue, NativeError]
  mut prototype: JSValue
}
```

Builtins (`Object`, `Error`, `TypeError`, `RangeError`, `SyntaxError`, `ReferenceError`, `String`) are `NativeFn` values installed on the global scope by `Builtins::install_into`. Their `prototype` field is wired to the corresponding prototype `Object` so `new Error(...) instanceof Error` walks the correct chain.

## Exceptions

```moonbit
pub struct JSException {
  value: JSValue                          // usually an Error-family object
  stack: Array[StackFrameInfo]            // captured at throw time
}
pub struct StackFrameInfo {
  chunk_name: String
  filename: String
  loc: SourceLoc
}
```

`propagate_exception` walks the caller chain, appending a `StackFrameInfo` per frame while looking for a matching `TryHandler` in each frame's `try_stack`. Uncaught exceptions surface as `Err(JSException)` from `Engine::eval_script`.
