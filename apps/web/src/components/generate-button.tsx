'use client'

import { useGenerationStore } from '@/store/generation-store'

export function GenerateButton() {
  const {
    loading,
    repoUrl,
    generateDocumentation,
  } = useGenerationStore()

  const disabled = loading || !repoUrl.trim()

  const handleClick = async () => {
    if (disabled) return

    await generateDocumentation()
  }

  return (
    <button
      type="button"
      onClick={handleClick}
      disabled={disabled}
      aria-label={
        loading
          ? 'Generating documentation'
          : 'Generate documentation'
      }
      className="
        inline-flex
        min-h-[52px]
        items-center
        justify-center
        gap-2
        rounded-2xl
        bg-cyan-500
        px-6
        text-sm
        font-bold
        text-black
        shadow-lg
        shadow-cyan-500/10
        transition-all
        duration-200
        hover:bg-cyan-400
        hover:shadow-cyan-500/20
        active:scale-[0.98]
        disabled:cursor-not-allowed
        disabled:opacity-40
        disabled:hover:bg-cyan-500
        disabled:hover:shadow-none
        sm:min-w-[190px]
      "
    >
      {loading ? (
        <>
          <span
            className="h-4 w-4 animate-spin rounded-full border-2 border-black/30 border-t-black"
            aria-hidden="true"
          />

          Generating...
        </>
      ) : (
        <>
          Generate Documentation
          <span aria-hidden="true">→</span>
        </>
      )}
    </button>
  )
}