"use client";

import ClientOnly from "./components/ClientOnly";
import Navbar from "./components/Navbar";
import Footer from "./components/Footer";
import Button from "./components/Button";
import Icon from "./components/Icon";
import Card from "./components/Card";
import Skeleton from "./components/Skeleton";
import AnimatedElement from "./components/AnimatedElement";
import ParallaxSection from "./components/ParallaxSection";
import { siteConfig } from "../../siteConfig";

export default function Home() {
  // 骨架屏
  const fallback = (
    <div className="min-h-screen bg-gradient-to-b from-gray-50 to-white dark:from-gray-900 dark:to-gray-800">
      <div className="fixed top-0 left-0 right-0 z-50 bg-white/80 dark:bg-gray-900/80 backdrop-blur-md shadow-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <Skeleton type="text" width="w-32" />
            <div className="hidden md:flex items-center space-x-8">
              {[1, 2, 3, 4].map((i) => (
                <Skeleton key={i} type="text" width="w-16" />
              ))}
            </div>
          </div>
        </div>
      </div>
      <div className="pt-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
          <div className="text-center">
            <Skeleton type="title" className="mx-auto mb-4" />
            <Skeleton type="text" width="w-3/4" className="mx-auto" />
          </div>
        </div>
      </div>
    </div>
  );

  return (
    <ClientOnly fallback={fallback}>
      <div className="min-h-screen bg-gradient-to-b from-white to-gray-50 dark:from-gray-900 dark:to-gray-800">
        {/* 导航栏 */}
        <Navbar />

        {/* 背景粒子效果 - SVG版本 */}
        <div className="fixed inset-0 overflow-hidden pointer-events-none">
          <svg className="absolute inset-0 w-full h-full">
            <defs>
              <radialGradient id="particleGradient" cx="50%" cy="50%" r="50%" fx="50%" fy="50%">
                <stop offset="0%" stopColor="#6366f1" />
                <stop offset="100%" stopColor="#0ea5e9" />
              </radialGradient>
            </defs>
            {[...Array(20)].map((_, i) => {
              const size = 2 + Math.random() * 3;
              const x = Math.random() * 100;
              const y = Math.random() * 100;
              const delay = Math.random() * 5;
              const duration = 5 + Math.random() * 5;
              
              return (
                <circle 
                  key={i} 
                  cx={`${x}%`} 
                  cy={`${y}%`} 
                  r={size} 
                  fill="url(#particleGradient)"
                  opacity={0.1 + Math.random() * 0.1}
                  className="animate-float"
                  style={{
                    animationDelay: `${delay}s`,
                    animationDuration: `${duration}s`
                  }}
                />
              );
            })}
          </svg>
        </div>

        {/* Hero Section */}
        <section className="relative h-screen flex items-center justify-center overflow-hidden">
          {/* 背景动画效果 - SVG版本 */}
          <div className="absolute inset-0">
            <div className="absolute inset-0 bg-white dark:bg-gray-900"></div>
            <div className="absolute inset-0 overflow-hidden">
              <svg className="absolute w-full h-full opacity-[0.07] dark:opacity-[0.1]" viewBox="0 0 100 100" preserveAspectRatio="none">
                <defs>
                  <linearGradient id="gradient" x1="0%" y1="0%" x2="100%" y2="100%">
                    <stop offset="0%" stopColor="#6366f1" />
                    <stop offset="50%" stopColor="#3b82f6" />
                    <stop offset="100%" stopColor="#0ea5e9" />
                  </linearGradient>
                  <filter id="glow" x="-50%" y="-50%" width="200%" height="200%">
                    <feGaussianBlur in="SourceGraphic" stdDeviation="3" />
                  </filter>
                </defs>
                <g className="animate-svg-pulse">
                  <path d="M0,50 Q25,30 50,50 T100,50 L100,100 L0,100 Z" fill="url(#gradient)" opacity="0.3" />
                  <path d="M0,60 Q35,40 70,60 T100,60 L100,100 L0,100 Z" fill="url(#gradient)" opacity="0.2" />
                  <path d="M0,70 Q50,50 80,70 T100,70 L100,100 L0,100 Z" fill="url(#gradient)" opacity="0.1" />
                </g>
              </svg>
              <svg className="absolute top-0 left-0 w-full h-full opacity-[0.03] dark:opacity-[0.05]" width="100%" height="100%">
                <defs>
                  <pattern id="grid" width="50" height="50" patternUnits="userSpaceOnUse">
                    <path d="M 50 0 L 0 0 0 50" fill="none" stroke="currentColor" strokeWidth="0.5" />
                  </pattern>
                </defs>
                <rect width="100%" height="100%" fill="url(#grid)" />
              </svg>
            </div>
          </div>

          {/* 主要内容 */}
          <div className="relative z-10 text-center px-4">
            <AnimatedElement type="scale" className="mb-6">
              <h1 className="text-5xl md:text-7xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-indigo-500 via-blue-500 to-sky-500 hover-scale">
                { siteConfig.title }
              </h1>
            </AnimatedElement>
            
            <AnimatedElement type="fadeInUp" delay={0.2} className="mb-8">
              <p className="text-xl md:text-2xl text-gray-600 dark:text-gray-300">
                { siteConfig.description }
              </p>
            </AnimatedElement>
            
            <AnimatedElement type="fadeInUp" delay={0.4}>
              <div className="flex gap-4 justify-center">
                <Button href="/projects" variant="primary" size="lg">
                  查看项目
                </Button>
                <Button href="/about" variant="outline" size="lg">
                  关于我
                </Button>
              </div>
            </AnimatedElement>
          </div>

          {/* 滚动提示 */}
          <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 animate-bounce">
            <Icon name="arrow-down" className="text-gray-400" />
          </div>
        </section>

        {/* 特色部分 */}
        <section className="py-20 px-4 relative overflow-hidden">
          {/* 背景装饰 - SVG版本 */}
          <div className="absolute inset-0">
            <svg className="absolute inset-0 w-full h-full opacity-[0.05] dark:opacity-[0.07]" width="100%" height="100%">
              <defs>
                <pattern id="smallGrid" width="50" height="50" patternUnits="userSpaceOnUse">
                  <path d="M 50 0 L 0 0 0 50" fill="none" stroke="currentColor" strokeWidth="0.3" />
                </pattern>
                <radialGradient id="bgGradient1" cx="10%" cy="20%" r="80%" fx="20%" fy="20%">
                  <stop offset="0%" stopColor="#6366f1" stopOpacity="0.1" />
                  <stop offset="100%" stopColor="#6366f1" stopOpacity="0" />
                </radialGradient>
                <radialGradient id="bgGradient2" cx="90%" cy="80%" r="80%" fx="80%" fy="80%">
                  <stop offset="0%" stopColor="#0ea5e9" stopOpacity="0.1" />
                  <stop offset="100%" stopColor="#0ea5e9" stopOpacity="0" />
                </radialGradient>
              </defs>
              <rect width="100%" height="100%" fill="url(#smallGrid)" />
              <circle cx="10%" cy="20%" r="30%" fill="url(#bgGradient1)" className="animate-blob-slow" />
              <circle cx="90%" cy="80%" r="30%" fill="url(#bgGradient2)" className="animate-blob-slow animation-delay-2000" />
            </svg>
          </div>
          
          <div className="max-w-7xl mx-auto">
            <AnimatedElement type="fadeInUp" whileInView={true} className="text-center mb-16">
              <h2 className="text-3xl md:text-4xl font-bold mb-4">我能提供什么</h2>
              <p className="text-lg text-gray-600 dark:text-gray-300 max-w-2xl mx-auto">
                专注于创造有价值的内容和解决方案
              </p>
            </AnimatedElement>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              <ParallaxSection speed={0.3} direction="vertical" whileInView={true}>
                <AnimatedElement type="fadeInUp" delay={0.1} whileInView={true} className="h-full">
                  <Card className="p-6 h-full">
                    <AnimatedElement type="scale" whileInView={true} className="mb-4 text-indigo-500">
                      <Icon name="code" size="lg" />
                    </AnimatedElement>
                    <h3 className="text-xl font-bold mb-2">Web开发</h3>
                    <p className="text-gray-600 dark:text-gray-300">
                      使用现代技术栈构建响应式、高性能的Web应用
                    </p>
                  </Card>
                </AnimatedElement>
              </ParallaxSection>

              <ParallaxSection speed={0.5} direction="vertical" whileInView={true}>
                <AnimatedElement type="fadeInUp" delay={0.2} whileInView={true} className="h-full">
                  <Card className="p-6 h-full">
                    <AnimatedElement type="rubberBand" whileInView={true} className="mb-4 text-indigo-500">
                      <Icon name="design" size="lg" />
                    </AnimatedElement>
                    <h3 className="text-xl font-bold mb-2">UI/UX设计</h3>
                    <p className="text-gray-600 dark:text-gray-300">
                      创造美观、直观且用户友好的界面设计
                    </p>
                  </Card>
                </AnimatedElement>
              </ParallaxSection>

              <ParallaxSection speed={0.7} direction="vertical" whileInView={true}>
                <AnimatedElement type="fadeInUp" delay={0.3} whileInView={true} className="h-full">
                  <Card className="p-6 h-full">
                    <AnimatedElement type="tada" whileInView={true} className="mb-4 text-indigo-500">
                      <Icon name="mobile" size="lg" />
                    </AnimatedElement>
                    <h3 className="text-xl font-bold mb-2">移动应用</h3>
                    <p className="text-gray-600 dark:text-gray-300">
                      开发跨平台移动应用，提供原生体验
                    </p>
                  </Card>
                </AnimatedElement>
              </ParallaxSection>
            </div>
          </div>
        </section>

        {/* 新增：号召性动作区域 */}
        <section className="py-20 px-4 relative overflow-hidden">
          <AnimatedElement type="fadeInUp" whileInView={true} delay={0.4} className="mt-16 text-center">
            <div className="bg-gradient-to-r from-indigo-50/80 via-blue-50/80 to-sky-50/80 dark:from-indigo-900/10 dark:via-blue-900/10 dark:to-sky-900/10 p-8 rounded-2xl max-w-3xl mx-auto shadow-sm">
              <h3 className="text-2xl font-bold mb-4">想了解更多？</h3>
              <p className="mb-6 text-gray-600 dark:text-gray-300">查看我的项目或阅读我的技术博客</p>
              <div className="flex flex-wrap gap-4 justify-center">
                <Button href="/projects" variant="primary" size="md">
                  浏览项目
                </Button>
                <Button href="/blog" variant="outline" size="md">
                  阅读博客
                </Button>
              </div>
            </div>
          </AnimatedElement>
        </section>

        {/* 页脚 */}
        <Footer />
      </div>
    </ClientOnly>
  );
}
