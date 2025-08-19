'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import { motion } from 'framer-motion'
import { Shield, CheckCircle, AlertCircle } from 'lucide-react'
import { supabase } from '@/lib/supabase'

interface OnboardingPageProps {
  params: {
    citySlug: string
  }
}

export default function OnboardingPage({ params }: OnboardingPageProps) {
  const router = useRouter()
  const [loading, setLoading] = useState(false)
  const [agreed, setAgreed] = useState(false)
  const [error, setError] = useState('')

  const handleAgreement = async () => {
    if (!agreed) return

    setLoading(true)
    setError('')

    try {
      // Get current user
      const { data: { user }, error: userError } = await supabase.auth.getUser()
      if (userError || !user) {
        setError('Please sign in to continue')
        setLoading(false)
        return
      }

      // Get city ID
      const { data: city, error: cityError } = await supabase
        .from('cities')
        .select('id')
        .eq('slug', params.citySlug)
        .single()

      if (cityError || !city) {
        setError('City not found')
        setLoading(false)
        return
      }

      // Insert governance agreement
      const { error: governanceError } = await supabase
        .from('governance')
        .upsert({
          user_id: user.id,
          city_id: city.id,
          agreement: true,
          agreed_at: new Date().toISOString()
        })

      if (governanceError) {
        setError('Failed to save agreement. Please try again.')
        setLoading(false)
        return
      }

      // Redirect to dashboard
      router.push(`/dashboard/${params.citySlug}`)
    } catch (error) {
      console.error('Error saving agreement:', error)
      setError('An unexpected error occurred. Please try again.')
      setLoading(false)
    }
  }

  return (
    <div className="min-h-screen bg-gray-50 flex items-center justify-center py-12 px-4 sm:px-6 lg:px-8">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="max-w-md w-full space-y-8"
      >
        <div className="text-center">
          <motion.div
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="mx-auto h-16 w-16 bg-blue-100 rounded-full flex items-center justify-center"
          >
            <Shield className="h-8 w-8 text-blue-600" />
          </motion.div>
          <motion.h2
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.5, delay: 0.3 }}
            className="mt-6 text-3xl font-bold text-gray-900"
          >
            Welcome to BEAM BAND
          </motion.h2>
          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.5, delay: 0.4 }}
            className="mt-2 text-sm text-gray-600"
          >
            {params.citySlug.charAt(0).toUpperCase() + params.citySlug.slice(1)} Chapter
          </motion.p>
        </div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.5 }}
          className="bg-white py-8 px-6 shadow rounded-lg"
        >
          <div className="space-y-6">
            <div>
              <h3 className="text-lg font-medium text-gray-900 mb-4">
                Governance Agreement Required
              </h3>
              <p className="text-sm text-gray-600 mb-4">
                Before you can access the dashboard, you must read and agree to our governance principles.
              </p>
            </div>

            {/* Governance Principles */}
            <div className="space-y-4">
              <h4 className="font-medium text-gray-900">Our Core Principles:</h4>
              <div className="space-y-3">
                <div className="flex items-start space-x-3">
                  <CheckCircle className="h-5 w-5 text-green-500 mt-0.5 flex-shrink-0" />
                  <div>
                    <p className="text-sm font-medium text-gray-900">Community First</p>
                    <p className="text-xs text-gray-600">We prioritize the well-being and growth of our local music communities.</p>
                  </div>
                </div>
                <div className="flex items-start space-x-3">
                  <CheckCircle className="h-5 w-5 text-green-500 mt-0.5 flex-shrink-0" />
                  <div>
                    <p className="text-sm font-medium text-gray-900">Transparency</p>
                    <p className="text-xs text-gray-600">All decisions and financial matters are conducted with full transparency.</p>
                  </div>
                </div>
                <div className="flex items-start space-x-3">
                  <CheckCircle className="h-5 w-5 text-green-500 mt-0.5 flex-shrink-0" />
                  <div>
                    <p className="text-sm font-medium text-gray-900">Inclusive Participation</p>
                    <p className="text-xs text-gray-600">Every member has a voice in shaping our community's future.</p>
                  </div>
                </div>
                <div className="flex items-start space-x-3">
                  <CheckCircle className="h-5 w-5 text-green-500 mt-0.5 flex-shrink-0" />
                  <div>
                    <p className="text-sm font-medium text-gray-900">Sustainable Growth</p>
                    <p className="text-xs text-gray-600">We build lasting foundations for long-term community success.</p>
                  </div>
                </div>
              </div>
            </div>

            {/* Agreement Checkbox */}
            <div className="flex items-start space-x-3">
              <input
                id="agreement"
                name="agreement"
                type="checkbox"
                checked={agreed}
                onChange={(e) => setAgreed(e.target.checked)}
                className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded mt-1"
              />
              <label htmlFor="agreement" className="text-sm text-gray-700">
                I have read and agree to the governance principles outlined above. I understand that this agreement is required to participate in BEAM BAND activities and access the dashboard.
              </label>
            </div>

            {/* Error Message */}
            {error && (
              <motion.div
                initial={{ opacity: 0, y: -10 }}
                animate={{ opacity: 1, y: 0 }}
                className="flex items-center space-x-2 text-red-600 text-sm"
              >
                <AlertCircle className="h-4 w-4" />
                <span>{error}</span>
              </motion.div>
            )}

            {/* Submit Button */}
            <button
              onClick={handleAgreement}
              disabled={!agreed || loading}
              className={`w-full flex justify-center py-3 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white ${
                agreed && !loading
                  ? 'bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500'
                  : 'bg-gray-300 cursor-not-allowed'
              } transition-colors duration-200`}
            >
              {loading ? (
                <div className="flex items-center space-x-2">
                  <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white"></div>
                  <span>Processing...</span>
                </div>
              ) : (
                'Continue to Dashboard'
              )}
            </button>
          </div>
        </motion.div>

        {/* Footer */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.5, delay: 0.6 }}
          className="text-center"
        >
          <p className="text-xs text-gray-500">
            By agreeing, you acknowledge that you have read and understood our governance principles.
          </p>
        </motion.div>
      </motion.div>
    </div>
  )
}
