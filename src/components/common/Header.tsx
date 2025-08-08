import Link from 'next/link';
import { Newspaper, Home, Info, Phone } from 'lucide-react';
import { Button } from '@/components/ui/button';

export default function Header() {
  return (
    <header className="bg-card shadow-md sticky top-0 z-50">
      <div className="container mx-auto px-4 py-3 flex justify-between items-center">
        <Link href="/" className="flex items-center gap-2 text-primary hover:opacity-80 transition-opacity">
          <Newspaper className="h-8 w-8" />
          <h1 className="text-3xl font-bold tracking-tight">
            News254
          </h1>
        </Link>
        <nav className="hidden md:flex items-center gap-1">
          <Button variant="ghost" asChild>
            <Link href="/"><Home className="mr-2 h-4 w-4" />Home</Link>
          </Button>
          <Button variant="ghost" asChild>
            <Link href="/about"><Info className="mr-2 h-4 w-4" />About</Link>
          </Button>
          <Button variant="ghost" asChild>
            <Link href="/contact"><Phone className="mr-2 h-4 w-4" />Contact</Link>
          </Button>
        </nav>
        <Button className="md:hidden" variant="ghost" size="icon">
           {/* Mobile menu button */}
           <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="lucide lucide-menu"><line x1="4" x2="20" y1="12" y2="12"/><line x1="4" x2="20" y1="6" y2="6"/><line x1="4" x2="20" y1="18" y2="18"/></svg>
        </Button>
      </div>
    </header>
  );
}
