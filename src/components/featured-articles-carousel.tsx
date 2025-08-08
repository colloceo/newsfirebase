import Image from 'next/image';
import { articles } from '@/lib/data';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Carousel, CarouselContent, CarouselItem, CarouselNext, CarouselPrevious } from '@/components/ui/carousel';
import { Badge } from '@/components/ui/badge';
import Link from 'next/link';
import { slugify } from '@/lib/utils';

export default function FeaturedArticlesCarousel() {
  const featuredArticles = articles.filter(article => article.featured);

  return (
    <section aria-labelledby="featured-articles-title">
      <h2 id="featured-articles-title" className="text-3xl font-bold mb-4">Featured Stories</h2>
      <Carousel
        opts={{
          align: "start",
          loop: true,
        }}
        className="w-full"
      >
        <CarouselContent>
          {featuredArticles.map((article) => (
            <CarouselItem key={article.id} className="md:basis-1/2 lg:basis-1/3">
              <div className="p-1">
                <Card className="h-full flex flex-col overflow-hidden transition-shadow hover:shadow-xl">
                  <Link href={`/article/${slugify(article.title)}`} className="block relative w-full h-56">
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
                    <CardTitle className="text-2xl leading-tight">
                      <Link href={`/article/${slugify(article.title)}`} className="hover:text-primary transition-colors">
                        {article.title}
                      </Link>
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="flex-grow">
                    <CardDescription>{article.summary}</CardDescription>
                  </CardContent>
                </Card>
              </div>
            </CarouselItem>
          ))}
        </CarouselContent>
        <CarouselPrevious className="hidden sm:flex" />
        <CarouselNext className="hidden sm:flex" />
      </Carousel>
    </section>
  );
}
