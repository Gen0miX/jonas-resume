import type { Metadata } from "next";
import { Darker_Grotesque } from "next/font/google";
import localFont from "next/font/local";
import "./globals.css";

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

function setInitialTheme() {
  return `
  (function() {
    const storedTheme = localStorage.getItem("theme");
    const systemPrefersDark = window.matchMedia("(prefers-color-scheme: dark)").matches;
    const theme = storedTheme || (systemPrefersDark ? "dark" : "nord");
    document.documentElement.setAttribute("data-theme", theme);
  })();
`;
}

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
    >
      <head>
        <script dangerouslySetInnerHTML={{ __html: setInitialTheme() }} />
      </head>
      <body className="scroll-smooth">{children}</body>
    </html>
  );
}
