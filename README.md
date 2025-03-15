# 个人网站项目

这是一个使用Next.js构建的现代化个人网站，具有炫酷的动画效果和响应式设计。

## 技术栈

- **前端框架**：Next.js 15.2.2
- **样式**：Tailwind CSS
- **动画**：Framer Motion
- **内容管理**：Markdown (gray-matter)
- **代码高亮**：Prism.js, React Syntax Highlighter

## 主要特性

- 响应式设计，适配各种设备
- 深色/浅色模式切换
- 丰富的动画效果
  - 页面过渡动画
  - 鼠标跟随效果
  - 视差滚动
  - 元素动画
- Markdown博客系统
- 项目展示
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
│   ├── app/         # 应用主目录
│   │   ├── components/  # 组件
│   │   ├── lib/     # 工具函数
│   │   ├── data/    # 数据文件
│   │   ├── config/  # 配置文件
│   │   ├── about/   # 关于页面
│   │   ├── blog/    # 博客页面
│   │   ├── projects/# 项目页面
│   │   ├── tech/    # 技术页面
│   │   ├── page.tsx # 首页
│   │   └── layout.tsx # 布局组件
│   └── types/       # TypeScript类型定义
└── scripts/         # 辅助脚本
```

## 博客文章管理

本项目使用Markdown文件来存储博客文章，所有文章都存放在`posts`目录下。

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

正文部分使用Markdown格式编写，支持所有标准的Markdown语法。

### 文章URL

文章的URL由文件名（不包括.md扩展名）决定。例如，文件名为`react-18-features.md`的文章，其URL为`/blog/react-18-features`。

## 开发指南

### 安装依赖

```bash
npm install
```

### 开发模式

```bash
npm run dev
```

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

## 许可证

本项目采用MIT许可证。详情请参阅LICENSE文件。
