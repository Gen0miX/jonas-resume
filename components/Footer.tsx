import Link from "next/link";
import { AiFillGithub, AiFillLinkedin, AiFillMail } from "react-icons/ai";

export default function Footer() {
  return (
    <footer className="p-10 font-sans text-lg font-medium footer bg-base-200">
      <div className="flex flex-col items-start w-1/2">
        <div className="flex flex-row justify-between w-full">
          <h6 className="mb-0 footer-title">Téléphone</h6>
          <p className="">0791078414</p>
        </div>
        <div className="flex flex-row justify-between w-full">
          <h6 className="mb-0 footer-title">Adresse</h6>
          <div className="flex flex-col items-end">
            <p className="">Rue Jacques-Gachoud 8</p>
            <p className="">1700 Fribourg</p>
          </div>
        </div>
      </div>
      <nav className="flex flex-col items-center">
        <h6 className="footer-title">Socials</h6>
        <div className="flex">
          <a
            className="mx-1 text-3xl transition-transform duration-300 ease-in hover:-skew-x-6 hover:scale-105 hover:scale-y-125"
            href=""
          >
            <AiFillLinkedin></AiFillLinkedin>
          </a>
          <a
            className="mx-1 text-3xl transition-transform duration-300 ease-in hover:-skew-x-6 hover:scale-105 hover:scale-y-125"
            href=""
          >
            <AiFillGithub></AiFillGithub>
          </a>
          <a
            className="mx-1 text-3xl transition-transform duration-300 ease-in hover:-skew-x-6 hover:scale-105 hover:scale-y-125"
            href="mailto:jonas-pilloud@jonas-pilloud.ch"
          >
            <AiFillMail></AiFillMail>
          </a>
        </div>
      </nav>
      <aside>
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
