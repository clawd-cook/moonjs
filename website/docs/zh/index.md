---
description: MoonJS 是一个用纯 MoonBit 实现的 JavaScript 引擎——首页展示快速开始、架构与里程碑重点。
pageType: home

hero:
  name: MoonJS
  text: MoonBit 上的 JavaScript
  tagline: 用纯 MoonBit 实现，目标是通过 QuickJS 的全部测试用例与 TC39 test262 测试套件。
  actions:
    - theme: brand
      text: 快速开始
      link: /zh/guide/start/introduction
    - theme: alt
      text: GitHub
      link: https://github.com/clawd-cook/moonjs
  image:
    src: /rspress-icon.png
    alt: MoonJS
features:
  - title: 纯 MoonBit
    details: 无 C FFI。可在 native / wasm-gc / js target 上编译。仅依赖 moonbitlang/core。
    icon: 🌙
    link: /zh/guide/architecture/overview
  - title: 字节码虚拟机
    details: 32-bit 定长指令、基于 Shape 的对象、Lua 风格 upvalue 捕获。指令集参考 QuickJS opcode 表。
    icon: ⚙️
    link: /zh/guide/architecture/bytecode
  - title: ES2023+ 语法
    details: Lexer 与 parser 覆盖完整 ES2023+ 语法。M1 compiler 目前跑通控制流 + 闭包子集。
    icon: 📝
    link: /zh/guide/architecture/pipeline
  - title: QuickJS 作为 spec
    details: quickjs/tests/*.js 与 TC39 test262（固定 commit）是唯一 ground truth。M1 已通过 13/13 验收标准。
    icon: 🎯
    link: /zh/guide/milestones/overview
  - title: 精确错误位置
    details: 每个 AST 节点带 SourceSpan；每条字节码有并行 SourceLoc。异常输出 `line:col` 栈追踪。
    icon: 📍
    link: /zh/guide/architecture/pipeline
  - title: 里程碑驱动
    details: 六个里程碑（M1 核心 VM → M6 test262 冲刺）全开放规划。M1 完成，下一步 M2。
    icon: 🗺️
    link: /zh/guide/milestones/overview
---
