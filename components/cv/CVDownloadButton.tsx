import React from "react";
import { IoDocumentText } from "react-icons/io5";

interface CVDownloadButtonProps {
  iconSize?: number;
  className?: string;
  children?: React.ReactNode;
}

export default function CVDownloadButton({
  iconSize = 24,
  className,
  children,
}: CVDownloadButtonProps) {
  const handleDownload = () => {
    const pdfUrl = "/images/Jonas_Pilloud.pdf"; // Chemin vers le fichier PDF dans le dossier public
    const link = document.createElement("a");
    link.href = pdfUrl;
    link.download = "Jonas_Pilloud.pdf";
    link.click();
  };

  return (
    <button onClick={handleDownload} className={className}>
      {children ?? <IoDocumentText size={iconSize} />}
    </button>
  );
}
