import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Mail, Facebook, Twitter, Instagram, Linkedin, Youtube } from 'lucide-react';
import Link from 'next/link';
import Image from 'next/image';


export default function Footer() {
  return (
    <footer className="bg-primary text-primary-foreground">
      <div className="container mx-auto px-4 py-8">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            <div className='lg:col-span-2'>
                <h3 className="text-2xl font-bold font-headline mb-2">Subscribe to our Newsletter</h3>
                <p className="text-primary-foreground/80 mb-4">
                Get the latest news and updates delivered straight to your inbox.
                </p>
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
            <div>
                <h3 className="text-xl font-bold font-headline mb-4">Connect with us</h3>
                 <div className="flex space-x-4">
                    <Link href="#" className="text-primary-foreground/80 hover:text-white"><Facebook/></Link>
                    <Link href="#" className="text-primary-foreground/80 hover:text-white"><Twitter/></Link>
                    <Link href="#" className="text-primary-foreground/80 hover:text-white"><Instagram/></Link>
                    <Link href="#" className="text-primary-foreground/80 hover:text-white"><Linkedin/></Link>
                    <Link href="#" className="text-primary-foreground/80 hover:text-white"><Youtube/></Link>
                </div>
            </div>
             <div>
                <h3 className="text-xl font-bold font-headline mb-4">News254</h3>
                <Image
                    src="https://iili.io/FsGM311.png"
                    alt="News254 Logo"
                    width={28}
                    height={28}
                    className="object-contain"
                />
            </div>

        </div>
        <div className="mt-8 border-t border-primary-foreground/20 pt-6 text-center text-primary-foreground/60">
          <p>&copy; {new Date().getFullYear()} News254. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
}
