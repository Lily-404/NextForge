import type JSZip from "jszip"

export function generateBusinessTemplate(zip: JSZip, userData: any) {
  // Create template directory structure
  const templatesDir = zip.folder("components/templates/business")

  // Add index file to export all components
  templatesDir.file("index.tsx", generateBusinessIndex())

  // Add component files
  templatesDir.file("template.tsx", generateBusinessTemplateComponent())
  templatesDir.file("header.tsx", generateBusinessHeader())
  templatesDir.file("footer.tsx", generateBusinessFooter())
  templatesDir.file("hero-section.tsx", generateBusinessHeroSection())
  templatesDir.file("about-section.tsx", generateBusinessAboutSection())
  templatesDir.file("projects-section.tsx", generateBusinessProjectsSection())
  templatesDir.file("contact-section.tsx", generateBusinessContactSection())

  // Add types file
  templatesDir.file("types.ts", generateBusinessTypes())

  // Add utils file
  templatesDir.file("utils.ts", generateBusinessUtils())
}

// Generate index file to export all components
function generateBusinessIndex() {
  return `// Export all business template components
export { BusinessTemplate } from './template'
export { BusinessHeader } from './header'
export { BusinessFooter } from './footer'
export { BusinessHeroSection } from './hero-section'
export { BusinessAboutSection } from './about-section'
export { BusinessProjectsSection } from './projects-section'
export { BusinessContactSection } from './contact-section'
`
}

// Generate main template component
function generateBusinessTemplateComponent() {
  return `import { BusinessHeader } from './header'
import { BusinessFooter } from './footer'
import { BusinessHeroSection } from './hero-section'
import { BusinessAboutSection } from './about-section'
import { BusinessProjectsSection } from './projects-section'
import { BusinessContactSection } from './contact-section'
import userData from '@/data/user-data'

export function BusinessTemplate() {
  return (
    <div className="min-h-screen bg-background text-foreground">
      <BusinessHeader />
      
      <main>
        <BusinessHeroSection />
        
        <BusinessAboutSection />
        
        {userData.projects && userData.projects.length > 0 && userData.projects[0].title && (
          <BusinessProjectsSection />
        )}
        
        <BusinessContactSection />
      </main>
      
      <BusinessFooter />
    </div>
  )
}
`
}

// Generate header component
function generateBusinessHeader() {
  return `import { ThemeToggle } from "@/components/theme-toggle"
import userData from "@/data/user-data"

export function BusinessHeader() {
  return (
    <header className="border-b border-border sticky top-0 bg-background/95 backdrop-blur-sm z-10">
      <div className="container mx-auto px-4">
        <div className="flex justify-between items-center h-16">
          <div className="font-bold text-xl">{userData.name}</div>
          <nav className="hidden md:flex space-x-8">
            <a href="#about" className="text-foreground hover:text-primary transition-colors">
              About
            </a>
            <a href="#projects" className="text-foreground hover:text-primary transition-colors">
              Projects
            </a>
            <a href="#contact" className="text-foreground hover:text-primary transition-colors">
              Contact
            </a>
          </nav>
          <ThemeToggle />
        </div>
      </div>
    </header>
  )
}
`
}

// Generate footer component
function generateBusinessFooter() {
  return `import userData from "@/data/user-data"

export function BusinessFooter() {
  return (
    <footer className="bg-muted py-8">
      <div className="container mx-auto px-4">
        <div className="max-w-4xl mx-auto text-center">
          <p className="text-muted-foreground">
            © {new Date().getFullYear()} {userData.name}. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  )
}
`
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

// Generate about section component
function generateBusinessAboutSection() {
  return `import userData from "@/data/user-data"

export function BusinessAboutSection() {
  return (
    <section id="about" className="py-16 border-b border-border">
      <div className="container mx-auto px-4">
        <div className="max-w-4xl mx-auto">
          <h2 className="text-3xl font-bold mb-8">About Me</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="md:col-span-2">
              <p className="text-muted-foreground leading-relaxed mb-4">
                {userData.bio}
              </p>
              <p className="text-muted-foreground leading-relaxed">
                As a {userData.profession}, I am dedicated to providing high-quality services and solutions.
                I believe that through professional knowledge and innovative thinking, I can create real value for clients.
              </p>
            </div>
            <div className="bg-card p-6 rounded-lg border border-border">
              <h3 className="font-bold text-lg mb-4">Contact Information</h3>
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
          </div>
        </div>
      </div>
    </section>
  )
}
`
}

// Generate projects section component
function generateBusinessProjectsSection() {
  return `import Image from "next/image"
import userData from "@/data/user-data"

export function BusinessProjectsSection() {
  return (
    <section id="projects" className="py-16 border-b border-border">
      <div className="container mx-auto px-4">
        <div className="max-w-4xl mx-auto">
          <h2 className="text-3xl font-bold mb-8">Project Portfolio</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {userData.projects.map((project, index) => (
              <div key={index} className="bg-card border border-border rounded-lg overflow-hidden">
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
                  <h3 className="font-bold text-xl mb-2">{project.title}</h3>
                  {project.description && <p className="text-muted-foreground mb-4">{project.description}</p>}
                  {project.link && (
                    <a
                      href={project.link}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center px-4 py-2 bg-primary text-primary-foreground rounded-md text-sm hover:bg-primary/90 transition-colors"
                    >
                      View Project
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
function generateBusinessContactSection() {
  return `import userData from "@/data/user-data"

export function BusinessContactSection() {
  return (
    <section id="contact" className="py-16">
      <div className="container mx-auto px-4">
        <div className="max-w-4xl mx-auto">
          <h2 className="text-3xl font-bold mb-8">Contact Me</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <div>
              <h3 className="text-xl font-bold mb-4">Contact Information</h3>
              <p className="text-muted-foreground mb-6">If you're interested in my services or have any questions, please feel free to contact me.</p>
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
                {userData.location && (
                  <li className="flex items-center">
                    <span className="text-primary mr-3 text-xl">📍</span>
                    <span className="text-foreground">{userData.location}</span>
                  </li>
                )}
              </ul>
            </div>
            <div>
              <h3 className="text-xl font-bold mb-4">Social Media</h3>
              <div className="grid grid-cols-2 gap-3">
                {userData.socialLinks?.wechat && (
                  <a
                    href={userData.socialLinks.wechat}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="px-4 py-3 bg-card border border-border rounded-md text-foreground hover:bg-muted transition-colors"
                  >
                    WeChat
                  </a>
                )}
                {userData.socialLinks?.weibo && (
                  <a
                    href={userData.socialLinks.weibo}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="px-4 py-3 bg-card border border-border rounded-md text-foreground hover:bg-muted transition-colors"
                  >
                    Weibo
                  </a>
                )}
                {userData.socialLinks?.github && (
                  <a
                    href={userData.socialLinks.github}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="px-4 py-3 bg-card border border-border rounded-md text-foreground hover:bg-muted transition-colors"
                  >
                    GitHub
                  </a>
                )}
                {userData.socialLinks?.linkedin && (
                  <a
                    href={userData.socialLinks.linkedin}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="px-4 py-3 bg-card border border-border rounded-md text-foreground hover:bg-muted transition-colors"
                  >
                    LinkedIn
                  </a>
                )}
                {userData.socialLinks?.twitter && (
                  <a
                    href={userData.socialLinks.twitter}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="px-4 py-3 bg-card border border-border rounded-md text-foreground hover:bg-muted transition-colors"
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
