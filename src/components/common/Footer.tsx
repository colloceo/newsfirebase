import Link from 'next/link';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Mail, Facebook, Twitter, Instagram } from 'lucide-react';

export default function Footer() {
  return (
    <footer className="bg-primary text-primary-foreground">
      <div className="container mx-auto px-4 py-8">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <div>
            <h3 className="text-2xl font-bold font-headline mb-2">News254</h3>
            <p className="text-primary-foreground/80">
              Your trusted source for Kenyan news.
            </p>
            <div className="flex space-x-4 mt-4">
              <Link href="#" className="text-primary-foreground hover:text-accent"><Facebook /></Link>
              <Link href="#" className="text-primary-foreground hover:text-accent"><Twitter /></Link>
              <Link href="#" className="text-primary-foreground hover:text-accent"><Instagram /></Link>
            </div>
          </div>
          <div>
            <h3 className="text-xl font-bold font-headline mb-4">Quick Links</h3>
            <ul className="space-y-2">
              <li><Link href="/about" className="hover:text-accent transition-colors">About Us</Link></li>
              <li><Link href="/contact" className="hover:text-accent transition-colors">Contact Us</Link></li>
              <li><Link href="/privacy" className="hover:text-accent transition-colors">Privacy Policy</Link></li>
            </ul>
          </div>
          <div>
            <h3 className="text-xl font-bold font-headline mb-4">Subscribe to our Newsletter</h3>
             <form className="flex w-full max-w-md items-center space-x-2">
                <Input
                  type="email"
                  placeholder="Enter your email"
                  className="bg-primary-foreground text-primary placeholder:text-muted-foreground"
                  aria-label="Email for newsletter"
                />
                <Button type="submit" variant="default" className="bg-accent text-accent-foreground hover:bg-accent/90">
                  <Mail className="mr-2 h-4 w-4" />
                  Subscribe
                </Button>
              </form>
          </div>
        </div>
        <div className="mt-8 border-t border-primary-foreground/20 pt-6 text-center text-primary-foreground/60">
          <p>&copy; {new Date().getFullYear()} News254. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
}
