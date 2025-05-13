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
    imageUrl: "/22.jpg",
  },
  {
    id: "business" as TemplateType,
    name: "商业风格",
    description: "专业、正式的设计，适合职场人士",
    imageUrl: "/33.jpg",
  },
  {
    id: "creative" as TemplateType,
    name: "创意风格",
    description: "独特、富有创意的设计，展现个性",
    imageUrl: "/11.jpg",
  },
  {
    id: "fun" as TemplateType,
    name: "有趣风格",
    description: "活泼、生动的设计，充满趣味性",
    imageUrl: "/44.jpg",
  },
]

export function TemplateSelector({ selectedTemplate, onTemplateChange, onNext, onPrev }: TemplateSelectorProps) {
  return (
    <div>
      <div className="mb-8">
        <h2 className="text-xl font-medium text-neutral-950 dark:text-white">选择模板风格</h2>
        <p className="mt-1.5 text-sm text-neutral-600 dark:text-neutral-400">选择一个适合您的模板风格，展示您的个人信息</p>
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
              className="block relative rounded-xl border border-neutral-200 dark:border-neutral-800 bg-white dark:bg-neutral-900 transition-all
                hover:border-neutral-300 dark:hover:border-neutral-700 hover:shadow-sm peer-data-[state=checked]:border-neutral-950 dark:peer-data-[state=checked]:border-white
                peer-data-[state=checked]:ring-1 peer-data-[state=checked]:ring-neutral-950 dark:peer-data-[state=checked]:ring-white cursor-pointer overflow-hidden"
            >
              <div className="relative aspect-[4/3] w-full">
                <Image
                  src={template.imageUrl || "/placeholder.svg"}
                  alt={template.name}
                  fill
                  className="object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/40 to-transparent" />
                {selectedTemplate === template.id && (
                  <div className="absolute top-3 right-3 bg-white text-neutral-950 dark:bg-neutral-950 dark:text-white rounded-full p-1.5 shadow-md">
                    <Check className="h-3.5 w-3.5" />
                  </div>
                )}
              </div>
              <div className="p-4">
                <h3 className="font-medium text-neutral-950 dark:text-white">{template.name}</h3>
                <p className="mt-1 text-sm text-neutral-600 dark:text-neutral-400">{template.description}</p>
              </div>
            </Label>
          </div>
        ))}
      </RadioGroup>

      <div className="flex items-center justify-between mt-8 pt-8 border-t border-neutral-200 dark:border-neutral-800">
        <Button 
          variant="outline" 
          onClick={onPrev}
          className="h-9 px-4 rounded-lg border border-neutral-200 hover:bg-neutral-100 dark:border-neutral-800 dark:hover:bg-neutral-800"
        >
          上一步
        </Button>
        <Button 
          onClick={onNext}
          className="h-9 px-4 rounded-lg bg-neutral-950 text-white hover:bg-neutral-800 dark:bg-white dark:text-neutral-950 dark:hover:bg-neutral-100"
        >
          下一步
        </Button>
      </div>
    </div>
  )
}
