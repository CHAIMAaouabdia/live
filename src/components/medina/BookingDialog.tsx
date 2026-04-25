import { useState } from "react";
import { Link } from "react-router-dom";
import { Calendar, Users, CreditCard, Lock, CheckCircle2, ShieldCheck, Info, KeyRound } from "lucide-react";
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
import { useI18n } from "@/contexts/I18nContext";
import { useAuth } from "@/contexts/AuthContext";

export interface BookingItem {
  id: string;
  title: string;
  subtitle?: string;
  image: string;
  price: number;
  unit: string;
}

interface Props {
  open: boolean;
  onOpenChange: (v: boolean) => void;
  item: BookingItem | null;
}

type Step = "details" | "payment" | "success";
type PayMethod = "card" | "cib" | "edahabia";

export const BookingDialog = ({ open, onOpenChange, item }: Props) => {
  const { t, locale } = useI18n();
  const { user, addBooking } = useAuth();
  const [step, setStep] = useState<Step>("details");
  const [people, setPeople] = useState(2);
  const [nights, setNights] = useState(2);
  const [date, setDate] = useState(() => new Date(Date.now() + 7 * 86400000).toISOString().slice(0, 10));
  const [method, setMethod] = useState<PayMethod>("card");

  // Card (international)
  const [card, setCard] = useState({ number: "", name: "", exp: "", cvc: "" });
  // CIB
  const [cib, setCib] = useState({ number: "", name: "", exp: "" });
  // Edahabia
  const [eda, setEda] = useState({ number: "", name: "", pin: "" });

  const [processing, setProcessing] = useState(false);
  const [ref, setRef] = useState("");

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

  const finalize = (chosenMethod: PayMethod | "free") => {
    const newRef = `LM-${Math.floor(Math.random() * 90000 + 10000)}`;
    setRef(newRef);
    addBooking({
      ref: newRef,
      itemId: item.id,
      itemTitle: item.title,
      itemSubtitle: item.subtitle,
      itemImage: item.image,
      date,
      qty: unitMultiplier,
      unit: item.unit,
      total,
      method: chosenMethod,
      status: "confirmed",
    });
    setStep("success");
    toast({
      title: t("booking.toast.confirmed"),
      description: `${item.title} — ${isFree ? "—" : `${total.toLocaleString(locale)} DA`}`,
    });
  };

  const handlePay = (e: React.FormEvent) => {
    e.preventDefault();
    setProcessing(true);
    setTimeout(() => {
      setProcessing(false);
      finalize(method);
    }, 1400);
  };

  return (
    <Dialog open={open} onOpenChange={handleClose}>
      <DialogContent className="max-w-2xl bg-card border border-border rounded-none p-0 overflow-hidden max-h-[90vh] overflow-y-auto">
        <div className="relative h-40 overflow-hidden">
          <img src={item.image} alt={item.title} className="w-full h-full object-cover image-warm" />
          <div className="absolute inset-0 bg-gradient-to-t from-brown-dark/80 to-transparent" />
          <div className="absolute bottom-4 left-6 right-6">
            <p className="eyebrow text-sand-100 mb-1">
              {step === "details" && t("booking.title.details")}
              {step === "payment" && t("booking.title.payment")}
              {step === "success" && t("booking.title.success")}
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
          {/* STEP 1 — Details */}
          {step === "details" && (
            <div className="space-y-5">
              {!user && (
                <div className="border border-border-soft bg-sand-50 px-4 py-3 text-xs font-serif text-ink flex items-start gap-2">
                  <Info className="w-3.5 h-3.5 text-brown shrink-0 mt-0.5" />
                  <span>
                    {t("booking.guest.notice")}{" "}
                    <Link to="/auth" className="underline text-brown-dark">
                      {t("auth.signin.cta")}
                    </Link>
                  </span>
                </div>
              )}

              <div className="grid sm:grid-cols-2 gap-4">
                <Field label={t("booking.field.checkin")} icon={Calendar}>
                  <Input
                    type="date"
                    value={date}
                    onChange={(e) => setDate(e.target.value)}
                    className="rounded-none border-border-soft bg-transparent"
                  />
                </Field>
                {item.unit.includes("nuit") ? (
                  <Field label={t("booking.field.nights")} icon={Calendar}>
                    <Counter value={nights} onChange={setNights} min={1} max={30} />
                  </Field>
                ) : (
                  <Field label={t("booking.field.travelers")} icon={Users}>
                    <Counter value={people} onChange={setPeople} min={1} max={20} />
                  </Field>
                )}
              </div>

              {item.unit.includes("nuit") && (
                <Field label={t("booking.field.travelers")} icon={Users}>
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
                t={t}
                locale={locale}
              />

              <Button
                variant="cirta"
                size="lg"
                className="w-full"
                onClick={() => (isFree ? finalize("free") : setStep("payment"))}
              >
                {isFree ? t("booking.cta.confirmFree") : t("booking.cta.proceed")}
              </Button>
              <p className="text-[11px] text-muted-foreground text-center flex items-center justify-center gap-1.5">
                <ShieldCheck className="w-3 h-3" /> {t("booking.secure")}
              </p>
            </div>
          )}

          {/* STEP 2 — Payment */}
          {step === "payment" && (
            <form onSubmit={handlePay} className="space-y-5">
              <div>
                <p className="eyebrow mb-3">{t("booking.method.title")}</p>
                <div className="grid grid-cols-3 gap-2">
                  {(["card", "cib", "edahabia"] as PayMethod[]).map((m) => (
                    <button
                      key={m}
                      type="button"
                      onClick={() => setMethod(m)}
                      className={`p-3 border text-left transition-all ${
                        method === m
                          ? "bg-primary text-primary-foreground border-brown-dark"
                          : "border-border-soft text-brown hover:bg-secondary"
                      }`}
                    >
                      <p className="text-xs font-display uppercase tracking-widest">{t(`booking.method.${m}`)}</p>
                      <p className={`text-[10px] mt-0.5 ${method === m ? "text-sand-100/80" : "text-muted-foreground"}`}>
                        {t(`booking.method.${m}.desc`)}
                      </p>
                    </button>
                  ))}
                </div>
              </div>

              {/* Adapted fields per method */}
              {method === "card" && (
                <div className="space-y-3">
                  <Field label={t("booking.card.number")} icon={CreditCard}>
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
                  <Field label={t("booking.card.holder")}>
                    <Input
                      required
                      placeholder="Amina Boumediene"
                      value={card.name}
                      onChange={(e) => setCard({ ...card, name: e.target.value })}
                      className="rounded-none border-border-soft bg-transparent"
                    />
                  </Field>
                  <div className="grid grid-cols-2 gap-3">
                    <Field label={t("booking.card.exp")}>
                      <Input
                        required
                        placeholder="MM/AA"
                        value={card.exp}
                        onChange={(e) => setCard({ ...card, exp: e.target.value.slice(0, 5) })}
                        className="rounded-none border-border-soft bg-transparent"
                      />
                    </Field>
                    <Field label={t("booking.card.cvc")}>
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
              )}

              {method === "cib" && (
                <div className="space-y-3">
                  <div className="border border-border-soft bg-sand-50/60 px-3 py-2 text-[11px] font-serif text-ink flex items-start gap-2">
                    <Info className="w-3 h-3 text-brown shrink-0 mt-0.5" />
                    <span>{t("booking.method.cib.desc")}</span>
                  </div>
                  <Field label={t("booking.cib.number")} icon={CreditCard}>
                    <Input
                      required
                      inputMode="numeric"
                      placeholder="6280 0000 0000 0000"
                      value={cib.number}
                      onChange={(e) =>
                        setCib({ ...cib, number: e.target.value.replace(/[^\d ]/g, "").slice(0, 19) })
                      }
                      className="rounded-none border-border-soft bg-transparent font-serif tracking-widest"
                    />
                  </Field>
                  <Field label={t("booking.cib.holder")}>
                    <Input
                      required
                      placeholder="BOUMEDIENE AMINA"
                      value={cib.name}
                      onChange={(e) => setCib({ ...cib, name: e.target.value.toUpperCase() })}
                      className="rounded-none border-border-soft bg-transparent uppercase"
                    />
                  </Field>
                  <Field label={t("booking.cib.exp")}>
                    <Input
                      required
                      placeholder="MM/AA"
                      value={cib.exp}
                      onChange={(e) => setCib({ ...cib, exp: e.target.value.slice(0, 5) })}
                      className="rounded-none border-border-soft bg-transparent"
                    />
                  </Field>
                </div>
              )}

              {method === "edahabia" && (
                <div className="space-y-3">
                  <div className="border border-border-soft bg-sand-50/60 px-3 py-2 text-[11px] font-serif text-ink flex items-start gap-2">
                    <Info className="w-3 h-3 text-brown shrink-0 mt-0.5" />
                    <span>{t("booking.method.edahabia.desc")}</span>
                  </div>
                  <Field label={t("booking.eda.number")} icon={CreditCard}>
                    <Input
                      required
                      inputMode="numeric"
                      placeholder="6019 8100 0000 0000"
                      value={eda.number}
                      onChange={(e) =>
                        setEda({ ...eda, number: e.target.value.replace(/[^\d ]/g, "").slice(0, 19) })
                      }
                      className="rounded-none border-border-soft bg-transparent font-serif tracking-widest"
                    />
                  </Field>
                  <Field label={t("booking.eda.holder")}>
                    <Input
                      required
                      placeholder="BOUMEDIENE AMINA"
                      value={eda.name}
                      onChange={(e) => setEda({ ...eda, name: e.target.value.toUpperCase() })}
                      className="rounded-none border-border-soft bg-transparent uppercase"
                    />
                  </Field>
                  <Field label={t("booking.eda.pin")} icon={KeyRound}>
                    <Input
                      required
                      type="password"
                      inputMode="numeric"
                      placeholder="••••"
                      value={eda.pin}
                      onChange={(e) => setEda({ ...eda, pin: e.target.value.replace(/\D/g, "").slice(0, 4) })}
                      className="rounded-none border-border-soft bg-transparent font-serif tracking-[0.5em] text-center"
                    />
                  </Field>
                </div>
              )}

              <div className="bg-sand-50 border border-border-soft p-4 flex items-center justify-between">
                <span className="font-display text-xs uppercase tracking-widest text-brown">
                  {t("booking.summary.totalToPay")}
                </span>
                <span className="font-serif text-2xl text-ink">
                  {total.toLocaleString(locale)} <span className="text-sm">DA</span>
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
                  {t("common.back")}
                </Button>
                <Button type="submit" variant="cirta" size="lg" className="flex-1" disabled={processing}>
                  {processing ? (
                    t("booking.cta.processing")
                  ) : (
                    <>
                      <Lock className="w-4 h-4 mr-2" /> {t("booking.cta.pay")} {total.toLocaleString(locale)} DA
                    </>
                  )}
                </Button>
              </div>
              <p className="text-[11px] text-muted-foreground text-center flex items-center justify-center gap-1.5">
                <Lock className="w-3 h-3" /> {t("booking.ssl")}
              </p>
            </form>
          )}

          {/* STEP 3 — Confirmation */}
          {step === "success" && (
            <div className="text-center py-6 space-y-4">
              <div className="w-16 h-16 mx-auto rounded-full bg-sand-50 border border-border flex items-center justify-center">
                <CheckCircle2 className="w-8 h-8 text-brown" />
              </div>
              <h3 className="font-serif text-2xl text-ink">{t("booking.success.title")}</h3>
              <p className="text-muted-foreground text-sm max-w-sm mx-auto">
                {t("booking.success.sub")}{" "}
                <span className="font-display tracking-widest text-brown">{ref}</span>
              </p>
              <div className="bg-sand-50 border border-border-soft p-4 text-left text-sm">
                <Row label={t("booking.row.offer")} value={item.title} />
                <Row label={t("booking.row.date")} value={new Date(date).toLocaleDateString(locale)} />
                <Row
                  label={item.unit.includes("nuit") ? t("booking.field.nights") : t("booking.field.travelers")}
                  value={String(unitMultiplier)}
                />
                <Row
                  label={t("booking.summary.total")}
                  value={isFree ? "—" : `${total.toLocaleString(locale)} DA`}
                  bold
                />
              </div>
              {user ? (
                <Button variant="cirta" size="lg" className="w-full" asChild>
                  <Link to="/dashboard" onClick={() => handleClose(false)}>
                    {t("booking.success.viewHistory")}
                  </Link>
                </Button>
              ) : (
                <Button variant="cirta" size="lg" className="w-full" onClick={() => handleClose(false)}>
                  {t("booking.success.finish")}
                </Button>
              )}
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
      aria-label="-"
    >
      −
    </button>
    <span className="font-serif text-base text-ink">{value}</span>
    <button
      type="button"
      onClick={() => onChange(Math.min(max, value + 1))}
      className="w-6 h-6 text-brown text-lg leading-none hover:text-ink"
      aria-label="+"
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
  t,
  locale,
}: {
  isFree: boolean;
  price: number;
  unit: string;
  qty: number;
  subtotal: number;
  fees: number;
  total: number;
  t: (k: string) => string;
  locale: string;
}) => (
  <div className="border border-border-soft bg-sand-50/60 p-4 space-y-1.5 text-sm">
    {isFree ? (
      <p className="text-ink font-serif">{t("booking.summary.free")}</p>
    ) : (
      <>
        <Row label={`${price.toLocaleString(locale)} DA × ${qty} ${unit}`} value={`${subtotal.toLocaleString(locale)} DA`} />
        <Row label={t("booking.summary.fees")} value={`${fees.toLocaleString(locale)} DA`} />
        <div className="border-t border-border-soft my-2" />
        <Row label={t("booking.summary.total")} value={`${total.toLocaleString(locale)} DA`} bold />
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
