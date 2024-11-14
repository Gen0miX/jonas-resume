import React, { ReactNode, useEffect, useState } from "react";
import Link from "next/link";
import ThemeToggleButton from "./ThemeToggleButton";
import CVDownloadButton from "./cv/CVDownloadButton";

interface Props {
  children?: ReactNode;
  href: string;
}

function NavItemHeader({ children, href, ...props }: Props) {
  return (
    <li className="text-lg antialiased font-medium font-heading lg:text-xl">
      <Link href={href}>
        <span className="">//</span>
        {children}
      </Link>
    </li>
  );
}

export default function Header() {
  return (
    <div className="navbar bg-base-200">
      <div className="ml-3 navbar-start">
        <Link
          href="#"
          className="flex flex-col justify-end p-0 m-0 text-xl leading-none transition-transform duration-200 ease-in font-heading hover:-skew-x-6 hover:scale-105 hover:scale-y-125"
        >
          <span className="font-bold">Jonas</span>{" "}
          <span className="ml-2 font-extralight">Pilloud</span>
        </Link>
      </div>
      <div className="navbar-center">
        <div className="dropdown dropdown-bottom lg:hidden">
          <div
            tabIndex={0}
            role="button"
            className="m-1 text-xl antialiased font-normal border-none btn rounded-box font-heading bg-base-300"
          >
            // MENU
          </div>
          <ul
            tabIndex={0}
            className="dropdown-content menu bg-base-200 rounded-box z-[1] w-52 p-2 shadow"
          >
            <NavItemHeader href="#about-me">À PROPOS</NavItemHeader>
            <NavItemHeader href="#career">CARRIÈRE</NavItemHeader>
            <NavItemHeader href="#skills">CAPACITÉS</NavItemHeader>
            <NavItemHeader href="#projects">PROJETS</NavItemHeader>
          </ul>
        </div>
        <ul className="hidden px-1 menu menu-xl menu-horizontal lg:flex">
          <NavItemHeader href="#about-me">À PROPOS</NavItemHeader>
          <NavItemHeader href="#career">CARRIÈRE</NavItemHeader>
          <NavItemHeader href="#skills">CAPACITÉS</NavItemHeader>
          <NavItemHeader href="#projects">PROJETS</NavItemHeader>
        </ul>
      </div>
      <div className="mr-0 sm:mr-3 navbar-end">
        <ul className="ml-auto menu menu-sm menu-horizontal bg-base-300 rounded-box">
          <li>
            <ThemeToggleButton iconSize={20} />
          </li>
          <li>
            <CVDownloadButton iconSize={20} />
          </li>
        </ul>
      </div>
    </div>
  );
}
