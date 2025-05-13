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
    <div className="min-h-screen bg-[#0A0A0A] text-white font-sans">
      {/* 背景装饰 */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(255,255,255,0.03)_0%,transparent_100%)]"></div>
        <div className="absolute top-0 left-0 w-full h-full bg-[linear-gradient(45deg,transparent_25%,rgba(255,255,255,0.02)_50%,transparent_75%)] bg-[length:250%_250%] animate-gradient"></div>
      </div>

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
  return `import { motion } from "framer-motion"
import userData from "@/data/user-data"

export function FunHeader() {
  return (
    <nav className="relative z-10 bg-black/20 backdrop-blur-xl border-b border-white/10">
      <div className="max-w-7xl mx-auto px-6 py-4">
        <div className="flex justify-between items-center">
          <motion.div 
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            className="text-2xl font-bold bg-gradient-to-r from-purple-400 to-pink-400 bg-clip-text text-transparent"
          >
            {userData.name || "您的姓名"}
          </motion.div>
          <motion.div 
            className="flex space-x-8"
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
          >
            {["about", "projects", "contact"].map((section) => (
              <motion.a
                key={section}
                href={\`#\${section}\`}
                className="text-white/80 hover:text-white transition-colors relative group"
                whileHover={{ scale: 1.05 }}
              >
                {section === "about" ? "关于我" : 
                 section === "projects" ? "项目作品" : 
                 "联系方式"}
                <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-gradient-to-r from-purple-400 to-pink-400 group-hover:w-full transition-all duration-300"></span>
              </motion.a>
            ))}
          </motion.div>
        </div>
      </div>
    </nav>
  )
}
`
}

// Generate footer component
function generateFunFooter() {
  return `import { motion } from "framer-motion"
import userData from "@/data/user-data"

export function FunFooter() {
  return (
    <footer className="relative py-12 border-t border-white/10">
      <div className="max-w-7xl mx-auto px-6">
        <div className="text-center">
          <motion.p 
            className="text-white/60"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
          >
            © {new Date().getFullYear()} {userData.name || "您的姓名"} · 用创意改变世界
          </motion.p>
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
import { motion } from "framer-motion"
import userData from "@/data/user-data"

export function FunHeroSection() {
  return (
    <header className="relative min-h-[calc(100vh-80px)] flex items-center justify-center">
      <div className="max-w-7xl mx-auto px-6 py-20">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          <motion.div 
            className="space-y-8"
            initial={{ opacity: 0, x: -50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, ease: "easeOut" }}
          >
            <h1 className="text-6xl font-bold leading-tight">
              <span className="bg-gradient-to-r from-purple-400 to-pink-400 bg-clip-text text-transparent">
                创意无限
              </span>
              <br />
              <span className="text-white/90">探索无限可能</span>
            </h1>
            <p className="text-xl text-white/70 leading-relaxed">
              {userData.bio || "这里将展示您的个人简介，让访问者了解您的故事和愿景..."}
            </p>
            <div className="flex space-x-6">
              {userData.email && (
                <motion.a
                  href={\`mailto:\${userData.email}\`}
                  className="px-8 py-4 bg-gradient-to-r from-purple-500 to-pink-500 rounded-lg text-white font-medium hover:from-purple-600 hover:to-pink-600 transition-all transform hover:shadow-lg hover:shadow-purple-500/20"
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                >
                  联系我
                </motion.a>
              )}
              {userData.phone && (
                <motion.a
                  href={\`tel:\${userData.phone}\`}
                  className="px-8 py-4 bg-white/10 rounded-lg text-white font-medium hover:bg-white/20 transition-all"
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                >
                  电话咨询
                </motion.a>
              )}
            </div>
          </motion.div>
          <motion.div 
            className="relative"
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.8, ease: "easeOut" }}
          >
            {userData.avatar ? (
              <div className="relative w-full aspect-square rounded-2xl overflow-hidden">
                <Image
                  src={userData.avatar}
                  alt={userData.name}
                  fill
                  className="object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent"></div>
              </div>
            ) : (
              <div className="w-full aspect-square rounded-2xl bg-gradient-to-br from-purple-500 to-pink-500 flex items-center justify-center">
                <span className="text-8xl text-white">{userData.name ? userData.name.charAt(0) : "?"}</span>
              </div>
            )}
          </motion.div>
        </div>
      </div>
    </header>
  )
}
`
}

