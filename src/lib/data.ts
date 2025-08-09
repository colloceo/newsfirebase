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

const mockArticles: Article[] = [
    { id: '1', title: 'Tanzania Shocks Somalia in CECAFA Opener', category: 'Sports', summary: 'Taifa Stars kick off their CECAFA campaign with a decisive 2-0 victory over Somalia.', imageUrl: 'https://placehold.co/600x400.png', imageHint: 'soccer match', featured: true, trending: true, breaking: true, createdAt: new Date('2023-11-25T10:00:00Z') },
    { id: '2', title: 'Kenyan Shilling Gains Against the Dollar', category: 'Business', summary: 'The Kenyan shilling has seen a steady rise against the US dollar for the third consecutive week.', imageUrl: 'https://placehold.co/600x400.png', imageHint: 'money currency', featured: true, trending: true, createdAt: new Date('2023-11-24T15:30:00Z') },
    { id: '3', title: 'New Tech Hub Launched in Nairobi', category: 'Tech', summary: 'A new innovation hub aimed at fostering startups has been launched in the heart of Nairobi.', imageUrl: 'https://placehold.co/600x400.png', imageHint: 'tech startup', featured: true, createdAt: new Date('2023-11-24T11:00:00Z') },
    { id: '4', title: 'Political Temperatures Rise Ahead of By-Elections', category: 'Politics', summary: 'Major political parties are ramping up their campaigns for the upcoming coastal region by-elections.', imageUrl: 'https://placehold.co/600x400.png', imageHint: 'political debate', trending: true, createdAt: new Date('2023-11-23T18:00:00Z') },
    { id: '5', title: 'Maasai Mara Voted Africa\'s Leading National Park', category: 'Entertainment', summary: 'The Maasai Mara has once again been recognized as the continent\'s top destination for wildlife.', imageUrl: 'https://placehold.co/600x400.png', imageHint: 'wildlife safari', featured: true, createdAt: new Date('2023-11-22T09:00:00Z') },
    { id: '6', title: 'Government Announces New Health Initiatives', category: 'Health', summary: 'The Ministry of Health has unveiled a new set of initiatives to improve primary healthcare access.', imageUrl: 'https://placehold.co/600x400.png', imageHint: 'hospital building', createdAt: new Date('2023-11-21T14:00:00Z') },
    { id: '7', title: 'Global Climate Summit: Africa\'s Stand', category: 'World', summary: 'African leaders present a united front at the global climate summit, demanding more action from developed nations.', imageUrl: 'https://placehold.co/600x400.png', imageHint: 'world leaders', trending: true, createdAt: new Date('2023-11-20T12:00:00Z') },
];

export async function getArticles(count?: number): Promise<Article[]> {
  const sortedArticles = [...mockArticles].sort((a, b) => b.createdAt.getTime() - a.createdAt.getTime());
  return count ? sortedArticles.slice(0, count) : sortedArticles;
}

export async function getArticle(id: string): Promise<Article | null> {
  const article = mockArticles.find((article) => article.id === id) || null;
  return article;
}

export async function getArticlesByCategory(category: string): Promise<Article[]> {
    const normalizedCategory = category.charAt(0).toUpperCase() + category.slice(1);
    return mockArticles.filter((article) => article.category.toLowerCase() === normalizedCategory.toLowerCase());
}

export async function getArticleBySlug(slug: string): Promise<Article | null> {
    const article = mockArticles.find(a => slugify(a.title) === slug);
    return article || null;
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
