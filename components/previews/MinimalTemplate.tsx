import type { UserData } from "@/types"
import Image from "next/image"

export default function MinimalTemplate({ userData }: { userData: UserData }) {
  return (
    <div className="min-h-screen bg-white font-sans">
      <div className="max-w-4xl mx-auto px-4 py-16">
        <header className="mb-16 text-center">
          <div className="relative w-24 h-24 mx-auto mb-6">
            {userData.avatar ? (
              <Image
                src={userData.avatar || "/placeholder.svg"}
                alt={userData.name}
                fill
                className="rounded-full object-cover"
              />
            ) : (
              <div className="w-24 h-24 rounded-full bg-gray-200 flex items-center justify-center">
                <span className="text-2xl text-gray-500">{userData.name ? userData.name.charAt(0) : "?"}</span>
              </div>
            )}
          </div>
          <h1 className="text-3xl font-bold text-gray-900 mb-2">{userData.name || "您的姓名"}</h1>
          <p className="text-lg text-gray-600">{userData.profession || "您的职业"}</p>
          {userData.location && <p className="text-gray-500 mt-1">{userData.location}</p>}
        </header>

        <section className="mb-12">
          <h2 className="text-xl font-semibold text-gray-800 mb-4">关于我</h2>
          <div className="bg-gray-50 p-6 rounded-lg">
            <p className="text-gray-700 leading-relaxed">{userData.bio || "这里将显示您的个人简介..."}</p>
          </div>
        </section>

        {userData.projects && userData.projects.length > 0 && userData.projects[0].title && (
          <section className="mb-12">
            <h2 className="text-xl font-semibold text-gray-800 mb-4">项目作品</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {userData.projects.map((project, index) => (
                <div key={index} className="border border-gray-200 rounded-lg overflow-hidden">
                  {project.imageUrl && (
                    <div className="aspect-w-16 aspect-h-9 relative">
                      <Image
                        src={project.imageUrl || "/placeholder.svg"}
                        alt={project.title}
                        fill
                        className="object-cover"
                      />
                    </div>
                  )}
                  <div className="p-4">
                    <h3 className="font-medium text-gray-900 mb-2">{project.title}</h3>
                    {project.description && <p className="text-gray-600 text-sm">{project.description}</p>}
                    {project.link && (
                      <a
                        href={project.link}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-blue-600 text-sm mt-2 inline-block hover:underline"
                      >
                        查看项目
                      </a>
                    )}
                  </div>
                </div>
              ))}
            </div>
          </section>
        )}

        <section className="mb-12">
          <h2 className="text-xl font-semibold text-gray-800 mb-4">联系方式</h2>
          <div className="bg-gray-50 p-6 rounded-lg">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {userData.email && (
                <div>
                  <span className="text-gray-500">邮箱：</span>
                  <a href={`mailto:${userData.email}`} className="text-blue-600 hover:underline">
                    {userData.email}
                  </a>
                </div>
              )}
              {userData.phone && (
                <div>
                  <span className="text-gray-500">电话：</span>
                  <a href={`tel:${userData.phone}`} className="text-blue-600 hover:underline">
                    {userData.phone}
                  </a>
                </div>
              )}
              {userData.wechat && (
                <div>
                  <span className="text-gray-500">微信：</span>
                  <span>{userData.wechat}</span>
                </div>
              )}
            </div>
          </div>
        </section>

        {Object.values(userData.socialLinks).some((link) => link) && (
          <section>
            <h2 className="text-xl font-semibold text-gray-800 mb-4">社交媒体</h2>
            <div className="flex flex-wrap gap-4">
              {userData.socialLinks.wechat && (
                <a
                  href={userData.socialLinks.wechat}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="px-4 py-2 bg-gray-100 rounded-full text-gray-700 hover:bg-gray-200"
                >
                  微信公众号
                </a>
              )}
              {userData.socialLinks.weibo && (
                <a
                  href={userData.socialLinks.weibo}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="px-4 py-2 bg-gray-100 rounded-full text-gray-700 hover:bg-gray-200"
                >
                  微博
                </a>
              )}
              {userData.socialLinks.github && (
                <a
                  href={userData.socialLinks.github}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="px-4 py-2 bg-gray-100 rounded-full text-gray-700 hover:bg-gray-200"
                >
                  GitHub
                </a>
              )}
              {userData.socialLinks.linkedin && (
                <a
                  href={userData.socialLinks.linkedin}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="px-4 py-2 bg-gray-100 rounded-full text-gray-700 hover:bg-gray-200"
                >
                  LinkedIn
                </a>
              )}
              {userData.socialLinks.twitter && (
                <a
                  href={userData.socialLinks.twitter}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="px-4 py-2 bg-gray-100 rounded-full text-gray-700 hover:bg-gray-200"
                >
                  Twitter
                </a>
              )}
            </div>
          </section>
        )}
      </div>
    </div>
  )
}
