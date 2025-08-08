import Header from '@/components/common/Header';
import Footer from '@/components/common/Footer';
import HeroSection from '@/components/home/HeroSection';
import LatestNews from '@/components/home/LatestNews';
import CategoriesSection from '@/components/home/CategoriesSection';

export default function HomePage() {
  return (
    <div className="flex flex-col min-h-screen bg-background">
      <Header />
      <main className="flex-grow container mx-auto px-4 py-6 md:py-8">
        <div className="space-y-8">
          <HeroSection />
          <LatestNews />
          <CategoriesSection />
        </div>
      </main>
      <Footer />
    </div>
  );
}
