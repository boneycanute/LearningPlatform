"use client";

import { ThemeProvider as NextThemeProvider } from "@/lib/theme-context";

export function ThemeProvider({ children }: { children: React.ReactNode }) {
  return <NextThemeProvider>{children}</NextThemeProvider>;
}
