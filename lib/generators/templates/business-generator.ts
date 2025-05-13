import type JSZip from "jszip"

export function generateBusinessTemplate(zip: JSZip, userData: any) {
  // 创建模板目录结构
  const templatesDir = zip.folder("components/templates")

  // 添加商务模板组件
  templatesDir.file("business.tsx", generateBusinessTemplateComponent())

  // Add page.tsx
  zip.file("app/page.tsx", `import { BusinessTemplate } from "@/components/templates/business"
import userData from "@/data/user-data"

export default function Home() {
  return <BusinessTemplate userData={userData} />
}`)
}

// 生成主模板组件
function generateBusinessTemplateComponent() {
  return `import type { UserData } from "@/types/user-data"
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

export function BusinessTemplate({ userData }: { userData: UserData }) {
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
                    href={\`#\${section}\`}
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
                        href={\`mailto:\${userData.email}\`}
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
}`
}

// 生成 ProjectCard 组件
function generateProjectCard() {
  return `import Image from "next/image"
import { cn } from "@/lib/utils"

interface ProjectCardProps {
  project: {
    title: string
    description: string
    imageUrl: string
    link: string
  }
  isDark: boolean
}

export default function ProjectCard({ project, isDark }: ProjectCardProps) {
  return (
    <div className={cn(
      "group bg-white hover:bg-gray-900 transition-all duration-500",
      isDark ? "bg-[#1a1a1a]" : "bg-white"
    )}>
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
        <h3 className={cn(
          "text-2xl font-bold mb-4 tracking-tight",
          isDark ? "text-[#e5e5e5] group-hover:text-white" : "text-[#1a1a1a] group-hover:text-white"
        )}>
          {project.title}
        </h3>
        {project.description && (
          <p className={cn(
            "mb-8",
            isDark ? "text-[#666666] group-hover:text-gray-300" : "text-[#666666] group-hover:text-gray-300"
          )}>
            {project.description}
          </p>
        )}
        {project.link && (
          <a 
            href={project.link} 
            target="_blank" 
            rel="noopener noreferrer" 
            className={cn(
              "inline-flex items-center text-sm uppercase tracking-widest",
              isDark ? "text-[#e5e5e5] group-hover:text-white" : "text-[#1a1a1a] group-hover:text-white"
            )}
          >
            了解更多
            <span className="ml-2">→</span>
          </a>
        )}
      </div>
    </div>
  )
}`
}

// 生成 ContactCard 组件
function generateContactCard() {
  return `import { cn } from "@/lib/utils"

interface ContactCardProps {
  userData: {
    email: string
    phone: string
    wechat: string
  }
  isDark: boolean
}

export default function ContactCard({ userData, isDark }: ContactCardProps) {
  return (
    <div className={cn(
      "p-12 border",
      isDark ? "border-[#222222] bg-[#1a1a1a]" : "border-[#eaeaea] bg-white"
    )}>
      <h3 className={cn(
        "text-xl font-bold mb-8 tracking-tight",
        isDark ? "text-[#e5e5e5]" : "text-[#1a1a1a]"
      )}>
        直接联系
      </h3>
      <div className="space-y-4">
        {userData.email && (
          <a 
            href={\`mailto:\${userData.email}\`} 
            className={cn(
              "flex items-center transition-colors",
              isDark ? "text-[#666666] hover:text-[#e5e5e5]" : "text-[#666666] hover:text-[#1a1a1a]"
            )}
          >
            <span className="mr-3">✉️</span>
            {userData.email}
          </a>
        )}
        {userData.phone && (
          <a 
            href={\`tel:\${userData.phone}\`} 
            className={cn(
              "flex items-center transition-colors",
              isDark ? "text-[#666666] hover:text-[#e5e5e5]" : "text-[#666666] hover:text-[#1a1a1a]"
            )}
          >
            <span className="mr-3">📱</span>
            {userData.phone}
          </a>
        )}
        {userData.wechat && (
          <div className={cn(
            "flex items-center",
            isDark ? "text-[#666666]" : "text-[#666666]"
          )}>
            <span className="mr-3">💬</span>
            {userData.wechat}
          </div>
        )}
      </div>
    </div>
  )
}`
}

