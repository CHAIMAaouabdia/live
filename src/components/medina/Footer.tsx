import { Instagram, Facebook, Mail } from "lucide-react";
import { Link } from "react-router-dom";
import { useI18n } from "@/contexts/I18nContext";
import logo from "@/assets/logo.png";

export const Footer = () => {
  const { t } = useI18n();

  const cols: { titleKey: string; links: { labelKey: string; to: string }[] }[] = [
    {
      titleKey: "footer.col.discover",
      links: [
        { labelKey: "nav.home", to: "/" },
        { labelKey: "nav.stay", to: "/hebergement" },
        { labelKey: "nav.experiences", to: "/experiences" },
        { labelKey: "nav.library", to: "/bibliotheque" },
      ],
    },
    {
      titleKey: "footer.col.services",
      links: [
        { labelKey: "footer.link.parcours", to: "/" },
        { labelKey: "footer.link.host", to: "/" },
        { labelKey: "footer.link.guide", to: "/" },
        { labelKey: "footer.link.pdf", to: "/bibliotheque" },
      ],
    },
    {
      titleKey: "footer.col.about",
      links: [
        { labelKey: "footer.link.about", to: "/" },
        { labelKey: "footer.link.contact", to: "/" },
        { labelKey: "footer.link.legal", to: "/" },
        { labelKey: "footer.link.privacy", to: "/" },
      ],
    },
  ];

  return (
    <footer className="bg-brown-dark text-sand-100 pt-20 pb-10 mt-0">
      <div className="container mx-auto px-6 lg:px-10">
        <div className="grid md:grid-cols-4 gap-12 pb-14 border-b border-sand-100/15">
          <div className="md:col-span-1">
            <img
              src={logo}
              alt="Live Médina"
              className="h-14 w-auto mb-4 brightness-0 invert opacity-90"
              width={200}
              height={120}
            />
            <p className="font-serif text-lg text-sand-50 italic mb-2">{t("footer.tagline")}</p>
            <p className="text-sm text-sand-100/70">{t("footer.location")}</p>
          </div>

          {cols.map((col) => (
            <div key={col.titleKey}>
              <p className="eyebrow text-sand-50 mb-4">{t(col.titleKey)}</p>
              <ul className="space-y-2.5">
                {col.links.map((l) => (
                  <li key={l.labelKey}>
                    <Link
                      to={l.to}
                      className="font-serif text-sand-100/80 hover:text-sand-50 transition-colors text-base"
                    >
                      {t(l.labelKey)}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        <div className="flex flex-col md:flex-row justify-between items-center gap-6 pt-10">
          <p className="text-xs text-sand-100/60 font-display uppercase tracking-[0.2em]">
            {t("footer.copy")}
          </p>
          <div className="flex items-center gap-5 text-sand-100/70">
            <a href="#" aria-label="Instagram" className="hover:text-sand-50 transition"><Instagram className="w-4 h-4" /></a>
            <a href="#" aria-label="Facebook" className="hover:text-sand-50 transition"><Facebook className="w-4 h-4" /></a>
            <a href="#" aria-label="Email" className="hover:text-sand-50 transition"><Mail className="w-4 h-4" /></a>
          </div>
        </div>
      </div>
    </footer>
  );
};
