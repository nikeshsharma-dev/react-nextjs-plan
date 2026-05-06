'use client';

import { useState, useRef, useEffect } from 'react';

interface DropdownProps {
  label: string;
  options: string[];
  value: string;
  onChange: (value: string) => void;
}

export default function Dropdown({ label, options, value, onChange }: DropdownProps) {
  const [open, setOpen] = useState(false);
  const ref = useRef<HTMLDivElement>(null);


  useEffect(() => {
    const handler = (e: MouseEvent) => {
      if (ref.current && !ref.current.contains(e.target as Node)) {
        setOpen(false);
      }
    };
    document.addEventListener('mousedown', handler);
    return () => document.removeEventListener('mousedown', handler);
  }, []);

  return (
    <div ref={ref} className="relative inline-block w-48">

      <button
        type="button"
        onClick={() => setOpen((prev) => !prev)}
        className="w-full flex items-center justify-between px-3 py-2 text-sm border border-gray-300 dark:border-gray-600 rounded-md bg-white dark:bg-gray-800 text-gray-700 dark:text-gray-200 hover:border-primary focus:outline-none focus:ring-2 focus:ring-primary/50 transition-colors"
      >
        <span>{value || label}</span>
        <span className={`transition-transform duration-200 ${open ? 'rotate-180' : ''}`}>▾</span>
      </button>

      {open && (
        <ul
          role="listbox"
          className="absolute z-10 mt-1 w-full bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-md shadow-lg overflow-hidden"
        >
          {options.map((opt) => (
            <li
              key={opt}
              role="option"
              aria-selected={opt === value}
              onClick={() => {
                onChange(opt);
                setOpen(false);
              }}
              className={[
                'px-3 py-2 text-sm cursor-pointer transition-colors',
                opt === value
                  ? 'bg-primary text-white'
                  : 'text-gray-700 dark:text-gray-200 hover:bg-gray-100 dark:hover:bg-gray-700',
              ].join(' ')}
            >
              {opt}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}