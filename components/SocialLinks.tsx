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

  const socialLinkEntries = Object.entries(socialLinks).filter(([, value]) => value)

  const socialLabels: Record<keyof SocialLinksType, string> = {
    wechat: "WeChat",
    weibo: "Weibo",
    bilibili: "Bilibili",
    zhihu: "Zhihu",
    douyin: "Douyin",
    xiaohongshu: "Xiaohongshu",
    jike: "Jike",
    douban: "Douban",
    email: "Email", // Assuming email might be treated as a social link
    phone: "Phone", // Assuming phone might be treated as a social link
  }

  return (
    <div className="flex flex-wrap gap-3">
      {socialLinkEntries.map(([key, value]) => {
        const label = socialLabels[key as keyof SocialLinksType] || key
        // Exclude email and phone from being rendered as social links here if needed
        if (key === 'email' || key === 'phone') return null;
        return (
          <a key={key} href={value} className={linkStyle} target="_blank" rel="noopener noreferrer">
            {label}
          </a>
        )
      })}
    </div>
  )
}