// Generate projects section component
function generateFunProjectsSection() {
  return `import Image from "next/image"
import { motion } from "framer-motion"
import userData from "@/data/user-data"

const fadeInUp = {
  initial: { opacity: 0, y: 20 },
  animate: { opacity: 1, y: 0 },
  transition: { duration: 0.6, ease: "easeOut" }
}

const staggerContainer = {
  animate: {
    transition: {
      staggerChildren: 0.1
    }
  }
}

export function FunProjectsSection() {
  return (
    <section id="projects" className="relative py-20">
      <div className="max-w-7xl mx-auto px-6">
        <motion.div 
          className="text-center mb-16"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
        >
          <h2 className="text-4xl font-bold mb-4">
            <span className="bg-gradient-to-r from-purple-400 to-pink-400 bg-clip-text text-transparent">
              精选项目
            </span>
          </h2>
          <p className="text-white/70">探索我的创意世界</p>
        </motion.div>
        <motion.div 
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8"
          variants={staggerContainer}
          initial="initial"
          whileInView="animate"
          viewport={{ once: true }}
        >
          {userData.projects.map((project, index) => (
            <motion.div
              key={index}
              variants={fadeInUp}
              className="group relative bg-white/5 rounded-2xl overflow-hidden backdrop-blur-sm border border-white/10 hover:border-white/20 transition-all"
            >
              {project.imageUrl && (
                <div className="aspect-video relative overflow-hidden">
                  <Image
                    src={project.imageUrl}
                    alt={project.title}
                    fill
                    className="object-cover transition-transform duration-500 group-hover:scale-110"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/40 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                </div>
              )}
              <div className="p-6">
                <h3 className="text-xl font-bold mb-3 text-white group-hover:text-purple-400 transition-colors">
                  {project.title}
                </h3>
                {project.description && (
                  <p className="text-white/70 mb-6 line-clamp-2">{project.description}</p>
                )}
                {project.link && (
                  <motion.a
                    href={project.link}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center text-purple-400 hover:text-purple-300 transition-colors"
                    whileHover={{ x: 5 }}
                  >
                    查看详情
                    <svg className="w-4 h-4 ml-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                    </svg>
                  </motion.a>
                )}
              </div>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  )
}`
}

