/* components.jsx — Vena shared UI, icons, and data */

/* ───────────────────────── Icons (simple line set) ───────────────────────── */
function Icon({ name, size = 24, stroke = "currentColor", sw = 1.8, style = {} }) {
  const p = { fill: "none", stroke, strokeWidth: sw, strokeLinecap: "round", strokeLinejoin: "round" };
  const paths = {
    drop:    <path d="M12 3.2C12 3.2 5.5 10 5.5 14.6a6.5 6.5 0 0 0 13 0C18.5 10 12 3.2 12 3.2Z" {...p} />,
    arrow:   <g {...p}><path d="M5 12h13"/><path d="M13 6l6 6-6 6"/></g>,
    chev:    <path d="M9 5l7 7-7 7" {...p} />,
    chevDown:<path d="M5 9l7 7 7-7" {...p} />,
    back:    <path d="M14 5l-7 7 7 7" {...p} />,
    check:   <path d="M5 12.5l4.5 4.5L19 7" {...p} />,
    spark:   <g {...p}><path d="M12 3l1.8 5.2L19 10l-5.2 1.8L12 17l-1.8-5.2L5 10l5.2-1.8L12 3Z"/></g>,
    pulse:   <path d="M3 12h4l2.5-6 4 13 2.5-7H21" {...p} />,
    calendar:<g {...p}><rect x="3.5" y="5" width="17" height="15.5" rx="3"/><path d="M3.5 9.5h17M8 3v4M16 3v4"/></g>,
    dumbbell:<g {...p}><path d="M6.5 8.5v7M3.5 10v4M17.5 8.5v7M20.5 10v4M6.5 12h11"/></g>,
    leaf:    <g {...p}><path d="M5 19c0-8 6-13 14-13 0 8-5 14-14 13Z"/><path d="M9 15c2-3 4.5-4.5 7-5.5"/></g>,
    pill:    <g {...p}><rect x="3.5" y="9" width="17" height="6" rx="3" transform="rotate(-45 12 12)"/><path d="M8.5 8.5l7 7"/></g>,
    steth:   <g {...p}><path d="M6 4v5a4 4 0 0 0 8 0V4"/><path d="M6 4H4.5M14 4h1.5M10 17v0a4 4 0 0 0 8 0v-2.5"/><circle cx="18" cy="11.5" r="2"/></g>,
    clock:   <g {...p}><circle cx="12" cy="12" r="8.5"/><path d="M12 7.5V12l3 2"/></g>,
    shield:  <g {...p}><path d="M12 3.5l7 2.5v5c0 5-3.2 8.2-7 9.5-3.8-1.3-7-4.5-7-9.5v-5l7-2.5Z"/><path d="M9 12l2 2 4-4.5"/></g>,
    flask:   <g {...p}><path d="M9 3v6L4.5 18a2 2 0 0 0 1.8 3h11.4a2 2 0 0 0 1.8-3L15 9V3"/><path d="M8 3h8M7.5 14h9"/></g>,
    bell:    <g {...p}><path d="M6 9a6 6 0 0 1 12 0c0 5 1.5 6 1.5 6H4.5S6 14 6 9Z"/><path d="M10 19a2 2 0 0 0 4 0"/></g>,
    user:    <g {...p}><circle cx="12" cy="8.5" r="3.8"/><path d="M5 20c0-3.6 3.1-6 7-6s7 2.4 7 6"/></g>,
    video:   <g {...p}><rect x="3" y="6" width="12" height="12" rx="3"/><path d="M15 10l6-3v10l-6-3"/></g>,
    map:     <g {...p}><path d="M12 21s7-6.2 7-11a7 7 0 1 0-14 0c0 4.8 7 11 7 11Z"/><circle cx="12" cy="10" r="2.5"/></g>,
    home:    <g {...p}><path d="M4 11l8-7 8 7"/><path d="M6 9.5V20h12V9.5"/></g>,
    grid:    <g {...p}><rect x="4" y="4" width="7" height="7" rx="2"/><rect x="13" y="4" width="7" height="7" rx="2"/><rect x="4" y="13" width="7" height="7" rx="2"/><rect x="13" y="13" width="7" height="7" rx="2"/></g>,
    plus:    <g {...p}><path d="M12 5v14M5 12h14"/></g>,
    star:    <path d="M12 4l2.3 5.1 5.6.5-4.2 3.7 1.3 5.5L12 16.9 7 18.8l1.3-5.5L4.1 9.6l5.6-.5L12 4Z" {...p} />,
  };
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" style={style} aria-hidden="true">
      {paths[name] || null}
    </svg>
  );
}

