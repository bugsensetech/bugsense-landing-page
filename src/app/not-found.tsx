import type { Metadata } from "next";
import { NotFoundContent } from "@/components/NotFoundContent";

/**
 * Root 404. Lives outside the [locale] segment so it also covers unknown
 * locales and is exported as out/404.html, which GitHub Pages serves for
 * any missing path. Copy is picked client-side from the URL / stored locale.
 */
export const metadata: Metadata = {
  title: "404 — BugSense",
  robots: { index: false },
};

export default function NotFound() {
  return (
    <html lang="en">
      <body
        style={{
          margin: 0,
          minHeight: "100vh",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          textAlign: "center",
          background: "#26215C",
          color: "#fff",
          fontFamily: "Montserrat, system-ui, -apple-system, 'Segoe UI', Roboto, sans-serif",
        }}
      >
        <NotFoundContent />
      </body>
    </html>
  );
}
