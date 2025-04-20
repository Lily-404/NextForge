import type JSZip from "jszip"

export function generateCreativeTemplate(zip: JSZip, userData: any) {
  // 创建模板目录结构
  const templatesDir = zip.folder("components/templates/creative")

  // 添加组件文件
  templatesDir.file("template.tsx", generateCreativeTemplateComponent())
  templatesDir.file("header.tsx", generateCreativeHeader())
  templatesDir.file("hero-section.tsx", generateCreativeHeroSection())
  templatesDir.file("about-section.tsx", generateCreativeAboutSection())
  templatesDir.file("projects-section.tsx", generateCreativeProjectsSection())
  templatesDir.file("contact-section.tsx", generateCreativeContactSection())
  templatesDir.file("footer.tsx", generateCreativeFooter())

  // 添加工具文件
  templatesDir.file("utils.ts", generateCreativeUtils())
  templatesDir.file("types.ts", generateCreativeTypes())

  // 添加页面文件
  // 修改页面文件的生成
  zip.file("app/page.tsx", `import { CreativeTemplate } from "@/components/templates/creative/template"
  import userData from "@/data/user-data"
  
  export default function Home() {
    return <CreativeTemplate userData={userData} />
  }`)
}

// Generate types file
function generateCreativeTypes() {
  return `interface Project {
  title: string
  description: string
  imageUrl: string
  link: string
  date: string
}

interface SocialLinks {
  // 国内平台
  wechat?: string
  weibo?: string
  bilibili?: string
  zhihu?: string
  douyin?: string
  xiaohongshu?: string
  jike?: string
  douban?: string
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
}`
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
}`
}

// Generate main template component
function generateCreativeTemplateComponent() {
  return `'use client'

import type { UserData } from "@/types/user-data"
import Image from "next/image"
import { motion } from "framer-motion"

interface CreativeTemplateProps {
  userData: UserData
}

