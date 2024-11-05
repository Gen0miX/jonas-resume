"use client";

import { useEffect, useState, useRef } from "react";
import { ThemeProvider } from "../components/ThemeContext";
import AppJP from "../components/AppJP";
import Loading from "../components/loading";

export default function App() {
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const handlePageLoad = () => {
      setIsLoading(false);
    };

    // Vérifie si le document est complètement chargé
    if (document.readyState === "complete") {
      handlePageLoad();
    } else {
      window.addEventListener("load", handlePageLoad);
      return () => window.removeEventListener("load", handlePageLoad);
    }
  }, []);

  return <ThemeProvider>{isLoading ? <Loading /> : <AppJP />}</ThemeProvider>;
}
