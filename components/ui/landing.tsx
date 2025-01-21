import React from 'react';
import ConnectWallet from './connect-wallet';

export default function LandingPage() {
  return (
    <div className="relative min-h-screen overflow-hidden">
      {/* Background container */}
      <div className="absolute inset-0">
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

      {/* Main content */}
      <div className="relative container mx-auto px-4 py-12">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-center">
          {/* Left side - Description and Button */}
          <div className="space-y-6">
            <h1 className="text-4xl font-bold bg-gradient-to-r from-blue-600 via-blue-400 to-blue-500 bg-clip-text text-transparent">
                New way to monetize your NFTs.
            </h1>
            <p className="text-lg text-gray-600 dark:text-gray-300">
              Collabr is a platform that enables seamless collaboration
              and connection in the Web3 space. Join us in building the future of
              decentralized collaboration.
            </p>
            <div className="pt-4">
              <ConnectWallet />
            </div>
          </div>

          {/* Right side - Demo Videos */}
          <div className="space-y-6">
            <h3 className="text-xl font-bold relative">
              <span className="bg-gradient-to-r from-purple-600 via-purple-400 to-purple-500 bg-clip-text text-transparent">
                How to create an asset
              </span>
              <div className="absolute -bottom-1 left-0 w-1/3 h-0.5 bg-gradient-to-r from-purple-600 to-transparent"></div>
            </h3>
            <div style={{
              position: 'relative', 
              paddingBottom: '64.86486486486486%', 
              height: 0,
              borderRadius: '13px',
              overflow: 'hidden'
            }}>
            <iframe 
                src="https://www.loom.com/embed/f4f4a21e583d4844a63b04f2fd84d932?sid=b7386fe0-6ed8-4630-82ff-466221054e1c&hideEmbedTopBar=true"
                allow="fullscreen"
                allowFullScreen
                style={{position: 'absolute', top: 0, left: 0, width: '100%', height: '100%'}}
              />
            </div>

            <h3 className="text-xl font-bold relative">
              <span className="bg-gradient-to-r from-indigo-600 via-indigo-400 to-indigo-500 bg-clip-text text-transparent">
                How to create a remix
              </span>
              <div className="absolute -bottom-1 left-0 w-1/3 h-0.5 bg-gradient-to-r from-indigo-600 to-transparent"></div>
            </h3>
            <div style={{
              position: 'relative', 
              paddingBottom: '64.86486486486486%', 
              height: 0,
              borderRadius: '13px',
              overflow: 'hidden'
            }}>              
            <iframe 
                src="https://www.loom.com/embed/c01449543e52480d8734a2ec5d136c44?sid=efcbd303-b693-46c7-8657-78721703986f&hideEmbedTopBar=true"
                allow="fullscreen"
                allowFullScreen
                style={{position: 'absolute', top: 0, left: 0, width: '100%', height: '100%'}}
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
} 