import Link from 'next/link';
import Image from 'next/image';
import { Menu, Search } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Sheet, SheetContent, SheetTitle, SheetTrigger } from '@/components/ui/sheet';
import SearchForm from '@/components/common/SearchForm';
import { allCategories } from '@/lib/data';

const navLinks = [
  { href: "/", label: "Home" },
  { href: "/category/politics", label: "Politics" },
  { href: "/category/business", label: "Business" },
  { href: "/category/tech", label: "Tech" },
  { href: "/category/sports", label: "Sports" },
  { href: "/category/entertainment", label: "Entertainment" },
  { href: "/category/world", label: "World" },
  { href: "/category/health", label: "Health" },
];

export default function Header() {
  return (
    <header className="bg-card shadow-sm sticky top-0 z-50">
      <div className="container mx-auto px-4">
        <div className="flex justify-between items-center py-3">
          <Link href="/" className="flex items-center gap-2 text-primary hover:opacity-80 transition-opacity">
            <Image
              src="https://iili.io/FsGM311.png"
              alt="News254 Logo"
              width={40}
              height={40}
              className="object-contain"
              priority
            />
             <div className="hidden sm:block">
              <span className="text-xl font-bold text-gray-800">News254</span>
              <p className="text-xs text-gray-500">Kenya's News Hub</p>
            </div>
          </Link>
          <div className="hidden lg:flex items-center gap-4">
            <nav className="flex items-center gap-1">
              {navLinks.map((link) => (
                <Button key={link.href} variant="ghost" asChild>
                  <Link href={link.href}>{link.label}</Link>
                </Button>
              ))}
            </nav>
            <div className="w-full max-w-xs">
              <SearchForm />
            </div>
          </div>
          <div className="lg:hidden flex items-center gap-2">
             <Button variant="ghost" size="icon" asChild>
                <Link href="/search">
                  <Search />
                  <span className="sr-only">Search</span>
                </Link>
              </Button>
            <Sheet>
              <SheetTrigger asChild>
                <Button variant="ghost" size="icon">
                  <Menu />
                  <span className="sr-only">Toggle navigation menu</span>
                </Button>
              </SheetTrigger>
              <SheetContent side="left">
                <SheetTitle className="sr-only">News254 Menu</SheetTitle>
                <div className="flex flex-col gap-4 p-4">
                  <Link href="/" className="flex items-center gap-2 text-primary mb-4">
                     <Image
                        src="https://iili.io/FsGM311.png"
                        alt="News254 Logo"
                        width={40}
                        height={40}
                        className="object-contain"
                      />
                      <div>
                        <span className="text-xl font-bold text-gray-800">News254</span>
                        <p className="text-xs text-gray-500">Kenya's News Hub</p>
                      </div>
                  </Link>
                  <div className="mt-4">
                    <SearchForm />
                  </div>
                  <nav className="flex flex-col gap-2">
                    {allCategories.map((category) => (
                       <Button key={category} variant="ghost" asChild className="justify-start">
                        <Link href={`/category/${category.toLowerCase()}`}>{category}</Link>
                      </Button>
                    ))}
                  </nav>
                </div>
              </SheetContent>
            </Sheet>
          </div>
        </div>
      </div>
    </header>
  );
}
