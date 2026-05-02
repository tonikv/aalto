# Agent Guide: Interactive Waveform Physics Learning Resource (Finnish)

> **Project codename:** `Aaltoliike-oppimispolku`
> **Target language:** Finnish (Suomi)
> **Target audience:** Finnish high school students (lukio, ages 16–18)
> **Curriculum tie-in:** FY3 / FY7 (aaltoliike ja värähtely)
> **Delivery format:** Single-page interactive web app (no backend required)

---

## 1. Project Brief

Build an interactive, browser-based learning resource that teaches high-school students how the parameters of a sine wave (amplitude, wavelength, frequency, period, phase) shape the wave they see. The student must be able to **manipulate sliders and immediately see** the wave change, then complete short guided exercises that consolidate each concept before moving on.

The entire UI, all instructional copy, all labels, all hints, and all feedback must be in **Finnish**. Do not mix English physics terms into the student-facing UI.

---

## 2. Learning Objectives (Oppimistavoitteet)

By the end of the resource the student should be able to:

1. Define and recognise the five core wave parameters: **amplitudi, aallonpituus, taajuus, jaksonaika, vaihe**.
2. Predict how changing each parameter will change the visible waveform *before* moving the slider.
3. Compute the wave speed using `v = f · λ` and verify the result on the simulation.
4. Distinguish between time-domain view (`y` vs. `t`) and space-domain view (`y` vs. `x`).
5. Interpret a wave equation of the form `y(x,t) = A · sin(kx − ωt + φ)`.

---

## 3. Required Physics Concepts and Finnish Terminology

Use this glossary as the **single source of truth** for terminology. Do not invent synonyms.

| English | Finnish (use this) | Symbol | Unit |
|---|---|---|---|
| Wave motion | aaltoliike | — | — |
| Amplitude | amplitudi | A | m |
| Wavelength | aallonpituus | λ | m |
| Frequency | taajuus | f | Hz |
| Period | jaksonaika | T | s |
| Phase | vaihe | φ | rad |
| Angular frequency | kulmataajuus | ω | rad/s |
| Wave number | aaltoluku | k | rad/m |
| Wave speed | aallon etenemisnopeus | v | m/s |
| Transverse wave | poikittaisaalto | — | — |
| Longitudinal wave | pitkittäisaalto | — | — |
| Oscillation | värähtely | — | — |
| Equilibrium position | tasapainoasema | — | — |
| Crest | aallonharja | — | — |
| Trough | aallonpohja | — | — |

Key relationships the resource must surface:
- `T = 1/f`
- `ω = 2πf`
- `k = 2π/λ`
- `v = f · λ`
- `y(x,t) = A · sin(kx − ωt + φ)`

---

## 4. Recommended Technical Stack

Pick **one** of the following — keep the project a single deliverable:

- **Option A (preferred):** Single-file React component (`.jsx`) using Tailwind utility classes and `recharts` or raw SVG for the wave plot. No build system needed if delivered as a Claude artifact.
- **Option B:** Single `.html` file with vanilla JS + a `<canvas>` element. Use this if the host environment doesn't run React.

In both cases:
- **No external network calls** at runtime.
- **No browser storage APIs** (`localStorage`, `sessionStorage`) — keep all state in component/JS memory.
- Must be fully responsive down to ~380 px width (mobile).
- Use Finnish decimal commas in all displayed numbers (e.g. `2,5 Hz`, not `2.5 Hz`).

---

## 5. UI Layout Specification

The app is divided into four vertically stacked regions:

```
┌─────────────────────────────────────────────────┐
│  HEADER:  Title + progress indicator (1/5...)   │
├─────────────────────────────────────────────────┤
│  WAVE CANVAS:  live sine wave, animated         │
│                grid + axis labels in Finnish    │
├─────────────────────────────────────────────────┤
│  CONTROLS:  sliders for A, λ, f, φ              │
│             readouts in Finnish units           │
├─────────────────────────────────────────────────┤
│  LESSON PANEL:  current step, explanation,      │
│                 task, "Tarkista" / "Seuraava"   │
└─────────────────────────────────────────────────┘
```

