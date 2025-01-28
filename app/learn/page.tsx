'use client';
import React from 'react';

export default function LearnPage() {
  return (
    <main className="min-h-screen py-8 px-4 sm:py-12 sm:px-6 lg:px-8">
      <div className="max-w-4xl mx-auto">
        <h1 className="text-3xl font-bold mb-8 text-center">Learn</h1>
        
        {/* Video Section */}
        <div className="grid grid-cols-1 gap-8">
          <div className="max-w-3xl mx-auto w-full">
            How to create an asset
            <div style={{ position: 'relative', paddingBottom: '56.25%', height: '0' }}>
              {/* Loading Skeleton */}
              <div className="absolute inset-0 bg-gray-200 animate-pulse rounded-lg" />
              <iframe 
                src="https://www.loom.com/embed/f4f4a21e583d4844a63b04f2fd84d932?sid=60b360ac-06e3-4cbb-840f-ada6e3e3167d" 
                allowFullScreen
                style={{ position: 'absolute', top: '0', left: '0', width: '100%', height: '100%' }}
                loading="lazy"
              />
            </div>
          </div>

          <div className="max-w-3xl mx-auto w-full">
            How to create a remix
            <div style={{ position: 'relative', paddingBottom: '56.25%', height: '0' }}>
              {/* Loading Skeleton */}
              <div className="absolute inset-0 bg-gray-200 animate-pulse rounded-lg" />
              <iframe 
                src="https://www.loom.com/embed/c01449543e52480d8734a2ec5d136c44?sid=cae9aa1f-69d2-4692-abe3-abb51dec0cf5" 
                allowFullScreen
                style={{ position: 'absolute', top: '0', left: '0', width: '100%', height: '100%' }}
                loading="lazy"
              />
            </div>
          </div>

          <div className="max-w-3xl mx-auto w-full">
            How to approve a derivative work
            <div style={{ position: 'relative', paddingBottom: '56.25%', height: '0' }}>
              {/* Loading Skeleton */}
              <div className="absolute inset-0 bg-gray-200 animate-pulse rounded-lg" />
              <iframe 
                src="https://www.loom.com/embed/309c2bbc40cc433ba382000abab782e6?sid=73216319-39bd-4636-82e8-82d30ec1d081" 
                allowFullScreen
                style={{ position: 'absolute', top: '0', left: '0', width: '100%', height: '100%' }}
                loading="lazy"
              />
            </div>
          </div>
        </div>

        {/* Help Section */}
        <div className="mt-12 text-center">
          <p className="text-gray-600">
            Need more help? Join our{' '}
            <a
              href="https://discord.gg/gf2Q8BZQC8"
              target="_blank"
              rel="noopener noreferrer"
              className="text-blue-500 hover:text-blue-600"
            >
              Discord community
            </a>
            {' '}for support and updates.
          </p>
        </div>
      </div>
    </main>
  );
} 
