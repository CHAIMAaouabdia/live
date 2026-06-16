import React from "react";
import { AbsoluteFill, useCurrentFrame, useVideoConfig, interpolate, spring, staticFile, Img } from "remotion";
import { serif, sans, palette } from "../theme";

export const SceneOutro: React.FC = () => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();
  const titleIn = spring({ frame, fps, config: { damping: 18 } });
  const zoom = interpolate(frame, [0, 90], [1.1, 1.18]);

  return (
    <AbsoluteFill style={{ background: palette.deep, overflow: "hidden" }}>
      <AbsoluteFill style={{ transform: `scale(${zoom})`, opacity: 0.45 }}>
        <Img src={staticFile("images/bridges.jpg")} style={{ width: "100%", height: "100%", objectFit: "cover" }} />
      </AbsoluteFill>
      <AbsoluteFill style={{ background: "radial-gradient(circle at 50% 60%, rgba(46,27,14,0) 0%, rgba(27,18,10,0.85) 80%)" }} />

      <AbsoluteFill style={{ alignItems: "center", justifyContent: "center", textAlign: "center" }}>
        <div style={{ fontFamily: sans, color: palette.sand, letterSpacing: 8, fontSize: 22, opacity: titleIn, fontWeight: 300 }}>
          R E J O I G N E Z   L ' A V E N T U R E
        </div>
        <div style={{
          fontFamily: serif, fontWeight: 600, fontSize: 180, color: palette.ivory, lineHeight: 1, marginTop: 24,
          opacity: titleIn, transform: `translateY(${(1 - titleIn) * 40}px)`,
        }}>
          Live <span style={{ fontStyle: "italic", color: palette.sand }}>Médina</span>
        </div>
        <div style={{
          fontFamily: serif, fontStyle: "italic", fontSize: 38, color: palette.cream, marginTop: 30,
          opacity: interpolate(frame, [20, 45], [0, 1], { extrapolateRight: "clamp" }),
        }}>
          Constantine · vivre, partager, transmettre
        </div>
        <div style={{
          fontFamily: sans, color: palette.sand, fontSize: 22, marginTop: 50, letterSpacing: 4,
          opacity: interpolate(frame, [40, 70], [0, 1], { extrapolateRight: "clamp" }),
        }}>
          livemedina.vercel.app
        </div>
      </AbsoluteFill>
    </AbsoluteFill>
  );
};
