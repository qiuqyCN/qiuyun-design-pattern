# 秋云设计模式

> 23种经典设计模式在线学习平台 - 以清晰、优雅的方式呈现。让复杂变得简单，让学习成为享受。

[![Astro](https://img.shields.io/badge/Astro-6.x-BC52EE?logo=astro)](https://astro.build)
[![Vue](https://img.shields.io/badge/Vue-3.x-4FC08D?logo=vue.js)](https://vuejs.org)
[![TypeScript](https://img.shields.io/badge/TypeScript-5.x-3178C6?logo=typescript)](https://www.typescriptlang.org)
[![Tailwind CSS](https://img.shields.io/badge/Tailwind-4.x-06B6D4?logo=tailwindcss)](https://tailwindcss.com)

[在线访问](https://patterns.qiuyun.dev)

## ✨ 特性

- 📚 **23种经典设计模式** - 创建型、结构型、行为型全覆盖
- 🎨 **交互式动画** - 直观理解模式工作原理
- 🌓 **深色/浅色主题** - 自动切换，护眼舒适
- 📱 **响应式设计** - 完美适配各种设备
- 🔍 **代码高亮** - 支持 Java、TypeScript、Python、Go、C++
- 📊 **学习统计** - 跟踪学习进度，保持学习动力
- 🗺️ **学习路径** - 循序渐进掌握设计模式
- 📖 **前置知识** - 面向对象基础、UML类图、SOLID原则
- 📥 **导出功能** - 支持导出 Markdown 离线阅读

## 🚀 快速开始

### 环境要求

- Node.js >= 22.12.0

### 安装

```bash
# 克隆项目
git clone https://github.com/yourusername/qiuyun-design-pattern.git
cd qiuyun-design-pattern

# 安装依赖
npm install

# 启动开发服务器
npm run dev
```

访问 http://localhost:4321

### 构建

```bash
npm run build
```

构建输出位于 `dist/` 目录

## 🏗️ 技术栈

- **[Astro](https://astro.build)** - 静态站点生成器
- **[Vue 3](https://vuejs.org)** - 交互式组件
- **[TypeScript](https://www.typescriptlang.org)** - 类型安全
- **[Tailwind CSS](https://tailwindcss.com)** - 原子化CSS
- **[Reka UI](https://reka-ui.com)** - 无头UI组件
- **[Mermaid](https://mermaid.js.org)** - 图表渲染
- **[Shiki](https://shiki.style)** - 代码高亮

## 📁 项目结构

```
qiuyun-design-pattern/
├── src/
│   ├── components/          # 组件目录
│   │   ├── home/           # 首页组件
│   │   ├── patterns/       # 设计模式组件
│   │   ├── ui/             # 通用UI组件
│   │   └── ...
│   ├── composables/        # Vue组合式函数
│   ├── config/             # 站点配置
│   ├── data/               # 数据文件
│   │   └── patterns/       # 设计模式数据
│   ├── layouts/            # Astro布局
│   ├── pages/              # 页面路由
│   ├── styles/             # 全局样式
│   └── types/              # TypeScript类型
├── public/                 # 静态资源
└── package.json
```

## 📝 内容数据

设计模式内容存储在 `src/data/patterns/` 目录下，使用 TypeScript 文件定义：

```typescript
// src/data/patterns/singleton.ts
export const singletonPattern: DesignPattern = {
  id: 'singleton',
  name: '单例模式',
  nameEn: 'Singleton',
  category: 'creational',
  // ...
};
```

## 🎨 自定义配置

复制 `.env.example` 为 `.env` 并修改：

```bash
# 站点配置
PUBLIC_SITE_URL=https://your-domain.com
PUBLIC_SITE_TITLE=你的站点标题
PUBLIC_SITE_DESCRIPTION=你的站点描述
PUBLIC_SITE_AUTHOR=作者名
```

## 📦 部署

### Vercel（推荐）

```bash
vercel --prod
```

### Netlify

连接 Git 仓库自动部署

### Cloudflare Pages

原生支持 Astro，构建命令：`npm run build`，输出目录：`dist`

### Nginx 部署

#### 1. 构建项目

```bash
npm run build
```

#### 2. 配置 Nginx

创建配置文件 `/etc/nginx/sites-available/patterns`：

```nginx
server {
    listen 80;
    server_name patterns.qiuyun.dev;
    
    # 重定向到 HTTPS
    return 301 https://$server_name$request_uri;
}

server {
    listen 443 ssl http2;
    server_name patterns.qiuyun.dev;
    
    # SSL 证书配置
    ssl_certificate /path/to/your/fullchain.pem;
    ssl_certificate_key /path/to/your/privkey.pem;
    
    # SSL 优化
    ssl_protocols TLSv1.2 TLSv1.3;
    ssl_ciphers ECDHE-ECDSA-AES128-GCM-SHA256:ECDHE-RSA-AES128-GCM-SHA256:ECDHE-ECDSA-AES256-GCM-SHA384:ECDHE-RSA-AES256-GCM-SHA384;
    ssl_prefer_server_ciphers off;
    
    # 网站根目录
    root /var/www/patterns/dist;
    index index.html;
    
    # 静态资源缓存
    location ~* \.(js|css|png|jpg|jpeg|gif|ico|svg|woff|woff2|ttf|eot)$ {
        expires 1y;
        add_header Cache-Control "public, immutable";
    }
    
    # 主页面
    location / {
        try_files $uri $uri/ /index.html;
    }
    
    # 404 页面
    error_page 404 /404.html;
}
```

#### 3. 启用站点

```bash
# 创建符号链接
sudo ln -s /etc/nginx/sites-available/patterns /etc/nginx/sites-enabled/

# 测试配置
sudo nginx -t

# 重载 Nginx
sudo systemctl reload nginx
```

#### 4. 部署脚本

创建 `deploy.sh`：

```bash
#!/bin/bash

# 构建项目
npm run build

# 复制到服务器（替换为你的服务器信息）
rsync -avz --delete dist/ user@your-server:/var/www/patterns/dist/

# 可选：重启 Nginx
# ssh user@your-server "sudo systemctl reload nginx"

echo "部署完成！"
```

赋予执行权限并运行：

```bash
chmod +x deploy.sh
./deploy.sh
```

## 🤝 贡献

欢迎提交 Issue 和 Pull Request！

## 📄 许可证

MIT License

## 🙏 致谢

- [Refactoring.Guru](https://refactoring.guru) - 设计模式学习资源
- [Java Design Patterns](https://java-design-patterns.com) - 实际案例参考

---

Made with ❤️ by [秋云](https://github.com/yourusername)
