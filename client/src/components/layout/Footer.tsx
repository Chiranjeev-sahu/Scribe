import { Link } from "react-router";

import { Button } from "../ui/button";

export const Footer = () => {
  return (
    <footer className="bottom-0 flex h-fit w-full flex-col">
      <section
        aria-label="Call to action"
        className="bg-chart-2 flex flex-col items-center justify-center gap-6 py-28 text-white"
      >
        <div className="flex flex-col items-center gap-3">
          <h3 className="text-secondary font-sentient max-w-2xl text-center text-4xl">
            Join our community of writers and share your stories
          </h3>
          <p className="text-secondary/80 max-w-xl text-center text-lg">
            Connect with readers, explore diverse perspectives, and make your
            voice heard
          </p>
        </div>
        <Button variant="secondary" size="lg">
          <Link to="/signup">Get Started</Link>
        </Button>
      </section>

      <section
        aria-label="Footer links"
        className="bg-background text-foreground py-12"
      >
        <div className="grid grid-cols-4 gap-8 px-24">
          <div className="flex">
            <Link
              to="/"
              className="font-sentient text-chart-2 text-2xl tracking-tight transition-opacity hover:opacity-80"
            >
              Scribe
            </Link>
          </div>

          <nav aria-label="Pages">
            <h4 className="mb-4 font-semibold">Pages</h4>
            <ul className="flex flex-col gap-2">
              <li>
                <Link
                  to="/"
                  className="text-muted-foreground hover:text-foreground text-sm transition-colors"
                >
                  Home
                </Link>
              </li>
              <li>
                <Link
                  to="/about"
                  className="text-muted-foreground hover:text-foreground text-sm transition-colors"
                >
                  About
                </Link>
              </li>
              <li>
                <Link
                  to="/signup"
                  className="text-muted-foreground hover:text-foreground text-sm transition-colors"
                >
                  Get Started
                </Link>
              </li>
            </ul>
          </nav>

          <nav aria-label="Categories">
            <h4 className="mb-4 font-semibold">Categories</h4>
            <ul className="flex flex-col gap-2">
              <li>
                <Link
                  to="/category/articles"
                  className="text-muted-foreground hover:text-foreground text-sm transition-colors"
                >
                  All Articles
                </Link>
              </li>
              <li>
                <Link
                  to="/category/culture"
                  className="text-muted-foreground hover:text-foreground text-sm transition-colors"
                >
                  Culture
                </Link>
              </li>
              <li>
                <Link
                  to="/category/lifestyle"
                  className="text-muted-foreground hover:text-foreground text-sm transition-colors"
                >
                  Lifestyle
                </Link>
              </li>
              <li>
                <Link
                  to="/category/people"
                  className="text-muted-foreground hover:text-foreground text-sm transition-colors"
                >
                  People
                </Link>
              </li>
              <li>
                <Link
                  to="/category/technology"
                  className="text-muted-foreground hover:text-foreground text-sm transition-colors"
                >
                  Technology
                </Link>
              </li>
            </ul>
          </nav>

          <div>
            <h4 className="mb-4 font-semibold">Connect</h4>
            <ul className="flex flex-col gap-2">
              <li>
                <a
                  href="mailto:lmao@scribe.blog"
                  className="text-muted-foreground hover:text-foreground text-sm transition-colors"
                >
                  Email
                </a>
              </li>
              <li>
                <a
                  href="https://x.com/chiruexe"
                  className="text-muted-foreground hover:text-foreground text-sm transition-colors"
                >
                  Twitter
                </a>
              </li>
              <li>
                <a
                  href="https://github.com/Chiranjeev-sahu"
                  className="text-muted-foreground hover:text-foreground text-sm transition-colors"
                >
                  GitHub
                </a>
              </li>
            </ul>
          </div>
        </div>
      </section>

      {/* Copyright Section */}
      <section className="bg-background border-border text-muted-foreground flex items-center justify-center border-t px-24 py-6 text-sm">
        <p>© {new Date().getFullYear()} Scribe. All rights reserved.</p>
      </section>
    </footer>
  );
};
