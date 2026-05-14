"use client";

import { AnimatePresence, motion, useReducedMotion } from "framer-motion";
import { useEffect, useState } from "react";

/**
 * 进入网站时的"生长式"开场动画。
 * 时间轴（约 2.0s）：
 *  0.00 - 0.20s  全黑屏 + 锁滚动
 *  0.20 - 0.45s  中心种子光点出现并放大
 *  0.30 - 0.85s  从中心生长出十字轴线（垂直 + 水平）
 *  0.55 - 1.20s  细网格波纹式淡入
 *  0.90 - 1.55s  中心 Logo 文字淡入并淡出
 *  1.55 - 2.00s  遮罩从中心扩散透明孔洞，完全揭开页面
 */
export default function BootSequence() {
  const [done, setDone] = useState(false);
  const reduce = useReducedMotion();

  useEffect(() => {
    if (reduce) {
      setDone(true);
      return;
    }
    // 锁滚动
    const prevOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";

    const t = setTimeout(() => {
      setDone(true);
      document.body.style.overflow = prevOverflow;
    }, 2100);

    return () => {
      clearTimeout(t);
      document.body.style.overflow = prevOverflow;
    };
  }, [reduce]);

  return (
    <AnimatePresence>
      {!done && (
        <motion.div
          // 用 clip-path 做"从中心揭开"
          initial={{ clipPath: "circle(150% at 50% 50%)" }}
          animate={{ clipPath: "circle(150% at 50% 50%)" }}
          exit={{ clipPath: "circle(0% at 50% 50%)" }}
          transition={{ duration: 0.7, ease: [0.85, 0, 0.15, 1] }}
          className="fixed inset-0 z-[100] overflow-hidden bg-ink-950"
        >
          {/* 顶层细噪点 */}
          <div className="pointer-events-none absolute inset-0 bg-noise opacity-[0.04]" />

          {/* 网格波纹 */}
          <Grid />

          {/* 垂直轴线 */}
          <motion.span
            initial={{ scaleY: 0, opacity: 0 }}
            animate={{ scaleY: 1, opacity: 1 }}
            transition={{
              duration: 0.55,
              delay: 0.3,
              ease: [0.65, 0, 0.35, 1],
            }}
            style={{ transformOrigin: "50% 50%" }}
            className="absolute left-1/2 top-0 bottom-0 w-px -translate-x-px bg-gradient-to-b from-transparent via-teal/70 to-transparent shadow-[0_0_24px_rgba(111,175,161,0.45)]"
          />
          {/* 水平轴线 */}
          <motion.span
            initial={{ scaleX: 0, opacity: 0 }}
            animate={{ scaleX: 1, opacity: 1 }}
            transition={{
              duration: 0.55,
              delay: 0.4,
              ease: [0.65, 0, 0.35, 1],
            }}
            style={{ transformOrigin: "50% 50%" }}
            className="absolute top-1/2 left-0 right-0 h-px -translate-y-px bg-gradient-to-r from-transparent via-bone-100/30 to-transparent"
          />

          {/* 中心种子光点 */}
          <motion.span
            initial={{ scale: 0, opacity: 0 }}
            animate={{
              scale: [0, 1, 1.4, 1],
              opacity: [0, 1, 0.8, 0.4],
            }}
            transition={{
              duration: 1.4,
              delay: 0.2,
              ease: [0.22, 1, 0.36, 1],
              times: [0, 0.18, 0.6, 1],
            }}
            className="absolute left-1/2 top-1/2 h-2.5 w-2.5 -translate-x-1/2 -translate-y-1/2 rounded-full bg-teal shadow-[0_0_40px_rgba(111,175,161,0.9)]"
          />

          {/* 扩散光环 */}
          <motion.span
            initial={{ scale: 0, opacity: 0.6 }}
            animate={{ scale: 14, opacity: 0 }}
            transition={{
              duration: 1.6,
              delay: 0.35,
              ease: [0.22, 1, 0.36, 1],
            }}
            className="absolute left-1/2 top-1/2 h-12 w-12 -translate-x-1/2 -translate-y-1/2 rounded-full border border-teal/40"
          />

          {/* Logo 文字 */}
          <motion.div
            initial={{ opacity: 0, y: 6 }}
            animate={{ opacity: [0, 1, 1, 0], y: [6, 0, 0, -4] }}
            transition={{
              duration: 1.4,
              delay: 0.7,
              ease: [0.22, 1, 0.36, 1],
              times: [0, 0.25, 0.7, 1],
            }}
            className="absolute left-1/2 top-1/2 mt-24 -translate-x-1/2 flex flex-col items-center gap-2"
          >
            <div className="font-cn text-[26px] font-light tracking-wider text-bone-50">
              江国佳
            </div>
            <div className="font-mono text-[10px] tracking-[0.3em] uppercase text-bone-400">
              Joren Guo · AI Visual Director
            </div>
          </motion.div>

          {/* 底部进度条 */}
          <motion.div
            initial={{ scaleX: 0 }}
            animate={{ scaleX: 1 }}
            transition={{ duration: 1.8, ease: "linear" }}
            className="absolute bottom-12 left-1/2 h-px w-40 -translate-x-1/2 origin-left bg-gradient-to-r from-teal/0 via-teal to-teal/0"
          />

          {/* 角标：左上 / 右下 */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.5, delay: 0.4 }}
            className="absolute left-6 top-6 font-mono text-[10px] tracking-widest uppercase text-bone-400"
          >
            INIT · 2026
          </motion.div>
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.5, delay: 0.4 }}
            className="absolute bottom-6 right-6 font-mono text-[10px] tracking-widest uppercase text-bone-400"
          >
            JOREN_GUO / PORTFOLIO
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}

/**
 * 8x6 网格波纹：每条线带不同的 delay，从中心向外扩散
 */
function Grid() {
  const cols = 9;
  const rows = 7;
  const center = { x: (cols - 1) / 2, y: (rows - 1) / 2 };

  return (
    <div className="pointer-events-none absolute inset-0 [mask-image:radial-gradient(ellipse_at_center,#000_30%,transparent_75%)]">
      {/* 垂直网格线 */}
      <div className="absolute inset-0 flex justify-between">
        {Array.from({ length: cols }).map((_, i) => {
          const dist = Math.abs(i - center.x);
          return (
            <motion.span
              key={`v-${i}`}
              initial={{ scaleY: 0, opacity: 0 }}
              animate={{ scaleY: 1, opacity: 1 }}
              transition={{
                duration: 0.6,
                delay: 0.55 + dist * 0.06,
                ease: [0.65, 0, 0.35, 1],
              }}
              style={{ transformOrigin: "50% 50%" }}
              className="w-px bg-bone-100/[0.06]"
            />
          );
        })}
      </div>
      {/* 水平网格线 */}
      <div className="absolute inset-0 flex flex-col justify-between">
        {Array.from({ length: rows }).map((_, i) => {
          const dist = Math.abs(i - center.y);
          return (
            <motion.span
              key={`h-${i}`}
              initial={{ scaleX: 0, opacity: 0 }}
              animate={{ scaleX: 1, opacity: 1 }}
              transition={{
                duration: 0.6,
                delay: 0.55 + dist * 0.06,
                ease: [0.65, 0, 0.35, 1],
              }}
              style={{ transformOrigin: "50% 50%" }}
              className="h-px bg-bone-100/[0.06]"
            />
          );
        })}
      </div>
    </div>
  );
}
