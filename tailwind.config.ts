import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./app/**/*.{ts,tsx,js,jsx,mdx}",
    "./components/**/*.{ts,tsx,js,jsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        ink: {
          950: "#08090B",
          900: "#0B0C0F",
          800: "#101216",
          700: "#161A20",
          600: "#1F242C",
          500: "#2A3038",
          400: "#3A414B",
        },
        bone: {
          50: "#F7F4EE",
          100: "#EFEBE2",
          200: "#E2DCCF",
          300: "#C9C2B2",
          400: "#9C9586",
        },
        teal: {
          DEFAULT: "#6FAFA1",
          400: "#7FBFB0",
          500: "#6FAFA1",
          600: "#4F8F82",
          700: "#3A6E63",
        },
        silver: "#C8CFD2",
      },
      fontFamily: {
        // 大标题：英文 Instrument Serif + 中文思源黑体
        display: [
          "var(--font-display)",
          "var(--font-cn)",
          "ui-sans-serif",
          "system-ui",
          "sans-serif",
        ],
        // 正文：DM Sans + 思源黑体
        sans: [
          "var(--font-sans)",
          "var(--font-cn)",
          "ui-sans-serif",
          "system-ui",
          "sans-serif",
        ],
        mono: ["var(--font-mono)", "ui-monospace", "monospace"],
        // 仅中文（思源黑体）
        cn: ["var(--font-cn)", "var(--font-sans)", "sans-serif"],
        // 中文大标题——已切换为思源黑体（保留类名以兼容现有组件）
        cnSerif: [
          "var(--font-cn)",
          "var(--font-display)",
          "ui-sans-serif",
          "sans-serif",
        ],
      },
      letterSpacing: {
        tightest: "-0.04em",
        tighter: "-0.025em",
        wider: "0.08em",
        widest: "0.18em",
      },
      keyframes: {
        "fade-up": {
          "0%": { opacity: "0", transform: "translateY(14px)" },
          "100%": { opacity: "1", transform: "translateY(0)" },
        },
        marquee: {
          "0%": { transform: "translateX(0)" },
          "100%": { transform: "translateX(-50%)" },
        },
        "pulse-soft": {
          "0%, 100%": { opacity: "0.45" },
          "50%": { opacity: "0.85" },
        },
      },
      animation: {
        "fade-up": "fade-up 0.9s cubic-bezier(0.22,1,0.36,1) both",
        marquee: "marquee 40s linear infinite",
        "pulse-soft": "pulse-soft 4s ease-in-out infinite",
      },
      backgroundImage: {
        "grid-faint":
          "linear-gradient(to right, rgba(255,255,255,0.04) 1px, transparent 1px), linear-gradient(to bottom, rgba(255,255,255,0.04) 1px, transparent 1px)",
        "noise":
          "url(\"data:image/svg+xml,%3Csvg viewBox='0 0 200 200' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='3' stitchTiles='stitch'/%3E%3CfeColorMatrix values='0 0 0 0 1 0 0 0 0 1 0 0 0 0 1 0 0 0 0.5 0'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)' opacity='0.5'/%3E%3C/svg%3E\")",
      },
    },
  },
  plugins: [],
};

export default config;
