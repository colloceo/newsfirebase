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
    {
        id: '1',
        title: 'Taifa Stars Kick Off CECAFA Campaign with a Win',
        category: 'Sports',
        summary: 'Tanzania\'s Taifa Stars started their CECAFA Senior Challenge Cup campaign on a high note with a 2-0 victory over Somalia.',
        imageUrl: 'https://placehold.co/600x400.png',
        imageHint: 'soccer match',
        featured: true,
        trending: true,
        breaking: true,
        createdAt: new Date('2024-07-28T10:00:00Z'),
    },
    {
        id: '2',
        title: 'Kenyan Shilling Gains Against the Dollar',
        category: 'Business',
        summary: 'The Kenyan Shilling has shown resilience, posting gains against the US Dollar for the third consecutive week.',
        imageUrl: 'https://placehold.co/600x400.png',
        imageHint: 'money currency',
        featured: true,
        trending: true,
        createdAt: new Date('2024-07-28T09:00:00Z'),
    },
    {
        id: '3',
        title: 'New Tech Hub Launched in Nairobi to Foster Innovation',
        category: 'Tech',
        summary: 'A new state-of-the-art technology hub was launched in Nairobi, promising to accelerate startup growth and innovation.',
        imageUrl: 'https://placehold.co/600x400.png',
        imageHint: 'modern office',
        featured: true,
        trending: true,
        createdAt: new Date('2024-07-27T15:30:00Z'),
    },
    {
        id: '4',
        title: 'Political Temperatures Rise Ahead of By-Elections',
        category: 'Politics',
        summary: 'Major political parties are ramping up their campaigns for the upcoming by-elections in several constituencies.',
        imageUrl: 'https://placehold.co/600x400.png',
        imageHint: 'political debate',
        featured: true,
        trending: false,
        createdAt: new Date('2024-07-27T11:00:00Z'),
    },
    {
        id: '5',
        title: 'Annual Music Festival "Sauti za Busara" Dates Announced',
        category: 'Entertainment',
        summary: 'The dates for the much-anticipated annual music festival, Sauti za Busara, have been announced by the organizers.',
        imageUrl: 'https://placehold.co/600x400.png',
        imageHint: 'music festival',
        featured: true,
        trending: true,
        createdAt: new Date('2024-07-26T18:00:00Z'),
    },
    {
        id: '6',
        title: 'Healthcare Reforms: What You Need to Know',
        category: 'Health',
        summary: 'The Ministry of Health has outlined a new set of reforms aimed at improving access to quality healthcare for all Kenyans.',
        imageUrl: 'https://placehold.co/600x400.png',
        imageHint: 'hospital doctor',
        trending: false,
        createdAt: new Date('2024-07-26T12:00:00Z'),
    },
    {
        id: '7',
        title: 'World Bank Approves New Funding for Infrastructure Projects',
        category: 'World',
        summary: 'The World Bank has approved a new funding package to support key infrastructure projects across East Africa.',
        imageUrl: 'https://placehold.co/600x400.png',
        imageHint: 'construction site',
        createdAt: new Date('2024-07-25T14:00:00Z'),
    },
     {
        id: '8',
        title: 'The Rise of E-commerce in Kenya',
        category: 'Business',
        summary: 'A deep dive into how e-commerce is transforming the retail landscape in Kenya and what it means for consumers and businesses.',
        imageUrl: 'https://placehold.co/600x400.png',
        imageHint: 'online shopping',
        createdAt: new Date('2024-07-25T10:00:00Z'),
    }
];

// Helper function to map database rows to Article objects
function toArticle(row: any): Article {
  return {
    id: String(row.id),
    title: row.title,
    category: row.category as ArticleCategory,
    summary: row.summary,
    imageUrl: row.imageUrl,
    imageHint: row.imageHint,
    featured: Boolean(row.featured),
    trending: Boolean(row.trending),
    breaking: Boolean(row.breaking),
    createdAt: new Date(row.createdAt),
  };
}


export async function getArticles(count?: number): Promise<Article[]> {
    const sortedArticles = mockArticles.sort((a, b) => b.createdAt.getTime() - a.createdAt.getTime());
    return count ? sortedArticles.slice(0, count) : sortedArticles;
}

export async function getArticle(id: string): Promise<Article | null> {
    const article = mockArticles.find(a => a.id === id);
    return article || null;
}

export async function getArticlesByCategory(category: string): Promise<Article[]> {
    const normalizedCategory = category.charAt(0).toUpperCase() + category.slice(1);
    return mockArticles.filter(a => a.category === normalizedCategory);
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