// 生成 SocialLinks 组件
function generateSocialLinks() {
  return `import { cn } from "@/lib/utils"

interface SocialLinksProps {
  socialLinks: {
    wechat?: string
    weibo?: string
    bilibili?: string
    github?: string
    linkedin?: string
    twitter?: string
  }
  isDark: boolean
}

export default function SocialLinks({ socialLinks, isDark }: SocialLinksProps) {
  return (
    <div className={cn(
      "p-12 border",
      isDark ? "border-[#222222] bg-[#1a1a1a]" : "border-[#eaeaea] bg-white"
    )}>
      <h3 className={cn(
        "text-xl font-bold mb-8 tracking-tight",
        isDark ? "text-[#e5e5e5]" : "text-[#1a1a1a]"
      )}>
        社交媒体
      </h3>
      <div className="flex flex-wrap gap-4">
        {Object.entries(socialLinks || {}).map(([platform, link]) => (
          link && (
            <a
              key={platform}
              href={link}
              target="_blank"
              rel="noopener noreferrer"
              className={cn(
                "px-6 py-3 border transition-colors",
                isDark 
                  ? "border-[#333333] text-[#666666] hover:border-[#e5e5e5] hover:text-[#e5e5e5]" 
                  : "border-[#eaeaea] text-[#666666] hover:border-[#1a1a1a] hover:text-[#1a1a1a]"
              )}
            >
              <span className="text-sm font-medium tracking-wider">
                {platform.charAt(0).toUpperCase() + platform.slice(1)}
              </span>
            </a>
          )
        ))}
      </div>
    </div>
  )
}`
}

// 生成 ErrorBoundary 组件
function generateErrorBoundary() {
  return `import React from "react"

interface Props {
  children: React.ReactNode
}

interface State {
  hasError: boolean
  error?: Error
}

export class ErrorBoundary extends React.Component<Props, State> {
  constructor(props: Props) {
    super(props)
    this.state = { hasError: false }
  }

  static getDerivedStateFromError(error: Error) {
    return { hasError: true, error }
  }

  componentDidCatch(error: Error, errorInfo: React.ErrorInfo) {
    console.error("Error caught by boundary:", error, errorInfo)
  }

  render() {
    if (this.state.hasError) {
      return (
        <div className="min-h-screen flex items-center justify-center bg-red-50">
          <div className="text-center">
            <h1 className="text-2xl font-bold text-red-600 mb-4">出错了</h1>
            <p className="text-gray-600">抱歉，页面加载时出现错误。</p>
          </div>
        </div>
      )
    }

    return this.props.children
  }
}`
}

// 生成 Loading 组件
function generateLoading() {
  return `export function Loading() {
  return (
    <div className="flex items-center justify-center p-8">
      <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-gray-900"></div>
    </div>
  )
}`
}

// 生成主题提供者
function generateThemeProvider() {
  return `import { createContext, useContext, useEffect, useState } from "react"

type Theme = "light" | "dark"

interface ThemeContextType {
  theme: Theme
  setTheme: (theme: Theme) => void
}

const ThemeContext = createContext<ThemeContextType | undefined>(undefined)

export function ThemeProvider({ children }: { children: React.ReactNode }) {
  const [theme, setTheme] = useState<Theme>("light")

  useEffect(() => {
    const savedTheme = localStorage.getItem("theme") as Theme
    if (savedTheme) {
      setTheme(savedTheme)
    } else if (window.matchMedia("(prefers-color-scheme: dark)").matches) {
      setTheme("dark")
    }
  }, [])

  useEffect(() => {
    document.documentElement.classList.remove("light", "dark")
    document.documentElement.classList.add(theme)
    localStorage.setItem("theme", theme)
  }, [theme])

  return (
    <ThemeContext.Provider value={{ theme, setTheme }}>
      {children}
    </ThemeContext.Provider>
  )
}

export function useTheme() {
  const context = useContext(ThemeContext)
  if (context === undefined) {
    throw new Error("useTheme must be used within a ThemeProvider")
  }
  return context
}`
}

// 生成工具函数
function generateUtils() {
  return `import { type ClassValue, clsx } from "clsx"
import { twMerge } from "tailwind-merge"

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}`
}
