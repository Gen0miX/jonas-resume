"use client";

import { useEffect, useState, useRef } from "react";
import { ThemeProvider } from "../components/ThemeContext";
import { motion, AnimatePresence } from "framer-motion";
import AppJP from "../components/pages/AppJP";
import Loading from "../components/pages/Loading";

export default function App() {
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
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

  return (
    <ThemeProvider>
      <AnimatePresence>
        {isLoading ? (
          <motion.div
            key="loading"
            initial={{ opacity: 1 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.5 }}
          >
            <Loading />
          </motion.div>
        ) : (
          <motion.div
            key="app"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.5 }}
          >
            <AppJP />
          </motion.div>
        )}
      </AnimatePresence>
    </ThemeProvider>
  );
}
