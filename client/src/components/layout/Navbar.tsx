import { useState } from "react";
import { Link, NavLink } from "react-router";

import { Menu, X } from "lucide-react";

import { WriteButton } from "@/components/post/WriteButton";
import { ThemeToggle } from "@/components/tiptap-templates/simple/theme-toggle";
import { useAuthStore } from "@/stores/authStore";

import { AvatarDropdown } from "./UserDropDown";

const categories = [
  { to: "/category/articles", label: "All Articles" },
  { to: "/category/culture", label: "Culture" },
  { to: "/category/lifestyle", label: "Lifestyle" },
  { to: "/category/people", label: "People" },
  { to: "/category/technology", label: "Technology" },
];

export const Navbar = () => {
  const { isAuthenticated } = useAuthStore();
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  return (
    <>
      <header className="bg-background/85 border-accent sticky top-0 z-50 h-16 w-full border-b backdrop-blur-lg">
        <nav className="flex h-full items-stretch justify-between px-4 md:px-12 lg:px-24">
          <div className="flex h-full items-stretch gap-8">
            <div className="flex items-center border-none">
              <Link
                to="/"
                className="font-sentient text-primary text-2xl tracking-tight"
              >
                Scribe
              </Link>
            </div>

            <ul className="hidden h-full items-stretch md:flex">
              {categories.map((cat) => (
                <li key={cat.to} className="flex h-full items-stretch">
                  <NavLink
                    to={cat.to}
                    className={({ isActive }) =>
                      `relative flex items-center px-4 text-sm transition-colors ${
                        isActive
                          ? "text-primary bg-accent"
                          : "text-muted-foreground hover:bg-accent hover:text-foreground"
                      }`
                    }
                  >
                    {({ isActive }) => (
                      <>
                        {cat.label}
                        {isActive && (
                          <span className="bg-primary absolute bottom-0 left-0 h-0.5 w-full" />
                        )}
                      </>
                    )}
                  </NavLink>
                </li>
              ))}
            </ul>
          </div>

          <div className="flex h-full items-center gap-4">
            <div className="hidden items-center gap-4 md:flex">
              <ThemeToggle />
              <NavLink
                to="/about"
                className={({ isActive }) =>
                  `relative flex h-full items-center px-4 text-sm transition-colors ${
                    isActive
                      ? "text-primary bg-accent"
                      : "text-muted-foreground hover:bg-accent hover:text-foreground"
                  }`
                }
              >
                {({ isActive }) => (
                  <>
                    About
                    {isActive && (
                      <span className="bg-primary absolute bottom-0 left-0 h-0.5 w-full" />
                    )}
                  </>
                )}
              </NavLink>
              {isAuthenticated ? (
                <div className="flex items-center gap-6">
                  <WriteButton />
                  <AvatarDropdown />
                </div>
              ) : (
                <Link
                  to="/auth"
                  className="bg-primary text-primary-foreground hover:bg-primary/90 inline-flex items-center justify-center rounded-full px-5 py-2 text-sm font-medium transition-colors"
                >
                  Get Started
                </Link>
              )}
            </div>
            {/* for mobile */}
            <button
              className="flex items-center p-2 md:hidden"
              onClick={() => setIsMenuOpen(!isMenuOpen)}
            >
              {isMenuOpen ? <X /> : <Menu />}
            </button>
          </div>
        </nav>
      </header>

      {isMenuOpen && (
        <div className="bg-background animate-in fade-in slide-in-from-top-4 fixed inset-x-0 top-16 bottom-0 z-50 flex flex-col overflow-y-auto p-6 md:hidden">
          <nav className="font-sentient flex flex-col gap-2">
            {categories.map((cat) => (
              <NavLink
                key={cat.to}
                to={cat.to}
                onClick={() => setIsMenuOpen(false)}
                className={({ isActive }) =>
                  `rounded-lg px-4 py-3 text-lg font-medium transition-colors ${
                    isActive
                      ? "bg-accent text-primary"
                      : "text-foreground hover:bg-accent"
                  }`
                }
              >
                {cat.label}
              </NavLink>
            ))}
            <NavLink
              to="/about"
              onClick={() => setIsMenuOpen(false)}
              className={({ isActive }) =>
                `rounded-lg px-4 py-3 text-lg font-medium transition-colors ${
                  isActive
                    ? "bg-accent text-primary"
                    : "text-foreground hover:bg-accent"
                }`
              }
            >
              About
            </NavLink>

            <div className="bg-border my-2 h-px w-full" />

            <div className="flex items-center justify-between px-4">
              <span className="text-sm font-medium">Appearance</span>
              <ThemeToggle />
            </div>

            {!isAuthenticated ? (
              <Link
                to="/auth"
                onClick={() => setIsMenuOpen(false)}
                className="bg-primary text-primary-foreground mt-4 flex h-12 items-center justify-center rounded-lg text-center font-medium"
              >
                Get Started
              </Link>
            ) : (
              <div className="mt-4 flex flex-col gap-4">
                <WriteButton className="flex h-12 w-full justify-center px-0!" />
                <Link
                  to={`/profile/${useAuthStore.getState().userData?.username}`}
                  onClick={() => setIsMenuOpen(false)}
                  className="border-border flex h-12 items-center justify-center rounded-lg border font-medium"
                >
                  Profile
                </Link>
              </div>
            )}
          </nav>
        </div>
      )}
    </>
  );
};
