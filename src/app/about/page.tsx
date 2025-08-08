import Header from '@/components/common/Header';
import Footer from '@/components/common/Footer';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Building, Users, Goal } from 'lucide-react';
import BreakingNewsTicker from '@/components/breaking-news-ticker';

const teamMembers = [
  { name: 'Collins Otieno', role: 'Lead Developer', initials: 'CO' },
  { name: 'Justin', role: 'Content Manager', initials: 'J' },
  { name: 'Ludeki', role: 'Political Correspondent', initials: 'L' },
];

export default function AboutPage() {
  return (
    <div className="flex flex-col min-h-screen bg-background">
      <Header />
      <BreakingNewsTicker />
      <main className="flex-grow container mx-auto px-4 py-8 md:py-12">
        <div className="max-w-4xl mx-auto">
          <h1 className="text-3xl md:text-4xl font-bold text-primary mb-6 text-center">About News254</h1>

          <section className="mb-12">
            <div className="grid md:grid-cols-2 gap-8 items-center">
              <div className="order-2 md:order-1">
                <h2 className="text-2xl md:text-3xl font-bold mb-4 flex items-center gap-3"><Building className="w-8 h-8 text-accent" /> Our Story</h2>
                <p className="text-base md:text-lg text-foreground/80 leading-relaxed">
                  News254 was founded with a simple mission: to provide Kenyans with timely, accurate, and relevant news that matters. In an age of information overload, we strive to be a trusted source, cutting through the noise to deliver stories that inform, educate, and engage our audience. Our platform is built on the principles of journalistic integrity and a deep commitment to the communities we serve.
                </p>
              </div>
              <div className="order-1 md:order-2">
                <img src="https://placehold.co/600x400.png" data-ai-hint="team working" alt="News254 Team" className="rounded-lg shadow-lg" />
              </div>
            </div>
          </section>

          <section className="mb-12 text-center">
             <h2 className="text-2xl md:text-3xl font-bold mb-4 flex items-center justify-center gap-3"><Goal className="w-8 h-8 text-accent" /> Our Mission & Vision</h2>
             <p className="text-base md:text-lg text-foreground/80 leading-relaxed max-w-3xl mx-auto">
              Our mission is to empower our readers by providing comprehensive coverage of local and international news with a Kenyan perspective. We envision a more informed and connected society, where access to reliable information fosters positive change and development.
            </p>
          </section>

          <section>
            <h2 className="text-2xl md:text-3xl font-bold mb-8 text-center flex items-center justify-center gap-3"><Users className="w-8 h-8 text-accent" /> Meet the Team</h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-8">
              {teamMembers.map((member) => (
                <div key={member.name} className="text-center">
                  <Avatar className="w-24 h-24 mx-auto mb-4 border-4 border-primary">
                    <AvatarImage src={`https://placehold.co/100x100.png`} data-ai-hint="person portrait" alt={member.name} />
                    <AvatarFallback>{member.initials}</AvatarFallback>
                  </Avatar>
                  <h3 className="text-xl font-bold">{member.name}</h3>
                  <p className="text-primary">{member.role}</p>
                </div>
              ))}
            </div>
          </section>
        </div>
      </main>
      <Footer />
    </div>
  );
}
