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
import { useUIStore } from "./stores/uiStore";

function App() {
  const theme = useUIStore((state) => state.theme);
  const navigate = useNavigate();

  useEffect(() => {
    useAuthStore.getState().checkAuth();
  }, []);
  return (
    <>
      <Toaster
        theme={theme}
        position="top-right"
        closeButton
        toastOptions={{
          style: {
            fontFamily: "var(--font-sentient)",
            borderRadius: "0.5rem",
          },
          classNames: {
            toast:
              "group toast bg-background text-foreground border-border shadow-lg",
            description: "text-muted-foreground",
            actionButton: "bg-primary text-primary-foreground",
            cancelButton: "bg-muted text-muted-foreground",
            closeButton: "bg-background text-foreground border-border",
          },
        }}
      />
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
