import { getAllPosts } from "../lib/markdown";
import ClientOnly from "../components/ClientOnly";
import Skeleton from "../components/Skeleton";
import BlogList from "../blog/BlogList";
import { BlogPost as DataBlogPost } from "../data/blogData";

// 获取所有分类和文章
export default async function BlogPage() {
  const markdownPosts = await getAllPosts();
  
  // 转换为与blogData.ts中相同的BlogPost类型
  const posts: DataBlogPost[] = markdownPosts.map((post, index) => ({
    ...post,
    id: index + 1, // 使用索引加1确保每篇文章有唯一ID
    readTime: `${Math.ceil(post.content.length / 1000)} 分钟`, // 估算阅读时间
  }));
  
  const allCategories = ["全部", ...Array.from(new Set(posts.map(post => post.category)))];
  
  return (
    <ClientOnly fallback={<BlogSkeleton />}>
      <BlogList posts={posts} categories={allCategories} />
    </ClientOnly>
  );
}

// 骨架屏
function BlogSkeleton() {
  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-50 to-white dark:from-gray-900 dark:to-gray-800">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
        <div className="text-center mb-16">
          <Skeleton type="title" className="mx-auto mb-4 animate-pulse" />
          <Skeleton type="text" width="w-3/4" className="mx-auto animate-pulse" />
        </div>
        <div className="mb-8">
          <Skeleton type="text" height="h-12" className="animate-pulse" />
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {[1, 2, 3, 4, 5, 6].map((i) => (
            <Skeleton key={i} type="blog-card" className="h-80 animate-pulse" />
          ))}
        </div>
      </div>
    </div>
  );
}