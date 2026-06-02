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

/* ───────────────────────── Rich text (**bold**, [[accent]]) ───────────────────────── */
function RichText({ text, accent = "var(--alert)" }) {
  const out = [];
  const re = /(\*\*[^*]+\*\*|\[\[[^\]]+\]\])/g;
  let last = 0, m, i = 0;
  while ((m = re.exec(text)) !== null) {
    if (m.index > last) out.push(text.slice(last, m.index));
    const tok = m[0];
    if (tok.startsWith("**")) out.push(<b key={i++} style={{ color: "var(--ink)", fontWeight: 600 }}>{tok.slice(2, -2)}</b>);
    else out.push(<span key={i++} style={{ color: accent }}>{tok.slice(2, -2)}</span>);
    last = m.index + tok.length;
  }
  if (last < text.length) out.push(text.slice(last));
  return <React.Fragment>{out}</React.Fragment>;
}

/* ───────────────────────── Onboarding symptoms ───────────────────────── */
const SYMPTOMS = [
  { key: "energy", label: "Low energy",  icon: "drop" },
  { key: "stress", label: "Stressed",    icon: "pulse" },
  { key: "sleep",  label: "Poor sleep",  icon: "clock" },
  { key: "fog",    label: "Brain fog",   icon: "spark" },
  { key: "active", label: "Training hard",icon: "dumbbell" },
  { key: "great",  label: "Feeling great",icon: "check" },
];

