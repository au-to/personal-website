'use client';

import { useEffect, useState } from 'react';
import { BlogPost } from '../../lib/markdown';
import { incrementReadCount, formatReadCount, getReadCount } from '../../lib/clientUtils';
import { siteConfig } from '../../config/siteConfig';

interface BlogPostClientProps {
  post: BlogPost;
}

// 格式化日期函数，确保服务器和客户端输出一致
function formatDate(dateString: string): string {
  const date = new Date(dateString);
  const year = date.getFullYear();
  const month = String(date.getMonth() + 1).padStart(2, '0');
  const day = String(date.getDate()).padStart(2, '0');
  return `${year}-${month}-${day}`;
}

export default function BlogPostClient({ post }: BlogPostClientProps) {
  const [readCount, setReadCount] = useState<number>(post.readCount);
  const [isLoading, setIsLoading] = useState<boolean>(true);

  useEffect(() => {
    async function updateReadCount() {
      try {
        setIsLoading(true);
        
        // 首先获取当前阅读计数
        const currentCount = await getReadCount(post.slug);
        setReadCount(currentCount);
        
        // 然后增加阅读计数
        const newCount = await incrementReadCount(post.slug);
        setReadCount(newCount);
      } catch (error) {
        console.error('更新阅读计数失败', error);
      } finally {
        setIsLoading(false);
      }
    }
    
    updateReadCount();
  }, [post.slug]);

  return (
    <div className="flex flex-wrap items-center text-sm text-gray-500 dark:text-gray-400 mb-4">
      <span>{formatDate(post.date)}</span>
      
      {siteConfig.blog.enableReadCount && (
        <>
          <span className="mx-2">•</span>
          <span className="flex items-center">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-4 w-4 mr-1"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"
              />
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z"
              />
            </svg>
            {isLoading ? '加载中...' : `${formatReadCount(readCount)} 次阅读`}
          </span>
        </>
      )}
    </div>
  );
} 