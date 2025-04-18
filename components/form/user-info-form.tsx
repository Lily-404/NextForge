"use client"

import type React from "react"

import { useState } from "react"
import type { UserData } from "@/types/user-data"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { AvatarUploader } from "@/components/form/avatar-uploader"
import { ProjectsForm } from "@/components/form/projects-form"
import { SocialLinksForm } from "@/components/form/social-links-form"

import { ScrollArea } from "@/components/ui/scroll-area"

interface UserInfoFormProps {
  userData: UserData
  onChange: (data: Partial<UserData>) => void
  onNext: () => void
}

export function UserInfoForm({ userData, onChange, onNext }: UserInfoFormProps) {
  const [activeTab, setActiveTab] = useState("basic")

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target
    onChange({ [name]: value })
  }

  const handleSocialLinksChange = (platform: string, value: string) => {
    onChange({
      socialLinks: {
        ...userData.socialLinks,
        [platform]: value,
      },
    })
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    onNext()
  }

  return (
    <form onSubmit={handleSubmit}>
      <div className="mb-8">
        <h2 className="text-xl font-medium text-neutral-950 dark:text-white">个人信息</h2>
        <p className="mt-1.5 text-sm text-neutral-600 dark:text-neutral-400">填写您的个人信息，这些信息将用于生成您的个人网站</p>
      </div>

      <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
        <TabsList className="inline-flex h-9 items-center justify-center rounded-lg bg-neutral-100 dark:bg-neutral-800/50 p-1 text-neutral-600 dark:text-neutral-400">
          <TabsTrigger value="basic" className="inline-flex items-center justify-center whitespace-nowrap rounded-md px-3 py-1 text-sm font-medium ring-offset-white transition-all focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-neutral-950 focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 data-[state=active]:bg-white data-[state=active]:text-neutral-950 data-[state=active]:shadow dark:ring-offset-neutral-950 dark:focus-visible:ring-neutral-300 dark:data-[state=active]:bg-neutral-950 dark:data-[state=active]:text-neutral-50">基本信息</TabsTrigger>
          <TabsTrigger value="projects" className="inline-flex items-center justify-center whitespace-nowrap rounded-md px-3 py-1 text-sm font-medium ring-offset-white transition-all focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-neutral-950 focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 data-[state=active]:bg-white data-[state=active]:text-neutral-950 data-[state=active]:shadow dark:ring-offset-neutral-950 dark:focus-visible:ring-neutral-300 dark:data-[state=active]:bg-neutral-950 dark:data-[state=active]:text-neutral-50">项目作品</TabsTrigger>
          <TabsTrigger value="social" className="inline-flex items-center justify-center whitespace-nowrap rounded-md px-3 py-1 text-sm font-medium ring-offset-white transition-all focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-neutral-950 focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 data-[state=active]:bg-white data-[state=active]:text-neutral-950 data-[state=active]:shadow dark:ring-offset-neutral-950 dark:focus-visible:ring-neutral-300 dark:data-[state=active]:bg-neutral-950 dark:data-[state=active]:text-neutral-50">社交媒体</TabsTrigger>
        </TabsList>

        <TabsContent value="basic" className="space-y-6 pt-4">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="md:col-span-2 space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="name">
                    姓名 <span className="text-destructive">*</span>
                  </Label>
                  <Input
                    id="name"
                    name="name"
                    value={userData.name}
                    onChange={handleInputChange}
                    placeholder="您的姓名"
                    required
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="profession">
                    职业 <span className="text-destructive">*</span>
                  </Label>
                  <Input
                    id="profession"
                    name="profession"
                    value={userData.profession}
                    onChange={handleInputChange}
                    placeholder="您的职业"
                    required
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="email">
                    邮箱 <span className="text-destructive">*</span>
                  </Label>
                  <Input
                    id="email"
                    name="email"
                    type="email"
                    value={userData.email}
                    onChange={handleInputChange}
                    placeholder="your@email.com"
                    required
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="phone">电话</Label>
                  <Input
                    id="phone"
                    name="phone"
                    value={userData.phone}
                    onChange={handleInputChange}
                    placeholder="您的联系电话"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="wechat">微信</Label>
                  <Input
                    id="wechat"
                    name="wechat"
                    value={userData.wechat}
                    onChange={handleInputChange}
                    placeholder="您的微信号"
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="location">所在地</Label>
                  <Input
                    id="location"
                    name="location"
                    value={userData.location}
                    onChange={handleInputChange}
                    placeholder="城市，国家"
                  />
                </div>
              </div>
            </div>

            <div className="flex justify-center">
              <AvatarUploader currentAvatar={userData.avatar} onAvatarChange={(url) => onChange({ avatar: url })} />
            </div>
          </div>

          <div className="space-y-2">
            <Label htmlFor="bio">
              个人简介 <span className="text-destructive">*</span>
            </Label>
            <Textarea
              id="bio"
              name="bio"
              value={userData.bio}
              onChange={handleInputChange}
              placeholder="简单介绍一下自己..."
              rows={4}
              required
            />
          </div>
        </TabsContent>

        <TabsContent value="projects" className="pt-4">
          <ProjectsForm projects={userData.projects} onChange={(projects) => onChange({ projects })} />
        </TabsContent>

        <TabsContent value="social" className="pt-4">
          <SocialLinksForm socialLinks={userData.socialLinks} onChange={(socialLinks) => onChange({ socialLinks })} />
        </TabsContent>
      </Tabs>

      <div className="flex justify-end mt-8 pt-8 border-t border-neutral-200 dark:border-neutral-800">
        <Button 
          type="submit"
          className="h-9 px-4 rounded-lg bg-neutral-950 text-white hover:bg-neutral-800 dark:bg-white dark:text-neutral-950 dark:hover:bg-neutral-100"
        >
          下一步
        </Button>
      </div>
    </form>
  )
}
