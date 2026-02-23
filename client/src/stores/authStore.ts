/**
 * ═══════════════════════════════════════════════════════════════
 *  AUTH STORE — Design Notes & Tips
 * ═══════════════════════════════════════════════════════════════
 *
 *  PURPOSE:
 *    Owns the user's identity and authentication lifecycle.
 *    This is the ONLY store that should know about login/signup/logout.
 *
 *  DESIGN TIPS:
 *
 *  1. DO NOT persist sensitive data in localStorage.
 *     Your tokens live in HttpOnly cookies — the browser manages them.
 *     The `persist` middleware should ONLY store minimal display data
 *     (username, avatar) so the UI doesn't flash "logged out" on refresh.
 *     The REAL source of truth is `checkAuth()` hitting `/api/users/me`.
 *
 *  2. checkAuth() is your app's "boot sequence".
 *     Call it once in your root component (App.tsx or a provider).
 *     It answers: "Does the user's cookie still represent a valid session?"
 *     Until it resolves, show a loading spinner, NOT the login page.
 *
 *  3. Keep `UserData` lean.
 *     Only store what the UI frequently needs (username, avatar, email, bio).
 *     Don't store bookmarks[] here — that's the bookmark store's job.
 *
 *  4. logout() should be a "scorched earth" operation.
 *     When the user logs out, EVERY store that holds user-specific data
 *     (bookmarks, drafts, editor) must also reset. Think about how to
 *     coordinate this. Options:
 *       a) Import other stores and call their reset inside logout
 *       b) Use Zustand's `subscribe` to react to auth changes
 *       c) Have a top-level `useEffect` that watches `isAuthenticated`
 *
 *  5. Error handling pattern:
 *     Set `error` before the try block? Or only in catch?
 *     Think about clearing stale errors — if the user had a login error
 *     and then tries again, the old error should disappear immediately.
 *
 * ═══════════════════════════════════════════════════════════════
 */
import type { AxiosError } from "axios";
import axios from "axios";
import { create } from "zustand";
import { persist } from "zustand/middleware";

import client from "@/api/client";

// ── Types ──────────────────────────────────────────────────────

interface UserData {
  _id: string;
  username: string;
  email: string;
  avatar?: string;
  bio?: string;
}

interface AuthState {
  userData: UserData | null;
  isAuthenticated: boolean;
  loading: boolean;
  error: string | null;
}

interface AuthActions {
  signup: (
    username: string,
    email: string,
    password: string
  ) => Promise<boolean>;
  login: (identifier: string, password: string) => Promise<boolean>;
  logout: () => Promise<void>;
  checkAuth: () => Promise<void>;
  updateUserData: (partial: Partial<UserData>) => void;
  clearError: () => void;
}

// ── Store ──────────────────────────────────────────────────────

export const useAuthStore = create<AuthState & AuthActions>()(
  persist(
    (set, get) => ({
      // ── Initial State ──
      userData: null,
      isAuthenticated: false,
      loading: false,
      error: null,

      // ── Actions ──

      signup: async (username, email, password) => {
        //  * TODO: Implement signup

        //  * 1. Set loading to true and clear any previous error
        get().clearError();
        set({ loading: true });
        //  * 2. Make a POST request to `/auth/register` with { username, email, password }
        //  *    - Use your `client` axios instance from `@/api/client`
        try {
          const response = await client.post("/auth/signup", {
            username,
            email,
            password,
          });

          set({
            userData: response.data.data,
            loading: false,
            isAuthenticated: true,
          });
          return true;
        } catch (error) {
          let errMessage = "Signup failed";

          if (axios.isAxiosError(error)) {
            errMessage = error.response?.data?.message || errMessage;
          }

          set({ error: errMessage, loading: false });
        }
        return false; // placeholder
      },

      login: async (identifier, password) => {
        get().clearError();
        set({ loading: true });

        try {
          const response = await client.post("/auth/login", {
            identifier,
            password,
          });

          set({
            userData: response.data.data,
            loading: false,
            isAuthenticated: true,
          });
          return true;
        } catch (error) {
          let errMessage = "Login failed";

          if (axios.isAxiosError(error)) {
            errMessage = error.response?.data?.message || errMessage;
          }

          set({ error: errMessage, loading: false });
        }
        return false;
      },

      logout: async () => {
        try {
          await client.post("/auth/logout");
        } catch {
        } finally {
          set({
            userData: null,
            isAuthenticated: false,
            loading: false,
            error: null,
          });

          // Reset other stores that hold user-specific data
          // TODO: uncomment these once those stores are implemented
          // useBookmarkStore.getState().resetBookmarks();
          // useDraftsStore.getState().resetDrafts();
          // useEditorStore.getState().resetEditor();
        }
      },

      checkAuth: async () => {
        set({ loading: true });
        try {
          const response = await client.get("/user/me");
          set({
            userData: response.data.data,
            isAuthenticated: true,
            loading: false,
          });
        } catch (error) {
          set({ userData: null, isAuthenticated: false, loading: false });
        }

        //  * THINK ABOUT:
        //  *  - This fires on every app load. If the access token is expired but the
        //  *    refresh token is valid, your Axios interceptor handles it silently.
        //  *    So this "just works" — understand why!
      },

      updateUserData: (partial) => {
        const current = get().userData;
        if (!current) return;
        set({ userData: { ...current, ...partial } });
        //  * WHEN IS THIS USED?
        //  *  - After the user updates their profile (bio, avatar) on the settings page.
        //  *  - You already have the updated data from the API response — no need to
        //  *    re-fetch /me. Just merge locally.
      },

      clearError: () => {
        set({ error: null });
        //  * WHEN TO CALL:
        //  *  - At the start of every new login/signup attempt
        //  *  - When the user starts typing in the auth form (clears stale errors)
        //  *  - When navigating away from the auth page
      },
    }),
    {
      name: "auth-storage",
      partialize: (state) => ({
        userData: state.userData,
        isAuthenticated: state.isAuthenticated,
      }),
    }
  )
);
