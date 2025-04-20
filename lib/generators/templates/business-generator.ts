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

export function BusinessTemplate({ userData }: { userData: UserData }) {
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
                      href={"mailto:" + userData.email}
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
                    <a href={"mailto:" + userData.email} className="flex items-center text-gray-600 hover:text-blue-600">
                      <span className="mr-3">✉️</span>
                      {userData.email}
                    </a>
                  )}
                  {userData.phone && (
                    <a href={"tel:" + userData.phone} className="flex items-center text-gray-600 hover:text-blue-600">
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
}`
}

// Generate header component
function generateBusinessHeader() {
  return `import userData from "@/data/user-data"

export function BusinessHeader() {
  return (
    <nav className="bg-gray-900/95 backdrop-blur-sm sticky top-0 z-10 border-b border-gray-800">
      <div className="max-w-7xl mx-auto px-8">
        <div className="flex justify-between items-center h-20">
          <div className="font-bold text-2xl text-white tracking-tight">{userData.name}</div>
          <div className="flex space-x-12">
            <a href="#about" className="text-gray-300 hover:text-white transition-colors text-sm uppercase tracking-widest">关于</a>
            <a href="#projects" className="text-gray-300 hover:text-white transition-colors text-sm uppercase tracking-widest">项目</a>
            <a href="#contact" className="text-gray-300 hover:text-white transition-colors text-sm uppercase tracking-widest">联系</a>
          </div>
        </div>
      </div>
    </nav>
  )
}
`
}

// Generate footer component
function generateBusinessFooter() {
  return `import userData from "@/data/user-data"

export function BusinessFooter() {
  return (
    <footer className="bg-gray-900 py-20">
      <div className="max-w-7xl mx-auto px-8 text-center">
        <p className="text-gray-500 text-sm tracking-widest uppercase">
          © {new Date().getFullYear()} {userData.name}
        </p>
      </div>
    </footer>
  )
}`
}

// Generate about section component
function generateBusinessAboutSection() {
  return `import userData from "@/data/user-data"

export function BusinessAboutSection() {
  return (
    <section id="about" className="py-32">
      <div className="max-w-7xl mx-auto px-8">
        <h2 className="text-4xl font-bold text-gray-900 mb-16 tracking-tight">关于我</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-16">
          <div className="bg-white border-t-2 border-gray-900 pt-8">
            <p className="text-gray-600 leading-relaxed text-lg">{userData.bio}</p>
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
  )
}`
}

// Generate projects section component
function generateBusinessProjectsSection() {
  return `import Image from "next/image"
import userData from "@/data/user-data"

export function BusinessProjectsSection() {
  return (
    <section id="projects" className="py-32 bg-gray-50">
      <div className="max-w-7xl mx-auto px-8">
        <h2 className="text-4xl font-bold text-gray-900 mb-16 tracking-tight">项目展示</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
          {userData.projects?.map((project, index) => (
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
  )
}`
}

// Generate contact section component
function generateBusinessContactSection() {
  return `import userData from "@/data/user-data"

export function BusinessContactSection() {
  return (
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
                <a href={\`mailto:\${userData.email}\`} className="flex items-center text-white hover:text-gray-300">
                  <span className="mr-4 text-xl">✉️</span>
                  {userData.email}
                </a>
              )}
              {userData.phone && (
                <a href={\`tel:\${userData.phone}\`} className="flex items-center text-white hover:text-gray-300">
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
  )
}`
}

// Generate hero section component
function generateBusinessHeroSection() {
  return `import Image from "next/image"
import userData from "@/data/user-data"
import { getImageFallback } from "./utils"

export function BusinessHeroSection() {
  return (
    <section className="py-16 md:py-24 border-b border-border">
      <div className="container mx-auto px-4">
        <div className="flex flex-col md:flex-row items-center md:items-start gap-8 max-w-4xl mx-auto">
          <div className="w-40 h-40 relative flex-shrink-0">
            {userData.avatar ? (
              <Image
                src={userData.avatar || "/placeholder.svg?height=160&width=160"}
                alt={userData.name}
                width={160}
                height={160}
                className="rounded-full object-cover border-4 border-muted"
              />
            ) : (
              <div className="w-40 h-40 rounded-full bg-muted flex items-center justify-center border-4 border-background">
                <span className="text-4xl text-muted-foreground">
                  {getImageFallback(userData.name)}
                </span>
              </div>
            )}
          </div>

          <div>
            <h1 className="text-4xl font-bold mb-2">{userData.name}</h1>
            <p className="text-2xl text-primary mb-4">{userData.profession}</p>
            {userData.location && (
              <p className="text-muted-foreground mb-4">
                <span className="inline-block mr-2">📍</span>
                {userData.location}
              </p>
            )}
            <p className="text-muted-foreground mb-6 max-w-2xl">{userData.bio}</p>
            <div className="flex flex-wrap gap-3">
              {userData.email && (
                <a
                  href={\`mailto:\${userData.email}\`}
                  className="inline-flex items-center px-4 py-2 bg-primary text-primary-foreground rounded-md hover:bg-primary/90 transition-colors"
                >
                  Contact Me
                </a>
              )}
              {userData.socialLinks?.linkedin && (
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
  )
}
`
}

// Generate types file
function generateBusinessTypes() {
  return `export interface Project {
  title: string
  description: string
  imageUrl: string
  link: string
}

export interface SocialLinks {
  wechat?: string
  weibo?: string
  github?: string
  linkedin?: string
  twitter?: string
}

export interface UserData {
  name: string
  email: string
  phone: string
  wechat: string
  profession: string
  location: string
  bio: string
  avatar: string
  projects: Project[]
  socialLinks: SocialLinks
}
`
}

// Generate utils file
function generateBusinessUtils() {
  return `/**
 * Get a fallback character for avatar when no image is provided
 */
export function getImageFallback(name: string): string {
  if (!name) return "?"
  return name.charAt(0).toUpperCase()
}

/**
 * Format a date to a readable string
 */
export function formatDate(date: Date): string {
  return new Intl.DateTimeFormat('en-US', {
    year: 'numeric',
    month: 'long',
    day: 'numeric'
  }).format(date)
}
`
}
