import { Link, useNavigate } from "react-router";

import { SquarePen } from "lucide-react";

import { useAuthStore } from "@/stores/authStore";
import { useDraftsStore } from "@/stores/draftsStore";

import { AvatarDropdown } from "./UserDropDown";

export const Navbar = () => {
  const navigate = useNavigate();
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
          <Link
            to="/about"
            className="flex h-full items-center px-4 text-sm transition-colors hover:bg-gray-100"
          >
            About
          </Link>
          {isAuthenticated ? (
            <div className="flex items-center gap-6">
              <button
                onClick={async () => {
                  const id = await useDraftsStore.getState().createNewDraft();
                  if (id) navigate(`/write/${id}`);
                  console.log("Create draft clicked!");
                }}
                className="text-foreground group flex items-center gap-2"
              >
                <SquarePen className="h-4 w-4 font-medium transition-transform duration-500 ease-in-out group-hover:scale-110" />
                <span className="text-sm font-medium">Write</span>
              </button>

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
