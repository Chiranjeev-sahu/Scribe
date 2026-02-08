import { Link } from "react-router";

export const Navbar = () => {
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
          <Link
            to="/auth"
            className="bg-chart-2 text-primary-foreground hover:bg-primary/90 inline-flex items-center justify-center rounded-md px-4 py-2 text-sm font-medium"
          >
            Get Started
          </Link>
        </div>
      </nav>
    </header>
  );
};
