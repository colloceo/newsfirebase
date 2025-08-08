import Header from '@/components/common/Header';
import Footer from '@/components/common/Footer';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Newspaper, Users, BarChart2 } from 'lucide-react';
import Link from 'next/link';

export default function AdminDashboardPage() {
  return (
    <div className="flex flex-col min-h-screen bg-background">
      <Header />
      <main className="flex-grow container mx-auto px-4 py-8">
        <h1 className="text-3xl md:text-4xl font-bold mb-6 text-primary">Admin Dashboard</h1>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          <Link href="/admin/articles">
            <Card className="hover:shadow-lg transition-shadow">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Newspaper className="h-6 w-6 text-primary" />
                  <span>Manage Articles</span>
                </CardTitle>
              </CardHeader>
              <CardContent>
                <CardDescription>Create, edit, and delete news articles.</CardDescription>
              </CardContent>
            </Card>
          </Link>
          <Link href="/admin/tag-suggester">
             <Card className="hover:shadow-lg transition-shadow">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <BarChart2 className="h-6 w-6 text-primary" />
                  <span>AI Tag Suggester</span>
                </CardTitle>
              </CardHeader>
              <CardContent>
                <CardDescription>Generate SEO-friendly tags for your articles.</CardDescription>
              </CardContent>
            </Card>
          </Link>
           <Card className="cursor-not-allowed opacity-50">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Users className="h-6 w-6 text-muted-foreground" />
                  <span>Manage Users</span>
                </CardTitle>
              </CardHeader>
              <CardContent>
                <CardDescription>View and manage website users (Coming Soon).</CardDescription>
              </CardContent>
            </Card>
        </div>
      </main>
      <Footer />
    </div>
  );
}
