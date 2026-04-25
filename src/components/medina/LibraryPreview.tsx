import { Link } from "react-router-dom";
import { ArrowRight, BookOpen, Download, FileText, ChevronRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import { SectionHeading } from "./SectionHeading";
import { articles } from "@/data/medina";
import { useI18n } from "@/contexts/I18nContext";

export const LibraryPreview = () => {
  const { t } = useI18n();
  const featured = articles.slice(0, 5);
  return (
    <section className="py-24 md:py-28 bg-sand-50/60 border-y border-border-soft">
      <div className="container mx-auto px-6 lg:px-10 max-w-5xl">
        <SectionHeading eyebrow={t("library.eyebrow")} title={t("library.title")} subtitle={t("library.subtitle")} />

        <ul className="frame-cirta-soft bg-card divide-y divide-border-soft mb-10">
          {featured.map((a, i) => (
            <li
              key={a.id}
              className="group flex items-center gap-4 px-5 py-4 hover:bg-secondary/40 transition-colors"
            >
              <span className="font-display text-xs text-brown/60 tracking-widest w-8 shrink-0">
                {String(i + 1).padStart(2, "0")}
              </span>
              <FileText className="w-5 h-5 text-brown shrink-0 hidden sm:block" strokeWidth={1.4} />
              <div className="flex-1 min-w-0">
                <h3 className="font-serif text-base md:text-lg text-ink leading-snug truncate group-hover:text-brown-dark transition-colors">
                  {a.title}
                </h3>
                <p className="text-xs text-muted-foreground font-serif italic truncate">— {a.author}</p>
              </div>
              <span className="hidden md:inline-block text-[10px] font-display uppercase tracking-[0.2em] text-brown border border-border-soft px-2.5 py-1 shrink-0">
                {a.tag}
              </span>
              <span className="hidden sm:inline text-xs text-muted-foreground font-display tracking-widest tabular-nums shrink-0">
                {a.pages} p
              </span>
              <Download className="w-4 h-4 text-brown shrink-0" />
              <ChevronRight className="w-4 h-4 text-brown/50 group-hover:text-brown group-hover:translate-x-0.5 transition-all" />
            </li>
          ))}
        </ul>

        <div className="text-center">
          <Button variant="cirta" size="lg" asChild>
            <Link to="/bibliotheque">
              <BookOpen className="w-4 h-4 mr-2" /> {t("library.open")}
              <ArrowRight className="w-4 h-4 ml-2" />
            </Link>
          </Button>
        </div>
      </div>
    </section>
  );
};
