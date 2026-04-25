import { Link } from "react-router-dom";
import { ArrowRight } from "lucide-react";
import { useI18n } from "@/contexts/I18nContext";
import hostHome from "@/assets/host-home.jpg";
import artisan from "@/assets/artisan.jpg";

export const TwinCases = () => {
  const { t } = useI18n();
  const cases = [
    {
      img: hostHome,
      eyebrow: t("twin.stay.eyebrow"),
      title: t("twin.stay.title"),
      text: t("twin.stay.text"),
      cta: t("twin.stay.cta"),
      to: "/hebergement",
    },
    {
      img: artisan,
      eyebrow: t("twin.exp.eyebrow"),
      title: t("twin.exp.title"),
      text: t("twin.exp.text"),
      cta: t("twin.exp.cta"),
      to: "/experiences",
    },
  ];

  return (
    <section className="py-24 md:py-28 mt-12">
      <div className="container mx-auto px-6 lg:px-10">
        <div className="grid md:grid-cols-2 gap-8 lg:gap-12">
          {cases.map((c) => (
            <Link
              key={c.eyebrow}
              to={c.to}
              className="group block frame-cirta bg-card overflow-hidden transition-all duration-500 hover:shadow-elegant"
            >
              <div className="relative aspect-[4/3] overflow-hidden">
                <img
                  src={c.img}
                  alt={c.title}
                  loading="lazy"
                  width={1280}
                  height={960}
                  className="w-full h-full object-cover image-warm transition-transform duration-700 group-hover:scale-105"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-brown-dark/50 to-transparent" />
                <span className="absolute top-5 start-5 eyebrow text-sand-50 bg-brown-dark/40 backdrop-blur-sm px-3 py-1.5 border border-sand-100/30">
                  {c.eyebrow}
                </span>
              </div>
              <div className="p-8 md:p-10">
                <h3 className="font-serif text-3xl md:text-4xl text-ink mb-3 leading-tight">{c.title}</h3>
                <p className="text-muted-foreground leading-relaxed mb-6">{c.text}</p>
                <span className="inline-flex items-center gap-2 text-brown font-display text-xs uppercase tracking-[0.2em] group-hover:gap-4 transition-all">
                  {c.cta} <ArrowRight className="w-4 h-4" />
                </span>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
};
