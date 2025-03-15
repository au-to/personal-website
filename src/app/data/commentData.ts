// 评论数据模型和相关功能

import { siteConfig } from "../config/siteConfig";

// 评论接口定义
export interface Comment {
  id: string;
  postId: number;
  author: string;
  email?: string;
  content: string;
  createdAt: string;
  avatar?: string;
  parentId?: string;
  isApproved: boolean;
  likes: number;
}

// 模拟评论数据
let commentsData: Comment[] = [
  {
    id: "c1",
    postId: 1,
    author: "张三",
    email: "zhangsan@example.com",
    content: "这篇文章写得非常好，对我帮助很大！",
    createdAt: "2023-10-15T08:30:00Z",
    avatar: "https://randomuser.me/api/portraits/men/1.jpg",
    isApproved: true,
    likes: 5
  },
  {
    id: "c2",
    postId: 1,
    author: "李四",
    email: "lisi@example.com",
    content: "我有一个问题，文章中提到的第三点具体是如何实现的？",
    createdAt: "2023-10-15T09:45:00Z",
    avatar: "https://randomuser.me/api/portraits/men/2.jpg",
    isApproved: true,
    likes: 2
  },
  {
    id: "c3",
    postId: 1,
    parentId: "c2",
    author: "作者",
    email: "author@example.com",
    content: "你好，关于第三点的实现，你可以参考文章中的代码示例，如果有疑问可以继续提问。",
    createdAt: "2023-10-15T10:20:00Z",
    avatar: "https://randomuser.me/api/portraits/men/3.jpg",
    isApproved: true,
    likes: 3
  },
  {
    id: "c4",
    postId: 2,
    author: "王五",
    email: "wangwu@example.com",
    content: "TypeScript确实能提高代码质量，我们团队也在使用。",
    createdAt: "2023-10-16T14:10:00Z",
    avatar: "https://randomuser.me/api/portraits/men/4.jpg",
    isApproved: true,
    likes: 7
  },
  {
    id: "c5",
    postId: 3,
    author: "赵六",
    email: "zhaoliu@example.com",
    content: "Next.js的应用路由确实比页面路由更灵活，感谢分享！",
    createdAt: "2023-10-17T11:05:00Z",
    avatar: "https://randomuser.me/api/portraits/men/5.jpg",
    isApproved: true,
    likes: 4
  }
];

// 根据文章ID获取评论
export function getCommentsByPostId(postId: number | string): Comment[] {
  // 如果评论功能未启用，返回空数组
  if (!siteConfig.blog.enableComments) {
    return [];
  }
  
  // 如果postId是字符串，尝试转换为数字
  const numericPostId = typeof postId === 'string' ? parseInt(postId.replace(/[^0-9]/g, '')) || 1 : postId;
  
  // 过滤评论
  return commentsData
    .filter(comment => 
      comment.postId === numericPostId && 
      (comment.isApproved || !siteConfig.blog.comments.requireModeration)
    )
    .sort((a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime());
}

// 添加评论
export const addComment = (comment: Omit<Comment, 'id' | 'createdAt' | 'isApproved' | 'likes'>): Comment => {
  // 如果评论功能未启用，抛出错误
  if (!siteConfig.blog.enableComments) {
    throw new Error("评论功能未启用");
  }
  
  // 创建新评论
  const newComment: Comment = {
    ...comment,
    id: `c${Date.now()}`,
    createdAt: new Date().toISOString(),
    isApproved: !siteConfig.blog.comments.requireModeration,
    likes: 0
  };
  
  // 添加到评论数据中
  commentsData = [...commentsData, newComment];
  
  return newComment;
};

// 点赞评论
export const likeComment = (commentId: string): Comment | null => {
  const commentIndex = commentsData.findIndex(c => c.id === commentId);
  if (commentIndex === -1) return null;
  
  // 更新点赞数
  commentsData[commentIndex] = {
    ...commentsData[commentIndex],
    likes: commentsData[commentIndex].likes + 1
  };
  
  return commentsData[commentIndex];
};

// 回复评论
export const replyToComment = (
  postId: number,
  parentId: string,
  author: string,
  content: string,
  email?: string,
  avatar?: string
): Comment | null => {
  // 检查父评论是否存在
  const parentComment = commentsData.find(c => c.id === parentId);
  if (!parentComment) return null;
  
  // 创建回复评论
  return addComment({
    postId,
    parentId,
    author,
    content,
    email,
    avatar
  });
};

// 格式化评论时间
export const formatCommentTime = (dateString: string): string => {
  const date = new Date(dateString);
  const now = new Date();
  const diffMs = now.getTime() - date.getTime();
  const diffSec = Math.floor(diffMs / 1000);
  const diffMin = Math.floor(diffSec / 60);
  const diffHour = Math.floor(diffMin / 60);
  const diffDay = Math.floor(diffHour / 24);
  
  if (diffSec < 60) return "刚刚";
  if (diffMin < 60) return `${diffMin}分钟前`;
  if (diffHour < 24) return `${diffHour}小时前`;
  if (diffDay < 30) return `${diffDay}天前`;
  
  return date.toLocaleDateString('zh-CN', { 
    year: 'numeric', 
    month: 'long', 
    day: 'numeric' 
  });
};

// 生成随机头像
export const generateAvatar = (name: string): string => {
  // 使用名字的首字母作为种子生成随机数
  const seed = name.charCodeAt(0) || 0;
  const randomNum = (seed % 100) + 1;
  const gender = randomNum % 2 === 0 ? 'men' : 'women';
  
  return `https://randomuser.me/api/portraits/${gender}/${randomNum}.jpg`;
}; 