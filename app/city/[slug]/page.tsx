'use client'

import { useState, useEffect } from 'react'
import { useParams } from 'next/navigation'
import { motion } from 'framer-motion'
import { MapPin, Calendar, Users, DollarSign, Music, Heart } from 'lucide-react'
import Header from '@/components/Header'
import EventCard from '@/components/EventCard'
import DonationForm from '@/components/DonationForm'
import Leaderboard from '@/components/Leaderboard'
import MilestoneTracker from '@/components/MilestoneTracker'

// Mock data - in real app, this would come from Supabase
const cityData = {
  orlando: {
    name: 'Orlando',
    state: 'FL',
    description: 'The City Beautiful - Where music meets magic and community comes together to create unforgettable experiences.',
    image: '/api/placeholder/800/400',
    fundraisingGoal: 50000,
    currentAmount: 32000,
    color: 'city-orlando',
    coordinator: {
      name: 'Sarah Johnson',
      email: 'sarah@beamorlando.com',
      phone: '(407) 555-0123',
      bio: 'Local music enthusiast and community organizer with 10+ years of experience bringing people together through the power of music.',
      image: '/api/placeholder/200/200'
    }
  },
  nashville: {
    name: 'Nashville',
    state: 'TN',
    description: 'Music City - The heart of country music and southern hospitality, where every note tells a story of community and connection.',
    image: '/api/placeholder/800/400',
    fundraisingGoal: 75000,
    currentAmount: 68000,
    color: 'city-nashville',
    coordinator: {
      name: 'Mike Williams',
      email: 'mike@beamnashville.com',
      phone: '(615) 555-0456',
      bio: 'Nashville native and music industry veteran dedicated to fostering local talent and community engagement.',
      image: '/api/placeholder/200/200'
    }
  },
  atlanta: {
    name: 'Atlanta',
    state: 'GA',
    description: 'The Big Peach - Southern hospitality meets urban culture, creating a vibrant community where music bridges all divides.',
    image: '/api/placeholder/800/400',
    fundraisingGoal: 60000,
    currentAmount: 45000,
    color: 'city-atlanta',
    coordinator: {
      name: 'Lisa Chen',
      email: 'lisa@beamatlanta.com',
      phone: '(404) 555-0789',
      bio: 'Community advocate and music lover working to unite Atlanta through the universal language of music.',
      image: '/api/placeholder/200/200'
    }
  },
  augusta: {
    name: 'Augusta',
    state: 'GA',
    description: 'The Garden City - Rich in history and community spirit, where music grows like the beautiful gardens that give this city its name.',
    image: '/api/placeholder/800/400',
    fundraisingGoal: 40000,
    currentAmount: 28000,
    color: 'city-augusta',
    coordinator: {
      name: 'David Thompson',
      email: 'david@beamaugusta.com',
      phone: '(706) 555-0321',
      bio: 'Local historian and community organizer passionate about preserving Augusta\'s rich cultural heritage through music.',
      image: '/api/placeholder/200/200'
    }
  },
  knoxville: {
    name: 'Knoxville',
    state: 'TN',
    description: 'The Marble City - Gateway to the Great Smoky Mountains, where natural beauty inspires musical creativity and community harmony.',
    image: '/api/placeholder/800/400',
    fundraisingGoal: 35000,
    currentAmount: 22000,
    color: 'city-knoxville',
    coordinator: {
      name: 'Emily Davis',
      email: 'emily@beamknoxville.com',
      phone: '(865) 555-0654',
      bio: 'Environmental advocate and music educator dedicated to connecting Knoxville\'s natural beauty with its musical soul.',
      image: '/api/placeholder/200/200'
    }
  },
  tampa: {
    name: 'Tampa',
    state: 'FL',
    description: 'The Big Guava - Sunshine, beaches, and great vibes come together in this coastal city where music flows like the Gulf waters.',
    image: '/api/placeholder/800/400',
    fundraisingGoal: 55000,
    currentAmount: 38000,
    color: 'city-tampa',
    coordinator: {
      name: 'Carlos Rodriguez',
      email: 'carlos@beamtampa.com',
      phone: '(813) 555-0987',
      bio: 'Tampa Bay native and cultural ambassador working to showcase the city\'s diverse musical heritage and community spirit.',
      image: '/api/placeholder/200/200'
    }
  },
  jackson: {
    name: 'Jackson',
    state: 'MS',
    description: 'The Crossroads of the South - Where cultures converge and music creates bridges between communities, past and present.',
    image: '/api/placeholder/800/400',
    fundraisingGoal: 30000,
    currentAmount: 18000,
    color: 'city-jackson',
    coordinator: {
      name: 'Maria Johnson',
      email: 'maria@beamjackson.com',
      phone: '(601) 555-0543',
      bio: 'Cultural preservationist and community leader dedicated to celebrating Jackson\'s rich musical and cultural diversity.',
      image: '/api/placeholder/200/200'
    }
  },
  virginia: {
    name: 'Virginia',
    state: 'VA',
    description: 'The Old Dominion - Rich in American heritage and community values, where music honors tradition while building the future.',
    image: '/api/placeholder/800/400',
    fundraisingGoal: 45000,
    currentAmount: 32000,
    color: 'city-virginia',
    coordinator: {
      name: 'Robert Wilson',
      email: 'robert@beamvirginia.com',
      phone: '(804) 555-0765',
      bio: 'Historian and community organizer working to preserve Virginia\'s musical heritage while fostering new community connections.',
      image: '/api/placeholder/200/200'
    }
  },
  'los-angeles': {
    name: 'Los Angeles',
    state: 'CA',
    description: 'The City of Angels - Entertainment capital of the world, where dreams come true and music creates global community connections.',
    image: '/api/placeholder/800/400',
    fundraisingGoal: 100000,
    currentAmount: 85000,
    color: 'city-losangeles',
    coordinator: {
      name: 'Jennifer Martinez',
      email: 'jennifer@beamla.com',
      phone: '(213) 555-0890',
      bio: 'Entertainment industry professional and community advocate working to make LA\'s music scene accessible to all communities.',
      image: '/api/placeholder/200/200'
    }
  }
}

