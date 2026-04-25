import { Link } from "react-router-dom";
import { ArrowRight, BookOpen, Download } from "lucide-react";
import { Button } from "@/components/ui/button";
import { SectionHeading } from "./SectionHeading";
import { articles } from "@/data/medina";

export const LibraryPreview = () => {
  const featured = articles.slice(0, 3);
  return (
    <section className="py-24 md:py-28 bg-sand-50/60 border-y border-border-soft">
      <div className="container mx-auto px-6 lg:px-10">
        <SectionHeading
          eyebrow="Bibliothèque Cirta"
          title="Constantine en lecture"
          subtitle="Une collection d'articles et de PDF gratuits sur l'histoire, les traditions et le patrimoine de la médina."
        />

        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6 mb-10">
          {featured.map((a) => (
            <article key={a.id} className="frame-cirta-soft bg-card p-5 flex gap-4">
              <div className="w-20 shrink-0 aspect-[3/4] bg-gradient-warm border border-brown-dark p-2 flex flex-col justify-between">
                <p className="font-display text-[8px] uppercase tracking-widest text-sand-100/80">
                  {a.tag}
                </p>
                <p className="font-serif text-[10px] text-sand-50 leading-tight">{a.title.slice(0, 28)}…</p>
              </div>
              <div className="flex-1 min-w-0">
                <p className="eyebrow text-[10px] mb-1">{a.tag} · {a.pages} p.</p>
                <h3 className="font-serif text-lg text-ink leading-snug mb-2 line-clamp-2">{a.title}</h3>
                <p className="text-xs text-muted-foreground line-clamp-2 mb-3">{a.excerpt}</p>
                <div className="flex items-center gap-2 text-[11px] text-brown font-display uppercase tracking-wider">
                  <Download className="w-3 h-3" /> PDF · {a.size}
                </div>
              </div>
            </article>
          ))}
        </div>

        <div className="text-center">
          <Button variant="cirta" size="lg" asChild>
            <Link to="/bibliotheque">
              <BookOpen className="w-4 h-4 mr-2" /> Ouvrir la bibliothèque
              <ArrowRight className="w-4 h-4 ml-2" />
            </Link>
          </Button>
        </div>
      </div>
    </section>
  );
};
