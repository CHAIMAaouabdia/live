import React from "react";
import { AbsoluteFill, useCurrentFrame, useVideoConfig, interpolate, spring, staticFile, Img } from "remotion";
import { serif, sans, palette } from "../theme";

const questions = [
  "Q1 · Recherchez-vous la quiétude ou l'effervescence ?",
  "Q2 · Quel sens vous parle le plus : la vue, l'odorat, le goût ?",
  "Q3 · Préférez-vous l'art, l'histoire ou la rencontre humaine ?",
  "Q4 · Quel rythme : contemplatif ou intense ?",
];

const traits = [
  { label: "Contemplatif", v: 82 },
  { label: "Sensoriel", v: 91 },
  { label: "Curieux", v: 76 },
  { label: "Spirituel", v: 68 },
];

const recos = [
  { title: "Distillation eau de rose", why: "Profil sensoriel élevé" },
  { title: "Calligraphie au Palais Bey", why: "Affinité contemplative" },
  { title: "Café maure & malouf", why: "Recherche d'authenticité" },
];

export const SceneAIDeep: React.FC = () => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();
  const headIn = spring({ frame, fps, config: { damping: 20 } });

  return (
    <AbsoluteFill style={{ background: palette.deep, padding: 80, overflow: "hidden" }}>
      <AbsoluteFill style={{ opacity: 0.15 }}>
        <Img src={staticFile("images/exp-calligraphie.jpg")} style={{ width: "100%", height: "100%", objectFit: "cover" }} />
      </AbsoluteFill>

      <div style={{ position: "relative" }}>
        <div style={{ fontFamily: sans, color: palette.sand, letterSpacing: 6, fontSize: 18, fontWeight: 600, opacity: headIn }}>
          LUXE · ANALYSE IA DE PERSONNALITÉ
        </div>
        <div style={{ fontFamily: serif, fontSize: 82, color: palette.ivory, fontWeight: 600, lineHeight: 1, marginTop: 8, opacity: headIn }}>
          Un voyage <span style={{ fontStyle: "italic", color: palette.sand }}>écrit pour vous.</span>
        </div>
      </div>

      <div style={{ position: "relative", display: "grid", gridTemplateColumns: "1fr 1fr 1fr", gap: 24, marginTop: 50, flex: 1 }}>
        {/* Quiz */}
        <div style={{ background: "rgba(246,239,226,0.08)", borderRadius: 16, padding: 22, border: `1px solid rgba(246,239,226,0.15)` }}>
          <div style={{ fontFamily: sans, color: palette.sand, fontSize: 11, letterSpacing: 3, fontWeight: 700 }}>1 · QUESTIONNAIRE PSYCHIQUE</div>
          <div style={{ marginTop: 14, display: "flex", flexDirection: "column", gap: 12 }}>
            {questions.map((q, i) => {
              const d = 16 + i * 8;
              const s = spring({ frame: frame - d, fps, config: { damping: 18 } });
              return (
                <div key={i} style={{ opacity: s, transform: `translateY(${(1 - s) * 14}px)`, padding: 12, background: "rgba(255,255,255,0.04)", borderRadius: 8, color: palette.cream, fontFamily: sans, fontSize: 14 }}>
                  {q}
                </div>
              );
            })}
          </div>
        </div>

        {/* Analysis */}
        <div style={{ background: "rgba(246,239,226,0.08)", borderRadius: 16, padding: 22, border: `1px solid rgba(246,239,226,0.15)` }}>
          <div style={{ fontFamily: sans, color: palette.sand, fontSize: 11, letterSpacing: 3, fontWeight: 700 }}>2 · ANALYSE IA</div>
          <div style={{ fontFamily: serif, fontSize: 22, color: palette.ivory, marginTop: 8, fontWeight: 600 }}>Profil détecté</div>
          <div style={{ display: "flex", flexDirection: "column", gap: 14, marginTop: 18 }}>
            {traits.map((t, i) => {
              const d = 30 + i * 6;
              const s = spring({ frame: frame - d, fps, config: { damping: 16 } });
              return (
                <div key={t.label}>
                  <div style={{ display: "flex", justifyContent: "space-between", fontFamily: sans, fontSize: 13, color: palette.cream }}>
                    <span>{t.label}</span><span>{Math.round(t.v * s)}%</span>
                  </div>
                  <div style={{ height: 6, background: "rgba(255,255,255,0.1)", borderRadius: 4, marginTop: 4, overflow: "hidden" }}>
                    <div style={{ width: `${t.v * s}%`, height: "100%", background: palette.sand }} />
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* Recos */}
        <div style={{ background: palette.sand, borderRadius: 16, padding: 22, color: palette.deep }}>
          <div style={{ fontFamily: sans, color: palette.deep, fontSize: 11, letterSpacing: 3, fontWeight: 700 }}>3 · RECOMMANDATIONS SUR-MESURE</div>
          <div style={{ fontFamily: serif, fontSize: 22, marginTop: 8, fontWeight: 700 }}>Votre itinéraire</div>
          <div style={{ display: "flex", flexDirection: "column", gap: 10, marginTop: 16 }}>
            {recos.map((r, i) => {
              const d = 60 + i * 8;
              const s = spring({ frame: frame - d, fps, config: { damping: 18 } });
              return (
                <div key={r.title} style={{ opacity: s, transform: `translateX(${(1 - s) * 40}px)`, padding: 12, background: "rgba(46,27,14,0.08)", borderRadius: 8 }}>
                  <div style={{ fontFamily: serif, fontSize: 18, fontWeight: 700 }}>{r.title}</div>
                  <div style={{ fontFamily: sans, fontSize: 12, opacity: 0.75, marginTop: 2 }}>↳ {r.why}</div>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </AbsoluteFill>
  );
};
