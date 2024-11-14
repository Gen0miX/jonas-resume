"use client";

import { useEffect, useState, useRef, Suspense, lazy } from "react";
import Hero from "../sections/Hero";
import Header from "../Header";
import AboutMe from "../sections/AboutMe";
import Career from "../sections/Career";
import Skills from "../sections/Skills";
import Projects from "../sections/Projects";
import Footer from "../Footer";
import { ThemeProvider } from "../ThemeContext";
import CursorFollower from "../CursorFollower";

export default function AppJP() {
  const [showHeader, setShowHeader] = useState(false);
  const [showCursorFollower, setShowCursorFollower] = useState(true);

  const heroRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        // if element Hero is visible, hide Header
        setShowCursorFollower(entry.isIntersecting);
        setShowHeader(!entry.isIntersecting);
      },
      { root: null, threshold: 0 }
    );
    if (heroRef.current) {
      observer.observe(heroRef.current);
    }
    return () => {
      if (heroRef.current) {
        observer.unobserve(heroRef.current);
      }
    };
  }, []);

  return (
    <ThemeProvider>
      <CursorFollower />
      <div
        className={`fixed z-[900] top-0 w-full transition-all duration-500 ease-in-out ${
          showHeader
            ? "opacity-100 translate-y-0"
            : "opacity-0 -translate-y-full"
        }`}
      >
        <Header />
      </div>
      <div ref={heroRef}>
        <Hero />
      </div>
      <AboutMe />
      <Career />
      <Skills />
      <Projects />
      <Footer />
    </ThemeProvider>
  );
}
