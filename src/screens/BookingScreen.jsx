import { useState, useContext } from 'react'
import { VenaContext } from '../context.js'
import { Icon, TopBar } from '../components/shared.jsx'

export function BookingScreen({ go, partnerKey = "gp" }) {
  const { partners } = useContext(VenaContext);
  const p = partners.find(x => x.key === partnerKey) || partners[0];
  const [slot, setSlot] = useState(null);
  const [confirmed, setConfirmed] = useState(false);

  const days = ["Today", "Tomorrow", "Thu"];
  const times = ["4:30 PM", "5:15 PM", "6:00 PM", "7:30 PM"];
  const [day, setDay] = useState(0);

  if (confirmed) {
    return (
      <div className="screen" style={{ background:
        "radial-gradient(120% 60% at 50% 14%, var(--teal-tint) 0%, transparent 55%), var(--bg)" }}>
        <div className="pad-top" />
        <div className="screen-scroll" style={{ display: "flex", flexDirection: "column", alignItems: "center",
          justifyContent: "center", padding: "40px 30px", textAlign: "center" }}>
          <div className="rise" style={{ width: 92, height: 92, borderRadius: "50%", background: "var(--teal)", color: "#fff",
            display: "grid", placeItems: "center", marginBottom: 26, boxShadow: "0 12px 30px oklch(0.55 0.072 178 / .4)" }}>
            <Icon name="check" size={48} sw={2.4} />
          </div>
          <h1 className="display rise" style={{ animationDelay: ".06s", fontSize: 38, margin: "0 0 12px" }}>You're booked</h1>
          <p className="rise" style={{ animationDelay: ".12s", color: "var(--ink-2)", fontSize: 16, lineHeight: 1.5, maxWidth: 290 }}>
            {p.mode} with <b style={{ color: "var(--ink)" }}>{p.name}</b><br/>
            <span className="num">{days[day]}, {times[slot]}</span>
          </p>
          <div className="card rise" style={{ animationDelay: ".18s", width: "100%", maxWidth: 320, marginTop: 26,
            padding: 16, display: "flex", gap: 12, alignItems: "center", textAlign: "left" }}>
            <Icon name="shield" size={22} stroke="var(--teal)" />
            <span style={{ fontSize: 13.5, color: "var(--ink-2)", lineHeight: 1.4 }}>
              Your relevant markers are attached securely, so {p.name.split(" ")[0]} has full context before you meet.
            </span>
          </div>
        </div>
        <div className="pad-bot" style={{ padding: "12px 24px 40px", display: "flex", flexDirection: "column", gap: 11 }}>
          <button className="btn btn-teal btn-block" onClick={() => go("plan")}>Add to my plan <Icon name="arrow" size={20} /></button>
          <button className="btn btn-ghost btn-block" style={{ fontSize: 16 }} onClick={() => go("partners")}>Back to care team</button>
        </div>
      </div>
    );
  }

  return (
    <div className="screen">
      <div className="pad-top" />
      <TopBar onBack={() => go("partners")} kicker="Booking" />

      <div className="screen-scroll" style={{ padding: "8px 24px 0" }}>
        <div className="card" style={{ padding: 18, display: "flex", gap: 14, alignItems: "center", marginBottom: 8 }}>
          <div style={{ width: 54, height: 54, borderRadius: 16, flexShrink: 0, display: "grid", placeItems: "center",
            background: p.tint, color: p.color }}><Icon name={p.icon} size={28} /></div>
          <div style={{ flex: 1 }}>
            <div style={{ fontWeight: 600, fontSize: 18 }}>{p.name}</div>
            <div style={{ fontSize: 13.5, color: "var(--ink-2)" }}>{p.role} · {p.mode}</div>
          </div>
        </div>

        <div style={{ display: "flex", gap: 9, alignItems: "flex-start", margin: "16px 2px 22px",
          padding: "13px 15px", borderRadius: 14, background: p.tint }}>
          <Icon name="spark" size={17} stroke={p.color} style={{ flexShrink: 0, marginTop: 1 }} />
          <span style={{ fontSize: 14, color: "var(--ink)", lineHeight: 1.45 }}>{p.reason}</span>
        </div>

        <div className="kicker" style={{ margin: "0 2px 12px" }}>Pick a day</div>
        <div style={{ display: "flex", gap: 10, marginBottom: 22 }}>
          {days.map((d, i) => (
            <button key={d} onClick={() => { setDay(i); setSlot(null); }} style={{ flex: 1, padding: "13px 0",
              borderRadius: 15, border: "none", cursor: "pointer", fontWeight: 600, fontSize: 14.5,
              background: day === i ? "var(--ink)" : "var(--surface)", color: day === i ? "#fff" : "var(--ink)",
              boxShadow: "var(--shadow-sm)" }}>{d}</button>
          ))}
        </div>

        <div className="kicker" style={{ margin: "0 2px 12px" }}>Available times</div>
        <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 10 }}>
          {times.map((t, i) => {
            const on = slot === i;
            return (
              <button key={t} onClick={() => setSlot(i)} className="num" style={{ padding: "16px 0",
                borderRadius: 15, cursor: "pointer", fontWeight: 600, fontSize: 16,
                border: "1.5px solid " + (on ? "var(--teal)" : "var(--hair)"),
                background: on ? "var(--teal-tint)" : "var(--surface)", color: on ? "var(--teal-ink)" : "var(--ink)",
                boxShadow: on ? "none" : "var(--shadow-sm)", transition: "all .15s" }}>{t}</button>
            );
          })}
        </div>
      </div>

      <div className="pad-bot" style={{ padding: "14px 24px 38px",
        background: "linear-gradient(to top, var(--bg) 70%, transparent)" }}>
        <button className="btn btn-teal btn-block" disabled={slot === null}
          style={{ opacity: slot === null ? 0.4 : 1, pointerEvents: slot === null ? "none" : "auto" }}
          onClick={() => setConfirmed(true)}>
          {slot === null ? "Select a time" : <><Icon name="check" size={20} /> Confirm booking</>}
        </button>
      </div>
    </div>
  );
}
