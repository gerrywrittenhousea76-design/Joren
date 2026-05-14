"use client";

import { motion, useReducedMotion, useScroll, useTransform } from "framer-motion";
import { useRef } from "react";
import SplitReveal from "./ui/SplitReveal";
import Magnetic from "./ui/Magnetic";

// 开场动画约 2.1s，让 Hero 入场从 1.5s 起步——遮罩还在但已开始收缩，
// 用户透过孔洞看到底层内容渐次浮现，无缝衔接。
const BOOT_DELAY = 1.5;

export default function Hero() {
  const reduce = useReducedMotion();
  const ref = useRef<HTMLDivElement>(null);

  // 视差：滚动时背景视觉缓慢上移
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start start", "end start"],
  });
  const yDeck = useTransform(scrollYProgress, [0, 1], ["0%", "-15%"]);
  const opacityDeck = useTransform(scrollYProgress, [0, 1], [1, 0.4]);

  const fade = (delay: number) => ({
    initial: reduce ? { opacity: 0 } : { opacity: 0, y: 20 },
    animate: { opacity: 1, y: 0 },
    transition: {
      duration: 1,
      delay: delay + (reduce ? 0 : BOOT_DELAY),
      ease: [0.22, 1, 0.36, 1],
    },
  });

  return (
    <section
      id="home"
      ref={ref}
      className="relative min-h-[100svh] overflow-hidden pt-28 md:pt-32"
    >
      {/* faint grid */}
      <div
        className="pointer-events-none absolute inset-0 opacity-[0.04] [mask-image:radial-gradient(ellipse_60%_60%_at_50%_30%,#000_40%,transparent_75%)]"
        style={{
          backgroundImage:
            "linear-gradient(to right, rgba(247,244,238,1) 1px, transparent 1px), linear-gradient(to bottom, rgba(247,244,238,1) 1px, transparent 1px)",
          backgroundSize: "64px 64px",
        }}
        aria-hidden
      />

      <div className="container-page relative">
        <motion.div {...fade(0.05)} className="flex items-baseline gap-4 border-t border-bone-100/[0.12] pt-5 md:gap-6 md:pt-6">
          <span className="font-display italic text-[26px] md:text-[34px] leading-none text-teal-400/90">
            01
          </span>
          <span className="hidden h-px flex-1 bg-bone-100/[0.08] md:block" />
          <div className="flex flex-1 items-baseline gap-3 md:flex-none">
            <span className="font-cn text-[14px] md:text-[15px] tracking-wide text-bone-100">
              首页
            </span>
            <span className="font-mono text-[10px] tracking-widest uppercase text-bone-400">
              / INDEX
            </span>
          </div>
          <span className="ml-auto font-mono text-[10px] tracking-widest uppercase text-bone-400 md:ml-0">
            现可接洽 · 2026
          </span>
        </motion.div>

        {/* 中文为主的大标题 */}
        <h1 className="mt-10 md:mt-14 text-bone-50">
          <span className="font-cn font-light text-[10vw] md:text-[6.4vw] lg:text-[5.8vw] block leading-[1.05] tracking-tight">
            <SplitReveal lines={["用影像，", "把产品讲成故事。"]} delay={BOOT_DELAY + 0.2} step={0.04} />
          </span>
          <motion.span
            {...fade(0.9)}
            className="mt-4 block font-display italic text-[3.6vw] md:text-[1.8vw] lg:text-[1.5vw] text-teal-400/90 leading-tight tracking-tight"
          >
            AI Visual Director · for Product Stories.
          </motion.span>
        </h1>

        <div className="mt-10 grid gap-12 md:grid-cols-12 md:items-end">
          <motion.div {...fade(1.05)} className="md:col-span-6 lg:col-span-5">
            <p className="font-cn text-[15px] md:text-[16px] leading-[1.8] text-bone-100">
              我专注于 <span className="text-teal-400">AI 产品视频</span>、
              <span className="text-teal-400">电商视觉内容</span>与
              <span className="text-teal-400">商业广告</span>表达。
            </p>
            <p className="font-cn mt-4 max-w-md text-[13px] leading-[1.9] text-bone-400">
              从产品卖点、用户痛点和视觉叙事出发，完成从创意到交付的完整内容制作——不仅仅是把画面做好看，更是把产品讲清楚、卖出去。
            </p>

            <div className="mt-9 flex flex-wrap items-center gap-3">
              <Magnetic strength={0.25}>
                <a href="#works" className="btn-primary group">
                  <span>查看作品</span>
                  <Arrow />
                </a>
              </Magnetic>
              <Magnetic strength={0.2}>
                <a href="#contact" className="btn-ghost group">
                  <span>联系我</span>
                  <Arrow />
                </a>
              </Magnetic>
            </div>
          </motion.div>

          {/* Right visual — abstract preview deck */}
          <motion.div
            style={{ y: yDeck, opacity: opacityDeck }}
            className="md:col-span-6 lg:col-span-7 lg:pl-10"
          >
            <motion.div {...fade(1.2)}>
              <PreviewDeck />
            </motion.div>
          </motion.div>
        </div>

        {/* meta strip */}
        <motion.div
          {...fade(1.35)}
          className="mt-20 flex flex-col gap-4 border-t border-bone-100/[0.07] pt-6 md:flex-row md:items-center md:justify-between"
        >
          <div className="flex items-center gap-6 font-mono text-[11px] tracking-widest uppercase text-bone-400">
            <span>BASED IN CN · 全球远程合作</span>
          </div>
          <div className="flex items-center gap-3 font-mono text-[11px] tracking-widest uppercase text-bone-400">
            <span>向下滚动</span>
            <motion.span
              animate={{ y: [0, 6, 0] }}
              transition={{ duration: 1.8, repeat: Infinity, ease: "easeInOut" }}
              className="inline-block"
            >
              ↓
            </motion.span>
          </div>
        </motion.div>
      </div>
    </section>
  );
}

