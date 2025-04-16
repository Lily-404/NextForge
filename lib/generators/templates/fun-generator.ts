import type JSZip from "jszip"

export function generateFunTemplate(zip: JSZip, userData: any) {
  // Create template directory structure
  const templatesDir = zip.folder("components/templates/fun")

  // Add index file to export all components
  templatesDir.file("index.tsx", generateFunIndex())

  // Add component files
  templatesDir.file("template.tsx", generateFunTemplateComponent())
  templatesDir.file("header.tsx", generateFunHeader())
  templatesDir.file("footer.tsx", generateFunFooter())
  templatesDir.file("hero-section.tsx", generateFunHeroSection())
  templatesDir.file("projects-section.tsx", generateFunProjectsSection())
  templatesDir.file("contact-section.tsx", generateFunContactSection())

  // Add types file
  templatesDir.file("types.ts", generateFunTypes())

  // Add utils file
  templatesDir.file("utils.ts", generateFunUtils())
}

// Generate index file to export all components
function generateFunIndex() {
  return `// Export all fun template components
export { FunTemplate } from './template'
export { FunHeader } from './header'
export { FunFooter } from './footer'
export { FunHeroSection } from './hero-section'
export { FunProjectsSection } from './projects-section'
export { FunContactSection } from './contact-section'
`
}

// Generate main template component
function generateFunTemplateComponent() {
  return `import { FunHeader } from './header'
import { FunFooter } from './footer'
import { FunHeroSection } from './hero-section'
import { FunProjectsSection } from './projects-section'
import { FunContactSection } from './contact-section'
import userData from '@/data/user-data'

export function FunTemplate() {
  return (
    <div className="min-h-screen bg-background text-foreground">
      <div className="absolute top-0 left-0 w-full h-[70vh] bg-gradient-to-b from-primary/20 via-secondary/20 to-background -z-10" />
      
      <FunHeader />
      
      <main>
        <FunHeroSection />
        
        {userData.projects && userData.projects.length > 0 && userData.projects[0].title && (
          <FunProjectsSection />
        )}
        
        <FunContactSection />
      </main>
      
      <FunFooter />
    </div>
  )
}
`
}

// Generate header component
function generateFunHeader() {
  return `import { ThemeToggle } from "@/components/theme-toggle"
import userData from "@/data/user-data"

export function FunHeader() {
  return (
    <header className="container mx-auto px-4 py-6">
      <div className="flex justify-between items-center">
        <div className="font-bold text-xl">
          <span className="text-primary">✨</span> {userData.name}
        </div>
        <ThemeToggle />
      </div>
    </header>
  )
}
`
}

// Generate footer component
function generateFunFooter() {
  return `import userData from "@/data/user-data"

export function FunFooter() {
  return (
    <footer className="py-8 border-t border-border">
      <div className="container mx-auto px-4">
        <div className="max-w-4xl mx-auto text-center">
          <p className="text-foreground/60">
            © {new Date().getFullYear()} {userData.name} 🎉 Made with ❤️
          </p>
        </div>
      </div>
    </footer>
  )
}
`
}

