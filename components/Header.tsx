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

  useEffect(() => {
    const storedTheme = localStorage.getItem("theme");
    const systemPrefersDark = window.matchMedia(
      "(prefers-color-scheme: dark)"
    ).matches;

    if (storedTheme) {
      setTheme(storedTheme);
    } else if (systemPrefersDark) {
      setTheme("dark");
    }
    if (theme) {
      document.querySelector("html")?.setAttribute("data-theme", theme);
    }
  }, [theme]);

  const toggleTheme = () => {
    const newTheme = theme === "dark" ? "nord" : "dark";
    setTheme(newTheme);
    localStorage.setItem("theme", newTheme);
    document.querySelector("html")?.setAttribute("data-theme", newTheme);
  };

  return (
    <div className="z-50 sticky navbar bg-base-200">
      <div className="ml-3 navbar-start">
        <a className="font-sans text-xl font-medium">Jonas Pilloud</a>
      </div>
      <div className="navbar-center">
        <ul className="px-1 menu menu-xl menu-horizontal">
          <NavItemHeader href="#about-me">ABOUT ME</NavItemHeader>
          <NavItemHeader href="#career">CAREER</NavItemHeader>
          <NavItemHeader href="#skills">SKILLS</NavItemHeader>
          <NavItemHeader href="#projects">PROJECTS</NavItemHeader>
        </ul>
      </div>
      <div className="navbar-end">
        <label className="mr-3 swap swap-rotate">
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
