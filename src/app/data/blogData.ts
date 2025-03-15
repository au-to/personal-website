// 定义博客文章类型
export interface BlogPost {
  id?: number;  // 可选的 id 字段
  title: string;
  slug: string;
  excerpt: string;
  content?: string;
  date: string;
  author: string;
  category: string;
  tags: string[];
  readTime: string;
  imageUrl: string;
  readCount: number;
}

// 博客文章数据
export const blogPosts: BlogPost[] = [];

// 获取所有分类
export const getAllCategories = () => {
  return ["全部", ...Array.from(new Set(blogPosts.map(post => post.category)))];
};

// 根据ID获取文章
export const getPostById = (id: string | number) => {
  const numId = typeof id === 'string' ? parseInt(id, 10) : id;
  return blogPosts.find(post => post.id === numId);
};

// 获取相关文章
export const getRelatedPosts = (id: number, category: string, limit: number = 3) => {
  return blogPosts
    .filter(post => post.id !== id && post.category === category)
    .slice(0, limit);
};

// 阅读计数相关功能
// 使用localStorage存储阅读记录，避免重复计数
const READ_HISTORY_KEY = 'blog_read_history';

// 获取阅读历史
export const getReadHistory = (): number[] => {
  if (typeof window === 'undefined') return [];
  
  try {
    const history = localStorage.getItem(READ_HISTORY_KEY);
    return history ? JSON.parse(history) : [];
  } catch (error) {
    console.error('Failed to get read history:', error);
    return [];
  }
};

// 保存阅读历史
export const saveReadHistory = (postIds: number[]): void => {
  if (typeof window === 'undefined') return;
  
  try {
    localStorage.setItem(READ_HISTORY_KEY, JSON.stringify(postIds));
  } catch (error) {
    console.error('Failed to save read history:', error);
  }
};

// 增加文章阅读计数
export const incrementReadCount = (postId: number): number => {
  if (typeof window === 'undefined') return 0;
  
  // 检查是否已经阅读过
  const history = getReadHistory();
  if (history.includes(postId)) {
    const post = getPostById(postId);
    return post?.readCount || 0;
  }

  // 更新阅读历史
  saveReadHistory([...history, postId]);
  
  // 在实际应用中，这里应该调用API来增加阅读计数
  // 这里我们只是模拟这个过程，实际上这种方式不会持久化
  const post = getPostById(postId);
  if (post) {
    post.readCount += 1;
    return post.readCount;
  }
  
  return 0;
};

// 格式化阅读计数
export const formatReadCount = (count: number): string => {
  if (count < 1000) return count.toString();
  if (count < 10000) return (count / 1000).toFixed(1) + 'K';
  return (count / 10000).toFixed(1) + 'W';
};