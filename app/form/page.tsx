import FormContainer from "@/components/form/form-container"

export default function FormPage() {
  return (
    <main className="min-h-screen bg-white dark:bg-neutral-950 relative">
      {/* Background decoration */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute inset-0 bg-[linear-gradient(to_right,#80808012_1px,transparent_1px),linear-gradient(to_bottom,#80808012_1px,transparent_1px)] bg-[size:24px_24px]" />
      </div>

      {/* Content */}
      <div className="relative mx-auto px-6 lg:px-8 py-12 max-w-7xl">
        <div className="max-w-5xl mx-auto">
          <div className="overflow-hidden rounded-2xl bg-neutral-50 dark:bg-neutral-900 border border-neutral-200/50 dark:border-neutral-800 shadow-[0_1px_3px_0_rgba(0,0,0,0.1)]">
            <FormContainer />
          </div>
        </div>
      </div>
    </main>
  )
}
