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
  // 记录访问者信息
  visitors: [{ 
    // 访问者标识（IP+UserAgent的哈希值）
    visitorId: { 
      type: String, 
      required: true 
    },
    // 访问时间
    visitedAt: { 
      type: Date, 
      default: Date.now 
    }
  }],
  // 最后更新时间
  updatedAt: { 
    type: Date, 
    default: Date.now 
  }
})

// 添加复合索引，用于快速查询特定访问者
ReadCountSchema.index({ slug: 1, 'visitors.visitorId': 1 })

// 检查模型是否已经存在，避免热重载时重复定义
export default mongoose.models.ReadCount || mongoose.model('ReadCount', ReadCountSchema) 