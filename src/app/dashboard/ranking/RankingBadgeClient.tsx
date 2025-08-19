'use client';

import { useRouter } from 'next/navigation';

export default function RankingBadgeClient() {
  const router = useRouter();

  const handleBack = () => {
    router.back();
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-black text-white px-6 py-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-4">
            {/* Logo */}
            <div className="flex items-center space-x-3">
              <div className="w-10 h-10 bg-[#A0C8A9] rounded-full flex items-center justify-center">
                <span className="text-black font-bold text-xl">R</span>
              </div>
              <span className="text-xl font-bold">RAZ CAPITALS</span>
            </div>
            
            {/* Hamburger Menu */}
            <button className="p-2 hover:bg-gray-800 rounded">
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
              </svg>
            </button>
            
            {/* User Name */}
            <div className="flex items-center space-x-2">
              <span className="font-medium">SYED ANWAR</span>
              <button className="w-5 h-5 bg-red-500 rounded-full flex items-center justify-center text-white text-xs font-bold">
                ×
              </button>
            </div>
          </div>
          
          {/* Header Icons */}
          <div className="flex items-center space-x-4">
            {/* Dark Mode Toggle */}
            <button className="p-2 hover:bg-gray-800 rounded">
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M20.354 15.354A9 9 0 018.646 3.646 9.003 9.003 0 0012 21a9.003 9.003 0 008.354-5.646z" />
              </svg>
            </button>
            
            {/* Language Selector */}
            <button className="p-2 hover:bg-gray-800 rounded">
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3.055 11H5a2 2 0 012 2v1a2 2 0 002 2 2 2 0 012 2v2.945M8 3.935V5.5A2.5 2.5 0 0010.5 8h.5a2 2 0 012 2 2 2 0 104 0 2 2 0 012-2h1.064M15 20.488V18a2 2 0 012-2h3.064M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
            </button>
            
            {/* Notifications */}
            <button className="p-2 hover:bg-gray-800 rounded relative">
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 17h5l-5 5v-5zM4.828 7l4.95 4.95A7 7 0 1015.95 6L21 1M12 8a3 3 0 11-6 0 3 3 0 016 0z" />
              </svg>
              <span className="absolute -top-1 -right-1 bg-red-500 text-white text-xs rounded-full h-5 w-5 flex items-center justify-center">
                0
              </span>
            </button>
            
            {/* Full Screen Toggle */}
            <button className="p-2 hover:bg-gray-800 rounded">
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 8V4m0 0h4M4 4l5 5m11-1V4m0 0h-4m4 0l-5 5M4 16v4m0 0h4m-4 0l5-5m11 5l-5-5m5 5v-4m0 4h-4" />
              </svg>
            </button>
            
            {/* Profile Avatar */}
            <div className="w-8 h-8 bg-[#A0C8A9] rounded-full flex items-center justify-center border-2 border-yellow-400">
              <span className="text-black font-medium text-sm">S</span>
            </div>
            
            {/* Grid Menu */}
            <button className="p-2 hover:bg-gray-800 rounded">
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2H6a2 2 0 01-2-2V6zM14 6a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2V6zM4 16a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2H6a2 2 0 01-2-2v-2zM14 16a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2v-2z" />
              </svg>
            </button>
          </div>
        </div>
      </header>

      {/* Navigation Path */}
      <div className="bg-white border-b border-gray-200 px-6 py-3">
        <div className="flex items-center space-x-2 text-sm text-gray-600">
          <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6" />
          </svg>
          <span>Dashboard</span>
          <span>&gt;</span>
          <span className="text-gray-900 font-medium">All The Badges</span>
        </div>
      </div>

      {/* Main Content */}
      <div className="flex-1 px-6 py-8">
        <div className="max-w-6xl mx-auto">
          {/* Page Title */}
          <h1 className="text-3xl font-bold text-gray-900 mb-8 text-center">All The Badges</h1>
          
          {/* Badges Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {/* Bronze Badge - Unlocked */}
            <div className="flex flex-col items-center">
              <div className="w-32 h-32 bg-gradient-to-br from-amber-400 to-amber-600 rounded-full flex flex-col items-center justify-center mb-4 shadow-lg">
                {/* Badge Icon Placeholder */}
                <div className="w-16 h-16 bg-white/20 rounded-full flex items-center justify-center mb-2">
                  <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4M7.835 4.697a3.42 3.42 0 001.946-.806 3.42 3.42 0 014.438 0 3.42 3.42 0 001.946.806 3.42 3.42 0 013.138 3.138 3.42 3.42 0 00.806 1.946 3.42 3.42 0 010 4.438 3.42 3.42 0 00-.806 1.946 3.42 3.42 0 01-3.138 3.138 3.42 3.42 0 00-1.946.806 3.42 3.42 0 01-4.438 0 3.42 3.42 0 00-1.946-.806 3.42 3.42 0 01-3.138-3.138 3.42 3.42 0 00-.806-1.946 3.42 3.42 0 010-4.438 3.42 3.42 0 00.806-1.946 3.42 3.42 0 013.138-3.138z" />
                  </svg>
                </div>
                <span className="text-white font-bold text-lg">Bronze</span>
              </div>
              <p className="text-center text-gray-700 font-medium">Gain Points on every activity</p>
              <div className="mt-2 px-3 py-1 bg-green-100 text-green-800 text-xs font-medium rounded-full">
                Unlocked
              </div>
            </div>

            {/* Silver Badge - Locked */}
            <div className="flex flex-col items-center">
              <div className="w-32 h-32 bg-gradient-to-br from-gray-400 to-gray-600 rounded-full flex flex-col items-center justify-center mb-4 shadow-lg relative">
                {/* Badge Icon Placeholder */}
                <div className="w-16 h-16 bg-white/20 rounded-full flex items-center justify-center mb-2">
                  <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4M7.835 4.697a3.42 3.42 0 001.946-.806 3.42 3.42 0 014.438 0 3.42 3.42 0 001.946.806 3.42 3.42 0 013.138 3.138 3.42 3.42 0 00.806 1.946 3.42 3.42 0 010 4.438 3.42 3.42 0 00-.806 1.946 3.42 3.42 0 01-3.138 3.138 3.42 3.42 0 00-1.946.806 3.42 3.42 0 01-4.438 0 3.42 3.42 0 00-1.946-.806 3.42 3.42 0 01-3.138-3.138 3.42 3.42 0 00-.806-1.946 3.42 3.42 0 010-4.438 3.42 3.42 0 00.806-1.946 3.42 3.42 0 013.138-3.138z" />
                  </svg>
                </div>
                <span className="text-white font-bold text-lg">Silver</span>
                
                {/* Lock Icon Overlay */}
                <div className="absolute inset-0 bg-black/30 rounded-full flex items-center justify-center">
                  <svg className="w-16 h-16 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
                  </svg>
                </div>
              </div>
              <p className="text-center text-gray-700 font-medium">Gain more with Silver Rank</p>
              <div className="mt-2 px-3 py-1 bg-gray-100 text-gray-600 text-xs font-medium rounded-full">
                Locked
              </div>
            </div>

            {/* Gold Badge - Locked */}
            <div className="flex flex-col items-center">
              <div className="w-32 h-32 bg-gradient-to-br from-gray-400 to-gray-600 rounded-full flex flex-col items-center justify-center mb-4 shadow-lg relative">
                {/* Badge Icon Placeholder */}
                <div className="w-16 h-16 bg-white/20 rounded-full flex items-center justify-center mb-2">
                  <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4M7.835 4.697a3.42 3.42 0 001.946-.806 3.42 3.42 0 014.438 0 3.42 3.42 0 001.946.806 3.42 3.42 0 013.138 3.138 3.42 3.42 0 00.806 1.946 3.42 3.42 0 010 4.438 3.42 3.42 0 00-.806 1.946 3.42 3.42 0 01-3.138 3.138 3.42 3.42 0 00-1.946.806 3.42 3.42 0 01-4.438 0 3.42 3.42 0 00-1.946-.806 3.42 3.42 0 01-3.138-3.138 3.42 3.42 0 00-.806-1.946 3.42 3.42 0 010-4.438 3.42 3.42 0 00.806-1.946 3.42 3.42 0 013.138-3.138z" />
                  </svg>
                </div>
                <span className="text-white font-bold text-lg">Gold</span>
                
                {/* Lock Icon Overlay */}
                <div className="absolute inset-0 bg-black/30 rounded-full flex items-center justify-center">
                  <svg className="w-16 h-16 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
                  </svg>
                </div>
              </div>
              <p className="text-center text-gray-700 font-medium">Exclusive perks with Gold Rank</p>
              <div className="mt-2 px-3 py-1 bg-gray-100 text-gray-600 text-xs font-medium rounded-full">
                Locked
              </div>
            </div>

            {/* Platinum Badge - Locked */}
            <div className="flex flex-col items-center">
              <div className="w-32 h-32 bg-gradient-to-br from-gray-400 to-gray-600 rounded-full flex flex-col items-center justify-center mb-4 shadow-lg relative">
                {/* Badge Icon Placeholder */}
                <div className="w-16 h-16 bg-white/20 rounded-full flex items-center justify-center mb-2">
                  <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4M7.835 4.697a3.42 3.42 0 001.946-.806 3.42 3.42 0 014.438 0 3.42 3.42 0 001.946.806 3.42 3.42 0 013.138 3.138 3.42 3.42 0 00.806 1.946 3.42 3.42 0 010 4.438 3.42 3.42 0 00-.806 1.946 3.42 3.42 0 01-3.138 3.138 3.42 3.42 0 00-1.946.806 3.42 3.42 0 01-4.438 0 3.42 3.42 0 00-1.946-.806 3.42 3.42 0 01-3.138-3.138 3.42 3.42 0 00-.806-1.946 3.42 3.42 0 010-4.438 3.42 3.42 0 00.806-1.946 3.42 3.42 0 013.138-3.138z" />
                  </svg>
                </div>
                <span className="text-white font-bold text-lg">Platinum</span>
                
                {/* Lock Icon Overlay */}
                <div className="absolute inset-0 bg-black/30 rounded-full flex items-center justify-center">
                  <svg className="w-16 h-16 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
                  </svg>
                </div>
              </div>
              <p className="text-center text-gray-700 font-medium">Highest Level Benefits with Platinum Rank</p>
              <div className="mt-2 px-3 py-1 bg-gray-100 text-gray-600 text-xs font-medium rounded-full">
                Locked
              </div>
            </div>
          </div>

          {/* Progress Information */}
          <div className="mt-12 text-center">
            <h2 className="text-xl font-semibold text-gray-900 mb-4">Your Progress</h2>
            <div className="bg-white rounded-lg shadow-md p-6 max-w-md mx-auto">
              <div className="flex items-center justify-between mb-4">
                <span className="text-gray-700">Current Rank:</span>
                <span className="text-amber-600 font-bold text-lg">Bronze</span>
              </div>
              <div className="flex items-center justify-between mb-4">
                <span className="text-gray-700">Next Rank:</span>
                <span className="text-gray-600 font-medium">Silver</span>
              </div>
              <div className="w-full bg-gray-200 rounded-full h-3">
                <div className="bg-amber-500 h-3 rounded-full" style={{ width: '25%' }}></div>
              </div>
              <p className="text-sm text-gray-600 mt-2">25% to Silver Rank</p>
            </div>
          </div>
        </div>
      </div>

      {/* Footer */}
      <footer className="fixed bottom-4 left-4 text-sm text-gray-500">
        All rights reserved @RAZ CAPITALS
      </footer>

      {/* Chat Widget */}
      <div className="fixed bottom-4 right-4">
        <div className="relative">
          {/* Chat Bubble */}
          <div className="bg-white rounded-lg shadow-lg p-4 mb-2 max-w-xs">
            <p className="text-sm text-gray-800 font-medium">Hey there!</p>
            <p className="text-sm text-gray-600">How can we help you?</p>
          </div>
          
          {/* Chat Icon */}
          <button className="w-12 h-12 bg-gray-400 rounded-full flex items-center justify-center hover:bg-gray-500 transition-colors">
            <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z" />
            </svg>
          </button>
        </div>
      </div>
    </div>
  );
}
