import React from "react";
import { AbsoluteFill, useCurrentFrame, useVideoConfig, interpolate, spring } from "remotion";
import { serif, sans, palette } from "../theme";

const Stat = ({ label, value, delay, frame, fps }: any) => {
  const s = spring({ frame: frame - delay, fps, config: { damping: 18 } });
  return (
    <div style={{ background: palette.ivory, borderRadius: 10, padding: 14, opacity: s, transform: `translateY(${(1 - s) * 20}px)`, border: `1px solid ${palette.cream}` }}>
      <div style={{ fontFamily: sans, fontSize: 10, color: palette.brown, letterSpacing: 2, fontWeight: 600 }}>{label}</div>
      <div style={{ fontFamily: serif, fontSize: 26, color: palette.deep, fontWeight: 600 }}>{value}</div>
    </div>
  );
};

const Bars = ({ frame, fps, delay, color }: any) => {
  const bars = [50, 80, 65, 95, 72, 88, 60];
  return (
    <div style={{ display: "flex", alignItems: "flex-end", gap: 8, height: 100, marginTop: 12 }}>
      {bars.map((b, i) => {
        const s = spring({ frame: frame - (delay + i * 3), fps, config: { damping: 18 } });
        return <div key={i} style={{ flex: 1, height: b * s, background: color, borderRadius: 4, opacity: 0.85 }} />;
      })}
    </div>
  );
};

const Donut = ({ frame, fps, delay }: any) => {
  const s = spring({ frame: frame - delay, fps, config: { damping: 18 } });
  return (
    <div style={{ width: 110, height: 110, borderRadius: "50%", background: `conic-gradient(${palette.accent} 0 ${s * 65}%, ${palette.sand} ${s * 65}% ${s * 88}%, ${palette.cream} ${s * 88}% 100%)`, display: "flex", alignItems: "center", justifyContent: "center" }}>
      <div style={{ width: 70, height: 70, borderRadius: "50%", background: "white", display: "flex", alignItems: "center", justifyContent: "center", fontFamily: serif, fontSize: 20, color: palette.deep, fontWeight: 700 }}>{Math.round(s * 65)}%</div>
    </div>
  );
};

const Card = ({ role, color, frame, fps, delay, children }: any) => {
  const s = spring({ frame: frame - delay, fps, config: { damping: 18 } });
  return (
    <div style={{ background: "white", borderRadius: 16, padding: 22, boxShadow: "0 20px 40px rgba(46,27,14,0.12)", border: `1px solid ${palette.cream}`, opacity: s, transform: `translateY(${(1 - s) * 40}px) scale(${0.96 + s * 0.04})`, display: "flex", flexDirection: "column", gap: 8 }}>
      <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
        <div style={{ width: 10, height: 10, borderRadius: "50%", background: color }} />
        <div style={{ fontFamily: sans, fontSize: 11, letterSpacing: 2, color: palette.accent, fontWeight: 700 }}>DASHBOARD {role.toUpperCase()}</div>
      </div>
      {children}
    </div>
  );
};

export const SceneDashboards: React.FC = () => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();
  const headIn = spring({ frame, fps, config: { damping: 20 } });

  return (
    <AbsoluteFill style={{ background: `linear-gradient(180deg, ${palette.cream} 0%, ${palette.ivory} 100%)`, padding: 80 }}>
      <div style={{ fontFamily: sans, color: palette.accent, letterSpacing: 6, fontSize: 18, fontWeight: 600, opacity: headIn }}>
        QUATRE TABLEAUX DE BORD · UN ÉCOSYSTÈME
      </div>
      <div style={{ fontFamily: serif, fontSize: 80, color: palette.deep, fontWeight: 600, lineHeight: 1, marginTop: 8, opacity: headIn }}>
        Chaque rôle, ses <span style={{ fontStyle: "italic", color: palette.accent }}>indicateurs.</span>
      </div>

      <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gridTemplateRows: "1fr 1fr", gap: 24, marginTop: 40, flex: 1 }}>
        <Card role="Client" color={palette.accent} frame={frame} fps={fps} delay={16}>
          <div style={{ fontFamily: serif, fontSize: 24, color: palette.deep, fontWeight: 600 }}>Mon voyage</div>
          <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr 1fr", gap: 8 }}>
            <Stat label="RÉSERVATIONS" value="04" delay={26} frame={frame} fps={fps} />
            <Stat label="FAVORIS" value="12" delay={30} frame={frame} fps={fps} />
            <Stat label="POINTS" value="320" delay={34} frame={frame} fps={fps} />
          </div>
          <div style={{ fontFamily: sans, fontSize: 12, color: palette.brown, marginTop: 4 }}>Prochaines réservations · Carte émotionnelle · Badges</div>
        </Card>

        <Card role="Guide" color={palette.brown} frame={frame} fps={fps} delay={22}>
          <div style={{ fontFamily: serif, fontSize: 24, color: palette.deep, fontWeight: 600 }}>Mes parcours</div>
          <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
            <div>
              <div style={{ fontFamily: sans, fontSize: 11, color: palette.brown, letterSpacing: 2 }}>NOTE MOYENNE</div>
              <div style={{ fontFamily: serif, fontSize: 36, color: palette.deep, fontWeight: 700 }}>4.8 ★</div>
            </div>
            <div style={{ padding: "6px 14px", borderRadius: 999, background: palette.deep, color: palette.ivory, fontFamily: sans, fontSize: 12, fontWeight: 600 }}>+ Ajouter parcours</div>
          </div>
          <Bars frame={frame} fps={fps} delay={30} color={palette.brown} />
        </Card>

        <Card role="Propriétaire" color={palette.sand} frame={frame} fps={fps} delay={28}>
          <div style={{ fontFamily: serif, fontSize: 24, color: palette.deep, fontWeight: 600 }}>Mes hébergements</div>
          <div style={{ display: "flex", gap: 18, alignItems: "center" }}>
            <Donut frame={frame} fps={fps} delay={36} />
            <div style={{ flex: 1 }}>
              <div style={{ fontFamily: sans, fontSize: 11, color: palette.brown, letterSpacing: 2 }}>TAUX D'OCCUPATION</div>
              <div style={{ fontFamily: serif, fontSize: 18, color: palette.deep, fontWeight: 600, marginTop: 4 }}>CA · 184 500 DZD</div>
              <div style={{ fontFamily: sans, fontSize: 11, color: palette.accent, marginTop: 2 }}>+18% vs mois précédent</div>
            </div>
          </div>
        </Card>

        <Card role="Administrateur" color={palette.deep} frame={frame} fps={fps} delay={34}>
          <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
            <div style={{ fontFamily: serif, fontSize: 24, color: palette.deep, fontWeight: 600 }}>Modération & analytics</div>
            <div style={{ padding: "4px 10px", background: palette.accent, color: palette.ivory, borderRadius: 999, fontFamily: sans, fontSize: 11, fontWeight: 700 }}>3 NOTIFS</div>
          </div>
          <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 8 }}>
            <Stat label="GUIDES À VALIDER" value="02" delay={42} frame={frame} fps={fps} />
            <Stat label="PROPRIÉTAIRES" value="01" delay={46} frame={frame} fps={fps} />
          </div>
          <Bars frame={frame} fps={fps} delay={48} color={palette.accent} />
        </Card>
      </div>
    </AbsoluteFill>
  );
};
