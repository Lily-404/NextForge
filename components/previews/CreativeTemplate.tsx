"use client"

import type { UserData } from "@/types/user-data"
import Image from "next/image"
import { motion } from "framer-motion"

interface CreativeTemplateProps {
  userData: UserData
}

export default function CreativeTemplate({ userData }: CreativeTemplateProps) {
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
                    href={`mailto:${userData.email}`}
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

        {userData.projects && userData.projects.length > 0 && userData.projects[0]?.title && (
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
                      href={`mailto:${userData.email}`}
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
                      href={`tel:${userData.phone}`}
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
}
