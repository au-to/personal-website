"use client";

import { useState, useEffect } from "react";
import { AnimatePresence } from "framer-motion";
import { BlogPost } from "../data/blogData";
import { siteConfig } from "../../../siteConfig";
import PageLayout from "../components/PageLayout";
import Card from "../components/Card";
import Tag from "../components/Tag";
import Icon from "../components/Icon";
import AnimatedElement from "../components/AnimatedElement";
import { formatReadCount, getReadCount } from "../lib/clientUtils";

interface BlogListProps {
  posts: BlogPost[];
  categories: string[];
}

// 博客文章卡片组件
const BlogCard = ({ post }: { post: BlogPost }) => {
  const [hoveredPost, setHoveredPost] = useState<number | null>(null);
  const [readCount, setReadCount] = useState<number>(post.readCount);
  const [isLoading, setIsLoading] = useState<boolean>(true);

  useEffect(() => {
    async function fetchReadCount() {
      try {
        setIsLoading(true);
        const count = await getReadCount(post.slug);
        setReadCount(count);
      } catch (error) {
        console.error('获取阅读计数失败', error);
      } finally {
        setIsLoading(false);
      }
    }

    if (siteConfig.blog.enableReadCount && siteConfig.blog.showReadCountInList) {
      fetchReadCount();
    }
  }, [post.slug]);

  return (
    <Card 
      className="h-full flex flex-col"
      onMouseEnter={() => setHoveredPost(post.id || null)}
      onMouseLeave={() => setHoveredPost(null)}
    >
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
              {isLoading ? '...' : formatReadCount(readCount)}
            </div>
          )}
        </div>
      </div>

      {/* 文章内容 */}
      <div className="flex flex-col flex-grow p-4">
        <h3 className="text-lg font-semibold mb-2 line-clamp-2">{post.title}</h3>
        <p className="text-gray-500 dark:text-gray-400 text-sm line-clamp-3 mb-4">
          {post.excerpt}
        </p>
        <div className="mt-auto">
          <a
            href={`/blog/${post.slug}`}
            className="text-sm font-medium text-blue-600 dark:text-blue-400 hover:underline"
          >
            阅读更多
          </a>
        </div>
      </div>
    </Card>
  );
};

export default function BlogList({ posts, categories }: BlogListProps) {
  const [selectedCategory, setSelectedCategory] = useState("全部");
  const [searchQuery, setSearchQuery] = useState("");
  const [hoveredPost, setHoveredPost] = useState<number | null>(null);

  // 根据搜索和分类过滤文章
  const filteredPosts = posts.filter(post => {
    // 先按分类过滤
    const matchesCategory = selectedCategory === "全部" || post.category === selectedCategory;
    
    // 如果没有搜索查询，只按分类过滤
    if (!searchQuery.trim()) {
      return matchesCategory;
    }
    
    // 按搜索查询过滤（标题、摘要、内容中包含查询词）
    const query = searchQuery.toLowerCase().trim();
    const matchesSearch = 
      post.title.toLowerCase().includes(query) || 
      post.excerpt.toLowerCase().includes(query) ||
      (post.content && post.content.toLowerCase().includes(query)) || 
      post.tags.some(tag => tag.toLowerCase().includes(query));
    
    // 同时满足分类和搜索条件
    return matchesCategory && matchesSearch;
  });

  return (
    <PageLayout title="博客">
      <div className="mb-6">
        {/* 搜索框 */}
        <div className="mb-6">
          <div className="relative">
            <input
              type="text"
              placeholder="搜索文章..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full px-4 py-2 pl-10 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 dark:bg-gray-800 dark:border-gray-700 dark:text-white"
            />
            <Icon 
              name="search" 
              className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400"
              size={18}
            />
          </div>
        </div>

        <div className="flex flex-wrap gap-2 mb-8">
          {categories.map(category => (
            <Tag 
              key={category}
              variant={selectedCategory === category ? "primary" : "secondary"}
              onClick={() => setSelectedCategory(category)}
              className="cursor-pointer"
            >
              {category}
            </Tag>
          ))}
        </div>
        
        {/* 搜索结果状态 */}
        {searchQuery && (
          <div className="mb-4 text-sm text-gray-500 dark:text-gray-400">
            找到 {filteredPosts.length} 篇与 "{searchQuery}" 相关的文章
          </div>
        )}
        
        {/* 没有搜索结果时的提示 */}
        {filteredPosts.length === 0 && (
          <div className="py-8 text-center">
            <div className="text-gray-500 dark:text-gray-400 mb-2">
              未找到相关文章
            </div>
            <button 
              onClick={() => {
                setSearchQuery("");
                setSelectedCategory("全部");
              }}
              className="text-blue-500 hover:underline"
            >
              清除筛选条件
            </button>
          </div>
        )}
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          <AnimatePresence>
            {filteredPosts.map((post, index) => (
              <AnimatedElement
                key={post.id}
                index={index}
                type="fadeIn"
              >
                <BlogCard post={post} />
              </AnimatedElement>
            ))}
          </AnimatePresence>
        </div>
      </div>
    </PageLayout>
  );
} 