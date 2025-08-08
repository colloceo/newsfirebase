import { articles } from '@/lib/data';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { TrendingUp } from 'lucide-react';
import { Separator } from '@/components/ui/separator';
import Link from 'next/link';

export default function TrendingNewsSidebar() {
  const trendingArticles = articles.filter(article => article.trending);

  return (
    <aside>
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <TrendingUp className="h-6 w-6 text-primary" />
            <span className="text-2xl">Trending News</span>
          </CardTitle>
        </CardHeader>
        <CardContent>
          <ul className="space-y-4">
            {trendingArticles.map((article, index) => (
              <li key={article.id}>
                <Link href="#" className="group">
                  <div className="flex items-start gap-4">
                    <span className="text-3xl font-bold font-headline text-muted-foreground group-hover:text-primary transition-colors">
                      {String(index + 1).padStart(2, '0')}
                    </span>
                    <div>
                      <h3 className="font-bold group-hover:text-primary transition-colors">{article.title}</h3>
                      <p className="text-sm text-muted-foreground">{article.category}</p>
                    </div>
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
