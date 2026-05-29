# Opulent Ride Booking

This repo is split into two Vercel projects:

- `frontend` — Vite React app
- `backend` — Vercel Serverless Functions API

## Deploy Backend

1. Import the Git repo into Vercel.
2. Set the project root directory to `backend`.
3. Add `FRONTEND_ORIGIN` after the frontend URL exists, for example:
   `https://your-frontend-project.vercel.app`
4. Deploy.

Backend endpoints:

- `GET /api/health`
- `POST /api/bookings`
- `POST /api/contact`

The backend currently validates requests and writes submissions to Vercel logs. Connect email, a CRM, or a database inside `backend/api/bookings.ts` and `backend/api/contact.ts` when you are ready to persist leads.

## Deploy Frontend

1. Import the same Git repo into a second Vercel project.
2. Set the project root directory to `frontend`.
3. Add `VITE_API_BASE_URL` with the backend deployment URL, for example:
   `https://your-backend-project.vercel.app`
4. Deploy.

The frontend uses `frontend/vercel.json` to build with Bun and rewrite all routes to `index.html`, so direct visits like `/booking` work on Vercel.

## Local Commands

```bash
bun --cwd frontend install
bun run dev:frontend
bun run build:frontend
bun run build:backend
```

Full Access
