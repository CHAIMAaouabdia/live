import { useState } from "react";
import { Calendar, Users, CreditCard, Lock, CheckCircle2, ShieldCheck } from "lucide-react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { toast } from "@/hooks/use-toast";

export interface BookingItem {
  id: string;
  title: string;
  subtitle?: string;
  image: string;
  price: number; // 0 = don libre
  unit: string; // "par nuit" | "par personne" | ...
}

interface Props {
  open: boolean;
  onOpenChange: (v: boolean) => void;
  item: BookingItem | null;
}

type Step = "details" | "payment" | "success";
type PayMethod = "card" | "cib" | "edahabia";

export const BookingDialog = ({ open, onOpenChange, item }: Props) => {
  const [step, setStep] = useState<Step>("details");
  const [people, setPeople] = useState(2);
  const [nights, setNights] = useState(2);
  const [date, setDate] = useState("2026-05-12");
  const [method, setMethod] = useState<PayMethod>("card");
  const [card, setCard] = useState({ number: "", name: "", exp: "", cvc: "" });
  const [processing, setProcessing] = useState(false);

  if (!item) return null;
  const isFree = item.price === 0;
  const unitMultiplier = item.unit.includes("nuit") ? nights : people;
  const subtotal = isFree ? 0 : item.price * unitMultiplier;
  const fees = isFree ? 0 : Math.round(subtotal * 0.05);
  const total = subtotal + fees;

  const reset = () => {
    setStep("details");
    setProcessing(false);
  };

  const handleClose = (v: boolean) => {
    if (!v) setTimeout(reset, 300);
    onOpenChange(v);
  };

  const handlePay = (e: React.FormEvent) => {
    e.preventDefault();
    setProcessing(true);
    setTimeout(() => {
      setProcessing(false);
      setStep("success");
      toast({
        title: "Réservation confirmée",
        description: `${item.title} — ${total.toLocaleString("fr-FR")} DA`,
      });
    }, 1600);
  };

  return (
    <Dialog open={open} onOpenChange={handleClose}>
      <DialogContent className="max-w-2xl bg-card border border-border rounded-none p-0 overflow-hidden max-h-[90vh] overflow-y-auto">
        {/* Header */}
        <div className="relative h-40 overflow-hidden">
          <img src={item.image} alt={item.title} className="w-full h-full object-cover image-warm" />
          <div className="absolute inset-0 bg-gradient-to-t from-brown-dark/80 to-transparent" />
          <div className="absolute bottom-4 left-6 right-6">
            <p className="eyebrow text-sand-100 mb-1">
              {step === "details" && "Réservation"}
              {step === "payment" && "Paiement sécurisé"}
              {step === "success" && "Confirmation"}
            </p>
            <DialogHeader>
              <DialogTitle className="font-serif text-2xl text-sand-50 leading-tight">
                {item.title}
              </DialogTitle>
              {item.subtitle && (
                <DialogDescription className="text-sand-100/80 text-sm">
                  {item.subtitle}
                </DialogDescription>
              )}
            </DialogHeader>
          </div>
        </div>

        <div className="p-6 md:p-8">
          {/* STEP 1 — Détails */}
          {step === "details" && (
            <div className="space-y-5">
              <div className="grid sm:grid-cols-2 gap-4">
                <Field label="Date d'arrivée" icon={Calendar}>
                  <Input
                    type="date"
                    value={date}
                    onChange={(e) => setDate(e.target.value)}
                    className="rounded-none border-border-soft bg-transparent"
                  />
                </Field>
                {item.unit.includes("nuit") ? (
                  <Field label="Nuits" icon={Calendar}>
                    <Counter value={nights} onChange={setNights} min={1} max={30} />
                  </Field>
                ) : (
                  <Field label="Voyageurs" icon={Users}>
                    <Counter value={people} onChange={setPeople} min={1} max={20} />
                  </Field>
                )}
              </div>

              {item.unit.includes("nuit") && (
                <Field label="Voyageurs" icon={Users}>
                  <Counter value={people} onChange={setPeople} min={1} max={12} />
                </Field>
              )}

              <Summary
                isFree={isFree}
                price={item.price}
                unit={item.unit}
                qty={unitMultiplier}
                subtotal={subtotal}
                fees={fees}
                total={total}
              />

              <Button
                variant="cirta"
                size="lg"
                className="w-full"
                onClick={() => setStep(isFree ? "success" : "payment")}
              >
                {isFree ? "Confirmer ma participation" : "Procéder au paiement"}
              </Button>
              <p className="text-[11px] text-muted-foreground text-center flex items-center justify-center gap-1.5">
                <ShieldCheck className="w-3 h-3" /> Annulation gratuite jusqu'à 48h avant.
              </p>
            </div>
          )}

          {/* STEP 2 — Paiement */}
          {step === "payment" && (
            <form onSubmit={handlePay} className="space-y-5">
              <div>
                <p className="eyebrow mb-3">Mode de paiement</p>
                <div className="grid grid-cols-3 gap-2">
                  {(
                    [
                      { id: "card", label: "Carte" },
                      { id: "cib", label: "CIB" },
                      { id: "edahabia", label: "Edahabia" },
                    ] as { id: PayMethod; label: string }[]
                  ).map((m) => (
                    <button
                      key={m.id}
                      type="button"
                      onClick={() => setMethod(m.id)}
                      className={`p-3 border text-xs font-display uppercase tracking-widest transition-all ${
                        method === m.id
                          ? "bg-primary text-primary-foreground border-brown-dark"
                          : "border-border-soft text-brown hover:bg-secondary"
                      }`}
                    >
                      {m.label}
                    </button>
                  ))}
                </div>
              </div>

              <div className="space-y-3">
                <Field label="Numéro de carte" icon={CreditCard}>
                  <Input
                    required
                    inputMode="numeric"
                    placeholder="1234 5678 9012 3456"
                    value={card.number}
                    onChange={(e) =>
                      setCard({ ...card, number: e.target.value.replace(/[^\d ]/g, "").slice(0, 19) })
                    }
                    className="rounded-none border-border-soft bg-transparent font-serif tracking-widest"
                  />
                </Field>
                <Field label="Titulaire">
                  <Input
                    required
                    placeholder="Nom Prénom"
                    value={card.name}
                    onChange={(e) => setCard({ ...card, name: e.target.value })}
                    className="rounded-none border-border-soft bg-transparent"
                  />
                </Field>
                <div className="grid grid-cols-2 gap-3">
                  <Field label="Expiration">
                    <Input
                      required
                      placeholder="MM/AA"
                      value={card.exp}
                      onChange={(e) => setCard({ ...card, exp: e.target.value.slice(0, 5) })}
                      className="rounded-none border-border-soft bg-transparent"
                    />
                  </Field>
                  <Field label="CVC">
                    <Input
                      required
                      inputMode="numeric"
                      placeholder="123"
                      value={card.cvc}
                      onChange={(e) =>
                        setCard({ ...card, cvc: e.target.value.replace(/\D/g, "").slice(0, 4) })
                      }
                      className="rounded-none border-border-soft bg-transparent"
                    />
                  </Field>
                </div>
              </div>

              <div className="bg-sand-50 border border-border-soft p-4 flex items-center justify-between">
                <span className="font-display text-xs uppercase tracking-widest text-brown">
                  Total à payer
                </span>
                <span className="font-serif text-2xl text-ink">
                  {total.toLocaleString("fr-FR")} <span className="text-sm">DA</span>
                </span>
              </div>

              <div className="flex gap-3">
                <Button
                  type="button"
                  variant="cirtaOutline"
                  size="lg"
                  className="flex-1"
                  onClick={() => setStep("details")}
                  disabled={processing}
                >
                  Retour
                </Button>
                <Button type="submit" variant="cirta" size="lg" className="flex-1" disabled={processing}>
                  {processing ? "Traitement…" : (
                    <>
                      <Lock className="w-4 h-4 mr-2" /> Payer {total.toLocaleString("fr-FR")} DA
                    </>
                  )}
                </Button>
              </div>
              <p className="text-[11px] text-muted-foreground text-center flex items-center justify-center gap-1.5">
                <Lock className="w-3 h-3" /> Paiement chiffré SSL — vos données ne sont pas stockées.
              </p>
            </form>
          )}

          {/* STEP 3 — Confirmation */}
          {step === "success" && (
            <div className="text-center py-6 space-y-4">
              <div className="w-16 h-16 mx-auto rounded-full bg-sand-50 border border-border flex items-center justify-center">
                <CheckCircle2 className="w-8 h-8 text-brown" />
              </div>
              <h3 className="font-serif text-2xl text-ink">Réservation confirmée</h3>
              <p className="text-muted-foreground text-sm max-w-sm mx-auto">
                Un e-mail récapitulatif vous a été envoyé. Référence&nbsp;:&nbsp;
                <span className="font-display tracking-widest text-brown">
                  LM-{Math.floor(Math.random() * 90000 + 10000)}
                </span>
              </p>
              <div className="bg-sand-50 border border-border-soft p-4 text-left text-sm">
                <Row label="Offre" value={item.title} />
                <Row label="Date" value={new Date(date).toLocaleDateString("fr-FR")} />
                <Row
                  label={item.unit.includes("nuit") ? "Nuits" : "Voyageurs"}
                  value={String(unitMultiplier)}
                />
                <Row
                  label="Total"
                  value={isFree ? "Don libre" : `${total.toLocaleString("fr-FR")} DA`}
                  bold
                />
              </div>
              <Button variant="cirta" size="lg" className="w-full" onClick={() => handleClose(false)}>
                Terminer
              </Button>
            </div>
          )}
        </div>
      </DialogContent>
    </Dialog>
  );
};

