import Image from 'next/image';
import { articles, Article } from '@/lib/data';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Separator } from '@/components/ui/separator';
import Link from 'next/link';

const categories: Article['category'][] = ['Politics', 'Business', 'Sports', 'Tech', 'Culture'];

function ArticleList({ category }: { category: Article['category'] }) {
  const categoryArticles = articles.filter(article => article.category === category).slice(0, 4);
  const articleSlug = (title: string) => title.toLowerCase().replace(/\s+/g, '-');

  return (
    <div className="space-y-6">
      {categoryArticles.map((article, index) => (
        <div key={article.id}>
          <Card className="border-0 shadow-none rounded-none flex flex-col md:flex-row gap-6">
            <Link href={`/article/${articleSlug(article.title)}`} className="relative w-full md:w-1/3 h-48 md:h-auto flex-shrink-0">
              <Image
                src={article.imageUrl}
                alt={article.title}
                fill
                data-ai-hint={article.imageHint}
                className="rounded-md object-cover"
              />
            </Link>
            <div className="flex flex-col">
              <CardHeader className="p-0">
                <CardTitle className="text-xl">
                   <Link href={`/article/${articleSlug(article.title)}`} className="hover:text-primary transition-colors">
                      {article.title}
                    </Link>
                </CardTitle>
              </CardHeader>
              <CardContent className="p-0 pt-2">
                <CardDescription>{article.summary}</CardDescription>
              </CardContent>
            </div>
          </Card>
          {index < categoryArticles.length - 1 && <Separator className="mt-6" />}
        </div>
      ))}
    </div>
  );
}

export default function CategorizedNews() {
  return (
    <section aria-labelledby="categorized-news-title">
      <h2 id="categorized-news-title" className="text-3xl font-bold mb-4">In-depth Coverage</h2>
      <Tabs defaultValue="Politics" className="w-full">
        <TabsList className="grid w-full grid-cols-2 sm:grid-cols-3 md:grid-cols-5 mb-4 h-auto flex-wrap">
          {categories.map(category => (
            <TabsTrigger key={category} value={category} className="text-base">{category}</TabsTrigger>
          ))}
        </TabsList>
        {categories.map(category => (
          <TabsContent key={category} value={category}>
            <ArticleList category={category} />
          </TabsContent>
        ))}
      </Tabs>
    </section>
  );
}
