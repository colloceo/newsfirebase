import { Suspense } from 'react';
import Header from '@/components/common/Header';
import Footer from '@/components/common/Footer';
import ArticleCard from '@/components/common/ArticleCard';
import { articles, Article } from '@/lib/data';
import { notFound } from 'next/navigation';
import type { Metadata } from 'next';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Search as SearchIcon } from 'lucide-react';
import SearchForm from '@/components/common/SearchForm';
import BreakingNewsTicker from '@/components/breaking-news-ticker';

function getArticlesByQuery(query: string): Article[] {
  if (!query) return [];
  return articles.filter(article =>
    article.title.toLowerCase().includes(query.toLowerCase()) ||
    article.summary.toLowerCase().includes(query.toLowerCase()) ||
    article.category.toLowerCase().includes(query.toLowerCase())
  );
}

type Props = {
  searchParams: { [key: string]: string | string[] | undefined }
}

export async function generateMetadata(
  { searchParams }: Props
): Promise<Metadata> {
  const query = typeof searchParams.q === 'string' ? searchParams.q : '';
  const title = query ? `Search results for "${query}"` : 'Search';

  return {
    title: title,
    description: `Find the latest news on News254. Search for articles on politics, business, sports, and more.`,
  }
}

function SearchResults({ query }: { query: string }) {
  const searchResults = getArticlesByQuery(query);

  return (
    <>
      <h1 className="text-2xl md:text-4xl font-bold mb-6 text-primary break-all">
        {query ? `Search results for "${query}"` : 'Search for an article'}
      </h1>

      {query && searchResults.length > 0 && (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {searchResults.map((article) => (
            <ArticleCard key={article.id} article={article} />
          ))}
        </div>
      )}

      {query && searchResults.length === 0 && (
        <div className="text-center py-16">
          <h2 className="text-2xl font-semibold">No results found</h2>
          <p className="text-muted-foreground mt-2">
            We couldn't find any articles matching your search. Please try different keywords.
          </p>
        </div>
      )}
    </>
  );
}

export default function SearchPage({ searchParams }: Props) {
  const query = typeof searchParams.q === 'string' ? searchParams.q : '';

  return (
    <div className="flex flex-col min-h-screen bg-background">
      <Header />
      <BreakingNewsTicker />
      <main className="flex-grow container mx-auto px-4 py-8">
        <div className="max-w-xl mx-auto mb-8 lg:hidden">
            <SearchForm initialQuery={query} />
        </div>
        <Suspense fallback={<div>Loading...</div>}>
          <SearchResults query={query} />
        </Suspense>
      </main>
      <Footer />
    </div>
  );
}
