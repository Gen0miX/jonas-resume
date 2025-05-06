"use client";

import React, { useRef, useState, useEffect } from "react";
import MousePosition from "../utils/mouse-position";
import { motion } from "framer-motion";
import { contentVariantsBot, contentVariantsTop } from "@/utils/animations";
import CTitle from "@/components/CTitle";

type SpotlightProps = {
  children: React.ReactNode;
  className?: string;
};

export default function Spotlight({
  children,
  className = "",
}: SpotlightProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const mousePosition = MousePosition();
  const mouse = useRef<{ x: number; y: number }>({ x: 0, y: 0 });
  const containerSize = useRef<{ w: number; h: number }>({ w: 0, h: 0 });
  const [boxes, setBoxes] = useState<Array<HTMLElement>>([]);

  useEffect(() => {
    containerRef.current &&
      setBoxes(
        Array.from(containerRef.current.children).map((el) => el as HTMLElement)
      );
  }, []);

  useEffect(() => {
    initContainer();
    window.addEventListener("resize", initContainer);

    return () => {
      window.removeEventListener("resize", initContainer);
    };
  }, [boxes]);

  useEffect(() => {
    onMouseMove();
  }, [mousePosition]);

  const initContainer = () => {
    if (containerRef.current) {
      containerSize.current.w = containerRef.current.offsetWidth;
      containerSize.current.h = containerRef.current.offsetHeight;
    }
  };

  const onMouseMove = () => {
    if (containerRef.current) {
      const rect = containerRef.current.getBoundingClientRect();
      const { w, h } = containerSize.current;
      const x = mousePosition.x - rect.left;
      const y = mousePosition.y - rect.top;
      const inside = x < w && x > 0 && y < h && y > 0;
      if (inside) {
        mouse.current.x = x;
        mouse.current.y = y;
        boxes.forEach((box) => {
          const boxX =
            -(box.getBoundingClientRect().left - rect.left) + mouse.current.x;
          const boxY =
            -(box.getBoundingClientRect().top - rect.top) + mouse.current.y;
          box.style.setProperty("--mouse-x", `${boxX}px`);
          box.style.setProperty("--mouse-y", `${boxY}px`);
        });
      }
    }
  };

  return (
    <div className={className} ref={containerRef}>
      {children}
    </div>
  );
}

type SpotlightCardProps = {
  children: React.ReactNode;
  className?: string;
};

export function SpotlightCard({
  children,
  className = "",
}: SpotlightCardProps) {
  return (
    <div
      className={`relative h-full bg-base-300 rounded-3xl p-px 
        before:absolute before:w-80 before:h-80 before:-left-40 before:-top-40 
        before:bg-base-300 theme-nord:before:bg-gray-800
        before:rounded-full before:opacity-0 before:pointer-events-none before:transition-opacity before:duration-500 
        before:translate-x-[var(--mouse-x)] before:translate-y-[var(--mouse-y)] 
        before:group-hover:opacity-100 theme-nord:before:group-hover:opacity-40
        before:z-10 before:blur-[100px] 
        after:absolute after:w-96 after:h-96 after:-left-48 after:-top-48 
        after:bg-primary theme-nord:after:bg-gray-900
        after:rounded-full after:opacity-0 after:pointer-events-none after:transition-opacity after:duration-500
        after:translate-x-[var(--mouse-x)] after:translate-y-[var(--mouse-y)] 
        after:hover:opacity-10 theme-nord:after:hover:opacity-30
        after:z-30 after:blur-[100px] overflow-hidden ${className}`}
    >
      {children}
    </div>
  );
}

type MySpotlightCardProps = {
  title: string;
  svg: React.FC<React.SVGProps<SVGSVGElement>>;
  color: string;
  info: string;
};

export function MySpotlightCard({
  title,
  svg: SvgIcon,
  color,
  info,
}: MySpotlightCardProps) {
  return (
    <SpotlightCard className="flex flex-col items-center max-w-md border theme-nord:border-base-content sm:h-auto">
      <motion.div
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true }}
        variants={contentVariantsTop}
        custom={0.5}
        className="relative flex items-center justify-center m-10 sm:m-14"
      >
        <div
          className={`absolute w-32 h-32 border-2 rounded-full theme-nord:border-base-content ${color}`}
        ></div>
        <SvgIcon className="relative fill-base-content theme-dark:fill-base-300 w-[85px] h-[85px]" />
      </motion.div>
      <CTitle classname="text-primary">{title}</CTitle>
      <motion.div
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true }}
        variants={contentVariantsBot}
        custom={0.8}
      >
        <p className="mx-5 mb-5 font-sans text-lg text-center sm:mx-14 sm:mb-14">
          {info}
        </p>
      </motion.div>
    </SpotlightCard>
  );
}
