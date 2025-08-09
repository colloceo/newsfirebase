import { slugify } from './utils';
import { query } from './mysql';

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

function mapRowToArticle(row: any): Article {
    return {
        id: String(row.id),
        title: row.title,
        category: row.category,
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
  try {
    const sql = `
        SELECT * FROM articles 
        ORDER BY createdAt DESC
        ${count ? 'LIMIT ?' : ''}
    `;
    const params = count ? [count] : [];
    const rows = await query(sql, params) as any[];
    return rows.map(mapRowToArticle);
  } catch (error) {
    console.error("Error fetching articles:", error);
    return [];
  }
}

export async function getArticle(id: string): Promise<Article | null> {
  try {
    const rows = await query('SELECT * FROM articles WHERE id = ?', [id]) as any[];
    if (rows.length === 0) return null;
    return mapRowToArticle(rows[0]);
  } catch (error) {
    console.error(`Error fetching article with id ${id}:`, error);
    return null;
  }
}

export async function getArticlesByCategory(category: string): Promise<Article[]> {
  try {
    const normalizedCategory = category.charAt(0).toUpperCase() + category.slice(1);
    const rows = await query('SELECT * FROM articles WHERE category = ? ORDER BY createdAt DESC', [normalizedCategory]) as any[];
    return rows.map(mapRowToArticle);
  } catch (error) {
     console.error(`Error fetching articles for category ${category}:`, error);
     return [];
  }
}

export async function getArticleBySlug(slug: string): Promise<Article | null> {
    try {
        const articles = await getArticles();
        const article = articles.find(a => slugify(a.title) === slug);
        return article || null;
    } catch(error) {
        console.error(`Error fetching article by slug ${slug}:`, error);
        return null;
    }
}

export async function getFeaturedArticles(): Promise<Article[]> {
  try {
    const rows = await query('SELECT * FROM articles WHERE featured = 1 ORDER BY createdAt DESC LIMIT 5', []) as any[];
    return rows.map(mapRowToArticle);
  } catch(error) {
    console.error("Error fetching featured articles:", error);
    return [];
  }
}

export async function getTrendingArticles(): Promise<Article[]> {
  try {
    const rows = await query('SELECT * FROM articles WHERE trending = 1 ORDER BY createdAt DESC LIMIT 5', []) as any[];
    return rows.map(mapRowToArticle);
  } catch(error) {
    console.error("Error fetching trending articles:", error);
    return [];
  }
}

export async function getBreakingNews(): Promise<Article[]> {
  try {
    const rows = await query('SELECT * FROM articles WHERE breaking = 1 ORDER BY createdAt DESC LIMIT 5', []) as any[];
    return rows.map(mapRowToArticle);
  } catch(error) {
    console.error("Error fetching breaking news:", error);
    return [];
  }
}
