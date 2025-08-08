import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Mail } from 'lucide-react';

export default function Footer() {
  return (
    <footer className="bg-primary text-primary-foreground">
      <div className="container mx-auto px-4 py-8">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-center">
          <div>
            <h3 className="text-2xl font-bold font-headline mb-2">Subscribe to our Newsletter</h3>
            <p className="text-primary-foreground/80">
              Get the latest news and updates delivered straight to your inbox.
            </p>
          </div>
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
        <div className="mt-8 border-t border-primary-foreground/20 pt-6 text-center text-primary-foreground/60">
          <p>&copy; {new Date().getFullYear()} News254. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
}
