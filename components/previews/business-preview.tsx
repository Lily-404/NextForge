import type { UserData } from "@/types/user-data"
import Image from "next/image"
import { ThemeToggle } from "@/components/theme-toggle"

interface BusinessPreviewProps {
  userData: UserData
}

export function BusinessPreview({ userData }: BusinessPreviewProps) {
  return (
    <div className="min-h-screen bg-background text-foreground">
      <header className="border-b border-border sticky top-0 bg-background/95 backdrop-blur-sm z-10">
        <div className="container mx-auto px-4">
          <div className="flex justify-between items-center h-16">
            <div className="font-bold text-xl">{userData.name || "Your Name"}</div>
            <nav className="hidden md:flex space-x-8">
              <a href="#about" className="text-foreground hover:text-primary transition-colors">
                关于
              </a>
              <a href="#projects" className="text-foreground hover:text-primary transition-colors">
                项目
              </a>
              <a href="#contact" className="text-foreground hover:text-primary transition-colors">
                联系
              </a>
            </nav>
            <ThemeToggle />
          </div>
        </div>
      </header>

      <main>
        <section className="py-16 md:py-24 border-b border-border">
          <div className="container mx-auto px-4">
            <div className="flex flex-col md:flex-row items-center md:items-start gap-8 max-w-4xl mx-auto">
              <div className="w-40 h-40 relative flex-shrink-0">
                {userData.avatar ? (
                  <Image
                    src={userData.avatar || "/placeholder.svg"}
                    alt={userData.name || "Profile"}
                    width={160}
                    height={160}
                    className="rounded-full object-cover border-4 border-muted"
                  />
                ) : (
                  <div className="w-40 h-40 rounded-full bg-muted flex items-center justify-center border-4 border-background">
                    <span className="text-4xl text-muted-foreground">
                      {userData.name ? userData.name.charAt(0) : "?"}
                    </span>
                  </div>
                )}
              </div>

              <div>
                <h1 className="text-4xl font-bold mb-2">{userData.name || "Your Name"}</h1>
                <p className="text-2xl text-primary mb-4">{userData.profession || "Your Profession"}</p>
                {userData.location && (
                  <p className="text-muted-foreground mb-4">
                    <span className="inline-block mr-2">📍</span>
                    {userData.location}
                  </p>
                )}
                <p className="text-muted-foreground mb-6 max-w-2xl">{userData.bio || "在这里添加您的个人简介..."}</p>
                <div className="flex flex-wrap gap-3">
                  {userData.email && (
                    <a
                      href={`mailto:${userData.email}`}
                      className="inline-flex items-center px-4 py-2 bg-primary text-primary-foreground rounded-md hover:bg-primary/90 transition-colors"
                    >
                      联系我
                    </a>
                  )}
                  {userData.socialLinks.linkedin && (
                    <a
                      href={userData.socialLinks.linkedin}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center px-4 py-2 bg-muted text-foreground rounded-md hover:bg-muted/80 transition-colors"
                    >
                      LinkedIn
                    </a>
                  )}
                </div>
              </div>
            </div>
          </div>
        </section>

        <section id="about" className="py-16 border-b border-border">
          <div className="container mx-auto px-4">
            <div className="max-w-4xl mx-auto">
              <h2 className="text-3xl font-bold mb-8">关于我</h2>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                <div className="md:col-span-2">
                  <p className="text-muted-foreground leading-relaxed mb-4">
                    {userData.bio || "在这里添加您的个人简介..."}
                  </p>
                  <p className="text-muted-foreground leading-relaxed">
                    作为一名{userData.profession || "专业人士"}，我致力于提供高质量的服务和解决方案。
                    我相信通过专业知识和创新思维，可以为客户创造真正的价值。
                  </p>
                </div>
                <div className="bg-card p-6 rounded-lg border border-border">
                  <h3 className="font-bold text-lg mb-4">联系方式</h3>
                  <ul className="space-y-3">
                    {userData.email && (
                      <li className="flex items-center">
                        <span className="text-muted-foreground mr-2">✉️</span>
                        <a href={`mailto:${userData.email}`} className="text-primary hover:underline">
                          {userData.email}
                        </a>
                      </li>
                    )}
                    {userData.phone && (
                      <li className="flex items-center">
                        <span className="text-muted-foreground mr-2">📱</span>
                        <a href={`tel:${userData.phone}`} className="text-primary hover:underline">
                          {userData.phone}
                        </a>
                      </li>
                    )}
                    {userData.wechat && (
                      <li className="flex items-center">
                        <span className="text-muted-foreground mr-2">WeChat:</span>
                        <span>{userData.wechat}</span>
                      </li>
                    )}
                  </ul>
                </div>
              </div>
            </div>
          </div>
        </section>

        {userData.projects && userData.projects.length > 0 && userData.projects[0].title && (
          <section id="projects" className="py-16 border-b border-border">
            <div className="container mx-auto px-4">
              <div className="max-w-4xl mx-auto">
                <h2 className="text-3xl font-bold mb-8">项目案例</h2>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                  {userData.projects.map((project, index) => (
                    <div key={index} className="bg-card border border-border rounded-lg overflow-hidden">
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
                        <h3 className="font-bold text-xl mb-2">{project.title}</h3>
                        {project.description && <p className="text-muted-foreground mb-4">{project.description}</p>}
                        {project.link && (
                          <a
                            href={project.link}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="inline-flex items-center px-4 py-2 bg-primary text-primary-foreground rounded-md text-sm hover:bg-primary/90 transition-colors"
                          >
                            查看项目
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

        <section id="contact" className="py-16">
          <div className="container mx-auto px-4">
            <div className="max-w-4xl mx-auto">
              <h2 className="text-3xl font-bold mb-8">联系我</h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                <div>
                  <h3 className="text-xl font-bold mb-4">联系方式</h3>
                  <p className="text-muted-foreground mb-6">如果您对我的服务感兴趣，或者有任何问题，请随时联系我。</p>
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
                    {userData.location && (
                      <li className="flex items-center">
                        <span className="text-primary mr-3 text-xl">📍</span>
                        <span className="text-foreground">{userData.location}</span>
                      </li>
                    )}
                  </ul>
                </div>
                <div>
                  <h3 className="text-xl font-bold mb-4">社交媒体</h3>
                  <div className="grid grid-cols-2 gap-3">
                    {userData.socialLinks.wechat && (
                      <a
                        href={userData.socialLinks.wechat}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="px-4 py-3 bg-card border border-border rounded-md text-foreground hover:bg-muted transition-colors"
                      >
                        微信公众号
                      </a>
                    )}
                    {userData.socialLinks.weibo && (
                      <a
                        href={userData.socialLinks.weibo}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="px-4 py-3 bg-card border border-border rounded-md text-foreground hover:bg-muted transition-colors"
                      >
                        微博
                      </a>
                    )}
                    {userData.socialLinks.github && (
                      <a
                        href={userData.socialLinks.github}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="px-4 py-3 bg-card border border-border rounded-md text-foreground hover:bg-muted transition-colors"
                      >
                        GitHub
                      </a>
                    )}
                    {userData.socialLinks.linkedin && (
                      <a
                        href={userData.socialLinks.linkedin}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="px-4 py-3 bg-card border border-border rounded-md text-foreground hover:bg-muted transition-colors"
                      >
                        LinkedIn
                      </a>
                    )}
                    {userData.socialLinks.twitter && (
                      <a
                        href={userData.socialLinks.twitter}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="px-4 py-3 bg-card border border-border rounded-md text-foreground hover:bg-muted transition-colors"
                      >
                        Twitter
                      </a>
                    )}
                    {userData.socialLinks?.jike && (
                      <a
                        href={userData.socialLinks.jike}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="px-4 py-3 bg-card border border-border rounded-md text-foreground hover:bg-muted transition-colors"
                      >
                        即刻
                      </a>
                    )}
                    {userData.socialLinks?.xiaohongshu && (
                      <a
                        href={userData.socialLinks.xiaohongshu}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="px-4 py-3 bg-card border border-border rounded-md text-foreground hover:bg-muted transition-colors"
                      >
                        小红书
                      </a>
                    )}
                    {userData.socialLinks?.douyin && (
                      <a
                        href={userData.socialLinks.douyin}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="px-4 py-3 bg-card border border-border rounded-md text-foreground hover:bg-muted transition-colors"
                      >
                        抖音
                      </a>
                    )}
                    {userData.socialLinks?.bilibili && (
                      <a
                        href={userData.socialLinks.bilibili}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="px-4 py-3 bg-card border border-border rounded-md text-foreground hover:bg-muted transition-colors"
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

      <footer className="bg-muted py-8">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto text-center">
            <p className="text-muted-foreground">
              © {new Date().getFullYear()} {userData.name || "Your Name"}. All rights reserved.
            </p>
          </div>
        </div>
      </footer>
    </div>
  )
}
