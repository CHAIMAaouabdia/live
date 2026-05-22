import { useMemo, useState } from "react";
import { Search, Download, BookOpen, FileText, X, ChevronRight } from "lucide-react";
import { Header } from "@/components/medina/Header";
import { Footer } from "@/components/medina/Footer";
import { SectionHeading } from "@/components/medina/SectionHeading";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { articles, ArticleTag, articleI18n, articleTagI18n } from "@/data/medina";
import { toast } from "@/hooks/use-toast";
import { useI18n } from "@/contexts/I18nContext";

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
  const { t } = useI18n();
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
      title: t("library.toast.start"),
      description: `« ${title} » — ${t("library.toast.startDesc")}`,
    });
  };

  return (
    <div className="min-h-screen bg-background">
      <Header />
      <main className="pt-16">
        <div className="container mx-auto px-6 lg:px-10 py-16 max-w-5xl">
          <SectionHeading eyebrow={t("library.eyebrow")} title={t("library.title")} subtitle={t("library.subtitle")} />

          <div className="frame-cirta-soft bg-card p-5 mb-6">
            <div className="relative mb-4">
              <Search className="absolute start-3 top-1/2 -translate-y-1/2 w-4 h-4 text-brown" />
              <Input
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                placeholder={t("library.search.ph")}
                className="ps-10 rounded-none border-border-soft bg-transparent font-serif text-base"
              />
              {query && (
                <button
                  onClick={() => setQuery("")}
                  className="absolute end-3 top-1/2 -translate-y-1/2 text-brown hover:text-ink"
                  aria-label={t("common.close")}
                >
                  <X className="w-4 h-4" />
                </button>
              )}
            </div>
            <div className="flex flex-wrap gap-2">
              {TAGS.map((tg) => (
                <button
                  key={tg}
                  onClick={() => setTag(tg)}
                  className={`px-4 py-1.5 text-[11px] font-display uppercase tracking-[0.18em] border transition-all ${
                    tag === tg
                      ? "bg-primary text-primary-foreground border-brown-dark"
                      : "border-border-soft text-brown hover:bg-secondary"
                  }`}
                >
                  {tg === "Tous" ? t("stay.cat.all") : tg}
                </button>
              ))}
            </div>
          </div>

          <p className="text-sm text-muted-foreground font-serif mb-4">
            <span className="text-ink font-semibold">{filtered.length}</span>{" "}
            {filtered.length > 1 ? t("library.docs") : t("library.doc")}
          </p>

          {filtered.length === 0 ? (
            <div className="text-center py-20 frame-cirta-soft bg-card">
              <BookOpen className="w-10 h-10 text-brown mx-auto mb-3" strokeWidth={1.2} />
              <p className="font-serif text-2xl text-ink mb-1">{t("library.empty.title")}</p>
              <p className="text-muted-foreground text-sm">{t("library.empty.sub")}</p>
            </div>
          ) : (
            <ul className="frame-cirta-soft bg-card divide-y divide-border-soft">
              {filtered.map((a, i) => (
                <li
                  key={a.id}
                  className="group flex items-center gap-4 px-5 py-4 md:px-6 md:py-5 hover:bg-secondary/40 transition-colors"
                >
                  <span className="font-display text-xs text-brown/60 tracking-widest w-8 shrink-0">
                    {String(i + 1).padStart(2, "0")}
                  </span>
                  <FileText className="w-5 h-5 text-brown shrink-0 hidden sm:block" strokeWidth={1.4} />
                  <div className="flex-1 min-w-0">
                    <h3 className="font-serif text-base md:text-lg text-ink leading-snug truncate group-hover:text-brown-dark transition-colors">
                      {a.title}
                    </h3>
                    <p className="text-xs text-muted-foreground font-serif truncate">
                      <span className="text-brown italic">— {a.author}</span> · {a.excerpt}
                    </p>
                  </div>
                  <span className="hidden md:inline-block text-[10px] font-display uppercase tracking-[0.2em] text-brown border border-border-soft px-2.5 py-1 shrink-0">
                    {a.tag}
                  </span>
                  <span className="hidden sm:inline text-xs text-muted-foreground font-display tracking-widest shrink-0 tabular-nums">
                    {a.pages} p · {a.size}
                  </span>
                  <div className="flex items-center gap-1 shrink-0">
                    <button
                      onClick={() => download(a.title)}
                      className="p-2 text-brown hover:text-brown-dark hover:bg-sand-100 transition-colors"
                      aria-label={t("library.download")}
                      title={t("library.download")}
                    >
                      <Download className="w-4 h-4" />
                    </button>
                    <ChevronRight className="w-4 h-4 text-brown/50 group-hover:text-brown group-hover:translate-x-0.5 transition-all" />
                  </div>
                </li>
              ))}
            </ul>
          )}

          {filtered.length > 0 && (
            <div className="mt-8 text-center">
              <Button
                variant="cirtaOutline"
                size="lg"
                onClick={() =>
                  toast({
                    title: t("library.toast.all"),
                    description: t("library.toast.allDesc"),
                  })
                }
              >
                <Download className="w-4 h-4 mr-2" /> {t("library.downloadAll")}
              </Button>
            </div>
          )}
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default Bibliotheque;
