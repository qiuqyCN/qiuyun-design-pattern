# 秋云设计模式 - 项目参考文档

> 本文档总结了本项目的技术架构、组织方式和最佳实践，供后续类似项目参考。

## 一、技术栈概览

### 1.1 核心框架
- **Astro 6.x** - 静态站点生成器（SSG）
- **Vue 3.5** - 交互式组件（Islands Architecture）
- **TypeScript** - 类型安全

### 1.2 样式方案
- **Tailwind CSS 4.x** - 原子化CSS框架
- **CSS Variables** - 主题变量（亮色/暗色模式）
- **tw-animate-css** - 动画工具

### 1.3 UI组件
- **Reka UI** - 无头UI组件库（原Radix Vue）
- **Lucide Vue** - 图标库
- **class-variance-authority + clsx + tailwind-merge** - 类名管理工具链

### 1.4 功能库
- **Mermaid 11.x** - 图表渲染（类图、流程图等）
- **Shiki** - 代码高亮
- **GSAP** - 高级动画
- **Canvas Confetti** - 庆祝动画
- **VueUse** - Vue工具函数集

### 1.5 开发工具
- **Node.js >= 22.12.0**
- **Vite**（通过Astro内置）

---

## 二、项目结构

```
qiuyun-design-pattern/
├── src/
│   ├── components/          # 组件目录
│   │   ├── home/           # 首页相关组件
│   │   ├── patterns/       # 设计模式相关组件
│   │   │   └── animations/ # 动画组件（按分类组织）
│   │   ├── prerequisites/  # 前置知识组件
│   │   ├── statistics/     # 统计组件
│   │   └── ui/             # 通用UI组件
│   │       ├── badge/
│   │       ├── button/
│   │       ├── card/
│   │       └── tabs/
│   ├── composables/        # Vue组合式函数
│   ├── config/             # 配置文件
│   ├── data/               # 数据文件
│   │   └── patterns/       # 设计模式数据
│   ├── layouts/            # Astro布局
│   ├── lib/                # 工具函数
│   ├── pages/              # Astro页面
│   ├── styles/             # 全局样式
│   └── types/              # TypeScript类型定义
├── public/                 # 静态资源
└── .env.example           # 环境变量示例
```

---

## 三、架构设计模式

### 3.1 Islands Architecture（群岛架构）
- **原则**：大部分页面静态生成，交互部分使用Vue组件
- **实现**：Astro页面 + Vue Islands
- **示例**：
  ```astro
  <!-- 静态部分由Astro处理 -->
  <PatternContent pattern={pattern} />
  
  <!-- 交互部分使用Vue -->
  <PatternAnimation client:load :pattern="pattern" />
  ```

### 3.2 数据驱动设计
- **内容数据**：TypeScript文件（`src/data/`）
- **类型定义**：集中管理（`src/types/`）
- **优势**：类型安全、版本控制、无需数据库

### 3.3 组件组织
```
components/
├── feature/           # 功能组件（按页面/功能分组）
└── ui/               # 通用UI组件（原子设计）
    ├── [component]/
    │   ├── Component.vue
    │   └── index.ts  # 统一导出
```

---

## 四、关键实现细节

### 4.1 站点配置管理
**文件**：`src/config/site.ts`

```typescript
// 支持环境变量 + 默认值
const getEnv = (key: string, defaultValue: string): string => {
  if (typeof import.meta !== 'undefined' && import.meta.env) {
    return import.meta.env[key] || defaultValue;
  }
  return defaultValue;
};

export const siteConfig = {
  url: getEnv('PUBLIC_SITE_URL', 'https://example.com'),
  title: getEnv('PUBLIC_SITE_TITLE', '站点标题'),
  // ...
};
```

**环境变量**（`.env`）：
```bash
PUBLIC_SITE_URL=https://patterns.qiuyun.dev
PUBLIC_SITE_TITLE=秋云设计模式
PUBLIC_SITE_DESCRIPTION=...
PUBLIC_SITE_AUTHOR=秋云
```

### 4.2 动态SEO文件生成
**Sitemap**：`src/pages/sitemap.xml.ts`
```typescript
export const GET: APIRoute = async () => {
  const baseUrl = siteConfig.url;
  // 动态生成XML
  return new Response(sitemap, {
    headers: { 'Content-Type': 'application/xml' },
  });
};
```

**Robots.txt**：`src/pages/robots.txt.ts`
```typescript
export const GET: APIRoute = async () => {
  const robots = `Sitemap: ${siteConfig.url}/sitemap.xml`;
  return new Response(robots, {
    headers: { 'Content-Type': 'text/plain' },
  });
};
```

