import Link from 'next/link';
import Image from 'next/image';
import { Mail, Phone, Facebook, Twitter, Instagram, Linkedin, Youtube, MessageCircle } from 'lucide-react';
import { allCategories } from '@/lib/data';

const aboutLinks = [
    { href: "/about", label: "About Us" },
    { href: "/contact", label: "Contact" },
    { href: "/privacy", label: "Privacy Policy" },
    { href: "/terms", label: "Terms of Service" },
];

const quickLinks = [
    { href: "/", label: "Home" },
    { href: "/category/politics", label: "Politics" },
    { href: "/category/business", label: "Business" },
    { href: "/category/technology", label: "Technology" },
    { href: "/category/sports", label: "Sports" },
    { href: "/category/entertainment", label: "Entertainment" },
];


export default function Footer() {
  return (
    <footer className="bg-gray-900 text-gray-300">
      <div className="container mx-auto px-4 py-8 md:py-12">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
          
          <div className="col-span-1 sm:col-span-2 lg:col-span-1">
            <div className="mb-4">
               <Link href="/" className="flex items-center gap-2">
                <Image
                  src="https://iili.io/FsGM311.png"
                  alt="News254 Logo"
                  width={40}
                  height={40}
                  className="object-contain"
                />
                <div>
                  <span className="text-xl font-bold text-white">News254</span>
                  <p className="text-xs text-gray-400">Kenya's News Hub</p>
                </div>
              </Link>
            </div>
            <p className="text-sm text-gray-400">
              Your trusted source for breaking news, politics, business, technology, and entertainment from Kenya and East Africa.
            </p>
            <div className="flex space-x-4 mt-6">
              <Link href="#" className="text-gray-400 hover:text-white"><Facebook size={20} /></Link>
              <Link href="#" className="text-gray-400 hover:text-white"><Twitter size={20} /></Link>
              <Link href="#" className="text-gray-400 hover:text-white"><Instagram size={20} /></Link>
              <Link href="#" className="text-gray-400 hover:text-white"><Linkedin size={20} /></Link>
              <Link href="#" className="text-gray-400 hover:text-white"><Youtube size={20} /></Link>
              <Link href="#" className="text-gray-400 hover:text-white"><MessageCircle size={20} /></Link>
            </div>
          </div>

          <div>
            <h3 className="text-lg font-semibold text-white mb-4">Quick Links</h3>
            <ul className="space-y-2 text-sm">
              {quickLinks.map(link => (
                  <li key={link.href}><Link href={link.href} className="hover:text-white transition-colors">{link.label}</Link></li>
              ))}
            </ul>
          </div>
          
          <div>
            <h3 className="text-lg font-semibold text-white mb-4">About</h3>
            <ul className="space-y-2 text-sm">
              {aboutLinks.map(link => (
                <li key={link.href}>
                  <Link href={link.href} className="hover:text-white transition-colors">{link.label}</Link>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h3 className="text-lg font-semibold text-white mb-4">Contact Info</h3>
            <ul className="space-y-3 text-sm">
              <li className="flex items-center gap-3">
                <svg className="w-5 h-5 text-green-500" fill="currentColor" viewBox="0 0 20 20"><path d="M5.05 4.05a7 7 0 119.9 9.9L10 18.9l-4.95-4.95a7 7 0 010-9.9zM10 11a2 2 0 100-4 2 2 0 000 4z" /></svg>
                <span>Nairobi, Kenya<br/>P.O. Box 86656-00106</span>
              </li>
              <li className="flex items-center gap-3">
                <Phone className="w-5 h-5 text-green-500" />
                <span>+254 103 868 307</span>
              </li>
              <li className="flex items-center gap-3">
                <Mail className="w-5 h-5 text-green-500" />
                <span>info@news254.co.ke</span>
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
