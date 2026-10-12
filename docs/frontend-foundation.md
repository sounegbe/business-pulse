# Frontend foundation

## Source provenance

The supplied Stitch ZIP contains 23 screen exports, an architecture blueprint, and design guidance. This milestone retains the four pilot screen HTML exports in `design/stitch/` and rebuilds their shared mobile shell in React/TypeScript. Reference colors: surface #f8f9ff, text #0b1c30, dark primary #131b2e, green #006c4a, mint #82f5c1. Fonts: Plus Jakarta Sans headings, Inter body, Material Symbols icons. Static exported HTML is reference material, not executable application source.

## Routes

`#/dashboard`, `#/hotel`, `#/rental`, `#/tickets`. Hash routes support static hosting and reload without a server rewrite contract. Native links preserve browser back/forward navigation.

## Components

AppShell owns header, skip link and bottom navigation. UI owns buttons, cards, badges, metrics, sections, fields, empty states and native dialogs. DashboardPage, ReportPage (shared by hotel and rental), TicketsPage and EntryForm implement the pilot screens. DemoProvider isolates validated browser persistence and sample state. No backend contracts, database migrations or hosting access settings are changed.

## Demo boundaries

Demo state lives under `businesspulse.react.demo.v1`, separate from the earlier HTML demo. Roles/approval are simulations. Receivables remain labeled Stitch samples. No real transactions, attachments, notifications, authentication or tenant records. Money entries are decimal strings, converted to integer cents only for demo validation/aggregation. Future server totals and decimal serialization must be agreed with the backend engineer.

## Required backend agreements

Session login/me/logout/renewal and CSRF behavior; allowed locations; filtered dashboard summaries; daily report CRUD/submission/approval/return/revisions; payments/expenses/idempotency; units/charges/payment allocations; ticket assignment/transitions/history; staff roster; private upload/download/export endpoints. Agree on errors, permissions, pagination, currency, reporting dates and concurrent-update responses before API integration. No endpoint names or request schemas are finalized here.

## Missing designs

Login/expiry, user/location administration, report list and correction history, upload states, loading/forbidden/server failures need Stitch-compatible designs. GPS, telemetry, escrow and cryptographic certification are deferred.

## Verification

Run `npm ci`, `npm run typecheck`, `npm test`, `npm run build`. Automated DOM tests verify actual React navigation, native-dialog controls, input validation, persistence, report locking and errors. They are not browser visual tests or live backend integration tests. Phone/tablet/desktop visual review remains a separate acceptance check.
