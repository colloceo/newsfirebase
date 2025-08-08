'use client';

import { useActionState } from 'react';
import { useFormStatus } from 'react-dom';
import { handleSuggestTags } from './actions';
import { Button } from '@/components/ui/button';
import { Textarea } from '@/components/ui/textarea';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Lightbulb, Tags, LoaderCircle } from 'lucide-react';

const initialState = {
  tags: [],
  error: '',
};

function SubmitButton() {
  const { pending } = useFormStatus();

  return (
    <Button type="submit" disabled={pending} size="lg">
      {pending ? (
        <>
          <LoaderCircle className="mr-2 h-4 w-4 animate-spin" />
          Generating...
        </>
      ) : (
        <>
          <Lightbulb className="mr-2 h-4 w-4" />
          Suggest Tags
        </>
      )}
    </Button>
  );
}

export default function TagSuggesterClient() {
  const [state, formAction] = useActionState(handleSuggestTags, initialState);

  return (
    <Card className="max-w-3xl mx-auto">
      <form action={formAction}>
        <CardHeader>
          <CardTitle className="flex items-center gap-2 text-xl md:text-2xl">
            <Tags className="h-6 w-6 text-primary" />
            <span>AI-Powered Tag Suggester</span>
          </CardTitle>
          <CardDescription>
            Paste your article content below, and our AI will suggest relevant tags to improve searchability and categorization.
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <Textarea
            name="articleContent"
            placeholder="Enter article content here..."
            rows={15}
            required
            className="text-base"
          />
          {state?.error && (
            <p className="text-sm font-medium text-destructive">{state.error}</p>
          )}
          {state?.tags && state.tags.length > 0 && (
            <div>
              <h3 className="font-semibold mb-2 font-headline">Suggested Tags:</h3>
              <div className="flex flex-wrap gap-2">
                {state.tags.map((tag) => (
                  <Badge key={tag} variant="secondary" className="text-sm md:text-base py-1 px-3">
                    {tag}
                  </Badge>
                ))}
              </div>
            </div>
          )}
        </CardContent>
        <CardFooter>
          <SubmitButton />
        </CardFooter>
      </form>
    </Card>
  );
}
