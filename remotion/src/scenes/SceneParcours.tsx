import React from "react";
import { AbsoluteFill, useCurrentFrame, useVideoConfig, interpolate, spring, staticFile, Img } from "remotion";
import { serif, sans, palette } from "../theme";

const parcours = [
  { n: 1, title: "Découverte Express", tier: "Gratuit", img: "images/parcours-decouverte.jpg", steps: ["Pont Sidi M'Cid", "Souika", "Café maure"] },
  { n: 2, title: "Constantine Authentique", tier: "Premium", img: "images/parcours-authentique.jpg", steps: ["Palais Ahmed Bey", "Dinanderie", "Calligraphie", "Eau de rose"] },
  { n: 3, title: "Saveurs & Ambiances", tier: "Premium", img: "images/parcours-saveurs.jpg", steps: ["Marché Souika", "Chakhchoukha", "Malouf live"] },
];

export const SceneParcours: React.FC = () => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();
  const headIn = spring({ frame, fps, config: { damping: 20 } });

  return (
    <AbsoluteFill style={{ background: palette.deep, padding: 90, overflow: "hidden" }}>
      <AbsoluteFill style={{ opacity: 0.18 }}>
        <Img src={staticFile("images/bridges.jpg")} style={{ width: "100%", height: "100%", objectFit: "cover" }} />
      </AbsoluteFill>
      <div style={{ position: "relative" }}>
        <div style={{ fontFamily: sans, color: palette.sand, letterSpacing: 6, fontSize: 18, fontWeight: 600, opacity: headIn }}>
          LES PARCOURS
        </div>
        <div style={{
          fontFamily: serif, fontWeight: 600, fontSize: 100, color: palette.ivory, lineHeight: 1, marginTop: 10,
          opacity: headIn, transform: `translateX(${(1 - headIn) * -30}px)`,
        }}>
          Itinéraires <span style={{ fontStyle: "italic", color: palette.sand }}>scénarisés</span>
        </div>
      </div>

      <div style={{ display: "flex", gap: 32, marginTop: 70, flex: 1, position: "relative" }}>
        {parcours.map((p, i) => {
          const delay = 16 + i * 12;
          const s = spring({ frame: frame - delay, fps, config: { damping: 16 } });
          return (
            <div key={p.n} style={{
              flex: 1, borderRadius: 16, overflow: "hidden", background: palette.ivory,
              opacity: s, transform: `translateY(${(1 - s) * 100}px) scale(${0.92 + s * 0.08})`,
              boxShadow: "0 40px 80px rgba(0,0,0,0.5)",
              display: "flex", flexDirection: "column",
            }}>
              <div style={{ position: "relative", height: 320 }}>
                <Img src={staticFile(p.img)} style={{ width: "100%", height: "100%", objectFit: "cover" }} />
                <div style={{
                  position: "absolute", top: 20, left: 20, width: 64, height: 64, borderRadius: "50%",
                  background: palette.accent, color: palette.ivory, display: "flex", alignItems: "center", justifyContent: "center",
                  fontFamily: serif, fontSize: 36, fontWeight: 700, border: `3px solid ${palette.ivory}`,
                }}>{p.n}</div>
                <div style={{
                  position: "absolute", top: 24, right: 24, padding: "6px 14px", borderRadius: 999,
                  background: p.tier === "Gratuit" ? palette.sand : palette.brown, color: palette.ivory,
                  fontFamily: sans, fontSize: 14, letterSpacing: 2, fontWeight: 600,
                }}>{p.tier.toUpperCase()}</div>
              </div>
              <div style={{ padding: 28, flex: 1 }}>
                <div style={{ fontFamily: serif, fontSize: 36, color: palette.deep, fontWeight: 600 }}>{p.title}</div>
                <div style={{ marginTop: 16 }}>
                  {p.steps.map((st, j) => {
                    const sd = delay + 8 + j * 5;
                    const so = interpolate(frame, [sd, sd + 10], [0, 1], { extrapolateRight: "clamp" });
                    return (
                      <div key={st} style={{ opacity: so, display: "flex", alignItems: "center", gap: 12, marginTop: 8, fontFamily: sans, color: palette.brown, fontSize: 18 }}>
                        <div style={{ width: 22, height: 22, borderRadius: "50%", background: palette.cream, color: palette.accent, display: "flex", alignItems: "center", justifyContent: "center", fontSize: 12, fontWeight: 700 }}>{j + 1}</div>
                        {st}
                      </div>
                    );
                  })}
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </AbsoluteFill>
  );
};
