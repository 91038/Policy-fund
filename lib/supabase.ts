import { createClient } from '@supabase/supabase-js'

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL!
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!

export const supabase = createClient(supabaseUrl, supabaseAnonKey)

export type Application = {
  id: string
  created_at: string
  name: string
  phone: string
  job_type: string
  desired_amount: string
  business_number?: string
  status: 'pending' | 'contacted' | 'completed' | 'rejected'
}