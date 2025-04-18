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
      ...socialLinks,
      [name]: value,
    })
  }

  return (
    <div className="space-y-6">
      <h3 className="text-lg font-medium text-gray-900">社交媒体链接</h3>
      <p className="text-sm text-gray-500">添加您的社交媒体链接，让访问者更容易找到您</p>

      <Tabs defaultValue="domestic" className="w-full">
        <TabsList className="mb-4">
          <TabsTrigger value="domestic">国内平台</TabsTrigger>
          <TabsTrigger value="international">国际平台</TabsTrigger>
          <TabsTrigger value="design">设计社区</TabsTrigger>
          <TabsTrigger value="video">视频平台</TabsTrigger>
          <TabsTrigger value="dev">开发者社区</TabsTrigger>
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
            <InputGroup
              label="脉脉"
              name="maimai"
              type="text"
              value={socialLinks.maimai}
              onChange={handleSocialLinkChange}
              placeholder="https://maimai.cn/contact/detail/yourid"
            />
            <InputGroup
              label="花瓣"
              name="huaban"
              type="text"
              value={socialLinks.huaban}
              onChange={handleSocialLinkChange}
              placeholder="https://huaban.com/yourid"
            />
          </TabsContent>

          <TabsContent value="international" className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <InputGroup
              label="GitHub"
              name="github"
              type="text"
              value={socialLinks.github}
              onChange={handleSocialLinkChange}
              placeholder="https://github.com/yourusername"
            />
            <InputGroup
              label="Twitter"
              name="twitter"
              type="text"
              value={socialLinks.twitter}
              onChange={handleSocialLinkChange}
              placeholder="https://twitter.com/yourusername"
            />
            <InputGroup
              label="Facebook"
              name="facebook"
              type="text"
              value={socialLinks.facebook}
              onChange={handleSocialLinkChange}
              placeholder="https://facebook.com/yourusername"
            />
            <InputGroup
              label="Instagram"
              name="instagram"
              type="text"
              value={socialLinks.instagram}
              onChange={handleSocialLinkChange}
              placeholder="https://instagram.com/yourusername"
            />
            <InputGroup
              label="LinkedIn"
              name="linkedin"
              type="text"
              value={socialLinks.linkedin}
              onChange={handleSocialLinkChange}
              placeholder="https://linkedin.com/in/yourusername"
            />
            <InputGroup
              label="Telegram"
              name="telegram"
              type="text"
              value={socialLinks.telegram}
              onChange={handleSocialLinkChange}
              placeholder="https://t.me/yourusername"
            />
            <InputGroup
              label="Discord"
              name="discord"
              type="text"
              value={socialLinks.discord}
              onChange={handleSocialLinkChange}
              placeholder="https://discord.com/users/yourid"
            />
            <InputGroup
              label="Reddit"
              name="reddit"
              type="text"
              value={socialLinks.reddit}
              onChange={handleSocialLinkChange}
              placeholder="https://reddit.com/user/yourusername"
            />
          </TabsContent>

          <TabsContent value="design" className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <InputGroup
              label="Behance"
              name="behance"
              type="text"
              value={socialLinks.behance}
              onChange={handleSocialLinkChange}
              placeholder="https://behance.net/yourusername"
            />
            <InputGroup
              label="Dribbble"
              name="dribbble"
              type="text"
              value={socialLinks.dribbble}
              onChange={handleSocialLinkChange}
              placeholder="https://dribbble.com/yourusername"
            />
            <InputGroup
              label="CodePen"
              name="codepen"
              type="text"
              value={socialLinks.codepen}
              onChange={handleSocialLinkChange}
              placeholder="https://codepen.io/yourusername"
            />
            <InputGroup
              label="Figma"
              name="figma"
              type="text"
              value={socialLinks.figma}
              onChange={handleSocialLinkChange}
              placeholder="https://figma.com/@yourusername"
            />
            <InputGroup
              label="ArtStation"
              name="artstation"
              type="text"
              value={socialLinks.artstation}
              onChange={handleSocialLinkChange}
              placeholder="https://artstation.com/yourusername"
            />
          </TabsContent>

          <TabsContent value="video" className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <InputGroup
              label="YouTube"
              name="youtube"
              type="text"
              value={socialLinks.youtube}
              onChange={handleSocialLinkChange}
              placeholder="https://youtube.com/@yourusername"
            />
            <InputGroup
              label="Vimeo"
              name="vimeo"
              type="text"
              value={socialLinks.vimeo}
              onChange={handleSocialLinkChange}
              placeholder="https://vimeo.com/yourusername"
            />
          </TabsContent>

          <TabsContent value="dev" className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <InputGroup
              label="Stack Overflow"
              name="stackoverflow"
              type="text"
              value={socialLinks.stackoverflow}
              onChange={handleSocialLinkChange}
              placeholder="https://stackoverflow.com/users/yourid"
            />
            <InputGroup
              label="Medium"
              name="medium"
              type="text"
              value={socialLinks.medium}
              onChange={handleSocialLinkChange}
              placeholder="https://medium.com/@yourusername"
            />
            <InputGroup
              label="Dev.to"
              name="devto"
              type="text"
              value={socialLinks.devto}
              onChange={handleSocialLinkChange}
              placeholder="https://dev.to/yourusername"
            />
            <InputGroup
              label="Hashnode"
              name="hashnode"
              type="text"
              value={socialLinks.hashnode}
              onChange={handleSocialLinkChange}
              placeholder="https://hashnode.com/@yourusername"
            />
          </TabsContent>
        </ScrollArea>
      </Tabs>
    </div>
  )
}
