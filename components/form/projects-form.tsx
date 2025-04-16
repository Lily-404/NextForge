"use client"

import type React from "react"

import type { Project } from "@/types/user-data"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { PlusCircle, Trash2, Upload, X } from "lucide-react"
import { useState, useRef } from "react"
import Image from "next/image"

interface ProjectsFormProps {
  projects: Project[]
  onChange: (projects: Project[]) => void
}

export function ProjectsForm({ projects, onChange }: ProjectsFormProps) {
  const fileInputRefs = useRef<(HTMLInputElement | null)[]>([])
  const [isUploading, setIsUploading] = useState<number | null>(null)

  const handleProjectChange = (index: number, field: keyof Project, value: string) => {
    const updatedProjects = [...projects]
    updatedProjects[index] = { ...updatedProjects[index], [field]: value }
    onChange(updatedProjects)
  }

  const addProject = () => {
    onChange([...projects, { title: "", description: "", imageUrl: "", link: "" }])
  }

  const removeProject = (index: number) => {
    const updatedProjects = [...projects]
    updatedProjects.splice(index, 1)
    onChange(updatedProjects.length ? updatedProjects : [{ title: "", description: "", imageUrl: "", link: "" }])
  }

  const handleFileChange = async (e: React.ChangeEvent<HTMLInputElement>, index: number) => {
    const file = e.target.files?.[0]
    if (!file) return

    // 创建本地预览
    const reader = new FileReader()
    reader.onload = () => {
      const result = reader.result as string
      handleProjectChange(index, "imageUrl", result)
    }
    reader.readAsDataURL(file)

    // 模拟上传过程
    setIsUploading(index)
    try {
      // 在实际应用中，这里会上传文件到服务器
      await new Promise((resolve) => setTimeout(resolve, 1000))
    } catch (error) {
      console.error("上传图片失败:", error)
    } finally {
      setIsUploading(null)
    }
  }

  const triggerFileInput = (index: number) => {
    fileInputRefs.current[index]?.click()
  }

  const removeImage = (index: number) => {
    handleProjectChange(index, "imageUrl", "")
    if (fileInputRefs.current[index]) {
      fileInputRefs.current[index]!.value = ""
    }
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h3 className="text-lg font-medium">项目作品</h3>
          <p className="text-sm text-muted-foreground">添加您想要展示的项目或作品</p>
        </div>
        <Button type="button" variant="outline" size="sm" onClick={addProject}>
          <PlusCircle className="mr-2 h-4 w-4" />
          添加项目
        </Button>
      </div>

      <div className="space-y-4">
        {projects.map((project, index) => (
          <Card key={index}>
            <CardHeader className="pb-2">
              <div className="flex items-center justify-between">
                <CardTitle className="text-base">项目 {index + 1}</CardTitle>
                <Button
                  type="button"
                  variant="ghost"
                  size="icon"
                  onClick={() => removeProject(index)}
                  disabled={projects.length === 1 && !projects[0].title}
                >
                  <Trash2 className="h-4 w-4 text-muted-foreground hover:text-destructive" />
                </Button>
              </div>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor={`project-${index}-title`}>项目名称</Label>
                <Input
                  id={`project-${index}-title`}
                  value={project.title}
                  onChange={(e) => handleProjectChange(index, "title", e.target.value)}
                  placeholder="项目名称"
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor={`project-${index}-description`}>项目描述</Label>
                <Textarea
                  id={`project-${index}-description`}
                  value={project.description}
                  onChange={(e) => handleProjectChange(index, "description", e.target.value)}
                  placeholder="简要描述项目内容和特点..."
                  rows={3}
                />
              </div>

              <div className="space-y-2">
                <Label>项目图片</Label>
                <div className="mt-2">
                  {project.imageUrl ? (
                    <div className="relative w-full aspect-video rounded-md overflow-hidden border border-border">
                      <Image
                        src={project.imageUrl || "/placeholder.svg"}
                        alt={project.title || "项目图片"}
                        fill
                        className="object-cover"
                      />
                      <Button
                        type="button"
                        variant="destructive"
                        size="icon"
                        className="absolute top-2 right-2 h-8 w-8 rounded-full"
                        onClick={() => removeImage(index)}
                      >
                        <X className="h-4 w-4" />
                      </Button>
                      {isUploading === index && (
                        <div className="absolute inset-0 bg-background/80 flex items-center justify-center">
                          <div className="h-8 w-8 animate-spin rounded-full border-2 border-current border-t-transparent text-primary" />
                        </div>
                      )}
                    </div>
                  ) : (
                    <div
                      onClick={() => triggerFileInput(index)}
                      className="w-full aspect-video rounded-md border border-dashed border-border bg-muted flex flex-col items-center justify-center cursor-pointer hover:bg-muted/80 transition-colors"
                    >
                      <Upload className="h-8 w-8 text-muted-foreground mb-2" />
                      <p className="text-sm text-muted-foreground">点击上传项目图片</p>
                      {isUploading === index && (
                        <div className="mt-2 h-5 w-5 animate-spin rounded-full border-2 border-current border-t-transparent text-primary" />
                      )}
                    </div>
                  )}
                  <input
                    type="file"
                    accept="image/*"
                    className="hidden"
                    onChange={(e) => handleFileChange(e, index)}
                    ref={(el) => (fileInputRefs.current[index] = el)}
                  />
                  {project.imageUrl && (
                    <Button
                      type="button"
                      variant="outline"
                      size="sm"
                      className="mt-2"
                      onClick={() => triggerFileInput(index)}
                    >
                      更换图片
                    </Button>
                  )}
                </div>
              </div>

              <div className="space-y-2">
                <Label htmlFor={`project-${index}-link`}>项目链接</Label>
                <Input
                  id={`project-${index}-link`}
                  value={project.link}
                  onChange={(e) => handleProjectChange(index, "link", e.target.value)}
                  placeholder="https://example.com/project"
                />
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  )
}
