import React from "react";
import Image from "next/image";
import Link from "next/link";
import Project1 from "../../public/images/projects/project_1.png";
import Project2 from "../../public/images/projects/project_2.png";
import Project3 from "../../public/images/projects/project_3.png";
import Project4 from "../../public/images/projects/project_4.png";
import SectionTitle from "../SectionTitle";

export default function Projects() {
  return (
    <section id="projects" className="mt-40 mb-10 mr-5 xl:mx-32 scroll-mt-32">
      <SectionTitle className="2xl:mx-28">PROJETS</SectionTitle>
      <div className=" ml-5 grid grid-cols-1 grid-rows-[300px] sm:grid-rows-[150px,auto] lg:grid-rows-[200px,auto] gap-4 xl:ml-0">
        <div className="relative group ">
          <Link href="#" className="">
            <Image
              src={Project1}
              alt="Projet 1"
              width={1000}
              height={300}
              className="object-cover w-full h-full border-[1px] border-base-content grayscale group-hover:grayscale-0 transition-all duration-500"
            />
          </Link>
          <div className="absolute w-16 h-16 transition-all duration-500 -translate-x-1/2 -translate-y-1/2 rounded-full top-1/2 left-1/2 bg-base-content opacity-90 group-hover:mix-blend-difference"></div>
          <p className="absolute font-sans -translate-x-1/2 -translate-y-1/2 top-1/2 left-1/2">
            TITRE
          </p>
        </div>

        <div className="static grid grid-rows-[300px,300px,300px] sm:grid-cols-[50%,25%,auto] sm:grid-rows-[300px] lg:grid-rows-[400px] gap-4 ">
          <div className="relative group">
            <Link href="#" className="">
              <Image
                src={Project2}
                alt="Projet 2"
                width={1000}
                height={200}
                className="object-cover w-full h-full border-[1px] border-base-content grayscale group-hover:grayscale-0"
              />
            </Link>
            <p className="absolute font-sans -translate-x-1/2 -translate-y-1/2 top-1/2 left-1/2">
              TITRE
            </p>
            <div className="absolute w-16 h-16 -translate-x-1/2 -translate-y-1/2 rounded-full top-1/2 left-1/2 bg-base-content opacity-90 group-hover:mix-blend-difference"></div>
          </div>

          <div className="relative group">
            <Link href="#" className="">
              <Image
                src={Project3}
                alt="Projet 3"
                width={1000}
                height={1000}
                className="object-cover w-full h-full border-[1px] border-base-content grayscale group-hover:grayscale-0"
              />
            </Link>
            <div className="absolute w-16 h-16 -translate-x-1/2 -translate-y-1/2 rounded-full top-1/2 left-1/2 bg-base-content opacity-90 group-hover:mix-blend-difference"></div>
            <p className="absolute font-sans -translate-x-1/2 -translate-y-1/2 top-1/2 left-1/2">
              TITRE
            </p>
          </div>

          <div className="relative group">
            <Link href="#" className="">
              <Image
                src={Project4}
                alt="Projet 4"
                width={1000}
                height={1000}
                className="object-cover w-full h-full border-[1px] border-base-content grayscale group-hover:grayscale-0"
              />
            </Link>
            <div className="absolute w-16 h-16 -translate-x-1/2 -translate-y-1/2 rounded-full top-1/2 left-1/2 bg-base-content opacity-90 group-hover:mix-blend-difference"></div>
            <p className="absolute font-sans -translate-x-1/2 -translate-y-1/2 top-1/2 left-1/2">
              TITRE
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
