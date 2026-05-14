export default function Footer() {
  const year = new Date().getFullYear();
  return (
    <footer className="border-t border-bone-100/[0.06] py-10">
      <div className="container-page flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
        <div className="flex items-center gap-3">
          <span className="font-cn font-light text-[18px] text-bone-50">江国佳</span>
          <span className="font-mono text-[10px] tracking-widest uppercase text-bone-400">
            Joren Guo
          </span>
        </div>
        <div className="flex flex-wrap items-center gap-x-5 gap-y-2 font-mono text-[10px] tracking-widest uppercase text-bone-400">
          <span>© {year} JOREN GUO</span>
          <span className="hidden md:inline">·</span>
          <span className="font-cn">AI 视觉导演</span>
          <span className="hidden md:inline">·</span>
          <span className="font-cn">用心设计与构建</span>
        </div>
      </div>
    </footer>
  );
}
