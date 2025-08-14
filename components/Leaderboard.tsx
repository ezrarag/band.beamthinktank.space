'use client'

import { motion } from 'framer-motion'
import { Trophy, Medal, Award, Crown, Heart } from 'lucide-react'

interface LeaderboardEntry {
  id: string
  name: string
  amount: number
  rank: number
  city: string
  avatar?: string
  isAnonymous: boolean
}

interface LeaderboardProps {
  entries: LeaderboardEntry[]
  cityName: string
}

const getRankIcon = (rank: number) => {
  switch (rank) {
    case 1:
      return <Crown className="w-5 h-5 text-yellow-500" />
    case 2:
      return <Trophy className="w-5 h-5 text-gray-400" />
    case 3:
      return <Medal className="w-5 h-5 text-amber-600" />
    default:
      return <Award className="w-5 h-5 text-gray-400" />
  }
}

const getRankColor = (rank: number) => {
  switch (rank) {
    case 1:
      return 'bg-gradient-to-r from-yellow-400 to-yellow-600'
    case 2:
      return 'bg-gradient-to-r from-gray-300 to-gray-500'
    case 3:
      return 'bg-gradient-to-r from-amber-500 to-amber-700'
    default:
      return 'bg-gray-100'
  }
}

export default function Leaderboard({ entries, cityName }: LeaderboardProps) {
  return (
    <div className="card">
      <div className="text-center mb-6">
        <h3 className="text-2xl font-bold text-gray-900 mb-2">
          Top Supporters
        </h3>
        <p className="text-gray-600">
          The amazing people making a difference in {cityName}
        </p>
      </div>

      <div className="space-y-3">
        {entries.map((entry, index) => (
          <motion.div
            key={entry.id}
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5, delay: index * 0.1 }}
            className="flex items-center space-x-4 p-4 rounded-lg hover:bg-gray-50 transition-colors"
          >
            {/* Rank */}
            <div className={`w-10 h-10 rounded-full ${getRankColor(entry.rank)} flex items-center justify-center text-white font-bold text-lg`}>
              {entry.rank}
            </div>

            {/* Avatar */}
            <div className="w-12 h-12 bg-gradient-to-br from-beam-400 to-beam-600 rounded-full flex items-center justify-center">
              {entry.isAnonymous ? (
                <Heart className="w-6 h-6 text-white" />
              ) : (
                <span className="text-white font-bold text-lg">
                  {entry.name.charAt(0).toUpperCase()}
                </span>
              )}
            </div>

            {/* Name and City */}
            <div className="flex-1">
              <div className="font-semibold text-gray-900">
                {entry.isAnonymous ? 'Anonymous Supporter' : entry.name}
              </div>
              <div className="text-sm text-gray-500">{entry.city}</div>
            </div>

            {/* Amount */}
            <div className="text-right">
              <div className="font-bold text-xl text-green-600">
                ${entry.amount.toLocaleString()}
              </div>
              <div className="text-sm text-gray-500">donated</div>
            </div>

            {/* Rank Icon */}
            <div className="text-gray-400">
              {getRankIcon(entry.rank)}
            </div>
          </motion.div>
        ))}
      </div>

      {entries.length === 0 && (
        <div className="text-center py-8 text-gray-500">
          <Heart className="w-12 h-12 mx-auto mb-4 text-gray-300" />
          <p>No donations yet. Be the first to support this cause!</p>
        </div>
      )}
    </div>
  )
}
