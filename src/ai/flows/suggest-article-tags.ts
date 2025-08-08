'use server';

/**
 * @fileOverview This file defines a Genkit flow for suggesting relevant tags for news articles using AI.
 *
 * - suggestArticleTags - A function that takes article content as input and returns a list of suggested tags.
 * - SuggestArticleTagsInput - The input type for the suggestArticleTags function.
 * - SuggestArticleTagsOutput - The return type for the suggestArticleTags function.
 */

import {ai} from '@/ai/genkit';
import {z} from 'genkit';

const SuggestArticleTagsInputSchema = z.object({
  articleContent: z
    .string()
    .describe('The content of the news article for which tags are to be suggested.'),
});
export type SuggestArticleTagsInput = z.infer<typeof SuggestArticleTagsInputSchema>;

const SuggestArticleTagsOutputSchema = z.object({
  tags: z
    .array(z.string())
    .describe('An array of suggested tags for the article, optimized for searchability and categorization.'),
});
export type SuggestArticleTagsOutput = z.infer<typeof SuggestArticleTagsOutputSchema>;

export async function suggestArticleTags(input: SuggestArticleTagsInput): Promise<SuggestArticleTagsOutput> {
  return suggestArticleTagsFlow(input);
}

const prompt = ai.definePrompt({
  name: 'suggestArticleTagsPrompt',
  input: {schema: SuggestArticleTagsInputSchema},
  output: {schema: SuggestArticleTagsOutputSchema},
  prompt: `You are an AI assistant designed to suggest relevant tags for news articles.
  Analyze the content of the article provided and suggest a list of tags that are relevant, optimized for searchability and categorization.
  Return the tags as a JSON array of strings.

  Article Content: {{{articleContent}}}
  `,
});

const suggestArticleTagsFlow = ai.defineFlow(
  {
    name: 'suggestArticleTagsFlow',
    inputSchema: SuggestArticleTagsInputSchema,
    outputSchema: SuggestArticleTagsOutputSchema,
  },
  async input => {
    const {output} = await prompt(input);
    return output!;
  }
);
