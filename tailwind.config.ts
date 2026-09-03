import type { Config } from "tailwindcss";
import type { PluginAPI } from "tailwindcss/types/config";

const config: Config = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        background: "var(--background)",
        foreground: "var(--foreground)",
      },
      fontFamily: {
        sans: ["var(--font-darker-grotesque)"],
        hero: ["var(--font-eb-garamond)"],
        heading: ["var(--font-merchant-vf)"],
        serif: ["Times New Roman", "Times", "serif"],
      },
      animation: {
        fadeIn: "fadeIn 0.5s ease-in-out",
        fadeOut: "fadeOut 0.5s ease-in-out",
        marquee: "marquee var(--marquee-duration, 18s) linear infinite",
      },
      keyframes: {
        fadeIn: {
          "0%": { opacity: "0" },
          "100%": { opacity: "1" },
        },
        fadeOut: {
          "0%": { opacity: "1" },
          "100%": { opacity: "0" },
        },
        marquee: {
          "0%": { transform: "translateX(0)" },
          "100%": { transform: "translateX(-50%)" },
        },
      },
    },
  },
  plugins: [
    require("daisyui"),
    function ({ addVariant }: PluginAPI) {
      addVariant("theme-dark", '[data-theme="dark"] &');
      addVariant("theme-nord", '[data-theme="nord"] &');
    },
  ],
  daisyui: {
    themes: [
      {
        dark: {
          ...require("daisyui/src/theming/themes")["dark"],
          "base-content": "#EBF6F7",
          primary: "#A2BFFE",
        },
      },
      "dark",
      "nord",
    ],
    darkTheme: "dark",
    base: true,
    styled: true,
    utils: true,
    prefix: "",
    logs: true,
    themeRoot: ":root",
  },
  darkMode: "class",
};
export default config;
