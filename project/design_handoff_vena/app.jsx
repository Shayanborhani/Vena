/* app.jsx — Vena router, device wrapper, scaling */
const { useState, useEffect, useRef, useCallback } = React;

const TWEAK_DEFAULTS = /*EDITMODE-BEGIN*/{
  "accent": ["oklch(0.55 0.072 178)", "oklch(0.42 0.060 180)", "oklch(0.955 0.022 178)", "oklch(0.40 0.062 180)"],
  "headline": "Serif",
  "corners": "Soft"
}/*EDITMODE-END*/;

const ACCENTS = {
  "Vital teal":   ["oklch(0.55 0.072 178)", "oklch(0.42 0.060 180)", "oklch(0.955 0.022 178)", "oklch(0.40 0.062 180)"],
  "Clinical blue":["oklch(0.55 0.110 250)", "oklch(0.42 0.100 252)", "oklch(0.955 0.030 250)", "oklch(0.42 0.100 252)"],
  "Indigo":       ["oklch(0.52 0.130 285)", "oklch(0.40 0.120 285)", "oklch(0.955 0.035 285)", "oklch(0.42 0.120 285)"],
  "Warm clay":    ["oklch(0.58 0.100 50)",  "oklch(0.45 0.090 50)",  "oklch(0.960 0.030 55)",  "oklch(0.45 0.090 50)"],
};

const SCREENS = {
  welcome:    () => window.WelcomeScreen,
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
const ORDER = ["welcome","activate","sample","processing","results","analysis","partners","booking","plan"];

function App() {
  const [t, setTweak] = useTweaks(TWEAK_DEFAULTS);
  const [screen, setScreen] = useState("welcome");
  const [data, setData] = useState({});
  const [dir, setDir] = useState("fwd");
  const prev = useRef("welcome");

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

  useEffect(() => { window.__go = go; }, [go]);

  return (
    <React.Fragment>
      <IOSDevice>
        <div key={screen} className={dir === "fwd" ? "screen-enter" : "screen-back"}
             style={{ position: "absolute", inset: 0 }}>
          <Comp go={go} {...data} />
        </div>
      </IOSDevice>

      <TweaksPanel>
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
        <TweakRadio label="Stage" value={ORDER.includes(screen) ? (["welcome","activate","sample","processing"].includes(screen) ? "Intake" : "App") : "Intake"}
          options={['Intake', 'App']}
          onChange={(v) => go(v === 'Intake' ? 'welcome' : 'results')} />
      </TweaksPanel>
    </React.Fragment>
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
