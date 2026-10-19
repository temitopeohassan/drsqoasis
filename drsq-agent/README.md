# DRSQ Oasis — AI Assistant

A full-page, Claude/ChatGPT-style chat app for DRSQ Oasis LLC, styled like the
company website (`../drsq-temp`): navy `#062961` / gold `#F7B916`, DM Serif
Display headings, Manrope body, same logo and header name.

- **New chat** screen with a greeting and suggested prompts
- **Chat history** in the left sidebar, grouped by date, with rename and delete
- Replies rendered as Markdown
- The assistant answers questions about DRSQ Oasis, **captures leads** and
  **forwards issues** to the team by email (Claude tool use)

## Structure

```
src/
  components/   Header, Sidebar, Message, Composer, Welcome, Icons
  hooks/        useConversations.js   <- chat list, saved in localStorage
  data/site.js  <- all copy and company facts
  styles/       global.css (design tokens at :root, matching the website)
public/api/
  chat.php      <- POST endpoint: calls Claude, runs tools, stores history
  lib/prompt.php   assistant instructions + tool definitions
  lib/mailer.php   lead / issue emails (SMTP or PHP mail())
```

The browser keeps the chat list for the sidebar. The Claude conversation
history for each chat is stored on the server (one file per chat in
`CHAT_DATA_DIR`), so the browser only sends the newest message.

## Setup

Needs Node 18+, PHP 8.1+ and Composer.

```bash
npm install
cp .env.example .env              # add ANTHROPIC_API_KEY and email settings
composer install -d public/api    # Claude PHP SDK, PHPMailer, dotenv
```

## Run locally

Two terminals:

```bash
php -S localhost:8001 -t public   # assistant backend
npm run dev                       # app on http://localhost:5174, /api proxied to 8001
```

## Deploy (LAMP / Apache)

1. `npm run build` — `dist/` contains the app plus `api/` (with `vendor/`)
   and an `.htaccess`.
2. Upload the contents of `dist/` to the web root (or a subdomain such as
   `assistant.drsqoasis.com`).
3. Put `.env` in the folder **above** the web root, e.g. `/home/<user>/.env`
   for `/home/<user>/public_html`. `chat.php` reads it from two levels up;
   set `DRSQ_ENV_DIR` with Apache `SetEnv` to use another folder.
4. Make sure PHP can write to `CHAT_DATA_DIR` (default: `chat-data/` next to `.env`).

`public/api/.htaccess` blocks everything in `api/` except `chat.php`, and
`public/.htaccess` blocks dotfiles such as `.env`.
