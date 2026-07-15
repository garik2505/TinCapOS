# TinCap OS

TinCap OS is a local business workspace for sales, offers, documents, and future import cost workflows.

## Current Stage

- Active frontend: `frontend/`
- Stack: Next.js, React, TypeScript, Tailwind CSS
- Data source: mock JSON in `frontend/mock/`
- Backend/API/database: not connected yet
- Legacy Streamlit calculator files are kept only as previous context

## Run Locally

```powershell
.\start_tincap_os.ps1
```

The app opens at `http://localhost:3000`.

Manual frontend commands:

```powershell
cd frontend
npm install
npm run dev
```

## Verify

```powershell
.\scripts\verify_frontend.ps1
```

## Versioning

- Every meaningful milestone should be saved as a Git commit.
- Stable snapshots should be marked with Git tags.
- Do not continue to the next feature before the current task is verified.
