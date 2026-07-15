# PROJECT.md

This is the main working guide for TinCap OS.

## Purpose

TinCap OS is a modular operating workspace for sales, commercial offers, documents, and future China import workflows.

## Active Scope

- Build the frontend workspace first.
- Keep backend, database, and business logic disconnected until a task explicitly asks for them.
- Keep all temporary data in mock JSON.
- Save every meaningful milestone through Git when repository metadata is writable.

## Active Stack

- Frontend: Next.js, React, TypeScript, Tailwind CSS
- UI layer: local shadcn-style components in `frontend/components/ui/`
- Mock data: `frontend/mock/sales-workspace.json`
- Backend later: Python + FastAPI
- Database later: SQLite

## Repository Structure

- `frontend/` active Next.js frontend
- `backend/` future FastAPI backend
- `database/` future SQLite files and migrations
- `docs/` project rules and architecture notes
- `storage/` future local file storage
- `tests/` future automated tests
- `scripts/` local helper scripts
- `calculator/` legacy Streamlit prototype, inactive

## Working Rules

- Use UTF-8 for every source, JSON, Markdown, and config file.
- Do not use external fonts, CDN assets, or hidden network dependencies in the base frontend.
- Keep UI data in `frontend/mock/` until API integration is requested.
- Run `scripts/verify_frontend.ps1` before reporting frontend work as complete.
- Keep changes scoped to the current task.
- Do not delete legacy files without a dedicated cleanup task.
