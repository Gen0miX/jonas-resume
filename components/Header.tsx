// components/Header.tsx
"use client";

import React, { ReactNode } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import ThemeToggleButton from "./ThemeToggleButton";
import CVDownloadButton from "./cv/CVDownloadButton";

interface Props {
  children?: ReactNode;
  href: string;
  active?: boolean;
}

function NavItemHeader({ children, href, active, ...props }: Props) {
  return (
    <li className="text-lg antialiased font-medium font-heading lg:text-xl">
      <Link href={href} className={active ? "text-primary" : ""}>
        <span className="">//</span>
        {children}
      </Link>
    </li>
  );
}

export default function Header() {
  const pathname = usePathname();
  const onHome = pathname === "/";
  const onProjects = pathname?.startsWith("/projets") ?? false;

  const homeHref = (anchor: string) => (onHome ? `#${anchor}` : `/#${anchor}`);
  const navItems = [
    { key: "about-me", label: "À PROPOS" },
    { key: "career", label: "CARRIÈRE" },
    { key: "skills", label: "CAPACITÉS" },
  ] as const;

  return (
    <div className="navbar bg-base-200">
      <div className="ml-3 navbar-start">
        <Link
          href="/"
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
            {navItems.map((item) => (
              <NavItemHeader key={item.key} href={homeHref(item.key)}>
                {item.label}
              </NavItemHeader>
            ))}
            <NavItemHeader href={onHome ? "#projects" : "/projets"} active={onProjects}>
              PROJETS
            </NavItemHeader>
          </ul>
        </div>
        <ul className="hidden px-1 menu menu-xl menu-horizontal lg:flex">
          {navItems.map((item) => (
            <NavItemHeader key={item.key} href={homeHref(item.key)}>
              {item.label}
            </NavItemHeader>
          ))}
          <NavItemHeader href={onHome ? "#projects" : "/projets"} active={onProjects}>
            PROJETS
          </NavItemHeader>
        </ul>
      </div>
      <div className="mr-0 sm:mr-3 navbar-end">
        <ul className="ml-auto mr-0 px-0 menu menu-sm menu-horizontal bg-base-300 rounded-box">
          <li>
            <ThemeToggleButton iconSize={20} />
          </li>
          <li>
            <CVDownloadButton iconSize={20} className="text-primary" />
          </li>
        </ul>
      </div>
    </div>
  );
}
