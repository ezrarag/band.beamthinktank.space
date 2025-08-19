'use client'

import { motion } from 'framer-motion'
import { MapPin } from 'lucide-react'
import Link from 'next/link'

const cities = [
  {
    name: 'Orlando',
    slug: 'orlando',
    image: 'https://gfqhzuqckfxtzqawdcso.supabase.co/storage/v1/object/public/hero/pexels-airamdphoto-11668039.jpg',
    description: 'The City Beautiful - Home to world-famous theme parks and vibrant entertainment districts.'
  },
  {
    name: 'Nashville',
    slug: 'nashville',
    image: 'https://images.unsplash.com/photo-1512453979798-5ea266f8880c?w=800&h=600&fit=crop',
    description: 'Music City - The heart of country music and a thriving creative community.'
  },
  {
    name: 'Atlanta',
    slug: 'atlanta',
    image: 'https://images.unsplash.com/photo-1540959733332-eab4deabeeaf?w=800&h=600&fit=crop',
    description: 'The A - A diverse cultural hub with a rich musical heritage and innovative spirit.'
  }
]

export default function CityGrid() {
  return (
    <div className="space-y-6">
      {cities.map((city, index) => (
        <motion.div
          key={city.slug}
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: index * 0.1 }}
          className="group cursor-pointer"
        >
          <Link href={`/city/${city.slug}`}>
            <div 
              className="relative overflow-hidden rounded-2xl"
              style={{
                height: '400px',
                width: '280px'
              }}
            >
              {/* City Image */}
              <img
                src={city.image}
                alt={city.name}
                className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                style={{
                  opacity: 0.7
                }}
              />

              {/* Rounded Corner Overlay - Bottom Right */}
              <div 
                className="absolute bottom-0 right-0 bg-[rgb(10,11,10)] rounded-tl-3xl p-4 flex flex-col gap-8"
                style={{
                  padding: '8px 0px 0px 16px',
                  borderTopLeftRadius: '24px'
                }}
              >
                {/* Rounded Edge Top Left - SVG overlay */}
                <div 
                  className="absolute -top-6 -left-6 w-6 h-6 z-10"
                  style={{
                    bottom: '0px',
                    left: '-23px',
                    top: '-23px',
                    width: '24px',
                    height: '24px'
                  }}
                >
                  <svg 
                    className="w-6 h-6" 
                    viewBox="0 0 24 24"
                    style={{
                      fill: 'rgb(10, 11, 10)'
                    }}
                  >
                    <path d="M 24 24 L 24 0 C 24 13.255 13.255 24 0 24 Z" />
                  </svg>
                </div>

                {/* Rounded Edge Top Left - Second SVG */}
                <div 
                  className="absolute -top-6 -right-6 w-6 h-6 z-10"
                  style={{
                    right: '0px',
                    top: '-23px',
                    width: '24px',
                    height: '24px'
                  }}
                >
                  <svg 
                    className="w-6 h-6" 
                    viewBox="0 0 24 24"
                    style={{
                      fill: 'rgb(10, 11, 10)'
                    }}
                  >
                    <path d="M 24 24 L 24 0 C 24 13.255 13.255 24 0 24 Z" />
                  </svg>
                </div>

                {/* City Icon and Menu Button */}
                <div className="flex items-center gap-3">
                  {/* City Icon */}
                  <div className="w-8 h-8 rounded-full border border-[rgb(51,51,48)] bg-[rgba(24,24,24,0.5)] flex items-center justify-center p-2 hover:bg-[rgba(30,30,30,0.8)] transition-colors">
                    <MapPin className="w-4 h-4 text-[rgb(239,231,210)]" />
                  </div>
                  
                  {/* Menu Button */}
                  <div className="flex items-center gap-2">
                    <span 
                      className="font-['Forum',sans-serif] uppercase tracking-wider text-sm"
                      style={{
                        letterSpacing: '1px',
                        lineHeight: '120%',
                        color: 'rgb(21, 21, 21)'
                      }}
                    >
                      Menu
                    </span>
                  </div>
                </div>
              </div>
            </div>
          </Link>
        </motion.div>
      ))}
    </div>
  )
}
