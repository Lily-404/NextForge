"use client"
import type { Project } from "@/types"
import { PlusCircle, Trash2 } from "lucide-react"
import InputGroup from "@/components/InputGroup"

interface ProjectsSectionProps {
  projects: Project[]
  onChange: (projects: Project[]) => void
}

export default function ProjectsSection({ projects, onChange }: ProjectsSectionProps) {
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
    onChange(updatedProjects)
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h3 className="text-lg font-medium text-gray-900">项目作品</h3>
        <button
          type="button"
          onClick={addProject}
          className="inline-flex items-center px-3 py-1 border border-transparent text-sm font-medium rounded-md text-blue-700 bg-blue-100 hover:bg-blue-200 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
        >
          <PlusCircle className="w-4 h-4 mr-1" />
          添加项目
        </button>
      </div>

      {projects.length === 0 ? (
        <div className="text-center py-6 bg-gray-50 rounded-lg">
          <p className="text-gray-500">暂无项目，点击上方按钮添加</p>
        </div>
      ) : (
        <div className="space-y-8">
          {projects.map((project, index) => (
            <div key={index} className="p-4 border border-gray-200 rounded-lg bg-gray-50">
              <div className="flex justify-between items-center mb-4">
                <h4 className="text-md font-medium text-gray-700">项目 {index + 1}</h4>
                <button type="button" onClick={() => removeProject(index)} className="text-red-500 hover:text-red-700">
                  <Trash2 className="w-4 h-4" />
                </button>
              </div>

              <div className="space-y-4">
                <InputGroup
                  label="项目名称"
                  name={`project-${index}-title`}
                  type="text"
                  value={project.title}
                  onChange={(e) => handleProjectChange(index, "title", e.target.value)}
                  required
                />

                <InputGroup
                  label="项目描述"
                  name={`project-${index}-description`}
                  type="textarea"
                  value={project.description}
                  onChange={(e) => handleProjectChange(index, "description", e.target.value)}
                />

                <InputGroup
                  label="项目图片URL"
                  name={`project-${index}-imageUrl`}
                  type="text"
                  value={project.imageUrl}
                  onChange={(e) => handleProjectChange(index, "imageUrl", e.target.value)}
                  placeholder="https://example.com/image.jpg"
                />

                <InputGroup
                  label="项目链接"
                  name={`project-${index}-link`}
                  type="text"
                  value={project.link}
                  onChange={(e) => handleProjectChange(index, "link", e.target.value)}
                  placeholder="https://example.com"
                />
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  )
}
