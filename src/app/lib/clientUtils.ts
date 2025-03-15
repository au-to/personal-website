'use client';

// 阅读计数相关函数
let readCounts: { [key: string]: number } = {};

export function incrementReadCount(slug: string): number {
  if (typeof window === 'undefined') {
    return 0;
  }

  // 解码URL编码的slug
  const decodedSlug = decodeURIComponent(slug);

  // 从 localStorage 获取阅读历史
  const readHistory = JSON.parse(localStorage.getItem('readHistory') || '{}');
  
  // 如果这篇文章已经被阅读过，直接返回当前阅读数
  if (readHistory[decodedSlug]) {
    return readCounts[decodedSlug] || 0;
  }

  // 更新阅读历史
  readHistory[decodedSlug] = true;
  localStorage.setItem('readHistory', JSON.stringify(readHistory));

  // 增加阅读计数
  readCounts[decodedSlug] = (readCounts[decodedSlug] || 0) + 1;
  return readCounts[decodedSlug];
}

// 格式化阅读计数
export function formatReadCount(count: number): string {
  if (count < 1000) return count.toString();
  if (count < 10000) return (count / 1000).toFixed(1) + 'K';
  return (count / 10000).toFixed(1) + 'W';
} 