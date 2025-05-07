import { useState } from "react";
import SectionTitle from "@/components/SectionTitle";
import { FaUser } from "react-icons/fa";
import { IoMdMail, IoIosSend } from "react-icons/io";
import { AiOutlineCheckCircle, AiOutlineCloseCircle } from "react-icons/ai";

export default function Contact() {
  const [result, setResult] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [toastMessage, setToastMessage] = useState<string | null>(null);
  const [toastType, setToastType] = useState<"success" | "error">("success");

  const showToast = (message: string, type: "success" | "error") => {
    setToastMessage(message);
    setToastType(type);
    setTimeout(() => setToastMessage(null), 4000);
  };

  const onSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const form = event.currentTarget;
    setIsLoading(true);
    setResult("Envoi...");
    const formData = new FormData(event.currentTarget);

    formData.append("access_key", "10538beb-60fe-4fac-8ee1-6facfe5635ff");

    try {
      const response = await fetch("https://api.web3forms.com/submit", {
        method: "POST",
        body: formData,
      });

      const data = await response.json();

      if (data.success) {
        showToast("Super ! J’ai bien reçu votre message.", "success");
        form.reset();
      } else {
        console.log("Error", data);
        showToast(
          data.message || "Mince ! Votre message n'est pas parti.",
          "error"
        );
      }
    } catch (error) {
      console.error("Erreur d'envoi :", error);
      showToast("Mince ! Votre message n'est pas parti.", "error");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <section
      id="contact"
      className="mt-40 mb-10 ml-5 mr-5 xl:mx-32 2xl:mx-60 2xl:mb-20 2xl:mt-60 scroll-mt-32"
    >
      <SectionTitle className="ml-5">CONTACT</SectionTitle>
      <form
        onSubmit={onSubmit}
        className="flex flex-col gap-2 mt-2 lg:mt-5 max-w-screen-md mx-auto lg:justify-items-center"
      >
        <div className="flex flex-col gap-2 sm:flex-row ">
          <label className="input input-bordered input-primary flex items-center gap-2 w-full">
            <FaUser className="text-primary" />
            <input
              type="text"
              className="grow"
              placeholder="Prénom"
              name="name"
              required
            />
          </label>
          <label className="input input-bordered input-primary flex items-center gap-2 w-full">
            <IoMdMail className="text-primary" />
            <input
              type="text"
              className="grow"
              placeholder="Mail"
              name="email"
              required
            />
          </label>
        </div>
        <textarea
          className="textarea textarea-primary textarea-lg sm:h-60"
          name="message"
          placeholder="Message"
        ></textarea>
        <button className="btn btn-outline btn-primary self-center hover:text-white md:w-64">
          {isLoading ? (
            <span className="loading loading-spinner loading-sm" />
          ) : (
            <>
              <IoIosSend />
              Envoyer
            </>
          )}
        </button>
      </form>
      {toastMessage && (
        <div className="toast toast-bottom toast-end z-50">
          <div
            className={`alert ${
              toastType === "success" ? "alert-success" : "alert-error"
            } flex items-center gap-2`}
          >
            {toastType === "success" ? (
              <AiOutlineCheckCircle className="text-xl" />
            ) : (
              <AiOutlineCloseCircle className="text-xl" />
            )}
            <span>{toastMessage}</span>
          </div>
        </div>
      )}
    </section>
  );
}
