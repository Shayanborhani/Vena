# Claude Code Integration

_Started 2026-06-02 13:31 UTC_

---

## User

wie kann ich das jetzt mit meinem claude code connecten

## Assistant

_[tool: invoke_skill]_

_[tool: list_files]_

Ich helfe dir, das Projekt mit Claude Code zu verbinden. Lass mich kurz die passende Anleitung laden und schauen, was im Projekt liegt.

_[tool: list_files]_

_[tool: list_files]_

_[tool: present_fs_item_for_download]_

Gute Frage! Es gibt keine direkte „Live-Verbindung" zwischen diesem Projekt und Claude Code – der Weg läuft über einen **Handoff (Übergabe per Datei-Paket)**. Das Gute: dieses Projekt hat bereits einen fertigen Handoff-Ordner (`design_handoff_vena`) mit README und allen Design-Dateien.

So gehst du vor:

## So verbindest du das mit Claude Code

**1. Paket herunterladen** – Klick oben auf die Download-Karte und entpacke den ZIP-Ordner irgendwo lokal (z. B. in deinen Projektordner).

**2. Claude Code in dem Ordner starten** – Öffne ein Terminal in dem entpackten Ordner und starte Claude Code dort:
```bash
cd design_handoff_vena
claude
```

**3. Claude Code den Auftrag geben** – Die `README.md` im Paket ist so geschrieben, dass ein Entwickler (oder Claude Code) das Design allein daraus umsetzen kann. Ein guter Einstiegs-Prompt wäre z. B.:
> „Lies die README.md und setze die HTML-Design-Referenzen in [dein Framework, z. B. React/Next.js/SwiftUI] um, mit den bestehenden Patterns dieses Codebases."

**Wichtig zu verstehen:** Die HTML-Dateien im Paket sind **Design-Referenzen** (Prototypen, die Aussehen & Verhalten zeigen) – kein Produktionscode zum direkten Kopieren. Claude Code soll sie in deiner echten Codebasis nachbauen.

---

**Wenn du das in eine bestehende Codebasis einbauen willst:** Kopier den Handoff-Ordner einfach in dein vorhandenes Repo und sag Claude Code, es soll die README lesen und das Design mit deinen bestehenden Komponenten/Styles umsetzen.

Möchtest du, dass ich
- **Screenshots der Screens** ins Paket lege (als visuelle Referenz – standardmäßig nicht dabei), oder
- die **README auf ein bestimmtes Ziel-Framework** zuschneide (React, Vue, SwiftUI …)?

Sag einfach Bescheid. 👍

