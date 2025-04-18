import type { UserData } from "@/types/user-data"
import Image from "next/image"

export function MinimalPreview({ userData }: { userData: UserData }) {
  return (
    <div className="min-h-screen bg-white font-sans antialiased">
      <nav className="fixed top-0 left-0 right-0 bg-white/80 backdrop-blur-sm z-10 border-b border-gray-100">
        <div className="max-w-screen-sm mx-auto px-6 h-16 flex items-center justify-between">
          <span className="text-sm font-medium">{userData.name || "姓名"}</span>
          <div className="flex gap-8">
            <a href="#about" className="text-sm text-gray-600 hover:text-black transition-colors">关于</a>
            <a href="#works" className="text-sm text-gray-600 hover:text-black transition-colors">作品</a>
            <a href="#contact" className="text-sm text-gray-600 hover:text-black transition-colors">联系</a>
          </div>
        </div>
      </nav>

      <main className="pt-16">
        <section className="py-24">
          <div className="max-w-screen-sm mx-auto px-6">
            <div className="flex flex-col items-center gap-8">
              <div className="w-24 h-24 relative">
                {userData.avatar ? (
                  <Image
                    src={userData.avatar}
                    alt={userData.name}
                    fill
                    className="object-cover"
                  />
                ) : (
                  <div className="w-24 h-24 bg-gray-50 flex items-center justify-center">
                    <span className="text-2xl text-gray-400">{userData.name ? userData.name.charAt(0) : "?"}</span>
                  </div>
                )}
              </div>
              <div className="text-center space-y-4">
                <h1 className="text-2xl font-normal">{userData.name || "姓名"}</h1>
                <p className="text-gray-600">{userData.profession || "职业"}</p>
              </div>
            </div>
          </div>
        </section>

        <section id="about" className="py-24 border-t border-gray-100">
          <div className="max-w-screen-sm mx-auto px-6">
            <h2 className="text-sm font-medium mb-12">关于</h2>
            <p className="text-gray-600 leading-relaxed">
              {userData.bio || "个人简介..."}
            </p>
          </div>
        </section>

        {userData.projects && userData.projects.length > 0 && userData.projects[0].title && (
          <section id="works" className="py-24 border-t border-gray-100">
            <div className="max-w-screen-sm mx-auto px-6">
              <h2 className="text-sm font-medium mb-12">作品</h2>
              <div className="space-y-16">
                {userData.projects.map((project, index) => (
                  <div key={index} className="group">
                    {project.imageUrl && (
                      <div className="aspect-[3/2] relative mb-6 bg-gray-50">
                        <Image
                          src={project.imageUrl}
                          alt={project.title}
                          fill
                          className="object-cover opacity-90 group-hover:opacity-100 transition-opacity"
                        />
                      </div>
                    )}
                    <h3 className="text-lg mb-2">{project.title}</h3>
                    {project.description && (
                      <p className="text-gray-600 text-sm mb-4">{project.description}</p>
                    )}
                    {project.link && (
                      <a
                        href={project.link}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-sm text-gray-600 hover:text-black transition-colors"
                      >
                        查看详情
                      </a>
                    )}
                  </div>
                ))}
              </div>
            </div>
          </section>
        )}

        <section id="contact" className="py-24 border-t border-gray-100">
          <div className="max-w-screen-sm mx-auto px-6">
            <h2 className="text-sm font-medium mb-12">联系</h2>
            <div className="space-y-4">
              {userData.email && (
                <a href={`mailto:${userData.email}`} className="block text-gray-600 hover:text-black transition-colors">
                  {userData.email}
                </a>
              )}
              {userData.phone && (
                <a href={`tel:${userData.phone}`} className="block text-gray-600 hover:text-black transition-colors">
                  {userData.phone}
                </a>
              )}
              {userData.location && (
                <p className="text-gray-600">{userData.location}</p>
              )}
            </div>
            
            {Object.values(userData.socialLinks || {}).some(link => link) && (
              <div className="mt-12 pt-12 border-t border-gray-100">
                <div className="flex flex-wrap gap-4">
                  {Object.entries(userData.socialLinks || {}).map(([platform, link]) => (
                    link && (
                      <a
                        key={platform}
                        href={link}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-sm text-gray-600 hover:text-black transition-colors"
                      >
                        {platform}
                      </a>
                    )
                  ))}
                </div>
              </div>
            )}
          </div>
        </section>
      </main>

      <footer className="py-12 border-t border-gray-100">
        <div className="max-w-screen-sm mx-auto px-6">
          <p className="text-sm text-gray-400 text-center">
            © {new Date().getFullYear()} {userData.name}
          </p>
        </div>
      </footer>
    </div>
  )
}