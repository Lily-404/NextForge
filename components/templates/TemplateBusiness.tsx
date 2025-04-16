import UserInfo from "@/components/UserInfo"
import SocialLinks from "@/components/SocialLinks"
import ContactForm from "@/components/ContactForm"

interface UserData {
  name: string
  wechat: string
  phone: string
  email: string
  bio: string
  socialLinks: {
    wechat: string
    weibo: string
  }
  template: string
}

export default function TemplateBusiness({ userData }: { userData: UserData }) {
  return (
    <div className="min-h-screen bg-white">
      <div className="max-w-4xl mx-auto px-4 py-12">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {/* Left sidebar with user info */}
          <div className="md:col-span-1">
            <div className="bg-gray-50 p-6 rounded-lg shadow-sm">
              <UserInfo userData={userData} variant="business" />
              <div className="mt-6">
                <SocialLinks socialLinks={userData.socialLinks} />
              </div>
            </div>
          </div>

          {/* Main content area */}
          <div className="md:col-span-2">
            <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-100">
              <h1 className="text-2xl font-bold text-gray-800 mb-6">专业服务</h1>
              <p className="text-gray-600 mb-8">
                欢迎访问我的专业页面。我是{userData.name}，{userData.bio}。
                如果您对我的服务感兴趣，请通过以下方式联系我。
              </p>

              <div className="bg-gray-50 p-6 rounded-lg">
                <h2 className="text-xl font-semibold text-gray-700 mb-4">联系我</h2>
                <ContactForm />
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
