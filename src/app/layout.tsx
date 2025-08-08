import type { Metadata } from 'next';
import { Toaster } from "@/components/ui/toaster"
import './globals.css';
import { Inter as FontSans } from "next/font/google"
import { cn } from "@/lib/utils"

const fontSans = FontSans({
  subsets: ["latin"],
  variable: "--font-sans",
})

export const metadata: Metadata = {
  title: {
    default: 'News254 - Your Kenyan News Source',
    template: '%s | News254',
  },
  description: 'The latest news from Kenya, covering politics, business, technology, sports, and culture.',
  openGraph: {
    title: 'News254 - Your Kenyan News Source',
    description: 'The latest news from Kenya, covering politics, business, technology, sports, and culture.',
    url: 'https://news254.co.ke',
    siteName: 'News254',
    images: [
      {
        url: 'https://placehold.co/1200x630.png', // Replace with a default social share image
        width: 1200,
        height: 630,
      },
    ],
    locale: 'en_US',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'News254 - Your Kenyan News Source',
    description: 'The latest news from Kenya, covering politics, business, technology, sports, and culture.',
     images: ['https://placehold.co/1200x630.png'], // Replace with a default social share image
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-video-preview': -1,
      'max-image-preview': 'large',
      'max-snippet': -1,
    },
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning className={cn(fontSans.variable)}>
      <body className="min-h-screen bg-background font-sans antialiased">
        {children}
        <Toaster />
      </body>
    </html>
  );
}
