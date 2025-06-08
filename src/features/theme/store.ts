import { create } from "zustand";
import { persist } from "zustand/middleware";

export type ThemeOption = "light" | "dark";
export interface ThemeStore {
  theme: ThemeOption;
  setTheme: (theme: ThemeOption) => void;
}

export const useThemeStore = create(
  persist<ThemeStore>(
    set => ({
      theme: "light",
      setTheme: theme => set({ theme }),
    }),
    {
      name: "app-theme",
    },
  ),
);