/* ───────────────────────── Scenarios ───────────────────────── */
const SCENARIOS = {
  acute: {
    label: "Acute finding",
    patient: { name: "Maya", initial: "M", sampleDate: "May 30", panel: "Vena Essential — 32 markers" },
    score: 74, accent: "var(--alert)",
    hero: { label: "Your inflammation marker", key: "crp", chip: "Needs attention soon", tone: "alert" },
    biomarkers: [
      { key: "crp",  name: "hs-CRP",   full: "C-reactive protein", value: "6.8", unit: "mg/L", ref: "< 3.0",  status: "alert", pct: 0.86, band: [0,0.4] },
      { key: "fer",  name: "Ferritin", full: "Iron stores",        value: "18",  unit: "ng/mL",ref: "30–200", status: "watch", pct: 0.14, band: [0.25,0.85] },
      { key: "vitd", name: "Vitamin D",full: "25-OH vitamin D",    value: "21",  unit: "ng/mL",ref: "30–60",  status: "watch", pct: 0.2,  band: [0.45,0.85] },
      { key: "ldl",  name: "LDL",      full: "LDL cholesterol",    value: "143", unit: "mg/dL",ref: "< 100",  status: "watch", pct: 0.72, band: [0,0.5] },
      { key: "hba1c",name: "HbA1c",    full: "Avg. blood sugar",   value: "5.2", unit: "%",    ref: "< 5.7",  status: "good",  pct: 0.42, band: [0.2,0.7] },
      { key: "tsh",  name: "TSH",      full: "Thyroid",            value: "1.9", unit: "mIU/L",ref: "0.4–4.0",status: "good",  pct: 0.45, band: [0.2,0.8] },
    ],
    finding: {
      intro: "Hi {name} — I read all 32 markers. Here’s the one story that ties your results together.",
      headline: "Your body is showing [[active inflammation]], likely linked to low iron.",
      linked: ["crp", "fer", "vitd"],
      tieIn: (s) => s.includes("energy") ? "You told me your energy’s been low — that lines up with your iron and vitamin D."
                  : s.includes("fog")    ? "The brain fog you mentioned fits low iron and vitamin D." : null,
      paragraphs: [
        "Your **hs-CRP is more than 2× the upper limit**. On its own that’s a flag; alongside your low ferritin and vitamin D, it points to an inflammatory process your body is actively fighting.",
        "This isn’t something to self-treat. It’s worth having a clinician look within **the next 48 hours** — and there are smaller things you can start on today.",
      ],
      actions: [
        { ic: "video", c: "var(--alert)", t: "Talk to a doctor",   d: "Within 48h about your CRP — bookable now." },
        { ic: "leaf",  c: "var(--good)",  t: "Rebuild your iron",   d: "A dietitian can plan around your ferritin." },
        { ic: "pill",  c: "var(--teal)",  t: "Lift your vitamin D", d: "A targeted D3+K2 dose, delivered." },
      ],
    },
    partners: [
      { key: "gp", type: "doctor", urgent: true, name: "Dr. Lena Hoffmann", role: "General practitioner",
        mode: "Video consult", icon: "video", color: "var(--alert)", tint: "var(--alert-tint)",
        eta: "Today, soonest 4:30 PM", rating: "4.9", badge: "Recommended first",
        reason: "Your elevated hs-CRP should be reviewed by a clinician within 48h." },
      { key: "nutri", type: "nutrition", name: "Sofia Berg, RD", role: "Registered dietitian",
        mode: "Video or in person", icon: "leaf", color: "var(--good)", tint: "var(--good-tint)",
        eta: "This week", rating: "4.8", reason: "Iron-forward plan to rebuild your ferritin stores." },
      { key: "gym", type: "fitness", name: "Nordpuls Studio", role: "Coached strength & zone-2",
        mode: "2 min away", icon: "dumbbell", color: "var(--teal)", tint: "var(--teal-tint)",
        eta: "Drop-in tomorrow", rating: "4.7", reason: "Steady movement helps bring inflammation down." },
      { key: "pharm", type: "pharmacy", name: "Vena Pharmacy", role: "Vitamin D3 + K2, delivered",
        mode: "Ships tomorrow", icon: "pill", color: "var(--teal)", tint: "var(--teal-tint)",
        eta: "Arrives in 1–2 days", rating: "4.9", reason: "Targeted dose to lift your vitamin D into range." },
    ],
  },

  clear: {
    label: "All clear",
    patient: { name: "Maya", initial: "M", sampleDate: "May 30", panel: "Vena Essential — 32 markers" },
    score: 92, accent: "var(--good)",
    hero: { label: "Your standout marker", key: "vitd", chip: "Looking strong", tone: "good" },
    biomarkers: [
      { key: "crp",  name: "hs-CRP",   full: "C-reactive protein", value: "0.7", unit: "mg/L", ref: "< 3.0",  status: "good", pct: 0.12, band: [0,0.45] },
      { key: "fer",  name: "Ferritin", full: "Iron stores",        value: "84",  unit: "ng/mL",ref: "30–200", status: "good", pct: 0.42, band: [0.2,0.85] },
      { key: "vitd", name: "Vitamin D",full: "25-OH vitamin D",    value: "46",  unit: "ng/mL",ref: "30–60",  status: "good", pct: 0.6,  band: [0.45,0.85] },
      { key: "ldl",  name: "LDL",      full: "LDL cholesterol",    value: "91",  unit: "mg/dL",ref: "< 100",  status: "good", pct: 0.34, band: [0,0.5] },
      { key: "hba1c",name: "HbA1c",    full: "Avg. blood sugar",   value: "5.1", unit: "%",    ref: "< 5.7",  status: "good", pct: 0.38, band: [0.2,0.7] },
      { key: "tsh",  name: "TSH",      full: "Thyroid",            value: "1.6", unit: "mIU/L",ref: "0.4–4.0",status: "good", pct: 0.4,  band: [0.2,0.8] },
    ],
    finding: {
      intro: "Hi {name} — I read all 32 markers, and this is a clean panel. Here’s what stands out.",
      headline: "Everything’s in a [[healthy range]] — your foundations look great.",
      linked: ["crp", "fer", "vitd"],
      tieIn: (s) => s.includes("great") ? "You said you’re feeling great — your bloodwork agrees." : null,
      paragraphs: [
        "Your inflammation is low, iron is well-stocked and vitamin D sits **right where you want it**. Nothing here needs a doctor.",
        "The goal now is to **protect this** — a couple of habits and a retest in 12 months will keep you ahead.",
      ],
      actions: [
        { ic: "dumbbell", c: "var(--teal)", t: "Keep moving",    d: "A coach to push your fitness further." },
        { ic: "leaf",     c: "var(--good)", t: "Eat for longevity", d: "Optional plan to stay in range." },
        { ic: "flask",    c: "var(--teal)", t: "Retest in 12 mo", d: "We’ll remind you when it’s time." },
      ],
    },
    partners: [
      { key: "coach", type: "fitness", urgent: true, name: "Nordpuls Studio", role: "Performance coaching",
        mode: "2 min away", icon: "dumbbell", color: "var(--teal)", tint: "var(--teal-tint)",
        eta: "Drop-in tomorrow", rating: "4.7", badge: "Make the most of it",
        reason: "Your panel is solid — a great base to build real fitness on." },
      { key: "nutri", type: "nutrition", name: "Sofia Berg, RD", role: "Registered dietitian",
        mode: "Video or in person", icon: "leaf", color: "var(--good)", tint: "var(--good-tint)",
        eta: "This week", rating: "4.8", reason: "Dial in a longevity-focused way of eating." },
      { key: "pharm", type: "pharmacy", name: "Vena Pharmacy", role: "Omega-3 + D3, delivered",
        mode: "Ships tomorrow", icon: "pill", color: "var(--teal)", tint: "var(--teal-tint)",
        eta: "Arrives in 1–2 days", rating: "4.9", reason: "Simple maintenance stack to stay in range." },
    ],
  },

  athlete: {
    label: "Athlete",
    patient: { name: "Jonas", initial: "J", sampleDate: "May 30", panel: "Vena Performance — 38 markers" },
    score: 81, accent: "var(--watch)",
    hero: { label: "Your recovery marker", key: "ck", chip: "Watch your load", tone: "watch" },
    biomarkers: [
      { key: "ck",   name: "Creatine kinase", full: "Muscle stress", value: "410", unit: "U/L",  ref: "< 250",  status: "watch", pct: 0.78, band: [0,0.5] },
      { key: "fer",  name: "Ferritin",        full: "Iron stores",   value: "24",  unit: "ng/mL", ref: "30–200", status: "watch", pct: 0.18, band: [0.25,0.85] },
      { key: "vitd", name: "Vitamin D",       full: "25-OH vitamin D",value: "27", unit: "ng/mL", ref: "30–60",  status: "watch", pct: 0.28, band: [0.45,0.85] },
      { key: "test", name: "Testosterone",    full: "Total",         value: "5.1", unit: "ng/mL", ref: "2.6–9.0",status: "good",  pct: 0.46, band: [0.2,0.85] },
      { key: "hba1c",name: "HbA1c",           full: "Avg. blood sugar",value: "4.9",unit: "%",    ref: "< 5.7",  status: "good",  pct: 0.3,  band: [0.2,0.7] },
      { key: "crp",  name: "hs-CRP",          full: "C-reactive protein",value: "2.4",unit: "mg/L",ref: "< 3.0", status: "good",  pct: 0.4,  band: [0,0.45] },
    ],
    finding: {
      intro: "Hi {name} — strong panel overall. But your training is asking a lot of your body right now.",
      headline: "Your training is [[outpacing your recovery]].",
      linked: ["ck", "fer", "vitd"],
      tieIn: (s) => s.includes("active") ? "You flagged you’re training hard — your muscle and iron markers show it."
                  : s.includes("energy") ? "The low energy you mentioned fits depleted iron from heavy training." : null,
      paragraphs: [
        "Your **creatine kinase is high** — normal after big sessions, but paired with low ferritin it means you’re not fully bouncing back.",
        "Endurance load quietly **drains iron and vitamin D**. Top those up and your recovery (and performance) should climb.",
      ],
      actions: [
        { ic: "steth", c: "var(--watch)", t: "Sports physician", d: "Sanity-check your load and recovery." },
        { ic: "leaf",  c: "var(--good)",  t: "Fuel your iron",   d: "A sports dietitian builds the plan." },
        { ic: "pill",  c: "var(--teal)",  t: "Iron + D3",        d: "Targeted dose for athletes." },
      ],
    },
    partners: [
      { key: "sportmd", type: "doctor", urgent: true, name: "Dr. Aria Voss", role: "Sports physician",
        mode: "Video consult", icon: "steth", color: "var(--watch)", tint: "var(--watch-tint)",
        eta: "This week", rating: "4.9", badge: "Worth a check-in",
        reason: "Confirm your high CK is training, not strain — and tune your load." },
      { key: "nutri", type: "nutrition", name: "Sofia Berg, RD", role: "Sports dietitian",
        mode: "Video or in person", icon: "leaf", color: "var(--good)", tint: "var(--good-tint)",
        eta: "This week", rating: "4.8", reason: "Iron-forward fuelling around your training blocks." },
      { key: "physio", type: "fitness", name: "Nordpuls Recovery", role: "Physio & mobility",
        mode: "2 min away", icon: "dumbbell", color: "var(--teal)", tint: "var(--teal-tint)",
        eta: "Drop-in tomorrow", rating: "4.7", reason: "Recovery work so your CK can settle." },
      { key: "pharm", type: "pharmacy", name: "Vena Pharmacy", role: "Iron + D3, delivered",
        mode: "Ships tomorrow", icon: "pill", color: "var(--teal)", tint: "var(--teal-tint)",
        eta: "Arrives in 1–2 days", rating: "4.9", reason: "Replenish what endurance training burns through." },
    ],
  },
};

const VenaContext = React.createContext(null);

window.VENA = { SCENARIOS, SYMPTOMS, STATUS };
window.VenaContext = VenaContext;
Object.assign(window, { Icon, Logo, StatusChip, RangeMeter, ScoreRing, Steps, TopBar, RichText });
