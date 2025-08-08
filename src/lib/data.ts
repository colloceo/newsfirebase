import { db } from './firebase';
import { collection, getDocs, doc, getDoc, query, where, limit, orderBy, Timestamp } from 'firebase/firestore';
import { slugify } from './utils';

export type ArticleCategory = 'Politics' | 'Business' | 'Sports' | 'Tech' | 'Culture' | 'Entertainment' | 'World' | 'Africa' | 'Health' | 'Lifestyle' | 'Opinion' | 'Education';

export const allCategories: ArticleCategory[] = ['Politics', 'Business', 'Sports', 'Tech', 'Culture', 'Entertainment', 'World', 'Africa', 'Health', 'Lifestyle', 'Opinion', 'Education'];

export type Article = {
  id: string; // Firestore document ID
  title: string;
  category: ArticleCategory;
  summary: string;
  imageUrl: string;
  imageHint: string;
  featured?: boolean;
  trending?: boolean;
  breaking?: boolean;
  createdAt: Timestamp;
};

const articlesCollection = collection(db, 'articles');

// Helper to convert a Firestore doc to an Article object
const fromFirestore = (docSnapshot: any): Article => {
  const data = docSnapshot.data();
  return {
    id: docSnapshot.id,
    title: data.title,
    category: data.category,
    summary: data.summary,
    imageUrl: data.imageUrl,
    imageHint: data.imageHint,
    featured: data.featured || false,
    trending: data.trending || false,
    breaking: data.breaking || false,
    createdAt: data.createdAt,
  };
};

export async function getArticles(count?: number): Promise<Article[]> {
  const q = count ? query(articlesCollection, orderBy('createdAt', 'desc'), limit(count)) : query(articlesCollection, orderBy('createdAt', 'desc'));
  const snapshot = await getDocs(q);
  return snapshot.docs.map(fromFirestore);
}

export async function getArticle(id: string): Promise<Article | null> {
  const docRef = doc(db, 'articles', id);
  const docSnap = await getDoc(docRef);
  if (docSnap.exists()) {
    return fromFirestore(docSnap);
  }
  return null;
}

export async function getArticlesByCategory(category: string): Promise<Article[]> {
    const normalizedCategory = category.charAt(0).toUpperCase() + category.slice(1);
    const q = query(articlesCollection, where('category', '==', normalizedCategory), orderBy('createdAt', 'desc'));
    const snapshot = await getDocs(q);
    return snapshot.docs.map(fromFirestore);
}

export async function getArticleBySlug(slug: string): Promise<Article | null> {
    const allArticles = await getArticles();
    // This is not efficient for large datasets, but works for this example.
    // A better approach would be to store the slug in the document itself.
    return allArticles.find(a => slugify(a.title) === slug) || null;
}


export async function getFeaturedArticles(): Promise<Article[]> {
  const q = query(articlesCollection, where('featured', '==', true), orderBy('createdAt', 'desc'), limit(5));
  const snapshot = await getDocs(q);
  return snapshot.docs.map(fromFirestore);
}

export async function getTrendingArticles(): Promise<Article[]> {
  const q = query(articlesCollection, where('trending', '==', true), orderBy('createdAt', 'desc'), limit(5));
  const snapshot = await getDocs(q);
  return snapshot.docs.map(fromFirestore);
}

export async function getBreakingNews(): Promise<Article[]> {
  const q = query(articlesCollection, where('breaking', '==', true), orderBy('createdAt', 'desc'), limit(5));
  const snapshot = await getDocs(q);
  return snapshot.docs.map(fromFirestore);
}