// Generate contact section component
function generateFunContactSection() {
  return `import { motion } from "framer-motion"
import userData from "@/data/user-data"

export function FunContactSection() {
  return (
    <section id="contact" className="relative py-20">
      <div className="max-w-7xl mx-auto px-6">
        <motion.div 
          className="text-center mb-16"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
        >
          <h2 className="text-4xl font-bold mb-4">
            <span className="bg-gradient-to-r from-purple-400 to-pink-400 bg-clip-text text-transparent">
              联系我
            </span>
          </h2>
          <p className="text-white/70">让我们一起创造精彩</p>
        </motion.div>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
          <motion.div 
            className="space-y-8"
            initial={{ opacity: 0, x: -50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
          >
            <div className="bg-white/5 rounded-2xl p-8 backdrop-blur-sm border border-white/10">
              <h3 className="text-2xl font-bold mb-6 text-white">联系方式</h3>
              <ul className="space-y-6">
                {userData.email && (
                  <motion.li 
                    className="flex items-center space-x-4"
                    whileHover={{ x: 10 }}
                  >
                    <div className="w-12 h-12 rounded-full bg-purple-500/20 flex items-center justify-center">
                      <svg className="w-6 h-6 text-purple-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                      </svg>
                    </div>
                    <a
                      href={\`mailto:\${userData.email}\`}
                      className="text-white/80 hover:text-white transition-colors"
                    >
                      {userData.email}
                    </a>
                  </motion.li>
                )}
                {userData.phone && (
                  <motion.li 
                    className="flex items-center space-x-4"
                    whileHover={{ x: 10 }}
                  >
                    <div className="w-12 h-12 rounded-full bg-pink-500/20 flex items-center justify-center">
                      <svg className="w-6 h-6 text-pink-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                      </svg>
                    </div>
                    <a
                      href={\`tel:\${userData.phone}\`}
                      className="text-white/80 hover:text-white transition-colors"
                    >
                      {userData.phone}
                    </a>
                  </motion.li>
                )}
                {userData.wechat && (
                  <motion.li 
                    className="flex items-center space-x-4"
                    whileHover={{ x: 10 }}
                  >
                    <div className="w-12 h-12 rounded-full bg-green-500/20 flex items-center justify-center">
                      <svg className="w-6 h-6 text-green-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z" />
                      </svg>
                    </div>
                    <span className="text-white/80">{userData.wechat}</span>
                  </motion.li>
                )}
              </ul>
            </div>
          </motion.div>
          <motion.div 
            className="space-y-8"
            initial={{ opacity: 0, x: 50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
          >
            <div className="bg-white/5 rounded-2xl p-8 backdrop-blur-sm border border-white/10">
              <h3 className="text-2xl font-bold mb-6 text-white">社交媒体</h3>
              <div className="grid grid-cols-2 gap-4">
                {userData.socialLinks?.wechat && (
                  <motion.a
                    href={userData.socialLinks.wechat}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center space-x-3 p-4 rounded-xl bg-white/5 hover:bg-white/10 transition-colors"
                    whileHover={{ scale: 1.02 }}
                  >
                    <div className="w-10 h-10 rounded-full bg-green-500/20 flex items-center justify-center">
                      <svg className="w-5 h-5 text-green-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z" />
                      </svg>
                    </div>
                    <span className="text-white/80">微信公众号</span>
                  </motion.a>
                )}
                {userData.socialLinks?.weibo && (
                  <motion.a
                    href={userData.socialLinks.weibo}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center space-x-3 p-4 rounded-xl bg-white/5 hover:bg-white/10 transition-colors"
                    whileHover={{ scale: 1.02 }}
                  >
                    <div className="w-10 h-10 rounded-full bg-red-500/20 flex items-center justify-center">
                      <svg className="w-5 h-5 text-red-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6v6m0 0v6m0-6h6m-6 0H6" />
                      </svg>
                    </div>
                    <span className="text-white/80">微博</span>
                  </motion.a>
                )}
                {userData.socialLinks?.bilibili && (
                  <motion.a
                    href={userData.socialLinks.bilibili}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center space-x-3 p-4 rounded-xl bg-white/5 hover:bg-white/10 transition-colors"
                    whileHover={{ scale: 1.02 }}
                  >
                    <div className="w-10 h-10 rounded-full bg-pink-500/20 flex items-center justify-center">
                      <svg className="w-5 h-5 text-pink-400" viewBox="0 0 24 24" fill="currentColor">
                        <path d="M17.813 4.653h.854c1.51.054 2.769.578 3.773 1.574 1.004.995 1.524 2.249 1.56 3.76v7.36c-.036 1.51-.556 2.769-1.56 3.773s-2.262 1.524-3.773 1.56H5.333c-1.51-.036-2.769-.556-3.773-1.56S.036 18.858 0 17.347v-7.36c.036-1.511.556-2.765 1.56-3.76 1.004-.996 2.262-1.52 3.773-1.574h.774l-1.174-1.12a1.234 1.234 0 0 1-.373-.906c0-.356.124-.658.373-.907l.027-.027c.267-.249.573-.373.907-.373.335 0 .63.124.907.373L9.653 4.44c.071.071.134.147.187.227h4.267a.836.836 0 0 1 .16-.227l2.853-2.747c.267-.249.573-.373.907-.373.335 0 .64.124.907.373.267.249.373.551.373.907 0 .355-.124.657-.373.906zM5.333 7.24c-.746.018-1.373.276-1.88.773-.506.498-.769 1.13-.786 1.894v7.52c.017.764.28 1.395.786 1.893.507.499 1.134.757 1.88.773h13.334c.746-.016 1.373-.274 1.88-.773.506-.498.769-1.129.786-1.893v-7.52c-.017-.765-.28-1.396-.786-1.894-.507-.497-1.134-.755-1.88-.773zM8 11.107c.373 0 .684.124.933.373.25.249.383.569.4.96v1.173c-.017.391-.15.711-.4.96-.249.25-.56.374-.933.374s-.684-.125-.933-.374c-.25-.249-.383-.569-.4-.96V12.44c0-.373.129-.689.386-.947.258-.257.574-.386.947-.386zm8 0c.373 0 .684.124.933.373.25.249.383.569.4.96v1.173c-.017.391-.15.711-.4.96-.249.25-.56.374-.933.374s-.684-.125-.933-.374c-.25-.249-.383-.569-.4-.96V12.44c.017-.391.15-.711.4-.96.249-.249.56-.373.933-.373z"/>
                      </svg>
                    </div>
                    <span className="text-white/80">哔哩哔哩</span>
                  </motion.a>
                )}
                {userData.socialLinks?.github && (
                  <motion.a
                    href={userData.socialLinks.github}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center space-x-3 p-4 rounded-xl bg-white/5 hover:bg-white/10 transition-colors"
                    whileHover={{ scale: 1.02 }}
                  >
                    <div className="w-10 h-10 rounded-full bg-gray-500/20 flex items-center justify-center">
                      <svg className="w-5 h-5 text-gray-400" fill="currentColor" viewBox="0 0 24 24">
                        <path fillRule="evenodd" d="M12 2C6.477 2 2 6.484 2 12.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.531 1.032 1.531 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0112 6.844c.85.004 1.705.115 2.504.337 1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.202 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.943.359.309.678.92.678 1.855 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.019 10.019 0 0022 12.017C22 6.484 17.522 2 12 2z" clipRule="evenodd" />
                      </svg>
                    </div>
                    <span className="text-white/80">GitHub</span>
                  </motion.a>
                )}
                {userData.socialLinks?.linkedin && (
                  <motion.a
                    href={userData.socialLinks.linkedin}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center space-x-3 p-4 rounded-xl bg-white/5 hover:bg-white/10 transition-colors"
                    whileHover={{ scale: 1.02 }}
                  >
                    <div className="w-10 h-10 rounded-full bg-blue-500/20 flex items-center justify-center">
                      <svg className="w-5 h-5 text-blue-400" fill="currentColor" viewBox="0 0 24 24">
                        <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"/>
                      </svg>
                    </div>
                    <span className="text-white/80">LinkedIn</span>
                  </motion.a>
                )}
                {userData.socialLinks?.twitter && (
                  <motion.a
                    href={userData.socialLinks.twitter}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center space-x-3 p-4 rounded-xl bg-white/5 hover:bg-white/10 transition-colors"
                    whileHover={{ scale: 1.02 }}
                  >
                    <div className="w-10 h-10 rounded-full bg-blue-500/20 flex items-center justify-center">
                      <svg className="w-5 h-5 text-blue-400" fill="currentColor" viewBox="0 0 24 24">
                        <path d="M23.953 4.57a10 10 0 01-2.825.775 4.958 4.958 0 002.163-2.723c-.951.555-2.005.959-3.127 1.184a4.92 4.92 0 00-8.384 4.482C7.69 8.095 4.067 6.13 1.64 3.162a4.822 4.822 0 00-.666 2.475c0 1.71.87 3.213 2.188 4.096a4.904 4.904 0 01-2.228-.616v.06a4.923 4.923 0 003.946 4.827 4.996 4.996 0 01-2.212.085 4.936 4.936 0 004.604 3.417 9.867 9.867 0 01-6.102 2.105c-.39 0-.779-.023-1.17-.067a13.995 13.995 0 007.557 2.209c9.053 0 13.998-7.496 13.998-13.985 0-.21 0-.42-.015-.63A9.935 9.935 0 0024 4.59z" />
                      </svg>
                    </div>
                    <span className="text-white/80">Twitter</span>
                  </motion.a>
                )}
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  )
}`
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
  bilibili?: string
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
