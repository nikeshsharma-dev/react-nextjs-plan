'use client';

import {
  useState,
  useEffect,
  useMemo,
  useCallback,
  useRef,
  memo,
} from 'react';
import { useWindowSize } from '@/app/hooks/useWindowSize';
import { useLocalStorage } from '@/app/hooks/useLocalStorage';
import Button from '@/components/atoms/Button';

function UseEffectDemo() {
  const [seconds, setSeconds] = useState(0);
  const [running, setRunning] = useState(false);

  useEffect(() => {
    if (!running) return;
    const interval = setInterval(() => {
      setSeconds((s) => s + 1);
    }, 1000);
    return () => clearInterval(interval);
  }, [running]);

  return (
    <div className="flex flex-col gap-4 p-6 bg-white dark:bg-gray-900 rounded-xl border border-gray-200 dark:border-gray-700 shadow-sm">
      <h3 className="font-semibold text-gray-900 dark:text-white">
        useEffect — Stopwatch
      </h3>
      <p className="text-xs text-gray-500 dark:text-gray-400">
        useEffect runs the interval when running=true and cleans it up when stopped.
      </p>
      <div className="text-4xl font-bold text-primary tabular-nums">
        {String(Math.floor(seconds / 60)).padStart(2, '0')}:
        {String(seconds % 60).padStart(2, '0')}
      </div>
      <div className="flex gap-2">
        <Button
          label={running ? 'Pause' : 'Start'}
          variant={running ? 'secondary' : 'primary'}
          size="sm"
          onClick={() => setRunning((r) => !r)}
        />
        <Button
          label="Reset"
          variant="ghost"
          size="sm"
          onClick={() => { setRunning(false); setSeconds(0); }}
        />
      </div>
    </div>
  );
}

function isPrime(n: number): boolean {
  if (n < 2) return false;
  for (let i = 2; i <= Math.sqrt(n); i++) {
    if (n % i === 0) return false;
  }
  return true;
}

function findPrimesUpTo(limit: number): number[] {
  const primes: number[] = [];
  for (let i = 2; i <= limit; i++) {
    if (isPrime(i)) primes.push(i);
  }
  return primes;
}

function UseMemoDemo() {
  const [limit, setLimit] = useState(100);
  const [counter, setCounter] = useState(0);

  const primes = useMemo(() => {
    return findPrimesUpTo(limit);
  }, [limit]);

  return (
    <div className="flex flex-col gap-4 p-6 bg-white dark:bg-gray-900 rounded-xl border border-gray-200 dark:border-gray-700 shadow-sm">
      <h3 className="font-semibold text-gray-900 dark:text-white">
        useMemo — Prime Number Finder
      </h3>
      <p className="text-xs text-gray-500 dark:text-gray-400">
        The prime calculation only re-runs when the limit changes — not when
        the counter changes.
      </p>
      <div className="flex flex-col gap-2">
        <label
          htmlFor="prime-limit"
          className="text-sm font-medium text-gray-700 dark:text-gray-300"
        >
          Find primes up to: <strong>{limit}</strong>
        </label>
        <input
          id="prime-limit"
          type="range"
          min={10}
          max={500}
          value={limit}
          onChange={(e) => setLimit(Number(e.target.value))}
          className="w-full accent-primary"
        />
      </div>
      <div className="flex items-center justify-between text-sm">
        <span className="text-gray-600 dark:text-gray-400">
          Found <strong className="text-primary">{primes.length}</strong> primes
        </span>
        <span className="text-gray-400 text-xs">
          Last 5: {primes.slice(-5).join(', ')}
        </span>
      </div>
      <div className="border-t border-gray-100 dark:border-gray-800 pt-3">
        <p className="text-xs text-gray-400 mb-2">
          Counter re-renders component but does NOT recalculate primes:
        </p>
        <Button
          label={`Counter: ${counter}`}
          variant="ghost"
          size="sm"
          onClick={() => setCounter((c) => c + 1)}
        />
      </div>
    </div>
  );
}

