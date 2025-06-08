import { create } from "zustand";
import { persist } from "zustand/middleware";

export interface Settings {
  fontSize: number;
}
export interface SettingsStore extends Settings {
  setSettings: (settings: Partial<Settings>) => void;
}

export const useSettingsStore = create(
  persist<SettingsStore>(
    set => ({
      fontSize: 16,
      setSettings: settings => set(settings),
    }),
    {
      name: "settings",
    },
  ),
);
