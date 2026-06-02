import { Icon, TopBar, Steps } from '../components/shared.jsx'

export function SampleScreen({ go }) {
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
          Three minutes, no needle. Follow along—we'll handle the rest.
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
          I've mailed my sample <Icon name="check" size={20} />
        </button>
      </div>
    </div>
  );
}
