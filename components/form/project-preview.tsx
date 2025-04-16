"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { MinimalistPreview } from "@/components/previews/minimalist-preview"
import { BusinessPreview } from "@/components/previews/business-preview"
import { CreativePreview } from "@/components/previews/creative-preview"
import { FunPreview } from "@/components/previews/fun-preview"
import { Loader2 } from "lucide-react"
import type { UserData, TemplateType } from "@/types/user-data"

interface ProjectPreviewProps {
  userData: UserData
  templateType: TemplateType
  onGenerate: () => Promise<void>
  onPrev: () => void
  isGenerating: boolean
}

// 修复移动端响应式问题
export function ProjectPreview({ userData, templateType, onGenerate, onPrev, isGenerating }: ProjectPreviewProps) {
  const [previewMode, setPreviewMode] = useState<"desktop" | "mobile">("desktop")

  // Render the selected template preview
  const renderTemplatePreview = () => {
    switch (templateType) {
      case "minimalist":
        return <MinimalistPreview userData={userData} />
      case "business":
        return <BusinessPreview userData={userData} />
      case "creative":
        return <CreativePreview userData={userData} />
      case "fun":
        return <FunPreview userData={userData} />
      default:
        return <MinimalistPreview userData={userData} />
    }
  }

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h2 className="text-2xl font-bold">预览您的个人网站</h2>
        <div className="flex space-x-2">
          <Button
            variant={previewMode === "desktop" ? "default" : "outline"}
            size="sm"
            onClick={() => setPreviewMode("desktop")}
          >
            桌面版
          </Button>
          <Button
            variant={previewMode === "mobile" ? "default" : "outline"}
            size="sm"
            onClick={() => setPreviewMode("mobile")}
          >
            移动版
          </Button>
        </div>
      </div>

      <Card className="border-2 overflow-hidden">
        <CardContent className="p-0">
          <div
            className={`bg-background transition-all duration-300 ${
              previewMode === "mobile"
                ? "max-w-[375px] mx-auto h-[600px] overflow-y-auto"
                : "w-full h-[600px] overflow-y-auto"
            }`}
            style={{ wordWrap: "break-word", overflowWrap: "break-word" }}
          >
            {renderTemplatePreview()}
          </div>
        </CardContent>
      </Card>

      <div className="flex justify-between">
        <Button variant="outline" onClick={onPrev}>
          上一步
        </Button>
        <Button onClick={onGenerate} disabled={isGenerating}>
          {isGenerating ? (
            <>
              <Loader2 className="mr-2 h-4 w-4 animate-spin" />
              生成中...
            </>
          ) : (
            "生成项目"
          )}
        </Button>
      </div>
    </div>
  )
}
