"use client"

import type React from "react"

import type { SocialLinks } from "@/types/user-data"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"

interface SocialLinksFormProps {
  socialLinks: SocialLinks
  onChange: (socialLinks: SocialLinks) => void
}

// 更新社交媒体表单，替换 LinkedIn 和 Twitter 为中国本地平台
export function SocialLinksForm({ socialLinks, onChange }: SocialLinksFormProps) {
  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target
    onChange({
      ...socialLinks,
      [name]: value,
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
          <Label htmlFor="wechat-link">微信公众号</Label>
          <Input
            id="wechat-link"
            name="wechat"
            value={socialLinks.wechat}
            onChange={handleInputChange}
            placeholder="https://weixin.qq.com/yourpage"
          />
        </div>

        <div className="space-y-2">
          <Label htmlFor="weibo-link">微博</Label>
          <Input
            id="weibo-link"
            name="weibo"
            value={socialLinks.weibo}
            onChange={handleInputChange}
            placeholder="https://weibo.com/yourusername"
          />
        </div>

        <div className="space-y-2">
          <Label htmlFor="github-link">GitHub</Label>
          <Input
            id="github-link"
            name="github"
            value={socialLinks.github}
            onChange={handleInputChange}
            placeholder="https://github.com/yourusername"
          />
        </div>

        <div className="space-y-2">
          <Label htmlFor="jike-link">即刻</Label>
          <Input
            id="jike-link"
            name="jike"
            value={socialLinks.jike}
            onChange={handleInputChange}
            placeholder="https://okjike.com/u/yourusername"
          />
        </div>

        <div className="space-y-2">
          <Label htmlFor="xiaohongshu-link">小红书</Label>
          <Input
            id="xiaohongshu-link"
            name="xiaohongshu"
            value={socialLinks.xiaohongshu}
            onChange={handleInputChange}
            placeholder="https://www.xiaohongshu.com/user/profile/yourusername"
          />
        </div>

        <div className="space-y-2">
          <Label htmlFor="douyin-link">抖音</Label>
          <Input
            id="douyin-link"
            name="douyin"
            value={socialLinks.douyin}
            onChange={handleInputChange}
            placeholder="https://www.douyin.com/user/yourusername"
          />
        </div>

        <div className="space-y-2">
          <Label htmlFor="bilibili-link">哔哩哔哩</Label>
          <Input
            id="bilibili-link"
            name="bilibili"
            value={socialLinks.bilibili}
            onChange={handleInputChange}
            placeholder="https://space.bilibili.com/yourusername"
          />
        </div>
      </div>
    </div>
  )
}
