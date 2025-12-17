'use client';

import { Feature } from '@/types';

const features: Feature[] = [
  {
    id: 'security',
    title: 'Bank-Grade Security',
    description: 'Your investments are protected with enterprise-level security and encryption.',
    icon: '🛡️'
  },
  {
    id: 'speed',
    title: 'Lightning Fast',
    description: 'Execute trades instantly with our high-performance trading engine.',
    icon: '⚡'
  },
  {
    id: 'analytics',
    title: 'Advanced Analytics',
    description: 'Make informed decisions with comprehensive market analysis tools.',
    icon: '📊'
  },
  {
    id: 'global',
    title: 'Global Markets',
    description: 'Access markets worldwide with real-time data and seamless trading.',
    icon: '🌍'
  },
  {
    id: 'support',
    title: 'Expert Support',
    description: '24/7 customer support from our team of trading professionals.',
    icon: '🎧'
  },
  {
    id: 'realtime',
    title: 'Real-Time Data',
    description: 'Stay ahead with live market data and instant notifications.',
    icon: '⏰'
  }
];

export default function FeatureCards() {
  return (
    <section className="py-20" style={{backgroundColor: '#F7F7F2'}}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {/* Extensive Market Choice */}
          <div className="bg-white p-8 rounded-md shadow-sm">
            <h3 className="text-xl font-bold text-gray-900 mb-2">Extensive Market Choice</h3>
            <p className="text-gray-600 text-sm mb-6">Trade across including Forex, metals, crypto, and more.</p>
            <div className="flex flex-wrap justify-center items-center gap-3">
              <div className="w-10 h-10 flex items-center justify-center bg-red-600 rounded-full">
                <span className="text-white font-bold">T</span>
              </div>
              <div className="w-10 h-10 flex items-center justify-center bg-yellow-500 rounded-full">
                <span className="text-white font-bold">₿</span>
              </div>
              <div className="w-10 h-10 flex items-center justify-center bg-blue-600 rounded-full">
                <span className="text-white font-bold">$</span>
              </div>
              <div className="w-10 h-10 flex items-center justify-center bg-red-600 rounded-full">
                <span className="text-white font-bold">T</span>
              </div>
              <div className="w-10 h-10 flex items-center justify-center bg-yellow-500 rounded-full">
                <span className="text-white font-bold">₿</span>
              </div>
              <div className="w-10 h-10 flex items-center justify-center bg-blue-600 rounded-full">
                <span className="text-white font-bold">$</span>
              </div>
              <div className="w-10 h-10 flex items-center justify-center bg-red-600 rounded-full">
                <span className="text-white font-bold">T</span>
              </div>
              <div className="w-10 h-10 flex items-center justify-center bg-yellow-500 rounded-full">
                <span className="text-white font-bold">₿</span>
              </div>
            </div>
          </div>

          {/* Lightning Fast */}
          <div className="bg-white p-8 rounded-md shadow-sm">
            <h3 className="text-xl font-bold text-gray-900 mb-2">Lightning Fast.</h3>
            <p className="text-gray-600 text-sm mb-6">Never miss an opportunity again with execution speeds of &lt;10ms on all your trades.</p>
            <div className="flex flex-wrap justify-center items-center gap-4">
              <div className="w-10 h-10 flex items-center justify-center">
                <svg className="w-8 h-8 text-yellow-400" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M13 10V3L4 14h7v7l9-11h-7z" />
                </svg>
              </div>
              <div className="w-10 h-10 flex items-center justify-center">
                <svg className="w-8 h-8 text-yellow-400" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M13 10V3L4 14h7v7l9-11h-7z" />
                </svg>
              </div>
              <div className="w-10 h-10 flex items-center justify-center">
                <svg className="w-8 h-8 text-yellow-400" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M13 10V3L4 14h7v7l9-11h-7z" />
                </svg>
              </div>
              <div className="w-10 h-10 flex items-center justify-center">
                <svg className="w-8 h-8 text-yellow-400" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M13 10V3L4 14h7v7l9-11h-7z" />
                </svg>
              </div>
              <div className="w-10 h-10 flex items-center justify-center">
                <svg className="w-8 h-8 text-yellow-400" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M13 10V3L4 14h7v7l9-11h-7z" />
                </svg>
              </div>
              <div className="w-10 h-10 flex items-center justify-center">
                <svg className="w-8 h-8 text-yellow-400" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M13 10V3L4 14h7v7l9-11h-7z" />
                </svg>
              </div>
            </div>
          </div>

          {/* Market-Leading Spreads */}
          <div className="bg-white p-8 rounded-md shadow-sm">
            <h3 className="text-xl font-bold text-gray-900 mb-2">Market-Leading Spreads</h3>
            <p className="text-gray-600 text-sm mb-6">Tight spreads, zero commissions* & no hidden fees with customised rates available upon request.</p>
            <div className="flex flex-wrap justify-center items-center gap-3">
              <div className="w-10 h-10 flex items-center justify-center">
                <span className="text-green-500 text-xl font-bold">₹</span>
              </div>
              <div className="w-10 h-10 flex items-center justify-center">
                <span className="text-green-500 text-xl font-bold">€</span>
              </div>
              <div className="w-10 h-10 flex items-center justify-center">
                <span className="text-green-500 text-xl font-bold">﷼</span>
              </div>
              <div className="w-10 h-10 flex items-center justify-center">
                <span className="text-green-500 text-xl font-bold">$</span>
              </div>
              <div className="w-10 h-10 flex items-center justify-center">
                <span className="text-green-500 text-xl font-bold">¥</span>
              </div>
              <div className="w-10 h-10 flex items-center justify-center">
                <span className="text-green-500 text-xl font-bold">د.إ</span>
              </div>
              <div className="w-10 h-10 flex items-center justify-center">
                <span className="text-green-500 text-xl font-bold">£</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
} 