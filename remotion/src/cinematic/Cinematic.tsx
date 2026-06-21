import React from "react";
import { AbsoluteFill, Audio, Img, Sequence, interpolate, spring, staticFile, useCurrentFrame, useVideoConfig } from "remotion";
import { serif, sans, palette } from "../theme";

// 52s @ 30fps = 1560 frames
export const CINEMATIC_FRAMES = 1560;

const KenBurns: React.FC<{ src: string; from?: number; to?: number; duration: number; pan?: [number, number]; tint?: number; sepia?: number }> = ({ src, from = 1.05, to = 1.25, duration, pan = [0, 0], tint = 0.35, sepia = 0 }) => {
  const f = useCurrentFrame();
  const scale = interpolate(f, [0, duration], [from, to], { extrapolateRight: "clamp" });
  const tx = interpolate(f, [0, duration], [0, pan[0]]);
  const ty = interpolate(f, [0, duration], [0, pan[1]]);
  return (
    <AbsoluteFill style={{ overflow: "hidden", background: palette.ink }}>
      <Img src={staticFile(src)} style={{ width: "100%", height: "100%", objectFit: "cover", transform: `scale(${scale}) translate(${tx}px, ${ty}px)`, filter: `saturate(0.9) sepia(${sepia})` }} />
      <AbsoluteFill style={{ background: `linear-gradient(180deg, rgba(27,18,10,${tint*0.6}) 0%, rgba(27,18,10,0) 35%, rgba(27,18,10,0) 60%, rgba(27,18,10,${tint*1.2}) 100%)` }} />
    </AbsoluteFill>
  );
};

const Vignette: React.FC<{ strength?: number }> = ({ strength = 0.75 }) => (
  <AbsoluteFill style={{ background: `radial-gradient(ellipse at 50% 50%, rgba(0,0,0,0) 40%, rgba(0,0,0,${strength}) 100%)`, pointerEvents: "none" }} />
);

const FilmGrain: React.FC = () => {
  const f = useCurrentFrame();
  const op = 0.06 + 0.02 * Math.sin(f * 0.7);
  return <AbsoluteFill style={{ opacity: op, mixBlendMode: "overlay", backgroundImage: "url(\"data:image/svg+xml;utf8,<svg xmlns='http://www.w3.org/2000/svg' width='200' height='200'><filter id='n'><feTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='2' stitchTiles='stitch'/></filter><rect width='100%' height='100%' filter='url(%23n)' opacity='0.7'/></svg>\")", pointerEvents: "none" }} />;
};

const FadeWrap: React.FC<{ children: React.ReactNode; duration: number; inF?: number; outF?: number }> = ({ children, duration, inF = 18, outF = 18 }) => {
  const f = useCurrentFrame();
  const o = Math.min(interpolate(f, [0, inF], [0, 1], { extrapolateRight: "clamp" }), interpolate(f, [duration - outF, duration], [1, 0], { extrapolateLeft: "clamp" }));
  return <AbsoluteFill style={{ opacity: o }}>{children}</AbsoluteFill>;
};

// ---------- SCENES ----------

// 1. Opening 0-8s (240 frames)
const Scene1: React.FC = () => {
  const f = useCurrentFrame();
  const { fps } = useVideoConfig();
  const t1 = spring({ frame: f - 20, fps, config: { damping: 18 } });
  const t2 = spring({ frame: f - 60, fps, config: { damping: 20 } });
  const lineW = interpolate(f, [50, 110], [0, 1], { extrapolateRight: "clamp" });
  return (
    <FadeWrap duration={240}>
      <KenBurns src="images/hero-constantine.jpg" duration={240} from={1.1} to={1.3} pan={[-30, 20]} tint={0.5} />
      <Vignette strength={0.85} />
      <AbsoluteFill style={{ alignItems: "center", justifyContent: "center", textAlign: "center" }}>
        <div style={{ fontFamily: sans, color: palette.sand, letterSpacing: 14, fontSize: 26, opacity: t1, transform: `translateY(${(1-t1)*20}px)`, fontWeight: 300 }}>
          A L G É R I E  ·  P A T R I M O I N E  V I V A N T
        </div>
        <div style={{ fontFamily: serif, fontWeight: 700, fontSize: 240, lineHeight: 1, color: palette.ivory, opacity: t1, transform: `translateY(${(1-t1)*40}px)`, textShadow: "0 6px 40px rgba(0,0,0,0.7)", marginTop: 20 }}>
          Constantine
        </div>
        <div style={{ width: `${lineW * 320}px`, height: 2, background: palette.sand, marginTop: 30, marginBottom: 30 }} />
        <div style={{ fontFamily: serif, fontStyle: "italic", fontSize: 44, color: palette.cream, opacity: t2, maxWidth: 1300 }}>
          La ville des ponts suspendus et des mille histoires
        </div>
      </AbsoluteFill>
      <FilmGrain />
    </FadeWrap>
  );
};

