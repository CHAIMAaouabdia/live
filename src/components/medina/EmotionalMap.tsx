import { SectionHeading } from "./SectionHeading";
import bridges from "@/assets/bridges.jpg";

const emotions = [
  { e: "😍", label: "Émerveillé", count: 248, top: "22%", left: "30%" },
  { e: "😊", label: "Apaisé", count: 187, top: "55%", left: "62%" },
  { e: "😐", label: "Curieux", count: 64, top: "70%", left: "20%" },
  { e: "🥹", label: "Ému", count: 142, top: "38%", left: "75%" },
  { e: "😍", label: "Émerveillé", count: 96, top: "62%", left: "45%" },
];

export const EmotionalMap = () => (
  <section className="py-24 md:py-32">
    <div className="container mx-auto px-6 lg:px-10">
      <SectionHeading
        eyebrow="Fonction innovante"
        title="Carte émotionnelle"
        subtitle="Après chaque expérience, partagez l'émotion ressentie. Découvrez Constantine à travers les sentiments de ceux qui l'ont déjà habitée."
      />

      <div className="grid lg:grid-cols-[1.6fr_1fr] gap-8 items-stretch">
        <div className="relative frame-cirta bg-card overflow-hidden aspect-[16/10]">
          <img
            src={bridges}
            alt="Carte émotionnelle de Constantine"
            loading="lazy"
            width={1280}
            height={800}
            className="w-full h-full object-cover image-warm opacity-90"
          />
          <div className="absolute inset-0 bg-sand-50/30" />
          {emotions.map((p, i) => (
            <button
              key={i}
              className="absolute -translate-x-1/2 -translate-y-1/2 group"
              style={{ top: p.top, left: p.left }}
            >
              <span className="block w-12 h-12 md:w-14 md:h-14 rounded-full bg-card border-2 border-brown shadow-elegant flex items-center justify-center text-2xl md:text-3xl transition-transform group-hover:scale-110">
                {p.e}
              </span>
              <span className="absolute top-full mt-2 left-1/2 -translate-x-1/2 whitespace-nowrap bg-brown-dark text-sand-50 text-[10px] font-display uppercase tracking-wider px-2 py-1 opacity-0 group-hover:opacity-100 transition-opacity">
                {p.label} · {p.count}
              </span>
            </button>
          ))}
        </div>

        <div className="frame-cirta-soft bg-card p-8 flex flex-col">
          <p className="eyebrow mb-3">Comment ça marche</p>
          <h3 className="font-serif text-2xl text-ink mb-6 leading-tight">
            Vos émotions deviennent une boussole pour les prochains voyageurs.
          </h3>
          <ol className="space-y-5 text-sm text-muted-foreground flex-1">
            {[
              "Vivez une expérience à Constantine.",
              "Choisissez l'émoji qui résume votre instant.",
              "Votre émotion est ancrée au lieu visité.",
              "Les futurs visiteurs explorent la ville par ressentis.",
            ].map((t, i) => (
              <li key={i} className="flex gap-4">
                <span className="font-display text-brown text-xs pt-1">0{i + 1}</span>
                <span className="text-ink font-serif text-base">{t}</span>
              </li>
            ))}
          </ol>
          <div className="flex gap-2 mt-6 pt-6 border-t border-border-soft">
            {["😊", "😍", "😐", "☹️", "🥹"].map((e) => (
              <span key={e} className="w-10 h-10 flex items-center justify-center border border-border-soft text-xl bg-sand-50">
                {e}
              </span>
            ))}
          </div>
        </div>
      </div>
    </div>
  </section>
);
