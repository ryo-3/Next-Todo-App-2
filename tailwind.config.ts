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
        },
        screens: {
            sp: "480px", // スマートフォン用のブレークポイント
            smd: "600px", // タブレット用のブレークポイント
            ss: "375px", // 小さいスマートフォン用のブレークポイント
        },
        colors: {
          blown: "#5e3425",
          selected: '#e4f5ec', 
        },
    },
  },
  plugins: [],
};
export default config;