function Arrow() {
  return (
    <svg width="12" height="12" viewBox="0 0 12 12" fill="none" aria-hidden>
      <path
        d="M3 9L9 3M9 3H4M9 3V8"
        stroke="currentColor"
        strokeWidth="1.2"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

function PreviewDeck() {
  return (
    <div className="relative aspect-[5/4] w-full">
      {/* central glow */}
      <div className="pointer-events-none absolute inset-0 [mask-image:radial-gradient(ellipse_at_center,#000_40%,transparent_70%)]">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_70%_30%,rgba(111,175,161,0.18),transparent_55%)]" />
      </div>

      {/* card 1 — large */}
      <motion.div
        initial={{ opacity: 0, y: 30, rotate: -2 }}
        animate={{ opacity: 1, y: 0, rotate: 0 }}
        transition={{ duration: 1.1, delay: BOOT_DELAY + 0.45, ease: [0.22, 1, 0.36, 1] }}
        whileHover={{ y: -6, rotate: 0.3 }}
        className="absolute right-0 top-2 h-[78%] w-[70%] overflow-hidden rounded-2xl glass-card"
        style={{
          background:
            "linear-gradient(135deg, #1A2226 0%, #0F1418 55%, #0A0C10 100%)",
        }}
      >
        <PreviewVisualA />
        <CardChrome label="REEL · 01" sub="AI 产品片" />
      </motion.div>

      {/* card 2 — mid */}
      <motion.div
        initial={{ opacity: 0, y: 30, rotate: 3 }}
        animate={{ opacity: 1, y: 0, rotate: 0 }}
        transition={{ duration: 1.1, delay: BOOT_DELAY + 0.6, ease: [0.22, 1, 0.36, 1] }}
        whileHover={{ y: -6, rotate: -0.5 }}
        className="absolute left-0 top-12 h-[62%] w-[52%] overflow-hidden rounded-2xl glass-card"
        style={{
          background:
            "linear-gradient(135deg, #1F1B25 0%, #110F18 55%, #09080C 100%)",
        }}
      >
        <PreviewVisualB />
        <CardChrome label="A+ · 02" sub="电商视觉" />
      </motion.div>

      {/* card 3 — small bottom */}
      <motion.div
        initial={{ opacity: 0, y: 30, rotate: -1 }}
        animate={{ opacity: 1, y: 0, rotate: 0 }}
        transition={{ duration: 1.1, delay: BOOT_DELAY + 0.75, ease: [0.22, 1, 0.36, 1] }}
        whileHover={{ y: -6, rotate: 0.6 }}
        className="absolute bottom-0 left-[20%] h-[42%] w-[44%] overflow-hidden rounded-2xl glass-card"
        style={{
          background:
            "linear-gradient(135deg, #21201B 0%, #13120E 55%, #0B0A07 100%)",
        }}
      >
        <PreviewVisualC />
        <CardChrome label="EDIT · 03" sub="商业剪辑" />
      </motion.div>
    </div>
  );
}

