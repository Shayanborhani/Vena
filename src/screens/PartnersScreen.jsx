import { useContext } from 'react'
import { VenaContext } from '../context.js'
import { Icon } from '../components/shared.jsx'
import { BottomNav } from './BottomNav.jsx'

function PartnerCard({ p, hero, go }) {
  return (
    <button onClick={() => go("booking", { partnerKey: p.key })} style={{ width: "100%", textAlign: "left",
      border: "none", cursor: "pointer", borderRadius: "var(--r-lg)", padding: 0, background: "var(--surface)",
      boxShadow: hero ? "var(--shadow-md)" : "var(--shadow-sm)", overflow: "hidden",
      outline: hero ? "1.5px solid " + p.color : "none" }}>
      {hero && (
        <div style={{ background: p.color, color: "#fff", fontSize: 12, fontWeight: 700,
          letterSpacing: "0.03em", padding: "7px 18px", display: "flex", alignItems: "center", gap: 7 }}>
          <Icon name="clock" size={15} sw={2.2} /> {p.badge}
        </div>
      )}
      <div style={{ padding: 18 }}>
        <div style={{ display: "flex", gap: 14, alignItems: "center" }}>
          <div style={{ width: 50, height: 50, borderRadius: 15, flexShrink: 0, display: "grid", placeItems: "center",
            background: p.tint, color: p.color }}>
            <Icon name={p.icon} size={26} />
          </div>
          <div style={{ flex: 1 }}>
            <div style={{ fontWeight: 600, fontSize: 17 }}>{p.name}</div>
            <div style={{ fontSize: 13, color: "var(--ink-2)" }}>{p.role}</div>
          </div>
          <div style={{ display: "flex", alignItems: "center", gap: 3, color: "var(--ink-2)", fontSize: 13 }}>
            <Icon name="star" size={14} stroke="var(--watch)" /> <span className="num">{p.rating}</span>
          </div>
        </div>

        <div style={{ display: "flex", gap: 9, alignItems: "flex-start", margin: "14px 0 14px",
          padding: "11px 13px", borderRadius: 13, background: "var(--surface-2)" }}>
          <Icon name="spark" size={16} stroke="var(--teal)" style={{ flexShrink: 0, marginTop: 1 }} />
          <span style={{ fontSize: 13.5, color: "var(--ink-2)", lineHeight: 1.4 }}>{p.reason}</span>
        </div>

        <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between" }}>
          <div style={{ display: "flex", alignItems: "center", gap: 7, fontSize: 13.5, color: "var(--ink-2)" }}>
            <Icon name="calendar" size={16} stroke={p.color} /> <span className="num">{p.eta}</span>
          </div>
          <span style={{ display: "inline-flex", alignItems: "center", gap: 6, fontWeight: 600, fontSize: 14.5,
            color: hero ? p.color : "var(--teal-ink)" }}>
            {hero ? "Book consult" : "Open"} <Icon name="arrow" size={17} />
          </span>
        </div>
      </div>
    </button>
  );
}

export function PartnersScreen({ go }) {
  const { partners } = useContext(VenaContext);
  const urgent = partners.find(p => p.urgent);
  const rest = partners.filter(p => !p.urgent);

  return (
    <div className="screen">
      <div className="screen-scroll pad-top" style={{ paddingBottom: 120 }}>
        <div style={{ padding: "12px 22px 0" }}>
          <div className="kicker">Matched to your results</div>
          <h1 className="display" style={{ fontSize: 38, margin: "8px 0 6px" }}>Your care team</h1>
          <p style={{ color: "var(--ink-2)", fontSize: 15.5, lineHeight: 1.5, margin: "0 0 20px" }}>
            Partners picked for what your panel actually showed—in the order I'd tackle them.
          </p>
        </div>

        <div style={{ padding: "0 22px", display: "flex", flexDirection: "column", gap: 14 }}>
          {urgent && <PartnerCard p={urgent} hero go={go} />}
          <div className="kicker" style={{ margin: "8px 2px 0" }}>Then, this week</div>
          {rest.map(p => <PartnerCard key={p.key} p={p} go={go} />)}
        </div>
      </div>
      <BottomNav tab="partners" go={go} />
    </div>
  );
}
