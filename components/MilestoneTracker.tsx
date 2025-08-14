'use client'

import { motion } from 'framer-motion'
import { CheckCircle, Circle, Gift, Star, Target } from 'lucide-react'

interface Milestone {
  id: string
  amount: number
  title: string
  description: string
  benefits: string[]
  achieved: boolean
  achieved_at?: string
}

interface MilestoneTrackerProps {
  milestones: Milestone[]
  currentAmount: number
  goal: number
}

export default function MilestoneTracker({ milestones, currentAmount, goal }: MilestoneTrackerProps) {
  const sortedMilestones = [...milestones].sort((a, b) => a.amount - b.amount)
  
  const getMilestoneStatus = (milestone: Milestone) => {
    if (milestone.achieved) return 'achieved'
    if (currentAmount >= milestone.amount) return 'recently-achieved'
    return 'upcoming'
  }

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'achieved':
        return <CheckCircle className="w-6 h-6 text-green-500" />
      case 'recently-achieved':
        return <CheckCircle className="w-6 h-6 text-green-500 animate-pulse" />
      default:
        return <Circle className="w-6 h-6 text-gray-300" />
    }
  }

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'achieved':
        return 'border-green-500 bg-green-50'
      case 'recently-achieved':
        return 'border-green-500 bg-green-50'
      default:
        return 'border-gray-200 bg-white'
    }
  }

  return (
    <div className="card">
      <div className="text-center mb-8">
        <div className="w-16 h-16 bg-gradient-to-br from-beam-400 to-beam-600 rounded-full flex items-center justify-center mx-auto mb-4">
          <Target className="w-8 h-8 text-white" />
        </div>
        <h3 className="text-2xl font-bold text-gray-900 mb-2">
          Fundraising Milestones
        </h3>
        <p className="text-gray-600">
          Unlock community benefits as we reach our goals together
        </p>
      </div>

      <div className="space-y-6">
        {sortedMilestones.map((milestone, index) => {
          const status = getMilestoneStatus(milestone)
          const isLast = index === sortedMilestones.length - 1
          
          return (
            <motion.div
              key={milestone.id}
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              className="relative"
            >
              {/* Connection Line */}
              {!isLast && (
                <div className="absolute left-6 top-12 w-0.5 h-16 bg-gray-200"></div>
              )}

              <div className={`relative border-2 rounded-lg p-6 ${getStatusColor(status)} transition-all duration-300`}>
                {/* Milestone Header */}
                <div className="flex items-start space-x-4">
                  <div className="flex-shrink-0">
                    {getStatusIcon(status)}
                  </div>
                  
                  <div className="flex-1">
                    <div className="flex items-center justify-between mb-2">
                      <h4 className="text-lg font-bold text-gray-900">
                        ${milestone.amount.toLocaleString()}
                      </h4>
                      <span className={`px-3 py-1 rounded-full text-sm font-medium ${
                        status === 'achieved' || status === 'recently-achieved'
                          ? 'bg-green-100 text-green-800'
                          : 'bg-gray-100 text-gray-600'
                      }`}>
                        {milestone.achieved ? 'Achieved!' : 'Upcoming'}
                      </span>
                    </div>
                    
                    <h5 className="text-xl font-semibold text-gray-800 mb-2">
                      {milestone.title}
                    </h5>
                    
                    <p className="text-gray-600 mb-4">
                      {milestone.description}
                    </p>

                    {/* Benefits */}
                    <div className="space-y-2">
                      <div className="flex items-center space-x-2 text-sm font-medium text-gray-700">
                        <Gift className="w-4 h-4 text-beam-500" />
                        <span>Community Benefits:</span>
                      </div>
                      <ul className="space-y-1 ml-6">
                        {milestone.benefits.map((benefit, benefitIndex) => (
                          <li key={benefitIndex} className="flex items-center space-x-2 text-sm text-gray-600">
                            <Star className="w-3 h-3 text-yellow-500" />
                            <span>{benefit}</span>
                          </li>
                        ))}
                      </ul>
                    </div>

                    {/* Achievement Date */}
                    {milestone.achieved && milestone.achieved_at && (
                      <div className="mt-4 pt-4 border-t border-gray-200">
                        <p className="text-sm text-gray-500">
                          Achieved on {new Date(milestone.achieved_at).toLocaleDateString()}
                        </p>
                      </div>
                    )}
                  </div>
                </div>
              </div>
            </motion.div>
          )
        })}
      </div>

      {/* Final Goal */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.5 }}
        className="mt-8 text-center"
      >
        <div className="inline-flex items-center space-x-2 bg-gradient-to-r from-beam-500 to-orange-500 text-white px-6 py-3 rounded-full">
          <Target className="w-5 h-5" />
          <span className="font-semibold">Final Goal: ${goal.toLocaleString()}</span>
        </div>
      </motion.div>
    </div>
  )
}
