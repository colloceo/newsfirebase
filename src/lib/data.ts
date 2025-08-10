
import { collection, getDocs, query, where, orderBy, limit, doc, getDoc, addDoc, Timestamp, setDoc, deleteDoc, writeBatch } from "firebase/firestore";
import { db } from './firebase';
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

// Helper to convert Firestore Timestamps to Dates
const fromFirestore = (articleData: any): Article => {
  const { createdAt, ...rest } = articleData;
  return {
    ...rest,
    createdAt: (createdAt as Timestamp).toDate(),
  } as Article;
};

const initialArticles: Omit<Article, 'id' | 'createdAt'>[] = [
    {
        title: 'Taifa Stars Kick Off CECAFA Campaign with a Win', category: 'Sports', summary: 'Tanzania\'s Taifa Stars started their CECAFA Senior Challenge Cup campaign on a high note with a 2-0 victory over Somalia.', imageUrl: 'https://placehold.co/600x400.png', imageHint: 'soccer match', featured: true, trending: true, breaking: true
    },
    {
        title: 'Kenyan Shilling Gains Against the Dollar', category: 'Business', summary: 'The Kenyan Shilling has seen a significant gain against the US Dollar, trading at its strongest in over a year.', imageUrl: 'https://placehold.co/600x400.png', imageHint: 'money currency', featured: true, trending: true
    },
    {
        title: 'New Tech Hub Launched in Nairobi', category: 'Tech', summary: 'A new state-of-the-art technology hub was launched in Nairobi, promising to nurture local innovation and startups.', imageUrl: 'https://placehold.co/600x400.png', imageHint: 'modern office', featured: true, trending: true, breaking: true
    },
    {
        title: 'Parliament Debates New Housing Bill', category: 'Politics', summary: 'Members of Parliament are currently in a heated debate over the proposed new housing bill aimed at providing affordable housing.', imageUrl: 'https://placehold.co/600x400.png', imageHint: 'government building', featured: true, trending: true
    },
    {
        title: 'Annual Cultural Festival Attracts Thousands', category: 'Culture', summary: 'The annual cultural festival held in Mombasa attracted thousands of tourists and locals, showcasing diverse traditions.', imageUrl: 'https://placehold.co/600x400.png', imageHint: 'cultural festival', trending: true
    },
    {
        title: 'Gor Mahia Clinches Premier League Title', category: 'Sports', summary: 'Gor Mahia has been crowned the champions of the Kenyan Premier League for the 21st time after a thrilling final match.', imageUrl: 'https://placehold.co/600x400.png', imageHint: 'sports trophy', featured: true, breaking: true
    },
    {
        title: 'Safaricom Announces Yearly Profits', category: 'Business', summary: 'Telecom giant Safaricom has announced its annual financial results, posting a significant profit despite economic challenges.', imageUrl: 'https://placehold.co/600x400.png', imageHint: 'corporate building'
    },
    {
        title: 'Afrobeats Star to Tour Kenya', category: 'Entertainment', summary: 'Popular Afrobeats artist is set to perform in Nairobi and Mombasa as part of their world tour.', imageUrl: 'https://placehold.co/600x400.png', imageHint: 'music concert', trending: true
    },
];

async function seedInitialData() {
    const articlesCollection = collection(db, 'articles');
    const batch = writeBatch(db);
    initialArticles.forEach(article => {
        const docRef = doc(articlesCollection);
        batch.set(docRef, { ...article, createdAt: Timestamp.now() });
    });
    await batch.commit();
    console.log('Initial data seeded successfully.');
}


export async function getArticles(count?: number): Promise<Article[]> {
  try {
    const articlesCollection = collection(db, 'articles');
    let q = query(articlesCollection, orderBy('createdAt', 'desc'));
    if (count) {
      q = query(q, limit(count));
    }
    const querySnapshot = await getDocs(q);

    if (querySnapshot.empty) {
        console.log('No articles found. Seeding initial data...');
        await seedInitialData();
        // After seeding, fetch again
        const seededSnapshot = await getDocs(q);
        return seededSnapshot.docs.map(doc => fromFirestore({ id: doc.id, ...doc.data() }));
    }

    return querySnapshot.docs.map(doc => fromFirestore({ id: doc.id, ...doc.data() }));
  } catch (error) {
    console.error("Error fetching articles: ", error);
    return [];
  }
}

