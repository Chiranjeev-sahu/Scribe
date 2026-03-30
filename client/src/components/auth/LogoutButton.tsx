import { LogOut } from "lucide-react";

import { useLogout } from "@/hooks/useLogout";
import { cn } from "@/lib/utils/utils";

interface LogoutButtonProps {
  className?: string;
  showText?: boolean;
}

export const LogoutButton = ({
  className,
  showText = false,
}: LogoutButtonProps) => {
  const logout = useLogout();

  return (
    <button
      onClick={logout}
      className={cn(
        "flex items-center gap-2 rounded-md border border-red-200 p-2 text-red-600 transition-colors hover:bg-red-50 hover:text-red-700",
        className
      )}
      title="Log Out"
    >
      <LogOut className="h-4 w-4" />
      {showText && <span className="text-sm font-medium">Log out</span>}
    </button>
  );
};
