import React from "react";
import { AbsoluteFill, useCurrentFrame, useVideoConfig, interpolate, spring } from "remotion";
import { serif, sans, palette } from "../theme";

const tree = [
  { lvl: 0, label: "Live Médina", sub: "Plateforme patrimoniale · Constantine" },
  { lvl: 1, label: "Accueil", sub: "Hero · Filtres · Aperçu bibliothèque" },
  { lvl: 1, label: "Hébergement", sub: "Riads · Maisons d'hôtes · Filtres (prix, type, quartier)" },
  { lvl: 1, label: "Expériences", sub: "Simples · Solidaires · Parcours · Filtres catégorie" },
  { lvl: 2, label: "Parcours", sub: "Découverte · Authentique · Saveurs" },
  { lvl: 1, label: "Bibliothèque", sub: "Articles trilingues FR · EN · AR" },
  { lvl: 1, label: "Comptes", sub: "Client · Guide · Propriétaire · Admin" },
  { lvl: 2, label: "Dashboards", sub: "Statistiques · Graphiques · Modération" },
  { lvl: 1, label: "Intelligence IA", sub: "Quiz · Personnalité · Recommandations sur-mesure" },
];

export const SceneHierarchy: React.FC = () => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();
  const headIn = spring({ frame, fps, config: { damping: 20 } });

  return (
    <AbsoluteFill style={{ background: `linear-gradient(180deg, ${palette.ivory} 0%, ${palette.cream} 100%)`, padding: 90 }}>
      <div style={{ fontFamily: sans, color: palette.accent, letterSpacing: 6, fontSize: 18, fontWeight: 600, opacity: headIn }}>
        ARCHITECTURE · CASCADE DES TITRES
      </div>
      <div style={{ fontFamily: serif, fontSize: 92, color: palette.deep, fontWeight: 600, lineHeight: 1, marginTop: 10, opacity: headIn }}>
        Toute la plateforme <span style={{ fontStyle: "italic", color: palette.accent }}>en un regard.</span>
      </div>

      <div style={{ marginTop: 50, flex: 1, display: "flex", flexDirection: "column", gap: 10 }}>
        {tree.map((n, i) => {
          const d = 14 + i * 6;
          const s = spring({ frame: frame - d, fps, config: { damping: 18 } });
          const indent = n.lvl * 80;
          const sizes = [42, 30, 24];
          const colors = [palette.deep, palette.brown, palette.accent];
          return (
            <div key={i} style={{
              display: "flex", alignItems: "center", gap: 18, marginLeft: indent,
              opacity: s, transform: `translateX(${(1 - s) * -40}px)`,
            }}>
              <div style={{ width: n.lvl === 0 ? 18 : 10, height: n.lvl === 0 ? 18 : 10, borderRadius: "50%", background: colors[n.lvl] }} />
              {n.lvl > 0 && <div style={{ width: 40, height: 2, background: palette.sand, opacity: 0.6 }} />}
              <div style={{ fontFamily: serif, fontSize: sizes[n.lvl], color: colors[n.lvl], fontWeight: n.lvl === 0 ? 700 : 600 }}>
                {n.label}
              </div>
              <div style={{ fontFamily: sans, fontSize: 16, color: palette.brown, opacity: 0.7, marginLeft: 8 }}>— {n.sub}</div>
            </div>
          );
        })}
      </div>
    </AbsoluteFill>
  );
};
