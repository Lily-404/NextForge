import type { UserData } from "@/types/user-data"
import Image from "next/image"
import { motion } from "framer-motion"

export default function TemplateCreative({ userData }: { userData: UserData }) {
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
      {/* 导航栏 */}
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
                />
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
        </section>

        <section id="about" className="py-32">
          <div className="container mx-auto px-8">
            <div className="max-w-4xl mx-auto">
              <motion.div
                initial={{ opacity: 0, y: 50 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                className="grid grid-cols-1 md:grid-cols-2 gap-16"
              >
                <div>
                  <h2 className="text-4xl font-light mb-8">关于我</h2>
                  <p className="text-neutral-600 leading-relaxed">
                    {userData.bio || "在这里讲述你的故事..."}
                  </p>
                </div>
                <div className="space-y-8">
                  {userData.skills?.map((skill, index) => (
                    <motion.div
                      key={index}
                      initial={{ opacity: 0, x: 50 }}
                      whileInView={{ opacity: 1, x: 0 }}
                      viewport={{ once: true }}
                      transition={{ delay: index * 0.1 }}
                      className="group relative p-6 rounded-2xl hover:bg-white/50 transition-colors duration-300"
                    >
                      <div className="absolute inset-0 bg-gradient-to-tr from-orange-50/30 to-neutral-50/30 rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                      <h3 className="text-lg font-medium mb-4 relative">{skill.category}</h3>
                      <div className="flex flex-wrap gap-3 relative">
                        {skill.items.map((item, i) => (
                          <motion.span
                            key={i}
                            initial={{ opacity: 0, scale: 0.9 }}
                            whileInView={{ opacity: 1, scale: 1 }}
                            viewport={{ once: true }}
                            transition={{ delay: index * 0.1 + i * 0.05 }}
                            className="px-4 py-2 bg-white/80 backdrop-blur-sm rounded-full text-sm text-neutral-600 hover:bg-white hover:shadow-sm transition-all duration-300"
                          >
                            {item}
                          </motion.span>
                        ))}
                      </div>
                    </motion.div>
                  ))}
                </div>
              </motion.div>
            </div>
          </div>
        </section>

        {userData.projects && userData.projects.length > 0 && userData.projects[0].title && (
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
                          <div className="absolute inset-0 bg-gradient-to-tr from-orange-100/10 to-neutral-100/10 opacity-0 group-hover:opacity-100 transition-opacity duration-500 z-10" />
                          <div className="absolute -inset-0.5 bg-gradient-to-tr from-orange-200/50 to-neutral-200/50 opacity-0 group-hover:opacity-30 transition-opacity duration-500 blur-sm" />
                          <Image
                            src={project.imageUrl}
                            alt={project.title}
                            fill
                            className="object-cover transform group-hover:scale-105 transition-transform duration-700 relative z-0"
                          />
                        </div>
                      )}
                      <motion.div
                        initial={{ opacity: 0, x: -20 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        viewport={{ once: true }}
                        className="absolute -left-4 top-0 w-1 h-full bg-gradient-to-b from-orange-200/50 via-neutral-200/30 to-transparent"
                      />
                      <h3 className="text-2xl font-light mb-4">{project.title}</h3>
                      {project.description && (
                        <p className="text-neutral-600 mb-6">{project.description}</p>
                      )}
                      {project.link && (
                        <a
                          href={project.link}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="inline-flex items-center text-sm text-neutral-600 hover:text-neutral-900 transition-colors"
                        >
                          了解更多
                          <svg className="w-4 h-4 ml-2" viewBox="0 0 24 24" fill="none" stroke="currentColor">
                            <path d="M5 12h14M12 5l7 7-7 7" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
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
                        href={`mailto:${userData.email}`}
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
                        href={`tel:${userData.phone}`}
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
                  </div>
                </div>
                <div>
                  <h2 className="text-4xl font-light mb-8">社交媒体</h2>
                  <div className="flex flex-wrap gap-4">
                    {Object.entries(userData.socialLinks || {}).map(([platform, link]) => (
                      link && (
                        <motion.a
                          key={platform}
                          href={link}
                          target="_blank"
                          rel="noopener noreferrer"
                          whileHover={{ scale: 1.05 }}
                          className="px-6 py-3 bg-white rounded-2xl text-sm text-neutral-600 hover:shadow-sm transition-all duration-300"
                        >
                          {socialPlatformNames[platform] || platform}
                        </motion.a>
                      )
                    ))}
                  </div>
                </div>
              </motion.div>
            </div>
          </div>
        </section>
      </main>

      <footer className="py-8 border-t border-neutral-200">
        <div className="container mx-auto px-8">
          <div className="max-w-4xl mx-auto">
            <p className="text-sm text-neutral-500 text-center">
              © {new Date().getFullYear()} NextForge. 保留所有权利
            </p>
          </div>
        </div>
      </footer>
    </div>
  )
}
