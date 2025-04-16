"use client"

import type { TemplateType } from "@/types"
import Image from "next/image"
import { Check } from "lucide-react"

interface TemplateSelectorProps {
  selectedTemplate: TemplateType
  onTemplateChange: (template: TemplateType) => void
  onNext: () => void
  onPrev: () => void
}

const templates = [
  {
    id: "minimal" as TemplateType,
    name: "简约风格",
    description: "干净、简洁的设计，突出内容本身",
    imageUrl: "/placeholder.svg?height=200&width=300",
  },
  {
    id: "business" as TemplateType,
    name: "商业风格",
    description: "专业、正式的设计，适合职场人士",
    imageUrl: "/placeholder.svg?height=200&width=300",
  },
  {
    id: "creative" as TemplateType,
    name: "创意风格",
    description: "独特、富有创意的设计，展现个性",
    imageUrl: "/placeholder.svg?height=200&width=300",
  },
  {
    id: "fun" as TemplateType,
    name: "有趣风格",
    description: "活泼、生动的设计，充满趣味性",
    imageUrl: "/placeholder.svg?height=200&width=300",
  },
]

export default function TemplateSelector({
  selectedTemplate,
  onTemplateChange,
  onNext,
  onPrev,
}: TemplateSelectorProps) {
  return (
    <div>
      <h2 className="text-xl font-semibold text-foreground mb-4">选择模板风格</h2>
      <p className="text-muted-foreground mb-6">选择一个适合您的模板风格，展示您的个人信息</p>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
        {templates.map((template) => (
          <div
            key={template.id}
            className={`
              relative border-2 rounded-lg overflow-hidden cursor-pointer transition-all
              ${selectedTemplate === template.id ? "border-primary shadow-md" : "border-border hover:border-border/80"}
              bg-card
            `}
            onClick={() => onTemplateChange(template.id)}
          >
            <div className="aspect-w-16 aspect-h-9 relative">
              <Image src={template.imageUrl || "/placeholder.svg"} alt={template.name} fill className="object-cover" />
            </div>
            <div className="p-4">
              <h3 className="font-medium text-foreground">{template.name}</h3>
              <p className="text-sm text-muted-foreground mt-1">{template.description}</p>
            </div>

            {selectedTemplate === template.id && (
              <div className="absolute top-2 right-2 bg-primary text-primary-foreground rounded-full p-1">
                <Check className="w-4 h-4" />
              </div>
            )}
          </div>
        ))}
      </div>

      <div className="flex justify-between">
        <button
          type="button"
          onClick={onPrev}
          className="py-2 px-4 border border-input rounded-md shadow-sm text-sm font-medium text-foreground bg-background hover:bg-accent focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary"
        >
          上一步
        </button>
        <button
          type="button"
          onClick={onNext}
          className="ml-3 inline-flex justify-center py-2 px-4 border border-transparent shadow-sm text-sm font-medium rounded-md text-primary-foreground bg-primary hover:bg-primary/90 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary"
        >
          下一步
        </button>
      </div>
    </div>
  )
}
