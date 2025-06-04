'use client';

import React, { useState, useEffect, useRef } from 'react';
import ReactMarkdown from 'react-markdown';
import remarkGfm from 'remark-gfm';
import { Prism as SyntaxHighlighter } from 'react-syntax-highlighter';
import { tomorrow } from 'react-syntax-highlighter/dist/cjs/styles/prism';
import Image from 'next/image';
import type { Components } from 'react-markdown';

interface MarkdownRendererProps {
  content: string;
}

interface TocItem {
  id: string;
  title: string;
  level: number;
  items?: TocItem[];
}

const MarkdownRenderer: React.FC<MarkdownRendererProps> = ({ content }) => {
  const [tocItems, setTocItems] = useState<TocItem[]>([]);
  const contentRef = useRef<HTMLDivElement>(null);

  // 提取标题并生成目录
  useEffect(() => {
    // 首先移除代码块中的内容，避免提取代码块中的注释
    const contentWithoutCodeBlocks = content.replace(/```[\s\S]*?```/g, '');
    
    // 使用正则表达式提取标题
    const headingRegex = /^(#{1,6})\s+(.+)$/gm;
    const matches = [...contentWithoutCodeBlocks.matchAll(headingRegex)];
    
    const items: TocItem[] = [];
    
    matches.forEach(match => {
      const level = match[1].length;
      const title = match[2].trim();
      const id = title.toLowerCase().replace(/\s+/g, '-').replace(/[^\w\-]/g, '');
      
      if (level <= 3) { // 只提取 h1, h2, h3 标题
        items.push({
          id,
          title,
          level
        });
      }
    });
    
    setTocItems(items);
  }, [content]);

  // 移除了滚动监听，不再高亮当前可见的标题

  // 自定义React Markdown组件
  const customComponents: Components = {
    h1(props) {
      const { children, ...rest } = props;
      const id = children?.toString().toLowerCase().replace(/\s+/g, '-').replace(/[^\w\-]/g, '') || '';
      return <h1 id={id} {...rest}>{children}</h1>;
    },
    h2(props) {
      const { children, ...rest } = props;
      const id = children?.toString().toLowerCase().replace(/\s+/g, '-').replace(/[^\w\-]/g, '') || '';
      return <h2 id={id} {...rest}>{children}</h2>;
    },
    h3(props) {
      const { children, ...rest } = props;
      const id = children?.toString().toLowerCase().replace(/\s+/g, '-').replace(/[^\w\-]/g, '') || '';
      return <h3 id={id} {...rest}>{children}</h3>;
    },
    a(props) {
      const { href, children, ...rest } = props;
      return (
        <a href={href} target="_blank" rel="noopener noreferrer" {...rest}>
          {children}
        </a>
      );
    },
    code(props) {
      const {className, children, node, ...rest} = props;
      const match = /language-(\w+)/.exec(className || '');
      
      if (match && children) {
        // 提取语言标识符
        const language = match[1];
        return (
          <div className="relative">
            <SyntaxHighlighter
              language={language}
              style={tomorrow}
              PreTag="div"
              customStyle={{
                margin: 0,
                borderRadius: '0.375rem',
                fontSize: '0.9rem',
                lineHeight: 1.5
              }}
            >
              {String(children).replace(/\n$/, '')}
            </SyntaxHighlighter>
            {language && (
              <div className="absolute top-0 right-0 bg-gray-700 text-gray-100 rounded-bl px-2 py-1 text-xs font-mono">
                {language}
              </div>
            )}
          </div>
        );
      }
      
      return (
        <code {...rest} className={className || 'text-pink-500 dark:text-pink-400 bg-gray-100 dark:bg-gray-800 px-1 py-0.5 rounded text-sm'}>
          {children}
        </code>
      );
    },
    pre(props) {
      const {children} = props;
      // 直接返回children，因为code组件已经处理了代码块的格式化
      return <>{children}</>;
    },
    img(props) {
      const {src, alt} = props;
      if (!src) return null;
      return (
        <div className="relative aspect-[16/9] my-8">
          <Image
            src={src}
            alt={alt || ''}
            fill
            className="object-cover rounded-lg"
            sizes="(max-width: 768px) 100vw, (max-width: 1200px) 80vw, 1200px"
          />
        </div>
      );
    }
  };

  // 渲染目录项
  const renderTocItem = (item: TocItem) => {
    return (
      <li key={item.id} className={`mb-2 ${item.level > 1 ? 'ml-' + (item.level - 1) * 4 : ''}`}>
        <a 
          href={`#${item.id}`} 
          className="block py-1 px-2 rounded transition-colors no-underline hover:bg-gray-100 dark:hover:bg-gray-800"
          onClick={(e) => {
            e.preventDefault();
            const element = document.getElementById(item.id);
            if (element) {
              element.scrollIntoView({ behavior: 'smooth' });
            }
          }}
        >
          {item.title}
        </a>
      </li>
    );
  };

  const [tocVisible, setTocVisible] = useState<boolean>(true);

  const toggleToc = () => {
    setTocVisible(!tocVisible);
  };

  return (
    <div className="flex flex-col md:flex-row gap-8 items-start">
      {/* 文章内容 */}
      <div ref={contentRef} className="flex-1 pt-0">
        <ReactMarkdown
          components={customComponents}
          remarkPlugins={[remarkGfm]}
        >
          {content}
        </ReactMarkdown>
      </div>
      
      {/* 目录 */}
      {tocItems.length > 0 && (
        <div className="md:w-64 lg:w-72 flex-shrink-0 md:mt-0">
          <div className="sticky top-24 p-4 bg-gray-50 dark:bg-gray-800 rounded-lg transition-all duration-300">
            <div className="flex justify-between items-center mb-4">
              <h3 className="text-lg font-semibold text-gray-900 dark:text-white">目录</h3>
              <button 
                onClick={toggleToc}
                className="text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-200 focus:outline-none"
                aria-label={tocVisible ? '收起目录' : '展开目录'}
              >
                {tocVisible ? (
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                    <path fillRule="evenodd" d="M4.293 15.707a1 1 0 010-1.414l5-5a1 1 0 011.414 0l5 5a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414 0z" clipRule="evenodd" />
                  </svg>
                ) : (
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                    <path fillRule="evenodd" d="M15.707 4.293a1 1 0 010 1.414l-5 5a1 1 0 01-1.414 0l-5-5a1 1 0 011.414-1.414L10 8.586l4.293-4.293a1 1 0 011.414 0z" clipRule="evenodd" />
                  </svg>
                )}
              </button>
            </div>
            <nav className={`transition-all duration-300 ${tocVisible ? 'max-h-[calc(100vh-180px)] opacity-100 overflow-y-auto pr-1' : 'max-h-0 opacity-0 overflow-hidden'}`}>
              <ul className="space-y-1">
                {tocItems.map(renderTocItem)}
              </ul>
            </nav>
          </div>
        </div>
      )}
    </div>
  );
};

export default MarkdownRenderer;