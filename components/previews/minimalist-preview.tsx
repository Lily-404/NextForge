import type { UserData } from "@/types/user-data"
import Image from "next/image"
import { ThemeToggle } from "@/components/theme-toggle"

interface MinimalistPreviewProps {
  userData: UserData
}

export function MinimalistPreview({ userData }: MinimalistPreviewProps) {
  return (
    <div className="min-h-screen bg-background text-foreground">
      <header className="container mx-auto px-4 py-6">
        <div className="flex justify-between items-center">
          <h1 className="text-xl font-bold">{userData.name || "Your Name"}</h1>
          <ThemeToggle />
        </div>
      </header>

      <main className="container mx-auto px-4 py-12">
        <section className="max-w-3xl mx-auto">
          <div className="flex flex-col md:flex-row items-center md:items-start gap-8 mb-16">
            <div className="w-32 h-32 relative flex-shrink-0">
              {userData.avatar ? (
                <Image
                  src={userData.avatar}
                  alt={userData.name || "Profile"}
                  width={128}
                  height={128}
                  className="rounded-full object-cover"
                  unoptimized
                />
              ) : (
                <div className="w-32 h-32 rounded-full bg-muted flex items-center justify-center">
                  <span className="text-3xl text-muted-foreground">
                    {userData.name ? userData.name.charAt(0) : "?"}
                  </span>
                </div>
              )}
            </div>

            <div className="flex-1 space-y-4 text-center md:text-left">
              <div>
                <h1 className="text-3xl font-bold mb-2">{userData.name || "Your Name"}</h1>
                <p className="text-lg text-muted-foreground">{userData.profession || "Your Profession"}</p>
              </div>

              {userData.bio && (
                <p className="text-base leading-relaxed">{userData.bio}</p>
              )}

              {userData.location && (
                <p className="text-sm text-muted-foreground">
                  <span className="inline-block mr-2">📍</span>
                  {userData.location}
                </p>
              )}
            </div>
          </div>

          {userData.projects && userData.projects.length > 0 && userData.projects[0].title && (
            <div className="mb-16">
              <h2 className="text-2xl font-semibold mb-6">项目作品</h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {userData.projects.map((project, index) => (
                  <div key={index} className="border border-border rounded-lg p-4">
                    {project.imageUrl && (
                      <div className="relative h-48 mb-4 rounded-md overflow-hidden">
                        <Image
                          src={project.imageUrl}
                          alt={project.title}
                          fill
                          className="object-cover"
                          unoptimized
                        />
                      </div>
                    )}
                    <h3 className="text-lg font-medium mb-2">{project.title}</h3>
                    <p className="text-muted-foreground text-sm">{project.description}</p>
                    {project.link && (
                      <a
                        href={project.link}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-block mt-3 text-sm text-primary hover:underline"
                      >
                        查看项目 →
                      </a>
                    )}
                  </div>
                ))}
              </div>
            </div>
          )}

          {userData.socialLinks && Object.values(userData.socialLinks).some(link => link) && (
            <div>
              <h2 className="text-2xl font-semibold mb-6">社交媒体</h2>
              <div className="flex flex-wrap gap-4">
                {Object.entries(userData.socialLinks).map(([platform, link]) => 
                  link ? (
                    <a
                      key={platform}
                      href={link}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center px-4 py-2 rounded-full bg-muted hover:bg-muted/80 transition-colors"
                    >
                      <span className="capitalize">{platform}</span>
                    </a>
                  ) : null
                )}
              </div>
            </div>
          )}
        </section>
      </main>

      <footer className="border-t border-border mt-16">
        <div className="container mx-auto px-4 py-6">
          <p className="text-center text-muted-foreground">
            © {new Date().getFullYear()} {userData.name || "Your Name"}. All rights reserved.
          </p>
        </div>
      </footer>
    </div>
  )
}
