import { createClient } from '@supabase/supabase-js'

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL!
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!

export const supabase = createClient(supabaseUrl, supabaseAnonKey)

// Database types
export interface City {
  id: string
  name: string
  slug: string
  state: string
  description: string
  image_url: string
  fundraising_goal: number
  current_amount: number
  color: string
  created_at: string
}

export interface Event {
  id: string
  city_id: string
  title: string
  description: string
  date: string
  time: string
  venue: string
  address: string
  ticket_price: number
  image_url: string
  status: 'upcoming' | 'ongoing' | 'completed'
  created_at: string
}

export interface Donation {
  id: string
  city_id: string
  donor_name: string
  amount: number
  message?: string
  anonymous: boolean
  created_at: string
}

export interface Coordinator {
  id: string
  city_id: string
  name: string
  email: string
  phone: string
  bio: string
  image_url: string
  created_at: string
}

export interface Milestone {
  id: string
  city_id: string
  amount: number
  title: string
  description: string
  benefits: string[]
  achieved: boolean
  achieved_at?: string
  created_at: string
}

// New types for dashboard
export interface User {
  id: string
  email: string
  full_name: string
  city_id: string
  avatar_url?: string
  phone?: string
  created_at: string
  updated_at: string
}

export interface Governance {
  id: string
  user_id: string
  city_id: string
  agreement: boolean
  agreed_at?: string
  created_at: string
}

export interface Fundraising {
  id: string
  city_id: string
  user_id: string
  amount: number
  goal: number
  title: string
  description: string
  status: 'active' | 'completed' | 'cancelled'
  end_date: string
  created_at: string
}

export interface SlackChannel {
  id: string
  city_id: string
  name: string
  invite_url: string
  member_count: number
  created_at: string
}

// Dashboard navigation types
export interface DashboardNavItem {
  name: string
  href: string
  icon: string
  current: boolean
}

// Auth helper functions
export const getCurrentUser = async () => {
  const { data: { user }, error } = await supabase.auth.getUser()
  if (error) throw error
  return user
}

export const getUserProfile = async (userId: string) => {
  const { data, error } = await supabase
    .from('users')
    .select('*')
    .eq('id', userId)
    .single()
  
  if (error) throw error
  return data
}

export const checkGovernanceAgreement = async (userId: string, cityId: string) => {
  const { data, error } = await supabase
    .from('governance')
    .select('agreement')
    .eq('user_id', userId)
    .eq('city_id', cityId)
    .single()
  
  if (error) return false
  return data?.agreement || false
}
