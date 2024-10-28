import Image from "next/image";
import profilePic from "../public/images/pp.svg";
import { AiFillGithub, AiFillLinkedin, AiFillMail } from "react-icons/ai";

export default function AboutMe() {
  return (
    <section
      id="about-me"
      className="flex flex-col mt-40 scroll-mt-28 xl:mx-32 2xl:m-60 lg:items-start"
    >
      <h1 className="font-heading text-6xl mb-5 ml-10 hidden lg:text-8xl  lg:block">
        À PROPOS
      </h1>
      <div className="flex flex-col items-center lg:flex-row">
        <Image
          src={profilePic}
          alt={"Photo de profil"}
          width={400}
          height={600}
          className="mb-5 h-[60vh] lg:ml-10"
        />
        <div className="flex flex-col ml-5 md:ml-10 justify-center">
          <h1 className="font-heading text-5xl my-5 text-left sm:text-6xl lg:hidden">
            À PROPOS
          </h1>
          <p className="font-sans text-xl font-medium text-justify lg:text-2xl mr-5">
            Bonjour ! Je suis Jonas, un développeur junior diplômé en
            informatique de gestion. J'aime me décrire comme une personne qui
            s'adapte facilement aux situations, toujours prête à aider les
            autres et à privilégier une approche de travail claire et organisée.
            Créer des projets utiles et agréables à utiliser me procure une
            grande satisfaction. Mon engagement envers l'apprentissage quotidien
            m'incite à toujours chercher à améliorer mes compétences.
          </p>
          <p className="font-sans text-xl font-medium text-justify lg:text-2xl mr-5">
            Actuellement, je suis en quête d'un emploi qui me permettra de
            mettre en pratique mes connaissances tout en développant de
            nouvelles aptitudes. Je rêve de rejoindre une équipe qui valorise la
            collaboration et la créativité, où chacun peut apporter sa touche
            personnelle.
          </p>
          <p className="font-sans text-xl font-medium text-justify lg:text-2xl mr-5">
            En dehors du développement, je suis passionné par le snowboard en
            hiver et le skateboard en été. J'adore aussi plonger dans l'eau
            froide tout au long de l'année — c'est une excellente façon de
            rester en forme et d'éclaircir mon esprit ! Les jeux vidéo et les
            jeux de société sont également des activités que j'affectionne, car
            ils me permettent de tisser des liens tout en gardant mon esprit
            stratégique aiguisé.
          </p>
          <div className="flex justify-end mt-10 mr-5">
            <a className="text-3xl mx-1" href="">
              <AiFillLinkedin></AiFillLinkedin>
            </a>
            <a className="text-3xl mx-1" href="">
              <AiFillGithub></AiFillGithub>
            </a>
            <a className="text-3xl mx-1" href="">
              <AiFillMail></AiFillMail>
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}
