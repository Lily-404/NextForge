"use client"

import type { TemplateType } from "@/types/user-data"
import { Button } from "@/components/ui/button"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
import { Label } from "@/components/ui/label"
import { Check } from "lucide-react"
import Image from "next/image"

interface TemplateSelectorProps {
  selectedTemplate: TemplateType
  onTemplateChange: (template: TemplateType) => void
  onNext: () => void
  onPrev: () => void
}

const templates = [
  {
    id: "minimalist" as TemplateType,
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

export function TemplateSelector({ selectedTemplate, onTemplateChange, onNext, onPrev }: TemplateSelectorProps) {
  return (
    <div className="space-y-6">
      <div className="space-y-2">
        <h2 className="text-2xl font-bold tracking-tight">选择模板风格</h2>
        <p className="text-muted-foreground">选择一个适合您的模板风格，展示您的个人信息</p>
      </div>

      <RadioGroup
        value={selectedTemplate}
        onValueChange={(value) => onTemplateChange(value as TemplateType)}
        className="grid grid-cols-1 md:grid-cols-2 gap-6"
      >
        {templates.map((template) => (
          <div key={template.id} className="relative group">
            <RadioGroupItem value={template.id} id={template.id} className="peer sr-only" />
            <Label
              htmlFor={template.id}
              className="flex flex-col h-full rounded-lg border-2 border-muted bg-card transition-all duration-200 
                hover:border-primary/50 hover:shadow-md peer-data-[state=checked]:border-primary 
                peer-data-[state=checked]:shadow-lg cursor-pointer overflow-hidden"
            >
              <div className="relative h-48 w-full">
                <Image
                  src={template.imageUrl || "/placeholder.svg"}
                  alt={template.name}
                  fill
                  className="object-cover transition-transform duration-300 group-hover:scale-105"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-background/80 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-200" />
                {selectedTemplate === template.id && (
                  <div className="absolute top-4 right-4 bg-primary text-primary-foreground rounded-full p-1.5 shadow-lg">
                    <Check className="h-4 w-4" />
                  </div>
                )}
              </div>
              <div className="p-4 space-y-2">
                <h3 className="font-semibold text-lg">{template.name}</h3>
                <p className="text-sm text-muted-foreground">{template.description}</p>
              </div>
            </Label>
          </div>
        ))}
      </RadioGroup>

      <div className="flex justify-between pt-6">
        <Button variant="outline" onClick={onPrev} className="min-w-[100px]">
          上一步
        </Button>
        <Button onClick={onNext} className="min-w-[100px]">
          下一步
        </Button>
      </div>
    </div>
  )
}
