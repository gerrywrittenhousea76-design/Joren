"use client";

import { contact } from "@/lib/data";
import Reveal from "./ui/Reveal";
import Magnetic from "./ui/Magnetic";
import SectionHeader from "./ui/SectionHeader";

export default function Contact() {
  return (
    <section id="contact" className="relative py-24 md:py-32">
      <div className="container-page">
        <SectionHeader index="07" cn="联系我" en="CONTACT" />

        <Reveal as="div" className="relative mt-10 md:mt-14 overflow-hidden rounded-3xl border border-bone-100/[0.07] bg-gradient-to-br from-ink-800/80 via-ink-900/80 to-ink-950/90 px-7 py-12 md:px-14 md:py-20">
          <div className="pointer-events-none absolute -top-40 left-1/2 h-[420px] w-[720px] -translate-x-1/2 rounded-full bg-teal/15 blur-[120px] animate-pulse-soft" />
          <div className="pointer-events-none absolute inset-0 [mask-image:radial-gradient(ellipse_at_center,#000_55%,transparent_85%)]">
            <div
              className="absolute inset-0 opacity-[0.05]"
              style={{
                backgroundImage:
                  "linear-gradient(to right, rgba(247,244,238,1) 1px, transparent 1px), linear-gradient(to bottom, rgba(247,244,238,1) 1px, transparent 1px)",
                backgroundSize: "48px 48px",
              }}
            />
          </div>

          <div className="relative">
            <h2>
              <span className="font-cn font-light leading-[1.1] tracking-tight text-bone-50 text-[8vw] md:text-[4.4vw] block">
                把产品讲成
                <br />
                会<em className="font-display italic text-teal-400/90">卖货</em>的故事。
              </span>
              <span className="mt-3 block font-display italic text-bone-400 text-[2.6vw] md:text-[1.2vw]">
                Let's create product stories that sell.
              </span>
            </h2>

            <p className="font-cn mt-7 max-w-xl text-[14px] leading-[1.85] text-bone-300">
              如果你正在寻找一位懂 AI、懂视觉、也懂商业交付的内容创作者——欢迎聊聊你的项目。
            </p>

            <div className="mt-10 grid gap-10 md:grid-cols-12">
              <div className="md:col-span-6 space-y-6">
                <ContactRow label="邮箱 / Email" value={contact.email} href={`mailto:${contact.email}`} />
                <ContactRow label="微信 / WeChat" value={contact.wechat} />
                <ContactRow label="位置 / Location" value="国内 · 全球远程合作" />
              </div>

              <div className="md:col-span-6 flex flex-col items-start gap-4 md:items-end md:justify-end">
                <Magnetic strength={0.3}>
                  <a
                    href={`mailto:${contact.email}`}
                    className="btn-primary text-[14px] px-6 py-3.5"
                  >
                    发送邮件
                    <Arrow />
                  </a>
                </Magnetic>
                <Magnetic strength={0.25}>
                  <a
                    href={contact.resumeUrl}
                    className="btn-ghost text-[14px] px-6 py-3.5"
                    download
                  >
                    下载简历
                    <Arrow />
                  </a>
                </Magnetic>
                <p className="font-mono text-[10px] tracking-widest uppercase text-bone-400">
                  48 小时内回复
                </p>
              </div>
            </div>
          </div>
        </Reveal>
      </div>
    </section>
  );
}

function ContactRow({
  label,
  value,
  href,
}: {
  label: string;
  value: string;
  href?: string;
}) {
  const Inner = (
    <div className="group flex items-baseline justify-between gap-6 border-b border-bone-100/[0.08] py-4 transition-all duration-500 hover:border-teal/40 hover:pl-3">
      <span className="font-mono text-[10px] tracking-widest uppercase text-bone-400">
        {label}
      </span>
      <span className="font-cn font-light text-[16px] md:text-[20px] text-bone-50 transition-colors duration-500 group-hover:text-teal-400">
        {value}
      </span>
    </div>
  );
  return href ? <a href={href}>{Inner}</a> : <div>{Inner}</div>;
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
