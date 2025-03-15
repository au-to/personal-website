"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import ClientOnly from "../components/ClientOnly";
import PageLayout from "../components/PageLayout";
import Card from "../components/Card";
import Skeleton from "../components/Skeleton";
import AnimatedElement from "../components/AnimatedElement";

const techStacks = [
  {
    category: "前端技术",
    items: [
      {
        name: "React",
        level: 90,
        description: "熟练使用React开发复杂应用，包括Hooks、Context API等高级特性",
        projects: ["企业管理系统", "电商平台", "数据可视化面板"]
      },
      {
        name: "Next.js",
        level: 85,
        description: "使用Next.js构建SSR/SSG应用，优化性能和SEO",
        projects: ["个人博客", "企业官网", "电商平台"]
      },
      {
        name: "TypeScript",
        level: 88,
        description: "使用TypeScript进行类型安全的开发，提高代码质量",
        projects: ["大型企业应用", "微服务架构", "组件库开发"]
      },
      {
        name: "Tailwind CSS",
        level: 95,
        description: "使用Tailwind CSS快速构建响应式界面，实现复杂布局",
        projects: ["设计系统", "企业应用", "移动端适配"]
      }
    ]
  },
  {
    category: "后端技术",
    items: [
      {
        name: "Node.js",
        level: 85,
        description: "使用Node.js开发高性能后端服务，包括Express和NestJS",
        projects: ["RESTful API", "微服务架构", "实时通信"]
      },
      {
        name: "Python",
        level: 80,
        description: "使用Python进行数据处理和机器学习应用开发",
        projects: ["数据分析", "AI模型部署", "自动化脚本"]
      },
      {
        name: "Java",
        level: 75,
        description: "使用Java开发企业级应用，包括Spring Boot框架",
        projects: ["企业管理系统", "支付系统", "微服务架构"]
      },
      {
        name: "MySQL",
        level: 90,
        description: "设计和优化数据库结构，编写高效SQL查询",
        projects: ["高并发系统", "数据分析", "数据迁移"]
      }
    ]
  },
  {
    category: "开发工具",
    items: [
      {
        name: "Git",
        level: 95,
        description: "熟练使用Git进行版本控制，包括分支管理和团队协作",
        projects: ["大型项目协作", "CI/CD流程", "代码审查"]
      },
      {
        name: "VS Code",
        level: 90,
        description: "使用VS Code进行高效开发，包括插件配置和快捷键",
        projects: ["开发环境配置", "团队规范", "效率提升"]
      },
      {
        name: "Docker",
        level: 85,
        description: "使用Docker进行容器化部署，包括多环境配置",
        projects: ["微服务部署", "开发环境隔离", "CI/CD流程"]
      },
      {
        name: "Linux",
        level: 80,
        description: "使用Linux进行服务器管理和开发环境配置",
        projects: ["服务器运维", "环境配置", "性能优化"]
      }
    ]
  }
];

