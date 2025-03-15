"use client";

import { useState } from "react";
import { AnimatePresence } from "framer-motion";
import { BlogPost, formatReadCount } from "../data/blogData";
import { siteConfig } from "../config/siteConfig";
import PageLayout from "../components/PageLayout";
import Card from "../components/Card";
import Tag from "../components/Tag";
import Icon from "../components/Icon";
import AnimatedElement from "../components/AnimatedElement";

interface BlogListProps {
  posts: BlogPost[];
  categories: string[];
}

export default function BlogList({ posts, categories }: BlogListProps) {
  const [selectedCategory, setSelectedCategory] = useState("全部");
  const [searchQuery, setSearchQuery] = useState("");
  const [hoveredPost, setHoveredPost] = useState<number | null>(null);

  // 过滤文章
  const filteredPosts = posts.filter(post => {
    const matchesCategory = selectedCategory === "全部" || post.category === selectedCategory;
    const matchesSearch = post.title.toLowerCase().includes(searchQuery.toLowerCase()) || 
                         post.excerpt.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         post.tags.some(tag => tag.toLowerCase().includes(searchQuery.toLowerCase()));
    return matchesCategory && matchesSearch;
  });

  return (
    <PageLayout
      title="技术博客"
      description="分享我的技术见解和学习心得"
    >
      {/* 搜索和分类筛选 */}
      <AnimatedElement type="fadeInUp" delay={0.6} className="mb-12">
        <div className="flex flex-col md:flex-row justify-between items-center space-y-4 md:space-y-0 mb-6">
          {/* 搜索框 */}
          <div className="relative w-full md:w-1/3">
            <input
              type="text"
              placeholder="搜索文章..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full px-4 py-2 rounded-lg border border-gray-300 dark:border-gray-700 bg-white dark:bg-gray-800 text-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-indigo-500"
            />
            <Icon
              name="search"
              className="absolute right-3 top-2.5 text-gray-400 dark:text-gray-500"
            />
          </div>

          {/* 分类标签 */}
          <div className="flex flex-wrap justify-center gap-2">
            {categories.map((category) => (
              <Tag
                key={category}
                variant={selectedCategory === category ? "primary" : "default"}
                onClick={() => setSelectedCategory(category)}
                isAnimated
              >
                {category}
              </Tag>
            ))}
          </div>
        </div>
      </AnimatedElement>

      {/* 博客文章列表 */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        <AnimatePresence>
          {filteredPosts.length > 0 ? (
            filteredPosts.map((post, index) => (
              <AnimatedElement
                key={post.id}
                type="stagger"
                index={index}
                className="relative"
              >
                <Card
                  href={`/blog/${post.slug}`}
                  isHoverable
                  className={`h-full ${
                    hoveredPost === post.id ? 'ring-2 ring-indigo-300 dark:ring-indigo-700' : ''
                  }`}
                  onMouseEnter={() => setHoveredPost(post.id ?? null)}
                  onMouseLeave={() => setHoveredPost(null)}
                >
                  {/* 文章图片 */}
                  <div className="relative h-48 overflow-hidden">
                    <div
                      className={`absolute inset-0 bg-cover bg-center transition-transform duration-500 ${
                        hoveredPost === post.id ? 'scale-105' : 'scale-100'
                      }`}
                      style={{ 
                        backgroundImage: `url(${
                          post.imageUrl.startsWith('http') || post.imageUrl.startsWith('/') 
                            ? post.imageUrl 
                            : '/vercel.svg'
                        })` 
                      }}
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
                    <div className="absolute bottom-4 left-4 right-4 flex justify-between items-center">
                      <div>
                        <Tag variant="primary" size="sm" className="mr-2">
                          {post.category}
                        </Tag>
                        <span className="text-xs text-white">
                          {post.date} · {post.readTime}
                        </span>
                      </div>
                      {siteConfig.blog.enableReadCount && siteConfig.blog.showReadCountInList && (
                        <div className="flex items-center text-xs text-white">
                          <Icon name="eye" className="mr-1" />
                          {formatReadCount(post.readCount)}
                        </div>
                      )}
                    </div>
                  </div>

                  {/* 文章内容 */}
                  <div className="p-6">
                    <h3 
                      className={`text-xl font-semibold mb-2 transition-colors duration-300 ${
                        hoveredPost === post.id ? 'text-indigo-600 dark:text-indigo-400' : 'text-gray-900 dark:text-white'
                      }`}
                    >
                      {post.title}
                    </h3>
                    <p className="text-gray-600 dark:text-gray-300 text-sm mb-4">
                      {post.excerpt}
                    </p>
                    <div className="flex flex-wrap gap-2">
                      {post.tags.map((tag) => (
                        <Tag key={tag} size="sm">
                          #{tag}
                        </Tag>
                      ))}
                    </div>
                  </div>
                </Card>
              </AnimatedElement>
            ))
          ) : (
            <AnimatedElement
              type="fadeIn"
              className="col-span-full text-center py-12"
            >
              <p className="text-gray-600 dark:text-gray-300 text-lg">
                没有找到匹配的文章，请尝试其他搜索条件。
              </p>
            </AnimatedElement>
          )}
        </AnimatePresence>
      </div>
    </PageLayout>
  );
} 