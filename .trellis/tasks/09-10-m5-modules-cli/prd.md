# M5 Modules + std/os + CLI

Parent: `moonjs-js-engine`. 前置里程碑：M2..M4。

## Goal

补齐模块系统与运行时 host：ES Modules 完整语义、QuickJS 的 `qjs:std` / `qjs:os` 内置模块（文件、进程、时间 API）、`cmd/moonjs` CLI 使 QuickJS `tests.conf` 允许的用例全部可运行并通过。

## Scope

- **ES Modules**：静态 `import` / `export`（含 re-export 各种形式、`export * from ...`、`export { default } from ...`）、`import()` 动态导入、`import.meta`、import attributes (`with { type: 'json' }`)。cyclic import 语义。
- **`qjs:std`**：`print` / `printf` / `sprintf` / `getenv` / `open` / `tmpfile` / `File.prototype.{puts,seek,tell,read,readAsString,readAsArrayBuffer,eof,getByte,putByte,getline}` / `SEEK_SET/CUR/END` / `Error.*` 常量。
- **`qjs:os`**：`platform`（`darwin`/`linux`/`win32`）、`getenv` / `setenv` / `unsetenv` / `mkdir` / `stat` / `open` / `close` / `read` / `write` / `chdir` / `getcwd` / `now` / `setTimeout` 等 QuickJS 提供的最小集。
- **CLI `cmd/moonjs`**：解析 `run <file.js>` / `run <file.mjs>`、`--std`、`-e <code>`、退出码语义（`std.exit(code)`）。
- **Event loop**：microtask 与 `os.setTimeout` 的整合（QuickJS 单线程 event loop 语义）。

### 交付物
- `src/modules/`、`src/builtins/std/`、`src/builtins/os/`。
- `cmd/moonjs/` main + argument parsing。
- `tests/run_quickjs_tests.mbt`（M1 已埋骨架）能全量运行 `quickjs/tests.conf` allowed 集合。

## Acceptance Criteria

- [ ] `quickjs/tests/test_std.js` 100% 通过。
- [ ] `quickjs/tests/destructured-export.js`、`dynamic_import_rejection_handled.js`、`import-attributes-identity.js`、`parse-error-column.js`、`reexport-error-module.js`、`test_string_exports.js`（在 `tests.conf` 允许范围内）通过。
- [ ] `quickjs/tests/*.js` 中 `quickjs/tests.conf` `[exclude]` 之外的**全部**用例通过。
- [ ] M1..M4 覆盖回归 pass。

## Notes

- `qjs:std` / `qjs:os` 的实现依赖 MoonBit 的文件 / 进程 stdlib。若某 API 缺失，需在启动本 M 时先 spike，通过最小 sys 绑定（仍是纯 MoonBit）填补。
- Event loop 语义要在 CLI 层清楚 —— microtask 空 → 处理 `setTimeout` 队列 → …。
