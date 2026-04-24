import { Download, BookOpen, Sparkles, Map } from "lucide-react";
import { Button } from "@/components/ui/button";
import medina from "@/assets/medina-alley.jpg";

const features = [
  { icon: BookOpen, label: "Histoire de Cirta" },
  { icon: Map, label: "Plan de la médina" },
  { icon: Sparkles, label: "Conseils d'initiés" },
];

export const FreeContent = () => (
  <section id="constantine" className="py-24 md:py-32">
    <div className="container mx-auto px-6 lg:px-10">
      <div className="frame-cirta bg-card overflow-hidden grid md:grid-cols-2 items-stretch">
        <div className="relative aspect-[4/3] md:aspect-auto">
          <img
            src={medina}
            alt="Médina de Constantine — guide gratuit"
            loading="lazy"
            width={1280}
            height={1280}
            className="w-full h-full object-cover image-warm"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-brown-dark/40 to-transparent md:bg-gradient-to-r" />
        </div>
        <div className="p-10 md:p-14 flex flex-col justify-center">
          <p className="eyebrow mb-3">Téléchargement gratuit · PDF</p>
          <h2 className="font-serif text-4xl md:text-5xl text-ink leading-tight mb-5">
            Le Guide de Constantine
          </h2>
          <p className="text-muted-foreground leading-relaxed mb-8">
            Histoire millénaire, ruelles secrètes, conseils pour habiter la médina avec respect.
            Un compagnon culturel offert à tous nos visiteurs.
          </p>
          <ul className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-10">
            {features.map((f) => (
              <li key={f.label} className="flex items-center gap-3 text-sm text-ink">
                <f.icon className="w-4 h-4 text-brown" strokeWidth={1.6} />
                <span className="font-serif">{f.label}</span>
              </li>
            ))}
          </ul>
          <div className="flex flex-wrap gap-3">
            <Button variant="cirta" size="lg">
              <Download className="w-4 h-4 mr-2" /> Télécharger le PDF
            </Button>
            <Button variant="cirtaGhost" size="lg">Voir un aperçu</Button>
          </div>
        </div>
      </div>
    </div>
  </section>
);
