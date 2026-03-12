# PulseMatch Product Documentation

## 1) Product summary

PulseMatch is a prediction-market product prototype where discovery and counterpart matching works like a dating app, then transitions into trading inside trusted interest groups.

The current build includes:

- onboarding with interest-group capture,
- swipe-style match feed,
- position lifecycle management,
- trusted-group market desk,
- manual outcome resolution,
- verified intelligence reputation per group,
- portfolio/account state,
- and a guided "happy trading flow" progression tracker.

---

## 2) Product goals

### Primary goals

1. Make prediction market discovery feel fast and intuitive.
2. Match users with counterparties based on interest overlap and trading compatibility.
3. Let users trade within trusted groups anchored to their declared interests.
4. Generate an explainable reputation system tied to prediction outcomes.
5. Provide a complete happy-path from onboarding to verified reputation.

### Non-goals (for this prototype)

- Real-money custody
- External oracle integration
- KYC/compliance
- Multi-user authentication and backend sync
- Real order book / market making

---

## 3) Core user journey (happy path)

1. User completes onboarding:
   - identity, experience, pairing mode, risk style, interests.
2. User enters Match Feed and swipes cards:
   - pass or pair using buttons, keyboard, or drag gestures.
3. Mutual pair creates a position in "My Positions".
4. User opens "Trusted Groups" tab:
   - selects an interest-aligned group,
   - chooses a market,
   - places YES/NO trade with stake + conviction.
5. User resolves an outcome ("Resolve Outcome: YES/NO"):
   - trade settles,
   - account and PnL update,
   - group intelligence reputation updates.
6. Happy-flow completion reaches 100%.

---

## 4) UX architecture

## Top-level sections

- **Onboarding**
- **Market workspace** with tabs:
  - Match Feed
  - My Positions
  - Trusted Groups

## Global strip

Visible in market workspace:

- Trading cash
- Open exposure
- Realized PnL
- Happy flow completion + next action

---

## 5) Feature documentation

## 5.1 Onboarding

Captured fields:

- `displayName`
- `experience`
- `pairingMode` (`opposite`, `same`, `hybrid`)
- `riskTolerance` (1-3)
- `interests[]`
- `capturedAt`

Validation:

- display name required
- minimum 3 interests

## 5.2 Match Feed (dating-style)

Card includes:

- market prompt
- candidate trader profile
- sides/confidence
- compatibility metrics

Interaction methods:

- buttons (Pass/Pair)
- keyboard (`←` / `→`)
- drag gestures (mobile-style):
  - threshold swipe left => pass
  - threshold swipe right => pair
  - animated snap/throw transitions

## 5.3 My Positions

Created on mutual pair. Tracks:

- market prompt
- side pairing
- entry probability
- stake band
- themes
- status (`open`, `won`, `lost`)
- pnl

Allows manual settlement for the prototype.

## 5.4 Trusted Groups market desk

Group generation:

- each selected onboarding interest creates one trusted group.

Each group has:

- synthetic member count,
- curated market templates,
- local trade history.

Trade flow:

1. Select group
2. Select market
3. Enter stake
4. Set conviction
5. Trade YES or NO
6. Resolve outcome: YES/NO

## 5.5 Verified intelligence reputation

Computed per group from settled group trades:

- intelligence score (0-100)
- accuracy %
- settled call count
- tier: `Unrated`, `Building`, `Verified`, `Elite`
- verified flag

Verification thresholds:

- at least 3 settled calls
- at least 60% accuracy
- score >= 55

## 5.6 Account model

Account fields:

- `cash`
- `realizedPnl`
- `tradesPlaced`
- `tradesSettled`

Behavior:

- placing group trade deducts stake from cash (exposure reservation)
- settlement updates cash/PnL and settled counts
- open exposure is sum of open group-trade stake

---

## 6) Data model and persistence

All persistence is browser `localStorage`.

Keys:

- `pulsematch.profile.v1`
- `pulsematch.matches.v1`
- `pulsematch.positions.v1`
- `pulsematch.groupTrades.v1`
- `pulsematch.account.v1`

Notes:

- This is single-user local persistence.
- No backend sync.
- Reset Profile clears all keys above.

---

## 7) Reputation and PnL logic (current prototype)

## Group trade PnL

- If trade wins:
  - `pnl = stake * (0.25 + (100 - entryProbability)/100)`
- If trade loses:
  - `pnl = -stake`

Cash flow:

- trade placement => `cash -= stake`
- winning settlement => `cash += stake + pnl`
- losing settlement => no stake return

## Group intelligence score

Starting score = 50.

For each settled trade:

- if won: `+ (6 + convictionFactor*4)`
- if lost: `- (4 + convictionFactor*4)`
- `convictionFactor = 1 + abs(entryProbability - 50)/40`

Final score clamped to [0, 100].

---

## 8) Engineering structure

Files:

- `index.html`
  - app structure, onboarding views, tabs, controls
- `styles.css`
  - design system + responsive layouts + animation styles
- `app.js`
  - all state, interaction logic, persistence, trading/reputation engines

Architectural style:

- single-page vanilla JS app
- no external framework
- stateful UI renderer pattern

---

## 9) Known constraints

1. No real-time multi-user synchronization.
2. No real market feed or real oracle.
3. Outcome resolution is manual in UI.
4. No authentication or role system.
5. No compliance, wallet, or fiat rails.

---

## 10) Suggested next roadmap

1. External market/oracle connector for automatic resolution.
2. Auth and user accounts with cloud persistence.
3. Invite-only trusted groups and membership governance.
4. Group leaderboards and calibration scoring.
5. Anti-gaming safeguards for confidence misuse.
6. Real market creation and collaborative forecasting workflows.

---

## 11) Run guide

```bash
cd /workspace
python3 -m http.server 3000 --bind 0.0.0.0
```

Then open:

- local: `http://127.0.0.1:3000/index.html`
- or your forwarded/tunnel URL ending with `/index.html`
