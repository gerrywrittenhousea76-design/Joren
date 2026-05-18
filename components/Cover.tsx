"use client";

import { motion } from "framer-motion";
import { useRef, useState } from "react";

const BOOT_DELAY = 1.55;
// 圆形遮罩半径（px）
const LENS_R = 130;

export default function Cover() {
  const titleRef = useRef<HTMLDivElement>(null);
  const [active, setActive] = useState(false);
  const [pos, setPos] = useState({ x: 0, y: 0 });

  const handleMove = (e: React.MouseEvent) => {
    if (!titleRef.current) return;
    const rect = titleRef.current.getBoundingClientRect();
    setPos({ x: e.clientX - rect.left, y: e.clientY - rect.top });
  };

  return (
    <section
      id="cover"
      className="relative flex min-h-[100svh] items-center justify-center overflow-hidden"
    >
      {/* 顶部小角标 */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.9, delay: BOOT_DELAY, ease: [0.22, 1, 0.36, 1] }}
        className="absolute left-0 right-0 top-28 flex justify-between px-6 md:top-32 md:px-12"
      >
        <span className="font-mono text-[10px] tracking-widest uppercase text-bone-400">
          01 / WELCOME · 入站
        </span>
        <span className="font-mono text-[10px] tracking-widest uppercase text-bone-400">
          PORTFOLIO 2026
        </span>
      </motion.div>

      {/* 中央同行中英 + 液态玻璃遮罩 */}
      <div className="relative px-4 text-center">
        <motion.div
          initial={{ opacity: 0, y: 28 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{
            duration: 1.2,
            delay: BOOT_DELAY + 0.3,
            ease: [0.22, 1, 0.36, 1],
          }}
          ref={titleRef}
          onMouseEnter={() => setActive(true)}
          onMouseLeave={() => setActive(false)}
          onMouseMove={handleMove}
          className="relative inline-block select-none whitespace-nowrap"
          data-cursor="hover"
        >
          {/* 底层：英文（一直显示，黑体） */}
          <h1 className="font-cn font-normal md:font-light text-[10vw] md:text-[7.6vw] leading-[1.05] tracking-tight text-bone-50">
            Hello, I&apos;M JOREN.
          </h1>

          {/* 中层：液态玻璃圆形 — hover 时跟随鼠标。
              它本身就是"遮罩"，半透明 + 模糊把英文柔化，让上方中文清晰浮现。 */}
          <div
            aria-hidden
            className="pointer-events-none absolute rounded-full transition-opacity duration-500 ease-[cubic-bezier(0.22,1,0.36,1)]"
            style={{
              left: pos.x - LENS_R,
              top: pos.y - LENS_R,
              width: LENS_R * 2,
              height: LENS_R * 2,
              opacity: active ? 1 : 0,
              transform: active ? "scale(1)" : "scale(0.85)",
              transitionProperty: "opacity, transform",
              // 玻璃底色：顶亮→底暗的微弱渐变
              background:
                "linear-gradient(180deg, rgba(255,255,255,0.16) 0%, rgba(255,255,255,0.04) 100%)",
              // iOS 26 液态玻璃核心：高斯模糊 + 饱和度补偿 + 微亮
              backdropFilter: "blur(22px) saturate(180%) brightness(1.06)",
              WebkitBackdropFilter:
                "blur(22px) saturate(180%) brightness(1.06)",
              border: "1px solid rgba(255,255,255,0.18)",
              boxShadow: [
                // 顶部内反射高光
                "inset 0 1px 0 rgba(255,255,255,0.35)",
                // 底部内暗化（玻璃厚度）
                "inset 0 -1px 0 rgba(0,0,0,0.18)",
                // 侧边圆润感
                "inset 1px 0 0 rgba(255,255,255,0.08)",
                "inset -1px 0 0 rgba(255,255,255,0.08)",
                // 浮起阴影
                "0 16px 40px -8px rgba(0,0,0,0.45)",
                // 青绿微光呼应主题
                "0 4px 24px -4px rgba(111,175,161,0.18)",
              ].join(", "),
            }}
          />

          {/* 顶层：中文 — 用 clip-path 圆形限制只在鼠标位置显示，
              和英文同字号、同行、同位置。 */}
          <h1
            aria-hidden
            className="pointer-events-none absolute inset-0 flex items-center justify-center font-cn font-normal md:font-light text-[10vw] md:text-[7.6vw] leading-[1.05] tracking-tight text-bone-50 transition-opacity duration-500"
            style={{
              clipPath: `circle(${LENS_R}px at ${pos.x}px ${pos.y}px)`,
              opacity: active ? 1 : 0,
              // 让中文从玻璃罩中"浮出"一点
              textShadow:
                "0 1px 12px rgba(255,255,255,0.18), 0 0 1px rgba(255,255,255,0.4)",
            }}
          >
            你好，我是江国佳。
          </h1>
        </motion.div>

        {/* hint 行 */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{
            duration: 0.8,
            delay: BOOT_DELAY + 1.0,
            ease: [0.22, 1, 0.36, 1],
          }}
          className="mt-16 flex items-center justify-center gap-3 font-mono text-[10px] tracking-widest uppercase text-bone-400 md:mt-20 md:text-[11px]"
        >
          <span className="inline-block h-px w-6 bg-bone-300/40" />
          <span>Hover · 鼠标悬停查看翻译</span>
          <span className="inline-block h-px w-6 bg-bone-300/40" />
        </motion.div>
      </div>

      {/* 底部滚动提示 */}
      <motion.a
        href="#home"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{
          duration: 0.8,
          delay: BOOT_DELAY + 1.3,
          ease: [0.22, 1, 0.36, 1],
        }}
        className="group absolute bottom-12 left-1/2 flex -translate-x-1/2 flex-col items-center gap-3 font-mono text-[10px] tracking-widest uppercase text-bone-400 transition-colors hover:text-bone-50 md:text-[11px]"
        aria-label="向下滚动到首页"
      >
        <span>Scroll · 向下查看</span>
        <motion.span
          animate={{ y: [0, 8, 0] }}
          transition={{ duration: 1.8, repeat: Infinity, ease: "easeInOut" }}
          className="inline-block text-[14px]"
        >
          ↓
        </motion.span>
      </motion.a>

      {/* 左下角时间戳装饰 */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.6, delay: BOOT_DELAY + 0.6 }}
        className="absolute bottom-12 left-6 hidden font-mono text-[10px] tracking-widest uppercase text-bone-400 md:block md:left-12"
      >
        N 31.23° / E 121.47°
      </motion.div>

      {/* 右下角语种装饰 */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.6, delay: BOOT_DELAY + 0.6 }}
        className="absolute bottom-12 right-6 hidden font-mono text-[10px] tracking-widest uppercase text-bone-400 md:block md:right-12"
      >
        EN ⇄ 中
      </motion.div>
    </section>
  );
}
