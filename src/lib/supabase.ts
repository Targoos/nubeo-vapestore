import { createClient } from '@supabase/supabase-js'

// Vite expone las variables VITE_ a través de import.meta.env
const supabaseUrl = import.meta.env.VITE_SUPABASE_URL
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY

// createClient devuelve una instancia configurada lista para usar
// Este objeto tiene métodos para DB (.from()), Auth (.auth), Storage (.storage), etc.
export const supabase = createClient(supabaseUrl, supabaseAnonKey)
