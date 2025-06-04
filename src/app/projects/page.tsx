"use client";

import ClientOnly from "../components/ClientOnly";
import PageLayout from "../components/PageLayout";
import ProjectCard from "../components/ProjectCard";
import Skeleton from "../components/Skeleton";
import AnimatedElement from "../components/AnimatedElement";

const projects = [
  {
    title: "个人博客系统",
    description: "使用 Next.js 和 Tailwind CSS 构建的现代化博客系统，支持 Markdown 写作和响应式设计。",
    tech: ["Next.js", "Tailwind CSS", "TypeScript"],
    image: "/projects/blog.png",
    link: "https://github.com/yourusername/blog",
    featured: true,
  },
  {
    title: "任务管理应用",
    description: "一个简洁高效的任务管理工具，支持任务分类、优先级设置和进度追踪。",
    tech: ["React", "Node.js", "MongoDB"],
    image: "/projects/todo.png",
    link: "https://github.com/yourusername/todo",
    featured: true,
  },
  {
    title: "天气应用",
    description: "实时天气查询应用，支持多城市天气展示和未来天气预报。",
    tech: ["Vue.js", "OpenWeather API", "Tailwind CSS"],
    image: "/projects/weather.png",
    link: "https://github.com/yourusername/weather",
    featured: false,
  },
];

export default function ProjectsPage() {
  // 骨架屏
  const fallback = (
    <div className="min-h-screen bg-gradient-to-b from-gray-50 to-white dark:from-gray-900 dark:to-gray-800">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
        <div className="text-center mb-16">
          <Skeleton type="title" className="mx-auto mb-4" />
          <Skeleton type="text" width="w-3/4" className="mx-auto" />
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {[1, 2, 3].map((i) => (
            <Skeleton key={i} type="project-card" />
          ))}
        </div>
      </div>
    </div>
  );

  return (
    <ClientOnly fallback={fallback}>
      <PageLayout 
        title="" 
        description="探索我的一些精选项目"
      >
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {projects.map((project, index) => (
            <AnimatedElement key={project.title} type="stagger" index={index}>
              <ProjectCard {...project} index={index} />
            </AnimatedElement>
          ))}
        </div>
      </PageLayout>
    </ClientOnly>
  );
} 