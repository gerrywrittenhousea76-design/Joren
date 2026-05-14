"use client";

import { valueProps } from "@/lib/data";
import Reveal from "./ui/Reveal";
import SectionHeader from "./ui/SectionHeader";

export default function WhyMe() {
  return (
    <section id="why" className="relative py-24 md:py-32">
      <div className="container-page">
        <SectionHeader index="06" cn="为何选我" en="CAREER VALUE" />

        <Reveal as="div" className="mt-10 md:mt-14 mb-12 md:mb-14 grid gap-8 md:grid-cols-12">
          <div className="md:col-span-7">
            <h2>
              <span className="font-cn font-light leading-[1.1] tracking-tight text-bone-50 text-[7.5vw] md:text-[3.8vw] block">
                我能为<em className="font-display italic text-teal-400/90">团队</em>
                <br />
                带来的价值。
              </span>
              <span className="mt-3 block font-display italic text-bone-400 text-[2.4vw] md:text-[1.05vw]">
                What I bring to a team.
              </span>
            </h2>
          </div>
          <p className="font-cn md:col-span-5 md:pt-2 text-[13px] leading-[1.85] text-bone-400">
            如果你正在为团队物色一位同时具备审美、商业意识与执行力的内容人选，下面是三件我能稳定带来的价值。
          </p>
        </Reveal>

        <div className="grid gap-px overflow-hidden rounded-2xl border border-bone-100/[0.06] bg-bone-100/[0.06]">
          {valueProps.map((v, i) => (
            <Reveal
              key={v.n}
              delay={i * 0.07}
              className="group relative grid grid-cols-1 gap-5 bg-ink-900/80 p-7 md:grid-cols-12 md:p-10 transition-colors duration-700 hover:bg-ink-800/80"
            >
              <div className="md:col-span-3 flex items-baseline gap-3">
                <span className="font-cn font-light text-[56px] md:text-[80px] leading-none text-bone-50/15 group-hover:text-teal/40 transition-colors duration-700">
                  {v.n}
                </span>
                <span className="font-display italic text-[18px] md:text-[24px] text-bone-50/15 group-hover:text-teal/40 transition-colors duration-700">
                  {v.nRoman}
                </span>
              </div>
              <div className="md:col-span-9 md:pl-4">
                <h3 className="font-cn font-light text-[18px] md:text-[22px] leading-[1.4] text-bone-50">
                  {v.title}
                </h3>
                <p className="font-cn mt-3 max-w-2xl text-[13px] leading-[1.85] text-bone-400">
                  {v.blurb}
                </p>
              </div>
              <span className="pointer-events-none absolute inset-x-7 bottom-0 h-px scale-x-0 bg-teal/40 transition-transform duration-700 group-hover:scale-x-100 origin-left md:inset-x-10" />
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
