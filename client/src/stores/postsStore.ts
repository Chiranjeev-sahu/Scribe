import axios from "axios";
import { create } from "zustand";

import client from "@/api/client";


interface PostAuthor {
  _id: string;
  username: string;
  avatar?: string;
}

interface PostSummary {
  _id: string;
  title: string;
  summary?: string;
  coverImage?: string;
  category: string;
  author: PostAuthor;
  updatedAt: string;
  createdAt: string;
}

interface Pagination {
  currentPage: number;
  totalPages: number;
  totalPosts: number;
}

interface PostsState {
  posts: PostSummary[];
  pagination: Pagination | null;
  loading: boolean;
  error: string | null;
  currentCategory: string | null;
}

interface PostsActions {
  fetchPosts: (
    page?: number,
    category?: string,
    limit?: number
  ) => Promise<void>;
  loadMore: () => Promise<void>;
  setCategory: (category: string | null) => void;
  clearPosts: () => void;
}


export const usePostsStore = create<PostsState & PostsActions>()(
  (set, get) => ({
    posts: [],
    pagination: null,
    loading: false,
    error: null,
    currentCategory: null,

    fetchPosts: async (page = 1, category, limit = 10) => {
      if (get().loading) return;

      set({ loading: true, error: null });
      try {
        const response = await client.get("/post", {
          params: { page, category, limit },
        });
        const { posts, pagination } = response.data.data;
        const existingPosts = page === 1 ? [] : get().posts;

        set({
          posts: [...existingPosts, ...posts],
          pagination,
          loading: false,
        });
      } catch (error) {
        let errMessage = "Failed to fetch posts";

        if (axios.isAxiosError(error)) {
          errMessage = error.response?.data?.message || errMessage;
        }

        set({ error: errMessage, loading: false });
      }
    },

    loadMore: async () => {
      const { pagination, currentCategory } = get();
      if (!pagination || pagination.currentPage >= pagination.totalPages)
        return;

      await get().fetchPosts(
        pagination.currentPage + 1,
        currentCategory ?? undefined
      );
    },

    setCategory: (category) => {
      set({ currentCategory: category, posts: [], pagination: null });
      get().fetchPosts(1, category ?? undefined);
    },

    clearPosts: () => {
      set({ posts: [], pagination: null, currentCategory: null, error: null });
    },
  })
);
