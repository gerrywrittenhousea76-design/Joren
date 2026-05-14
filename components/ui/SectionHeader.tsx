"use client";

import Reveal from "./Reveal";

type Props = {
  /** 章节编号，例如 "02" */
  index: string;
  /** 总章节数，例如 "07" */
  total?: string;
  /** 中文章节名 */
  cn: string;
  /** 英文章节名 */
  en: string;
};

/**
 * 统一的章节起始标识：贯穿线 + 编号 + 章节名 + 索引计数
 * 让"现在进入第几章节"一目了然
 */
export default function SectionHeader({ index, total = "07", cn, en }: Props) {
  return (
    <Reveal>
      <div className="flex items-baseline gap-4 border-t border-bone-100/[0.12] pt-5 md:gap-6 md:pt-6">
        <span className="font-display italic text-[26px] md:text-[34px] leading-none text-teal-400/90">
          {index}
        </span>
        <span className="hidden h-px flex-1 bg-bone-100/[0.08] md:block" />
        <div className="flex flex-1 items-baseline gap-3 md:flex-none">
          <span className="font-cn text-[14px] md:text-[15px] tracking-wide text-bone-100">
            {cn}
          </span>
          <span className="font-mono text-[10px] tracking-widest uppercase text-bone-400">
            / {en}
          </span>
        </div>
        <span className="ml-auto font-mono text-[10px] tracking-widest uppercase text-bone-400 md:ml-0">
          {index} / {total}
        </span>
      </div>
    </Reveal>
  );
}
