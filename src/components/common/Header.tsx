import Link from 'next/link';
import { Newspaper, Home, Info, Phone, Search, Menu } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Sheet, SheetContent, SheetTrigger } from '@/components/ui/sheet';

const navLinks = [
  { href: "/", label: "Home" },
  { href: "/category/politics", label: "Politics" },
  { href: "/category/business", label: "Business" },
  { href: "/category/tech", label: "Technology" },
  { href: "/category/sports", label: "Sports" },
  { href: "/category/entertainment", label: "Entertainment" },
];

export default function Header() {
  return (
    <header className="bg-card shadow-md sticky top-0 z-50">
      <div className="container mx-auto px-4">
        <div className="flex justify-between items-center py-3">
          <Link href="/" className="flex items-center gap-2 text-primary hover:opacity-80 transition-opacity">
            <Newspaper className="h-8 w-8" />
            <h1 className="text-3xl font-bold tracking-tight hidden sm:block">
              News254
            </h1>
          </Link>
          <div className="hidden lg:flex items-center gap-4">
            <nav className="flex items-center gap-1">
              {navLinks.map((link) => (
                <Button key={link.href} variant="ghost" asChild>
                  <Link href={link.href}>{link.label}</Link>
                </Button>
              ))}
            </nav>
            <div className="relative">
              <Input type="search" placeholder="Search..." className="pl-10"/>
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-muted-foreground" />
            </div>
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
                <div className="flex flex-col gap-4 p-4">
                  <Link href="/" className="flex items-center gap-2 text-primary mb-4">
                     <Newspaper className="h-8 w-8" />
                     <h1 className="text-3xl font-bold tracking-tight">News254</h1>
                  </Link>
                  <nav className="flex flex-col gap-2">
                    {navLinks.map((link) => (
                      <Button key={link.href} variant="ghost" asChild className="justify-start">
                        <Link href={link.href}>{link.label}</Link>
                      </Button>
                    ))}
                  </nav>
                   <div className="relative mt-4">
                    <Input type="search" placeholder="Search..." className="pl-10"/>
                    <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-muted-foreground" />
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
