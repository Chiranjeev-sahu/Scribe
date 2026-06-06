import { act } from "@testing-library/react";
import { afterEach, describe, expect, it, vi } from "vitest";

import { usePostsStore } from "../postsStore";
import client from "@/api/client";

vi.mock("@/api/client", () => ({
  default: {
    get: vi.fn(),
  },
}));

const mockPostsData = {
  posts: [
    {
      _id: "1",
      title: "Post One",
      category: "Technology",
      author: { _id: "u1", username: "author1" },
      updatedAt: "2024-01-01T00:00:00Z",
    },
    {
      _id: "2",
      title: "Post Two",
      category: "Culture",
      author: { _id: "u2", username: "author2" },
      updatedAt: "2024-02-01T00:00:00Z",
    },
  ],
  pagination: {
    currentPage: 1,
    totalPages: 3,
    totalPosts: 30,
  },
};

describe("postsStore", () => {
  afterEach(() => {
    act(() => {
      usePostsStore.getState().clearPosts();
    });
    vi.clearAllMocks();
  });

  it("starts with empty state", () => {
    const state = usePostsStore.getState();
    expect(state.posts).toEqual([]);
    expect(state.loading).toBe(false);
    expect(state.error).toBeNull();
  });

  it("fetchPosts populates posts and pagination", async () => {
    vi.mocked(client.get).mockResolvedValueOnce({
      data: { data: mockPostsData },
    });

    await act(async () => {
      await usePostsStore.getState().fetchPosts();
    });

    const state = usePostsStore.getState();
    expect(state.posts).toHaveLength(2);
    expect(state.posts[0].title).toBe("Post One");
    expect(state.pagination?.totalPages).toBe(3);
  });

  it("fetchPosts appends posts on page 2", async () => {
    vi.mocked(client.get).mockResolvedValueOnce({
      data: { data: mockPostsData },
    });
    await act(async () => {
      await usePostsStore.getState().fetchPosts(1);
    });

    const page2Data = {
      posts: [{ _id: "3", title: "Post Three", category: "Lifestyle", author: { _id: "u3", username: "author3" }, updatedAt: "2024-03-01T00:00:00Z" }],
      pagination: { currentPage: 2, totalPages: 3, totalPosts: 30 },
    };
    vi.mocked(client.get).mockResolvedValueOnce({
      data: { data: page2Data },
    });

    await act(async () => {
      await usePostsStore.getState().fetchPosts(2);
    });

    const state = usePostsStore.getState();
    expect(state.posts).toHaveLength(3);
    expect(state.posts[2].title).toBe("Post Three");
  });

  it("setCategory clears posts and fetches new category", async () => {
    vi.mocked(client.get).mockResolvedValueOnce({
      data: { data: { posts: [], pagination: { currentPage: 1, totalPages: 1, totalPosts: 0 } } },
    });

    await act(async () => {
      await usePostsStore.getState().setCategory("Technology");
    });

    expect(usePostsStore.getState().currentCategory).toBe("Technology");
  });

  it("clearPosts resets everything", () => {
    act(() => {
      usePostsStore.setState({
        posts: mockPostsData.posts as any,
        pagination: mockPostsData.pagination as any,
        currentCategory: "Technology",
        error: "some error",
      });
    });

    act(() => {
      usePostsStore.getState().clearPosts();
    });

    const state = usePostsStore.getState();
    expect(state.posts).toEqual([]);
    expect(state.pagination).toBeNull();
    expect(state.currentCategory).toBeNull();
    expect(state.error).toBeNull();
  });
});
