"use client"

interface SubmitSectionProps {
  onSubmit: () => void
  onPrev: () => void
  isSubmitting: boolean
}

export default function SubmitSection({ onSubmit, onPrev, isSubmitting }: SubmitSectionProps) {
  return (
    <div className="mt-8 border-t border-border pt-6">
      <div className="flex flex-col sm:flex-row items-center justify-between">
        <div className="mb-4 sm:mb-0">
          <h3 className="text-lg font-medium text-foreground">准备生成您的个人主页</h3>
          <p className="text-sm text-muted-foreground">点击"生成项目"按钮，我们将为您创建一个完整的 Next.js 项目</p>
        </div>
        <div className="flex space-x-4">
          <button
            type="button"
            onClick={onPrev}
            disabled={isSubmitting}
            className="py-2 px-4 border border-input rounded-md shadow-sm text-sm font-medium text-foreground bg-background hover:bg-accent focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary disabled:opacity-50 disabled:cursor-not-allowed"
          >
            上一步
          </button>
          <button
            type="button"
            onClick={onSubmit}
            disabled={isSubmitting}
            className="inline-flex items-center justify-center py-2 px-4 border border-transparent shadow-sm text-sm font-medium rounded-md text-primary-foreground bg-primary hover:bg-primary/90 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {isSubmitting ? (
              <>
                <svg
                  className="animate-spin -ml-1 mr-2 h-4 w-4 text-primary-foreground"
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                >
                  <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                  <path
                    className="opacity-75"
                    fill="currentColor"
                    d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                  ></path>
                </svg>
                生成中...
              </>
            ) : (
              "生成项目"
            )}
          </button>
        </div>
      </div>
    </div>
  )
}
