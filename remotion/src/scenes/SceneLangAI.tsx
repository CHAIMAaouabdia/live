import React from "react";
import { AbsoluteFill, useCurrentFrame, useVideoConfig, interpolate, spring, staticFile, Img } from "remotion";
import { serif, sans, palette } from "../theme";

const langs = [
  { code: "FR", label: "Français", text: "Patrimoine vivant" },
  { code: "EN", label: "English", text: "Living heritage" },
  { code: "AR", label: "العربية", text: "تراث حيّ", rtl: true },
];

export const SceneLangAI: React.FC = () => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();
  const headIn = spring({ frame, fps, config: { damping: 20 } });
  const idx = Math.min(2, Math.floor(frame / 28));

  return (
    <AbsoluteFill style={{ background: palette.deep, padding: 90, overflow: "hidden" }}>
      <AbsoluteFill style={{ opacity: 0.25 }}>
        <Img src={staticFile("images/exp-eau-rose.jpg")} style={{ width: "100%", height: "100%", objectFit: "cover", filter: "blur(2px)" }} />
      </AbsoluteFill>

      <div style={{ position: "relative", display: "flex", gap: 80, flex: 1 }}>
        <div style={{ flex: 1, display: "flex", flexDirection: "column", justifyContent: "center" }}>
          <div style={{ fontFamily: sans, color: palette.sand, letterSpacing: 6, fontSize: 18, fontWeight: 600, opacity: headIn }}>
            INTELLIGENCE & LANGUES
          </div>
          <div style={{ fontFamily: serif, fontSize: 92, color: palette.ivory, fontWeight: 600, lineHeight: 1.05, marginTop: 12, opacity: headIn }}>
            Une IA qui<br/>
            <span style={{ fontStyle: "italic", color: palette.sand }}>vous comprend.</span>
          </div>
          <div style={{ fontFamily: sans, color: palette.cream, fontSize: 24, marginTop: 30, maxWidth: 600, opacity: interpolate(frame, [20, 50], [0, 1], { extrapolateRight: "clamp" }) }}>
            Quiz psychique · Analyse de personnalité · Carte émotionnelle · Bibliothèque trilingue
          </div>
        </div>

        <div style={{ flex: 1, display: "flex", flexDirection: "column", justifyContent: "center", gap: 20 }}>
          {langs.map((l, i) => {
            const active = i === idx;
            const s = spring({ frame: frame - (18 + i * 10), fps, config: { damping: 18 } });
            return (
              <div key={l.code} style={{
                padding: 28, borderRadius: 14,
                background: active ? palette.sand : "rgba(246,239,226,0.08)",
                color: active ? palette.deep : palette.cream,
                border: `1px solid ${active ? palette.sand : "rgba(246,239,226,0.2)"}`,
                opacity: s, transform: `translateX(${(1 - s) * 60}px) scale(${active ? 1.04 : 1})`,
                transition: "none",
                display: "flex", alignItems: "center", gap: 24,
                direction: l.rtl ? "rtl" : "ltr",
              }}>
                <div style={{ fontFamily: sans, fontWeight: 700, fontSize: 28, width: 60 }}>{l.code}</div>
                <div style={{ flex: 1 }}>
                  <div style={{ fontFamily: sans, fontSize: 14, opacity: 0.7 }}>{l.label}</div>
                  <div style={{ fontFamily: serif, fontSize: 40, fontWeight: 600 }}>{l.text}</div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </AbsoluteFill>
  );
};
