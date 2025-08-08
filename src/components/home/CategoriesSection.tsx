import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { Newspaper, Landmark, Briefcase, Cpu, Trophy, Palette } from 'lucide-react';
import type { LucideIcon } from 'lucide-react';

const categories: { name: string; icon: LucideIcon }[] = [
    { name: 'Politics', icon: Landmark },
    { name: 'Business', icon: Briefcase },
    { name: 'Tech', icon: Cpu },
    { name: 'Sports', icon: Trophy },
    { name: 'Culture', icon: Palette },
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
                            className="bg-card hover:bg-accent hover:text-accent-foreground transition-all duration-300 transform hover:scale-105"
                            size="lg"
                        >
                            <Link href="#">
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
