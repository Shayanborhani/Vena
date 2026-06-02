/* app.jsx — Vena router, device wrapper, scaling */
const { useState, useEffect, useRef, useCallback } = React;

const TWEAK_DEFAULTS = /*EDITMODE-BEGIN*/{
  "scenario": "Acute finding",
  "accent": ["oklch(0.55 0.072 178)", "oklch(0.42 0.060 180)", "oklch(0.955 0.022 178)", "oklch(0.40 0.062 180)"],
  "headline": "Serif",
  "corners": "Soft"
}/*EDITMODE-END*/;

const SCEN_BY_LABEL = { "Acute finding": "acute", "All clear": "clear", "Athlete": "athlete" };

const ACCENTS = {
  "Vital teal":   ["oklch(0.55 0.072 178)", "oklch(0.42 0.060 180)", "oklch(0.955 0.022 178)", "oklch(0.40 0.062 180)"],
  "Clinical blue":["oklch(0.55 0.110 250)", "oklch(0.42 0.100 252)", "oklch(0.955 0.030 250)", "oklch(0.42 0.100 252)"],
  "Indigo":       ["oklch(0.52 0.130 285)", "oklch(0.40 0.120 285)", "oklch(0.955 0.035 285)", "oklch(0.42 0.120 285)"],
  "Warm clay":    ["oklch(0.58 0.100 50)",  "oklch(0.45 0.090 50)",  "oklch(0.960 0.030 55)",  "oklch(0.45 0.090 50)"],
};

const SCREENS = {
  welcome:    () => window.WelcomeScreen,
  symptoms:   () => window.SymptomsScreen,
  activate:   () => window.ActivateScreen,
  sample:     () => window.SampleScreen,
  processing: () => window.ProcessingScreen,
  results:    () => window.ResultsScreen,
  analysis:   () => window.AnalysisScreen,
  partners:   () => window.PartnersScreen,
  booking:    () => window.BookingScreen,
  plan:       () => window.PlanScreen,
};
// linear order used purely to decide slide direction
const ORDER = ["welcome","symptoms","activate","sample","processing","results","analysis","partners","booking","plan"];

function App() {
  const [t, setTweak] = useTweaks(TWEAK_DEFAULTS);
  const [symptoms, setSymptoms] = useState(["energy"]);
  const [screen, setScreen] = useState("welcome");
  const [data, setData] = useState({});
  const [dir, setDir] = useState("fwd");
  const prev = useRef("welcome");

  const scenarioKey = SCEN_BY_LABEL[t.scenario] || "acute";
  const ctx = React.useMemo(
    () => ({ ...window.VENA.SCENARIOS[scenarioKey], symptoms }),
    [scenarioKey, symptoms]
  );

  // apply tweaks → CSS variables
  useEffect(() => {
    const root = document.documentElement.style;
    const [base, deep, tint, ink] = t.accent;
    root.setProperty("--teal", base);
    root.setProperty("--teal-deep", deep);
    root.setProperty("--teal-tint", tint);
    root.setProperty("--teal-ink", ink);
    root.setProperty("--serif", t.headline === "Serif"
      ? '"Instrument Serif", Georgia, serif'
      : '"Hanken Grotesk", system-ui, sans-serif');
    root.setProperty("--display-weight", t.headline === "Serif" ? "400" : "700");
    const r = t.corners === "Crisp" ? [16, 13, 10] : t.corners === "Round" ? [32, 24, 16] : [26, 20, 14];
    root.setProperty("--r-lg", r[0] + "px");
    root.setProperty("--r-md", r[1] + "px");
    root.setProperty("--r-sm", r[2] + "px");
  }, [t]);

  const go = useCallback((next, payload = {}) => {
    const a = ORDER.indexOf(prev.current), b = ORDER.indexOf(next);
    setDir(b >= a ? "fwd" : "back");
    prev.current = next;
    setData(payload);
    setScreen(next);
    // scroll the new screen to top
    requestAnimationFrame(() => {
      const el = document.querySelector(".screen-scroll");
      if (el) el.scrollTop = 0;
    });
  }, []);

  const Comp = (SCREENS[screen] || SCREENS.welcome)();

  useEffect(() => { window.__go = go; window.__setTweak = setTweak; }, [go, setTweak]);

  // phone vs desktop (device-frame) presentation
  const [phone, setPhone] = useState(false);
  useEffect(() => {
    const mq = window.matchMedia("(max-width: 560px)");
    const apply = () => { setPhone(mq.matches); document.body.classList.toggle("phone", mq.matches); };
    apply();
    mq.addEventListener("change", apply);
    return () => mq.removeEventListener("change", apply);
  }, []);

  const screenEl = (
    <div key={screen} className={dir === "fwd" ? "screen-enter" : "screen-back"}
         style={{ position: "absolute", inset: 0 }}>
      <Comp go={go} symptoms={symptoms} setSymptoms={setSymptoms} {...data} />
    </div>
  );

  return (
    <window.VenaContext.Provider value={ctx}>
      {phone
        ? <div style={{ position: "relative", width: "100%", maxWidth: 560, margin: "0 auto",
            height: "100dvh", overflow: "hidden", background: "var(--bg)" }}>{screenEl}</div>
        : <IOSDevice>{screenEl}</IOSDevice>}

      <TweaksPanel>
        <TweakSection label="Demo scenario" />
        <TweakRadio label="Result" value={t.scenario}
          options={['Acute finding', 'All clear', 'Athlete']}
          onChange={(v) => { setTweak('scenario', v); go('results'); }} />
        <TweakSection label="Brand" />
        <TweakColor label="Accent" value={t.accent}
          options={Object.values(ACCENTS)}
          onChange={(v) => setTweak('accent', v)} />
        <TweakRadio label="Headline" value={t.headline} options={['Serif', 'Sans']}
          onChange={(v) => setTweak('headline', v)} />
        <TweakSection label="Shape" />
        <TweakRadio label="Corners" value={t.corners} options={['Crisp', 'Soft', 'Round']}
          onChange={(v) => setTweak('corners', v)} />
        <TweakSection label="Jump to" />
        <TweakRadio label="Stage" value={ORDER.includes(screen) ? (["welcome","symptoms","activate","sample","processing"].includes(screen) ? "Intake" : "App") : "Intake"}
          options={['Intake', 'App']}
          onChange={(v) => go(v === 'Intake' ? 'welcome' : 'results')} />
      </TweaksPanel>
    </window.VenaContext.Provider>
  );
}

/* fit-to-viewport scaler */
function fitDevice() {
  const scaler = document.getElementById("scaler");
  if (!scaler) return;
  const W = 402, H = 874, pad = 36;
  const s = Math.min((window.innerWidth - pad) / W, (window.innerHeight - pad) / H, 1.1);
  scaler.style.transform = `scale(${s})`;
}
window.addEventListener("resize", fitDevice);

ReactDOM.createRoot(document.getElementById("scaler")).render(<App />);
requestAnimationFrame(fitDevice);
setTimeout(fitDevice, 100);
