import type { UserData } from "@/types"
import Image from "next/image"

export default function FunTemplate({ userData }: { userData: UserData }) {
  return (
    <div className="min-h-screen bg-yellow-50 font-sans">
      {/* 顶部导航 */}
      <nav className="bg-yellow-400 py-4 sticky top-0 z-10 shadow-md">
        <div className="max-w-5xl mx-auto px-4 flex justify-between items-center">
          <div className="font-bold text-2xl text-purple-800">{userData.name || "您的姓名"} 😎</div>
          <div className="flex space-x-6">
            <a href="#about" className="text-purple-800 hover:text-purple-600 font-medium">
              关于我
            </a>
            <a href="#projects" className="text-purple-800 hover:text-purple-600 font-medium">
              酷炫项目
            </a>
            <a href="#contact" className="text-purple-800 hover:text-purple-600 font-medium">
              找到我
            </a>
          </div>
        </div>
      </nav>

      {/* 头部区域 */}
      <header className="py-16 text-center bg-gradient-to-b from-yellow-400 to-yellow-50">
        <div className="max-w-4xl mx-auto px-4">
          <div className="relative w-40 h-40 mx-auto mb-6 transform rotate-3 hover:rotate-0 transition-transform">
            {userData.avatar ? (
              <Image
                src={userData.avatar || "/placeholder.svg"}
                alt={userData.name}
                fill
                className="rounded-2xl object-cover border-4 border-white shadow-lg"
              />
            ) : (
              <div className="w-40 h-40 rounded-2xl bg-gradient-to-br from-purple-400 to-pink-400 flex items-center justify-center border-4 border-white shadow-lg">
                <span className="text-4xl text-white">{userData.name ? userData.name.charAt(0) : "?"}</span>
              </div>
            )}
          </div>
          <h1 className="text-4xl font-bold text-purple-800 mb-4">嗨！我是 {userData.name || "您的姓名"} 👋</h1>
          <p className="text-xl text-purple-700 mb-6">{userData.profession || "您的职业"} ✨</p>
          {userData.location && (
            <p className="text-purple-600 mb-8 text-lg">
              <span className="inline-block mr-2">📍</span>
              来自 {userData.location}
            </p>
          )}
          <div className="flex justify-center space-x-4">
            {userData.email && (
              <a
                href={`mailto:${userData.email}`}
                className="px-6 py-3 bg-purple-600 rounded-full shadow-md text-white hover:bg-purple-700 transition-colors transform hover:scale-105"
              >
                ✉️ 给我发邮件
              </a>
            )}
            {userData.phone && (
              <a
                href={`tel:${userData.phone}`}
                className="px-6 py-3 bg-green-500 rounded-full shadow-md text-white hover:bg-green-600 transition-colors transform hover:scale-105"
              >
                📱 给我打电话
              </a>
            )}
          </div>
        </div>
      </header>

      <div className="max-w-5xl mx-auto px-4 py-12">
        {/* 关于我 */}
        <section id="about" className="mb-20">
          <div className="text-center mb-12">
            <h2 className="inline-block text-3xl font-bold text-purple-800 pb-2 border-b-4 border-yellow-400">
              关于我 🧐
            </h2>
          </div>
          <div className="bg-white p-8 rounded-3xl shadow-md transform rotate-1 hover:rotate-0 transition-transform">
            <p className="text-purple-900 leading-relaxed text-lg">{userData.bio || "这里将显示您的个人简介..."}</p>
          </div>
        </section>

        {/* 项目作品 */}
        {userData.projects && userData.projects.length > 0 && userData.projects[0].title && (
          <section id="projects" className="mb-20">
            <div className="text-center mb-12">
              <h2 className="inline-block text-3xl font-bold text-purple-800 pb-2 border-b-4 border-yellow-400">
                酷炫项目 🚀
              </h2>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              {userData.projects.map((project, index) => (
                <div
                  key={index}
                  className={`bg-white rounded-3xl shadow-md overflow-hidden transform ${
                    index % 2 === 0 ? "rotate-1" : "-rotate-1"
                  } hover:rotate-0 transition-transform`}
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
                    <h3 className="font-bold text-purple-800 text-2xl mb-3">{project.title} ✨</h3>
                    {project.description && <p className="text-purple-700 mb-4">{project.description}</p>}
                    {project.link && (
                      <a
                        href={project.link}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-block px-6 py-3 bg-yellow-400 text-purple-800 font-bold rounded-full hover:bg-yellow-500 transition-colors transform hover:scale-105"
                      >
                        查看项目 👀
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
            <h2 className="inline-block text-3xl font-bold text-purple-800 pb-2 border-b-4 border-yellow-400">
              找到我 📍
            </h2>
          </div>
          <div className="bg-white p-8 rounded-3xl shadow-md transform -rotate-1 hover:rotate-0 transition-transform">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              <div>
                <h3 className="text-2xl font-semibold text-purple-800 mb-4">联系方式 📞</h3>
                <ul className="space-y-4">
                  {userData.email && (
                    <li className="flex items-center text-lg">
                      <span className="text-yellow-500 mr-3 text-2xl">✉️</span>
                      <a
                        href={`mailto:${userData.email}`}
                        className="text-purple-700 hover:text-purple-500 transition-colors"
                      >
                        {userData.email}
                      </a>
                    </li>
                  )}
                  {userData.phone && (
                    <li className="flex items-center text-lg">
                      <span className="text-yellow-500 mr-3 text-2xl">📱</span>
                      <a
                        href={`tel:${userData.phone}`}
                        className="text-purple-700 hover:text-purple-500 transition-colors"
                      >
                        {userData.phone}
                      </a>
                    </li>
                  )}
                  {userData.wechat && (
                    <li className="flex items-center text-lg">
                      <span className="text-yellow-500 mr-3 text-2xl">💬</span>
                      <span className="text-purple-700">{userData.wechat}</span>
                    </li>
                  )}
                </ul>
              </div>
              <div>
                <h3 className="text-2xl font-semibold text-purple-800 mb-4">社交媒体 🌐</h3>
                <div className="flex flex-wrap gap-3">
                  {userData.socialLinks.wechat && (
                    <a
                      href={userData.socialLinks.wechat}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="px-4 py-2 bg-yellow-200 rounded-full text-purple-700 font-medium hover:bg-yellow-300 transition-colors transform hover:scale-105"
                    >
                      微信公众号
                    </a>
                  )}
                  {userData.socialLinks.weibo && (
                    <a
                      href={userData.socialLinks.weibo}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="px-4 py-2 bg-red-200 rounded-full text-red-700 font-medium hover:bg-red-300 transition-colors transform hover:scale-105"
                    >
                      微博
                    </a>
                  )}
                  {userData.socialLinks.github && (
                    <a
                      href={userData.socialLinks.github}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="px-4 py-2 bg-gray-200 rounded-full text-gray-700 font-medium hover:bg-gray-300 transition-colors transform hover:scale-105"
                    >
                      GitHub
                    </a>
                  )}
                  {userData.socialLinks.linkedin && (
                    <a
                      href={userData.socialLinks.linkedin}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="px-4 py-2 bg-blue-200 rounded-full text-blue-700 font-medium hover:bg-blue-300 transition-colors transform hover:scale-105"
                    >
                      LinkedIn
                    </a>
                  )}
                  {userData.socialLinks.twitter && (
                    <a
                      href={userData.socialLinks.twitter}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="px-4 py-2 bg-blue-200 rounded-full text-blue-700 font-medium hover:bg-blue-300 transition-colors transform hover:scale-105"
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
      <footer className="bg-yellow-400 text-purple-800 py-8">
        <div className="max-w-5xl mx-auto px-4 text-center">
          <p className="text-lg font-bold">
            © {new Date().getFullYear()} {userData.name || "您的姓名"} 🎉
          </p>
          <p className="mt-2">用❤️制作</p>
        </div>
      </footer>
    </div>
  )
}
