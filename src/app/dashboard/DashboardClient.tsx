'use client';


import ErrorBoundary from '@/components/ErrorBoundary';
import UserBalanceDetails from '@/components/UserBalanceDetails';
import UserHeader from '@/components/UserHeader';
import { useDashboardMetrics } from '@/hooks/useDashboardMetrics';
import { useUserTradingAccountCounts } from '@/hooks/useUserTradingAccountCounts';
import { useRouter } from 'next/navigation';
import Image from 'next/image';
import { useState } from 'react';

export default function DashboardClient() {
  const router = useRouter();
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [darkMode, setDarkMode] = useState(true);
  const { metrics } = useDashboardMetrics();
  const { liveAccounts, demoAccounts, loading: userAccLoading } = useUserTradingAccountCounts();

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
        {/* Logo */}
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
            <a href="/dashboard" className={`flex items-center space-x-3 px-4 py-3 ${darkMode ? 'text-white bg-[#A0C8A9]/10 border-[#A0C8A9]' : 'text-gray-900 bg-blue-50 border-blue-500'} rounded-lg border-l-4`}>
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 7v10a2 2 0 002 2h14a2 2 0 002-2V9a2 2 0 00-2-2H5a2 2 0 00-2-2z" />
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 5a2 2 0 012-2h4a2 2 0 012 2v4H8V5z" />
              </svg>
              <span className="font-medium">Dashboard</span>
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
            
            <a href="/dashboard/deposit" className={`flex items-center space-x-3 px-4 py-3 ${darkMode ? 'text-[#A0C8A9]/70 hover:text-white hover:bg-[#A0C8A9]/10' : 'text-gray-600 hover:text-gray-900 hover:bg-gray-100'} rounded-lg transition-colors`}>
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 16a4 4 0 01-.88-7.903A5 5 0 1115.9 6L16 6a5 5 0 011 9.9M9 19l3 3m0 0l3-3m-3 3V10" />
              </svg>
              <span>Deposit</span>
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

        {/* Dashboard Content - Scrollable */}
        <div className={`flex-1 p-4 sm:p-6 space-y-4 sm:space-y-6 overflow-y-auto ${darkMode ? 'bg-[#B8D4C1]' : 'bg-gray-50'}`}>
          <ErrorBoundary>
            {/* Balance Cards - Dynamic from Supabase */}
            <UserBalanceDetails />



          {/* Action Buttons */}
          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-3 sm:gap-4">
            <button 
              onClick={() => router.push('/dashboard/deposit')}
              className={`${darkMode ? 'bg-[#2D4A35] hover:bg-[#3A5642] text-white' : 'bg-white hover:bg-gray-50 text-gray-900 border border-gray-200'} rounded-lg p-4 sm:p-6 transition-colors duration-200 flex flex-col items-center cursor-pointer`}
            >
              <div className="w-10 h-10 sm:w-12 sm:h-12 bg-[#A0C8A9] rounded-full flex items-center justify-center mb-2 sm:mb-3">
                <svg className="w-5 h-5 sm:w-6 sm:h-6 text-[#1E2E23]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 16a4 4 0 01-.88-7.903A5 5 0 1115.9 6L16 6a5 5 0 011 9.9M9 19l3 3m0 0l3-3m-3 3V10" />
                </svg>
              </div>
              <span className="text-xs sm:text-sm font-medium">Deposit</span>
            </button>
            
            <button 
              onClick={() => router.push('/dashboard/withdraw')}
              className={`${darkMode ? 'bg-[#2D4A35] hover:bg-[#3A5642] text-white' : 'bg-white hover:bg-gray-50 text-gray-900 border border-gray-200'} rounded-lg p-4 sm:p-6 transition-colors duration-200 flex flex-col items-center cursor-pointer`}
            >
              <div className="w-10 h-10 sm:w-12 sm:h-12 bg-[#A0C8A9] rounded-full flex items-center justify-center mb-2 sm:mb-3">
                <svg className="w-5 h-5 sm:w-6 sm:h-6 text-[#1E2E23]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 16a4 4 0 01-.88-7.903A5 5 0 1115.9 6L16 6a5 5 0 011 9.9M15 13l-3-3m0 0l-3 3m3-3v12" />
                </svg>
              </div>
              <span className="text-xs sm:text-sm font-medium">Withdraw</span>
            </button>
            
            <button 
              onClick={() => router.push('/dashboard/transfer')}
              className={`${darkMode ? 'bg-[#2D4A35] hover:bg-[#3A5642] text-white' : 'bg-white hover:bg-gray-50 text-gray-900 border border-gray-200'} rounded-lg p-4 sm:p-6 transition-colors duration-200 flex flex-col items-center cursor-pointer`}
            >
              <div className="w-10 h-10 sm:w-12 sm:h-12 bg-[#A0C8A9] rounded-full flex items-center justify-center mb-2 sm:mb-3">
                <svg className="w-5 h-5 sm:w-6 sm:h-6 text-[#1E2E23]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1" />
                </svg>
              </div>
              <span className="text-xs sm:text-sm font-medium">Transfer</span>
            </button>
            
            <button 
              onClick={() => router.push('/dashboard/my-accounts')}
              className={`${darkMode ? 'bg-[#2D4A35] hover:bg-[#3A5642] text-white' : 'bg-white hover:bg-gray-50 text-gray-900 border border-gray-200'} rounded-lg p-4 sm:p-6 transition-colors duration-200 flex flex-col items-center cursor-pointer`}
            >
              <div className="w-10 h-10 sm:w-12 sm:h-12 bg-[#A0C8A9] rounded-full flex items-center justify-center mb-2 sm:mb-3">
                <svg className="w-5 h-5 sm:w-6 sm:h-6 text-[#1E2E23]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                </svg>
              </div>
              <span className="text-xs sm:text-sm font-medium">Accounts</span>
            </button>
            
            <button 
              onClick={() => router.push('/dashboard/settings/kyc')}
              className={`${darkMode ? 'bg-[#2D4A35] hover:bg-[#3A5642] text-white' : 'bg-white hover:bg-gray-50 text-gray-900 border border-gray-200'} rounded-lg p-4 sm:p-6 transition-colors duration-200 flex flex-col items-center sm:col-span-3 lg:col-span-1 relative cursor-pointer`}
            >
              <div className="w-10 h-10 sm:w-12 sm:h-12 bg-[#A0C8A9] rounded-full flex items-center justify-center mb-2 sm:mb-3">
                <svg className="w-5 h-5 sm:w-6 sm:h-6 text-[#1E2E23]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
              </div>
              <span className="text-xs sm:text-sm font-medium">Verification</span>
              {metrics.kycPending > 0 && (
                <div className="absolute -top-2 -right-2 w-6 h-6 bg-red-500 rounded-full text-xs flex items-center justify-center text-white font-semibold">
                  {metrics.kycPending}
                </div>
              )}
            </button>
          </div>

          {/* Bottom Section */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 sm:gap-6">
            {/* Trading Accounts */}
            <div className={`${darkMode ? 'bg-[#2D4A35]' : 'bg-white border border-gray-200'} rounded-lg p-4 sm:p-6`}>
              <div className="flex justify-between items-center mb-4 sm:mb-6">
                <h2 className={`text-base sm:text-lg font-medium ${darkMode ? 'text-white' : 'text-gray-900'}`}>Trading Accounts</h2>
                <button className={`${darkMode ? 'text-[#A0C8A9] hover:text-white' : 'text-gray-600 hover:text-gray-900'} transition-colors`}>
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 12h.01M12 12h.01M19 12h.01M6 12a1 1 0 11-2 0 1 1 0 012 0zm7 0a1 1 0 11-2 0 1 1 0 012 0zm7 0a1 1 0 11-2 0 1 1 0 012 0z" />
                  </svg>
                </button>
              </div>
              
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 sm:gap-4">
                <div className={`${darkMode ? 'bg-[#B8D4C1]' : 'bg-gray-50'} rounded-lg p-3 sm:p-4`}>
                  <div className="flex justify-between items-center mb-2">
                    <h3 className={`text-xs sm:text-sm font-medium ${darkMode ? 'text-[#1E2E23]' : 'text-gray-700'}`}>Live Accounts:</h3>
                    <a href="/dashboard/my-accounts" className={`text-xs hover:underline ${darkMode ? 'text-[#1E2E23]' : 'text-gray-600'}`}>See All</a>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className={`text-xl sm:text-2xl font-bold ${darkMode ? 'text-[#1E2E23]' : 'text-gray-900'}`}>{userAccLoading ? '—' : liveAccounts}</span>
                    <a href="/dashboard/new-account" className={`${darkMode ? 'bg-[#2D4A35] text-white hover:bg-[#3A5642]' : 'bg-blue-600 text-white hover:bg-blue-700'} px-2 sm:px-3 py-1 rounded text-xs font-medium transition-colors`}>
                      Create Account
                    </a>
                  </div>
                </div>
                
                <div className={`${darkMode ? 'bg-[#B8D4C1]' : 'bg-gray-50'} rounded-lg p-3 sm:p-4`}>
                  <div className="flex justify-between items-center mb-2">
                    <h3 className={`text-xs sm:text-sm font-medium ${darkMode ? 'text-[#1E2E23]' : 'text-gray-700'}`}>Demo Accounts:</h3>
                    <a href="/dashboard/my-accounts" className={`text-xs hover:underline ${darkMode ? 'text-[#1E2E23]' : 'text-gray-600'}`}>See All</a>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className={`text-xl sm:text-2xl font-bold ${darkMode ? 'text-[#1E2E23]' : 'text-gray-900'}`}>{userAccLoading ? '—' : demoAccounts}</span>
                    <a href="/dashboard/new-account" className={`${darkMode ? 'bg-[#2D4A35] text-white hover:bg-[#3A5642]' : 'bg-blue-600 text-white hover:bg-blue-700'} px-2 sm:px-3 py-1 rounded text-xs font-medium transition-colors`}>
                      Create Account
                    </a>
                  </div>
                </div>
              </div>
            </div>

            {/* Recent Transactions */}
            <div className={`${darkMode ? 'bg-[#2D4A35]' : 'bg-white border border-gray-200'} rounded-lg p-4 sm:p-6`}>
              <div className="flex justify-between items-center mb-4 sm:mb-6">
                <h2 className={`text-base sm:text-lg font-medium ${darkMode ? 'text-white' : 'text-gray-900'}`}>Recent Transactions</h2>
                <a href="#" className={`text-sm hover:underline ${darkMode ? 'text-[#A0C8A9] hover:text-white' : 'text-blue-600 hover:text-blue-800'} transition-colors`}>See All</a>
              </div>
              
              <div className={`text-center py-6 sm:py-8 ${darkMode ? 'text-[#A0C8A9]/60' : 'text-gray-500'}`}>
                <svg className="w-10 h-10 sm:w-12 sm:h-12 mx-auto mb-3 opacity-50" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5H7a2 2 0 00-2 2v8a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2" />
                </svg>
                <p className="text-sm">No recent transactions</p>
              </div>
            </div>
          </div>
          </ErrorBoundary>
        </div>
      </div>


    </div>
  );
}
