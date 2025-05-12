import { cn } from "@/lib/utils"
import type { Project } from "@/types"
import Image from "next/image"

interface ProjectCardProps {
  project: Project
  isDark: boolean
}

export default function ProjectCard({ project, isDark }: ProjectCardProps) {
  return (
    <div className={cn(
      "border transition-colors",
      isDark ? "border-[#222222] hover:border-[#e5e5e5] bg-[#1a1a1a]" : "border-[#eaeaea] hover:border-[#1a1a1a] bg-white"
    )}>
      {project.imageUrl && (
        <div className="relative w-full h-64">
          <Image
            src={project.imageUrl}
            alt={project.title}
            fill
            className="object-cover"
          />
        </div>
      )}
      <div className="p-8">
        <h3 className={cn(
          "text-2xl font-bold mb-4 tracking-tight",
          isDark ? "text-[#e5e5e5]" : "text-[#1a1a1a]"
        )}>
          {project.title}
        </h3>
        <p className={cn(
          "mb-6",
          isDark ? "text-[#666666]" : "text-[#666666]"
        )}>
          {project.description}
        </p>
        {project.link && (
          <a
            href={project.link}
            target="_blank"
            rel="noopener noreferrer"
            className={cn(
              "inline-flex items-center px-6 py-2 border transition-colors",
              isDark 
                ? "border-[#333333] text-[#666666] hover:border-[#e5e5e5] hover:text-[#e5e5e5]" 
                : "border-[#eaeaea] text-[#666666] hover:border-[#1a1a1a] hover:text-[#1a1a1a]"
            )}
          >
            <span className="text-sm font-medium tracking-wider">查看项目</span>
          </a>
        )}
      </div>
    </div>
  )
} 