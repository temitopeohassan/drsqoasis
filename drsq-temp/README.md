# DRSQ Oasis LLC — Website

React + Vite marketing site built from the DRSQ MCP brief.
Navy `#062961` / gold `#F7B916`, DM Serif Display headings, Manrope body.

## Run it

```bash
npm install
npm run dev      # http://localhost:5173
npm run build    # production build to dist/
npm run preview
```

## Structure

```
src/
  assets/        drks-logo.jpeg (header + footer), hero-strategy/alignment/results.jpg
  components/    Header, Hero, Footer, PageHead, CtaBand, Arc, Seo, ScrollToTop
  data/          site.js, services.js, leadership.js   <- all copy lives here
  pages/         Home, WhatWeDo, WhoWeAre (+ Leadership), JoinOurTeam, Contact, NotFound
  styles/        global.css (design tokens at :root)
```

## Routes

`/` · `/what-we-do` · `/what-we-do/:slug` · `/who-we-are` ·
`/who-we-are/leadership` · `/join-our-team` · `/contact`

Service detail pages are generated from `src/data/services.js`. Add an entry
there and the card, route and page appear.

## Hero images

`src/assets/hero-strategy.jpg`, `hero-alignment.jpg`, `hero-results.jpg` are
stock photography (Unsplash License — free for commercial use, no attribution
required; credits in `src/components/Hero.jsx`), standing in for the
leadership / strategy-session photography called for in the brief. Replace
with real DRSQ photography by dropping files into `src/assets/` and updating
the imports in `src/components/Hero.jsx`. Slides rotate every 7s, pause on
hover or focus, and hold still under `prefers-reduced-motion`.

## Before launch

The site carries no placeholder copy: anything unverified was removed rather
than published as a `[VERIFY]` value. What is not on the site yet, and can be
added to `src/data/site.js` once the team confirms it:

- phone, address, headquarters, service area, social profile URLs
- government credentials (UEI, CAGE, NAICS, SAM registration) and certifications
- client and partner names, past performance, community giving figures, statistics

Per the brief: publish none of the above until verified.

The contact form validates and confirms client-side only. Point it at your email
service or CRM endpoint in `src/pages/Contact.jsx` before launch.

## Chat assistant

A Claude-powered chat button sits fixed in the lower-right corner of every
page. It answers questions about DRSQ Oasis, collects lead details, and
forwards issues by email.

- `src/components/ChatWidget.jsx` — the button and chat window (copy in `src/data/chat.js`)
- `public/api/chat.php` — PHP endpoint that calls Claude and sends the emails
- `public/api/lib/prompt.php` — the assistant's instructions and company facts
- `public/api/lib/mailer.php` — lead and issue emails (SMTP or PHP `mail()`)

Setup (needs PHP 8.1+ and Composer):

```bash
cp .env.example .env              # then add ANTHROPIC_API_KEY and email settings
composer install -d public/api    # installs the Claude SDK, PHPMailer, dotenv
```

Local development, two terminals:

```bash
php -S localhost:8000 -t public   # chat backend
npm run dev                       # site; /api is proxied to port 8000
```

On the server: `npm run build` copies `public/api` (with `vendor/`) into
`dist/api`. Upload `dist/` to the web root and put `.env` in the folder
**above** the web root (e.g. `/home/<user>/.env` for `/home/<user>/public_html`).
`chat.php` reads it from two levels up; set `DRSQ_ENV_DIR` to override.

## Deploy

SPA rewrites are included for Netlify (`public/_redirects`) and Vercel
(`vercel.json`). For Apache/Nginx, route all paths to `index.html`.
