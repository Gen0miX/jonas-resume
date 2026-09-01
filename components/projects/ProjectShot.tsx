import Image from "next/image";

type Props = {
  src?: string;
  alt: string;
  sizes: string;
  className?: string;
};

export default function ProjectShot({ src, alt, sizes, className }: Props) {
  if (src) {
    return (
      <Image
        src={src}
        alt={alt}
        fill
        sizes={sizes}
        className={`object-cover ${className ?? ""}`}
      />
    );
  }

  return (
    <div
      className={`flex h-full w-full items-center justify-center border border-dashed border-base-content/25 bg-base-300/40 p-4 text-center font-sans text-sm text-base-content/50 ${
        className ?? ""
      }`}
    >
      {alt}
    </div>
  );
}
