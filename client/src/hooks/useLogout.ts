import { useNavigate } from "react-router";
import { useAuthStore } from "@/stores/authStore";

export const useLogout = () => {
  const logout = useAuthStore((state) => state.logout);
  const navigate = useNavigate();

  const handleLogout = async () => {
    await logout();
    navigate("/");
  };

  return handleLogout;
};
