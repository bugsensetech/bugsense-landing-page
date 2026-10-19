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
  layout.tsx          # Pass-through root layout (required for the routes below)
    page.tsx            # Root URL: client-side locale detection + redirect
    not-found.tsx       # 404 page, exported as out/404.html
public/
  CNAME                 # Custom domain → bugsensedx.com
  ...                   # Static assets (logos, hero video, images)
messages/
  en.json
  de.json
content/
  blog.json            # Source of truth for the homepage Blog section
```

## Blog Content

The **Blog** section on the homepage (`src/components/sections/Blog.tsx`) is rendered from `content/blog.json`. No CMS, no build step — edit the JSON, commit to `main`, and the next deploy picks up the change.

### Schema

Each entry in the top-level array has this shape:

```jsonc
{
  "id": "unique-slug",                 // stable, unique — used as React key
  "type": "news",                      // "news" | "video" | "podcast" | "blog"
  "title": "String or { en, de }",     // localizable
  "body":  "String or { en, de }",     // localizable
  "link":  "String or { en, de }",     // localizable (e.g. language-specific articles)
  "image": "https://…",                // optional, absolute URL, used as card background
  "embedUrl": "https://…"              // optional, reserved for inline video/podcast embeds
}
```

| Field | Required | Notes |
| --- | --- | --- |
| `id` | yes | Stable unique slug. Don't reuse. |
| `type` | yes | Controls the CTA label via `messages/{locale}.json` → `blog.ctaNews` / `ctaVideo` / `ctaPodcast` / `ctaBlog`. |
| `title` / `body` / `link` | yes | Either a plain string (same for all locales) or `{ "en": "…", "de": "…" }`. Missing locales fall back to `en`. |
| `image` | optional | Absolute URL. Rendered with a plain `<img>` (cross-origin is fine). |
| `embedUrl` | optional | Not rendered today; kept for future inline embeds (YouTube, Spotify, …). |

### Adding or editing a post

1. Open `content/blog.json`.
2. Add, edit, or reorder entries — **order in the file = order shown on the site**.
3. If you introduce a new `type`, add the matching `blog.cta*` key to both `messages/en.json` and `messages/de.json`.
4. Commit to `main`; GitHub Actions rebuilds and deploys.

### Display behavior

- **Desktop:** horizontal accordion, 4 posts per page, auto-advances every 12 s (pauses on hover / manual selection). Pagination dots appear automatically when there are more than 4 items.
- **Mobile:** vertical list, every item is shown at once.
- **SEO:** all posts are additionally rendered in a visually hidden block so crawlers index every entry regardless of pagination state.

## Internationalization

- Locales defined in `src/i18n/routing.ts` (`en`, `de`; default `en`).
- Translations live in `messages/en.json` and `messages/de.json`.
- No `middleware.ts` / `proxy.ts` — incompatible with static export. The root URL is a real route (`src/app/page.tsx`) that detects the locale in the browser via `src/components/LocaleRedirect.tsx`: an explicitly chosen locale (stored in `localStorage` under `bugsense_locale` and mirrored in a `NEXT_LOCALE` cookie by the language switcher) wins, otherwise the first supported entry of `navigator.languages` is used. A `<noscript>` meta refresh falls back to the default locale. This works the same in `next dev` and in the static export.
- `src/app/layout.tsx` is a pass-through root layout; `<html>`/`<body>` are rendered by `src/app/[locale]/layout.tsx` and by the locale-less root page / not-found page. `dynamicParams = false` on the locale layout makes unknown locales render the 404 page.
- Add a new locale: extend `routing.ts`, add a messages file, and add its label to `src/app/page.tsx` and its copy to `src/components/NotFoundContent.tsx`. hreflang alternates and the sitemap derive from `routing.locales` automatically.

## SEO

- Per-locale `generateMetadata` in `src/app/[locale]/layout.tsx` produces title, description, keywords, OpenGraph, Twitter card, `canonical`, and `hreflang` alternates. Imprint and privacy pages override these with their own title/description/canonical. URL helpers live in `src/lib/metadata.ts` — all canonical/alternate URLs use trailing slashes to match `trailingSlash: true`.
- Share images (`og:image` / `twitter:image`) are static PNGs at `public/og-image-{en,de}.png`. Regenerate with `python3 scripts/og-image.py path/to/Montserrat[wght].ttf` (needs Pillow) whenever the hero headline or `metadata.ogDescription` changes.
- Organization JSON-LD (logo, address, contact, social profiles) is injected in the root layout.
- `src/app/manifest.ts` generates `/manifest.webmanifest`; `theme-color` is set via the `viewport` export.
- Icons: browser favicons (`favicon.ico`, `icon-96.png`, `icon-192.png`) are the white mark on a transparent background, plus `favicon.svg` which switches between indigo (light) and white (dark) via `prefers-color-scheme` in Chrome/Firefox; app icons (`apple-touch-icon.png`, `app-icon-{192,512}.png`) sit on the indigo tile. All are generated from `public/icon.svg`'s geometry with `python3 scripts/icons.py`.
- `robots.txt` and `sitemap.xml` are statically generated from `src/app/robots.ts` and `src/app/sitemap.ts` using `SITE_URL` from `src/lib/constants.ts`.
- Root `/` is prerendered with `noindex,follow`, canonical pointing at `/en/`, and `hreflang` alternates for every locale — only the canonical locale URLs get indexed.
- `src/app/not-found.tsx` is exported as `out/404.html`, which GitHub Pages serves for any missing path. Copy switches to German client-side based on the URL or stored locale.
- Sitemap is registered in [Google Search Console](https://search.google.com/search-console) as `https://bugsensedx.com/sitemap.xml`.

## Deployment

Every push to `main` triggers `.github/workflows/nextjs.yml`, which lints, type-checks, builds the static export and publishes it to GitHub Pages. The live site is served from `https://bugsensedx.com`.

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
2. Delete `public/CNAME`. Optionally replace the client-side root redirect (`src/app/page.tsx`) with a server redirect once middleware is back.
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
