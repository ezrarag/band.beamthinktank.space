'use client'

import { notFound } from 'next/navigation'
import { motion } from 'framer-motion'
import { Calendar, MapPin, Users, DollarSign, ArrowRight } from 'lucide-react'

// Define proper types for the city data
interface Event {
  id: number
  title: string
  date: string
  time: string
  location: string
  attendees: number
  price: number
  description: string
}

interface Milestone {
  id: number
  title: string
  target: number
  current: number
  description: string
}

interface LeaderboardEntry {
  rank: number
  name: string
  contribution: number
  avatar: string
}

interface CityData {
  name: string
  description: string
  image: string
  events: Event[]
  milestones: Milestone[]
  leaderboard: LeaderboardEntry[]
}

// Mock data for cities with proper typing
const citiesData: Record<string, CityData> = {
  orlando: {
    name: 'Orlando',
    description: 'The City Beautiful - Home to world-famous theme parks and vibrant entertainment districts.',
    image: 'https://gfqhzuqckfxtzqawdcso.supabase.co/storage/v1/object/public/hero/pexels-airamdphoto-11668039.jpg',
    events: [
      {
        id: 1,
        title: 'BEAM Band Orlando Launch',
        date: '2024-03-15',
        time: '7:00 PM',
        location: 'Downtown Orlando',
        attendees: 150,
        price: 25,
        description: 'Join us for the official launch of BEAM Band in Orlando! Live music, networking, and community building.'
      },
      {
        id: 2,
        title: 'Music Industry Mixer',
        date: '2024-03-22',
        time: '6:30 PM',
        location: 'Winter Park',
        attendees: 75,
        price: 15,
        description: 'Connect with local musicians, producers, and industry professionals in a relaxed setting.'
      },
      {
        id: 3,
        title: 'Acoustic Night',
        date: '2024-03-29',
        time: '8:00 PM',
        location: 'Mills 50 District',
        attendees: 100,
        price: 20,
        description: 'Intimate acoustic performances from local artists in a cozy venue setting.'
      }
    ],
    milestones: [
      { id: 1, title: 'Community Launch', target: 1000, current: 750, description: 'Building our Orlando music community' },
      { id: 2, title: 'Venue Partnerships', target: 20, current: 15, description: 'Establishing local venue relationships' },
      { id: 3, title: 'Artist Network', target: 500, current: 320, description: 'Connecting local musicians and artists' }
    ],
    leaderboard: [
      { rank: 1, name: 'Sarah M.', contribution: 500, avatar: 'SM' },
      { rank: 2, name: 'Mike R.', contribution: 350, avatar: 'MR' },
      { rank: 3, name: 'Lisa K.', contribution: 250, avatar: 'LK' },
      { rank: 4, name: 'David P.', contribution: 200, avatar: 'DP' },
      { rank: 5, name: 'Emma T.', contribution: 150, avatar: 'ET' }
    ]
  },
  nashville: {
    name: 'Nashville',
    description: 'Music City - The heart of country music and a thriving creative community.',
    image: 'https://images.unsplash.com/photo-1512453979798-5ea266f8880c?w=800&h=600&fit=crop',
    events: [
      {
        id: 1,
        title: 'BEAM Band Nashville Kickoff',
        date: '2024-03-20',
        time: '7:30 PM',
        location: 'The Gulch',
        attendees: 200,
        price: 30,
        description: 'Experience the magic of Music City with our BEAM Band launch event featuring local talent.'
      },
      {
        id: 2,
        title: 'Songwriter Circle',
        date: '2024-03-27',
        time: '6:00 PM',
        location: 'East Nashville',
        attendees: 60,
        price: 20,
        description: 'Intimate songwriting workshop and performance circle with established Nashville songwriters.'
      }
    ],
    milestones: [
      { id: 1, title: 'Music Row Connections', target: 50, current: 35, description: 'Building industry relationships' },
      { id: 2, title: 'Local Artist Support', target: 300, current: 180, description: 'Supporting emerging Nashville talent' }
    ],
    leaderboard: [
      { rank: 1, name: 'John D.', contribution: 600, avatar: 'JD' },
      { rank: 2, name: 'Maria S.', contribution: 450, avatar: 'MS' },
      { rank: 3, name: 'Tom W.', contribution: 300, avatar: 'TW' }
    ]
  },
  atlanta: {
    name: 'Atlanta',
    description: 'The A - A diverse cultural hub with a rich musical heritage and innovative spirit.',
    image: 'https://images.unsplash.com/photo-1540959733332-eab4deabeeaf?w=800&h=600&fit=crop',
    events: [
      {
        id: 1,
        title: 'BEAM Band Atlanta Launch',
        date: '2024-03-25',
        time: '8:00 PM',
        location: 'Midtown Atlanta',
        attendees: 180,
        price: 25,
        description: 'Launching BEAM Band in Atlanta with a celebration of local hip-hop, R&B, and indie music.'
      },
      {
        id: 2,
        title: 'Producer Showcase',
        date: '2024-04-01',
        time: '7:00 PM',
        location: 'Buckhead',
        attendees: 90,
        price: 35,
        description: 'Showcasing Atlanta\'s top music producers and their latest work.'
      }
    ],
    milestones: [
      { id: 1, title: 'Studio Network', target: 30, current: 22, description: 'Connecting with local recording studios' },
      { id: 2, title: 'Artist Development', target: 200, current: 140, description: 'Supporting emerging Atlanta artists' }
    ],
    leaderboard: [
      { rank: 1, name: 'Alex K.', contribution: 550, avatar: 'AK' },
      { rank: 2, name: 'Rachel L.', contribution: 400, avatar: 'RL' },
      { rank: 3, name: 'Marcus J.', contribution: 280, avatar: 'MJ' }
    ]
  },
  augusta: {
    name: 'Augusta',
    description: 'The Garden City - Rich in history and community spirit, where music grows like the beautiful gardens.',
    image: 'https://images.unsplash.com/photo-1512453979798-5ea266f8880c?w=800&h=600&fit=crop',
    events: [
      {
        id: 1,
        title: 'BEAM Band Augusta Launch',
        date: '2024-04-05',
        time: '7:00 PM',
        location: 'Downtown Augusta',
        attendees: 120,
        price: 20,
        description: 'Launching BEAM Band in Augusta with a celebration of local jazz and blues heritage.'
      }
    ],
    milestones: [
      { id: 1, title: 'Historical Preservation', target: 25, current: 18, description: 'Preserving Augusta\'s musical heritage' },
      { id: 2, title: 'Community Outreach', target: 150, current: 95, description: 'Building community connections' }
    ],
    leaderboard: [
      { rank: 1, name: 'Robert W.', contribution: 400, avatar: 'RW' },
      { rank: 2, name: 'Patricia L.', contribution: 300, avatar: 'PL' },
      { rank: 3, name: 'James H.', contribution: 200, avatar: 'JH' }
    ]
  },
  knoxville: {
    name: 'Knoxville',
    description: 'The Marble City - Gateway to the Great Smoky Mountains, where natural beauty inspires musical creativity.',
    image: 'https://images.unsplash.com/photo-1540959733332-eab4deabeeaf?w=800&h=600&fit=crop',
    events: [
      {
        id: 1,
        title: 'BEAM Band Knoxville Launch',
        date: '2024-04-10',
        time: '7:30 PM',
        location: 'Market Square',
        attendees: 140,
        price: 22,
        description: 'Launching BEAM Band in Knoxville with mountain music and folk traditions.'
      }
    ],
    milestones: [
      { id: 1, title: 'Mountain Music Network', target: 30, current: 22, description: 'Connecting mountain music communities' },
      { id: 2, title: 'Folk Traditions', target: 100, current: 65, description: 'Preserving folk music traditions' }
    ],
    leaderboard: [
      { rank: 1, name: 'Emily D.', contribution: 350, avatar: 'ED' },
      { rank: 2, name: 'Thomas K.', contribution: 250, avatar: 'TK' },
      { rank: 3, name: 'Sarah M.', contribution: 180, avatar: 'SM' }
    ]
  },
  tampa: {
    name: 'Tampa',
    description: 'The Big Guava - Sunshine, beaches, and great vibes come together in this coastal city.',
    image: 'https://images.unsplash.com/photo-1512453979798-5ea266f8880c?w=800&h=600&fit=crop',
    events: [
      {
        id: 1,
        title: 'BEAM Band Tampa Launch',
        date: '2024-04-15',
        time: '8:00 PM',
        location: 'Ybor City',
        attendees: 180,
        price: 25,
        description: 'Launching BEAM Band in Tampa with Latin rhythms and coastal vibes.'
      }
    ],
    milestones: [
      { id: 1, title: 'Coastal Music Scene', target: 40, current: 28, description: 'Building coastal music community' },
      { id: 2, title: 'Latin Fusion', target: 120, current: 80, description: 'Promoting Latin music fusion' }
    ],
    leaderboard: [
      { rank: 1, name: 'Carlos R.', contribution: 450, avatar: 'CR' },
      { rank: 2, name: 'Isabella M.', contribution: 320, avatar: 'IM' },
      { rank: 3, name: 'Miguel A.', contribution: 280, avatar: 'MA' }
    ]
  },
  jackson: {
    name: 'Jackson',
    description: 'The Crossroads of the South - Where cultures converge and music creates bridges between communities.',
    image: 'https://images.unsplash.com/photo-1540959733332-eab4deabeeaf?w=800&h=600&fit=crop',
    events: [
      {
        id: 1,
        title: 'BEAM Band Jackson Launch',
        date: '2024-04-20',
        time: '7:00 PM',
        location: 'Fondren District',
        attendees: 100,
        price: 18,
        description: 'Launching BEAM Band in Jackson with blues heritage and southern soul.'
      }
    ],
    milestones: [
      { id: 1, title: 'Blues Heritage', target: 20, current: 15, description: 'Preserving blues music heritage' },
      { id: 2, title: 'Southern Soul', target: 80, current: 55, description: 'Promoting southern soul music' }
    ],
    leaderboard: [
      { rank: 1, name: 'Maria J.', contribution: 300, avatar: 'MJ' },
      { rank: 2, name: 'William B.', contribution: 220, avatar: 'WB' },
      { rank: 3, name: 'Dorothy L.', contribution: 180, avatar: 'DL' }
    ]
  },
  virginia: {
    name: 'Virginia',
    description: 'The Old Dominion - Rich in American heritage and community values, where music honors tradition.',
    image: 'https://images.unsplash.com/photo-1512453979798-5ea266f8880c?w=800&h=600&fit=crop',
    events: [
      {
        id: 1,
        title: 'BEAM Band Virginia Launch',
        date: '2024-04-25',
        time: '7:30 PM',
        location: 'Richmond',
        attendees: 160,
        price: 24,
        description: 'Launching BEAM Band in Virginia with traditional American music and modern innovation.'
      }
    ],
    milestones: [
      { id: 1, title: 'Traditional Music', target: 35, current: 25, description: 'Preserving traditional American music' },
      { id: 2, title: 'Modern Innovation', target: 150, current: 95, description: 'Promoting modern musical innovation' }
    ],
    leaderboard: [
      { rank: 1, name: 'Robert W.', contribution: 400, avatar: 'RW' },
      { rank: 2, name: 'Elizabeth T.', contribution: 320, avatar: 'ET' },
      { rank: 3, name: 'George M.', contribution: 250, avatar: 'GM' }
    ]
  },
  'los-angeles': {
    name: 'Los Angeles',
    description: 'The City of Angels - Entertainment capital of the world, where dreams come true.',
    image: 'https://images.unsplash.com/photo-1540959733332-eab4deabeeaf?w=800&h=600&fit=crop',
    events: [
      {
        id: 1,
        title: 'BEAM Band LA Launch',
        date: '2024-05-01',
        time: '8:30 PM',
        location: 'Hollywood',
        attendees: 300,
        price: 35,
        description: 'Launching BEAM Band in LA with star power and entertainment industry connections.'
      }
    ],
    milestones: [
      { id: 1, title: 'Industry Connections', target: 100, current: 75, description: 'Building entertainment industry network' },
      { id: 2, title: 'Global Reach', target: 500, current: 320, description: 'Expanding global music community' }
    ],
    leaderboard: [
      { rank: 1, name: 'Jennifer M.', contribution: 800, avatar: 'JM' },
      { rank: 2, name: 'David L.', contribution: 650, avatar: 'DL' },
      { rank: 3, name: 'Amanda K.', contribution: 520, avatar: 'AK' }
    ]
  }
}

