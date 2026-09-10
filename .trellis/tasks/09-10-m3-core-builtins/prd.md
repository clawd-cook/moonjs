# M3 Core Builtins

Parent: `moonjs-js-engine`. 前置里程碑：M2。

## Goal

实现 ECMAScript 内置对象（除 Promise / TypedArray / BigInt / RegExp / Unicode 相关，这些属于 M4），使 `test_builtin.js` 中相关分节 100% 通过。

## Scope

### Builtin 分组
- **核心**：Object（含 `create` / `assign` / `keys` / `values` / `entries` / `defineProperty` / `getOwnPropertyDescriptor` / `freeze` / `seal` / `hasOwn` 全套）、Array（含 `flat` / `flatMap` / `at` / `findLast*` / `toSorted` / `toReversed` / `toSpliced` / `with` / `group*` 等 ES2023+）、Function（含 `bind` / `call` / `apply`、`Function.prototype.toString` 保守形式）。
- **原始 wrapper**：String（含 `at` / `padStart` / `padEnd` / `replaceAll` / `matchAll` 部分 —— regexp 依赖交 M4）、Number（含 `Number.isFinite` / `Number.EPSILON` / `Number.MAX_SAFE_INTEGER`）、Boolean。
- **数学 & 时间**：Math（含 `Math.trunc` / `Math.sign` / `Math.fround` / `Math.hypot` / `Math.clz32` 等）、Date（含 `Date.parse` 常见格式、`toISOString` 等）、JSON（`parse` / `stringify` 完整）。
- **错误家族**：`Error` / `TypeError` / `RangeError` / `SyntaxError` / `ReferenceError` / `URIError` / `AggregateError`。
- **集合**：Symbol（含 `Symbol.iterator` 之外的 well-known）、Map、Set、WeakMap、WeakSet、WeakRef、FinalizationRegistry。
- **元编程**：Proxy（含所有 trap）、Reflect（对应 API 全套）。

### 交付物
- `src/builtins/` 下每个 builtin 一个子 dir + `moon.pkg`。
- Runtime 支持：`WeakRef` / `FinalizationRegistry` 语义（依托 MoonBit weak reference 能力，不够则回退）。

## Acceptance Criteria

- [ ] `quickjs/tests/test_builtin.js` 中 **除** `test_typed_array` / `test_regexp` / `test_generator`（M2 已负责） 之外的所有 `test_*` 函数通过。
- [ ] `quickjs/tests/atomics-store-leak.js`、`iterator-filter-leak.js`、`iterator-tostringtag-setter.js` 相关内容通过（不含 typed array 部分）。
- [ ] M1..M2 覆盖回归 pass。

## Notes

- Proxy 与 Reflect 的语义细节需要精确对齐 spec（否则 test262 会大量翻车）。
- Finalization / WeakRef 语义依赖 MoonBit stdlib 能力，可能需要在 M3 启动时先 spike。
