'use server';

import { revalidatePath } from 'next/cache';
import { z } from 'zod';
import { slugify } from './utils';

// Zod schema for validation
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
    // In a real app, you would save to a database here.
    // We'll just log it to the console for this mock version.
    if (articleId) {
      console.log('Updating article:', { id: articleId, ...articleData });
    } else {
      console.log('Creating new article:', { id: Date.now().toString(), ...articleData, createdAt: new Date() });
    }

    // Revalidate paths to show the new/updated article immediately
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

// Function to delete an article
export async function deleteArticle(id: string) {
    try {
        // In a real app, you'd delete from the database.
        // We'll just log it for this mock version.
        console.log("Deleting article with ID:", id);
        revalidatePath('/admin/articles');
        revalidatePath('/');
    } catch (error) {
        console.error("Error deleting document: ", error);
        throw new Error("Could not delete article.");
    }
}
