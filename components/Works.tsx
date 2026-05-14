"use client";

import { useRef, useState } from "react";
import { works, type Work } from "@/lib/data";
import Reveal from "./ui/Reveal";
import Tilt from "./ui/Tilt";
import SectionHeader from "./ui/SectionHeader";
import VideoLightbox from "./VideoLightbox";

export default function Works() {
  const [active, setActive] = useState<Work | null>(null);

  return (
    <section id="works" className="relative py-24 md:py-32">
      <div className="container-page">
        <SectionHeader index="02" cn="精选作品" en="SELECTED WORKS" />

        <Reveal as="div" className="mt-10 md:mt-14 mb-12 md:mb-16">
          <div className="grid gap-6 md:grid-cols-12 md:gap-10">
            <h2 className="md:col-span-8">
              <span className="font-cn font-light tracking-tight leading-[1.1] text-bone-50 text-[7.5vw] md:text-[3.8vw] block">
                讲得好的故事，
                <br />
                能<em className="font-display italic text-teal-400/90">卖</em>
                得好。
              </span>
              <span className="mt-3 block font-display italic text-bone-400 text-[2.6vw] md:text-[1.15vw]">
                Stories that sell, not just play.
              </span>
            </h2>
            <p className="font-cn text-[13px] leading-[1.85] text-bone-400 md:col-span-4 md:pt-2">
              下面是六个具有代表性的方向。每一个项目都从产品本身出发——
              <span className="text-bone-200">卖点、人群、场景</span>
              ——再决定画面、节奏与交付物。
            </p>
          </div>
        </Reveal>

        <div className="grid grid-cols-1 gap-6 md:grid-cols-12 md:gap-x-6 md:gap-y-10">
          {works.map((w, i) => (
            <Reveal
              key={w.id}
              delay={i * 0.05}
              className={
                i === 0
                  ? "md:col-span-7"
                  : i === 1
                    ? "md:col-span-5"
                    : i === 2
                      ? "md:col-span-5"
                      : i === 3
                        ? "md:col-span-7"
                        : i === 4
                          ? "md:col-span-7"
                          : "md:col-span-5"
              }
            >
              <WorkCard
                work={w}
                large={i === 0 || i === 3 || i === 4}
                onPlay={() => setActive(w)}
              />
            </Reveal>
          ))}
        </div>
      </div>

      <VideoLightbox
        src={active?.video ?? null}
        poster={active?.cover}
        title={active?.title}
        titleEn={active?.titleEn}
        onClose={() => setActive(null)}
      />
    </section>
  );
}

