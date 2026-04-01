// --- Icons ---
import { MoonStarIcon } from "@/components/tiptap-icons/moon-star-icon";
import { SunIcon } from "@/components/tiptap-icons/sun-icon";
import { Button } from "@/components/tiptap-ui-primitive/button";
import { useUIStore } from "@/stores/uiStore";

export function ThemeToggle() {
  const { theme, toggleTheme } = useUIStore();
  const isDarkMode = theme === "dark";

  return (
    <Button
      onClick={toggleTheme}
      aria-label={`Switch to ${isDarkMode ? "light" : "dark"} mode`}
      variant="ghost"
    >
      {isDarkMode ? (
        <MoonStarIcon className="tiptap-button-icon" />
      ) : (
        <SunIcon className="tiptap-button-icon" />
      )}
    </Button>
  );
}
