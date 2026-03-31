import React, { createContext, useContext, useEffect, useState } from "react";

export type DarkMode = "light" | "dark";
// Legacy – wird nicht mehr aktiv genutzt, bleibt für Typkompatibilität
export type ColorTheme = string;

export interface ThemeContextType {
  darkMode: DarkMode;
  toggleDarkMode: () => void;
  switchable: boolean;
  // Legacy compat
  theme: DarkMode;
  toggleTheme?: () => void;
  colorTheme?: ColorTheme;
  setColorTheme?: (t: ColorTheme) => void;
}

const ThemeContext = createContext<ThemeContextType | undefined>(undefined);

interface ThemeProviderProps {
  children: React.ReactNode;
  defaultTheme?: DarkMode;
  switchable?: boolean;
}

export function ThemeProvider({
  children,
  defaultTheme = "light",
  switchable = true,
}: ThemeProviderProps) {
  const [darkMode, setDarkMode] = useState<DarkMode>(() => {
    const stored = localStorage.getItem("volt-ui-dark");
    return (stored as DarkMode) || defaultTheme;
  });

  // Apply dark class + remove old data-theme attributes
  useEffect(() => {
    const root = document.documentElement;
    if (darkMode === "dark") {
      root.classList.add("dark");
    } else {
      root.classList.remove("dark");
    }
    // Entferne alte theme-Attribute
    root.removeAttribute("data-theme");
    localStorage.setItem("volt-ui-dark", darkMode);
  }, [darkMode]);

  const toggleDarkMode = () => {
    setDarkMode(prev => (prev === "light" ? "dark" : "light"));
  };

  return (
    <ThemeContext.Provider value={{
      darkMode,
      toggleDarkMode,
      switchable,
      theme: darkMode,
      toggleTheme: toggleDarkMode,
      colorTheme: "grain",
      setColorTheme: () => {},
    }}>
      {children}
    </ThemeContext.Provider>
  );
}

export function useTheme() {
  const context = useContext(ThemeContext);
  if (!context) {
    throw new Error("useTheme must be used within ThemeProvider");
  }
  return context;
}
