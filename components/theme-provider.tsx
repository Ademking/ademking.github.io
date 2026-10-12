"use client";

import { ThemeProvider as NextThemesProvider } from "next-themes";
import type React from "react";

export const ThemeProvider = (
  props: React.ComponentProps<typeof NextThemesProvider>
) => (
  <NextThemesProvider
    attribute="class"
    defaultTheme="dark"
    disableTransitionOnChange
    enableSystem={false}
    forcedTheme="dark"
    {...props}
  />
);
