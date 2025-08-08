import Header from '@/components/common/Header';
import Footer from '@/components/common/Footer';
import HeroSection from '@/components/home/HeroSection';
import LatestNews from '@/components/home/LatestNews';
import CategoriesSection from '@/components/home/CategoriesSection';
import BreakingNewsTicker from '@/components/breaking-news-ticker';
import FeaturedArticlesCarousel from '@/components/featured-articles-carousel';
import CategorizedNews from '@/components/categorized-news';
import TrendingNewsSidebar from '@/components/trending-news-sidebar';

export default function HomePage() {
  return (
    <div className="flex flex-col min-h-screen bg-background">
      <Header />
      <div className="bg-red-600 text-white">
        <div className="container mx-auto px-4">
          <BreakingNewsTicker />
        </div>
      </div>
      <main className="flex-grow container mx-auto px-4 py-6 md:py-8">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          <div className="lg:col-span-2 space-y-8">
             <HeroSection />
             <LatestNews />
             <FeaturedArticlesCarousel />
             <CategorizedNews />
          </div>
          <div className="lg:col-span-1">
            <div className="sticky top-24 space-y-8">
              <TrendingNewsSidebar />
            </div>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
}
