"use client"

import type React from "react"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { ScrollArea } from "@/components/ui/scroll-area"
import type { SocialLinks } from "@/types"
import InputGroup from "@/components/InputGroup"

interface SocialLinksSectionProps {
  socialLinks: SocialLinks
  onChange: (socialLinks: SocialLinks) => void
}

export default function SocialLinksSection({ socialLinks, onChange }: SocialLinksSectionProps) {
  const handleSocialLinkChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target
    onChange({
      ...socialLinks,  // 保留所有现有的社交链接
      [name]: value    // 只更新变化的字段
    })
  }

  return (
    <div className="space-y-6">
      <h3 className="text-lg font-medium text-gray-900">社交媒体链接</h3>
      <p className="text-sm text-gray-500">添加您的社交媒体链接，让访问者更容易找到您</p>

      <Tabs defaultValue="domestic" className="w-full">
        <TabsList className="mb-4">
          <TabsTrigger value="domestic">国内平台</TabsTrigger>

        </TabsList>

        <ScrollArea className="h-[400px] pr-4">
          <TabsContent value="domestic" className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <InputGroup
              label="微信"
              name="wechat"
              type="text"
              value={socialLinks.wechat}
              onChange={handleSocialLinkChange}
              placeholder="https://weixin.qq.com/yourpage"
            />
            <InputGroup
              label="微博"
              name="weibo"
              type="text"
              value={socialLinks.weibo}
              onChange={handleSocialLinkChange}
              placeholder="https://weibo.com/yourusername"
            />
            <InputGroup
              label="哔哩哔哩"
              name="bilibili"
              type="text"
              value={socialLinks.bilibili}
              onChange={handleSocialLinkChange}
              placeholder="https://space.bilibili.com/yourid"
            />
            <InputGroup
              label="知乎"
              name="zhihu"
              type="text"
              value={socialLinks.zhihu}
              onChange={handleSocialLinkChange}
              placeholder="https://www.zhihu.com/people/yourid"
            />
            <InputGroup
              label="抖音"
              name="douyin"
              type="text"
              value={socialLinks.douyin}
              onChange={handleSocialLinkChange}
              placeholder="https://www.douyin.com/user/yourid"
            />
            <InputGroup
              label="小红书"
              name="xiaohongshu"
              type="text"
              value={socialLinks.xiaohongshu}
              onChange={handleSocialLinkChange}
              placeholder="https://www.xiaohongshu.com/user/profile/yourid"
            />
            <InputGroup
              label="即刻"
              name="jike"
              type="text"
              value={socialLinks.jike}
              onChange={handleSocialLinkChange}
              placeholder="https://web.okjike.com/u/yourid"
            />
            <InputGroup
              label="豆瓣"
              name="douban"
              type="text"
              value={socialLinks.douban}
              onChange={handleSocialLinkChange}
              placeholder="https://www.douban.com/people/yourid"
            />
          </TabsContent>
        </ScrollArea>
      </Tabs>
    </div>
  )
}