function CardChrome({ label, sub }: { label: string; sub: string }) {
  return (
    <div className="absolute inset-x-0 bottom-0 flex items-end justify-between px-4 pb-3">
      <div>
        <div className="font-mono text-[10px] tracking-widest text-bone-300/80">
          {label}
        </div>
        <div className="font-cn text-[14px] text-bone-50">{sub}</div>
      </div>
      <div className="flex h-6 w-6 items-center justify-center rounded-full border border-bone-100/15 text-bone-200">
        <svg width="9" height="9" viewBox="0 0 12 12" fill="none">
          <path d="M4 3l5 3-5 3V3z" fill="currentColor" />
        </svg>
      </div>
    </div>
  );
}

function PreviewVisualA() {
  return (
    <svg
      viewBox="0 0 400 320"
      className="absolute inset-0 h-full w-full"
      aria-hidden
    >
      <defs>
        <radialGradient id="ga" cx="65%" cy="35%" r="50%">
          <stop offset="0%" stopColor="#6FAFA1" stopOpacity="0.55" />
          <stop offset="60%" stopColor="#2A3038" stopOpacity="0" />
        </radialGradient>
      </defs>
      <rect width="400" height="320" fill="url(#ga)" />
      {[60, 110, 160, 210, 260].map((y, i) => (
        <line
          key={i}
          x1="0"
          x2="400"
          y1={y}
          y2={y}
          stroke="#F7F4EE"
          strokeOpacity={0.06}
          strokeWidth="0.8"
        />
      ))}
      <g opacity="0.85">
        <ellipse cx="240" cy="195" rx="78" ry="14" fill="#000" opacity="0.4" />
        <path
          d="M200 110 Q240 85 280 110 L284 180 Q240 200 196 180 Z"
          fill="#1B2329"
          stroke="#6FAFA1"
          strokeOpacity="0.35"
          strokeWidth="1"
        />
        <circle cx="240" cy="135" r="14" fill="#6FAFA1" opacity="0.55" />
        <circle cx="240" cy="135" r="6" fill="#0B0C0F" />
      </g>
    </svg>
  );
}

function PreviewVisualB() {
  return (
    <svg
      viewBox="0 0 320 260"
      className="absolute inset-0 h-full w-full"
      aria-hidden
    >
      <g opacity="0.9">
        {[0, 1, 2].map((c) =>
          [0, 1].map((r) => (
            <rect
              key={`${c}-${r}`}
              x={30 + c * 88}
              y={50 + r * 84}
              width="72"
              height="68"
              rx="8"
              fill="#15131A"
              stroke="#F7F4EE"
              strokeOpacity="0.06"
            />
          ))
        )}
        <rect
          x={118}
          y={50}
          width="72"
          height="68"
          rx="8"
          fill="none"
          stroke="#6FAFA1"
          strokeOpacity="0.55"
          strokeWidth="1"
        />
        <circle cx={154} cy={84} r="6" fill="#6FAFA1" opacity="0.65" />
      </g>
    </svg>
  );
}

function PreviewVisualC() {
  return (
    <svg
      viewBox="0 0 280 180"
      className="absolute inset-0 h-full w-full"
      aria-hidden
    >
      {[0, 1, 2, 3, 4, 5].map((i) => (
        <rect
          key={i}
          x={20 + i * 40}
          y={60 + (i % 2) * 18}
          width="32"
          height={i % 2 === 0 ? 36 : 22}
          rx="3"
          fill="#F7F4EE"
          opacity={i === 2 ? 0.55 : 0.16}
        />
      ))}
      <line
        x1="0"
        x2="280"
        y1="120"
        y2="120"
        stroke="#F7F4EE"
        strokeOpacity="0.1"
      />
      <circle cx="100" cy="120" r="3" fill="#6FAFA1" />
    </svg>
  );
}
