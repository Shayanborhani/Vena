import { useState, useContext } from 'react'
import { VenaContext } from '../context.js'
import { Icon } from '../components/shared.jsx'
import { BottomNav } from './BottomNav.jsx'

export function PlanScreen({ go }) {
  const sc = useContext(VenaContext);
  const appt = sc.partners.find(p => p.urgent) || sc.partners[0];
  const [tasks, setTasks] = useState(
    sc.finding.actions.map((a, i) => ({ t: a.t, d: a.d, done: i === sc.finding.actions.length - 1 }))
  );
  const toggle = i => setTasks(ts => ts.map((x, k) => k === i ? { ...x, done: !x.done } : x));
  const doneN = tasks.filter(t => t.done).length;

  return (
    <div className="screen">
      <div className="screen-scroll pad-top" style={{ paddingBottom: 120 }}>
        <div style={{ padding: "12px 22px 0" }}>
          <div className="kicker">Monday, June 2</div>
          <h1 className="display" style={{ fontSize: 38, margin: "8px 0 18px" }}>Today's plan</h1>
        </div>

        <div style={{ padding: "0 22px" }}>
          <div className="kicker" style={{ margin: "0 2px 10px" }}>Upcoming</div>
          <div className="card" style={{ padding: 18, display: "flex", gap: 14, alignItems: "center",
            outline: "1.5px solid " + appt.color }}>
            <div style={{ width: 50, height: 50, borderRadius: 15, flexShrink: 0, display: "grid", placeItems: "center",
              background: appt.tint, color: appt.color }}><Icon name={appt.icon} size={25} /></div>
            <div style={{ flex: 1 }}>
              <div style={{ fontWeight: 600, fontSize: 16.5 }}>{appt.name}</div>
              <div className="num" style={{ fontSize: 13.5, color: "var(--ink-2)" }}>{appt.mode} · Today, 4:30 PM</div>
            </div>
            <button style={{ border: "none", background: appt.color, color: "#fff", fontWeight: 600,
              fontSize: 14, padding: "10px 16px", borderRadius: 12, cursor: "pointer" }}>Join</button>
          </div>
        </div>

        <div style={{ padding: "24px 22px 0" }}>
          <div style={{ display: "flex", alignItems: "baseline", justifyContent: "space-between", margin: "0 2px 10px" }}>
            <div className="kicker">Action items</div>
            <span className="num" style={{ fontSize: 12, color: "var(--ink-3)" }}>{doneN}/{tasks.length} done</span>
          </div>
          <div className="card" style={{ overflow: "hidden" }}>
            {tasks.map((task, i) => (
              <button key={i} onClick={() => toggle(i)} style={{ width: "100%", textAlign: "left", border: "none",
                background: "none", cursor: "pointer", display: "flex", alignItems: "center", gap: 14,
                padding: "15px 18px", borderTop: i ? "1px solid var(--hair-soft)" : "none" }}>
                <span style={{ width: 26, height: 26, borderRadius: "50%", flexShrink: 0, display: "grid", placeItems: "center",
                  border: task.done ? "none" : "2px solid var(--hair)", background: task.done ? "var(--teal)" : "transparent",
                  color: "#fff" }}>{task.done && <Icon name="check" size={16} sw={2.6} />}</span>
                <div style={{ flex: 1 }}>
                  <div style={{ fontWeight: 600, fontSize: 15.5, color: task.done ? "var(--ink-3)" : "var(--ink)",
                    textDecoration: task.done ? "line-through" : "none" }}>{task.t}</div>
                  <div style={{ fontSize: 13, color: "var(--ink-3)" }}>{task.d}</div>
                </div>
              </button>
            ))}
          </div>
        </div>

        <div style={{ padding: "20px 22px 0" }}>
          <div className="card" style={{ padding: 18, display: "flex", gap: 14, alignItems: "center",
            background: "linear-gradient(140% 120% at 100% 0%, var(--teal-tint), var(--surface) 75%)" }}>
            <div style={{ width: 46, height: 46, borderRadius: 14, flexShrink: 0, display: "grid", placeItems: "center",
              background: "var(--surface)", color: "var(--teal)", boxShadow: "var(--shadow-sm)" }}>
              <Icon name="flask" size={23} />
            </div>
            <div style={{ flex: 1 }}>
              <div style={{ fontWeight: 600, fontSize: 15.5 }}>Retest in 8 weeks</div>
              <div style={{ fontSize: 13, color: "var(--ink-2)" }}>We'll mail a kit so you can track your progress.</div>
            </div>
            <Icon name="chev" size={18} stroke="var(--ink-3)" />
          </div>
        </div>
      </div>
      <BottomNav tab="plan" go={go} />
    </div>
  );
}
