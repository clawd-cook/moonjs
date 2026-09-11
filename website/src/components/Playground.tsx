import { useEffect, useMemo, useRef, useState } from 'react';
import type { KeyboardEvent as ReactKeyboardEvent, ChangeEvent } from 'react';
import versionInfo from '../moonjs-playground/version.json';
import './Playground.css';

type VersionInfo = {
  tag?: string;
  commit?: string;
  downloaded_at?: string;
  notice?: string;
};

const version: VersionInfo = versionInfo as VersionInfo;

type EvalOutput = {
  kind: 'ok' | 'error';
  value: string;
  error: string;
  stdout: string;
};

type Runner = (source: string, filename: string) => EvalOutput;

type Sample = { label: string; code: string };

export interface PlaygroundProps {
  initialCode?: string;
}

const SAMPLES: Sample[] = [
  {
    label: 'fib',
    code: `function fib(n) {
  return n < 2 ? n : fib(n - 1) + fib(n - 2);
}
print("fib(6) =", fib(6));
fib(6);`,
  },
  {
    label: 'closure',
    code: `function make() {
  var x = 0;
  return {
    get: function() { return x; },
    set: function(v) { x = v; }
  };
}
var m = make();
m.set(42);
m.get();`,
  },
  {
    label: 'try/catch',
    code: `try {
  throw new Error("boom");
} catch (e) {
  print("caught:", e.message);
}
"done";`,
  },
  {
    label: 'instanceof',
    code: `function F(x) { this.x = x; }
var a = new F(2);
a instanceof F;`,
  },
];

export function Playground({ initialCode = '' }: PlaygroundProps) {
  const [runner, setRunner] = useState<Runner | null>(null);
  const [source, setSource] = useState(initialCode);
  const [output, setOutput] = useState<EvalOutput | null>(null);
  const [loading, setLoading] = useState(true);
  const [loadError, setLoadError] = useState<string | null>(null);
  const [runCount, setRunCount] = useState(0);
  const textareaRef = useRef<HTMLTextAreaElement | null>(null);

  useEffect(() => {
    if (typeof window === 'undefined') return;
    import('../moonjs-playground/moonjs-playground.js')
      .then((mod: { eval_and_format: Runner }) => {
        setRunner(() => mod.eval_and_format);
        setLoading(false);
      })
      .catch((e: unknown) => {
        setLoadError(e instanceof Error ? e.message : String(e));
        setLoading(false);
      });
  }, []);

  const run = () => {
    if (!runner) return;
    try {
      setOutput(runner(source, '<playground>'));
    } catch (e: unknown) {
      setOutput({
        kind: 'error',
        value: '',
        error: `Host error: ${e instanceof Error ? e.message : String(e)}`,
        stdout: '',
      });
    }
    setRunCount((n) => n + 1);
  };

  const loadSample = (code: string) => {
    setSource(code);
    setOutput(null);
    // Focus back into the editor so the user can immediately hit Run.
    requestAnimationFrame(() => textareaRef.current?.focus());
  };

  const onKeyDown = (e: ReactKeyboardEvent<HTMLTextAreaElement>) => {
    // ⌘/Ctrl + Enter runs the current source. Handy while editing.
    if ((e.metaKey || e.ctrlKey) && e.key === 'Enter') {
      e.preventDefault();
      run();
    }
  };

  const onSourceChange = (e: ChangeEvent<HTMLTextAreaElement>) => {
    setSource(e.target.value);
  };

  const runDisabled = loading || !runner;

  // Panel content depends on run count so `key` changes trigger a subtle
  // fade-in animation each time the user hits Run.
  const panels = useMemo(() => {
    if (loadError) {
      return (
        <div className="moonjs-playground__panel moonjs-playground__panel--error">
          <div className="moonjs-playground__panel-title">Engine load error</div>
          <pre>{loadError}</pre>
        </div>
      );
    }
    if (!output) {
      return (
        <div className="moonjs-playground__panel moonjs-playground__panel--empty">
          <div className="moonjs-playground__panel-title">Output</div>
          <p className="moonjs-playground__hint">
            {loading
              ? 'Loading the MoonJS engine…'
              : 'Press Run (or ⌘/Ctrl + Enter) to evaluate the code on the left.'}
          </p>
        </div>
      );
    }
    return (
      <div className="moonjs-playground__panels" key={runCount}>
        {output.stdout && (
          <section className="moonjs-playground__panel moonjs-playground__panel--stdout">
            <div className="moonjs-playground__panel-title">stdout</div>
            <pre>{output.stdout}</pre>
          </section>
        )}
        {output.kind === 'ok' && (
          <section className="moonjs-playground__panel moonjs-playground__panel--ok">
            <div className="moonjs-playground__panel-title">value</div>
            <pre>{output.value}</pre>
          </section>
        )}
        {output.kind === 'error' && (
          <section className="moonjs-playground__panel moonjs-playground__panel--error">
            <div className="moonjs-playground__panel-title">error</div>
            <pre>{output.error}</pre>
          </section>
        )}
      </div>
    );
  }, [output, loadError, loading, runCount]);

  return (
    <div className="moonjs-playground">
      <div className="moonjs-playground__toolbar">
        <span className="moonjs-playground__samples-label">Samples:</span>
        {SAMPLES.map((s) => (
          <button
            key={s.label}
            type="button"
            className="moonjs-playground__chip"
            onClick={() => loadSample(s.code)}
          >
            {s.label}
          </button>
        ))}
        <span className="moonjs-playground__toolbar-spacer" />
        {version.tag && (
          <a
            className="moonjs-playground__version"
            href={`https://github.com/clawd-cook/moonjs/releases/tag/${version.tag}`}
            target="_blank"
            rel="noopener noreferrer"
            title={
              version.notice ??
              (version.downloaded_at
                ? `Fetched ${version.downloaded_at}`
                : 'MoonJS engine version')
            }
          >
            Engine {version.tag}
            {version.notice ? ' ⚠' : ''}
          </a>
        )}
        <button
          className="moonjs-playground__run"
          type="button"
          onClick={run}
          disabled={runDisabled}
          title="Run (⌘/Ctrl + Enter)"
        >
          {loading ? 'Loading engine…' : 'Run ▶'}
        </button>
      </div>
      <div className="moonjs-playground__split">
        <div className="moonjs-playground__pane moonjs-playground__pane--editor">
          <div className="moonjs-playground__pane-title">Source</div>
          <textarea
            ref={textareaRef}
            className="moonjs-playground__source"
            value={source}
            spellCheck={false}
            onChange={onSourceChange}
            onKeyDown={onKeyDown}
            placeholder="// JavaScript source"
          />
        </div>
        <div className="moonjs-playground__pane moonjs-playground__pane--output">
          {panels}
        </div>
      </div>
    </div>
  );
}
