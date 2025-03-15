// 网站全局配置

export const siteConfig = {
  // 网站基本信息
  siteName: "我的个人空间",
  siteDescription: "分享技术、项目和个人成长",
  
  // 博客功能配置
  blog: {
    // 是否启用阅读计数
    enableReadCount: true,
    
    // 是否在列表页显示阅读计数
    showReadCountInList: true,
    
    // 是否启用评论功能
    enableComments: true,
    
    // 评论功能配置
    comments: {
      // 是否需要审核评论
      requireModeration: false,
      
      // 是否允许匿名评论
      allowAnonymous: true,
      
      // 评论最大长度
      maxLength: 500,
      
      // 是否显示评论时间
      showTime: true
    },
    
    // 是否启用分享功能（预留）
    enableShare: false,
    
    // 每页显示的文章数量（预留分页功能）
    postsPerPage: 9
  }
}; 