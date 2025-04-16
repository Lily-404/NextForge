"use client"

import type React from "react"

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

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <InputGroup
          label="微信公众号链接"
          name="wechat"
          type="text"
          value={socialLinks.wechat}
          onChange={handleSocialLinkChange}
          placeholder="https://weixin.qq.com/yourpage"
        />

        <InputGroup
          label="微博链接"
          name="weibo"
          type="text"
          value={socialLinks.weibo}
          onChange={handleSocialLinkChange}
          placeholder="https://weibo.com/yourusername"
        />

        <InputGroup
          label="GitHub链接"
          name="github"
          type="text"
          value={socialLinks.github}
          onChange={handleSocialLinkChange}
          placeholder="https://github.com/yourusername"
        />

        <InputGroup
          label="LinkedIn链接"
          name="linkedin"
          type="text"
          value={socialLinks.linkedin}
          onChange={handleSocialLinkChange}
          placeholder="https://linkedin.com/in/yourusername"
        />

        <InputGroup
          label="Twitter链接"
          name="twitter"
          type="text"
          value={socialLinks.twitter}
          onChange={handleSocialLinkChange}
          placeholder="https://twitter.com/yourusername"
        />
      </div>
    </div>
  )
}
