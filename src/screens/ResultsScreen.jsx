import { useContext, useEffect } from 'react'
import { VenaContext } from '../context.js'
import { STATUS } from '../data/scenarios.js'
import { Icon, StatusChip, RangeMeter, ScoreRing } from '../components/shared.jsx'
import { BottomNav } from './BottomNav.jsx'
import { useCountUp } from '../hooks.js'

export function ResultsScreen({ go }) {
  const sc = useContext(VenaContext);
  const { patient, biomarkers, score, hero, accent } = sc;
  const counts = biomarkers.reduce((a, b) => (a[b.status]++, a), { good: 0, watch: 0, alert: 0 });
  const heroM = biomarkers.find(b => b.key === hero.key) || biomarkers[0];
  const tone = hero.tone;
  const toneColor = STATUS[tone].color;
  const toneTintVar = tone === "alert" ? "--alert-tint" : tone === "watch" ? "--watch-tint" : "--good-tint";
  const shown = useCountUp(score);

  return (
    <div className="screen">
      <div className="screen-scroll pad-top" style={{ paddingBottom: 120 }}>
        <div style={{ padding: "10px 22px 4px", display: "flex", alignItems: "center", gap: 13 }}>
          <div style={{ width: 44, height: 44, borderRadius: "50%", background: "var(--teal)", color: "#fff",
            display: "grid", placeItems: "center", fontWeight: 700, fontSize: 19 }}>{patient.initial}</div>
          <div style={{ flex: 1 }}>
            <div style={{ fontWeight: 600, fontSize: 17 }}>Good afternoon, {patient.name}</div>
            <div className="num" style={{ fontSize: 11.5, color: "var(--ink-3)" }}>{patient.panel} · {patient.sampleDate}</div>
          </div>
          <button style={{ width: 40, height: 40, borderRadius: "50%", border: "none", background: "var(--surface)",
            boxShadow: "var(--shadow-sm)", display: "grid", placeItems: "center", color: "var(--ink)", cursor: "pointer" }}>
            <Icon name="bell" size={20} />
          </button>
        </div>

        <div style={{ padding: "16px 22px 0" }}>
          <div className="card" style={{ padding: "20px 22px", display: "flex", alignItems: "center", gap: 20 }}>
            <ScoreRing value={shown} size={104} stroke={9} color={accent}>
              <div className="num" style={{ fontSize: 30, fontWeight: 600, lineHeight: 1 }}>{shown}</div>
              <div style={{ fontSize: 10.5, color: "var(--ink-3)", marginTop: 2 }}>Vitality</div>
            </ScoreRing>
            <div style={{ flex: 1, display: "flex", flexDirection: "column", gap: 9 }}>
              {[["good", counts.good, "in range"], ["watch", counts.watch, "to watch"], ["alert", counts.alert, "need attention"]].map(([s, n, t]) => (
                <div key={s} style={{ display: "flex", alignItems: "center", gap: 9 }}>
                  <span className="num" style={{ width: 22, fontSize: 18, fontWeight: 600, color: STATUS[s].color }}>{n}</span>
                  <span style={{ height: 6, width: 6, borderRadius: "50%", background: STATUS[s].color }} />
                  <span style={{ fontSize: 14, color: "var(--ink-2)" }}>{t}</span>
                </div>
              ))}
            </div>
          </div>
        </div>

        <div style={{ padding: "14px 22px 0" }}>
          <button onClick={() => go("analysis")} className="rise" style={{ width: "100%", textAlign: "left",
            border: "none", cursor: "pointer", borderRadius: "var(--r-lg)", padding: 20,
            background: `linear-gradient(150% 120% at 100% 0%, var(${toneTintVar}), var(--surface) 70%)`,
            boxShadow: "var(--shadow-md)", position: "relative" }}>
            <div style={{ display: "flex", alignItems: "center", gap: 8, marginBottom: 12 }}>
              <span className={"chip chip-" + tone}><span className="dot" style={{ background: toneColor }} />{hero.chip}</span>
            </div>
            <div style={{ display: "flex", alignItems: "flex-end", gap: 12 }}>
              <div style={{ flex: 1 }}>
                <div style={{ fontSize: 13, color: "var(--ink-2)", marginBottom: 2 }}>{hero.label}</div>
                <div style={{ display: "flex", alignItems: "baseline", gap: 8 }}>
                  <span style={{ fontWeight: 700, fontSize: 21 }}>{heroM.name}</span>
                  <span className="num" style={{ fontSize: 26, fontWeight: 600, color: toneColor }}>{heroM.value}</span>
                  <span className="num" style={{ fontSize: 13, color: "var(--ink-3)" }}>{heroM.unit}</span>
                </div>
              </div>
              <div style={{ width: 38, height: 38, borderRadius: "50%", background: "var(--ink)", color: "#fff",
                display: "grid", placeItems: "center", flexShrink: 0 }}>
                <Icon name="spark" size={19} />
              </div>
            </div>
            <div style={{ marginTop: 13, paddingTop: 13, borderTop: "1px solid var(--hair)", display: "flex",
              alignItems: "center", justifyContent: "space-between", color: "var(--teal-ink)", fontWeight: 600, fontSize: 14.5 }}>
              See what Vena AI found <Icon name="arrow" size={18} />
            </div>
          </button>
        </div>

        <div style={{ padding: "26px 22px 6px", display: "flex", alignItems: "baseline", justifyContent: "space-between" }}>
          <h2 style={{ fontSize: 20, fontWeight: 700, margin: 0 }}>All markers</h2>
          <span className="num" style={{ fontSize: 12, color: "var(--ink-3)" }}>{biomarkers.length} of {patient.panel.match(/\d+/)} shown</span>
        </div>

        <div style={{ padding: "0 22px", display: "flex", flexDirection: "column", gap: 11 }}>
          {biomarkers.map(b => (
            <div key={b.key} className="card" style={{ padding: "16px 18px" }}>
              <div style={{ display: "flex", alignItems: "flex-start", justifyContent: "space-between", gap: 10 }}>
                <div>
                  <div style={{ fontWeight: 600, fontSize: 16.5 }}>{b.name}</div>
                  <div style={{ fontSize: 12.5, color: "var(--ink-3)" }}>{b.full}</div>
                </div>
                <StatusChip s={b.status} />
              </div>
              <div style={{ display: "flex", alignItems: "baseline", gap: 7, margin: "12px 0 12px" }}>
                <span className="num" style={{ fontSize: 26, fontWeight: 600,
                  color: b.status === "good" ? "var(--ink)" : STATUS[b.status].color }}>{b.value}</span>
                <span className="num" style={{ fontSize: 13, color: "var(--ink-3)" }}>{b.unit}</span>
                <span style={{ flex: 1 }} />
                <span className="num" style={{ fontSize: 12, color: "var(--ink-3)" }}>ref {b.ref}</span>
              </div>
              <RangeMeter pct={b.pct} band={b.band}
                color={b.status === "good" ? "var(--good)" : STATUS[b.status].color} />
            </div>
          ))}
        </div>
      </div>

      <BottomNav tab="results" go={go} />
    </div>
  );
}
