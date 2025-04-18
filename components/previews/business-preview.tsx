import type { UserData } from "@/types/user-data"
import Image from "next/image"

export function BusinessPreview({ userData }: { userData: UserData }) {
  return (
    <div className="min-h-screen bg-white font-sans">
      {/* 顶部导航 */}
      <nav className="bg-gray-900/95 backdrop-blur-sm sticky top-0 z-10 border-b border-gray-800">
        <div className="max-w-7xl mx-auto px-8">
          <div className="flex justify-between items-center h-20">
            <div className="font-bold text-2xl text-white tracking-tight">{userData.name || "您的姓名"}</div>
            <div className="flex space-x-12">
              <a href="#about" className="text-gray-300 hover:text-white transition-colors text-sm uppercase tracking-widest">关于</a>
              <a href="#projects" className="text-gray-300 hover:text-white transition-colors text-sm uppercase tracking-widest">项目</a>
              <a href="#contact" className="text-gray-300 hover:text-white transition-colors text-sm uppercase tracking-widest">联系</a>
            </div>
          </div>
        </div>
      </nav>

      <main>
        {/* Hero区域 */}
        <section className="py-32 bg-gradient-to-b from-gray-900 to-gray-800 text-white">
          <div className="max-w-7xl mx-auto px-8">
            <div className="flex flex-col md:flex-row items-center gap-16">
              <div className="w-64 h-64 relative flex-shrink-0">
                {userData.avatar ? (
                  <Image
                    src={userData.avatar}
                    alt={userData.name}
                    fill
                    className="object-cover grayscale hover:grayscale-0 transition-all duration-500"
                  />
                ) : (
                  <div className="w-64 h-64 bg-gray-800 flex items-center justify-center border border-gray-700">
                    <span className="text-6xl text-gray-600">{userData.name ? userData.name.charAt(0) : "?"}</span>
                  </div>
                )}
              </div>
              <div className="text-center md:text-left">
                <h1 className="text-5xl font-bold mb-6 tracking-tight">{userData.name || "您的姓名"}</h1>
                <p className="text-2xl text-gray-300 mb-8 tracking-wide">{userData.profession || "您的职业"}</p>
                <div className="flex flex-wrap gap-6 justify-center md:justify-start">
                  {userData.email && (
                    <a href={`mailto:${userData.email}`} 
                      className="inline-flex items-center px-8 py-4 bg-white text-gray-900 hover:bg-gray-100 transition-colors text-sm uppercase tracking-widest">
                      联系我
                    </a>
                  )}
                  {userData.socialLinks?.linkedin && (
                    <a href={userData.socialLinks.linkedin} 
                      target="_blank" 
                      rel="noopener noreferrer" 
                      className="inline-flex items-center px-8 py-4 border border-white text-white hover:bg-white hover:text-gray-900 transition-all duration-300 text-sm uppercase tracking-widest">
                      查看领英
                    </a>
                  )}
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* 关于我 */}
        <section id="about" className="py-32">
          <div className="max-w-7xl mx-auto px-8">
            <h2 className="text-4xl font-bold text-gray-900 mb-16 tracking-tight">关于我</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-16">
              <div className="bg-white border-t-2 border-gray-900 pt-8">
                <p className="text-gray-600 leading-relaxed text-lg">{userData.bio || "这里将显示您的个人简介..."}</p>
              </div>
              <div className="space-y-8">
                {userData.skills?.map((skill, index) => (
                  <div key={index} className="border-l-2 border-gray-900 pl-8">
                    <h3 className="text-xl font-bold text-gray-900 mb-2">{skill.category}</h3>
                    <p className="text-gray-600">{skill.items.join(' · ')}</p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </section>

        {/* 项目展示 */}
        {userData.projects && userData.projects.length > 0 && userData.projects[0].title && (
          <section id="projects" className="py-32 bg-gray-50">
            <div className="max-w-7xl mx-auto px-8">
              <h2 className="text-4xl font-bold text-gray-900 mb-16 tracking-tight">项目展示</h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
                {userData.projects.map((project, index) => (
                  <div key={index} className="group bg-white hover:bg-gray-900 transition-all duration-500">
                    {project.imageUrl && (
                      <div className="aspect-video relative">
                        <Image 
                          src={project.imageUrl} 
                          alt={project.title} 
                          fill 
                          className="object-cover group-hover:opacity-80 transition-opacity duration-500" 
                        />
                      </div>
                    )}
                    <div className="p-12">
                      <h3 className="text-2xl font-bold text-gray-900 group-hover:text-white mb-4 tracking-tight">
                        {project.title}
                      </h3>
                      {project.description && (
                        <p className="text-gray-600 group-hover:text-gray-300 mb-8">
                          {project.description}
                        </p>
                      )}
                      {project.link && (
                        <a 
                          href={project.link} 
                          target="_blank" 
                          rel="noopener noreferrer" 
                          className="inline-flex items-center text-sm uppercase tracking-widest text-gray-900 group-hover:text-white"
                        >
                          了解更多
                          <span className="ml-2">→</span>
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
        <section id="contact" className="py-32">
          <div className="max-w-7xl mx-auto px-8">
            <h2 className="text-4xl font-bold text-gray-900 mb-16 tracking-tight">联系方式</h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-12">
              <div className="col-span-2 bg-gray-900 p-12 text-white">
                <h3 className="text-2xl font-bold mb-8 tracking-tight">让我们开始合作</h3>
                <p className="text-gray-300 text-lg mb-8">
                  如果您对我的工作感兴趣，或者想要了解更多信息，请随时与我联系。
                </p>
                <div className="space-y-6">
                  {userData.email && (
                    <a href={`mailto:${userData.email}`} className="flex items-center text-white hover:text-gray-300">
                      <span className="mr-4 text-xl">✉️</span>
                      {userData.email}
                    </a>
                  )}
                  {userData.phone && (
                    <a href={`tel:${userData.phone}`} className="flex items-center text-white hover:text-gray-300">
                      <span className="mr-4 text-xl">📱</span>
                      {userData.phone}
                    </a>
                  )}
                </div>
              </div>
              <div className="bg-gray-50 p-12">
                <h3 className="text-xl font-bold text-gray-900 mb-8 tracking-tight">社交媒体</h3>
                <div className="space-y-4">
                  {Object.entries(userData.socialLinks || {}).map(([platform, link]) => (
                    link && (
                      <a
                        key={platform}
                        href={link}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="block text-gray-600 hover:text-gray-900 transition-colors uppercase text-sm tracking-widest"
                      >
                        {platform}
                      </a>
                    )
                  ))}
                </div>
              </div>
            </div>
          </div>
        </section>
      </main>

      <footer className="bg-gray-900 py-20">
        <div className="max-w-7xl mx-auto px-8 text-center">
          <p className="text-gray-500 text-sm tracking-widest uppercase">
            © {new Date().getFullYear()} {userData.name || "您的姓名"}
          </p>
        </div>
      </footer>
    </div>
  )
}
