import { cn } from "@/lib/utils"
import type { SocialLinks as SocialLinksType } from "@/types"

interface SocialLinksProps {
  socialLinks?: SocialLinksType
  isDark: boolean
}

const socialIcons: Record<string, string> = {
  github: "🐙",
  twitter: "🐦",
  linkedin: "💼",
  instagram: "📸",
  facebook: "👥",
  youtube: "🎥",
  weibo: "🌐",
  zhihu: "📚",
  bilibili: "📺",
  douyin: "🎵"
}

export default function SocialLinks({ socialLinks, isDark }: SocialLinksProps) {
  if (!socialLinks) return null

  return (
    <div className={cn(
      "border p-8",
      isDark ? "border-[#222222] bg-[#1a1a1a]" : "border-[#eaeaea] bg-white"
    )}>
      <h3 className={cn(
        "text-2xl font-bold mb-8 tracking-tight",
        isDark ? "text-[#e5e5e5]" : "text-[#1a1a1a]"
      )}>
        社交媒体
      </h3>
      <div className="grid grid-cols-2 gap-6">
        {Object.entries(socialLinks).map(([platform, url]) => {
          if (!url) return null
          return (
            <a
              key={platform}
              href={url}
              target="_blank"
              rel="noopener noreferrer"
              className={cn(
                "flex items-center transition-colors",
                isDark ? "text-[#666666] hover:text-[#e5e5e5]" : "text-[#666666] hover:text-[#1a1a1a]"
              )}
            >
              <span className="mr-3 text-xl">{socialIcons[platform]}</span>
              <span className="text-lg capitalize">{platform}</span>
            </a>
          )
        })}
      </div>
    </div>
  )
} 