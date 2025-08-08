import Header from '@/components/header';
import Footer from '@/components/footer';
import BreakingNewsTicker from '@/components/breaking-news-ticker';
import FeaturedArticlesCarousel from '@/components/featured-articles-carousel';
import CategorizedNews from '@/components/categorized-news';
import TrendingNewsSidebar from '@/components/trending-news-sidebar';

export default function Home() {
  return (
    <div className="flex flex-col min-h-screen bg-background">
      <Header />
      <main className="flex-grow container mx-auto px-4 py-6 md:py-8">
        <div className="space-y-8">
          <BreakingNewsTicker />
          <FeaturedArticlesCarousel />
          <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
            <div className="lg:col-span-3">
              <CategorizedNews />
            </div>
            <div className="lg:col-span-1">
              <TrendingNewsSidebar />
            </div>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
}
