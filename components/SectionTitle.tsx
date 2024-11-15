import clsx from "clsx";
import { ReactNode, useEffect, useState, useRef } from "react";
import { motion, useInView } from "framer-motion";

interface Props {
  children: ReactNode;
  className?: string;
}

export default function SectionTitle({ children, className }: Props) {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, amount: 1 });
  const [text, setText] = useState<string[]>([]);

  useEffect(() => {
    // Convertir le children en tableau de caractères s'il est une string
    if (typeof children === "string") {
      setText(children.split(""));
    }
  }, [children]);

  // Configuration de l'animation
  const container = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.05, // Délai entre chaque lettre
        delayChildren: 0.2,
      },
    },
  };

  const letterVariant = {
    hidden: { y: 100, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: {
        y: {
          type: "spring",
          damping: 10,
          stiffness: 80,
        },
        opacity: {
          duration: 0.4,
          ease: "backInOut",
        },
      },
    },
  };

  return (
    <motion.h1
      ref={ref}
      variants={container}
      initial="hidden"
      animate={isInView ? "visible" : "hidden"}
      className={clsx(
        "font-heading text-right text-4xl mb-5 ml-10 sm:text-6xl sm:text-left lg:text-8xl",
        className
      )}
    >
      {text.map((letter, index) => (
        <motion.span
          key={index}
          variants={letterVariant}
          style={{ display: "inline-block" }} // Important pour l'animation
        >
          {letter === " " ? "\u00A0" : letter}
        </motion.span>
      ))}
    </motion.h1>
  );
}
