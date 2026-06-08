import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        primary: "#667eea",
        secondary: "#764ba2",
        background: "#f8f9fa",
        foreground: "#2c3e50",
        success: "#27ae60",
        danger: "#e74c3c",
        warning: "#f39c12",
        info: "#3498db",
      },
    },
  },
  plugins: [],
};

export default config;
