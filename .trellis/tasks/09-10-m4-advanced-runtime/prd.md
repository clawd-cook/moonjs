# M4 Advanced Runtime

Parent: `moonjs-js-engine`. 前置里程碑：M2（可与 M3 并行）。

## Goal

补齐运行时的高级机制：Promise + microtask 队列、async/await、TypedArray/ArrayBuffer/DataView、BigInt、RegExp 引擎、Unicode 表。

## Scope

- **Promise + microtask**：queue 抽象、`Promise.resolve/reject/all/any/race/allSettled`、`Promise.withResolvers`、`then` chaining、unhandled rejection。
- **async/await**：`async function`、`async` arrow、`for await`、顶层 `await`（M5 模块场景）。Frame 挂起复用 M2 generator 机制。
- **TypedArray 家族**：Int8/Uint8/Uint8Clamped/Int16/Uint16/Int32/Uint32/Float32/Float64/BigInt64/BigUint64。
- **ArrayBuffer / SharedArrayBuffer(最小 stub) / DataView / resizable ArrayBuffer**。
- **BigInt**：literal、算术、位运算、`Number(BigInt)` / `BigInt(Number)` 转换、`typeof`。
- **RegExp**：完整引擎（对齐 `libregexp` 能力），unicode / u / sticky / dotAll / lookbehind / property escapes、named group。
- **Unicode**：完整 code point 表（对齐 `libunicode`）—— `\p{...}` 与 String prototype 的 unicode 归一化 API。

### 交付物
- `src/promise/`、`src/regexp/`、`src/bigint/`、`src/unicode/`、`src/builtins/typedarray/`。
- microtask queue 与 CLI event loop 挂钩点（M5 CLI 会用到）。

## Acceptance Criteria

- [ ] `quickjs/tests/test_bigint.js` 100% 通过。
- [ ] `quickjs/tests/test_builtin.js` 中 `test_regexp` / `test_typed_array` 通过。
- [ ] `quickjs/tests/test_queue_microtask.js` 通过。
- [ ] `array-fromasync-enumerable.js`、`array-fromasync-*` / `for-await-normal-close.js` / `iterator-filter-leak.js` / `str-pad-leak.js` / `typedarray-*.js` 通过。
- [ ] `quickjs/tests/test_base64.js` 通过（涉及 ArrayBuffer / TypedArray）。
- [ ] M1..M3 覆盖回归 pass。

## Notes

- RegExp 是本里程碑最大工程量，`libregexp.c` 3522 行为参照上限。
- Unicode 表可以从公开数据（Unicode.org UCD）生成 MoonBit 静态数组，不需要抄 `libunicode` 的 C 二进制格式。
- Async / await 复用 generator 挂起，尽量避免双份挂起机制。
