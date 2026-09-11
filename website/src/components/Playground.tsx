import { useEffect, useState } from 'react';
import './Playground.css';

type EvalOutput = {
  kind: 'ok' | 'error';
  value: string;
  error: string;
  stdout: string;
};

type Runner = (source: string, filename: string) => EvalOutput;

export interface PlaygroundProps {
  initialCode?: string;
}

export function Playground({ initialCode = '' }: PlaygroundProps) {
  const [runner, setRunner] = useState<Runner | null>(null);
  const [source, setSource] = useState(initialCode);
  const [output, setOutput] = useState<EvalOutput | null>(null);
  const [loading, setLoading] = useState(true);
  const [loadError, setLoadError] = useState<string | null>(null);

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
  };

  const loadSample = (code: string) => {
    setSource(code);
    setOutput(null);
  };

  return (
    <div className="moonjs-playground">
      <div className="moonjs-playground__samples">
        <span className="moonjs-playground__samples-label">Samples:</span>
        <button
          type="button"
          onClick={() =>
            loadSample(`function fib(n) {
  return n < 2 ? n : fib(n - 1) + fib(n - 2);
}
print("fib(6) =", fib(6));
fib(6);`)
          }
        >
          fib
        </button>
        <button
          type="button"
          onClick={() =>
            loadSample(`function make() {
  var x = 0;
  return {
    get: function() { return x; },
    set: function(v) { x = v; }
  };
}
var m = make();
m.set(42);
m.get();`)
          }
        >
          closure
        </button>
        <button
          type="button"
          onClick={() =>
            loadSample(`try {
  throw new Error("boom");
} catch (e) {
  print("caught:", e.message);
}
"done";`)
          }
        >
          try/catch
        </button>
        <button
          type="button"
          onClick={() =>
            loadSample(`function F(x) { this.x = x; }
var a = new F(2);
a instanceof F;`)
          }
        >
          instanceof
        </button>
      </div>
      <textarea
        className="moonjs-playground__source"
        value={source}
        spellCheck={false}
        rows={12}
        onChange={(e) => setSource(e.target.value)}
        placeholder="// JavaScript source"
      />
      <div className="moonjs-playground__actions">
        <button
          className="moonjs-playground__run"
          type="button"
          onClick={run}
          disabled={loading || !runner}
        >
          {loading ? 'Loading engine…' : 'Run'}
        </button>
      </div>
      {loadError && (
        <div className="moonjs-playground__panel moonjs-playground__panel--error">
          <div className="moonjs-playground__panel-title">Load error</div>
          <pre>{loadError}</pre>
        </div>
      )}
      {output && output.stdout && (
        <div className="moonjs-playground__panel moonjs-playground__panel--stdout">
          <div className="moonjs-playground__panel-title">stdout</div>
          <pre>{output.stdout}</pre>
        </div>
      )}
      {output && output.kind === 'ok' && (
        <div className="moonjs-playground__panel moonjs-playground__panel--ok">
          <div className="moonjs-playground__panel-title">value</div>
          <pre>{output.value}</pre>
        </div>
      )}
      {output && output.kind === 'error' && (
        <div className="moonjs-playground__panel moonjs-playground__panel--error">
          <div className="moonjs-playground__panel-title">error</div>
          <pre>{output.error}</pre>
        </div>
      )}
    </div>
  );
}
