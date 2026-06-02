export const STATUS = {
  good:  { label: "In range",  cls: "chip-good",  color: "var(--good)"  },
  watch: { label: "Watch",     cls: "chip-watch", color: "var(--watch)" },
  alert: { label: "Attention", cls: "chip-alert", color: "var(--alert)" },
};

export const SYMPTOMS = [
  { key: "energy", label: "Low energy",   icon: "drop" },
  { key: "stress", label: "Stressed",     icon: "pulse" },
  { key: "sleep",  label: "Poor sleep",   icon: "clock" },
  { key: "fog",    label: "Brain fog",    icon: "spark" },
  { key: "active", label: "Training hard",icon: "dumbbell" },
  { key: "great",  label: "Feeling great",icon: "check" },
];

export const SCENARIOS = {
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
      intro: "Hi {name} — I read all 32 markers. Here's the one story that ties your results together.",
      headline: "Your body is showing [[active inflammation]], likely linked to low iron.",
      linked: ["crp", "fer", "vitd"],
      tieIn: (s) => s.includes("energy") ? "You told me your energy's been low — that lines up with your iron and vitamin D."
                  : s.includes("fog")    ? "The brain fog you mentioned fits low iron and vitamin D." : null,
      paragraphs: [
        "Your **hs-CRP is more than 2× the upper limit**. On its own that's a flag; alongside your low ferritin and vitamin D, it points to an inflammatory process your body is actively fighting.",
        "This isn't something to self-treat. It's worth having a clinician look within **the next 48 hours** — and there are smaller things you can start on today.",
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
      intro: "Hi {name} — I read all 32 markers, and this is a clean panel. Here's what stands out.",
      headline: "Everything's in a [[healthy range]] — your foundations look great.",
      linked: ["crp", "fer", "vitd"],
      tieIn: (s) => s.includes("great") ? "You said you're feeling great — your bloodwork agrees." : null,
      paragraphs: [
        "Your inflammation is low, iron is well-stocked and vitamin D sits **right where you want it**. Nothing here needs a doctor.",
        "The goal now is to **protect this** — a couple of habits and a retest in 12 months will keep you ahead.",
      ],
      actions: [
        { ic: "dumbbell", c: "var(--teal)", t: "Keep moving",       d: "A coach to push your fitness further." },
        { ic: "leaf",     c: "var(--good)", t: "Eat for longevity", d: "Optional plan to stay in range." },
        { ic: "flask",    c: "var(--teal)", t: "Retest in 12 mo",   d: "We'll remind you when it's time." },
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
      { key: "ck",   name: "Creatine kinase", full: "Muscle stress",      value: "410", unit: "U/L",  ref: "< 250",  status: "watch", pct: 0.78, band: [0,0.5] },
      { key: "fer",  name: "Ferritin",        full: "Iron stores",        value: "24",  unit: "ng/mL", ref: "30–200", status: "watch", pct: 0.18, band: [0.25,0.85] },
      { key: "vitd", name: "Vitamin D",       full: "25-OH vitamin D",    value: "27",  unit: "ng/mL", ref: "30–60",  status: "watch", pct: 0.28, band: [0.45,0.85] },
      { key: "test", name: "Testosterone",    full: "Total",              value: "5.1", unit: "ng/mL", ref: "2.6–9.0",status: "good",  pct: 0.46, band: [0.2,0.85] },
      { key: "hba1c",name: "HbA1c",           full: "Avg. blood sugar",   value: "4.9", unit: "%",    ref: "< 5.7",  status: "good",  pct: 0.3,  band: [0.2,0.7] },
      { key: "crp",  name: "hs-CRP",          full: "C-reactive protein", value: "2.4", unit: "mg/L", ref: "< 3.0",  status: "good",  pct: 0.4,  band: [0,0.45] },
    ],
    finding: {
      intro: "Hi {name} — strong panel overall. But your training is asking a lot of your body right now.",
      headline: "Your training is [[outpacing your recovery]].",
      linked: ["ck", "fer", "vitd"],
      tieIn: (s) => s.includes("active") ? "You flagged you're training hard — your muscle and iron markers show it."
                  : s.includes("energy") ? "The low energy you mentioned fits depleted iron from heavy training." : null,
      paragraphs: [
        "Your **creatine kinase is high** — normal after big sessions, but paired with low ferritin it means you're not fully bouncing back.",
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
