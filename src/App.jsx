import { useState, useEffect, useRef, useCallback, useMemo } from 'react'
import { VenaContext } from './context.js'
import { SCENARIOS } from './data/scenarios.js'
import { IOSDevice } from './components/IOSFrame.jsx'
import { TweaksPanel, useTweaks, TweakSection, TweakRadio, TweakColor } from './components/TweaksPanel.jsx'
import { WelcomeScreen } from './screens/WelcomeScreen.jsx'
import { SymptomsScreen } from './screens/SymptomsScreen.jsx'
import { ActivateScreen } from './screens/ActivateScreen.jsx'
import { SampleScreen } from './screens/SampleScreen.jsx'
import { ProcessingScreen } from './screens/ProcessingScreen.jsx'
import { ResultsScreen } from './screens/ResultsScreen.jsx'
import { AnalysisScreen } from './screens/AnalysisScreen.jsx'
import { PartnersScreen } from './screens/PartnersScreen.jsx'
import { BookingScreen } from './screens/BookingScreen.jsx'
import { PlanScreen } from './screens/PlanScreen.jsx'

const TWEAK_DEFAULTS = {
  scenario: "Acute finding",
  accent: ["oklch(0.55 0.072 178)", "oklch(0.42 0.060 180)", "oklch(0.955 0.022 178)", "oklch(0.40 0.062 180)"],
  headline: "Serif",
  corners: "Soft",
};

const SCEN_BY_LABEL = { "Acute finding": "acute", "All clear": "clear", "Athlete": "athlete" };

const ACCENTS = {
  "Vital teal":    ["oklch(0.55 0.072 178)", "oklch(0.42 0.060 180)", "oklch(0.955 0.022 178)", "oklch(0.40 0.062 180)"],
  "Clinical blue": ["oklch(0.55 0.110 250)", "oklch(0.42 0.100 252)", "oklch(0.955 0.030 250)", "oklch(0.42 0.100 252)"],
  "Indigo":        ["oklch(0.52 0.130 285)", "oklch(0.40 0.120 285)", "oklch(0.955 0.035 285)", "oklch(0.42 0.120 285)"],
  "Warm clay":     ["oklch(0.58 0.100 50)",  "oklch(0.45 0.090 50)",  "oklch(0.960 0.030 55)",  "oklch(0.45 0.090 50)"],
};

const SCREENS = {
  welcome:    WelcomeScreen,
  symptoms:   SymptomsScreen,
  activate:   ActivateScreen,
  sample:     SampleScreen,
  processing: ProcessingScreen,
  results:    ResultsScreen,
  analysis:   AnalysisScreen,
  partners:   PartnersScreen,
  booking:    BookingScreen,
  plan:       PlanScreen,
};

const ORDER = ["welcome","symptoms","activate","sample","processing","results","analysis","partners","booking","plan"];

export default function App() {
  const [t, setTweak] = useTweaks(TWEAK_DEFAULTS);
  const [symptoms, setSymptoms] = useState(["energy"]);
  const [screen, setScreen] = useState("welcome");
  const [data, setData] = useState({});
  const [dir, setDir] = useState("fwd");
  const [tweaksOpen, setTweaksOpen] = useState(false);
  const prev = useRef("welcome");

  const scenarioKey = SCEN_BY_LABEL[t.scenario] || "acute";
  const ctx = useMemo(
    () => ({ ...SCENARIOS[scenarioKey], symptoms }),
    [scenarioKey, symptoms]
  );

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
    requestAnimationFrame(() => {
      const el = document.querySelector(".screen-scroll");
      if (el) el.scrollTop = 0;
    });
  }, []);

  const Comp = SCREENS[screen] || SCREENS.welcome;

  const [phone, setPhone] = useState(false);
  useEffect(() => {
    const mq = window.matchMedia("(max-width: 560px)");
    const apply = () => { setPhone(mq.matches); document.body.classList.toggle("phone", mq.matches); };
    apply();
    mq.addEventListener("change", apply);
    return () => mq.removeEventListener("change", apply);
  }, []);

  useEffect(() => {
    if (phone) return;
    const fitDevice = () => {
      const scaler = document.getElementById("scaler");
      if (!scaler) return;
      const W = 402, H = 874, pad = 36;
      const s = Math.min((window.innerWidth - pad) / W, (window.innerHeight - pad) / H, 1.1);
      scaler.style.transform = `scale(${s})`;
    };
    fitDevice();
    window.addEventListener("resize", fitDevice);
    return () => window.removeEventListener("resize", fitDevice);
  }, [phone]);

  const screenEl = (
    <div key={screen} className={dir === "fwd" ? "screen-enter" : "screen-back"}
         style={{ position: "absolute", inset: 0 }}>
      <Comp go={go} symptoms={symptoms} setSymptoms={setSymptoms} {...data} />
    </div>
  );

  return (
    <VenaContext.Provider value={ctx}>
      <div id="stage">
        <div id="scaler" style={phone ? undefined : { width: 402, height: 874 }}>
          {phone
            ? <div style={{ position: "relative", width: "100%", maxWidth: 560, margin: "0 auto",
                height: "100dvh", overflow: "hidden", background: "var(--bg)" }}>{screenEl}</div>
            : <IOSDevice>{screenEl}</IOSDevice>}
        </div>
      </div>

      <button
        onClick={() => setTweaksOpen(o => !o)}
        title="Open tweaks"
        style={{
          position: "fixed", right: 16, bottom: 16, zIndex: 2147483644,
          width: 40, height: 40, borderRadius: "50%", border: "none", cursor: "pointer",
          background: "rgba(250,249,247,0.92)", backdropFilter: "blur(12px)",
          boxShadow: "0 2px 8px rgba(0,0,0,0.18)", display: "grid", placeItems: "center",
          fontSize: 18, color: "#29261b", transition: "transform .12s",
          transform: tweaksOpen ? "rotate(45deg)" : "none",
        }}
      >⚙</button>

      <TweaksPanel open={tweaksOpen} onClose={() => setTweaksOpen(false)}>
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
        <TweakRadio label="Stage" value={["welcome","symptoms","activate","sample","processing"].includes(screen) ? "Intake" : "App"}
          options={['Intake', 'App']}
          onChange={(v) => go(v === 'Intake' ? 'welcome' : 'results')} />
      </TweaksPanel>
    </VenaContext.Provider>
  );
}
