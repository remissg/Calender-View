import React, { createContext, useState, useEffect } from "react";
type Theme = "pastel" | "dark" | "corporate" | "high-contrast";
interface ThemeContextValue { theme: Theme; setTheme: (t: Theme) => void; }
export const ThemeContext = createContext<ThemeContextValue>({ theme: "pastel", setTheme: () => {} });
export const ThemeProvider: React.FC<{ initial?: Theme; children?: React.ReactNode }> = ({ initial = "pastel", children }) => {
  const [theme, setTheme] = useState<Theme>(() => {
    try { const s = localStorage.getItem("calendar_theme"); return (s as Theme) || initial; } catch { return initial; }
  });
  useEffect(() => { try { localStorage.setItem("calendar_theme", theme); } catch {} }, [theme]);
  useEffect(() => {
    const root = document.documentElement;
    root.classList.remove("theme-pastel","theme-dark","theme-corporate","theme-high-contrast");
    root.classList.add(`theme-${theme}`);
  }, [theme]);
  return <ThemeContext.Provider value={{ theme, setTheme }}>{children}</ThemeContext.Provider>;
};
