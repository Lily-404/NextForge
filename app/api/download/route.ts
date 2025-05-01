import { NextResponse } from "next/server"
import JSZip from "jszip"
import {
  generatePackageJson,
  generateNextConfig,
  generateTsConfig,
  generateTailwindConfig,
  generatePostcssConfig,
  generateGitignore,
  generateGlobalCss,
  generateRootLayout,
  generateMainPage,
  generateThemeProvider,
  generateThemeToggle,
  generateUserDataFile,
} from "@/lib/generators/config-generators"
import { generateMinimalTemplate } from "@/lib/generators/templates/minimalist-generator"
import { generateBusinessTemplate } from "@/lib/generators/templates/business-generator"
import { generateCreativeTemplate } from "@/lib/generators/templates/creative-generator"
import { generateFunTemplate } from "@/lib/generators/templates/fun-generator"

export async function GET(req: Request) {
  try {
    const { searchParams } = new URL(req.url)
    const sessionId = searchParams.get("sessionId")
    
    if (!sessionId || !global.sessionStorage?.has(sessionId)) {
      return new NextResponse("Invalid or expired download session", { status: 400 })
    }

    // Get data from session storage
    const sessionData = global.sessionStorage.get(sessionId)
    const { userData, templateType } = sessionData

    // Delete session data after retrieval
    global.sessionStorage.delete(sessionId)

    // Create a new JSZip instance
    const zip = new JSZip()

    // Add configuration files
    zip.file("package.json", generatePackageJson())
    zip.file("next.config.js", generateNextConfig())
    zip.file("tsconfig.json", generateTsConfig())
    zip.file("tailwind.config.js", generateTailwindConfig())
    zip.file("postcss.config.js", generatePostcssConfig())
    zip.file(".gitignore", generateGitignore())

    // Add app directory structure
    const appDir = zip.folder("app")
    if (!appDir) throw new Error("Failed to create app directory")
    appDir.file("globals.css", generateGlobalCss())
    appDir.file("layout.tsx", generateRootLayout())
    appDir.file("page.tsx", generateMainPage(templateType))

    // Add components directory
    const componentsDir = zip.folder("components")
    if (!componentsDir) throw new Error("Failed to create components directory")
    componentsDir.file("theme-provider.tsx", generateThemeProvider())
    componentsDir.file("theme-toggle.tsx", generateThemeToggle())

    // Add user data file
    const dataDir = zip.folder("data")
    if (!dataDir) throw new Error("Failed to create data directory")
    dataDir.file("user-data.ts", generateUserDataFile(userData, templateType))

    // Add public directory for images
    const publicDir = zip.folder("public")
    if (!publicDir) throw new Error("Failed to create public directory")
    const imagesDir = publicDir.folder("images")
    if (!imagesDir) throw new Error("Failed to create images directory")

    // Save avatar image if it exists and is a data URL
    const avatarData = (userData as any).avatar
    if (avatarData && avatarData.startsWith("data:image")) {
      try {
        const base64Data = avatarData.split(",")[1]
        const avatarBuffer = Buffer.from(base64Data, "base64")
        imagesDir.file("avatar.jpg", avatarBuffer, { binary: true })

        // Update avatar path in userData
        ;(userData as any).avatar = "/images/avatar.jpg"
      } catch (error) {
        console.error("Error saving avatar image:", error)
      }
    }

    // Save project images if they exist and are data URLs
    if ((userData as any).projects && Array.isArray((userData as any).projects)) {
      ;(userData as any).projects = (userData as any).projects.map((project: any, index: number) => {
        if (project.imageUrl && project.imageUrl.startsWith("data:image")) {
          try {
            const base64Data = project.imageUrl.split(",")[1]
            const imageBuffer = Buffer.from(base64Data, "base64")
            const fileName = `project-${index}.jpg`
            imagesDir.file(fileName, imageBuffer, { binary: true })

            // Update image path in project
            return {
              ...project,
              imageUrl: `/images/${fileName}`,
            }
          } catch (error) {
            console.error(`Error saving project image ${index}:`, error)
          }
        }
        return project
      })
    }

    // Add the selected template components
    switch (templateType) {
      case "minimalist":
        generateMinimalTemplate(zip, userData)
        break
      case "business":
        generateBusinessTemplate(zip, userData)
        break
      case "creative":
        generateCreativeTemplate(zip, userData)
        break
      case "fun":
        generateFunTemplate(zip, userData)
        break
      default:
        generateMinimalTemplate(zip, userData)
    }

    // Generate the zip file
    const zipBlob = await zip.generateAsync({
      type: "arraybuffer",
      compression: "DEFLATE",
      compressionOptions: {
        level: 9,
      },
    })

    // Set response headers for download
    const headers = {
      "Content-Disposition": `attachment; filename="next-personal-website-${templateType}-${Date.now()}.zip"`,
      "Content-Type": "application/zip",
      "Cache-Control": "no-cache, no-store, must-revalidate",
      Pragma: "no-cache",
      Expires: "0",
    }

    return new NextResponse(zipBlob, { headers })
  } catch (error) {
    console.error("Download generation error:", error)
    return NextResponse.json(
      { success: false, error: "Failed to generate download. Please try again." },
      { status: 500 },
    )
  }
}