const mockEvents = [
  {
    id: '1',
    title: 'Summer Music Festival',
    description: 'A day-long celebration of local music featuring multiple bands, food vendors, and community activities.',
    date: '2024-07-15',
    time: '2:00 PM',
    venue: 'Central Park',
    address: '123 Main St, Downtown',
    ticket_price: 25,
    image_url: '/api/placeholder/400/300',
    status: 'upcoming' as const,
    city_name: 'Orlando',
    city_color: 'city-orlando'
  },
  {
    id: '2',
    title: 'Acoustic Night',
    description: 'Intimate acoustic performances in a cozy setting with local singer-songwriters.',
    date: '2024-06-28',
    time: '7:00 PM',
    venue: 'The Listening Room',
    address: '456 Oak Ave, Arts District',
    ticket_price: 15,
    image_url: '/api/placeholder/400/300',
    status: 'upcoming' as const,
    city_name: 'Orlando',
    city_color: 'city-orlando'
  }
]

const mockMilestones = [
  {
    id: '1',
    amount: 10000,
    title: 'Community Kickoff',
    description: 'Initial milestone to establish our presence and begin community outreach programs.',
    benefits: ['Monthly community meetups', 'Local artist showcases', 'Music education workshops'],
    achieved: true,
    achieved_at: '2024-01-15'
  },
  {
    id: '2',
    amount: 25000,
    title: 'Music Education Program',
    description: 'Launch comprehensive music education programs for local schools and community centers.',
    benefits: ['School music programs', 'Instrument donations', 'Professional musician visits'],
    achieved: true,
    achieved_at: '2024-03-20'
  },
  {
    id: '3',
    amount: 40000,
    title: 'Community Center',
    description: 'Establish a dedicated community center for music, arts, and cultural activities.',
    benefits: ['Performance venue', 'Recording studio', 'Practice rooms', 'Cultural events'],
    achieved: false
  }
]

const mockLeaderboard = [
  {
    id: '1',
    name: 'John Smith',
    amount: 5000,
    rank: 1,
    city: 'Orlando',
    isAnonymous: false
  },
  {
    id: '2',
    name: 'Anonymous Supporter',
    amount: 3500,
    rank: 2,
    city: 'Orlando',
    isAnonymous: true
  },
  {
    id: '3',
    name: 'Sarah Wilson',
    amount: 2500,
    rank: 3,
    city: 'Orlando',
    isAnonymous: false
  }
]

