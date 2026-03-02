import { useEffect } from "react";
import { ErrorBoundary } from "react-error-boundary";
import { Route, Routes, useNavigate } from "react-router";

import { Toaster } from "sonner";

import { ProtectedRoute } from "@/components/auth/ProtectedRoute";
import { ErrorFallback } from "@/components/ErrorFallback";
import { MainLayout } from "@/components/layout/MainLayout";
import { PostDetailPage } from "@/components/post/PostDetailPage";
import { About } from "@/pages/About";
import { Auth } from "@/pages/Auth";
import { CategoryPage } from "@/pages/CategoryPage";
import { Homepage } from "@/pages/Homepage";
import { WritePage } from "@/pages/WritePage";

import { ProfilePage } from "./pages/ProfilePage";
import { useAuthStore } from "./stores/authStore";

function App() {
  const navigate = useNavigate();

  useEffect(() => {
    useAuthStore.getState().checkAuth();
  }, []);
  return (
    <>
      <Toaster />
      <ErrorBoundary
        FallbackComponent={ErrorFallback}
        onReset={() => navigate("/")}
      >
        <Routes>
          <Route path="/">
            <Route element={<MainLayout />}>
              <Route index element={<Homepage />} />
              <Route
                path="/category/:categoryType"
                element={<CategoryPage />}
              />
              <Route path="/about" element={<About />} />
            </Route>
            <Route path="/post/:id" element={<PostDetailPage />} />
            <Route element={<ProtectedRoute />}>
              <Route path="/write/:id" element={<WritePage />} />
            </Route>
            <Route path="/auth" element={<Auth />} />
            <Route path="/profile/:username" element={<ProfilePage />} />
          </Route>
        </Routes>
      </ErrorBoundary>
    </>
  );
}
export default App;
