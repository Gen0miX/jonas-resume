import React, { ReactNode } from "react";

interface Props {
  children?: ReactNode;
  value?: number;
  info?: string;
}

function Skill({ children, value }: Props) {
  return (
    <div className="static flex items-center hover:text-primary group transition-color ease-in-out">
      <p className="font-sans text-base leading-none font-medium sm:text-lg sm:leading-none lg:text-xl lg:leading-none group-hover:font-bold transition-all ease-in-out">
        {children}
      </p>
      <span className="font-sans ml-auto mr-1 flex items-center justify-center text-sm font-bold opacity-0 group-hover:opacity-100 transition-opacity ease-in-out">
        {value}%
      </span>
      <div className="static mt-1">
        <progress
          className="static progress w-full h-2 rounded group-hover:progress-primary transition-colors ease-in-out sm:w-64 md:w-full"
          value={value}
          max="100"
        ></progress>
      </div>
    </div>
  );
}

function Language({ children, info, value }: Props) {
  return (
    <div className="static flex items-center mb-1 hover:text-primary group transition-color ease-in-out">
      <div className="flex flex-col mb-1">
        <p className="font-sans text-base leading-none font-medium sm:text-lg sm:leading-none lg:text-xl lg:leading-none group-hover:font-bold transition-all ease-in-out">
          {children}
        </p>
        <p className="font-sans text-sm leading-none sm:text-base sm:leading-none lg:text-lg lg:leading-none group-hover:font-medium transition-all ease-in-out">
          {info}
        </p>
      </div>

      <span className="font-sans ml-auto mr-1 flex items-center justify-center text-sm font-bold opacity-0 group-hover:opacity-100 transition-opacity ease-in-out">
        {value}%
      </span>
      <div className="static mt-1">
        <progress
          className="static progress w-full h-2 rounded group-hover:progress-primary transition-colors ease-in-out sm:w-64 md:w-full"
          value={value}
          max="100"
        ></progress>
      </div>
    </div>
  );
}

function CTitle({ children }: Props) {
  return (
    <h2 className="font-sans font-bold text-2xl lg:text-4xl mb-3">
      {children}
    </h2>
  );
}

export default function Skills() {
  return (
    <section
      id="skills"
      className="mt-40 mb-10 ml-5 xl:mx-32 2xl:m-60 scroll-mt-32"
    >
      <h1 className="font-heading text-5xl mb-5 lg:text-8xl">CAPACITÉS</h1>
      <div className="flex flex-col md:flex-row md:justify-evenly">
        <div className="flex flex-col justify-evenly">
          <div className="mr-2 mb-3">
            <CTitle>CODING</CTitle>
            <Skill value={70}>HTML</Skill>
            <Skill value={60}>CSS</Skill>
            <Skill value={60}>Javascript</Skill>
            <Skill value={60}>Typescript</Skill>
            <Skill value={60}>Angular</Skill>
            <Skill value={50}>React / Native</Skill>
            <Skill value={70}>Python</Skill>
            <Skill value={50}>Java</Skill>
            <Skill value={40}>C#</Skill>
            <Skill value={80}>SQL</Skill>
            <Skill value={50}>SAP</Skill>
          </div>
        </div>
        <div className="flex flex-col justify-evenly">
          <div className="mr-2 mb-3">
            <CTitle>LANGUES</CTitle>
            <Language value={100} info="langue maternelle">
              Français
            </Language>
            <Language value={80} info="bonnes connaissances">
              Anglais
            </Language>
            <Language value={30} info="ein bisschen">
              Allemand
            </Language>
          </div>
          <div className="mr-2">
            <CTitle>OUTILS / AUTRES</CTitle>
            <Skill value={80}>Windows 11</Skill>
            <Skill value={50}>Ubuntu</Skill>
            <Skill value={60}>Photoshop</Skill>
            <Skill value={80}>Suite office</Skill>
            <Skill value={60}>Scrum / Agile</Skill>
            <Skill value={90}>VS Code</Skill>
          </div>
        </div>
      </div>
    </section>
  );
}
