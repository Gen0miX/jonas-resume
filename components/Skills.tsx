import React, { ReactNode } from "react";

interface Props {
  children?: ReactNode;
  value?: number;
}

function Skill({ children, value }: Props) {
  return (
    <div className="flex items-center">
      <p className="font-sans text-xl font-medium mr-10">{children}</p>
      <progress
        className="progress static w-56 mt-1"
        value={value}
        max="100"
      ></progress>
    </div>
  );
}

function CTitle({ children }: Props) {
  return <h2 className="font-sans font-bold text-2xl mb-3">{children}</h2>;
}

export default function Skills() {
  return (
    <section id="skills" className="mt-40 mb-10 xl:mx-32 2xl:m-60 scroll-mt-32">
      <h1 className="font-heading text-6xl lg:text-8xl  mb-5 ml-10">SKILLS</h1>
      <CTitle>CODING</CTitle>
      <Skill value={60}>HTML</Skill>
    </section>
  );
}
