/**
 * ═══════════════════════════════════════════════════════════════
 *  DRAFTS STORE — Design Notes & Tips
 * ═══════════════════════════════════════════════════════════════
 *
 *  PURPOSE:
 *    Manages the LIST of the user's drafts. This is what a "My Drafts"
 *    dashboard page consumes. It is NOT the editor — think of it as
 *    a file explorer, while the editorStore is the open file.
 *
 *  DESIGN TIPS:
 *
 *  1. Drafts Store vs. Editor Store — know the boundary:
 *     - Drafts Store = folder listing (multiple items, summary data)
 *     - Editor Store = file open in the editor (one item, full data)
 *     They interact when:
 *       a) User clicks a draft → draftsStore knows the ID, editorStore
 *          loads it, and the router navigates to /write/:id
 *       b) User creates a new draft → draftsStore.createNewDraft()
 *          creates it on the server, then navigates to /write/:id
 *
 *  2. createNewDraft lives here, not in the editor store.
 *     Why? Because creating a draft is about the LIST of drafts growing.
 *     The editor doesn't care about creation — it just loads whatever
 *     ID it's given via the URL.
 *
 *  3. Deleting from the list:
 *     After a successful delete API call, remove the item from the
 *     local drafts[] immediately. Don't re-fetch the entire list just
 *     to remove one item.
 *
 *  4. Don't persist this store.
 *     Fresh fetch on page visit is fine. Drafts change frequently and
 *     stale data would confuse the user.
 *
 * ═══════════════════════════════════════════════════════════════
 */
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

      //  *    - Set drafts from response data
      //  *    - Set loading = false
      //  * 4. On FAILURE:
      //  *    - Set error message, loading = false
      //  *
      //  * WHEN TO CALL:
      //  *  - When the "My Drafts" page mounts
      //  *  - After creating a new draft (to refresh the list)
      //  *  - After deleting a draft (or just remove locally, see deleteDraft)
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
