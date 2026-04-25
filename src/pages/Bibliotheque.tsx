import { useMemo, useState } from "react";
import { Search, Download, BookOpen, FileText, X } from "lucide-react";
import { Header } from "@/components/medina/Header";
import { Footer } from "@/components/medina/Footer";
import { SectionHeading } from "@/components/medina/SectionHeading";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { articles, ArticleTag } from "@/data/medina";
import { toast } from "@/hooks/use-toast";

const TAGS: ("Tous" | ArticleTag)[] = [
  "Tous",
  "Histoire",
  "Traditions",
  "Architecture",
  "Gastronomie",
  "Musique",
  "Patrimoine",
];

const Bibliotheque = () => {
  const [query, setQuery] = useState("");
  const [tag, setTag] = useState<(typeof TAGS)[number]>("Tous");

  const filtered = useMemo(() => {
    return articles.filter((a) => {
      if (tag !== "Tous" && a.tag !== tag) return false;
      if (query) {
        const q = query.toLowerCase();
        if (
          !a.title.toLowerCase().includes(q) &&
          !a.excerpt.toLowerCase().includes(q) &&
          !a.author.toLowerCase().includes(q)
        )
          return false;
      }
      return true;
    });
  }, [query, tag]);

  const download = (title: string) => {
    toast({
      title: "Téléchargement démarré",
      description: `« ${title} » — fichier PDF`,
    });
  };

  return (
    <div className="min-h-screen bg-background">
      <Header />
      <main className="pt-16">
        <div className="container mx-auto px-6 lg:px-10 py-16">
          <SectionHeading
            eyebrow="Bibliothèque Cirta"
            title="Constantine en lecture"
            subtitle="Une collection d'articles et de PDF sur l'histoire, les traditions et le patrimoine de la médina — gratuits, à télécharger."
          />

          {/* Search bar */}
          <div className="frame-cirta-soft bg-card p-5 mb-6">
            <div className="relative mb-4">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-brown" />
              <Input
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                placeholder="Rechercher un titre, un thème, un auteur…"
                className="pl-10 rounded-none border-border-soft bg-transparent font-serif text-base"
              />
              {query && (
                <button
                  onClick={() => setQuery("")}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-brown hover:text-ink"
                  aria-label="Effacer"
                >
                  <X className="w-4 h-4" />
                </button>
              )}
            </div>
            <div className="flex flex-wrap gap-2">
              {TAGS.map((t) => (
                <button
                  key={t}
                  onClick={() => setTag(t)}
                  className={`px-4 py-1.5 text-[11px] font-display uppercase tracking-[0.18em] border transition-all ${
                    tag === t
                      ? "bg-primary text-primary-foreground border-brown-dark"
                      : "border-border-soft text-brown hover:bg-secondary"
                  }`}
                >
                  {t}
                </button>
              ))}
            </div>
          </div>

          <p className="text-sm text-muted-foreground font-serif mb-6">
            <span className="text-ink font-semibold">{filtered.length}</span> document{filtered.length > 1 ? "s" : ""} dans la bibliothèque
          </p>

          {filtered.length === 0 ? (
            <div className="text-center py-20 frame-cirta-soft bg-card">
              <BookOpen className="w-10 h-10 text-brown mx-auto mb-3" strokeWidth={1.2} />
              <p className="font-serif text-2xl text-ink mb-1">Aucun document trouvé</p>
              <p className="text-muted-foreground text-sm">
                Essayez d'autres mots-clés ou parcourez tous les thèmes.
              </p>
            </div>
          ) : (
            <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {filtered.map((a) => (
                <article
                  key={a.id}
                  className="frame-cirta-soft bg-card p-6 flex flex-col group hover:shadow-elegant transition-all duration-500"
                >
                  {/* Faux PDF cover */}
                  <div className="relative aspect-[3/4] mb-5 bg-gradient-warm border border-brown-dark overflow-hidden flex flex-col justify-between p-6">
                    <div className="absolute top-2 right-2 w-8 h-8 border-l border-b border-sand-100/40" />
                    <div>
                      <FileText className="w-6 h-6 text-sand-100 mb-3" strokeWidth={1.2} />
                      <p className="font-display text-[9px] uppercase tracking-[0.25em] text-sand-100/80 mb-2">
                        {a.tag}
                      </p>
                      <p className="font-serif text-lg text-sand-50 leading-tight">{a.title}</p>
                    </div>
                    <div className="text-[10px] font-display uppercase tracking-widest text-sand-100/70">
                      Live Médina · {a.year}
                    </div>
                  </div>

                  <div className="flex items-center justify-between text-[10px] text-muted-foreground font-display uppercase tracking-wider mb-3">
                    <span>{a.pages} pages · PDF · {a.size}</span>
                  </div>
                  <p className="text-sm text-muted-foreground leading-relaxed mb-2 line-clamp-3">
                    {a.excerpt}
                  </p>
                  <p className="text-xs text-brown font-serif italic mb-4">— {a.author}</p>

                  <div className="mt-auto flex gap-2">
                    <Button variant="cirtaOutline" size="sm" className="flex-1">
                      <BookOpen className="w-3.5 h-3.5 mr-1.5" /> Aperçu
                    </Button>
                    <Button variant="cirta" size="sm" className="flex-1" onClick={() => download(a.title)}>
                      <Download className="w-3.5 h-3.5 mr-1.5" /> PDF
                    </Button>
                  </div>
                </article>
              ))}
            </div>
          )}
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default Bibliotheque;
