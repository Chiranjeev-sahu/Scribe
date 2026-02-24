/**
 * ═══════════════════════════════════════════════════════════════
 *  BOOKMARKS STORE — Design Notes & Tips
 * ═══════════════════════════════════════════════════════════════
 *
 *  PURPOSE:
 *    Tracks which posts the current user has bookmarked.
 *    Used by PostCard (bookmark icon), PostDetailPage (bookmark button),
 *    and the Bookmarks page (listing all saved posts).
 *
 *  DESIGN TIPS:
 *
 *  1. Two pieces of data, two use cases:
 *     - `bookmarkedIds` (Set<string>): For QUICK lookups — "Is this post
 *        bookmarked?" Used by every PostCard on the feed. Must be O(1).
 *     - `bookmarkedPosts` (Post[]): For the BOOKMARKS PAGE — the full
 *        post data. Only fetched when the user visits that page.
 *
 *  2. Optimistic UI for toggleBookmark:
 *     When the user clicks the bookmark icon, update the local state
 *     IMMEDIATELY (add/remove from bookmarkedIds), then fire the API
 *     call in the background. If the API fails, revert the local state.
 *     This makes the UI feel instant.
 *
 *  3. When to hydrate bookmarkedIds:
 *     Option A: On login/checkAuth success. The /users/me response could
 *               include the bookmarks array of IDs.
 *     Option B: Separate call to /users/me/bookmarks on app boot.
 *     Option A is more efficient. But your current /me endpoint doesn't
 *     return bookmarks. You might need to update getMe on the backend,
 *     or just go with Option B.
 *
 *  4. Only authenticated users can bookmark.
 *     If `isAuthenticated` is false, the toggle should either:
 *     a) Do nothing and show a "Login to bookmark" tooltip
 *     b) Redirect to /auth
 *     Handle this in the COMPONENT, not in the store.
 *
 * ═══════════════════════════════════════════════════════════════
 */
import { create } from "zustand";

// ── Types ──────────────────────────────────────────────────────

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
  isBookmarked: (postId: string) => boolean;
  resetBookmarks: () => void;
}

// ── Store ──────────────────────────────────────────────────────

export const useBookmarkStore = create<BookmarkState & BookmarkActions>()(
  (set, get) => ({
    // ── Initial State ──
    bookmarkedIds: new Set<string>(),
    bookmarkedPosts: [],
    loading: false,
    error: null,

    // ── Actions ──

    fetchBookmarks: async () => {
      /**
       * TODO: Implement fetchBookmarks
       *
       * 1. Set loading = true, error = null
       * 2. Make a GET request to `/users/me/bookmarks`
       *    - Requires authentication (cookie sent automatically)
       * 3. On SUCCESS:
       *    - The response is an array of post objects (BookmarkedPost[])
       *    - Set bookmarkedPosts from the response
       *    - Build bookmarkedIds Set from the post IDs:
       *      new Set(posts.map(p => p._id))
       *    - Set loading = false
       * 4. On FAILURE:
       *    - Set error message, loading = false
       *
       * THINK ABOUT:
       *  - When does this get called?
       *    a) Option: On app boot (inside a useEffect that runs after checkAuth)
       *    b) Option: Only when user visits the Bookmarks page
       *    c) Option: On app boot, fetch ONLY the IDs (lighter), then fetch
       *       full posts lazily when the Bookmarks page loads.
       *    Consider which option is best for your UX.
       */
    },

    toggleBookmark: async (postId) => {
      /**
       * TODO: Implement toggleBookmark (with optimistic UI)
       *
       * 1. Check current state: const wasBookmarked = get().bookmarkedIds.has(postId)
       *
       * 2. OPTIMISTIC UPDATE (before API call):
       *    - Create a new Set from the current bookmarkedIds
       *    - If wasBookmarked: delete postId from the new Set
       *    - If !wasBookmarked: add postId to the new Set
       *    - set({ bookmarkedIds: newSet })
       *    NOTE: You must create a NEW Set — mutating the existing one won't
       *          trigger a re-render because Zustand uses reference equality.
       *
       * 3. Make a POST request to `/users/me/bookmarks/${postId}`
       *    - This is the toggle endpoint on your backend
       *
       * 4. On FAILURE (revert the optimistic update):
       *    - Create another new Set
       *    - If wasBookmarked: ADD postId back
       *    - If !wasBookmarked: DELETE postId
       *    - set({ bookmarkedIds: revertedSet })
       *    - Optionally show a toast: "Failed to update bookmark"
       *
       * THINK ABOUT:
       *  - Should you also update bookmarkedPosts[]? If the user is ON
       *    the bookmarks page and unbookmarks something, it should disappear
       *    from the list. Filter it out optimistically too.
       *  - What about the reverse — bookmarking from the feed? You don't
       *    have the full post data to add to bookmarkedPosts. That's fine —
       *    just update bookmarkedIds. The bookmarks page will re-fetch.
       */
    },

    isBookmarked: (postId) => {
      /**
       * TODO: Implement isBookmarked
       *
       * 1. return get().bookmarkedIds.has(postId)
       *
       * NOTE: This is a "selector-like" helper. Components call it like:
       *   const bookmarked = useBookmarkStore(state => state.isBookmarked(postId))
       *
       * BUT WAIT — that won't work as expected with Zustand's selector!
       * A function reference doesn't change, so the component won't re-render
       * when bookmarkedIds changes.
       *
       * BETTER PATTERN in the component:
       *   const bookmarkedIds = useBookmarkStore(state => state.bookmarkedIds)
       *   const isBookmarked = bookmarkedIds.has(postId)
       *
       * So this helper is more useful for NON-REACTIVE contexts (like inside
       * other store actions). Keep it, but understand its limitation.
       */
      return false; // placeholder
    },

    resetBookmarks: () => {
      /**
       * TODO: Implement resetBookmarks
       *
       * set({ bookmarkedIds: new Set(), bookmarkedPosts: [], error: null })
       *
       * WHEN TO CALL:
       *  - When the user logs out (called from authStore.logout)
       *  - Bookmarks are user-specific data — must be wiped on logout
       */
    },
  })
);
