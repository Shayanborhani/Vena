# Handoff: Vena — blood-test AI consumer app

## Overview
**Vena** is a mobile consumer health app. A user takes a finger-prick blood sample at home, mails it to a partner lab, and Vena's "AI" reads the panel, surfaces the single most important finding in plain language, and **routes the user to the exact partner who can help** — a doctor, dietitian, gym/coach, or pharmacy — and lets them book in one tap. Tagline: *"One drop. The right next step."*

This bundle is a working **clickable prototype** of the end-to-end product, built for a startup-camp demo.

## About the Design Files
The files in this bundle are **design references created in HTML/React (via in-browser Babel)** — a prototype showing intended look, copy, and behavior. They are **not** production code to ship as-is.

The task is to **recreate these designs in the target codebase's environment** using its established patterns and libraries. If no app exists yet, the recommended stack is **React Native / Expo** (this is a native-feeling iOS mobile app) or a React + Vite PWA — but choose whatever best fits the team. The HTML prototype intentionally fakes the device chrome (iOS bezel, status bar) and all data; in a real app those come from the OS and a backend.

## Fidelity
**High-fidelity.** Colors, typography, spacing, layout, copy, and interactions are all final-intent. Recreate the UI faithfully using the codebase's component library, but treat the exact pixel values below as the source of truth for the visual system.

## App architecture
- Single-activity app with a screen router. Two phases:
  1. **Intake** (linear, no tab bar): `welcome → activate → sample → processing`
  2. **App** (persistent bottom tab bar): `results`, `partners` (Care tab), `plan` (Today tab); plus pushed detail screens `analysis` and `booking`.
- Device canvas in the prototype is **402 × 874 px** (iPhone logical size). Safe areas: status bar ~64px top, home indicator ~34px bottom.
- Screen transitions: forward = slide in from right (+22px) + fade, 0.42s `cubic-bezier(.2,.8,.2,1)`; back = mirror from left.

## Screens / Views

### 1. Welcome (`welcome`)
- **Purpose:** brand intro + entry point.
- **Layout:** full-bleed; warm radial-tint background. Top: logomark + "Vena" wordmark. Centered block: mono kicker "FROM ONE DROP OF BLOOD", large serif headline ("Know what's going on— and *what to do next.*" — last clause in accent color), 17px body paragraph (max-width 322px). Row of 3 inline feature tags (flask "Partner labs", spark "AI read", map "Matched care"). Bottom: primary accent button "Activate my kit", ghost button "I already have results" (jumps straight to `results` — demo shortcut).
- **Entrance:** each block rises 14px + fades, staggered 50ms.

### 2. Activate kit (`activate`)
- **Purpose:** link the physical kit to the user.
- **Layout:** TopBar (back + "STEP 1 OF 3" kicker) + 3-segment progress bar (seg 0 active). Serif H1 "Activate your kit", body. Four large code cells (62×76px, mono, 34px) pre-filled "V E N A". Reassurance card with shield icon ("accredited lab… encrypted…"). Bottom: dark primary button "Continue".

### 3. Take your sample (`sample`)
- **Purpose:** sampling instructions.
- **Layout:** TopBar "STEP 2 OF 3", progress (seg 1). Serif H1 "Take your sample". Three numbered instruction cards (icon tile 52×52 with a small numbered badge, title + description): "Warm your hand", "Prick & collect", "Seal & send". Bottom: accent button "I've mailed my sample".

### 4. Processing / analysing (`processing`)
- **Purpose:** waiting state while the lab + AI work.
- **Layout:** centered. Pulsing concentric rings (2 rings, `pingRing` 2.2s loop) around a white circle with a drop icon. Serif H1 "Analysing your sample". A 4-step progress list that advances on timers (900/1800/2700/3500ms): "Sample received at lab", "Running your 32 markers", "Vena AI reading results", "Matching you with care" — each row shows wait / now (ring + blinking dots) / done (filled accent check). After ~4.2s the headline flips to "Your results are ready", icon becomes a check, and an accent button "See my results" fades in → `results`.
- **Real implementation:** drive these states from actual job/polling status, not timers.

