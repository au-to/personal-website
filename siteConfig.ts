// 网站全局配置

export const siteConfig = {
  // 网站基本信息
  siteName: "Ryan的个人空间",
  logo: '/logo.png',
  title: "欢迎来到我的个人空间",
  description: '探索、创造、分享',
  
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
    
    // 是否启用博客文章分页
    enablePage: true,

    // 每页显示的文章数量
    postsPerPage: 9
  }
}