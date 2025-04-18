import { NextRequest, NextResponse } from 'next/server'
import { connectToDatabase } from '@/app/lib/mongodb'
import Comment from '@/app/models/Comment'
import { siteConfig } from '@/app/config/siteConfig'

// 获取评论列表
export async function GET(request: NextRequest) {
  const searchParams = request.nextUrl.searchParams
  const postId = searchParams.get('postId')
  
  if (!postId) {
    return NextResponse.json({ error: '缺少文章ID' }, { status: 400 })
  }

  try {
    await connectToDatabase()
    
    const comments = await Comment.find({ 
      postId: postId,
      isApproved: true
    }).sort({ createdAt: -1 })
    
    return NextResponse.json(comments)
  } catch (error) {
    console.error('获取评论失败', error)
    return NextResponse.json({ error: '获取评论失败' }, { status: 500 })
  }
}

// 添加新评论
export async function POST(request: NextRequest) {
  if (!siteConfig.blog.enableComments) {
    return NextResponse.json({ error: '评论功能未启用' }, { status: 403 })
  }
  
  try {
    const body = await request.json()
    
    await connectToDatabase()
    
    // 设置审核状态
    const isApproved = !siteConfig.blog.comments.requireModeration
    
    const newComment = new Comment({
      ...body,
      isApproved
    })
    
    await newComment.save()
    
    return NextResponse.json(newComment)
  } catch (error) {
    console.error('添加评论失败', error)
    return NextResponse.json({ error: '添加评论失败' }, { status: 500 })
  }
} 