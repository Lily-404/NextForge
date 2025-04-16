import type JSZip from "jszip"

export function generateCreativeTemplate(zip: JSZip, userData: any) {
  // Create template directory structure
  const templatesDir = zip.folder("components/templates/creative")

  // Add index file to export all components
  templatesDir.file("index.tsx", generateCreativeIndex())

  // Add component files
  templatesDir.file("template.tsx", generateCreativeTemplateComponent())
  templatesDir.file("header.tsx", generateCreativeHeader())
  templatesDir.file("footer.tsx", generateCreativeFooter())
  templatesDir.file("hero-section.tsx", generateCreativeHeroSection())
  templatesDir.file("about-section.tsx", generateCreativeAboutSection())
  templatesDir.file("projects-section.tsx", generateCreativeProjectsSection())
  templatesDir.file("contact-section.tsx", generateCreativeContactSection())

  // Add types file
  templatesDir.file("types.ts", generateCreativeTypes())

  // Add utils file
  templatesDir.file("utils.ts", generateCreativeUtils())
}

// Generate index file to export all components
function generateCreativeIndex() {
  return `// Export all creative template components
export { CreativeTemplate } from './template'
export { CreativeHeader } from './header'
export { CreativeFooter } from './footer'
export { CreativeHeroSection } from './hero-section'
export { CreativeAboutSection } from './about-section'
export { CreativeProjectsSection } from './projects-section'
export { CreativeContactSection } from './contact-section'
`
}

// Generate main template component
function generateCreativeTemplateComponent() {
  return `import { CreativeHeader } from './header'
import { CreativeFooter } from './footer'
import { CreativeHeroSection } from './hero-section'
import { CreativeAboutSection } from './about-section'
import { CreativeProjectsSection } from './projects-section'
import { CreativeContactSection } from './contact-section'
import userData from '@/data/user-data'

export function CreativeTemplate() {
  return (
    <div className="min-h-screen bg-background text-foreground">
      <div className="absolute top-0 left-0 w-full h-[50vh] bg-gradient-to-br from-primary/20 to-secondary/20 -z-10" />
      
      <CreativeHeader />
      
      <main>
        <CreativeHeroSection />
        
        <CreativeAboutSection />
        
        {userData.projects && userData.projects.length > 0 && userData.projects[0].title && (
          <CreativeProjectsSection />
        )}
        
        <CreativeContactSection />
      </main>
      
      <CreativeFooter />
    </div>
  )
}
`
}

