// ============================================================
//  内容数据中心 — Content data center
//  → 所有可替换的文案、图片、视频路径都集中在这里
//  → 替换图片：把文件放进 /public/works/ 然后改下面的 cover 字段
// ============================================================

export type Work = {
  id: string;
  /** 项目编号（展示用，例如 "01"） */
  index: string;
  /** 中文标题（主） */
  title: string;
  /** 英文标题（辅，作为 eyebrow / 角标） */
  titleEn?: string;
  /** 项目类型（短标签） */
  type: string;
  /** 我的职责 */
  role: string;
  /** 简短项目说明（1-2 句话） */
  description: string;
  /** 标签 */
  tags: string[];
  /** 封面图路径，例如 "/works/01.jpg" */
  cover?: string;
  video?: string;
  accent?: string;
};

export const works: Work[] = [
  {
    id: "ai-feeder",
    index: "01",
    title: "AI 智能喂食器",
    titleEn: "Smart Pet Feeder",
    type: "产品广告 / AI Product Film",
    role: "视觉导演 · AI 制作 · 剪辑",
    description:
      "为新一代 AI 智能喂食器制作的产品广告。通过 AI 影像 + 实拍合成，呈现宠物与产品之间安静、温柔的日常时刻。",
    tags: ["AI 视频", "产品叙事", "动效"],
    accent: "from-[#1F2A2F] via-[#0F1418] to-[#0B0C0F]",
    video: "/works/01-feeder-web.mp4",
  },
  {
    id: "grill-cleaner",
    index: "02",
    title: "电动烤炉清洗器",
    titleEn: "Electric Grill Cleaner",
    type: "产品广告 / Product Film",
    role: "视觉导演 · AI 制作 · 剪辑",
    description:
      "独立负责产品广告成片的创意策划、分镜设计、AI 视觉生成与后期整合。视频上线后，帮助客户将原本表现低迷的\"死链接\"重新激活，显著提升页面转化效率，并推动产品实现爆单增长。",
    tags: ["AI 视频", "产品广告", "电商转化"],
    accent: "from-[#21201B] via-[#13120E] to-[#0B0A07]",
    video: "/works/02-grill-cleaner-web.mp4",
  },
  {
    id: "modular-furniture",
    index: "03",
    title: "模块化家具产品动画",
    titleEn: "Modular Furniture Motion",
    type: "动画 / Motion Design",
    role: "导演 · 动效 · 分镜",
    description:
      "用动画方式拆解模块化家具的组合逻辑，让产品的灵活性在 30 秒内被理解。线条、节拍、空间感被反复打磨。",
    tags: ["Motion", "3D", "产品故事"],
    accent: "from-[#1B232A] via-[#0F1418] to-[#0A0C0F]",
  },
  {
    id: "commercial-edit",
    index: "04",
    title: "商业产品短视频",
    titleEn: "Commercial Short Edit",
    type: "商业剪辑 / Editing",
    role: "剪辑 · 节奏 · 音乐设计",
    description:
      "面向社媒投放的 15s/30s 商业短片剪辑。强调前 3 秒的视觉钩子，与节奏-音乐-字幕的精确同步。",
    tags: ["剪辑", "商业", "社媒"],
    accent: "from-[#231C1C] via-[#15100F] to-[#0B0807]",
  },
  {
    id: "brand-film",
    index: "05",
    title: "品牌宣传片视觉包装",
    titleEn: "Brand Story Film",
    type: "品牌片 / Brand Film",
    role: "创意指导 · 视觉包装",
    description:
      "为成长期消费品牌制作的形象宣传片：从品牌主张提炼、画面调性、到字幕与音乐情绪的整体包装。",
    tags: ["品牌", "创意指导", "剪辑"],
    accent: "from-[#1A1F25] via-[#0E1115] to-[#0A0C0F]",
  },
  {
    id: "social-ads",
    index: "06",
    title: "社媒广告内容设计",
    titleEn: "Social Ad Campaign",
    type: "投放素材 / Performance",
    role: "概念 · 视觉 · 剪辑",
    description:
      "面向 Meta / TikTok 的成组广告内容：以脚本框架 + 模块化素材，让一组创意快速派生出多版本投放素材。",
    tags: ["社媒投放", "效果广告", "概念"],
    accent: "from-[#1F1B25] via-[#110F18] to-[#09080C]",
  },
];

