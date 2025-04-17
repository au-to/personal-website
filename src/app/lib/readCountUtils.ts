import { createHash } from 'crypto'
import { NextRequest } from 'next/server'
import { headers } from 'next/headers'

// 存储缓存的阅读计数
const readCountCache: { [key: string]: number } = {}

// 缓存过期时间（5分钟，单位：毫秒）
const CACHE_EXPIRY_TIME = 5 * 60 * 1000

// 缓存最后更新时间
const cacheLastUpdated: { [key: string]: number } = {}

/**
 * 生成访问者ID（IP + UserAgent的哈希）
 */
export function generateVisitorId(request: NextRequest): string {
  // 获取IP地址
  const ip = request.headers.get('x-forwarded-for') || 'unknown-ip'
  
  // 获取User Agent
  const userAgent = request.headers.get('user-agent') || 'unknown-agent'
  
  // 组合并哈希
  const visitorData = `${ip}-${userAgent}`
  const hash = createHash('sha256').update(visitorData).digest('hex')
  
  return hash
}

/**
 * 获取访问者ID（服务器组件版本）
 */
export async function generateVisitorIdServer(): Promise<string> {
  const headersList = await headers()
  
  // 获取IP地址
  const ip = headersList.get('x-forwarded-for') || 'unknown-ip'
  
  // 获取User Agent
  const userAgent = headersList.get('user-agent') || 'unknown-agent'
  
  // 组合并哈希
  const visitorData = `${ip}-${userAgent}`
  const hash = createHash('sha256').update(visitorData).digest('hex')
  
  return hash
}

/**
 * 从缓存中获取文章阅读计数
 */
export function getCachedReadCount(slug: string): number | null {
  // 如果缓存中有该文章的阅读计数，且未过期，则返回缓存的值
  if (
    readCountCache[slug] !== undefined && 
    cacheLastUpdated[slug] && 
    Date.now() - cacheLastUpdated[slug] < CACHE_EXPIRY_TIME
  ) {
    return readCountCache[slug]
  }
  
  return null
}

/**
 * 更新缓存中的阅读计数
 */
export function updateCachedReadCount(slug: string, count: number): void {
  readCountCache[slug] = count
  cacheLastUpdated[slug] = Date.now()
}

/**
 * 格式化阅读计数显示
 */
export function formatReadCount(count: number): string {
  if (count < 1000) return count.toString()
  if (count < 10000) return (count / 1000).toFixed(1) + 'K'
  return (count / 10000).toFixed(1) + 'W'
} 