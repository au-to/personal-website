"use client";

import { Inter } from "next/font/google";
import "./globals.css";
import { ThemeProvider } from "./components/ThemeProvider";
import 'prismjs/themes/prism-tomorrow.css';
import PageTransition from "./components/PageTransition";
import dynamic from 'next/dynamic';
import { Suspense } from 'react';

// 动态导入鼠标跟随组件，减少初始加载时间
const MouseFollower = dynamic(() => import('./components/MouseFollower'), {
  ssr: false, // 禁用服务器端渲染，因为这个组件依赖于客户端的鼠标事件
  loading: () => null, // 加载时不显示任何内容
});

const inter = Inter({ subsets: ["latin"] });

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="zh" suppressHydrationWarning>
      <head>
        <title>我的个人网站</title>
        <meta name="description" content="使用 Next.js 构建的个人网站" />
      </head>
      <body className={inter.className}>
        <ThemeProvider>
          {/* 鼠标跟随效果 - 使用 Suspense 包裹动态导入的组件 */}
          <Suspense fallback={null}>
            <MouseFollower 
              size={30} 
              color="rgba(99, 102, 241, 0.3)" 
              blur={15} 
              opacity={0.6} 
              showTrail={true} 
              trailCount={5}
            />
          </Suspense>
          
          {/* 页面过渡动画 */}
          <PageTransition mode="fade" duration={0.5}>
            {children}
          </PageTransition>
        </ThemeProvider>
      </body>
    </html>
  );
}
