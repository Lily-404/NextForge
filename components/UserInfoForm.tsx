"use client"

import type React from "react"

import { useState } from "react"
import type { UserData } from "@/types"
import InputGroup from "@/components/InputGroup"
import ProjectsSection from "@/components/ProjectsSection"
import SocialLinksSection from "@/components/SocialLinksSection"
import AvatarUploader from "@/components/AvatarUploader"

interface UserInfoFormProps {
  userData: UserData
  onChange: (data: Partial<UserData>) => void
  onNext: () => void
}

export default function UserInfoForm({ userData, onChange, onNext }: UserInfoFormProps) {
  const [activeTab, setActiveTab] = useState<string>("basic")

  const handleBasicInfoChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target
    onChange({ [name]: value })
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    onNext()
  }

  return (
    <form onSubmit={handleSubmit}>
      {/* 表单选项卡 */}
      <div className="border-b border-gray-200 mb-6">
        <nav className="-mb-px flex space-x-8">
          {[
            { id: "basic", name: "基本信息" },
            { id: "projects", name: "项目作品" },
            { id: "social", name: "社交媒体" },
          ].map((tab) => (
            <button
              key={tab.id}
              type="button"
              onClick={() => setActiveTab(tab.id)}
              className={`
                whitespace-nowrap py-4 px-1 border-b-2 font-medium text-sm
                ${
                  activeTab === tab.id
                    ? "border-blue-500 text-blue-600"
                    : "border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300"
                }
              `}
            >
              {tab.name}
            </button>
          ))}
        </nav>
      </div>

      {/* 基本信息表单 */}
      {activeTab === "basic" && (
        <div className="space-y-6">
          <div className="flex flex-col sm:flex-row gap-6">
            <div className="sm:w-2/3 space-y-6">
              <InputGroup
                label="姓名"
                name="name"
                type="text"
                value={userData.name}
                onChange={handleBasicInfoChange}
                required
              />

              <InputGroup
                label="职业"
                name="profession"
                type="text"
                value={userData.profession}
                onChange={handleBasicInfoChange}
                required
              />

              <InputGroup
                label="所在地"
                name="location"
                type="text"
                value={userData.location}
                onChange={handleBasicInfoChange}
              />
            </div>

            <div className="sm:w-1/3">
              <AvatarUploader currentAvatar={userData.avatar} onAvatarChange={(url) => onChange({ avatar: url })} />
            </div>
          </div>

          <InputGroup
            label="个人简介"
            name="bio"
            type="textarea"
            value={userData.bio}
            onChange={handleBasicInfoChange}
            required
          />

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <InputGroup
              label="微信号"
              name="wechat"
              type="text"
              value={userData.wechat}
              onChange={handleBasicInfoChange}
            />

            <InputGroup label="电话" name="phone" type="tel" value={userData.phone} onChange={handleBasicInfoChange} />

            <InputGroup
              label="邮箱"
              name="email"
              type="email"
              value={userData.email}
              onChange={handleBasicInfoChange}
              required
            />
          </div>
        </div>
      )}

      {/* 项目作品表单 */}
      {activeTab === "projects" && (
        <ProjectsSection projects={userData.projects} onChange={(projects) => onChange({ projects })} />
      )}

      {/* 社交媒体表单 */}
      {activeTab === "social" && (
        <SocialLinksSection socialLinks={userData.socialLinks} onChange={(socialLinks) => onChange({ socialLinks })} />
      )}

      {/* 表单按钮 */}
      <div className="mt-8 flex justify-end">
        <button
          type="submit"
          className="ml-3 inline-flex justify-center py-2 px-4 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
        >
          下一步
        </button>
      </div>
    </form>
  )
}
