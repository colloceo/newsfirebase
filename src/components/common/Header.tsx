import Link from 'next/link';
import Image from 'next/image';
import { Menu } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Sheet, SheetContent, SheetTitle, SheetTrigger } from '@/components/ui/sheet';
import SearchForm from '@/components/common/SearchForm';

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
    <header className="bg-card shadow-md sticky top-0 z-50">
      <div className="container mx-auto px-4">
        <div className="flex justify-between items-center py-3">
          <Link href="/" className="flex items-center gap-2 text-primary hover:opacity-80 transition-opacity">
            <Image
              src="https://iili.io/FsGM311.png"
              alt="News254 Logo"
              width={150}
              height={40}
              className="object-contain"
              priority
            />
          </Link>
          <div className="hidden lg:flex items-center gap-4">
            <nav className="flex items-center gap-1">
              {navLinks.map((link) => (
                <Button key={link.href} variant="ghost" asChild>
                  <Link href={link.href}>{link.label}</Link>
                </Button>
              ))}
            </nav>
            <SearchForm />
          </div>
          <div className="lg:hidden">
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
                        width={150}
                        height={40}
                        className="object-contain"
                      />
                  </Link>
                  <nav className="flex flex-col gap-2">
                    {navLinks.map((link) => (
                      <Button key={link.href} variant="ghost" asChild className="justify-start">
                        <Link href={link.href}>{link.label}</Link>
                      </Button>
                    ))}
                     <Button variant="ghost" asChild className="justify-start">
                        <Link href="/category/lifestyle">Lifestyle</Link>
                      </Button>
                      <Button variant="ghost" asChild className="justify-start">
                        <Link href="/category/opinion">Opinion</Link>
                      </Button>
                       <Button variant="ghost" asChild className="justify-start">
                        <Link href="/category/education">Education</Link>
                      </Button>
                  </nav>
                   <div className="mt-4">
                    <SearchForm />
                  </div>
                </div>
              </SheetContent>
            </Sheet>
          </div>
        </div>
      </div>
    </header>
  );
}
