import { Navbar } from "@/components/navbar";
import { Hero } from "@/components/hero";
import { Converter } from "@/components/converter";
import {
  FeaturesSection,
  UsageSection,
  ComparisonSection,
  FAQSection,
} from "@/components/sections";
import { Footer } from "@/components/footer";

export default function Home() {
  return (
    <div className="min-h-screen bg-white text-neutral-800">
      <Navbar />
      <main>
        <Hero />
        <Converter />
        <FeaturesSection />
        <UsageSection />
        <ComparisonSection />
        <FAQSection />
      </main>
      <Footer />
    </div>
  );
}