export const capabilities = [
  {
    title: "视觉方向",
    en: "Visual Direction",
    blurb: "从产品卖点出发，建立画面调性、分镜与产品叙事。",
    points: ["调性把控", "分镜脚本", "产品叙事"],
  },
  {
    title: "AI 制作",
    en: "AI Production",
    blurb: "把 AI 图像、AI 视频、AI 辅助创意稳定地交付到商业项目里。",
    points: ["AI 图像", "AI 视频", "工作流"],
  },
  {
    title: "剪辑与动效",
    en: "Editing & Motion",
    blurb: "节奏、包装、字幕、音乐——决定一支片子是否好看的细节层。",
    points: ["剪辑", "Motion", "音乐"],
  },
  {
    title: "项目统筹",
    en: "Project Management",
    blurb: "需求拆解、外包协作、版本管理、按时按质交付。",
    points: ["需求拆解", "外包协作", "交付管理"],
  },
];

export const processSteps = [
  { n: "01", cn: "需求理解", en: "Brief" },
  { n: "02", cn: "卖点拆解", en: "Selling Points" },
  { n: "03", cn: "视觉方向", en: "Visual Direction" },
  { n: "04", cn: "分镜脚本", en: "Storyboard" },
  { n: "05", cn: "AI · 剪辑 · 动画", en: "Production" },
  { n: "06", cn: "修改优化", en: "Refinement" },
  { n: "07", cn: "最终交付", en: "Delivery" },
];

export const skills = [
  "Premiere Pro",
  "After Effects",
  "Photoshop",
  "AI Video",
  "AI Image",
  "产品叙事",
  "Amazon A+",
  "Motion Design",
  "商业剪辑",
  "创意指导",
  "项目统筹",
];

export const valueProps = [
  {
    n: "壹",
    nRoman: "I",
    title: "把 AI 工具变成稳定的商业生产力",
    blurb:
      "AI 不是噱头。我建立的是可复用的工作流，让 AI 影像、AI 图像稳定地服务于商业内容，按节点交付。",
  },
  {
    n: "贰",
    nRoman: "II",
    title: "懂卖点、懂用户、懂电商内容转化",
    blurb:
      "我不是从美术出发，而是从产品在货架上要被怎么理解、被怎么记住出发，再倒推画面与节奏。",
  },
  {
    n: "叁",
    nRoman: "III",
    title: "从创意、执行到交付的完整链路",
    blurb:
      "我能独立从 brief 走到成片，也能调度外包团队完成更大体量的项目，对交付节奏与版本控制有清晰意识。",
  },
];

// ============================================================
//  个人简介 / Profile
//  → 在 /public/ 放一张照片，例如 /public/profile.jpg
//  → 把下面 photo 改成 "/profile.jpg" 即可
// ============================================================
export const profile = {
  photo: "/profile.jpg",
  intro1: "你好，我是江国佳。",
  intro2:
    "一名热爱 AI 创造的 AI 视觉导演，我喜欢探索尖端技术并落地。不仅仅是为了表达，更是为了通过技术解决真实世界的问题。",
};

export type Experience = {
  period: string;
  role: string;
  company: string;
  description: string;
};

// ⬇︎ 三段工作经历——按你真实的经历替换
export const experiences: Experience[] = [
  {
    period: "2024.12 — 现在",
    role: "剪辑（AI 向）/ 独立项目内容负责人",
    company: "厦门安北工贸",
    description:
      "主导海外独立站内容视频、海外亚马逊产品视频、海外社交媒体日常视频剪辑。用 AI 从 0-1 更新工作流，打破流程模板化、单一化并打破流量瓶颈，累计获得百万级曝光。",
  },
  {
    period: "2023.9 — 2024.3",
    role: "动效设计师",
    company: "厦门稿定设计",
    description:
      "负责站内模板更新与调试，制作 MG 动画，使用 AI 辅助图像制作，从 Brief 到成片输出完整链路交付。",
  },
  {
    period: "2020.1 — 2021.2",
    role: "婚礼影像拍摄剪辑",
    company: "漳州万宝",
    description:
      "负责婚礼现场拍摄与后期剪辑，完成迎亲、仪式、外景、晚宴等流程的影像记录与成片交付。擅长捕捉人物情绪与关键高光时刻，独立完成素材整理、剪辑节奏、音乐匹配、调色包装等工作。",
  },
];

export const contact = {
  // ⬇︎ 替换为你真实的邮箱
  email: "your-email@example.com",
  // ⬇︎ 替换为你真实的微信号
  wechat: "WeChat ID",
  // ⬇︎ 替换为你真实的简历链接（或放到 /public/resume.pdf）
  resumeUrl: "#",
};
