// components/sections/Contact.tsx
"use client";

import { useRef, useState } from "react";
import { useInView } from "framer-motion";
import { FaUser } from "react-icons/fa";
import { IoMdMail, IoIosSend } from "react-icons/io";
import { AiOutlineCheckCircle, AiOutlineCloseCircle } from "react-icons/ai";
import SectionHeader from "./shared/SectionHeader";
import SectionLede from "./shared/SectionLede";
import Card from "./shared/Card";

const externalLinkClass =
  "font-sans text-[17px] font-semibold uppercase tracking-wider text-base-content/60 theme-nord:text-base-content/75 transition-colors hover:text-base-content";

const fieldClass =
  "flex h-[52px] flex-1 basis-[240px] items-center gap-3 rounded-[10px] border border-base-content/20 bg-transparent px-[18px] transition-colors duration-300 hover:border-primary focus-within:border-primary";

const inputClass =
  "min-w-0 flex-1 border-none bg-transparent font-sans text-lg font-medium outline-none placeholder:text-base-content/40 theme-nord:placeholder:text-base-content/60";

export default function Contact() {
  const [isLoading, setIsLoading] = useState(false);
  const [toastMessage, setToastMessage] = useState<string | null>(null);
  const [toastType, setToastType] = useState<"success" | "error">("success");

  const cardRef = useRef<HTMLDivElement>(null);
  const isInView = useInView(cardRef, { once: true, amount: 0.2 });

  const showToast = (message: string, type: "success" | "error") => {
    setToastMessage(message);
    setToastType(type);
    setTimeout(() => setToastMessage(null), 4000);
  };

  const onSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const form = event.currentTarget;
    setIsLoading(true);
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
        showToast(data.message || "Mince ! Votre message n’est pas parti.", "error");
      }
    } catch (error) {
      console.error("Erreur d’envoi :", error);
      showToast("Mince ! Votre message n’est pas parti.", "error");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <section
      id="contact"
      className="px-5 md:px-0 mt-40 mb-10 xl:mx-32 2xl:mx-60 2xl:mb-20 2xl:mt-60 scroll-mt-32"
    >
      <SectionHeader
        title="CONTACT"
        right={
          <a href="mailto:jonas-pilloud@jonas-pilloud.ch" className={externalLinkClass}>
            jonas-pilloud@jonas-pilloud.ch ↗
          </a>
        }
      />
      <SectionLede>
        Un projet, une question, une opportunité ? Le formulaire arrive directement dans ma boîte
        mail.
      </SectionLede>

      <div className="mt-10 flex justify-center px-0 md:px-8">
        <Card
          ref={cardRef}
          initial={{ opacity: 0, y: 24 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.5 }}
          className="flex w-full max-w-[880px] flex-col gap-4 p-[clamp(24px,2.5vw,44px)]"
        >
          <form onSubmit={onSubmit} className="flex flex-col gap-4">
            <div className="flex flex-wrap gap-4">
              <label className={fieldClass}>
                <FaUser className="flex-none text-primary" size={16} />
                <input
                  type="text"
                  name="name"
                  placeholder="Prénom"
                  required
                  className={inputClass}
                />
              </label>
              <label className={fieldClass}>
                <IoMdMail className="flex-none text-primary" size={16} />
                <input
                  type="email"
                  name="email"
                  placeholder="Mail"
                  required
                  className={inputClass}
                />
              </label>
            </div>
            <textarea
              name="message"
              placeholder="Message"
              rows={7}
              className="w-full resize-y rounded-[10px] border border-base-content/20 bg-transparent px-[18px] py-3.5 font-sans text-lg font-medium outline-none transition-colors duration-300 placeholder:text-base-content/40 theme-nord:placeholder:text-base-content/60 hover:border-primary focus:border-primary"
            />
            <button
              type="submit"
              className="mt-2 inline-flex h-[52px] min-w-[256px] items-center justify-center gap-2.5 self-center rounded-[10px] bg-primary px-[26px] font-sans text-[17px] font-bold uppercase tracking-[.08em] text-base-100 transition-colors duration-300 hover:bg-base-content"
            >
              {isLoading ? (
                <span className="loading loading-spinner loading-sm" />
              ) : (
                <>
                  <IoIosSend size={18} />
                  Envoyer
                </>
              )}
            </button>
          </form>
        </Card>
      </div>

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
