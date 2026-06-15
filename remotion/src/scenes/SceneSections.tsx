import React from "react";
import { AbsoluteFill, useCurrentFrame, useVideoConfig, interpolate, spring, staticFile, Img, Sequence } from "remotion";
import { serif, sans, palette } from "../theme";

const cards = [
  { title: "Hébergement", sub: "Riads & maisons d'hôtes authentiques", img: "images/acc-dar-cirta.jpg" },
  { title: "Expériences", sub: "Simples · Solidaires · Parcours", img: "images/exp-souika.jpg" },
  { title: "Bibliothèque", sub: "Articles FR · EN · ‫العربية‬", img: "images/exp-calligraphie.jpg" },
];

export const SceneSections: React.FC = () => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();
  const headIn = spring({ frame, fps, config: { damping: 20 } });

  return (
    <AbsoluteFill style={{ background: `linear-gradient(180deg, ${palette.ivory} 0%, ${palette.cream} 100%)`, padding: 90 }}>
      <div style={{
        fontFamily: sans, color: palette.accent, fontSize: 18, letterSpacing: 6, fontWeight: 600,
        opacity: headIn,
      }}>
        UNE PLATEFORME · TROIS UNIVERS
      </div>
      <div style={{
        fontFamily: serif, color: palette.deep, fontSize: 110, lineHeight: 1, fontWeight: 600, marginTop: 10,
        opacity: headIn, transform: `translateX(${(1 - headIn) * -30}px)`,
      }}>
        Tout le patrimoine, <span style={{ fontStyle: "italic", color: palette.accent }}>réuni.</span>
      </div>

      <div style={{ display: "flex", gap: 40, marginTop: 90, flex: 1 }}>
        {cards.map((c, i) => {
          const delay = 18 + i * 10;
          const s = spring({ frame: frame - delay, fps, config: { damping: 18 } });
          const float = Math.sin((frame - delay) / 18) * 6;
          return (
            <div key={c.title} style={{
              flex: 1, background: "white", borderRadius: 18, overflow: "hidden",
              boxShadow: "0 30px 60px rgba(46,27,14,0.18)",
              opacity: s, transform: `translateY(${(1 - s) * 80 + float}px)`,
              border: `1px solid ${palette.cream}`,
            }}>
              <div style={{ height: "55%", overflow: "hidden" }}>
                <Img src={staticFile(c.img)} style={{ width: "100%", height: "100%", objectFit: "cover" }} />
              </div>
              <div style={{ padding: 36 }}>
                <div style={{ fontFamily: serif, fontSize: 56, color: palette.deep, fontWeight: 600 }}>{c.title}</div>
                <div style={{ fontFamily: sans, fontSize: 22, color: palette.brown, marginTop: 12, opacity: 0.85 }}>{c.sub}</div>
                <div style={{ marginTop: 24, width: 60, height: 3, background: palette.sand }} />
              </div>
            </div>
          );
        })}
      </div>
    </AbsoluteFill>
  );
};
