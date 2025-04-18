import { ThemeToggle } from "@/components/theme-toggle"
import { Button } from "@/components/ui/button"
import Link from "next/link"
import { ArrowRight, Blocks, Sparkles, Zap, Check, Code, Palette, Globe, Laptop, Star, ChevronRight } from "lucide-react"
import Image from "next/image"

export default function Home() {
  return (
    <div className="min-h-screen bg-white dark:bg-neutral-950">
      <main className="relative overflow-hidden">
        {/* Background decoration */}
        <div className="absolute inset-0 overflow-hidden pointer-events-none">
          <div className="absolute inset-0 bg-[linear-gradient(to_right,#80808012_1px,transparent_1px),linear-gradient(to_bottom,#80808012_1px,transparent_1px)] bg-[size:24px_24px]" />
          <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[800px] h-[800px] bg-gradient-to-b from-blue-500/20 to-purple-500/20 rounded-full blur-3xl opacity-20 dark:opacity-10" />
        </div>

      {/* Content */}
      <div className="relative mx-auto px-6 lg:px-8 py-12 max-w-7xl">
        <nav className="flex justify-between items-center mb-24">
          <div className="flex items-center space-x-3 group">
            <div className="h-8 w-8 bg-black rounded-lg transform transition-transform group-hover:scale-110" />
            <h2 className="text-lg font-medium text-black dark:text-white">NextForge</h2>
          </div>
          <ThemeToggle />
        </nav>

        <div className="max-w-2xl mx-auto text-center">
          <h1 className="text-4xl font-bold tracking-tight bg-clip-text text-transparent bg-gradient-to-r from-neutral-950 via-neutral-800 to-neutral-900 dark:from-white dark:via-neutral-200 dark:to-neutral-400 sm:text-5xl lg:text-6xl">
            Next.js 落地页生成器
          </h1>
          <p className="mt-6 text-base text-neutral-600 dark:text-neutral-400">
          使用现代化工具和设计，创建独特的 Next.js 项目，展示您的个人信息和作品集
          </p>
          <div className="mt-10 flex items-center justify-center gap-4">
            {/* 修改"立即创建"按钮的背景色为黑色 */}
            <Button asChild className="h-11 px-6 rounded-lg bg-black hover:bg-neutral-800 text-white shadow-lg hover:shadow-xl transition-all duration-300">
              <Link href="/form">立即创建</Link>
            </Button>
            <Button asChild variant="outline" className="h-11 px-6 rounded-lg border border-neutral-200 hover:border-blue-500 hover:text-blue-500 transition-colors duration-300 dark:border-neutral-800 dark:hover:border-blue-400 dark:hover:text-blue-400">
              <Link href="#features">了解更多 <ArrowRight className="ml-2 h-4 w-4" /></Link>
            </Button>
          </div>
        </div>

        {/* Features */}
        <div id="features" className="mt-32 md:mt-40">
          <div className="mx-auto max-w-5xl">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              <div className="group relative">
                <div className="relative z-10 p-8 rounded-2xl bg-neutral-50 dark:bg-neutral-900 border border-neutral-200/50 dark:border-neutral-800 transition-colors">
                  <div className="mb-6 flex h-10 w-10 items-center justify-center rounded-lg bg-neutral-950 dark:bg-white">
                    <Sparkles className="h-5 w-5 text-white dark:text-neutral-950" />
                  </div>
                  <h3 className="mb-2 text-lg font-medium text-neutral-950 dark:text-white">现代化设计</h3>
                  <p className="text-sm text-neutral-600 dark:text-neutral-400">简约而优雅的设计风格，专业的视觉效果，展现您的个人品牌</p>
                </div>
                <div className="absolute -inset-4 z-0 rounded-2xl bg-gradient-to-br from-neutral-950/5 to-neutral-950/0 opacity-0 transition-opacity group-hover:opacity-100 dark:from-neutral-50/5 dark:to-neutral-50/0" />
              </div>

              <div className="group relative">
                <div className="relative z-10 p-8 rounded-2xl bg-neutral-50 dark:bg-neutral-900 border border-neutral-200/50 dark:border-neutral-800 transition-colors">
                  <div className="mb-6 flex h-10 w-10 items-center justify-center rounded-lg bg-neutral-950 dark:bg-white">
                    <Blocks className="h-5 w-5 text-white dark:text-neutral-950" />
                  </div>
                  <h3 className="mb-2 text-lg font-medium text-neutral-950 dark:text-white">多样化模板</h3>
                  <p className="text-sm text-neutral-600 dark:text-neutral-400">多种风格模板可选，满足不同场景的需求，轻松打造专属网站</p>
                </div>
                <div className="absolute -inset-4 z-0 rounded-2xl bg-gradient-to-br from-neutral-950/5 to-neutral-950/0 opacity-0 transition-opacity group-hover:opacity-100 dark:from-neutral-50/5 dark:to-neutral-50/0" />
              </div>

              <div className="group relative">
                <div className="relative z-10 p-8 rounded-2xl bg-neutral-50 dark:bg-neutral-900 border border-neutral-200/50 dark:border-neutral-800 transition-colors">
                  <div className="mb-6 flex h-10 w-10 items-center justify-center rounded-lg bg-neutral-950 dark:bg-white">
                    <Zap className="h-5 w-5 text-white dark:text-neutral-950" />
                  </div>
                  <h3 className="mb-2 text-lg font-medium text-neutral-950 dark:text-white">快速部署</h3>
                  <p className="text-sm text-neutral-600 dark:text-neutral-400">一键部署到 Vercel，无需复杂配置，让您的网站立即上线</p>
                </div>
                <div className="absolute -inset-4 z-0 rounded-2xl bg-gradient-to-br from-neutral-950/5 to-neutral-950/0 opacity-0 transition-opacity group-hover:opacity-100 dark:from-neutral-50/5 dark:to-neutral-50/0" />
              </div>
            </div>
          </div>
        </div>


        {/* Workflow */}
        <div className="mt-32 md:mt-40 overflow-hidden">
          <div className="mx-auto max-w-5xl">
            <div className="mb-12 text-center">
              <h2 className="text-3xl font-medium tracking-tight text-neutral-950 dark:text-white">简单的使用流程</h2>
              <p className="mt-4 text-base text-neutral-600 dark:text-neutral-400">只需几个简单的步骤，即可创建您的专属网站</p>
            </div>

            <div className="relative">
              <div className="absolute left-1/2 top-0 h-full w-px -translate-x-1/2 bg-neutral-200 dark:bg-neutral-800" />
              <div className="space-y-16">
                {[
                  {
                    title: "选择模板",
                    description: "浏览我们的模板库，选择一个符合您需求的模板风格",
                    icon: Palette
                  },
                  {
                    title: "填写信息",
                    description: "输入您的个人信息、项目经历和社交媒体链接",
                    icon: Code
                  },
                  {
                    title: "预览调整",
                    description: "实时预览您的网站效果，确保每个细节都完美呈现",
                    icon: Laptop
                  },
                  {
                    title: "一键部署",
                    description: "点击部署按钮，您的网站将自动部署到 Vercel 平台",
                    icon: Globe
                  }
                ].map((step, index) => (
                  <div key={index} className="relative flex items-start">
                    <div className="absolute left-1/2 -translate-x-1/2 -translate-y-1/2 p-1 bg-white dark:bg-neutral-950">
                      <div className="flex h-8 w-8 items-center justify-center rounded-full bg-neutral-950 dark:bg-white">
                        {<step.icon className="h-4 w-4 text-white dark:text-neutral-950" />}
                      </div>
                    </div>
                    <div className={`w-1/2 ${index % 2 === 0 ? 'pr-16 text-right' : 'pl-16 ml-auto'}`}>
                      <h3 className="text-lg font-medium text-neutral-950 dark:text-white">{step.title}</h3>
                      <p className="mt-2 text-sm text-neutral-600 dark:text-neutral-400">{step.description}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* Preview */}
        <div className="mt-32 md:mt-40">
          <div className="mx-auto max-w-5xl">
            <div className="mb-12 text-center">
              <h2 className="text-3xl font-medium tracking-tight text-neutral-950 dark:text-white">精心设计的模板</h2>
              <p className="mt-4 text-base text-neutral-600 dark:text-neutral-400">多种风格，总有一款适合您</p>
            </div>

            <div className="relative rounded-2xl bg-neutral-950 p-4">
              <div className="absolute -top-px left-20 right-11 h-px bg-gradient-to-r from-neutral-800/0 via-neutral-800 to-neutral-800/0" />
              <div className="absolute -bottom-px left-11 right-20 h-px bg-gradient-to-r from-neutral-800/0 via-neutral-800 to-neutral-800/0" />
              <div className="p-4 bg-neutral-900 rounded-xl overflow-hidden">
                <div className="grid grid-cols-2 gap-4">
                  {["/preview-1.png", "/preview-2.png", "/preview-3.png", "/preview-4.png"].map((src, index) => (
                    <div key={index} className="relative aspect-[16/10] rounded-lg overflow-hidden bg-neutral-800">
                      <Image 
                        src={src} 
                        alt={`Template preview ${index + 1}`} 
                        fill 
                        className="object-cover"
                      />
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>

      </div>
    </main>

    {/* Footer */}
    <footer className="mt-32 md:mt-40 border-t border-neutral-200 dark:border-neutral-800">
      <div className="mx-auto max-w-5xl px-6 py-8 flex flex-col items-center">
        <div className="flex items-center space-x-2">
          <div className="h-8 w-8 rounded-lg bg-neutral-950 dark:bg-white" />
          <span className="text-lg font-semibold text-neutral-950 dark:text-white">NextForge</span>
        </div>
        <p className="mt-4 text-sm text-neutral-600 dark:text-neutral-400 text-center max-w-sm">
          使用现代化工具和设计，创建独特的 Next.js 项目。
        </p>
        <p className="mt-6 text-sm text-neutral-600 dark:text-neutral-400">
          &copy; {new Date().getFullYear()} NextForge. All rights reserved.
        </p>
      </div>
    </footer>
    </div>
  )
}
