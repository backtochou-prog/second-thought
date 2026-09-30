# Deployment

Hosted on Vercel, imported from the GitHub repo. Every push to `main` redeploys.

## Setup

1. Import `backtochou-prog/second-thought` at vercel.com/new (framework preset: Other, no build command).
2. Project Settings → Environment Variables: add `OPENROUTER_API_KEY` (mark it Sensitive).
3. Redeploy so the functions pick up the key. Vercel applies env vars at deploy time.

## Using the app

- **Decide:** describe what you're about to do → Claude Sonnet (via OpenRouter) weighs it.
- **Today:** add tasks → sorted into must/should/could with 5-minute versions.
- All data stays in the browser (localStorage). On iPhone the home-screen app has its own storage, separate from Safari.

## Install on a phone

- iPhone: open the site in Safari → Share → Add to Home Screen.
- Android: open it in Chrome → ⋮ → Install app.

## Files

- `index.html` — the app
- `api/reason.js`, `api/sort.js` — Vercel functions; both use `lib/openrouter.js`
- `vercel.json` — function time limit
- `manifest.webmanifest`, `icons/` — home-screen install
