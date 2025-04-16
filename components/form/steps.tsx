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
      <nav aria-label="Progress" className="mx-auto">
        <ol className="flex items-center">
          {steps.map((step, stepIdx) => (
            <li 
              key={step.name} 
              className={`flex items-center ${
                stepIdx === steps.length - 1 ? '' : 'flex-1'
              }`}
            >
              <div className="flex flex-col items-center">
                <div className="relative">
                  {step.id < currentStep ? (
                    <span className="flex h-10 w-10 items-center justify-center rounded-full bg-primary">
                      <CheckIcon className="h-6 w-6 text-primary-foreground" aria-hidden="true" />
                    </span>
                  ) : step.id === currentStep ? (
                    <span className="flex h-10 w-10 items-center justify-center rounded-full border-2 border-primary">
                      <span className="h-3 w-3 rounded-full bg-primary" />
                    </span>
                  ) : (
                    <span className="flex h-10 w-10 items-center justify-center rounded-full border-2 border-muted">
                      <span className="h-3 w-3 rounded-full bg-transparent" />
                    </span>
                  )}
                </div>
                <span 
                  className={`mt-3 text-sm font-medium ${
                    step.id < currentStep 
                      ? 'text-foreground' 
                      : step.id === currentStep 
                      ? 'text-foreground' 
                      : 'text-muted-foreground'
                  }`}
                >
                  {step.name}
                </span>
              </div>
              {stepIdx !== steps.length - 1 && (
                <div className="flex-1 mx-4">
                  <div 
                    className={`h-[2px] w-full ${
                      step.id < currentStep ? 'bg-primary' : 'bg-muted'
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
