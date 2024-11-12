// lib/theme-context.tsx
"use client";

import React, { createContext, useContext, useEffect, useState } from "react";

type ThemeVariant = "latte" | "frappe" | "macchiato" | "mocha";

interface ThemeContextType {
  theme: ThemeVariant;
  setTheme: (theme: ThemeVariant) => void;
}

const ThemeContext = createContext<ThemeContextType | undefined>(undefined);

export function ThemeProvider({ children }: { children: React.ReactNode }) {
  const [mounted, setMounted] = useState(false);
  const [theme, setTheme] = useState<ThemeVariant>("macchiato");

  useEffect(() => {
    // Get stored theme or use default
    const storedTheme = localStorage.getItem("theme") as ThemeVariant;
    if (storedTheme) {
      setTheme(storedTheme);
    }
    setMounted(true);
  }, []);

  useEffect(() => {
    if (mounted) {
      // Remove all theme classes
      document.documentElement.classList.remove(
        "latte",
        "frappe",
        "macchiato",
        "mocha"
      );
      // Add new theme class
      document.documentElement.classList.add(theme);
      // Store theme preference
      localStorage.setItem("theme", theme);
    }
  }, [theme, mounted]);

  if (!mounted) {
    return null;
  }

  return (
    <ThemeContext.Provider value={{ theme, setTheme }}>
      {children}
    </ThemeContext.Provider>
  );
}

export function useTheme() {
  const context = useContext(ThemeContext);
  if (context === undefined) {
    throw new Error("useTheme must be used within a ThemeProvider");
  }
  return context;
}
