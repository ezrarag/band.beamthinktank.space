'use client'

import { useEffect, useState } from 'react'
import { motion } from 'framer-motion'
import { User, Mail, Phone, MapPin, Calendar, Edit, Save, X, Bell, Shield, Activity } from 'lucide-react'
import { supabase } from '@/lib/supabase'
import DashboardLayout from '@/components/DashboardLayout'

interface ProfilePageProps {
  params: {
    citySlug: string
  }
}

interface UserProfile {
  id: string
  email: string
  full_name: string
  city_id: string
  avatar_url?: string
  phone?: string
  bio?: string
  created_at: string
  updated_at: string
}

interface ActivityItem {
  id: string
  type: 'event_attended' | 'donation_made' | 'vote_cast' | 'profile_updated'
  title: string
  description: string
  timestamp: string
  metadata?: any
}

export default function ProfilePage({ params }: ProfilePageProps) {
  const [profile, setProfile] = useState<UserProfile | null>(null)
  const [loading, setLoading] = useState(true)
  const [cityName, setCityName] = useState('')
  const [editing, setEditing] = useState(false)
  const [activities, setActivities] = useState<ActivityItem[]>([])
  const [formData, setFormData] = useState({
    full_name: '',
    phone: '',
    bio: ''
  })

  useEffect(() => {
    loadProfileData()
  }, [params.citySlug])

  const loadProfileData = async () => {
    try {
      // Get city data first
      const { data: city } = await supabase
        .from('cities')
        .select('name')
        .eq('slug', params.citySlug)
        .single()

      if (city) setCityName(city.name)

      // Get current user
      const { data: { user }, error: userError } = await supabase.auth.getUser()
      if (userError || !user) {
        console.error('User not authenticated')
        return
      }

      // Get user profile
      const { data: profileData, error: profileError } = await supabase
        .from('users')
        .select('*')
        .eq('id', user.id)
        .single()

      if (profileError) {
        // Create profile if it doesn't exist
        const { data: newProfile, error: createError } = await supabase
          .from('users')
          .insert({
            id: user.id,
            email: user.email,
            full_name: user.user_metadata?.full_name || 'Participant',
            city_id: params.citySlug
          })
          .select()
          .single()

        if (createError) throw createError
        setProfile(newProfile)
        setFormData({
          full_name: newProfile.full_name,
          phone: newProfile.phone || '',
          bio: newProfile.bio || ''
        })
      } else {
        setProfile(profileData)
        setFormData({
          full_name: profileData.full_name,
          phone: profileData.phone || '',
          bio: profileData.bio || ''
        })
      }

      // Mock activity data
      const mockActivities: ActivityItem[] = [
        {
          id: '1',
          type: 'event_attended',
          title: 'Attended Spring Music Festival',
          description: 'You participated in the community music festival',
          timestamp: '2024-03-15T18:00:00Z',
          metadata: { event_name: 'Spring Music Festival' }
        },
        {
          id: '2',
          type: 'donation_made',
          title: 'Donated to Community Space Fund',
          description: 'You contributed $50 to the new rehearsal space initiative',
          timestamp: '2024-03-10T14:30:00Z',
          metadata: { amount: 50, campaign: 'Community Space Fund' }
        },
        {
          id: '3',
          type: 'vote_cast',
          title: 'Voted on Event Funding Policy',
          description: 'You participated in the community vote on funding guidelines',
          timestamp: '2024-03-05T10:15:00Z',
          metadata: { vote: 'yes', proposal: 'Event Funding Policy' }
        },
        {
          id: '4',
          type: 'profile_updated',
          title: 'Profile Updated',
          description: 'You updated your profile information',
          timestamp: '2024-03-01T16:45:00Z'
        }
      ]

      setActivities(mockActivities)
      setLoading(false)
    } catch (error) {
      console.error('Error loading profile data:', error)
      setLoading(false)
    }
  }

  const handleSave = async () => {
    if (!profile) return

    setLoading(true)
    try {
      const { error } = await supabase
        .from('users')
        .update({
          full_name: formData.full_name,
          phone: formData.phone,
          bio: formData.bio,
          updated_at: new Date().toISOString()
        })
        .eq('id', profile.id)

      if (error) throw error

      setProfile(prev => prev ? { ...prev, ...formData } : null)
      setEditing(false)
    } catch (error) {
      console.error('Error updating profile:', error)
    } finally {
      setLoading(false)
    }
  }

  const handleCancel = () => {
    setFormData({
      full_name: profile?.full_name || '',
      phone: profile?.phone || '',
      bio: profile?.bio || ''
    })
    setEditing(false)
  }

  const getActivityIcon = (type: string) => {
    switch (type) {
      case 'event_attended':
        return <Calendar className="w-4 h-4 text-blue-600" />
      case 'donation_made':
        return <Activity className="w-4 h-4 text-green-600" />
      case 'vote_cast':
        return <Shield className="w-4 h-4 text-purple-600" />
      case 'profile_updated':
        return <User className="w-4 h-4 text-gray-600" />
      default:
        return <Activity className="w-4 h-4 text-gray-600" />
    }
  }

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      month: 'short',
      day: 'numeric',
      year: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    })
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

  if (!profile) return null

  return (
    <DashboardLayout citySlug={params.citySlug} cityName={cityName}>
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-2">Profile</h1>
          <p className="text-gray-600">Manage your account and view your activity</p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Profile Card */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5, delay: 0.1 }}
            className="lg:col-span-1"
          >
            <div className="bg-white rounded-lg shadow p-6">
              <div className="text-center mb-6">
                <div className="w-24 h-24 bg-gradient-to-br from-blue-400 to-purple-500 rounded-full mx-auto mb-4 flex items-center justify-center">
                  {profile.avatar_url ? (
                    <img
                      src={profile.avatar_url}
                      alt={profile.full_name}
                      className="w-24 h-24 rounded-full object-cover"
                    />
                  ) : (
                    <User className="w-12 h-12 text-white" />
                  )}
                </div>
                <h2 className="text-xl font-semibold text-gray-900">{profile.full_name}</h2>
                <p className="text-gray-500">Member since {formatDate(profile.created_at)}</p>
              </div>

              {/* Profile Actions */}
              <div className="space-y-3">
                <button
                  onClick={() => setEditing(true)}
                  className="w-full bg-blue-600 text-white px-4 py-2 rounded-md hover:bg-blue-700 transition-colors text-sm font-medium flex items-center justify-center"
                >
                  <Edit className="w-4 h-4 mr-2" />
                  Edit Profile
                </button>
                <button className="w-full border border-gray-300 text-gray-700 px-4 py-2 rounded-md hover:bg-gray-50 transition-colors text-sm font-medium flex items-center justify-center">
                  <Bell className="w-4 h-4 mr-2" />
                  Notification Settings
                </button>
              </div>
            </div>
          </motion.div>

          {/* Profile Details & Activity */}
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="lg:col-span-2 space-y-6"
          >
            {/* Profile Information */}
            <div className="bg-white rounded-lg shadow p-6">
              <div className="flex items-center justify-between mb-6">
                <h3 className="text-lg font-semibold text-gray-900">Profile Information</h3>
                {editing && (
                  <div className="flex space-x-2">
                    <button
                      onClick={handleSave}
                      disabled={loading}
                      className="bg-green-600 text-white px-3 py-1 rounded-md hover:bg-green-700 transition-colors text-sm font-medium flex items-center"
                    >
                      <Save className="w-4 h-4 mr-1" />
                      Save
                    </button>
                    <button
                      onClick={handleCancel}
                      className="bg-gray-600 text-white px-3 py-1 rounded-md hover:bg-gray-700 transition-colors text-sm font-medium flex items-center"
                    >
                      <X className="w-4 h-4 mr-1" />
                      Cancel
                    </button>
                  </div>
                )}
              </div>

              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Full Name</label>
                  {editing ? (
                    <input
                      type="text"
                      value={formData.full_name}
                      onChange={(e) => setFormData(prev => ({ ...prev, full_name: e.target.value }))}
                      className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    />
                  ) : (
                    <div className="flex items-center text-gray-900">
                      <User className="w-4 h-4 mr-2 text-gray-400" />
                      {profile.full_name}
                    </div>
                  )}
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Email</label>
                  <div className="flex items-center text-gray-900">
                    <Mail className="w-4 h-4 mr-2 text-gray-400" />
                    {profile.email}
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Phone</label>
                  {editing ? (
                    <input
                      type="tel"
                      value={formData.phone}
                      onChange={(e) => setFormData(prev => ({ ...prev, phone: e.target.value }))}
                      className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    />
                  ) : (
                    <div className="flex items-center text-gray-900">
                      <Phone className="w-4 h-4 mr-2 text-gray-400" />
                      {profile.phone || 'Not provided'}
                    </div>
                  )}
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">City</label>
                  <div className="flex items-center text-gray-900">
                    <MapPin className="w-4 h-4 mr-2 text-gray-400" />
                    {cityName}
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Bio</label>
                  {editing ? (
                    <textarea
                      value={formData.bio}
                      onChange={(e) => setFormData(prev => ({ ...prev, bio: e.target.value }))}
                      rows={3}
                      className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                      placeholder="Tell us about yourself..."
                    />
                  ) : (
                    <p className="text-gray-900">
                      {profile.bio || 'No bio provided'}
                    </p>
                  )}
                </div>
              </div>
            </div>

            {/* Recent Activity */}
            <div className="bg-white rounded-lg shadow p-6">
              <h3 className="text-lg font-semibold text-gray-900 mb-6">Recent Activity</h3>
              
              {activities.length > 0 ? (
                <div className="space-y-4">
                  {activities.map((activity) => (
                    <div key={activity.id} className="flex items-start space-x-3 p-3 bg-gray-50 rounded-lg">
                      <div className="mt-1">
                        {getActivityIcon(activity.type)}
                      </div>
                      <div className="flex-1">
                        <h4 className="font-medium text-gray-900">{activity.title}</h4>
                        <p className="text-sm text-gray-600">{activity.description}</p>
                        <p className="text-xs text-gray-500 mt-1">{formatDate(activity.timestamp)}</p>
                      </div>
                    </div>
                  ))}
                </div>
              ) : (
                <div className="text-center py-8">
                  <Activity className="w-16 h-16 text-gray-400 mx-auto mb-4" />
                  <p className="text-gray-600">No activity yet</p>
                  <p className="text-sm text-gray-500">Start participating in events and community activities</p>
                </div>
              )}
            </div>
          </motion.div>
        </div>
      </motion.div>
    </DashboardLayout>
  )
}
