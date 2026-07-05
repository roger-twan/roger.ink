const productWorkflowSteps = [
  'Idea',
  'Research',
  'Define',
  'Prototype',
  'Design',
  'Build',
  'Ship',
  'Iterate',
];

const aiEnhancements = [
  'Research',
  'Product Decisions',
  'Project Context',
  'Knowledge',
  'Vibe Coding',
  'Testing',
  'Code Review',
  'Documentation',
];

export default function ProductBuildWorkflow() {
  return (
    <div className="relative mx-auto w-full max-w-2xl overflow-hidden rounded-[2rem] bg-neutral-950 p-px shadow-2xl shadow-cyan-950/20">
      <span className="animate-workflow-border pointer-events-none absolute left-1/2 top-1/2 h-[160%] w-[160%] bg-[conic-gradient(from_0deg,transparent_0deg,transparent_45deg,rgba(34,211,238,0.75)_75deg,rgba(190,242,100,0.65)_105deg,transparent_140deg,transparent_360deg)] opacity-70" />
      <div className="relative m-[3px] overflow-hidden rounded-[1.8rem] bg-neutral-950 p-2">
        <div className="overflow-hidden rounded-[1.5rem] border border-white/10 bg-neutral-900">
          <div className="flex items-center justify-between border-b border-white/10 px-4 py-3">
            <div className="flex items-center gap-2">
              <span className="animate-workflow-pulse size-3 rounded-full bg-cyan-400" />
              <span className="text-xs font-medium text-white/70">
                AI-assisted product workflow
              </span>
            </div>
            <div className="hidden items-center gap-2 sm:flex">
              <span className="h-2 w-10 rounded-full bg-white/15" />
              <span className="h-2 w-14 rounded-full bg-white/15" />
              <span className="rounded-full bg-lime-300/10 px-2 py-1 text-[11px] font-medium text-lime-200">
                shipping
              </span>
            </div>
          </div>

          <div className="grid min-h-[360px] grid-cols-1 gap-0 lg:grid-cols-[1fr_230px]">
            <div className="p-5 sm:p-6">
              <div className="mb-5">
                <p className="text-sm font-semibold text-white">
                  My product-building workflow
                </p>
                <p className="mt-2 max-w-md text-sm leading-6 text-white/55">
                  AI supports the work without replacing the product judgment,
                  design taste, or engineering ownership.
                </p>
              </div>

              <div className="relative overflow-hidden rounded-2xl border border-white/10 bg-black/20 p-3 sm:p-4">
                <span className="animate-workflow-scan pointer-events-none absolute inset-y-0 left-0 w-1/2 bg-gradient-to-r from-transparent via-cyan-300/10 to-transparent" />
                <div className="grid grid-cols-1 gap-2 sm:grid-cols-2">
                  {productWorkflowSteps.map((step, index) => (
                    <div
                      key={step}
                      tabIndex={0}
                      style={{ animationDelay: `${index * 80}ms` }}
                      className="animate-workflow-rise group relative flex min-h-14 items-center gap-3 overflow-hidden rounded-xl border border-white/10 bg-white/[0.04] p-3 outline-none transition hover:-translate-y-0.5 hover:border-cyan-300/45 hover:bg-cyan-300/10 focus-visible:border-cyan-300/60 focus-visible:bg-cyan-300/10"
                    >
                      <span className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-cyan-300/40 to-transparent opacity-0 transition group-hover:opacity-100 group-focus-visible:opacity-100" />
                      <span
                        className={`flex size-7 shrink-0 items-center justify-center rounded-full border text-[11px] font-semibold transition group-hover:scale-105 ${
                          index === 0
                            ? 'border-cyan-300/60 bg-cyan-300/15 text-cyan-100'
                            : index === productWorkflowSteps.length - 1
                              ? 'border-lime-300/60 bg-lime-300/15 text-lime-100'
                              : 'border-white/15 bg-white/[0.06] text-white/70'
                        }`}
                      >
                        {index + 1}
                      </span>
                      <span className="text-sm font-semibold text-white">
                        {step}
                      </span>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            <div className="border-t border-white/10 bg-black/25 p-5 lg:border-l lg:border-t-0">
              <div className="mb-4 flex items-center justify-between">
                <span className="text-sm font-semibold text-white">
                  AI enhances
                </span>
                <span className="rounded-full border border-lime-300/30 bg-lime-300/10 px-2 py-1 text-[11px] font-medium text-lime-200">
                  workflow
                </span>
              </div>
              <div className="grid gap-2">
                {aiEnhancements.map((item, index) => (
                  <div
                    key={item}
                    tabIndex={0}
                    style={{
                      animationDelay: `${
                        (productWorkflowSteps.length + index) * 55
                      }ms`,
                    }}
                    className="animate-workflow-rise group rounded-xl border border-white/10 bg-white/[0.04] px-3 py-2 outline-none transition hover:translate-x-1 hover:border-lime-300/40 hover:bg-lime-300/10 focus-visible:border-lime-300/50 focus-visible:bg-lime-300/10"
                  >
                    <div className="flex items-center gap-3 text-sm text-white/80">
                      <span className="flex size-5 shrink-0 items-center justify-center rounded-full bg-lime-300/15 text-xs font-semibold text-lime-200 transition group-hover:scale-110 group-hover:bg-lime-300/25">
                        ✓
                      </span>
                      <span>{item}</span>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