### 5.1 Wave canvas requirements
- X-axis labelled either `paikka x (m)` or `aika t (s)` depending on the active view.
- Y-axis labelled `poikkeama y (m)`.
- Equilibrium line (`y = 0`) drawn in a muted colour.
- Crest and trough are highlighted with small dots labelled `aallonharja` / `aallonpohja` on the first lesson only, then removed.
- Animation runs at ~60fps using `requestAnimationFrame`. The student can pause with a `Pysäytä` / `Jatka` toggle.

### 5.2 Controls (säätimet)
Each slider needs: a Finnish label, the symbol, the current value with unit, sensible min/max/step, and a visible range.

| Label shown to student | Symbol | Min | Max | Step | Unit |
|---|---|---|---|---|---|
| Amplitudi | A | 0,1 | 2,0 | 0,1 | m |
| Aallonpituus | λ | 0,5 | 5,0 | 0,1 | m |
| Taajuus | f | 0,1 | 5,0 | 0,1 | Hz |
| Vaihe | φ | 0 | 2π | π/8 | rad |

Below the sliders, show **derived values** as a read-only strip:
`Jaksonaika T = ___ s` &nbsp;&nbsp; `Aaltoluku k = ___ rad/m` &nbsp;&nbsp; `Kulmataajuus ω = ___ rad/s` &nbsp;&nbsp; `Etenemisnopeus v = ___ m/s`

These update live as the student moves the sliders. This is where most of the *aha* moments happen.

---

## 6. Lesson Flow (Oppimispolku)

The resource is **5 sequential steps**. The student cannot skip ahead — they must complete the check at the end of each step.

### Step 1 — Tutustuminen (Orientation)
- **Goal:** Get comfortable with the simulation.
- **Locked sliders:** none.
- **Copy:** Brief intro to what a wave is, pointing at `aallonharja` and `aallonpohja` overlays.
- **Task:** "Liikuta säätimiä vapaasti. Mitä tapahtuu, kun muutat amplitudia?"
- **Check (free response toggle):** Student clicks one of three multiple-choice answers describing what amplitude controls.

### Step 2 — Amplitudi
- **Goal:** Isolate amplitude as vertical stretch.
- **Locked sliders:** λ, f, φ are frozen at default values; only A is movable.
- **Task:** "Aseta amplitudi siten, että aallon huippu on tasolla 1,5 m."
- **Check:** Auto-validated when `|A − 1,5| < 0,05`.

### Step 3 — Aallonpituus ja taajuus
- **Goal:** Show that λ and f are independent controls *but* together determine v.
- **Locked sliders:** A and φ frozen; λ and f movable.
- **Task:** "Etsi yhdistelmä, jossa aallon etenemisnopeus on noin 6 m/s."
- **Check:** Auto-validated when `|f·λ − 6| < 0,3`.
- **Hint (revealed after one wrong attempt):** "Käytä yhtälöä v = f · λ."

### Step 4 — Jaksonaika
- **Goal:** Connect period to frequency via `T = 1/f`.
- **Switch the canvas to time-domain view** (`y` vs. `t`) for this step.
- **Task:** "Säädä taajuus niin, että jaksonaika on 0,5 s."
- **Check:** Auto-validated when `|1/f − 0,5| < 0,05`.

### Step 5 — Vaihe
- **Goal:** Show φ as a horizontal shift, not a shape change.
- **Display two waves simultaneously:** a reference wave (φ = 0, faded) and the student's wave.
- **Task:** "Siirrä aaltoa siten, että se on vastakkaisvaiheessa vertailuaaltoon nähden."
- **Check:** Auto-validated when `φ` is within ±π/8 of π.

After Step 5, show a summary card: `Hienoa! Olet oppinut aaltoliikkeen perusteet.` with all five parameters and their current values pinned.

---

## 7. Feedback and Microcopy (Finnish)

Use these exact phrases for consistency:

