import { useEffect, useState } from 'react';
import { useStore } from '@nanostores/react';
import { themeStore, type Theme } from '../stores/theme';

export default function ThemeToggle() {
  const theme = useStore(themeStore);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
    const stored = localStorage.getItem('theme') as Theme | null;
    let initial: Theme;
    if (stored === 'dark' || stored === 'light') {
      initial = stored;
    } else if (window.matchMedia('(prefers-color-scheme: dark)').matches) {
      initial = 'dark';
    } else {
      initial = 'light';
    }
    themeStore.set(initial);
    applyTheme(initial);
  }, []);

  function applyTheme(t: Theme) {
    const root = document.documentElement;
    if (t === 'light') {
      root.classList.remove('dark');
      root.classList.add('light');
    } else {
      root.classList.add('dark');
      root.classList.remove('light');
    }
  }

  function toggleTheme() {
    const next: Theme = theme === 'dark' ? 'light' : 'dark';
    themeStore.set(next);
    localStorage.setItem('theme', next);
    applyTheme(next);
  }

  const isDark = mounted ? theme === 'dark' : false;

  return (
    <button
      onClick={toggleTheme}
      aria-label={isDark ? 'Switch to light mode' : 'Switch to dark mode'}
      className="rounded-lg border border-[var(--border)] p-2 text-[var(--text-muted)] hover:text-[var(--accent)] transition-colors"
    >
      {isDark ? (
        // Moon icon — currently dark, click to go light
        <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
          <path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z" />
        </svg>
      ) : (
        // Sun icon — currently light, click to go dark
        <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
          <circle cx="12" cy="12" r="5" />
          <line x1="12" y1="1" x2="12" y2="3" />
          <line x1="12" y1="21" x2="12" y2="23" />
          <line x1="4.22" y1="4.22" x2="5.64" y2="5.64" />
          <line x1="18.36" y1="18.36" x2="19.78" y2="19.78" />
          <line x1="1" y1="12" x2="3" y2="12" />
          <line x1="21" y1="12" x2="23" y2="12" />
          <line x1="4.22" y1="19.78" x2="5.64" y2="18.36" />
          <line x1="18.36" y1="5.64" x2="19.78" y2="4.22" />
        </svg>
      )}
    </button>
  );
}
