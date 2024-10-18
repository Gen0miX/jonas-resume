import Link from "next/link";

function NavItemHeader({ children }) {
  return (
    <li className="text-xl antialiased font-normal font-heading">
      <Link href="#">
        <span className="">//</span> {children}
      </Link>
    </li>
  );
}

export default function Header() {
  return (
    <div className="sticky navbar bg-base-100">
      <div className="navbar-start">
        <a className="font-sans text-xl font-medium">Jonas Pilloud</a>
      </div>
      <div className="navbar-center lg:flex">
        <ul className="px-1 menu menu-xl menu-horizontal">
          <NavItemHeader>ABOUT ME</NavItemHeader>
          <NavItemHeader>CAREER</NavItemHeader>
          <NavItemHeader>SKILLS</NavItemHeader>
          <NavItemHeader>PROJECTS</NavItemHeader>
        </ul>
      </div>
      <div className="navbar-end"></div>
    </div>
  );
}
