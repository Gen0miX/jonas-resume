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
        heading: ["var(--font-merchant-vf)"],
        serif: ["Times New Roman", "Times", "serif"],
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
