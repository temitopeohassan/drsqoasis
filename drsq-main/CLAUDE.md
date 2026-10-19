# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project

React 18 + Vite marketing site for DRKS Alignment LLC (built from a "DRKS MCP brief"). Brand colors navy `#062961` / gold `#F7B916`, DM Serif Display for headings, Manrope for body text.

- `src/pages/` — route pages (Home, Partners, About, Government, Capabilities, Insights, Careers, Contact, NotFound)
- `src/components/` — shared UI (Header, Hero, Footer, PageHead, CtaBand, Arc, Seo, ScrollToTop)
- `src/data/` — **all site copy lives here** (site.js, capabilities.js, insights.js), not hardcoded in components
- `src/styles/global.css` — design tokens defined at `:root`

## Commands

- `npm run dev` — start dev server (localhost:5173)
- `npm run build` — build to `dist/`
- `npm run preview` — preview the production build locally
- `npm run lint` — run ESLint (flat config in `eslint.config.js`; `react/prop-types` is disabled since this codebase doesn't use PropTypes)

No test suite is configured in this project.

## Deployment

The build output (`dist/`) is manually uploaded to a **LAMP/Apache server** — this is the real deployment target, despite `vercel.json` and `public/_redirects` existing in the repo as leftover/unused SPA-rewrite configs for Netlify/Vercel. Apache does not pick up `_redirects` or `vercel.json`; the SPA rewrite (all routes → `index.html`) must be configured separately via `.htaccess` on the server, since this is a client-side-routed (React Router) single-page app.

## Compliance note

`src/data/site.js` contains `[BRACKETED]` placeholder values (founded date, headquarters, service area, contact info, UEI, CAGE, NAICS codes, certifications, contract vehicles) rendered in muted italic. Do not publish government credentials, certifications, contract vehicles, client names, past performance, or quantitative results in this file until they are verified by the team.

## Known gaps

- The contact form (`src/pages/Contact.jsx`) only validates client-side — it is not wired to any backend, email service, or CRM.
