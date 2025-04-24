# 个人网站项目架构

本文档详细描述了个人网站项目的架构设计、技术栈选择和实现细节。

## 核心技术栈

### 前端框架与工具
- **Next.js 15.2.2**: 使用App Router架构和Turbopack加速开发
- **React 18.2.0**: 用于构建用户界面
- **TypeScript**: 提供类型安全
- **Tailwind CSS**: 原子化CSS框架 + @tailwindcss/typography插件
- **Framer Motion**: 实现高级动画效果
- **Next Themes**: 深色/浅色主题切换
- **@heroicons/react**: 提供图标支持

### 内容管理
- **gray-matter**: 解析Markdown文件的前置元数据
- **react-markdown**: 客户端Markdown渲染
- **remark-gfm**: GitHub风格Markdown支持
- **react-syntax-highlighter**: 代码语法高亮

### 数据存储
- **MongoDB**: 用于存储评论和阅读计数
- **Mongoose**: MongoDB对象模型工具

## 项目架构概述

### 文件系统结构
```
/
├── public/          # 静态资源
├── posts/           # 博客文章(Markdown)
├── scripts/         # 辅助脚本
│   └── create-post.js  # 创建新博客文章的脚本
├── src/
│   ├── app/         # 应用主目录 (App Router)
│   │   ├── components/  # 可复用组件
│   │   ├── lib/     # 工具函数库
│   │   ├── models/  # 数据模型
│   │   ├── data/    # 数据文件
│   │   ├── config/  # 配置文件
│   │   ├── api/     # API路由
│   │   ├── about/   # 关于页面路由
│   │   ├── blog/    # 博客相关路由
│   │   │   ├── [slug]/ # 动态路由(博客详情)
│   │   │   │   ├── page.tsx # 博客详情页面
│   │   │   │   ├── BlogPostClient.tsx # 客户端博客组件
│   │   │   │   ├── BlogPostContent.tsx # 客户端Markdown包装组件
│   │   │   │   └── MarkdownRenderer.tsx # Markdown渲染组件
│   │   │   ├── page.tsx # 博客列表页
│   │   │   └── BlogList.tsx # 博客列表组件
│   │   ├── projects/ # 项目展示路由
│   │   ├── tech/    # 技术栈路由
│   │   ├── page.tsx # 首页
│   │   ├── layout.tsx # 根布局组件
│   │   └── globals.css # 全局样式
├── tailwind.config.js # Tailwind配置
├── next.config.ts    # Next.js配置
├── tsconfig.json     # TypeScript配置
├── postcss.config.mjs # PostCSS配置
├── siteConfig.ts     # 站点全局配置
└── package.json      # 项目依赖和脚本
```

### 路由设计
- `/`: 首页
- `/about`: 关于页面
- `/blog`: 博客列表页
- `/blog/[slug]`: 博客文章详情页
- `/projects`: 项目展示页
- `/tech`: 技术栈展示页
- `/api/*`: API路由

## 组件系统

### 布局组件
- **RootLayout**: 应用根布局，提供主题支持和页面过渡
- **PageLayout**: 页面通用布局组件
- **Navbar**: 导航栏组件
- **Footer**: 页脚组件

### UI组件
- **Button**: 多样式、多动画效果按钮
- **Card**: 卡片组件，用于信息展示
- **ProjectCard**: 项目展示卡片
- **Tag**: 标签组件
- **Skeleton**: 加载骨架屏
- **Icon**: SVG图标组件库

### 交互与动画组件
- **AnimatedElement**: 多种动画效果的元素包装器
  - 支持淡入、缩放、弹跳、滑动等多种动画类型
  - 可配置动画触发条件和参数
- **MouseFollower**: 鼠标跟随效果
  - 可配置大小、颜色、模糊度和尾迹效果
- **ParallaxSection**: 视差滚动效果实现
- **PageTransition**: 页面切换过渡动画
  - 支持多种过渡模式：淡入淡出、滑动、缩放等
  - 可配置动画持续时间和缓动函数

### 功能组件
- **ThemeProvider**: 主题提供者，处理主题切换和持久化
- **ClientOnly**: 确保组件仅在客户端渲染
- **SEO**: SEO元标签管理组件
- **CommentSection**: 评论功能组件
- **BlogPostClient**: 客户端博客组件，负责显示博客内容和处理交互
- **BlogPostContent**: 客户端组件，负责动态导入并包装MarkdownRenderer
- **MarkdownRenderer**: 客户端Markdown渲染组件，负责处理Markdown和代码高亮

## 数据流架构

