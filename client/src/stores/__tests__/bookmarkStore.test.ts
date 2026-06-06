import { act, renderHook } from "@testing-library/react";
import { afterEach, describe, expect, it, vi } from "vitest";

import { useBookmarkStore } from "../bookmarkStore";
import client from "@/api/client";

vi.mock("@/api/client", () => ({
  default: {
    get: vi.fn(),
    post: vi.fn(),
  },
}));

const mockPost = {
  _id: "post-1",
  title: "Test Post",
  summary: "A summary",
  category: "Technology",
  author: { _id: "user-1", username: "author" },
  updatedAt: "2024-01-15T00:00:00Z",
};

describe("bookmarkStore", () => {
  afterEach(() => {
    act(() => {
      useBookmarkStore.getState().resetBookmarks();
    });
    vi.clearAllMocks();
  });

  it("starts with empty bookmarks", () => {
    const state = useBookmarkStore.getState();
    expect(state.bookmarkedIds.size).toBe(0);
    expect(state.bookmarkedPosts).toEqual([]);
  });

  it("toggleBookmark adds a bookmark optimistically", async () => {
    vi.mocked(client.post).mockResolvedValueOnce({});

    await act(async () => {
      await useBookmarkStore.getState().toggleBookmark("post-1");
    });

    expect(useBookmarkStore.getState().bookmarkedIds.has("post-1")).toBe(true);
  });

  it("toggleBookmark removes a bookmark optimistically", async () => {
    act(() => {
      useBookmarkStore.setState({
        bookmarkedIds: new Set(["post-1"]),
        bookmarkedPosts: [mockPost],
      });
    });

    vi.mocked(client.post).mockResolvedValueOnce({});

    await act(async () => {
      await useBookmarkStore.getState().toggleBookmark("post-1");
    });

    expect(useBookmarkStore.getState().bookmarkedIds.has("post-1")).toBe(false);
    expect(useBookmarkStore.getState().bookmarkedPosts).toEqual([]);
  });

  it("toggleBookmark rolls back on API failure", async () => {
    vi.mocked(client.post).mockRejectedValueOnce(new Error("Network error"));

    await act(async () => {
      await useBookmarkStore.getState().toggleBookmark("post-1");
    });

    expect(useBookmarkStore.getState().bookmarkedIds.has("post-1")).toBe(false);
    expect(useBookmarkStore.getState().error).toBe("Failed to update bookmark");
  });

  it("isBookmarked returns correct status", () => {
    act(() => {
      useBookmarkStore.setState({ bookmarkedIds: new Set(["post-1"]) });
    });

    expect(useBookmarkStore.getState().isBookmarked("post-1")).toBe(true);
    expect(useBookmarkStore.getState().isBookmarked("post-2")).toBe(false);
  });

  it("resetBookmarks clears everything", () => {
    act(() => {
      useBookmarkStore.setState({
        bookmarkedIds: new Set(["post-1"]),
        bookmarkedPosts: [mockPost],
        error: "some error",
      });
    });

    act(() => {
      useBookmarkStore.getState().resetBookmarks();
    });

    const state = useBookmarkStore.getState();
    expect(state.bookmarkedIds.size).toBe(0);
    expect(state.bookmarkedPosts).toEqual([]);
    expect(state.error).toBeNull();
  });
});
