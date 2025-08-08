import Image from 'next/image';
import { notFound } from 'next/navigation';
import { articles, Article } from '@/lib/data';
import Header from '@/components/common/Header';
import Footer from '@/components/common/Footer';
import TrendingNewsSidebar from '@/components/trending-news-sidebar';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Textarea } from '@/components/ui/textarea';
import { Facebook, Twitter, Linkedin, Link as LinkIcon } from 'lucide-react';
import type { Metadata, ResolvingMetadata } from 'next';
import { slugify } from '@/lib/utils';

// This function generates the slugs for all articles
export async function generateStaticParams() {
  return articles.map((article) => ({
    slug: slugify(article.title),
  }));
}

function getArticleBySlug(slug: string): Article | undefined {
  return articles.find(a => slugify(a.title) === slug);
}

type Props = {
  params: { slug: string }
}

export async function generateMetadata(
  { params }: Props,
  parent: ResolvingMetadata
): Promise<Metadata> {
  const article = getArticleBySlug(params.slug);

  if (!article) {
    return {
      title: 'Article Not Found',
    }
  }
 
  const previousImages = (await parent).openGraph?.images || []
 
  return {
    title: article.title,
    description: article.summary,
    openGraph: {
      title: article.title,
      description: article.summary,
      url: `/article/${params.slug}`,
      images: [article.imageUrl, ...previousImages],
    },
    twitter: {
      card: 'summary_large_image',
      title: article.title,
      description: article.summary,
      images: [article.imageUrl],
    },
  }
}

export default function ArticlePage({ params }: { params: { slug: string } }) {
  const article = getArticleBySlug(params.slug);

  if (!article) {
    notFound();
  }

  const AdPlaceholder = () => (
    <div className="my-6 flex h-48 w-full items-center justify-center bg-gray-200 text-gray-500 rounded-md">
      Advertisement
    </div>
  );
  
  const author = {
    name: 'Collins Otieno',
    avatar: 'https://placehold.co/100x100.png',
    bio: 'Collins Otieno is a lead developer and journalist at News254, specializing in technology and political analysis.'
  };

  return (
    <div className="flex flex-col min-h-screen bg-background">
      <Header />
      <main className="flex-grow container mx-auto px-4 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          <article className="lg:col-span-2">
            <div className="mb-6">
              <h1 className="text-3xl md:text-4xl font-bold mb-2">{article.title}</h1>
              <div className="flex flex-wrap items-center gap-x-4 gap-y-2 text-sm text-muted-foreground">
                <span>By {author.name}</span>
                <span className="hidden sm:inline">•</span>
                <span>Published {new Date().toLocaleDateString()}</span>
                 <span className="hidden sm:inline">•</span>
                <Badge variant="secondary">{article.category}</Badge>
              </div>
            </div>
            
            <div className="relative w-full h-64 md:h-96 mb-6">
              <Image
                src={article.imageUrl}
                alt={article.title}
                data-ai-hint={article.imageHint}
                fill
                className="object-cover rounded-lg"
                priority
              />
            </div>
            
            <AdPlaceholder />

            <div className="prose prose-lg max-w-none prose-p:text-base md:prose-p:text-lg">
              <p className="font-semibold text-lg md:text-xl">
                The full story on how the Taifa Stars kicked off their CECAFA campaign with a decisive victory. Key moments and analysis from the opening match.
              </p>
              <p>
                The match, which was the official opener of the HANA Modidar 2024 tournament co-hosted by Tanzania, Kenya, and Uganda, saw Taifa Stars produce a disciplined and determined home-soil show. The win, which marks their first ever opening match victory at home in a CECAFA tournament, has uplifted the team's spirit of a shiny start to the competition.
              </p>
              <p>
                The breakthrough goal just before halftime, in the 45+1st minute when a foul on striker Clement Mzize from a reckless tackle resulted in a penalty. Skipper Mbwana Samatta 'Tanzan' stepped up and calmly slotted the ball home, sending the home crowd into a frenzy and giving the Taifa Stars a crucial 1-0 lead at the break.
              </p>
              <p>
                Tanzania sealed the victory in the second half in the 78th minute, defender Mohamed Hussein 'Tshabalala' rose highest to meet a well-delivered cross with a powerful header, doubling the lead. The goal was initially reviewed by VAR for a potential offside, but after a tense moment, it was confirmed, sparking extensive celebrations in the stadium.
              </p>
            </div>
            
            <AdPlaceholder />
            
            <div className="my-8 flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 border-t border-b py-4">
              <span className="font-semibold">Share this article:</span>
              <div className="flex gap-2">
                <Button variant="outline" size="icon"><Twitter className="h-4 w-4" /></Button>
                <Button variant="outline" size="icon"><Facebook className="h-4 w-4" /></Button>
                <Button variant="outline" size="icon"><Linkedin className="h-4 w-4" /></Button>
                <Button variant="outline" size="icon"><LinkIcon className="h-4 w-4" /></Button>
              </div>
            </div>

            <div className="bg-secondary p-6 rounded-lg flex flex-col sm:flex-row items-center gap-6 text-center sm:text-left">
               <Avatar className="w-20 h-20">
                  <AvatarImage src={author.avatar} data-ai-hint="person portrait" alt={author.name} />
                  <AvatarFallback>{author.name.substring(0, 2).toUpperCase()}</AvatarFallback>
                </Avatar>
                <div>
                  <h3 className="font-bold text-lg">About {author.name}</h3>
                  <p className="text-muted-foreground text-sm md:text-base">{author.bio}</p>
                </div>
            </div>

            <div className="mt-12">
              <h2 className="text-2xl font-bold mb-4">Comments (0)</h2>
              <form className="space-y-4">
                <Textarea placeholder="Write a comment..." rows={4} />
                <Button>Post Comment</Button>
              </form>
              <div className="mt-6 text-center text-muted-foreground">
                <p>No comments yet. Be the first to comment!</p>
              </div>
            </div>
          </article>

          <aside className="lg:col-span-1">
            <div className="sticky top-24 space-y-8">
              <TrendingNewsSidebar />
            </div>
          </aside>
        </div>
      </main>
      <Footer />
    </div>
  );
}
