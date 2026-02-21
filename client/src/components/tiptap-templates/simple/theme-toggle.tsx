import { useEffect, useState } from "react";

// --- Icons ---
import { MoonStarIcon } from "@/components/tiptap-icons/moon-star-icon";
import { SunIcon } from "@/components/tiptap-icons/sun-icon";
import { Button } from "@/components/tiptap-ui-primitive/button";

export function ThemeToggle() {
  const [isDarkMode, setIsDarkMode] = useState<boolean>(false);
  //state change
  useEffect(() => {
    const savedTheme = localStorage.getItem("theme");
    if (savedTheme === "dark" || savedTheme === "light") {
      setIsDarkMode(savedTheme === "dark");
    } else {
      const OsTheme = window.matchMedia("(prefers-color-scheme: dark)").matches;
      setIsDarkMode(OsTheme);
    }
  }, []);
  //actual classList change
  useEffect(() => {
    document.documentElement.classList.toggle("dark", isDarkMode);
    localStorage.setItem("theme", isDarkMode ? "dark" : "light");
  }, [isDarkMode]);

  const toggleDarkMode = () => setIsDarkMode((isDark) => !isDark);

  return (
    <Button
      onClick={toggleDarkMode}
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
