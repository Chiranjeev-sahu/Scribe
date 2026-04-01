import { create } from "zustand";

type Theme = "light" | "dark";

interface UIState {
  theme: Theme;
}

interface UIActions {
  toggleTheme: () => void;
}

export const useUIStore = create<UIState & UIActions>()((set, get) => ({
  theme: window.matchMedia("(prefers-color-scheme: dark)").matches
    ? "dark"
    : "light",

  toggleTheme: () => {
    const newTheme = get().theme === "light" ? "dark" : "light";
    set({ theme: newTheme });
  },
}));

document.documentElement.classList.toggle(
  "dark",
  useUIStore.getState().theme === "dark"
);

useUIStore.subscribe((state) => {
  document.documentElement.classList.toggle("dark", state.theme === "dark");
});
