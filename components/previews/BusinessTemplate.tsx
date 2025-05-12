import type { UserData } from "@/types"
import Image from "next/image"
import { Suspense, lazy } from "react"
import { ErrorBoundary } from "@/components/ErrorBoundary"
import { Loading } from "@/components/ui/Loading"
import { useTheme } from "@/components/theme-provider"
import { cn } from "@/lib/utils"

// 懒加载组件
const ProjectCard = lazy(() => import("@/components/business/ProjectCard"))
const ContactCard = lazy(() => import("@/components/business/ContactCard"))
const SocialLinks = lazy(() => import("@/components/business/SocialLinks"))

export default function BusinessTemplate({ userData }: { userData: UserData }) {
  const { theme } = useTheme()
  const isDark = theme === "dark"

  return (
    <ErrorBoundary>
      <div className={cn(
        "min-h-screen font-sans",
        isDark ? "bg-[#111111]" : "bg-[#fafafa]"
      )}>
        {/* 顶部导航 */}
        <nav className={cn(
          "sticky top-0 z-10 border-b",
          isDark ? "bg-[#111111] border-[#222222]" : "bg-[#fafafa] border-[#eaeaea]"
        )}>
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="flex justify-between items-center h-20">
              <div className={cn(
                "font-bold text-2xl tracking-tight",
                isDark ? "text-[#e5e5e5]" : "text-[#1a1a1a]"
              )}>
                {userData.name || "您的姓名"}
              </div>
              <div className="flex space-x-12">
                {["about", "projects", "contact"].map((section) => (
                  <a
                    key={section}
                    href={`#${section}`}
                    className={cn(
                      "text-sm font-medium uppercase tracking-wider transition-colors",
                      isDark ? "text-[#666666] hover:text-[#e5e5e5]" : "text-[#666666] hover:text-[#1a1a1a]"
                    )}
                  >
                    {section.charAt(0).toUpperCase() + section.slice(1)}
                  </a>
                ))}
              </div>
            </div>
          </div>
        </nav>

        {/* 主要内容区 */}
        <main>
          {/* Hero区域 */}
          <section className={cn(
            "py-32",
            isDark ? "bg-[#111111]" : "bg-[#fafafa]"
          )}>
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
              <div className="flex flex-col md:flex-row items-center gap-16">
                <div className="w-64 h-64 relative flex-shrink-0">
                  {userData.avatar ? (
                    <Image
                      src={userData.avatar}
                      alt={userData.name}
                      fill
                      className="object-cover border"
                      style={{ borderColor: isDark ? "#222222" : "#eaeaea" }}
                      loading="eager"
                      priority
                    />
                  ) : (
                    <div className={cn(
                      "w-64 h-64 flex items-center justify-center border",
                      isDark ? "bg-[#1a1a1a] border-[#222222]" : "bg-[#f5f5f5] border-[#eaeaea]"
                    )}>
                      <span className={cn(
                        "text-6xl font-light",
                        isDark ? "text-[#e5e5e5]" : "text-[#1a1a1a]"
                      )}>
                        {userData.name ? userData.name.charAt(0) : "?"}
                      </span>
                    </div>
                  )}
                </div>
                <div className="text-center md:text-left flex-1">
                  <h1 className={cn(
                    "text-5xl font-bold mb-6 tracking-tight",
                    isDark ? "text-[#e5e5e5]" : "text-[#1a1a1a]"
                  )}>
                    {userData.name || "您的姓名"}
                  </h1>
                  <p className={cn(
                    "text-xl mb-8",
                    isDark ? "text-[#666666]" : "text-[#666666]"
                  )}>
                    {userData.profession || "您的职业"}
                  </p>
                  <div className="flex flex-wrap gap-4 justify-center md:justify-start">
                    {userData.email && (
                      <a
                        href={`mailto:${userData.email}`}
                        className={cn(
                          "inline-flex items-center px-8 py-3 border transition-colors",
                          isDark 
                            ? "border-[#333333] text-[#e5e5e5] hover:border-[#e5e5e5]" 
                            : "border-[#1a1a1a] text-[#1a1a1a] hover:bg-[#1a1a1a] hover:text-[#fafafa]"
                        )}
                      >
                        <span className="text-sm font-medium tracking-wider">联系我</span>
                      </a>
                    )}
                    {userData.socialLinks?.linkedin && (
                      <a
                        href={userData.socialLinks.linkedin}
                        target="_blank"
                        rel="noopener noreferrer"
                        className={cn(
                          "inline-flex items-center px-8 py-3 border transition-colors",
                          isDark 
                            ? "border-[#333333] text-[#666666] hover:border-[#e5e5e5] hover:text-[#e5e5e5]" 
                            : "border-[#eaeaea] text-[#666666] hover:border-[#1a1a1a] hover:text-[#1a1a1a]"
                        )}
                      >
                        <span className="text-sm font-medium tracking-wider">查看领英</span>
                      </a>
                    )}
                  </div>
                </div>
              </div>
            </div>
          </section>

          {/* 关于我 */}
          <section id="about" className="py-32">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
              <h2 className={cn(
                "text-4xl font-bold mb-16 text-center tracking-tight",
                isDark ? "text-[#e5e5e5]" : "text-[#1a1a1a]"
              )}>
                关于我
              </h2>
              <div className={cn(
                "p-12 border",
                isDark ? "border-[#222222] bg-[#1a1a1a]" : "border-[#eaeaea] bg-white"
              )}>
                <p className={cn(
                  "leading-relaxed text-lg",
                  isDark ? "text-[#666666]" : "text-[#666666]"
                )}>
                  {userData.bio || "这里将显示您的个人简介..."}
                </p>
              </div>
            </div>
          </section>

          {/* 项目展示 */}
          {userData.projects && userData.projects.length > 0 && userData.projects[0].title && (
            <section id="projects" className={cn(
              "py-32",
              isDark ? "bg-[#1a1a1a]" : "bg-[#f5f5f5]"
            )}>
              <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <h2 className={cn(
                  "text-4xl font-bold mb-16 text-center tracking-tight",
                  isDark ? "text-[#e5e5e5]" : "text-[#1a1a1a]"
                )}>
                  项目展示
                </h2>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                  <Suspense fallback={<Loading />}>
                    {userData.projects.map((project, index) => (
                      <ProjectCard
                        key={index}
                        project={project}
                        isDark={isDark}
                      />
                    ))}
                  </Suspense>
                </div>
              </div>
            </section>
          )}

          {/* 联系方式 */}
          <section id="contact" className="py-32">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
              <h2 className={cn(
                "text-4xl font-bold mb-16 text-center tracking-tight",
                isDark ? "text-[#e5e5e5]" : "text-[#1a1a1a]"
              )}>
                联系方式
              </h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                <Suspense fallback={<Loading />}>
                  <ContactCard userData={userData} isDark={isDark} />
                  <SocialLinks socialLinks={userData.socialLinks} isDark={isDark} />
                </Suspense>
              </div>
            </div>
          </section>
        </main>

        {/* 页脚 */}
        <footer className={cn(
          "py-16 border-t",
          isDark ? "bg-[#111111] border-[#222222]" : "bg-[#fafafa] border-[#eaeaea]"
        )}>
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
            <p className={cn(
              "text-sm tracking-wider",
              isDark ? "text-[#666666]" : "text-[#666666]"
            )}>
              © {new Date().getFullYear()} {userData.name || "您的姓名"}. 保留所有权利。
            </p>
          </div>
        </footer>
      </div>
    </ErrorBoundary>
  )
}
