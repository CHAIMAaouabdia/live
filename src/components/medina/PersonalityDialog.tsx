import { useMemo, useState } from "react";
import { Sparkles, Brain, ArrowRight, CheckCircle2, Loader2 } from "lucide-react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { experiences, Experience } from "@/data/medina";

interface Props {
  open: boolean;
  onOpenChange: (v: boolean) => void;
  onContinue: (profile: string, picks: Experience[]) => void;
}

type Axis = "contemplatif" | "aventurier" | "social" | "esthete" | "spirituel" | "hedoniste";

interface Option {
  label: string;
  axes: Partial<Record<Axis, number>>;
}

interface Q {
  q: string;
  options: Option[];
}

const QUESTIONS: Q[] = [
  {
    q: "Au réveil dans un lieu inconnu, ce qui vous attire en premier :",
    options: [
      { label: "Un silence, un thé, un carnet pour écrire.", axes: { contemplatif: 2, spirituel: 1 } },
      { label: "Une carte, des chaussures de marche, l'inconnu.", axes: { aventurier: 2 } },
      { label: "Un marché, des visages, des conversations.", axes: { social: 2 } },
      { label: "Un musée, une façade, une lumière qui tombe juste.", axes: { esthete: 2 } },
    ],
  },
  {
    q: "Ce qui reste d'un voyage, pour vous, c'est surtout :",
    options: [
      { label: "Une émotion intérieure, un moment suspendu.", axes: { contemplatif: 2, spirituel: 1 } },
      { label: "Une histoire à raconter, une amitié.", axes: { social: 2 } },
      { label: "Un goût, un parfum, une texture.", axes: { hedoniste: 2, esthete: 1 } },
      { label: "Un défi relevé, une fierté.", axes: { aventurier: 2 } },
    ],
  },
  {
    q: "Vous aimez une ville d'abord par :",
    options: [
      { label: "Son architecture et son patrimoine.", axes: { esthete: 2 } },
      { label: "Sa spiritualité, ses lieux de recueillement.", axes: { spirituel: 2, contemplatif: 1 } },
      { label: "Sa gastronomie, ses marchés.", axes: { hedoniste: 2, social: 1 } },
      { label: "Ses ruelles cachées, ses secrets.", axes: { aventurier: 2, contemplatif: 1 } },
    ],
  },
  {
    q: "Face à un inconnu en voyage :",
    options: [
      { label: "Je lance la conversation avec plaisir.", axes: { social: 2 } },
      { label: "J'observe, j'écoute, je réponds si on me parle.", axes: { contemplatif: 2 } },
      { label: "Je partage un repas avant tout.", axes: { hedoniste: 1, social: 2 } },
      { label: "Je demande le meilleur raccourci vers l'aventure.", axes: { aventurier: 2 } },
    ],
  },
  {
    q: "Votre idée du luxe :",
    options: [
      { label: "Du temps, et personne pour me le voler.", axes: { contemplatif: 2 } },
      { label: "Une table rare, un vin, une vue.", axes: { hedoniste: 2, esthete: 1 } },
      { label: "Une rencontre qui vous change.", axes: { social: 2, spirituel: 1 } },
      { label: "Un lieu où personne ne va jamais.", axes: { aventurier: 2 } },
    ],
  },
  {
    q: "Ce qui vous touche le plus dans une tradition :",
    options: [
      { label: "Le geste répété, précis, presque sacré.", axes: { spirituel: 2, esthete: 1 } },
      { label: "La transmission entre générations.", axes: { social: 2, spirituel: 1 } },
      { label: "La matière : bois, cuivre, étoffe, épice.", axes: { esthete: 1, hedoniste: 2 } },
      { label: "L'histoire qu'elle raconte.", axes: { contemplatif: 2 } },
    ],
  },
];

// Map experience id -> axes affinity
const EXP_AFFINITY: Record<string, Partial<Record<Axis, number>>> = {
  "dinandier": { esthete: 2, contemplatif: 1 },
  "chakhchoukha": { social: 2, hedoniste: 2 },
  "ville-suspendue": { esthete: 2, aventurier: 1, social: 1 },
  "fresque": { social: 2, spirituel: 1 },
  "souika": { aventurier: 2, contemplatif: 1 },
  "cirta-antique": { contemplatif: 2, esthete: 2, spirituel: 1 },
  "calligraphie": { spirituel: 2, esthete: 2, contemplatif: 1 },
  "ecole-medina": { social: 2, spirituel: 1 },
  "eau-rose-fleur-oranger": { esthete: 2, hedoniste: 2, spirituel: 1 },
};

