import { createContext, useContext, useEffect, useState, ReactNode } from "react";

export type Lang = "FR" | "EN" | "AR";

type Dict = Record<string, string>;

const translations: Record<Lang, Dict> = {
  FR: {
    "nav.home": "Accueil",
    "nav.stay": "Hébergement",
    "nav.experiences": "Expériences",
    "nav.library": "Bibliothèque",
    "nav.login": "Connexion",
    "nav.signup": "S'inscrire",
    "nav.book": "Réserver",
    "hero.eyebrow": "Constantine — Cirta antique",
    "hero.title.a": "Ne visitez plus la médina,",
    "hero.title.b": "habitez-la.",
    "hero.subtitle":
      "Vivez Constantine de l'intérieur — chez ses habitants, au rythme de ses ruelles, au cœur de ses traditions millénaires.",
    "hero.cta.exp": "Explorer les expériences",
    "hero.cta.stay": "Découvrir l'hébergement",
    "search.where": "Destination",
    "search.where.ph": "Constantine, médina, Souika…",
    "search.dates": "Dates",
    "search.checkin": "Arrivée",
    "search.checkout": "Départ",
    "search.guests": "Voyageurs",
    "search.guests.adult": "adulte",
    "search.guests.adults": "adultes",
    "search.search": "Rechercher",
    "search.budget": "Budget max / nuit",
    "search.any": "Tous",
    "common.close": "Fermer",
    "common.apply": "Appliquer",
    "library.title": "Constantine en lecture",
    "library.eyebrow": "Bibliothèque Cirta",
    "library.subtitle":
      "Une collection d'articles et de PDF gratuits sur l'histoire, les traditions et le patrimoine de la médina.",
    "library.open": "Ouvrir la bibliothèque",
    "library.search.ph": "Rechercher un titre, un thème, un auteur…",
    "library.docs": "documents",
    "library.doc": "document",
    "library.preview": "Aperçu",
    "library.download": "PDF",
  },
  EN: {
    "nav.home": "Home",
    "nav.stay": "Stay",
    "nav.experiences": "Experiences",
    "nav.library": "Library",
    "nav.login": "Sign in",
    "nav.signup": "Sign up",
    "nav.book": "Book now",
    "hero.eyebrow": "Constantine — Ancient Cirta",
    "hero.title.a": "Don't just visit the medina,",
    "hero.title.b": "live in it.",
    "hero.subtitle":
      "Experience Constantine from within — in the homes of its people, to the rhythm of its alleys, at the heart of its millennial traditions.",
    "hero.cta.exp": "Explore experiences",
    "hero.cta.stay": "Discover places to stay",
    "search.where": "Destination",
    "search.where.ph": "Constantine, medina, Souika…",
    "search.dates": "Dates",
    "search.checkin": "Check-in",
    "search.checkout": "Check-out",
    "search.guests": "Guests",
    "search.guests.adult": "adult",
    "search.guests.adults": "adults",
    "search.search": "Search",
    "search.budget": "Max budget / night",
    "search.any": "Any",
    "common.close": "Close",
    "common.apply": "Apply",
    "library.title": "Reading Constantine",
    "library.eyebrow": "Cirta Library",
    "library.subtitle":
      "A collection of free articles and PDFs about the history, traditions and heritage of the medina.",
    "library.open": "Open the library",
    "library.search.ph": "Search a title, theme, author…",
    "library.docs": "documents",
    "library.doc": "document",
    "library.preview": "Preview",
    "library.download": "PDF",
  },
  AR: {
    "nav.home": "الرئيسية",
    "nav.stay": "الإقامة",
    "nav.experiences": "التجارب",
    "nav.library": "المكتبة",
    "nav.login": "دخول",
    "nav.signup": "تسجيل",
    "nav.book": "احجز الآن",
    "hero.eyebrow": "قسنطينة — سيرتا القديمة",
    "hero.title.a": "لا تزر المدينة فحسب،",
    "hero.title.b": "بل عش فيها.",
    "hero.subtitle":
      "عش قسنطينة من الداخل — في بيوت أهلها، على إيقاع أزقتها، في قلب تقاليدها العريقة.",
    "hero.cta.exp": "اكتشف التجارب",
    "hero.cta.stay": "اكتشف أماكن الإقامة",
    "search.where": "الوجهة",
    "search.where.ph": "قسنطينة، المدينة، السويقة…",
    "search.dates": "التواريخ",
    "search.checkin": "الوصول",
    "search.checkout": "المغادرة",
    "search.guests": "المسافرون",
    "search.guests.adult": "بالغ",
    "search.guests.adults": "بالغون",
    "search.search": "بحث",
    "search.budget": "الميزانية القصوى / ليلة",
    "search.any": "الكل",
    "common.close": "إغلاق",
    "common.apply": "تطبيق",
    "library.title": "قسنطينة قراءةً",
    "library.eyebrow": "مكتبة سيرتا",
    "library.subtitle":
      "مجموعة من المقالات وملفات PDF المجانية حول تاريخ المدينة وتقاليدها وتراثها.",
    "library.open": "افتح المكتبة",
    "library.search.ph": "ابحث عن عنوان، موضوع، مؤلف…",
    "library.docs": "وثائق",
    "library.doc": "وثيقة",
    "library.preview": "معاينة",
    "library.download": "PDF",
  },
};

interface I18nContextValue {
  lang: Lang;
  setLang: (l: Lang) => void;
  t: (key: string) => string;
  dir: "ltr" | "rtl";
}

const I18nContext = createContext<I18nContextValue | null>(null);

export const I18nProvider = ({ children }: { children: ReactNode }) => {
  const [lang, setLangState] = useState<Lang>(() => {
    const saved = typeof window !== "undefined" ? (localStorage.getItem("lm-lang") as Lang | null) : null;
    return saved ?? "FR";
  });

  const setLang = (l: Lang) => {
    setLangState(l);
    localStorage.setItem("lm-lang", l);
  };

  useEffect(() => {
    document.documentElement.lang = lang.toLowerCase();
    document.documentElement.dir = lang === "AR" ? "rtl" : "ltr";
  }, [lang]);

  const t = (key: string) => translations[lang][key] ?? translations.FR[key] ?? key;
  const dir = lang === "AR" ? "rtl" : "ltr";

  return <I18nContext.Provider value={{ lang, setLang, t, dir }}>{children}</I18nContext.Provider>;
};

export const useI18n = () => {
  const ctx = useContext(I18nContext);
  if (!ctx) throw new Error("useI18n must be used inside I18nProvider");
  return ctx;
};
