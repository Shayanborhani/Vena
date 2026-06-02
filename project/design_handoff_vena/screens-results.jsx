/* screens-results.jsx — results dashboard + AI analysis (the magic moment) */

/* shared bottom nav for the post-results app */
function BottomNav({ tab, go }) {
  const items = [
    { key: "plan",     label: "Today",   icon: "home" },
    { key: "results",  label: "Results", icon: "grid" },
    { key: "partners", label: "Care",    icon: "steth" },
  ];
  return (
    <div style={{ position: "absolute", left: 0, right: 0, bottom: 0, zIndex: 40, padding: "8px 16px 26px",
      background: "linear-gradient(to top, var(--bg) 62%, transparent)" }}>
      <div style={{ display: "flex", justifyContent: "space-around", alignItems: "center",
        background: "var(--surface)", borderRadius: 24, boxShadow: "var(--shadow-md)", padding: "9px 8px" }}>
        {items.map(it => {
          const on = tab === it.key;
          return (
            <button key={it.key} onClick={() => go(it.key)} style={{ border: "none", background: "none",
              cursor: "pointer", display: "flex", flexDirection: "column", alignItems: "center", gap: 4,
              padding: "5px 18px", color: on ? "var(--teal)" : "var(--ink-3)" }}>
              <Icon name={it.icon} size={23} sw={on ? 2.1 : 1.7} />
              <span style={{ fontSize: 11, fontWeight: on ? 700 : 500 }}>{it.label}</span>
            </button>
          );
        })}
      </div>
    </div>
  );
}

