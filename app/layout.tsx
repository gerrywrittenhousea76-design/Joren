import type { Metadata } from "next";
import {
  Instrument_Serif,
  DM_Sans,
  JetBrains_Mono,
  Noto_Sans_SC,
} from "next/font/google";
import "./globals.css";
import CursorGlow from "@/components/ui/CursorGlow";
import ScrollProgress from "@/components/ui/ScrollProgress";
import BootSequence from "@/components/BootSequence";
import Aurora from "@/components/Aurora/Aurora";

const display = Instrument_Serif({
  subsets: ["latin"],
  weight: "400",
  style: ["normal", "italic"],
  variable: "--font-display",
  display: "swap",
});

const sans = DM_Sans({
  subsets: ["latin"],
  weight: ["300", "400", "500", "700"],
  variable: "--font-sans",
  display: "swap",
});

const mono = JetBrains_Mono({
  subsets: ["latin"],
  weight: ["400", "500"],
  variable: "--font-mono",
  display: "swap",
});

const cnSans = Noto_Sans_SC({
  subsets: ["latin"],
  weight: ["300", "400", "500", "700"],
  variable: "--font-cn",
  display: "swap",
  preload: false,
});

export const metadata: Metadata = {
  title: "江国佳 Joren Guo · AI 视觉导演",
  description:
    "江国佳 Joren Guo — AI 视觉导演，专注 AI 产品视频、商业剪辑与电商视觉内容。",
  metadataBase: new URL("https://example.com"),
  openGraph: {
    title: "江国佳 Joren Guo · AI 视觉导演",
    description:
      "用 AI 影像、商业剪辑与产品视觉，帮助品牌更清晰地表达价值。",
    type: "website",
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html
      lang="zh-CN"
      className={`${display.variable} ${sans.variable} ${mono.variable} ${cnSans.variable}`}
    >
      <body>
        {/* 底层基色（深色径向渐变 + 噪点） */}
        <div className="bg-atmosphere" aria-hidden />
        {/* 极光主背景：固定在视口背后，z=-10 在内容下方 */}
        <div
          className="pointer-events-none fixed inset-0 -z-10"
          aria-hidden
        >
          <Aurora
            colorStops={["#4aadbe", "#B497CF", "#5227FF"]}
            amplitude={1}
            blend={0.5}
          />
        </div>
        <BootSequence />
        <ScrollProgress />
        <CursorGlow />
        {children}
      </body>
    </html>
  );
}
