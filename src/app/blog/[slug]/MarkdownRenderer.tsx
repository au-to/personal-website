'use client';

import React from 'react';
import ReactMarkdown from 'react-markdown';
import remarkGfm from 'remark-gfm';
import { Prism as SyntaxHighlighter } from 'react-syntax-highlighter';
import { tomorrow } from 'react-syntax-highlighter/dist/cjs/styles/prism';
import Image from 'next/image';
import type { Components } from 'react-markdown';

interface MarkdownRendererProps {
  content: string;
}

const MarkdownRenderer: React.FC<MarkdownRendererProps> = ({ content }) => {
  // 自定义React Markdown组件
  const customComponents: Components = {
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

  return (
    <ReactMarkdown
      components={customComponents}
      remarkPlugins={[remarkGfm]}
    >
      {content}
    </ReactMarkdown>
  );
};

export default MarkdownRenderer; 