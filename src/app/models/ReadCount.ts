import mongoose from 'mongoose'

const ReadCountSchema = new mongoose.Schema({
  // 文章标识符
  slug: { 
    type: String, 
    required: true,
    unique: true,
    index: true
  },
  // 总阅读计数
  count: { 
    type: Number, 
    default: 0,
    required: true 
  },
  // 最后更新时间
  updatedAt: { 
    type: Date, 
    default: Date.now 
  }
})

// 检查模型是否已经存在，避免热重载时重复定义
export default mongoose.models.ReadCount || mongoose.model('ReadCount', ReadCountSchema) 