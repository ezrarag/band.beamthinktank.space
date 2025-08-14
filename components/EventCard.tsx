'use client'

import { useState } from 'react'
import { motion } from 'framer-motion'
import { Calendar, Clock, MapPin, DollarSign, Users, Music } from 'lucide-react'
import { format } from 'date-fns'

interface EventCardProps {
  event: {
    id: string
    title: string
    description: string
    date: string
    time: string
    venue: string
    address: string
    ticket_price: number
    image_url: string
    status: 'upcoming' | 'ongoing' | 'completed'
    city_name: string
    city_color: string
  }
  onBookNow: (eventId: string) => void
}

export default function EventCard({ event, onBookNow }: EventCardProps) {
  const [isHovered, setIsHovered] = useState(false)

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'upcoming':
        return 'bg-blue-100 text-blue-800'
      case 'ongoing':
        return 'bg-green-100 text-green-800'
      case 'completed':
        return 'bg-gray-100 text-gray-800'
      default:
        return 'bg-gray-100 text-gray-800'
    }
  }

  const getStatusText = (status: string) => {
    switch (status) {
      case 'upcoming':
        return 'Upcoming'
      case 'ongoing':
        return 'Live Now'
      case 'completed':
        return 'Completed'
      default:
        return status
    }
  }

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      whileHover={{ y: -8 }}
      onHoverStart={() => setIsHovered(true)}
      onHoverEnd={() => setIsHovered(false)}
      className="card hover:shadow-2xl transition-all duration-300 cursor-pointer group"
    >
      {/* Event Image */}
      <div className="relative mb-4">
        <div className="w-full h-48 bg-gradient-to-br from-gray-200 to-gray-300 rounded-lg flex items-center justify-center">
          <Music className="w-12 h-12 text-gray-400" />
        </div>
        
        {/* Status Badge */}
        <div className={`absolute top-3 right-3 px-3 py-1 rounded-full text-xs font-medium ${getStatusColor(event.status)}`}>
          {getStatusText(event.status)}
        </div>
        
        {/* City Badge */}
        <div className="absolute top-3 left-3 px-3 py-1 rounded-full text-xs font-medium bg-white/90 backdrop-blur-sm text-gray-700">
          {event.city_name}
        </div>
      </div>

      {/* Event Details */}
      <div className="space-y-3">
        <h3 className="text-xl font-bold text-gray-900 group-hover:text-beam-600 transition-colors line-clamp-2">
          {event.title}
        </h3>
        
        <p className="text-gray-600 line-clamp-2">
          {event.description}
        </p>

        {/* Event Info */}
        <div className="space-y-2">
          <div className="flex items-center space-x-2 text-sm text-gray-500">
            <Calendar className="w-4 h-4" />
            <span>{format(new Date(event.date), 'EEEE, MMMM d, yyyy')}</span>
          </div>
          
          <div className="flex items-center space-x-2 text-sm text-gray-500">
            <Clock className="w-4 h-4" />
            <span>{event.time}</span>
          </div>
          
          <div className="flex items-start space-x-2 text-sm text-gray-500">
            <MapPin className="w-4 h-4 mt-0.5 flex-shrink-0" />
            <div>
              <div className="font-medium text-gray-700">{event.venue}</div>
              <div className="text-gray-500">{event.address}</div>
            </div>
          </div>
        </div>

        {/* Price and Action */}
        <div className="flex items-center justify-between pt-3 border-t border-gray-100">
          <div className="flex items-center space-x-2">
            <DollarSign className="w-5 h-5 text-green-600" />
            <span className="text-2xl font-bold text-green-600">
              ${event.ticket_price}
            </span>
            <span className="text-sm text-gray-500">per ticket</span>
          </div>
          
          <button
            onClick={(e) => {
              e.stopPropagation()
              onBookNow(event.id)
            }}
            className="btn-primary text-sm px-6 py-2"
          >
            Book Now
          </button>
        </div>
      </div>

      {/* Hover Effect Overlay */}
      {isHovered && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className="absolute inset-0 bg-gradient-to-t from-beam-500/10 to-transparent rounded-xl pointer-events-none"
        />
      )}
    </motion.div>
  )
}
