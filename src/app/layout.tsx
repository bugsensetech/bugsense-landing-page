import type { Metadata } from "next";
import { Montserrat } from "next/font/google";
import "./globals.css";

const montserrat = Montserrat({
  variable: "--font-montserrat",
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700", "800"],
});

export const metadata: Metadata = {
  title: "BugSense — The Lab in Your Hands | Point-of-Care UTI Diagnostics",
  description:
    "BugSense delivers complete microbiological UTI diagnostics — pathogen ID, bacterial load, and antibiotic resistance — at the point of care, in 12 hours, on paper. Clinically validated with 100% sensitivity.",
  keywords: [
    "UTI diagnostics",
    "point of care testing",
    "antibiotic resistance",
    "rapid diagnostics",
    "BugSense",
    "urinary tract infection",
    "antimicrobial resistance",
    "clinical microbiology",
    "POCT",
    "paper-based diagnostics",
  ],
  authors: [{ name: "BugSense" }],
  openGraph: {
    title: "BugSense — The Lab in Your Hands",
    description:
      "Complete UTI diagnostics at the point of care. Pathogen ID, bacterial load, and antibiotic resistance in 12 hours. Clinically validated, peer-reviewed.",
    url: "https://bugsensedx.com",
    siteName: "BugSense",
    locale: "en_US",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "BugSense — The Lab in Your Hands",
    description:
      "Complete UTI diagnostics at the point of care in 12 hours. 100% sensitivity. Peer-reviewed.",
  },
  robots: {
    index: true,
    follow: true,
  },
  alternates: {
    canonical: "https://bugsensedx.com",
  },
  icons: {
    icon: "/icon.svg",
    apple: "/icon.svg",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={`${montserrat.variable} h-full antialiased`}>
      <body className="min-h-full flex flex-col">{children}</body>
    </html>
  );
}