/* ───────────────────────── Results dashboard ───────────────────────── */
function ResultsScreen({ go }) {
  const { PATIENT, BIOMARKERS } = window.VENA;
  const counts = BIOMARKERS.reduce((a, b) => (a[b.status]++, a), { good: 0, watch: 0, alert: 0 });
  const alert = BIOMARKERS.find(b => b.status === "alert");

  return (
    <div className="screen">
      <div className="screen-scroll pad-top" style={{ paddingBottom: 120 }}>
        {/* header */}
        <div style={{ padding: "10px 22px 4px", display: "flex", alignItems: "center", gap: 13 }}>
          <div style={{ width: 44, height: 44, borderRadius: "50%", background: "var(--teal)", color: "#fff",
            display: "grid", placeItems: "center", fontWeight: 700, fontSize: 19 }}>{PATIENT.initial}</div>
          <div style={{ flex: 1 }}>
            <div style={{ fontWeight: 600, fontSize: 17 }}>Good afternoon, {PATIENT.name}</div>
            <div className="num" style={{ fontSize: 11.5, color: "var(--ink-3)" }}>{PATIENT.panel} · {PATIENT.sampleDate}</div>
          </div>
          <button style={{ width: 40, height: 40, borderRadius: "50%", border: "none", background: "var(--surface)",
            boxShadow: "var(--shadow-sm)", display: "grid", placeItems: "center", color: "var(--ink)", cursor: "pointer" }}>
            <Icon name="bell" size={20} />
          </button>
        </div>

        {/* snapshot */}
        <div style={{ padding: "16px 22px 0" }}>
          <div className="card" style={{ padding: "20px 22px", display: "flex", alignItems: "center", gap: 20 }}>
            <ScoreRing value={74} size={104} stroke={9}>
              <div className="num" style={{ fontSize: 30, fontWeight: 600, lineHeight: 1 }}>74</div>
              <div style={{ fontSize: 10.5, color: "var(--ink-3)", marginTop: 2 }}>Vitality</div>
            </ScoreRing>
            <div style={{ flex: 1, display: "flex", flexDirection: "column", gap: 9 }}>
              {[["good", counts.good, "in range"], ["watch", counts.watch, "to watch"], ["alert", counts.alert, "need attention"]].map(([s, n, t]) => (
                <div key={s} style={{ display: "flex", alignItems: "center", gap: 9 }}>
                  <span className="num" style={{ width: 22, fontSize: 18, fontWeight: 600, color: window.VENA.STATUS[s].color }}>{n}</span>
                  <span style={{ height: 6, width: 6, borderRadius: "50%", background: window.VENA.STATUS[s].color }} />
                  <span style={{ fontSize: 14, color: "var(--ink-2)" }}>{t}</span>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* hero attention card */}
        <div style={{ padding: "14px 22px 0" }}>
          <button onClick={() => go("analysis")} className="rise" style={{ width: "100%", textAlign: "left",
            border: "none", cursor: "pointer", borderRadius: "var(--r-lg)", padding: 20,
            background: "linear-gradient(150% 120% at 100% 0%, var(--alert-tint), var(--surface) 70%)",
            boxShadow: "var(--shadow-md)", position: "relative" }}>
            <div style={{ display: "flex", alignItems: "center", gap: 8, marginBottom: 12 }}>
              <span className="chip chip-alert"><span className="dot" style={{ background: "var(--alert)" }} />Needs attention soon</span>
            </div>
            <div style={{ display: "flex", alignItems: "flex-end", gap: 12 }}>
              <div style={{ flex: 1 }}>
                <div style={{ fontSize: 13, color: "var(--ink-2)", marginBottom: 2 }}>Your inflammation marker</div>
                <div style={{ display: "flex", alignItems: "baseline", gap: 8 }}>
                  <span style={{ fontWeight: 700, fontSize: 21 }}>{alert.name}</span>
                  <span className="num" style={{ fontSize: 26, fontWeight: 600, color: "var(--alert)" }}>{alert.value}</span>
                  <span className="num" style={{ fontSize: 13, color: "var(--ink-3)" }}>{alert.unit}</span>
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

        {/* all markers */}
        <div style={{ padding: "26px 22px 6px", display: "flex", alignItems: "baseline", justifyContent: "space-between" }}>
          <h2 style={{ fontSize: 20, fontWeight: 700, margin: 0 }}>All markers</h2>
          <span className="num" style={{ fontSize: 12, color: "var(--ink-3)" }}>{BIOMARKERS.length} of 32 shown</span>
        </div>

        <div style={{ padding: "0 22px", display: "flex", flexDirection: "column", gap: 11 }}>
          {BIOMARKERS.map(b => (
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
                  color: b.status === "good" ? "var(--ink)" : window.VENA.STATUS[b.status].color }}>{b.value}</span>
                <span className="num" style={{ fontSize: 13, color: "var(--ink-3)" }}>{b.unit}</span>
                <span style={{ flex: 1 }} />
                <span className="num" style={{ fontSize: 12, color: "var(--ink-3)" }}>ref {b.ref}</span>
              </div>
              <RangeMeter pct={b.pct} band={b.band}
                color={b.status === "good" ? "var(--good)" : window.VENA.STATUS[b.status].color} />
            </div>
          ))}
        </div>
      </div>

      <BottomNav tab="results" go={go} />
    </div>
  );
}

