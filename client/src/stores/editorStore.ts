import client from "@/api/client";
import axios from "axios";
import { create } from "zustand";


type Category = "Technology" | "People" | "Culture" | "Lifestyle";

type JSONContent = Record<string, unknown>;

interface EditorState {
  postId: string | null;
  title: string;
  content: JSONContent | null;
  coverImage: string | null;
  category: Category;
  summary: string;
  status: "draft" | "published";

  isDirty: boolean;
  isSaving: boolean;
  lastSavedAt: Date | null;
  saveError: string | null;

  isPublishing: boolean;
  publishError: string | null;

  isLoading: boolean;
  loadError: string | null;
}

interface EditorActions {
  loadDraft: (id: string) => Promise<void>;
  setTitle: (title: string) => void;
  setContent: (content: JSONContent) => void;
  setCoverImage: (url: string | null) => void;
  setCategory: (category: Category) => void;
  setSummary: (summary: string) => void;
  saveDraft: () => Promise<void>;
  publish: () => Promise<boolean>;
  resetEditor: () => void;
}


const initialState: EditorState = {
  postId: null,
  title: "",
  content: null,
  coverImage: null,
  category: "Technology",
  summary: "",
  status: "draft",

  isDirty: false,
  isSaving: false,
  lastSavedAt: null,
  saveError: null,

  isPublishing: false,
  publishError: null,

  isLoading: false,
  loadError: null,
};


export const useEditorStore = create<EditorState & EditorActions>()(
  (set, get) => ({
    ...initialState,


    loadDraft: async (id) => {
      get().resetEditor();
      set({ isLoading: true, postId: id })
      try {
        const response = await client.get(`/post/${id}`);

        const { title, content, coverImage, category, summary, status } = response.data.data;

        set({ title, content, coverImage, category, summary, status, isLoading: false, isDirty: false });
      } catch (error) {
        let errMessage = "Error loading draft"

        if (axios.isAxiosError(error)) {
          errMessage = error.message || error.response?.data?.message;
        }

        set({ loadError: errMessage, isLoading: false });
      }
    },

    setTitle: (title) => {
      set({ title, isDirty: true })
    },

    setContent: (content) => {
      set({ content, isDirty: true });
    },

    setCoverImage: (url) => {
      set({ coverImage: url, isDirty: true });
    },

    setCategory: (category) => {
      set({ category, isDirty: true });
    },

    setSummary: (summary) => {
      set({ summary });
    },

    saveDraft: async () => {
      const { isDirty, postId, isSaving, title, content, coverImage, category } = get();

      if (!isDirty || !postId || isSaving) return;

      set({ isSaving: true, saveError: null });

      try {
        const payload = { title, content, coverImage, category };
        await client.patch(`/post/${postId}`, payload);

        set({
          isSaving: false,
          isDirty: false,
          lastSavedAt: new Date(),
        });
      } catch (error) {
        let errMessage = "Error saving draft";
        if (axios.isAxiosError(error)) {
          errMessage = error.message || error.response?.data?.message || errMessage;
        }
        set({ isSaving: false, saveError: errMessage });
      }
    },

    publish: async () => {
      const { postId, title, summary, category, coverImage, content } = get();

      if (!postId) return false;

      set({ isPublishing: true, publishError: null });

      const isTitleValid = title && title.trim() !== "" && title.trim() !== "Untitled";
      const isContentValid = content !== null && Object.keys(content).length > 0;

      if (!isTitleValid || !isContentValid || !category) {
        set({
          publishError: "Title and content are required to publish.",
          isPublishing: false
        });
        return false;
      }

      try {
        const payload = { title, summary, category, coverImage, content };
        await client.patch(`/post/${postId}/publish`, payload);

        set({
          isPublishing: false,
          status: "published",
        });

        return true;
      } catch (error) {
        let errMessage = "Error publishing post";
        if (axios.isAxiosError(error)) {
          errMessage = error.response?.data?.message || errMessage;
        }
        set({ isPublishing: false, publishError: errMessage });
        return false;
      }
    },

    resetEditor: () => {
      set(initialState);
    },
  })
);
