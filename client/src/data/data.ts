// TypeScript type for a blog post
export type Post = {
  id: number;
  title: string;
  summary: string;
  category: "culture" | "people" | "lifestyle" | "technology";
  coverImage: string; // URL to image
  date: string; // ISO date string (YYYY-MM-DD)
  author: string;
  content: {
    introduction: string;
    sections: {
      heading: string;
      body: string;
    }[];
  };
};

export const mockPosts: Post[] = [
  {
    id: 1,
    title: "Tech innovators: The minds behind the machines",
    summary:
      "Profiles of pioneering individuals who are driving technological advancements and innovation.",
    category: "people",
    coverImage:
      "https://images.unsplash.com/photo-1550751827-4bd374c3f58b?w=800",
    date: "2024-05-18",
    author: "Sarah Chen",
    content: {
      introduction:
        "In the rapidly evolving world of technology, certain individuals stand out as true pioneers. These innovators are not just creating products; they're shaping the future of how we live, work, and connect.",
      sections: [
        {
          heading: "Visionaries of the Digital Age",
          body: "From artificial intelligence to quantum computing, today's tech innovators are pushing the boundaries of what's possible. They bring diverse perspectives and relentless curiosity to solve complex challenges.",
        },
        {
          heading: "Impact Beyond Technology",
          body: "These pioneers understand that technology is a tool for human progress. Their work extends beyond code and circuits, touching education, healthcare, and environmental sustainability.",
        },
      ],
    },
  },
  {
    id: 2,
    title: "The rise of digital art in modern culture",
    summary:
      "Exploring how digital art is becoming a significant part of contemporary culture, influencing various forms of media and expression.",
    category: "culture",
    coverImage:
      "https://images.unsplash.com/photo-1541961017774-22349e4a1262?w=800",
    date: "2024-04-25",
    author: "Marcus Wright",
    content: {
      introduction:
        "Digital art has evolved from a niche medium to a powerful force in contemporary culture. It challenges traditional boundaries and democratizes artistic expression.",
      sections: [
        {
          heading: "The Digital Revolution",
          body: "The accessibility of digital tools has empowered a new generation of artists. From NFTs to virtual galleries, digital art is redefining ownership and exhibition.",
        },
        {
          heading: "Cultural Impact",
          body: "Digital art reflects our increasingly connected world. It bridges cultures, inspires movements, and creates new forms of storytelling that resonate globally.",
        },
      ],
    },
  },
  {
    id: 3,
    title: "How street fashion is shaping urban identities",
    summary:
      "A look at the impact of street fashion on the identity and culture of urban communities around the world.",
    category: "culture",
    coverImage:
      "https://images.unsplash.com/photo-1509631179647-0177331693ae?w=800",
    date: "2024-04-02",
    author: "Elena Rodriguez",
    content: {
      introduction:
        "Street fashion has become a powerful cultural force. It reflects and influences the identities of urban communities worldwide.",
      sections: [
        {
          heading: "The Evolution of Street Fashion",
          body: "Street fashion has evolved from grassroots movements. It draws from a mix of cultures, subcultures, and trends, creating a dynamic and ever-changing fashion landscape.",
        },
        {
          heading: "Influence on Urban Culture",
          body: "Street fashion deeply impacts urban culture. It reflects the diversity, creativity, and resilience of city dwellers, shaping their collective identity.",
        },
        {
          heading: "Global Reach and Local Flavours",
          body: "Street fashion is both global and local. While international trends influence it, each city adds its unique touch, making street fashion a rich tapestry of global and local influences.",
        },
      ],
    },
  },
  {
    id: 4,
    title: "Sustainable living: Small changes, big impact",
    summary:
      "Highlighting simple lifestyle changes that contribute significantly to environmental sustainability.",
    category: "lifestyle",
    coverImage:
      "https://images.unsplash.com/photo-1542601906990-b4d3fb778b09?w=800",
    date: "2024-05-08",
    author: "David Park",
    content: {
      introduction:
        "Sustainability doesn't require dramatic lifestyle overhauls. Small, consistent changes in our daily habits can create significant environmental impact.",
      sections: [
        {
          heading: "Everyday Sustainable Choices",
          body: "From reducing single-use plastics to choosing local products, simple decisions compound over time. These choices benefit both the environment and our wellbeing.",
        },
        {
          heading: "The Ripple Effect",
          body: "Individual actions inspire communities. When we embrace sustainable living, we create a ripple effect that encourages others to make conscious choices.",
        },
      ],
    },
  },
  {
    id: 5,
    title: "Everyday heroes: Stories of community champions",
    summary:
      "Celebrating ordinary people who make extraordinary contributions to their communities.",
    category: "people",
    coverImage:
      "https://images.unsplash.com/photo-1579546929518-9e396f3cc809?w=800",
    date: "2024-02-20",
    author: "Aisha Patel",
    content: {
      introduction:
        "Heroes aren't always in capes. They're in our neighborhoods, schools, and local organizations, making quiet but profound differences in people's lives.",
      sections: [
        {
          heading: "Unsung Community Leaders",
          body: "These individuals volunteer time, share resources, and build connections. Their dedication strengthens the fabric of our communities.",
        },
        {
          heading: "Impact Through Action",
          body: "Small acts of kindness create waves of change. Community champions show us that everyone has the power to make a difference.",
        },
      ],
    },
  },
  {
    id: 6,
    title: "The future of AI: Opportunities and challenges",
    summary:
      "An exploration of artificial intelligence's potential to transform industries while addressing ethical concerns.",
    category: "technology",
    coverImage:
      "https://images.unsplash.com/photo-1677442136019-21780ecad995?w=800",
    date: "2024-05-15",
    author: "James Mitchell",
    content: {
      introduction:
        "Artificial Intelligence is no longer science fiction. It's reshaping industries, enhancing productivity, and raising important questions about ethics and governance.",
      sections: [
        {
          heading: "AI in Everyday Life",
          body: "From virtual assistants to recommendation algorithms, AI is woven into our daily experiences. Its applications span healthcare, finance, transportation, and beyond.",
        },
        {
          heading: "Ethical Considerations",
          body: "As AI grows more powerful, we must address bias, privacy, and accountability. Responsible development requires collaboration between technologists, policymakers, and society.",
        },
        {
          heading: "The Road Ahead",
          body: "The future of AI holds immense promise. By balancing innovation with ethics, we can harness its potential for the greater good.",
        },
      ],
    },
  },
  {
    id: 7,
    title: "Cybersecurity in the modern age",
    summary:
      "Understanding the evolving landscape of digital threats and how to protect yourself online.",
    category: "technology",
    coverImage:
      "https://images.unsplash.com/photo-1550751827-4bd374c3f58b?w=800",
    date: "2024-03-12",
    author: "Rachel Kim",
    content: {
      introduction:
        "In our interconnected world, cybersecurity is everyone's responsibility. Understanding digital threats is the first step toward protecting ourselves and our data.",
      sections: [
        {
          heading: "The Threat Landscape",
          body: "Cyber threats evolve constantly. From phishing attacks to ransomware, malicious actors exploit vulnerabilities using increasingly sophisticated methods.",
        },
        {
          heading: "Best Practices for Protection",
          body: "Strong passwords, two-factor authentication, and regular software updates form your first line of defense. Awareness and vigilance are equally important.",
        },
        {
          heading: "The Future of Security",
          body: "As threats evolve, so do our defenses. Emerging technologies like AI-powered security and zero-trust architectures are reshaping cybersecurity.",
        },
      ],
    },
  },
  {
    id: 8,
    title: "The wellness revolution: Mind, body, and spirit",
    summary:
      "Exploring holistic approaches to health and wellbeing in modern society.",
    category: "lifestyle",
    coverImage:
      "https://images.unsplash.com/photo-1506126613408-eca07ce68773?w=800",
    date: "2024-01-28",
    author: "Maya Thompson",
    content: {
      introduction:
        "Wellness is more than physical health. It encompasses mental clarity, emotional balance, and spiritual fulfillment. A holistic approach creates lasting wellbeing.",
      sections: [
        {
          heading: "Mindfulness and Mental Health",
          body: "Practices like meditation and mindfulness reduce stress and improve focus. They help us navigate modern life's complexities with greater ease.",
        },
        {
          heading: "Physical Vitality",
          body: "Movement, nutrition, and rest form the foundation of physical health. Finding sustainable habits that fit your lifestyle is key to long-term wellness.",
        },
        {
          heading: "Spiritual Connection",
          body: "Whether through nature, community, or personal practice, spiritual connection provides meaning and purpose, essential components of overall wellbeing.",
        },
      ],
    },
  },
  // Additional Technology Posts
  {
    id: 9,
    title: "Quantum Computing: Breaking the Barriers",
    summary:
      "Exploring how quantum computers are revolutionizing problem-solving and computation.",
    category: "technology",
    coverImage:
      "https://images.unsplash.com/photo-1635070041078-e363dbe005cb?w=800",
    date: "2024-06-10",
    author: "Dr. Alan Cooper",
    content: {
      introduction:
        "Quantum computing represents a paradigm shift in how we process information. Unlike classical computers, quantum machines harness the principles of quantum mechanics to solve complex problems.",
      sections: [
        {
          heading: "Beyond Binary",
          body: "Quantum computers use qubits instead of bits, allowing them to exist in multiple states simultaneously. This enables exponential computational power for specific problems.",
        },
        {
          heading: "Real-World Applications",
          body: "From drug discovery to cryptography, quantum computing promises breakthroughs in fields that require massive computational power.",
        },
      ],
    },
  },
  {
    id: 10,
    title: "5G and the Internet of Things",
    summary:
      "How next-generation networks are enabling a connected world of smart devices.",
    category: "technology",
    coverImage:
      "https://images.unsplash.com/photo-1558346490-a72e53ae2d4f?w=800",
    date: "2024-05-22",
    author: "Lisa Wang",
    content: {
      introduction:
        "The rollout of 5G networks is unlocking unprecedented possibilities for the Internet of Things. Faster speeds and lower latency enable real-time communication between billions of devices.",
      sections: [
        {
          heading: "Smart Cities",
          body: "5G enables smart traffic systems, energy grids, and public services that adapt in real-time to citizen needs.",
        },
        {
          heading: "Healthcare Innovation",
          body: "Remote surgery, real-time patient monitoring, and telemedicine become practical with 5G's reliability and speed.",
        },
      ],
    },
  },
  // Additional Culture Posts
  {
    id: 11,
    title: "The Renaissance of Vinyl Records",
    summary: "Why analog music is making a comeback in the digital age.",
    category: "culture",
    coverImage:
      "https://images.unsplash.com/photo-1496293455970-f8581aae0e3b?w=800",
    date: "2024-04-18",
    author: "Tom Harrison",
    content: {
      introduction:
        "In an era of streaming and digital downloads, vinyl records are experiencing an unexpected revival. Music lovers are rediscovering the warmth and ritual of analog sound.",
      sections: [
        {
          heading: "The Tactile Experience",
          body: "Vinyl offers more than sound—it's an experience. The artwork, the ritual of playing a record, and the rich analog warmth create a deeper connection to music.",
        },
        {
          heading: "Cultural Significance",
          body: "The vinyl revival represents a pushback against disposable culture. It values permanence, quality, and the intentional consumption of art.",
        },
      ],
    },
  },
  {
    id: 12,
    title: "Graffiti: From Vandalism to High Art",
    summary:
      "Tracing the journey of street art from underground movement to gallery exhibitions.",
    category: "culture",
    coverImage:
      "https://images.unsplash.com/photo-1578662996442-48f60103fc96?w=800",
    date: "2024-03-25",
    author: "Sofia Martinez",
    content: {
      introduction:
        "Graffiti has evolved from rebellious street expression to a respected art form. Today's street artists command gallery shows and shape urban aesthetics worldwide.",
      sections: [
        {
          heading: "The Streets as Canvas",
          body: "Graffiti transforms urban spaces into open-air galleries. It gives voice to marginalized communities and challenges traditional notions of public space.",
        },
        {
          heading: "Mainstream Recognition",
          body: "Artists like Banksy and Shepard Fairey have brought street art into museums and auction houses, legitimizing a once-underground movement.",
        },
      ],
    },
  },
  // Additional People Posts
  {
    id: 13,
    title: "Women in STEM: Breaking Barriers",
    summary:
      "Celebrating female scientists and engineers who are reshaping their fields.",
    category: "people",
    coverImage:
      "https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?w=800",
    date: "2024-06-05",
    author: "Jennifer Brooks",
    content: {
      introduction:
        "Women in STEM continue to break barriers and challenge stereotypes. Their contributions drive innovation while inspiring the next generation of scientists and engineers.",
      sections: [
        {
          heading: "Pioneers and Trailblazers",
          body: "From Ada Lovelace to modern-day researchers, women have made groundbreaking contributions to science and technology despite systemic obstacles.",
        },
        {
          heading: "Creating Inclusive Futures",
          body: "Today's women in STEM are not only advancing their fields but also mentoring others and advocating for diversity in technical careers.",
        },
      ],
    },
  },
  {
    id: 14,
    title: "Young Activists Changing the World",
    summary:
      "Profiles of youth leaders driving social and environmental change globally.",
    category: "people",
    coverImage:
      "https://images.unsplash.com/photo-1529333166437-7750a6dd5a70?w=800",
    date: "2024-05-30",
    author: "Michael Zhang",
    content: {
      introduction:
        "A new generation of activists is demanding action on climate change, social justice, and equality. These young leaders are mobilizing millions and reshaping political discourse.",
      sections: [
        {
          heading: "Digital Native Organizing",
          body: "Youth activists leverage social media to build movements, share stories, and coordinate global action with unprecedented speed and scale.",
        },
        {
          heading: "Intersectional Advocacy",
          body: "Today's young activists understand that issues are interconnected. They advocate for comprehensive solutions that address root causes of inequality.",
        },
      ],
    },
  },
  // Additional Lifestyle Posts
  {
    id: 15,
    title: "Minimalism: Living with Less, Enjoying More",
    summary:
      "How the minimalist lifestyle movement is helping people find freedom through simplicity.",
    category: "lifestyle",
    coverImage:
      "https://images.unsplash.com/photo-1556909114-f6e7ad7d3136?w=800",
    date: "2024-06-01",
    author: "Emma Roberts",
    content: {
      introduction:
        "Minimalism isn't about deprivation—it's about intentionality. By reducing physical clutter, we create space for experiences, relationships, and personal growth.",
      sections: [
        {
          heading: "The Psychology of Less",
          body: "Research shows that reducing possessions can decrease stress and increase happiness. Minimalism frees us from the burden of material accumulation.",
        },
        {
          heading: "Practical Minimalism",
          body: "Minimalism looks different for everyone. It's about keeping what adds value to your life and letting go of the rest.",
        },
      ],
    },
  },
  {
    id: 16,
    title: "Remote Work Revolution: Redesigning Life",
    summary:
      "How remote work is transforming not just careers, but entire lifestyles.",
    category: "lifestyle",
    coverImage:
      "https://images.unsplash.com/photo-1488190211105-8b0e65b80b4e?w=800",
    date: "2024-04-15",
    author: "Chris Anderson",
    content: {
      introduction:
        "Remote work has evolved from a perk to a fundamental shift in how we live. It's enabling location independence, flexible schedules, and a reimagining of work-life balance.",
      sections: [
        {
          heading: "The Digital Nomad Lifestyle",
          body: "Remote work enables people to travel while maintaining careers. Digital nomads are building communities in cities worldwide.",
        },
        {
          heading: "Redefining Productivity",
          body: "Without office constraints, workers are designing schedules around their peak productivity hours and personal commitments.",
        },
      ],
    },
  },
  // Even more posts for better carousel demo
  {
    id: 17,
    title: "Blockchain Beyond Cryptocurrency",
    summary:
      "Exploring how blockchain technology is disrupting industries beyond finance.",
    category: "technology",
    coverImage:
      "https://images.unsplash.com/photo-1639762681485-074b7f938ba0?w=800",
    date: "2024-02-14",
    author: "Nathan Price",
    content: {
      introduction:
        "While cryptocurrency brought blockchain into the spotlight, the technology's applications extend far beyond digital currency. From supply chains to voting systems, blockchain promises transparency and security.",
      sections: [
        {
          heading: "Supply Chain Revolution",
          body: "Blockchain enables transparent tracking of products from origin to consumer, combating fraud and ensuring authenticity.",
        },
        {
          heading: "Digital Identity",
          body: "Blockchain-based identity systems give individuals control over their personal data while enabling secure verification.",
        },
      ],
    },
  },
  {
    id: 18,
    title: "Podcasting: The New Golden Age of Audio",
    summary:
      "How podcasts are revolutionizing storytelling and information sharing.",
    category: "culture",
    coverImage:
      "https://images.unsplash.com/photo-1478737270239-2f02b77fc618?w=800",
    date: "2024-02-08",
    author: "Laura Chen",
    content: {
      introduction:
        "Podcasting has democratized broadcasting. Anyone with a microphone can reach global audiences, creating intimate connections through the power of voice.",
      sections: [
        {
          heading: "The Intimacy of Audio",
          body: "Podcasts create unique bonds between hosts and listeners. The medium's intimacy fosters trust and deep engagement.",
        },
        {
          heading: "Diverse Voices",
          body: "Podcasting amplifies marginalized voices and niche interests that traditional media often overlooks.",
        },
      ],
    },
  },
  {
    id: 19,
    title: "Social Entrepreneurs: Profit with Purpose",
    summary:
      "Profiles of business leaders who are tackling social problems through innovation.",
    category: "people",
    coverImage:
      "https://images.unsplash.com/photo-1552664730-d307ca884978?w=800",
    date: "2024-01-20",
    author: "Daniel Murphy",
    content: {
      introduction:
        "Social entrepreneurs prove that business can be a force for good. They build sustainable ventures that address poverty, inequality, and environmental challenges while generating profit.",
      sections: [
        {
          heading: "Impact-Driven Business Models",
          body: "Social enterprises measure success not just in revenue, but in lives improved and problems solved.",
        },
        {
          heading: "Scaling Solutions",
          body: "The most successful social entrepreneurs develop models that can scale globally, multiplying their impact.",
        },
      ],
    },
  },
  {
    id: 20,
    title: "Mindful Eating: A New Relationship with Food",
    summary:
      "How mindfulness practices are transforming our approach to nutrition and eating.",
    category: "lifestyle",
    coverImage:
      "https://images.unsplash.com/photo-1490645935967-10de6ba17061?w=800",
    date: "2024-01-15",
    author: "Olivia Green",
    content: {
      introduction:
        "Mindful eating isn't a diet—it's a practice of awareness. By paying attention to our food and eating experiences, we develop healthier relationships with nutrition and our bodies.",
      sections: [
        {
          heading: "Breaking Automatic Eating",
          body: "Mindfulness helps us recognize hunger cues, savor flavors, and distinguish between physical and emotional hunger.",
        },
        {
          heading: "The Joy of Food",
          body: "By eating mindfully, we rediscover the pleasure of food without guilt, creating sustainable and enjoyable eating habits.",
        },
      ],
    },
  },
];
