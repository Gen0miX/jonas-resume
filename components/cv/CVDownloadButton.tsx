import React from "react";
import { IoDocumentText } from "react-icons/io5";

interface CVDownloadButtonProps {
  iconSize?: number;
  className?: string;
}

export default function CVDownloadButton({
  iconSize = 24,
  className,
}: CVDownloadButtonProps) {
  const handleDownload = () => {
    const pdfUrl = "/images/Jonas_Pilloud.pdf"; // Chemin vers le fichier PDF dans le dossier public
    const link = document.createElement("a");
    link.href = pdfUrl;
    link.download = "Jonas_Pilloud.pdf";
    link.click();
  };

  return (
    <button onClick={handleDownload} className={`${className}`}>
      <IoDocumentText size={iconSize} />
    </button>
  );
}
