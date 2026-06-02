/* screens-pre.jsx — onboarding → activate → sample → processing */

/* ───────────────────────── 1. Welcome ───────────────────────── */
function WelcomeScreen({ go }) {
  return (
    <div className="screen" style={{ background:
      "radial-gradient(125% 80% at 50% 8%, var(--teal-tint) 0%, transparent 52%), var(--bg)" }}>
      <div className="screen-scroll pad-top" style={{ display: "flex", flexDirection: "column", padding: "64px 28px 0" }}>
        <div className="rise" style={{ display: "flex", alignItems: "center", gap: 10, marginTop: 18 }}>
          <Logo size={30} />
          <span style={{ fontWeight: 700, fontSize: 20, letterSpacing: "-0.01em" }}>Vena</span>
        </div>

        <div style={{ flex: 1, display: "flex", flexDirection: "column", justifyContent: "center", padding: "8px 0" }}>
          <div className="kicker rise" style={{ animationDelay: ".05s", marginBottom: 16 }}>From one drop of blood</div>
          <h1 className="display rise" style={{ animationDelay: ".1s", fontSize: 52, margin: 0, color: "var(--ink)" }}>
            Know what’s<br/>going on—<br/>and <span style={{ color: "var(--teal)" }}>what to<br/>do next.</span>
          </h1>
          <p className="rise" style={{ animationDelay: ".18s", fontSize: 17, lineHeight: 1.5, color: "var(--ink-2)",
            margin: "26px 0 0", maxWidth: 322 }}>
            We analyse your sample with our partner labs, then route you to the exact person who can help—
            doctor, dietitian, coach or pharmacy.
          </p>
        </div>

        <div className="rise" style={{ animationDelay: ".26s", display: "flex", gap: 18, padding: "4px 4px 22px",
          color: "var(--ink-2)", fontSize: 13.5 }}>
          {[["flask","Partner labs"],["spark","AI read"],["map","Matched care"]].map(([ic, t]) => (
            <div key={t} style={{ display: "flex", alignItems: "center", gap: 7 }}>
              <Icon name={ic} size={17} stroke="var(--teal)" /> {t}
            </div>
          ))}
        </div>
      </div>

      <div className="pad-bot" style={{ padding: "10px 24px 40px", display: "flex", flexDirection: "column", gap: 12 }}>
        <button className="btn btn-teal btn-block rise" style={{ animationDelay: ".3s" }} onClick={() => go("symptoms")}>
          Activate my kit <Icon name="arrow" size={20} />
        </button>
        <button className="btn btn-ghost btn-block rise" style={{ animationDelay: ".34s", fontSize: 16 }}
          onClick={() => go("results")}>
          I already have results
        </button>
      </div>
    </div>
  );
}

/* ───────────────────────── 1b. Symptom check-in ───────────────────────── */
function SymptomsScreen({ go, symptoms = [], setSymptoms }) {
  const SYMPTOMS = window.VENA.SYMPTOMS;
  const [sel, setSel] = React.useState(symptoms);
  const toggle = (k) => setSel(s => s.includes(k) ? s.filter(x => x !== k) : [...s, k]);
  const save = () => { setSymptoms && setSymptoms(sel); go("activate"); };

  return (
    <div className="screen">
      <div className="pad-top" />
      <TopBar onBack={() => go("welcome")} kicker="Quick check-in"
        right={<button onClick={save} style={{ border: "none", background: "none", color: "var(--ink-3)",
          fontSize: 14, fontWeight: 600, cursor: "pointer" }}>Skip</button>} />

      <div className="screen-scroll" style={{ padding: "16px 24px 0" }}>
        <h1 className="display screen-enter" style={{ fontSize: 38, margin: "8px 0 0" }}>How have you<br/>been feeling?</h1>
        <p style={{ color: "var(--ink-2)", fontSize: 16, lineHeight: 1.5, margin: "12px 0 26px" }}>
          Pick any that apply. Vena uses this to read your bloodwork in context—so the advice fits <i>you</i>, not just the numbers.
        </p>

        <div style={{ display: "flex", flexWrap: "wrap", gap: 11 }}>
          {SYMPTOMS.map(s => {
            const on = sel.includes(s.key);
            return (
              <button key={s.key} onClick={() => toggle(s.key)} style={{ display: "inline-flex", alignItems: "center",
                gap: 9, padding: "13px 18px 13px 15px", borderRadius: 9999, cursor: "pointer",
                border: "1.5px solid " + (on ? "var(--teal)" : "var(--hair)"),
                background: on ? "var(--teal-tint)" : "var(--surface)", color: on ? "var(--teal-ink)" : "var(--ink)",
                boxShadow: on ? "none" : "var(--shadow-sm)", fontWeight: 600, fontSize: 15.5, transition: "all .15s" }}>
                <Icon name={s.icon} size={19} stroke={on ? "var(--teal)" : "var(--ink-3)"} /> {s.label}
              </button>
            );
          })}
        </div>
      </div>

      <div className="pad-bot" style={{ padding: "14px 24px 40px" }}>
        <button className="btn btn-teal btn-block" onClick={save}>
          {sel.length ? "Continue" : "Continue without"} <Icon name="arrow" size={20} />
        </button>
      </div>
    </div>
  );
}

