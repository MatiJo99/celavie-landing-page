# Celavie Chicken & Burger — landing page

React + Vite + Tailwind v4. Bilingual English / አማርኛ. Deploys free on Vercel.

## Run it

```bash
npm install
npm run dev        # http://localhost:5173
npm run build      # production build into dist/
npm run preview    # check the production build locally
```

Node 18 or newer.


## Deploy to Vercel (free)

**Option A — from GitHub (recommended, gives you auto-deploy on push):**

1. Push this folder to a new GitHub repo.
2. Go to vercel.com → **Add New → Project** → import the repo.
3. Vercel detects Vite automatically. Build command `npm run build`,
   output directory `dist`. Click **Deploy**.
4. Every `git push` to `main` redeploys. Pull requests get preview URLs.

**Option B — straight from your machine:**

```bash
npm i -g vercel
vercel          # preview deployment
vercel --prod   # production
```

### Custom domain

Vercel project → **Settings → Domains** → add `celavie.et` (or
whatever you register) → point your registrar's nameservers or add the
A/CNAME record Vercel shows you. HTTPS is issued automatically and free.


## Before you launch

- [ ] Real photos in `public/assets/` (compressed — see `ASSETS.md`)
- [ ] Logo + favicon
- [ ] Social URLs filled in
- [ ] Google Maps links for all three branches
- [ ] `og-cover.jpg` added, so shared links show a picture
- [ ] Amharic text proofread by a native speaker — machine-assisted
      translation is a starting point, not a final draft
- [ ] Tested on a real phone over mobile data
