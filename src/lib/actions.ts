'use server';

import { revalidatePath } from 'next/cache';
import { z } from 'zod';
import { slugify } from './utils';
import { getDb } from './mongodb';
import { ObjectId } from 'mongodb';
import type { Article } from './data';


const articleSchema = z.object({
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
  
  const { ...articleData } = validatedFields.data;
  const articleSlug = slugify(articleData.title);

  try {
     const db = await getDb();
     const collection = db.collection('articles');

    if (articleId) {
       if (!ObjectId.isValid(articleId)) {
        return { message: 'Invalid article ID.', success: false };
      }
      await collection.updateOne(
        { _id: new ObjectId(articleId) },
        { $set: articleData }
      );
    } else {
      await collection.insertOne({ ...articleData, createdAt: new Date() });
    }

    revalidatePath('/');
    revalidatePath('/admin/articles');
    revalidatePath(`/category/${articleData.category.toLowerCase()}`);
    if (articleId) {
      revalidatePath(`/article/${articleSlug}`);
    }

    return { message: `Article ${articleId ? 'updated' : 'published'} successfully.`, success: true };

  } catch (error) {
    console.error("Failed to save article:", error);
    return { message: 'Failed to save the article. Please try again.', success: false };
  }
}


export async function deleteArticle(id: string) {
    if (!ObjectId.isValid(id)) {
        throw new Error("Invalid article ID.");
    }
    try {
        const db = await getDb();
        const collection = db.collection('articles');
        await collection.deleteOne({ _id: new ObjectId(id) });
        
        revalidatePath('/admin/articles');
        revalidatePath('/');
    } catch (error) {
        console.error("Error deleting document: ", error);
        throw new Error("Could not delete article.");
    }
}
