import { CheckIcon } from "lucide-react"

interface StepsProps {
  currentStep: number
}

export function Steps({ currentStep }: StepsProps) {
  const steps = [
    { id: 1, name: "个人信息" },
    { id: 2, name: "选择模板" },
    { id: 3, name: "预览项目" },
    { id: 4, name: "下载项目" },
  ]

  return (
    <div className="w-full">
      <nav aria-label="Progress">
        <ol className="flex items-center">
          {steps.map((step, stepIdx) => (
            <li 
              key={step.name} 
              className={`flex items-center ${stepIdx === steps.length - 1 ? '' : 'flex-1'}`}
            >
              <div className="flex flex-col items-center">
                <div className="relative">
                  {step.id < currentStep ? (
                    <span className="flex h-7 w-7 items-center justify-center rounded-full bg-neutral-950 dark:bg-white ring-4 ring-white dark:ring-neutral-950">
                      <CheckIcon className="h-3.5 w-3.5 text-white dark:text-neutral-950" aria-hidden="true" />
                    </span>
                  ) : step.id === currentStep ? (
                    <span className="flex h-7 w-7 items-center justify-center rounded-full bg-white dark:bg-neutral-950 ring-4 ring-neutral-950 dark:ring-white">
                      <span className="h-2.5 w-2.5 rounded-full bg-neutral-950 dark:bg-white" />
                    </span>
                  ) : (
                    <span className="flex h-7 w-7 items-center justify-center rounded-full bg-white dark:bg-neutral-950 ring-4 ring-neutral-200 dark:ring-neutral-800">
                      <span className="h-2.5 w-2.5 rounded-full bg-neutral-200 dark:bg-neutral-800" />
                    </span>
                  )}
                </div>
                <span 
                  className={`mt-2.5 text-xs font-medium ${
                    step.id <= currentStep 
                      ? 'text-neutral-950 dark:text-white' 
                      : 'text-neutral-500 dark:text-neutral-400'
                  }`}
                >
                  {step.name}
                </span>
              </div>
              {stepIdx !== steps.length - 1 && (
                <div className="flex-1 mx-3">
                  <div 
                    className={`h-0.5 w-full ${
                      step.id < currentStep 
                        ? 'bg-neutral-950 dark:bg-white' 
                        : 'bg-neutral-200 dark:bg-neutral-800'
                    }`}
                  />
                </div>
              )}
            </li>
          ))}
        </ol>
      </nav>
    </div>
  )
}
