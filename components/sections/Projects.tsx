"use client";

import React from "react";
import SectionTitle from "../SectionTitle";

export default function Projects() {
  return (
    <section
      id="projects"
      className="mt-40 mb-10 ml-5 mr-5 xl:mx-32 2xl:mx-60 2xl:mb-20 2xl:mt-60 scroll-mt-32"
    >
      <SectionTitle className="ml-5">PROJETS</SectionTitle>
      <div className="flex flex-col items-center">
        <p className="font-sans text-2xl font-medium sm:text-4xl">
          En construction...
        </p>
        <div className="self-center w-1/4 divider"></div>
      </div>
    </section>
  );
}
