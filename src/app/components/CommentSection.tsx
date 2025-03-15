"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { 
  getCommentsByPostId, 
  addComment, 
  likeComment, 
  replyToComment,
  formatCommentTime,
  generateAvatar,
  type Comment
} from "../data/commentData";
import { siteConfig } from "../config/siteConfig";

interface CommentSectionProps {
  postId: number;
}

export default function CommentSection({ postId }: CommentSectionProps) {
  const [comments, setComments] = useState<Comment[]>([]);
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [content, setContent] = useState("");
  const [replyTo, setReplyTo] = useState<Comment | null>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState<string | null>(null);
  
  // 获取评论
  useEffect(() => {
    if (siteConfig.blog.enableComments) {
      setComments(getCommentsByPostId(postId));
    }
  }, [postId]);
  
  // 提交评论
  const handleSubmitComment = (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);
    setSuccess(null);
    
    // 验证表单
    if (!name.trim()) {
      setError("请输入您的名字");
      return;
    }
    
    if (!content.trim()) {
      setError("请输入评论内容");
      return;
    }
    
    if (content.length > siteConfig.blog.comments.maxLength) {
      setError(`评论内容不能超过${siteConfig.blog.comments.maxLength}个字符`);
      return;
    }
    
    setIsSubmitting(true);
    
    try {
      let newComment: Comment;
      
      // 如果是回复评论
      if (replyTo) {
        newComment = replyToComment(
          postId,
          replyTo.id,
          name,
          content,
          email,
          email ? undefined : generateAvatar(name)
        ) as Comment;
        
        setReplyTo(null);
      } else {
        // 如果是新评论
        newComment = addComment({
          postId,
          author: name,
          content,
          email,
          avatar: email ? undefined : generateAvatar(name)
        });
      }
      
      // 更新评论列表
      setComments(prev => [newComment, ...prev]);
      setContent("");
      setSuccess("评论提交成功！");
      
      // 如果需要审核，显示提示
      if (siteConfig.blog.comments.requireModeration) {
        setSuccess("评论提交成功，等待审核后显示。");
      }
    } catch (err) {
      setError((err as Error).message || "评论提交失败，请稍后再试");
    } finally {
      setIsSubmitting(false);
    }
  };
  
  // 点赞评论
  const handleLikeComment = (commentId: string) => {
    const updatedComment = likeComment(commentId);
    if (updatedComment) {
      setComments(prev => 
        prev.map(c => c.id === commentId ? updatedComment : c)
      );
    }
  };
  
  // 回复评论
  const handleReplyClick = (comment: Comment) => {
    setReplyTo(comment);
    // 滚动到评论表单
    document.getElementById("comment-form")?.scrollIntoView({ behavior: "smooth" });
  };
  
  // 取消回复
  const handleCancelReply = () => {
    setReplyTo(null);
  };
  
  // 构建评论树
  const buildCommentTree = (comments: Comment[]) => {
    const commentMap = new Map<string, Comment & { replies?: Comment[] }>();
    const rootComments: (Comment & { replies?: Comment[] })[] = [];
    
    // 首先将所有评论添加到映射中
    comments.forEach(comment => {
      commentMap.set(comment.id, { ...comment, replies: [] });
    });
    
    // 然后构建树结构
    comments.forEach(comment => {
      if (comment.parentId) {
        const parent = commentMap.get(comment.parentId);
        if (parent && parent.replies) {
          parent.replies.push(commentMap.get(comment.id) as Comment & { replies?: Comment[] });
        }
      } else {
        rootComments.push(commentMap.get(comment.id) as Comment & { replies?: Comment[] });
      }
    });
    
    return rootComments;
  };
  
  const commentTree = buildCommentTree(comments);
  
  // 渲染单个评论
  const renderComment = (comment: Comment & { replies?: Comment[] }, level = 0) => {
    return (
      <motion.div
        key={comment.id}
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.3 }}
        className={`bg-white dark:bg-gray-800 rounded-lg p-4 mb-4 shadow-sm ${
          level > 0 ? 'ml-8 border-l-4 border-indigo-500' : ''
        }`}
      >
        <div className="flex items-start">
          <img
            src={comment.avatar || generateAvatar(comment.author)}
            alt={comment.author}
            className="w-10 h-10 rounded-full mr-4"
          />
          <div className="flex-1">
            <div className="flex items-center justify-between mb-1">
              <h4 className="font-semibold text-gray-900 dark:text-white">
                {comment.author}
              </h4>
              {siteConfig.blog.comments.showTime && (
                <span className="text-xs text-gray-500 dark:text-gray-400">
                  {formatCommentTime(comment.createdAt)}
                </span>
              )}
            </div>
            <p className="text-gray-700 dark:text-gray-300 mb-2">
              {comment.content}
            </p>
            <div className="flex items-center space-x-4">
              <button
                onClick={() => handleLikeComment(comment.id)}
                className="flex items-center text-sm text-gray-500 dark:text-gray-400 hover:text-indigo-600 dark:hover:text-indigo-400"
              >
                <svg
                  className="w-4 h-4 mr-1"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M14 10h4.764a2 2 0 011.789 2.894l-3.5 7A2 2 0 0115.263 21h-4.017c-.163 0-.326-.02-.485-.06L7 20m7-10V5a2 2 0 00-2-2h-.095c-.5 0-.905.405-.905.905 0 .714-.211 1.412-.608 2.006L7 11v9m7-10h-2M7 20H5a2 2 0 01-2-2v-6a2 2 0 012-2h2.5"
                  />
                </svg>
                {comment.likes} 赞
              </button>
              <button
                onClick={() => handleReplyClick(comment)}
                className="flex items-center text-sm text-gray-500 dark:text-gray-400 hover:text-indigo-600 dark:hover:text-indigo-400"
              >
                <svg
                  className="w-4 h-4 mr-1"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M3 10h10a8 8 0 018 8v2M3 10l6 6m-6-6l6-6"
                  />
                </svg>
                回复
              </button>
            </div>
          </div>
        </div>
        
        {/* 渲染回复 */}
        {comment.replies && comment.replies.length > 0 && (
          <div className="mt-4">
            {comment.replies.map(reply => renderComment(reply, level + 1))}
          </div>
        )}
      </motion.div>
    );
  };
  
  if (!siteConfig.blog.enableComments) {
    return null;
  }
  
  return (
    <div className="mt-12">
      <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-6">
        评论 ({comments.length})
      </h2>
      
      {/* 评论表单 */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.3 }}
        className="bg-white dark:bg-gray-800 rounded-lg p-6 mb-8 shadow-md"
        id="comment-form"
      >
        <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">
          {replyTo ? `回复 ${replyTo.author}` : "发表评论"}
        </h3>
        
        {replyTo && (
          <div className="mb-4 p-3 bg-gray-100 dark:bg-gray-700 rounded-lg">
            <p className="text-sm text-gray-700 dark:text-gray-300">
              <span className="font-semibold">{replyTo.author}:</span> {replyTo.content}
            </p>
            <button
              onClick={handleCancelReply}
              className="text-xs text-indigo-600 dark:text-indigo-400 mt-2"
            >
              取消回复
            </button>
          </div>
        )}
        
        <form onSubmit={handleSubmitComment}>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
            <div>
              <label htmlFor="name" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                名字 <span className="text-red-500">*</span>
              </label>
              <input
                type="text"
                id="name"
                value={name}
                onChange={(e) => setName(e.target.value)}
                className="w-full px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-md bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
                required
              />
            </div>
            <div>
              <label htmlFor="email" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                邮箱 {!siteConfig.blog.comments.allowAnonymous && <span className="text-red-500">*</span>}
              </label>
              <input
                type="email"
                id="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-md bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
                required={!siteConfig.blog.comments.allowAnonymous}
              />
            </div>
          </div>
          <div className="mb-4">
            <label htmlFor="content" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
              评论内容 <span className="text-red-500">*</span>
            </label>
            <textarea
              id="content"
              value={content}
              onChange={(e) => setContent(e.target.value)}
              rows={4}
              className="w-full px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-md bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
              required
              maxLength={siteConfig.blog.comments.maxLength}
            />
            <div className="flex justify-between text-xs text-gray-500 dark:text-gray-400 mt-1">
              <span>支持纯文本</span>
              <span>{content.length}/{siteConfig.blog.comments.maxLength}</span>
            </div>
          </div>
          
          {error && (
            <div className="mb-4 p-3 bg-red-100 dark:bg-red-900/30 text-red-700 dark:text-red-300 rounded-md">
              {error}
            </div>
          )}
          
          {success && (
            <div className="mb-4 p-3 bg-green-100 dark:bg-green-900/30 text-green-700 dark:text-green-300 rounded-md">
              {success}
            </div>
          )}
          
          <div className="flex justify-end">
            <button
              type="submit"
              disabled={isSubmitting}
              className="px-6 py-2 bg-indigo-600 hover:bg-indigo-700 text-white rounded-md shadow-sm transition-colors duration-300 disabled:opacity-50"
            >
              {isSubmitting ? "提交中..." : replyTo ? "回复" : "发表评论"}
            </button>
          </div>
        </form>
      </motion.div>
      
      {/* 评论列表 */}
      <div className="space-y-4">
        <AnimatePresence>
          {commentTree.length > 0 ? (
            commentTree.map(comment => renderComment(comment))
          ) : (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="text-center py-8"
            >
              <p className="text-gray-600 dark:text-gray-400">
                暂无评论，成为第一个评论的人吧！
              </p>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
} 