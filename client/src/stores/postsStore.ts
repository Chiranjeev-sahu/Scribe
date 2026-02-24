/**
 * ═══════════════════════════════════════════════════════════════
 *  POSTS STORE — Design Notes & Tips
 * ═══════════════════════════════════════════════════════════════
 *
 *  PURPOSE:
 *    Manages the PUBLIC feed of published posts. This is what the
 *    Homepage and CategoryPage consume. It does NOT handle drafts
 *    or the user's own posts — those belong elsewhere.
 *
 *  DESIGN TIPS:
 *
 *  1. This store is about READING, not writing.
 *     It only fetches and displays posts. Creating/editing/deleting
 *     posts is the editor or drafts store's job.
 *
 *  2. Pagination strategy — pick one and commit:
 *     a) "Load More" button: posts[] grows as user clicks. Use `loadMore`.
 *     b) Traditional pages: posts[] is replaced on each page change.
 *     Your current backend supports both (it returns currentPage, totalPages).
 *     "Load More" is more modern for a blog feed.
 *
 *  3. Category filtering vs. separate caches:
 *     The simplest approach: when the user switches categories, clear posts[]
 *     and re-fetch. Don't try to cache per-category initially — it adds
 *     complexity for minimal gain. Optimize later if needed.
 *
 *  4. Stale data is okay for a blog.
 *     Blog posts don't change every second. A 5-minute cache is fine.
 *     Don't over-fetch.
 *
 *  5. The Post type here is a SUMMARY, not the full post.
 *     Your backend's getPosts endpoint does `.select('title coverImage summary...')`.
 *     The full post (with content) is fetched by the PostDetailPage component
 *     using a local useEffect, NOT from this store.
 *
 * ═══════════════════════════════════════════════════════════════
 */
import axios from "axios";
import { create } from "zustand";

import client from "@/api/client";

// ── Types ──────────────────────────────────────────────────────

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

// ── Store ──────────────────────────────────────────────────────

export const usePostsStore = create<PostsState & PostsActions>()(
  (set, get) => ({
    // ── Initial State ──
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
