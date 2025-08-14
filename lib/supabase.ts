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
