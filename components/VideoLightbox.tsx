"use client";

import { AnimatePresence, motion } from "framer-motion";
import { useEffect } from "react";

type Props = {
  src: string | null;
  poster?: string;
  title?: string;
  titleEn?: string;
  onClose: () => void;
};

/**
 * 全屏视频播放弹窗。点击作品卡时打开。
 * - ESC / 点击黑色区域 / 右上角 ✕ 关闭
 * - 自动播放（带声音，因为是用户主动点击的）
 * - 控制条原生 HTMLMediaController（可暂停 / 拖进度 / 全屏）
 */
export default function VideoLightbox({
  src,
  poster,
  title,
  titleEn,
  onClose,
}: Props) {
  useEffect(() => {
    if (!src) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
    };
    window.addEventListener("keydown", onKey);
    const prevOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    return () => {
      window.removeEventListener("keydown", onKey);
      document.body.style.overflow = prevOverflow;
    };
  }, [src, onClose]);

  return (
    <AnimatePresence>
      {src && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.35, ease: [0.22, 1, 0.36, 1] }}
          className="fixed inset-0 z-[80] flex items-center justify-center bg-ink-950/95 backdrop-blur-md p-6"
          onClick={onClose}
        >
          {/* close btn */}
          <button
            onClick={onClose}
            aria-label="关闭"
            className="absolute right-6 top-6 z-10 flex h-11 w-11 items-center justify-center rounded-full border border-bone-100/15 bg-ink-900/60 text-bone-100 backdrop-blur-md transition-all hover:bg-bone-100 hover:text-ink-950 hover:rotate-90"
          >
            <svg width="14" height="14" viewBox="0 0 14 14" fill="none">
              <path
                d="M2 2l10 10M12 2L2 12"
                stroke="currentColor"
                strokeWidth="1.4"
                strokeLinecap="round"
              />
            </svg>
          </button>

          {/* hint */}
          <div className="absolute left-6 top-6 font-mono text-[10px] tracking-widest uppercase text-bone-400">
            按 ESC 关闭 · CLICK OUTSIDE TO CLOSE
          </div>

          <motion.div
            initial={{ scale: 0.96, y: 20, opacity: 0 }}
            animate={{ scale: 1, y: 0, opacity: 1 }}
            exit={{ scale: 0.96, y: 20, opacity: 0 }}
            transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
            onClick={(e) => e.stopPropagation()}
            className="relative w-full max-w-[1200px]"
          >
            <div className="relative aspect-video overflow-hidden rounded-2xl border border-bone-100/[0.08] bg-black shadow-[0_40px_120px_-20px_rgba(0,0,0,0.8)]">
              <video
                src={src}
                poster={poster}
                controls
                autoPlay
                playsInline
                className="h-full w-full object-contain"
              />
            </div>

            {(title || titleEn) && (
              <div className="mt-5 flex items-baseline justify-between gap-4">
                <div className="flex items-baseline gap-3">
                  {title && (
                    <h3 className="font-cn font-light text-[18px] md:text-[22px] text-bone-50">
                      {title}
                    </h3>
                  )}
                  {titleEn && (
                    <span className="font-display italic text-bone-400 text-[13px] md:text-[15px]">
                      {titleEn}
                    </span>
                  )}
                </div>
                <span className="font-mono text-[10px] tracking-widest uppercase text-bone-400">
                  NOW PLAYING
                </span>
              </div>
            )}
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
