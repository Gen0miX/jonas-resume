import Link from "next/link";

function NavItem({ children }) {
  return (
    <li className="font-heading font-normal text-9xl">
      <Link href="#">{children}</Link>
    </li>
  );
}

export default function Hero() {
  return (
    <section className="flex flex-row justify-center h-screen">
      <div className="flex flex-col justify-end mb-60 ml-60 max-w-md">
        <h1 className="font-sans text-3xl">
          Hi, I'm <span className="font-bold">Jonas Pilloud</span>
        </h1>
        <p>
          Lorem ipsum dolor sit amet, consectetur adipisicing elit. Pariatur
          corrupti vitae quasi debitis voluptate blanditiis earum reprehenderit
          nemo nam. Eum?
        </p>
      </div>
      <div className="flex justify-center m-10">
        <ul className=" flex flex-col h-full justify-evenly">
          <NavItem>ABOUT ME</NavItem>
          <NavItem>CAREER</NavItem>
          <NavItem>SKILLS</NavItem>
          <NavItem>PROJECTS</NavItem>
        </ul>
      </div>
    </section>
  );
}
