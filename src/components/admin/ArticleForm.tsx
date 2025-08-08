'use client';

import { useState } from 'react';
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Button } from '@/components/ui/button';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { allCategories, Article } from '@/lib/data';
import { Save, LoaderCircle } from 'lucide-react';
import { useRouter } from 'next/navigation';
import { addArticle, updateArticle } from '@/lib/actions';
import { useToast } from '@/hooks/use-toast';

interface ArticleFormProps {
  article?: Article;
}

export default function ArticleForm({ article }: ArticleFormProps) {
  const router = useRouter();
  const { toast } = useToast();
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setIsSubmitting(true);
    const formData = new FormData(e.currentTarget);
    
    const articleData = {
      title: formData.get('title') as string,
      category: formData.get('category') as string,
      summary: formData.get('summary') as string,
      imageUrl: formData.get('imageUrl') as string,
      imageHint: formData.get('imageHint') as string,
      // Handle boolean flags for featured, trending, breaking
      featured: formData.get('featured') === 'on',
      trending: formData.get('trending') === 'on',
      breaking: formData.get('breaking') === 'on',
    };

    try {
      if (article) {
        // Update existing article
        await updateArticle(article.id, articleData);
        toast({ title: "Success", description: "Article updated successfully." });
      } else {
        // Create new article
        await addArticle(articleData);
        toast({ title: "Success", description: "Article published successfully." });
      }
      router.push('/admin/articles');
      router.refresh(); // Refresh the page to show the new/updated article
    } catch (error) {
      console.error("Failed to save article:", error);
      toast({
        variant: "destructive",
        title: "Error",
        description: "Failed to save the article. Please try again.",
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <Card>
        <CardHeader>
          <CardTitle>{article ? 'Edit Article Details' : 'New Article Details'}</CardTitle>
        </CardHeader>
        <CardContent className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="space-y-2 md:col-span-2">
            <Label htmlFor="title">Title</Label>
            <Input id="title" name="title" defaultValue={article?.title} placeholder="Enter article title" required />
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
          </div>
           <div className="space-y-2 md:col-span-2">
            <Label htmlFor="summary">Summary</Label>
            <Textarea id="summary" name="summary" defaultValue={article?.summary} placeholder="Enter a brief summary" required/>
          </div>
          <div className="space-y-2">
            <Label htmlFor="imageUrl">Image URL</Label>
            <Input id="imageUrl" name="imageUrl" defaultValue={article?.imageUrl} placeholder="https://placehold.co/600x400.png" required/>
          </div>
          <div className="space-y-2">
            <Label htmlFor="imageHint">Image Hint (for AI)</Label>
            <Input id="imageHint" name="imageHint" defaultValue={article?.imageHint} placeholder="e.g. 'political debate'" required/>
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
          <Button type="submit" disabled={isSubmitting}>
            {isSubmitting ? (
              <LoaderCircle className="mr-2 h-4 w-4 animate-spin" />
            ) : (
              <Save className="mr-2 h-4 w-4" />
            )}
            {article ? 'Save Changes' : 'Publish Article'}
          </Button>
        </CardFooter>
      </Card>
    </form>
  );
}
