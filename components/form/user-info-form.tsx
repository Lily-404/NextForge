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

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    onNext()
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      <div className="space-y-2">
        <h2 className="text-2xl font-bold tracking-tight">个人信息</h2>
        <p className="text-muted-foreground">填写您的个人信息，这些信息将用于生成您的个人网站</p>
      </div>

      <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
        <TabsList className="grid w-full grid-cols-3">
          <TabsTrigger value="basic">基本信息</TabsTrigger>
          <TabsTrigger value="projects">项目作品</TabsTrigger>
          <TabsTrigger value="social">社交媒体</TabsTrigger>
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

      <div className="flex justify-end">
        <Button type="submit">下一步</Button>
      </div>
    </form>
  )
}
