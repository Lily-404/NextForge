import type { UserData } from "@/types/user-data"
import Image from "next/image"
import { ThemeToggle } from "@/components/theme-toggle"

interface FunPreviewProps {
  userData: UserData
}

export function FunPreview({ userData }: FunPreviewProps) {
  return (
    <div className="min-h-screen bg-background text-foreground">
      <div className="absolute top-0 left-0 w-full h-[70vh] bg-gradient-to-b from-primary/20 via-secondary/20 to-background -z-10" />

      <header className="container mx-auto px-4 py-6">
        <div className="flex justify-between items-center">
          <div className="font-bold text-xl">
            <span className="text-primary">✨</span> {userData.name || "Your Name"}
          </div>
          <ThemeToggle />
        </div>
      </header>

      <main>
        <section className="py-16">
          <div className="container mx-auto px-4">
            <div className="max-w-4xl mx-auto text-center">
              <div className="relative w-40 h-40 mx-auto mb-8 transform rotate-3 hover:rotate-0 transition-transform duration-300">
                {userData.avatar ? (
                  <Image
                    src={userData.avatar || "/placeholder.svg"}
                    alt={userData.name || "Profile"}
                    width={160}
                    height={160}
                    className="rounded-2xl object-cover border-4 border-background shadow-xl"
                  />
                ) : (
                  <div className="w-40 h-40 rounded-2xl bg-gradient-to-br from-primary/30 to-secondary/30 flex items-center justify-center border-4 border-background shadow-xl">
                    <span className="text-4xl text-foreground/60">{userData.name ? userData.name.charAt(0) : "?"}</span>
                  </div>
                )}
              </div>

              <h1 className="text-4xl md:text-5xl font-bold mb-4">嗨！我是 {userData.name || "Your Name"} 👋</h1>
              <p className="text-2xl text-primary mb-6">{userData.profession || "Your Profession"} ✨</p>
              {userData.location && (
                <p className="text-foreground/60 mb-8 text-lg">
                  <span className="inline-block mr-2">📍</span>
                  来自 {userData.location}
                </p>
              )}
              <p className="text-foreground/80 max-w-2xl mx-auto mb-8 leading-relaxed text-lg">
                {userData.bio || "在这里添加您的个人简介..."}
              </p>
              <div className="flex flex-wrap justify-center gap-4">
                {userData.email && (
                  <a
                    href={`mailto:${userData.email}`}
                    className="px-6 py-3 bg-primary text-primary-foreground rounded-full hover:bg-primary/90 transition-all shadow-md hover:shadow-lg transform hover:scale-105"
                  >
                    ✉️ 给我发邮件
                  </a>
                )}
                {userData.phone && (
                  <a
                    href={`tel:${userData.phone}`}
                    className="px-6 py-3 bg-secondary text-secondary-foreground rounded-full hover:bg-secondary/90 transition-all shadow-md hover:shadow-lg transform hover:scale-105"
                  >
                    📱 给我打电话
                  </a>
                )}
              </div>
            </div>
          </div>
        </section>

        {userData.projects && userData.projects.length > 0 && userData.projects[0].title && (
          <section className="py-16">
            <div className="container mx-auto px-4">
              <div className="max-w-4xl mx-auto">
                <h2 className="text-3xl font-bold mb-12 text-center">
                  <span className="inline-block mr-2">🚀</span>
                  我的酷炫项目
                </h2>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                  {userData.projects.map((project, index) => (
                    <div
                      key={index}
                      className={`bg-card border border-border rounded-xl overflow-hidden shadow-lg transform ${
                        index % 2 === 0 ? "rotate-1" : "-rotate-1"
                      } hover:rotate-0 transition-transform duration-300`}
                    >
                      {project.imageUrl && (
                        <div className="aspect-video relative">
                          <Image
                            src={project.imageUrl || "/placeholder.svg"}
                            alt={project.title}
                            fill
                            className="object-cover"
                          />
                        </div>
                      )}
                      <div className="p-6">
                        <h3 className="font-bold text-xl mb-3">{project.title} ✨</h3>
                        {project.description && <p className="text-foreground/80 mb-4">{project.description}</p>}
                        {project.link && (
                          <a
                            href={project.link}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="inline-flex items-center px-4 py-2 bg-primary text-primary-foreground rounded-full hover:bg-primary/90 transition-all transform hover:scale-105"
                          >
                            查看项目 👀
                          </a>
                        )}
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </section>
        )}

        <section className="py-16 bg-muted/30">
          <div className="container mx-auto px-4">
            <div className="max-w-4xl mx-auto text-center">
              <h2 className="text-3xl font-bold mb-6">
                <span className="inline-block mr-2">📬</span>
                联系我
              </h2>
              <p className="text-foreground/80 mb-12 max-w-2xl mx-auto">想要聊天、合作或者只是打个招呼？随时联系我！</p>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-8 text-left max-w-2xl mx-auto">
                <div className="bg-card p-6 rounded-xl border border-border shadow-md transform rotate-1 hover:rotate-0 transition-transform duration-300">
                  <h3 className="text-xl font-bold mb-4">联系方式 📞</h3>
                  <ul className="space-y-4">
                    {userData.email && (
                      <li className="flex items-center">
                        <span className="text-primary mr-3 text-xl">✉️</span>
                        <a href={`mailto:${userData.email}`} className="text-foreground hover:text-primary">
                          {userData.email}
                        </a>
                      </li>
                    )}
                    {userData.phone && (
                      <li className="flex items-center">
                        <span className="text-primary mr-3 text-xl">📱</span>
                        <a href={`tel:${userData.phone}`} className="text-foreground hover:text-primary">
                          {userData.phone}
                        </a>
                      </li>
                    )}
                    {userData.wechat && (
                      <li className="flex items-center">
                        <span className="text-primary mr-3 text-xl">💬</span>
                        <span className="text-foreground">{userData.wechat}</span>
                      </li>
                    )}
                  </ul>
                </div>

                <div className="bg-card p-6 rounded-xl border border-border shadow-md transform -rotate-1 hover:rotate-0 transition-transform duration-300">
                  <h3 className="text-xl font-bold mb-4">社交媒体 🌐</h3>
                  <div className="flex flex-wrap gap-3">
                    {userData.socialLinks.wechat && (
                      <a
                        href={userData.socialLinks.wechat}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="px-4 py-2 bg-primary/10 rounded-full text-foreground hover:bg-primary/20 transition-colors"
                      >
                        微信公众号
                      </a>
                    )}
                    {userData.socialLinks.weibo && (
                      <a
                        href={userData.socialLinks.weibo}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="px-4 py-2 bg-destructive/10 rounded-full text-foreground hover:bg-destructive/20 transition-colors"
                      >
                        微博
                      </a>
                    )}
                    {userData.socialLinks.github && (
                      <a
                        href={userData.socialLinks.github}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="px-4 py-2 bg-muted rounded-full text-foreground hover:bg-muted/80 transition-colors"
                      >
                        GitHub
                      </a>
                    )}
                    {userData.socialLinks.linkedin && (
                      <a
                        href={userData.socialLinks.linkedin}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="px-4 py-2 bg-primary/10 rounded-full text-foreground hover:bg-primary/20 transition-colors"
                      >
                        LinkedIn
                      </a>
                    )}
                    {userData.socialLinks.twitter && (
                      <a
                        href={userData.socialLinks.twitter}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="px-4 py-2 bg-primary/10 rounded-full text-foreground hover:bg-primary/20 transition-colors"
                      >
                        Twitter
                      </a>
                    )}
                    {userData.socialLinks?.jike && (
                      <a
                        href={userData.socialLinks.jike}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="px-4 py-2 bg-primary/10 rounded-full text-foreground hover:bg-primary/20 transition-colors"
                      >
                        即刻
                      </a>
                    )}
                    {userData.socialLinks?.xiaohongshu && (
                      <a
                        href={userData.socialLinks.xiaohongshu}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="px-4 py-2 bg-red-200 rounded-full text-red-700 font-medium hover:bg-red-300 transition-colors transform hover:scale-105"
                      >
                        小红书
                      </a>
                    )}
                    {userData.socialLinks?.douyin && (
                      <a
                        href={userData.socialLinks.douyin}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="px-4 py-2 bg-black rounded-full text-white font-medium hover:bg-gray-800 transition-colors transform hover:scale-105"
                      >
                        抖音
                      </a>
                    )}
                    {userData.socialLinks?.bilibili && (
                      <a
                        href={userData.socialLinks.bilibili}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="px-4 py-2 bg-blue-200 rounded-full text-blue-700 font-medium hover:bg-blue-300 transition-colors transform hover:scale-105"
                      >
                        哔哩哔哩
                      </a>
                    )}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>
      </main>

      <footer className="py-8 border-t border-border">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto text-center">
            <p className="text-foreground/60">
              © {new Date().getFullYear()} {userData.name || "Your Name"} 🎉 用❤️制作
            </p>
          </div>
        </div>
      </footer>
    </div>
  )
}
