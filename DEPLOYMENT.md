# Rising Kashmir — Deployment

RK-main is a **single Next.js 14 app** (pages + API routes). There is no separate backend to host on Railway under a backends-only strategy.

## Recommended hosting

| Platform | Role |
|----------|------|
| **Vercel** | Primary production host (`rising-kashmir` project) |
| **Render** | **Decommission** if still running — duplicate of the same app |

Vercel production URL: `https://rising-kashmir-cyan.vercel.app` (or custom domain `risingkashmir.com`).

## Required env vars (Vercel dashboard)

| Variable | Purpose |
|----------|---------|
| `AUTH_SECRET` | JWT signing (32+ chars) |
| `AUTH_GOOGLE_ID` | Google OAuth client ID |
| `AUTH_GOOGLE_SECRET` | Google OAuth secret |
| `NEXT_PUBLIC_SITE_URL` | Optional — sitemap/RSS (default `https://risingkashmir.com`) |
| `REVALIDATE_SECRET` | Optional — `POST /api/revalidate` webhook |

Google OAuth redirect: `https://<your-domain>/api/auth/callback/google`

## Render decommission checklist

1. Confirm Vercel deployment is healthy (`/en` loads, auth works).
2. Export any secrets from Render dashboard if not already on Vercel.
3. Delete Render service `rising-kashmir` from [render.com](https://render.com).
4. Archive [`render.yaml`](archive/render.yaml) in this repo (done).

## Railway (not planned)

Moving to Railway would require deploying the **entire** Next.js app via [`Dockerfile`](Dockerfile), not backend-only. Stay on Vercel unless consolidating all infra later.
