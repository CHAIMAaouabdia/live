import { Header } from "@/components/medina/Header";
import { Hero } from "@/components/medina/Hero";
import { TwinCases } from "@/components/medina/TwinCases";
import { Accommodations } from "@/components/medina/Accommodations";
import { Experiences } from "@/components/medina/Experiences";
import { GuideOption } from "@/components/medina/GuideOption";
import { EmotionalMap } from "@/components/medina/EmotionalMap";
import { Premium } from "@/components/medina/Premium";
import { FreeContent } from "@/components/medina/FreeContent";
import { Footer } from "@/components/medina/Footer";

const Index = () => {
  return (
    <div className="min-h-screen bg-background">
      <Header />
      <main>
        <Hero />
        <TwinCases />
        <Accommodations />
        <Experiences />
        <GuideOption />
        <EmotionalMap />
        <Premium />
        <FreeContent />
      </main>
      <Footer />
    </div>
  );
};

export default Index;
