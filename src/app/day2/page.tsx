'use client';

import { useState } from 'react';
import Header from '@/components/organisms/Header';
import Sidebar from '@/components/organisms/Sidebar';
import Button from '@/components/atoms/Button';
import Modal from '@/components/organisms/Modal';
import Dropdown from '@/components/molecules/Dropdown';

function Counter() {
  const [count, setCount] = useState(0);

  return (
    <div className="flex flex-col items-center gap-4 p-6 border border-gray-200 dark:border-gray-700 rounded-xl bg-white dark:bg-gray-900 w-fit">
      <h3 className="font-semibold text-gray-900 dark:text-white">Counter</h3>
      <span className="text-4xl font-bold text-primary tabular-nums">
        {count}
      </span>
      <div className="flex gap-2">
        <Button label="−" variant="ghost" size="sm" onClick={() => setCount((c) => c - 1)} />
        <Button label="Reset" variant="secondary" size="sm" onClick={() => setCount(0)} />
        <Button label="+" variant="primary" size="sm" onClick={() => setCount((c) => c + 1)} />
      </div>
    </div>
  );
}

const TAB_ITEMS = ['Overview', 'Analytics', 'Settings', 'Reports'];

function Tabs() {
  const [active, setActive] = useState('Overview');

  return (
    <div className="w-full max-w-xl">
      <div
        role="tablist"
        className="flex gap-1 border-b border-gray-200 dark:border-gray-700 mb-4"
      >
        {TAB_ITEMS.map((tab) => (
          <button
            key={tab}
            role="tab"
            type="button"
            aria-selected={active === tab}
            onClick={() => setActive(tab)}
            className={[
              'px-4 py-2 text-sm font-medium transition-colors duration-150 border-b-2 -mb-px',
              active === tab
                ? 'border-primary text-primary'
                : 'border-transparent text-gray-500 hover:text-gray-700 dark:hover:text-gray-300',
            ].join(' ')}
          >
            {tab}
          </button>
        ))}
      </div>

      <div
        role="tabpanel"
        className="p-4 rounded-lg bg-gray-50 dark:bg-gray-800/50 text-sm text-gray-600 dark:text-gray-400"
      >
        You are viewing:{' '}
        <strong className="text-gray-900 dark:text-white">{active}</strong>
        <p className="mt-1">Content for the {active} tab goes here.</p>
      </div>
    </div>
  );
}

export default function Day2Page() {
  const [modalOpen, setModalOpen] = useState(false);
  const [selected, setSelected] = useState('');

  return (
    <div className="min-h-screen flex flex-col bg-gray-50 dark:bg-gray-950">
      <Header />

      <div className="flex flex-1">
        <Sidebar />

        <main className="flex-1 p-8">
          <h1 className="text-2xl font-bold text-gray-900 dark:text-white mb-2">
            Day 2 — Props & State
          </h1>
          <p className="text-gray-500 dark:text-gray-400 mb-10 text-sm">
            Counter · Tabs · Modal · Dropdown
          </p>

          <div className="flex flex-col gap-10">

            {/* Counter */}
            <section aria-labelledby="counter-heading">
              <h2
                id="counter-heading"
                className="text-base font-semibold text-gray-800 dark:text-gray-200 mb-4"
              >
                Counter
              </h2>
              <Counter />
            </section>

            <section aria-labelledby="tabs-heading">
              <h2
                id="tabs-heading"
                className="text-base font-semibold text-gray-800 dark:text-gray-200 mb-4"
              >
                Tabs
              </h2>
              <Tabs />
            </section>

            <section aria-labelledby="modal-heading">
              <h2
                id="modal-heading"
                className="text-base font-semibold text-gray-800 dark:text-gray-200 mb-4"
              >
                Modal
              </h2>
              <Button
                label="Open Modal"
                variant="primary"
                onClick={() => setModalOpen(true)}
              />
              <Modal
                isOpen={modalOpen}
                onClose={() => setModalOpen(false)}
                title="Confirm Action"
              >
                <p>Are you sure you want to perform this action? This cannot be undone.</p>
              </Modal>
            </section>

            <section aria-labelledby="dropdown-heading">
              <h2
                id="dropdown-heading"
                className="text-base font-semibold text-gray-800 dark:text-gray-200 mb-4"
              >
                Dropdown
              </h2>
              <Dropdown
                label="Select role"
                options={['Admin', 'Editor', 'Viewer', 'Guest']}
                value={selected}
                onChange={setSelected}
              />
              {selected && (
                <p className="mt-3 text-sm text-gray-600 dark:text-gray-400">
                  Selected: <strong>{selected}</strong>
                </p>
              )}
            </section>

          </div>
        </main>
      </div>
    </div>
  );
}