// Generate header component
function generateCreativeHeader() {
  return `import { ThemeToggle } from "@/components/theme-toggle"
import userData from "@/data/user-data"

export function CreativeHeader() {
  return (
    <header className="container mx-auto px-4 py-6">
      <div className="flex justify-between items-center">
        <div className="font-bold text-xl bg-clip-text text-transparent bg-gradient-to-r from-primary to-primary/60">
          {userData.name}
        </div>
        <div className="flex items-center gap-4">
          <nav className="hidden md:flex space-x-6">
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
function generateCreativeFooter() {
  return `import userData from "@/data/user-data"

export function CreativeFooter() {
  return (
    <footer className="py-8 border-t border-border">
      <div className="container mx-auto px-4">
        <div className="max-w-4xl mx-auto text-center">
          <p className="text-foreground/60">
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
function generateCreativeHeroSection() {
  return `import Image from "next/image"
import userData from "@/data/user-data"
import { getImageFallback } from "./utils"

export function CreativeHeroSection() {
  return (
    <section className="py-20 md:py-32">
      <div className="container mx-auto px-4">
        <div className="max-w-4xl mx-auto text-center">
          <div className="relative w-40 h-40 mx-auto mb-8">
            {userData.avatar ? (
              <Image
                src={userData.avatar || "/placeholder.svg?height=160&width=160"}
                alt={userData.name}
                width={160}
                height={160}
                className="rounded-full object-cover border-4 border-background shadow-xl"
              />
            ) : (
              <div className="w-40 h-40 rounded-full bg-gradient-to-br from-primary/20 to-secondary/20 flex items-center justify-center border-4 border-background shadow-xl">
                <span className="text-4xl text-foreground/60">{getImageFallback(userData.name)}</span>
              </div>
            )}
          </div>

          <h1 className="text-4xl md:text-5xl font-bold mb-4 bg-clip-text text-transparent bg-gradient-to-r from-primary to-primary/60">
            {userData.name}
          </h1>
          <p className="text-2xl text-foreground/80 mb-6">{userData.profession}</p>
          {userData.location && (
            <p className="text-foreground/60 mb-8">
              <span className="inline-block mr-2">📍</span>
              {userData.location}
            </p>
          )}
          <p className="text-foreground/80 max-w-2xl mx-auto mb-8 leading-relaxed">
            {userData.bio}
          </p>
          <div className="flex flex-wrap justify-center gap-4">
            {userData.email && (
              <a
                href={\`mailto:\${userData.email}\`}
                className="px-6 py-3 bg-primary text-primary-foreground rounded-full hover:bg-primary/90 transition-all shadow-md hover:shadow-lg"
              >
                Contact Me
              </a>
            )}
            <a
              href="#projects"
              className="px-6 py-3 bg-secondary text-secondary-foreground rounded-full hover:bg-secondary/90 transition-all shadow-md hover:shadow-lg"
            >
              View Projects
            </a>
          </div>
        </div>
      </div>
    </section>
  )
}
`
}

// Generate about section component
function generateCreativeAboutSection() {
  return `import userData from "@/data/user-data"

export function CreativeAboutSection() {
  return (
    <section id="about" className="py-20 bg-muted/30">
      <div className="container mx-auto px-4">
        <div className="max-w-4xl mx-auto">
          <h2 className="text-3xl font-bold mb-12 text-center">About Me</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
            <div>
              <h3 className="text-xl font-bold mb-4 text-primary">Personal Profile</h3>
              <p className="text-foreground/80 leading-relaxed mb-4">
                {userData.bio}
              </p>
              <p className="text-foreground/80 leading-relaxed">
                As a {userData.profession}, I'm passionate about turning ideas into reality
                and conveying unique perspectives and emotions through my work.
              </p>
            </div>
            <div>
              <h3 className="text-xl font-bold mb-4 text-primary">Contact Information</h3>
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
              <div className="mt-6 flex flex-wrap gap-3">
                {userData.socialLinks?.github && (
                  <a
                    href={userData.socialLinks.github}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="px-4 py-2 bg-card border border-border rounded-full text-foreground hover:bg-muted transition-colors"
                  >
                    GitHub
                  </a>
                )}
                {userData.socialLinks?.linkedin && (
                  <a
                    href={userData.socialLinks.linkedin}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="px-4 py-2 bg-card border border-border rounded-full text-foreground hover:bg-muted transition-colors"
                  >
                    LinkedIn
                  </a>
                )}
                {userData.socialLinks?.twitter && (
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
  )
}
`
}

// Generate projects section component
function generateCreativeProjectsSection() {
  return `import Image from "next/image"
import userData from "@/data/user-data"

export function CreativeProjectsSection() {
  return (
    <section id="projects" className="py-20">
      <div className="container mx-auto px-4">
        <div className="max-w-4xl mx-auto">
          <h2 className="text-3xl font-bold mb-12 text-center">Creative Works</h2>
          <div className="grid grid-cols-1 gap-12">
            {userData.projects.map((project, index) => (
              <div key={index} className="flex flex-col md:flex-row gap-8 items-center">
                {project.imageUrl ? (
                  <div className="w-full md:w-1/2 aspect-video relative rounded-lg overflow-hidden shadow-lg">
                    <Image
                      src={project.imageUrl || "/placeholder.svg?height=200&width=300"}
                      alt={project.title}
                      fill
                      className="object-cover"
                    />
                  </div>
                ) : (
                  <div className="w-full md:w-1/2 aspect-video bg-muted rounded-lg flex items-center justify-center shadow-lg">
                    <span className="text-muted-foreground">No image</span>
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
function generateCreativeContactSection() {
  return `import userData from "@/data/user-data"

export function CreativeContactSection() {
  return (
    <section id="contact" className="py-20 bg-muted/30">
      <div className="container mx-auto px-4">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-3xl font-bold mb-6">Get in Touch</h2>
          <p className="text-foreground/80 mb-12 max-w-2xl mx-auto">
            If you're interested in my work or would like to collaborate, please feel free to contact me.
            I look forward to creating something amazing together.
          </p>
          <div className="flex flex-wrap justify-center gap-4">
            {userData.email && (
              <a
                href={\`mailto:\${userData.email}\`}
                className="px-6 py-3 bg-primary text-primary-foreground rounded-full hover:bg-primary/90 transition-all shadow-md hover:shadow-lg"
              >
                Send Email
              </a>
            )}
            {userData.phone && (
              <a
                href={\`tel:\${userData.phone}\`}
                className="px-6 py-3 bg-secondary text-secondary-foreground rounded-full hover:bg-secondary/90 transition-all shadow-md hover:shadow-lg"
              >
                Call Me
              </a>
            )}
          </div>
          <div className="mt-12 flex justify-center space-x-6">
            {userData.socialLinks?.wechat && (
              <a
                href={userData.socialLinks.wechat}
                target="_blank"
                rel="noopener noreferrer"
                className="text-foreground/60 hover:text-primary transition-colors"
              >
                WeChat
              </a>
            )}
            {userData.socialLinks?.weibo && (
              <a
                href={userData.socialLinks.weibo}
                target="_blank"
                rel="noopener noreferrer"
                className="text-foreground/60 hover:text-primary transition-colors"
              >
                Weibo
              </a>
            )}
            {userData.socialLinks?.github && (
              <a
                href={userData.socialLinks.github}
                target="_blank"
                rel="noopener noreferrer"
                className="text-foreground/60 hover:text-primary transition-colors"
              >
                GitHub
              </a>
            )}
            {userData.socialLinks?.linkedin && (
              <a
                href={userData.socialLinks.linkedin}
                target="_blank"
                rel="noopener noreferrer"
                className="text-foreground/60 hover:text-primary transition-colors"
              >
                LinkedIn
              </a>
            )}
            {userData.socialLinks?.twitter && (
              <a
                href={userData.socialLinks.twitter}
                target="_blank"
                rel="noopener noreferrer"
                className="text-foreground/60 hover:text-primary transition-colors"
              >
                Twitter
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

// Generate types file
function generateCreativeTypes() {
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
function generateCreativeUtils() {
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
