import { useState } from "react";
import { Link, NavLink } from "react-router";

import { Menu, X } from "lucide-react";
import { AnimatePresence, motion } from "motion/react";

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

  const menuVariants = {
    initial: { opacity: 0, y: -10 },
    animate: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.15,
        when: "beforeChildren",
        staggerChildren: 0.03,
        delayChildren: 0.1,
      },
    },
    exit: {
      opacity: 0,
      y: -10,
      transition: {
        duration: 0.15,
        when: "afterChildren",
        staggerChildren: 0.03,
        staggerDirection: -1,
      },
    },
  };

  const itemVariants = {
    initial: { opacity: 0, x: -10 },
    animate: { opacity: 1, x: 0 },
    exit: { opacity: 0, x: -10 },
  };

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
                          <motion.span
                            layoutId="underline"
                            className="bg-primary absolute bottom-0 left-0 h-0.5 w-full"
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            transition={{
                              type: "spring",
                              stiffness: 400,
                              damping: 30,
                            }}
                          />
                        )}
                      </>
                    )}
                  </NavLink>
                </li>
              ))}
            </ul>
          </div>

          <div className="flex h-full items-center gap-4">
            <div className="hidden h-full items-center gap-4 md:flex">
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
                      <motion.span
                        layoutId="underline"
                        className="bg-primary absolute bottom-0 left-0 h-0.5 w-full"
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        transition={{
                          type: "spring",
                          stiffness: 380,
                          damping: 30,
                        }}
                      />
                    )}
                  </>
                )}
              </NavLink>
              {isAuthenticated ? (
                <div className="flex items-center gap-6">
                  <motion.div
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                  >
                    <WriteButton />
                  </motion.div>
                  <AvatarDropdown />
                </div>
              ) : (
                <motion.div
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                >
                  <Link
                    to="/auth"
                    className="bg-primary text-primary-foreground hover:bg-primary/90 inline-flex items-center justify-center rounded-full px-5 py-2 text-sm font-medium transition-colors"
                  >
                    Get Started
                  </Link>
                </motion.div>
              )}
            </div>
            {/* for mobile */}
            <button
              className="flex items-center p-2 md:hidden"
              onClick={() => setIsMenuOpen(!isMenuOpen)}
            >
              <AnimatePresence mode="wait">
                <motion.div
                  key={isMenuOpen ? "close" : "open"}
                  initial={{ opacity: 0, rotate: -90 }}
                  animate={{ opacity: 1, rotate: 0 }}
                  exit={{ opacity: 0, rotate: 90 }}
                  transition={{ duration: 0.15 }}
                >
                  {isMenuOpen ? <X /> : <Menu />}
                </motion.div>
              </AnimatePresence>
            </button>
          </div>
        </nav>
      </header>

      <AnimatePresence>
        {isMenuOpen && (
          <motion.div
            variants={menuVariants}
            initial="initial"
            animate="animate"
            exit="exit"
            className="bg-background/98 fixed inset-x-0 top-16 bottom-0 z-50 flex flex-col overflow-y-auto p-6 md:hidden"
          >
            <nav className="font-sentient flex flex-col gap-2">
              {categories.map((cat) => (
                <motion.div key={cat.to} variants={itemVariants}>
                  <NavLink
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
                </motion.div>
              ))}
              <motion.div variants={itemVariants}>
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
              </motion.div>

              <motion.div
                variants={itemVariants}
                className="bg-border my-2 h-px w-full"
              />

              <motion.div
                variants={itemVariants}
                className="flex items-center justify-between px-4"
              >
                <span className="text-sm font-medium">Appearance</span>
                <ThemeToggle />
              </motion.div>

              {!isAuthenticated ? (
                <motion.div variants={itemVariants}>
                  <Link
                    to="/auth"
                    onClick={() => setIsMenuOpen(false)}
                    className="bg-primary text-primary-foreground mt-4 flex h-12 items-center justify-center rounded-lg text-center font-medium"
                  >
                    Get Started
                  </Link>
                </motion.div>
              ) : (
                <motion.div
                  variants={itemVariants}
                  className="mt-4 flex flex-col gap-4"
                >
                  <WriteButton className="flex h-12 w-full justify-center px-0!" />
                  <Link
                    to={`/profile/${useAuthStore.getState().userData?.username}`}
                    onClick={() => setIsMenuOpen(false)}
                    className="border-border flex h-12 items-center justify-center rounded-lg border font-medium"
                  >
                    Profile
                  </Link>
                </motion.div>
              )}
            </nav>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
};
