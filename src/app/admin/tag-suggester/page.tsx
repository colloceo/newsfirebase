import Header from '@/components/header';
import Footer from '@/components/footer';
import TagSuggesterClient from './tag-suggester-client';
import BreakingNewsTicker from '@/components/breaking-news-ticker';

export default function TagSuggesterPage() {
  return (
    <div className="flex flex-col min-h-screen bg-background">
      <Header />
      <BreakingNewsTicker />
      <main className="flex-grow container mx-auto px-4 py-8">
        <TagSuggesterClient />
      </main>
      <Footer />
    </div>
  );
}