/* ───────────────────────── 2. Activate kit ───────────────────────── */
function ActivateScreen({ go }) {
  const [code, setCode] = React.useState(["V","E","N","A"]);
  return (
    <div className="screen">
      <div className="pad-top" />
      <TopBar onBack={() => go("symptoms")} kicker="Step 1 of 3" />
      <div style={{ padding: "0 24px 8px" }}><Steps n={3} i={0} /></div>

      <div className="screen-scroll" style={{ padding: "24px 28px 0" }}>
        <h1 className="display screen-enter" style={{ fontSize: 40, margin: "8px 0 0" }}>Activate your kit</h1>
        <p style={{ color: "var(--ink-2)", fontSize: 16, lineHeight: 1.5, margin: "12px 0 30px" }}>
          Enter the 4-letter code printed on the inside of your Vena box to link this sample to you.
        </p>

        <div style={{ display: "flex", gap: 12, justifyContent: "center", margin: "8px 0 26px" }}>
          {code.map((ch, i) => (
            <div key={i} style={{ width: 62, height: 76, borderRadius: 18, background: "var(--surface)",
              boxShadow: "var(--shadow-sm)", display: "grid", placeItems: "center",
              border: "1.5px solid " + (ch ? "var(--teal)" : "var(--hair)"),
              fontFamily: "var(--mono)", fontSize: 34, fontWeight: 500, color: "var(--ink)" }}>{ch}</div>
          ))}
        </div>

        <div className="card" style={{ padding: 16, display: "flex", gap: 13, alignItems: "center" }}>
          <div style={{ width: 40, height: 40, borderRadius: 12, background: "var(--teal-tint)",
            display: "grid", placeItems: "center", color: "var(--teal)", flexShrink: 0 }}>
            <Icon name="shield" size={22} />
          </div>
          <div style={{ fontSize: 13.5, color: "var(--ink-2)", lineHeight: 1.45 }}>
            Your sample is processed at an accredited lab. Results are encrypted and only ever shared with partners you choose.
          </div>
        </div>
      </div>

      <div className="pad-bot" style={{ padding: "12px 24px 40px" }}>
        <button className="btn btn-primary btn-block" onClick={() => go("sample")}>
          Continue <Icon name="arrow" size={20} />
        </button>
      </div>
    </div>
  );
}

/* ───────────────────────── 3. Sample instructions ───────────────────────── */
function SampleScreen({ go }) {
  const steps = [
    { ic: "drop",  t: "Warm your hand", d: "Run it under warm water for 30s so blood flows easily." },
    { ic: "plus",  t: "Prick & collect", d: "Use the lancet, then fill the card to the dotted line." },
    { ic: "flask", t: "Seal & send",     d: "Drop it in the prepaid mailer—any postbox works." },
  ];
  return (
    <div className="screen">
      <div className="pad-top" />
      <TopBar onBack={() => go("activate")} kicker="Step 2 of 3" />
      <div style={{ padding: "0 24px 8px" }}><Steps n={3} i={1} /></div>

      <div className="screen-scroll" style={{ padding: "24px 24px 0" }}>
        <h1 className="display screen-enter" style={{ fontSize: 40, margin: "8px 4px 0" }}>Take your sample</h1>
        <p style={{ color: "var(--ink-2)", fontSize: 16, lineHeight: 1.5, margin: "12px 4px 26px" }}>
          Three minutes, no needle. Follow along—we’ll handle the rest.
        </p>

        <div style={{ display: "flex", flexDirection: "column", gap: 12 }}>
          {steps.map((s, i) => (
            <div key={i} className="card" style={{ padding: "18px 18px", display: "flex", gap: 16, alignItems: "center" }}>
              <div style={{ width: 52, height: 52, borderRadius: 16, background: "var(--teal-tint)",
                display: "grid", placeItems: "center", color: "var(--teal)", flexShrink: 0, position: "relative" }}>
                <Icon name={s.ic} size={26} />
                <div className="num" style={{ position: "absolute", top: -7, left: -7, width: 22, height: 22,
                  borderRadius: "50%", background: "var(--ink)", color: "#fff", fontSize: 11.5,
                  display: "grid", placeItems: "center" }}>{i + 1}</div>
              </div>
              <div>
                <div style={{ fontWeight: 600, fontSize: 17 }}>{s.t}</div>
                <div style={{ color: "var(--ink-2)", fontSize: 14, lineHeight: 1.4, marginTop: 2 }}>{s.d}</div>
              </div>
            </div>
          ))}
        </div>
      </div>

      <div className="pad-bot" style={{ padding: "14px 24px 40px" }}>
        <button className="btn btn-teal btn-block" onClick={() => go("processing")}>
          I’ve mailed my sample <Icon name="check" size={20} />
        </button>
      </div>
    </div>
  );
}

