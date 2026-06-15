import React from "react";
import { AbsoluteFill, useCurrentFrame, useVideoConfig, interpolate, spring, staticFile, Img } from "remotion";
import { serif, sans, palette } from "../theme";

export const SceneIntro: React.FC = () => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  const logoIn = spring({ frame, fps, config: { damping: 14, stiffness: 120 } });
  const titleIn = spring({ frame: frame - 12, fps, config: { damping: 18 } });
  const lineW = interpolate(frame, [30, 60], [0, 1], { extrapolateRight: "clamp" });
  const taglineIn = interpolate(frame, [45, 70], [0, 1], { extrapolateRight: "clamp" });
  const zoom = interpolate(frame, [0, 90], [1.15, 1.25]);
  const vignette = interpolate(frame, [0, 30], [0.9, 0.6]);

  return (
    <AbsoluteFill style={{ background: palette.deep, overflow: "hidden" }}>
      <AbsoluteFill style={{ transform: `scale(${zoom})`, filter: "saturate(0.85)" }}>
        <Img src={staticFile("images/hero-constantine.jpg")} style={{ width: "100%", height: "100%", objectFit: "cover", opacity: 0.55 }} />
      </AbsoluteFill>
      <AbsoluteFill style={{ background: `radial-gradient(circle at 50% 55%, rgba(46,27,14,0) 0%, rgba(27,18,10,${vignette}) 75%)` }} />

      <AbsoluteFill style={{ alignItems: "center", justifyContent: "center", textAlign: "center" }}>
        <div style={{
          opacity: logoIn, transform: `translateY(${(1 - logoIn) * 30}px)`,
          fontFamily: sans, color: palette.sand, letterSpacing: 8, fontSize: 22, fontWeight: 300, marginBottom: 24,
        }}>
          C O N S T A N T I N E   ·   A L G É R I E
        </div>
        <div style={{
          fontFamily: serif, fontWeight: 600, fontSize: 200, lineHeight: 1, color: palette.ivory,
          opacity: titleIn, transform: `translateY(${(1 - titleIn) * 50}px)`,
          textShadow: "0 4px 30px rgba(0,0,0,0.6)",
        }}>
          Live Médina
        </div>
        <div style={{
          width: `${lineW * 280}px`, height: 2, background: palette.sand, marginTop: 32, marginBottom: 32,
        }} />
        <div style={{
          fontFamily: serif, fontStyle: "italic", fontSize: 38, color: palette.cream, opacity: taglineIn,
          maxWidth: 1100,
        }}>
          La plateforme du patrimoine vivant de la Médina
        </div>
      </AbsoluteFill>
    </AbsoluteFill>
  );
};