// 2. Problem 8-19s (330f) — montage 3 images: bridges, cuisine, parcours-decouverte
const Scene2: React.FC = () => {
  const f = useCurrentFrame();
  const seg = 110;
  const idx = Math.min(2, Math.floor(f / seg));
  const local = f - idx * seg;
  const imgs = ["images/bridges.jpg", "images/parcours-decouverte.jpg", "images/parcours-authentique.jpg"];
  const captions = ["Visites trop brèves", "Monuments survolés", "Vie locale ignorée"];
  const o = Math.min(interpolate(local, [0, 14], [0, 1], { extrapolateRight: "clamp" }), interpolate(local, [seg - 14, seg], [1, 0], { extrapolateLeft: "clamp" }));
  const scale = interpolate(local, [0, seg], [1.05, 1.18]);
  return (
    <FadeWrap duration={330}>
      <AbsoluteFill style={{ background: palette.ink, overflow: "hidden" }}>
        <Img src={staticFile(imgs[idx])} style={{ width: "100%", height: "100%", objectFit: "cover", transform: `scale(${scale})`, opacity: o * 0.75, filter: "grayscale(0.4) saturate(0.7) brightness(0.85)" }} />
      </AbsoluteFill>
      <AbsoluteFill style={{ background: "linear-gradient(180deg, rgba(27,18,10,0.55) 0%, rgba(27,18,10,0.1) 50%, rgba(27,18,10,0.9) 100%)" }} />
      <Vignette strength={0.9} />
      <AbsoluteFill style={{ alignItems: "flex-start", justifyContent: "flex-end", padding: 120 }}>
        <div style={{ fontFamily: sans, color: palette.sand, letterSpacing: 8, fontSize: 22, opacity: o, fontWeight: 300, marginBottom: 16 }}>
          0{idx + 1}  ·  L E  C O N S T A T
        </div>
        <div style={{ fontFamily: serif, fontSize: 110, color: palette.ivory, fontWeight: 600, lineHeight: 1.05, opacity: o, transform: `translateX(${(1-o)*-30}px)`, maxWidth: 1400 }}>
          {captions[idx]}
        </div>
      </AbsoluteFill>
      <FilmGrain />
    </FadeWrap>
  );
};

// 3. Hidden treasures 19-27s (240f) — split 2 cards
const Scene3: React.FC = () => {
  const f = useCurrentFrame();
  const { fps } = useVideoConfig();
  const headIn = spring({ frame: f, fps, config: { damping: 18 } });
  const c1 = spring({ frame: f - 20, fps, config: { damping: 20 } });
  const c2 = spring({ frame: f - 40, fps, config: { damping: 20 } });
  const imgs = [
    { src: "images/artisan.jpg", label: "Savoir-faire" },
    { src: "images/exp-calligraphie.jpg", label: "Calligraphie" },
  ];
  return (
    <FadeWrap duration={240}>
      <AbsoluteFill style={{ background: `linear-gradient(160deg, ${palette.deep} 0%, ${palette.ink} 100%)` }} />
      <AbsoluteFill style={{ padding: "100px 120px", flexDirection: "column" }}>
        <div style={{ fontFamily: sans, color: palette.sand, letterSpacing: 10, fontSize: 22, opacity: headIn, fontWeight: 300 }}>
          T R É S O R S   I N V I S I B L E S
        </div>
        <div style={{ fontFamily: serif, fontSize: 96, color: palette.ivory, fontWeight: 600, opacity: headIn, transform: `translateY(${(1-headIn)*30}px)`, marginTop: 12, lineHeight: 1.05 }}>
          Une richesse méconnue,<br/><span style={{ fontStyle: "italic", color: palette.sand }}>à transmettre.</span>
        </div>
        <div style={{ display: "flex", gap: 40, marginTop: 60, flex: 1 }}>
          {imgs.map((im, i) => {
            const s = i === 0 ? c1 : c2;
            const ff = useCurrentFrame();
            const zoom = 1 + 0.06 * (ff / 240);
            return (
              <div key={i} style={{ flex: 1, opacity: s, transform: `translateY(${(1-s)*60}px) scale(${0.96 + s*0.04})`, position: "relative", borderRadius: 8, overflow: "hidden", boxShadow: "0 30px 80px rgba(0,0,0,0.6)" }}>
                <Img src={staticFile(im.src)} style={{ width: "100%", height: "100%", objectFit: "cover", transform: `scale(${zoom})`, filter: "saturate(1.05)" }} />
                <div style={{ position: "absolute", inset: 0, background: "linear-gradient(180deg, rgba(0,0,0,0) 55%, rgba(27,18,10,0.95) 100%)" }} />
                <div style={{ position: "absolute", left: 30, bottom: 26, fontFamily: serif, color: palette.ivory, fontSize: 46, fontWeight: 600 }}>
                  {im.label}
                </div>
              </div>
            );
          })}
        </div>
      </AbsoluteFill>
      <FilmGrain />
    </FadeWrap>
  );
};