export default function CityPage() {
  const params = useParams()
  const slug = params.slug as string
  const city = cityData[slug as keyof typeof cityData]
  
  const [activeTab, setActiveTab] = useState('overview')

  if (!city) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-2xl font-bold text-gray-900 mb-4">City Not Found</h1>
          <p className="text-gray-600">The city you're looking for doesn't exist.</p>
        </div>
      </div>
    )
  }

  const progress = (city.currentAmount / city.fundingGoal) * 100

  const handleBookNow = (eventId: string) => {
    // Handle event booking - would integrate with ticketing system
    console.log('Booking event:', eventId)
  }

  const handleDonationSuccess = (amount: number) => {
    // Handle successful donation - would update UI and database
    console.log('Donation successful:', amount)
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <Header />
      
      {/* City Hero Section */}
      <section className={`bg-gradient-to-br from-${city.color} to-${city.color}/80 text-white py-20`}>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="text-center"
          >
            <h1 className="text-4xl md:text-6xl font-bold mb-4">
              {city.name}, {city.state}
            </h1>
            <p className="text-xl md:text-2xl text-white/90 max-w-3xl mx-auto leading-relaxed">
              {city.description}
            </p>
          </motion.div>
        </div>
      </section>

      {/* Navigation Tabs */}
      <section className="bg-white border-b border-gray-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <nav className="flex space-x-8">
            {['overview', 'events', 'fundraising', 'community'].map((tab) => (
              <button
                key={tab}
                onClick={() => setActiveTab(tab)}
                className={`py-4 px-1 border-b-2 font-medium text-sm capitalize transition-colors ${
                  activeTab === tab
                    ? 'border-beam-500 text-beam-600'
                    : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
                }`}
              >
                {tab}
              </button>
            ))}
          </nav>
        </div>
      </section>

      {/* Tab Content */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        {activeTab === 'overview' && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.5 }}
            className="grid grid-cols-1 lg:grid-cols-3 gap-8"
          >
            {/* City Info */}
            <div className="lg:col-span-2">
              <div className="card">
                <h2 className="text-2xl font-bold text-gray-900 mb-4">About {city.name}</h2>
                <p className="text-gray-600 mb-6">{city.description}</p>
                
                {/* City Stats */}
                <div className="grid grid-cols-3 gap-4">
                  <div className="text-center">
                    <div className="text-2xl font-bold text-beam-600">8</div>
                    <div className="text-sm text-gray-500">Events</div>
                  </div>
                  <div className="text-center">
                    <div className="text-2xl font-bold text-beam-600">156</div>
                    <div className="text-sm text-gray-500">Supporters</div>
                  </div>
                  <div className="text-center">
                    <div className="text-2xl font-bold text-beam-600">$32K</div>
                    <div className="text-sm text-gray-500">Raised</div>
                  </div>
                </div>
              </div>
            </div>

            {/* Coordinator Info */}
            <div>
              <div className="card">
                <h3 className="text-xl font-bold text-gray-900 mb-4">City Coordinator</h3>
                <div className="text-center">
                  <div className="w-20 h-20 bg-gradient-to-br from-gray-200 to-gray-300 rounded-full mx-auto mb-4 flex items-center justify-center">
                    <span className="text-gray-500 text-sm">Photo</span>
                  </div>
                  <h4 className="font-semibold text-gray-900">{city.coordinator.name}</h4>
                  <p className="text-sm text-gray-600 mb-3">{city.coordinator.bio}</p>
                  <div className="space-y-2 text-sm text-gray-600">
                    <div>{city.coordinator.email}</div>
                    <div>{city.coordinator.phone}</div>
                  </div>
                </div>
              </div>
            </div>
          </motion.div>
        )}

        {activeTab === 'events' && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.5 }}
          >
            <div className="text-center mb-8">
              <h2 className="text-3xl font-bold text-gray-900 mb-4">Upcoming Events</h2>
              <p className="text-xl text-gray-600">Join us for amazing live music experiences</p>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {mockEvents.map((event) => (
                <EventCard
                  key={event.id}
                  event={event}
                  onBookNow={handleBookNow}
                />
              ))}
            </div>
          </motion.div>
        )}

        {activeTab === 'fundraising' && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.5 }}
            className="grid grid-cols-1 lg:grid-cols-2 gap-8"
          >
            <DonationForm
              cityId={slug}
              cityName={city.name}
              currentAmount={city.currentAmount}
              goal={city.fundingGoal}
              onDonationSuccess={handleDonationSuccess}
            />
            
            <div className="space-y-8">
              <Leaderboard entries={mockLeaderboard} cityName={city.name} />
              <MilestoneTracker
                milestones={mockMilestones}
                currentAmount={city.currentAmount}
                goal={city.fundingGoal}
              />
            </div>
          </motion.div>
        )}

        {activeTab === 'community' && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.5 }}
            className="text-center"
          >
            <h2 className="text-3xl font-bold text-gray-900 mb-4">Community Benefits</h2>
            <p className="text-xl text-gray-600 mb-8">
              As we reach our fundraising goals, we unlock amazing benefits for the {city.name} community
            </p>
            
            <MilestoneTracker
              milestones={mockMilestones}
              currentAmount={city.currentAmount}
              goal={city.fundingGoal}
            />
          </motion.div>
        )}
      </div>
    </div>
  )
}
