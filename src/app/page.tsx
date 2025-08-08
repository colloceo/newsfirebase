import Header from '@/components/common/Header';
import Footer from '@/components/common/Footer';
import HeroSection from '@/components/home/HeroSection';
import LatestNews from '@/components/home/LatestNews';
import BreakingNewsTicker from '@/components/breaking-news-ticker';
import FeaturedArticlesCarousel from '@/components/featured-articles-carousel';
import CategorizedNews from '@/components/categorized-news';
import TrendingNewsSidebar from '@/components/trending-news-sidebar';
import { getArticles, getFeaturedArticles, getTrendingArticles } from '@/lib/data';

export default async function HomePage() {
  const latestArticles = await getArticles(6);
  const featuredArticles = await getFeaturedArticles();
  const trendingArticles = await getTrendingArticles();
  const heroArticle = featuredArticles.find(a => a.featured);

  return (
    <div className="flex flex-col min-h-screen bg-background">
      <Header />
      <BreakingNewsTicker />
      <main className="flex-grow container mx-auto px-4 py-6 md:py-8">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          <div className="lg:col-span-2 space-y-8">
             <HeroSection article={heroArticle} />
             <LatestNews articles={latestArticles} />
             <FeaturedArticlesCarousel articles={featuredArticles} />
             <CategorizedNews />
          </div>
          <div className="lg:col-span-1">
            <div className="sticky top-24 space-y-8">
              <TrendingNewsSidebar articles={trendingArticles} />
            </div>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
}