function WorkCard({
  work,
  large,
  onPlay,
}: {
  work: Work;
  large?: boolean;
  onPlay: () => void;
}) {
  const videoRef = useRef<HTMLVideoElement>(null);
  const hasVideo = !!work.video;

  const handleEnter = () => {
    if (videoRef.current) {
      videoRef.current.play().catch(() => {});
    }
  };
  const handleLeave = () => {
    if (videoRef.current) {
      videoRef.current.pause();
      videoRef.current.currentTime = 0;
    }
  };

  // 有视频 → 点击打开 lightbox；没视频 → 跳到联系区块
  const handleClick = (e: React.MouseEvent) => {
    if (hasVideo) {
      e.preventDefault();
      onPlay();
    }
  };

  return (
    <Tilt max={4} className="h-full">
      <a
        href={hasVideo ? "#" : "#contact"}
        onClick={handleClick}
        onMouseEnter={handleEnter}
        onMouseLeave={handleLeave}
        className="group relative block h-full overflow-hidden rounded-3xl border border-bone-100/[0.06] bg-bone-100/[0.015] transition-colors duration-500 hover:border-bone-100/15"
        aria-label={hasVideo ? `播放：${work.title}` : work.title}
      >
        <div
          className={`relative overflow-hidden ${large ? "aspect-[16/10]" : "aspect-[4/3]"}`}
        >
          {/* ⬇︎ 优先级：视频 > 封面图 > 占位 SVG
              视频替换：把 mp4 放到 /public/works/，给 lib/data.ts 里的 work 加 video: "/works/xxx.mp4"
              图片替换：放到 /public/works/，加 cover: "/works/xxx.jpg" */}
          {work.video ? (
            <video
              ref={videoRef}
              src={work.video}
              poster={work.cover}
              muted
              loop
              playsInline
              preload="metadata"
              className="h-full w-full object-cover transition-transform duration-[1200ms] ease-out group-hover:scale-[1.05]"
            />
          ) : work.cover ? (
            // eslint-disable-next-line @next/next/no-img-element
            <img
              src={work.cover}
              alt={work.title}
              className="h-full w-full object-cover transition-transform duration-[1200ms] ease-out group-hover:scale-[1.05]"
            />
          ) : (
            <CoverPlaceholder accent={work.accent} index={work.index} />
          )}

          {/* hover wash */}
          <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-ink-950/60 via-ink-950/0 to-ink-950/0 opacity-90" />

          {/* corner index */}
          <div className="absolute left-5 top-5 flex items-center gap-2 font-mono text-[11px] tracking-widest uppercase text-bone-200/80">
            <span>{work.index}</span>
            <span className="inline-block h-px w-6 bg-bone-200/40" />
            <span className="font-cn">{work.type}</span>
          </div>

          {/* hover arrow */}
          <div className="absolute right-5 top-5 flex h-10 w-10 items-center justify-center rounded-full border border-bone-100/15 bg-ink-950/50 backdrop-blur-md transition-all duration-500 group-hover:bg-bone-50 group-hover:text-ink-950 group-hover:rotate-[45deg]">
            <svg width="14" height="14" viewBox="0 0 12 12" fill="none">
              <path
                d="M3 9L9 3M9 3H4M9 3V8"
                stroke="currentColor"
                strokeWidth="1.2"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
          </div>

          {/* 视频卡：常驻显示的播放标识；非视频卡：hover 出现"查看项目" */}
          {hasVideo ? (
            <>
              {/* 中央播放按钮（常驻 + hover 放大） */}
              <div className="pointer-events-none absolute inset-0 flex items-center justify-center">
                <span className="flex h-16 w-16 items-center justify-center rounded-full border border-bone-100/30 bg-ink-950/40 backdrop-blur-md transition-all duration-500 group-hover:scale-110 group-hover:border-teal/60 group-hover:bg-teal/20 md:h-20 md:w-20">
                  <svg
                    width="22"
                    height="22"
                    viewBox="0 0 24 24"
                    fill="none"
                    className="ml-1"
                  >
                    <path d="M7 5l13 7-13 7V5z" fill="#F7F4EE" />
                  </svg>
                </span>
              </div>
              {/* 左下角 PLAY VIDEO 标 */}
              <div className="absolute bottom-4 left-5">
                <span className="inline-flex items-center gap-2 rounded-full bg-bone-50/95 px-3 py-1.5 font-mono text-[10px] tracking-widest uppercase text-ink-950">
                  <span className="relative flex h-1.5 w-1.5">
                    <span className="absolute inset-0 animate-pulse-soft rounded-full bg-teal-600" />
                    <span className="absolute inset-0 rounded-full bg-teal-600/50 blur-sm" />
                  </span>
                  Play Video · 点击播放
                </span>
              </div>
            </>
          ) : (
            <div className="absolute inset-x-0 bottom-0 translate-y-full px-5 pb-4 transition-transform duration-500 ease-out group-hover:translate-y-0">
              <span className="inline-flex items-center gap-2 rounded-full bg-bone-50 px-3 py-1.5 font-cn text-[12px] text-ink-950">
                查看项目 →
              </span>
            </div>
          )}
        </div>

        <div className="px-5 py-5 md:px-6 md:py-6">
          <div className="flex items-baseline justify-between gap-4">
            <h3 className="font-cn font-light text-[20px] md:text-[24px] leading-tight text-bone-50">
              {work.title}
            </h3>
          </div>
          {work.titleEn && (
            <p className="font-display italic mt-1 text-[13px] text-bone-400">
              {work.titleEn}
            </p>
          )}

          <div className="mt-4 grid gap-3 text-[12.5px] md:grid-cols-2">
            <div>
              <span className="font-mono text-[10px] tracking-widest uppercase text-bone-400">
                Role / 职责
              </span>
              <p className="font-cn mt-1 text-bone-200">{work.role}</p>
            </div>
            <div>
              <span className="font-mono text-[10px] tracking-widest uppercase text-bone-400">
                About / 项目说明
              </span>
              <p className="font-cn mt-1 leading-[1.7] text-bone-300">
                {work.description}
              </p>
            </div>
          </div>

          <div className="mt-5 flex flex-wrap gap-2">
            {work.tags.map((t) => (
              <span key={t} className="tag font-cn">
                {t}
              </span>
            ))}
          </div>
        </div>
      </a>
    </Tilt>
  );
}

function CoverPlaceholder({
  accent,
  index,
}: {
  accent?: string;
  index: string;
}) {
  return (
    <div
      className={`absolute inset-0 bg-gradient-to-br ${accent ?? "from-ink-700 via-ink-800 to-ink-950"}`}
    >
      <div className="absolute inset-0 [mask-image:radial-gradient(ellipse_at_center,#000_50%,transparent_85%)]">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_30%_70%,rgba(111,175,161,0.15),transparent_50%)]" />
      </div>
      <svg
        viewBox="0 0 800 500"
        preserveAspectRatio="xMidYMid slice"
        className="absolute inset-0 h-full w-full transition-transform duration-[1200ms] ease-out group-hover:scale-[1.04]"
        aria-hidden
      >
        {Array.from({ length: 11 }).map((_, i) => (
          <line
            key={i}
            x1={i * 80}
            x2={i * 80}
            y1="0"
            y2="500"
            stroke="#F7F4EE"
            strokeOpacity="0.04"
          />
        ))}
        <text
          x="50%"
          y="58%"
          textAnchor="middle"
          fontFamily="Instrument Serif, serif"
          fontSize="320"
          fontWeight="300"
          fill="#F7F4EE"
          opacity="0.06"
        >
          {index}
        </text>
        <rect
          x="40"
          y="40"
          width="720"
          height="420"
          fill="none"
          stroke="#F7F4EE"
          strokeOpacity="0.12"
        />
        <g opacity="0.85">
          <rect
            x="320"
            y="190"
            width="160"
            height="120"
            rx="10"
            fill="#0B0C0F"
            stroke="#6FAFA1"
            strokeOpacity="0.4"
          />
          <circle cx="400" cy="250" r="22" fill="#6FAFA1" opacity="0.45" />
          <circle cx="400" cy="250" r="9" fill="#0B0C0F" />
        </g>
        <g transform="translate(400 380)" opacity="0.7">
          <circle r="14" fill="none" stroke="#F7F4EE" strokeOpacity="0.4" />
          <path d="M-3 -5 L5 0 L-3 5 Z" fill="#F7F4EE" />
        </g>
      </svg>
      <div className="absolute bottom-3 right-4 font-mono text-[10px] tracking-widest uppercase text-bone-300/60">
        替换 · /public/works
      </div>
    </div>
  );
}
