type Props = { text: string; accent: string; className?: string };

export default function Accented({ text, accent, className }: Props) {
  const index = accent ? text.indexOf(accent) : -1;
  if (index === -1) return <>{text}</>;

  const before = text.slice(0, index);
  const after = text.slice(index + accent.length);

  return (
    <>
      {before}
      <span className={className ?? "text-primary italic"}>{accent}</span>
      {after}
    </>
  );
}
