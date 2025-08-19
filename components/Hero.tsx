'use client'

import { motion } from 'framer-motion'
import { Instagram, Facebook, Twitter } from 'lucide-react'

export default function Hero() {
  return (
    <div className="relative w-full h-full flex items-center justify-center bg-black rounded-3xl overflow-hidden">
      {/* Video Background */}
      <video
        autoPlay
        loop
        muted
        playsInline
        className="absolute inset-0 w-full h-full object-cover object-center"
        style={{
          cursor: 'auto',
          width: '100%',
          height: '100%',
          borderRadius: '0px',
          display: 'block',
          objectFit: 'cover',
          backgroundColor: 'rgba(0, 0, 0, 0)',
          objectPosition: '50% 50%'
        }}
      >
        <source src="https://gfqhzuqckfxtzqawdcso.supabase.co/storage/v1/object/public/hero/3345545-hd_1920_1080_25fps.mp4" type="video/mp4" />
      </video>

      {/* BEAM BAND Text - Bottom Left */}
      <div className="absolute bottom-8 left-8 z-10">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
        >
          <h1 className="text-5xl md:text-7xl font-serif text-white/90 tracking-tight">
            BEAM
            <span className="block text-2xl md:text-3xl font-light mt-2 text-white/70">
              BAND
            </span>
          </h1>
        </motion.div>
      </div>

      {/* Rounded Corner Overlay - Bottom Right for Social Icons */}
      <div 
        className="absolute bottom-0 right-0 bg-[rgb(10,11,10)] rounded-tl-3xl p-6 flex flex-col gap-8"
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

        {/* Social Icons */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.3 }}
          className="flex space-x-4"
        >
          <a href="#" className="w-10 h-10 bg-white/10 rounded-full flex items-center justify-center hover:bg-white/20 transition-colors border border-white/20">
            <Instagram className="w-5 h-5 text-white" />
          </a>
          <a href="#" className="w-10 h-10 bg-white/10 rounded-full flex items-center justify-center hover:bg-white/20 transition-colors border border-white/20">
            <Facebook className="w-5 h-5 text-white" />
          </a>
          <a href="#" className="w-10 h-10 bg-white/10 rounded-full flex items-center justify-center hover:bg-white/20 transition-colors border border-white/20">
            <Twitter className="w-5 h-5 text-white" />
          </a>
        </motion.div>
      </div>
    </div>
  )
}
