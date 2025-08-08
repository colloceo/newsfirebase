import Image from 'next/image';
import Link from 'next/link';
import type { Article } from '@/lib/data';
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { ArrowRight } from 'lucide-react';
import { slugify } from '@/lib/utils';

interface ArticleCardProps {
  article: Article;
}

export default function ArticleCard({ article }: ArticleCardProps) {
  const articleSlug = slugify(article.title);

  return (
    <Card className="h-full flex flex-col overflow-hidden transition-shadow hover:shadow-xl">
      <Link href={`/article/${articleSlug}`} className="block relative w-full h-52">
        <Image
          src={article.imageUrl}
          alt={article.title}
          fill
          data-ai-hint={article.imageHint}
          className="object-cover"
        />
      </Link>
      <CardHeader>
        <Badge variant="secondary" className="w-fit mb-2">{article.category}</Badge>
        <CardTitle className="text-xl leading-tight">
          <Link href={`/article/${articleSlug}`} className="hover:text-primary transition-colors">
            {article.title}
          </Link>
        </CardTitle>
      </CardHeader>
      <CardContent className="flex-grow">
        <p className="text-muted-foreground line-clamp-3">{article.summary}</p>
      </CardContent>
      <CardFooter>
         <Link href={`/article/${articleSlug}`} className="font-semibold text-primary hover:underline flex items-center">
            Read More <ArrowRight className="ml-2 h-4 w-4" />
          </Link>
      </CardFooter>
    </Card>
  );
}
