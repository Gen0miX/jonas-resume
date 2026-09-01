type Props = { className?: string };

export default function WipBadge({ className }: Props) {
  return (
    <span
      className={`inline-flex items-center gap-2 rounded-full border border-primary px-3 py-[3px] font-sans text-[14px] font-bold uppercase tracking-widest text-primary ${
        className ?? ""
      }`}
    >
      <span className="inline-block h-[7px] w-[7px] rounded-full bg-primary" />
      En cours
    </span>
  );
}
