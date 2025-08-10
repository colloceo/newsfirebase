
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

let mockArticles: Article[] = [
    {
        id: '1', title: 'Taifa Stars Kick Off CECAFA Campaign with a Win', category: 'Sports', summary: 'Tanzania\'s Taifa Stars started their CECAFA Senior Challenge Cup campaign on a high note with a 2-0 victory over Somalia.', imageUrl: 'https://placehold.co/600x400.png', imageHint: 'soccer match', featured: true, trending: true, breaking: true, createdAt: new Date('2024-07-20T10:00:00Z')
    },
    {
        id: '2', title: 'Kenyan Shilling Gains Against the Dollar', category: 'Business', summary: 'The Kenyan Shilling has seen a significant gain against the US Dollar, trading at its strongest in over a year.', imageUrl: 'https://placehold.co/600x400.png', imageHint: 'money currency', featured: true, trending: true, createdAt: new Date('2024-07-20T09:00:00Z')
    },
    {
        id: '3', title: 'New Tech Hub Launched in Nairobi', category: 'Tech', summary: 'A new state-of-the-art technology hub was launched in Nairobi, promising to nurture local innovation and startups.', imageUrl: 'https://placehold.co/600x400.png', imageHint: 'modern office', featured: true, trending: true, breaking: true, createdAt: new Date('2024-07-20T08:00:00Z')
    },
    {
        id: '4', title: 'Parliament Debates New Housing Bill', category: 'Politics', summary: 'Members of Parliament are currently in a heated debate over the proposed new housing bill aimed at providing affordable housing.', imageUrl: 'https://placehold.co/600x400.png', imageHint: 'government building', featured: true, trending: true, createdAt: new Date('2024-07-19T15:00:00Z')
    },
    {
        id: '5', title: 'Annual Cultural Festival Attracts Thousands', category: 'Culture', summary: 'The annual cultural festival held in Mombasa attracted thousands of tourists and locals, showcasing diverse traditions.', imageUrl: 'https://placehold.co/600x400.png', imageHint: 'cultural festival', trending: true, createdAt: new Date('2024-07-19T11:00:00Z')
    },
    {
        id: '6', title: 'Gor Mahia Clinches Premier League Title', category: 'Sports', summary: 'Gor Mahia has been crowned the champions of the Kenyan Premier League for the 21st time after a thrilling final match.', imageUrl: 'https://placehold.co/600x400.png', imageHint: 'sports trophy', featured: true, breaking: true, createdAt: new Date('2024-07-20T18:00:00Z')
    },
    {
        id: '7', title: 'Safaricom Announces Yearly Profits', category: 'Business', summary: 'Telecom giant Safaricom has announced its annual financial results, posting a significant profit despite economic challenges.', imageUrl: 'https://placehold.co/600x400.png', imageHint: 'corporate building', createdAt: new Date('2024-07-20T16:00:00Z')
    },
    {
        id: '8', title: 'Afrobeats Star to Tour Kenya', category: 'Entertainment', summary: 'Popular Afrobeats artist is set to perform in Nairobi and Mombasa as part of their world tour.', imageUrl: 'https://placehold.co/600x400.png', imageHint: 'music concert', trending: true, createdAt: new Date('2024-07-18T19:00:00Z')
    },
];


export async function getArticles(count?: number): Promise<Article[]> {
  const sortedArticles = [...mockArticles].sort((a, b) => b.createdAt.getTime() - a.createdAt.getTime());
  return count ? sortedArticles.slice(0, count) : sortedArticles;
}

export async function getArticle(id: string): Promise<Article | null> {
  return mockArticles.find(a => a.id === id) || null;
}

export async function getArticlesByCategory(category: string): Promise<Article[]> {
  const normalizedCategory = category.charAt(0).toUpperCase() + category.slice(1);
  return mockArticles.filter(a => a.category === normalizedCategory).sort((a, b) => b.createdAt.getTime() - a.createdAt.getTime());
}

export async function getArticleBySlug(slug: string): Promise<Article | null> {
  return mockArticles.find(a => slugify(a.title) === slug) || null;
}

export async function getFeaturedArticles(): Promise<Article[]> {
  return mockArticles.filter(a => a.featured).sort((a, b) => b.createdAt.getTime() - a.createdAt.getTime()).slice(0, 5);
}

export async function getTrendingArticles(): Promise<Article[]> {
    return mockArticles.filter(a => a.trending).sort((a, b) => b.createdAt.getTime() - a.createdAt.getTime()).slice(0, 5);
}

export async function getBreakingNews(): Promise<Article[]> {
    return mockArticles.filter(a => a.breaking).sort((a, b) => b.createdAt.getTime() - a.createdAt.getTime()).slice(0, 5);
}

// These functions are for mutating mock data, simulating a real backend.
export function addArticle(article: Omit<Article, 'id' | 'createdAt'>) {
    const newArticle: Article = {
        ...article,
        id: String(mockArticles.length + 1),
        createdAt: new Date(),
    };
    mockArticles.unshift(newArticle);
    return newArticle;
}

export function updateArticle(id: string, updates: Partial<Article>) {
    const articleIndex = mockArticles.findIndex(a => a.id === id);
    if (articleIndex > -1) {
        mockArticles[articleIndex] = { ...mockArticles[articleIndex], ...updates };
        return mockArticles[articleIndex];
    }
    return null;
}

export function removeArticle(id: string) {
    mockArticles = mockArticles.filter(a => a.id !== id);
}
