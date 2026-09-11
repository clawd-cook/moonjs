---
description: MoonJS 概览 —— 是什么、为什么用纯 MoonBit、如何以 QuickJS 测试通过率作为正确性标准。
---

# 介绍

**MoonJS** 是一个完全用 [MoonBit](https://docs.moonbitlang.com) 编写的 JavaScript 引擎。它的正确性标准由 vendored 的 [`quickjs/`](https://github.com/clawd-cook/moonjs/tree/master/quickjs) 目录决定：先是 `quickjs/tests/*.js`，然后是 TC39 [`test262`](https://github.com/tc39/test262) 测试套件（使用 QuickJS 固定的 commit）。

## MoonJS 的独特之处

- **纯 MoonBit。** 无 C FFI。引擎、VM、GC 契约、每个内置对象都是 MoonBit 代码。标准库依赖止于 `moonbitlang/core`。
- **多 target 源码。** 主编译 target 是 `native`，但源码保持在 `wasm-gc` 与 `js` target 下均可编译，以便 MoonJS 被内嵌到任意 MoonBit 宿主中。
- **字节码 VM。** 32-bit 定长指令、单一主循环 dispatch。非 tree-walking。指令集参考 `quickjs-opcode.h`，但不要求与 QuickJS 字节码二进制兼容。
- **QuickJS 作为北极星。** MoonJS 仅将 QuickJS 视为 spec 来源（opcode 表、测试、行为语义）。不复制 QuickJS 代码。

## 当前状态

- **M1 Core VM — 完成。** 411/411 MoonBit 测试通过；13/13 M1 验收标准通过（算术、位运算、比较、闭包、构造器、方法调用、异常展开、`instanceof`、`typeof`、跨帧堆栈追踪）。
- **M2 → M6** —— 规划中。见 [里程碑](/zh/guide/milestones/overview)。

## 试用 MoonJS

前往 [快速开始](/zh/guide/start/getting-started) 查看构建与运行指令。
