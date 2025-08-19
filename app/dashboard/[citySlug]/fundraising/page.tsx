'use client'

import { useEffect, useState } from 'react'
import { motion } from 'framer-motion'
import { DollarSign, Target, Calendar, Users, TrendingUp, Heart } from 'lucide-react'
import { supabase } from '@/lib/supabase'
import DashboardLayout from '@/components/DashboardLayout'

interface FundraisingPageProps {
  params: {
    citySlug: string
  }
}

interface Campaign {
  id: string
  title: string
  description: string
  amount: number
  goal: number
  status: 'active' | 'completed' | 'cancelled'
  end_date: string
  created_at: string
  donor_count?: number
}

export default function FundraisingPage({ params }: FundraisingPageProps) {
  const [campaigns, setCampaigns] = useState<Campaign[]>([])
  const [loading, setLoading] = useState(true)
  const [cityName, setCityName] = useState('')
  const [totalRaised, setTotalRaised] = useState(0)
  const [totalGoal, setTotalGoal] = useState(0)

  useEffect(() => {
    loadFundraisingData()
  }, [params.citySlug])

  const loadFundraisingData = async () => {
    try {
      // Get city data first
      const { data: city } = await supabase
        .from('cities')
        .select('name, fundraising_goal, current_amount')
        .eq('slug', params.citySlug)
        .single()

      if (city) {
        setCityName(city.name)
        setTotalGoal(city.fundraising_goal)
        setTotalRaised(city.current_amount)
      }

      // Get all fundraising campaigns for the city
      const { data: campaignsData, error } = await supabase
        .from('fundraising')
        .select('*')
        .eq('city_id', params.citySlug)
        .order('created_at', { ascending: false })

      if (error) throw error
      setCampaigns(campaignsData || [])
      setLoading(false)
    } catch (error) {
      console.error('Error loading fundraising data:', error)
      setLoading(false)
    }
  }

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      month: 'short',
      day: 'numeric',
      year: 'numeric'
    })
  }

  const getDaysRemaining = (endDate: string) => {
    const end = new Date(endDate)
    const now = new Date()
    const diffTime = end.getTime() - now.getTime()
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24))
    return diffDays > 0 ? diffDays : 0
  }

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'active':
        return 'bg-green-100 text-green-800'
      case 'completed':
        return 'bg-blue-100 text-blue-800'
      case 'cancelled':
        return 'bg-red-100 text-red-800'
      default:
        return 'bg-gray-100 text-gray-800'
    }
  }

  const getProgressColor = (percentage: number) => {
    if (percentage >= 100) return 'bg-green-500'
    if (percentage >= 75) return 'bg-blue-500'
    if (percentage >= 50) return 'bg-yellow-500'
    return 'bg-red-500'
  }

  if (loading) {
    return (
      <DashboardLayout citySlug={params.citySlug} cityName={cityName || 'Loading...'}>
        <div className="flex items-center justify-center h-64">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600"></div>
        </div>
      </DashboardLayout>
    )
  }

  const overallProgress = (totalRaised / totalGoal) * 100

  return (
    <DashboardLayout citySlug={params.citySlug} cityName={cityName}>
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-2">Fundraising</h1>
          <p className="text-gray-600">Support local music initiatives and community projects</p>
        </div>

        {/* Overall Progress Card */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.1 }}
          className="bg-gradient-to-r from-blue-600 to-purple-600 rounded-lg shadow-lg p-6 mb-8 text-white"
        >
          <div className="flex items-center justify-between mb-4">
            <div>
              <h2 className="text-2xl font-bold mb-2">Overall Progress</h2>
              <p className="text-blue-100">Help us reach our city-wide fundraising goal</p>
            </div>
            <TrendingUp className="w-12 h-12 text-blue-200" />
          </div>
          
          <div className="mb-4">
            <div className="flex justify-between text-sm mb-2">
              <span>Raised: ${totalRaised.toLocaleString()}</span>
              <span>Goal: ${totalGoal.toLocaleString()}</span>
            </div>
            <div className="w-full bg-blue-200 bg-opacity-30 rounded-full h-3">
              <div
                className={`h-3 rounded-full transition-all duration-500 ${getProgressColor(overallProgress)}`}
                style={{ width: `${Math.min(overallProgress, 100)}%` }}
              ></div>
            </div>
          </div>
          
          <p className="text-2xl font-bold">
            {overallProgress.toFixed(1)}% Complete
          </p>
        </motion.div>

        {/* Campaigns Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {campaigns.map((campaign, index) => {
            const progress = (campaign.amount / campaign.goal) * 100
            const daysRemaining = getDaysRemaining(campaign.end_date)
            
            return (
              <motion.div
                key={campaign.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.2 + index * 0.1 }}
                className="bg-white rounded-lg shadow overflow-hidden hover:shadow-lg transition-shadow duration-300"
              >
                {/* Campaign Header */}
                <div className="p-6 border-b border-gray-100">
                  <div className="flex items-start justify-between mb-3">
                    <h3 className="text-xl font-semibold text-gray-900 line-clamp-2">
                      {campaign.title}
                    </h3>
                    <span className={`px-3 py-1 rounded-full text-xs font-medium ${getStatusColor(campaign.status)}`}>
                      {campaign.status.charAt(0).toUpperCase() + campaign.status.slice(1)}
                    </span>
                  </div>
                  <p className="text-gray-600 text-sm line-clamp-2">
                    {campaign.description}
                  </p>
                </div>

                {/* Progress Section */}
                <div className="p-6">
                  <div className="mb-4">
                    <div className="flex justify-between text-sm text-gray-600 mb-2">
                      <span>Raised: ${campaign.amount.toLocaleString()}</span>
                      <span>Goal: ${campaign.goal.toLocaleString()}</span>
                    </div>
                    <div className="w-full bg-gray-200 rounded-full h-2">
                      <div
                        className={`h-2 rounded-full transition-all duration-500 ${getProgressColor(progress)}`}
                        style={{ width: `${Math.min(progress, 100)}%` }}
                      ></div>
                    </div>
                    <p className="text-right text-sm text-gray-500 mt-1">
                      {progress.toFixed(1)}% Complete
                    </p>
                  </div>

                  {/* Campaign Stats */}
                  <div className="grid grid-cols-3 gap-4 mb-6">
                    <div className="text-center">
                      <div className="text-2xl font-bold text-blue-600">
                        ${campaign.amount.toLocaleString()}
                      </div>
                      <div className="text-xs text-gray-500">Raised</div>
                    </div>
                    <div className="text-center">
                      <div className="text-2xl font-bold text-gray-900">
                        {campaign.donor_count || 0}
                      </div>
                      <div className="text-xs text-gray-500">Donors</div>
                    </div>
                    <div className="text-center">
                      <div className="text-2xl font-bold text-orange-600">
                        {daysRemaining}
                      </div>
                      <div className="text-xs text-gray-500">Days Left</div>
                    </div>
                  </div>

                  {/* Campaign Details */}
                  <div className="space-y-2 mb-6">
                    <div className="flex items-center text-sm text-gray-500">
                      <Calendar className="w-4 h-4 mr-2" />
                      Ends {formatDate(campaign.end_date)}
                    </div>
                    <div className="flex items-center text-sm text-gray-500">
                      <Target className="w-4 h-4 mr-2" />
                      Goal: ${campaign.goal.toLocaleString()}
                    </div>
                  </div>

                  {/* Action Buttons */}
                  <div className="flex space-x-3">
                    <button className="flex-1 bg-blue-600 text-white px-4 py-2 rounded-md hover:bg-blue-700 transition-colors text-sm font-medium">
                      Donate Now
                    </button>
                    <button className="px-4 py-2 border border-gray-300 text-gray-700 rounded-md hover:bg-gray-50 transition-colors text-sm font-medium">
                      Share
                    </button>
                  </div>
                </div>
              </motion.div>
            )
          })}
        </div>

        {/* Empty State */}
        {campaigns.length === 0 && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="text-center py-12"
          >
            <Heart className="w-16 h-16 text-gray-400 mx-auto mb-4" />
            <h3 className="text-lg font-medium text-gray-900 mb-2">No campaigns yet</h3>
            <p className="text-gray-600 mb-6">
              Be the first to start a fundraising campaign for your community
            </p>
            <button className="bg-blue-600 text-white px-6 py-3 rounded-md hover:bg-blue-700 transition-colors font-medium">
              Start a Campaign
            </button>
          </motion.div>
        )}

        {/* Campaign Count */}
        {campaigns.length > 0 && (
          <div className="mt-8 text-center text-sm text-gray-500">
            Showing {campaigns.length} fundraising campaign{campaigns.length !== 1 ? 's' : ''}
          </div>
        )}
      </motion.div>
    </DashboardLayout>
  )
}
