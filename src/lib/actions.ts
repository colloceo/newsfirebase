'use server';

import { revalidatePath } from 'next/cache';
import { db } from './firebase';
import { collection, addDoc, serverTimestamp, doc, updateDoc, deleteDoc } from 'firebase/firestore';
import { z } from 'zod';

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

// Zod schema for validation
const articleSchema = z.object({
  id: z.string().optional(),
  title: z.string().min(1, "Title is required"),
  category: z.string().min(1, "Category is required"),
  summary: z.string().min(1, "Summary is required"),
  imageUrl: z.string().url("Invalid URL format"),
  imageHint: z.string().min(1, "Image hint is required"),
  featured: z.boolean(),
  trending: z.boolean(),
  breaking: z.boolean(),
});

export type FormState = {
  message: string;
  errors?: Record<string, string[]>;
  success: boolean;
};

export async function saveArticle(
  prevState: FormState,
  formData: FormData
): Promise<FormState> {
  const articleId = formData.get('id') as string | null;

  const validatedFields = articleSchema.safeParse({
    id: articleId,
    title: formData.get('title'),
    category: formData.get('category'),
    summary: formData.get('summary'),
    imageUrl: formData.get('imageUrl'),
    imageHint: formData.get('imageHint'),
    featured: formData.get('featured') === 'on',
    trending: formData.get('trending') === 'on',
    breaking: formData.get('breaking') === 'on',
  });

  if (!validatedFields.success) {
    return {
      message: 'Validation failed.',
      errors: validatedFields.error.flatten().fieldErrors,
      success: false,
    };
  }
  
  const { id, ...articleData } = validatedFields.data;

  try {
    if (id) {
      // Update existing article
      const articleRef = doc(db, 'articles', id);
      await updateDoc(articleRef, articleData);
    } else {
      // Create new article
      await addDoc(collection(db, 'articles'), {
          ...articleData,
          createdAt: serverTimestamp(),
      });
    }

    // Revalidate paths to show the new/updated article immediately
    revalidatePath('/');
    revalidatePath('/admin/articles');
    revalidatePath(`/category/${articleData.category.toLowerCase()}`);
    if (id) {
      revalidatePath(`/article/${id}`);
    }

    return { message: `Article ${id ? 'updated' : 'published'} successfully.`, success: true };

  } catch (error) {
    console.error("Failed to save article:", error);
    return { message: 'Failed to save the article. Please try again.', success: false };
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
