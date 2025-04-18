import mongoose from 'mongoose'

const CommentSchema = new mongoose.Schema({
  postId: { 
    type: String, 
    required: true,
    index: true
  },
  author: { 
    type: String, 
    required: true 
  },
  email: String,
  content: { 
    type: String, 
    required: true 
  },
  createdAt: { 
    type: Date, 
    default: Date.now 
  },
  avatar: String,
  parentId: String,
  isApproved: { 
    type: Boolean, 
    default: true 
  },
  likes: { 
    type: Number, 
    default: 0 
  }
})

// 检查模型是否已经存在，避免热重载时重复定义
export default mongoose.models.Comment || mongoose.model('Comment', CommentSchema) 