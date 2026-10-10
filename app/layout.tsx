import type { Metadata, Viewport } from "next";
import { Anton, Instrument_Serif, Inter, Poppins } from "next/font/google";
import { SiteFooter, SiteHeader } from "@/components/Site";
import "./globals.css";

const inter = Inter({ subsets: ["latin"], variable: "--font-inter", display: "swap" });
// Tall condensed display face for headlines, plus an italic serif for the handwritten-style accents.
const anton = Anton({ subsets: ["latin"], weight: "400", variable: "--font-display", display: "swap" });
// Chunky geometric face reserved for the scattered name letters in the hero.
const poppins = Poppins({ subsets: ["latin"], weight: "900", variable: "--font-poster", display: "swap" });
const serif = Instrument_Serif({ subsets: ["latin"], weight: "400", style: "italic", variable: "--font-script", display: "swap" });

export const metadata: Metadata = {
  title: {
    default: "Disha Dutta · Portfolio",
    template: "%s · Disha Dutta",
  },
  description: "Disha Dutta: AI / ML engineer building agentic LLM systems end to end with LangGraph, hybrid retrieval and FastAPI.",
  openGraph: {
    title: "Disha Dutta · Portfolio",
    description: "AI / ML engineer building agentic LLM systems end to end.",
    type: "website",
  },
};

export const viewport: Viewport = {
  themeColor: [
    { media: "(prefers-color-scheme: light)", color: "#f7f4ee" },
    { media: "(prefers-color-scheme: dark)", color: "#141414" },
  ],
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className={`${inter.variable} ${anton.variable} ${serif.variable} ${poppins.variable}`}>
      <body>
        <SiteHeader />
        <main>{children}</main>
        <SiteFooter />
      </body>
    </html>
  );
}
