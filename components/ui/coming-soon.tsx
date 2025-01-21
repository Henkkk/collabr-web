import React from "react"
import { Button } from "./button"
import { Input } from "./input"
import { useState, useEffect, useRef } from "react"
import { motion } from "framer-motion"
import { FaTwitter, FaDiscord, FaLinkedin } from "react-icons/fa"
import { db } from "@/lib/firebase"
import { collection, addDoc, serverTimestamp } from "firebase/firestore"

export default function ComingSoon() {
  const [email, setEmail] = useState("")
  const [isSubmitted, setIsSubmitted] = useState(false)
  const [error, setError] = useState("")

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setError("")
    
    try {
      // Add email to waitlist collection
      await addDoc(collection(db, "Waitlist"), {
        email,
        timestamp: serverTimestamp(),
      })
      
      setIsSubmitted(true)
      setEmail("")
      setTimeout(() => setIsSubmitted(false), 3000)
    } catch (err) {
      console.error("Error adding email to waitlist:", err)
      setError("Failed to join waitlist. Please try again.")
      setTimeout(() => setError(""), 3000)
    }
  }

  return (
    <div className="min-h-[90vh] w-full flex flex-col items-center justify-center px-4 sm:px-6 relative overflow-hidden">
      {/* Animated Background */}
      <div className="absolute inset-0 -z-10">
        {/* Gradient Overlay */}
        <div className="absolute inset-0 bg-gradient-to-b from-white/80 to-white dark:from-gray-900/80 dark:to-gray-950 backdrop-blur-[2px]" />
        
        {/* Animated Shapes */}
        <div className="absolute inset-0">
          <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-blue-400/20 rounded-full mix-blend-multiply filter blur-xl animate-blob" />
          <div className="absolute top-1/3 right-1/4 w-96 h-96 bg-purple-400/20 rounded-full mix-blend-multiply filter blur-xl animate-blob animation-delay-2000" />
          <div className="absolute bottom-1/4 left-1/3 w-96 h-96 bg-indigo-400/20 rounded-full mix-blend-multiply filter blur-xl animate-blob animation-delay-4000" />
        </div>

        {/* Optional: Subtle Grid Pattern */}
        <div className="absolute inset-0 bg-grid-pattern opacity-[0.02]" />
      </div>

      {/* Existing Content */}
      <motion.div 
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
        className="max-w-3xl mx-auto text-center space-y-6 sm:space-y-8 w-full relative"
      >
        <motion.div
          initial={{ scale: 0.9 }}
          animate={{ scale: 1 }}
          transition={{ duration: 0.5 }}
        >
          <h1 className="text-4xl sm:text-5xl md:text-7xl font-bold bg-gradient-to-r from-blue-600 via-blue-400 to-blue-500 bg-clip-text text-transparent pb-[0.1em] tracking-tight">
            Something Big
            <br />
            Is Coming Soon
          </h1>
        </motion.div>
        
        <p className="text-lg sm:text-xl md:text-2xl text-gray-600 dark:text-gray-300 px-2 sm:px-4 py-4 sm:py-8 leading-relaxed">
          We're crafting a revolutionary platform that will transform how creators monetize their NFTs. Join our waitlist to be the first to know when we have updates.
        </p>

        <div className="text-center space-y-2">
            <a 
              href="/about" 
              className="text-blue-600 hover:text-blue-700 dark:text-blue-400 dark:hover:text-blue-300 underline underline-offset-2"
            >
              Learn more about what we're building →
            </a>
            <div>
              <a 
                href="/faq" 
                className="text-blue-600 hover:text-blue-700 dark:text-blue-400 dark:hover:text-blue-300 underline underline-offset-2"
              >
                Frequently Asked Questions →
              </a>
            </div>
        </div>

        <div className="w-full max-w-md mx-auto px-2 sm:px-0">
          <form onSubmit={handleSubmit} className="flex flex-col sm:flex-row gap-3">
            <Input
              type="email"
              placeholder="Enter your email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="flex-grow text-base sm:text-lg py-5 sm:py-6"
              required
            />
            <Button 
              type="submit" 
              className="whitespace-nowrap text-base sm:text-lg py-5 sm:py-6 px-6 sm:px-8 bg-gradient-to-r from-blue-600 to-blue-500 hover:from-blue-700 hover:to-blue-600 transition-all duration-200"
            >
              {isSubmitted ? "✓ Subscribed!" : "Join Waitlist"}
            </Button>
          </form>
          {error && (
            <p className="mt-2 text-red-500 dark:text-red-400 text-sm">{error}</p>
          )}
        </div>

        <div className="pt-8 sm:pt-12">
          <p className="text-gray-500 dark:text-gray-400 mb-4">Chat with us</p>
          <div className="mb-4 flex justify-center gap-6">
            <a href="#" className="text-gray-600 hover:text-blue-500 dark:text-gray-400 dark:hover:text-blue-400 transition-colors">
              <FaTwitter size={24} />
            </a>
            <a href="https://discord.gg/H7P5AVQK" className="text-gray-600 hover:text-blue-500 dark:text-gray-400 dark:hover:text-blue-400 transition-colors">
              <FaDiscord size={24} />
            </a>
            <a href="https://www.linkedin.com/company/collabrxyz/?viewAsMember=true" className="text-gray-600 hover:text-blue-500 dark:text-gray-400 dark:hover:text-blue-400 transition-colors">
              <FaLinkedin size={24} />
            </a>
          </div>
          <a href="mailto:founders@collabr.xyz" className="text-gray-600 hover:text-blue-500 dark:text-gray-400 dark:hover:text-blue-400 transition-colors">
            founders@collabr.xyz
          </a>
        </div>
      </motion.div>
    </div>
  )
} 