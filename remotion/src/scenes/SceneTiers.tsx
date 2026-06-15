import React from "react";
import { AbsoluteFill, useCurrentFrame, useVideoConfig, interpolate, spring, staticFile, Img } from "remotion";
import { serif, sans, palette } from "../theme";

const tiers = [
  { name: "Standard", price: "Gratuit", feats: ["Contenus libres", "Bibliothèque", "Découverte Express"], color: palette.cream, txt: palette.deep },
  { name: "Premium", price: "8 900 DZD", feats: ["Guide personnel", "Carte émotionnelle", "Gamification", "Parcours complets"], color: palette.brown, txt: palette.ivory, featured: true },
  { name: "LUXE", price: "29 900 DZD", feats: ["Quiz psychique", "Analyse IA personnalité", "Expériences sur-mesure", "Conciergerie"], color: palette.deep, txt: palette.sand },
];

export const SceneTiers: React.FC = () => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();
  const headIn = spring({ frame, fps, config: { damping: 20 } });

  return (
    <AbsoluteFill style={{ background: `linear-gradient(180deg, ${palette.cream} 0%, ${palette.ivory} 100%)`, padding: 90 }}>
      <div style={{ fontFamily: sans, color: palette.accent, letterSpacing: 6, fontSize: 18, fontWeight: 600, opacity: headIn }}>
        TROIS FORMULES
      </div>
      <div style={{
        fontFamily: serif, fontSize: 100, color: palette.deep, fontWeight: 600, lineHeight: 1, marginTop: 10,
        opacity: headIn,
      }}>
        Du libre au <span style={{ fontStyle: "italic", color: palette.accent }}>sur-mesure IA</span>
      </div>

      <div style={{ display: "flex", gap: 32, marginTop: 70, flex: 1, alignItems: "stretch" }}>
        {tiers.map((t, i) => {
          const delay = 18 + i * 12;
          const s = spring({ frame: frame - delay, fps, config: { damping: 18 } });
          const lift = t.featured ? -30 : 0;
          return (
            <div key={t.name} style={{
              flex: t.featured ? 1.15 : 1, borderRadius: 18, padding: 40,
              background: t.color, color: t.txt,
              transform: `translateY(${(1 - s) * 100 + lift}px) scale(${0.94 + s * 0.06})`,
              opacity: s,
              boxShadow: t.featured ? `0 40px 80px rgba(46,27,14,0.4)` : "0 20px 40px rgba(46,27,14,0.15)",
              border: t.featured ? `2px solid ${palette.sand}` : `1px solid rgba(0,0,0,0.05)`,
              display: "flex", flexDirection: "column",
            }}>
              {t.featured && (
                <div style={{ alignSelf: "flex-start", background: palette.sand, color: palette.deep, padding: "4px 12px", borderRadius: 999, fontFamily: sans, fontSize: 12, letterSpacing: 2, fontWeight: 700, marginBottom: 18 }}>
                  RECOMMANDÉ
                </div>
              )}
              <div style={{ fontFamily: serif, fontSize: 54, fontWeight: 600 }}>{t.name}</div>
              <div style={{ fontFamily: sans, fontSize: 40, marginTop: 8, fontWeight: 300 }}>{t.price}</div>
              <div style={{ height: 1, background: "currentColor", opacity: 0.2, margin: "24px 0" }} />
              {t.feats.map((f, j) => {
                const fd = delay + 10 + j * 4;
                const fo = interpolate(frame, [fd, fd + 8], [0, 1], { extrapolateRight: "clamp" });
                return (
                  <div key={f} style={{ opacity: fo, fontFamily: sans, fontSize: 22, marginTop: 10, display: "flex", alignItems: "center", gap: 12 }}>
                    <div style={{ width: 8, height: 8, borderRadius: "50%", background: "currentColor" }} />
                    {f}
                  </div>
                );
              })}
            </div>
          );
        })}
      </div>
    </AbsoluteFill>
  );
};
