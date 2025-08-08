import Header from '@/components/common/Header';
import Footer from '@/components/common/Footer';
import ArticleForm from '@/components/admin/ArticleForm';
import { getArticle } from '@/lib/data';
import { notFound } from 'next/navigation';

export default async function EditArticlePage({ params }: { params: { id: string } }) {
  const article = await getArticle(params.id);

  if (!article) {
    notFound();
  }

  return (
    <div className="flex flex-col min-h-screen bg-background">
      <Header />
      <main className="flex-grow container mx-auto px-4 py-8">
        <h1 className="text-3xl md:text-4xl font-bold mb-6 text-primary">Edit Article</h1>
        <ArticleForm article={article} />
      </main>
      <Footer />
    </div>
  );
}
