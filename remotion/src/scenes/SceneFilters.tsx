import React from "react";
import { AbsoluteFill, useCurrentFrame, useVideoConfig, interpolate, spring, staticFile, Img } from "remotion";
import { serif, sans, palette } from "../theme";

const hebFilters = ["Tous", "Riad", "Maison d'hôtes", "< 8000 DZD", "Vue médina"];
const expFilters = ["Tous", "Simples", "Solidaires", "Parcours", "Artisanat", "Gastronomie"];

const cards = [
  { img: "images/acc-dar-cirta.jpg", title: "Dar Cirta", tag: "Riad · 7 500 DZD" },
  { img: "images/luxury-riad.jpg", title: "Riad El Bey", tag: "Luxe · 14 900 DZD" },
  { img: "images/exp-souika.jpg", title: "Souika au crépuscule", tag: "Solidaire · 2 h" },
  { img: "images/exp-eau-rose.jpg", title: "Distillation eau de rose", tag: "Artisanat · 3 h" },
];

export const SceneFilters: React.FC = () => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();
  const headIn = spring({ frame, fps, config: { damping: 20 } });
  const activeH = Math.min(hebFilters.length - 1, Math.floor(frame / 20));
  const activeE = Math.min(expFilters.length - 1, Math.floor(frame / 18));

  const Block = ({ title, sub, filters, active, items, delay }: any) => (
    <div style={{ flex: 1, background: "white", borderRadius: 18, padding: 32, boxShadow: "0 20px 50px rgba(46,27,14,0.12)", border: `1px solid ${palette.cream}`, display: "flex", flexDirection: "column" }}>
      <div style={{ fontFamily: sans, color: palette.accent, fontSize: 12, letterSpacing: 3, fontWeight: 700 }}>{sub}</div>
      <div style={{ fontFamily: serif, fontSize: 40, color: palette.deep, fontWeight: 600 }}>{title}</div>
      <div style={{ display: "flex", flexWrap: "wrap", gap: 8, marginTop: 18 }}>
        {filters.map((f: string, i: number) => {
          const a = i === active;
          const s = spring({ frame: frame - (delay + i * 3), fps, config: { damping: 18 } });
          return (
            <div key={f} style={{
              padding: "8px 16px", borderRadius: 999,
              background: a ? palette.deep : palette.cream,
              color: a ? palette.ivory : palette.brown,
              fontFamily: sans, fontSize: 14, fontWeight: 600,
              opacity: s, transform: `translateY(${(1 - s) * 10}px)`,
              border: a ? `1px solid ${palette.sand}` : "1px solid transparent",
            }}>{f}</div>
          );
        })}
      </div>
      <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 14, marginTop: 22, flex: 1 }}>
        {items.map((it: any, i: number) => {
          const s = spring({ frame: frame - (delay + 20 + i * 6), fps, config: { damping: 18 } });
          return (
            <div key={i} style={{ borderRadius: 12, overflow: "hidden", background: palette.ivory, opacity: s, transform: `translateY(${(1 - s) * 30}px)` }}>
              <div style={{ height: 130, overflow: "hidden" }}>
                <Img src={staticFile(it.img)} style={{ width: "100%", height: "100%", objectFit: "cover" }} />
              </div>
              <div style={{ padding: 12 }}>
                <div style={{ fontFamily: serif, fontSize: 18, color: palette.deep, fontWeight: 600 }}>{it.title}</div>
                <div style={{ fontFamily: sans, fontSize: 12, color: palette.brown, marginTop: 2 }}>{it.tag}</div>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );

  return (
    <AbsoluteFill style={{ background: palette.ivory, padding: 90 }}>
      <div style={{ fontFamily: sans, color: palette.accent, letterSpacing: 6, fontSize: 18, fontWeight: 600, opacity: headIn }}>
        RECHERCHE INTELLIGENTE · FILTRES DYNAMIQUES
      </div>
      <div style={{ fontFamily: serif, fontSize: 90, color: palette.deep, fontWeight: 600, lineHeight: 1, marginTop: 10, opacity: headIn }}>
        Trouvez en <span style={{ fontStyle: "italic", color: palette.accent }}>un clic.</span>
      </div>
      <div style={{ display: "flex", gap: 32, marginTop: 50, flex: 1 }}>
        <Block title="Hébergement" sub="FILTRES · TYPE · PRIX · QUARTIER" filters={hebFilters} active={activeH} items={cards.slice(0, 2)} delay={16} />
        <Block title="Expériences" sub="FILTRES · CATÉGORIE · DURÉE" filters={expFilters} active={activeE} items={cards.slice(2)} delay={28} />
      </div>
    </AbsoluteFill>
  );
};
