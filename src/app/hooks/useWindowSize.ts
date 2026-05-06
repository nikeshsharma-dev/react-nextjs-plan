
'use client';

import { useState, useEffect, useRef } from 'react';

interface WindowSize {
  width: number;
  height: number;
}

export function useWindowSize(): WindowSize {
  const [size, setSize] = useState<WindowSize>({ width: 0, height: 0 });

  const timerRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  useEffect(() => {
    function updateSize() {
      if (timerRef.current) clearTimeout(timerRef.current);
      timerRef.current = setTimeout(() => {
        setSize({ width: window.innerWidth, height: window.innerHeight });
      }, 100);
    }

    updateSize();

    window.addEventListener('resize', updateSize);

    return () => {
      window.removeEventListener('resize', updateSize);
      if (timerRef.current) clearTimeout(timerRef.current);
    };
  }, []);

  return size;
}