import axios from "axios";
import { create } from "zustand";

import client from "@/api/client";

interface PostAuthor {
  _id: string;
  username: string;
  avatar?: string;
}

export interface PostSummary {
  _id: string;
  title: string;
  summary?: string;
  coverImage?: string;
  category: string;
  author: PostAuthor;
  updatedAt: string;
  createdAt?: string;
}

export interface PostDetail extends PostSummary {
  content: any;
}

interface Pagination {
  currentPage: number;
  totalPages: number;
  totalPosts: number;
}

interface PostsState {
  posts: PostSummary[];
  currentPost: PostDetail | null;
  pagination: Pagination | null;
  loading: boolean;
  error: string | null;
  currentCategory: string | null;
  currentLimit: number;
}

interface PostsActions {
  fetchPosts: (
    page?: number,
    category?: string,
    limit?: number
  ) => Promise<void>;
  fetchPostById: (id: string) => Promise<void>;
  loadMore: () => Promise<void>;
  setCategory: (category: string | null) => void;
  clearPosts: () => void;
}

export const usePostsStore = create<PostsState & PostsActions>()(
  (set, get) => ({
    posts: [],
    currentPost: null,
    pagination: null,
    loading: false,
    error: null,
    currentCategory: null,
    currentLimit: 10,

    fetchPosts: async (page = 1, category, limit = 10) => {
      if (get().loading) return;

      set({ loading: true, error: null, currentLimit: limit });
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

    fetchPostById: async (id) => {
      set({ loading: true, error: null, currentPost: null });
      try {
        const response = await client.get(`/post/public/${id}`);
        set({ currentPost: response.data.data, loading: false });
      } catch (error) {
        let errMessage = "Failed to fetch post";

        if (axios.isAxiosError(error)) {
          errMessage = error.response?.data?.message || errMessage;
        }

        set({ error: errMessage, loading: false });
      }
    },

    loadMore: async () => {
      const { pagination, currentCategory, currentLimit } = get();
      if (!pagination || pagination.currentPage >= pagination.totalPages)
        return;

      await get().fetchPosts(
        pagination.currentPage + 1,
        currentCategory ?? undefined,
        currentLimit
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
