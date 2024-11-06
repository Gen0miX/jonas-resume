export default function Loading() {
  return (
    <section className="flex flex-col items-center justify-center h-svh">
      <svg
        viewBox="0 0 100 40"
        xmlns="http://www.w3.org/2000/svg"
        className="w-[90vw] h-auto max-w-xs md:max-w-md lg:max-w-lg "
      >
        <text
          x="38%"
          y="70%"
          fontFamily="Merchant-VF"
          fontSize="34"
          fill="transparent"
          stroke="currentColor"
          strokeWidth="0.4"
          strokeDasharray="200"
          strokeDashoffset="200"
          className="animate-stroke"
        >
          J
        </text>
        <text
          x="50%"
          y="83%"
          fontFamily="Merchant-VF"
          fontSize="34"
          fill="transparent"
          stroke="currentColor"
          strokeWidth="0.4"
          strokeDasharray="200"
          strokeDashoffset="200"
          className="animate-stroke"
        >
          P
        </text>
      </svg>
      <span className="loading loading-ring loading-lg"></span>
    </section>
  );
}
