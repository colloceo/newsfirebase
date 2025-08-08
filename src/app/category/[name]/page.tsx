import Header from '@/components/common/Header';
import Footer from '@/components/common/Footer';
import ArticleCard from '@/components/common/ArticleCard';
import { articles, Article } from '@/lib/data';
import { notFound } from 'next/navigation';
import type { Metadata } from 'next';

const validCategories = ['politics', 'business', 'sports', 'tech', 'culture', 'entertainment'];

function getArticlesByCategory(categoryName: string): Article[] {
  const normalizedCategory = categoryName.charAt(0).toUpperCase() + categoryName.slice(1);
  const categoryArticles = articles.filter(article => article.category.toLowerCase() === normalizedCategory.toLowerCase());
  return categoryArticles;
}

type Props = {
  params: { name: string }
}

export async function generateMetadata(
  { params }: Props
): Promise<Metadata> {
  const categoryName = params.name.charAt(0).toUpperCase() + params.name.slice(1);

  return {
    title: `${categoryName} News`,
    description: `Latest news and articles in the ${categoryName} category.`,
     openGraph: {
      title: `${categoryName} News`,
      description: `Latest news and articles in the ${categoryName} category.`,
    },
    twitter: {
      title: `${categoryName} News`,
      description: `Latest news and articles in the ${categoryName} category.`,
    },
  }
}

export async function generateStaticParams() {
  return validCategories.map((name) => ({
    name,
  }));
}


export default function CategoryPage({ params }: { params: { name: string } }) {
   if (!validCategories.includes(params.name.toLowerCase())) {
    notFound();
  }
  
  const articles = getArticlesByCategory(params.name);

  if (articles.length === 0) {
    // This can happen if a valid category has no articles yet.
    // We can show a message instead of a 404.
  }

  const categoryName = params.name.charAt(0).toUpperCase() + params.name.slice(1);

  return (
    <div className="flex flex-col min-h-screen bg-background">
      <Header />
      <main className="flex-grow container mx-auto px-4 py-8">
        <h1 className="text-4xl font-bold mb-6 text-primary">{categoryName} News</h1>
        {articles.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {articles.map((article) => (
              <ArticleCard key={article.id} article={article} />
            ))}
          </div>
        ) : (
          <div className="text-center py-16">
            <h2 className="text-2xl font-semibold">No articles yet</h2>
            <p className="text-muted-foreground mt-2">Check back later for news in the {categoryName} category.</p>
          </div>
        )}
      </main>
      <Footer />
    </div>
  );
}
