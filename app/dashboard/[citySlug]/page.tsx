'use client'

import { useEffect, useState } from 'react'
import { useRouter } from 'next/navigation'
import { motion } from 'framer-motion'
import { Calendar, DollarSign, Users, TrendingUp } from 'lucide-react'
import { supabase, checkGovernanceAgreement } from '@/lib/supabase'
import DashboardLayout from '@/components/DashboardLayout'
import Link from 'next/link'

interface DashboardPageProps {
  params: {
    citySlug: string
  }
}

interface CityData {
  id: string
  name: string
  slug: string
  description: string
  image_url: string
  fundraising_goal: number
  current_amount: number
  color: string
}

interface EventData {
  id: string
  title: string
  date: string
  time: string
  venue: string
  status: string
}

interface FundraisingData {
  id: string
  title: string
  amount: number
  goal: number
  status: string
  end_date: string
}

export default function DashboardPage({ params }: DashboardPageProps) {
  const router = useRouter()
  const [loading, setLoading] = useState(true)
  const [cityData, setCityData] = useState<CityData | null>(null)
  const [events, setEvents] = useState<EventData[]>([])
  const [fundraising, setFundraising] = useState<FundraisingData[]>([])
  const [user, setUser] = useState<any>(null)

  useEffect(() => {
    const checkAuthAndGovernance = async () => {
      try {
        // Check if user is authenticated
        const { data: { user }, error } = await supabase.auth.getUser()
        if (error || !user) {
          router.push('/login')
          return
        }

        setUser(user)

        // Get city data
        const { data: city } = await supabase
          .from('cities')
          .select('*')
          .eq('slug', params.citySlug)
          .single()

        if (!city) {
          router.push('/404')
          return
        }

        setCityData(city)

        // Check governance agreement
        const hasAgreed = await checkGovernanceAgreement(user.id, city.id)
        if (!hasAgreed) {
          router.push(`/dashboard/${params.citySlug}/onboarding`)
          return
        }

        // Load dashboard data
        await loadDashboardData(city.id)
        setLoading(false)
      } catch (error) {
        console.error('Error checking auth and governance:', error)
        router.push('/login')
      }
    }

    checkAuthAndGovernance()
  }, [params.citySlug, router])

  const loadDashboardData = async (cityId: string) => {
    try {
      // Load upcoming events
      const { data: eventsData } = await supabase
        .from('events')
        .select('*')
        .eq('city_id', cityId)
        .eq('status', 'upcoming')
        .order('date', { ascending: true })
        .limit(5)

      if (eventsData) setEvents(eventsData)

      // Load active fundraising campaigns
      const { data: fundraisingData } = await supabase
        .from('fundraising')
        .select('*')
        .eq('city_id', cityId)
        .eq('status', 'active')
        .order('end_date', { ascending: true })
        .limit(3)

      if (fundraisingData) setFundraising(fundraisingData)
    } catch (error) {
      console.error('Error loading dashboard data:', error)
    }
  }

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto"></div>
          <p className="mt-4 text-gray-600">Loading dashboard...</p>
        </div>
      </div>
    )
  }

  if (!cityData) return null

  const progressPercentage = (cityData.current_amount / cityData.fundraising_goal) * 100

  return (
    <DashboardLayout citySlug={params.citySlug} cityName={cityData.name}>
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        {/* Welcome Header */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-2">
            Welcome to {cityData.name}
          </h1>
          <p className="text-gray-600">{cityData.description}</p>
        </div>

        {/* Stats Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.1 }}
            className="bg-white rounded-lg shadow p-6"
          >
            <div className="flex items-center">
              <div className="p-2 bg-blue-100 rounded-lg">
                <Calendar className="w-6 h-6 text-blue-600" />
              </div>
              <div className="ml-4">
                <p className="text-sm font-medium text-gray-600">Upcoming Events</p>
                <p className="text-2xl font-bold text-gray-900">{events.length}</p>
              </div>
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="bg-white rounded-lg shadow p-6"
          >
            <div className="flex items-center">
              <div className="p-2 bg-green-100 rounded-lg">
                <DollarSign className="w-6 h-6 text-green-600" />
              </div>
              <div className="ml-4">
                <p className="text-sm font-medium text-gray-600">Fundraising Goal</p>
                <p className="text-2xl font-bold text-gray-900">
                  ${cityData.fundraising_goal.toLocaleString()}
                </p>
              </div>
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.3 }}
            className="bg-white rounded-lg shadow p-6"
          >
            <div className="flex items-center">
              <div className="p-2 bg-purple-100 rounded-lg">
                <Users className="w-6 h-6 text-purple-600" />
              </div>
              <div className="ml-4">
                <p className="text-sm font-medium text-gray-600">Active Campaigns</p>
                <p className="text-2xl font-bold text-gray-900">{fundraising.length}</p>
              </div>
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.4 }}
            className="bg-white rounded-lg shadow p-6"
          >
            <div className="flex items-center">
              <div className="p-2 bg-orange-100 rounded-lg">
                <TrendingUp className="w-6 h-6 text-orange-600" />
              </div>
              <div className="ml-4">
                <p className="text-sm font-medium text-gray-600">Progress</p>
                <p className="text-2xl font-bold text-gray-900">{progressPercentage.toFixed(1)}%</p>
              </div>
            </div>
          </motion.div>
        </div>

        {/* Fundraising Progress */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.5 }}
          className="bg-white rounded-lg shadow p-6 mb-8"
        >
          <h2 className="text-xl font-semibold text-gray-900 mb-4">Fundraising Progress</h2>
          <div className="mb-4">
            <div className="flex justify-between text-sm text-gray-600 mb-2">
              <span>Raised: ${cityData.current_amount.toLocaleString()}</span>
              <span>Goal: ${cityData.fundraising_goal.toLocaleString()}</span>
            </div>
            <div className="w-full bg-gray-200 rounded-full h-3">
              <div
                className="bg-blue-600 h-3 rounded-full transition-all duration-500"
                style={{ width: `${Math.min(progressPercentage, 100)}%` }}
              ></div>
            </div>
          </div>
          <Link
            href={`/dashboard/${params.citySlug}/fundraising`}
            className="text-blue-600 hover:text-blue-800 text-sm font-medium"
          >
            View all campaigns →
          </Link>
        </motion.div>

        {/* Quick Actions */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {/* Upcoming Events */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5, delay: 0.6 }}
            className="bg-white rounded-lg shadow p-6"
          >
            <h3 className="text-lg font-semibold text-gray-900 mb-4">Upcoming Events</h3>
            {events.length > 0 ? (
              <div className="space-y-3">
                {events.slice(0, 3).map((event) => (
                  <div key={event.id} className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                    <div>
                      <p className="font-medium text-gray-900">{event.title}</p>
                      <p className="text-sm text-gray-600">{event.date} at {event.time}</p>
                    </div>
                    <span className="text-xs bg-blue-100 text-blue-800 px-2 py-1 rounded-full">
                      {event.status}
                    </span>
                  </div>
                ))}
              </div>
            ) : (
              <p className="text-gray-500 text-center py-4">No upcoming events</p>
            )}
            <Link
              href={`/dashboard/${params.citySlug}/events`}
              className="mt-4 inline-block text-blue-600 hover:text-blue-800 text-sm font-medium"
            >
              View all events →
            </Link>
          </motion.div>

          {/* Active Fundraising */}
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5, delay: 0.7 }}
            className="bg-white rounded-lg shadow p-6"
          >
            <h3 className="text-lg font-semibold text-gray-900 mb-4">Active Fundraising</h3>
            {fundraising.length > 0 ? (
              <div className="space-y-3">
                {fundraising.map((campaign) => (
                  <div key={campaign.id} className="p-3 bg-gray-50 rounded-lg">
                    <p className="font-medium text-gray-900">{campaign.title}</p>
                    <div className="flex justify-between items-center mt-2">
                      <span className="text-sm text-gray-600">
                        ${campaign.amount.toLocaleString()} / ${campaign.goal.toLocaleString()}
                      </span>
                      <span className="text-xs bg-green-100 text-green-800 px-2 py-1 rounded-full">
                        {campaign.status}
                      </span>
                    </div>
                  </div>
                ))}
              </div>
            ) : (
              <p className="text-gray-500 text-center py-4">No active campaigns</p>
            )}
            <Link
              href={`/dashboard/${params.citySlug}/fundraising`}
              className="mt-4 inline-block text-blue-600 hover:text-blue-800 text-sm font-medium"
            >
              View all campaigns →
            </Link>
          </motion.div>
        </div>
      </motion.div>
    </DashboardLayout>
  )
}
