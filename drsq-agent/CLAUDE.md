# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project

React 18 + Vite single-page chat app ("DRSQ Oasis Assistant") with a Claude/ChatGPT-style layout: header, left sidebar of saved chats, centred conversation column, composer at the bottom. It shares the DRSQ Oasis website's theme — the sibling `../drsq-temp` project. Keep tokens in `src/styles/global.css` and the header (logo + "DRSQ Oasis LLC" in Tahoma) in step with that site.

- `src/App.jsx` — state for the active chat and the send flow
- `src/hooks/useConversations.js` — chat list in `localStorage` (`drsq-agent-conversations`), display text only
- `src/data/site.js` — all UI copy and company facts
- `public/api/chat.php` — PHP endpoint using the Anthropic PHP SDK (beta messages, `fallbacks: 'default'`), tools `capture_lead` / `forward_issue` from `public/api/lib/prompt.php`, emails via `public/api/lib/mailer.php`. The full model history per chat (including thinking blocks) is `serialize()`d to `CHAT_DATA_DIR/<conversationId>.dat`; never trim or edit stored turns.

## Commands

- `npm run dev` — dev server on localhost:5174, proxies `/api` to localhost:8001
- `php -S localhost:8001 -t public` — PHP backend for local dev
- `composer install -d public/api` — PHP dependencies (into `public/api/vendor`, copied into `dist/api` by the build)
- `npm run build` / `npm run preview` / `npm run lint`

No test suite is configured.

## Configuration and deployment

Config comes from `.env` (see `.env.example`), loaded from two directories above `public/api/` — the project root locally, above the web root in production. Deploys like the website: upload `dist/` to a LAMP/Apache server.

## Compliance note

As on the website, publish only verified copy. Company facts in `src/data/site.js` and `public/api/lib/prompt.php` mirror `../drsq-temp/src/data/`; the prompt tells the model not to invent credentials, clients, pricing or statistics. Do not add unverified facts to either.
