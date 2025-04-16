import type { UserData } from "@/types"
import Image from "next/image"

export default function CreativeTemplate({ userData }: { userData: UserData }) {
  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-50 to-pink-50 font-sans">
      {/* 顶部导航 */}
      <nav className="bg-white bg-opacity-90 backdrop-blur-sm py-4 sticky top-0 z-10 shadow-sm">
        <div className="max-w-5xl mx-auto px-4 flex justify-between items-center">
          <div className="font-bold text-transparent bg-clip-text bg-gradient-to-r from-purple-600 to-pink-500">
            {userData.name || "您的姓名"}
          </div>
          <div className="flex space-x-6">
            <a href="#about" className="text-gray-700 hover:text-purple-600 transition-colors">
              关于
            </a>
            <a href="#projects" className="text-gray-700 hover:text-purple-600 transition-colors">
              项目
            </a>
            <a href="#contact" className="text-gray-700 hover:text-purple-600 transition-colors">
              联系
            </a>
          </div>
        </div>
      </nav>

      {/* 头部区域 */}
      <header className="py-20 text-center">
        <div className="max-w-4xl mx-auto px-4">
          <div className="relative w-32 h-32 mx-auto mb-6">
            {userData.avatar ? (
              <Image
                src={userData.avatar || "/placeholder.svg"}
                alt={userData.name}
                fill
                className="rounded-full object-cover border-4 border-white shadow-lg"
              />
            ) : (
              <div className="w-32 h-32 rounded-full bg-gradient-to-br from-purple-400 to-pink-400 flex items-center justify-center border-4 border-white shadow-lg">
                <span className="text-3xl text-white">{userData.name ? userData.name.charAt(0) : "?"}</span>
              </div>
            )}
          </div>
          <h1 className="text-4xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-purple-600 to-pink-500 mb-4">
            {userData.name || "您的姓名"}
          </h1>
          <p className="text-xl text-gray-700 mb-6">{userData.profession || "您的职业"}</p>
          {userData.location && (
            <p className="text-gray-600 mb-8">
              <span className="inline-block mr-2">📍</span>
              {userData.location}
            </p>
          )}
          <div className="flex justify-center space-x-4">
            {userData.email && (
              <a
                href={`mailto:${userData.email}`}
                className="px-4 py-2 bg-white rounded-full shadow-sm text-gray-700 hover:shadow-md transition-shadow"
              >
                ✉️ 发送邮件
              </a>
            )}
            {userData.phone && (
              <a
                href={`tel:${userData.phone}`}
                className="px-4 py-2 bg-white rounded-full shadow-sm text-gray-700 hover:shadow-md transition-shadow"
              >
                📱 联系电话
              </a>
            )}
          </div>
        </div>
      </header>

      <div className="max-w-5xl mx-auto px-4 py-12">
        {/* 关于我 */}
        <section id="about" className="mb-20">
          <div className="text-center mb-12">
            <h2 className="inline-block text-2xl font-bold text-gray-800 border-b-2 border-purple-400 pb-2">关于我</h2>
          </div>
          <div className="bg-white p-8 rounded-2xl shadow-sm transform hover:scale-[1.01] transition-transform">
            <p className="text-gray-700 leading-relaxed">{userData.bio || "这里将显示您的个人简介..."}</p>
          </div>
        </section>

        {/* 项目作品 */}
        {userData.projects && userData.projects.length > 0 && userData.projects[0].title && (
          <section id="projects" className="mb-20">
            <div className="text-center mb-12">
              <h2 className="inline-block text-2xl font-bold text-gray-800 border-b-2 border-purple-400 pb-2">
                项目作品
              </h2>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              {userData.projects.map((project, index) => (
                <div
                  key={index}
                  className="bg-white rounded-2xl shadow-sm overflow-hidden transform hover:scale-[1.02] transition-transform"
                >
                  {project.imageUrl && (
                    <div className="aspect-w-16 aspect-h-9 relative">
                      <Image
                        src={project.imageUrl || "/placeholder.svg"}
                        alt={project.title}
                        fill
                        className="object-cover"
                      />
                    </div>
                  )}
                  <div className="p-6">
                    <h3 className="font-bold text-gray-900 text-xl mb-3">{project.title}</h3>
                    {project.description && <p className="text-gray-600 mb-4">{project.description}</p>}
                    {project.link && (
                      <a
                        href={project.link}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-block px-6 py-2 bg-gradient-to-r from-purple-500 to-pink-500 text-white rounded-full hover:from-purple-600 hover:to-pink-600 transition-colors"
                      >
                        查看项目
                      </a>
                    )}
                  </div>
                </div>
              ))}
            </div>
          </section>
        )}

        {/* 联系方式 */}
        <section id="contact" className="mb-20">
          <div className="text-center mb-12">
            <h2 className="inline-block text-2xl font-bold text-gray-800 border-b-2 border-purple-400 pb-2">联系我</h2>
          </div>
          <div className="bg-white p-8 rounded-2xl shadow-sm">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              <div>
                <h3 className="text-xl font-semibold text-gray-800 mb-4">联系方式</h3>
                <ul className="space-y-4">
                  {userData.email && (
                    <li className="flex items-center">
                      <span className="text-purple-500 mr-3">✉️</span>
                      <a
                        href={`mailto:${userData.email}`}
                        className="text-gray-700 hover:text-purple-600 transition-colors"
                      >
                        {userData.email}
                      </a>
                    </li>
                  )}
                  {userData.phone && (
                    <li className="flex items-center">
                      <span className="text-purple-500 mr-3">📱</span>
                      <a
                        href={`tel:${userData.phone}`}
                        className="text-gray-700 hover:text-purple-600 transition-colors"
                      >
                        {userData.phone}
                      </a>
                    </li>
                  )}
                  {userData.wechat && (
                    <li className="flex items-center">
                      <span className="text-purple-500 mr-3">WeChat:</span>
                      <span className="text-gray-700">{userData.wechat}</span>
                    </li>
                  )}
                </ul>
              </div>
              <div>
                <h3 className="text-xl font-semibold text-gray-800 mb-4">社交媒体</h3>
                <div className="flex flex-wrap gap-3">
                  {userData.socialLinks.wechat && (
                    <a
                      href={userData.socialLinks.wechat}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="px-4 py-2 bg-white border border-purple-200 rounded-full text-gray-700 hover:bg-purple-50 hover:border-purple-300 transition-colors"
                    >
                      微信公众号
                    </a>
                  )}
                  {userData.socialLinks.weibo && (
                    <a
                      href={userData.socialLinks.weibo}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="px-4 py-2 bg-white border border-purple-200 rounded-full text-gray-700 hover:bg-purple-50 hover:border-purple-300 transition-colors"
                    >
                      微博
                    </a>
                  )}
                  {userData.socialLinks.github && (
                    <a
                      href={userData.socialLinks.github}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="px-4 py-2 bg-white border border-purple-200 rounded-full text-gray-700 hover:bg-purple-50 hover:border-purple-300 transition-colors"
                    >
                      GitHub
                    </a>
                  )}
                  {userData.socialLinks.linkedin && (
                    <a
                      href={userData.socialLinks.linkedin}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="px-4 py-2 bg-white border border-purple-200 rounded-full text-gray-700 hover:bg-purple-50 hover:border-purple-300 transition-colors"
                    >
                      LinkedIn
                    </a>
                  )}
                  {userData.socialLinks.twitter && (
                    <a
                      href={userData.socialLinks.twitter}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="px-4 py-2 bg-white border border-purple-200 rounded-full text-gray-700 hover:bg-purple-50 hover:border-purple-300 transition-colors"
                    >
                      Twitter
                    </a>
                  )}
                </div>
              </div>
            </div>
          </div>
        </section>
      </div>

      {/* 页脚 */}
      <footer className="bg-gradient-to-r from-purple-500 to-pink-500 text-white py-8">
        <div className="max-w-5xl mx-auto px-4 text-center">
          <p>
            © {new Date().getFullYear()} {userData.name || "您的姓名"}. 保留所有权利。
          </p>
        </div>
      </footer>
    </div>
  )
}
