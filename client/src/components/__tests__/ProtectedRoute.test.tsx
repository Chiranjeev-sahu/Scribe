import { render, screen } from "@testing-library/react";
import { MemoryRouter } from "react-router";
import { afterEach, describe, expect, it } from "vitest";

import { ProtectedRoute } from "@/components/auth/ProtectedRoute";
import { useAuthStore } from "@/stores/authStore";

const MockChildren = () => <div>Protected Content</div>;

describe("ProtectedRoute", () => {
  afterEach(() => {
    useAuthStore.setState({
      userData: null,
      isAuthenticated: false,
      loading: false,
    });
  });

  it("does not render children when loading", () => {
    useAuthStore.setState({ loading: true });

    render(
      <MemoryRouter>
        <ProtectedRoute>
          <MockChildren />
        </ProtectedRoute>
      </MemoryRouter>
    );

    expect(screen.queryByText("Protected Content")).not.toBeInTheDocument();
  });

  it("redirects to /auth when user is not authenticated", () => {
    useAuthStore.setState({ loading: false, userData: null });

    render(
      <MemoryRouter initialEntries={["/"]}>
        <ProtectedRoute>
          <MockChildren />
        </ProtectedRoute>
      </MemoryRouter>
    );

    expect(screen.queryByText("Protected Content")).not.toBeInTheDocument();
  });

  it("renders children when user is authenticated", () => {
    useAuthStore.setState({
      loading: false,
      userData: {
        _id: "1",
        username: "testuser",
        email: "test@example.com",
      },
    });

    render(
      <MemoryRouter>
        <ProtectedRoute>
          <MockChildren />
        </ProtectedRoute>
      </MemoryRouter>
    );

    expect(screen.getByText("Protected Content")).toBeInTheDocument();
  });
});
