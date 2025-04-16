import { ThemeToggle } from "@/components/theme-toggle"
import FormContainer from "@/components/form/form-container"

export default function Home() {
  return (
    <main className="min-h-screen bg-gradient-to-b from-background/50 to-background">
      <div className="container mx-auto px-4 py-8">
        <div className="flex justify-between items-center mb-8">
          <h1 className="text-3xl font-bold text-foreground">Next.js 模板生成器</h1>
          <ThemeToggle />
        </div>

        <div className="max-w-4xl mx-auto">
          <div className="mb-8 text-center">
            <p className="text-lg text-muted-foreground">创建个性化的 Next.js 项目，展示您的个人信息和作品集</p>
          </div>

          <FormContainer />
        </div>
      </div>
    </main>
  )
}
