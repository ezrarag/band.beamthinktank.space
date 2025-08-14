'use client'

import { useState } from 'react'
import { motion } from 'framer-motion'
import { Heart, DollarSign, MessageCircle, User, Eye, EyeOff } from 'lucide-react'
import { loadStripe } from '@stripe/stripe-js'
import { toast } from 'react-hot-toast'

const stripePromise = loadStripe(process.env.NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY!)

interface DonationFormProps {
  cityId: string
  cityName: string
  currentAmount: number
  goal: number
  onDonationSuccess: (amount: number) => void
}

const presetAmounts = [25, 50, 100, 250, 500, 1000]

export default function DonationForm({ cityId, cityName, currentAmount, goal, onDonationSuccess }: DonationFormProps) {
  const [amount, setAmount] = useState(100)
  const [customAmount, setCustomAmount] = useState('')
  const [donorName, setDonorName] = useState('')
  const [message, setMessage] = useState('')
  const [isAnonymous, setIsAnonymous] = useState(false)
  const [isLoading, setIsLoading] = useState(false)

  const handleAmountSelect = (presetAmount: number) => {
    setAmount(presetAmount)
    setCustomAmount('')
  }

  const handleCustomAmountChange = (value: string) => {
    setCustomAmount(value)
    if (value) {
      setAmount(parseFloat(value) || 0)
    }
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    
    if (!donorName.trim()) {
      toast.error('Please enter your name')
      return
    }

    if (amount <= 0) {
      toast.error('Please enter a valid amount')
      return
    }

    setIsLoading(true)

    try {
      // Create payment intent
      const response = await fetch('/api/create-payment-intent', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          amount,
          cityId,
          donorName: donorName.trim(),
        }),
      })

      if (!response.ok) {
        throw new Error('Failed to create payment intent')
      }

      const { clientSecret } = await response.json()

      // Redirect to Stripe Checkout
      const stripe = await stripePromise
      if (!stripe) {
        throw new Error('Stripe failed to load')
      }

      const { error } = await stripe.redirectToCheckout({
        mode: 'payment',
        lineItems: [{
          price_data: {
            currency: 'usd',
            product_data: {
              name: `Donation to ${cityName}`,
              description: message || `Supporting ${cityName} community initiatives`,
            },
            unit_amount: amount * 100,
          },
          quantity: 1,
        }],
        success_url: `${window.location.origin}/city/${cityId}?success=true&amount=${amount}`,
        cancel_url: `${window.location.origin}/city/${cityId}`,
        client_reference_id: cityId,
        metadata: {
          city_id: cityId,
          donor_name: donorName.trim(),
          message: message,
          anonymous: isAnonymous.toString(),
        },
      })

      if (error) {
        throw error
      }
    } catch (error) {
      console.error('Donation error:', error)
      toast.error('Something went wrong. Please try again.')
    } finally {
      setIsLoading(false)
    }
  }

  const progress = (currentAmount / goal) * 100
  const remaining = goal - currentAmount

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="card max-w-md mx-auto"
    >
      <div className="text-center mb-6">
        <div className="w-16 h-16 bg-red-100 rounded-full flex items-center justify-center mx-auto mb-4">
          <Heart className="w-8 h-8 text-red-600" />
        </div>
        <h3 className="text-2xl font-bold text-gray-900 mb-2">
          Support {cityName}
        </h3>
        <p className="text-gray-600">
          Help us reach our fundraising goal and make a difference in the community
        </p>
      </div>

      {/* Progress Bar */}
      <div className="mb-6">
        <div className="flex justify-between items-center mb-2">
          <span className="text-sm font-medium text-gray-700">Progress</span>
          <span className="text-sm text-gray-500">
            ${currentAmount.toLocaleString()} / ${goal.toLocaleString()}
          </span>
        </div>
        <div className="w-full bg-gray-200 rounded-full h-3">
          <div 
            className="bg-gradient-to-r from-beam-500 to-red-500 h-3 rounded-full transition-all duration-300"
            style={{ width: `${Math.min(progress, 100)}%` }}
          ></div>
        </div>
        <div className="text-right mt-1">
          <span className="text-xs text-gray-500">{Math.round(progress)}% complete</span>
        </div>
        {remaining > 0 && (
          <p className="text-sm text-gray-600 mt-2">
            <span className="font-medium">${remaining.toLocaleString()}</span> still needed
          </p>
        )}
      </div>

      <form onSubmit={handleSubmit} className="space-y-4">
        {/* Amount Selection */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-3">
            Select Amount
          </label>
          <div className="grid grid-cols-3 gap-2 mb-3">
            {presetAmounts.map((presetAmount) => (
              <button
                key={presetAmount}
                type="button"
                onClick={() => handleAmountSelect(presetAmount)}
                className={`p-3 rounded-lg border transition-colors ${
                  amount === presetAmount && !customAmount
                    ? 'border-beam-500 bg-beam-50 text-beam-700'
                    : 'border-gray-300 hover:border-gray-400'
                }`}
              >
                ${presetAmount}
              </button>
            ))}
          </div>
          <div className="relative">
            <DollarSign className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
            <input
              type="number"
              placeholder="Custom amount"
              value={customAmount}
              onChange={(e) => handleCustomAmountChange(e.target.value)}
              className="input-field pl-10"
              min="1"
              step="0.01"
            />
          </div>
        </div>

        {/* Donor Name */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Your Name
          </label>
          <div className="relative">
            <User className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
            <input
              type="text"
              value={donorName}
              onChange={(e) => setDonorName(e.target.value)}
              placeholder="Enter your name"
              className="input-field pl-10"
              required
            />
          </div>
        </div>

        {/* Message */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Message (Optional)
          </label>
          <div className="relative">
            <MessageCircle className="absolute left-3 top-3 w-5 h-5 text-gray-400" />
            <textarea
              value={message}
              onChange={(e) => setMessage(e.target.value)}
              placeholder="Share why you're supporting this cause..."
              rows={3}
              className="input-field pl-10 resize-none"
            />
          </div>
        </div>

        {/* Anonymous Option */}
        <div className="flex items-center space-x-2">
          <input
            type="checkbox"
            id="anonymous"
            checked={isAnonymous}
            onChange={(e) => setIsAnonymous(e.target.checked)}
            className="w-4 h-4 text-beam-600 border-gray-300 rounded focus:ring-beam-500"
          />
          <label htmlFor="anonymous" className="text-sm text-gray-700">
            Make this donation anonymous
          </label>
        </div>

        {/* Submit Button */}
        <button
          type="submit"
          disabled={isLoading || amount <= 0}
          className="w-full btn-primary py-3 text-lg disabled:opacity-50 disabled:cursor-not-allowed"
        >
          {isLoading ? 'Processing...' : `Donate $${amount}`}
        </button>
      </form>

      <div className="mt-6 text-center">
        <p className="text-xs text-gray-500">
          Your donation will be processed securely through Stripe
        </p>
      </div>
    </motion.div>
  )
}
