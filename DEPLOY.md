# Deployment Instructions

## Setup

The app is ready to deploy to Netlify. You'll need to:

1. **Push to GitHub** (or GitLab/Bitbucket)
   ```bash
   git remote add origin https://github.com/YOUR_USERNAME/second-thought.git
   git branch -M main
   git push -u origin main
   ```

2. **Connect to Netlify** using the Chrome extension or web UI:
   - Go to netlify.app
   - Sign in to your team (fitlab68)
   - Click "Add new site" > "Import an existing project"
   - Connect your Git provider and select this repo
   - Netlify will auto-detect `netlify.toml`
   - Leave build settings as default (no build command needed—it's a static site with functions)

3. **Set environment variable**
   - In Netlify Site Settings > Environment > Environment variables
   - Add: `OPENROUTER_API_KEY` = your OpenRouter API key, with "Contains secret values" ticked
   - Redeploy to apply

4. **Done!** The site will be live at `https://your-site.netlify.app`

## Using the App

- **Decide:** describe what you're about to do → Claude Sonnet analyzes it
- **Today:** add tasks → Claude sorts them into must/should/could with 5-min versions
- All data stays in your browser (localStorage), syncs across tabs on the same device
- No login required

## Files

- `index.html` — the app
- `netlify/functions/reason.js` — handles decision analysis
- `netlify/functions/sort.js` — handles day sorting
- `netlify.toml` — Netlify config (publish dir, functions dir)
- `manifest.webmanifest`, `icons/` — home-screen install on phones
