import axios from "axios";
import { create } from "zustand";
import { persist } from "zustand/middleware";

import client from "@/api/client";

import { useBookmarkStore } from "./bookmarkStore";
import { useDraftsStore } from "./draftsStore";
import { useEditorStore } from "./editorStore";

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
  updateProfile: (data: { bio?: string; avatar?: string }) => Promise<boolean>;
  updateUserData: (partial: Partial<UserData>) => void;
  clearError: () => void;
}

export const useAuthStore = create<AuthState & AuthActions>()(
  persist(
    (set, get) => ({
      userData: null,
      isAuthenticated: false,
      loading: false,
      error: null,

      signup: async (username, email, password) => {
        get().clearError();
        set({ loading: true });

        try {
          const response = await client.post("/auth/signup", {
            username,
            email,
            password,
          });

          set({
            userData: response.data.data.user,
            isAuthenticated: true,
          });
          return true;
        } catch (error) {
          let errMessage = "Signup failed";

          if (axios.isAxiosError(error)) {
            errMessage = error.response?.data?.message || errMessage;
          }

          set({ error: errMessage });
          return false;
        } finally {
          set({ loading: false });
        }
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
            userData: response.data.data.user,
            isAuthenticated: true,
          });
          return true;
        } catch (error) {
          let errMessage = "Login failed";

          if (axios.isAxiosError(error)) {
            errMessage = error.response?.data?.message || errMessage;
          }

          set({ error: errMessage });
          return false;
        } finally {
          set({ loading: false });
        }
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

          useBookmarkStore.getState().resetBookmarks();
          useDraftsStore.getState().resetDrafts();
          useEditorStore.getState().resetEditor();
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

      updateProfile: async (data) => {
        const previousUserData = get().userData;
        if (!previousUserData) return false;

        set({ userData: { ...previousUserData, ...data }, error: null });

        try {
          await client.put("/user/me", data);
          return true;
        } catch (error) {
          set({ userData: previousUserData });

          let errMessage = "Failed to update profile";
          if (axios.isAxiosError(error)) {
            errMessage = error.response?.data?.message || errMessage;
          }
          set({ error: errMessage });
          return false;
        }
      },

      updateUserData: (partial) => {
        const current = get().userData;
        if (!current) return;
        set({ userData: { ...current, ...partial } });
      },

      clearError: () => {
        set({ error: null });
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
