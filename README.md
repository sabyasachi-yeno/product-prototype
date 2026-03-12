# PulseMatch

Prediction-market prototype with dating-style matching, trusted interest groups, and intelligence reputation.

## Current feature set

- Multi-step onboarding with interest-group capture
- Swipe-style match feed (buttons, keyboard, and drag gesture)
- Persistent **My Positions** lifecycle
- **Trusted Groups** trading desk scoped to matching interests
- **Trusted-circle social graph** showing member trust links per interest group
- **Verified Intelligence Score (VIS)** for members and circles inside each interest group
- Invite-only trusted groups with membership governance (invite/approve/reject)
- Real market creation inside trusted groups
- Collaborative forecasting workflow with consensus view
- Polymarket-style **Prediction Exchange** with market board, order-book depth, and trade ticket
- **Creator Terminal (UGC)** with moderation queue and publish/reject flow
- Group trade resolution and verified intelligence reputation
- Trading account strip (cash, exposure, realized PnL)
- Happy-flow progression tracker

## Full documentation

See the complete product and technical documentation here:

- [`PRODUCT_DOCUMENTATION.md`](./PRODUCT_DOCUMENTATION.md)

## Run locally

```bash
cd /workspace
python3 -m http.server 3000 --bind 0.0.0.0
```

Open:

- `http://127.0.0.1:3000/index.html`
