export function ResultSkeleton() {
  return (
    <div className="animate-pulse rounded-2xl border border-gray-800 bg-gray-950 p-6">
      <div className="mb-6 h-8 w-1/3 rounded bg-gray-800" />

      <div className="space-y-3">
        <div className="h-4 w-full rounded bg-gray-800" />
        <div className="h-4 w-11/12 rounded bg-gray-800" />
        <div className="h-4 w-5/6 rounded bg-gray-800" />

        <div className="my-6 h-32 rounded-xl bg-gray-900" />

        <div className="h-4 w-full rounded bg-gray-800" />
        <div className="h-4 w-3/4 rounded bg-gray-800" />
      </div>
    </div>
  )
}