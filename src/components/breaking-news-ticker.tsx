import { articles } from '@/lib/data';
import { Megaphone, Dot } from 'lucide-react';
import Link from 'next/link';
import { slugify } from '@/lib/utils';

export default function BreakingNewsTicker() {
  const breakingNews = articles.filter(article => article.breaking);

  if (breakingNews.length === 0) {
    return null;
  }

  // Duplicate the items to create a seamless loop for the marquee
  const tickerItems = [...breakingNews, ...breakingNews, ...breakingNews, ...breakingNews];
  
  return (
    <div className="bg-red-600 text-white overflow-hidden">
      <div className="flex items-center p-2">
        <div className="flex-shrink-0 pr-4">
          <span className="font-bold font-headline text-xs sm:text-sm uppercase whitespace-nowrap">Breaking News</span>
        </div>
        <div className="relative flex-1 overflow-hidden h-6">
          <div className="absolute flex animation-marquee">
            {tickerItems.map((item, index) => (
              <Link key={index} href={`/article/${slugify(item.title)}`} className="flex items-center flex-shrink-0 px-2 sm:px-4 group">
                <p className="whitespace-nowrap text-xs sm:text-sm group-hover:underline">{item.title}</p>
                {index < tickerItems.length - 1 && <Dot className="h-6 w-6 text-white/50" />}
              </Link>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
