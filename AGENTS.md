# TinCap OS Agent Rules

These rules apply to the whole repository.

## Active Stack

- The active frontend is `frontend/`: Next.js, React, TypeScript, Tailwind CSS.
- The backend will be FastAPI later, but no backend business logic should be added until a task explicitly asks for it.
- Old Streamlit files are legacy context only. Do not extend them unless the user explicitly asks.

## Encoding and Text

- Save all source, JSON, Markdown, and config files as UTF-8.
- Do not paste mojibake or broken Cyrillic into files.
- Prefer ASCII for code identifiers and comments. Use Russian only for user-facing UI text and documentation.

## Frontend Rules

- Keep data in `frontend/mock/` until API integration is requested.
- Do not use external fonts, CDN assets, or network-loaded UI dependencies in the base app.
- Keep UI dependencies explicit in `frontend/package.json`.
- Run a build or typecheck before reporting frontend work as complete.

## Git and Versions

- Keep changes scoped to the current task.
- Do not delete or reset unrelated user changes.
- Every completed milestone should be committed when `.git` write access is available.
