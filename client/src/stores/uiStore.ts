import { create } from "zustand";

type Theme = "light" | "dark";

interface UIState {
  isPublishModalOpen: boolean;
  theme: Theme;
}

interface UIActions {
  openPublishModal: () => void;
  closePublishModal: () => void;
  toggleTheme: () => void;
}

export const useUIStore = create<UIState & UIActions>()((set, get) => ({
  isPublishModalOpen: false,
  isSidebarOpen: false,
  theme: window.matchMedia("(prefers-color-scheme: dark)").matches
    ? "dark"
    : "light",

  openPublishModal: () => {
    set({ isPublishModalOpen: true });
  },

  closePublishModal: () => {
    set({ isPublishModalOpen: false });
  },

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
