import React, { ReactNode } from "react";
import SectionTitle from "../SectionTitle";

interface Props {
  children?: ReactNode;
  value?: number;
  info?: string;
}

function Skill({ children, value }: Props) {
  return (
    <div className="flex items-center w-full ease-in-out hover:text-primary group transition-color">
      <div className="w-32 mb-2 sm:w-40">
        <p className="font-sans text-base font-medium leading-none transition-all ease-in-out sm:text-lg sm:leading-none lg:text-xl lg:leading-none group-hover:font-bold">
          {children}
        </p>
      </div>
      <div className="flex items-center flex-1">
        <span className="w-10 mr-1 font-sans text-sm font-bold text-right transition-opacity ease-in-out opacity-0 group-hover:opacity-100">
          {value}%
        </span>
        <progress
          className="static flex-1 h-2 transition-colors ease-in-out rounded progress group-hover:progress-primary"
          value={value}
          max="100"
        ></progress>
      </div>
    </div>
  );
}
function Language({ children, info, value }: Props) {
  return (
    <div className="flex items-center w-full ease-in-out hover:text-primary group transition-color">
      <div className="flex flex-col mb-1 w-36 sm:w-40">
        <p className="font-sans text-base font-medium leading-none transition-all ease-in-out sm:text-lg sm:leading-none lg:text-xl lg:leading-none group-hover:font-bold">
          {children}
        </p>
        <p className="font-sans text-sm leading-none transition-all ease-in-out sm:text-base sm:leading-none lg:text-lg lg:leading-none">
          {info}
        </p>
      </div>

      <div className="flex items-center flex-1">
        <span className="w-10 mr-1 font-sans text-sm font-bold text-right transition-opacity ease-in-out opacity-0 group-hover:opacity-100">
          {value}%
        </span>
        <progress
          className="static flex-1 h-2 transition-colors ease-in-out rounded progress group-hover:progress-primary"
          value={value}
          max="100"
        ></progress>
      </div>
    </div>
  );
}

function CTitle({ children }: Props) {
  return (
    <h2 className="mb-3 font-sans text-2xl font-bold lg:text-4xl">
      {children}
    </h2>
  );
}

export default function Skills() {
  return (
    <section
      id="skills"
      className="mt-40 mb-10 ml-5 mr-5 xl:mx-32 2xl:mx-60 2xl:mb-20 2xl:mt-60 scroll-mt-32"
    >
      <SectionTitle className="ml-5">CAPACITÉS</SectionTitle>
      <div className="flex flex-col items-center">
        <p className="font-sans text-base font-medium sm:text-lg lg:text-xl">
          Voici un résumé de mes compétences et aptitudes les plus importantes :
        </p>
        <div className="self-center w-1/4 divider"></div>
      </div>
      <div className="flex flex-col justify-between md:flex-row">
        <div className="flex flex-col justify-evenly md:grow md:mr-5 xl:mr-10">
          <div className="mb-3 mr-2">
            <CTitle>CODING</CTitle>
            <Skill value={70}>HTML</Skill>
            <Skill value={60}>CSS</Skill>
            <Skill value={60}>Javascript</Skill>
            <Skill value={60}>Typescript</Skill>
            <Skill value={60}>Angular</Skill>
            <Skill value={50}>React/Native</Skill>
            <Skill value={70}>Python</Skill>
            <Skill value={50}>Java</Skill>
            <Skill value={40}>C#</Skill>
            <Skill value={80}>SQL</Skill>
            <Skill value={50}>SAP</Skill>
          </div>
        </div>
        <div className="flex flex-col justify-evenly md:grow">
          <div className="mb-3">
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
          <div className="">
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
