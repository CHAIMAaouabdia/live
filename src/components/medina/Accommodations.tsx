import { useState } from "react";
import { Star, MapPin, SlidersHorizontal } from "lucide-react";
import { Button } from "@/components/ui/button";
import { SectionHeading } from "./SectionHeading";
import hostHome from "@/assets/host-home.jpg";
import luxury from "@/assets/luxury-riad.jpg";
import alley from "@/assets/medina-alley.jpg";
import bridges from "@/assets/bridges.jpg";

type Type = "Tous" | "Classique" | "Chez l'habitant";

const items = [
  {
    img: luxury,
    name: "Riad El Kantara",
    type: "Classique",
    sub: "Hôtel de charme",
    price: 12500,
    location: "Médina haute",
    rating: 4.9,
  },
  {
    img: hostHome,
    name: "Maison de Lalla Aïcha",
    type: "Chez l'habitant",
    sub: "Famille hôte",
    price: 4800,
    location: "Souk El Ghzel",
    rating: 5.0,
  },
  {
    img: alley,
    name: "Dar Ben Badis",
    type: "Chez l'habitant",
    sub: "Maison d'hôte",
    price: 6200,
    location: "Rue Larbi Ben M'Hidi",
    rating: 4.8,
  },
  {
    img: bridges,
    name: "Appartement Sidi M'Cid",
    type: "Classique",
    sub: "Appartement",
    price: 8900,
    location: "Vue sur les ponts",
    rating: 4.7,
  },
] as const;

export const Accommodations = () => {
  const [filter, setFilter] = useState<Type>("Tous");
  const filtered = filter === "Tous" ? items : items.filter((i) => i.type === filter);

  return (
    <section id="hebergement" className="py-24 md:py-32 bg-sand-50/60 border-y border-border-soft">
      <div className="container mx-auto px-6 lg:px-10">
        <SectionHeading
          eyebrow="L'hébergement"
          title="De l'hôtel discret à la table familiale"
          subtitle="Deux philosophies d'accueil : le confort classique et l'authenticité de la vie chez l'habitant — pour concrétiser le concept d'habiter le patrimoine."
        />

        {/* Filtres */}
        <div className="flex flex-wrap items-center justify-between gap-4 mb-10">
          <div className="flex flex-wrap gap-2">
            {(["Tous", "Classique", "Chez l'habitant"] as Type[]).map((t) => (
              <button
                key={t}
                onClick={() => setFilter(t)}
                className={`px-5 py-2 text-xs font-display uppercase tracking-[0.18em] border transition-all ${
                  filter === t
                    ? "bg-primary text-primary-foreground border-brown-dark"
                    : "border-border text-brown hover:bg-secondary"
                }`}
              >
                {t}
              </button>
            ))}
          </div>
          <button className="flex items-center gap-2 text-sm text-brown font-serif hover:text-ink transition-colors">
            <SlidersHorizontal className="w-4 h-4" /> Filtres avancés (prix, rating, localisation)
          </button>
        </div>

        {/* Grid */}
        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {filtered.map((it) => (
            <article key={it.name} className="group frame-cirta-soft bg-card overflow-hidden flex flex-col">
              <div className="relative aspect-[4/5] overflow-hidden">
                <img
                  src={it.img}
                  alt={it.name}
                  loading="lazy"
                  width={800}
                  height={1000}
                  className="w-full h-full object-cover image-warm transition-transform duration-700 group-hover:scale-105"
                />
                <span className="absolute top-3 left-3 text-[10px] font-display uppercase tracking-[0.18em] bg-card/95 text-brown-dark px-2.5 py-1 border border-border">
                  {it.type}
                </span>
              </div>
              <div className="p-5 flex-1 flex flex-col">
                <div className="flex items-start justify-between gap-2 mb-1">
                  <h3 className="font-serif text-xl text-ink leading-tight">{it.name}</h3>
                  <div className="flex items-center gap-1 text-xs text-brown shrink-0">
                    <Star className="w-3.5 h-3.5 fill-brown" />
                    <span className="font-medium">{it.rating}</span>
                  </div>
                </div>
                <p className="text-xs text-muted-foreground mb-2">{it.sub}</p>
                <div className="flex items-center gap-1 text-xs text-muted-foreground mb-4">
                  <MapPin className="w-3 h-3" /> {it.location}
                </div>
                <div className="mt-auto flex items-end justify-between pt-4 border-t border-border-soft">
                  <div>
                    <p className="font-serif text-2xl text-ink leading-none">
                      {it.price.toLocaleString("fr-FR")}<span className="text-sm text-muted-foreground"> DA</span>
                    </p>
                    <p className="text-[10px] text-muted-foreground uppercase tracking-wider mt-1">par nuit</p>
                  </div>
                  <Button variant="cirtaOutline" size="sm">Réserver</Button>
                </div>
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
};
