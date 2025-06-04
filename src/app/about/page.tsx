"use client";

import { useState } from "react";
import ClientOnly from "../components/ClientOnly";
import PageLayout from "../components/PageLayout";
import Card from "../components/Card";
import Tag from "../components/Tag";
import Skeleton from "../components/Skeleton";
import AnimatedElement from "../components/AnimatedElement";

const skills = [
  { name: "前端开发", items: ["React", "Next.js", "TypeScript", "Tailwind CSS"] },
  { name: "后端开发", items: ["Node.js", "Python", "Java", "MySQL"] },
  { name: "开发工具", items: ["Git", "VS Code", "Docker", "Linux"] },
  { name: "其他技能", items: ["UI/UX设计", "项目管理", "团队协作", "问题解决"] },
];

const experiences = [
  {
    title: "高级前端开发工程师",
    company: "某科技公司",
    period: "2021 - 至今",
    description: "负责公司核心产品的前端开发工作，带领团队完成多个重要项目。",
  },
  {
    title: "全栈开发工程师",
    company: "某互联网公司",
    period: "2019 - 2021",
    description: "参与多个全栈项目的开发，负责前端界面设计和后端API开发。",
  },
];

const education = [
  {
    degree: "计算机科学与技术",
    school: "某知名大学",
    period: "2015 - 2019",
    description: "主修计算机科学与技术，获得学士学位。",
  },
];

export default function AboutPage() {
  const [activeSkill, setActiveSkill] = useState<string | null>(null);

  // 骨架屏
  const fallback = (
    <div className="min-h-screen bg-gradient-to-b from-gray-50 to-white dark:from-gray-900 dark:to-gray-800">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
        <div className="text-center mb-16">
          <Skeleton type="title" className="mx-auto mb-4 animate-pulse" />
          <Skeleton type="text" width="w-3/4" className="mx-auto animate-pulse" />
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          <div className="space-y-8">
            <Skeleton type="image" height="h-64" className="rounded-lg animate-pulse" />
            <div className="space-y-4">
              <Skeleton type="text" width="w-3/4" className="animate-pulse" />
              <Skeleton type="text" className="animate-pulse" />
            </div>
          </div>
          <div className="space-y-8">
            {[1, 2, 3, 4].map((i) => (
              <Skeleton key={i} type="card" height="h-32" className="rounded-lg animate-pulse" />
            ))}
          </div>
        </div>
      </div>
    </div>
  );

  return (
    <ClientOnly fallback={fallback}>
      <PageLayout
        title=""
        description="了解我的故事、技能和经历"
      >
        <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
          {/* 左侧：个人简介和照片 */}
          <AnimatedElement type="fadeInUp" delay={0.2} className="space-y-8">
            <Card isHoverable className="relative h-64 rounded-lg overflow-hidden group">
              <div className="absolute inset-0 bg-gradient-to-br from-indigo-500 to-purple-500 opacity-20 group-hover:opacity-30 transition-opacity duration-300" />
              <div className="absolute inset-0 flex items-center justify-center">
                <span className="text-gray-400 dark:text-gray-500">个人照片</span>
              </div>
            </Card>
            <Card isHoverable className="space-y-4 p-6">
              <h2 className="text-2xl font-semibold text-gray-900 dark:text-white">
                个人简介
              </h2>
              <p className="text-gray-600 dark:text-gray-300 leading-relaxed">
                我是一名充满热情的全栈开发工程师，专注于创建优秀的用户体验和高性能的Web应用。
                在过去的几年里，我参与开发了多个大型项目，积累了丰富的实践经验。
                我热爱学习新技术，并且乐于在团队中分享知识和经验。
              </p>
            </Card>
          </AnimatedElement>

          {/* 右侧：技能展示 */}
          <AnimatedElement type="fadeInUp" delay={0.4} className="space-y-8">
            <h2 className="text-2xl font-semibold text-gray-900 dark:text-white">
              技能专长
            </h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
              {skills.map((skill, index) => (
                <AnimatedElement
                  key={skill.name}
                  type="stagger"
                  index={index}
                >
                  <Card 
                    isHoverable 
                    className="p-6"
                    onMouseEnter={() => setActiveSkill(skill.name)}
                    onMouseLeave={() => setActiveSkill(null)}
                  >
                    <h3 
                      className={`text-lg font-semibold mb-3 transition-colors duration-300 ${
                        activeSkill === skill.name 
                          ? 'text-indigo-600 dark:text-indigo-400' 
                          : 'text-gray-900 dark:text-white'
                      }`}
                    >
                      {skill.name}
                    </h3>
                    <div className="flex flex-wrap gap-2">
                      {skill.items.map((item, itemIndex) => (
                        <AnimatedElement
                          key={item}
                          type="scale"
                          delay={itemIndex * 0.1}
                        >
                          <Tag variant="primary">
                            {item}
                          </Tag>
                        </AnimatedElement>
                      ))}
                    </div>
                  </Card>
                </AnimatedElement>
              ))}
            </div>
          </AnimatedElement>
        </div>

        {/* 工作经历 */}
        <AnimatedElement type="fadeInUp" delay={0.6} className="mt-20">
          <h2 className="text-2xl font-semibold text-gray-900 dark:text-white mb-8">
            工作经历
          </h2>
          <div className="space-y-6">
            {experiences.map((exp, index) => (
              <AnimatedElement
                key={exp.title}
                type="stagger"
                index={index}
              >
                <Card isHoverable className="p-6">
                  <h3 className="text-xl font-semibold text-gray-900 dark:text-white hover:text-indigo-600 dark:hover:text-indigo-400 transition-colors duration-300">
                    {exp.title}
                  </h3>
                  <p className="text-indigo-600 dark:text-indigo-400 mb-2">
                    {exp.company}
                  </p>
                  <p className="text-gray-500 dark:text-gray-400 text-sm mb-4">
                    {exp.period}
                  </p>
                  <p className="text-gray-600 dark:text-gray-300">
                    {exp.description}
                  </p>
                </Card>
              </AnimatedElement>
            ))}
          </div>
        </AnimatedElement>

        {/* 教育经历 */}
        <AnimatedElement type="fadeInUp" delay={0.8} className="mt-20">
          <h2 className="text-2xl font-semibold text-gray-900 dark:text-white mb-8">
            教育经历
          </h2>
          <div className="space-y-6">
            {education.map((edu, index) => (
              <AnimatedElement
                key={edu.degree}
                type="stagger"
                index={index}
              >
                <Card isHoverable className="p-6">
                  <h3 className="text-xl font-semibold text-gray-900 dark:text-white hover:text-indigo-600 dark:hover:text-indigo-400 transition-colors duration-300">
                    {edu.degree}
                  </h3>
                  <p className="text-indigo-600 dark:text-indigo-400 mb-2">
                    {edu.school}
                  </p>
                  <p className="text-gray-500 dark:text-gray-400 text-sm mb-4">
                    {edu.period}
                  </p>
                  <p className="text-gray-600 dark:text-gray-300">
                    {edu.description}
                  </p>
                </Card>
              </AnimatedElement>
            ))}
          </div>
        </AnimatedElement>
      </PageLayout>
    </ClientOnly>
  );
} 