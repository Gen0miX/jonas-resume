"use client";

import { useEffect, useState, useRef, Suspense, lazy } from "react";
import Hero from "../components/sections/Hero";
import Header from "../components/Header";
import AboutMe from "../components/sections/AboutMe";
import Career from "../components/sections/Career";
import Skills from "../components/sections/Skills";
import { ThemeProvider } from "../components/ThemeContext";
import CursorFollower from "../components/CursorFollower";

export default function AppJP() {
  const [showHeader, setShowHeader] = useState(false);

  const heroRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        // if element Hero is visible, hide Header
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
      <div className="">
        <div
          className={`fixed top-0 w-full transition-all duration-500 ease-in-out ${
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
        <div className="h-lvh"></div>
        <div className="h-lvh"></div>
      </div>
    </ThemeProvider>
  );
}
