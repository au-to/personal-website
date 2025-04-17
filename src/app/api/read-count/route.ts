import { NextRequest, NextResponse } from 'next/server'
import { connectToDatabase } from '@/app/lib/mongodb'
import ReadCount from '@/app/models/ReadCount'
import { 
  generateVisitorId, 
  getCachedReadCount, 
  updateCachedReadCount 
} from '@/app/lib/readCountUtils'

// 获取文章阅读计数
export async function GET(request: NextRequest) {
  const searchParams = request.nextUrl.searchParams
  const slug = searchParams.get('slug')
  
  if (!slug) {
    return NextResponse.json({ error: '缺少文章标识符' }, { status: 400 })
  }

  try {
    // 尝试从缓存获取阅读计数
    const cachedCount = getCachedReadCount(slug)
    if (cachedCount !== null) {
      return NextResponse.json({ count: cachedCount })
    }

    // 连接数据库
    await connectToDatabase()
    
    // 查询数据库获取阅读计数
    const readCount = await ReadCount.findOne({ slug })
    const count = readCount?.count || 0
    
    // 更新缓存
    updateCachedReadCount(slug, count)
    
    return NextResponse.json({ count })
  } catch (error) {
    console.error('获取阅读计数失败', error)
    return NextResponse.json({ error: '获取阅读计数失败' }, { status: 500 })
  }
}

// 增加文章阅读计数
export async function POST(request: NextRequest) {
  try {
    const { slug } = await request.json()
    
    if (!slug) {
      return NextResponse.json({ error: '缺少文章标识符' }, { status: 400 })
    }

    // 生成访问者ID
    const visitorId = generateVisitorId(request)
    
    // 连接数据库
    await connectToDatabase()
    
    // 查找或创建阅读计数文档
    let readCount = await ReadCount.findOne({ slug })
    
    if (!readCount) {
      // 如果不存在，创建新记录
      readCount = new ReadCount({
        slug,
        count: 0,
        visitors: []
      })
    }
    
    // 检查此访问者是否已经被记录
    const existingVisitor = readCount.visitors.find(
      (v: any) => v.visitorId === visitorId
    )
    
    if (!existingVisitor) {
      // 如果是新访问者，增加计数并记录访问
      readCount.count += 1
      readCount.visitors.push({
        visitorId,
        visitedAt: new Date()
      })
      
      // 更新最后访问时间
      readCount.updatedAt = new Date()
      
      await readCount.save()
      
      // 更新缓存
      updateCachedReadCount(slug, readCount.count)
    }
    
    return NextResponse.json({ count: readCount.count })
  } catch (error) {
    console.error('更新阅读计数失败', error)
    return NextResponse.json({ error: '更新阅读计数失败' }, { status: 500 })
  }
} 