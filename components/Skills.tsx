"use client";

import { skills } from "@/lib/data";
import Marquee from "./ui/Marquee";
import Reveal from "./ui/Reveal";
import SectionHeader from "./ui/SectionHeader";

export default function Skills() {
  return (
    <section id="skills" className="relative py-20 md:py-24">
      <div className="container-page">
        <SectionHeader index="05" cn="技能与工具" en="TOOLKIT & CRAFT" />

        <Reveal as="div" className="mt-10 md:mt-12 mb-8 flex items-end justify-between gap-6">
          <h2>
            <span className="font-cn font-light tracking-tight text-bone-50 text-[6.5vw] md:text-[2.6vw] block leading-[1.05]">
              工具与<em className="font-display italic text-teal-400/90">手艺</em>。
            </span>
            <span className="mt-1 block font-display italic text-bone-400 text-[2.2vw] md:text-[0.95vw]">
              Toolkit & craft.
            </span>
          </h2>
          <p className="font-cn hidden max-w-xs text-[12px] leading-[1.8] text-bone-400 md:block">
            工具是用来服务表达的——下面这些是我目前在商业项目里日常使用的能力栈。
          </p>
        </Reveal>
      </div>

      <Reveal>
        <Marquee className="py-5 border-y border-bone-100/[0.06]">
          {skills.map((s) => (
            <span
              key={s}
              className="font-cn font-light text-[28px] md:text-[44px] text-bone-50/90 leading-none transition-colors duration-300 hover:text-teal-400"
            >
              {s}
              <span className="mx-7 text-teal/70">✦</span>
            </span>
          ))}
        </Marquee>
      </Reveal>
    </section>
  );
}
