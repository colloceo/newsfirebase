import Link from 'next/link';
import Image from 'next/image';
import { Button } from '@/components/ui/button';

export default function Header() {
  return (
    <header className="bg-card shadow-md">
      <div className="container mx-auto px-4 py-4 flex justify-between items-center">
        <Link href="/" className="flex items-center gap-2 text-primary hover:opacity-80 transition-opacity">
          <Image
            src="https://iili.io/FsGM311.png"
            alt="News254 Logo"
            width={90}
            height={24}
            className="object-contain"
            priority
          />
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
