"use client";
import { useEffect, useState, useRef } from "react";
import { ThemeProvider } from "../components/ThemeContext";
import { motion, AnimatePresence } from "framer-motion";
import AppJP from "../components/pages/AppJP";
import Loading from "../components/pages/Loading";

export default function App() {
  const [isLoading, setIsLoading] = useState(true);
  const [isHydrated, setIsHydrated] = useState(false);

  useEffect(() => {
    setIsHydrated(true);
    const hasLoadedThisSession = sessionStorage.getItem("hasLoadedThisSession");

    if (hasLoadedThisSession) {
      setIsLoading(false);
    } else {
      const handlePageLoad = () => {
        setTimeout(() => {
          setIsLoading(false);
          sessionStorage.setItem("hasLoadedThisSession", "true");
        }, 2500);
      };

      if (document.readyState === "complete") {
        handlePageLoad();
      } else {
        window.addEventListener("load", handlePageLoad);
        return () => window.removeEventListener("load", handlePageLoad);
      }
    }
  }, []);

  if (!isHydrated) {
    return (
      <ThemeProvider>
        <div></div>
      </ThemeProvider>
    );
  }

  if (!isLoading) {
    return (
      <ThemeProvider>
        <AppJP />
      </ThemeProvider>
    );
  }

  return (
    <ThemeProvider>
      <Loading />
    </ThemeProvider>
  );
}
