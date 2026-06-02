import { useState, useEffect, useContext } from 'react'
import { VenaContext } from '../context.js'
import { STATUS } from '../data/scenarios.js'
import { Icon, TopBar, StatusChip, RichText } from '../components/shared.jsx'

function Typewriter({ text, speed = 22, onDone, caret = true }) {
  const [n, setN] = useState(0);
  useEffect(() => {
    setN(0); let i = 0;
    const id = setInterval(() => {
      i++; setN(i);
      if (i >= text.length) { clearInterval(id); onDone && onDone(); }
    }, speed);
    return () => clearInterval(id);
  }, [text]);
  const done = n >= text.length;
  return <span>{text.slice(0, n)}{caret && !done && <span className="caret" />}</span>;
}

export function AnalysisScreen({ go }) {
  const sc = useContext(VenaContext);
  const { biomarkers, finding, accent, symptoms } = sc;
  const linked = finding.linked.map(k => biomarkers.find(b => b.key === k)).filter(Boolean);
  const intro = finding.intro.replace("{name}", sc.patient.name);
  const tie = finding.tieIn ? finding.tieIn(symptoms || []) : null;
  const [revealed, setRevealed] = useState(false);

  return (
    <div className="screen">
      <div className="pad-top" />
      <TopBar onBack={() => go("results")} kicker="Vena AI" right={<Icon name="spark" size={20} stroke="var(--teal)" />} />

      <div className="screen-scroll" style={{ padding: "10px 24px 0" }}>
        <div className="screen-enter" style={{ display: "flex", gap: 12, alignItems: "flex-start", margin: "8px 0 22px" }}>
          <div style={{ width: 38, height: 38, borderRadius: "50%", flexShrink: 0,
            background: "var(--ink)", color: "#fff", display: "grid", placeItems: "center" }}>
            <Icon name="spark" size={20} />
          </div>
          <div style={{ fontSize: 17, lineHeight: 1.45, color: "var(--ink)", paddingTop: 2, minHeight: 48 }}>
            <Typewriter text={intro} onDone={() => setRevealed(true)} />
          </div>
        </div>

        {!revealed ? (
          <div style={{ display: "flex", alignItems: "center", gap: 8, color: "var(--ink-3)", fontSize: 14, padding: "8px 2px" }}>
            <span className="dots-anim" /> reading your panel
          </div>
        ) : (
          <div>
            <h1 className="display rise" style={{ animationDelay: ".02s", fontSize: 33, lineHeight: 1.05, margin: "0 0 14px" }}>
              <RichText text={finding.headline} accent={accent} />
            </h1>

            {tie && (
              <div className="rise" style={{ animationDelay: ".08s", display: "flex", gap: 9, alignItems: "flex-start",
                margin: "0 0 16px", padding: "12px 14px", borderRadius: 14, background: "var(--teal-tint)" }}>
                <Icon name="pulse" size={17} stroke="var(--teal-ink)" style={{ flexShrink: 0, marginTop: 1 }} />
                <span style={{ fontSize: 14, color: "var(--teal-ink)", lineHeight: 1.45, fontWeight: 500 }}>{tie}</span>
              </div>
            )}

            <div className="card rise" style={{ animationDelay: ".14s", padding: "16px 18px", margin: "6px 0 18px" }}>
              <div className="kicker" style={{ marginBottom: 12 }}>The signals I connected</div>
              <div style={{ display: "flex", flexDirection: "column", gap: 14 }}>
                {linked.map(b => (
                  <div key={b.key} style={{ display: "flex", alignItems: "center", gap: 12 }}>
                    <span style={{ width: 8, height: 8, borderRadius: "50%", flexShrink: 0, background: STATUS[b.status].color }} />
                    <span style={{ flex: 1, fontSize: 15, fontWeight: 500 }}>{b.name}</span>
                    <span className="num" style={{ fontSize: 15.5, fontWeight: 600, whiteSpace: "nowrap",
                      color: STATUS[b.status].color }}>{b.value}<span style={{ fontSize: 11, color: "var(--ink-3)", fontWeight: 400, marginLeft: 3 }}>{b.unit}</span></span>
                    <StatusChip s={b.status} />
                  </div>
                ))}
              </div>
            </div>

            <div className="rise" style={{ animationDelay: ".2s", fontSize: 16, lineHeight: 1.62, color: "var(--ink-2)", margin: "0 2px 20px" }}>
              {finding.paragraphs.map((p, i) => (
                <p key={i} style={{ margin: i ? "14px 0 0" : 0 }}><RichText text={p} accent={accent} /></p>
              ))}
            </div>

            <div className="kicker rise" style={{ animationDelay: ".26s", margin: "4px 2px 12px" }}>What I'd do, in order</div>
            <div style={{ display: "flex", flexDirection: "column", gap: 10, marginBottom: 10 }}>
              {finding.actions.map((s, i) => (
                <div key={i} className="card rise" style={{ animationDelay: (0.3 + i * 0.06) + "s", padding: "14px 16px", display: "flex", alignItems: "center", gap: 14 }}>
                  <div style={{ width: 26, height: 26, flexShrink: 0 }} className="num">
                    <span style={{ color: "var(--ink-3)", fontSize: 14, fontWeight: 600 }}>0{i + 1}</span>
                  </div>
                  <div style={{ width: 40, height: 40, borderRadius: 12, flexShrink: 0, display: "grid", placeItems: "center",
                    background: "color-mix(in oklch, " + s.c + " 12%, white)", color: s.c }}>
                    <Icon name={s.ic} size={21} />
                  </div>
                  <div style={{ flex: 1 }}>
                    <div style={{ fontWeight: 600, fontSize: 15.5 }}>{s.t}</div>
                    <div style={{ fontSize: 13, color: "var(--ink-2)" }}>{s.d}</div>
                  </div>
                </div>
              ))}
            </div>

            <div className="fadein" style={{ fontSize: 11.5, color: "var(--ink-3)", lineHeight: 1.45, margin: "14px 4px 0", textAlign: "center" }}>
              Vena AI offers guidance, not a diagnosis. Always confirm with a clinician.
            </div>
          </div>
        )}
      </div>

      <div className="pad-bot vena-bottom-nav" style={{ padding: "12px 24px 38px",
        background: "linear-gradient(to top, var(--bg) 70%, transparent)" }}>
        <button className="btn btn-teal btn-block" onClick={() => go("partners")}>
          See who can help <Icon name="arrow" size={20} />
        </button>
      </div>
    </div>
  );
}
