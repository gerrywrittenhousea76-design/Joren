"use client";

import {
  motion,
  useMotionValue,
  useSpring,
  useTransform,
} from "framer-motion";
import { ReactNode, useRef } from "react";

type Props = {
  children: ReactNode;
  /** 最大倾斜角度（度），默认 6 */
  max?: number;
  className?: string;
};

/**
 * 鼠标 hover 时卡片做轻微 3D 倾斜，并产生光感扫过的高光层。
 */
export default function Tilt({ children, max = 6, className }: Props) {
  const ref = useRef<HTMLDivElement>(null);

  const px = useMotionValue(0.5); // 0~1，鼠标在卡片内的相对 x
  const py = useMotionValue(0.5);

  const rx = useSpring(useTransform(py, [0, 1], [max, -max]), {
    stiffness: 220,
    damping: 22,
    mass: 0.4,
  });
  const ry = useSpring(useTransform(px, [0, 1], [-max, max]), {
    stiffness: 220,
    damping: 22,
    mass: 0.4,
  });

  // 高光位置：跟随鼠标
  const glareX = useTransform(px, (v) => `${v * 100}%`);
  const glareY = useTransform(py, (v) => `${v * 100}%`);
  const glareOpacity = useMotionValue(0);
  const glareOpacitySpring = useSpring(glareOpacity, {
    stiffness: 160,
    damping: 18,
  });

  const onMove = (e: React.MouseEvent) => {
    const el = ref.current;
    if (!el) return;
    const rect = el.getBoundingClientRect();
    px.set((e.clientX - rect.left) / rect.width);
    py.set((e.clientY - rect.top) / rect.height);
    glareOpacity.set(1);
  };

  const reset = () => {
    px.set(0.5);
    py.set(0.5);
    glareOpacity.set(0);
  };

  return (
    <motion.div
      ref={ref}
      onMouseMove={onMove}
      onMouseLeave={reset}
      style={{
        rotateX: rx,
        rotateY: ry,
        transformStyle: "preserve-3d",
        transformPerspective: 1200,
      }}
      className={`relative ${className ?? ""}`}
    >
      {children}
      {/* glare layer */}
      <motion.div
        className="pointer-events-none absolute inset-0 rounded-[inherit] mix-blend-soft-light"
        style={{
          background: useTransform(
            [glareX, glareY] as never,
            ([gx, gy]: any) =>
              `radial-gradient(380px circle at ${gx} ${gy}, rgba(255,255,255,0.35), transparent 55%)`
          ),
          opacity: glareOpacitySpring,
        }}
        aria-hidden
      />
    </motion.div>
  );
}
