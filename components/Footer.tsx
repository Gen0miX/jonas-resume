import Link from "next/link";
import { AiFillGithub, AiFillLinkedin, AiFillMail } from "react-icons/ai";

export default function Footer() {
  return (
    <footer className="footer footer-center md:footer p-10 font-sans font-medium  bg-base-200 text-sm w-full">
      <div className="flex flex-col w-[13rem] sm:w-80">
        <div className="flex flex-row justify-between w-full">
          <h6 className="mb-0 footer-title">Téléphone</h6>
          <p className="">0791078414</p>
        </div>
        <div className="flex flex-row justify-between w-full">
          <h6 className="mb-0 footer-title">Adresse</h6>
          <div className="flex flex-col items-end">
            <p className="">Av. de la Gare 8</p>
            <p className="">1890 St-Maurice</p>
          </div>
        </div>
      </div>
      <nav className="flex flex-col items-center">
        <h6 className="footer-title">Socials</h6>
        <div className="grid grid-flow-col gap-4">
          <a
            className=" text-3xl text-primary transition-transform duration-300 ease-in hover:-skew-x-6 hover:scale-105 hover:scale-y-125"
            href="https://www.linkedin.com/in/jonas-pilloud/"
            target="_blank"
          >
            <AiFillLinkedin></AiFillLinkedin>
          </a>
          <a
            className=" text-3xl text-primary transition-transform duration-300 ease-in hover:-skew-x-6 hover:scale-105 hover:scale-y-125"
            href="https://github.com/Gen0miX"
            target="_blank"
          >
            <AiFillGithub></AiFillGithub>
          </a>
          <a
            className=" text-3xl text-primary transition-transform duration-300 ease-in hover:-skew-x-6 hover:scale-105 hover:scale-y-125"
            href="mailto:jonas-pilloud@jonas-pilloud.ch"
          >
            <AiFillMail></AiFillMail>
          </a>
        </div>
      </nav>
      <aside className="">
        <Link
          href="#"
          className="flex flex-col justify-end p-0 m-0 text-lg leading-none transition-transform duration-200 ease-in font-heading hover:-skew-x-6 hover:scale-105 hover:scale-y-125"
        >
          <span className="font-bold">Jonas</span>
          <span className="ml-2 font-extralight">Pilloud</span>
        </Link>
        <p>© Jonas Pilloud, {new Date().getFullYear()}</p>
      </aside>
    </footer>
  );
}
