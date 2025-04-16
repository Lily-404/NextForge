"use client"

import { Moon, Sun } from "lucide-react"
import { useTheme } from "@/components/theme-provider"

export function ThemeToggle() {
  const { theme, setTheme } = useTheme()

  return (
    <button
      onClick={() => setTheme(theme === "dark" ? "light" : "dark")}
      className="rounded-full p-2 transition-colors hover:bg-accent"
      aria-label="切换主题"
    >
      {theme === "dark" ? <Sun className="h-5 w-5 text-yellow-300" /> : <Moon className="h-5 w-5 text-slate-700" />}
    </button>
  )
}
