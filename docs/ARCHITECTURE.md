# TinCap OS Architecture

## Current Architecture

TinCap OS currently runs as a local Next.js frontend application.

```text
frontend/app              Next.js routes and layout
frontend/components/sales Sales workspace screens
frontend/components/ui    Reusable UI primitives
frontend/lib              Types, helpers, data loader
frontend/mock             Mock JSON data
```

## Future Architecture

```text
frontend  ->  FastAPI backend  ->  SQLite database
```

The frontend should be ready for that future connection, but it must not call an API until the backend task exists.

## Legacy Area

`calculator/`, `requirements.txt`, and old calculator launcher names belong to the previous Streamlit prototype. They should not receive new functionality unless a task explicitly reactivates them.
