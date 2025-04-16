import type JSZip from "jszip"

export function generateMinimalistTemplate(zip: JSZip, userData: any) {
  // Create template directory structure
  const templatesDir = zip.folder("components/templates/minimalist")

  // Add index file to export all components
  templatesDir.file("index.tsx", generateMinimalistIndex())

  // Add component files
  templatesDir.file("template.tsx", generateMinimalistTemplateComponent())
  templatesDir.file("header.tsx", generateMinimalistHeader())
  templatesDir.file("footer.tsx", generateMinimalistFooter())
  templatesDir.file("about-section.tsx", generateMinimalistAboutSection())
  templatesDir.file("projects-section.tsx", generateMinimalistProjectsSection())
  templatesDir.file("contact-section.tsx", generateMinimalistContactSection())
  templatesDir.file("profile-card.tsx", generateMinimalistProfileCard())

  // Add types file
  templatesDir.file("types.ts", generateMinimalistTypes())

  // Add utils file
  templatesDir.file("utils.ts", generateMinimalistUtils())
}

// Generate index file to export all components
function generateMinimalistIndex() {
  return `// Export all minimalist template components
export { MinimalistTemplate } from './template'
export { MinimalistHeader } from './header'
export { MinimalistFooter } from './footer'
export { MinimalistAboutSection } from './about-section'
export { MinimalistProjectsSection } from './projects-section'
export { MinimalistContactSection } from './contact-section'
export { MinimalistProfileCard } from './profile-card'
`
}

// Generate main template component
function generateMinimalistTemplateComponent() {
  return `import { MinimalistHeader } from './header'
import { MinimalistFooter } from './footer'
import { MinimalistProfileCard } from './profile-card'
import { MinimalistAboutSection } from './about-section'
import { MinimalistProjectsSection } from './projects-section'
import { MinimalistContactSection } from './contact-section'
import userData from '@/data/user-data'

export function MinimalistTemplate() {
  return (
    <div className="min-h-screen bg-background text-foreground">
      <MinimalistHeader />
      
      <main className="container mx-auto px-4 py-12">
        <section className="max-w-3xl mx-auto">
          <MinimalistProfileCard />
          
          <MinimalistAboutSection />
          
          {userData.projects && userData.projects.length > 0 && userData.projects[0].title && (
            <MinimalistProjectsSection />
          )}
          
          <MinimalistContactSection />
        </section>
      </main>
      
      <MinimalistFooter />
    </div>
  )
}
`
}

// Generate header component
function generateMinimalistHeader() {
  return `import { ThemeToggle } from "@/components/theme-toggle"
import userData from "@/data/user-data"

export function MinimalistHeader() {
  return (
    <header className="container mx-auto px-4 py-6">
      <div className="flex justify-between items-center">
        <h1 className="text-xl font-bold">{userData.name}</h1>
        <ThemeToggle />
      </div>
    </header>
  )
}
`
}

// Generate footer component
function generateMinimalistFooter() {
  return `import userData from "@/data/user-data"

export function MinimalistFooter() {
  return (
    <footer className="border-t border-border mt-16">
      <div className="container mx-auto px-4 py-6">
        <p className="text-center text-muted-foreground">
          © {new Date().getFullYear()} {userData.name}. All rights reserved.
        </p>
      </div>
    </footer>
  )
}
`
}

// Generate about section component
function generateMinimalistAboutSection() {
  return `import userData from "@/data/user-data"

export function MinimalistAboutSection() {
  return (
    <section className="mb-16">
      <h2 className="text-2xl font-bold mb-4 border-b pb-2 border-border">About Me</h2>
      <p className="text-muted-foreground leading-relaxed">{userData.bio}</p>
    </section>
  )
}
`
}

// Generate projects section component
function generateMinimalistProjectsSection() {
  return `import Image from "next/image"
import userData from "@/data/user-data"
import { getImageFallback } from "./utils"

export function MinimalistProjectsSection() {
  return (
    <section className="mb-16">
      <h2 className="text-2xl font-bold mb-6 border-b pb-2 border-border">Projects</h2>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {userData.projects.map((project, index) => (
          <div key={index} className="border border-border rounded-lg overflow-hidden bg-card">
            {project.imageUrl ? (
              <div className="aspect-video relative">
                <Image
                  src={project.imageUrl || "/placeholder.svg?height=200&width=300"}
                  alt={project.title}
                  fill
                  className="object-cover"
                />
              </div>
            ) : (
              <div className="aspect-video bg-muted flex items-center justify-center">
                <span className="text-muted-foreground">No image</span>
              </div>
            )}
            <div className="p-4">
              <h3 className="font-bold text-lg mb-2">{project.title}</h3>
              {project.description && <p className="text-muted-foreground mb-4">{project.description}</p>}
              {project.link && (
                <a
                  href={project.link}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-primary hover:underline"
                >
                  View Project →
                </a>
              )}
            </div>
          </div>
        ))}
      </div>
    </section>
  )
}
`
}

