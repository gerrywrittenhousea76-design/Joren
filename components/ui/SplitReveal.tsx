"use client";

import { motion, useReducedMotion } from "framer-motion";
import { ReactNode } from "react";

type Props = {
  /** 多行文字，每个数组项是一行 */
  lines: (string | ReactNode)[];
  /** 每个字符的延迟步进 */
  step?: number;
  /** 整体起步延迟 */
  delay?: number;
  className?: string;
  /** 中文按字拆，英文按词拆，默认 auto 自动按字符拆，更碎更细腻 */
  splitBy?: "char" | "word";
};

/**
 * 标题分字浮现：每个字 / 词单独从下方滑入。
 * 中文用 char（按字），英文用 word（按词）更自然。
 */
export default function SplitReveal({
  lines,
  step = 0.025,
  delay = 0,
  className,
  splitBy = "char",
}: Props) {
  const reduce = useReducedMotion();

  let i = 0; // 全局字符序号

  return (
    <span className={className}>
      {lines.map((line, lineIdx) => (
        <span key={lineIdx} className="block overflow-hidden">
          <span className="inline-block">
            {typeof line === "string"
              ? splitTokens(line, splitBy).map((tok, j) => {
                  const idx = i++;
                  return (
                    <motion.span
                      key={`${lineIdx}-${j}`}
                      className="inline-block"
                      initial={
                        reduce ? { opacity: 0 } : { opacity: 0, y: "100%" }
                      }
                      animate={{ opacity: 1, y: 0 }}
                      transition={{
                        duration: 0.9,
                        delay: delay + idx * step,
                        ease: [0.22, 1, 0.36, 1],
                      }}
                    >
                      {tok === " " ? " " : tok}
                    </motion.span>
                  );
                })
              : line}
          </span>
        </span>
      ))}
    </span>
  );
}

function splitTokens(s: string, mode: "char" | "word"): string[] {
  if (mode === "word") return s.split(/(\s+)/);
  return Array.from(s);
}
