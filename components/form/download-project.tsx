"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardFooter } from "@/components/ui/card"
import { Download, CheckCircle, AlertCircle, RotateCcw } from "lucide-react"
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert"
import type { TemplateType } from "@/types/user-data"

interface DownloadProjectProps {
  downloadUrl: string
  templateType: TemplateType
  onRestart: () => void
}

export function DownloadProject({ downloadUrl, templateType, onRestart }: DownloadProjectProps) {
  const [downloadStatus, setDownloadStatus] = useState<"idle" | "success" | "error">("idle")

  const handleDownload = async () => {
    try {
      // Validate the download URL
      if (!downloadUrl) {
        setDownloadStatus("error")
        return
      }

      // Fetch the file first to check for errors
      const response = await fetch(downloadUrl)
      if (!response.ok) {
        const errorText = await response.text()
        throw new Error(errorText || 'Download failed')
      }

      // Get the file blob
      const blob = await response.blob()

      // Create download link
      const url = window.URL.createObjectURL(blob)
      const link = document.createElement("a")
      link.href = url
      link.download = `next-personal-website-${templateType}-${Date.now()}.zip`
      document.body.appendChild(link)
      link.click()
      document.body.removeChild(link)
      window.URL.revokeObjectURL(url)

      // Set success status
      setDownloadStatus("success")
    } catch (error) {
      console.error("Download error:", error)
      setDownloadStatus("error")
      // Show error message to user
      const errorAlert = document.querySelector('[role="alert"]')
      const errorDescription = errorAlert?.querySelector('.alert-description')
      if (errorDescription instanceof HTMLElement) {
        errorDescription.textContent = error instanceof Error ? error.message : '下载失败，请重试'
      }
    }
  }

  return (
    <div className="space-y-6">
      <h2 className="text-2xl font-bold">您的项目已准备就绪！</h2>

      <Card>
        <CardContent className="pt-6">
          <div className="space-y-4">
            <h3 className="text-lg font-medium">项目详情</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="bg-muted p-4 rounded-md">
                <p className="font-medium">模板类型</p>
                <p className="text-muted-foreground capitalize">{templateType}</p>
              </div>
              <div className="bg-muted p-4 rounded-md">
                <p className="font-medium">框架</p>
                <p className="text-muted-foreground">Next.js 14</p>
              </div>
              <div className="bg-muted p-4 rounded-md">
                <p className="font-medium">样式</p>
                <p className="text-muted-foreground">Tailwind CSS</p>
              </div>
              <div className="bg-muted p-4 rounded-md">
                <p className="font-medium">暗黑模式</p>
                <p className="text-muted-foreground">支持</p>
              </div>
            </div>

            {downloadStatus === "success" && (
              <Alert className="bg-green-50 dark:bg-green-950 border-green-200 dark:border-green-900">
                <CheckCircle className="h-4 w-4 text-green-600 dark:text-green-400" />
                <AlertTitle>下载成功</AlertTitle>
                <AlertDescription>
                  您的Next.js项目已成功下载。请解压文件，然后按照以下步骤操作：
                  <ol className="list-decimal list-inside mt-2 space-y-1">
                    <li>解压ZIP文件</li>
                    <li>打开终端并进入项目目录</li>
                    <li>
                      运行 <code className="bg-muted px-1 py-0.5 rounded">npm install</code> 安装依赖
                    </li>
                    <li>
                      运行 <code className="bg-muted px-1 py-0.5 rounded">npm run dev</code> 启动开发服务器
                    </li>
                    <li>
                      在浏览器中打开 <code className="bg-muted px-1 py-0.5 rounded">http://localhost:3000</code>
                    </li>
                  </ol>
                </AlertDescription>
              </Alert>
            )}

            {downloadStatus === "error" && (
              <Alert variant="destructive">
                <AlertCircle className="h-4 w-4" />
                <AlertTitle>下载失败</AlertTitle>
                <AlertDescription>下载项目时出现错误。请重试，或者联系支持团队获取帮助。</AlertDescription>
              </Alert>
            )}
          </div>
        </CardContent>
        <CardFooter className="flex flex-col space-y-4">
          <div className="flex flex-col sm:flex-row w-full gap-4">
            <Button className="flex-1" onClick={handleDownload}>
              <Download className="mr-2 h-4 w-4" />
              下载Next.js项目 (.zip)
            </Button>
            <Button variant="outline" onClick={onRestart}>
              <RotateCcw className="mr-2 h-4 w-4" />
              重新生成
            </Button>
          </div>
          <p className="text-xs text-muted-foreground text-center">
            下载的项目包含完整的Next.js框架文件，并根据您选择的{" "}
            <span className="font-medium capitalize">{templateType}</span> 模板和您提供的个人信息生成。
          </p>
        </CardFooter>
      </Card>
    </div>
  )
}
