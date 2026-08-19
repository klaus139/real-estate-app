# Real Estate App

TypeScript + Express starter. Build the rest as a class.

## Setup

```bash
cp .env.example .env
npm install
npm run dev
```

Health check: `GET http://localhost:3000/health`

## Scripts

| Command | What it does |
|---|---|
| `npm run dev` | Run with hot reload |
| `npm run build` | Compile to `dist/` |
| `npm start` | Run compiled app |
| `npm run typecheck` | Type-check only |

## Suggested layout (for students)

```
src/
  index.ts          ← entry (already here)
  routes/           ← HTTP routes
  controllers/      ← request handlers
  services/         ← business logic
  models/           ← types / schemas
  middleware/       ← auth, validation, errors
```
## User Registration
Note: Prefer creating users via POST /api/auth/register
