# 个人网站项目

这是一个使用Next.js构建的现代化个人网站，具有炫酷的动画效果、响应式设计和博客系统。

## 技术栈

- **前端框架**：Next.js 15.2.2 (使用App Router和Turbopack)
- **UI库**：React 18.2.0
- **类型系统**：TypeScript
- **样式**：Tailwind CSS + @tailwindcss/typography
- **动画**：Framer Motion
- **内容管理**：Markdown (gray-matter + react-markdown)
- **代码高亮**：React Syntax Highlighter
- **图标**：@heroicons/react
- **主题切换**：next-themes
- **数据库**：MongoDB + Mongoose

## 主要特性

- 响应式设计，适配各种设备
- 深色/浅色模式切换
- 丰富的动画效果
  - 页面过渡动画
  - 鼠标跟随效果
  - 视差滚动
  - 元素动画
- Markdown博客系统
- 文章阅读计数统计
- 评论系统
- 项目展示
- 技术栈展示
- SEO优化

## 动画组件

网站包含多个自定义动画组件：

- **AnimatedElement**：提供多种动画效果，如淡入、缩放、弹跳等
- **MouseFollower**：创建跟随鼠标的光标效果
- **ParallaxSection**：实现视差滚动效果
- **PageTransition**：页面切换过渡动画
- **Button**：带有多种动画效果的按钮组件

## 项目结构

```
/
├── public/          # 静态资源
├── posts/           # 博客文章(Markdown)
├── src/
│   ├── app/         # 应用主目录 (App Router)
│   │   ├── components/  # 组件
│   │   │   ├── AnimatedElement.tsx  # 动画元素组件
│   │   │   ├── Button.tsx           # 按钮组件
│   │   │   ├── Card.tsx             # 卡片组件
│   │   │   ├── ClientOnly.tsx       # 客户端渲染包装器
│   │   │   ├── CommentSection.tsx   # 评论区组件
│   │   │   ├── Footer.tsx           # 页脚组件
│   │   │   ├── Icon.tsx             # 图标组件
│   │   │   ├── MouseFollower.tsx    # 鼠标跟随组件
│   │   │   ├── Navbar.tsx           # 导航栏组件
│   │   │   ├── PageLayout.tsx       # 页面布局组件
│   │   │   ├── PageTransition.tsx   # 页面过渡动画组件
│   │   │   ├── ParallaxSection.tsx  # 视差滚动组件
│   │   │   ├── ProjectCard.tsx      # 项目卡片组件
│   │   │   ├── SEO.tsx              # SEO元标签组件
│   │   │   ├── Skeleton.tsx         # 加载骨架屏组件
│   │   │   ├── Tag.tsx              # 标签组件
│   │   │   └── ThemeProvider.tsx    # 主题提供者组件
│   │   ├── lib/     # 工具函数
│   │   │   ├── clientUtils.ts       # 客户端通用工具
│   │   │   ├── markdown.ts          # Markdown处理工具
│   │   │   ├── mongodb.ts           # MongoDB连接工具
│   │   │   └── readCountUtils.ts    # 阅读计数工具
│   │   ├── models/  # 数据模型
│   │   ├── data/    # 数据文件
│   │   ├── config/  # 配置文件
│   │   ├── api/     # API路由
│   │   ├── about/   # 关于页面
│   │   ├── blog/    # 博客页面
│   │   │   ├── [slug]/              # 博客文章详情页
│   │   │   │   ├── page.tsx             # 博客详情页面
│   │   │   │   ├── BlogPostClient.tsx   # 博客客户端组件
│   │   │   │   ├── BlogPostContent.tsx  # 博客内容包装组件
│   │   │   │   └── MarkdownRenderer.tsx # Markdown渲染组件
│   │   │   ├── page.tsx             # 博客列表页
│   │   │   └── BlogList.tsx         # 博客列表组件
│   │   ├── projects/# 项目页面
│   │   ├── tech/    # 技术页面
│   │   ├── page.tsx # 首页
│   │   ├── layout.tsx # 布局组件
│   │   └── globals.css # 全局样式
├── scripts/         # 辅助脚本
│   └── create-post.js  # 创建新博客文章的脚本
├── tailwind.config.js # Tailwind配置
├── next.config.ts    # Next.js配置
├── tsconfig.json     # TypeScript配置
└── package.json      # 项目依赖和脚本
```

## 博客文章管理

本项目使用Markdown文件来存储博客文章，所有文章都存放在`posts`目录下。每篇文章的阅读计数和评论数据存储在MongoDB数据库中。

### 创建新文章

你可以使用以下命令来创建一篇新的博客文章：

```bash
npm run create-post
```

这个命令会启动一个交互式脚本，引导你输入文章的标题、摘要、作者等信息，然后自动生成一个Markdown文件。

### 文章格式

每篇文章都包含一个前置元数据部分和正文部分。前置元数据使用YAML格式，包括以下字段：

```yaml
---
title: "文章标题"
excerpt: "文章摘要"
date: "发布日期，格式为YYYY-MM-DD"
author: "作者名称"
category: "文章分类"
tags: ["标签1", "标签2", "标签3"]
imageUrl: "封面图片URL"
---
```

正文部分使用Markdown格式编写，支持GitHub风格Markdown（通过remark-gfm）和代码语法高亮。

## 开发指南

### 安装依赖

```bash
npm install
```

### 开发模式

```bash
npm run dev
```

项目使用Turbopack加速开发环境构建。

### 构建项目

```bash
npm run build
```

### 启动生产服务器

```bash
npm run start
```

### 代码检查

```bash
npm run lint
```

## 自定义

### 添加新动画

可以通过扩展`AnimatedElement`组件来添加新的动画类型。

### 修改主题

主题颜色可以在`tailwind.config.js`文件中修改。

### 添加新页面

在`src/app`目录下创建新的目录和`page.tsx`文件。

### 连接数据库

在`.env.local`文件中设置`MONGODB_URI`环境变量来连接MongoDB数据库。

## 许可证

本项目采用MIT许可证。详情请参阅LICENSE文件。
