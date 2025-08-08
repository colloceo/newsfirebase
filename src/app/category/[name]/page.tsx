import Header from '@/components/common/Header';
import Footer from '@/components/common/Footer';
import ArticleCard from '@/components/common/ArticleCard';
import { articles, Article } from '@/lib/data';
import { notFound } from 'next/navigation';

function getArticlesByCategory(categoryName: string): Article[] {
  const normalizedCategory = categoryName.charAt(0).toUpperCase() + categoryName.slice(1);
  const categoryArticles = articles.filter(article => article.category.toLowerCase() === normalizedCategory.toLowerCase());
  return categoryArticles;
}

export default function CategoryPage({ params }: { params: { name: string } }) {
  const articles = getArticlesByCategory(params.name);

  if (articles.length === 0) {
    notFound();
  }

  const categoryName = params.name.charAt(0).toUpperCase() + params.name.slice(1);

  return (
    <div className="flex flex-col min-h-screen bg-background">
      <Header />
      <main className="flex-grow container mx-auto px-4 py-8">
        <h1 className="text-4xl font-bold mb-6 text-primary">{categoryName} News</h1>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {articles.map((article) => (
            <ArticleCard key={article.id} article={article} />
          ))}
        </div>
      </main>
      <Footer />
    </div>
  );
}
