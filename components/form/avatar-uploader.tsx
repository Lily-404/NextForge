"use client"

import type React from "react"

import { useState, useRef } from "react"
import { Button } from "@/components/ui/button"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { UploadCloud, X } from "lucide-react"

interface AvatarUploaderProps {
  currentAvatar: string
  onAvatarChange: (url: string) => void
}

export function AvatarUploader({ currentAvatar, onAvatarChange }: AvatarUploaderProps) {
  const [previewUrl, setPreviewUrl] = useState<string>(currentAvatar)
  const [isUploading, setIsUploading] = useState(false)
  const fileInputRef = useRef<HTMLInputElement>(null)

  const handleFileChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0]
    if (!file) return

    setIsUploading(true)
    try {
      // 创建本地预览
      const result = await new Promise<string>((resolve, reject) => {
        const reader = new FileReader()
        reader.onload = () => resolve(reader.result as string)
        reader.onerror = reject
        reader.readAsDataURL(file)
      })

      // 更新预览和父组件
      setPreviewUrl(result)
      onAvatarChange(result)

      // 模拟上传过程
      await new Promise((resolve) => setTimeout(resolve, 1000))
    } catch (error) {
      console.error("上传头像失败:", error)
    } finally {
      setIsUploading(false)
    }
  }

  const handleRemoveAvatar = () => {
    setPreviewUrl("")
    onAvatarChange("")
    if (fileInputRef.current) {
      fileInputRef.current.value = ""
    }
  }

  return (
    <div className="flex flex-col items-center space-y-4">
      <div className="relative">
        <Avatar className="h-32 w-32">
          <AvatarImage src={previewUrl || "/placeholder.svg"} alt="头像" />
          <AvatarFallback className="bg-muted">
            {previewUrl ? (
              <div className="animate-pulse bg-muted h-full w-full" />
            ) : (
              <UploadCloud className="h-10 w-10 text-muted-foreground" />
            )}
          </AvatarFallback>
        </Avatar>

        {previewUrl && (
          <Button
            type="button"
            size="icon"
            variant="destructive"
            className="absolute -top-2 -right-2 h-6 w-6 rounded-full"
            onClick={handleRemoveAvatar}
          >
            <X className="h-3 w-3" />
          </Button>
        )}

        {isUploading && (
          <div className="absolute inset-0 flex items-center justify-center bg-background/80 rounded-full">
            <div className="h-8 w-8 animate-spin rounded-full border-2 border-current border-t-transparent text-primary" />
          </div>
        )}
      </div>

      <div className="flex flex-col items-center">
        <input ref={fileInputRef} type="file" accept="image/*" onChange={handleFileChange} className="hidden" />
        <Button
          type="button"
          variant="outline"
          size="sm"
          onClick={() => fileInputRef.current?.click()}
          disabled={isUploading}
        >
          {previewUrl ? "更换头像" : "上传头像"}
        </Button>
        <p className="text-xs text-muted-foreground mt-2">推荐使用正方形图片</p>
      </div>
    </div>
  )
}
