import { Link } from "react-router";

import { WriteButton } from "@/components/post/WriteButton";
import { ThemeToggle } from "@/components/tiptap-templates/simple/theme-toggle";
import { useAuthStore } from "@/stores/authStore";

import { AvatarDropdown } from "./UserDropDown";

export const Navbar = () => {
  const { isAuthenticated } = useAuthStore();
  return (
    <header className="bg-background/95 sticky top-0 z-50 h-16 w-full border-b border-gray-100 backdrop-blur-sm">
      <nav className="flex h-full items-stretch justify-between px-24">
        <div className="flex h-full items-stretch gap-8">
          <div className="flex items-center border-none">
            <Link
              to="/"
              className="font-sentient text-chart-2 text-2xl tracking-tight"
            >
              Scribe
            </Link>
          </div>

          <ul className="flex h-full items-stretch">
            <li className="flex h-full items-stretch">
              <Link
                to="/category/articles"
                className="flex items-center px-4 text-sm transition-colors hover:bg-gray-100"
              >
                All articles
              </Link>
            </li>
            <li className="flex h-full items-stretch">
              <Link
                to="/category/culture"
                className="flex items-center px-4 text-sm transition-colors hover:bg-gray-100"
              >
                Culture
              </Link>
            </li>
            <li className="flex h-full items-stretch">
              <Link
                to="/category/lifestyle"
                className="flex items-center px-4 text-sm transition-colors hover:bg-gray-100"
              >
                Lifestyle
              </Link>
            </li>
            <li className="flex h-full items-stretch">
              <Link
                to="/category/people"
                className="flex items-center px-4 text-sm transition-colors hover:bg-gray-100"
              >
                People
              </Link>
            </li>
            <li className="flex h-full items-stretch">
              <Link
                to="/category/technology"
                className="flex items-center px-4 text-sm transition-colors hover:bg-gray-100"
              >
                Technology
              </Link>
            </li>
          </ul>
        </div>

        <div className="flex h-full items-center gap-4">
          <ThemeToggle />
          <Link
            to="/about"
            className="flex h-full items-center px-4 text-sm transition-colors hover:bg-gray-100 dark:hover:bg-gray-800"
          >
            About
          </Link>
          {isAuthenticated ? (
            <div className="flex items-center gap-6">
              <WriteButton />
              <AvatarDropdown />
            </div>
          ) : (
            <Link
              to="/auth"
              className="bg-chart-2 text-primary-foreground hover:bg-chart-2/90 inline-flex items-center justify-center rounded-full px-5 py-2 text-sm font-medium transition-colors"
            >
              Get Started
            </Link>
          )}
        </div>
      </nav>
    </header>
  );
};
