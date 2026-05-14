"use client";

import { experiences, profile } from "@/lib/data";
import Reveal from "./ui/Reveal";

export default function Profile() {
  return (
    <section id="profile" className="relative py-24 md:py-32">
      <div className="container-page">
        {/* 章节标识 — 与 SectionHeader 风格保持一致 */}
        <Reveal>
          <div className="mb-12 flex items-baseline gap-4 border-t border-bone-100/[0.12] pt-5 md:mb-16 md:gap-6 md:pt-6">
            <span className="font-display italic text-[26px] md:text-[34px] leading-none text-teal-400/90">
              ◯
            </span>
            <span className="hidden h-px flex-1 bg-bone-100/[0.08] md:block" />
            <div className="flex flex-1 items-baseline gap-3 md:flex-none">
              <span className="font-cn text-[14px] md:text-[15px] tracking-wide text-bone-100">
                个人简介
              </span>
              <span className="font-mono text-[10px] tracking-widest uppercase text-bone-400">
                / PROFILE
              </span>
            </div>
            <span className="ml-auto font-mono text-[10px] tracking-widest uppercase text-bone-400 md:ml-0">
              SELF · 江国佳
            </span>
          </div>
        </Reveal>

        <div className="grid gap-12 md:grid-cols-12 md:gap-14 lg:gap-20">
          {/* ───── 左侧：照片 + 自我介绍 ───── */}
          <Reveal as="div" className="md:col-span-5">
            <PhotoFrame />

            <h2 className="mt-8 font-cn font-light text-[28px] md:text-[34px] leading-[1.2] tracking-tight text-bone-50">
              {profile.intro1}
            </h2>

            <p className="mt-5 max-w-md font-cn text-[14px] leading-[1.9] text-bone-300">
              {profile.intro2}
            </p>

            {/* 一些"名片"装饰：邮件 / 位置 */}
            <ul className="mt-8 space-y-2 font-mono text-[11px] tracking-widest uppercase text-bone-400">
              <li className="flex items-center gap-3">
                <span className="inline-block h-px w-4 bg-bone-300/40" />
                <span>BASED IN CN · 全球远程</span>
              </li>
              <li className="flex items-center gap-3">
                <span className="inline-block h-px w-4 bg-bone-300/40" />
                <span>OPEN FOR · 接洽精选项目</span>
              </li>
            </ul>
          </Reveal>

          {/* ───── 右侧：三段工作经历 ───── */}
          <div className="md:col-span-7 md:pt-2">
            <Reveal as="div" className="mb-8 flex items-center gap-4">
              <span className="font-cn text-[13px] tracking-wide text-bone-200">
                工作经历
              </span>
              <span className="h-px flex-1 bg-bone-100/[0.08]" />
              <span className="font-mono text-[10px] tracking-widest uppercase text-bone-400">
                EXPERIENCE
              </span>
            </Reveal>

            <ol className="relative">
              {experiences.map((exp, i) => (
                <Reveal
                  key={i}
                  as="li"
                  delay={i * 0.08}
                  className="group relative grid grid-cols-1 gap-4 border-b border-bone-100/[0.07] py-7 transition-colors duration-500 hover:border-teal/40 md:grid-cols-12 md:gap-8 md:py-8"
                >
                  {/* hover 时左侧滑出青绿色细线 */}
                  <span className="pointer-events-none absolute left-0 top-0 h-full w-px scale-y-0 bg-teal/60 transition-transform duration-500 origin-top group-hover:scale-y-100" />

                  {/* 时间 */}
                  <div className="md:col-span-4">
                    <div className="font-mono text-[11px] tracking-widest uppercase text-bone-400 transition-colors duration-500 group-hover:text-teal-400">
                      {exp.period}
                    </div>
                  </div>

                  {/* 内容 */}
                  <div className="md:col-span-8 md:pl-2">
                    <h3 className="font-cn font-light text-[20px] md:text-[22px] leading-[1.3] text-bone-50">
                      {exp.role}
                    </h3>
                    <p className="mt-1 font-cn text-[13px] tracking-wide text-bone-300">
                      {exp.company}
                    </p>
                    <p className="mt-4 font-cn text-[13px] leading-[1.85] text-bone-400">
                      {exp.description}
                    </p>
                  </div>
                </Reveal>
              ))}
            </ol>
          </div>
        </div>
      </div>
    </section>
  );
}

