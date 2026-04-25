import { useState } from "react";
import { Check, Crown } from "lucide-react";
import { Button } from "@/components/ui/button";
import { SectionHeading } from "./SectionHeading";
import { BookingDialog, BookingItem } from "./BookingDialog";
import luxury from "@/assets/luxury-riad.jpg";

const tiers = [
  {
    id: "standard",
    name: "Standard",
    price: 25000,
    desc: "L'essentiel d'un parcours organisé.",
    features: ["Hébergement maison d'hôte", "Guide numérique", "2 expériences incluses", "Carte interactive"],
  },
  {
    id: "premium",
    name: "Premium",
    price: 65000,
    desc: "L'expérience complète, personnalisée.",
    featured: true,
    features: [
      "Hébergement de qualité",
      "Guide expert dédié",
      "5 expériences exclusives",
      "Transport privé",
      "Accès Emotional Map +",
    ],
  },
  {
    id: "luxe",
    name: "Luxe",
    price: 150000,
    desc: "L'art de vivre Cirta, sans compromis.",
    features: [
      "Riad de prestige privatisé",
      "Concierge personnel 24/7",
      "Programme cousu main",
      "Gastronomie chef étoilé",
      "Conciergerie premium",
    ],
  },
];

export const Premium = () => {
  const [item, setItem] = useState<BookingItem | null>(null);
  const [open, setOpen] = useState(false);

  const choose = (t: (typeof tiers)[number]) => {
    setItem({
      id: t.id,
      title: `Parcours ${t.name}`,
      subtitle: t.desc,
      image: luxury,
      price: t.price,
      unit: "par personne",
    });
    setOpen(true);
  };

  return (
    <section className="py-24 md:py-32 bg-gradient-warm relative overflow-hidden">
      <div
        className="absolute inset-0 opacity-10"
        style={{
          backgroundImage:
            "url(\"data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cpath d='M30 0L40 20L60 30L40 40L30 60L20 40L0 30L20 20Z' fill='none' stroke='%23f5e6c8' stroke-width='0.5'/%3E%3C/svg%3E\")",
        }}
      />
      <div className="container mx-auto px-6 lg:px-10 relative">
        <div className="text-center mb-14 max-w-3xl mx-auto">
          <Crown className="w-10 h-10 text-sand-50 mx-auto mb-4" strokeWidth={1.4} />
          <p className="eyebrow text-sand-100 mb-3">Parcours Premium</p>
          <h2 className="font-serif text-4xl md:text-5xl lg:text-6xl text-sand-50 leading-tight mb-4">
            Une autre dimension du voyage
          </h2>
          <p className="text-sand-100/80 leading-relaxed">
            Trois niveaux pour habiter Cirta selon vos rêves — du standard chaleureux au luxe sur-mesure.
          </p>
        </div>

        <div className="grid md:grid-cols-3 gap-6">
          {tiers.map((t) => (
            <div
              key={t.id}
              className={`p-8 md:p-10 flex flex-col ${
                t.featured
                  ? "bg-sand-50 border-2 border-sand-100 -mt-4 shadow-elegant"
                  : "bg-sand-50/95 border border-sand-200"
              }`}
            >
              <p className="eyebrow mb-2">{t.name}</p>
              <p className="font-serif text-base text-muted-foreground mb-5">{t.desc}</p>
              <div className="flex items-baseline gap-1 mb-6 pb-6 border-b border-border-soft">
                <span className="font-serif text-4xl text-ink">{t.price.toLocaleString("fr-FR")}</span>
                <span className="text-sm text-muted-foreground"> DA / pers.</span>
              </div>
              <ul className="space-y-3 mb-8 flex-1">
                {t.features.map((f) => (
                  <li key={f} className="flex items-start gap-3 text-sm text-ink">
                    <Check className="w-4 h-4 text-brown mt-0.5 shrink-0" strokeWidth={2} />
                    <span>{f}</span>
                  </li>
                ))}
              </ul>
              <Button
                variant={t.featured ? "cirta" : "cirtaOutline"}
                size="lg"
                className="w-full"
                onClick={() => choose(t)}
              >
                Choisir {t.name}
              </Button>
            </div>
          ))}
        </div>
      </div>
      <BookingDialog open={open} onOpenChange={setOpen} item={item} />
    </section>
  );
};
