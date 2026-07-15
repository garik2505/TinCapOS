# TinCap OS Development Rules

## Non-Negotiables

- Active app work happens in `frontend/`.
- Store all project files as UTF-8.
- Keep mock data in `frontend/mock/`.
- Avoid external fonts, CDN assets, and network-loaded UI dependencies.
- Run a frontend verification before saying a task is complete.

## Frontend Baseline

- Next.js app router lives in `frontend/app/`.
- Feature components live in `frontend/components/sales/`.
- Reusable UI components live in `frontend/components/ui/`.
- Shared types and helpers live in `frontend/lib/`.
- User-facing Russian text is allowed in UI and mock data.

## Dependency Rules

- Every package used by source code must be listed in `frontend/package.json`.
- Do not introduce a package just for one small UI behavior.
- If the app can work locally without a network-loaded dependency, prefer the local option.

## Verification

Run:

```powershell
.\scripts\verify_frontend.ps1
```

The task is not finished until TypeScript and Next.js build pass, unless the final report clearly states the blocker.