// Generate hero section component
function generateFunHeroSection() {
  return `import Image from "next/image"
import userData from "@/data/user-data"
import { getImageFallback } from "./utils"

export function FunHeroSection() {
  return (
    <section className="py-16">
      <div className="container mx-auto px-4">
        <div className="max-w-4xl mx-auto text-center">
          <div className="relative w-40 h-40 mx-auto mb-8 transform rotate-3 hover:rotate-0 transition-transform duration-300">
            {userData.avatar ? (
              <Image
                src={userData.avatar || "/placeholder.svg?height=160&width=160"}
                alt={userData.name}
                width={160}
                height={160}
                className="rounded-2xl object-cover border-4 border-background shadow-xl"
              />
            ) : (
              <div className="w-40 h-40 rounded-2xl bg-gradient-to-br from-primary/30 to-secondary/30 flex items-center justify-center border-4 border-background shadow-xl">
                <span className="text-4xl text-foreground/60">{getImageFallback(userData.name)}</span>
              </div>
            )}
          </div>

          <h1 className="text-4xl md:text-5xl font-bold mb-4">Hi! I'm {userData.name} 👋</h1>
          <p className="text-2xl text-primary mb-6">{userData.profession} ✨</p>
          {userData.location && (
            <p className="text-foreground/60 mb-8 text-lg">
              <span className="inline-block mr-2">📍</span>
              From {userData.location}
            </p>
          )}
          <p className="text-foreground/80 max-w-2xl mx-auto mb-8 leading-relaxed text-lg">
            {userData.bio}
          </p>
          <div className="flex flex-wrap justify-center gap-4">
            {userData.email && (
              <a
                href={\`mailto:\${userData.email}\`}
                className="px-6 py-3 bg-primary text-primary-foreground rounded-full hover:bg-primary/90 transition-all shadow-md hover:shadow-lg transform hover:scale-105"
              >
                ✉️ Email Me
              </a>
            )}
            {userData.phone && (
              <a
                href={\`tel:\${userData.phone}\`}
                className="px-6 py-3 bg-secondary text-secondary-foreground rounded-full hover:bg-secondary/90 transition-all shadow-md hover:shadow-lg transform hover:scale-105"
              >
                📱 Call Me
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

// Generate projects section component
function generateFunProjectsSection() {
  return `import Image from "next/image"
import userData from "@/data/user-data"

export function FunProjectsSection() {
  return (
    <section className="py-16">
      <div className="container mx-auto px-4">
        <div className="max-w-4xl mx-auto">
          <h2 className="text-3xl font-bold mb-12 text-center">
            <span className="inline-block mr-2">🚀</span>
            My Awesome Projects
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {userData.projects.map((project, index) => (
              <div
                key={index}
                className={\`bg-card border border-border rounded-xl overflow-hidden shadow-lg transform \${
                  index % 2 === 0 ? "rotate-1" : "-rotate-1"
                } hover:rotate-0 transition-transform duration-300\`}
              >
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
                      Check it out 👀
                    </a>
                  )}
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}
`
}

// Generate contact section component
function generateFunContactSection() {
  return `import userData from "@/data/user-data"

export function FunContactSection() {
  return (
    <section className="py-16 bg-muted/30">
      <div className="container mx-auto px-4">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-3xl font-bold mb-6">
            <span className="inline-block mr-2">📬</span>
            Contact Me
          </h2>
          <p className="text-foreground/80 mb-12 max-w-2xl mx-auto">Want to chat, collaborate, or just say hi? Reach out anytime!</p>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 text-left max-w-2xl mx-auto">
            <div className="bg-card p-6 rounded-xl border border-border shadow-md transform rotate-1 hover:rotate-0 transition-transform duration-300">
              <h3 className="text-xl font-bold mb-4">Contact Info 📞</h3>
              <ul className="space-y-4">
                {userData.email && (
                  <li className="flex items-center">
                    <span className="text-primary mr-3 text-xl">✉️</span>
                    <a href={\`mailto:\${userData.email}\`} className="text-foreground hover:text-primary">
                      {userData.email}
                    </a>
                  </li>
                )}
                {userData.phone && (
                  <li className="flex items-center">
                    <span className="text-primary mr-3 text-xl">📱</span>
                    <a href={\`tel:\${userData.phone}\`} className="text-foreground hover:text-primary">
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
              <h3 className="text-xl font-bold mb-4">Social Media 🌐</h3>
              <div className="flex flex-wrap gap-3">
                {userData.socialLinks?.wechat && (
                  <a
                    href={userData.socialLinks.wechat}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="px-4 py-2 bg-primary/10 rounded-full text-foreground hover:bg-primary/20 transition-colors"
                  >
                    WeChat
                  </a>
                )}
                {userData.socialLinks?.weibo && (
                  <a
                    href={userData.socialLinks.weibo}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="px-4 py-2 bg-destructive/10 rounded-full text-foreground hover:bg-destructive/20 transition-colors"
                  >
                    Weibo
                  </a>
                )}
                {userData.socialLinks?.github && (
                  <a
                    href={userData.socialLinks.github}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="px-4 py-2 bg-muted rounded-full text-foreground hover:bg-muted/80 transition-colors"
                  >
                    GitHub
                  </a>
                )}
                {userData.socialLinks?.linkedin && (
                  <a
                    href={userData.socialLinks.linkedin}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="px-4 py-2 bg-primary/10 rounded-full text-foreground hover:bg-primary/20 transition-colors"
                  >
                    LinkedIn
                  </a>
                )}
                {userData.socialLinks?.twitter && (
                  <a
                    href={userData.socialLinks.twitter}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="px-4 py-2 bg-primary/10 rounded-full text-foreground hover:bg-primary/20 transition-colors"
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
  )
}
`
}

// Generate types file
function generateFunTypes() {
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
function generateFunUtils() {
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
