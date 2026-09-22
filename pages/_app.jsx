import React, { useEffect, useState, createContext, useContext } from 'react';
import '../styles/globals.css';

const ThemeContext = createContext({
  isDark: true,
  toggleTheme: () => {},
});

export const useThemeMode = () => useContext(ThemeContext);

export default function MyApp({ Component, pageProps }) {
  const [isDark, setIsDark] = useState(true);

  useEffect(() => {
    // Check initial preference from localStorage or default to dark
    const stored = localStorage.getItem('upiqr-theme');
    if (stored === 'light') {
      setIsDark(false);
      document.documentElement.classList.remove('dark');
    } else {
      setIsDark(true);
      document.documentElement.classList.add('dark');
    }
  }, []);

  const toggleTheme = () => {
    setIsDark((prev) => {
      const next = !prev;
      if (next) {
        document.documentElement.classList.add('dark');
        localStorage.setItem('upiqr-theme', 'dark');
      } else {
        document.documentElement.classList.remove('dark');
        localStorage.setItem('upiqr-theme', 'light');
      }
      return next;
    });
  };

  return (
    <ThemeContext.Provider value={{ isDark, toggleTheme }}>
      <Component {...pageProps} />
    </ThemeContext.Provider>
  );
}
