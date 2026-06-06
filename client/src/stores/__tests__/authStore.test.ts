import { act, renderHook } from "@testing-library/react";
import { afterEach, describe, expect, it, vi } from "vitest";

import { useAuthStore } from "../authStore";
import client from "@/api/client";

vi.mock("@/api/client", () => ({
  default: {
    post: vi.fn(),
    get: vi.fn(),
    put: vi.fn(),
  },
}));

const mockUser = {
  _id: "123",
  username: "testuser",
  email: "test@example.com",
};

describe("authStore", () => {
  afterEach(() => {
    act(() => {
      useAuthStore.getState().logout();
    });
    vi.clearAllMocks();
  });

  it("starts with unauthenticated state", () => {
    const state = useAuthStore.getState();
    expect(state.isAuthenticated).toBe(false);
    expect(state.userData).toBeNull();
    expect(state.loading).toBe(false);
    expect(state.error).toBeNull();
  });

  it("login sets userData and isAuthenticated on success", async () => {
    vi.mocked(client.post).mockResolvedValueOnce({
      data: { data: { user: mockUser } },
    });

    await act(async () => {
      await useAuthStore.getState().login("testuser", "password123");
    });

    const state = useAuthStore.getState();
    expect(state.isAuthenticated).toBe(true);
    expect(state.userData).toEqual(mockUser);
    expect(state.error).toBeNull();
  });

  it("login sets error on failure", async () => {
    vi.mocked(client.post).mockRejectedValueOnce({
      isAxiosError: true,
      response: { data: { message: "Invalid credentials" } },
    });

    await act(async () => {
      await useAuthStore.getState().login("testuser", "wrongpassword");
    });

    const state = useAuthStore.getState();
    expect(state.isAuthenticated).toBe(false);
    expect(state.error).toBe("Invalid credentials");
  });

  it("signup creates user and sets authenticated", async () => {
    vi.mocked(client.post).mockResolvedValueOnce({
      data: { data: { user: mockUser } },
    });

    await act(async () => {
      await useAuthStore
        .getState()
        .signup("testuser", "test@example.com", "password123");
    });

    const state = useAuthStore.getState();
    expect(state.isAuthenticated).toBe(true);
    expect(state.userData?.username).toBe("testuser");
  });

  it("logout clears all auth state", async () => {
    vi.mocked(client.post).mockResolvedValueOnce({});
    vi.mocked(client.post).mockResolvedValueOnce({
      data: { data: { user: mockUser } },
    });

    await act(async () => {
      await useAuthStore.getState().login("testuser", "password123");
    });

    await act(async () => {
      await useAuthStore.getState().logout();
    });

    const state = useAuthStore.getState();
    expect(state.isAuthenticated).toBe(false);
    expect(state.userData).toBeNull();
    expect(state.error).toBeNull();
  });

  it("clearError resets the error field", () => {
    act(() => {
      useAuthStore.setState({ error: "Something went wrong" });
    });

    act(() => {
      useAuthStore.getState().clearError();
    });

    expect(useAuthStore.getState().error).toBeNull();
  });
});
