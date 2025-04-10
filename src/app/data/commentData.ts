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

// 获取评论API
export async function fetchCommentsByPostId(postId: number | string): Promise<Comment[]> {
  if (!siteConfig.blog.enableComments) {
    return []
  }
  
  const numericPostId = typeof postId === 'string' ? parseInt(postId.replace(/[^0-9]/g, '')) || 1 : postId
  
  try {
    const response = await fetch(`/api/comments?postId=${numericPostId}`)
    
    if (!response.ok) {
      throw new Error('获取评论失败')
    }
    
    const comments = await response.json()
    return comments.map((comment: any) => ({
      ...comment,
      id: comment._id
    }))
  } catch (error) {
    console.error('获取评论失败', error)
    return []
  }
}

// 添加评论API
export const submitComment = async (comment: Omit<Comment, 'id' | 'createdAt' | 'isApproved' | 'likes'>): Promise<Comment> => {
  if (!siteConfig.blog.enableComments) {
    throw new Error("评论功能未启用")
  }
  
  const response = await fetch('/api/comments', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(comment)
  })
  
  if (!response.ok) {
    const error = await response.json()
    throw new Error(error.error || '评论提交失败')
  }
  
  const newComment = await response.json()
  return {
    ...newComment,
    id: newComment._id
  }
}

// 点赞评论API
export const likeCommentApi = async (commentId: string): Promise<Comment | null> => {
  const response = await fetch('/api/comments/like', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({ commentId })
  })
  
  if (!response.ok) {
    return null
  }
  
  const updatedComment = await response.json()
  return {
    ...updatedComment,
    id: updatedComment._id
  }
}

// 格式化评论时间
export const formatCommentTime = (dateString: string): string => {
  const date = new Date(dateString)
  const now = new Date()
  const diffMs = now.getTime() - date.getTime()
  const diffSec = Math.floor(diffMs / 1000)
  const diffMin = Math.floor(diffSec / 60)
  const diffHour = Math.floor(diffMin / 60)
  const diffDay = Math.floor(diffHour / 24)
  
  if (diffSec < 60) return "刚刚"
  if (diffMin < 60) return `${diffMin}分钟前`
  if (diffHour < 24) return `${diffHour}小时前`
  if (diffDay < 30) return `${diffDay}天前`
  
  return date.toLocaleDateString('zh-CN', { 
    year: 'numeric', 
    month: 'long', 
    day: 'numeric' 
  })
}

// 生成随机头像
export const generateAvatar = (name: string): string => {
  // 使用名字的首字母作为种子生成随机数
  const seed = name.charCodeAt(0) || 0
  const randomNum = (seed % 100) + 1
  const gender = randomNum % 2 === 0 ? 'men' : 'women'
  
  return `https://randomuser.me/api/portraits/${gender}/${randomNum}.jpg`
}