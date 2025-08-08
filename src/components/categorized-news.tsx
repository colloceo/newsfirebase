import Image from 'next/image';
import { articles, Article, allCategories } from '@/lib/data';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Separator } from '@/components/ui/separator';
import Link from 'next/link';
import { slugify } from '@/lib/utils';

const categoriesToShow: Article['category'][] = ['Politics', 'Business', 'Sports', 'Tech', 'Entertainment'];

function ArticleList({ category }: { category: Article['category'] }) {
  const categoryArticles = articles.filter(article => article.category === category).slice(0, 4);

  return (
    <div className="space-y-6">
      {categoryArticles.map((article, index) => (
        <div key={article.id}>
          <Card className="border-0 shadow-none rounded-none flex flex-col md:flex-row gap-4 md:gap-6">
            <Link href={`/article/${slugify(article.title)}`} className="relative w-full md:w-1/3 h-48 md:h-auto flex-shrink-0">
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
                <CardTitle className="text-lg md:text-xl">
                   <Link href={`/article/${slugify(article.title)}`} className="hover:text-primary transition-colors">
                      {article.title}
                    </Link>
                </CardTitle>
              </CardHeader>
              <CardContent className="p-0 pt-2">
                <CardDescription className="text-sm md:text-base">{article.summary}</CardDescription>
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
      <h2 id="categorized-news-title" className="text-2xl md:text-3xl font-bold mb-4">In-depth Coverage</h2>
      <Tabs defaultValue="Politics" className="w-full">
        <div className="overflow-x-auto pb-2">
            <TabsList className="grid w-full grid-cols-[repeat(5,max-content)] sm:grid-cols-5 h-auto">
              {categoriesToShow.map(category => (
                <TabsTrigger key={category} value={category} className="text-sm md:text-base">{category}</TabsTrigger>
              ))}
            </TabsList>
        </div>
        {categoriesToShow.map(category => (
          <TabsContent key={category} value={category} className="mt-4">
            <ArticleList category={category} />
          </TabsContent>
        ))}
      </Tabs>
    </section>
  );
}
