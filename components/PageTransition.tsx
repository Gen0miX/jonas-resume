"use client";

import { motion, AnimatePresence } from "framer-motion";
import { ReactNode } from "react";
import { usePathname } from "next/navigation";

type Props = {
  children: ReactNode;
};

const pageVariants = {
  hidden: { opacity: 0, y: -500 },
  visible: { opacity: 1, y: 0 },
};

const pageTransition = {
  type: "tween",
  duration: 0.8,
  ease: "easeOut",
  delay: 0.8,
};

const pageVariantsMain = {
  hidden: { opacity: 0 },
  visible: { opacity: 1 },
};

const pageTransitionMain = {
  type: "tween",
  duration: 0.8,
  ease: "easeOut",
  delay: 0.8,
};

export default function PageTransition({ children }: Props) {
  const pathname = usePathname(); // Détection de la route

  const isMainToProject = pathname.startsWith("/projet/");
  console.log(pathname);

  return (
    <AnimatePresence mode="wait">
      {isMainToProject && (
        <motion.div
          key={pathname} // Change l'animation selon la route
          initial="hidden"
          animate="visible"
          variants={pageVariants}
          transition={pageTransition}
          className="min-h-screen"
        >
          {children}
        </motion.div>
      )}
      {!isMainToProject && (
        <motion.div
          initial="hidden"
          animate="visible"
          variants={pageVariantsMain}
          transition={pageTransitionMain}
        >
          {children}
        </motion.div>
      )}
    </AnimatePresence>
  );
}