const ExpensiveChild = memo(function ExpensiveChild({
  onClick,
  label,
}: {
  onClick: () => void;
  label: string;
}) {
  const renderCountRef = useRef(0);
  const [mounted, setMounted] = useState(false);

  // Only count renders after mount — avoids SSR hydration mismatch
  useEffect(() => {
    setMounted(true);
  }, []);

  if (mounted) {
    renderCountRef.current++;
  }

  return (
    <button
      type="button"
      onClick={onClick}
      className="px-3 py-2 text-sm rounded-lg border border-gray-300 dark:border-gray-600 text-gray-700 dark:text-gray-200 hover:border-primary hover:text-primary transition-colors"
    >
      {label}{mounted ? ` (rendered ${renderCountRef.current}x)` : ''}
    </button>
  );
});


function UseCallbackDemo() {
  const [count, setCount] = useState(0);
  const [unrelated, setUnrelated] = useState(0);

  // useCallback — stable reference, child does not re-render
  const handleIncrement = useCallback(() => {
    setCount((c) => c + 1);
  }, []);

  return (
    <div className="flex flex-col gap-4 p-6 bg-white dark:bg-gray-900 rounded-xl border border-gray-200 dark:border-gray-700 shadow-sm">
      <h3 className="font-semibold text-gray-900 dark:text-white">
        useCallback — Stable Function Reference
      </h3>
      <p className="text-xs text-gray-500 dark:text-gray-400">
        The child button only re-renders when its own handler changes.
        Clicking unrelated state does not re-render the child.
      </p>
      <div className="flex flex-col gap-2">
        <ExpensiveChild
          onClick={handleIncrement}
          label={`Increment Count: ${count}`}
        />
        <Button
          label={`Unrelated State: ${unrelated} (click to re-render parent)`}
          variant="ghost"
          size="sm"
          onClick={() => setUnrelated((u) => u + 1)}
        />
      </div>
    </div>
  );
}

function UseRefDemo() {
  const inputRef = useRef<HTMLInputElement>(null);
  const renderCountRef = useRef(0);
  const [focused, setFocused] = useState(false);
  const { width, height } = useWindowSize();

  renderCountRef.current++;

  function focusInput() {
    inputRef.current?.focus();
    setFocused(true);
  }

  return (
    <div className="flex flex-col gap-4 p-6 bg-white dark:bg-gray-900 rounded-xl border border-gray-200 dark:border-gray-700 shadow-sm">
      <h3 className="font-semibold text-gray-900 dark:text-white">
        useRef — DOM Access + Value Storage
      </h3>
      <p className="text-xs text-gray-500 dark:text-gray-400">
        useRef stores the DOM node (focus input) and also stores values
        (render count) without triggering re-renders.
      </p>
      <div className="flex flex-col gap-2">
        <input
          ref={inputRef}
          type="text"
          placeholder="Click the button to focus me"
          onFocus={() => setFocused(true)}
          onBlur={() => setFocused(false)}
          className={[
            'w-full rounded-lg border px-3 py-2 text-sm transition-colors',
            'bg-white dark:bg-gray-800 text-gray-900 dark:text-gray-100',
            'focus:outline-none focus:ring-2',
            focused
              ? 'border-primary focus:ring-primary/40'
              : 'border-gray-300 dark:border-gray-600',
          ].join(' ')}
        />
        <Button
          label="Focus Input via useRef"
          variant="primary"
          size="sm"
          onClick={focusInput}
        />
      </div>
      <div className="flex gap-4 text-sm flex-wrap">
        <div className="px-3 py-2 rounded-lg bg-gray-50 dark:bg-gray-800 border border-gray-200 dark:border-gray-700">
          <span className="text-gray-500 text-xs">Render count (ref)</span>
          <p className="font-bold text-primary">{renderCountRef.current}</p>
        </div>
        <div className="px-3 py-2 rounded-lg bg-gray-50 dark:bg-gray-800 border border-gray-200 dark:border-gray-700">
          <span className="text-gray-500 text-xs">Window width</span>
          <p className="font-bold text-primary">{width}px</p>
        </div>
        <div className="px-3 py-2 rounded-lg bg-gray-50 dark:bg-gray-800 border border-gray-200 dark:border-gray-700">
          <span className="text-gray-500 text-xs">Window height</span>
          <p className="font-bold text-primary">{height}px</p>
        </div>
      </div>
    </div>
  );
}

