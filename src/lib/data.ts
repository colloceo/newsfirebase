export type Article = {
  id: number;
  title: string;
  category: 'Politics' | 'Business' | 'Sports' | 'Tech' | 'Culture';
  summary: string;
  imageUrl: string;
  imageHint: string;
  featured?: boolean;
  trending?: boolean;
  breaking?: boolean;
};

export const articles: Article[] = [
  {
    id: 1,
    title: "Government Unveils New Economic Stimulus Package",
    category: "Politics",
    summary: "The government has announced a new multi-billion shilling package aimed at revitalizing the economy after a period of slow growth. The package targets small and medium enterprises.",
    imageUrl: "https://placehold.co/800x600.png",
    imageHint: "government building",
    featured: true,
    trending: true,
    breaking: true,
  },
  {
    id: 2,
    title: "Nairobi Securities Exchange Sees Record Highs",
    category: "Business",
    summary: "The stock market has reached an all-time high, driven by strong performance in the tech and financial sectors. Investors are optimistic about future growth.",
    imageUrl: "https://placehold.co/800x600.png",
    imageHint: "stock market",
    featured: false,
    trending: true,
  },
  {
    id: 3,
    title: "Harambee Stars Qualify for Continental Cup",
    category: "Sports",
    summary: "The national football team, Harambee Stars, secured their spot in the upcoming continental tournament with a thrilling victory over their rivals.",
    imageUrl: "https://placehold.co/800x600.png",
    imageHint: "soccer match",
    featured: false,
    trending: true,
    breaking: true,
  },
  {
    id: 4,
    title: "Kenyan Tech Startup Lands Major International Funding",
    category: "Tech",
    summary: "A local tech startup specializing in mobile payments has secured a significant investment from a Silicon Valley venture capital firm, paving the way for expansion.",
    imageUrl: "https://placehold.co/800x600.png",
    imageHint: "startup office",
    featured: false,
    trending: true,
  },
  {
    id: 5,
    title: "Annual Cultural Festival Showcases National Heritage",
    category: "Culture",
    summary: "The annual cultural festival kicked off in Nairobi, featuring vibrant performances, art exhibitions, and traditional cuisine from across the country.",
    imageUrl: "https://placehold.co/800x600.png",
    imageHint: "cultural festival",
    featured: false,
  },
  {
    id: 6,
    title: "Parliament Debates Controversial Finance Bill",
    category: "Politics",
    summary: "Members of Parliament are engaged in a heated debate over the proposed finance bill, which includes several new tax measures.",
    imageUrl: "https://placehold.co/400x300.png",
    imageHint: "parliament debate",
    trending: true,
  },
  {
    id: 7,
    title: "Central Bank Maintains Key Interest Rate",
    category: "Business",
    summary: "The Central Bank's monetary policy committee has decided to hold the key lending rate steady, citing stable inflation.",
    imageUrl: "https://placehold.co/400x300.png",
    imageHint: "bank building",
  },
  {
    id: 8,
    title: "Athletics Kenya Announces Marathon Team",
    category: "Sports",
    summary: "The official team that will represent Kenya in the upcoming international marathon has been announced, featuring a mix of veterans and new talent.",
    imageUrl: "https://placehold.co/400x300.png",
    imageHint: "marathon runners",
    trending: true,
  },
  {
    id: 9,
    title: "New Fiber Optic Cable to Boost Internet Speeds",
    category: "Tech",
    summary: "The landing of a new undersea fiber optic cable is expected to significantly increase internet speeds and reduce costs for consumers.",
    imageUrl: "https://placehold.co/400x300.png",
    imageHint: "fiber optics",
  },
  {
    id: 10,
    title: "Nairobi Art Scene Buzzes with New Gallery Openings",
    category: "Culture",
    summary: "The city's art scene is experiencing a renaissance, with several new contemporary art galleries opening their doors to the public.",
    imageUrl: "https://placehold.co/400x300.png",
    imageHint: "art gallery",
    breaking: true,
  },
];
