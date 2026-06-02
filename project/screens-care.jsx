/* screens-care.jsx — partner matching → booking → plan */

/* ───────────────────────── Partner matching ───────────────────────── */
function PartnersScreen({ go }) {
  const { partners: PARTNERS } = React.useContext(window.VenaContext);
  const urgent = PARTNERS.find(p => p.urgent);
  const rest = PARTNERS.filter(p => !p.urgent);

  const PartnerCard = ({ p, hero }) => (
    <button onClick={() => go("booking", { partnerKey: p.key })} style={{ width: "100%", textAlign: "left",
      border: "none", cursor: "pointer", borderRadius: "var(--r-lg)", padding: 0, background: "var(--surface)",
      boxShadow: hero ? "var(--shadow-md)" : "var(--shadow-sm)", overflow: "hidden",
      outline: hero ? "1.5px solid var(--alert)" : "none" }}>
      {hero && (
        <div style={{ background: "var(--alert)", color: "#fff", fontSize: 12, fontWeight: 700,
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
            color: hero ? "var(--alert)" : "var(--teal-ink)" }}>
            {hero ? "Book consult" : "Open"} <Icon name="arrow" size={17} />
          </span>
        </div>
      </div>
    </button>
  );

  return (
    <div className="screen">
      <div className="screen-scroll pad-top" style={{ paddingBottom: 120 }}>
        <div style={{ padding: "12px 22px 0" }}>
          <div className="kicker">Matched to your results</div>
          <h1 className="display" style={{ fontSize: 38, margin: "8px 0 6px" }}>Your care team</h1>
          <p style={{ color: "var(--ink-2)", fontSize: 15.5, lineHeight: 1.5, margin: "0 0 20px" }}>
            Partners picked for what your panel actually showed—in the order I’d tackle them.
          </p>
        </div>

        <div style={{ padding: "0 22px", display: "flex", flexDirection: "column", gap: 14 }}>
          <PartnerCard p={urgent} hero />
          <div className="kicker" style={{ margin: "8px 2px 0" }}>Then, this week</div>
          {rest.map(p => <PartnerCard key={p.key} p={p} />)}
        </div>
      </div>
      <BottomNav tab="partners" go={go} />
    </div>
  );
}

/* ───────────────────────── Booking ───────────────────────── */
function BookingScreen({ go, partnerKey = "gp" }) {
  const { partners: PARTNERS } = React.useContext(window.VenaContext);
  const p = PARTNERS.find(x => x.key === partnerKey) || PARTNERS[0];
  const [slot, setSlot] = React.useState(null);
  const [confirmed, setConfirmed] = React.useState(false);

  const days = ["Today", "Tomorrow", "Thu"];
  const times = ["4:30 PM", "5:15 PM", "6:00 PM", "7:30 PM"];
  const [day, setDay] = React.useState(0);

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
          <h1 className="display rise" style={{ animationDelay: ".06s", fontSize: 38, margin: "0 0 12px" }}>You’re booked</h1>
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
          {slot === null ? "Select a time" : <>Confirm booking <Icon name="check" size={20} /></>}
        </button>
      </div>
    </div>
  );
}

/* ───────────────────────── Plan / Today ───────────────────────── */
function PlanScreen({ go }) {
  const sc = React.useContext(window.VenaContext);
  const appt = sc.partners.find(p => p.urgent) || sc.partners[0];
  const [tasks, setTasks] = React.useState(
    sc.finding.actions.map((a, i) => ({ t: a.t, d: a.d, done: i === sc.finding.actions.length - 1 }))
  );
  const toggle = i => setTasks(ts => ts.map((x, k) => k === i ? { ...x, done: !x.done } : x));
  const doneN = tasks.filter(t => t.done).length;

  return (
    <div className="screen">
      <div className="screen-scroll pad-top" style={{ paddingBottom: 120 }}>
        <div style={{ padding: "12px 22px 0" }}>
          <div className="kicker">Monday, June 2</div>
          <h1 className="display" style={{ fontSize: 38, margin: "8px 0 18px" }}>Today’s plan</h1>
        </div>

        {/* upcoming appointment */}
        <div style={{ padding: "0 22px" }}>
          <div className="kicker" style={{ margin: "0 2px 10px" }}>Upcoming</div>
          <div className="card" style={{ padding: 18, display: "flex", gap: 14, alignItems: "center",
            outline: "1.5px solid " + appt.color }}>
            <div style={{ width: 50, height: 50, borderRadius: 15, flexShrink: 0, display: "grid", placeItems: "center",
              background: appt.tint, color: appt.color }}><Icon name={appt.icon} size={25} /></div>
            <div style={{ flex: 1 }}>
              <div style={{ fontWeight: 600, fontSize: 16.5 }}>{appt.name}</div>
              <div className="num" style={{ fontSize: 13.5, color: "var(--ink-2)" }}>{appt.mode} · Today, 4:30 PM</div>
            </div>
            <button style={{ border: "none", background: appt.color, color: "#fff", fontWeight: 600,
              fontSize: 14, padding: "10px 16px", borderRadius: 12, cursor: "pointer" }}>Join</button>
          </div>
        </div>

        {/* checklist */}
        <div style={{ padding: "24px 22px 0" }}>
          <div style={{ display: "flex", alignItems: "baseline", justifyContent: "space-between", margin: "0 2px 10px" }}>
            <div className="kicker">Action items</div>
            <span className="num" style={{ fontSize: 12, color: "var(--ink-3)" }}>{doneN}/{tasks.length} done</span>
          </div>
          <div className="card" style={{ overflow: "hidden" }}>
            {tasks.map((task, i) => (
              <button key={i} onClick={() => toggle(i)} style={{ width: "100%", textAlign: "left", border: "none",
                background: "none", cursor: "pointer", display: "flex", alignItems: "center", gap: 14,
                padding: "15px 18px", borderTop: i ? "1px solid var(--hair-soft)" : "none" }}>
                <span style={{ width: 26, height: 26, borderRadius: "50%", flexShrink: 0, display: "grid", placeItems: "center",
                  border: task.done ? "none" : "2px solid var(--hair)", background: task.done ? "var(--teal)" : "transparent",
                  color: "#fff" }}>{task.done && <Icon name="check" size={16} sw={2.6} />}</span>
                <div style={{ flex: 1 }}>
                  <div style={{ fontWeight: 600, fontSize: 15.5, color: task.done ? "var(--ink-3)" : "var(--ink)",
                    textDecoration: task.done ? "line-through" : "none" }}>{task.t}</div>
                  <div style={{ fontSize: 13, color: "var(--ink-3)" }}>{task.d}</div>
                </div>
              </button>
            ))}
          </div>
        </div>

        {/* retest reminder */}
        <div style={{ padding: "20px 22px 0" }}>
          <div className="card" style={{ padding: 18, display: "flex", gap: 14, alignItems: "center",
            background: "linear-gradient(140% 120% at 100% 0%, var(--teal-tint), var(--surface) 75%)" }}>
            <div style={{ width: 46, height: 46, borderRadius: 14, flexShrink: 0, display: "grid", placeItems: "center",
              background: "var(--surface)", color: "var(--teal)", boxShadow: "var(--shadow-sm)" }}>
              <Icon name="flask" size={23} />
            </div>
            <div style={{ flex: 1 }}>
              <div style={{ fontWeight: 600, fontSize: 15.5 }}>Retest in 8 weeks</div>
              <div style={{ fontSize: 13, color: "var(--ink-2)" }}>We’ll mail a kit so you can track your progress.</div>
            </div>
            <Icon name="chev" size={18} stroke="var(--ink-3)" />
          </div>
        </div>
      </div>
      <BottomNav tab="plan" go={go} />
    </div>
  );
}

Object.assign(window, { PartnersScreen, BookingScreen, PlanScreen });
