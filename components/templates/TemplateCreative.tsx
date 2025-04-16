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

export default function TemplateCreative({ userData }: { userData: UserData }) {
  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-50 to-pink-50">
      <div className="max-w-5xl mx-auto px-4 py-16">
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-purple-600 to-pink-500 mb-4">
            {userData.name}
          </h1>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto">{userData.bio}</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
          {/* User info card */}
          <div className="bg-white p-8 rounded-xl shadow-md transform hover:scale-105 transition-transform duration-300">
            <UserInfo userData={userData} variant="creative" />
            <div className="mt-8 flex justify-center">
              <SocialLinks socialLinks={userData.socialLinks} variant="creative" />
            </div>
          </div>

          {/* Contact form */}
          <div className="bg-white p-8 rounded-xl shadow-md">
            <h2 className="text-2xl font-bold text-gray-800 mb-6 text-center">联系我</h2>
            <ContactForm variant="creative" />
          </div>
        </div>
      </div>
    </div>
  )
}