const Field = ({
  label,
  icon: Icon,
  children,
}: {
  label: string;
  icon?: React.ComponentType<{ className?: string }>;
  children: React.ReactNode;
}) => (
  <div>
    <div className="flex items-center gap-2 mb-1.5">
      {Icon && <Icon className="w-3.5 h-3.5 text-brown" />}
      <span className="eyebrow text-[10px]">{label}</span>
    </div>
    {children}
  </div>
);

const Counter = ({
  value,
  onChange,
  min,
  max,
}: {
  value: number;
  onChange: (v: number) => void;
  min: number;
  max: number;
}) => (
  <div className="flex items-center justify-between border border-border-soft px-3 py-2 bg-transparent">
    <button
      type="button"
      onClick={() => onChange(Math.max(min, value - 1))}
      className="w-6 h-6 text-brown text-lg leading-none hover:text-ink"
      aria-label="Diminuer"
    >
      −
    </button>
    <span className="font-serif text-base text-ink">{value}</span>
    <button
      type="button"
      onClick={() => onChange(Math.min(max, value + 1))}
      className="w-6 h-6 text-brown text-lg leading-none hover:text-ink"
      aria-label="Augmenter"
    >
      +
    </button>
  </div>
);

const Summary = ({
  isFree,
  price,
  unit,
  qty,
  subtotal,
  fees,
  total,
}: {
  isFree: boolean;
  price: number;
  unit: string;
  qty: number;
  subtotal: number;
  fees: number;
  total: number;
}) => (
  <div className="border border-border-soft bg-sand-50/60 p-4 space-y-1.5 text-sm">
    {isFree ? (
      <p className="text-ink font-serif">
        Cette expérience fonctionne au <strong>don libre</strong>. Aucun paiement n'est requis pour réserver.
      </p>
    ) : (
      <>
        <Row
          label={`${price.toLocaleString("fr-FR")} DA × ${qty} ${unit}`}
          value={`${subtotal.toLocaleString("fr-FR")} DA`}
        />
        <Row label="Frais de service (5%)" value={`${fees.toLocaleString("fr-FR")} DA`} />
        <div className="border-t border-border-soft my-2" />
        <Row label="Total" value={`${total.toLocaleString("fr-FR")} DA`} bold />
      </>
    )}
  </div>
);

const Row = ({ label, value, bold }: { label: string; value: string; bold?: boolean }) => (
  <div className="flex items-center justify-between py-1">
    <span className="text-muted-foreground">{label}</span>
    <span className={`text-ink ${bold ? "font-serif text-lg" : ""}`}>{value}</span>
  </div>
);
