/**
 * ═══════════════════════════════════════════════════════════════
 *  UI STORE — Design Notes & Tips
 * ═══════════════════════════════════════════════════════════════
 *
 *  PURPOSE:
 *    A catch-all for global UI state that doesn't belong to any
 *    specific feature domain. Modals, sidebar visibility, theme
 *    preference, notification banners, etc.
 *
 *  DESIGN TIPS:
 *
 *  1. Keep it thin.
 *     If a piece of UI state is only used by ONE component tree,
 *     keep it in local state (useState). Only promote it to this
 *     store if multiple unrelated components need to read/write it.
 *
 *  2. The Publish Modal is a good candidate.
 *     It's triggered by a button in the WritePage toolbar, but the
 *     modal content needs data from the editor store. Having the
 *     modal's open/close state in a global store avoids prop-drilling
 *     through the editor component tree.
 *
 *  3. Theme preference should be persisted.
 *     Use Zustand's `persist` middleware, but ONLY for the theme
 *     field. Use `partialize` to control what gets saved.
 *
 *  4. Don't put loading states here.
 *     Each domain store owns its own loading state. The UI store
 *     is for UI CHROME, not data lifecycle.
 *
 * ═══════════════════════════════════════════════════════════════
 */
import { create } from "zustand";
import { persist } from "zustand/middleware";

// ── Types ──────────────────────────────────────────────────────

type Theme = "light" | "dark";

interface UIState {
  isPublishModalOpen: boolean;
  isSidebarOpen: boolean;
  theme: Theme;
}

interface UIActions {
  openPublishModal: () => void;
  closePublishModal: () => void;
  toggleSidebar: () => void;
  setTheme: (theme: Theme) => void;
  toggleTheme: () => void;
}

// ── Store ──────────────────────────────────────────────────────

export const useUIStore = create<UIState & UIActions>()(
  persist(
    (set, get) => ({
      // ── Initial State ──
      isPublishModalOpen: false,
      isSidebarOpen: false,
      theme: "light",

      // ── Actions ──

      openPublishModal: () => {
        set({ isPublishModalOpen: true })
      },

      closePublishModal: () => {
        set({ isPublishModalOpen: false });
      },

      toggleSidebar: () => {
        set({ isSidebarOpen: !get().isSidebarOpen });
      },

      setTheme: (theme) => {
        set({ theme });
        document.documentElement.classList.toggle('dark', theme === 'dark');
      },

      toggleTheme: () => {
        const newTheme = get().theme === 'light' ? 'dark' : 'light';
        get().setTheme(newTheme);
      },
    }),
    {
      name: "ui-storage",
      partialize: (state) => ({
        theme: state.theme, // Only persist theme — not modal/sidebar state
      }),
    }
  )
);
