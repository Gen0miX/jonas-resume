"use client";

import clsx from "clsx";
import React, { ReactNode, useRef, useEffect, useState } from "react";
import { staggeredContainer, letterVariant } from "@/utils/animations";
import { motion, useInView, useAnimation } from "framer-motion";

interface Props {
  children?: ReactNode;
  value?: number;
  info?: string;
  classname?: string;
}

export default function CTitle({ children, classname }: Props) {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, amount: 1 });
  const [text, setText] = useState<string[]>([]);

  useEffect(() => {
    if (typeof children === "string") {
      setText(children.split(""));
    }
  }, [children]);

  return (
    <motion.h2
      ref={ref}
      variants={staggeredContainer}
      initial="hidden"
      animate={isInView ? "visible" : "hidden"}
      className={clsx(
        "mb-3 font-sans text-2xl font-bold lg:text-4xl",
        classname
      )}
    >
      {text.map((letter, index) => (
        <motion.span
          key={index}
          variants={letterVariant}
          style={{ display: "inline-block" }}
        >
          {letter === " " ? "\u00A0" : letter}
        </motion.span>
      ))}
    </motion.h2>
  );
}
