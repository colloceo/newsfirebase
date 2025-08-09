import { slugify } from './utils';

export type ArticleCategory = 'Politics' | 'Business' | 'Sports' | 'Tech' | 'Culture' | 'Entertainment' | 'World' | 'Africa' | 'Health' | 'Lifestyle' | 'Opinion' | 'Education';

export const allCategories: ArticleCategory[] = ['Politics', 'Business', 'Sports', 'Tech', 'Culture', 'Entertainment', 'World', 'Africa', 'Health', 'Lifestyle', 'Opinion', 'Education'];

export type Article = {
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

const mockArticles: Article[] = [
  {
    id: '1',
    title: 'Taifa Stars Kick Off CECAFA Campaign with a Win',
    category: 'Sports',
    summary: 'Tanzania\'s Taifa Stars started their CECAFA Senior Challenge Cup with a convincing 2-0 victory over Somalia.',
    imageUrl: 'https://placehold.co/600x400.png',
    imageHint: 'soccer match',
    featured: true,
    trending: true,
    breaking: true,
    createdAt: new Date('2023-11-25T14:00:00Z'),
  },
  {
    id: '2',
    title: 'Kenyan Government Unveils New Tech Hub in Nairobi',
    category: 'Tech',
    summary: 'The new "Silicon Savannah" hub aims to foster innovation and provide resources for local startups.',
    imageUrl: 'https://placehold.co/600x400.png',
    imageHint: 'modern building',
    featured: true,
    trending: true,
    createdAt: new Date('2023-11-24T11:00:00Z'),
  },
  {
    id: '3',
    title: 'Parliament Debates Controversial Finance Bill',
    category: 'Politics',
    summary: 'A heated debate is underway as MPs discuss the proposed tax increases in the new finance bill.',
    imageUrl: 'https://placehold.co/600x400.png',
    imageHint: 'parliament building',
    trending: true,
    createdAt: new Date('2023-11-25T09:00:00Z'),
  },
  {
    id: '4',
    title: 'Nairobi Business Expo Attracts Global Investors',
    category: 'Business',
    summary: 'The annual business expo has seen a record number of international investors looking for opportunities in East Africa.',
    imageUrl: 'https://placehold.co/600x400.png',
    imageHint: 'business meeting',
    featured: true,
    createdAt: new Date('2023-11-23T16:30:00Z'),
  },
  {
    id: '5',
    title: 'Afro-Fusion Star Announces World Tour',
    category: 'Entertainment',
    summary: 'Grammy-nominated artist will be performing in 20 cities across Europe and North America.',
    imageUrl: 'https://placehold.co/600x400.png',
    imageHint: 'concert stage',
    createdAt: new Date('2023-11-25T10:00:00Z'),
  },
   {
    id: '6',
    title: 'Ministry of Health Launches New Vaccination Drive',
    category: 'Health',
    summary: 'The campaign targets remote areas to increase immunization coverage against common diseases.',
    imageUrl: 'https://placehold.co/600x400.png',
    imageHint: 'medical worker',
    trending: true,
    createdAt: new Date('2023-11-24T08:00:00Z'),
  },
  {
    id: '7',
    title: 'The Rise of E-Sports in Kenya',
    category: 'Sports',
    summary: 'A look into the growing community of competitive gamers and the potential for a professional league.',
    imageUrl: 'https://placehold.co/600x400.png',
    imageHint: 'gaming tournament',
    createdAt: new Date('2023-11-23T19:00:00Z'),
  },
  {
    id: '8',
    title: 'East African Community Agrees on New Trade Pact',
    category: 'Business',
    summary: 'The new agreement aims to reduce tariffs and promote cross-border trade among member states.',
    imageUrl: 'https://placehold.co/600x400.png',
    imageHint: 'cargo ship',
    createdAt: new Date('2023-11-22T15:00:00Z'),
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
  return mockArticles.find(a => a.id === id) || null;
}

export async function getArticlesByCategory(category: string): Promise<Article[]> {
    const normalizedCategory = category.charAt(0).toUpperCase() + category.slice(1);
    return mockArticles.filter(a => a.category === normalizedCategory);
}

export async function getArticleBySlug(slug: string): Promise<Article | null> {
    return mockArticles.find(a => slugify(a.title) === slug) || null;
}

export async function getFeaturedArticles(): Promise<Article[]> {
  return mockArticles.filter(a => a.featured).slice(0, 5);
}

export async function getTrendingArticles(): Promise<Article[]> {
  return mockArticles.filter(a => a.trending).slice(0, 5);
}

export async function getBreakingNews(): Promise<Article[]> {
 return mockArticles.filter(a => a.breaking).slice(0, 5);
}
