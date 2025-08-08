import Image from 'next/image';
import Link from 'next/link';
import type { Article } from '@/lib/data';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { ArrowRight } from 'lucide-react';
import { slugify } from '@/lib/utils';

export default function HeroSection({ article }: { article?: Article }) {
  if (!article) return (
    <div className="relative h-[400px] md:h-[500px] rounded-lg overflow-hidden bg-secondary flex items-center justify-center">
      <p className="text-muted-foreground">No featured article available.</p>
    </div>
  );

  const articleSlug = slugify(article.title);

  return (
    <section className="relative h-[400px] md:h-[500px] rounded-lg overflow-hidden text-white">
      <Image
        src={article.imageUrl}
        alt={article.title}
        fill
        data-ai-hint={article.imageHint}
        className="object-cover"
        priority
      />
      <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/40 to-transparent" />
      <div className="absolute bottom-0 left-0 p-4 md:p-8">
        <Badge variant="secondary" className="mb-2">{article.category}</Badge>
        <h1 className="text-2xl md:text-5xl font-bold mb-2 md:mb-4 max-w-3xl leading-tight">
          {article.title}
        </h1>
        <p className="text-base md:text-lg mb-4 md:mb-6 max-w-2xl text-white/90 line-clamp-2 md:line-clamp-none">
          {article.summary}
        </p>
        <Button asChild size="lg" className="bg-primary hover:bg-primary/90">
          <Link href={`/article/${articleSlug}`}>
            Read More <ArrowRight className="ml-2 h-5 w-5" />
          </Link>
        </Button>
      </div>
    </section>
  );
}
