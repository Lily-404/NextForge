import { cn } from "@/lib/utils"
import type { UserData } from "@/types"

interface ContactCardProps {
  userData: UserData
  isDark: boolean
}

export default function ContactCard({ userData, isDark }: ContactCardProps) {
  return (
    <div className={cn(
      "border p-8",
      isDark ? "border-[#222222] bg-[#1a1a1a]" : "border-[#eaeaea] bg-white"
    )}>
      <h3 className={cn(
        "text-2xl font-bold mb-8 tracking-tight",
        isDark ? "text-[#e5e5e5]" : "text-[#1a1a1a]"
      )}>
        直接联系
      </h3>
      <div className="space-y-6">
        {userData.email && (
          <a
            href={`mailto:${userData.email}`}
            className={cn(
              "flex items-center transition-colors",
              isDark ? "text-[#666666] hover:text-[#e5e5e5]" : "text-[#666666] hover:text-[#1a1a1a]"
            )}
          >
            <span className="mr-4 text-xl">✉️</span>
            <span className="text-lg">{userData.email}</span>
          </a>
        )}
        {userData.phone && (
          <a
            href={`tel:${userData.phone}`}
            className={cn(
              "flex items-center transition-colors",
              isDark ? "text-[#666666] hover:text-[#e5e5e5]" : "text-[#666666] hover:text-[#1a1a1a]"
            )}
          >
            <span className="mr-4 text-xl">📱</span>
            <span className="text-lg">{userData.phone}</span>
          </a>
        )}
        {userData.wechat && (
          <div className={cn(
            "flex items-center",
            isDark ? "text-[#666666]" : "text-[#666666]"
          )}>
            <span className="mr-4 text-xl">💬</span>
            <span className="text-lg">{userData.wechat}</span>
          </div>
        )}
      </div>
    </div>
  )
} 