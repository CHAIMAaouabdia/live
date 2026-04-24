import { Clock, Users, Heart } from "lucide-react";
import { Button } from "@/components/ui/button";
import { SectionHeading } from "./SectionHeading";
import artisan from "@/assets/artisan.jpg";
import cuisine from "@/assets/cuisine.jpg";
import guide from "@/assets/guide-experience.jpg";
import solidarity from "@/assets/solidarity.jpg";
import alley from "@/assets/medina-alley.jpg";

const cats = [
  {
    tag: "Expérience simple",
    icon: Clock,
    desc: "Activités courtes et ciblées : ateliers artisanaux, découverte de la cuisine, immersion ponctuelle.",
  },
  {
    tag: "Parcours VIP",
    icon: Users,
    desc: "Programmes d'une journée ou plus, combinant culture, gastronomie et rencontres avec les habitants.",
  },
  {
    tag: "Expérience solidaire",
    icon: Heart,
    desc: "Tourisme responsable et participatif : engagez-vous dans des projets communautaires de la médina.",
  },
];

const items = [
  {
    img: artisan,
    cat: "Atelier",
    title: "Dans la forge du dinandier",
    duration: "3h",
    price: "3 200 DA",
    badge: "Simple",
  },
  {
    img: cuisine,
    cat: "Gastronomie",
    title: "Table d'hôte — Chakhchoukha en famille",
    duration: "4h",
    price: "2 800 DA",
    badge: "Simple",
  },
  {
    img: guide,
    cat: "Parcours",
    title: "Constantine, ville suspendue — 2 jours",
    duration: "2 jours",
    price: "à partir de 18 500 DA",
    badge: "VIP",
  },
  {
    img: solidarity,
    cat: "Solidaire",
    title: "Restaurer une fresque de la vieille ville",
    duration: "Journée",
    price: "Don libre",
    badge: "Solidaire",
  },
  {
    img: alley,
    cat: "Découverte",
    title: "Les ruelles secrètes de Souika",
    duration: "2h30",
    price: "1 900 DA",
    badge: "Simple",
  },
  {
    img: guide,
    cat: "Parcours",
    title: "Cirta antique — pierres & légendes (3j)",
    duration: "3 jours",
    price: "à partir de 32 000 DA",
    badge: "VIP",
  },
];

export const Experiences = () => (
  <section id="experiences" className="py-24 md:py-32">
    <div className="container mx-auto px-6 lg:px-10">
      <SectionHeading
        eyebrow="Les expériences"
        title="Le cœur battant de Live Médina"
        subtitle="Trois manières d'entrer dans la vie de Constantine : simple, immersive ou solidaire — toujours portée par celles et ceux qui l'habitent."
      />

      {/* Catégories */}
      <div className="grid md:grid-cols-3 gap-5 mb-16">
        {cats.map((c) => (
          <div key={c.tag} className="frame-cirta-soft p-7 bg-card">
            <c.icon className="w-7 h-7 text-brown mb-4" strokeWidth={1.4} />
            <p className="eyebrow mb-2">{c.tag}</p>
            <p className="text-sm text-muted-foreground leading-relaxed">{c.desc}</p>
          </div>
        ))}
      </div>

      {/* Cards */}
      <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {items.map((it, i) => (
          <article
            key={i}
            className="group relative frame-cirta-soft bg-card overflow-hidden flex flex-col stamp-corners"
          >
            <div className="relative aspect-[5/4] overflow-hidden">
              <img
                src={it.img}
                alt={it.title}
                loading="lazy"
                width={1000}
                height={800}
                className="w-full h-full object-cover image-warm transition-transform duration-700 group-hover:scale-105"
              />
              <span className="absolute top-3 right-3 text-[10px] font-display uppercase tracking-[0.18em] bg-primary text-primary-foreground px-2.5 py-1">
                {it.badge}
              </span>
            </div>
            <div className="p-6 flex-1 flex flex-col">
              <p className="eyebrow text-[10px] mb-2">{it.cat} · {it.duration}</p>
              <h3 className="font-serif text-xl text-ink leading-snug mb-4 flex-1">{it.title}</h3>
              <div className="flex items-end justify-between pt-4 border-t border-border-soft">
                <p className="font-serif text-lg text-brown">{it.price}</p>
                <Button variant="cirtaOutline" size="sm">Détails</Button>
              </div>
            </div>
          </article>
        ))}
      </div>
    </div>
  </section>
);
