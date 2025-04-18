import type JSZip from "jszip"

// Generate types content
function generateCreativeTypes() {
  return `interface Project {
  title: string
  description: string
  image: string
  link: string
  date: string
}

interface SocialLinks {
  github?: string
  facebook?: string
  instagram?: string
  behance?: string
  dribbble?: string
  youtube?: string
  weibo?: string
  wechat?: string
  bilibili?: string
  jike?: string
  zhihu?: string
  douban?: string
  codepen?: string
  douyin?: string
  xiaohongshu?: string
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
}`;
}

// Generate utils content
function generateCreativeUtils() {
  return "'use client'\n\n/**\n * Get a fallback character for avatar when no image is provided\n */\nexport function getImageFallback(name: string): string {\n  if (!name) return \"?\"\n  return name.charAt(0).toUpperCase()\n}\n\n/**\n * Format a date to a readable string\n */\nexport function formatDate(date: Date): string {\n  return new Intl.DateTimeFormat('en-US', {\n    year: 'numeric',\n    month: 'long',\n    day: 'numeric'\n  }).format(date)\n}";
}

export function generateCreativeTemplate(zip: JSZip, userData: any) {
  // Add .env file
  zip.file(".env", `NEXT_TELEMETRY_DISABLED=1
NEXT_SKIP_VERSION_CHECK=1`)

  // Add package.json with required dependencies
  zip.file("package.json", JSON.stringify({
    "name": "nextjs-creative-template",
    "version": "0.1.0",
    "private": true,
    "scripts": {
      "predev": "next telemetry disable",
      "dev": "NEXT_TELEMETRY_DISABLED=1 next dev",
      "build": "NEXT_TELEMETRY_DISABLED=1 next build",
      "start": "NEXT_TELEMETRY_DISABLED=1 next start",
      "lint": "next lint"
    },
    "dependencies": {
      "@types/node": "20.11.25",
      "@types/react": "18.2.64",
      "@types/react-dom": "18.2.21",
      "autoprefixer": "10.4.18",
      "framer-motion": "^11.0.8",
      "next": "14.2.1",
      "postcss": "8.4.35",
      "react": "18.2.0",
      "react-dom": "18.2.0",
      "tailwindcss": "3.4.1",
      "typescript": "5.4.2"
    }
  }, null, 2))

  // Add tsconfig.json
  zip.file("tsconfig.json", JSON.stringify({
    "compilerOptions": {
      "lib": ["dom", "dom.iterable", "esnext"],
      "allowJs": true,
      "skipLibCheck": true,
      "strict": true,
      "noEmit": true,
      "esModuleInterop": true,
      "module": "esnext",
      "moduleResolution": "bundler",
      "resolveJsonModule": true,
      "isolatedModules": true,
      "jsx": "preserve",
      "incremental": true,
      "plugins": [{
        "name": "next"
      }],
      "paths": {
        "@/*": ["./*"]
      }
    },
    "include": ["next-env.d.ts", "**/*.ts", "**/*.tsx", ".next/types/**/*.ts"],
    "exclude": ["node_modules"]
  }, null, 2))

  // Add next.config.js
  zip.file("next.config.js", `/** @type {import('next').NextConfig} */
const nextConfig = {
  transpilePackages: ['framer-motion'],
  experimental: {
    optimizePackageImports: ['framer-motion']
  },
  // Disable telemetry and version checking
  telemetry: false,
  skipTraceAssets: true,
  skipMiddlewareUrlNormalize: true
}

module.exports = nextConfig`)

  // Add postcss.config.js
  zip.file("postcss.config.js", `module.exports = {
    plugins: {
      tailwindcss: {},
      autoprefixer: {},
    },
  }`)

  // Add tailwind.config.js
  zip.file("tailwind.config.js", `/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './pages/**/*.{js,ts,jsx,tsx,mdx}',
    './components/**/*.{js,ts,jsx,tsx,mdx}',
    './app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {},
  },
  plugins: [],
}`)

  // Add global.css
  zip.file("app/globals.css", `@tailwind base;
@tailwind components;
@tailwind utilities;

:root {
  --foreground-rgb: 0, 0, 0;
  --background-start-rgb: 214, 219, 220;
  --background-end-rgb: 255, 255, 255;
}

@media (prefers-color-scheme: dark) {
  :root {
    --foreground-rgb: 255, 255, 255;
    --background-start-rgb: 0, 0, 0;
    --background-end-rgb: 0, 0, 0;
  }
}

body {
  color: rgb(var(--foreground-rgb));
  background: rgb(var(--background-start-rgb));
}`)

  // Add layout.tsx
  zip.file("app/layout.tsx", `import './globals.css'

export const metadata = {
  title: 'Creative Portfolio',
  description: 'A creative portfolio template',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  )
}`)

  // Add page.tsx
  zip.file("app/page.tsx", `import { CreativeTemplate } from "@/components/templates/creative"
import userData from "@/data/user-data"

export default function Home() {
  return <CreativeTemplate userData={userData} />
}`)

  // Add user data type
  zip.file("types/user-data.ts", `export interface UserData {
  name?: string
  profession?: string
  bio?: string
  avatar?: string
  email?: string
  phone?: string
  location?: string
  socialLinks?: {
    github?: string
    twitter?: string
    facebook?: string
    instagram?: string
    behance?: string
    dribbble?: string
    youtube?: string
    weibo?: string
    wechat?: string
    bilibili?: string
    jike?: string
    zhihu?: string
    douban?: string
    codepen?: string
    douyin?: string
    xiaohongshu?: string
  }
}
`)

  // Add user data
  zip.file("data/user-data.ts", `import { UserData } from "@/types/user-data"

const userData: UserData = ${JSON.stringify(userData, null, 2)}

export default userData`)

  // Create template directory structure
  const templatesDir = zip.folder("components/templates/creative")
  if (!templatesDir) throw new Error("Failed to create templates directory")

  // Add the creative template component
  const templateContent = `'use client'

import type { UserData } from "@/types/user-data"
import Image from "next/image"
import { motion } from "framer-motion"

export function CreativeTemplate({ userData }: { userData: UserData }) {
  const socialPlatformNames: Record<string, string> = {
    github: 'GitHub',
    twitter: '推特',
    facebook: '脸书',
    instagram: '照片墙',
    behance: 'Behance',
    dribbble: 'Dribbble',
    youtube: '油管',
    weibo: '微博',
    wechat: '微信公众号',
    bilibili: '哔哩哔哩',
    jike: '即刻',
    zhihu: '知乎',
    douban: '豆瓣',
    codepen: 'CodePen',
    douyin: '抖音',
    xiaohongshu: '小红书',
  }

  return (
    <div className="min-h-screen bg-[#f4f1eb] font-sans selection:bg-orange-200 relative">
      <nav className="sticky top-0 w-full z-10 bg-[#f4f1eb]/80 backdrop-blur-sm transition-all duration-300 border-b border-neutral-200/50">
        <div className="container mx-auto px-8 py-4">
          <div className="max-w-4xl mx-auto flex justify-between items-center">
            <motion.span 
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="text-sm font-medium tracking-wide"
            >
              {userData.name || "Portfolio"}
            </motion.span>
            <motion.div 
              initial={{ opacity: 0, y: -20 }}
              animate={{ opacity: 1, y: 0 }}
              className="flex gap-8 text-neutral-600"
            >
              <a href="#about" className="relative group">
                <span className="text-sm tracking-wide">关于</span>
                <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-neutral-400 group-hover:w-full transition-all duration-300"></span>
              </a>
              <a href="#works" className="relative group">
                <span className="text-sm tracking-wide">作品</span>
                <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-neutral-400 group-hover:w-full transition-all duration-300"></span>
              </a>
              <a href="#contact" className="relative group">
                <span className="text-sm tracking-wide">联系</span>
                <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-neutral-400 group-hover:w-full transition-all duration-300"></span>
              </a>
            </motion.div>
          </div>
        </div>
      </nav>

      <main>
        <section className="min-h-[calc(100vh-4rem)] flex items-center relative overflow-hidden">
            <motion.div 
              initial={{ opacity: 0.2 }}
              animate={{ opacity: 0.8 }}
              transition={{ duration: 1.5 }}
              className="absolute inset-0 bg-gradient-to-br from-orange-50/50 via-neutral-50/30 to-neutral-100/50 -z-10"
            />
            <motion.div 
              initial={{ opacity: 0 }}
              animate={{ opacity: 0.4 }}
              transition={{ duration: 2 }}
              className="absolute inset-0 bg-[radial-gradient(circle_at_50%_120%,rgba(255,237,213,0.4),rgba(255,255,255,0))] -z-10"
            />
            
            <div className="absolute w-full h-full overflow-hidden -z-20">
              <motion.div
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 0.1, scale: 1 }}
                transition={{ duration: 2 }}
                className="absolute -right-1/4 top-1/4 w-96 h-96 bg-orange-200 rounded-full blur-3xl"
              />
              <motion.div
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 0.1, scale: 1 }}
                transition={{ duration: 2, delay: 0.5 }}
                className="absolute -left-1/4 bottom-1/4 w-96 h-96 bg-neutral-200 rounded-full blur-3xl"
              />
            </div>

            <motion.div 
              initial={{ opacity: 0, y: 50 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 }}
              className="container mx-auto px-8 -mt-16 relative"
            >
              <div className="max-w-4xl mx-auto">
                <div className="relative mb-12">
                  {userData.avatar ? (
                    <div className="w-32 h-32 relative overflow-hidden">
                      <Image
                        src={userData.avatar}
                        alt={userData.name}
                        width={128}
                        height={128}
                        fill
                        className="object-cover rounded-3xl"
                      />
                    </div>
                  ) : (
                    <div className="w-32 h-32 bg-neutral-100 dark:bg-neutral-800 rounded-3xl flex items-center justify-center">
                      <span className="text-4xl font-medium text-neutral-400">
                        {userData.name?.[0]?.toUpperCase() || "P"}
                      </span>
                    </div>
                  )}
                </div>

                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.3 }}
                  className="space-y-1"
                >
                  <h1 className="text-4xl font-bold tracking-tight">{userData.name || "Portfolio"}</h1>
                  <p className="text-lg text-neutral-600">{userData.profession || "Creative Professional"}</p>
                </motion.div>

                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ delay: 0.4 }}
                  className="mt-8 max-w-2xl"
                >
                  <p className="text-neutral-600 leading-relaxed">
                    {userData.bio || "A creative professional passionate about design and technology."}
                  </p>
                </motion.div>

                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.5 }}
                  className="mt-8 flex flex-wrap gap-3"
                >
                  {Object.entries(userData.socialLinks || {}).map(([platform, link]) => {
                    if (!link) return null
                    return (
                      <a
                        key={platform}
                        href={link}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="px-4 py-2 bg-white/50 hover:bg-white/80 rounded-xl text-sm text-neutral-600 transition-colors duration-200"
                      >
                        {socialPlatformNames[platform] || platform}
                      </a>
                    )
                  })}
                </motion.div>
              </div>
            </motion.div>
          </section>

        <section id="contact" className="py-32">
          <div className="container mx-auto px-8">
            <div className="max-w-4xl mx-auto">
              <motion.div
                initial={{ opacity: 0, y: 50 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                className="grid grid-cols-1 md:grid-cols-2 gap-16"
              >
              <div>
                <h2 className="text-4xl font-light mb-8">联系方式</h2>
                <div className="space-y-4">
                    {userData.email && (
                      <motion.a 
                        href={\`mailto:\${userData.email}\`}
                        whileHover={{ x: 10 }}
                        className="group block p-4 rounded-xl hover:bg-white/50 transition-colors duration-300"
                      >
                        <div className="flex items-center gap-3">
                          <div className="w-10 h-10 rounded-full bg-orange-100/50 flex items-center justify-center">
                            <svg className="w-5 h-5 text-neutral-600" viewBox="0 0 24 24" fill="none" stroke="currentColor">
                              <path d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                            </svg>
                          </div>
                          <span className="text-neutral-600 group-hover:text-neutral-900 transition-colors">
                            {userData.email}
                          </span>
                        </div>
                      </motion.a>
                    )}
                    {userData.phone && (
                      <motion.a 
                        href={\`tel:\${userData.phone}\`}
                        whileHover={{ x: 10 }}
                        className="group block p-4 rounded-xl hover:bg-white/50 transition-colors duration-300"
                      >
                        <div className="flex items-center gap-3">
                          <div className="w-10 h-10 rounded-full bg-orange-100/50 flex items-center justify-center">
                            <svg className="w-5 h-5 text-neutral-600" viewBox="0 0 24 24" fill="none" stroke="currentColor">
                              <path d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                            </svg>
                          </div>
                          <span className="text-neutral-600 group-hover:text-neutral-900 transition-colors">
                            {userData.phone}
                          </span>
                        </div>
                      </motion.a>
                    )}
                    {userData.location && (
                      <motion.div 
                        whileHover={{ x: 10 }}
                        className="group block p-4 rounded-xl hover:bg-white/50 transition-colors duration-300"
                      >
                        <div className="flex items-center gap-3">
                          <div className="w-10 h-10 rounded-full bg-orange-100/50 flex items-center justify-center">
                            <svg className="w-5 h-5 text-neutral-600" viewBox="0 0 24 24" fill="none" stroke="currentColor">
                              <path d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                              <path d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                            </svg>
                          </div>
                          <span className="text-neutral-600 group-hover:text-neutral-900 transition-colors">
                            {userData.location}
                          </span>
                        </div>
                      </motion.div>
                    )}
                  </div>
                </div>
              </motion.div>
            </div>
          </div>
        </section>
      </main>
    </div>
  )
}`



  templatesDir.file("index.tsx", templateContent);

  // Generate index file to export all components
  const indexContent = `// Export all creative template components
export { CreativeTemplate } from './template'
export { CreativeHeader } from './header'
export { CreativeFooter } from './footer'
export { CreativeHeroSection } from './hero-section'
export { CreativeAboutSection } from './about-section'
export { CreativeProjectsSection } from './projects-section'
export { CreativeContactSection } from './contact-section'
`;
  templatesDir.file("index.ts", indexContent);

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
  // Add types file
  const typesContent = generateCreativeTypes();
  zip.file("types/user-data.ts", typesContent);

  // Add utils file
  const utilsContent = generateCreativeUtils();
  templatesDir.file("utils.ts", utilsContent);

  return zip;
}
