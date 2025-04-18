import type { UserData } from "@/types"
import Image from "next/image"

export default function BusinessTemplate({ userData }: { userData: UserData }) {
  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-white font-sans">
      {/* 顶部导航 */}
      <nav className="bg-white border-b border-gray-200 sticky top-0 z-10">
        <div className="max-w-6xl mx-auto px-4">
          <div className="flex justify-between items-center h-16">
            <div className="font-bold text-xl text-gray-900">{userData.name || "您的姓名"}</div>
            <div className="flex space-x-8">
              <a href="#about" className="text-gray-600 hover:text-blue-600 transition-colors">
                关于
              </a>
              <a href="#projects" className="text-gray-600 hover:text-blue-600 transition-colors">
                项目
              </a>
              <a href="#contact" className="text-gray-600 hover:text-blue-600 transition-colors">
                联系
              </a>
            </div>
          </div>
        </div>
      </nav>

      {/* 主要内容区 */}
      <main>
        {/* Hero区域 */}
        <section className="py-20 bg-gradient-to-br from-blue-50 to-indigo-50">
          <div className="max-w-6xl mx-auto px-4">
            <div className="flex flex-col md:flex-row items-center gap-12">
              <div className="w-48 h-48 relative flex-shrink-0">
                {userData.avatar ? (
                  <Image
                    src={userData.avatar}
                    alt={userData.name}
                    fill
                    className="rounded-full object-cover border-4 border-white shadow-lg"
                  />
                ) : (
                  <div className="w-48 h-48 rounded-full bg-gradient-to-br from-blue-100 to-indigo-100 flex items-center justify-center border-4 border-white shadow-lg">
                    <span className="text-4xl text-blue-600">{userData.name ? userData.name.charAt(0) : "?"}</span>
                  </div>
                )}
              </div>
              <div className="text-center md:text-left">
                <h1 className="text-4xl font-bold text-gray-900 mb-4">{userData.name || "您的姓名"}</h1>
                <p className="text-xl text-gray-600 mb-6">{userData.profession || "您的职业"}</p>
                <div className="flex flex-wrap gap-4 justify-center md:justify-start">
                  {userData.email && (
                    <a
                      href={`mailto:${userData.email}`}
                      className="inline-flex items-center px-6 py-3 bg-blue-600 text-white rounded-full hover:bg-blue-700 transition-colors"
                    >
                      联系我
                    </a>
                  )}
                  {userData.socialLinks?.linkedin && (
                    <a
                      href={userData.socialLinks.linkedin}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center px-6 py-3 bg-white text-blue-600 rounded-full hover:bg-blue-50 transition-colors border border-blue-200"
                    >
                      查看领英
                    </a>
                  )}
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* 关于我 */}
        <section id="about" className="py-20">
          <div className="max-w-6xl mx-auto px-4">
            <h2 className="text-3xl font-bold text-gray-900 mb-12 text-center">关于我</h2>
            <div className="bg-white rounded-2xl shadow-lg p-8 border border-gray-100">
              <p className="text-gray-600 leading-relaxed text-lg">{userData.bio || "这里将显示您的个人简介..."}</p>
            </div>
          </div>
        </section>

        {/* 项目展示 */}
        {userData.projects && userData.projects.length > 0 && userData.projects[0].title && (
          <section id="projects" className="py-20 bg-gray-50">
            <div className="max-w-6xl mx-auto px-4">
              <h2 className="text-3xl font-bold text-gray-900 mb-12 text-center">项目展示</h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                {userData.projects.map((project, index) => (
                  <div
                    key={index}
                    className="bg-white rounded-2xl shadow-lg overflow-hidden border border-gray-100 hover:shadow-xl transition-shadow"
                  >
                    {project.imageUrl && (
                      <div className="aspect-video relative">
                        <Image
                          src={project.imageUrl}
                          alt={project.title}
                          fill
                          className="object-cover"
                        />
                      </div>
                    )}
                    <div className="p-8">
                      <h3 className="text-2xl font-bold text-gray-900 mb-4">{project.title}</h3>
                      {project.description && (
                        <p className="text-gray-600 mb-6">{project.description}</p>
                      )}
                      {project.link && (
                        <a
                          href={project.link}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="inline-flex items-center px-6 py-3 bg-blue-600 text-white rounded-full hover:bg-blue-700 transition-colors"
                        >
                          了解更多
                        </a>
                      )}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </section>
        )}

        {/* 联系方式 */}
        <section id="contact" className="py-20">
          <div className="max-w-6xl mx-auto px-4">
            <h2 className="text-3xl font-bold text-gray-900 mb-12 text-center">联系方式</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              <div className="bg-white rounded-2xl shadow-lg p-8 border border-gray-100">
                <h3 className="text-xl font-semibold text-gray-900 mb-6">直接联系</h3>
                <div className="space-y-4">
                  {userData.email && (
                    <a href={`mailto:${userData.email}`} className="flex items-center text-gray-600 hover:text-blue-600">
                      <span className="mr-3">✉️</span>
                      {userData.email}
                    </a>
                  )}
                  {userData.phone && (
                    <a href={`tel:${userData.phone}`} className="flex items-center text-gray-600 hover:text-blue-600">
                      <span className="mr-3">📱</span>
                      {userData.phone}
                    </a>
                  )}
                  {userData.wechat && (
                    <div className="flex items-center text-gray-600">
                      <span className="mr-3">💬</span>
                      {userData.wechat}
                    </div>
                  )}
                </div>
              </div>
              <div className="bg-white rounded-2xl shadow-lg p-8 border border-gray-100">
                <h3 className="text-xl font-semibold text-gray-900 mb-6">社交媒体</h3>
                <div className="flex flex-wrap gap-4">
                  {Object.entries(userData.socialLinks || {}).map(([platform, link]) => (
                    link && (
                      <a
                        key={platform}
                        href={link}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="px-6 py-3 bg-gray-50 text-gray-700 rounded-full hover:bg-gray-100 transition-colors"
                      >
                        {platform.charAt(0).toUpperCase() + platform.slice(1)}
                      </a>
                    )
                  ))}
                </div>
              </div>
            </div>
          </div>
        </section>
      </main>

      {/* 页脚 */}
      <footer className="bg-gray-900 text-white py-12">
        <div className="max-w-6xl mx-auto px-4 text-center">
          <p className="text-gray-400">
            © {new Date().getFullYear()} {userData.name || "您的姓名"}. 保留所有权利。
          </p>
        </div>
      </footer>
    </div>
  )
}
