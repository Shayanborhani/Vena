import { Icon, Logo } from '../components/shared.jsx'

export function WelcomeScreen({ go }) {
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
            Know what's<br/>going on—<br/>and <span style={{ color: "var(--teal)" }}>what to<br/>do next.</span>
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
