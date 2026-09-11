---
description: 克隆 MoonJS，运行工具链门槛，执行 M1 验收 harness，试用 demo CLI。
---

# 快速开始

## 前置

- **MoonBit 工具链** —— 见 [MoonBit 安装](https://docs.moonbitlang.com/) 步骤。基线版本：`moon 0.1.20260904`。
- **Git** —— MoonJS 通过 submodule 引入 QuickJS 作为参考与测试源。

## 克隆

```bash
git clone https://github.com/clawd-cook/moonjs.git
cd moonjs
git submodule update --init  # 引入 quickjs/（test262 在 M6 前保持未 init）
```

## 构建门槛

MoonJS 有严格的门槛：格式化、接口生成、warnings-as-errors 编译、完整测试套件，全部通过后步骤才算完成。

```bash
moon fmt
moon info
moon check --deny-warn --target native
moon test --target native
```

当前 tree 预期输出：**411 tests, 411 passed, 0 failed。**

## 运行 demo CLI

`cmd/moonjs` 二进制是一个 smoke test —— parse、compile、执行一段内嵌 JS：

```bash
moon run cmd/moonjs --target native
```

输出：

```
moonjs (M1 scaffold)
ok: eval_script ran without exception
```

完整 CLI 能力（文件参数、`-e code`、argv 解析）在 **M5** 交付。

## 目录一览

```
src/                 - 引擎 (util / value / ast / bytecode / lexer / parser / compiler / vm / builtins)
cmd/moonjs/          - CLI (对标 `qjs`)
cmd/moonjs-test262/  - test262 驱动 (M6，目前仅骨架)
quickjs/             - vendored QuickJS：参考实现 + 测试源
.trellis/            - 任务树与逐包 spec
```

## 下一步

- [架构 —— 概览](/zh/guide/architecture/overview) —— 十个 package 与它们的关系。
- [架构 —— 编译管道](/zh/guide/architecture/pipeline) —— 源码如何变成字节码、VM 如何执行。
- [架构 —— 字节码](/zh/guide/architecture/bytecode) —— 32-bit 指令布局、wide 前缀、opcode 表。
- [里程碑](/zh/guide/milestones/overview) —— 当前进度与 M2..M6 展望。
