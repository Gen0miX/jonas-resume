// components/sections/shared/SectionLede.tsx
type Props = { children: string };

export default function SectionLede({ children }: Props) {
  return (
    <div className="mt-5 flex flex-col items-center">
      <p className="max-w-[820px] text-center font-sans text-lg font-medium sm:text-xl">
        {children}
      </p>
      <div className="mt-7 mb-2 w-1/4 divider mx-auto" />
    </div>
  );
}
