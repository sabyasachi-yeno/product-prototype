# PulseMatch — prediction markets with dating-style matching

PulseMatch is a lightweight product prototype for prediction markets where users are matched like a dating app:

- **Swipe-based discovery** of counterparties and market opportunities.
- **Onboarding flow** that captures user profile + **interest groups**.
- **Compatibility scoring** that prioritizes either opposing or aligned conviction (user-selectable).
- **Persistent profile and matches** in local storage for iterative product testing.

## Why this concept

Prediction markets are more liquid and engaging when the platform can quickly pair people with:

1. similar topical interests (so they care),
2. compatible trading style (so they stay active), and
3. useful disagreement or syndication potential (so prices move).

PulseMatch models this by turning matching into a familiar swipe interaction.

## Prototype features

### 1) Onboarding (captures interest groups)

The onboarding flow collects:

- display name,
- experience level,
- desired pairing style (`Opposite conviction`, `Same-side syndicate`, `Hybrid`),
- risk comfort (`Conservative`, `Balanced`, `Aggressive`),
- and **interest groups** (multi-select).

Captured profile data is displayed as JSON in the UI and stored in `localStorage`.

### 2) Dating-style matching for prediction markets

After onboarding, users see swipe cards with:

- a market prompt,
- candidate counterparty profile,
- candidate side/confidence,
- implied user side based on selected pairing style,
- and a compatibility score.

Users can:

- **Pass** (left swipe equivalent),
- **Pair** (right swipe equivalent),
- use keyboard arrows (`←` pass, `→` pair),
- and review successful pairings in a match list.

### 3) Match outcomes

When a pair is successful, the app generates a suggested trade setup:

- market question,
- side pairing,
- confidence delta,
- suggested stake band,
- and shared interest tags.

## Run locally

No build tooling is required.

```bash
cd /workspace
python3 -m http.server 8000
```

Then open:

- `http://localhost:8000/index.html`

## Files

- `index.html` — app structure and onboarding screens
- `styles.css` — visual style and card interaction design
- `app.js` — onboarding state, interest capture, matching logic, persistence
