"use client";

import { useEffect, useState, useRef } from "react";
import { ThemeProvider } from "../components/ThemeContext";
import { motion, AnimatePresence } from "framer-motion";
import AppJP from "../components/pages/AppJP";
import Loading from "../components/pages/Loading";

export default function App() {
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const handlePageLoad = () => {
      setTimeout(() => {
        setIsLoading(false);
      }, 2500);
    };

    // Vérifie si le document est complètement chargé
    if (document.readyState === "complete") {
      handlePageLoad();
    } else {
      window.addEventListener("load", handlePageLoad);
      return () => window.removeEventListener("load", handlePageLoad);
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
            transition={{ duration: 0.5 }} // Durée de la transition pour la sortie
          >
            <Loading />
          </motion.div>
        ) : (
          <motion.div
            key="app"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.5 }} // Durée de la transition pour l'entrée
          >
            <AppJP />
          </motion.div>
        )}
      </AnimatePresence>
    </ThemeProvider>
  );
}
