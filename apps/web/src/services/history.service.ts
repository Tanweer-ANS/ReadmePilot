import { supabase } from '@/lib/supabase'
import type { GeneratedResult } from '@/store/generation-store'

export async function saveGeneration(
  repoUrl: string,
  result: GeneratedResult
) {
  const { error } = await supabase.from('generations').insert({
    repo_url: repoUrl,
    repo_full_name: result.repository.fullName,
    repo_name: result.repository.name,
    description: result.repository.description,

    documentation: result.documentation,

    frameworks: result.analysis.frameworks,
    package_manager: result.analysis.packageManager,
    deployment_targets: result.analysis.deploymentTargets,
  })

  if (error) throw error
}

export async function getRecentGenerations(limit = 10) {
  const { data, error } = await supabase
    .from('generations')
    .select('*')
    .order('created_at', { ascending: false })
    .limit(limit)

  if (error) throw error

  return data
}

export async function getGenerationById(id: string) {
  const { data, error } = await supabase
    .from('generations')
    .select('*')
    .eq('id', id)
    .single()

  if (error) throw error

  return data
}

export async function deleteGeneration(id: string) {
  const { error } = await supabase
    .from('generations')
    .delete()
    .eq('id', id)

  if (error) throw error
}

export async function searchGenerations(query: string) {
  const { data, error } = await supabase
    .from('generations')
    .select('*')
    .ilike('repo_full_name', `%${query}%`)
    .order('created_at', { ascending: false })

  if (error) throw error

  return data || []
}