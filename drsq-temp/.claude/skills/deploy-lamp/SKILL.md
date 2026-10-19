---
name: deploy-lamp
description: Build the site and prepare the dist/ output for upload to the project's LAMP/Apache server, including an .htaccess with the SPA rewrite rule Apache needs. Use when the user asks to build for deployment, prepare a release, or package the site for upload.
disable-model-invocation: true
---

This project deploys by building locally and uploading the contents of `dist/` to a LAMP/Apache server — there is no Netlify/Vercel/CI deploy pipeline, despite `vercel.json` and `public/_redirects` existing in the repo (those are unused leftovers for hosts this project does not use).

Apache does not read `_redirects` or `vercel.json`. Because this is a client-side-routed React Router SPA, the server needs an `.htaccess` rewrite so deep links (e.g. `/about`, `/careers`) don't 404 on refresh — all non-file requests must fall through to `index.html`.

## Steps

1. Run `npm run build` from the project root. This produces the `dist/` directory.
2. Check whether `dist/.htaccess` exists after the build. Vite's build does not create one (nothing in `public/` currently provides it), so write it if missing:

```apache
<IfModule mod_rewrite.c>
  RewriteEngine On
  RewriteBase /
  RewriteRule ^index\.html$ - [L]
  RewriteCond %{REQUEST_FILENAME} !-f
  RewriteCond %{REQUEST_FILENAME} !-d
  RewriteRule . /index.html [L]
</IfModule>
```

   If a `public/.htaccess` file exists in the source tree, Vite will already have copied it into `dist/` during the build — don't overwrite it, just verify it contains an equivalent SPA rewrite rule.

3. Confirm `dist/` contains `index.html`, the `assets/` folder, and the `.htaccess` file.
4. Report the final contents of `dist/` to the user and remind them the upload itself (e.g. via FTP/SFTP to the LAMP server) is a manual step this skill does not perform.
