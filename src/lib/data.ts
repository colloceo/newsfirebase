import { db } from './firebase';
import { collection, getDocs, doc, getDoc, query, where, orderBy, limit, addDoc, Timestamp, writeBatch } from 'firebase/firestore';
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

// Helper function to convert Firestore Timestamp to Date and map document
function toArticle(doc: any): Article {
  const data = doc.data();
  return {
    id: doc.id,
    title: data.title,
    category: data.category,
    summary: data.summary,
    imageUrl: data.imageUrl,
    imageHint: data.imageHint,
    featured: data.featured || false,
    trending: data.trending || false,
    breaking: data.breaking || false,
    createdAt: (data.createdAt as Timestamp)?.toDate() || new Date(),
  };
}

const seedInitialData = async () => {
  const articlesCollection = collection(db, 'articles');
  const snapshot = await getDocs(query(articlesCollection, limit(1)));
  if (snapshot.empty) {
    console.log("No articles found. Seeding initial data...");
    const batch = writeBatch(db);
    const mockArticles = [
        {
            title: 'Taifa Stars Kick Off CECAFA Campaign with a Win', category: 'Sports', summary: 'Tanzania\'s Taifa Stars started their CECAFA Senior Challenge Cup campaign on a high note with a 2-0 victory over Somalia.', imageUrl: 'https://placehold.co/600x400.png', imageHint: 'soccer match', featured: true, trending: true, breaking: true, createdAt: new Date('2024-07-20T10:00:00Z')
        },
        {
            title: 'Kenyan Shilling Gains Against the Dollar', category: 'Business', summary: 'The Kenyan Shilling has seen a significant gain against the US Dollar, trading at its strongest in over a year.', imageUrl: 'https://placehold.co/600x400.png', imageHint: 'money currency', featured: true, trending: true, createdAt: new Date('2024-07-20T09:00:00Z')
        },
        {
            title: 'New Tech Hub Launched in Nairobi', category: 'Tech', summary: 'A new state-of-the-art technology hub was launched in Nairobi, promising to nurture local innovation and startups.', imageUrl: 'https://placehold.co/600x400.png', imageHint: 'modern office', featured: true, trending: true, breaking: true, createdAt: new Date('2024-07-20T08:00:00Z')
        },
        {
            title: 'Parliament Debates New Housing Bill', category: 'Politics', summary: 'Members of Parliament are currently in a heated debate over the proposed new housing bill aimed at providing affordable housing.', imageUrl: 'https://placehold.co/600x400.png', imageHint: 'government building', featured: true, trending: true, createdAt: new Date('2024-07-19T15:00:00Z')
        },
        {
            title: 'Annual Cultural Festival Attracts Thousands', category: 'Culture', summary: 'The annual cultural festival held in Mombasa attracted thousands of tourists and locals, showcasing diverse traditions.', imageUrl: 'https://placehold.co/600x400.png', imageHint: 'cultural festival', trending: true, createdAt: new Date('2024-07-19T11:00:00Z')
        },
        {
            title: 'Gor Mahia Clinches Premier League Title', category: 'Sports', summary: 'Gor Mahia has been crowned the champions of the Kenyan Premier League for the 21st time after a thrilling final match.', imageUrl: 'https://placehold.co/600x400.png', imageHint: 'sports trophy', featured: true, breaking: true, createdAt: new Date('2024-07-20T18:00:00Z')
        },
        {
            title: 'Safaricom Announces Yearly Profits', category: 'Business', summary: 'Telecom giant Safaricom has announced its annual financial results, posting a significant profit despite economic challenges.', imageUrl: 'https://placehold.co/600x400.png', imageHint: 'corporate building', createdAt: new Date('2024-07-20T16:00:00Z')
        },
        {
            title: 'Afrobeats Star to Tour Kenya', category: 'Entertainment', summary: 'Popular Afrobeats artist is set to perform in Nairobi and Mombasa as part of their world tour.', imageUrl: 'https://placehold.co/600x400.png', imageHint: 'music concert', trending: true, createdAt: new Date('2024-07-18T19:00:00Z')
        },
    ];
    mockArticles.forEach(article => {
      const docRef = doc(collection(db, 'articles'));
      batch.set(docRef, article);
    });
    await batch.commit();
    console.log("Initial data seeded.");
  }
};


export async function getArticles(count?: number): Promise<Article[]> {
  await seedInitialData();
  const articlesCollection = collection(db, 'articles');
  let q = query(articlesCollection, orderBy('createdAt', 'desc'));
  if (count) {
    q = query(q, limit(count));
  }
  const snapshot = await getDocs(q);
  return snapshot.docs.map(toArticle);
}

export async function getArticle(id: string): Promise<Article | null> {
  const docRef = doc(db, 'articles', id);
  const docSnap = await getDoc(docRef);
  if (docSnap.exists()) {
    return toArticle(docSnap);
  }
  return null;
}

export async function getArticlesByCategory(category: string): Promise<Article[]> {
  const normalizedCategory = category.charAt(0).toUpperCase() + category.slice(1);
  const articlesCollection = collection(db, 'articles');
  const q = query(articlesCollection, where('category', '==', normalizedCategory), orderBy('createdAt', 'desc'));
  const snapshot = await getDocs(q);
  return snapshot.docs.map(toArticle);
}

export async function getArticleBySlug(slug: string): Promise<Article | null> {
  const articlesCollection = collection(db, 'articles');
  const snapshot = await getDocs(articlesCollection);
  const articles = snapshot.docs.map(toArticle);
  return articles.find(a => slugify(a.title) === slug) || null;
}

export async function getFeaturedArticles(): Promise<Article[]> {
  const articlesCollection = collection(db, 'articles');
  const q = query(articlesCollection, where('featured', '==', true), orderBy('createdAt', 'desc'), limit(5));
  const snapshot = await getDocs(q);
  return snapshot.docs.map(toArticle);
}

export async function getTrendingArticles(): Promise<Article[]> {
    const articlesCollection = collection(db, 'articles');
    const q = query(articlesCollection, where('trending', '==', true), orderBy('createdAt', 'desc'), limit(5));
    const snapshot = await getDocs(q);
    return snapshot.docs.map(toArticle);
}

export async function getBreakingNews(): Promise<Article[]> {
    const articlesCollection = collection(db, 'articles');
    const q = query(articlesCollection, where('breaking', '==', true), orderBy('createdAt', 'desc'), limit(5));
    const snapshot = await getDocs(q);
    return snapshot.docs.map(toArticle);
}
