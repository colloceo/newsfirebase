import Header from '@/components/common/Header';
import Footer from '@/components/common/Footer';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Mail, MessageSquare, Newspaper, HelpCircle } from 'lucide-react';

export default function ContactPage() {
  return (
    <div className="flex flex-col min-h-screen bg-background">
      <Header />
      <main className="flex-grow container mx-auto px-4 py-8 md:py-12">
        <div className="max-w-2xl mx-auto">
          <h1 className="text-3xl md:text-4xl font-bold text-primary mb-4 text-center">Contact Us</h1>
          <p className="text-center text-foreground/80 mb-8">
            We'd love to hear from you! Whether you have a news tip, a question, or feedback, please don't hesitate to get in touch.
          </p>

          <form className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="space-y-2">
                <Label htmlFor="name">Full Name</Label>
                <Input id="name" placeholder="Your Name" />
              </div>
              <div className="space-y-2">
                <Label htmlFor="email">Email Address</Label>
                <Input id="email" type="email" placeholder="your.email@example.com" />
              </div>
            </div>

            <div className="space-y-2">
              <Label htmlFor="inquiry-type">Inquiry Type</Label>
              <Select>
                <SelectTrigger id="inquiry-type">
                  <SelectValue placeholder="Select a reason for contacting us" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="general"><MessageSquare className="inline-block mr-2 h-4 w-4" />General Inquiry</SelectItem>
                  <SelectItem value="tip"><Newspaper className="inline-block mr-2 h-4 w-4" />News Tip</SelectItem>
                  <SelectItem value="support"><HelpCircle className="inline-block mr-2 h-4 w-4" />Support</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div className="space-y-2">
              <Label htmlFor="message">Message</Label>
              <Textarea id="message" placeholder="Type your message here..." rows={6} />
            </div>

            <div className="text-center">
              <Button type="submit" size="lg" className="bg-primary hover:bg-primary/90 w-full md:w-auto">
                <Mail className="mr-2 h-5 w-5" />
                Send Message
              </Button>
            </div>
          </form>
        </div>
      </main>
      <Footer />
    </div>
  );
}
