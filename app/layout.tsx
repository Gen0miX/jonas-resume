import type { Metadata } from "next";
import { Darker_Grotesque } from "next/font/google";
import localFont from "next/font/local";
import "./globals.css";
import { ThemeScript } from "./ThemeScript";
import { SpeedInsights } from "@vercel/speed-insights/next";
import PageTranstition from "@/components/PageTransition";

const darkerGrotesque = Darker_Grotesque({
  subsets: ["latin"],
  display: "swap",
  variable: "--font-darker-grotesque",
});

const merchantVF = localFont({
  src: "./fonts/Merchant-VF.woff2",
  display: "swap",
  variable: "--font-merchant-vf",
});

export const metadata: Metadata = {
  title: "Jonas Pilloud",
  description:
    "Développeur Junior diplômé en informatique de gestion et passionné qui aime créer et apprendre en continu.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={`${darkerGrotesque.variable} ${merchantVF.variable}`}
      suppressHydrationWarning
    >
      <head>
        <ThemeScript />
      </head>
      <body className="scroll-smooth">
        <PageTranstition>{children}</PageTranstition>
        <SpeedInsights />
      </body>
    </html>
  );
}
