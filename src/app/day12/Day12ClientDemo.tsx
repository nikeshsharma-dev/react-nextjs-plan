
'use client';

import { useState, useEffect } from 'react';

interface Tab {
  id: string;
  label: string;
  content: string;
}

const TABS: Tab[] = [
  { id: 'overview',  label: 'Overview',  content: 'This tab uses useState to track which tab is active. That is why this is a Client Component.' },
  { id: 'analytics', label: 'Analytics', content: 'Analytics content would go here — charts, graphs, data visualizations.' },
  { id: 'settings',  label: 'Settings',  content: 'Settings content — form inputs, toggles, saved preferences.' },
];

export default function Day12ClientDemo() {
  const [activeTab, setActiveTab] = useState('overview');
  const [time, setTime]           = useState('');
  const [clicks, setClicks]       = useState(0);

  // useEffect — browser API, can only run on client
  useEffect(() => {
    const update = () => setTime(new Date().toLocaleTimeString());
    update();
    const interval = setInterval(update, 1000);
    return () => clearInterval(interval);
  }, []);

  const activeContent = TABS.find((t) => t.id === activeTab)?.content;

  return (
    <div className="bg-white dark:bg-gray-900 rounded-xl border border-gray-200 dark:border-gray-700 shadow-sm overflow-hidden">
      <div className="px-5 py-4 border-b border-gray-100 dark:border-gray-800">
        <h3 className="text-sm font-semibold text-gray-900 dark:text-white">
          Client Component — Interactive Demo
        </h3>
        <p className="text-xs text-gray-500 dark:text-gray-400 mt-0.5">
          Uses useState + useEffect — must be a Client Component
        </p>
      </div>

      {/* Live clock — useEffect + browser Date API */}
      <div className="px-5 py-3 bg-gray-50 dark:bg-gray-800/50 border-b border-gray-100 dark:border-gray-800 flex items-center justify-between">
        <span className="text-xs text-gray-500 dark:text-gray-400">
          Live clock (useEffect + setInterval):
        </span>
        <span className="text-sm font-mono font-bold text-primary">
          {time || '--:--:--'}
        </span>
      </div>

      {/* Tabs — useState */}
      <div className="border-b border-gray-100 dark:border-gray-800">
        <div role="tablist" className="flex">
          {TABS.map((tab) => (
            <button
              key={tab.id}
              role="tab"
              type="button"
              aria-selected={activeTab === tab.id}
              aria-controls={`panel-${tab.id}`}
              id={`tab-${tab.id}`}
              onClick={() => setActiveTab(tab.id)}
              className={[
                'px-4 py-2.5 text-xs font-medium transition-colors border-b-2 -mb-px',
                activeTab === tab.id
                  ? 'border-primary text-primary'
                  : 'border-transparent text-gray-500 hover:text-gray-700 dark:hover:text-gray-300',
              ].join(' ')}
            >
              {tab.label}
            </button>
          ))}
        </div>
      </div>

      {/* Tab content */}
      <div
        id={`panel-${activeTab}`}
        role="tabpanel"
        aria-labelledby={`tab-${activeTab}`}
        tabIndex={0}
        className="p-5 text-xs text-gray-600 dark:text-gray-400 focus:outline-none"
      >
        {activeContent}
      </div>

      {/* Click counter — useState */}
      <div className="px-5 py-4 border-t border-gray-100 dark:border-gray-800 flex items-center justify-between">
        <span className="text-xs text-gray-500 dark:text-gray-400">
          Click counter (useState):
        </span>
        <button
          type="button"
          onClick={() => setClicks((c) => c + 1)}
          className="px-3 py-1.5 rounded-lg bg-primary text-white text-xs font-medium hover:bg-primary-dark transition-colors"
        >
          Clicked {clicks} times
        </button>
      </div>
    </div>
  );
}