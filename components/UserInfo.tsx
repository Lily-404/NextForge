import Image from "next/image"

interface UserData {
  name: string
  wechat: string
  phone: string
  email: string
  bio: string
}

interface UserInfoProps {
  userData: UserData
  variant?: "business" | "creative"
}

export default function UserInfo({ userData, variant = "business" }: UserInfoProps) {
  const isCreative = variant === "creative"

  return (
    <div className={`flex flex-col ${isCreative ? "items-center" : ""}`}>
      <div className={`relative ${isCreative ? "w-32 h-32" : "w-24 h-24"} mb-4`}>
        <Image
          src={`/placeholder.svg?height=200&width=200`}
          alt={userData.name}
          fill
          className={`object-cover ${isCreative ? "rounded-full border-4 border-purple-200" : "rounded-full"}`}
        />
      </div>

      <h2 className={`${isCreative ? "text-2xl text-center" : "text-xl"} font-bold text-gray-800 mb-2`}>
        {userData.name}
      </h2>

      <p className={`${isCreative ? "text-center" : ""} text-gray-600 mb-4`}>{userData.bio}</p>

      <div className={`space-y-2 ${isCreative ? "text-center" : ""}`}>
        <div className="flex items-center gap-2">
          <span className="text-gray-500">微信:</span>
          <span className="font-medium">{userData.wechat}</span>
        </div>

        <div className="flex items-center gap-2">
          <span className="text-gray-500">电话:</span>
          <span className="font-medium">{userData.phone}</span>
        </div>

        <div className="flex items-center gap-2">
          <span className="text-gray-500">邮箱:</span>
          <span className="font-medium">{userData.email}</span>
        </div>
      </div>
    </div>
  )
}
