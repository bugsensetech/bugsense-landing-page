# BugSense Landing Page

Production landing page for [bugsensedx.com](https://bugsensedx.com) — a point-of-care UTI diagnostics platform.

Built with Next.js 16 (App Router) + TypeScript + Tailwind CSS v4 + next-intl (EN/DE). Deployed as a static site to GitHub Pages via GitHub Actions.

## Stack

- **Framework:** Next.js 16 (App Router, static export)
- **Language:** TypeScript
- **Styling:** Tailwind CSS v4, shadcn/ui primitives, Base UI React
- **i18n:** next-intl (English default, German)
- **Hosting:** GitHub Pages (static) — custom domain `bugsensedx.com` once DNS is migrated from Wix

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
  CNAME                 # (added once DNS migration is ready → bugsensedx.com)
  ...                   # Static assets (logos, hero video, images)
messages/
  en.json
  de.json
```

## Internationalization

- Locales defined in `src/i18n/routing.ts` (`en`, `de`; default `en`).
- Translations live in `messages/en.json` and `messages/de.json`.
- No `middleware.ts` / `proxy.ts` — incompatible with static export. Locale detection happens client-side in `public/index.html` (via `navigator.language`) with a noscript fallback to `/en/`.
- Add a new locale: extend `routing.ts`, add a messages file, and add the matching entry to the root redirect in `public/index.html`, the hreflang alternates in `src/app/[locale]/layout.tsx`, and the sitemap generator in `src/app/sitemap.ts`.

## SEO

- Per-locale `generateMetadata` in `src/app/[locale]/layout.tsx` produces title, description, keywords, OpenGraph, Twitter card, `canonical`, and `hreflang` alternates.
- Organization JSON-LD is injected in the root layout.
- `robots.txt` and `sitemap.xml` are statically generated from `src/app/robots.ts` and `src/app/sitemap.ts` using `SITE_URL` from `src/lib/constants.ts`.
- Root `/` serves `public/index.html` with `noindex,follow`, canonical pointing at `/en`, and `hreflang` alternates for every locale — so only the canonical locale URLs get indexed.

## Deployment (GitHub Pages)

Deploys automatically on every push to `main` via `.github/workflows/nextjs.yml`.

### Why static export

GitHub Pages only serves static files, so `next.config.ts` is configured with:
- `output: "export"` — produces `out/`
- `trailingSlash: true` — avoids duplicate-content / 404 issues on GH Pages
- `images.unoptimized: true` — required for static export (no Next image server)
- `basePath` / `assetPrefix` — driven by the `NEXT_PUBLIC_BASE_PATH` env var (see below)

`src/app/sitemap.ts` and `src/app/robots.ts` both set `export const dynamic = "force-static"`, which is required when `output: "export"` is active.

### Current state: interim GitHub Pages URL

Until DNS is migrated from Wix, the site is served at:

```
https://bugsensetech.github.io/bugsense-landing-page/
```

For this URL to work, the build needs a basePath matching the repo name. The workflow sets it:

```yaml
- name: Build with Next.js
  env:
    NEXT_PUBLIC_BASE_PATH: /bugsense-landing-page
  run: ...
```

No `public/CNAME` is committed during this phase — if it were, GitHub Pages would expect the custom domain and the `github.io` URL would break.

Canonical URLs and the sitemap still point to `https://bugsensedx.com` (from `SITE_URL`) on purpose: we don't want Google to index the interim `github.io` URL. Once DNS is migrated, the canonicals already match the real domain.

### Switching to the custom domain (bugsensedx.com)

When ready to migrate DNS from Wix to GitHub Pages:

1. Create `public/CNAME` containing one line: `bugsensedx.com`
2. In `.github/workflows/nextjs.yml`, remove the `NEXT_PUBLIC_BASE_PATH` env (or set it to an empty string). Assets need to be served from `/`, not `/bugsense-landing-page/`.
3. Point DNS at GitHub Pages per the [official guide](https://docs.github.com/en/pages/configuring-a-custom-domain-for-your-github-pages-site/managing-a-custom-domain-for-your-github-pages-site). For an apex domain, add the four A records; optionally add a `www` CNAME.
4. In GitHub → Settings → Pages, set the custom domain to `bugsensedx.com` and enable **Enforce HTTPS** once the certificate provisions.
5. Push. The next deploy serves from `https://bugsensedx.com`.

### Migrating off GitHub Pages (e.g. to Vercel)

The static-export constraints are isolated and easily reversible:

1. `next.config.ts`: remove `output: "export"`, `trailingSlash`, `basePath`, `assetPrefix`, and `images.unoptimized`
2. Delete `public/index.html` and `public/CNAME`
3. Remove `export const dynamic = "force-static"` from `src/app/sitemap.ts` and `robots.ts` (optional — leaving them static is fine)
4. Restore locale middleware — in Next 16 the filename is `src/proxy.ts` (the `middleware` convention is deprecated). `next-intl/middleware` works the same:
   ```ts
   import createMiddleware from "next-intl/middleware";
   import { routing } from "@/i18n/routing";
   export default createMiddleware(routing);
   export const config = { matcher: ["/", "/(de|en)/:path*"] };
   ```
5. Delete `.github/workflows/nextjs.yml`
6. Point DNS at Vercel and add the domain in the Vercel dashboard

This unlocks `next/image` optimization, server-side locale detection via `Accept-Language`, ISR/SSR, preview deployments, and edge functions.
