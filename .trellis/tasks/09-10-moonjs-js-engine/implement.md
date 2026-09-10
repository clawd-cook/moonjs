# MoonJS - Implementation Plan (Parent Roadmap)

Parent task: `moonjs-js-engine`. 本文档是**跨 child 的路线图**；具体执行步骤在每个 child 的 `implement.md` 中。

## 1. Child Task 列表

按里程碑 1:1 建 child task，slug 采用 `m<N>-<name>`：

| 顺序 | Slug | 标题 | 前置 |
|---|---|---|---|
| 1 | `m1-core-vm` | M1 Core VM（lexer / parser / bytecode / VM 基础） | 无 |
| 2 | `m2-language-complete` | M2 Language Complete（class / generator / iterator / …） | M1 |
| 3 | `m3-core-builtins` | M3 Core Builtins（Object/Array/String/… + Proxy/Reflect） | M2 |
| 4 | `m4-advanced-runtime` | M4 Advanced Runtime（Promise/async/TypedArray/BigInt/RegExp/Unicode） | M2（不强依赖 M3，可并行开工，但集成在 M3 之后） |
| 5 | `m5-modules-cli` | M5 Modules + std/os + CLI | M2..M4 |
| 6 | `m6-test262` | M6 test262 driver + 通过率冲刺 | M5 |

**依赖不是 Trellis dependency 机制**，只是执行顺序建议，写在每个 child 的 `prd.md` 前置条件段。

## 2. Parent 层验收门（每个 M 完成时）

每个 M 的 child task 走完 `task.py finish` 前，Parent 层再确认：

1. **Test 回归**：`quickjs/tests/*.js` 中前面里程碑覆盖过的用例仍全部 pass。
2. **`.mbti` 检查**：跨 child 的公共接口（`moonjs.mbt` re-export、`value` / `bytecode` / `vm` 包 API）无未审计的破坏性改动。
3. **文档同步**：`README.md` 更新当前完成的里程碑与已支持的 JS 特性子集。

## 3. 执行顺序

```
M1 ──► M2 ──► M3 ──┐
                    ├──► M5 ──► M6
        └────► M4 ──┘
```

M3 与 M4 可并行开工（不同 builtin 分片）；集成在 M4 完成时。

## 4. 创建 Child Task 的命令

Planning 阶段在 parent 里同步创建 6 个 child（先只填 skeleton `prd.md`，具体规划在启动每个 child 时通过 `trellis-brainstorm` 深化）：

```bash
python3 ./.trellis/scripts/task.py create "M1 Core VM" --slug m1-core-vm --parent .trellis/tasks/09-10-moonjs-js-engine
python3 ./.trellis/scripts/task.py create "M2 Language Complete" --slug m2-language-complete --parent .trellis/tasks/09-10-moonjs-js-engine
python3 ./.trellis/scripts/task.py create "M3 Core Builtins" --slug m3-core-builtins --parent .trellis/tasks/09-10-moonjs-js-engine
python3 ./.trellis/scripts/task.py create "M4 Advanced Runtime" --slug m4-advanced-runtime --parent .trellis/tasks/09-10-moonjs-js-engine
python3 ./.trellis/scripts/task.py create "M5 Modules and CLI" --slug m5-modules-cli --parent .trellis/tasks/09-10-moonjs-js-engine
python3 ./.trellis/scripts/task.py create "M6 test262 driver" --slug m6-test262 --parent .trellis/tasks/09-10-moonjs-js-engine
```

## 5. Parent 阶段的前置准备（本 task 直接执行）

以下工作是所有 child 都要用到的公共前置，在 parent 层完成一次：

- [ ] `moon.mod` 的 `preferred_target` 改为 `native`（仍然保证代码在 wasm-gc / js 下可编译）。
- [ ] 建立 `src/` 目录骨架：`lexer/` `parser/` `ast/` `bytecode/` `compiler/` `vm/` `value/` `builtins/` `regexp/` `unicode/` `bigint/` `promise/` `modules/` `util/` — 每个都有 `moon.pkg` 与占位 `.mbt`。
- [ ] `cmd/moonjs/` 与 `cmd/moonjs-test262/` 目录骨架 + `moon.pkg`。
- [ ] `quickjs/test262/` submodule init（`git submodule update --init --recursive quickjs/test262`），验证 pin 是 `5ef1e5723be95296f36afb0386676fed0205869c`；此步骤耗流量，M6 前完成即可，也可 parent 阶段先做以早发现 submodule 问题。
- [ ] `README.md` 增加"进度矩阵"表（M1..M6 状态、覆盖测试文件、通过率）。
- [ ] 添加根级测试驱动 `tests/run_quickjs_tests.mbt`（或独立脚本），能按 `tests.conf` 过滤运行 `quickjs/tests/*.js`。此驱动本身在 M1 中随第一个 pass 用例落地。

## 6. Validation Commands（Parent 集成检查）

Parent 层的 quality-check 命令：

```bash
# 编译整体（不允许 warning）
moon check --deny-warn --target native

# 单元测试（各 child 内部覆盖）
moon test --target native

# 集成测试（跑 quickjs/tests/*.js 已覆盖的子集，按 tests.conf 排除项）
moon run cmd/moonjs -- run --harness quickjs/tests.conf

# test262（仅 M6）
moon run cmd/moonjs-test262 -- --config quickjs/test262-fast.conf
```

## 7. Rollback / 风险回退点

- **M1 结束前**：如果 bytecode 指令集设计发现根本性问题，回滚成本仅限 M1 代码（parser 可保留）。
- **M2 结束前**：generator/async 的 Frame 挂起设计如果与 VM 冲突，可能回退到 M1 修改 Frame 定义；届时 M2 的 child `implement.md` 需要包含回滚步骤。
- **M6**：若 test262 通过率长期卡在某分类，允许在 `test262-fast.conf` 之外追加 MoonJS 自己的 exclude 名单，并在 `README.md` 明确记录差异（视为已知豁免，不视为通过）。

## 8. Follow-ups Before `task.py start`

parent 本身不做实现工作，`start` 意味着"parent 已进入 in_progress，可以开始并行推进 child"。启动前需要：

- [x] `prd.md` 收敛完毕（Q1..Q5 全部决议）。
- [x] `design.md` 落地。
- [x] `implement.md` 落地（本文件）。
- [ ] 6 个 child task 创建完成（本文件 §4）。
- [ ] `implement.jsonl` / `check.jsonl` 至少各一条真实条目（在下一步 §5 前置工作驱动下补充）。
- [ ] 用户 review 并授权 `task.py start`。
