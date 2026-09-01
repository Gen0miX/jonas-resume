// components/ProgressBar.tsx
"use client";

import clsx from "clsx";
import { useEffect, useRef } from "react";
import { motion, useAnimation, useInView } from "framer-motion";
import { fadeInFromLeftWDelay } from "@/utils/animations";

interface ProgressBarProps {
  label: string;
  value: number;
  info?: string;
  percentWidth?: 38 | 44;
}

export default function ProgressBar({
  label,
  value,
  info,
  percentWidth = 38,
}: ProgressBarProps) {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true });
  const controls = useAnimation();

  useEffect(() => {
    if (isInView) {
      controls.start({ width: `${value}%` });
    }
  }, [isInView, controls, value]);

  return (
    <div
      ref={ref}
      className="group flex items-center gap-3 text-base-content/85 transition-colors duration-300 hover:text-primary"
    >
      <motion.span
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true }}
        variants={fadeInFromLeftWDelay}
        className="flex w-[120px] flex-none flex-col leading-[1.1]"
      >
        <span className="font-sans text-[clamp(16px,1.2vw,19px)] font-medium">{label}</span>
        {info && (
          <span className="font-sans text-[14px] font-medium opacity-55 theme-nord:opacity-75">
            {info}
          </span>
        )}
      </motion.span>
      <div className="h-2 flex-1 rounded-full bg-base-content/[.12]">
        <motion.div
          className="h-full rounded-full bg-current"
          initial={{ width: 0 }}
          animate={controls}
          transition={{ duration: 1 }}
        />
      </div>
      <span
        className={clsx(
          "flex-none text-right font-sans text-[14px] font-bold opacity-50 theme-nord:opacity-75",
          percentWidth === 44 ? "w-11" : "w-[38px]"
        )}
      >
        {value}%
      </span>
    </div>
  );
}
