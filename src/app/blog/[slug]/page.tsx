import { Metadata } from "next";
import { notFound } from "next/navigation";
import { getAllPostSlugs, getPostBySlug } from "../../lib/markdown";
import PageLayout from "../../components/PageLayout";
import Tag from "../../components/Tag";
import CommentSection from "../../components/CommentSection";
import { siteConfig } from "../../config/siteConfig";
import BlogPostClient from "./BlogPostClient";
import ReactMarkdown from 'react-markdown';
import remarkGfm from 'remark-gfm';
import rehypeHighlight from 'rehype-highlight';
import Image from 'next/image';
import type { Components } from 'react-markdown';

// 生成静态页面路径
export async function generateStaticParams() {
  const posts = await getAllPostSlugs();
  return posts;
}

// 生成元数据
export async function generateMetadata({ params }: { params: { slug: string } }): Promise<Metadata> {
  const post = await getPostBySlug(params.slug);
  
  if (!post) {
    return {
      title: "文章不存在",
      description: "找不到请求的文章",
    };
  }
  
  return {
    title: post.title,
    description: post.excerpt,
    openGraph: {
      title: post.title,
      description: post.excerpt,
      type: "article",
      publishedTime: post.date,
      authors: [post.author],
      tags: post.tags,
      images: [
        {
          url: post.imageUrl,
          width: 1200,
          height: 630,
          alt: post.title,
        },
      ],
    },
  };
}

export default async function BlogPostPage({ params }: { params: { slug: string } }) {
  const post = await getPostBySlug(params.slug);
  
  if (!post) {
    notFound();
  }

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
        return (
          <div className="relative">
            <pre className={className}>
              <code {...rest} className={className}>
                {children}
              </code>
            </pre>
            {match[1] && (
              <div className="absolute top-0 right-0 bg-gray-700 text-gray-100 rounded-bl px-2 py-1 text-xs font-mono">
                {match[1]}
              </div>
            )}
          </div>
        );
      }
      
      return (
        <code {...rest} className={className}>
          {children}
        </code>
      );
    },
    pre(props) {
      const {children, ...rest} = props;
      return (
        <pre {...rest} className="overflow-auto p-4 rounded-lg">
          {children}
        </pre>
      );
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
    <PageLayout
      title={post.title}
      description={post.excerpt}
    >
      {/* 文章头部 */}
      <div className="mb-8">
        <BlogPostClient post={post} />
        
        <div className="flex flex-wrap gap-2 mb-6">
          <Tag variant="primary">{post.category}</Tag>
          {post.tags.map((tag) => (
            <Tag key={tag}>#{tag}</Tag>
          ))}
        </div>
        
        <div className="relative aspect-[16/9] rounded-xl overflow-hidden mb-8">
          <Image
            src={post.imageUrl.startsWith('http') || post.imageUrl.startsWith('/') ? post.imageUrl : '/vercel.svg'}
            alt={post.title}
            fill
            className="object-cover"
            sizes="(max-width: 768px) 100vw, (max-width: 1200px) 80vw, 1200px"
            priority
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
        </div>
      </div>
      
      {/* 文章内容 */}
      <div className="prose prose-lg dark:prose-invert max-w-none prose-headings:text-gray-900 dark:prose-headings:text-white prose-a:text-indigo-600 dark:prose-a:text-indigo-400 hover:prose-a:text-indigo-500 dark:hover:prose-a:text-indigo-300 prose-code:text-pink-500 dark:prose-code:text-pink-400 prose-pre:bg-gray-50 dark:prose-pre:bg-gray-800 prose-pre:border prose-pre:border-gray-200 dark:prose-pre:border-gray-700 prose-pre:rounded-lg prose-blockquote:border-l-4 prose-blockquote:border-gray-300 dark:prose-blockquote:border-gray-600 prose-blockquote:pl-4 prose-blockquote:italic prose-strong:text-gray-900 dark:prose-strong:text-white prose-em:text-gray-900 dark:prose-em:text-white prose-ul:list-disc prose-ol:list-decimal prose-li:text-gray-700 dark:prose-li:text-gray-300 prose-table:border-collapse prose-th:border prose-th:border-gray-300 dark:prose-th:border-gray-600 prose-th:bg-gray-50 dark:prose-th:bg-gray-800 prose-th:p-2 prose-td:border prose-td:border-gray-300 dark:prose-td:border-gray-600 prose-td:p-2 markdown-body">
        <div dangerouslySetInnerHTML={{ __html: post.content }} />
      </div>
      
      {/* 作者信息 */}
      <div className="mt-12 p-6 bg-gray-50 dark:bg-gray-800 rounded-xl">
        <div className="flex items-center">
          <div className="w-12 h-12 rounded-full bg-indigo-100 dark:bg-indigo-900 flex items-center justify-center mr-4">
            <span className="text-indigo-600 dark:text-indigo-400 font-bold">
              {post.author.charAt(0)}
            </span>
          </div>
          <div>
            <h3 className="text-lg font-semibold">{post.author}</h3>
            <p className="text-gray-600 dark:text-gray-300">作者</p>
          </div>
        </div>
      </div>
      
      {/* 评论区 */}
      {siteConfig.blog.enableComments && (
        <div className="mt-12">
          <h2 className="text-2xl font-bold mb-6">评论</h2>
          <CommentSection postId={1} />
        </div>
      )}
    </PageLayout>
  );
}