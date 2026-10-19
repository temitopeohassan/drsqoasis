# DRKS Alignment LLC — Website

React + Vite marketing site built from the DRKS MCP brief.
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
  data/          site.js, capabilities.js, insights.js   <- all copy lives here
  pages/         Home, Partners, About*, Government, Capabilities*, Insights, Careers, Contact
  styles/        global.css (design tokens at :root)
```

## Routes

`/` · `/partners` · `/about` · `/about/who-we-are` · `/about/mission-values` ·
`/about/leadership` · `/government` · `/capabilities` · `/capabilities/:slug` ·
`/insights` · `/careers` · `/contact`

Capability detail pages are generated from `src/data/capabilities.js`. Add an
entry there and the card, route and page appear.

## Hero images

`src/assets/hero-strategy.jpg`, `hero-alignment.jpg`, `hero-results.jpg` are
stock photography (Unsplash License — free for commercial use, no attribution
required; credits in `src/components/Hero.jsx`), standing in for the
leadership / strategy-session photography called for in the brief. Replace
with real DRKS photography by dropping files into `src/assets/` and updating
the imports in `src/components/Hero.jsx`. Slides rotate every 7s, pause on
hover or focus, and hold still under `prefers-reduced-motion`.

## Before launch

Every `[BRACKETED]` value is a placeholder, rendered in muted italic so it is
visible in review. Replace in `src/data/site.js`:

- founded, headquarters, serviceArea, email, phone
- UEI, CAGE, NAICS codes, certifications, contract vehicles
- Leadership name, title, bio, photo (`src/pages/About.jsx`, `src/pages/Home.jsx`)

Per the brief: do not publish government credentials, certifications, contract
vehicles, client names, past performance or quantitative results until verified.

The contact form validates and confirms client-side only. Point it at your email
service or CRM endpoint in `src/pages/Contact.jsx` before launch.

## Deploy

SPA rewrites are included for Netlify (`public/_redirects`) and Vercel
(`vercel.json`). For Apache/Nginx, route all paths to `index.html`.
