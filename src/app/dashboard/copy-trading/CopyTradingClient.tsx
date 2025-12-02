'use client';

import UserHeader from '@/components/UserHeader';
import { useState } from 'react';

export default function CopyTradingClient() {
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
        <UserHeader 
          sidebarOpen={sidebarOpen}
          setSidebarOpen={setSidebarOpen}
          darkMode={darkMode}
          setDarkMode={setDarkMode}
        />

        {/* Copy Trading Content */}
        <div className={`flex-1 p-6 space-y-6 overflow-y-auto ${darkMode ? 'bg-[#B8D4C1]' : 'bg-gray-50'}`}>
          <div>
            <h2 className="text-2xl font-bold text-[#1E2E23] mb-2">Copy Trading</h2>
            <p className="text-[#2D4A35]">Follow and automatically copy trades from successful traders.</p>
          </div>

          {/* Copy Trading Stats */}
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
            <div className="bg-[#2D4A35] rounded-lg p-4 text-white">
              <h3 className="text-sm text-[#A0C8A9] mb-1">Following</h3>
              <p className="text-xl font-bold">3</p>
            </div>
            <div className="bg-[#2D4A35] rounded-lg p-4 text-white">
              <h3 className="text-sm text-[#A0C8A9] mb-1">Total Copied</h3>
              <p className="text-xl font-bold">$12,500</p>
            </div>
            <div className="bg-[#2D4A35] rounded-lg p-4 text-white">
              <h3 className="text-sm text-[#A0C8A9] mb-1">Total Return</h3>
              <p className="text-xl font-bold text-green-400">+15.8%</p>
            </div>
            <div className="bg-[#2D4A35] rounded-lg p-4 text-white">
              <h3 className="text-sm text-[#A0C8A9] mb-1">Active Trades</h3>
              <p className="text-xl font-bold">8</p>
            </div>
          </div>

          {/* Top Traders */}
          <div className="bg-[#2D4A35] rounded-lg p-6">
            <h3 className="text-white text-lg font-medium mb-4">Top Traders</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              {/* Trader 1 */}
              <div className="bg-[#B8D4C1] rounded-lg p-4">
                <div className="flex items-center mb-3">
                  <div className="w-10 h-10 bg-[#A0C8A9] rounded-full flex items-center justify-center mr-3">
                    <span className="text-[#1E2E23] font-medium">MJ</span>
                  </div>
                  <div>
                    <h4 className="text-[#1E2E23] font-medium">Mike Johnson</h4>
                    <p className="text-[#2D4A35] text-xs">Professional Trader</p>
                  </div>
                </div>
                <div className="space-y-2 mb-4">
                  <div className="flex justify-between text-sm">
                    <span className="text-[#2D4A35]">Win Rate:</span>
                    <span className="text-[#1E2E23] font-medium">85%</span>
                  </div>
                  <div className="flex justify-between text-sm">
                    <span className="text-[#2D4A35]">Total Profit:</span>
                    <span className="text-green-600 font-medium">+$45,230</span>
                  </div>
                  <div className="flex justify-between text-sm">
                    <span className="text-[#2D4A35]">Followers:</span>
                    <span className="text-[#1E2E23] font-medium">1,234</span>
                  </div>
                </div>
                <button className="w-full bg-[#0A2E1D] text-white py-2 px-4 rounded-lg text-sm font-medium hover:bg-[#0F1B14] transition-colors">
                  Follow Trader
                </button>
              </div>

              {/* Trader 2 */}
              <div className="bg-[#B8D4C1] rounded-lg p-4">
                <div className="flex items-center mb-3">
                  <div className="w-10 h-10 bg-[#A0C8A9] rounded-full flex items-center justify-center mr-3">
                    <span className="text-[#1E2E23] font-medium">SL</span>
                  </div>
                  <div>
                    <h4 className="text-[#1E2E23] font-medium">Sarah Lee</h4>
                    <p className="text-[#2D4A35] text-xs">Forex Specialist</p>
                  </div>
                </div>
                <div className="space-y-2 mb-4">
                  <div className="flex justify-between text-sm">
                    <span className="text-[#2D4A35]">Win Rate:</span>
                    <span className="text-[#1E2E23] font-medium">78%</span>
                  </div>
                  <div className="flex justify-between text-sm">
                    <span className="text-[#2D4A35]">Total Profit:</span>
                    <span className="text-green-600 font-medium">+$32,150</span>
                  </div>
                  <div className="flex justify-between text-sm">
                    <span className="text-[#2D4A35]">Followers:</span>
                    <span className="text-[#1E2E23] font-medium">987</span>
                  </div>
                </div>
                <button className="w-full bg-[#0A2E1D] text-white py-2 px-4 rounded-lg text-sm font-medium hover:bg-[#0F1B14] transition-colors">
                  Follow Trader
                </button>
              </div>

              {/* Trader 3 */}
              <div className="bg-[#B8D4C1] rounded-lg p-4">
                <div className="flex items-center mb-3">
                  <div className="w-10 h-10 bg-[#A0C8A9] rounded-full flex items-center justify-center mr-3">
                    <span className="text-[#1E2E23] font-medium">DC</span>
                  </div>
                  <div>
                    <h4 className="text-[#1E2E23] font-medium">David Chen</h4>
                    <p className="text-[#2D4A35] text-xs">Crypto Expert</p>
                  </div>
                </div>
                <div className="space-y-2 mb-4">
                  <div className="flex justify-between text-sm">
                    <span className="text-[#2D4A35]">Win Rate:</span>
                    <span className="text-[#1E2E23] font-medium">92%</span>
                  </div>
                  <div className="flex justify-between text-sm">
                    <span className="text-[#2D4A35]">Total Profit:</span>
                    <span className="text-green-600 font-medium">+$67,890</span>
                  </div>
                  <div className="flex justify-between text-sm">
                    <span className="text-[#2D4A35]">Followers:</span>
                    <span className="text-[#1E2E23] font-medium">2,156</span>
                  </div>
                </div>
                <button className="w-full bg-[#0A2E1D] text-white py-2 px-4 rounded-lg text-sm font-medium hover:bg-[#0F1B14] transition-colors">
                  Follow Trader
                </button>
              </div>
            </div>
          </div>

          {/* Copy Trading Settings */}
          <div className="bg-[#2D4A35] rounded-lg p-6">
            <h3 className="text-white text-lg font-medium mb-4">Copy Trading Settings</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label className="block text-[#A0C8A9] text-sm font-medium mb-2">Copy Amount</label>
                <select className="w-full px-3 py-2 bg-[#B8D4C1] text-[#1E2E23] rounded-lg border border-[#A0C8A9]/30 focus:border-[#A0C8A9] focus:outline-none">
                  <option>10% of deposit</option>
                  <option>25% of deposit</option>
                  <option>50% of deposit</option>
                  <option>100% of deposit</option>
                </select>
              </div>
              <div>
                <label className="block text-[#A0C8A9] text-sm font-medium mb-2">Risk Level</label>
                <select className="w-full px-3 py-2 bg-[#B8D4C1] text-[#1E2E23] rounded-lg border border-[#A0C8A9]/30 focus:border-[#A0C8A9] focus:outline-none">
                  <option>Conservative</option>
                  <option>Moderate</option>
                  <option>Aggressive</option>
                </select>
              </div>
              <div>
                <label className="block text-[#A0C8A9] text-sm font-medium mb-2">Stop Loss</label>
                <input 
                  type="number" 
                  placeholder="Enter percentage"
                  className="w-full px-3 py-2 bg-[#B8D4C1] text-[#1E2E23] rounded-lg border border-[#A0C8A9]/30 focus:border-[#A0C8A9] focus:outline-none placeholder-[#2D4A35]"
                />
              </div>
              <div>
                <label className="block text-[#A0C8A9] text-sm font-medium mb-2">Take Profit</label>
                <input 
                  type="number" 
                  placeholder="Enter percentage"
                  className="w-full px-3 py-2 bg-[#B8D4C1] text-[#1E2E23] rounded-lg border border-[#A0C8A9]/30 focus:border-[#A0C8A9] focus:outline-none placeholder-[#2D4A35]"
                />
              </div>
            </div>
            <button className="w-full mt-6 bg-[#0A2E1D] text-white py-3 px-4 rounded-lg font-medium hover:bg-[#0F1B14] transition-colors">
              Save Settings
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
