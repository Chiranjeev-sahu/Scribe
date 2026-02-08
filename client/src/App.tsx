import { Route, Routes } from "react-router";

import { ProtectedRoute } from "./components/auth/ProtectedRoute";
import { MainLayout } from "./components/layout/MainLayout";
import { PostDetailPage } from "./components/post/PostDetailPage";
import { About } from "./pages/About";
import { Auth } from "./pages/Auth";
import { CategoryPage } from "./pages/CategoryPage";
import { Homepage } from "./pages/Homepage";
import { WritePage } from "./pages/WritePage";

function App() {
  return (
    <Routes>
      <Route path="/">
        <Route element={<MainLayout />}>
          <Route index element={<Homepage />} />
          <Route path="/category/:categoryType" element={<CategoryPage />} />
          <Route path="/about" element={<About />} />
          <Route path="/post/:id" element={<PostDetailPage />} />
        </Route>
        <Route element={<ProtectedRoute />}>
          <Route path="/write" element={<WritePage />} />
        </Route>
        <Route path="/auth" element={<Auth />} />
      </Route>
    </Routes>
  );
}
export default App;
