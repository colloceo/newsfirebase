import { articles } from '@/lib/data';
import ArticleCard from '@/components/common/ArticleCard';

export default function LatestNews() {
  const latestArticles = articles.slice(0, 6);

  return (
    <section>
      <h2 className="text-2xl md:text-3xl font-bold mb-6 text-primary">Latest News</h2>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {latestArticles.map((article) => (
          <ArticleCard key={article.id} article={article} />
        ))}
      </div>
    </section>
  );
}
