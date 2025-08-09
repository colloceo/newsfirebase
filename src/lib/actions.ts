'use server';

import { revalidatePath } from 'next/cache';
import { z } from 'zod';
import { slugify } from './utils';
import { getArticles } from './data';

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
  
  // This is where you would interact with your database.
  // Since we're using mock data, we'll just log it.
  console.log('Saving article:', { id: articleId, ...validatedFields.data });


  revalidatePath('/');
  revalidatePath('/admin/articles');
  revalidatePath(`/category/${validatedFields.data.category.toLowerCase()}`);
  if (articleId) {
    const articleSlug = slugify(validatedFields.data.title);
    revalidatePath(`/article/${articleSlug}`);
  }

  return { message: `Article ${articleId ? 'updated' : 'published'} successfully.`, success: true };
}


export async function deleteArticle(id: string) {
    // This is where you would interact with your database.
    // Since we're using mock data, we'll just log it.
    console.log('Deleting article with ID:', id);
    revalidatePath('/admin/articles');
    revalidatePath('/');
}
