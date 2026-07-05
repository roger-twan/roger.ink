import { workflowSteps } from './about.data';

const operatingModel = [
  {
    label: 'AI extends',
    items: [
      'Research synthesis',
      'Context gathering',
      'Direction options',
      'Coding',
      'Code review',
      'Documentation',
    ],
  },
  {
    label: 'I own',
    items: [
      'Product judgment',
      'UX taste',
      'Architecture',
      'Tradeoffs',
      'Shipping quality',
    ],
  },
  {
    label: 'Outcome',
    items: [
      'Clear direction',
      'Working prototype',
      'Reliable system',
      'Better iteration loop',
    ],
  },
];

export default function WorkflowSection() {
  return (
    <section className="bg-white py-16 md:py-24">
      <div className="container mx-auto px-4">
        <div className="grid gap-8 lg:grid-cols-2 lg:items-start">
          <div>
            <div data-reveal className="reveal-on-scroll">
              <p className="mb-3 text-xs font-semibold uppercase tracking-[0.24em] text-cyan-600">
                How I work
              </p>
              <h2 className="text-3xl font-semibold tracking-tight text-neutral-950 md:text-4xl">
                AI is part of my product-building workflow, not just a feature
                label.
              </h2>
              <p className="mt-5 max-w-2xl text-base leading-7 text-neutral-600">
                I use AI to improve the path from idea to delivery: gathering
                context, exploring directions, writing and reviewing code,
                documenting decisions, and testing the result.
              </p>
            </div>

            <div
              data-reveal
              className="reveal-on-scroll mt-7 overflow-hidden rounded-3xl border border-neutral-200 bg-neutral-50 p-4 md:p-5"
            >
              <div className="flex items-start justify-between gap-4 border-b border-neutral-200 pb-4">
                <div>
                  <p className="text-sm font-semibold text-neutral-950">
                    Operating model
                  </p>
                  <p className="mt-1.5 max-w-md text-sm leading-5 text-neutral-600">
                    AI increases leverage, while product direction and
                    engineering ownership stay explicit.
                  </p>
                </div>
                <div className="rounded-full border border-cyan-200 bg-cyan-50 px-3 py-1 text-xs font-semibold text-cyan-700">
                  Human-led
                </div>
              </div>

              <div className="mt-4 grid gap-2.5">
                {operatingModel.map((group, index) => (
                  <div
                    key={group.label}
                    data-reveal
                    style={{ animationDelay: `${index * 80 + 120}ms` }}
                    className="reveal-on-scroll rounded-2xl border border-neutral-200 bg-white p-3 transition hover:-translate-y-0.5 hover:border-cyan-200 hover:shadow-sm"
                  >
                    <div className="flex items-center gap-3">
                      <span className="size-2.5 rounded-full bg-cyan-500 shadow-[0_0_14px_rgba(6,182,212,0.35)]" />
                      <p className="text-sm font-semibold text-neutral-950">
                        {group.label}
                      </p>
                    </div>
                    <div className="mt-3 flex flex-wrap gap-1.5">
                      {group.items.map((item) => (
                        <span
                          key={item}
                          className="rounded-full border border-neutral-200 bg-neutral-50 px-2.5 py-0.5 text-xs font-medium text-neutral-600"
                        >
                          {item}
                        </span>
                      ))}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>

          <div
            data-reveal
            className="reveal-on-scroll rounded-3xl border border-neutral-200 bg-white p-4 shadow-sm shadow-neutral-950/[0.03] md:p-5"
          >
            <div className="border-b border-neutral-200 pb-4">
              <p className="text-sm font-semibold text-neutral-950">
                Workflow loop
              </p>
            </div>

            <div className="mt-4 grid content-start gap-3">
              {workflowSteps.map((step, index) => (
                <div
                  key={step}
                  data-reveal
                  style={{ animationDelay: `${index * 60 + 120}ms` }}
                  className="reveal-on-scroll flex items-center gap-4 rounded-2xl border border-neutral-200 bg-neutral-50 p-4 transition hover:-translate-y-0.5 hover:border-cyan-200 hover:bg-white hover:shadow-sm"
                >
                  <span className="flex size-8 shrink-0 items-center justify-center rounded-full border border-cyan-200 bg-cyan-50 text-xs font-semibold text-cyan-700">
                    {index + 1}
                  </span>
                  <span className="text-sm font-semibold text-neutral-800">
                    {step}
                  </span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