// Generate contact section component
function generateMinimalistContactSection() {
  return `import userData from "@/data/user-data"

export function MinimalistContactSection() {
  return (
    <section>
      <h2 className="text-2xl font-bold mb-6 border-b pb-2 border-border">Contact Me</h2>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        <div>
          <h3 className="text-lg font-medium mb-4">Contact Information</h3>
          <ul className="space-y-3">
            {userData.email && (
              <li className="flex items-center">
                <span className="text-muted-foreground mr-2">✉️</span>
                <a href={\`mailto:\${userData.email}\`} className="text-primary hover:underline">
                  {userData.email}
                </a>
              </li>
            )}
            {userData.phone && (
              <li className="flex items-center">
                <span className="text-muted-foreground mr-2">📱</span>
                <a href={\`tel:\${userData.phone}\`} className="text-primary hover:underline">
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

        <div>
          <h3 className="text-lg font-medium mb-4">Social Media</h3>
          <div className="flex flex-wrap gap-3">
            {userData.socialLinks?.wechat && (
              <a
                href={userData.socialLinks.wechat}
                target="_blank"
                rel="noopener noreferrer"
                className="px-4 py-2 bg-muted rounded text-foreground hover:bg-muted/80"
              >
                WeChat
              </a>
            )}
            {userData.socialLinks?.weibo && (
              <a
                href={userData.socialLinks.weibo}
                target="_blank"
                rel="noopener noreferrer"
                className="px-4 py-2 bg-muted rounded text-foreground hover:bg-muted/80"
              >
                Weibo
              </a>
            )}
            {userData.socialLinks?.github && (
              <a
                href={userData.socialLinks.github}
                target="_blank"
                rel="noopener noreferrer"
                className="px-4 py-2 bg-muted rounded text-foreground hover:bg-muted/80"
              >
                GitHub
              </a>
            )}
            {userData.socialLinks?.jike && (
              <a
                href={userData.socialLinks.jike}
                target="_blank"
                rel="noopener noreferrer"
                className="px-4 py-2 bg-muted rounded text-foreground hover:bg-muted/80"
              >
                即刻
              </a>
            )}
            {userData.socialLinks?.xiaohongshu && (
              <a
                href={userData.socialLinks.xiaohongshu}
                target="_blank"
                rel="noopener noreferrer"
                className="px-4 py-2 bg-muted rounded text-foreground hover:bg-muted/80"
              >
                小红书
              </a>
            )}
            {userData.socialLinks?.douyin && (
              <a
                href={userData.socialLinks.douyin}
                target="_blank"
                rel="noopener noreferrer"
                className="px-4 py-2 bg-muted rounded text-foreground hover:bg-muted/80"
              >
                抖音
              </a>
            )}
            {userData.socialLinks?.bilibili && (
              <a
                href={userData.socialLinks.bilibili}
                target="_blank"
                rel="noopener noreferrer"
                className="px-4 py-2 bg-muted rounded text-foreground hover:bg-muted/80"
              >
                哔哩哔哩
              </a>
            )}
          </div>
        </div>
      </div>
    </section>
  )
}
`
}

// Generate profile card component
function generateMinimalistProfileCard() {
  return `import Image from "next/image"
import userData from "@/data/user-data"
import { getImageFallback } from "./utils"

export function MinimalistProfileCard() {
  return (
    <div className="flex flex-col md:flex-row items-center md:items-start gap-8 mb-16">
      <div className="w-32 h-32 relative flex-shrink-0">
        {userData.avatar ? (
          <Image
            src={userData.avatar || "/placeholder.svg?height=128&width=128"}
            alt={userData.name}
            width={128}
            height={128}
            className="rounded-full object-cover"
          />
        ) : (
          <div className="w-32 h-32 rounded-full bg-muted flex items-center justify-center">
            <span className="text-3xl text-muted-foreground">
              {getImageFallback(userData.name)}
            </span>
          </div>
        )}
      </div>

      <div>
        <h1 className="text-3xl font-bold mb-2">{userData.name}</h1>
        <p className="text-xl text-muted-foreground mb-4">{userData.profession}</p>
        {userData.location && (
          <p className="text-muted-foreground mb-4">
            <span className="inline-block mr-2">📍</span>
            {userData.location}
          </p>
        )}
        <div className="flex flex-wrap gap-3 mt-4">
          {userData.email && (
            <a
              href={\`mailto:\${userData.email}\`}
              className="inline-flex items-center px-3 py-1 bg-muted rounded text-foreground text-sm hover:bg-muted/80"
            >
              ✉️ {userData.email}
            </a>
          )}
          {userData.phone && (
            <a
              href={\`tel:\${userData.phone}\`}
              className="inline-flex items-center px-3 py-1 bg-muted rounded text-foreground text-sm hover:bg-muted/80"
            >
              📱 {userData.phone}
            </a>
          )}
          {userData.wechat && (
            <span className="inline-flex items-center px-3 py-1 bg-muted rounded text-foreground text-sm">
              WeChat: {userData.wechat}
            </span>
          )}
        </div>
      </div>
    </div>
  )
}
`
}

// Generate types file
function generateMinimalistTypes() {
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
  jike?: string
  xiaohongshu?: string
  douyin?: string
  bilibili?: string
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
function generateMinimalistUtils() {
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
