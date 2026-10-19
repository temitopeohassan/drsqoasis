# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project

React 18 + Vite marketing site for DRSQ Oasis LLC (formerly DRKS Alignment LLC; built from a "DRSQ MCP brief"). Brand colors navy `#062961` / gold `#F7B916`, DM Serif Display for headings, Manrope for body text.

- `src/pages/` — route pages (Home, WhatWeDo, WhoWeAre + Leadership, JoinOurTeam, Contact, NotFound)
- `src/components/` — shared UI (Header, Hero, Footer, PageHead, CtaBand, Arc, Seo, ScrollToTop)
- `src/data/` — **all site copy lives here** (site.js, services.js, leadership.js), not hardcoded in components
- `src/styles/global.css` — design tokens defined at `:root`

## Commands

- `npm run dev` — start dev server (localhost:5173)
- `npm run build` — build to `dist/`
- `npm run preview` — preview the production build locally
- `php -S localhost:8000 -t public` — chat backend for local dev (Vite proxies `/api` to it)
- `npm run lint` — run ESLint (flat config in `eslint.config.js`; `react/prop-types` is disabled since this codebase doesn't use PropTypes)

No test suite is configured in this project.

## Deployment

The build output (`dist/`) is manually uploaded to a **LAMP/Apache server** — this is the real deployment target, despite `vercel.json` and `public/_redirects` existing in the repo as leftover/unused SPA-rewrite configs for Netlify/Vercel. Apache does not pick up `_redirects` or `vercel.json`; the SPA rewrite (all routes → `index.html`) lives in `public/.htaccess`, which Vite copies into `dist/`, since this is a client-side-routed (React Router) single-page app. It also blocks dotfiles such as `.env`.

## Chat assistant

`src/components/ChatWidget.jsx` (fixed lower-right) posts to `public/api/chat.php`, a PHP endpoint using the Anthropic PHP SDK with two tools, `capture_lead` and `forward_issue`, that email the team via `public/api/lib/mailer.php`. Conversation history is kept in the PHP session, not sent by the browser. Config comes from `.env` (see `.env.example`), loaded from two directories above `public/api/` — the project root locally, above the web root in production. PHP dependencies live in `public/api/vendor` (`composer install -d public/api`), which Vite copies into `dist/api`; `public/api/.htaccess` blocks everything there except `chat.php`. The company facts in `public/api/lib/prompt.php` mirror `src/data/` and fall under the same compliance rule below.

## Compliance note

The site publishes only verified copy. Unverified content — government credentials (UEI, CAGE, NAICS, SAM registration), certifications, client and partner names, past performance, community giving figures and any quantitative results — has been removed rather than shown as a `[VERIFY]`/`[BRACKETED]` placeholder. Do not reintroduce placeholder values into `src/data/`: add a field only once the team has confirmed the real value.

## Known gaps

- The contact form (`src/pages/Contact.jsx`) only validates client-side — it is not wired to any backend, email service, or CRM.
- `company.email`, `company.phone` and `company.address` are published as verified contact detail, on the Footer and the Contact page. Headquarters, service area and social profile links are still missing — they were removed with the placeholder cleanup; re-add them to `src/data/site.js` (and the Footer/Contact markup) once real values exist.
