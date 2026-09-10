# M6 test262 driver + 通过率冲刺

Parent: `moonjs-js-engine`. 前置里程碑：M5。

## Goal

搭建 test262 驱动，在 QuickJS pin 的 test262 commit（`5ef1e5723be95296f36afb0386676fed0205869c`）上运行 `quickjs/test262-fast.conf` 允许的用例，通过三个子里程碑将通过率推到 **≥ 95%**。

## Scope

- **test262 driver（`cmd/moonjs-test262`，对应 `quickjs/run-test262.c`）**：
  - 解析 `test262-fast.conf`（`[exclude]` / `[features]`）。
  - 遍历 `quickjs/test262/test/` 下 `.js`，解析测试头 `/*--- ... ---*/`（yaml-lite）：`negative` / `flags: [strict, module, ...]` / `features: [...]` / `includes`。
  - 支持 harness include（`sta.js` / `assert.js` / `propertyHelper.js` 等来自 `test262/harness/`）。
  - `strict` 与 `sloppy` 各跑一遍（除非 `flags` 限定）。
  - 并行执行（可选）。
  - 输出：pass/fail/skip 数、pass ratio、diff-with-previous-run 报告（用于回归 gate）。

- **通过率子里程碑**：
  - **M6a**：≥ 60%（先确保驱动稳定、大类别 language / built-ins 主体通过）。
  - **M6b**：≥ 85%（补齐 Annex B、Intl 基础、Atomics 最小 stub）。
  - **M6c**：≥ 95%（消尾）。

### 交付物
- `cmd/moonjs-test262/`。
- Intl / Atomics 最小 stub（如需要）——列入 M6 而非 M4。
- `README.md` 的进度矩阵与已知豁免清单。

## Acceptance Criteria

- [ ] `moon run cmd/moonjs-test262 -- --config quickjs/test262-fast.conf` 在 pin commit 上运行成功，pass ratio ≥ 95%。
- [ ] 失败清单以 CSV/JSON 形式落地（`test262-failures.json`），并对每条给出分类（unsupported feature / spec gap / bug）。
- [ ] MoonJS 自己的额外 exclude 名单（若有）写入 `README.md` 已知豁免章节，与 `test262-fast.conf` 分离。
- [ ] M1..M5 覆盖回归 pass。

## Notes

- 若某分类始终打不通（例如 `Temporal` proposal），允许在 MoonJS 自己的 exclude 列表中记录，需在 `README.md` 明确差异。
- 本里程碑没有硬编码时间上限，通过率冲刺可能需要大量 bug 修复迭代。
