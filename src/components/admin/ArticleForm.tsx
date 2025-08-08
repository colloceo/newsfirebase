'use client';

import { Card, CardContent, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Button } from '@/components/ui/button';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { allCategories, Article } from '@/lib/data';
import { Save } from 'lucide-react';
import { useRouter } from 'next/navigation';

interface ArticleFormProps {
  article?: Article;
}

export default function ArticleForm({ article }: ArticleFormProps) {
  const router = useRouter();

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    // Here you would typically handle form submission to your backend API
    // For now, we'll just navigate back to the articles list
    router.push('/admin/articles');
  };

  return (
    <form onSubmit={handleSubmit}>
      <Card>
        <CardHeader>
          <CardTitle>{article ? 'Edit Article Details' : 'New Article Details'}</CardTitle>
        </CardHeader>
        <CardContent className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="space-y-2">
            <Label htmlFor="title">Title</Label>
            <Input id="title" defaultValue={article?.title} placeholder="Enter article title" />
          </div>
          <div className="space-y-2">
            <Label htmlFor="category">Category</Label>
            <Select defaultValue={article?.category}>
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
            <Textarea id="summary" defaultValue={article?.summary} placeholder="Enter a brief summary" />
          </div>
          <div className="space-y-2">
            <Label htmlFor="imageUrl">Image URL</Label>
            <Input id="imageUrl" defaultValue={article?.imageUrl} placeholder="https://example.com/image.png" />
          </div>
          <div className="space-y-2">
            <Label htmlFor="imageHint">Image Hint</Label>
            <Input id="imageHint" defaultValue={article?.imageHint} placeholder="e.g. 'political debate'" />
          </div>
        </CardContent>
        <CardFooter>
          <Button type="submit">
            <Save className="mr-2 h-4 w-4" />
            {article ? 'Save Changes' : 'Publish Article'}
          </Button>
        </CardFooter>
      </Card>
    </form>
  );
}
