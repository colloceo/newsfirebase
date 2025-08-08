import Header from '@/components/common/Header';
import Footer from '@/components/common/Footer';
import ArticleForm from '@/components/admin/ArticleForm';

export default function NewArticlePage() {
  return (
    <div className="flex flex-col min-h-screen bg-background">
      <Header />
      <main className="flex-grow container mx-auto px-4 py-8">
        <h1 className="text-3xl md:text-4xl font-bold mb-6 text-primary">Create New Article</h1>
        <ArticleForm />
      </main>
      <Footer />
    </div>
  );
}
