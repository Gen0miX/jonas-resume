// components/sections/Career.tsx
"use client";

import { useEffect, useRef, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { ChevronDown } from "lucide-react"; // Import de l'icône Lucide
import { careerSteps, type CareerStep } from "@/data/career";
import SectionHeader from "./shared/SectionHeader";
import SectionLede from "./shared/SectionLede";
import Card from "./shared/Card";

const itemVariantsR = {
  hidden: { opacity: 0, x: 100 },
  visible: {
    opacity: 1,
    x: 0,
    transition: { type: "spring", stiffness: 80, damping: 11 },
  },
};

const itemVariantsL = {
  hidden: { opacity: 0, x: -100 },
  visible: {
    opacity: 1,
    x: 0,
    transition: { type: "spring", stiffness: 80, damping: 11 },
  },
};

type CareerCardProps = {
  step: CareerStep;
  index: number;
  isOpen: boolean;
  onToggle: () => void;
};

function CareerCard({ step, index, isOpen, onToggle }: CareerCardProps) {
  const ref = useRef<HTMLDivElement>(null);
  const [hasAnimated, setHasAnimated] = useState(false);

  useEffect(() => {
    const node = ref.current;
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting && !hasAnimated) {
          setHasAnimated(true);
        }
      },
      { threshold: 0.5 },
    );
    if (node) observer.observe(node);
    return () => {
      if (node) observer.unobserve(node);
    };
  }, [hasAnimated]);

  const panelId = `career-step-${index}`;

  return (
    <Card
      ref={ref}
      radius={28}
      variants={index % 2 === 0 ? itemVariantsL : itemVariantsR}
      initial="hidden"
      animate={hasAnimated ? "visible" : "hidden"}
    >
      <button
        type="button"
        onClick={onToggle}
        aria-expanded={isOpen}
        aria-controls={panelId}
        className="flex min-h-[44px] w-full flex-wrap items-center gap-[clamp(16px,2vw,28px)] px-[clamp(20px,2.2vw,32px)] py-[clamp(18px,1.8vw,26px)] text-left"
      >
        <div className="flex min-w-0 md:min-w-[130px] xl:min-w-[232px] flex-col gap-0.5">
          <span className="font-heading text-[clamp(22px,1.9vw,30px)] font-medium leading-none text-primary">
            {step.year}
          </span>
          <span className="font-sans text-[12px] font-bold uppercase tracking-[.16em] text-base-content/50 theme-nord:text-base-content/75">
            {step.category}
          </span>
        </div>
        <span className="min-h-[44px] w-px self-stretch bg-base-content/[.18]" />
        <span className="min-w-0 flex-1 basis-[220px] font-heading text-[clamp(22px,2.1vw,32px)] font-medium leading-[1.1]">
          {step.title}
        </span>

        {/* Remplacement par l'icône Lucide avec rotation fluide */}
        <span className="flex h-9 w-9 flex-none items-center justify-center rounded-full border border-base-content/25 text-base-content/70 theme-nord:text-base-content/85">
          <motion.div
            animate={{ rotate: isOpen ? 180 : 0 }}
            transition={{ duration: 0.25, ease: "easeInOut" }}
          >
            <ChevronDown className="w-5 h-5" />
          </motion.div>
        </span>
      </button>

      <AnimatePresence initial={false}>
        {isOpen && (
          <motion.div
            id={panelId}
            key="content"
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.3, ease: "easeInOut" }}
            className="overflow-hidden"
          >
            <div className="px-[clamp(20px,2.2vw,32px)] pb-[clamp(20px,2vw,28px)]">
              <div className="mb-[18px] h-px bg-base-content/10" />
              <p className="max-w-[900px] font-sans text-[clamp(17px,1.3vw,20px)] leading-[1.45] text-base-content/75">
                {step.description}
              </p>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </Card>
  );
}

export default function Career() {
  const [openSteps, setOpenSteps] = useState<Record<number, boolean>>({
    0: true,
  });

  return (
    <section
      id="career"
      className="px-5 md:px-0 mt-40 mb-10 xl:mx-32 2xl:mx-60 2xl:mb-20 2xl:mt-60 scroll-mt-32"
    >
      <SectionHeader
        title="CARRIÈRE"
        right={
          <span className="font-sans text-[15px] font-bold uppercase tracking-[.14em] text-base-content/55 theme-nord:text-base-content/75">
            Formations · Expériences
          </span>
        }
      />
      <SectionLede>
        Formations, expériences et services civils, du CFC d’employé de commerce
        aux mandats indépendants d’aujourd’hui.
      </SectionLede>

      <div className="mt-10 flex flex-col gap-[clamp(14px,1.4vw,20px)] px-0 md:px-8">
        {careerSteps.map((step, index) => (
          <CareerCard
            key={step.title}
            step={step}
            index={index}
            isOpen={!!openSteps[index]}
            onToggle={() =>
              setOpenSteps((current) => ({
                ...current,
                [index]: !current[index],
              }))
            }
          />
        ))}
      </div>
    </section>
  );
}
