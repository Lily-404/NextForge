"use client"

import { useState } from "react"
import { UserInfoForm } from "@/components/form/user-info-form"
import { TemplateSelector } from "@/components/form/template-selector"
import { ProjectPreview } from "@/components/form/project-preview"
import { DownloadProject } from "@/components/form/download-project"
import { Steps } from "@/components/form/steps"
import { Card, CardContent } from "@/components/ui/card"
import type { UserData, TemplateType } from "@/types/user-data"
import { toast } from "@/hooks/use-toast"

const initialUserData: UserData = {
  name: "",
  wechat: "",
  email: "",
  phone: "",
  bio: "",
  location: "",
  profession: "",
  avatar: "",
  projects: [],
  socialLinks: {
    wechat: "",
    weibo: "",
    github: "",
    jike: "",
    xiaohongshu: "",
    douyin: "",
    bilibili: ""
  }
}

export default function FormContainer() {
  const [currentStep, setCurrentStep] = useState(1)
  const [userData, setUserData] = useState<UserData>(initialUserData)
  const [selectedTemplate, setSelectedTemplate] = useState<TemplateType>("minimalist")
  const [isGenerating, setIsGenerating] = useState(false)
  const [downloadUrl, setDownloadUrl] = useState("")

  const handleUserDataChange = (data: Partial<UserData>) => {
    setUserData((prev) => ({ ...prev, ...data }))
  }

  const handleTemplateChange = (template: TemplateType) => {
    setSelectedTemplate(template)
  }

  const handleNextStep = () => {
    setCurrentStep((prev) => Math.min(prev + 1, 4))
  }

  const handlePrevStep = () => {
    setCurrentStep((prev) => Math.max(prev - 1, 1))
  }

  const handleRestart = () => {
    setCurrentStep(1)
    setUserData(initialUserData)
    setSelectedTemplate("minimalist")
    setIsGenerating(false)
    setDownloadUrl("")
  }

  const handleGenerateProject = async () => {
    setIsGenerating(true)

    try {
      // Call the API to generate the project
      const response = await fetch("/api/generate-template", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          userData,
          templateType: selectedTemplate,
        }),
      })

      const data = await response.json()

      if (!response.ok) {
        throw new Error(data.error || "Failed to generate project")
      }

      if (data.success && data.downloadUrl) {
        setDownloadUrl(data.downloadUrl)
        handleNextStep()
      } else {
        throw new Error("Invalid response from server")
      }
    } catch (error) {
      console.error("Generate project error:", error)
      toast({
        title: "生成项目失败",
        description: error instanceof Error ? error.message : "请重试或联系支持团队",
        variant: "destructive",
      })
    } finally {
      setIsGenerating(false)
    }
  }

  return (
    <div className="space-y-8">
      <Steps currentStep={currentStep} />

      <Card>
        <CardContent className="pt-6">
          {currentStep === 1 && (
            <UserInfoForm userData={userData} onChange={handleUserDataChange} onNext={handleNextStep} />
          )}

          {currentStep === 2 && (
            <TemplateSelector
              selectedTemplate={selectedTemplate}
              onTemplateChange={handleTemplateChange}
              onNext={handleNextStep}
              onPrev={handlePrevStep}
            />
          )}

          {currentStep === 3 && (
            <ProjectPreview
              userData={userData}
              templateType={selectedTemplate}
              onGenerate={handleGenerateProject}
              onPrev={handlePrevStep}
              isGenerating={isGenerating}
            />
          )}

          {currentStep === 4 && (
            <DownloadProject 
              downloadUrl={downloadUrl} 
              templateType={selectedTemplate} 
              onRestart={handleRestart}
            />
          )}
        </CardContent>
      </Card>
    </div>
  )
}
