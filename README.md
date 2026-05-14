# Joren Guo · Portfolio

> AI Visual Director / 商业视频创作者 / 电商产品视觉策划
> 江国佳 · Joren Guo

一个基于 **Next.js 14 + Tailwind CSS + Framer Motion** 的高级感个人作品集网站。
深色编辑风 + 电影级排版 + 细腻动效，面向求职面试与商业合作展示。

---

## 在本地运行

```bash
cd portfolio
npm install
npm run dev
```

打开 [http://localhost:3000](http://localhost:3000) 即可看到效果。

构建 / 预览生产版本：

```bash
npm run build
npm run start
```

---

## 项目结构

```
portfolio/
├── app/
│   ├── layout.tsx        # 全局字体、HTML 骨架、背景氛围层
│   ├── page.tsx          # 首页：拼装所有 section
│   └── globals.css       # 颜色系统、按钮、玻璃卡片、噪点底
├── components/
│   ├── Navbar.tsx        # 顶部导航 + 移动端抽屉
│   ├── Hero.tsx          # 首屏大标题 + 抽象作品预览卡片
│   ├── Works.tsx         # 6 个作品的编辑感网格
│   ├── About.tsx         # 关于我 + 4 张能力卡片
│   ├── Process.tsx       # 7 步横向工作流程
│   ├── Skills.tsx        # 技能跑马灯
│   ├── WhyMe.tsx         # 三条职业价值主张
│   ├── Contact.tsx       # 联系区块 + CTA
│   ├── Footer.tsx
│   └── ui/
│       ├── Reveal.tsx    # 滚动出现：淡入 + 上移
│       └── Marquee.tsx   # 无缝跑马灯
├── lib/
│   └── data.ts           # 🔑 所有可替换内容的中心
└── public/               # 把图片 / 视频 放在这里
```

---

## 替换内容（最重要）

所有文案、作品、联系方式都集中在 **`lib/data.ts`**。
打开文件按注释替换即可，无需改任何组件代码。

### 1) 替换作品封面图

1. 把封面图放进 `public/works/`，例如 `public/works/01.jpg`
2. 在 `lib/data.ts` 的对应作品里加上 `cover` 字段：

```ts
{
  id: "ai-feeder",
  index: "01",
  title: "Smart Pet Feeder",
  cover: "/works/01.jpg",   // ← 加这一行
  // ...
}
```

`Works.tsx` 里 `WorkCard` 组件会自动用真实图片替换占位 SVG。

### 2) 替换视频预览

把 mp4 放进 `public/works/`，然后在数据里填 `video: "/works/01.mp4"`。
（如果要展示视频，可以在 `Works.tsx` 里把 `<img>` 换成 `<video autoPlay muted loop playsInline />`。）

### 3) 替换联系方式

`lib/data.ts` 末尾：

```ts
export const contact = {
  email: "your-email@example.com",  // ← 替换
  wechat: "WeChat ID",              // ← 替换
  resumeUrl: "#",                   // ← 简历 PDF 链接，可放到 /public/resume.pdf
};
```

### 4) 添加新的作品

直接往 `works` 数组里追加一条对象就行，页面会自动多出一张卡片。

---

## 设计要点

- **字体**：Instrument Serif（电影/编辑感显示字体） + Geist（现代正文） + Noto Sans SC（中文）
- **配色**：深炭灰背景 / 米白文字 / 低饱和青绿点缀（`#6FAFA1`）
- **质感**：玻璃卡片 + 细噪点 + 多层径向渐变 + 细网格
- **动效**：滚动出现（淡入 + 上移）、卡片 hover 抬升、图片 hover 缓慢放大、跑马灯
- **响应式**：移动端单列 + 抽屉导航 + 流程图变垂直时间线

---

## 一些可继续优化的方向

- 接入真实的图片/视频后，建议把 `<img>` 换成 `next/image` 拿到自动优化
- 如果要更"作品集网站"的感觉，可以为每个作品做单独详情页（`app/works/[slug]/page.tsx`）
- 可加一个 `/resume.pdf`，把 `contact.resumeUrl` 指向它

Built with care · 2026
