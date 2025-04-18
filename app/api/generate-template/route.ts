import { NextResponse } from "next/server"
import type { UserData, TemplateType } from "@/types/user-data"

export async function POST(req: Request) {
  try {
    const { userData, templateType } = (await req.json()) as {
      userData: UserData
      templateType: TemplateType
    }

    // Validate required user data
    if (!userData.name) {
      return NextResponse.json({ success: false, error: "Name is required" }, { status: 400 })
    }

    // Sanitize user data to prevent XSS and other injection attacks
    const sanitizedUserData = {
      name: sanitizeString(userData.name),
      email: sanitizeString(userData.email),
      phone: sanitizeString(userData.phone),
      wechat: sanitizeString(userData.wechat),
      bio: sanitizeString(userData.bio),
      location: sanitizeString(userData.location),
      profession: sanitizeString(userData.profession),
      avatar: userData.avatar || "",
      projects: userData.projects.map((project) => ({
        title: sanitizeString(project.title),
        description: sanitizeString(project.description),
        imageUrl: project.imageUrl || "",
        link: sanitizeString(project.link),
      })),
      socialLinks: {
        wechat: sanitizeString(userData.socialLinks.wechat),
        weibo: sanitizeString(userData.socialLinks.weibo),
        github: sanitizeString(userData.socialLinks.github),
        linkedin: sanitizeString(userData.socialLinks.linkedin),
        twitter: sanitizeString(userData.socialLinks.twitter),
      },
    }

    // Generate a unique session ID for this download
    const sessionId = Math.random().toString(36).substring(2, 15) + Math.random().toString(36).substring(2, 15)
    
    // Store the data in global.sessionStorage (you might want to use Redis in production)
    if (!global.sessionStorage) {
      const storage: SessionStorage = {
        data: new Map<string, SessionData>(),
        get(key: string) {
          return this.data.get(key);
        },
        set(key: string, value: SessionData) {
          this.data.set(key, value);
        },
        has(key: string) {
          return this.data.has(key);
        },
        delete(key: string) {
          return this.data.delete(key);
        },
        // Storage interface implementation
        length: 0,
        clear() {
          this.data.clear();
        },
        getItem(key: string) {
          return null;
        },
        key(index: number) {
          return null;
        },
        removeItem(key: string) {},
        setItem(key: string, value: string) {}
      };
      global.sessionStorage = storage;
    }
    global.sessionStorage.set(sessionId, { userData: sanitizedUserData, templateType })

    // Generate download URL with session ID
    const downloadUrl = `/api/download?sessionId=${sessionId}`

    // Set expiry for session data (5 minutes)
    setTimeout(() => {
      global.sessionStorage.delete(sessionId)
    }, 5 * 60 * 1000)

    // Simulate generation delay
    await new Promise((resolve) => setTimeout(resolve, 1500))

    return NextResponse.json({
      success: true,
      downloadUrl,
      userData: sanitizedUserData, // Return sanitized data
    })
  } catch (error) {
    console.error("Template generation error:", error)
    return NextResponse.json(
      { success: false, error: "Failed to generate template. Please try again." },
      { status: 500 },
    )
  }
}

// Simple sanitization function to prevent XSS
function sanitizeString(str: string): string {
  if (!str) return ""
  return str.replace(/</g, "&lt;").replace(/>/g, "&gt;").replace(/"/g, "&quot;").replace(/'/g, "&#039;")
}
