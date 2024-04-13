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
            },
        },
    },
    plugins: [require("@designbycode/tailwindcss-text-stroke")],
};
export default config;

