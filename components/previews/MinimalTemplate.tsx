import type { UserData } from "@/types"
import Image from "next/image"
import { motion } from "framer-motion"

export default function MinimalTemplate({ userData }: { userData: UserData }) {
  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-white font-sans">
      <div className="max-w-5xl mx-auto px-6 py-20">
        <motion.header 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="mb-20 text-center"
        >
          <div className="relative w-32 h-32 mx-auto mb-8">
            {userData.avatar ? (
              <Image
                src={userData.avatar || "/placeholder.svg"}
                alt={userData.name}
                fill
                className="rounded-full object-cover shadow-xl ring-4 ring-white"
              />
            ) : (
              <div className="w-32 h-32 rounded-full bg-gradient-to-br from-gray-200 to-gray-300 flex items-center justify-center shadow-xl ring-4 ring-white">
                <span className="text-4xl font-light text-gray-600">{userData.name ? userData.name.charAt(0) : "?"}</span>
              </div>
            )}
          </div>
          <h1 className="text-4xl font-bold text-gray-900 mb-3 tracking-tight">{userData.name || "您的姓名"}</h1>
          <p className="text-xl text-gray-600 font-light">{userData.profession || "您的职业"}</p>
          {userData.location && (
            <p className="text-gray-500 mt-2 flex items-center justify-center gap-2">
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
              </svg>
              {userData.location}
            </p>
          )}
        </motion.header>

        <motion.section 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="mb-16"
        >
          <h2 className="text-2xl font-semibold text-gray-800 mb-6 flex items-center gap-2">
            <span className="w-8 h-0.5 bg-gray-300"></span>
            关于我
          </h2>
          <div className="bg-white p-8 rounded-2xl shadow-sm border border-gray-100">
            <p className="text-gray-700 leading-relaxed text-lg">{userData.bio || "这里将显示您的个人简介..."}</p>
          </div>
        </motion.section>

        {userData.projects && userData.projects.length > 0 && userData.projects[0].title && (
          <motion.section 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.4 }}
            className="mb-16"
          >
            <h2 className="text-2xl font-semibold text-gray-800 mb-6 flex items-center gap-2">
              <span className="w-8 h-0.5 bg-gray-300"></span>
              项目作品
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              {userData.projects.map((project, index) => (
                <div key={index} className="group bg-white rounded-2xl overflow-hidden shadow-sm border border-gray-100 transition-all duration-300 hover:shadow-lg">
                  {project.imageUrl && (
                    <div className="aspect-w-16 aspect-h-9 relative overflow-hidden">
                      <Image
                        src={project.imageUrl || "/placeholder.svg"}
                        alt={project.title}
                        fill
                        className="object-cover transition-transform duration-300 group-hover:scale-105"
                      />
                    </div>
                  )}
                  <div className="p-6">
                    <h3 className="font-medium text-xl text-gray-900 mb-3">{project.title}</h3>
                    {project.description && <p className="text-gray-600 mb-4">{project.description}</p>}
                    {project.link && (
                      <a
                        href={project.link}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-flex items-center gap-2 text-blue-600 hover:text-blue-700 transition-colors"
                      >
                        查看项目
                        <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14 5l7 7m0 0l-7 7m7-7H3" />
                        </svg>
                      </a>
                    )}
                  </div>
                </div>
              ))}
            </div>
          </motion.section>
        )}

        <motion.section 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.6 }}
          className="mb-16"
        >
          <h2 className="text-2xl font-semibold text-gray-800 mb-6 flex items-center gap-2">
            <span className="w-8 h-0.5 bg-gray-300"></span>
            联系方式
          </h2>
          <div className="bg-white p-8 rounded-2xl shadow-sm border border-gray-100">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {userData.email && (
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-full bg-blue-50 flex items-center justify-center">
                    <svg className="w-5 h-5 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                    </svg>
                  </div>
                  <div>
                    <p className="text-sm text-gray-500">邮箱</p>
                    <a href={`mailto:${userData.email}`} className="text-gray-900 hover:text-blue-600 transition-colors">
                      {userData.email}
                    </a>
                  </div>
                </div>
              )}
              {userData.phone && (
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-full bg-green-50 flex items-center justify-center">
                    <svg className="w-5 h-5 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                    </svg>
                  </div>
                  <div>
                    <p className="text-sm text-gray-500">电话</p>
                    <a href={`tel:${userData.phone}`} className="text-gray-900 hover:text-green-600 transition-colors">
                      {userData.phone}
                    </a>
                  </div>
                </div>
              )}
              {userData.wechat && (
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-full bg-green-50 flex items-center justify-center">
                    <svg className="w-5 h-5 text-green-600" fill="currentColor" viewBox="0 0 24 24">
                      <path d="M8.691 2.188C3.891 2.188 0 5.476 0 9.53c0 2.212 1.17 4.203 3.002 5.55a.59.59 0 01.213.665l-.39 1.48c-.019.07-.048.141-.048.213 0 .163.13.295.29.295a.328.328 0 00.168-.054l1.903-1.114a.864.864 0 01.718-.098 10.16 10.16 0 001.372.093c.276 0 .543-.027.811-.053-.856-2.563.215-5.145 2.574-6.365 2.36-1.22 5.308-.624 6.805 1.332.376.492.682 1.024.91 1.586.988-.316 1.903-.782 2.71-1.377-1.08-3.755-4.588-6.53-8.923-6.53zM5.785 5.991c.642 0 1.162.529 1.162 1.18a1.17 1.17 0 01-1.162 1.178A1.17 1.17 0 014.623 7.17c0-.651.52-1.18 1.162-1.18zm6.374 0c.642 0 1.162.529 1.162 1.18a1.17 1.17 0 01-1.162 1.178 1.17 1.17 0 01-1.162-1.178c0-.651.52-1.18 1.162-1.18zm5.791 2.747c-1.893-.104-3.892.528-5.384 1.728-1.492 1.2-2.246 2.83-2.246 4.547 0 1.718.754 3.348 2.246 4.548 1.492 1.2 3.491 1.832 5.384 1.728.276 0 .543-.027.811-.053a.864.864 0 01.718.098l1.903 1.114a.328.328 0 00.168.054c.16 0 .29-.132.29-.295 0-.072-.029-.142-.048-.213l-.39-1.48a.59.59 0 01.213-.665c1.832-1.347 3.002-3.338 3.002-5.55 0-2.83-2.333-5.13-5.2-5.13-.276 0-.543.027-.811.053.856 2.563-.215 5.145-2.574 6.365-2.36 1.22-5.308.624-6.805-1.332-.376-.492-.682-1.024-.91-1.586-.988.316-1.903.782-2.71 1.377 1.08 3.755 4.588 6.53 8.923 6.53 4.335 0 7.843-2.775 8.923-6.53-1.08-3.755-4.588-6.53-8.923-6.53zm-3.187 2.747c.642 0 1.162.529 1.162 1.18a1.17 1.17 0 01-1.162 1.178 1.17 1.17 0 01-1.162-1.178c0-.651.52-1.18 1.162-1.18zm6.374 0c.642 0 1.162.529 1.162 1.18a1.17 1.17 0 01-1.162 1.178 1.17 1.17 0 01-1.162-1.178c0-.651.52-1.18 1.162-1.18z" />
                    </svg>
                  </div>
                  <div>
                    <p className="text-sm text-gray-500">微信</p>
                    <span className="text-gray-900">{userData.wechat}</span>
                  </div>
                </div>
              )}
            </div>
          </div>
        </motion.section>

        {Object.values(userData.socialLinks).some((link) => link) && (
          <motion.section 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.8 }}
          >
            <h2 className="text-2xl font-semibold text-gray-800 mb-6 flex items-center gap-2">
              <span className="w-8 h-0.5 bg-gray-300"></span>
              社交媒体
            </h2>
            <div className="flex flex-wrap gap-4">
              {userData.socialLinks.wechat && (
                <a
                  href={userData.socialLinks.wechat}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="group px-6 py-3 bg-white rounded-xl text-gray-700 hover:bg-gray-50 transition-all duration-300 border border-gray-100 hover:border-gray-200 flex items-center gap-2"
                >
                  <svg className="w-5 h-5 text-green-600" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M8.691 2.188C3.891 2.188 0 5.476 0 9.53c0 2.212 1.17 4.203 3.002 5.55a.59.59 0 01.213.665l-.39 1.48c-.019.07-.048.141-.048.213 0 .163.13.295.29.295a.328.328 0 00.168-.054l1.903-1.114a.864.864 0 01.718-.098 10.16 10.16 0 001.372.093c.276 0 .543-.027.811-.053-.856-2.563.215-5.145 2.574-6.365 2.36-1.22 5.308-.624 6.805 1.332.376.492.682 1.024.91 1.586.988-.316 1.903-.782 2.71-1.377-1.08-3.755-4.588-6.53-8.923-6.53zM5.785 5.991c.642 0 1.162.529 1.162 1.18a1.17 1.17 0 01-1.162 1.178A1.17 1.17 0 014.623 7.17c0-.651.52-1.18 1.162-1.18zm6.374 0c.642 0 1.162.529 1.162 1.18a1.17 1.17 0 01-1.162 1.178 1.17 1.17 0 01-1.162-1.178c0-.651.52-1.18 1.162-1.18z" />
                  </svg>
                  <span>微信公众号</span>
                </a>
              )}
              {userData.socialLinks.weibo && (
                <a
                  href={userData.socialLinks.weibo}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="group px-6 py-3 bg-white rounded-xl text-gray-700 hover:bg-gray-50 transition-all duration-300 border border-gray-100 hover:border-gray-200 flex items-center gap-2"
                >
                  <svg className="w-5 h-5 text-red-600" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M10.098 20c-3.308 0-6-2.692-6-6s2.692-6 6-6 6 2.692 6 6-2.692 6-6 6zm0-10.5c-2.485 0-4.5 2.015-4.5 4.5s2.015 4.5 4.5 4.5 4.5-2.015 4.5-4.5-2.015-4.5-4.5-4.5zm0 7.5c-1.657 0-3-1.343-3-3s1.343-3 3-3 3 1.343 3 3-1.343 3-3 3zm0-4.5c-.828 0-1.5.672-1.5 1.5s.672 1.5 1.5 1.5 1.5-.672 1.5-1.5-.672-1.5-1.5-1.5zm0 2.25c-.414 0-.75.336-.75.75s.336.75.75.75.75-.336.75-.75-.336-.75-.75-.75z" />
                  </svg>
                  <span>微博</span>
                </a>
              )}
              {userData.socialLinks.bilibili && (
                <a
                  href={userData.socialLinks.bilibili}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="group px-6 py-3 bg-white rounded-xl text-gray-700 hover:bg-gray-50 transition-all duration-300 border border-gray-100 hover:border-gray-200 flex items-center gap-2"
                >
                  <svg className="w-5 h-5 text-pink-600" viewBox="0 0 24 24" fill="currentColor">
                    <path d="M17.813 4.653h.854c1.51.054 2.769.578 3.773 1.574 1.004.995 1.524 2.249 1.56 3.76v7.36c-.036 1.51-.556 2.769-1.56 3.773s-2.262 1.524-3.773 1.56H5.333c-1.51-.036-2.769-.556-3.773-1.56S.036 18.858 0 17.347v-7.36c.036-1.511.556-2.765 1.56-3.76 1.004-.996 2.262-1.52 3.773-1.574h.774l-1.174-1.12a1.234 1.234 0 0 1-.373-.906c0-.356.124-.658.373-.907l.027-.027c.267-.249.573-.373.907-.373.335 0 .63.124.907.373L9.653 4.44c.071.071.134.147.187.227h4.267a.836.836 0 0 1 .16-.227l2.853-2.747c.267-.249.573-.373.907-.373.335 0 .64.124.907.373.267.249.373.551.373.907 0 .355-.124.657-.373.906zM5.333 7.24c-.746.018-1.373.276-1.88.773-.506.498-.769 1.13-.786 1.894v7.52c.017.764.28 1.395.786 1.893.507.499 1.134.757 1.88.773h13.334c.746-.016 1.373-.274 1.88-.773.506-.498.769-1.129.786-1.893v-7.52c-.017-.765-.28-1.396-.786-1.894-.507-.497-1.134-.755-1.88-.773zM8 11.107c.373 0 .684.124.933.373.25.249.383.569.4.96v1.173c-.017.391-.15.711-.4.96-.249.25-.56.374-.933.374s-.684-.125-.933-.374c-.25-.249-.383-.569-.4-.96V12.44c0-.373.129-.689.386-.947.258-.257.574-.386.947-.386zm8 0c.373 0 .684.124.933.373.25.249.383.569.4.96v1.173c-.017.391-.15.711-.4.96-.249.25-.56.374-.933.374s-.684-.125-.933-.374c-.25-.249-.383-.569-.4-.96V12.44c.017-.391.15-.711.4-.96.249-.249.56-.373.933-.373z"/>
                  </svg>
                  <span>哔哩哔哩</span>
                </a>
              )}
              {userData.socialLinks.github && (
                <a
                  href={userData.socialLinks.github}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="group px-6 py-3 bg-white rounded-xl text-gray-700 hover:bg-gray-50 transition-all duration-300 border border-gray-100 hover:border-gray-200 flex items-center gap-2"
                >
                  <svg className="w-5 h-5 text-gray-900" fill="currentColor" viewBox="0 0 24 24">
                    <path fillRule="evenodd" d="M12 2C6.477 2 2 6.484 2 12.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.531 1.032 1.531 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0112 6.844c.85.004 1.705.115 2.504.337 1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.202 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.943.359.309.678.92.678 1.855 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.019 10.019 0 0022 12.017C22 6.484 17.522 2 12 2z" clipRule="evenodd" />
                  </svg>
                  <span>GitHub</span>
                </a>
              )}
              {userData.socialLinks.linkedin && (
                <a
                  href={userData.socialLinks.linkedin}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="group px-6 py-3 bg-white rounded-xl text-gray-700 hover:bg-gray-50 transition-all duration-300 border border-gray-100 hover:border-gray-200 flex items-center gap-2"
                >
                  <svg className="w-5 h-5 text-blue-600" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"/>
                  </svg>
                  <span>LinkedIn</span>
                </a>
              )}
              {userData.socialLinks.twitter && (
                <a
                  href={userData.socialLinks.twitter}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="group px-6 py-3 bg-white rounded-xl text-gray-700 hover:bg-gray-50 transition-all duration-300 border border-gray-100 hover:border-gray-200 flex items-center gap-2"
                >
                  <svg className="w-5 h-5 text-blue-400" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M23.953 4.57a10 10 0 01-2.825.775 4.958 4.958 0 002.163-2.723c-.951.555-2.005.959-3.127 1.184a4.92 4.92 0 00-8.384 4.482C7.69 8.095 4.067 6.13 1.64 3.162a4.822 4.822 0 00-.666 2.475c0 1.71.87 3.213 2.188 4.096a4.904 4.904 0 01-2.228-.616v.06a4.923 4.923 0 003.946 4.827 4.996 4.996 0 01-2.212.085 4.936 4.936 0 004.604 3.417 9.867 9.867 0 01-6.102 2.105c-.39 0-.779-.023-1.17-.067a13.995 13.995 0 007.557 2.209c9.053 0 13.998-7.496 13.998-13.985 0-.21 0-.42-.015-.63A9.935 9.935 0 0024 4.59z" />
                  </svg>
                  <span>Twitter</span>
                </a>
              )}
            </div>
          </motion.section>
        )}
      </div>
    </div>
  )
}
