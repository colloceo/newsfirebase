'use server';

import { suggestArticleTags } from '@/ai/flows/suggest-article-tags';

type FormState = {
  tags?: string[];
  error?: string;
};

export async function handleSuggestTags(
  prevState: FormState,
  formData: FormData
): Promise<FormState> {
  const articleContent = formData.get('articleContent') as string;

  if (!articleContent || articleContent.trim().length < 50) {
    return { error: 'Please provide at least 50 characters of article content.' };
  }

  try {
    const result = await suggestArticleTags({ articleContent });
    if (result.tags && result.tags.length > 0) {
      return { tags: result.tags };
    }
    return { error: 'Could not generate tags. The AI model might have returned an empty list.' };
  } catch (e) {
    console.error(e);
    const errorMessage = e instanceof Error ? e.message : 'An unknown error occurred.';
    return { error: `Failed to suggest tags: ${errorMessage}` };
  }
}
