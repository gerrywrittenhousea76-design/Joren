"use client";

import { ReactNode } from "react";

type Props = {
  children: ReactNode;
  className?: string;
};

export default function Marquee({ children, className = "" }: Props) {
  return (
    <div className={`relative overflow-hidden ${className}`}>
      <div className="flex w-max animate-marquee gap-16 whitespace-nowrap">
        <div className="flex gap-16">{children}</div>
        <div className="flex gap-16" aria-hidden>
          {children}
        </div>
      </div>
      {/* edge fade */}
      <div className="pointer-events-none absolute inset-y-0 left-0 w-24 bg-gradient-to-r from-ink-950 to-transparent" />
      <div className="pointer-events-none absolute inset-y-0 right-0 w-24 bg-gradient-to-l from-ink-950 to-transparent" />
    </div>
  );
}
