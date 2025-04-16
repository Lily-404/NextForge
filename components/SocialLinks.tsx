import { SocialLinks as SocialLinksType } from "@/types/user-data"
import { cn } from "@/lib/utils"

interface SocialLinksProps {
  socialLinks: SocialLinksType
  variant?: "business" | "creative"
}

export function SocialLinks({ socialLinks, variant = "business" }: SocialLinksProps) {
  const linkStyle = cn(
    "inline-block px-4 py-2 rounded-lg transition-colors",
    variant === "business"
      ? "bg-gray-100 hover:bg-gray-200 text-gray-800"
      : "bg-purple-100 hover:bg-purple-200 text-purple-800"
  )

  return (
    <div className="flex flex-wrap gap-3">
      {socialLinks.wechat && (
        <a href={socialLinks.wechat} className={linkStyle} target="_blank" rel="noopener noreferrer">
          WeChat
        </a>
      )}
      {socialLinks.weibo && (
        <a href={socialLinks.weibo} className={linkStyle} target="_blank" rel="noopener noreferrer">
          Weibo
        </a>
      )}
      {socialLinks.github && (
        <a href={socialLinks.github} className={linkStyle} target="_blank" rel="noopener noreferrer">
          GitHub
        </a>
      )}
      {socialLinks.jike && (
        <a href={socialLinks.jike} className={linkStyle} target="_blank" rel="noopener noreferrer">
          Jike
        </a>
      )}
      {socialLinks.xiaohongshu && (
        <a href={socialLinks.xiaohongshu} className={linkStyle} target="_blank" rel="noopener noreferrer">
          Xiaohongshu
        </a>
      )}
      {socialLinks.douyin && (
        <a href={socialLinks.douyin} className={linkStyle} target="_blank" rel="noopener noreferrer">
          Douyin
        </a>
      )}
      {socialLinks.bilibili && (
        <a href={socialLinks.bilibili} className={linkStyle} target="_blank" rel="noopener noreferrer">
          Bilibili
        </a>
      )}
    </div>
  )
}
