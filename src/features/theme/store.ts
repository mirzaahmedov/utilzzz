import { create } from "zustand";
import { persist } from "zustand/middleware";

export type ThemeOption = "light" | "dark";
export interface ThemeStore {
  theme: ThemeOption;
  setTheme: (theme: ThemeOption) => void;
}

const getSystemTheme = (): ThemeOption => {
  if (typeof window === "undefined") return "light";
  return window.matchMedia("(prefers-color-scheme: dark)").matches
    ? "dark"
    : "light";
};

export const useThemeStore = create(
  persist<ThemeStore>(
    set => ({
      theme: getSystemTheme(),
      setTheme: theme => set({ theme }),
    }),
    {
      name: "app-theme",
    },
  ),
);
