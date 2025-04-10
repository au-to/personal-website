import { NextRequest, NextResponse } from 'next/server'
import { connectToDatabase } from '@/app/lib/mongodb'
import Comment from '@/app/models/Comment'

export async function POST(request: NextRequest) {
  try {
    const { commentId } = await request.json()
    
    if (!commentId) {
      return NextResponse.json({ error: '缺少评论ID' }, { status: 400 })
    }
    
    await connectToDatabase()
    
    const comment = await Comment.findById(commentId)
    
    if (!comment) {
      return NextResponse.json({ error: '评论不存在' }, { status: 404 })
    }
    
    comment.likes += 1
    await comment.save()
    
    return NextResponse.json(comment)
  } catch (error) {
    console.error('点赞失败', error)
    return NextResponse.json({ error: '点赞失败' }, { status: 500 })
  }
} 