/* Vena logomark — a drop with a routing notch */
function Logo({ size = 34, color = "var(--teal)" }) {
  return (
    <svg width={size} height={size} viewBox="0 0 40 40" aria-label="Vena">
      <path d="M20 4.5C20 4.5 8 16 8 25.2a12 12 0 0 0 24 0C32 16 20 4.5 20 4.5Z"
            fill="none" stroke={color} strokeWidth="2.4" />
      <path d="M14.5 25.5h4l2-4 3 8 1.8-4h2.2" fill="none" stroke={color}
            strokeWidth="2.4" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}

/* ───────────────────────── Status helpers ───────────────────────── */
const STATUS = {
  good:  { label: "In range",  cls: "chip-good",  color: "var(--good)"  },
  watch: { label: "Watch",     cls: "chip-watch", color: "var(--watch)" },
  alert: { label: "Attention", cls: "chip-alert", color: "var(--alert)" },
};

function StatusChip({ s }) {
  const m = STATUS[s];
  return (
    <span className={"chip " + m.cls}>
      <span className="dot" style={{ background: m.color }} />
      {m.label}
    </span>
  );
}

/* range meter: value position along a 0..1 track with optimal band */
function RangeMeter({ pct, band = [0.35, 0.65], color = "var(--ink)" }) {
  return (
    <div style={{ position: "relative", height: 6, borderRadius: 9999, background: "var(--surface-2)", overflow: "visible" }}>
      <div style={{ position: "absolute", top: 0, bottom: 0, left: `${band[0]*100}%`, width: `${(band[1]-band[0])*100}%`,
                    background: "var(--good-tint)", borderRadius: 9999 }} />
      <div style={{ position: "absolute", top: "50%", left: `${pct*100}%`, transform: "translate(-50%,-50%)",
                    width: 13, height: 13, borderRadius: "50%", background: color,
                    boxShadow: "0 0 0 3px var(--surface), 0 1px 4px rgba(0,0,0,.18)" }} />
    </div>
  );
}

/* circular score ring */
function ScoreRing({ value, size = 132, stroke = 11, color = "var(--teal)", track = "var(--surface-2)", children }) {
  const r = (size - stroke) / 2;
  const c = 2 * Math.PI * r;
  const off = c * (1 - value / 100);
  return (
    <div style={{ position: "relative", width: size, height: size }}>
      <svg width={size} height={size} style={{ transform: "rotate(-90deg)" }}>
        <circle cx={size/2} cy={size/2} r={r} fill="none" stroke={track} strokeWidth={stroke} />
        <circle cx={size/2} cy={size/2} r={r} fill="none" stroke={color} strokeWidth={stroke}
                strokeLinecap="round" strokeDasharray={c} strokeDashoffset={off}
                style={{ transition: "stroke-dashoffset 1.1s cubic-bezier(.2,.8,.2,1)" }} />
      </svg>
      <div style={{ position: "absolute", inset: 0, display: "flex", flexDirection: "column",
                    alignItems: "center", justifyContent: "center" }}>{children}</div>
    </div>
  );
}

/* progress dots for linear flow */
function Steps({ n, i }) {
  return (
    <div style={{ display: "flex", gap: 6 }}>
      {Array.from({ length: n }).map((_, k) => (
        <div key={k} style={{ height: 4, borderRadius: 9999, flex: k === i ? 2.4 : 1,
          background: k <= i ? "var(--teal)" : "var(--hair)", transition: "all .4s" }} />
      ))}
    </div>
  );
}

/* top bar with back + step */
function TopBar({ onBack, right, kicker }) {
  return (
    <div style={{ display: "flex", alignItems: "center", gap: 12, padding: "8px 20px 4px" }}>
      {onBack ? (
        <button onClick={onBack} style={{ width: 38, height: 38, borderRadius: "50%", border: "none",
          background: "var(--surface)", boxShadow: "var(--shadow-sm)", display: "grid", placeItems: "center",
          cursor: "pointer", color: "var(--ink)" }}>
          <Icon name="back" size={20} />
        </button>
      ) : <div style={{ width: 38 }} />}
      {kicker && <div className="kicker" style={{ flex: 1, textAlign: "center" }}>{kicker}</div>}
      <div style={{ width: 38, display: "flex", justifyContent: "flex-end" }}>{right}</div>
    </div>
  );
}

/* ───────────────────────── App data ───────────────────────── */
const PATIENT = { name: "Maya", initial: "M", sampleDate: "May 30", panel: "Vena Essential — 32 markers" };

const BIOMARKERS = [
  { key: "crp",  name: "hs-CRP",        full: "C-reactive protein", value: "6.8", unit: "mg/L", ref: "< 3.0", status: "alert", pct: 0.86, band: [0,0.4],
    note: "Marker of inflammation in the body." },
  { key: "fer",  name: "Ferritin",     full: "Iron stores",        value: "18",  unit: "ng/mL", ref: "30–200", status: "watch", pct: 0.14, band: [0.25,0.85],
    note: "How much iron your body has banked." },
  { key: "vitd", name: "Vitamin D",    full: "25-OH vitamin D",    value: "21",  unit: "ng/mL", ref: "30–60", status: "watch", pct: 0.2, band: [0.45,0.85],
    note: "Affects energy, immunity and bone health." },
  { key: "ldl",  name: "LDL",          full: "LDL cholesterol",    value: "143", unit: "mg/dL", ref: "< 100", status: "watch", pct: 0.72, band: [0,0.5],
    note: "The 'lower-is-better' cholesterol." },
  { key: "hba1c",name: "HbA1c",        full: "Avg. blood sugar",   value: "5.2", unit: "%", ref: "< 5.7", status: "good", pct: 0.42, band: [0.2,0.7],
    note: "Your average blood sugar over 3 months." },
  { key: "tsh",  name: "TSH",          full: "Thyroid",            value: "1.9", unit: "mIU/L", ref: "0.4–4.0", status: "good", pct: 0.45, band: [0.2,0.8],
    note: "How hard your thyroid is working." },
];

const PARTNERS = [
  { key: "gp", type: "doctor", urgent: true, name: "Dr. Lena Hoffmann", role: "General practitioner",
    mode: "Video consult", icon: "video", color: "var(--alert)", tint: "var(--alert-tint)",
    eta: "Today, soonest 4:30 PM", rating: "4.9", reason: "Your elevated hs-CRP should be reviewed by a clinician within 48h.",
    badge: "Recommended first" },
  { key: "nutri", type: "nutrition", name: "Sofia Berg, RD", role: "Registered dietitian",
    mode: "Video or in person", icon: "leaf", color: "var(--good)", tint: "var(--good-tint)",
    eta: "This week", rating: "4.8", reason: "Iron-forward plan to rebuild your ferritin stores." },
  { key: "gym", type: "fitness", name: "Nordpuls Studio", role: "Coached strength & zone-2",
    mode: "2 min away", icon: "dumbbell", color: "var(--teal)", tint: "var(--teal-tint)",
    eta: "Drop-in tomorrow", rating: "4.7", reason: "Steady movement helps bring LDL and inflammation down." },
  { key: "pharm", type: "pharmacy", name: "Vena Pharmacy", role: "Vitamin D3 + K2, delivered",
    mode: "Ships tomorrow", icon: "pill", color: "var(--teal)", tint: "var(--teal-tint)",
    eta: "Arrives in 1–2 days", rating: "4.9", reason: "Targeted dose to lift your vitamin D into range." },
];

window.VENA = { PATIENT, BIOMARKERS, PARTNERS, STATUS };
Object.assign(window, { Icon, Logo, StatusChip, RangeMeter, ScoreRing, Steps, TopBar });
