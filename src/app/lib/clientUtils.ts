'use client';

// 阅读计数相关函数
let readCounts: { [key: string]: number } = {};

/**
 * 增加文章阅读计数
 * 使用API调用存储阅读计数到数据库
 */
export async function incrementReadCount(slug: string): Promise<number> {
  if (typeof window === 'undefined') {
    return 0;
  }

  // 解码URL编码的slug
  const decodedSlug = decodeURIComponent(slug);

  try {
    // 调用API增加阅读计数
    const response = await fetch('/api/read-count', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ slug: decodedSlug }),
    });

    if (!response.ok) {
      console.error('增加阅读计数失败', await response.text());
      return readCounts[decodedSlug] || 0;
    }

    const data = await response.json();
    
    // 更新本地缓存
    readCounts[decodedSlug] = data.count;
    return data.count;
  } catch (error) {
    console.error('增加阅读计数失败', error);
    return readCounts[decodedSlug] || 0;
  }
}

/**
 * 获取文章阅读计数
 */
export async function getReadCount(slug: string): Promise<number> {
  if (typeof window === 'undefined') {
    return 0;
  }

  // 解码URL编码的slug
  const decodedSlug = decodeURIComponent(slug);

  // 如果本地有缓存，直接返回
  if (readCounts[decodedSlug] !== undefined) {
    return readCounts[decodedSlug];
  }

  try {
    // 调用API获取阅读计数
    const response = await fetch(`/api/read-count?slug=${encodeURIComponent(decodedSlug)}`);

    if (!response.ok) {
      console.error('获取阅读计数失败', await response.text());
      return 0;
    }

    const data = await response.json();
    
    // 更新本地缓存
    readCounts[decodedSlug] = data.count;
    return data.count;
  } catch (error) {
    console.error('获取阅读计数失败', error);
    return 0;
  }
}

/**
 * 格式化阅读计数
 */
export function formatReadCount(count: number): string {
  if (count < 1000) return count.toString();
  if (count < 10000) return (count / 1000).toFixed(1) + 'K';
  return (count / 10000).toFixed(1) + 'W';
} 