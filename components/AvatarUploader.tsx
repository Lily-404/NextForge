"use client"

import type React from "react"

import { useState, useRef } from "react"
import Image from "next/image"
import { Upload, X } from "lucide-react"

interface AvatarUploaderProps {
  currentAvatar: string
  onAvatarChange: (url: string) => void
}

export default function AvatarUploader({ currentAvatar, onAvatarChange }: AvatarUploaderProps) {
  const [previewUrl, setPreviewUrl] = useState<string>(currentAvatar)
  const [isUploading, setIsUploading] = useState<boolean>(false)
  const fileInputRef = useRef<HTMLInputElement>(null)

  const handleFileChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0]
    if (!file) return

    // 创建本地预览
    const reader = new FileReader()
    reader.onload = () => {
      setPreviewUrl(reader.result as string)
    }
    reader.readAsDataURL(file)

    // 模拟上传到服务器
    setIsUploading(true)
    try {
      // 在实际应用中，这里应该是上传文件到服务器的代码
      // 这里我们模拟一个上传过程
      await new Promise((resolve) => setTimeout(resolve, 1000))

      // 假设服务器返回了URL
      const uploadedUrl = previewUrl // 在实际应用中，这应该是服务器返回的URL
      onAvatarChange(uploadedUrl)
    } catch (error) {
      console.error("上传头像失败:", error)
      alert("上传头像失败，请重试")
    } finally {
      setIsUploading(false)
    }
  }

  const triggerFileInput = () => {
    fileInputRef.current?.click()
  }

  const removeAvatar = () => {
    setPreviewUrl("")
    onAvatarChange("")
    if (fileInputRef.current) {
      fileInputRef.current.value = ""
    }
  }

  return (
    <div className="flex flex-col items-center">
      <label className="block text-sm font-medium text-foreground mb-2">头像</label>
      <div className="relative">
        <div
          className={`w-32 h-32 rounded-full overflow-hidden border-2 ${
            previewUrl ? "border-border" : "border-dashed border-border"
          } flex items-center justify-center bg-muted`}
        >
          {previewUrl ? (
            <Image
              src={previewUrl || "/placeholder.svg"}
              alt="Avatar preview"
              width={128}
              height={128}
              className="object-cover w-full h-full"
              unoptimized
            />
          ) : (
            <div className="text-muted-foreground flex flex-col items-center justify-center">
              <Upload className="w-8 h-8 mb-1" />
              <span className="text-xs">上传头像</span>
            </div>
          )}

          {isUploading && (
            <div className="absolute inset-0 bg-black bg-opacity-50 flex items-center justify-center rounded-full">
              <div className="animate-spin rounded-full h-8 w-8 border-t-2 border-b-2 border-white"></div>
            </div>
          )}
        </div>

        {previewUrl && (
          <button
            type="button"
            onClick={removeAvatar}
            className="absolute -top-1 -right-1 bg-destructive text-destructive-foreground rounded-full p-1 shadow-sm hover:bg-destructive/90"
          >
            <X className="w-4 h-4" />
          </button>
        )}
      </div>

      <input ref={fileInputRef} type="file" accept="image/*" onChange={handleFileChange} className="hidden" />

      <button
        type="button"
        onClick={triggerFileInput}
        disabled={isUploading}
        className="mt-3 text-sm text-primary hover:text-primary/90"
      >
        {previewUrl ? "更换头像" : "上传头像"}
      </button>
    </div>
  )
}
