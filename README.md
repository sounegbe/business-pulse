# BusinessPulse

React + TypeScript frontend foundation for daily hotel and rental operations, with a maintenance desk. Based on supplied Stitch designs.

## Local setup

Requires Node.js 22.12+ (Node 24 supported).

```bash
npm ci
npm run dev
```

Open the local URL printed by Vite. Routes: `#/dashboard`, `#/hotel`, `#/rental`, `#/tickets`.

## Checks

```bash
npm run typecheck
npm test
npm run build
```

## Current scope

Four pages, shared navigation/cards/forms/dialogs, demo payment and expense records, capacity editing, simulated report submission/approval/correction, maintenance assignment and lifecycle, ticket search and filtering. Sample data is labeled. Saved demo records remain in the same browser only.

No real authentication, backend/database, uploads, live GPS, escrow, or actual financial processing. Do not enter sensitive business data. Approval controls simulate roles and are not authorization controls. The browser demo uses its own versioned storage key; earlier HTML demo records are not automatically migrated.

## Structure

- `frontend/src/components`: reusable shell and visual primitives
- `frontend/src/features`: dashboard, shared reports, payment/expense form, tickets
- `frontend/src/demo`: typed fixtures and demo persistence
- `frontend/tests`: interaction tests
- `design/stitch`: four original pilot HTML references
- `docs/frontend-foundation.md`: contracts pending and verification boundaries

Google Fonts are external; system fonts provide fallback. No secrets or credentials belong in frontend environment files.

Work on feature branches and request teammate review before merging into `main`. See the frontend foundation document for remaining backend dependencies.