export function CreativeTemplate({ userData }: CreativeTemplateProps) {
  const socialPlatformNames: Record<string, string> = {
    wechat: '微信公众号',
    weibo: '微博',
    bilibili: '哔哩哔哩',
    zhihu: '知乎',
    douyin: '抖音',
    xiaohongshu: '小红书',
    jike: '即刻',
    douban: '豆瓣'
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
                      fill
                      className="object-cover rounded-3xl"
                    />
                  </div>
                ) : (
                  <div className="w-32 h-32 bg-gradient-to-br from-orange-100 to-neutral-100 rounded-3xl flex items-center justify-center">
                    <span className="text-4xl text-neutral-400">{userData.name ? userData.name.charAt(0) : "?"}</span>
                  </div>
                )}
                <motion.div 
                  initial={{ scale: 0 }}
                  animate={{ scale: 1 }}
                  transition={{ delay: 0.4 }}
                  className="absolute -bottom-4 -right-4 w-16 h-16 bg-orange-100 rounded-full"
                ></motion.div>
              </div>
              <motion.h1 
                initial={{ opacity: 0, x: -50 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.3 }}
                className="text-6xl font-light mb-6 tracking-tight"
              >
                {userData.name || "创意设计师"}
              </motion.h1>
              <motion.p 
                initial={{ opacity: 0, x: -50 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.4 }}
                className="text-2xl text-neutral-600 mb-12"
              >
                {userData.profession || "让创意改变世界"}
              </motion.p>
              <motion.div 
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.5 }}
                className="flex gap-4"
              >
                {userData.email && (
                  <a 
                    href={\`mailto:\${userData.email}\`}
                    className="px-6 py-3 bg-neutral-900 text-white rounded-full text-sm tracking-wide hover:bg-neutral-800 transition-colors"
                  >
                    联系我
                  </a>
                )}
                {userData.socialLinks?.linkedin && (
                  <a 
                    href={userData.socialLinks.linkedin}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="px-6 py-3 border border-neutral-300 rounded-full text-sm tracking-wide hover:bg-neutral-50 transition-colors"
                  >
                    LinkedIn
                  </a>
                )}
              </motion.div>
            </div>
          </motion.div>
          <div className="absolute bottom-12 left-1/2 -translate-x-1/2">
            <motion.div
              animate={{ y: [0, 10, 0] }}
              transition={{ repeat: Infinity, duration: 2 }}
              className="w-6 h-10 border-2 border-neutral-400 rounded-full flex items-start justify-center p-2"
            >
              <div className="w-1 h-2 bg-neutral-400 rounded-full"></div>
            </motion.div>
          </div>
          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 1 }}
            className="absolute -right-8 top-1/2 -translate-y-1/2 hidden lg:flex flex-col gap-4 items-center"
          >
            <div className="h-24 w-px bg-neutral-300/50" />
            <div className="rotate-90 transform origin-center whitespace-nowrap text-xs text-neutral-400 tracking-widest uppercase">
              Scroll to explore
            </div>
          </motion.div>
        </section>

        {userData.projects?.length > 0 && userData.projects[0]?.title && (
          <section id="works" className="py-32 bg-neutral-100">
            <div className="container mx-auto px-8">
              <div className="max-w-4xl mx-auto">
                <h2 className="text-4xl font-light mb-16">精选作品</h2>
                <div className="grid grid-cols-1 gap-16">
                  {userData.projects.map((project, index) => (
                    <motion.div
                      key={index}
                      initial={{ opacity: 0, y: 50 }}
                      whileInView={{ opacity: 1, y: 0 }}
                      viewport={{ once: true }}
                      transition={{ delay: index * 0.1 }}
                      className="group relative"
                    >
                      {project.imageUrl && (
                        <div className="aspect-[16/9] relative mb-8 overflow-hidden rounded-2xl">
                          <Image
                            src={project.imageUrl}
                            alt={project.title}
                            fill
                            className="object-cover transition-transform duration-500 group-hover:scale-105"
                          />
                        </div>
                      )}
                      <h3 className="text-2xl font-light mb-4">{project.title}</h3>
                      {project.description && (
                        <p className="text-neutral-600 mb-6">{project.description}</p>
                      )}
                      {project.link && (
                        <a
                          href={project.link}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="inline-flex items-center text-sm font-medium text-neutral-900 hover:text-neutral-600 transition-colors"
                        >
                          查看项目
                          <svg
                            className="ml-2 w-4 h-4"
                            fill="none"
                            stroke="currentColor"
                            viewBox="0 0 24 24"
                            xmlns="http://www.w3.org/2000/svg"
                          >
                            <path
                              strokeLinecap="round"
                              strokeLinejoin="round"
                              strokeWidth={2}
                              d="M14 5l7 7m0 0l-7 7m7-7H3"
                            />
                          </svg>
                        </a>
                      )}
                    </motion.div>
                  ))}
                </div>
              </div>
            </div>
          </section>
        )}

        <section id="contact" className="py-32">
          <div className="container mx-auto px-8">
            <div className="max-w-4xl mx-auto">
              <h2 className="text-4xl font-light mb-16">联系方式</h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                {userData.email && (
                  <div>
                    <h3 className="text-sm font-medium text-neutral-400 mb-2">邮箱</h3>
                    <a
                      href={\`mailto:\${userData.email}\`}
                      className="text-lg hover:text-neutral-600 transition-colors"
                    >
                      {userData.email}
                    </a>
                  </div>
                )}
                {userData.phone && (
                  <div>
                    <h3 className="text-sm font-medium text-neutral-400 mb-2">电话</h3>
                    <a
                      href={\`tel:\${userData.phone}\`}
                      className="text-lg hover:text-neutral-600 transition-colors"
                    >
                      {userData.phone}
                    </a>
                  </div>
                )}
              </div>

              {userData.socialLinks && Object.keys(userData.socialLinks).length > 0 && (
                <div className="mt-16">
                  <h3 className="text-sm font-medium text-neutral-400 mb-6">社交媒体</h3>
                  <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4">
                    {Object.entries(userData.socialLinks).map(([platform, link]) => (
                      link && (
                        <a
                          key={platform}
                          href={link}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="px-4 py-3 border border-neutral-200 rounded-xl hover:bg-neutral-50 transition-colors"
                        >
                          <span className="text-sm">{socialPlatformNames[platform] || platform}</span>
                        </a>
                      )
                    ))}
                  </div>
                </div>
              )}
            </div>
          </div>
        </section>
      </main>
    </div>
  )
}`
}

// Generate header component
function generateCreativeHeader() {
  return `'use client'

import { motion } from 'framer-motion'
import type { UserData } from "@/types/user-data"

interface CreativeHeaderProps {
  userData: UserData
}

export function CreativeHeader({ userData }: CreativeHeaderProps) {
  return (
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
  )
}`
}

// Generate footer component
function generateCreativeFooter() {
  return `'use client'

import { motion } from 'framer-motion'
import type { UserData } from "@/types/user-data"

interface CreativeFooterProps {
  userData: UserData
}

export function CreativeFooter({ userData }: CreativeFooterProps) {
  return (
    <footer className="py-8 border-t border-neutral-200/50">
      <div className="container mx-auto px-8">
        <motion.div 
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          className="max-w-4xl mx-auto text-center text-neutral-600 text-sm"
        >
          © {new Date().getFullYear()} {userData.name}. All rights reserved.
        </motion.div>
      </div>
    </footer>
  )
}`
}

// Generate hero section component
function generateCreativeHeroSection() {
  return `'use client'

import Image from 'next/image'
import { motion } from 'framer-motion'
import type { UserData } from "@/types/user-data"
import { getImageFallback } from './utils'

interface CreativeHeroSectionProps {
  userData: UserData
  socialPlatformNames: Record<string, string> // 添加 socialPlatformNames prop
}

export function CreativeHeroSection({ userData, socialPlatformNames }: CreativeHeroSectionProps) {
  // 移除此处的 socialPlatformNames 定义

  return (
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
                  className="object-cover rounded-3xl"
                />
              </div>
            ) : (
              <div className="w-32 h-32 bg-neutral-100 dark:bg-neutral-800 rounded-3xl flex items-center justify-center">
                <span className="text-4xl font-medium text-neutral-400">
                  {getImageFallback(userData.name)}
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
                  {/* 使用 props 传入的 socialPlatformNames */}
                  {socialPlatformNames[platform] || platform.charAt(0).toUpperCase() + platform.slice(1)}
                </a>
              )
            })}
          </motion.div>
        </div>
      </motion.div>
    </section>
  )
}`
}

// Generate about section component
function generateCreativeAboutSection() {
  return `'use client'

import { motion } from 'framer-motion'
import userData from '@/data/user-data'

export function CreativeAboutSection() {
  return (
    <section id="about" className="py-32">
      <div className="container mx-auto px-8">
        <div className="max-w-4xl mx-auto">
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-3xl font-bold mb-12"
          >
            关于我
          </motion.h2>
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="prose prose-neutral max-w-none"
          >
            <p className="text-lg text-neutral-600 leading-relaxed">
              {userData.bio}
            </p>
          </motion.div>
        </div>
      </div>
    </section>
  )
}`
}

// Generate projects section component
function generateCreativeProjectsSection() {
  return `'use client'

import Image from 'next/image'
import { motion } from 'framer-motion'
import type { UserData } from "@/types/user-data"

interface CreativeProjectsSectionProps {
  userData: UserData
}

export function CreativeProjectsSection({ userData }: CreativeProjectsSectionProps) {
  return (
    <section id="works" className="py-32 bg-white">
      <div className="container mx-auto px-8">
        <div className="max-w-4xl mx-auto">
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-3xl font-bold mb-12"
          >
            作品集
          </motion.h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {userData.projects?.map((project, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
                className="group relative overflow-hidden rounded-2xl bg-neutral-50"
              >
                {project.imageUrl && (
                  <div className="aspect-video relative overflow-hidden">
                    <Image
                      src={project.imageUrl}
                      alt={project.title}
                      fill
                      className="object-cover transition-transform duration-500 group-hover:scale-110"
                    />
                  </div>
                )}
                <div className="p-6">
                  <h3 className="text-xl font-semibold mb-2">{project.title}</h3>
                  <p className="text-neutral-600 mb-4">{project.description}</p>
                  {project.link && (
                    <a
                      href={project.link}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center text-neutral-900 hover:text-neutral-600 transition-colors"
                    >
                      了解更多
                      <svg
                        className="ml-2 w-4 h-4"
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M17 8l4 4m0 0l-4 4m4-4H3"
                        />
                      </svg>
                    </a>
                  )}
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}`
}

// Generate contact section component
function generateCreativeContactSection() {
  return `'use client'

import { motion } from 'framer-motion'
import type { UserData } from "@/types/user-data"

interface CreativeContactSectionProps {
  userData: UserData
  socialPlatformNames: Record<string, string> // 添加 socialPlatformNames prop
}

export function CreativeContactSection({ userData, socialPlatformNames }: CreativeContactSectionProps) {
  // 移除此处的 socialPlatformNames 定义

  return (
    <section id="contact" className="py-32">
      <div className="container mx-auto px-8">
        <div className="max-w-4xl mx-auto">
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-3xl font-bold mb-12"
          >
            联系方式
          </motion.h2>
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="grid grid-cols-1 md:grid-cols-2 gap-8"
          >
            <div className="space-y-6">
              {userData.email && (
                <a
                  href={"mailto:" + userData.email}
                  className="block p-6 bg-white/50 hover:bg-white/80 rounded-2xl transition-colors"
                >
                  <div className="text-sm text-neutral-600 mb-1">邮箱</div>
                  <div className="text-neutral-900">{userData.email}</div>
                </a>
              )}
              {userData.phone && (
                <a
                  href={"tel:" + userData.phone}
                  className="block p-6 bg-white/50 hover:bg-white/80 rounded-2xl transition-colors"
                >
                  <div className="text-sm text-neutral-600 mb-1">电话</div>
                  <div className="text-neutral-900">{userData.phone}</div>
                </a>
              )}
              {userData.location && (
                <div className="block p-6 bg-white/50 rounded-2xl">
                  <div className="text-sm text-neutral-600 mb-1">地址</div>
                  <div className="text-neutral-900">{userData.location}</div>
                </div>
              )}
            </div>
            <div className="space-y-6">
              <div className="p-6 bg-white/50 rounded-2xl">
                <div className="text-sm text-neutral-600 mb-4">社交媒体</div>
                <div className="grid grid-cols-2 gap-4">
                  {Object.entries(userData.socialLinks || {}).map(([platform, link]) => {
                    if (!link) return null
                    return (
                      <a
                        key={platform}
                        href={link}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-neutral-900 hover:text-neutral-600 transition-colors"
                      >
                        {/* 使用 props 传入的 socialPlatformNames */}
                        {socialPlatformNames[platform] || platform.charAt(0).toUpperCase() + platform.slice(1)}
                      </a>
                    )
                  })}
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  )
}`
}
