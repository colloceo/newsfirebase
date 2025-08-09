import { slugify } from './utils';

export type ArticleCategory = 'Politics' | 'Business' | 'Sports' | 'Tech' | 'Culture' | 'Entertainment' | 'World' | 'Africa' | 'Health' | 'Lifestyle' | 'Opinion' | 'Education';

export const allCategories: ArticleCategory[] = ['Politics', 'Business', 'Sports', 'Tech', 'Culture', 'Entertainment', 'World', 'Africa', 'Health', 'Lifestyle', 'Opinion', 'Education'];

export interface Article {
  id: string;
  title: string;
  category: ArticleCategory;
  summary: string;
  imageUrl: string;
  imageHint: string;
  featured?: boolean;
  trending?: boolean;
  breaking?: boolean;
  createdAt: Date;
};

export const mockArticles: Article[] = [
    {
        id: '1',
        title: "Taifa Stars Shine in CECAFA Opener",
        category: 'Sports',
        summary: "Tanzania's Taifa Stars kicked off their CECAFA campaign with a decisive 2-0 victory over Somalia, showcasing a dominant performance at home.",
        imageUrl: "https://placehold.co/600x400.png",
        imageHint: "soccer match",
        featured: true,
        trending: true,
        breaking: true,
        createdAt: new Date('2024-07-20T10:00:00Z')
    },
    {
        id: '2',
        title: "Kenyan Shilling Gains Against the Dollar",
        category: 'Business',
        summary: "The Kenyan shilling has seen a significant appreciation against the US dollar this week, attributed to increased diaspora remittances and horticultural exports.",
        imageUrl: "https://placehold.co/600x400.png",
        imageHint: "money currency",
        trending: true,
        createdAt: new Date('2024-07-20T09:00:00Z')
    },
    {
        id: '3',
        title: "New Tech Hub Launched in Nairobi to Foster Innovation",
        category: 'Tech',
        summary: "A state-of-the-art technology hub was unveiled in Nairobi's Kilimani area, aiming to provide mentorship and funding for over 200 startups annually.",
        imageUrl: "https://placehold.co/600x400.png",
        imageHint: "modern office",
        featured: true,
        createdAt: new Date('2024-07-19T15:30:00Z')
    },
    {
        id: '4',
        title: "Political Temperatures Rise Ahead of By-Elections",
        category: 'Politics',
        summary: "Major political parties are ramping up their campaigns in the coastal region as the highly anticipated by-elections draw near, with coalitions being tested.",
        imageUrl: "https://placehold.co/600x400.png",
        imageHint: "political debate",
        breaking: true,
        createdAt: new Date('2024-07-20T11:00:00Z')
    },
    {
        id: '5',
        title: "Annual Maasai Mara Migration Begins",
        category: 'Entertainment',
        summary: "The great wildebeest migration has officially begun, with thousands of tourists flocking to the Maasai Mara National Reserve to witness the spectacular event.",
        imageUrl: "https://placehold.co/600x400.png",
        imageHint: "wildebeest migration",
        trending: true,
        createdAt: new Date('2024-07-19T08:00:00Z')
    },
    {
        id: '6',
        title: "Healthcare Reforms: What You Need to Know",
        category: 'Health',
        summary: "The Ministry of Health has rolled out a new set of reforms aimed at improving primary healthcare access across all 47 counties.",
        imageUrl: "https://placehold.co/600x400.png",
        imageHint: "hospital interior",
        createdAt: new Date('2024-07-18T14:00:00Z')
    },
     {
        id: '7',
        title: "Global Markets React to New US Federal Reserve Policy",
        category: 'World',
        summary: "International stock markets experienced volatility following the announcement of the US Federal Reserve's new interest rate policy, with emerging markets being closely watched.",
        imageUrl: "https://placehold.co/600x400.png",
        imageHint: "stock market chart",
        featured: true,
        createdAt: new Date('2024-07-18T12:00:00Z')
    },
    {
        id: '8',
        title: "Kenyan Film 'Uprooted' Wins International Award",
        category: 'Culture',
        summary: "The local film 'Uprooted' has bagged the Best Feature Film award at the Pan-African Film Festival, highlighting the growth of the Kenyan film industry.",
        imageUrl: "https://placehold.co/600x400.png",
        imageHint: "film festival award",
        createdAt: new Date('2024-07-17T20:00:00Z')
    }
];


export async function getArticles(count?: number): Promise<Article[]> {
  const sortedArticles = mockArticles.sort((a, b) => b.createdAt.getTime() - a.createdAt.getTime());
  if (count) {
    return sortedArticles.slice(0, count);
  }
  return sortedArticles;
}

export async function getArticle(id: string): Promise<Article | null> {
  const article = mockArticles.find(a => a.id === id);
  return article || null;
}

export async function getArticlesByCategory(category: string): Promise<Article[]> {
    const normalizedCategory = category.charAt(0).toUpperCase() + category.slice(1);
    const articles = mockArticles.filter(a => a.category.toLowerCase() === normalizedCategory.toLowerCase());
    return articles.sort((a, b) => b.createdAt.getTime() - a.createdAt.getTime());
}

export async function getArticleBySlug(slug: string): Promise<Article | null> {
    const article = mockArticles.find(a => slugify(a.title) === slug);
    return article || null;
}

export async function getFeaturedArticles(): Promise<Article[]> {
  const articles = mockArticles.filter(a => a.featured);
  return articles.sort((a, b) => b.createdAt.getTime() - a.createdAt.getTime()).slice(0, 5);
}

export async function getTrendingArticles(): Promise<Article[]> {
  const articles = mockArticles.filter(a => a.trending);
  return articles.sort((a, b) => b.createdAt.getTime() - a.createdAt.getTime()).slice(0, 5);
}

export async function getBreakingNews(): Promise<Article[]> {
  const articles = mockArticles.filter(a => a.breaking);
  return articles.sort((a, b) => b.createdAt.getTime() - a.createdAt.getTime()).slice(0, 5);
}
