"use client"

import type React from "react"
import { useState, useRef } from "react"
import { Button } from "@/components/ui/button"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Card, CardContent } from "@/components/ui/card"
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip"
import { UploadCloud, X, User, Image as ImageIcon, CheckCircle2 } from "lucide-react"
import { toast } from "sonner"
import { motion, AnimatePresence } from "framer-motion"

interface AvatarUploaderProps {
  currentAvatar: string
  onAvatarChange: (url: string) => void
}

export function AvatarUploader({ currentAvatar, onAvatarChange }: AvatarUploaderProps) {
  const [previewUrl, setPreviewUrl] = useState<string>(currentAvatar)
  const [isUploading, setIsUploading] = useState(false)
  const [isDragging, setIsDragging] = useState(false)
  const fileInputRef = useRef<HTMLInputElement>(null)

  const handleFileChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0]
    if (!file) return

    // 检查文件大小
    if (file.size > 2 * 1024 * 1024) {
      toast.error("图片大小不能超过 2MB")
      return
    }

    // 检查文件类型
    if (!file.type.startsWith("image/")) {
      toast.error("请上传图片文件")
      return
    }

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
      toast.success("头像上传成功")

      // 模拟上传过程
      await new Promise((resolve) => setTimeout(resolve, 1000))
    } catch (error) {
      console.error("上传头像失败:", error)
      toast.error("上传失败，请重试")
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
    toast.success("头像已移除")
  }

  const handleDragOver = (e: React.DragEvent) => {
    e.preventDefault()
    setIsDragging(true)
  }

  const handleDragLeave = (e: React.DragEvent) => {
    e.preventDefault()
    setIsDragging(false)
  }

  const handleDrop = async (e: React.DragEvent) => {
    e.preventDefault()
    setIsDragging(false)
    
    const file = e.dataTransfer.files?.[0]
    if (!file) return

    if (file.size > 2 * 1024 * 1024) {
      toast.error("图片大小不能超过 2MB")
      return
    }

    if (!file.type.startsWith("image/")) {
      toast.error("请上传图片文件")
      return
    }

    setIsUploading(true)
    try {
      const result = await new Promise<string>((resolve, reject) => {
        const reader = new FileReader()
        reader.onload = () => resolve(reader.result as string)
        reader.onerror = reject
        reader.readAsDataURL(file)
      })

      setPreviewUrl(result)
      onAvatarChange(result)
      toast.success("头像上传成功")

      await new Promise((resolve) => setTimeout(resolve, 1000))
    } catch (error) {
      console.error("上传头像失败:", error)
      toast.error("上传失败，请重试")
    } finally {
      setIsUploading(false)
    }
  }

  return (
    <Card className="w-full max-w-sm mx-auto border-neutral-200/50 dark:border-neutral-800/50 bg-white/50 dark:bg-neutral-900/50 backdrop-blur-sm">
      <CardContent className="p-6">
        <div className="flex flex-col items-center space-y-6">
          <motion.div 
            className="relative group"
            whileHover={{ scale: 1.02 }}
            transition={{ type: "spring", stiffness: 400, damping: 10 }}
          >
            <div 
              className={`h-32 w-32 rounded-full border-2 transition-all duration-300 ${
                isDragging 
                  ? "border-blue-500 dark:border-blue-400 bg-blue-50/50 dark:bg-blue-900/20" 
                  : "border-neutral-200/50 dark:border-neutral-800/50 bg-white dark:bg-neutral-900"
              } overflow-hidden`}
              onDragOver={handleDragOver}
              onDragLeave={handleDragLeave}
              onDrop={handleDrop}
            >
              <AnimatePresence mode="wait">
                {previewUrl ? (
                  <motion.div
                    initial={{ opacity: 0, scale: 0.8 }}
                    animate={{ opacity: 1, scale: 1 }}
                    exit={{ opacity: 0, scale: 0.8 }}
                    transition={{ duration: 0.2 }}
                  >
                    <Avatar className="h-full w-full">
                      <AvatarImage src={previewUrl} alt="头像" />
                    </Avatar>
                  </motion.div>
                ) : (
                  <motion.div 
                    className="h-full w-full flex flex-col items-center justify-center"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                  >
                    <div className="w-14 h-14 rounded-full bg-neutral-50 dark:bg-neutral-800/50 flex items-center justify-center mb-2">
                      <User className="h-7 w-7 text-neutral-300 dark:text-neutral-600" />
                    </div>
                    <span className="text-xs text-neutral-400 dark:text-neutral-500">
                      {isDragging ? "松开上传" : "点击或拖拽上传"}
                    </span>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>

            {previewUrl && (
              <TooltipProvider>
                <Tooltip>
                  <TooltipTrigger asChild>
                    <motion.div
                      initial={{ opacity: 0, scale: 0.8 }}
                      animate={{ opacity: 1, scale: 1 }}
                      whileHover={{ scale: 1.1 }}
                      transition={{ type: "spring", stiffness: 400, damping: 10 }}
                    >
                      <Button
                        type="button"
                        size="icon"
                        variant="ghost"
                        className="absolute -top-2 -right-2 h-6 w-6 rounded-full bg-white dark:bg-neutral-900 border border-neutral-200/50 dark:border-neutral-800/50 hover:bg-neutral-50 dark:hover:bg-neutral-800/50 transition-colors"
                        onClick={handleRemoveAvatar}
                      >
                        <X className="h-3 w-3 text-neutral-400 dark:text-neutral-500" />
                      </Button>
                    </motion.div>
                  </TooltipTrigger>
                  <TooltipContent>
                    <p>移除头像</p>
                  </TooltipContent>
                </Tooltip>
              </TooltipProvider>
            )}

            {isUploading && (
              <motion.div 
                className="absolute inset-0 flex items-center justify-center bg-white/90 dark:bg-neutral-900/90 rounded-full backdrop-blur-sm"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
              >
                <div className="h-5 w-5 animate-spin rounded-full border-2 border-neutral-200 border-t-neutral-400 dark:border-neutral-700 dark:border-t-neutral-300" />
              </motion.div>
            )}
          </motion.div>

          <div className="flex flex-col items-center space-y-3">
            <input ref={fileInputRef} type="file" accept="image/*" onChange={handleFileChange} className="hidden" />
            <motion.div
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
            >
              <Button
                type="button"
                variant="outline"
                size="sm"
                onClick={() => fileInputRef.current?.click()}
                disabled={isUploading}
                className="border-neutral-200 dark:border-neutral-800 text-neutral-700 dark:text-neutral-300 hover:bg-neutral-50 dark:hover:bg-neutral-800/50 hover:text-neutral-900 dark:hover:text-neutral-100 transition-colors"
              >
                <ImageIcon className="h-4 w-4 mr-2" />
                {previewUrl ? "更换头像" : "上传头像"}
              </Button>
            </motion.div>
            <p className="text-xs text-neutral-400 dark:text-neutral-500">推荐使用正方形图片，大小不超过 2MB</p>
          </div>
        </div>
      </CardContent>
    </Card>
  )
}
