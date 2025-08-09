import { getDb } from './mongodb';
import { slugify } from './utils';
import { ObjectId } from 'mongodb';

export type ArticleCategory = 'Politics' | 'Business' | 'Sports' | 'Tech' | 'Culture' | 'Entertainment' | 'World' | 'Africa' | 'Health' | 'Lifestyle' | 'Opinion' | 'Education';

export const allCategories: ArticleCategory[] = ['Politics', 'Business', 'Sports', 'Tech', 'Culture', 'Entertainment', 'World', 'Africa', 'Health', 'Lifestyle', 'Opinion', 'Education'];

export interface Article {
  _id?: ObjectId;
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

type ArticleDocument = Omit<Article, 'id'>;

function fromDocument(doc: ArticleDocument): Article {
  const { _id, ...rest } = doc;
  return {
    ...rest,
    id: _id!.toString(),
    createdAt: new Date(doc.createdAt),
  };
}

async function getArticlesCollection() {
  const db = await getDb();
  return db.collection<ArticleDocument>('articles');
}

export async function getArticles(count?: number): Promise<Article[]> {
  const collection = await getArticlesCollection();
  const query = collection.find().sort({ createdAt: -1 });
  if (count) {
    query.limit(count);
  }
  const articles = await query.toArray();
  return articles.map(fromDocument);
}

export async function getArticle(id: string): Promise<Article | null> {
  if (!ObjectId.isValid(id)) {
      return null;
  }
  const collection = await getArticlesCollection();
  const articleDoc = await collection.findOne({ _id: new ObjectId(id) });
  return articleDoc ? fromDocument(articleDoc) : null;
}

export async function getArticlesByCategory(category: string): Promise<Article[]> {
    const collection = await getArticlesCollection();
    const normalizedCategory = category.charAt(0).toUpperCase() + category.slice(1);
    const articles = await collection.find({ category: normalizedCategory }).sort({ createdAt: -1 }).toArray();
    return articles.map(fromDocument);
}

export async function getArticleBySlug(slug: string): Promise<Article | null> {
    const articles = await getArticles();
    const article = articles.find(a => slugify(a.title) === slug);
    return article || null;
}

export async function getFeaturedArticles(): Promise<Article[]> {
  const collection = await getArticlesCollection();
  const articles = await collection.find({ featured: true }).sort({ createdAt: -1 }).limit(5).toArray();
  return articles.map(fromDocument);
}

export async function getTrendingArticles(): Promise<Article[]> {
  const collection = await getArticlesCollection();
  const articles = await collection.find({ trending: true }).sort({ createdAt: -1 }).limit(5).toArray();
  return articles.map(fromDocument);
}

export async function getBreakingNews(): Promise<Article[]> {
  const collection = await getArticlesCollection();
  const articles = await collection.find({ breaking: true }).sort({ createdAt: -1 }).limit(5).toArray();
  return articles.map(fromDocument);
}
