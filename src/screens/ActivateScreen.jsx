import { useState } from 'react'
import { Icon, TopBar, Steps } from '../components/shared.jsx'

export function ActivateScreen({ go }) {
  const [code] = useState(["V","E","N","A"]);
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
