import React, { useEffect, useRef } from "react";
import { motion, useAnimation, useInView } from "framer-motion";
import { fadeInFromLeftWDelay } from "@/utils/animations";

interface ProgressBarProps {
  label: string;
  value: number;
  info?: string;
}

export default function ProgressBar({ label, value, info }: ProgressBarProps) {
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
      className="flex items-center w-full ease-in-out hover:text-primary group transition-color"
    >
      <motion.div
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true }}
        variants={fadeInFromLeftWDelay}
        className="w-32 mb-2 sm:w-40"
      >
        <p className="font-sans text-base font-medium leading-none transition-all ease-in-out sm:text-lg sm:leading-none lg:text-xl lg:leading-none group-hover:font-bold">
          {label}
        </p>
        {info && (
          <p className="font-sans text-sm leading-none transition-all ease-in-out sm:text-base sm:leading-none lg:text-lg lg:leading-none">
            {info}
          </p>
        )}
      </motion.div>
      <div className="flex items-center flex-1">
        <span className="w-10 mr-1 font-sans text-sm font-bold text-right transition-opacity ease-in-out opacity-0 group-hover:opacity-100">
          {value}%
        </span>
        <div className="static flex-1 h-2 transition-colors ease-in-out rounded progress group-hover:progress-primary ">
          <motion.div
            className="h-full rounded bg-base-content group-hover:bg-primary"
            initial={{ width: 0 }}
            animate={controls}
            transition={{ duration: 1 }}
          ></motion.div>
        </div>
      </div>
    </div>
  );
}
