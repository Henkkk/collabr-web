"use client"
import Link from 'next/link'
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { FaLinkedin, FaEnvelope, FaDiscord } from 'react-icons/fa'
import { FaXTwitter } from "react-icons/fa6";
import { useState } from 'react'

const Footer = () => {
  const [email, setEmail] = useState('')

  const handleSubscribe = (e: React.FormEvent) => {
    e.preventDefault()
    // TODO: Implement email subscription logic
    console.log('Subscribe:', email)
    setEmail('')
  }

  return (
    <footer className="w-full border-t border-gray-200 bg-white py-12">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8 mb-8">
          {/* About Section */}
          <div className="col-span-1">
            <h3 className="font-bold text-lg mb-4">About Collabr</h3>
            <p className="text-sm text-gray-600">
              Collabr is a marketplace where you can list your NFTs and allow others to create derivative works.
            </p>
          </div>

          {/* Quick Links */}
          <div className="col-span-1">
            <h3 className="font-bold text-lg mb-4">Quick Links</h3>
            <nav className="flex flex-col space-y-2">
              <Link 
                href="/privacy-policy"
                className="text-sm text-gray-600 hover:text-gray-900 transition-colors"
              >
                Privacy Policy
              </Link>
              <Link 
                href="/terms-of-use"
                className="text-sm text-gray-600 hover:text-gray-900 transition-colors"
              >
                Terms of Use
              </Link>
              <Link 
                href="/faq"
                className="text-sm text-gray-600 hover:text-gray-900 transition-colors"
              >
                FAQ
              </Link>
            </nav>
          </div>

          {/* Community Section */}
          <div className="col-span-1">
            <h3 className="font-bold text-lg mb-4">Join Our Community</h3>
            <div className="flex space-x-4">
              <a 
                href="https://x.com/collabrxyz" 
                target="_blank" 
                rel="noopener noreferrer"
                className="text-gray-600 hover:text-blue-400 transition-colors"
              >
                <FaXTwitter className="h-6 w-6" />
              </a>
              <a 
                href="https://www.linkedin.com/company/collabrxyz/" 
                target="_blank" 
                rel="noopener noreferrer"
                className="text-gray-600 hover:text-blue-700 transition-colors"
              >
                <FaLinkedin className="h-6 w-6" />
              </a>
              <a 
                href="https://discord.gg/H7P5AVQK" 
                target="_blank" 
                rel="noopener noreferrer"
                className="text-gray-600 hover:text-indigo-600 transition-colors"
              >
                <FaDiscord className="h-6 w-6" />
              </a>
            </div>
          </div>

          {/* Newsletter Section */}
          <div className="col-span-1">
            <h3 className="font-bold text-lg mb-4">Stay Updated</h3>
            <form onSubmit={handleSubscribe} className="space-y-2">
              <div className="flex gap-2">
                <Input
                  type="email"
                  placeholder="Enter your email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="flex-grow"
                  required
                />
                <Button type="submit" size="sm" variant="default" className="bg-[#008CFF] hover:bg-[#0070CC]">
                  <FaEnvelope className="h-4 w-4 mr-2" />
                  Subscribe
                </Button>
              </div>
              <p className="text-xs text-gray-500">
                Subscribe to get the latest updates and news from Collabr.
              </p>
            </form>
          </div>
        </div>

        {/* Copyright Section */}
        <div className="border-t border-gray-200 pt-8">
          <div className="text-center text-sm text-gray-600">
            © {new Date().getFullYear()} Collabr. All rights reserved.
          </div>
        </div>
      </div>
    </footer>
  )
}

export default Footer
