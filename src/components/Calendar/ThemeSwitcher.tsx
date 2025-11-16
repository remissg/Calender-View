import React, { useContext } from "react";
import { ThemeContext } from "@/context/ThemeContext";
const themes = ["pastel","dark","corporate","high-contrast"] as const;
export const ThemeSwitcher: React.FC = () => {
  const { theme, setTheme } = useContext(ThemeContext);
  return (
    <div style={{ display: "flex", gap: 8, alignItems: "center", marginBottom: 12 }}>
      {themes.map((t) => (
        <button key={t} onClick={() => setTheme(t)} style={{
          padding: "6px 10px", borderRadius: 8,
          border: theme===t ? "2px solid var(--cal-accent)" : "1px solid rgba(0,0,0,0.1)",
          background: theme===t ? "var(--cal-selected-bg)" : "transparent", cursor: "pointer"
        }} aria-pressed={theme===t}>
          {t.charAt(0).toUpperCase()+t.slice(1)}
        </button>
      ))}
    </div>
  );
};
export default ThemeSwitcher;
