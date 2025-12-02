'use client';

import UserHeader from '@/components/UserHeader';
import Image from 'next/image';
import { useState } from 'react';

export default function DepositClient() {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [darkMode, setDarkMode] = useState(true);

  const depositMethods = [
    {
      id: 'cash',
      title: 'Cash Payments',
      icon: (
        <div className="w-12 h-12 bg-green-100 rounded-lg flex items-center justify-center">
          <svg className="w-8 h-8 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1" />
          </svg>
        </div>
      ),
      processingTime: 'Instant On Payment',
      fee: '0',
      limits: '10 - 5000000 AED'
    },
    {
      id: 'perfect-money',
      title: 'Perfect Money',
      icon: (
        <div className="w-12 h-12 bg-red-100 rounded-lg flex items-center justify-center">
          <div className="w-8 h-8 bg-red-500 rounded flex items-center justify-center">
            <span className="text-white text-xs font-bold">PM</span>
          </div>
        </div>
      ),
      processingTime: '15 Minutes To 24 Hours',
      fee: '0',
      limits: '10 - 200000 USD'
    },
    {
      id: 'skrill',
      title: 'Skrill',
      icon: (
        <div className="w-12 h-12 bg-purple-100 rounded-lg flex items-center justify-center">
          <div className="w-8 h-8 bg-purple-500 rounded flex items-center justify-center">
            <span className="text-white text-xs font-bold">S</span>
          </div>
        </div>
      ),
      processingTime: '15 Minutes To 24 Hours',
      fee: '0',
      limits: '10 - 200000 USD'
    },
    {
      id: 'crypto',
      title: 'CRYPTO USDT - TRC 20',
      icon: (
        <div className="w-12 h-12 bg-green-100 rounded-full flex items-center justify-center">
          <div className="w-8 h-8 bg-green-500 rounded-full flex items-center justify-center">
            <span className="text-white text-xs font-bold">T</span>
          </div>
        </div>
      ),
      processingTime: '15 Minutes To 24 Hours',
      fee: '0',
      limits: '10 - 1000000 USD'
    },
    {
      id: 'inr-bank',
      title: 'INR BANK',
      icon: (
        <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center">
          <svg className="w-8 h-8 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 10h18M7 15h1m4 0h1m-7 4h12a3 3 0 003-3V8a3 3 0 00-3-3H6a3 3 0 00-3 3v8a3 3 0 003 3z" />
          </svg>
        </div>
      ),
      processingTime: '15 Minutes To 24 Hours',
      fee: '0',
      limits: '30 - 1000000 INR'
    }
  ];

  return (
    <div className={`flex h-screen overflow-hidden ${darkMode ? 'bg-[#0A2E1D]' : 'bg-gray-100'}`}>
      {/* Mobile Sidebar Overlay */}
      {sidebarOpen && (
        <div 
          className="fixed inset-0 bg-black bg-opacity-50 z-40 lg:hidden"
          onClick={() => setSidebarOpen(false)}
        />
      )}

      {/* Sidebar */}
      <div className={`fixed inset-y-0 left-0 z-50 w-64 ${darkMode ? 'bg-[#0F1B14] border-[#A0C8A9]/20' : 'bg-white border-gray-200'} border-r flex flex-col transform transition-transform duration-300 ease-in-out lg:translate-x-0 lg:static lg:inset-0 ${
        sidebarOpen ? 'translate-x-0' : '-translate-x-full'
      }`}>
        <div className={`p-6 border-b ${darkMode ? 'border-[#A0C8A9]/20' : 'border-gray-200'}`}>
          <div className="flex items-center">
            <Image
              src="/logo/raz-capitals-logo.png"
              alt="RAZ CAPITALS"
              width={170}
              height={63}
              priority
              className="h-14 w-auto"
            />
          </div>
        </div>

        {/* Navigation - Scrollable Area */}
        <div className="flex-1 overflow-y-auto">
          <nav className="px-4 py-6 space-y-2">
            <a href="/dashboard" className={`flex items-center space-x-3 px-4 py-3 ${darkMode ? 'text-[#A0C8A9]/70 hover:text-white hover:bg-[#A0C8A9]/10' : 'text-gray-600 hover:text-gray-900 hover:bg-gray-100'} rounded-lg transition-colors`}>
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 7v10a2 2 0 002 2h14a2 2 0 002-2V9a2 2 0 00-2-2H5a2 2 0 00-2-2z" />
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 5a2 2 0 012-2h4a2 2 0 012 2v4H8V5z" />
              </svg>
              <span>Dashboard</span>
            </a>
            <a href="/dashboard/wallets" className={`flex items-center space-x-3 px-4 py-3 ${darkMode ? 'text-[#A0C8A9]/70 hover:text-white hover:bg-[#A0C8A9]/10' : 'text-gray-600 hover:text-gray-900 hover:bg-gray-100'} rounded-lg transition-colors`}>
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 10h18M7 15h1m4 0h1m-7 4h12a3 3 0 003-3V8a3 3 0 00-3-3H6a3 3 0 00-3 3v8a3 3 0 003 3z" />
              </svg>
              <span>Wallets</span>
            </a>
            <a href="/dashboard/my-accounts" className={`flex items-center space-x-3 px-4 py-3 ${darkMode ? 'text-[#A0C8A9]/70 hover:text-white hover:bg-[#A0C8A9]/10' : 'text-gray-600 hover:text-gray-900 hover:bg-gray-100'} rounded-lg transition-colors`}>
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
              </svg>
              <span>My Accounts</span>
            </a>
            <a href="/dashboard/new-account" className={`flex items-center space-x-3 px-4 py-3 ${darkMode ? 'text-[#A0C8A9]/70 hover:text-white hover:bg-[#A0C8A9]/10' : 'text-gray-600 hover:text-gray-900 hover:bg-gray-100'} rounded-lg transition-colors`}>
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M18 9v3m0 0v3m0-3h3m-3 0h-3m-2-5a4 4 0 11-8 0 4 4 0 018 0zM3 20a6 6 0 0112 0v1H3v-1z" />
              </svg>
              <span>New Account</span>
            </a>
            <a href="/dashboard/deposit" className={`flex items-center space-x-3 px-4 py-3 ${darkMode ? 'text-white bg-[#A0C8A9]/10 border-[#A0C8A9]' : 'text-gray-900 bg-blue-50 border-blue-500'} rounded-lg border-l-4`}>
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 16a4 4 0 01-.88-7.903A5 5 0 1115.9 6L16 6a5 5 0 011 9.9M9 19l3 3m0 0l3-3m-3 3V10" />
              </svg>
              <span className="font-medium">Deposit</span>
            </a>
            <a href="/dashboard/transfer" className={`flex items-center space-x-3 px-4 py-3 ${darkMode ? 'text-[#A0C8A9]/70 hover:text-white hover:bg-[#A0C8A9]/10' : 'text-gray-600 hover:text-gray-900 hover:bg-gray-100'} rounded-lg transition-colors`}>
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7h12m0 0l-4-4m4 4l-4 4m0 6H4m0 0l4 4m-4-4l4-4" />
              </svg>
              <span>Transfer</span>
            </a>
            <a href="/dashboard/withdraw" className={`flex items-center space-x-3 px-4 py-3 ${darkMode ? 'text-[#A0C8A9]/70 hover:text-white hover:bg-[#A0C8A9]/10' : 'text-gray-600 hover:text-gray-900 hover:bg-gray-100'} rounded-lg transition-colors`}>
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 16a4 4 0 01-.88-7.903A5 5 0 1115.9 6L16 6a5 5 0 011 9.9M15 13l-3-3m0 0l-3 3m3-3v12" />
              </svg>
              <span>Withdraw</span>
            </a>
            <a href="/dashboard/history" className={`flex items-center space-x-3 px-4 py-3 ${darkMode ? 'text-[#A0C8A9]/70 hover:text-white hover:bg-[#A0C8A9]/10' : 'text-gray-600 hover:text-gray-900 hover:bg-gray-100'} rounded-lg transition-colors`}>
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
              <span>History</span>
            </a>
          </nav>
        </div>
        
        {/* Settings at bottom */}
        <div className={`p-4 border-t ${darkMode ? 'border-[#A0C8A9]/20' : 'border-gray-200'}`}>
          <a href="/dashboard/settings" className={`flex items-center space-x-3 px-4 py-3 ${darkMode ? 'text-[#A0C8A9]/70 hover:text-white hover:bg-[#A0C8A9]/10' : 'text-gray-600 hover:text-gray-900 hover:bg-gray-100'} rounded-lg transition-colors`}>
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z" />
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
            </svg>
            <span>Settings</span>
          </a>
        </div>
      </div>

      {/* Main Content */}
      <div className="flex-1 flex flex-col overflow-hidden">
        {/* Top Header */}
        <UserHeader 
          sidebarOpen={sidebarOpen}
          setSidebarOpen={setSidebarOpen}
          darkMode={darkMode}
          setDarkMode={setDarkMode}
        />

        {/* Deposit Content */}
        <div className={`flex-1 p-6 space-y-6 overflow-y-auto ${darkMode ? 'bg-[#B8D4C1]' : 'bg-gray-50'}`}>
          {/* Header Section */}
          <div className="text-center">
            <h1 className="text-3xl font-bold text-[#1E2E23] mb-2">Deposit Methods</h1>
            <p className="text-[#2D4A35]">Choose your preferred deposit method</p>
          </div>

          {/* Deposit Methods Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 max-w-6xl mx-auto">
            {depositMethods.map((method) => (
              <div key={method.id} className="bg-[#2D4A35] border border-[#A0C8A9]/20 rounded-lg p-6 shadow-sm hover:shadow-md transition-shadow">
                {/* Method Header */}
                <div className="flex justify-between items-start mb-4">
                  <div className="flex items-center space-x-3">
                    {method.icon}
                    <h2 className="text-xl font-bold text-white">{method.title}</h2>
                  </div>
                  <span className="px-3 py-1 text-xs font-medium bg-[#A0C8A9]/20 text-[#A0C8A9] rounded-full">
                    Verification required
                  </span>
                </div>

                {/* Method Details */}
                <div className="space-y-3">
                  <div>
                    <p className="text-sm text-[#A0C8A9]/70 mb-1">Processing Time</p>
                    <p className="text-sm font-medium text-[#A0C8A9]">{method.processingTime}</p>
                  </div>
                  
                  <div>
                    <p className="text-sm text-[#A0C8A9]/70 mb-1">Fee</p>
                    <p className="text-sm font-medium text-[#A0C8A9]">${method.fee}</p>
                  </div>
                  
                  <div>
                    <p className="text-sm text-[#A0C8A9]/70 mb-1">Limits</p>
                    <p className="text-sm font-medium text-[#A0C8A9]">{method.limits}</p>
                  </div>
                </div>

                {/* Action Button */}
                <button className="w-full mt-6 bg-[#0A2E1D] text-white py-3 px-4 rounded-lg font-medium hover:bg-[#0F1B14] transition-colors">
                  Deposit Now
                </button>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
