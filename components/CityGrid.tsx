'use client'

import { motion } from 'framer-motion'
import Link from 'next/link'
import { MapPin, Users, DollarSign } from 'lucide-react'

const cities = [
  {
    name: 'Orlando',
    slug: 'orlando',
    state: 'FL',
    description: 'The City Beautiful - Where music meets magic',
    image: '/api/placeholder/400/300',
    fundraisingGoal: 50000,
    currentAmount: 32000,
    color: 'city-orlando',
    events: 8,
    supporters: 156
  },
  {
    name: 'Nashville',
    slug: 'nashville',
    state: 'TN',
    description: 'Music City - The heart of country music',
    image: '/api/placeholder/400/300',
    fundraisingGoal: 75000,
    currentAmount: 68000,
    color: 'city-nashville',
    events: 12,
    supporters: 234
  },
  {
    name: 'Atlanta',
    slug: 'atlanta',
    state: 'GA',
    description: 'The Big Peach - Southern hospitality meets urban culture',
    image: '/api/placeholder/400/300',
    fundraisingGoal: 60000,
    currentAmount: 45000,
    color: 'city-atlanta',
    events: 10,
    supporters: 189
  },
  {
    name: 'Augusta',
    slug: 'augusta',
    state: 'GA',
    description: 'The Garden City - Rich in history and community spirit',
    image: '/api/placeholder/400/300',
    fundraisingGoal: 40000,
    currentAmount: 28000,
    color: 'city-augusta',
    events: 6,
    supporters: 98
  },
  {
    name: 'Knoxville',
    slug: 'knoxville',
    state: 'TN',
    description: 'The Marble City - Gateway to the Great Smoky Mountains',
    image: '/api/placeholder/400/300',
    fundraisingGoal: 35000,
    currentAmount: 22000,
    color: 'city-knoxville',
    events: 5,
    supporters: 76
  },
  {
    name: 'Tampa',
    slug: 'tampa',
    state: 'FL',
    description: 'The Big Guava - Sunshine, beaches, and great vibes',
    image: '/api/placeholder/400/300',
    fundraisingGoal: 55000,
    currentAmount: 38000,
    color: 'city-tampa',
    events: 9,
    supporters: 145
  },
  {
    name: 'Jackson',
    slug: 'jackson',
    state: 'MS',
    description: 'The Crossroads of the South - Where cultures converge',
    image: '/api/placeholder/400/300',
    fundraisingGoal: 30000,
    currentAmount: 18000,
    color: 'city-jackson',
    events: 4,
    supporters: 67
  },
  {
    name: 'Virginia',
    slug: 'virginia',
    state: 'VA',
    description: 'The Old Dominion - Rich in American heritage',
    image: '/api/placeholder/400/300',
    fundraisingGoal: 45000,
    currentAmount: 32000,
    color: 'city-virginia',
    events: 7,
    supporters: 112
  },
  {
    name: 'Los Angeles',
    slug: 'los-angeles',
    state: 'CA',
    description: 'The City of Angels - Entertainment capital of the world',
    image: '/api/placeholder/400/300',
    fundraisingGoal: 100000,
    currentAmount: 85000,
    color: 'city-losangeles',
    events: 15,
    supporters: 298
  }
]

export default function CityGrid() {
  return (
    <section className="py-20 bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
            Choose Your City
          </h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Each city has its own unique community, events, and fundraising goals. 
            Find your local BEAM Band chapter and get involved!
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {cities.map((city, index) => {
            const progress = (city.currentAmount / city.fundraisingGoal) * 100
            const progressColor = progress >= 80 ? 'bg-green-500' : progress >= 60 ? 'bg-yellow-500' : 'bg-red-500'
            
            return (
              <motion.div
                key={city.slug}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: index * 0.1 }}
                viewport={{ once: true }}
                whileHover={{ y: -8 }}
                className="group"
              >
                <Link href={`/city/${city.slug}`}>
                  <div className="card hover:shadow-2xl transition-all duration-300 cursor-pointer">
                    {/* City Header */}
                    <div className="flex items-center justify-between mb-4">
                      <div className="flex items-center space-x-3">
                        <div className={`w-4 h-4 rounded-full bg-${city.color}`}></div>
                        <div>
                          <h3 className="text-xl font-bold text-gray-900">{city.name}</h3>
                          <p className="text-sm text-gray-500">{city.state}</p>
                        </div>
                      </div>
                      <MapPin className="w-5 h-5 text-gray-400 group-hover:text-beam-500 transition-colors" />
                    </div>

                    {/* City Image Placeholder */}
                    <div className="w-full h-48 bg-gradient-to-br from-gray-200 to-gray-300 rounded-lg mb-4 flex items-center justify-center">
                      <span className="text-gray-500 text-sm">City Image</span>
                    </div>

                    {/* Description */}
                    <p className="text-gray-600 mb-4 line-clamp-2">{city.description}</p>

                    {/* Stats */}
                    <div className="flex items-center justify-between mb-4 text-sm text-gray-500">
                      <div className="flex items-center space-x-1">
                        <Users className="w-4 h-4" />
                        <span>{city.events} events</span>
                      </div>
                      <div className="flex items-center space-x-1">
                        <DollarSign className="w-4 h-4" />
                        <span>{city.supporters} supporters</span>
                      </div>
                    </div>

                    {/* Fundraising Progress */}
                    <div className="mb-4">
                      <div className="flex justify-between items-center mb-2">
                        <span className="text-sm font-medium text-gray-700">Fundraising Progress</span>
                        <span className="text-sm text-gray-500">
                          ${city.currentAmount.toLocaleString()} / ${city.fundraisingGoal.toLocaleString()}
                        </span>
                      </div>
                      <div className="w-full bg-gray-200 rounded-full h-2">
                        <div 
                          className={`h-2 rounded-full ${progressColor} transition-all duration-300`}
                          style={{ width: `${Math.min(progress, 100)}%` }}
                        ></div>
                      </div>
                      <div className="text-right mt-1">
                        <span className="text-xs text-gray-500">{Math.round(progress)}%</span>
                      </div>
                    </div>

                    {/* CTA Button */}
                    <div className="text-center">
                      <span className="inline-block bg-beam-50 text-beam-700 px-4 py-2 rounded-lg text-sm font-medium group-hover:bg-beam-100 transition-colors">
                        Explore {city.name}
                      </span>
                    </div>
                  </div>
                </Link>
              </motion.div>
            )
          })}
        </div>
      </div>
    </section>
  )
}
