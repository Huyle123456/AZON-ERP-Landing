export interface Step {
  title: string;
  description?: string;
}

export default function Stepper({
  steps,
  current,
}: {
  steps: Step[];
  current: number; // 0-based
}) {
  const n = steps.length;
  const progressPct = n > 1 ? (current / (n - 1)) * 100 : 0;

  // Each step occupies a grid column of width 1/n. The circle is centered
  // inside its column, so the horizontal center of column k sits at
  //    (k + 0.5) / n * 100%
  // The track / progress line should run from the center of column 0 to the
  // center of column N-1.
  const trackLeftPct = 50 / n; // (0 + 0.5) / n * 100
  const trackRightPct = 50 / n; // mirror of last column's right gutter
  const fullSpanPct = 100 - trackLeftPct - trackRightPct;

  return (
    <div className="w-full">
      <div
        className="relative grid"
        style={{ gridTemplateColumns: `repeat(${n}, minmax(0, 1fr))` }}
      >
        {/* Dashed track */}
        <div
          className="absolute top-4 border-t-2 border-dashed border-slate-300"
          style={{ left: `${trackLeftPct}%`, right: `${trackRightPct}%` }}
        />
        {/* Solid progress overlay */}
        <div
          className="absolute top-4 h-0.5 bg-primary-500 transition-all duration-300"
          style={{
            left: `${trackLeftPct}%`,
            width: `${(fullSpanPct * progressPct) / 100}%`,
          }}
        />

        {steps.map((step, i) => {
          const isDone = i < current;
          const isActive = i === current;
          return (
            <div key={step.title} className="relative flex flex-col items-center px-1">
              <div
                className={`flex h-8 w-8 items-center justify-center rounded-full text-xs font-semibold border-2 transition-colors ${
                  isDone
                    ? "bg-primary-500 border-primary-500 text-white"
                    : isActive
                      ? "bg-white border-primary-500 text-primary-600 ring-4 ring-primary-100"
                      : "bg-white border-slate-300 text-slate-400"
                }`}
              >
                {isDone ? (
                  <svg
                    className="h-3.5 w-3.5"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth={3}
                  >
                    <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
                  </svg>
                ) : (
                  i + 1
                )}
              </div>
              <p
                className={`mt-2 text-center text-xs font-semibold leading-tight ${
                  isActive || isDone ? "text-primary-700" : "text-slate-400"
                }`}
              >
                {step.title}
              </p>
              {step.description && (
                <p className="hidden sm:block text-center text-[11px] text-slate-400 mt-0.5 leading-tight">
                  {step.description}
                </p>
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
}
