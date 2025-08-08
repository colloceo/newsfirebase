'use client';

import { useEffect } from 'react';
import { useActionState } from 'react';
import { useFormStatus } from 'react-dom';
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Button } from '@/components/ui/button';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { allCategories, Article } from '@/lib/data';
import { Save, LoaderCircle } from 'lucide-react';
import { useRouter } from 'next/navigation';
import { saveArticle, FormState } from '@/lib/actions';
import { useToast } from '@/hooks/use-toast';

interface ArticleFormProps {
  article?: Article;
}

const initialState: FormState = {
  message: '',
  success: false,
};

function SubmitButton({ isEditing }: { isEditing: boolean }) {
  const { pending } = useFormStatus();

  return (
    <Button type="submit" disabled={pending}>
      {pending ? (
        <LoaderCircle className="mr-2 h-4 w-4 animate-spin" />
      ) : (
        <Save className="mr-2 h-4 w-4" />
      )}
      {isEditing ? 'Save Changes' : 'Publish Article'}
    </Button>
  );
}

export default function ArticleForm({ article }: ArticleFormProps) {
  const router = useRouter();
  const { toast } = useToast();
  const [state, formAction] = useActionState(saveArticle, initialState);

  useEffect(() => {
    if (state.success) {
      toast({ title: "Success", description: state.message });
      router.push('/admin/articles');
    } else if (state.message && !state.success) {
       toast({
        variant: "destructive",
        title: "Error",
        description: state.message,
      });
    }
  }, [state, router, toast]);

  return (
    <form action={formAction}>
      {article && <input type="hidden" name="id" value={article.id} />}
      <Card>
        <CardHeader>
          <CardTitle>{article ? 'Edit Article Details' : 'New Article Details'}</CardTitle>
        </CardHeader>
        <CardContent className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="space-y-2 md:col-span-2">
            <Label htmlFor="title">Title</Label>
            <Input id="title" name="title" defaultValue={article?.title} placeholder="Enter article title" required />
            {state.errors?.title && <p className="text-sm font-medium text-destructive">{state.errors.title.join(', ')}</p>}
          </div>
          <div className="space-y-2">
            <Label htmlFor="category">Category</Label>
            <Select name="category" defaultValue={article?.category} required>
              <SelectTrigger id="category">
                <SelectValue placeholder="Select a category" />
              </SelectTrigger>
              <SelectContent>
                {allCategories.map((cat) => (
                  <SelectItem key={cat} value={cat}>
                    {cat}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
             {state.errors?.category && <p className="text-sm font-medium text-destructive">{state.errors.category.join(', ')}</p>}
          </div>
           <div className="space-y-2 md:col-span-2">
            <Label htmlFor="summary">Summary</Label>
            <Textarea id="summary" name="summary" defaultValue={article?.summary} placeholder="Enter a brief summary" required/>
             {state.errors?.summary && <p className="text-sm font-medium text-destructive">{state.errors.summary.join(', ')}</p>}
          </div>
          <div className="space-y-2">
            <Label htmlFor="imageUrl">Image URL</Label>
            <Input id="imageUrl" name="imageUrl" defaultValue={article?.imageUrl} placeholder="https://placehold.co/600x400.png" required/>
             {state.errors?.imageUrl && <p className="text-sm font-medium text-destructive">{state.errors.imageUrl.join(', ')}</p>}
          </div>
          <div className="space-y-2">
            <Label htmlFor="imageHint">Image Hint (for AI)</Label>
            <Input id="imageHint" name="imageHint" defaultValue={article?.imageHint} placeholder="e.g. 'political debate'" required/>
            {state.errors?.imageHint && <p className="text-sm font-medium text-destructive">{state.errors.imageHint.join(', ')}</p>}
          </div>
          <div className="md:col-span-2 grid grid-cols-3 gap-4">
              <div className="flex items-center space-x-2">
                <input type="checkbox" id="featured" name="featured" defaultChecked={article?.featured} className="h-4 w-4" />
                <Label htmlFor="featured">Featured</Label>
              </div>
               <div className="flex items-center space-x-2">
                <input type="checkbox" id="trending" name="trending" defaultChecked={article?.trending} className="h-4 w-4"/>
                <Label htmlFor="trending">Trending</Label>
              </div>
               <div className="flex items-center space-x-2">
                <input type="checkbox" id="breaking" name="breaking" defaultChecked={article?.breaking} className="h-4 w-4"/>
                <Label htmlFor="breaking">Breaking</Label>
              </div>
          </div>
        </CardContent>
        <CardFooter>
          <SubmitButton isEditing={!!article} />
        </CardFooter>
      </Card>
    </form>
  );
}
