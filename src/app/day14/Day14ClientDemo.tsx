'use client';

import { useState, useEffect, useCallback } from 'react';

interface Metric {
  name: string;
  value: string;
  rating: 'good' | 'needs-improvement' | 'poor' | 'measuring';
}

const INITIAL_METRICS: Metric[] = [
  { name: 'FCP', value: 'Measuring...', rating: 'measuring' },
  { name: 'TTFB', value: 'Measuring...', rating: 'measuring' },
  { name: 'LCP', value: 'Use Lighthouse', rating: 'measuring' },
  { name: 'CLS', value: 'Use Lighthouse', rating: 'measuring' },
];

function getRating(
  metric: 'fcp' | 'ttfb',
  value: number
): Metric['rating'] {
  if (metric === 'fcp') {
    return value < 1800 ? 'good' : value < 3000 ? 'needs-improvement' : 'poor';
  }
  return value < 800 ? 'good' : value < 1800 ? 'needs-improvement' : 'poor';
}

export default function Day14ClientDemo() {
  const [metrics, setMetrics] = useState<Metric[]>(INITIAL_METRICS);
  const [measured, setMeasured] = useState(false);

  const measureMetrics = useCallback(() => {
    if (typeof window === 'undefined') return;

    // Wait for navigation timing to be available
    const nav = performance.getEntriesByType(
      'navigation'
    )[0] as PerformanceNavigationTiming | undefined;

    if (!nav) {
      setMetrics([
        {
          name: 'FCP',
          value: 'Not available',
          rating: 'measuring',
        },
        {
          name: 'TTFB',
          value: 'Not available',
          rating: 'measuring',
        },
        { name: 'LCP', value: 'Use Lighthouse', rating: 'measuring' },
        { name: 'CLS', value: 'Use Lighthouse', rating: 'measuring' },
      ]);
      return;
    }

    const ttfb = Math.round(nav.responseStart - nav.startTime);
    const fcp = Math.round(nav.loadEventEnd - nav.startTime);

    setMetrics([
      {
        name: 'FCP',
        value: `${fcp}ms`,
        rating: getRating('fcp', fcp),
      },
      {
        name: 'TTFB',
        value: `${ttfb}ms`,
        rating: getRating('ttfb', ttfb),
      },
      {
        name: 'LCP',
        value: 'Use Lighthouse',
        rating: 'measuring',
      },
      {
        name: 'CLS',
        value: 'Use Lighthouse',
        rating: 'measuring',
      },
    ]);

    setMeasured(true);
  }, []);

  useEffect(() => {
    // Wait for page to fully load before measuring
    if (document.readyState === 'complete') {
      // Already loaded — measure after short delay so timing is final
      const timer = setTimeout(measureMetrics, 500);
      return () => clearTimeout(timer);
    }

    // Not loaded yet — wait for load event
    const handleLoad = () => {
      const timer = setTimeout(measureMetrics, 500);
      return () => clearTimeout(timer);
    };

    window.addEventListener('load', handleLoad);
    return () => window.removeEventListener('load', handleLoad);
  }, [measureMetrics]);

  const ratingConfig = {
    good: {
      cls: 'bg-green-100 dark:bg-green-900/30 text-green-700 dark:text-green-400',
      label: 'Good',
    },
    'needs-improvement': {
      cls: 'bg-yellow-100 dark:bg-yellow-900/30 text-yellow-700 dark:text-yellow-400',
      label: 'Improve',
    },
    poor: {
      cls: 'bg-red-100 dark:bg-red-900/30 text-red-700 dark:text-red-400',
      label: 'Poor',
    },
    measuring: {
      cls: 'bg-gray-100 dark:bg-gray-800 text-gray-500 dark:text-gray-400',
      label: '...',
    },
  };

  return (
    <div className="bg-white dark:bg-gray-900 rounded-xl border border-gray-200 dark:border-gray-700 shadow-sm p-5">

      <div className="flex items-center justify-between mb-4 flex-wrap gap-3">
        <div>
          <h3 className="text-sm font-semibold text-gray-900 dark:text-white">
            Performance API Measurements
          </h3>
          <p className="text-xs text-gray-500 dark:text-gray-400 mt-0.5">
            FCP and TTFB measured via browser Performance API.
            LCP and CLS require Lighthouse.
          </p>
        </div>
        <button
          type="button"
          onClick={measureMetrics}
          className="px-3 py-1.5 rounded-lg bg-primary text-white text-xs font-medium hover:bg-primary-dark transition-colors"
        >
          Re-measure
        </button>
      </div>

      {/* Metrics grid */}
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 mb-5">
        {metrics.map((metric) => {
          const config = ratingConfig[metric.rating];
          return (
            <div
              key={metric.name}
              className="flex flex-col items-center gap-2 p-4 rounded-xl border border-gray-100 dark:border-gray-800 bg-gray-50 dark:bg-gray-800/50 text-center"
            >
              <span className="text-xs font-bold text-gray-500 dark:text-gray-400 uppercase tracking-wider">
                {metric.name}
              </span>
              <span className="text-lg font-bold text-gray-900 dark:text-white tabular-nums">
                {metric.value}
              </span>
              <span
                className={`text-xs px-2 py-0.5 rounded-full font-medium ${config.cls}`}
              >
                {config.label}
              </span>
            </div>
          );
        })}
      </div>

      {/* Status message */}
      {measured ? (
        <div className="mb-4 p-3 rounded-lg bg-green-50 dark:bg-green-900/10 border border-green-200 dark:border-green-800">
          <p className="text-xs text-green-700 dark:text-green-400 font-medium">
            ✓ Measurements captured successfully from browser Performance API
          </p>
        </div>
      ) : (
        <div className="mb-4 p-3 rounded-lg bg-blue-50 dark:bg-blue-900/10 border border-blue-200 dark:border-blue-800">
          <p className="text-xs text-blue-700 dark:text-blue-400 font-medium">
            ⏳ Waiting for page load to complete before measuring...
          </p>
        </div>
      )}

      {/* Good values reference */}
      <div className="mb-4 overflow-x-auto rounded-lg border border-gray-200 dark:border-gray-700">
        <table className="w-full text-xs">
          <caption className="sr-only">Web Vitals good values reference</caption>
          <thead className="bg-gray-50 dark:bg-gray-800 border-b border-gray-200 dark:border-gray-700">
            <tr>
              {['Metric', 'Good', 'Needs Improvement', 'Poor'].map((h) => (
                <th
                  key={h}
                  scope="col"
                  className="px-3 py-2 text-left font-semibold text-gray-500 dark:text-gray-400 uppercase tracking-wider whitespace-nowrap"
                >
                  {h}
                </th>
              ))}
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-100 dark:divide-gray-800 bg-white dark:bg-gray-900">
            {[
              { metric: 'FCP', good: '< 1800ms', medium: '1800–3000ms', poor: '> 3000ms' },
              { metric: 'TTFB', good: '< 800ms', medium: '800–1800ms', poor: '> 1800ms' },
              { metric: 'LCP', good: '< 2500ms', medium: '2500–4000ms', poor: '> 4000ms' },
              { metric: 'CLS', good: '< 0.1', medium: '0.1–0.25', poor: '> 0.25' },
              { metric: 'INP', good: '< 200ms', medium: '200–500ms', poor: '> 500ms' },
            ].map((row, i) => (
              <tr
                key={row.metric}
                className={i % 2 === 0 ? 'bg-gray-50/50 dark:bg-gray-800/20' : ''}
              >
                <td className="px-3 py-2 font-bold text-primary">{row.metric}</td>
                <td className="px-3 py-2 text-green-600 dark:text-green-400 font-medium">{row.good}</td>
                <td className="px-3 py-2 text-yellow-600 dark:text-yellow-400">{row.medium}</td>
                <td className="px-3 py-2 text-red-600 dark:text-red-400">{row.poor}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Lighthouse instructions */}
      <div className="bg-blue-50 dark:bg-blue-900/10 border border-blue-200 dark:border-blue-800 rounded-lg p-4">
        <h4 className="text-xs font-semibold text-blue-700 dark:text-blue-400 mb-2">
          How to run full Lighthouse audit (for LCP, CLS, INP)
        </h4>
        <ol className="flex flex-col gap-1.5">
          {[
            'Open Chrome — press F12 to open DevTools',
            'Click the Lighthouse tab at the top',
            'Select: Performance, Accessibility, SEO checkboxes',
            'Set Mode to Navigation and Device to Desktop',
            'Click Analyze page load',
            'Review scores for LCP, CLS, INP, FCP, TTFB',
          ].map((step, i) => (
            <li
              key={i}
              className="text-xs text-blue-600 dark:text-blue-300 flex items-start gap-2"
            >
              <span className="font-bold flex-shrink-0 w-4">{i + 1}.</span>
              {step}
            </li>
          ))}
        </ol>
      </div>

    </div>
  );
}