### 5. Results dashboard (`results`) — tab
- **Purpose:** overview of the panel.
- **Layout (scroll, bottom-nav present):**
  - Header row: 44px accent avatar circle (initial "M"), greeting "Good afternoon, Maya", mono subline "Vena Essential — 32 markers · May 30", bell button.
  - **Snapshot card:** circular `ScoreRing` (value 74 / "Vitality") + a 3-row legend: counts of in-range / to-watch / need-attention (numbers colored by status).
  - **Hero attention card** (tappable → `analysis`): alert-tinted gradient, "Needs attention soon" chip, "Your inflammation marker" label, "hs-CRP **6.8** mg/L" (value in alert color), dark spark-icon circle, footer "See what Vena AI found →".
  - **All markers** section header ("6 of 32 shown"), then one card per biomarker: name + full name, status chip, big mono value + unit, "ref <range>", and a `RangeMeter` (track with a green optimal band + a dot at the value position).
- **Bottom nav:** Today / Results / Care.

### 6. Vena AI analysis (`analysis`) — the hero moment
- **Purpose:** the "magic" — synthesize the panel into one actionable story.
- **Layout (scroll):** TopBar (back + "VENA AI" + spark icon). AI intro line with avatar bubble ("Hi Maya — I read all 32 markers…"). Big serif headline: "Your body is showing **active inflammation**, likely linked to low iron." (key phrase in alert color). **"The signals I connected"** card: 3 rows (hs-CRP, Ferritin, Vitamin D) each with status dot, name, mono value+unit, and a status chip. Two plain-language paragraphs explaining hs-CRP + context and the 48-hour recommendation. **"What I'd do, in order"**: 3 numbered cards (01 doctor / 02 dietitian / 03 pharmacy) with tinted icon tiles. Disclaimer line ("guidance, not a diagnosis"). Sticky bottom accent button "See who can help" → `partners`.

### 7. Care team / partner matching (`partners`) — tab
- **Purpose:** route the user to matched partners.
- **Layout (scroll):** mono kicker "MATCHED TO YOUR RESULTS", serif H1 "Your care team", body. **Hero partner card** (the urgent doctor): alert outline + colored banner "Recommended first" (clock icon); inside: icon tile, name + role, star rating, a tinted "reason" strip with spark icon ("Your elevated hs-CRP should be reviewed…"), eta row + "Book consult →". Then kicker "THEN, THIS WEEK" and 3 standard partner cards (dietitian, gym, pharmacy), each tappable → `booking` with that partner.
- **Bottom nav** present (Care active).

### 8. Booking (`booking`)
- **Purpose:** pick a slot and confirm.
- **Layout:** TopBar "BOOKING". Partner summary card. Tinted reason strip. "PICK A DAY" → 3 day pills (Today/Tomorrow/Thu; selected = dark fill). "AVAILABLE TIMES" → 2-col grid of time chips (selected = accent tint + accent border). Sticky bottom button: disabled "Select a time" until a slot is chosen, then "Confirm booking".
- **Confirmed state** (after confirm): centered accent check circle, serif "You're booked", summary line, a card noting the user's markers are attached securely. Buttons: "Add to my plan" → `plan`, "Back to care team".

### 9. Today / plan (`plan`) — tab
- **Purpose:** ongoing action plan.
- **Layout (scroll):** mono date kicker, serif H1 "Today's plan". **Upcoming** card (alert outline): the booked doctor video consult with a red "Join" button. **Action items** checklist card (tappable rows toggle a circular check; done rows strike through + go muted): "Start vitamin D3 + K2", "Add iron-rich meals", "Two zone-2 walks" (pre-checked). **Retest in 8 weeks** card (teal-tinted gradient, flask icon, chevron).
- **Bottom nav** present (Today active).

## Interactions & Behavior
- **Navigation:** `go(screen, payload?)` sets current screen, slide direction (based on a linear ORDER array), optional payload (e.g. `{partnerKey}` into booking), and scrolls the new screen to top.
- **Bottom nav:** switches between `plan` / `results` / `partners`.
- **Processing:** timer-driven in the prototype; replace with real status polling.
- **Booking:** local state for selected day + time; confirm flips to a success view.
- **Checklist:** local toggle state per task.
- **Entrance animations:** `.rise` (14px up + fade, 0.5s) staggered via `animationDelay`; gate any opacity:0 start states on an "active/visible" condition + reduced-motion so content never stays hidden if animations don't run.

