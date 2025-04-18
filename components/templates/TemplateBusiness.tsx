import UserInfo from "@/components/UserInfo"
import SocialLinks from "@/components/SocialLinks"
import ContactForm from "@/components/ContactForm"
import { motion } from "framer-motion"
import { ChevronRight, Mail, Phone, MessageCircle } from "lucide-react"

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
    <div className="min-h-screen bg-gradient-to-br from-gray-50 via-white to-gray-50 dark:from-gray-900 dark:via-gray-800 dark:to-gray-900">
      {/* 优化背景装饰 */}
      <div className="absolute inset-0">
        <div className="absolute inset-0 bg-[linear-gradient(to_right,#80808012_1px,transparent_1px),linear-gradient(to_bottom,#80808012_1px,transparent_1px)] bg-[size:24px_24px] pointer-events-none" />
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[800px] h-[800px] bg-gradient-to-b from-blue-500/5 to-purple-500/5 rounded-full blur-3xl" />
      </div>

      {/* 优化卡片样式 */}
      <div className="backdrop-blur-xl bg-white/90 dark:bg-gray-800/90 p-8 rounded-2xl shadow-lg border border-gray-100/50 dark:border-gray-700/50 hover:border-blue-500/50 dark:hover:border-blue-400/50 transition-all duration-300">
        <UserInfo userData={userData} variant="business" />
        <div className="mt-8 space-y-6">
          <div className="flex items-center space-x-4 text-gray-600 dark:text-gray-300 hover:text-blue-600 dark:hover:text-blue-400 transition-colors">
            <Phone className="h-5 w-5" />
            <span>{userData.phone}</span>
          </div>
          <div className="flex items-center space-x-4 text-gray-600 dark:text-gray-300 hover:text-blue-600 dark:hover:text-blue-400 transition-colors">
            <Mail className="h-5 w-5" />
            <span>{userData.email}</span>
          </div>
          <div className="flex items-center space-x-4 text-gray-600 dark:text-gray-300 hover:text-blue-600 dark:hover:text-blue-400 transition-colors">
            <MessageCircle className="h-5 w-5" />
            <span>{userData.wechat}</span>
          </div>
          <div className="pt-6 border-t border-gray-200 dark:border-gray-700">
            <SocialLinks socialLinks={userData.socialLinks} />
          </div>
        </div>
      </div>

      {/* 优化服务卡片 */}
      <motion.div
        className="group p-6 rounded-xl bg-gray-50/80 dark:bg-gray-700/30 hover:bg-gradient-to-br hover:from-blue-50 hover:to-purple-50 dark:hover:from-blue-900/20 dark:hover:to-purple-900/20 transition-all duration-300 backdrop-blur-lg border border-transparent hover:border-blue-500/20"
      >
        <div className="space-y-12">
          <div className="backdrop-blur-xl bg-white/80 dark:bg-gray-800/80 p-8 rounded-2xl shadow-lg border border-gray-100 dark:border-gray-700">
            <h1 className="text-3xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-gray-900 via-gray-800 to-gray-700 dark:from-white dark:via-gray-200 dark:to-gray-300 mb-6">
              专业服务
            </h1>
            <p className="text-gray-600 dark:text-gray-300 text-lg leading-relaxed mb-8">
              欢迎访问我的专业页面。我是<span className="font-semibold text-gray-900 dark:text-white">{userData.name}</span>，
              <span className="text-gray-800 dark:text-gray-200">{userData.bio}</span>
            </p>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {[
                { title: '专业咨询', desc: '提供专业的商业策略和解决方案咨询服务' },
                { title: '项目合作', desc: '寻求长期稳定的商业合作伙伴关系' },
                { title: '资源对接', desc: '连接优质资源，促进商业生态发展' },
                { title: '创新服务', desc: '探索创新商业模式和发展机会' },
              ].map((service, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.3, delay: 0.4 + index * 0.1 }}
                  className="group p-6 rounded-xl bg-gray-50 dark:bg-gray-700/50 hover:bg-gradient-to-br hover:from-blue-50 hover:to-indigo-50 dark:hover:from-blue-900/20 dark:hover:to-indigo-900/20 transition-all duration-300"
                >
                  <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-2 group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors">
                    {service.title}
                  </h3>
                  <p className="text-gray-600 dark:text-gray-300">{service.desc}</p>
                </motion.div>
              ))}
            </div>
          </div>

          <div className="backdrop-blur-xl bg-white/80 dark:bg-gray-800/80 p-8 rounded-2xl shadow-lg border border-gray-100 dark:border-gray-700">
            <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-6 flex items-center">
              联系我
              <ChevronRight className="h-5 w-5 ml-2 text-blue-500" />
            </h2>
            <ContactForm />
          </div>
        </div>
      </motion.div>
    </div>
  )
}
