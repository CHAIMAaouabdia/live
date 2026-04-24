import { Search, MapPin, Calendar, Users } from "lucide-react";
import { Button } from "@/components/ui/button";
import hero from "@/assets/hero-constantine.jpg";

export const Hero = () => {
  return (
    <section id="accueil" className="relative min-h-[92vh] flex flex-col">
      {/* Background image */}
      <div className="absolute inset-0">
        <img
          src={hero}
          alt="Pont Sidi M'Cid surplombant les gorges du Rhumel à Constantine"
          className="w-full h-full object-cover image-warm"
          width={1920}
          height={1080}
        />
        <div className="absolute inset-0 bg-gradient-overlay" />
        <div className="absolute inset-0 bg-gradient-to-r from-brown-dark/40 via-transparent to-transparent" />
      </div>

      {/* Content */}
      <div className="relative flex-1 flex items-center">
        <div className="container mx-auto px-6 lg:px-10 py-20">
          <div className="max-w-3xl fade-up">
            <div className="ornament mb-8">
              <span className="eyebrow text-sand-50">Constantine — Cirta antique</span>
            </div>
            <h1 className="font-serif text-5xl md:text-7xl lg:text-8xl text-sand-50 leading-[1.05] mb-8">
              Ne visitez plus la médina,
              <br />
              <em className="text-sand-100 font-light">habitez-la.</em>
            </h1>
            <p className="text-sand-100/90 text-lg md:text-xl max-w-xl font-light leading-relaxed mb-10">
              Vivez Constantine de l'intérieur — chez ses habitants, au rythme de ses ruelles,
              au cœur de ses traditions millénaires.
            </p>
            <div className="flex flex-wrap gap-3">
              <Button variant="cirta" size="xl">Explorer les expériences</Button>
              <Button variant="cirtaOutline" size="xl" className="border-sand-50 text-sand-50 hover:bg-sand-50 hover:text-brown-dark">
                Découvrir l'hébergement
              </Button>
            </div>
          </div>
        </div>
      </div>

      {/* Search bar */}
      <div className="relative z-10 container mx-auto px-6 lg:px-10 -mb-12 pb-4">
        <div className="frame-cirta bg-card p-6 md:p-8 max-w-5xl mx-auto">
          <div className="grid md:grid-cols-[1.2fr_1.4fr_1fr_auto] gap-4 items-end">
            <Field icon={MapPin} label="Ville">
              <input
                defaultValue="Constantine"
                className="w-full bg-transparent border-b border-border-soft pb-1.5 font-serif text-lg text-ink focus:outline-none focus:border-brown"
              />
            </Field>
            <Field icon={Calendar} label="Dates">
              <div className="flex items-center gap-2 font-serif text-lg text-ink border-b border-border-soft pb-1.5">
                <span>12 mai</span>
                <span className="text-muted-foreground">→</span>
                <span>18 mai</span>
              </div>
            </Field>
            <Field icon={Users} label="Voyageurs">
              <div className="font-serif text-lg text-ink border-b border-border-soft pb-1.5">
                2 adultes
              </div>
            </Field>
            <Button variant="cirta" size="xl" className="h-[58px] w-full md:w-auto">
              <Search className="w-4 h-4 mr-2" /> Rechercher
            </Button>
          </div>
        </div>
      </div>
    </section>
  );
};

const Field = ({
  icon: Icon,
  label,
  children,
}: {
  icon: React.ComponentType<{ className?: string }>;
  label: string;
  children: React.ReactNode;
}) => (
  <div>
    <div className="flex items-center gap-2 mb-1.5">
      <Icon className="w-3.5 h-3.5 text-brown" />
      <span className="eyebrow text-[10px]">{label}</span>
    </div>
    {children}
  </div>
);
