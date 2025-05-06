"use client";
import { useEffect, useState, useRef } from "react";
import { ThemeProvider } from "../components/ThemeContext";
import { imageList } from "@/utils/images";
import AppJP from "../components/pages/AppJP";
import Loading from "../components/pages/Loading";

export default function App() {
  const [isLoading, setIsLoading] = useState(true);
  const [isHydrated, setIsHydrated] = useState(false);

  const preloadImagesWithPromise = (imageUrls: string[]) => {
    return Promise.all(
      imageUrls.map((url) => {
        return new Promise((resolve) => {
          const img = new Image();
          img.src = url;
          img.onload = resolve;
          img.onerror = resolve;
        });
      })
    );
  };

  useEffect(() => {
    setIsHydrated(true);

    const hasLoadedThisSession = sessionStorage.getItem("hasLoadedThisSession");

    if (hasLoadedThisSession) {
      setIsLoading(false);
    } else {
      const handlePageLoad = () => {
        preloadImagesWithPromise(imageList).then(() => {
          setTimeout(() => {
            setIsLoading(false);
            sessionStorage.setItem("hasLoadedThisSession", "true");
          }, 2500);
        });
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