export default function TechPage() {
  const [hoveredItem, setHoveredItem] = useState<string | null>(null);
  const [hoveredCategory, setHoveredCategory] = useState<string | null>(null);

  // 骨架屏
  const fallback = (
    <div className="min-h-screen bg-gradient-to-b from-gray-50 to-white dark:from-gray-900 dark:to-gray-800">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
        <div className="text-center mb-16">
          <Skeleton type="title" className="mx-auto mb-4 animate-pulse" />
          <Skeleton type="text" width="w-3/4" className="mx-auto animate-pulse" />
        </div>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {[1, 2, 3].map((i) => (
            <div key={i} className="space-y-4">
              <Skeleton type="text" width="w-3/4" height="h-8" className="animate-pulse" />
              <div className="space-y-2">
                {[1, 2, 3, 4].map((j) => (
                  <Skeleton key={j} type="card" height="h-24" className="animate-pulse" />
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );

  return (
    <ClientOnly fallback={fallback}>
      <PageLayout
        title="技术栈"
        description="探索我的技术能力和项目经验"
      >
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {techStacks.map((stack, index) => (
            <AnimatedElement
              key={stack.category}
              type="fadeInUp"
              delay={0.2 + index * 0.1}
              className="space-y-6"
            >
              <motion.div
                className="inline-block"
                whileHover={{ scale: 1.05, x: 5 }}
                onHoverStart={() => setHoveredCategory(stack.category)}
                onHoverEnd={() => setHoveredCategory(null)}
              >
                <h2 className={`text-2xl font-semibold transition-colors duration-300 ${
                  hoveredCategory === stack.category 
                    ? 'text-indigo-600 dark:text-indigo-400'
                    : 'text-gray-900 dark:text-white'
                }`}>
                  {stack.category}
                </h2>
              </motion.div>
              <motion.div 
                className="space-y-6"
                variants={{
                  hidden: { opacity: 0 },
                  show: {
                    opacity: 1,
                    transition: {
                      staggerChildren: 0.1
                    }
                  }
                }}
                initial="hidden"
                animate="show"
              >
                {stack.items.map((item, itemIndex) => (
                  <motion.div
                    key={item.name}
                    variants={{
                      hidden: { opacity: 0, x: -20 },
                      show: { opacity: 1, x: 0 }
                    }}
                  >
                    <Card
                      isHoverable
                      className={`relative p-6 overflow-hidden transform transition-all duration-500 ${
                        hoveredItem === item.name 
                          ? 'border border-indigo-300 dark:border-indigo-700 scale-[1.02] -translate-y-1'
                          : 'border border-transparent'
                      }`}
                      onMouseEnter={() => setHoveredItem(item.name)}
                      onMouseLeave={() => setHoveredItem(null)}
                    >
                      {/* 背景装饰 */}
                      <motion.div 
                        className="absolute -right-10 -top-10 w-40 h-40 rounded-full bg-indigo-100 dark:bg-indigo-900/20 z-0"
                        initial={{ opacity: 0, scale: 0.5 }}
                        animate={{ 
                          opacity: hoveredItem === item.name ? 0.5 : 0,
                          scale: hoveredItem === item.name ? 1 : 0.5,
                        }}
                        transition={{ duration: 0.5 }}
                      />
                      
                      <div className="relative z-10">
                        <motion.div 
                          className="flex justify-between items-center mb-4"
                          initial={false}
                          animate={hoveredItem === item.name ? {
                            y: -2,
                            transition: { duration: 0.3 }
                          } : {
                            y: 0,
                            transition: { duration: 0.3 }
                          }}
                        >
                          <motion.h3 
                            className="text-lg font-semibold"
                            animate={{ 
                              color: hoveredItem === item.name ? "#4F46E5" : "#111827",
                              scale: hoveredItem === item.name ? 1.05 : 1,
                              x: hoveredItem === item.name ? 3 : 0
                            }}
                            transition={{ duration: 0.3 }}
                            style={{ 
                              textShadow: hoveredItem === item.name ? '0 0 8px rgba(79, 70, 229, 0.3)' : 'none' 
                            }}
                          >
                            {item.name}
                          </motion.h3>
                          <motion.div
                            className="flex items-center"
                            animate={{ 
                              scale: hoveredItem === item.name ? 1.1 : 1,
                              x: hoveredItem === item.name ? -3 : 0
                            }}
                          >
                            <motion.span 
                              className="text-sm font-bold text-indigo-600 dark:text-indigo-400"
                              animate={{ 
                                scale: hoveredItem === item.name ? 1.2 : 1
                              }}
                              transition={{ duration: 0.2, type: "spring", stiffness: 300 }}
                            >
                              {item.level}%
                            </motion.span>
                          </motion.div>
                        </motion.div>
                        
                        <div className="w-full bg-gray-200 dark:bg-gray-700 rounded-full h-2.5 mb-4 overflow-hidden">
                          <motion.div
                            className="h-2.5 rounded-full"
                            style={{
                              background: hoveredItem === item.name 
                                ? "linear-gradient(90deg, #4F46E5 0%, #818CF8 100%)" 
                                : "#4F46E5"
                            }}
                            initial={{ width: 0 }}
                            animate={{ width: `${item.level}%` }}
                            transition={{ duration: 1, ease: "easeOut" }}
                          />
                        </div>
                        
                        <motion.p 
                          className="text-gray-600 dark:text-gray-300 text-sm mb-4"
                          animate={{ 
                            opacity: hoveredItem === item.name ? 1 : 0.8,
                            y: hoveredItem === item.name ? -2 : 0
                          }}
                          transition={{ duration: 0.3 }}
                        >
                          {item.description}
                        </motion.p>
                        
                        <AnimatePresence>
                          <motion.div
                            initial={{ opacity: 0, y: 10 }}
                            animate={{ opacity: 1, y: 0 }}
                            exit={{ opacity: 0, y: 10 }}
                            transition={{ duration: 0.3 }}
                          >
                            <h4 className="text-sm font-semibold text-gray-700 dark:text-gray-200 mb-2">
                              相关项目:
                            </h4>
                            <div className="flex flex-wrap gap-2">
                              {item.projects.map((project, projectIndex) => (
                                <motion.span
                                  key={project}
                                  className={`text-xs px-2 py-1 rounded-full ${
                                    hoveredItem === item.name
                                      ? 'bg-indigo-100 dark:bg-indigo-900/30 text-indigo-600 dark:text-indigo-400'
                                      : 'bg-gray-100 dark:bg-gray-700 text-gray-600 dark:text-gray-300'
                                  }`}
                                  initial={{ opacity: 0, scale: 0.8 }}
                                  animate={{ 
                                    opacity: 1, 
                                    scale: 1,
                                    y: hoveredItem === item.name ? -3 : 0
                                  }}
                                  transition={{ 
                                    duration: 0.3, 
                                    delay: 0.1 * projectIndex
                                  }}
                                  whileHover={{ 
                                    scale: 1.1,
                                    y: -2,
                                    transition: { duration: 0.2 }
                                  }}
                                >
                                  {project}
                                </motion.span>
                              ))}
                            </div>
                          </motion.div>
                        </AnimatePresence>
                      </div>
                    </Card>
                  </motion.div>
                ))}
              </motion.div>
            </AnimatedElement>
          ))}
        </div>
      </PageLayout>
    </ClientOnly>
  );
} 