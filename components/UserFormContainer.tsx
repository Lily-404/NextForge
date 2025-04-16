"use client"

import { useState } from "react"
import UserInfoForm from "@/components/UserInfoForm"
import TemplateSelector from "@/components/TemplateSelector"
import TemplatePreview from "@/components/TemplatePreview"
import SubmitSection from "@/components/SubmitSection"
import type { UserData, TemplateType } from "@/types"

// 更新初始用户数据，添加新的社交媒体字段
const initialUserData: UserData = {
  name: "",
  wechat: "",
  phone: "",
  email: "",
  bio: "",
  profession: "",
  location: "",
  avatar: "",
  projects: [{ title: "", description: "", imageUrl: "", link: "" }],
  socialLinks: {
    wechat: "",
    weibo: "",
    github: "",
    jike: "",
    xiaohongshu: "",
    douyin: "",
    bilibili: "",
  },
}

export default function UserFormContainer() {
  const [userData, setUserData] = useState<UserData>(initialUserData)
  const [selectedTemplate, setSelectedTemplate] = useState<TemplateType>("minimal")
  const [currentStep, setCurrentStep] = useState<number>(1)
  const [isSubmitting, setIsSubmitting] = useState<boolean>(false)
  const [downloadUrl, setDownloadUrl] = useState<string>("")

  const handleUserDataChange = (newData: Partial<UserData>) => {
    setUserData((prev) => ({ ...prev, ...newData }))
  }

  const handleTemplateChange = (template: TemplateType) => {
    setSelectedTemplate(template)
  }

  const handleNextStep = () => {
    setCurrentStep((prev) => prev + 1)
  }

  const handlePrevStep = () => {
    setCurrentStep((prev) => prev - 1)
  }

  const handleSubmit = async () => {
    setIsSubmitting(true)
    try {
      // 发送数据到后端
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

      if (!response.ok) {
        throw new Error("生成模板失败")
      }

      const data = await response.json()
      setDownloadUrl(data.downloadUrl)
      setCurrentStep(4) // 进入下载步骤
    } catch (error) {
      console.error("提交表单出错:", error)
      alert("提交表单时出现错误，请稍后重试")
    } finally {
      setIsSubmitting(false)
    }
  }

  return (
    <div className="bg-card rounded-xl shadow-lg overflow-hidden border border-border">
      <div className="p-6 sm:p-8">
        {/* 步骤指示器 */}
        <div className="mb-12">
          <div className="flex flex-col">
            {/* 步骤点和进度线容器 */}
            <div className="relative">
              {/* 进度线 */}
              <div className="absolute top-1/2 left-0 w-full h-0.5 bg-muted -translate-y-1/2" />
              <div 
                className="absolute top-1/2 left-0 h-0.5 bg-primary transition-all duration-300 -translate-y-1/2"
                style={{ width: `${((currentStep - 1) / 3) * 100}%` }}
              />
              
              {/* 步骤点和文字 */}
              <div className="relative flex justify-between">
                {["个人信息", "选择模板", "预览", "下载"].map((step, index) => (
                  <div key={index} className="flex flex-col items-center">
                    {/* 步骤点 */}
                    <div
                      className={`w-8 h-8 rounded-full flex items-center justify-center text-sm font-medium border-2 relative bg-background z-10 ${
                        currentStep > index + 1
                          ? "border-green-500 bg-green-500 text-white dark:bg-green-600"
                          : currentStep === index + 1
                            ? "border-primary bg-primary text-primary-foreground"
                            : "border-muted bg-background text-muted-foreground"
                      }`}
                    >
                      {currentStep > index + 1 ? "✓" : index + 1}
                    </div>
                    {/* 步骤文字 */}
                    <span
                      className={`mt-4 text-xs sm:text-sm ${
                        currentStep === index + 1 ? "text-primary font-medium" : "text-muted-foreground"
                      }`}
                    >
                      {step}
                    </span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* 步骤内容 */}
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
          <div>
            <TemplatePreview userData={userData} templateType={selectedTemplate} />
            <SubmitSection onSubmit={handleSubmit} onPrev={handlePrevStep} isSubmitting={isSubmitting} />
          </div>
        )}

        {currentStep === 4 && downloadUrl && (
          <div className="text-center py-10">
            <h2 className="text-2xl font-bold text-foreground mb-4">您的个人主页已生成！</h2>
            <p className="text-muted-foreground mb-6">点击下方按钮下载您的 Next.js 项目</p>
            <a
              href={downloadUrl}
              download
              className="inline-flex items-center px-6 py-3 border border-transparent text-base font-medium rounded-md shadow-sm text-primary-foreground bg-primary hover:bg-primary/90 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary"
            >
              下载项目文件 (.zip)
            </a>
            <p className="mt-4 text-sm text-muted-foreground">
              文件包含完整的 Next.js 项目，您可以直接部署或进一步自定义
            </p>
          </div>
        )}
      </div>
    </div>
  )
}
