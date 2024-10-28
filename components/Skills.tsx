import React, { ReactNode } from "react";

interface Props {
  children?: ReactNode;
  value?: number;
}

function Skill({ children, value }: Props) {
  return (
    <div className="static flex items-center hover:text-primary group transition-color ease-in-out">
      <p className="font-sans text-lg font-medium group-hover:font-bold transition-all ease-in-out">
        {children}
      </p>
      <span className="font-sans ml-auto mr-1 flex items-center justify-center text-sm font-bold opacity-0 group-hover:opacity-100 transition-opacity ease-in-out">
        {value}%
      </span>
      <div className="static w-52 sm:w-56 mt-1">
        <progress
          className="static progress w-full h-2 rounded group-hover:progress-primary transition-colors ease-in-out"
          value={value}
          max="100"
        ></progress>
      </div>
    </div>
  );
}

function CTitle({ children }: Props) {
  return <h2 className="font-sans font-bold text-2xl mb-3">{children}</h2>;
}

export default function Skills() {
  return (
    <section
      id="skills"
      className="mt-40 mb-10 ml-5 xl:mx-32 2xl:m-60 scroll-mt-32 sm:w-96"
    >
      <h1 className="font-heading text-5xl mb-5 lg:text-8xl">CAPACITÉS</h1>
      <div className="mr-5">
        <CTitle>CODING</CTitle>
        <Skill value={70}>HTML</Skill>
        <Skill value={60}>CSS</Skill>
        <Skill value={60}>Javascript</Skill>
        <Skill value={60}>Angular</Skill>
        <Skill value={50}>React / Native</Skill>
        <Skill value={70}>Python</Skill>
        <Skill value={50}>Java</Skill>
        <Skill value={40}>C#</Skill>
      </div>
    </section>
  );
}
