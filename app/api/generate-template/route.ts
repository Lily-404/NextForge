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

    // Create a serialized version of userData to pass through URL
    const userDataParam = encodeURIComponent(JSON.stringify(sanitizedUserData))

    // Generate download URL with both template type and user data
    const downloadUrl = `/api/download?template=${templateType}&userData=${userDataParam}`

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
