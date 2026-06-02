import { useState } from 'react'
import { Icon, TopBar } from '../components/shared.jsx'
import { SYMPTOMS } from '../data/scenarios.js'

export function SymptomsScreen({ go, symptoms = [], setSymptoms }) {
  const [sel, setSel] = useState(symptoms);
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
