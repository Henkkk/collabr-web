import React from 'react';
import ConnectWallet from '../../components/ui/connect-wallet';

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
            <div className="aspect-video rounded-lg overflow-hidden shadow-lg">
              <iframe
                width="100%"
                height="100%"
                src="https://www.youtube.com/embed/tzEwyEFvPcQ"
                title="Collabr Demo Video 1"
                frameBorder="0"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                allowFullScreen
                className="w-full h-full"
              />
            </div>
            <div className="aspect-video rounded-lg overflow-hidden shadow-lg">
              <iframe
                width="100%"
                height="100%"
                src="https://www.youtube.com/embed/TFACQvLSNp0"
                title="Collabr Demo Video 2"
                frameBorder="0"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                allowFullScreen
                className="w-full h-full"
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}