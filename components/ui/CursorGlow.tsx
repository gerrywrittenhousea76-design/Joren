"use client";

import { useEffect, useRef } from "react";

/**
 * 跟随鼠标的柔光晕。不是替换光标，只是叠加一层细腻的光。
 * 桌面才显示，触屏不显示。
 */
export default function CursorGlow() {
  const glowRef = useRef<HTMLDivElement>(null);
  const ringRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (window.matchMedia("(hover: none)").matches) return;

    let mx = window.innerWidth / 2;
    let my = window.innerHeight / 2;
    let rx = mx;
    let ry = my;
    let raf = 0;

    const onMove = (e: MouseEvent) => {
      mx = e.clientX;
      my = e.clientY;
    };

    const tick = () => {
      // glow 紧跟
      if (glowRef.current) {
        glowRef.current.style.transform = `translate3d(${mx - 240}px, ${my - 240}px, 0)`;
      }
      // ring 缓动
      rx += (mx - rx) * 0.18;
      ry += (my - ry) * 0.18;
      if (ringRef.current) {
        ringRef.current.style.transform = `translate3d(${rx - 14}px, ${ry - 14}px, 0)`;
      }
      raf = requestAnimationFrame(tick);
    };

    const onEnterHover = () => ringRef.current?.classList.add("scale-[2.4]", "bg-teal/10");
    const onLeaveHover = () =>
      ringRef.current?.classList.remove("scale-[2.4]", "bg-teal/10");

    window.addEventListener("mousemove", onMove, { passive: true });
    document
      .querySelectorAll<HTMLElement>("a, button, [data-cursor='hover']")
      .forEach((el) => {
        el.addEventListener("mouseenter", onEnterHover);
        el.addEventListener("mouseleave", onLeaveHover);
      });

    raf = requestAnimationFrame(tick);

    return () => {
      cancelAnimationFrame(raf);
      window.removeEventListener("mousemove", onMove);
      document
        .querySelectorAll<HTMLElement>("a, button, [data-cursor='hover']")
        .forEach((el) => {
          el.removeEventListener("mouseenter", onEnterHover);
          el.removeEventListener("mouseleave", onLeaveHover);
        });
    };
  }, []);

  return (
    <>
      <div
        ref={glowRef}
        className="pointer-events-none fixed left-0 top-0 z-[60] hidden h-[480px] w-[480px] rounded-full mix-blend-screen md:block"
        style={{
          background:
            "radial-gradient(circle, rgba(111,175,161,0.18) 0%, rgba(111,175,161,0.06) 30%, transparent 60%)",
          willChange: "transform",
        }}
        aria-hidden
      />
      <div
        ref={ringRef}
        className="pointer-events-none fixed left-0 top-0 z-[61] hidden h-7 w-7 rounded-full border border-bone-50/40 transition-[transform,background-color] duration-[400ms] ease-out md:block"
        style={{ willChange: "transform" }}
        aria-hidden
      />
    </>
  );
}
