import Image from "next/image";
import profilePic from "../../public/images/profile.png";
import { AiFillGithub, AiFillLinkedin, AiFillMail } from "react-icons/ai";
import SectionTitle from "../SectionTitle";

export default function AboutMe() {
  return (
    <section
      id="about-me"
      className="flex flex-col mt-40 items-center scroll-mt-28 xl:mx-32 2xl:m-60 lg:items-start"
    >
      <SectionTitle className="hidden lg:text-8xl lg:block">
        À PROPOS
      </SectionTitle>
      <div className="flex flex-col items-center 2xl:mx-auto lg:flex-row">
        <div className="avatar mb-14 lg:ml-10">
          <div className=" ring-base-content ring-offset-base-content max-w-80 rounded-full ring ring-offset-2 lg:min-w-80 2xl:min-w-96">
            <Image
              src={profilePic}
              alt={"Photo de profil"}
              width={1000}
              height={1165}
              className=""
            />
          </div>
        </div>

        <div className="flex flex-col justify-center ml-5 mr-5 md:ml-10 2xl:max-w-[50rem]">
          <SectionTitle className="mt-5 lg:hidden">À PROPOS</SectionTitle>
          <p className="font-sans text-xl font-medium text-justify lg:text-2xl ">
            Bonjour ! Je suis Jonas, un développeur junior diplômé en
            informatique de gestion. J'aime me décrire comme une personne qui
            s'adapte facilement aux situations, toujours prête à aider les
            autres et à privilégier une approche de travail claire et organisée.
            Créer des projets utiles et agréables à utiliser me procure une
            grande satisfaction. Mon engagement envers l'apprentissage quotidien
            m'incite à toujours chercher à améliorer mes compétences.
          </p>
          <p className="font-sans text-xl font-medium text-justify lg:text-2xl">
            Actuellement, je suis en quête d'un emploi qui me permettra de
            mettre en pratique mes connaissances tout en développant de
            nouvelles aptitudes. Je rêve de rejoindre une équipe qui valorise la
            collaboration et la créativité, où chacun peut apporter sa touche
            personnelle.
          </p>
          <p className="font-sans text-xl font-medium text-justify lg:text-2xl">
            En dehors du développement, je suis passionné par le snowboard en
            hiver et le skateboard en été. J'apprécie aussi me baigner en eau
            froide tout au long de l'année. C'est une expérience qui me permet
            de me ressourcer et de clarifier mes pensées. Les jeux vidéo et les
            jeux de société sont également des activités que j'affectionne, car
            ils me permettent de tisser des liens tout en gardant mon esprit
            stratégique aiguisé.
          </p>
          <div className="flex justify-end mt-10">
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
        </div>
      </div>
    </section>
  );
}