### 4.3 主题切换实现
**CSS Variables**（`src/styles/global.css`）：
```css
:root {
  --background: 0 0% 100%;
  --foreground: 222.2 84% 4.9%;
}

.dark {
  --background: 222.2 84% 4.9%;
  --foreground: 210 40% 98%;
}
```

**切换逻辑**（内联脚本）：
```javascript
// 在布局文件中内联，避免闪烁
const theme = localStorage.getItem('theme') || 
              (window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light');
document.documentElement.classList.add(theme);
```

### 4.4 代码高亮（Shiki）
```vue
<script setup>
import { codeToHtml } from 'shiki';

const html = await codeToHtml(code, {
  lang: 'java',
  theme: 'github-light',
});
</script>
```

### 4.5 Mermaid图表渲染
```vue
<script setup>
import mermaid from 'mermaid';

onMounted(async () => {
  mermaid.initialize({
    theme: document.documentElement.classList.contains('dark') ? 'dark' : 'default',
  });
  await mermaid.run({ nodes: [element] });
});
</script>
```

---

## 五、最佳实践

### 5.1 组件设计
- **单一职责**：每个组件只做一件事
- **Props明确**：使用TypeScript定义props类型
- **Slot机制**：提供灵活的插槽扩展点

### 5.2 数据管理
- **集中存储**：数据放在 `src/data/` 目录
- **类型定义**：所有数据都有对应的TypeScript接口
- **索引导出**：每个目录使用 `index.ts` 统一导出

### 5.3 性能优化
- **图片优化**：使用Astro内置图片优化
- **代码分割**：Vue组件按需加载（`client:load`/`client:visible`）
- **静态生成**：大部分页面构建时生成

### 5.4 可访问性
- **语义化HTML**：正确使用标题层级、landmark
- **ARIA属性**：为交互组件添加适当的ARIA标签
- **键盘导航**：确保所有功能可通过键盘访问

---

## 六、适用场景

此架构特别适合以下类型的项目：

### 6.1 学习/教育平台
- 结构化内容展示
- 交互式学习组件
- 进度跟踪

### 6.2 文档网站
- Markdown内容支持
- 代码高亮
- 搜索功能（可扩展）

### 6.3 博客/内容站点
- SEO友好
- 快速加载
- 主题定制

### 6.4 项目展示
- 静态生成，部署简单
- 动画效果丰富
- 响应式设计

---

## 七、快速启动模板

### 7.1 创建新项目
```bash
# 使用Astro创建
npm create astro@latest my-project

# 添加Vue集成
npx astro add vue

# 添加Tailwind CSS
npm install tailwindcss @tailwindcss/vite
```

### 7.2 必要配置
```javascript
// astro.config.mjs
import { defineConfig } from 'astro/config';
import vue from '@astrojs/vue';
import tailwindcss from '@tailwindcss/vite';

export default defineConfig({
  vite: {
    plugins: [tailwindcss()],
  },
  integrations: [vue()],
});
```

```json
// tsconfig.json
{
  "extends": "astro/tsconfigs/strict",
  "compilerOptions": {
    "baseUrl": ".",
    "paths": {
      "@/*": ["./src/*"]
    }
  }
}
```

### 7.3 推荐目录结构
按照本项目的 `src/` 目录结构组织即可。

---

## 八、扩展建议

### 8.1 添加搜索功能
- 使用 Fuse.js 或 Algolia DocSearch
- 构建时生成搜索索引

### 8.2 添加国际化
- 使用 Astro 的 i18n 路由
- 内容数据按语言分离

### 8.3 添加CMS
- 对接 Sanity/Strapi/Contentful
- 保持现有组件不变，只替换数据源

### 8.4 添加用户系统
- 使用 Auth.js (NextAuth)
- 配合数据库（Prisma + SQLite/PostgreSQL）

---

## 九、部署方案

### 9.1 静态托管（推荐）
- **Vercel**：`vercel --prod`
- **Netlify**：连接Git仓库自动部署
- **Cloudflare Pages**：原生支持Astro
- **GitHub Pages**：使用GitHub Actions

### 9.2 构建命令
```bash
npm run build  # 输出到 dist/ 目录
```

---

## 十、参考资源

- [Astro 文档](https://docs.astro.build/)
- [Vue 3 文档](https://vuejs.org/)
- [Tailwind CSS 文档](https://tailwindcss.com/)
- [Reka UI 文档](https://reka-ui.com/)

---

**总结**：本项目展示了如何使用 Astro + Vue + Tailwind CSS 构建高性能、可维护的现代化内容站点。其核心优势在于：
1. **性能**：静态生成 + Islands Architecture
2. **体验**：流畅动画 + 主题切换
3. **可维护**：TypeScript + 清晰的目录结构
4. **可扩展**：模块化设计，易于添加新功能