// 4. App reveal 27-34s (210f) — phone mockup
const Scene4: React.FC = () => {
  const f = useCurrentFrame();
  const { fps } = useVideoConfig();
  const phoneIn = spring({ frame: f, fps, config: { damping: 16, stiffness: 90 } });
  const textIn = spring({ frame: f - 25, fps, config: { damping: 20 } });
  const float = Math.sin(f / 30) * 8;
  return (
    <FadeWrap duration={210}>
      <AbsoluteFill style={{ background: `radial-gradient(circle at 30% 50%, ${palette.brown} 0%, ${palette.ink} 70%)` }} />
      <AbsoluteFill style={{ overflow: "hidden", opacity: 0.18 }}>
        <Img src={staticFile("images/luxury-riad.jpg")} style={{ width: "100%", height: "100%", objectFit: "cover", transform: "scale(1.1)" }} />
      </AbsoluteFill>
      <AbsoluteFill style={{ flexDirection: "row", alignItems: "center", justifyContent: "center", gap: 100, padding: 100 }}>
        <div style={{ flex: 1, opacity: textIn, transform: `translateX(${(1-textIn)*-40}px)` }}>
          <div style={{ fontFamily: sans, color: palette.sand, letterSpacing: 10, fontSize: 22, fontWeight: 300 }}>
            L A   S O L U T I O N
          </div>
          <div style={{ fontFamily: serif, fontSize: 140, color: palette.ivory, fontWeight: 700, lineHeight: 1, marginTop: 14 }}>
            Live <span style={{ fontStyle: "italic", color: palette.sand }}>Médina</span>
          </div>
          <div style={{ fontFamily: serif, fontStyle: "italic", fontSize: 38, color: palette.cream, marginTop: 28, maxWidth: 720, lineHeight: 1.3 }}>
            Du tourisme passif à<br/>l'expérience vécue.
          </div>
        </div>
        <div style={{ width: 360, height: 740, background: "#0a0604", borderRadius: 50, border: `8px solid ${palette.sand}`, opacity: phoneIn, transform: `translateY(${(1-phoneIn)*80 + float}px) rotate(${(1-phoneIn)*8}deg)`, boxShadow: "0 40px 120px rgba(0,0,0,0.8), 0 0 80px rgba(217,182,121,0.25)", overflow: "hidden", position: "relative" }}>
          <div style={{ position: "absolute", inset: 14, borderRadius: 38, background: palette.deep, padding: 24, display: "flex", flexDirection: "column", gap: 14 }}>
            <div style={{ fontFamily: serif, color: palette.sand, fontSize: 28, fontWeight: 700 }}>Live Médina</div>
            <div style={{ fontFamily: sans, color: palette.cream, fontSize: 12, letterSpacing: 2, opacity: 0.7 }}>EXPLORER · RÉSERVER · VIVRE</div>
            {[
              { t: "Hébergement chez l'habitant", img: "images/acc-dar-cirta.jpg" },
              { t: "Atelier de calligraphie", img: "images/exp-calligraphie.jpg" },
              { t: "Repas partagé", img: "images/cuisine.jpg" },
            ].map((c, i) => {
              const ci = spring({ frame: f - 30 - i * 10, fps, config: { damping: 18 } });
              return (
                <div key={i} style={{ background: palette.ink, borderRadius: 10, padding: 8, display: "flex", gap: 10, alignItems: "center", opacity: ci, transform: `translateX(${(1-ci)*30}px)` }}>
                  <Img src={staticFile(c.img)} style={{ width: 56, height: 56, objectFit: "cover", borderRadius: 6 }} />
                  <div style={{ fontFamily: sans, color: palette.ivory, fontSize: 13, fontWeight: 400 }}>{c.t}</div>
                </div>
              );
            })}
          </div>
        </div>
      </AbsoluteFill>
      <FilmGrain />
    </FadeWrap>
  );
};