/**
 * 照片框：有照片就显示照片，没有则显示液态玻璃风占位（与 Cover 一致的设计语言）
 */
function PhotoFrame() {
  return (
    <div
      className="relative aspect-[4/5] w-full overflow-hidden rounded-2xl"
      style={{
        background:
          "linear-gradient(135deg, rgba(20,28,42,0.9), rgba(15,18,24,0.9))",
        border: "1px solid rgba(255,255,255,0.08)",
        boxShadow: [
          "inset 0 1px 0 rgba(255,255,255,0.10)",
          "inset 0 -1px 0 rgba(0,0,0,0.3)",
          "0 24px 60px -16px rgba(0,0,0,0.6)",
          "0 0 0 1px rgba(255,255,255,0.02)",
        ].join(", "),
      }}
    >
      {profile.photo ? (
        // eslint-disable-next-line @next/next/no-img-element
        <img
          src={profile.photo}
          alt="江国佳 Joren Guo"
          className="h-full w-full object-cover"
        />
      ) : (
        <PhotoPlaceholder />
      )}

      {/* 顶部反射高光（呼应 cover 液态玻璃） */}
      <span
        aria-hidden
        className="pointer-events-none absolute inset-x-0 top-0 h-1/3"
        style={{
          background:
            "linear-gradient(180deg, rgba(255,255,255,0.10) 0%, rgba(255,255,255,0) 100%)",
        }}
      />
      {/* 角标 */}
      <div className="absolute left-4 top-4 font-mono text-[10px] tracking-widest uppercase text-bone-200/80">
        JG / PORTRAIT
      </div>
      <div className="absolute bottom-4 right-4 flex items-center gap-2 font-mono text-[10px] tracking-widest uppercase text-bone-200/80">
        <span className="relative flex h-1.5 w-1.5">
          <span className="absolute inset-0 rounded-full bg-teal animate-pulse-soft" />
        </span>
        <span>2026</span>
      </div>
    </div>
  );
}

/**
 * 没放照片时的占位：抽象人像 + "REPLACE" 提示
 */
function PhotoPlaceholder() {
  return (
    <div className="absolute inset-0">
      {/* 中央抽象人像剪影 */}
      <svg
        viewBox="0 0 320 400"
        preserveAspectRatio="xMidYMid slice"
        className="absolute inset-0 h-full w-full"
        aria-hidden
      >
        <defs>
          <radialGradient id="pp-glow" cx="50%" cy="40%" r="60%">
            <stop offset="0%" stopColor="#6FAFA1" stopOpacity="0.18" />
            <stop offset="60%" stopColor="#1F2A3E" stopOpacity="0" />
          </radialGradient>
        </defs>
        <rect width="320" height="400" fill="url(#pp-glow)" />
        {/* faint grid */}
        {[80, 160, 240].map((x) => (
          <line
            key={x}
            x1={x}
            x2={x}
            y1="0"
            y2="400"
            stroke="#F7F4EE"
            strokeOpacity="0.04"
          />
        ))}
        {[100, 200, 300].map((y) => (
          <line
            key={y}
            x1="0"
            x2="320"
            y1={y}
            y2={y}
            stroke="#F7F4EE"
            strokeOpacity="0.04"
          />
        ))}
        {/* 抽象人像（头 + 肩 silhouette） */}
        <g opacity="0.85">
          <circle cx="160" cy="160" r="58" fill="#0B0C0F" stroke="#6FAFA1" strokeOpacity="0.25" />
          <path
            d="M70 360 Q70 270 160 270 Q250 270 250 360 L250 400 L70 400 Z"
            fill="#0B0C0F"
            stroke="#6FAFA1"
            strokeOpacity="0.25"
          />
          <circle cx="160" cy="160" r="20" fill="#6FAFA1" opacity="0.4" />
        </g>
        {/* 大写字母水印 */}
        <text
          x="50%"
          y="56%"
          textAnchor="middle"
          fontFamily="Instrument Serif, serif"
          fontSize="220"
          fontWeight="300"
          fill="#F7F4EE"
          opacity="0.04"
        >
          JG
        </text>
      </svg>
      <div className="absolute bottom-3 left-1/2 -translate-x-1/2 font-mono text-[10px] tracking-widest uppercase text-bone-300/60">
        REPLACE · /public/profile.jpg
      </div>
    </div>
  );
}
