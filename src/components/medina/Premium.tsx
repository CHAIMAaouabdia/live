import { useState } from "react";
import { Check, Crown } from "lucide-react";
import { Button } from "@/components/ui/button";
import { BookingDialog, BookingItem } from "./BookingDialog";
import { useI18n } from "@/contexts/I18nContext";
import luxury from "@/assets/luxury-riad.jpg";

export const Premium = () => {
  const { t, locale } = useI18n();
  const [item, setItem] = useState<BookingItem | null>(null);
  const [open, setOpen] = useState(false);

  const tiers = [
    {
      id: "standard",
      name: "Standard",
      price: 25000,
      desc: t("premium.standard.desc"),
      features: [
        t("twin.stay.eyebrow"),
        t("library.eyebrow"),
        "2 " + t("nav.experiences").toLowerCase(),
        t("nav.home"),
      ],
    },
    {
      id: "premium",
      name: "Premium",
      price: 65000,
      desc: t("premium.premium.desc"),
      featured: true,
      features: [
        t("twin.stay.title"),
        t("nav.experiences"),
        "Emotional Map +",
        t("twin.exp.title"),
      ],
    },
    {
      id: "luxe",
      name: "Luxe",
      price: 150000,
      desc: t("premium.luxe.desc"),
      features: [
        t("twin.stay.title"),
        "Concierge 24/7",
        t("nav.experiences"),
        t("twin.exp.title"),
      ],
    },
  ];

  const choose = (tier: (typeof tiers)[number]) => {
    setItem({
      id: tier.id,
      title: `Parcours ${tier.name}`,
      subtitle: tier.desc,
      image: luxury,
      price: tier.price,
      unit: t("exp.unit"),
    });
    setOpen(true);
  };

  return (
    <section className="py-24 md:py-32 bg-gradient-warm relative overflow-hidden">
      <div
        className="absolute inset-0 opacity-10"
        style={{
          backgroundImage:
            "url(\"data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cpath d='M30 0L40 20L60 30L40 40L30 60L20 40L0 30L20 20Z' fill='none' stroke='%23f5e6c8' stroke-width='0.5'/%3E%3C/svg%3E\")",
        }}
      />
      <div className="container mx-auto px-6 lg:px-10 relative">
        <div className="text-center mb-14 max-w-3xl mx-auto">
          <Crown className="w-10 h-10 text-sand-50 mx-auto mb-4" strokeWidth={1.4} />
          <p className="eyebrow text-sand-100 mb-3">{t("premium.eyebrow")}</p>
          <h2 className="font-serif text-4xl md:text-5xl lg:text-6xl text-sand-50 leading-tight mb-4">
            {t("premium.title")}
          </h2>
          <p className="text-sand-100/80 leading-relaxed">{t("premium.subtitle")}</p>
        </div>

        <div className="grid md:grid-cols-3 gap-6">
          {tiers.map((tier) => (
            <div
              key={tier.id}
              className={`p-8 md:p-10 flex flex-col ${
                tier.featured
                  ? "bg-sand-50 border-2 border-sand-100 -mt-4 shadow-elegant"
                  : "bg-sand-50/95 border border-sand-200"
              }`}
            >
              <p className="eyebrow mb-2">{tier.name}</p>
              <p className="font-serif text-base text-muted-foreground mb-5">{tier.desc}</p>
              <div className="flex items-baseline gap-1 mb-6 pb-6 border-b border-border-soft">
                <span className="font-serif text-4xl text-ink">{tier.price.toLocaleString(locale)}</span>
                <span className="text-sm text-muted-foreground"> {t("premium.unit")}</span>
              </div>
              <ul className="space-y-3 mb-8 flex-1">
                {tier.features.map((f) => (
                  <li key={f} className="flex items-start gap-3 text-sm text-ink">
                    <Check className="w-4 h-4 text-brown mt-0.5 shrink-0" strokeWidth={2} />
                    <span>{f}</span>
                  </li>
                ))}
              </ul>
              <Button
                variant={tier.featured ? "cirta" : "cirtaOutline"}
                size="lg"
                className="w-full"
                onClick={() => choose(tier)}
              >
                {t("premium.choose")} {tier.name}
              </Button>
            </div>
          ))}
        </div>
      </div>
      <BookingDialog open={open} onOpenChange={setOpen} item={item} />
    </section>
  );
};