// 5. Immersion 34-41s (210f)
const Scene5: React.FC = () => {
  const f = useCurrentFrame();
  const seg = 105;
  const idx = Math.min(1, Math.floor(f / seg));
  const local = f - idx * seg;
  const imgs = ["images/exp-souika.jpg", "images/exp-eau-rose.jpg"];
  const caps = ["Partager le quotidien", "Vivre la médina"];
  const o = Math.min(interpolate(local, [0, 16], [0, 1], { extrapolateRight: "clamp" }), interpolate(local, [seg - 16, seg], [1, 0], { extrapolateLeft: "clamp" }));
  return (
    <FadeWrap duration={210}>
      <AbsoluteFill style={{ background: palette.ink, overflow: "hidden" }}>
        <Img src={staticFile(imgs[idx])} style={{ width: "100%", height: "100%", objectFit: "cover", transform: `scale(${interpolate(local, [0, seg], [1.08, 1.22])})`, opacity: o, filter: "saturate(1.1)" }} />
      </AbsoluteFill>
      <AbsoluteFill style={{ background: "linear-gradient(180deg, rgba(27,18,10,0.4) 0%, rgba(27,18,10,0) 40%, rgba(27,18,10,0.85) 100%)" }} />
      <AbsoluteFill style={{ alignItems: "center", justifyContent: "flex-end", paddingBottom: 140 }}>
        <div style={{ fontFamily: sans, color: palette.sand, letterSpacing: 10, fontSize: 22, opacity: o, fontWeight: 300, marginBottom: 14 }}>
          I M M E R S I O N
        </div>
        <div style={{ fontFamily: serif, fontSize: 96, color: palette.ivory, fontWeight: 600, opacity: o, transform: `translateY(${(1-o)*30}px)`, textShadow: "0 6px 30px rgba(0,0,0,0.7)" }}>
          {caps[idx]}
        </div>
      </AbsoluteFill>
      <FilmGrain />
    </FadeWrap>
  );
};

// 6. Finale 41-52s (330f)
const Scene6: React.FC = () => {
  const f = useCurrentFrame();
  const { fps } = useVideoConfig();
  const t1 = spring({ frame: f - 10, fps, config: { damping: 20 } });
  const t2 = spring({ frame: f - 80, fps, config: { damping: 22 } });
  const lineW = interpolate(f, [60, 120], [0, 1], { extrapolateRight: "clamp" });
  const url = interpolate(f, [180, 220], [0, 1], { extrapolateRight: "clamp" });
  return (
    <FadeWrap duration={330} outF={40}>
      <KenBurns src="images/bridges.jpg" duration={330} from={1.15} to={1.3} pan={[20, -10]} tint={0.5} />
      <Vignette strength={0.9} />
      <AbsoluteFill style={{ alignItems: "center", justifyContent: "center", textAlign: "center", padding: 80 }}>
        <div style={{ fontFamily: sans, color: palette.sand, letterSpacing: 12, fontSize: 24, opacity: t1, fontWeight: 300 }}>
          L I V E   M É D I N A
        </div>
        <div style={{ width: `${lineW * 240}px`, height: 1.5, background: palette.sand, marginTop: 26, marginBottom: 26 }} />
        <div style={{ fontFamily: serif, fontSize: 160, color: palette.ivory, fontWeight: 700, lineHeight: 1.05, opacity: t1, transform: `translateY(${(1-t1)*40}px)`, textShadow: "0 8px 50px rgba(0,0,0,0.8)" }}>
          Ne visitez plus<br/>la médina.
        </div>
        <div style={{ fontFamily: serif, fontStyle: "italic", fontSize: 130, color: palette.sand, fontWeight: 600, marginTop: 24, opacity: t2, transform: `translateY(${(1-t2)*30}px)`, textShadow: "0 8px 50px rgba(0,0,0,0.8)" }}>
          Habitez-la.
        </div>
        <div style={{ fontFamily: sans, color: palette.cream, fontSize: 26, letterSpacing: 6, marginTop: 70, opacity: url }}>
          livemedina.vercel.app
        </div>
      </AbsoluteFill>
      <FilmGrain />
    </FadeWrap>
  );
};

const D = [240, 330, 240, 210, 210, 330];
const scenes = [Scene1, Scene2, Scene3, Scene4, Scene5, Scene6];

export const CinematicVideo: React.FC = () => {
  let acc = 0;
  return (
    <AbsoluteFill style={{ background: palette.ink }}>
      {scenes.map((S, i) => {
        const from = acc;
        acc += D[i];
        return (
          <Sequence key={i} from={from} durationInFrames={D[i]}>
            <S />
          </Sequence>
        );
      })}
      <Audio src={staticFile("audio/vo.mp3")} />
    </AbsoluteFill>
  );
};
