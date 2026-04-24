import { Star, Award, MapPin } from "lucide-react";
import { Button } from "@/components/ui/button";
import { SectionHeading } from "./SectionHeading";
import guide from "@/assets/guide-experience.jpg";
import alley from "@/assets/medina-alley.jpg";

export const GuideOption = () => (
  <section className="py-24 md:py-32 bg-sand-50/60 border-y border-border-soft">
    <div className="container mx-auto px-6 lg:px-10">
      <SectionHeading
        eyebrow="Choix important"
        title="Choisissez votre expérience"
        subtitle="Parcours autonome avec carte et instructions, ou accompagné par un guide local certifié — l'âme du lieu en option."
      />

      <div className="grid md:grid-cols-2 gap-6 mb-12">
        {/* Option 1 */}
        <div className="frame-cirta-soft bg-card p-8 md:p-10">
          <div className="flex items-start justify-between mb-6">
            <div>
              <p className="eyebrow mb-2">Option 1</p>
              <h3 className="font-serif text-3xl text-ink">Parcours autonome</h3>
            </div>
            <MapPin className="w-7 h-7 text-brown" strokeWidth={1.4} />
          </div>
          <ul className="space-y-2 text-muted-foreground mb-8 text-sm">
            <li>— Sans guide</li>
            <li>— Avec instructions détaillées</li>
            <li>— Carte interactive incluse</li>
          </ul>
          <div className="flex items-end justify-between pt-6 border-t border-border-soft">
            <div>
              <p className="text-[10px] uppercase tracking-wider text-muted-foreground">À partir de</p>
              <p className="font-serif text-3xl text-ink">4 500 DA</p>
            </div>
            <Button variant="cirtaOutline" size="lg">Choisir</Button>
          </div>
        </div>

        {/* Option 2 */}
        <div className="frame-cirta bg-card p-8 md:p-10 relative">
          <span className="absolute -top-3 left-8 bg-primary text-primary-foreground text-[10px] font-display uppercase tracking-[0.2em] px-3 py-1">
            Recommandé
          </span>
          <div className="flex items-start justify-between mb-6">
            <div>
              <p className="eyebrow mb-2">Option 2</p>
              <h3 className="font-serif text-3xl text-ink">Avec guide local</h3>
            </div>
            <Award className="w-7 h-7 text-brown" strokeWidth={1.4} />
          </div>

          {/* Guide profile preview */}
          <div className="flex items-center gap-4 p-4 bg-sand-50 border border-border-soft mb-6">
            <img
              src={guide}
              alt="Guide local"
              loading="lazy"
              width={120}
              height={120}
              className="w-14 h-14 object-cover rounded-full border border-border"
            />
            <div className="flex-1 min-w-0">
              <p className="font-serif text-base text-ink">Karim Benali</p>
              <div className="flex items-center gap-2 text-xs text-muted-foreground">
                <Star className="w-3 h-3 fill-brown text-brown" /> 4.9
                <span>·</span>
                <span className="text-brown">Top Guide · Local Hero</span>
              </div>
            </div>
          </div>

          <div className="flex items-end justify-between pt-6 border-t border-border-soft">
            <div>
              <p className="text-[10px] uppercase tracking-wider text-muted-foreground">À partir de</p>
              <p className="font-serif text-3xl text-brown">7 200 DA</p>
            </div>
            <Button variant="cirta" size="lg">Réserver</Button>
          </div>
        </div>
      </div>

      {/* Programme détaillé teaser */}
      <div className="frame-cirta-soft bg-card p-8 md:p-10 grid md:grid-cols-[1.2fr_2fr] gap-8 items-center">
        <img
          src={alley}
          alt="Programme parcours"
          loading="lazy"
          width={800}
          height={600}
          className="w-full h-64 md:h-full object-cover image-warm"
        />
        <div>
          <p className="eyebrow mb-2">Programme détaillé · Exemple</p>
          <h3 className="font-serif text-2xl md:text-3xl text-ink mb-6">Une journée dans la médina</h3>
          <div className="grid sm:grid-cols-2 gap-x-8 gap-y-4 text-sm">
            {[
              ["Matin", "Marché de Souk El Ghzel & petit-déjeuner traditionnel"],
              ["Après-midi", "Atelier de calligraphie + visite du palais Ahmed Bey"],
              ["Soir", "Dîner chez l'habitant à la lumière des lanternes"],
              ["Nuit", "Maison d'hôte de la rue Larbi Ben M'Hidi"],
            ].map(([k, v]) => (
              <div key={k}>
                <p className="eyebrow text-[10px] mb-1">{k}</p>
                <p className="text-ink font-serif">{v}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  </section>
);