## State Management
- `screen` (string), `dir` ("fwd"|"back"), `data` (payload, e.g. selected partner).
- Booking: `day` (index), `slot` (index|null), `confirmed` (bool).
- Plan: `tasks` (array of {title, detail, done}).
- Results/markers/partners come from a static data model (`window.VENA`) — in production these are API responses (panel results, AI synthesis, partner availability).

## Design Tokens
**Type**
- Display/headline: **Instrument Serif** (400), line-height 0.98, letter-spacing -0.01em. Sizes used: 33–62px.
- UI/body: **Hanken Grotesk** (400/500/600/700).
- Numbers & lab readouts: **IBM Plex Mono** (400/500), tabular figures. Used for values, dates, ref ranges, the mono "kicker" labels (11px, 0.16em tracking, uppercase).

**Color (authored in OKLCH; sRGB hex approximations in parentheses)**
- Background `oklch(0.984 0.004 80)` (~`#FAF8F5`), card `#FFFFFF`, sunken `oklch(0.972 0.005 80)` (~`#F3F1EE`), hairline `oklch(0.91 0.006 80)` (~`#E6E3DE`).
- Ink `oklch(0.255 0.012 70)` (~`#322E29`), ink-2 `oklch(0.46 0.012 70)` (~`#6B655E`), ink-3 `oklch(0.62 0.010 70)` (~`#969089`).
- Accent **vital teal** `oklch(0.55 0.072 178)` (~`#2F7D6B`); deep `oklch(0.42 0.060 180)`; tint `oklch(0.955 0.022 178)` (~`#E6F2EE`); ink `oklch(0.40 0.062 180)`.
- Status — good `oklch(0.60 0.085 158)` (~`#3E9A6E`) / tint `#E6F4EC`; watch `oklch(0.70 0.105 76)` (~`#C99A2E`) / tint `#FAF1DF`; alert `oklch(0.585 0.135 32)` (~`#C0533C`) / tint `#FBEAE5`.
- Alternate accents offered as a tweak: clinical blue, indigo, warm clay (see `app.jsx` ACCENTS).

**Radius:** lg 26 / md 20 / sm 14 (px). "Crisp" preset 16/13/10, "Round" 32/24/16. Pills/buttons: 9999.
**Shadows:** sm `0 1px 2px rgba(40,32,20,.05), 0 2px 6px rgba(40,32,20,.04)`; md `0 2px 6px rgba(40,32,20,.06), 0 10px 28px rgba(40,32,20,.07)`; lg `0 8px 22px …`.
**Buttons:** height 56px, radius full, primary = ink bg / off-white text; teal = accent bg / white + colored glow; ghost = white card + sm shadow. `:active` scale 0.975.

## Assets
- **No bitmap assets.** The logomark and all UI icons are inline SVG line icons (`Icon` + `Logo` in `components.jsx`) — reimplement with the codebase's icon set (e.g. lucide) or port the SVG paths.
- Fonts via Google Fonts (Hanken Grotesk, Instrument Serif, IBM Plex Mono).

## Files (in this bundle)
- `index.html` — page shell, font + script loading order.
- `styles.css` — all design tokens (CSS custom properties), button/card/chip classes, animations.
- `ios-frame.jsx` — device bezel/status bar (prototype chrome only; **drop in production**).
- `components.jsx` — `Icon`, `Logo`, `StatusChip`, `RangeMeter`, `ScoreRing`, `Steps`, `TopBar`, and the `window.VENA` data model (PATIENT, BIOMARKERS, PARTNERS, STATUS).
- `screens-pre.jsx` — Welcome, Activate, Sample, Processing.
- `screens-results.jsx` — BottomNav, Results dashboard, AI Analysis.
- `screens-care.jsx` — Partners, Booking, Plan.
- `app.jsx` — router, screen transitions, viewport scaling, tweak wiring.
- `tweaks-panel.jsx` — demo-only theming panel (accent/headline/corners) — **drop in production**.
- `Vena.html` — the same prototype bundled into one offline file (for demoing, not for building).

## How to run the prototype locally
Multi-file version needs a static server (browsers block `file://` module loads):
```
python3 -m http.server 8000   # then open http://localhost:8000
```
Or just open `Vena.html` directly (self-contained).
