import Header from '@/components/common/Header';
import Footer from '@/components/common/Footer';
import { Shield, FileText } from 'lucide-react';
import BreakingNewsTicker from '@/components/breaking-news-ticker';

export default function PrivacyPage() {
  return (
    <div className="flex flex-col min-h-screen bg-background">
      <Header />
      <BreakingNewsTicker />
      <main className="flex-grow container mx-auto px-4 py-8 md:py-12">
        <div className="max-w-4xl mx-auto prose lg:prose-xl prose-headings:text-primary prose-p:text-base md:prose-p:text-lg">
          <div className="text-center mb-10">
            <h1 className="text-3xl md:text-4xl font-bold mb-4 flex items-center justify-center gap-3">
              <Shield className="w-10 h-10" /> Privacy Policy
            </h1>
            <p className="text-lg text-foreground/80">Last updated: {new Date().toLocaleDateString()}</p>
          </div>

          <p>
            News254 ("us", "we", or "our") operates the https://news254.co.ke website (the "Service"). This page informs you of our policies regarding the collection, use, and disclosure of personal data when you use our Service and the choices you have associated with that data.
          </p>

          <h2><FileText className="inline-block mr-2 h-6 w-6"/>Information Collection and Use</h2>
          <p>
            We collect several different types of information for various purposes to provide and improve our Service to you. This may include, but is not limited to, your email address for newsletters, and usage data for analytics.
          </p>

          <h2><FileText className="inline-block mr-2 h-6 w-6"/>Log Data</h2>
          <p>
            Like many site operators, we collect information that your browser sends whenever you visit our Service ("Log Data"). This Log Data may include information such as your computer's Internet Protocol ("IP") address, browser type, browser version, the pages of our Service that you visit, the time and date of your visit, the time spent on those pages, and other statistics.
          </p>

          <h2><FileText className="inline-block mr-2 h-6 w-6"/>Cookies</h2>
          <p>
            Cookies are files with a small amount of data, which may include an anonymous unique identifier. Cookies are sent to your browser from a web site and stored on your computer's hard drive. We use "cookies" to collect information. You can instruct your browser to refuse all cookies or to indicate when a cookie is being sent.
          </p>

          <h2><FileText className="inline-block mr-2 h-6 w-6"/>Changes to This Privacy Policy</h2>
          <p>
            We may update our Privacy Policy from time to time. We will notify you of any changes by posting the new Privacy Policy on this page. You are advised to review this Privacy Policy periodically for any changes.
          </p>
        </div>
      </main>
      <Footer />
    </div>
  );
}
