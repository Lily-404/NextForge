"use client"

import type React from "react"

import type { SocialLinks } from "@/types/user-data"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"

interface SocialLinksFormProps {
  socialLinks: SocialLinks
  onChange: (socialLinks: SocialLinks) => void
}

export function SocialLinksForm({ socialLinks, onChange }: SocialLinksFormProps) {
  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target
    onChange({
      ...socialLinks,
      [name]: value,
    })
  }

  const SocialInput = ({ id, name, label, placeholder }: { id: string, name: string, label: string, placeholder: string }) => (
    <div className="space-y-2">
      <Label htmlFor={id}>{label}</Label>
      <Input
        id={id}
        name={name}
        value={socialLinks[name] || ''}
        onChange={handleInputChange}
        placeholder={placeholder}
      />
    </div>
  )

  return (
    <div className="space-y-6">
      <div>
        <h3 className="text-lg font-medium">社交媒体链接</h3>
        <p className="text-sm text-muted-foreground">添加您的社交媒体链接，让访问者更容易找到您</p>
      </div>

      <Tabs defaultValue="domestic" className="w-full">
        <TabsList className="mb-4">
          <TabsTrigger value="domestic">国内平台</TabsTrigger>
          <TabsTrigger value="international">国际平台</TabsTrigger>
          <TabsTrigger value="design">设计社区</TabsTrigger>
          <TabsTrigger value="video">视频平台</TabsTrigger>
          <TabsTrigger value="dev">开发者社区</TabsTrigger>
        </TabsList>

        <div className="space-y-6">
          <TabsContent value="domestic">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <SocialInput id="wechat-link" name="wechat" label="微信" placeholder="https://weixin.qq.com/yourpage" />
              <SocialInput id="weibo-link" name="weibo" label="微博" placeholder="https://weibo.com/yourusername" />
              <SocialInput id="bilibili-link" name="bilibili" label="哔哩哔哩" placeholder="https://space.bilibili.com/yourid" />
              <SocialInput id="zhihu-link" name="zhihu" label="知乎" placeholder="https://www.zhihu.com/people/yourid" />
              <SocialInput id="douyin-link" name="douyin" label="抖音" placeholder="https://www.douyin.com/user/yourid" />
              <SocialInput id="xiaohongshu-link" name="xiaohongshu" label="小红书" placeholder="https://www.xiaohongshu.com/user/yourid" />
              <SocialInput id="jike-link" name="jike" label="即刻" placeholder="https://web.okjike.com/u/yourid" />
              <SocialInput id="douban-link" name="douban" label="豆瓣" placeholder="https://www.douban.com/people/yourid" />
              <SocialInput id="maimai-link" name="maimai" label="脉脉" placeholder="https://maimai.cn/contact/detail/yourid" />
              <SocialInput id="huaban-link" name="huaban" label="花瓣" placeholder="https://huaban.com/yourid" />
            </div>
          </TabsContent>

          <TabsContent value="international">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <SocialInput id="github-link" name="github" label="GitHub" placeholder="https://github.com/yourusername" />
              <SocialInput id="twitter-link" name="twitter" label="Twitter" placeholder="https://twitter.com/yourusername" />
              <SocialInput id="facebook-link" name="facebook" label="Facebook" placeholder="https://facebook.com/yourusername" />
              <SocialInput id="instagram-link" name="instagram" label="Instagram" placeholder="https://instagram.com/yourusername" />
              <SocialInput id="linkedin-link" name="linkedin" label="LinkedIn" placeholder="https://linkedin.com/in/yourusername" />
              <SocialInput id="telegram-link" name="telegram" label="Telegram" placeholder="https://t.me/yourusername" />
              <SocialInput id="discord-link" name="discord" label="Discord" placeholder="https://discord.com/users/yourid" />
              <SocialInput id="reddit-link" name="reddit" label="Reddit" placeholder="https://reddit.com/user/yourusername" />
            </div>
          </TabsContent>

          <TabsContent value="design">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <SocialInput id="behance-link" name="behance" label="Behance" placeholder="https://behance.net/yourusername" />
              <SocialInput id="dribbble-link" name="dribbble" label="Dribbble" placeholder="https://dribbble.com/yourusername" />
              <SocialInput id="codepen-link" name="codepen" label="CodePen" placeholder="https://codepen.io/yourusername" />
              <SocialInput id="figma-link" name="figma" label="Figma" placeholder="https://figma.com/@yourusername" />
              <SocialInput id="artstation-link" name="artstation" label="ArtStation" placeholder="https://artstation.com/yourusername" />
            </div>
          </TabsContent>

          <TabsContent value="video">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <SocialInput id="youtube-link" name="youtube" label="YouTube" placeholder="https://youtube.com/@yourusername" />
              <SocialInput id="vimeo-link" name="vimeo" label="Vimeo" placeholder="https://vimeo.com/yourusername" />
            </div>
          </TabsContent>

          <TabsContent value="dev">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <SocialInput id="stackoverflow-link" name="stackoverflow" label="Stack Overflow" placeholder="https://stackoverflow.com/users/yourid" />
              <SocialInput id="medium-link" name="medium" label="Medium" placeholder="https://medium.com/@yourusername" />
              <SocialInput id="devto-link" name="devto" label="Dev.to" placeholder="https://dev.to/yourusername" />
              <SocialInput id="hashnode-link" name="hashnode" label="Hashnode" placeholder="https://hashnode.com/@yourusername" />
            </div>
          </TabsContent>
        </div>
      </Tabs>
    </div>
  )
}
