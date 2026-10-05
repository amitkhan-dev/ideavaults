'use client';

import { useTheme } from 'next-themes';
import { useEffect, useState } from 'react';
import { Sun, Moon } from 'lucide-react';

export default function ThemeToggle() {
  const { theme, setTheme } = useTheme();
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) {
    return <div className="w-9 h-9" />;
  }

  const isDark = theme === 'dark';

  return (
    <button
      onClick={() => setTheme(isDark ? 'light' : 'dark')}
      className="p-2 rounded-lg text-txt-primary hover:bg-bg-subtle transition-colors focus:outline-none focus-visible:ring-2 focus-visible:ring-brand-primary"
      aria-label="Toggle Theme"
      type="button"
    >
      {isDark ? <Sun className="w-5 h-5 text-txt-secondary" /> : <Moon className="w-5 h-5 text-txt-primary" />}
    </button>
  );
}