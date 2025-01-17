import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      backgroundImage: {
        "gradient-radial": "radial-gradient(var(--tw-gradient-stops))",
        "gradient-conic":
          "conic-gradient(from 180deg at 50% 50%, var(--tw-gradient-stops))",
        "info-box": "url('/images/info-box.png')",
        "btn-menu": "url('/images/btn-menu.png')",
      },
      colors: {
        primary: "#FC9B53",
        accent: "#929292",
        gray: {
          10: "#ffffff",
          20: "#b5b5b5",
          30: "#5a5a5a",
          40: "#2e2d2b",
        },
        orange: {
          10: "#fffeec",
          20: "#eeedd8",
          30: "#ffedbb",
          40: "#fda043",
          50: "#fd742d",
          90: "#5e5745",
        },
        blue: {
          10: "#dcf2ff",
          20: "#76b4ee",
          30: "#4d6dcc",
          40: "#3d4ea6",
        },
        red: {
          10: "#e3b695",
          20: "#f08267",
          30: "#f74751",
          40: "#a61d47",
          50: "#4e322f",
        },
        yellow: {
          10: "#ffed93",
          20: "#fed65a",
          30: "#e1b93b",
        },
        mint: {
          10: "#99e7d9",
          20: "#74d3cb",
          30: "#619c88",
        },
      },
      fontSize: {
        bodyXs: "10px",
        bodySm: "12px",
        bodyMd: "14px",
        bodyLg: "16px",
        bodyXl: "20px",
      },
      lineHeight: {
        bodyXs: "12px",
        bodySm: "16px",
        bodyMd: "20px",
        bodyLg: "24px",
        bodyXl: "28px",
      },
    },
  },
  plugins: [require("@designbycode/tailwindcss-text-stroke")],
};
export default config;
