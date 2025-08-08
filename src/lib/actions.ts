'use server';

import { revalidatePath } from 'next/cache';
import { db } from './firebase';
import { collection, addDoc, serverTimestamp, doc, updateDoc, deleteDoc } from 'firebase/firestore';

// A helper type for article data without the ID
type ArticleData = {
    title: string;
    category: string;
    summary: string;
    imageUrl: string;
    imageHint: string;
    featured?: boolean;
    trending?: boolean;
    breaking?: boolean;
};

// Function to add a new article
export async function addArticle(data: ArticleData) {
    try {
        await addDoc(collection(db, 'articles'), {
            ...data,
            createdAt: serverTimestamp(),
        });
        // Revalidate paths to show the new article immediately
        revalidatePath('/');
        revalidatePath('/admin/articles');
        revalidatePath(`/category/${data.category.toLowerCase()}`);
    } catch (error) {
        console.error("Error adding document: ", error);
        throw new Error("Could not add article.");
    }
}

// Function to update an existing article
export async function updateArticle(id: string, data: Partial<ArticleData>) {
    try {
        const articleRef = doc(db, 'articles', id);
        await updateDoc(articleRef, data);
         // Revalidate paths to show the updated article immediately
        revalidatePath('/');
        revalidatePath('/admin/articles');
        revalidatePath(`/article/${id}`);
        if(data.category) {
            revalidatePath(`/category/${data.category.toLowerCase()}`);
        }
    } catch (error) {
        console.error("Error updating document: ", error);
        throw new Error("Could not update article.");
    }
}

// Function to delete an article
export async function deleteArticle(id: string) {
    try {
        await deleteDoc(doc(db, 'articles', id));
        revalidatePath('/admin/articles');
        revalidatePath('/');
    } catch (error) {
        console.error("Error deleting document: ", error);
        throw new Error("Could not delete article.");
    }
}
