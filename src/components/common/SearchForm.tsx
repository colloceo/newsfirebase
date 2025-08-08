'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { Input } from '@/components/ui/input';
import { Search } from 'lucide-react';

export default function SearchForm({ initialQuery = '' }: { initialQuery?: string }) {
  const router = useRouter();
  const [query, setQuery] = useState(initialQuery);

  const handleSearch = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (query.trim()) {
      router.push(`/search?q=${encodeURIComponent(query)}`);
    }
  };

  return (
    <form onSubmit={handleSearch} className="relative w-full max-w-sm">
      <Input
        type="search"
        placeholder="Search..."
        className="pl-10"
        value={query}
        onChange={(e) => setQuery(e.target.value)}
        aria-label="Search articles"
      />
      <button type="submit" aria-label="Submit search" className="absolute left-3 top-1/2 -translate-y-1/2">
        <Search className="h-5 w-5 text-muted-foreground" />
      </button>
    </form>
  );
}
