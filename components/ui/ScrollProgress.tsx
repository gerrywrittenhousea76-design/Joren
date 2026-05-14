"use client";

import { motion, useScroll, useSpring } from "framer-motion";

/**
 * 顶部滚动进度条 — 极细一根，青绿色。
 */
export default function ScrollProgress() {
  const { scrollYProgress } = useScroll();
  const scaleX = useSpring(scrollYProgress, {
    stiffness: 120,
    damping: 24,
    mass: 0.4,
  });

  return (
    <motion.div
      style={{ scaleX, transformOrigin: "0% 50%" }}
      className="fixed inset-x-0 top-0 z-[70] h-px bg-teal/80 shadow-[0_0_8px_rgba(111,175,161,0.6)]"
      aria-hidden
    />
  );
}
