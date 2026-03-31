import axios from "axios";
import client from "@/api/client";
import { create } from "zustand";

interface BookmarkedPost {
  _id: string;
  title: string;
  summary?: string;
  coverImage?: string;
  category: string;
  author: {
    _id: string;
    username: string;
    avatar?: string;
  };
  updatedAt: string;
}

interface BookmarkState {
  bookmarkedIds: Set<string>;
  bookmarkedPosts: BookmarkedPost[];
  loading: boolean;
  error: string | null;
}

interface BookmarkActions {
  fetchBookmarks: () => Promise<void>;
  toggleBookmark: (postId: string) => Promise<void>;
  hydrateIds: (ids: string[]) => void;
  isBookmarked: (postId: string) => boolean;
  resetBookmarks: () => void;
}


export const useBookmarkStore = create<BookmarkState & BookmarkActions>()(
  (set, get) => ({
    bookmarkedIds: new Set<string>(),
    bookmarkedPosts: [],
    loading: false,
    error: null,

    fetchBookmarks: async () => {
      set({ loading: true, error: null });
      try {
        const response = await client.get('/post/user/bookmarks');

        const posts = response.data.data;
        const ids = posts.map((post: BookmarkedPost) => post._id);

        set({
          bookmarkedPosts: posts,
          bookmarkedIds: new Set(ids),
          loading: false
        });
      } catch (error) {
        let errMessage = "Error fetching bookmarks";
        if (axios.isAxiosError(error)) {
          errMessage = error.response?.data?.message || errMessage;
        }
        set({ loading: false, error: errMessage });
      }
    },


    hydrateIds: (ids: Array<string>) => {
      set({ bookmarkedIds: new Set(ids) });
    },


    toggleBookmark: async (postId) => {
      const { bookmarkedIds, bookmarkedPosts } = get();
      const wasBookmarked = bookmarkedIds.has(postId);

      const newIds = new Set(bookmarkedIds);
      if (wasBookmarked) {
        newIds.delete(postId);
      } else {
        newIds.add(postId);
      }

      set({
        bookmarkedIds: newIds,

        bookmarkedPosts: wasBookmarked ? bookmarkedPosts.filter(p => p._id !== postId) : bookmarkedPosts
      });

      try {
        await client.post(`/user/bookmarks/${postId}`);
      } catch (error) {
        set({
          bookmarkedIds: bookmarkedIds,
          bookmarkedPosts: bookmarkedPosts
        });

        let errMessage = "Failed to update bookmark";
        if (axios.isAxiosError(error)) {
          errMessage = error.response?.data?.message || errMessage;
        }
        set({ error: errMessage });
      }
    },

    isBookmarked: (postId) => {
      return get().bookmarkedIds.has(postId);
    },

    resetBookmarks: () => {
      set({ bookmarkedIds: new Set(), bookmarkedPosts: [], error: null });
    },
  })
);
