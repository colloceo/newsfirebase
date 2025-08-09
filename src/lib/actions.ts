'use server';

import { revalidatePath } from 'next/cache';
import { z } from 'zod';
import { slugify } from './utils';
import { allCategories, mockArticles } from './data';
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

  try {
    if (articleId) {
      const index = mockArticles.findIndex(a => a.id === articleId);
      if (index !== -1) {
        mockArticles[index] = { ...mockArticles[index], ...articleData };
      }
    } else {
      const newArticle: Article = {
        id: (mockArticles.length + 1).toString(),
        ...articleData,
        createdAt: new Date(),
      };
      mockArticles.unshift(newArticle);
    }

    revalidatePath('/');
    revalidatePath('/admin/articles');
    revalidatePath(`/category/${articleData.category.toLowerCase()}`);
    if (articleId) {
      const articleSlug = slugify(articleData.title);
      revalidatePath(`/article/${articleSlug}`);
    }

    return { message: `Article ${articleId ? 'updated' : 'published'} successfully.`, success: true };

  } catch (error) {
    console.error("Failed to save article:", error);
    return { message: 'Failed to save the article. Please try again.', success: false };
  }
}


export async function deleteArticle(id: string) {
    try {
        const index = mockArticles.findIndex(a => a.id === id);
        if (index !== -1) {
          mockArticles.splice(index, 1);
        }
        revalidatePath('/admin/articles');
        revalidatePath('/');
    } catch (error) {
        console.error("Error deleting article: ", error);
        throw new Error("Could not delete article.");
    }
}
