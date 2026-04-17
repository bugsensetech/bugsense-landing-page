# BugSense Landing Page

Production landing page for [bugsensedx.com](https://bugsensedx.com) — a point-of-care UTI diagnostics platform.

Built with Next.js 16 (App Router) + TypeScript + Tailwind CSS v4 + next-intl (EN/DE). Deployed as a static site to GitHub Pages via GitHub Actions.

## Stack

- **Framework:** Next.js 16 (App Router, static export)
- **Language:** TypeScript
- **Styling:** Tailwind CSS v4, shadcn/ui primitives, Base UI React
- **i18n:** next-intl (English default, German)
- **Hosting:** GitHub Pages at custom domain `bugsensedx.com`

## Local Development

```bash
npm install
npm run dev
```

Open [http://localhost:3000](http://localhost:3000). The app redirects `/` → `/en` by default.

### Scripts

| Command | Purpose |
| --- | --- |
| `npm run dev` | Start dev server |
| `npm run build` | Production build (static export to `out/`) |
| `npm run start` | Serve the production build |
| `npm run lint` | ESLint |
| `npm run type-check` | `tsc --noEmit` |

## Project Structure

```
src/
  app/
    [locale]/           # Locale-scoped routes (root layout lives here)
      layout.tsx        # <html>, metadata, JSON-LD, NextIntlClientProvider
      page.tsx          # Homepage
      imprint/          # /[locale]/imprint
      privacy/          # /[locale]/privacy
    robots.ts           # Generates /robots.txt  (force-static)
    sitemap.ts          # Generates /sitemap.xml (force-static)
  components/
    sections/           # Page sections (Hero, Problem, Solution, ...)
    ui/                 # Reusable UI primitives
  i18n/
    routing.ts          # Locale config
    request.ts          # Server-side next-intl setup
    navigation.ts       # Locale-aware Link/redirect helpers
  lib/
    constants.ts        # SITE_URL, CONTACT_EMAIL
public/
  index.html            # Static root redirect to user's preferred locale
  CNAME                 # Custom domain → bugsensedx.com
  ...                   # Static assets (logos, hero video, images)
messages/
  en.json
  de.json
```

## Internationalization

- Locales defined in `src/i18n/routing.ts` (`en`, `de`; default `en`).
- Translations live in `messages/en.json` and `messages/de.json`.
- No `middleware.ts` / `proxy.ts` — incompatible with static export. Locale detection happens client-side in `public/index.html` (via `navigator.language`) with a noscript fallback to the default locale.
- Add a new locale: extend `routing.ts`, add a messages file, and add the matching entry to the root redirect in `public/index.html`, the hreflang alternates in `src/app/[locale]/layout.tsx`, and the sitemap generator in `src/app/sitemap.ts`.

## SEO

- Per-locale `generateMetadata` in `src/app/[locale]/layout.tsx` produces title, description, keywords, OpenGraph, Twitter card, `canonical`, and `hreflang` alternates.
- Organization JSON-LD is injected in the root layout.
- `robots.txt` and `sitemap.xml` are statically generated from `src/app/robots.ts` and `src/app/sitemap.ts` using `SITE_URL` from `src/lib/constants.ts`.
- Root `/` serves `public/index.html` with `noindex,follow`, canonical pointing at `/en`, and `hreflang` alternates for every locale — only the canonical locale URLs get indexed.
- Sitemap is registered in [Google Search Console](https://search.google.com/search-console) as `https://bugsensedx.com/sitemap.xml`.

## Deployment

Every push to `main` triggers `.github/workflows/nextjs.yml`, which builds the static export and publishes it to GitHub Pages. The live site is served from `https://bugsensedx.com`.

### Static export configuration

GitHub Pages only serves static files, so `next.config.ts` uses:

- `output: "export"` — produces `out/`
- `trailingSlash: true` — avoids duplicate-content / 404 issues on GH Pages
- `images.unoptimized: true` — required for static export (no Next image server)
- `basePath` / `assetPrefix` — driven by the optional `NEXT_PUBLIC_BASE_PATH` env var (unset in production; only used for preview deploys served from a non-root path)

`src/app/sitemap.ts` and `src/app/robots.ts` set `export const dynamic = "force-static"`, which is required when `output: "export"` is active.

### DNS / domain

- Domain: `bugsensedx.com` (registrar: InterNetX via Wix as DNS host)
- Nameservers stay at Wix: `ns12.wixdns.net`, `ns13.wixdns.net`
- DNS records pointing the site at GitHub Pages:
  - A `@` → `185.199.108.153`, `185.199.109.153`, `185.199.110.153`, `185.199.111.153`
  - CNAME `www` → `bugsensetech.github.io.`
- Email (Google Workspace) is untouched: MX records at `aspmx.l.google.com` plus related SPF TXT records are preserved.
- TLS certificate: Let's Encrypt, auto-provisioned by GitHub Pages. "Enforce HTTPS" is enabled in repo Settings → Pages.

### Migrating off GitHub Pages (e.g. to Vercel)

The static-export constraints are isolated and easily reversible:

1. `next.config.ts`: remove `output: "export"`, `trailingSlash`, `basePath`, `assetPrefix`, and `images.unoptimized`.
2. Delete `public/index.html` and `public/CNAME`.
3. Remove `export const dynamic = "force-static"` from `src/app/sitemap.ts` and `robots.ts` (optional — leaving them static is fine).
4. Restore locale middleware — in Next 16 the filename is `src/proxy.ts` (the `middleware` convention is deprecated). `next-intl/middleware` works the same:
   ```ts
   import createMiddleware from "next-intl/middleware";
   import { routing } from "@/i18n/routing";
   export default createMiddleware(routing);
   export const config = { matcher: ["/", "/(de|en)/:path*"] };
   ```
5. Delete `.github/workflows/nextjs.yml`.
6. Point DNS at the new host and add the domain in its dashboard.

This unlocks `next/image` optimization, server-side locale detection via `Accept-Language`, ISR/SSR, preview deployments, and edge functions.

## License

See [LICENSE](./LICENSE). All rights reserved by BugSense.
