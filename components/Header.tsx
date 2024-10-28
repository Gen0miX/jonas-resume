import React, { ReactNode, useEffect, useState } from "react";
import Link from "next/link";
import ThemeToggleButton from "./ThemeToggleButton";
import { IoSunny, IoMoon } from "react-icons/io5";

interface Props {
  children?: ReactNode;
  href: string;
}

function NavItemHeader({ children, href, ...props }: Props) {
  return (
    <li className="antialiased text-lg font-medium font-heading lg:text-xl">
      <Link href={href}>
        <span className="">//</span>
        {children}
      </Link>
    </li>
  );
}

export default function Header() {
  return (
    <div className="sticky navbar bg-base-200">
      <div className="ml-3 navbar-start">
        <Link
          href="#"
          className="flex flex-col justify-end font-heading text-xl m-0 p-0 leading-none hover:-skew-x-6 hover:scale-105 hover:scale-y-125 transition-transform duration-200 ease-in"
        >
          <span className="font-bold">Jonas</span>{" "}
          <span className="ml-2 font-extralight">Pilloud</span>
        </Link>
      </div>
      <div className="navbar-center">
        <div className="dropdown dropdown-bottom md:hidden">
          <div
            tabIndex={0}
            role="button"
            className="btn m-1 text-xl antialiased font-normal font-heading"
          >
            // MENU
          </div>
          <ul
            tabIndex={0}
            className="dropdown-content menu bg-base-100 rounded-box z-[1] w-52 p-2 shadow"
          >
            <NavItemHeader href="#about-me">À PROPOS</NavItemHeader>
            <NavItemHeader href="#career">CARRIÈRE</NavItemHeader>
            <NavItemHeader href="#skills">CAPACITÉS</NavItemHeader>
            <NavItemHeader href="#projects">PROJETS</NavItemHeader>
          </ul>
        </div>
        <ul className="px-1 menu menu-xl menu-horizontal hidden md:flex">
          <NavItemHeader href="#about-me">À PROPOS</NavItemHeader>
          <NavItemHeader href="#career">CARRIÈRE</NavItemHeader>
          <NavItemHeader href="#skills">CAPACITÉS</NavItemHeader>
          <NavItemHeader href="#projects">PROJETS</NavItemHeader>
        </ul>
      </div>
      <div className="navbar-end mr-3">
        <ul className="menu menu-sm menu-horizontal bg-base-300 rounded-box ml-auto">
          <li>
            <ThemeToggleButton iconSize={20} />
          </li>
        </ul>
      </div>
    </div>
  );
}
