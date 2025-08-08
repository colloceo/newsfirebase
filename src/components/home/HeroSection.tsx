import Image from 'next/image';
import Link from 'next/link';
import { articles } from '@/lib/data';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { ArrowRight } from 'lucide-react';

export default function HeroSection() {
  const heroArticle = articles.find(a => a.featured);

  if (!heroArticle) return null;

  return (
    <section className="relative h-[500px] rounded-lg overflow-hidden text-white">
      <Image
        src={heroArticle.imageUrl}
        alt={heroArticle.title}
        fill
        data-ai-hint={heroArticle.imageHint}
        className="object-cover"
        priority
      />
      <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/40 to-transparent" />
      <div className="absolute bottom-0 left-0 p-8">
        <Badge variant="secondary" className="mb-2 bg-accent text-accent-foreground">{heroArticle.category}</Badge>
        <h1 className="text-4xl md:text-5xl font-bold mb-4 max-w-3xl leading-tight">
          {heroArticle.title}
        </h1>
        <p className="text-lg mb-6 max-w-2xl text-white/90">
          {heroArticle.summary}
        </p>
        <Button asChild size="lg" className="bg-primary hover:bg-primary/90">
          <Link href="#">
            Read More <ArrowRight className="ml-2 h-5 w-5" />
          </Link>
        </Button>
      </div>
    </section>
  );
}
