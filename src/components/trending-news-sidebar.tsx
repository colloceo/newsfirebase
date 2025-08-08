import { articles } from '@/lib/data';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { TrendingUp } from 'lucide-react';
import { Separator } from '@/components/ui/separator';
import Link from 'next/link';
import Image from 'next/image';

export default function TrendingNewsSidebar() {
  const trendingArticles = articles.filter(article => article.trending).slice(0, 5);

  return (
    <aside>
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <TrendingUp className="h-6 w-6 text-primary" />
            <span className="text-2xl">Trending</span>
          </CardTitle>
        </CardHeader>
        <CardContent>
          <ul className="space-y-4">
            {trendingArticles.map((article, index) => (
              <li key={article.id}>
                <Link href={`/article/${article.title.toLowerCase().replace(/\s+/g, '-')}`} className="group flex items-start gap-4">
                  <div className="relative w-16 h-16 flex-shrink-0">
                     <Image
                      src={article.imageUrl}
                      alt={article.title}
                      fill
                      data-ai-hint={article.imageHint}
                      className="rounded-md object-cover"
                    />
                  </div>
                  <div>
                    <h3 className="font-bold leading-tight group-hover:text-primary transition-colors">{article.title}</h3>
                    <p className="text-sm text-muted-foreground mt-1">{article.category}</p>
                  </div>
                </Link>
                {index < trendingArticles.length - 1 && <Separator className="mt-4" />}
              </li>
            ))}
          </ul>
        </CardContent>
      </Card>
    </aside>
  );
}