/* ───────────────────────── AI Analysis — the magic moment ───────────────────────── */
function AnalysisScreen({ go }) {
  const { BIOMARKERS } = window.VENA;
  const linked = BIOMARKERS.filter(b => ["crp", "fer", "vitd"].includes(b.key));
  const [typed, setTyped] = React.useState(false);
  React.useEffect(() => { const t = setTimeout(() => setTyped(true), 250); return () => clearTimeout(t); }, []);

  return (
    <div className="screen">
      <div className="pad-top" />
      <TopBar onBack={() => go("results")} kicker="Vena AI" right={<Icon name="spark" size={20} stroke="var(--teal)" />} />

      <div className="screen-scroll" style={{ padding: "10px 24px 0" }}>
        {/* AI intro line */}
        <div className="screen-enter" style={{ display: "flex", gap: 12, alignItems: "flex-start", margin: "8px 0 22px" }}>
          <div style={{ width: 38, height: 38, borderRadius: "50%", flexShrink: 0,
            background: "var(--ink)", color: "#fff", display: "grid", placeItems: "center" }}>
            <Icon name="spark" size={20} />
          </div>
          <div style={{ fontSize: 17, lineHeight: 1.45, color: "var(--ink)", paddingTop: 2 }}>
            Hi Maya — I read all 32 markers. Here’s the one story that ties your results together.
          </div>
        </div>

        {/* headline finding */}
        <h1 className="display" style={{ fontSize: 33, lineHeight: 1.05, margin: "0 0 14px" }}>
          Your body is showing <span style={{ color: "var(--alert)" }}>active inflammation</span>, likely linked to low iron.
        </h1>

        {/* connected markers */}
        <div className="card" style={{ padding: "16px 18px", margin: "6px 0 18px" }}>
          <div className="kicker" style={{ marginBottom: 12 }}>The signals I connected</div>
          <div style={{ display: "flex", flexDirection: "column", gap: 14 }}>
            {linked.map(b => (
              <div key={b.key} style={{ display: "flex", alignItems: "center", gap: 12 }}>
                <span style={{ width: 8, height: 8, borderRadius: "50%", flexShrink: 0,
                  background: window.VENA.STATUS[b.status].color }} />
                <span style={{ flex: 1, fontSize: 15, fontWeight: 500 }}>{b.name}</span>
                <span className="num" style={{ fontSize: 15.5, fontWeight: 600, whiteSpace: "nowrap",
                  color: window.VENA.STATUS[b.status].color }}>{b.value}<span style={{ fontSize: 11, color: "var(--ink-3)", fontWeight: 400, marginLeft: 3 }}>{b.unit}</span></span>
                <StatusChip s={b.status} />
              </div>
            ))}
          </div>
        </div>

        {/* plain language */}
        <div style={{ fontSize: 16, lineHeight: 1.62, color: "var(--ink-2)", margin: "0 2px 20px" }}>
          <p style={{ margin: "0 0 14px" }}>
            Your <b style={{ color: "var(--ink)" }}>hs-CRP is more than 2× the upper limit</b>. On its own that’s a flag; alongside your
            low ferritin and vitamin D, it points to an inflammatory process your body is actively fighting.
          </p>
          <p style={{ margin: 0 }}>
            This isn’t something to self-treat. It’s worth having a clinician look within <b style={{ color: "var(--ink)" }}>the next 48 hours</b> —
            and there are smaller things you can start on today.
          </p>
        </div>

        {/* what to do */}
        <div className="kicker" style={{ margin: "4px 2px 12px" }}>What I’d do, in order</div>
        <div style={{ display: "flex", flexDirection: "column", gap: 10, marginBottom: 10 }}>
          {[
            { ic: "video", c: "var(--alert)", t: "Talk to a doctor", d: "Within 48h about your CRP — bookable now." },
            { ic: "leaf",  c: "var(--good)",  t: "Rebuild your iron", d: "A dietitian can plan around your ferritin." },
            { ic: "pill",  c: "var(--teal)",  t: "Lift your vitamin D", d: "A targeted D3+K2 dose, delivered." },
          ].map((s, i) => (
            <div key={i} className="card" style={{ padding: "14px 16px", display: "flex", alignItems: "center", gap: 14 }}>
              <div style={{ width: 26, height: 26, flexShrink: 0 }} className="num">
                <span style={{ color: "var(--ink-3)", fontSize: 14, fontWeight: 600 }}>0{i + 1}</span>
              </div>
              <div style={{ width: 40, height: 40, borderRadius: 12, flexShrink: 0, display: "grid", placeItems: "center",
                background: "color-mix(in oklch, " + s.c + " 12%, white)", color: s.c }}>
                <Icon name={s.ic} size={21} />
              </div>
              <div style={{ flex: 1 }}>
                <div style={{ fontWeight: 600, fontSize: 15.5 }}>{s.t}</div>
                <div style={{ fontSize: 13, color: "var(--ink-2)" }}>{s.d}</div>
              </div>
            </div>
          ))}
        </div>

        <div style={{ fontSize: 11.5, color: "var(--ink-3)", lineHeight: 1.45, margin: "14px 4px 0", textAlign: "center" }}>
          Vena AI offers guidance, not a diagnosis. Always confirm with a clinician.
        </div>
      </div>

      <div className="pad-bot" style={{ padding: "12px 24px 38px",
        background: "linear-gradient(to top, var(--bg) 70%, transparent)" }}>
        <button className="btn btn-teal btn-block" onClick={() => go("partners")}>
          See who can help <Icon name="arrow" size={20} />
        </button>
      </div>
    </div>
  );
}

Object.assign(window, { BottomNav, ResultsScreen, AnalysisScreen });
