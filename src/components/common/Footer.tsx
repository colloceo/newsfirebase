import Link from 'next/link';
import Image from 'next/image';
import { Mail, Phone, Facebook, Twitter, Instagram, Linkedin } from 'lucide-react';
import { allCategories } from '@/lib/data';

export default function Footer() {
  return (
    <footer className="bg-gray-900 text-gray-300">
      <div className="container mx-auto px-4 py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          
          <div className="col-span-1 md:col-span-1">
            <div className="mb-4">
              <Link href="/">
                <Image
                  src="https://iili.io/FsGM311.png"
                  alt="News254 Logo"
                  width={180}
                  height={45}
                  className="object-contain filter invert"
                />
              </Link>
            </div>
            <p className="text-sm text-gray-400">
              Your trusted source for timely and accurate news coverage on Kenya and beyond. We bring you the latest on politics, business, technology, and more.
            </p>
            <div className="flex space-x-4 mt-6">
              <Link href="#" className="text-gray-400 hover:text-primary"><Facebook /></Link>
              <Link href="#" className="text-gray-400 hover:text-primary"><Twitter /></Link>
              <Link href="#" className="text-gray-400 hover:text-primary"><Instagram /></Link>
              <Link href="#" className="text-gray-400 hover:text-primary"><Linkedin /></Link>
            </div>
          </div>

          <div>
            <h3 className="text-lg font-semibold text-white mb-4">Quick Links</h3>
            <ul className="space-y-2 text-sm">
              <li><Link href="/about" className="hover:text-primary transition-colors">About Us</Link></li>
              <li><Link href="/contact" className="hover:text-primary transition-colors">Contact</Link></li>
              <li><Link href="/privacy" className="hover:text-primary transition-colors">Privacy Policy</Link></li>
              <li><Link href="/terms" className="hover:text-primary transition-colors">Terms of Service</Link></li>
            </ul>
          </div>
          
          <div>
            <h3 className="text-lg font-semibold text-white mb-4">Categories</h3>
            <ul className="space-y-2 text-sm">
              {allCategories.map(category => (
                <li key={category}>
                  <Link href={`/category/${category.toLowerCase()}`} className="hover:text-primary transition-colors">{category}</Link>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h3 className="text-lg font-semibold text-white mb-4">Contact Info</h3>
            <ul className="space-y-3 text-sm">
              <li className="flex items-center gap-3">
                <Mail className="w-5 h-5 text-primary" />
                <span>info@news254.co.ke</span>
              </li>
              <li className="flex items-center gap-3">
                <Phone className="w-5 h-5 text-primary" />
                <span>+254 700 000 000</span>
              </li>
            </ul>
          </div>
        </div>
        
        <div className="mt-12 border-t border-gray-800 pt-6 text-center text-sm text-gray-500">
          <p>&copy; {new Date().getFullYear()} News254. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
}