- Correct answer: **"Oikein! Hyvää työtä."**
- Wrong answer (first try): **"Ei aivan. Kokeile uudelleen."**
- Wrong answer (second try): **"Vihje: [step-specific hint]"**
- Next step button: **"Seuraava vaihe"**
- Check button: **"Tarkista"**
- Reset button: **"Palauta alkuasetukset"**
- Pause/play: **"Pysäytä"** / **"Jatka"**
- Progress indicator: **"Vaihe 3 / 5"**

---

## 8. Implementation Phases for the Agent

Work through these phases in order. Don't try to build everything at once.

**Phase 1 — Static skeleton.** Render the four-region layout with placeholder wave (a static SVG sine), sliders that update displayed values but don't yet redraw the wave, and lesson panel showing Step 1 copy.

**Phase 2 — Live wave rendering.** Wire the sliders to a wave-drawing function. Implement both space-domain and time-domain views and the animation loop. Verify visually that A scales vertically, λ scales horizontally, φ shifts horizontally.

**Phase 3 — Derived values strip.** Compute and display T, k, ω, v live. Use Finnish decimal commas.

**Phase 4 — Lesson state machine.** Implement the 5-step progression with locked sliders, validation predicates per step, hint reveal logic, and progress indicator.

**Phase 5 — Polish.** Mobile responsiveness, pause/resume, reset, summary card, accessibility (slider labels reachable by screen readers, sufficient contrast).

After each phase, **stop and verify** the simulation behaves correctly before moving on. Specifically: at the end of Phase 2, manually move each slider through its full range and confirm the wave responds as expected.

---

## 9. Acceptance Criteria

The resource is "done" when all of these are true:

- [ ] All five lesson steps are reachable and validate correctly.
- [ ] All student-facing text is in Finnish; no stray English physics terms.
- [ ] Sliders use the ranges and steps specified in §5.2.
- [ ] Numbers in the UI use the Finnish decimal comma.
- [ ] The wave animates smoothly and pauses on demand.
- [ ] `v = f · λ` displayed value matches what the student computes by hand.
- [ ] The page works on a 380-px-wide viewport without horizontal scroll.
- [ ] No `localStorage` / `sessionStorage` calls anywhere in the code.
- [ ] Resetting returns every slider, every check, and the lesson pointer to Step 1.

---

## 10. Common Pitfalls to Avoid

- **Don't conflate `f` and `ω`.** Students should see both values, but the slider exposes `f` (Hz) — `ω` is derived. The same applies to `λ` vs `k`.
- **Don't let the animation drift.** Drive the time variable from `performance.now()`, not by accumulating per-frame deltas, or the wave will desynchronise from the displayed period over time.
- **Don't allow A = 0** as a default — students need to see *a wave* on first load. Default `A = 1,0`.
- **Don't break the locked-slider rule.** In Steps 2–5, locked sliders must visually appear disabled (greyed out, `cursor: not-allowed`), not just non-functional.
- **Don't show φ as degrees.** Finnish lukio uses radians for wave phase; stay consistent.

---

## 11. Stretch Goals (Optional)

If the core 5 steps are stable, consider:

- A 6th step introducing `y(x,t) = A · sin(kx − ωt + φ)` as a written equation, with the student matching parameters to terms.
- A toggle to switch between `sin` and `cos` to make the role of φ more concrete.
- A two-wave superposition view (`y₁ + y₂`) to preview interference for the next FY course.

These are explicitly out of scope for v1. Ship the 5-step core first.

---

## 12. Handoff Checklist for the Agent

Before declaring the build complete, the agent should:

1. Open the artifact at 1280 px width and at 380 px width and screenshot both.
2. Walk through all 5 steps end-to-end, entering one wrong answer per step to confirm hints fire.
3. Verify the derived-values strip updates the instant any slider moves.
4. Confirm the file contains no English in any user-visible string (search the source for common English physics words: `wavelength`, `amplitude`, `frequency`, `phase`, `period`).
5. Hand back the artifact with a one-paragraph Finnish summary of what the student will experience.
