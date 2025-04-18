"use client"

import { useState } from "react"
import type { UserData, TemplateType } from "@/types"
import MinimalTemplate from "@/components/previews/MinimalTemplate"
import BusinessTemplate from "@/components/previews/BusinessTemplate"
import CreativeTemplate from "@/components/previews/CreativeTemplate"
import FunTemplate from "@/components/previews/FunTemplate"
import { Maximize2, Minimize2 } from "lucide-react"

interface TemplatePreviewProps {
  userData: UserData
  templateType: TemplateType
}

export default function TemplatePreview({ userData, templateType }: TemplatePreviewProps) {
  const [isFullscreen, setIsFullscreen] = useState(false)

  const toggleFullscreen = () => {
    setIsFullscreen(!isFullscreen)
  }

  const renderTemplate = () => {
    switch (templateType) {
      case "minimal":  // 注意这里的命名
        return <MinimalTemplate userData={userData} />
      case "creative":
        return <CreativeTemplate userData={userData} />
      case "fun":
        return <FunTemplate userData={userData} />
      default:
        return <MinimalTemplate userData={userData} />
    }
  }

  return (
    <div className="space-y-4">
      <div className="flex justify-between items-center">
        <h2 className="text-xl font-semibold text-foreground">预览您的个人主页</h2>
        <button
          type="button"
          onClick={toggleFullscreen}
          className="flex items-center text-sm text-primary hover:text-primary/90"
        >
          {isFullscreen ? (
            <>
              <Minimize2 className="w-4 h-4 mr-1" /> 退出全屏
            </>
          ) : (
            <>
              <Maximize2 className="w-4 h-4 mr-1" /> 全屏预览
            </>
          )}
        </button>
      </div>

      <div
        className={`
          border border-border rounded-lg overflow-hidden bg-card
          ${isFullscreen ? "fixed inset-0 z-50 p-4 overflow-auto" : "relative"}
        `}
      >
        {isFullscreen && (
          <div className="sticky top-0 right-0 flex justify-end p-2 z-10">
            <button
              type="button"
              onClick={toggleFullscreen}
              className="bg-card rounded-full p-2 shadow-md hover:bg-accent"
            >
              <Minimize2 className="w-5 h-5 text-foreground" />
            </button>
          </div>
        )}

        <div className={`${isFullscreen ? "" : "h-[600px] overflow-auto"}`}>{renderTemplate()}</div>
      </div>

      <p className="text-sm text-muted-foreground italic">注意：这是预览效果，实际生成的页面可能会有细微差别</p>
    </div>
  )
}
