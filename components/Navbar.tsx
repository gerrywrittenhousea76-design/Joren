"use client";

import { useEffect, useState } from "react";
import clsx from "clsx";
import Magnetic from "./ui/Magnetic";
import { motion } from "framer-motion";

const links = [
  { href: "#home", cn: "首页", en: "Home" },
  { href: "#works", cn: "作品", en: "Works" },
  { href: "#about", cn: "关于", en: "About" },
  { href: "#process", cn: "流程", en: "Process" },
  { href: "#contact", cn: "联系", en: "Contact" },
];

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);
  const [active, setActive] = useState("home");

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  // active section tracking
  useEffect(() => {
    const ids = links.map((l) => l.href.slice(1));
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((e) => {
          if (e.isIntersecting) setActive(e.target.id);
        });
      },
      { rootMargin: "-40% 0px -55% 0px", threshold: 0.01 }
    );
    ids.forEach((id) => {
      const el = document.getElementById(id);
      if (el) observer.observe(el);
    });
    return () => observer.disconnect();
  }, []);

  return (
    <motion.header
      initial={{ opacity: 0, y: -8 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.8, delay: 1.65, ease: [0.22, 1, 0.36, 1] }}
      className={clsx(
        "fixed inset-x-0 top-0 z-50 transition-all duration-500",
        scrolled
          ? "py-3 backdrop-blur-xl bg-ink-950/60 border-b border-bone-100/[0.06]"
          : "py-5 bg-transparent border-b border-transparent"
      )}
    >
      <nav className="container-page flex items-center justify-between">
        <a
          href="#cover"
          className="group flex items-center gap-3"
          aria-label="江国佳 — 回到顶部"
        >
          <span className="relative inline-flex h-2 w-2">
            <span className="absolute inset-0 rounded-full bg-teal animate-pulse-soft" />
            <span className="absolute inset-0 rounded-full bg-teal/40 blur-md" />
          </span>
          <span className="font-display text-[22px] tracking-tight text-bone-50">
            江国佳
          </span>
          <span className="font-mono text-[10px] tracking-widest uppercase text-bone-400 hidden sm:inline">
            Joren Guo
          </span>
        </a>

        <ul className="hidden md:flex items-center gap-1 rounded-full border border-bone-100/[0.06] bg-bone-100/[0.02] px-2 py-1.5 backdrop-blur-md">
          {links.map((l) => {
            const isActive = active === l.href.slice(1);
            return (
              <li key={l.href}>
                <a
                  href={l.href}
                  className={clsx(
                    "relative rounded-full px-3.5 py-1.5 text-[13px] font-cn tracking-wide transition-colors",
                    isActive
                      ? "text-bone-50"
                      : "text-bone-300 hover:text-bone-50"
                  )}
                >
                  {isActive && (
                    <span className="absolute inset-0 -z-0 rounded-full bg-bone-100/[0.08]" />
                  )}
                  <span className="relative">{l.cn}</span>
                </a>
              </li>
            );
          })}
        </ul>

        <div className="hidden md:block">
          <Magnetic strength={0.25}>
            <a href="#contact" className="btn-primary group">
              <span>联系我</span>
              <ArrowUpRight />
            </a>
          </Magnetic>
        </div>

        {/* mobile toggle */}
        <button
          onClick={() => setOpen((v) => !v)}
          className="md:hidden flex h-10 w-10 items-center justify-center rounded-full border border-bone-100/10 bg-bone-100/[0.02]"
          aria-label="菜单"
        >
          <span className="relative block h-3 w-4">
            <span
              className={clsx(
                "absolute left-0 right-0 top-0 h-px bg-bone-100 transition-transform",
                open && "translate-y-1.5 rotate-45"
              )}
            />
            <span
              className={clsx(
                "absolute left-0 right-0 bottom-0 h-px bg-bone-100 transition-transform",
                open && "-translate-y-1 -rotate-45"
              )}
            />
          </span>
        </button>
      </nav>

      {/* mobile menu */}
      <div
        className={clsx(
          "md:hidden overflow-hidden transition-[max-height,opacity] duration-500 ease-out",
          open ? "max-h-96 opacity-100" : "max-h-0 opacity-0"
        )}
      >
        <ul className="container-page mt-5 flex flex-col gap-1 border-t border-bone-100/[0.08] pt-5">
          {links.map((l) => (
            <li key={l.href}>
              <a
                href={l.href}
                onClick={() => setOpen(false)}
                className="flex items-baseline justify-between rounded-2xl px-4 py-3 text-[16px] text-bone-100 hover:bg-bone-100/[0.04]"
              >
                <span className="font-cn">{l.cn}</span>
                <span className="font-mono text-[10px] tracking-widest uppercase text-bone-400">
                  {l.en}
                </span>
              </a>
            </li>
          ))}
          <li className="pt-2">
            <a
              href="#contact"
              onClick={() => setOpen(false)}
              className="btn-primary w-full justify-center"
            >
              联系我 <ArrowUpRight />
            </a>
          </li>
        </ul>
      </div>
    </motion.header>
  );
}

function ArrowUpRight() {
  return (
    <svg
      width="12"
      height="12"
      viewBox="0 0 12 12"
      fill="none"
      className="transition-transform duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5"
      aria-hidden
    >
      <path
        d="M3 9L9 3M9 3H4M9 3V8"
        stroke="currentColor"
        strokeWidth="1.2"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}
