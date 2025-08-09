import { Collection, Db, FindOptions, MongoClient, ObjectId, Sort } from 'mongodb';
import { getClient } from './mongodb';
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

// This type is what's stored in MongoDB
type ArticleDocument = Omit<Article, 'id'> & {
  _id: ObjectId;
};


// Helper to connect to the database and get the articles collection
async function getArticlesCollection(): Promise<{ client: MongoClient, collection: Collection<ArticleDocument> }> {
  const client = await getClient();
  const db: Db = client.db();
  const collection = db.collection<ArticleDocument>('articles');
  return { client, collection };
}

// Helper to convert a MongoDB document to an Article object
const fromMongo = (doc: ArticleDocument): Article => {
  const { _id, ...rest } = doc;
  return {
    id: _id.toHexString(),
    ...rest,
    createdAt: rest.createdAt,
  };
};

export async function getArticles(count?: number): Promise<Article[]> {
  const { collection } = await getArticlesCollection();
  const options: FindOptions<ArticleDocument> = {
    sort: { createdAt: -1 as Sort['createdAt'] },
    limit: count,
  };
  const articles = await collection.find({}, options).toArray();
  return articles.map(fromMongo);
}

export async function getArticle(id: string): Promise<Article | null> {
  if (!ObjectId.isValid(id)) {
    return null;
  }
  const { collection } = await getArticlesCollection();
  const doc = await collection.findOne({ _id: new ObjectId(id) });
  if (doc) {
    return fromMongo(doc);
  }
  return null;
}

export async function getArticlesByCategory(category: string): Promise<Article[]> {
    const normalizedCategory = category.charAt(0).toUpperCase() + category.slice(1);
    const { collection } = await getArticlesCollection();
    const q = { category: normalizedCategory as ArticleCategory };
    const options: FindOptions<ArticleDocument> = { sort: { createdAt: -1 as Sort['createdAt'] } };
    const articles = await collection.find(q, options).toArray();
    return articles.map(fromMongo);
}


export async function getArticleBySlug(slug: string): Promise<Article | null> {
    const allArticles = await getArticles();
    // This is not efficient for large datasets, but works for this example.
    // A better approach would be to store the slug in the document itself.
    return allArticles.find(a => slugify(a.title) === slug) || null;
}


export async function getFeaturedArticles(): Promise<Article[]> {
  const { collection } = await getArticlesCollection();
  const q = { featured: true };
  const options: FindOptions<ArticleDocument> = {
    sort: { createdAt: -1 as Sort['createdAt'] },
    limit: 5
  };
  const articles = await collection.find(q, options).toArray();
  return articles.map(fromMongo);
}

export async function getTrendingArticles(): Promise<Article[]> {
  const { collection } = await getArticlesCollection();
  const q = { trending: true };
  const options: FindOptions<ArticleDocument> = {
    sort: { createdAt: -1 as Sort['createdAt'] },
    limit: 5
  };
  const articles = await collection.find(q, options).toArray();
  return articles.map(fromMongo);
}

export async function getBreakingNews(): Promise<Article[]> {
 const { collection } = await getArticlesCollection();
  const q = { breaking: true };
  const options: FindOptions<ArticleDocument> = {
    sort: { createdAt: -1 as Sort['createdAt'] },
    limit: 5
  };
  const articles = await collection.find(q, options).toArray();
  return articles.map(fromMongo);
}
