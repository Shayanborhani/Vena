import { Icon } from '../components/shared.jsx'

export function BottomNav({ tab, go }) {
  const items = [
    { key: "plan",     label: "Today",   icon: "home" },
    { key: "results",  label: "Results", icon: "grid" },
    { key: "partners", label: "Care",    icon: "steth" },
  ];
  return (
    <div className="vena-bottom-nav" style={{ position: "absolute", left: 0, right: 0, bottom: 0, zIndex: 40,
      padding: "8px 16px 26px", background: "linear-gradient(to top, var(--bg) 62%, transparent)" }}>
      <div style={{ display: "flex", justifyContent: "space-around", alignItems: "center",
        background: "var(--surface)", borderRadius: 24, boxShadow: "var(--shadow-md)", padding: "9px 8px" }}>
        {items.map(it => {
          const on = tab === it.key;
          return (
            <button key={it.key} onClick={() => go(it.key)} style={{ border: "none", background: "none",
              cursor: "pointer", display: "flex", flexDirection: "column", alignItems: "center", gap: 4,
              padding: "5px 18px", color: on ? "var(--teal)" : "var(--ink-3)" }}>
              <Icon name={it.icon} size={23} sw={on ? 2.1 : 1.7} />
              <span style={{ fontSize: 11, fontWeight: on ? 700 : 500 }}>{it.label}</span>
            </button>
          );
        })}
      </div>
    </div>
  );
}
