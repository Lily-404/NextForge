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
    <div>
      <div className="mb-8">
        <h2 className="text-xl font-medium text-neutral-950 dark:text-white">预览您的个人网站</h2>
        <p className="mt-1.5 text-sm text-neutral-600 dark:text-neutral-400">在生成项目之前，您可以预览您的个人网站效果</p>
      </div>

      <div className="flex items-center justify-end space-x-2 mb-4">
        <Button
          variant={previewMode === "desktop" ? "default" : "outline"}
          size="sm"
          onClick={() => setPreviewMode("desktop")}
          className={`h-8 px-3 rounded-lg text-sm font-medium ${previewMode === "desktop" ? "bg-neutral-950 text-white hover:bg-neutral-800 dark:bg-white dark:text-neutral-950 dark:hover:bg-neutral-100" : "border border-neutral-200 hover:bg-neutral-100 dark:border-neutral-800 dark:hover:bg-neutral-800"}`}
        >
          桌面版
        </Button>
        <Button
          variant={previewMode === "mobile" ? "default" : "outline"}
          size="sm"
          onClick={() => setPreviewMode("mobile")}
          className={`h-8 px-3 rounded-lg text-sm font-medium ${previewMode === "mobile" ? "bg-neutral-950 text-white hover:bg-neutral-800 dark:bg-white dark:text-neutral-950 dark:hover:bg-neutral-100" : "border border-neutral-200 hover:bg-neutral-100 dark:border-neutral-800 dark:hover:bg-neutral-800"}`}
        >
          移动版
        </Button>
      </div>

      <div className="relative rounded-xl border border-neutral-200 dark:border-neutral-800 bg-neutral-100/50 dark:bg-neutral-900/50 overflow-hidden">
        <div className="absolute inset-0 bg-grid-neutral-950/[0.02] dark:bg-grid-neutral-50/[0.02]" />
        <div className="relative">
          <div
            className={`bg-background transition-all duration-300 ${
              previewMode === "mobile"
                ? "max-w-[375px] mx-auto h-[600px] overflow-y-auto shadow-xl"
                : "w-full h-[600px] overflow-y-auto"
            }`}
            style={{ wordWrap: "break-word", overflowWrap: "break-word" }}
          >
            {renderTemplatePreview()}
          </div>
        </div>
      </div>

      <div className="flex items-center justify-between mt-8 pt-8 border-t border-neutral-200 dark:border-neutral-800">
        <Button 
          variant="outline" 
          onClick={onPrev}
          className="h-9 px-4 rounded-lg border border-neutral-200 hover:bg-neutral-100 dark:border-neutral-800 dark:hover:bg-neutral-800"
        >
          上一步
        </Button>
        <Button 
          onClick={onGenerate} 
          disabled={isGenerating}
          className="h-9 px-4 rounded-lg bg-neutral-950 text-white hover:bg-neutral-800 dark:bg-white dark:text-neutral-950 dark:hover:bg-neutral-100 disabled:opacity-50 disabled:cursor-not-allowed"
        >
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
