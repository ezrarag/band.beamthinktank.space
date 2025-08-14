'use client'

import { motion } from 'framer-motion'
import { Music, Users, Heart, Star } from 'lucide-react'
import Link from 'next/link'

export default function Hero() {
  return (
    <section className="relative bg-gradient-beam min-h-screen flex items-center justify-center overflow-hidden">
      {/* Background Elements */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute -top-40 -right-40 w-80 h-80 bg-white/10 rounded-full blur-3xl"></div>
        <div className="absolute -bottom-40 -left-40 w-80 h-80 bg-white/10 rounded-full blur-3xl"></div>
      </div>

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="mb-8"
        >
          <h1 className="text-4xl md:text-6xl lg:text-7xl font-bold text-white mb-6">
            BEAM
            <span className="block text-2xl md:text-3xl lg:text-4xl font-normal mt-2">
              Band
            </span>
          </h1>
          <p className="text-xl md:text-2xl text-white/90 max-w-3xl mx-auto leading-relaxed">
            Join the movement across cities. Experience live music, support community causes, 
            and be part of something bigger than yourself.
          </p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.2 }}
          className="mb-12"
        >
          <div className="flex flex-wrap justify-center gap-8 text-white/80">
            <div className="flex items-center space-x-2">
              <Music className="w-5 h-5" />
              <span>Live Concerts</span>
            </div>
            <div className="flex items-center space-x-2">
              <Users className="w-5 h-5" />
              <span>Community Impact</span>
            </div>
            <div className="flex items-center space-x-2">
              <Heart className="w-5 h-5" />
              <span>Fundraising</span>
            </div>
            <div className="flex items-center space-x-2">
              <Star className="w-5 h-5" />
              <span>Exclusive Benefits</span>
            </div>
          </div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.4 }}
          className="flex flex-col sm:flex-row gap-4 justify-center"
        >
          <Link href="/events" className="btn-primary text-lg px-8 py-4">
            Find Events
          </Link>
          <Link href="/cities" className="btn-secondary text-lg px-8 py-4">
            Explore Cities
          </Link>
        </motion.div>

        {/* City Grid Preview */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.6 }}
          className="mt-16"
        >
          <h3 className="text-white/80 text-lg mb-6">Available in 9 Cities</h3>
          <div className="grid grid-cols-3 md:grid-cols-9 gap-2 max-w-2xl mx-auto">
            {['Orlando', 'Nashville', 'Atlanta', 'Augusta', 'Knoxville', 'Tampa', 'Jackson', 'Virginia', 'LA'].map((city, index) => (
              <div
                key={city}
                className="bg-white/20 backdrop-blur-sm rounded-lg p-2 text-xs text-white font-medium hover:bg-white/30 transition-colors cursor-pointer"
              >
                {city}
              </div>
            ))}
          </div>
        </motion.div>
      </div>

      {/* Scroll Indicator */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 1, delay: 1 }}
        className="absolute bottom-8 left-1/2 transform -translate-x-1/2"
      >
        <div className="w-6 h-10 border-2 border-white/30 rounded-full flex justify-center">
          <motion.div
            animate={{ y: [0, 12, 0] }}
            transition={{ duration: 2, repeat: Infinity }}
            className="w-1 h-3 bg-white/60 rounded-full mt-2"
          ></motion.div>
        </div>
      </motion.div>
    </section>
  )
}
