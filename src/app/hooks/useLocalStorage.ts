
'use client';

import { useState, useEffect, useRef } from 'react';

export function useLocalStorage<T>(key: string, initialValue: T) {
  const isFirstRender = useRef(true);

  const [storedValue, setStoredValue] = useState<T>(() => {
    if (typeof window === 'undefined') return initialValue;
    try {
      const item = localStorage.getItem(key);
      return item ? (JSON.parse(item) as T) : initialValue;
    } catch {
      return initialValue;
    }
  });

  useEffect(() => {
    if (isFirstRender.current) {
      isFirstRender.current = false;
      return;
    }
    try {
      localStorage.setItem(key, JSON.stringify(storedValue));
    } catch {
      console.error('Failed to save to localStorage');
    }
  }, [key, storedValue]);

  return [storedValue, setStoredValue] as const;
}