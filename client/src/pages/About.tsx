type AboutSection = {
  heading: string;
  paragraphs: string[];
};

const aboutSections: AboutSection[] = [
  {
    heading: "Our story",
    paragraphs: [
      "Scribe began as a small group of passionate writers and tech enthusiasts who believed in the power of storytelling. We noticed a gap in the media landscape where deep, thoughtful exploration of technology, people, and culture was missing.",
    ],
  },
  {
    heading: "Wide-reaching experience",
    paragraphs: [
      "With diverse backgrounds in journalism, technology, and cultural studies, we set out to create a platform that bridges these worlds, providing a space for in-depth analysis, personal stories, and cultural insights. Our journey started in a modest co-working space, but our vision was always expansive—to reach and resonate with a global audience.",
    ],
  },
  {
    heading: "Where are we heading",
    paragraphs: [
      "Over the years, Scribe has grown from a niche blog to a widely recognized source of thoughtful content. Our reach has expanded, bringing in experts and storytellers from various fields, all committed to our mission. We've evolved topics from the rise of AI and practical implications to the personal narratives of unsung community heroes.",
      "Each article, interview, and feature we publish is crafted with the intention of sparking curiosity, fostering understanding, and encouraging dialogue among our readers.",
    ],
  },
  {
    heading: "Our commitment to quality",
    paragraphs: [
      "At Scribe, we are dedicated to maintaining the highest standards of quality in our content. Each piece undergoes rigorous research and editorial processes to ensure accuracy and depth. We believe in the importance of diverse perspectives and strive to feature voices from different backgrounds and experiences.",
      "Our commitment to quality is not just about producing well-written articles; it's about creating a trustworthy and engaging space where readers can explore complex topics and find inspiration.",
    ],
  },
];

export const About = () => {
  return (
    <main className="mx-auto max-w-2xl px-6 py-16">
      {aboutSections.map((section, index) => (
        <section key={index} className="mb-12">
          <h3 className="font-sentient mb-4 text-4xl font-normal tracking-tighter">
            {section.heading}
          </h3>
          {section.paragraphs.map((paragraph, pIndex) => (
            <p
              key={pIndex}
              className="text-foreground/60 font-sentient mb-4 text-xl leading-relaxed font-extralight"
            >
              {paragraph}
            </p>
          ))}
        </section>
      ))}
    </main>
  );
};
