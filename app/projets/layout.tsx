// app/projets/layout.tsx
"use client";

import { ReactNode } from "react";
import { ThemeProvider } from "@/components/ThemeContext";
import Header from "@/components/Header";
import Footer from "@/components/Footer";

export default function ProjectsLayout({ children }: { children: ReactNode }) {
  return (
    <ThemeProvider>
      <div className="sticky top-0 z-[900] bg-base-200">
        <Header />
      </div>
      {children}
      <Footer />
    </ThemeProvider>
  );
}
