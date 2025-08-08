import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { Newspaper, Landmark, Briefcase, Cpu, Trophy, Palette } from 'lucide-react';
import type { LucideIcon } from 'lucide-react';

const categories: { name: string; icon: LucideIcon, href: string }[] = [
    { name: 'Politics', icon: Landmark, href: '/category/politics' },
    { name: 'Business', icon: Briefcase, href: '/category/business' },
    { name: 'Tech', icon: Cpu, href: '/category/tech' },
    { name: 'Sports', icon: Trophy, href: '/category/sports' },
    { name: 'Culture', icon: Palette, href: '/category/culture' },
];

export default function CategoriesSection() {
    return (
        <section className="py-12 bg-secondary rounded-lg">
            <div className="container mx-auto px-4">
                <h2 className="text-3xl font-bold text-center mb-8 text-primary">Browse by Category</h2>
                <div className="flex flex-wrap justify-center gap-4">
                    {categories.map((category) => (
                        <Button
                            key={category.name}
                            asChild
                            variant="outline"
                            className="bg-card hover:bg-primary hover:text-primary-foreground transition-all duration-300 transform hover:scale-105"
                            size="lg"
                        >
                            <Link href={category.href}>
                                <category.icon className="mr-2 h-5 w-5" />
                                <span>{category.name}</span>
                            </Link>
                        </Button>
                    ))}
                </div>
            </div>
        </section>
    );
}