export async function getArticle(id: string): Promise<Article | null> {
    try {
        const docRef = doc(db, 'articles', id);
        const docSnap = await getDoc(docRef);
        if (docSnap.exists()) {
            return fromFirestore({ id: docSnap.id, ...docSnap.data() });
        }
        return null;
    } catch (error) {
        console.error("Error fetching article: ", error);
        return null;
    }
}

export async function getArticlesByCategory(category: string): Promise<Article[]> {
    try {
        const normalizedCategory = category.charAt(0).toUpperCase() + category.slice(1);
        const q = query(collection(db, 'articles'), where('category', '==', normalizedCategory), orderBy('createdAt', 'desc'));
        const querySnapshot = await getDocs(q);
        return querySnapshot.docs.map(doc => fromFirestore({ id: doc.id, ...doc.data() }));
    } catch (error) {
        console.error("Error fetching articles by category: ", error);
        return [];
    }
}

export async function getArticleBySlug(slug: string): Promise<Article | null> {
    try {
        const articles = await getArticles(); // Not ideal, but Firestore doesn't support slug queries out-of-the-box
        return articles.find(a => slugify(a.title) === slug) || null;
    } catch (error) {
        console.error("Error fetching article by slug: ", error);
        return null;
    }
}

export async function getFeaturedArticles(): Promise<Article[]> {
    try {
        const q = query(collection(db, 'articles'), where('featured', '==', true), orderBy('createdAt', 'desc'), limit(5));
        const querySnapshot = await getDocs(q);
        return querySnapshot.docs.map(doc => fromFirestore({ id: doc.id, ...doc.data() }));
    } catch (error) {
        console.error("Error fetching featured articles: ", error);
        return [];
    }
}

export async function getTrendingArticles(): Promise<Article[]> {
    try {
        const q = query(collection(db, 'articles'), where('trending', '==', true), orderBy('createdAt', 'desc'), limit(5));
        const querySnapshot = await getDocs(q);
        return querySnapshot.docs.map(doc => fromFirestore({ id: doc.id, ...doc.data() }));
    } catch (error) {
        console.error("Error fetching trending articles: ", error);
        return [];
    }
}

export async function getBreakingNews(): Promise<Article[]> {
    try {
        const q = query(collection(db, 'articles'), where('breaking', '==', true), orderBy('createdAt', 'desc'), limit(5));
        const querySnapshot = await getDocs(q);
        return querySnapshot.docs.map(doc => fromFirestore({ id: doc.id, ...doc.data() }));
    } catch (error) {
        console.error("Error fetching breaking news: ", error);
        return [];
    }
}

// These functions are for mutating data in Firestore.
export async function addArticle(article: Omit<Article, 'id' | 'createdAt'>) {
    try {
        const articlesCollection = collection(db, 'articles');
        const newDocRef = await addDoc(articlesCollection, {
            ...article,
            createdAt: Timestamp.now(),
        });
        return newDocRef.id;
    } catch (error) {
        console.error("Error adding article: ", error);
        throw error;
    }
}

export async function updateArticle(id: string, updates: Partial<Omit<Article, 'id'|'createdAt'>>) {
    try {
        const docRef = doc(db, 'articles', id);
        // We don't want to update the creation date
        const { createdAt, ...updateData } = updates as Partial<Article>;
        await setDoc(docRef, updateData, { merge: true });
    } catch (error) {
        console.error("Error updating article: ", error);
        throw error;
    }
}

export async function removeArticle(id: string) {
    try {
        const docRef = doc(db, 'articles', id);
        await deleteDoc(docRef);
    } catch (error) {
        console.error("Error removing article: ", error);
        throw error;
    }
}
