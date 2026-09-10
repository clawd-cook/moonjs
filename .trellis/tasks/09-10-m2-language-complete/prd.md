# M2 Language Complete

Parent: `moonjs-js-engine`. 前置里程碑：M1。

## Goal

在 M1 骨架之上补齐 ECMAScript 语言层的其余语法与运行时机制，使 `quickjs/tests/test_language.js` / `test_closure.js` / `test_loop.js` 100% 通过。

## Scope

### 语言特性
- class（含 `extends` / `super` / static / private field / private method / static block / accessor）。
- arrow function（含 `this` / `arguments` 词法绑定）。
- destructuring（数组、对象、嵌套、默认值、rest）。
- spread（call / array / object）。
- template literal（含 tagged template）。
- for-of / for-in、iterator 协议（`[Symbol.iterator]` / `next()` / `return()` / `throw()`）。
- generator（`function*` / `yield` / `yield*`）—— 依赖挂起 Frame 机制。
- `with` 语句。
- labeled break / continue（M1 已含 label，M2 完善 with-loop 语义）。
- optional chaining（`?.`）与 nullish coalescing（`??`）。
- `using` / `await using`（`test_using`）。
- reserved names、number literals 完整（BigInt literal 词法为占位）、parse edge cases。

### 交付物
- Parser / Compiler / VM 扩展。
- Bytecode 指令集扩展（generator 挂起、iterator 协议内建指令、super call 相关指令）。
- Frame 挂起机制（供 M4 async/await 复用）。

## Acceptance Criteria

- [ ] `quickjs/tests/test_language.js` 100% 通过。
- [ ] `quickjs/tests/test_closure.js` 100% 通过。
- [ ] `quickjs/tests/test_loop.js` 100% 通过。
- [ ] `suspended-generator-closure-gc.js`、`suspended-coroutine-*.js` 中与 generator 相关的挂起 GC 语义通过（不含 async 部分）。
- [ ] M1 覆盖的用例回归 pass。

## Notes

- Generator 是本里程碑的核心风险点：挂起 Frame 的实现要为 M4 async/await 复用。
- 启动前用 `trellis-brainstorm` 深化本 PRD 并撰写 `design.md` / `implement.md`。
