import Image from "next/image";
import profilePic from "../public/images/pp.svg";
import { AiFillGithub, AiFillLinkedin, AiFillMail } from "react-icons/ai";

export default function AboutMe() {
  return (
    <section
      id="about-me"
      className="flex flex-col mt-40 scroll-mt-28 xl:mx-32 2xl:m-60 lg:items-start"
    >
      <h1 className="font-heading text-6xl mb-5 ml-10 hidden lg:block">
        ABOUT ME
      </h1>
      <div className="flex flex-col items-center lg:flex-row">
        <Image
          src={profilePic}
          alt={"Profile picture"}
          width={400}
          height={600}
          className="mb-5 h-[60vh] lg:ml-10"
        />
        <div className="flex flex-col mx-10 justify-center">
          <h1 className="font-heading text-6xl my-5 text-left lg:hidden">
            ABOUT ME
          </h1>
          <p className="font-sans font-medium text-justify text-xl">
            Lorem ipsum, dolor sit amet consectetur adipisicing elit. Nemo
            suscipit odit recusandae facilis consequuntur asperiores minus,
            earum repudiandae est iste officiis. Tenetur rerum maiores nisi
            corporis? Repellat mollitia vero quia obcaecati quisquam rem ex
            blanditiis iure eum aspernatur nihil voluptatum officia optio
            consequuntur a, quaerat inventore provident itaque eligendi nemo in
            ea consectetur. Possimus tempore modi esse quam deleniti laborum.
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Dolor
            architecto quae mollitia similique, cupiditate eos recusandae maxime
            veniam voluptatibus impedit. Harum temporibus necessitatibus ab,
            accusamus nulla est provident placeat, neque corrupti debitis
            impedit vero alias quo officiis aliquam quasi doloremque natus,
            reiciendis consequuntur similique sint atque sequi. Dolore
            temporibus assumenda omnis nobis ipsam, modi maxime ratione at quo
            vero suscipit veritatis ducimus aspernatur soluta cumque deleniti
            nisi enim neque hic voluptates obcaecati dolores natus commodi a?
            Veritatis fuga odit ipsa, libero accusantium assumenda voluptates
            quae adipisci suscipit nesciunt accusamus unde facere ullam. Eos
            corrupti, velit voluptas repudiandae accusantium libero dolores.
          </p>
          <div className="flex justify-end mt-10">
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
