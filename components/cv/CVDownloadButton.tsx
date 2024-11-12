import React from "react";
import { IoDocumentText } from "react-icons/io5";
import { pdf } from "@react-pdf/renderer";

interface CVDownloadButtonProps {
  iconSize?: number;
  className?: string;
}

export default function CVDownloadButton({
  iconSize = 24,
  className,
}: CVDownloadButtonProps) {
  const handleDownload = async () => {};

  return (
    <button onClick={handleDownload} className={`${className}`}>
      <IoDocumentText size={iconSize} />
    </button>
  );
}
