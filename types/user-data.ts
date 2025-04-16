export type TemplateType = "minimalist" | "business" | "creative" | "fun"

export interface Project {
  title: string
  description: string
  imageUrl: string
  link: string
}

// 更新 SocialLinks 接口，添加中国本地社交媒体平台
export interface SocialLinks {
  wechat: string
  weibo: string
  github: string
  jike: string // 即刻
  xiaohongshu: string // 小红书
  douyin: string // 抖音
  bilibili: string // 哔哩哔哩
}

export interface UserData {
  name: string
  wechat: string
  email: string
  phone: string
  bio: string
  location: string
  profession: string
  avatar: string
  projects: Project[]
  socialLinks: SocialLinks
}
