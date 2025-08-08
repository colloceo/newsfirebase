import Link from 'next/link';
import { Newspaper } from 'lucide-react';
import { Button } from '@/components/ui/button';

export default function Header() {
  return (
    <header className="bg-card shadow-md">
      <div className="container mx-auto px-4 py-4 flex justify-between items-center">
        <Link href="/" className="flex items-center gap-2 text-primary hover:opacity-80 transition-opacity">
          <Newspaper className="h-8 w-8" />
          <h1 className="text-3xl font-bold tracking-tight">
            News254
          </h1>
        </Link>
        <nav className="flex items-center gap-2">
          <Button variant="ghost" asChild>
            <Link href="/">Home</Link>
          </Button>
          <Button variant="ghost" asChild>
            <Link href="/admin/tag-suggester">AI Tagger</Link>
          </Button>
        </nav>
      </div>
    </header>
  );
}
