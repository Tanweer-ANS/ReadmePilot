interface RepoSummaryProps {
  repository: {
    fullName?: string
    description?: string
    stars?: number
    defaultBranch?: string
  }

  analysis?: {
    frameworks?: string[]
    packageManager?: string
    deploymentTargets?: string[]
  }
}

export function RepoSummary({ repository, analysis }: RepoSummaryProps) {
  const frameworks = analysis?.frameworks ?? []
  const deploymentTargets = analysis?.deploymentTargets ?? []
  const packageManager = analysis?.packageManager ?? 'Unknown'

  return (
    <aside className="space-y-4 rounded-2xl border border-gray-800 bg-gray-950 p-5">
      <div>
        <h2 className="text-lg font-semibold text-white">Repository</h2>
        <p className="mt-1 text-sm text-gray-400">
          {repository.description || 'No description provided'}
        </p>
      </div>

      <div className="grid grid-cols-2 gap-3 text-sm">
        <div className="rounded-lg bg-gray-900 p-3">
          <p className="text-gray-400">Stars</p>
          <p className="mt-1 font-semibold text-white">
            {repository.stars ?? 0}
          </p>
        </div>

        <div className="rounded-lg bg-gray-900 p-3">
          <p className="text-gray-400">Branch</p>
          <p className="mt-1 font-semibold text-white">
            {repository.defaultBranch ?? 'main'}
          </p>
        </div>
      </div>

      <div>
        <h3 className="text-sm font-semibold text-white">Frameworks</h3>

        <div className="mt-2 flex flex-wrap gap-2">
          {frameworks.length > 0 ? (
            frameworks.map((framework) => (
              <span
                key={framework}
                className="rounded-full border border-cyan-500/30 bg-cyan-500/10 px-3 py-1 text-xs text-cyan-300"
              >
                {framework}
              </span>
            ))
          ) : (
            <span className="text-xs text-gray-500">
              No frameworks detected
            </span>
          )}
        </div>
      </div>

      <div>
        <h3 className="text-sm font-semibold text-white">Package manager</h3>
        <p className="mt-2 text-sm text-gray-300">
          {packageManager}
        </p>
      </div>

      <div>
        <h3 className="text-sm font-semibold text-white">Deployment targets</h3>

        <div className="mt-2 flex flex-wrap gap-2">
          {deploymentTargets.length > 0 ? (
            deploymentTargets.map((target) => (
              <span
                key={target}
                className="rounded-full border border-gray-700 bg-gray-900 px-3 py-1 text-xs text-gray-300"
              >
                {target}
              </span>
            ))
          ) : (
            <span className="text-xs text-gray-500">
              No deployment targets detected
            </span>
          )}
        </div>
      </div>
    </aside>
  )
}