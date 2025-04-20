export type TemplateType = "minimalist" | "business" | "creative" | "fun"

export interface Project {
  title: string
  description: string
  imageUrl: string
  link: string
}

// 社交媒体平台接口
export interface SocialLinks {
  wechat?: string      // 微信
  weibo?: string       // 微博
  bilibili?: string    // 哔哩哔哩
  zhihu?: string       // 知乎
  douyin?: string      // 抖音
  xiaohongshu?: string // 小红书
  jike?: string        // 即刻
  douban?: string      // 豆瓣
}

export interface UserData {
  name: string
  avatar?: string
  profession?: string
  bio: string
  email: string
  phone: string
  wechat: string
  location?: string
  skills?: Array<{
    category: string
    items: string[]
  }>
  projects?: Array<{
    title: string
    description?: string
    imageUrl?: string
    link?: string
  }>
  socialLinks: {
    wechat?: string
    weibo?: string
    bilibili?: string
    zhihu?: string
    douyin?: string
    xiaohongshu?: string
    jike?: string
    douban?: string
  }
  template: string
}
