import { supabase } from '@/lib/supabase'
import type { GeneratedResult } from '@/store/generation-store'

export async function saveGeneration(
  repoUrl: string,
  result: GeneratedResult,
  userId: string | null
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

    // Scope the row to the authenticated user
    user_id: userId,
  })

  if (error) throw error
}

export async function getRecentGenerations(limit = 10, userId?: string | null) {
  let query = supabase
    .from('generations')
    .select('*')
    .order('created_at', { ascending: false })
    .limit(limit)

  if (userId) {
    query = query.eq('user_id', userId)
  }

  const { data, error } = await query

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

export async function searchGenerations(query: string, userId?: string | null) {
  let dbQuery = supabase
    .from('generations')
    .select('*')
    .ilike('repo_full_name', `%${query}%`)
    .order('created_at', { ascending: false })

  if (userId) {
    dbQuery = dbQuery.eq('user_id', userId)
  }

  const { data, error } = await dbQuery

  if (error) throw error

  return data || []
}