### 博客内容处理流程
1. **存储层**: Markdown文件存储在`posts`目录
2. **解析层**: 使用`gray-matter`解析Markdown文件的前置元数据
3. **服务器数据获取**: 服务器组件获取原始Markdown内容和元数据
4. **客户端渲染**: 使用分层的客户端组件在客户端渲染Markdown内容
   - 使用`BlogPostClient`客户端组件处理博客渲染和交互逻辑
   - 使用`BlogPostContent`客户端组件动态导入`MarkdownRenderer`
   - 利用`react-markdown`处理Markdown
   - 使用`remark-gfm`支持GitHub风格Markdown
   - 使用`react-syntax-highlighter`实现代码高亮，支持多种主题和语言

### 阅读计数和评论数据流
1. **数据存储**: 使用MongoDB存储阅读计数和评论数据
2. **连接层**: 使用`mongodb.ts`建立与MongoDB的连接
3. **读取层**: 使用`readCountUtils.ts`处理阅读计数逻辑
4. **UI层**: 使用`CommentSection`组件显示和管理评论

### 主题管理流程
1. **ThemeProvider**: 使用`next-themes`管理主题状态
2. **存储**: 将用户主题偏好保存到localStorage
3. **响应式**: 使用CSS变量和Tailwind实现主题切换

### 动画与交互流程
1. **状态管理**: 使用React状态(useState, useEffect)管理交互状态
2. **动画库**: 使用Framer Motion实现复杂动画
3. **事件处理**: 处理鼠标移动、滚动等事件触发动画

## 性能优化策略

### 代码拆分
- 使用Next.js的自动代码拆分
- 动态导入非关键组件，如`MouseFollower`和`MarkdownRenderer`

### 延迟加载
- 使用`dynamic`导入非首屏必需的组件
- 使用`Suspense`和`loading`属性处理加载状态
- 在客户端组件中使用dynamic导入，避免服务器组件中的`ssr: false`错误
- 使用`ClientOnly`组件确保客户端专属功能仅在客户端渲染

### 数据获取优化
- 使用MongoDB进行高效的数据存储和检索
- 实现阅读计数增量更新
- 评论数据分页加载

### 依赖优化
- 精简项目依赖，移除未使用的包和重复功能的包
- 统一使用`react-syntax-highlighter`处理代码高亮
- 移除冗余的CSS样式，避免样式冲突
- 定期使用`npm prune`清理未声明的依赖

### 服务器组件与客户端组件分离
- 将数据获取逻辑放在服务器组件中
- 使用"use client"指令标记客户端组件
- 使用`ClientOnly`组件避免服务器渲染引起的水合不匹配
- Markdown内容处理移至客户端，减轻服务器负担
- 使用多层客户端组件结构，正确处理动态导入

### 图像优化
- 使用Next.js的Image组件进行自动优化
- 实现响应式图像尺寸和格式

### 缓存策略
- 静态生成(SSG)用于内容不经常变化的页面
- 增量静态再生成(ISR)用于需要定期更新的内容
- MongoDB数据缓存

## 扩展性设计

### 添加新页面
1. 在`src/app`目录下创建新目录
2. 添加`page.tsx`文件定义路由

### 添加新组件
1. 在`components`目录下创建新的组件文件
2. 遵循现有组件的设计模式和代码规范

### 添加新博客文章
1. 在`posts`目录下创建新的Markdown文件
2. 添加必要的前置元数据
3. 使用现有`scripts/create-post.js`脚本自动化创建过程

### 自定义代码高亮主题
1. 从`react-syntax-highlighter/dist/cjs/styles/prism`导入不同的主题样式
2. 在`MarkdownRenderer`组件中修改SyntaxHighlighter的style属性

### 添加新的数据模型
1. 在`models`目录下创建新的模型文件
2. 定义mongoose Schema和Model
3. 创建相应的API路由

## 部署架构

### 构建流程
1. `next build`: 生成优化的生产构建
2. 静态页面预渲染
3. 自动代码拆分和优化

### 托管选项
- **Vercel**: 完全集成Next.js的托管平台
- **Netlify**: 支持Next.js静态导出
- **自托管**: 使用Node.js服务器或静态文件服务器

### 环境变量
- **MONGODB_URI**: MongoDB连接字符串
- **[其他环境变量]**: 其他需要的配置参数

## 未来扩展计划

### 功能增强
- 集成CMS系统
- 添加用户认证
- 增强博客评论系统
- 添加搜索功能
- 实现国际化支持

### 性能优化
- 实现流式SSR(Streaming SSR)
- 添加服务器组件缓存
- 优化首次加载性能
- 实现代码高亮主题跟随系统主题自动切换
- 定期审查并清理项目依赖

### 开发体验
- 添加单元测试
- 集成E2E测试
- 改进开发工具脚本
- 实现依赖分析和监控工具集成 