export default function CityPage({ params }: { params: { slug: string } }) {
  const city = citiesData[params.slug]

  if (!city) {
    notFound()
  }

  return (
    <main className="min-h-screen bg-black">
      <div className="grid grid-cols-1 lg:grid-cols-2 min-h-screen">
        {/* Left Column - Hero Section */}
        <div className="relative flex items-center justify-center p-8 lg:p-12">
          <div className="relative w-full h-full max-w-2xl">
            {/* Background Image */}
            <div 
              className="absolute inset-0 bg-cover bg-center rounded-3xl overflow-hidden"
              style={{
                backgroundImage: `url(${city.image})`,
                backgroundSize: 'cover',
                backgroundPosition: 'center'
              }}
            >
              {/* Dark Overlay */}
              <div className="absolute inset-0 bg-black/40"></div>
            </div>

            {/* Content Overlay */}
            <div className="relative z-10 h-full flex flex-col justify-end p-8 text-white">
              <motion.div
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8 }}
                className="space-y-4"
              >
                <h1 className="text-5xl md:text-6xl font-serif font-bold">
                  {city.name}
                </h1>
                <p className="text-xl text-white/90 max-w-md leading-relaxed">
                  {city.description}
                </p>
                
                {/* City Stats */}
                <div className="flex space-x-6 pt-4">
                  <div className="text-center">
                    <div className="text-2xl font-bold">{city.events.length}</div>
                    <div className="text-sm text-white/70">Events</div>
                  </div>
                  <div className="text-center">
                    <div className="text-2xl font-bold">{city.milestones.length}</div>
                    <div className="text-sm text-white/70">Milestones</div>
                  </div>
                  <div className="text-center">
                    <div className="text-2xl font-bold">{city.leaderboard.length}</div>
                    <div className="text-sm text-white/70">Supporters</div>
                  </div>
                </div>
              </motion.div>
            </div>
          </div>
        </div>

        {/* Right Column - Menu Style Content */}
        <div className="p-8 lg:p-12 bg-[rgb(10,11,10)] overflow-y-auto">
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="space-y-8"
          >
            {/* Section Tabs */}
            <div className="flex space-x-8 border-b border-white/20 pb-4">
              <button className="text-white/90 hover:text-white transition-colors font-medium text-lg border-b-2 border-white pb-2">
                EVENTS
              </button>
              <button className="text-white/60 hover:text-white/90 transition-colors font-medium text-lg">
                MILESTONES
              </button>
              <button className="text-white/60 hover:text-white/90 transition-colors font-medium text-lg">
                LEADERBOARD
              </button>
            </div>

            {/* Section Title */}
            <div className="text-center space-y-4">
              <div className="flex items-center justify-center space-x-4">
                <div className="w-3 h-3 bg-white/60 rotate-45"></div>
                <h2 className="text-4xl md:text-5xl font-serif text-white/90">EVENTS</h2>
                <div className="w-3 h-3 bg-white/60 rotate-45"></div>
              </div>
            </div>

            {/* Events List */}
            <div className="space-y-6">
              {city.events.map((event, index) => (
                <motion.div
                  key={event.id}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: 0.1 * index }}
                  className="flex items-start space-x-4 p-4 bg-white/5 rounded-2xl border border-white/10 hover:bg-white/10 transition-all duration-300"
                >
                  {/* Event Image Placeholder */}
                  <div className="w-20 h-20 bg-white/10 rounded-xl flex items-center justify-center flex-shrink-0">
                    <Calendar className="w-8 h-8 text-white/60" />
                  </div>

                  {/* Event Details */}
                  <div className="flex-1 min-w-0">
                    <h3 className="text-lg font-bold text-white/90 mb-2">
                      {event.title}
                    </h3>
                    <p className="text-white/70 text-sm mb-3 leading-relaxed">
                      {event.description}
                    </p>
                    <div className="flex items-center justify-between text-sm">
                      <div className="flex items-center space-x-4 text-white/60">
                        <div className="flex items-center space-x-1">
                          <MapPin className="w-4 h-4" />
                          <span>{event.location}</span>
                        </div>
                        <div className="flex items-center space-x-1">
                          <Users className="w-4 h-4" />
                          <span>{event.attendees}</span>
                        </div>
                      </div>
                      <div className="text-white/90 font-bold">
                        ${event.price}
                      </div>
                    </div>
                  </div>

                  {/* Arrow Icon */}
                  <div className="flex items-center justify-center w-8 h-8 bg-white/10 rounded-full hover:bg-white/20 transition-colors">
                    <ArrowRight className="w-4 h-4 text-white/60" />
                  </div>
                </motion.div>
              ))}
            </div>

            {/* Next Section Preview */}
            <div className="text-center pt-8 border-t border-white/20">
              <div className="flex items-center justify-center space-x-4">
                <div className="w-3 h-3 bg-white/60 rotate-45"></div>
                <h3 className="text-3xl font-serif text-white/60">MILESTONES</h3>
                <div className="w-3 h-3 bg-white/60 rotate-45"></div>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </main>
  )
}
