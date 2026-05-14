"use client";

import { processSteps } from "@/lib/data";
import Reveal from "./ui/Reveal";
import SectionHeader from "./ui/SectionHeader";
import { motion, useScroll, useTransform } from "framer-motion";
import { useRef } from "react";

export default function Process() {
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start 70%", "end 30%"],
  });
  const lineWidth = useTransform(scrollYProgress, [0, 1], ["0%", "100%"]);

  return (
    <section id="process" className="relative py-24 md:py-32">
      <div className="container-page">
        <SectionHeader index="04" cn="工作流程" en="PROCESS" />

        <Reveal as="div" className="mt-10 md:mt-14 mb-14 md:mb-20">
          <div className="grid gap-6 md:grid-cols-12 md:gap-10">
            <h2 className="md:col-span-8">
              <span className="font-cn font-light leading-[1.1] tracking-tight text-bone-50 text-[7.5vw] md:text-[3.6vw] block">
                从需求到交付，
                <br />
                一条
                <em className="font-display italic text-teal-400/90">从容</em>的七步路径。
              </span>
              <span className="mt-3 block font-display italic text-bone-400 text-[2.4vw] md:text-[1.05vw]">
                A calm seven-step path.
              </span>
            </h2>
            <p className="font-cn text-[13px] leading-[1.85] text-bone-400 md:col-span-4 md:pt-2">
              下面是我处理一个商业项目的方式——更接近一份高端商业提案的工作流程图，而不是模板化的甘特图。
            </p>
          </div>
        </Reveal>

        {/* Desktop: horizontal flow with scroll-driven progress line */}
        <div ref={ref} className="relative hidden md:block">
          <div className="absolute left-0 right-0 top-[58px] h-px bg-bone-100/[0.08]" />
          <motion.div
            style={{ width: lineWidth }}
            className="absolute left-0 top-[58px] h-px bg-gradient-to-r from-teal/20 via-teal to-teal/20 shadow-[0_0_8px_rgba(111,175,161,0.5)]"
          />

          <ol className="relative grid grid-cols-7 gap-4">
            {processSteps.map((s, i) => (
              <Reveal
                key={s.n}
                as="li"
                delay={i * 0.08}
                className="relative flex flex-col items-start"
              >
                <div className="group relative mb-9 flex h-[60px] w-[60px] items-center justify-center transition-transform duration-500 hover:scale-110">
                  <span className="absolute inset-0 rounded-full border border-bone-100/15 bg-ink-900" />
                  <span
                    className={
                      "absolute inset-[6px] rounded-full transition-colors " +
                      (i === 4
                        ? "bg-teal/30 ring-1 ring-teal/40"
                        : "bg-bone-100/[0.04] group-hover:bg-teal/15")
                    }
                  />
                  <span className="relative font-mono text-[11px] tracking-widest text-bone-200">
                    {s.n}
                  </span>
                  {/* expanding ring on hover */}
                  <span className="pointer-events-none absolute inset-0 rounded-full border border-teal/0 transition-all duration-500 group-hover:inset-[-8px] group-hover:border-teal/30" />
                </div>
                <div className="font-cn font-light text-[16px] leading-tight text-bone-50">
                  {s.cn}
                </div>
                <div className="font-display italic mt-1 text-[11px] tracking-wide text-bone-400">
                  {s.en}
                </div>
              </Reveal>
            ))}
          </ol>
        </div>

        {/* Mobile: vertical timeline with progress line */}
        <ol className="md:hidden relative space-y-6 border-l border-bone-100/10 pl-6">
          {processSteps.map((s, i) => (
            <Reveal as="li" delay={i * 0.05} key={s.n} className="relative">
              <span className="absolute -left-[31px] top-1 flex h-5 w-5 items-center justify-center rounded-full border border-bone-100/15 bg-ink-900">
                <span
                  className={
                    "h-2 w-2 rounded-full " +
                    (i === 4 ? "bg-teal" : "bg-bone-300/40")
                  }
                />
              </span>
              <div className="font-mono text-[10px] tracking-widest uppercase text-bone-400">
                {s.n} · {s.en}
              </div>
              <div className="font-cn font-light mt-1 text-[18px] text-bone-50">
                {s.cn}
              </div>
            </Reveal>
          ))}
        </ol>
      </div>
    </section>
  );
}
