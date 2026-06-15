import React from "react";
import { AbsoluteFill, useCurrentFrame, useVideoConfig, interpolate, spring } from "remotion";
import { serif, sans, palette } from "../theme";

const roles = [
  { icon: "👤", name: "Client", desc: "Réserve, vit l'expérience, donne son avis" },
  { icon: "🧭", name: "Guide", desc: "Crée des parcours, gère son agenda" },
  { icon: "🏛", name: "Propriétaire", desc: "Publie ses hébergements & suit son CA" },
  { icon: "👑", name: "Administrateur", desc: "Modération, statistiques, validations" },
];

const stats = [
  { label: "Chiffre d'affaires", v: 78 },
  { label: "Réservations", v: 92 },
  { label: "Avis 5★", v: 67 },
  { label: "Nouveaux guides", v: 45 },
];

export const SceneAccounts: React.FC = () => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();
  const headIn = spring({ frame, fps, config: { damping: 20 } });

  return (
    <AbsoluteFill style={{ background: palette.ivory, padding: 90 }}>
      <div style={{ fontFamily: sans, color: palette.accent, letterSpacing: 6, fontSize: 18, fontWeight: 600, opacity: headIn }}>
        QUATRE COMPTES · QUATRE TABLEAUX DE BORD
      </div>
      <div style={{ fontFamily: serif, fontSize: 100, color: palette.deep, fontWeight: 600, lineHeight: 1, marginTop: 10, opacity: headIn }}>
        Chacun son <span style={{ fontStyle: "italic", color: palette.accent }}>espace.</span>
      </div>

      <div style={{ display: "flex", gap: 60, marginTop: 60, flex: 1 }}>
        {/* roles list */}
        <div style={{ flex: 1, display: "flex", flexDirection: "column", justifyContent: "center", gap: 24 }}>
          {roles.map((r, i) => {
            const d = 16 + i * 8;
            const s = spring({ frame: frame - d, fps, config: { damping: 18 } });
            return (
              <div key={r.name} style={{
                display: "flex", alignItems: "center", gap: 24, padding: 22,
                background: "white", borderRadius: 14,
                opacity: s, transform: `translateX(${(1 - s) * -60}px)`,
                boxShadow: "0 10px 30px rgba(46,27,14,0.08)",
                border: `1px solid ${palette.cream}`,
              }}>
                <div style={{ fontSize: 44, width: 70, height: 70, borderRadius: "50%", background: palette.cream, display: "flex", alignItems: "center", justifyContent: "center" }}>{r.icon}</div>
                <div>
                  <div style={{ fontFamily: serif, fontSize: 32, color: palette.deep, fontWeight: 600 }}>{r.name}</div>
                  <div style={{ fontFamily: sans, fontSize: 18, color: palette.brown, marginTop: 4 }}>{r.desc}</div>
                </div>
              </div>
            );
          })}
        </div>

        {/* fake admin dashboard */}
        <div style={{
          flex: 1.1, background: "white", borderRadius: 18, padding: 36,
          boxShadow: "0 30px 70px rgba(46,27,14,0.15)",
          border: `1px solid ${palette.cream}`,
          opacity: spring({ frame: frame - 30, fps, config: { damping: 18 } }),
        }}>
          <div style={{ fontFamily: sans, fontSize: 14, letterSpacing: 3, color: palette.accent, fontWeight: 700 }}>DASHBOARD ADMIN</div>
          <div style={{ fontFamily: serif, fontSize: 36, color: palette.deep, fontWeight: 600, marginTop: 6 }}>Vue d'ensemble</div>

          {/* bar chart */}
          <div style={{ display: "flex", alignItems: "flex-end", gap: 24, marginTop: 40, height: 240, padding: "0 10px", borderBottom: `2px solid ${palette.cream}` }}>
            {stats.map((s, i) => {
              const d = 40 + i * 6;
              const h = interpolate(frame, [d, d + 24], [0, s.v * 2.2], { extrapolateRight: "clamp" });
              return (
                <div key={s.label} style={{ flex: 1, display: "flex", flexDirection: "column", alignItems: "center", gap: 8 }}>
                  <div style={{ fontFamily: sans, fontSize: 14, color: palette.brown }}>{Math.round(h / 2.2)}</div>
                  <div style={{ width: "100%", height: h, background: `linear-gradient(180deg, ${palette.sand}, ${palette.accent})`, borderRadius: "8px 8px 0 0" }} />
                </div>
              );
            })}
          </div>
          <div style={{ display: "flex", gap: 24, marginTop: 12 }}>
            {stats.map((s) => (
              <div key={s.label} style={{ flex: 1, textAlign: "center", fontFamily: sans, fontSize: 13, color: palette.brown }}>{s.label}</div>
            ))}
          </div>

          <div style={{
            marginTop: 30, padding: 18, background: palette.cream, borderRadius: 12,
            display: "flex", alignItems: "center", gap: 14,
            opacity: interpolate(frame, [70, 90], [0, 1], { extrapolateRight: "clamp" }),
          }}>
            <div style={{ width: 12, height: 12, borderRadius: "50%", background: "#c0392b" }} />
            <div style={{ fontFamily: sans, fontSize: 16, color: palette.deep }}>
              2 demandes de validation · 1 nouveau propriétaire
            </div>
          </div>
        </div>
      </div>
    </AbsoluteFill>
  );
};
