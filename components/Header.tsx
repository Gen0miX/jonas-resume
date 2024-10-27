import React, { ReactNode, useEffect, useState } from "react";
import Link from "next/link";
import { IoSunny, IoMoon } from "react-icons/io5";

interface Props {
  children?: ReactNode;
  href: string;
}

function NavItemHeader({ children, href, ...props }: Props) {
  return (
    <li className="text-xl antialiased font-normal font-heading">
      <Link href={href}>
        <span className="">//</span> {children}
      </Link>
    </li>
  );
}

export default function Header() {
  const [theme, setTheme] = useState("nord");
  const [themeLoaded, setThemeLoaded] = useState(false);

  useEffect(() => {
    const storedTheme = localStorage.getItem("theme");
    const systemPrefersDark = window.matchMedia(
      "(prefers-color-scheme: dark)"
    ).matches;

    const initialTheme = storedTheme || (systemPrefersDark ? "dark" : "nord");
    setTheme(initialTheme);
    document.querySelector("html")?.setAttribute("data-theme", initialTheme);
    setThemeLoaded(true);
  }, [theme]);

  const toggleTheme = () => {
    const newTheme = theme === "dark" ? "nord" : "dark";
    setTheme(newTheme);
    localStorage.setItem("theme", newTheme);
    document.querySelector("html")?.setAttribute("data-theme", newTheme);
  };

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
            <NavItemHeader href="#about-me">ABOUT ME</NavItemHeader>
            <NavItemHeader href="#career">CAREER</NavItemHeader>
            <NavItemHeader href="#skills">SKILLS</NavItemHeader>
            <NavItemHeader href="#projects">PROJECTS</NavItemHeader>
          </ul>
        </div>
        <ul className="px-1 menu menu-xl menu-horizontal hidden md:flex">
          <NavItemHeader href="#about-me">ABOUT ME</NavItemHeader>
          <NavItemHeader href="#career">CAREER</NavItemHeader>
          <NavItemHeader href="#skills">SKILLS</NavItemHeader>
          <NavItemHeader href="#projects">PROJECTS</NavItemHeader>
        </ul>
      </div>
      <div className="navbar-end">
        <label className="mr-3 swap swap-rotate">
          <span className="hidden">Switch theme</span>
          <input
            type="checkbox"
            onClick={toggleTheme}
            checked={theme === "nord"}
            readOnly
          />
          <IoSunny className="text-xl swap-off" />
          <IoMoon className="text-xl swap-on" />
        </label>
      </div>
    </div>
  );
}
