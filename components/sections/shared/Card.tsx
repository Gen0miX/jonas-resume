// components/sections/shared/Card.tsx
"use client";

import clsx from "clsx";
import { motion } from "framer-motion";
import { forwardRef, type ComponentPropsWithoutRef } from "react";

type Props = ComponentPropsWithoutRef<typeof motion.div> & { radius?: 28 | 32 };

const Card = forwardRef<HTMLDivElement, Props>(function Card(
  { className, radius = 32, ...props },
  ref
) {
  return (
    <motion.div
      ref={ref}
      className={clsx(
        radius === 28 ? "rounded-[28px]" : "rounded-[32px]",
        "border border-base-300 bg-base-200 transition-colors duration-[400ms] hover:border-primary",
        className
      )}
      {...props}
    />
  );
});

export default Card;
