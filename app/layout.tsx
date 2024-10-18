import type { Metadata } from "next";
import { Darker_Grotesque } from "next/font/google";
import localFont from "next/font/local";
import "./globals.css";

const darkerGrotesque = Darker_Grotesque({
  subsets: ["latin"],
  display: "swap",
  variable: "--font-darker-grotesque",
});

const bodoniModa = localFont({
  src: "./fonts/BodoniModa.woff2",
  display: "swap",
  variable: "--font-bodoni-moda",
});

export const metadata: Metadata = {
  title: "Jonas Pilloud",
  description: "Generated by create next app",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={`${darkerGrotesque.variable} ${bodoniModa.variable}`}
    >
      <body>{children}</body>
    </html>
  );
}
