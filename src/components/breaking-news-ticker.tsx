import { articles } from '@/lib/data';
import { Megaphone, Dot } from 'lucide-react';

export default function BreakingNewsTicker() {
  const breakingNews = articles.filter(article => article.breaking);

  if (breakingNews.length === 0) {
    return null;
  }

  // Duplicate the items to create a seamless loop for the marquee
  const tickerItems = [...breakingNews, ...breakingNews];

  return (
    <div className="bg-accent text-accent-foreground rounded-lg overflow-hidden shadow-lg">
      <div className="flex items-center p-3">
        <div className="flex items-center gap-2 flex-shrink-0 pr-4">
          <Megaphone className="h-6 w-6" />
          <span className="font-bold font-headline text-lg">BREAKING</span>
        </div>
        <div className="relative flex-1 overflow-hidden">
          <div className="flex animation-marquee">
            {tickerItems.map((item, index) => (
              <div key={index} className="flex items-center flex-shrink-0 px-4">
                <p className="whitespace-nowrap">{item.title}</p>
                {index < tickerItems.length - 1 && <Dot className="h-6 w-6 text-primary" />}
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
