import type { UserData } from "@/types"
import Image from "next/image"

export default function BusinessTemplate({ userData }: { userData: UserData }) {
  return (
    <div className="min-h-screen bg-gray-50 font-sans">
      {/* 顶部导航 */}
      <nav className="bg-gray-800 text-white py-4">
        <div className="max-w-5xl mx-auto px-4 flex justify-between items-center">
          <div className="font-bold text-xl">{userData.name || "您的姓名"}</div>
          <div className="flex space-x-6">
            <a href="#about" className="hover:text-gray-300">
              关于
            </a>
            <a href="#projects" className="hover:text-gray-300">
              项目
            </a>
            <a href="#contact" className="hover:text-gray-300">
              联系
            </a>
          </div>
        </div>
      </nav>

      {/* 个人信息区 */}
      <section className="bg-white py-16 shadow-md">
        <div className="max-w-5xl mx-auto px-4">
          <div className="flex flex-col md:flex-row items-center md:items-start gap-8">
            <div className="w-32 h-32 relative flex-shrink-0">
              {userData.avatar ? (
                <Image
                  src={userData.avatar || "/placeholder.svg"}
                  alt={userData.name}
                  fill
                  className="rounded-full object-cover border-4 border-gray-200"
                />
              ) : (
                <div className="w-32 h-32 rounded-full bg-gray-200 flex items-center justify-center border-4 border-gray-100">
                  <span className="text-3xl text-gray-500">{userData.name ? userData.name.charAt(0) : "?"}</span>
                </div>
              )}
            </div>
            <div>
              <h1 className="text-3xl font-bold text-gray-900 mb-2">{userData.name || "您的姓名"}</h1>
              <p className="text-xl text-gray-600 mb-3">{userData.profession || "您的职业"}</p>
              {userData.location && (
                <p className="text-gray-500 mb-4">
                  <span className="inline-block mr-2">📍</span>
                  {userData.location}
                </p>
              )}
              <div className="flex flex-wrap gap-3 mt-4">
                {userData.email && (
                  <a
                    href={`mailto:${userData.email}`}
                    className="inline-flex items-center px-3 py-1 bg-gray-100 rounded text-gray-700 text-sm hover:bg-gray-200"
                  >
                    ✉️ {userData.email}
                  </a>
                )}
                {userData.phone && (
                  <a
                    href={`tel:${userData.phone}`}
                    className="inline-flex items-center px-3 py-1 bg-gray-100 rounded text-gray-700 text-sm hover:bg-gray-200"
                  >
                    📱 {userData.phone}
                  </a>
                )}
                {userData.wechat && (
                  <span className="inline-flex items-center px-3 py-1 bg-gray-100 rounded text-gray-700 text-sm">
                    WeChat: {userData.wechat}
                  </span>
                )}
              </div>
            </div>
          </div>
        </div>
      </section>

      <div className="max-w-5xl mx-auto px-4 py-12">
        {/* 关于我 */}
        <section id="about" className="mb-16">
          <div className="flex items-center mb-6">
            <h2 className="text-2xl font-bold text-gray-800">关于我</h2>
            <div className="ml-4 h-0.5 flex-grow bg-gray-200"></div>
          </div>
          <div className="bg-white p-6 rounded-lg shadow-sm">
            <p className="text-gray-700 leading-relaxed">{userData.bio || "这里将显示您的个人简介..."}</p>
          </div>
        </section>

        {/* 项目作品 */}
        {userData.projects && userData.projects.length > 0 && userData.projects[0].title && (
          <section id="projects" className="mb-16">
            <div className="flex items-center mb-6">
              <h2 className="text-2xl font-bold text-gray-800">项目作品</h2>
              <div className="ml-4 h-0.5 flex-grow bg-gray-200"></div>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {userData.projects.map((project, index) => (
                <div key={index} className="bg-white rounded-lg shadow-sm overflow-hidden">
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
                    <h3 className="font-bold text-gray-900 text-lg mb-2">{project.title}</h3>
                    {project.description && <p className="text-gray-600 mb-4">{project.description}</p>}
                    {project.link && (
                      <a
                        href={project.link}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-block px-4 py-2 bg-gray-800 text-white rounded hover:bg-gray-700 transition-colors text-sm"
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
        <section id="contact" className="mb-16">
          <div className="flex items-center mb-6">
            <h2 className="text-2xl font-bold text-gray-800">联系我</h2>
            <div className="ml-4 h-0.5 flex-grow bg-gray-200"></div>
          </div>
          <div className="bg-white p-6 rounded-lg shadow-sm">
            <p className="text-gray-700 mb-6">如果您对我的服务感兴趣，或者有任何问题，请随时联系我。</p>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <h3 className="text-lg font-semibold text-gray-800 mb-4">联系方式</h3>
                <ul className="space-y-3">
                  {userData.email && (
                    <li className="flex items-center">
                      <span className="text-gray-500 mr-2">✉️</span>
                      <a href={`mailto:${userData.email}`} className="text-blue-600 hover:underline">
                        {userData.email}
                      </a>
                    </li>
                  )}
                  {userData.phone && (
                    <li className="flex items-center">
                      <span className="text-gray-500 mr-2">📱</span>
                      <a href={`tel:${userData.phone}`} className="text-blue-600 hover:underline">
                        {userData.phone}
                      </a>
                    </li>
                  )}
                  {userData.wechat && (
                    <li className="flex items-center">
                      <span className="text-gray-500 mr-2">WeChat:</span>
                      <span>{userData.wechat}</span>
                    </li>
                  )}
                </ul>
              </div>
              <div>
                <h3 className="text-lg font-semibold text-gray-800 mb-4">社交媒体</h3>
                <div className="flex flex-wrap gap-3">
                  {userData.socialLinks.wechat && (
                    <a
                      href={userData.socialLinks.wechat}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="px-4 py-2 bg-gray-100 rounded text-gray-700 hover:bg-gray-200"
                    >
                      微信公众号
                    </a>
                  )}
                  {userData.socialLinks.weibo && (
                    <a
                      href={userData.socialLinks.weibo}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="px-4 py-2 bg-gray-100 rounded text-gray-700 hover:bg-gray-200"
                    >
                      微博
                    </a>
                  )}
                  {userData.socialLinks.github && (
                    <a
                      href={userData.socialLinks.github}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="px-4 py-2 bg-gray-100 rounded text-gray-700 hover:bg-gray-200"
                    >
                      GitHub
                    </a>
                  )}
                  {userData.socialLinks.linkedin && (
                    <a
                      href={userData.socialLinks.linkedin}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="px-4 py-2 bg-gray-100 rounded text-gray-700 hover:bg-gray-200"
                    >
                      LinkedIn
                    </a>
                  )}
                  {userData.socialLinks.twitter && (
                    <a
                      href={userData.socialLinks.twitter}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="px-4 py-2 bg-gray-100 rounded text-gray-700 hover:bg-gray-200"
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
      <footer className="bg-gray-800 text-white py-6">
        <div className="max-w-5xl mx-auto px-4 text-center">
          <p>
            © {new Date().getFullYear()} {userData.name || "您的姓名"}. 保留所有权利。
          </p>
        </div>
      </footer>
    </div>
  )
}
