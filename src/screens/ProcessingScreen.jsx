import { useState, useEffect } from 'react'
import { Icon } from '../components/shared.jsx'

export function ProcessingScreen({ go }) {
  const phases = [
    { t: "Sample received at lab",  ic: "flask" },
    { t: "Running your 32 markers", ic: "pulse" },
    { t: "Vena AI reading results", ic: "spark" },
    { t: "Matching you with care",  ic: "map"   },
  ];
  const [active, setActive] = useState(0);
  const [done, setDone] = useState(false);

  useEffect(() => {
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
