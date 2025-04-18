export type TemplateType = "minimalist" | "business" | "creative" | "fun"

export interface Project {
  title: string
  description: string
  imageUrl: string
  link: string
}

// 更新 SocialLinks 接口，添加中国本地社交媒体平台
export interface SocialLinks {
  // 国内社交媒体
  wechat: string      // 微信
  weibo: string       // 微博
  bilibili: string    // 哔哩哔哩
  zhihu: string       // 知乎
  douyin: string      // 抖音
  xiaohongshu: string // 小红书
  jike: string        // 即刻
  douban: string      // 豆瓣
  red: string         // 红书
  maimai: string      // 脉脉
  huaban: string      // 花瓣
  
  // 国际社交媒体
  github: string      // GitHub
  twitter: string     // Twitter
  facebook: string    // Facebook
  instagram: string   // Instagram
  linkedin: string    // LinkedIn
  telegram: string    // Telegram
  discord: string     // Discord
  reddit: string      // Reddit
  
  // 设计社区
  behance: string     // Behance
  dribbble: string    // Dribbble
  codepen: string     // CodePen
  figma: string       // Figma
  artstation: string  // ArtStation
  
  // 视频平台
  youtube: string     // YouTube
  vimeo: string       // Vimeo
  
  // 开发者社区
  stackoverflow: string // Stack Overflow
  medium: string       // Medium
  devto: string       // Dev.to
  hashnode: string    // Hashnode
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
    // 国内社交媒体
    wechat?: string
    weibo?: string
    bilibili?: string
    zhihu?: string
    douyin?: string
    xiaohongshu?: string
    jike?: string
    douban?: string
    red?: string
    maimai?: string
    huaban?: string
    
    // 国际社交媒体
    github?: string
    twitter?: string
    facebook?: string
    instagram?: string
    linkedin?: string
    telegram?: string
    discord?: string
    reddit?: string
    
    // 设计社区
    behance?: string
    dribbble?: string
    codepen?: string
    figma?: string
    artstation?: string
    
    // 视频平台
    youtube?: string
    vimeo?: string
    
    // 开发者社区
    stackoverflow?: string
    medium?: string
    devto?: string
    hashnode?: string
  }
  template: string
}
