// Pass-through root layout. `<html>`/`<body>` are rendered by
// src/app/[locale]/layout.tsx (needs the locale for `lang`), and by the
// locale-less routes below it (src/app/page.tsx, src/app/not-found.tsx).
// A root layout file is still required for those locale-less routes to exist.
export default function RootLayout({ children }: { children: React.ReactNode }) {
  return children;
}
