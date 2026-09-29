import type { Metadata, Viewport } from "next";
import { Be_Vietnam_Pro, Cormorant_Garamond, Pinyon_Script } from "next/font/google";
import { ceremony, couple } from "@/lib/wedding";
import "./globals.css";

/* All three carry the `vietnamese` subset, so diacritics never fall back. */
const cormorant = Cormorant_Garamond({
  variable: "--font-cormorant",
  subsets: ["latin", "vietnamese"],
  weight: ["300", "400", "500", "600"],
  // The real italic is required: a synthesised oblique mangles Vietnamese
  // tone marks (the grave in "và" comes out as a hook).
  style: ["normal", "italic"],
  display: "swap",
});

const pinyon = Pinyon_Script({
  variable: "--font-pinyon",
  subsets: ["latin", "vietnamese"],
  weight: "400",
  display: "swap",
});

const sans = Be_Vietnam_Pro({
  variable: "--font-sans",
  subsets: ["latin", "vietnamese"],
  weight: ["300", "400", "500"],
  display: "swap",
});

const title = `${couple.groom.name} & ${couple.bride.name}`;
const description = `Trân trọng kính mời — Lễ thành hôn ${ceremony.dateLine}, ${ceremony.venue}.`;

export const metadata: Metadata = {
  title,
  description,
  openGraph: { title, description, type: "website" },
};

export const viewport: Viewport = {
  themeColor: "#133c2b",
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html lang="vi" className={`${cormorant.variable} ${pinyon.variable} ${sans.variable}`}>
      <body>{children}</body>
    </html>
  );
}
