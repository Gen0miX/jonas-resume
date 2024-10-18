"use client";

import { useEffect, useState, useRef } from "react";
import Hero from "../components/Hero";
import Header from "../components/Header";
import AboutMe from "../components/AboutMe";

export default function App() {
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
    <div>
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
      <div className="h-lvh"></div>
      <div className="h-lvh"></div>
    </div>
  );
}
