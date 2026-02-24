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
        /**
         * TODO: Implement openPublishModal
         *
         * 1. set({ isPublishModalOpen: true })
         *
         * CALLED BY:
         *  - The "Publish" button in the WritePage toolbar
         *
         * THINK ABOUT:
         *  - Should you also extract the summary here (from the editor store)?
         *    e.g. useEditorStore.getState().setSummary(extractedText)
         *    Or should the PublishModal component handle that on mount?
         *    Keeping the store simple is usually better — let the component do it.
         */
      },

      closePublishModal: () => {
        /**
         * TODO: Implement closePublishModal
         *
         * 1. set({ isPublishModalOpen: false })
         */
      },

      toggleSidebar: () => {
        /**
         * TODO: Implement toggleSidebar
         *
         * 1. set({ isSidebarOpen: !get().isSidebarOpen })
         *
         * USED FOR:
         *  - Mobile navigation hamburger menu
         *  - Collapsible sidebar on dashboard layouts
         */
      },

      setTheme: (theme) => {
        /**
         * TODO: Implement setTheme
         *
         * 1. set({ theme })
         * 2. Apply the theme to the document:
         *    document.documentElement.setAttribute('data-theme', theme)
         *    OR toggle a class: document.documentElement.classList.toggle('dark')
         *
         * THINK ABOUT:
         *  - Where do you set the initial theme on app load?
         *    Since this store is persisted, the theme value survives refresh.
         *    But you also need to APPLY it to the DOM on load.
         *    Options:
         *      a) Use Zustand's `onRehydrateStorage` callback
         *      b) A useEffect in your root App component
         */
      },

      toggleTheme: () => {
        /**
         * TODO: Implement toggleTheme
         *
         * 1. const newTheme = get().theme === 'light' ? 'dark' : 'light'
         * 2. Call get().setTheme(newTheme) — reuse the logic from setTheme
         *    so the DOM update isn't duplicated
         */
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
