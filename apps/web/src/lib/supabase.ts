import { createClient, type SupabaseClient } from '@supabase/supabase-js'

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL!
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!

declare global {
  var readmePilotSupabaseClient: SupabaseClient | undefined
  var readmePilotSupabaseConfig: string | undefined
}

const clientConfig = `${supabaseUrl}:${supabaseAnonKey}`

export const supabase =
  globalThis.readmePilotSupabaseClient &&
  globalThis.readmePilotSupabaseConfig === clientConfig
    ? globalThis.readmePilotSupabaseClient
    : createClient(supabaseUrl, supabaseAnonKey)

if (typeof window !== 'undefined') {
  globalThis.readmePilotSupabaseClient = supabase
  globalThis.readmePilotSupabaseConfig = clientConfig
}