const PROFILES: Record<Axis, { name: string; desc: string }> = {
  contemplatif: {
    name: "Le Contemplatif",
    desc: "Vous voyagez pour le silence, la lenteur, les instants où le temps se suspend. Constantine vous offrira ses ruelles secrètes et sa lumière.",
  },
  aventurier: {
    name: "L'Explorateur",
    desc: "Vous cherchez le hors-sentier, l'imprévu, l'authentique brut. Nous vous emmènerons là où les guides ne vont pas.",
  },
  social: {
    name: "Le Voyageur du Lien",
    desc: "Vous voyagez pour les visages, les tables partagées, les amitiés de passage. Constantine vous ouvrira ses maisons.",
  },
  esthete: {
    name: "L'Esthète",
    desc: "Votre voyage est un regard : architecture, matière, détail. Nous vous guiderons vers la beauté cachée de la médina.",
  },
  spirituel: {
    name: "L'Âme en Quête",
    desc: "Vous cherchez le sens, le geste juste, la tradition vivante. Constantine vous livrera ses savoirs sacrés.",
  },
  hedoniste: {
    name: "L'Épicurien",
    desc: "Saveurs, parfums, textures — vous voyagez par les sens. La cuisine et les parfums de Constantine vous attendent.",
  },
};

export const PersonalityDialog = ({ open, onOpenChange, onContinue }: Props) => {
  const [step, setStep] = useState<"intro" | "quiz" | "analyzing" | "result">("intro");
  const [answers, setAnswers] = useState<number[]>([]);
  const [idx, setIdx] = useState(0);

  const scores = useMemo(() => {
    const s: Record<Axis, number> = {
      contemplatif: 0, aventurier: 0, social: 0, esthete: 0, spirituel: 0, hedoniste: 0,
    };
    answers.forEach((optIdx, qi) => {
      const opt = QUESTIONS[qi]?.options[optIdx];
      if (!opt) return;
      Object.entries(opt.axes).forEach(([k, v]) => {
        s[k as Axis] += v as number;
      });
    });
    return s;
  }, [answers]);

  const topAxis = useMemo<Axis>(() => {
    return (Object.entries(scores).sort((a, b) => b[1] - a[1])[0]?.[0] as Axis) ?? "contemplatif";
  }, [scores]);

  const recommendations = useMemo(() => {
    const scored = experiences.map((e) => {
      const aff = EXP_AFFINITY[e.id] ?? {};
      const score = (Object.entries(aff) as [Axis, number][]).reduce(
        (acc, [ax, w]) => acc + w * (scores[ax] ?? 0),
        0,
      );
      return { e, score };
    });
    return scored.sort((a, b) => b.score - a.score).slice(0, 3).map((x) => x.e);
  }, [scores]);

  const reset = () => {
    setStep("intro");
    setAnswers([]);
    setIdx(0);
  };

  const handleClose = (v: boolean) => {
    if (!v) setTimeout(reset, 300);
    onOpenChange(v);
  };

  const pick = (optIdx: number) => {
    const next = [...answers, optIdx];
    setAnswers(next);
    if (idx + 1 < QUESTIONS.length) {
      setIdx(idx + 1);
    } else {
      setStep("analyzing");
      setTimeout(() => setStep("result"), 1800);
    }
  };

  const profile = PROFILES[topAxis];

  return (
    <Dialog open={open} onOpenChange={handleClose}>
      <DialogContent className="max-w-2xl bg-card border border-border rounded-none p-0 overflow-hidden max-h-[90vh] overflow-y-auto">
        <div className="bg-gradient-warm p-6 text-sand-50">
          <div className="flex items-center gap-2 mb-2">
            <Sparkles className="w-4 h-4 text-sand-100" />
            <p className="eyebrow text-sand-100">Parcours Luxe · Analyse sur-mesure</p>
          </div>
          <DialogHeader>
            <DialogTitle className="font-serif text-2xl md:text-3xl text-sand-50 leading-tight">
              {step === "intro" && "Découvrez le voyage qui vous ressemble"}
              {step === "quiz" && `Question ${idx + 1} / ${QUESTIONS.length}`}
              {step === "analyzing" && "Analyse en cours…"}
              {step === "result" && profile.name}
            </DialogTitle>
            <DialogDescription className="text-sand-100/80 text-sm">
              {step === "intro" &&
                "Six questions psychologiques, une analyse de personnalité, et un parcours conçu pour vous seul."}
              {step === "quiz" && "Répondez avec votre intuition, pas votre raison."}
              {step === "analyzing" && "Nous croisons vos réponses avec les traditions vivantes de Constantine."}
              {step === "result" && "Voici votre profil et les expériences qui vous correspondent."}
            </DialogDescription>
          </DialogHeader>
        </div>

        <div className="p-6 md:p-8">
          {step === "intro" && (
            <div className="space-y-5">
              <div className="frame-cirta-soft bg-sand-50 p-5 space-y-3">
                <div className="flex items-start gap-3">
                  <Brain className="w-5 h-5 text-brown mt-0.5" />
                  <div>
                    <p className="font-serif text-ink text-base mb-1">Une analyse de personnalité avancée</p>
                    <p className="text-xs text-muted-foreground leading-relaxed">
                      Notre système croise vos réponses selon six axes (contemplatif, explorateur, social,
                      esthète, spirituel, épicurien) pour dresser votre portrait de voyageur et proposer un
                      itinéraire sur mesure — guide privé, hébergement choisi, expériences uniques.
                    </p>
                  </div>
                </div>
              </div>
              <Button variant="cirta" size="lg" className="w-full" onClick={() => setStep("quiz")}>
                Commencer le questionnaire <ArrowRight className="w-4 h-4 ms-2" />
              </Button>
              <p className="text-[11px] text-muted-foreground text-center">
                Environ 2 minutes · Confidentiel · Conservé localement sur votre appareil
              </p>
            </div>
          )}

          {step === "quiz" && (
            <div className="space-y-4">
              <div className="h-1 bg-border-soft w-full">
                <div
                  className="h-full bg-primary transition-all duration-500"
                  style={{ width: `${((idx + 1) / QUESTIONS.length) * 100}%` }}
                />
              </div>
              <p className="font-serif text-xl text-ink leading-snug">{QUESTIONS[idx].q}</p>
              <div className="space-y-2">
                {QUESTIONS[idx].options.map((o, i) => (
                  <button
                    key={i}
                    onClick={() => pick(i)}
                    className="w-full text-left p-4 border border-border-soft hover:bg-secondary hover:border-brown transition-colors font-serif text-ink"
                  >
                    {o.label}
                  </button>
                ))}
              </div>
            </div>
          )}

          {step === "analyzing" && (
            <div className="py-12 text-center space-y-4">
              <Loader2 className="w-10 h-10 text-brown animate-spin mx-auto" />
              <p className="font-serif text-lg text-ink">Analyse psychologique en cours…</p>
              <p className="text-xs text-muted-foreground">
                Extraction des axes dominants · Croisement avec 9 expériences · Sélection du parcours
              </p>
            </div>
          )}

          {step === "result" && (
            <div className="space-y-5">
              <div className="frame-cirta-soft bg-sand-50 p-5">
                <p className="eyebrow text-brown mb-1">Votre profil</p>
                <p className="font-serif text-2xl text-ink mb-2">{profile.name}</p>
                <p className="text-sm text-muted-foreground leading-relaxed">{profile.desc}</p>
                <div className="flex flex-wrap gap-1.5 mt-3">
                  {(Object.entries(scores) as [Axis, number][])
                    .sort((a, b) => b[1] - a[1])
                    .slice(0, 3)
                    .map(([ax, v]) => (
                      <span key={ax} className="text-[10px] font-display uppercase tracking-widest bg-primary text-primary-foreground px-2 py-0.5">
                        {ax} · {v}
                      </span>
                    ))}
                </div>
              </div>

              <div>
                <p className="eyebrow mb-3">Expériences recommandées pour vous</p>
                <div className="space-y-2">
                  {recommendations.map((e) => (
                    <div key={e.id} className="flex gap-3 border border-border-soft p-3">
                      <img src={e.img} alt={e.title} className="w-20 h-20 object-cover shrink-0" loading="lazy" />
                      <div className="flex-1 min-w-0">
                        <p className="font-serif text-sm text-ink leading-snug">{e.title}</p>
                        <p className="text-[11px] text-muted-foreground line-clamp-2 mt-1">{e.description}</p>
                      </div>
                      <CheckCircle2 className="w-4 h-4 text-brown shrink-0" />
                    </div>
                  ))}
                </div>
              </div>

              <Button
                variant="cirta"
                size="lg"
                className="w-full"
                onClick={() => onContinue(profile.name, recommendations)}
              >
                Réserver mon parcours Luxe sur-mesure
              </Button>
            </div>
          )}
        </div>
      </DialogContent>
    </Dialog>
  );
};
