"use client"

import type React from "react"

import type { SocialLinks } from "@/types/user-data"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"

interface SocialLinksFormProps {
  socialLinks: SocialLinks
  onChange: (socialLinks: SocialLinks) => void
}

export function SocialLinksForm({ socialLinks, onChange }: SocialLinksFormProps) {
  // 直接使用父组件传入的状态，简化实现
  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target
    // 直接调用父组件的onChange，与projects-form保持一致的模式
    onChange({
      ...socialLinks,
      [name]: value
    })
  }

  return (
    <div className="space-y-6">
      <div>
        <h3 className="text-lg font-medium">社交媒体链接</h3>
        <p className="text-sm text-muted-foreground">添加您的社交媒体链接，让访问者更容易找到您</p>
      </div>
  
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="space-y-2">
          <Label htmlFor="wechat-link">微信</Label>
          <Input
            id="wechat-link"
            name="wechat"
            value={socialLinks.wechat || ''}
            onChange={handleInputChange}
            placeholder="https://weixin.qq.com/yourpage"
          />
        </div>
        
        <div className="space-y-2">
          <Label htmlFor="weibo-link">微博</Label>
          <Input
            id="weibo-link"
            name="weibo"
            value={socialLinks.weibo || ''}
            onChange={handleInputChange}
            placeholder="https://weibo.com/yourusername"
          />
        </div>
        
        <div className="space-y-2">
          <Label htmlFor="bilibili-link">哔哩哔哩</Label>
          <Input
            id="bilibili-link"
            name="bilibili"
            value={socialLinks.bilibili || ''}
            onChange={handleInputChange}
            placeholder="https://space.bilibili.com/yourid"
          />
        </div>
        
        <div className="space-y-2">
          <Label htmlFor="zhihu-link">知乎</Label>
          <Input
            id="zhihu-link"
            name="zhihu"
            value={socialLinks.zhihu || ''}
            onChange={handleInputChange}
            placeholder="https://www.zhihu.com/people/yourid"
          />
        </div>
        
        <div className="space-y-2">
          <Label htmlFor="douyin-link">抖音</Label>
          <Input
            id="douyin-link"
            name="douyin"
            value={socialLinks.douyin || ''}
            onChange={handleInputChange}
            placeholder="https://www.douyin.com/user/yourid"
          />
        </div>
        
        <div className="space-y-2">
          <Label htmlFor="xiaohongshu-link">小红书</Label>
          <Input
            id="xiaohongshu-link"
            name="xiaohongshu"
            value={socialLinks.xiaohongshu || ''}
            onChange={handleInputChange}
            placeholder="https://www.xiaohongshu.com/user/yourid"
          />
        </div>
        
        <div className="space-y-2">
          <Label htmlFor="jike-link">即刻</Label>
          <Input
            id="jike-link"
            name="jike"
            value={socialLinks.jike || ''}
            onChange={handleInputChange}
            placeholder="https://web.okjike.com/u/yourid"
          />
        </div>
        
        <div className="space-y-2">
          <Label htmlFor="douban-link">豆瓣</Label>
          <Input
            id="douban-link"
            name="douban"
            value={socialLinks.douban || ''}
            onChange={handleInputChange}
            placeholder="https://www.douban.com/people/yourid"
          />
        </div>
      </div>
    </div>
  )
}
