import { Header } from "@/components/medina/Header";
import { Hero } from "@/components/medina/Hero";
import { TwinCases } from "@/components/medina/TwinCases";
import { LibraryPreview } from "@/components/medina/LibraryPreview";
import { Premium } from "@/components/medina/Premium";
import { Footer } from "@/components/medina/Footer";

const Index = () => {
  return (
    <div className="min-h-screen bg-background">
      <Header />
      <main>
        <Hero />
        <TwinCases />
        <LibraryPreview />
        <Premium />
      </main>
      <Footer />
    </div>
  );
};

export default Index;
