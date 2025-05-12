export interface Project {
  title: string        // 项目标题
  description: string  // 项目描述
  imageUrl: string     // 项目图片URL
  link: string         // 项目链接
}

export interface SocialLinks {
  wechat?: string      // 微信
  weibo?: string       // 微博
  github?: string      // GitHub
  linkedin?: string    // LinkedIn
  twitter?: string     // Twitter
  // 国内平台
  bilibili?: string
  zhihu?: string
  douyin?: string
  xiaohongshu?: string
  jike?: string
  douban?: string
}

export interface UserData {
  name: string          // 用户姓名
  email: string         // 电子邮件
  phone: string         // 电话号码
  wechat: string        // 微信号
  profession: string    // 职业
  location: string      // 位置
  bio: string          // 个人简介
  avatar: string       // 头像URL
  projects: Project[]   // 项目列表
  socialLinks: SocialLinks  // 社交媒体链接
}