/* ───────────────────────── 4. Processing / analyzing ───────────────────────── */
function ProcessingScreen({ go }) {
  const phases = [
    { t: "Sample received at lab",   ic: "flask" },
    { t: "Running your 32 markers",  ic: "pulse" },
    { t: "Vena AI reading results",  ic: "spark" },
    { t: "Matching you with care",   ic: "map" },
  ];
  const [active, setActive] = React.useState(0);
  const [done, setDone] = React.useState(false);
  React.useEffect(() => {
    const ts = [900, 1800, 2700, 3500];
    const timers = ts.map((ms, i) => setTimeout(() => setActive(i + 1), ms));
    const fin = setTimeout(() => setDone(true), 4200);
    return () => { timers.forEach(clearTimeout); clearTimeout(fin); };
  }, []);

  return (
    <div className="screen" style={{ background:
      "radial-gradient(120% 70% at 50% 22%, var(--teal-tint) 0%, transparent 55%), var(--bg)" }}>
      <div className="pad-top" />
      <div className="screen-scroll" style={{ display: "flex", flexDirection: "column", padding: "40px 28px 0" }}>
        <div style={{ flex: 1, display: "flex", flexDirection: "column", justifyContent: "center", alignItems: "center" }}>
          <div style={{ position: "relative", width: 150, height: 150, marginBottom: 30 }}>
            <div style={{ position: "absolute", inset: 0, borderRadius: "50%", border: "2px solid var(--teal)",
              opacity: 0.5, animation: "pingRing 2.2s ease-out infinite" }} />
            <div style={{ position: "absolute", inset: 14, borderRadius: "50%", border: "2px solid var(--teal)",
              opacity: 0.35, animation: "pingRing 2.2s ease-out infinite", animationDelay: ".5s" }} />
            <div style={{ position: "absolute", inset: 0, display: "grid", placeItems: "center" }}>
              <div style={{ width: 96, height: 96, borderRadius: "50%", background: "var(--surface)",
                boxShadow: "var(--shadow-md)", display: "grid", placeItems: "center", color: "var(--teal)" }}>
                <Icon name={done ? "check" : "drop"} size={46} sw={done ? 2.2 : 1.8} />
              </div>
            </div>
          </div>

          <h1 className="display" style={{ fontSize: 36, textAlign: "center", margin: 0 }}>
            {done ? "Your results are ready" : "Analysing your sample"}
          </h1>
          <p style={{ color: "var(--ink-2)", fontSize: 15.5, textAlign: "center", margin: "10px 0 0", maxWidth: 280 }}>
            {done ? "We found a few things worth your attention." : "This usually takes about 2 minutes."}
          </p>

          <div style={{ width: "100%", maxWidth: 320, marginTop: 34, display: "flex", flexDirection: "column", gap: 10 }}>
            {phases.map((ph, i) => {
              const state = i < active ? "done" : i === active ? "now" : "wait";
              return (
                <div key={i} style={{ display: "flex", alignItems: "center", gap: 13,
                  opacity: state === "wait" ? 0.4 : 1, transition: "opacity .4s" }}>
                  <div style={{ width: 32, height: 32, borderRadius: "50%", flexShrink: 0,
                    background: state === "done" ? "var(--teal)" : "var(--surface)",
                    color: state === "done" ? "#fff" : "var(--teal)",
                    boxShadow: "var(--shadow-sm)", display: "grid", placeItems: "center",
                    border: state === "now" ? "2px solid var(--teal)" : "none" }}>
                    <Icon name={state === "done" ? "check" : ph.ic} size={17} sw={2} />
                  </div>
                  <span style={{ fontSize: 15, fontWeight: state === "now" ? 600 : 500,
                    color: state === "wait" ? "var(--ink-3)" : "var(--ink)" }}>{ph.t}</span>
                  {state === "now" && <span className="dots-anim" style={{ marginLeft: -4 }} />}
                </div>
              );
            })}
          </div>
        </div>
      </div>

      <div className="pad-bot" style={{ padding: "14px 24px 40px", minHeight: 110 }}>
        {done && (
          <button className="btn btn-teal btn-block fadein" onClick={() => go("results")}>
            See my results <Icon name="arrow" size={20} />
          </button>
        )}
      </div>
    </div>
  );
}

Object.assign(window, { WelcomeScreen, SymptomsScreen, ActivateScreen, SampleScreen, ProcessingScreen });