function UseLocalStorageDemo() {
  const [name, setName] = useLocalStorage('day8-name', '');

  return (
    <div className="flex flex-col gap-4 p-6 bg-white dark:bg-gray-900 rounded-xl border border-gray-200 dark:border-gray-700 shadow-sm">
      <h3 className="font-semibold text-gray-900 dark:text-white">
        useLocalStorage — Custom Hook with useEffect + useRef
      </h3>
      <p className="text-xs text-gray-500 dark:text-gray-400">
        Type your name — it persists after page refresh. Uses useEffect to sync
        and useRef to skip the first render sync.
      </p>
      <input
        type="text"
        value={name}
        onChange={(e) => setName(e.target.value)}
        placeholder="Type your name..."
        className="w-full rounded-lg border border-gray-300 dark:border-gray-600 px-3 py-2 text-sm bg-white dark:bg-gray-800 text-gray-900 dark:text-gray-100 focus:outline-none focus:ring-2 focus:ring-primary/40 focus:border-primary"
      />
      {name && (
        <p className="text-sm text-gray-600 dark:text-gray-400">
          Hello,{' '}
          <strong className="text-primary">{name}</strong>! Refresh the
          page — your name persists.
        </p>
      )}
      <Button
        label="Clear Saved Name"
        variant="ghost"
        size="sm"
        onClick={() => setName('')}
      />
    </div>
  );
}

export default function Day8Client() {
  return (
    <div className="flex flex-col gap-6">

      <section aria-labelledby="hooks-overview" className="mb-2">
        <h2
          id="hooks-overview"
          className="text-base font-semibold text-gray-800 dark:text-gray-200 mb-4"
        >
          Hook Demos
        </h2>
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-5">
          <UseEffectDemo />
          <UseMemoDemo />
          <UseCallbackDemo />
          <UseRefDemo />
        </div>
      </section>

      <section aria-labelledby="custom-hook-heading">
        <h2
          id="custom-hook-heading"
          className="text-base font-semibold text-gray-800 dark:text-gray-200 mb-4"
        >
          Custom Hook Demo
        </h2>
        <div className="max-w-xl">
          <UseLocalStorageDemo />
        </div>
      </section>

      <section aria-labelledby="summary-heading">
        <h2
          id="summary-heading"
          className="text-base font-semibold text-gray-800 dark:text-gray-200 mb-4"
        >
          Hook Quick Reference
        </h2>
        <div className="overflow-x-auto rounded-xl border border-gray-200 dark:border-gray-700">
          <table className="w-full text-sm">
            <caption className="sr-only">React hooks quick reference</caption>
            <thead className="bg-gray-50 dark:bg-gray-800 border-b border-gray-200 dark:border-gray-700">
              <tr>
                {['Hook', 'Use When', 'Key Rule'].map((h) => (
                  <th
                    key={h}
                    scope="col"
                    className="px-4 py-3 text-left text-xs font-semibold text-gray-500 uppercase tracking-wider"
                  >
                    {h}
                  </th>
                ))}
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-100 dark:divide-gray-800 bg-white dark:bg-gray-900">
              {[
                ['useEffect', 'Side effects — timers, API, subscriptions', 'Always return cleanup function'],
                ['useMemo', 'Expensive calculation — avoid on every render', 'Only use when calculation is truly expensive'],
                ['useCallback', 'Stable function reference for child components', 'Pair with React.memo on child'],
                ['useRef', 'DOM access or mutable value without re-render', 'Changing ref does NOT trigger re-render'],
              ].map(([hook, use, rule], i) => (
                <tr
                  key={hook}
                  className={i % 2 === 0 ? 'bg-gray-50/50 dark:bg-gray-800/20' : ''}
                >
                  <td className="px-4 py-3 font-medium text-primary">{hook}</td>
                  <td className="px-4 py-3 text-gray-600 dark:text-gray-400">{use}</td>
                  <td className="px-4 py-3 text-gray-500 text-xs">{rule}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </section>

    </div>
  );
}