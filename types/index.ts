interface Project {
  title: string
  description: string
  imageUrl: string
  link: string
  date: string
}

export interface SocialLinks {
  linkedin: string | undefined
  twitter: string | undefined
  github: any
  // 国内平台
  wechat?: string
  weibo?: string
  bilibili?: string
  zhihu?: string
  douyin?: string
  xiaohongshu?: string
  jike?: string
  douban?: string
}

export interface UserData {
  name: string
  email: string
  phone: string
  wechat: string
  profession: string
  location: string
  bio: string
  avatar: string
  projects: Project[]
  socialLinks: SocialLinks
}