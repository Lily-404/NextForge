import type { UserData } from "@/types/user-data"
import Image from "next/image"
import { ThemeToggle } from "@/components/theme-toggle"

interface CreativePreviewProps {
  userData: UserData
}

export function CreativePreview({ userData }: CreativePreviewProps) {
  return (
    <div className="min-h-screen bg-background text-foreground">
      <div className="absolute top-0 left-0 w-full h-[50vh] bg-gradient-to-br from-primary/20 to-secondary/20 -z-10" />

      <header className="container mx-auto px-4 py-6">
        <div className="flex justify-between items-center">
          <div className="font-bold text-xl bg-clip-text text-transparent bg-gradient-to-r from-primary to-primary/60">
            {userData.name || "Your Name"}
          </div>
          <div className="flex items-center gap-4">
            <nav className="hidden md:flex space-x-6">
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
        <section className="py-20 md:py-32">
          <div className="container mx-auto px-4">
            <div className="max-w-4xl mx-auto text-center">
              <div className="relative w-40 h-40 mx-auto mb-8">
                {userData.avatar ? (
                  <Image
                    src={userData.avatar || "/placeholder.svg"}
                    alt={userData.name || "Profile"}
                    width={160}
                    height={160}
                    className="rounded-full object-cover border-4 border-background shadow-xl"
                  />
                ) : (
                  <div className="w-40 h-40 rounded-full bg-gradient-to-br from-primary/20 to-secondary/20 flex items-center justify-center border-4 border-background shadow-xl">
                    <span className="text-4xl text-foreground/60">{userData.name ? userData.name.charAt(0) : "?"}</span>
                  </div>
                )}
              </div>

              <h1 className="text-4xl md:text-5xl font-bold mb-4 bg-clip-text text-transparent bg-gradient-to-r from-primary to-primary/60">
                {userData.name || "Your Name"}
              </h1>
              <p className="text-2xl text-foreground/80 mb-6">{userData.profession || "Your Profession"}</p>
              {userData.location && (
                <p className="text-foreground/60 mb-8">
                  <span className="inline-block mr-2">📍</span>
                  {userData.location}
                </p>
              )}
              <p className="text-foreground/80 max-w-2xl mx-auto mb-8 leading-relaxed">
                {userData.bio || "在这里添加您的个人简介..."}
              </p>
              <div className="flex flex-wrap justify-center gap-4">
                {userData.email && (
                  <a
                    href={`mailto:${userData.email}`}
                    className="px-6 py-3 bg-primary text-primary-foreground rounded-full hover:bg-primary/90 transition-all shadow-md hover:shadow-lg"
                  >
                    联系我
                  </a>
                )}
                <a
                  href="#projects"
                  className="px-6 py-3 bg-secondary text-secondary-foreground rounded-full hover:bg-secondary/90 transition-all shadow-md hover:shadow-lg"
                >
                  查看作品
                </a>
              </div>
            </div>
          </div>
        </section>

        <section id="about" className="py-20 bg-muted/30">
          <div className="container mx-auto px-4">
            <div className="max-w-4xl mx-auto">
              <h2 className="text-3xl font-bold mb-12 text-center">关于我</h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
                <div>
                  <h3 className="text-xl font-bold mb-4 text-primary">个人简介</h3>
                  <p className="text-foreground/80 leading-relaxed mb-4">
                    {userData.bio || "在这里添加您的个人简介..."}
                  </p>
                  <p className="text-foreground/80 leading-relaxed">
                    作为一名{userData.profession || "创意工作者"}，我热衷于将创意转化为现实，
                    并通过我的作品传达独特的视角和情感。
                  </p>
                </div>
                <div>
                  <h3 className="text-xl font-bold mb-4 text-primary">联系方式</h3>
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
                  <div className="mt-6 flex flex-wrap gap-3">
                    {userData.socialLinks.github && (
                      <a
                        href={userData.socialLinks.github}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="px-4 py-2 bg-card border border-border rounded-full text-foreground hover:bg-muted transition-colors"
                      >
                        GitHub
                      </a>
                    )}
                    {userData.socialLinks.linkedin && (
                      <a
                        href={userData.socialLinks.linkedin}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="px-4 py-2 bg-card border border-border rounded-full text-foreground hover:bg-muted transition-colors"
                      >
                        LinkedIn
                      </a>
                    )}
                    {userData.socialLinks.twitter && (
                      <a
                        href={userData.socialLinks.twitter}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="px-4 py-2 bg-card border border-border rounded-full text-foreground hover:bg-muted transition-colors"
                      >
                        Twitter
                      </a>
                    )}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {userData.projects && userData.projects.length > 0 && userData.projects[0].title && (
          <section id="projects" className="py-20">
            <div className="container mx-auto px-4">
              <div className="max-w-4xl mx-auto">
                <h2 className="text-3xl font-bold mb-12 text-center">创意作品</h2>
                <div className="grid grid-cols-1 gap-12">
                  {userData.projects.map((project, index) => (
                    <div key={index} className="flex flex-col md:flex-row gap-8 items-center">
                      {project.imageUrl && (
                        <div className="w-full md:w-1/2 aspect-video relative rounded-lg overflow-hidden shadow-lg">
                          <Image
                            src={project.imageUrl || "/placeholder.svg"}
                            alt={project.title}
                            fill
                            className="object-cover"
                          />
                        </div>
                      )}
                      <div className="w-full md:w-1/2">
                        <h3 className="text-2xl font-bold mb-3">{project.title}</h3>
                        {project.description && (
                          <p className="text-foreground/80 mb-6 leading-relaxed">{project.description}</p>
                        )}
                        {project.link && (
                          <a
                            href={project.link}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="inline-flex items-center px-6 py-3 bg-primary text-primary-foreground rounded-full hover:bg-primary/90 transition-all shadow-md hover:shadow-lg"
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

        <section id="contact" className="py-20 bg-muted/30">
          <div className="container mx-auto px-4">
            <div className="max-w-4xl mx-auto text-center">
              <h2 className="text-3xl font-bold mb-6">联系我</h2>
              <p className="text-foreground/80 mb-12 max-w-2xl mx-auto">
                如果您对我的作品感兴趣，或者想要合作，请随时联系我。我期待与您共同创造精彩。
              </p>
              <div className="flex flex-wrap justify-center gap-4">
                {userData.email && (
                  <a
                    href={`mailto:${userData.email}`}
                    className="px-6 py-3 bg-primary text-primary-foreground rounded-full hover:bg-primary/90 transition-all shadow-md hover:shadow-lg"
                  >
                    发送邮件
                  </a>
                )}
                {userData.phone && (
                  <a
                    href={`tel:${userData.phone}`}
                    className="px-6 py-3 bg-secondary text-secondary-foreground rounded-full hover:bg-secondary/90 transition-all shadow-md hover:shadow-lg"
                  >
                    拨打电话
                  </a>
                )}
              </div>
              <div className="mt-12 flex justify-center space-x-6">
                {userData.socialLinks.wechat && (
                  <a
                    href={userData.socialLinks.wechat}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-foreground/60 hover:text-primary transition-colors"
                  >
                    微信
                  </a>
                )}
                {userData.socialLinks.weibo && (
                  <a
                    href={userData.socialLinks.weibo}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-foreground/60 hover:text-primary transition-colors"
                  >
                    微博
                  </a>
                )}
                {userData.socialLinks.github && (
                  <a
                    href={userData.socialLinks.github}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-foreground/60 hover:text-primary transition-colors"
                  >
                    GitHub
                  </a>
                )}
                {userData.socialLinks.linkedin && (
                  <a
                    href={userData.socialLinks.linkedin}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-foreground/60 hover:text-primary transition-colors"
                  >
                    LinkedIn
                  </a>
                )}
                {userData.socialLinks.twitter && (
                  <a
                    href={userData.socialLinks.twitter}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-foreground/60 hover:text-primary transition-colors"
                  >
                    Twitter
                  </a>
                )}
                {userData.socialLinks?.jike && (
                  <a
                    href={userData.socialLinks.jike}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-foreground/60 hover:text-primary transition-colors"
                  >
                    即刻
                  </a>
                )}
                {userData.socialLinks?.xiaohongshu && (
                  <a
                    href={userData.socialLinks.xiaohongshu}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-foreground/60 hover:text-primary transition-colors"
                  >
                    小红书
                  </a>
                )}
                {userData.socialLinks?.douyin && (
                  <a
                    href={userData.socialLinks.douyin}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-foreground/60 hover:text-primary transition-colors"
                  >
                    抖音
                  </a>
                )}
                {userData.socialLinks?.bilibili && (
                  <a
                    href={userData.socialLinks.bilibili}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-foreground/60 hover:text-primary transition-colors"
                  >
                    哔哩哔哩
                  </a>
                )}
              </div>
            </div>
          </div>
        </section>
      </main>

      <footer className="py-8 border-t border-border">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto text-center">
            <p className="text-foreground/60">
              © {new Date().getFullYear()} {userData.name || "Your Name"}. All rights reserved.
            </p>
          </div>
        </div>
      </footer>
    </div>
  )
}
