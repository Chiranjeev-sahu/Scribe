import { Link } from "react-router";

import { Button } from "../ui/button";

const linkClass =
  "text-muted-foreground hover:text-foreground text-sm transition-colors";

const footerSections = [
  {
    title: "Pages",
    links: [
      { to: "/", label: "Home" },
      { to: "/about", label: "About" },
      { to: "/auth", label: "Get Started" },
    ],
  },
  {
    title: "Categories",
    links: [
      { to: "/category/articles", label: "All Articles" },
      { to: "/category/culture", label: "Culture" },
      { to: "/category/lifestyle", label: "Lifestyle" },
      { to: "/category/people", label: "People" },
      { to: "/category/technology", label: "Technology" },
    ],
  },
];

const socialLinks = [
  { href: "mailto:lmao@scribe.blog", label: "Email" },
  { href: "https://x.com/chiruexe", label: "Twitter" },
  { href: "https://github.com/Chiranjeev-sahu", label: "GitHub" },
];

export const Footer = () => {
  return (
    <footer className="bottom-0 flex h-fit w-full flex-col">
      <section
        aria-label="Call to action"
        className="bg-primary flex flex-col items-center justify-center gap-6 py-28 text-white"
      >
        <div className="flex flex-col items-center gap-3">
          <h3 className="text-secondary font-sentient max-w-2xl text-center text-3xl md:text-4xl">
            Join our community of writers and share your stories
          </h3>
          <p className="text-secondary/80 max-w-xl text-center text-base md:text-lg">
            Connect with readers, explore diverse perspectives, and make your
            voice heard
          </p>
        </div>
        <Button variant="secondary" size="lg">
          <Link to="/auth">Get Started</Link>
        </Button>
      </section>

      <section
        aria-label="Footer links"
        className="bg-background text-foreground py-12"
      >
        <div className="grid grid-cols-1 gap-8 px-6 md:grid-cols-4 md:px-12 lg:px-24">
          <div className="flex">
            <Link
              to="/"
              className="font-sentient text-primary text-2xl tracking-tight transition-opacity hover:opacity-80"
            >
              Scribe
            </Link>
          </div>

          {footerSections.map((section) => (
            <nav key={section.title} aria-label={section.title}>
              <h4 className="mb-4 font-semibold">{section.title}</h4>
              <ul className="flex flex-col gap-2">
                {section.links.map((link) => (
                  <li key={link.to}>
                    <Link to={link.to} className={linkClass}>
                      {link.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </nav>
          ))}

          <div>
            <h4 className="mb-4 font-semibold">Connect</h4>
            <ul className="flex flex-col gap-2">
              {socialLinks.map((link) => (
                <li key={link.href}>
                  <a href={link.href} className={linkClass}>
                    {link.label}
                  </a>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </section>

      <section className="bg-background border-border text-muted-foreground flex items-center justify-center border-t px-6 py-6 text-sm md:px-12 lg:px-24">
        <p>© {new Date().getFullYear()} Scribe. All rights reserved.</p>
      </section>
    </footer>
  );
};
