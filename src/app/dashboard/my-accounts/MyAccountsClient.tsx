'use client';

import UserHeader from '@/components/UserHeader';
import { useState } from 'react';

export default function MyAccountsClient() {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [darkMode, setDarkMode] = useState(true);

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
          <div className="flex items-center space-x-3">
            <div className="w-8 h-8 bg-[#A0C8A9] rounded-lg flex items-center justify-center">
              <span className="text-[#1E2E23] font-bold text-lg">R</span>
            </div>
            <span className={`font-bold text-lg ${darkMode ? 'text-white' : 'text-gray-900'}`}>RAZ CAPITALS</span>
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
            
            <a href="/dashboard/my-accounts" className={`flex items-center space-x-3 px-4 py-3 ${darkMode ? 'text-white bg-[#A0C8A9]/10 border-[#A0C8A9]' : 'text-gray-900 bg-blue-50 border-blue-500'} rounded-lg border-l-4`}>
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
              </svg>
              <span className="font-medium">My Accounts</span>
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

        {/* My Accounts Content */}
        <div className={`flex-1 p-4 sm:p-6 space-y-4 sm:space-y-6 overflow-y-auto ${darkMode ? 'bg-[#B8D4C1]' : 'bg-gray-50'}`}>
          {/* Page Title */}
          <div>
            <h2 className="text-xl sm:text-2xl font-bold text-[#1E2E23] mb-2">My Accounts</h2>
            <p className="text-[#2D4A35] text-sm sm:text-base">View and manage all your trading accounts and their performance.</p>
          </div>

          {/* Account Overview */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6">
            <div className="bg-[#2D4A35] rounded-lg p-4 sm:p-6 text-white">
              <h3 className="text-sm text-[#A0C8A9] mb-2">Total Accounts</h3>
              <p className="text-xl sm:text-2xl font-bold">3</p>
              <p className="text-xs text-[#A0C8A9]/70 mt-1">Active Trading Accounts</p>
            </div>
            <div className="bg-[#2D4A35] rounded-lg p-4 sm:p-6 text-white">
              <h3 className="text-sm text-[#A0C8A9] mb-2">Total Equity</h3>
              <p className="text-xl sm:text-2xl font-bold">$68,450.00</p>
              <p className="text-xs text-[#A0C8A9]/70 mt-1">Across All Accounts</p>
            </div>
            <div className="bg-[#2D4A35] rounded-lg p-4 sm:p-6 text-white sm:col-span-2 lg:col-span-1">
              <h3 className="text-sm text-[#A0C8A9] mb-2">Average Return</h3>
              <p className="text-xl sm:text-2xl font-bold text-green-400">+12.5%</p>
              <p className="text-xs text-[#A0C8A9]/70 mt-1">This Month</p>
            </div>
          </div>

          {/* Account List */}
          <div className="bg-[#2D4A35] rounded-lg p-4 sm:p-6">
            <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-4 sm:mb-6 space-y-3 sm:space-y-0">
              <h3 className="text-white text-base sm:text-lg font-medium">Trading Accounts</h3>
              <a href="/dashboard/new-account" className="bg-[#A0C8A9] text-[#1E2E23] px-3 sm:px-4 py-2 rounded-lg text-sm font-medium hover:bg-[#8FB89A] transition-colors w-full sm:w-auto text-center">
                Create New Account
              </a>
            </div>
            
            <div className="space-y-4">
              {/* Account 1 */}
              <div className="bg-[#B8D4C1] rounded-lg p-3 sm:p-4">
                <div className="flex flex-col sm:flex-row justify-between items-start mb-2 space-y-2 sm:space-y-0">
                  <div>
                    <h4 className="text-[#1E2E23] font-medium text-sm sm:text-base">Standard Trading Account</h4>
                    <p className="text-[#2D4A35] text-xs sm:text-sm">Account #: 1234567890</p>
                  </div>
                  <span className="bg-green-100 text-green-800 px-2 py-1 rounded text-xs font-medium">Active</span>
                </div>
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 sm:gap-4 mt-3 sm:mt-4">
                  <div>
                    <p className="text-[#2D4A35] text-xs">Balance</p>
                    <p className="text-[#1E2E23] font-bold text-sm sm:text-base">$25,000.00</p>
                  </div>
                  <div>
                    <p className="text-[#2D4A35] text-xs">Equity</p>
                    <p className="text-[#1E2E23] font-bold text-sm sm:text-base">$28,150.00</p>
                  </div>
                  <div>
                    <p className="text-[#2D4A35] text-xs">P&L</p>
                    <p className="text-green-600 font-bold text-sm sm:text-base">+$3,150.00</p>
                  </div>
                </div>
              </div>

              {/* Account 2 */}
              <div className="bg-[#B8D4C1] rounded-lg p-3 sm:p-4">
                <div className="flex flex-col sm:flex-row justify-between items-start mb-2 space-y-2 sm:space-y-0">
                  <div>
                    <h4 className="text-[#1E2E23] font-medium text-sm sm:text-base">Pro Trading Account</h4>
                    <p className="text-[#2D4A35] text-xs sm:text-sm">Account #: 1234567891</p>
                  </div>
                  <span className="bg-green-100 text-green-800 px-2 py-1 rounded text-xs font-medium">Active</span>
                </div>
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 sm:gap-4 mt-3 sm:mt-4">
                  <div>
                    <p className="text-[#2D4A35] text-xs">Balance</p>
                    <p className="text-[#1E2E23] font-bold text-sm sm:text-base">$50,000.00</p>
                  </div>
                  <div>
                    <p className="text-[#2D4A35] text-xs">Equity</p>
                    <p className="text-[#1E2E23] font-bold text-sm sm:text-base">$46,800.00</p>
                  </div>
                  <div>
                    <p className="text-[#2D4A35] text-xs">P&L</p>
                    <p className="text-red-600 font-bold text-sm sm:text-base">-$3,200.00</p>
                  </div>
                </div>
              </div>

              {/* Account 3 */}
              <div className="bg-[#B8D4C1] rounded-lg p-3 sm:p-4">
                <div className="flex flex-col sm:flex-row justify-between items-start mb-2 space-y-2 sm:space-y-0">
                  <div>
                    <h4 className="text-[#1E2E23] font-medium text-sm sm:text-base">Demo Account</h4>
                    <p className="text-[#2D4A35] text-xs sm:text-sm">Account #: 1234567892</p>
                  </div>
                  <span className="bg-blue-100 text-blue-800 px-2 py-1 rounded text-xs font-medium">Demo</span>
                </div>
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 sm:gap-4 mt-3 sm:mt-4">
                  <div>
                    <p className="text-[#2D4A35] text-xs">Balance</p>
                    <p className="text-[#1E2E23] font-bold text-sm sm:text-base">$10,000.00</p>
                  </div>
                  <div>
                    <p className="text-[#2D4A35] text-xs">Equity</p>
                    <p className="text-[#1E2E23] font-bold text-sm sm:text-base">$11,500.00</p>
                  </div>
                  <div>
                    <p className="text-[#2D4A35] text-xs">P&L</p>
                    <p className="text-green-600 font-bold text-sm sm:text-base">+$1,500.00</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
