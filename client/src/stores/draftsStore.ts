import axios from "axios";
import { create } from "zustand";

import client from "@/api/client";

interface DraftSummary {
  _id: string;
  title: string;
  coverImage?: string;
  summary?: string;
  category: string;
  updatedAt: string;
}

interface DraftsState {
  drafts: DraftSummary[];
  loading: boolean;
  error: string | null;
}

interface DraftsActions {
  fetchDrafts: () => Promise<void>;
  createNewDraft: () => Promise<string | null>;
  deleteDraft: (id: string) => Promise<void>;
  resetDrafts: () => void;
}

export const useDraftsStore = create<DraftsState & DraftsActions>()(
  (set, get) => ({
    drafts: [],
    loading: false,
    error: null,

    fetchDrafts: async () => {
      set({ loading: true, error: null });
      try {
        const response = await client.get("/post/user/drafts");
        set({ drafts: [...response.data.data], loading: false });
      } catch (error) {
        let errMessage = "Failed to fetch drafts";

        if (axios.isAxiosError(error)) {
          errMessage = error.response?.data?.message || errMessage;
        }

        set({ error: errMessage, loading: false });
      }
    },

    createNewDraft: async () => {
      try {
        const response = await client.post("/post");
        return response.data.data._id;
      } catch (error) {
        let errMessage = "Failed to create draft";

        if (axios.isAxiosError(error)) {
          errMessage = error.response?.data?.message || errMessage;
        }

        set({ error: errMessage });
        return null;
      }
    },

    deleteDraft: async (id) => {
      try {
        await client.delete(`/post/${id}`);
        set({ drafts: get().drafts.filter((d) => d._id !== id) });
      } catch (error) {
        let errMessage = "Failed to delete draft";

        if (axios.isAxiosError(error)) {
          errMessage = error.response?.data?.message || errMessage;
        }

        set({ error: errMessage });
      }
    },

    resetDrafts: () => {
      set({ drafts: [], error: null });
    },
  })
);
