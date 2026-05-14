"use client";

import { capabilities } from "@/lib/data";
import Reveal from "./ui/Reveal";
import SectionHeader from "./ui/SectionHeader";

export default function About() {
  return (
    <section id="about" className="relative py-24 md:py-32">
      <div className="container-page">
        <SectionHeader index="03" cn="关于我" en="ABOUT ME" />

        <div className="mt-10 md:mt-14 grid gap-12 md:grid-cols-12">
          <Reveal as="div" className="md:col-span-5 md:sticky md:top-28 md:self-start">
            <h2>
              <span className="font-cn font-light leading-[1.1] tracking-tight text-bone-50 text-[8vw] md:text-[3.6vw] block">
                视觉 <em className="font-display italic text-teal-400/90">+</em>{" "}
                商业 <em className="font-display italic">+</em>{" "}
                AI。
              </span>
              <span className="mt-3 block font-display italic text-bone-400 text-[2.6vw] md:text-[1.05vw]">
                Visual + Commerce + AI.
              </span>
            </h2>
            <p className="font-cn mt-7 max-w-md text-[14px] leading-[1.85] text-bone-200">
              我是一个结合<span className="text-teal-400">商业理解</span>、
              <span className="text-teal-400">视觉审美</span>与
              <span className="text-teal-400">AI 工具能力</span>的内容创作者。
            </p>
            <p className="font-cn mt-3 max-w-md text-[13px] leading-[1.85] text-bone-400">
              我不只负责画面制作，也关注产品卖点、用户场景、内容转化和项目交付。比起"做出一支好看的视频"，我更在意"这支视频能不能让产品被更好地理解和卖出去"。
            </p>
          </Reveal>

          <div className="md:col-span-7 grid gap-5 md:grid-cols-2">
            {capabilities.map((c, i) => (
              <Reveal
                key={c.title}
                delay={i * 0.08}
                className="group relative overflow-hidden rounded-2xl glass-card p-6 md:p-7 transition-transform duration-500 hover:-translate-y-1.5 hover:border-teal/30"
              >
                <div className="flex items-start justify-between">
                  <span className="font-mono text-[10px] tracking-widest uppercase text-bone-400">
                    0{i + 1}
                  </span>
                  <span className="font-mono text-[10px] tracking-widest uppercase text-bone-400">
                    {c.en}
                  </span>
                </div>

                <h3 className="font-cn font-light mt-10 text-[22px] md:text-[24px] leading-[1.2] text-bone-50">
                  {c.title}
                </h3>

                <p className="font-cn mt-3 text-[13px] leading-[1.8] text-bone-300">
                  {c.blurb}
                </p>

                <ul className="mt-5 flex flex-wrap gap-2">
                  {c.points.map((p) => (
                    <li key={p} className="tag font-cn">
                      {p}
                    </li>
                  ))}
                </ul>

                <span className="pointer-events-none absolute -bottom-12 -right-12 h-44 w-44 rounded-full bg-teal/10 blur-3xl transition-all duration-500 group-hover:bg-teal/25 group-hover:scale-110" />
              </Reveal>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
