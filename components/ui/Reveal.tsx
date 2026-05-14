"use client";

import { motion, useReducedMotion } from "framer-motion";
import { ReactNode } from "react";

type Props = {
  children: ReactNode;
  delay?: number;
  y?: number;
  className?: string;
  as?: "div" | "section" | "li" | "article" | "header" | "h2" | "h3" | "p";
};

/**
 * 滚动出现 — 淡入 + 轻微上移
 */
export default function Reveal({
  children,
  delay = 0,
  y = 18,
  className,
  as = "div",
}: Props) {
  const reduce = useReducedMotion();
  const Comp = motion[as];

  return (
    <Comp
      initial={reduce ? { opacity: 0 } : { opacity: 0, y }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-10% 0px -10% 0px" }}
      transition={{
        duration: 0.9,
        delay,
        ease: [0.22, 1, 0.36, 1],
      }}
      className={className}
    >
      {children}
    </Comp>
  );
}
