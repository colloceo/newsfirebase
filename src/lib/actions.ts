
'use server';

import { revalidatePath } from 'next/cache';
import { z } from 'zod';
import { slugify } from './utils';
import { addArticle, updateArticle, removeArticle } from './data';
import { Timestamp } from 'firebase/firestore';


const articleSchema = z.object({
  title: z.string().min(1, "Title is required"),
  category: z.string().min(1, "Category is required"),
  summary: z.string().min(1, "Summary is required"),
  imageUrl: z.string().url("Invalid URL format").min(1, "Image is required"),
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
    console.log(validatedFields.error.flatten().fieldErrors);
    return {
      message: 'Validation failed.',
      errors: validatedFields.error.flatten().fieldErrors,
      success: false,
    };
  }
  
  const articleId = formData.get('id') as string | null;
  
  try {
    if (articleId) {
      // When updating, we don't change the createdAt field.
      await updateArticle(articleId, validatedFields.data);
    } else {
      // The addArticle function in data.ts will handle createdAt.
      await addArticle(validatedFields.data);
    }
  } catch (error) {
    console.error("Operation failed", error);
    return {
      message: 'An error occurred while saving the article.',
      success: false,
    };
  }

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
  try {
    await removeArticle(id);
  } catch (error) {
    console.error("Deletion failed", error);
    // Optionally return an error state
  }
    
  revalidatePath('/admin/articles');
  revalidatePath('/');
}
