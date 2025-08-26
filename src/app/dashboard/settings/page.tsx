'use client';

import UserHeader from '@/components/UserHeader';
import { useState } from 'react';

export default function SettingsPage() {
  const [activeTab, setActiveTab] = useState('profile');
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
            <a href="/dashboard/copy-trading" className={`flex items-center space-x-3 px-4 py-3 ${darkMode ? 'text-[#A0C8A9]/70 hover:text-white hover:bg-[#A0C8A9]/10' : 'text-gray-600 hover:text-gray-900 hover:bg-gray-100'} rounded-lg transition-colors`}>
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 16H6a2 2 0 01-2-2V6a2 2 0 012-2h8a2 2 0 012 2v2m-6 12h8a2 2 0 002-2v-8a2 2 0 00-2-2h-8a2 2 0 00-2 2v8a2 2 0 002 2z" />
              </svg>
              <span>Copy Trading</span>
            </a>
            <a href="/dashboard/history" className={`flex items-center space-x-3 px-4 py-3 ${darkMode ? 'text-[#A0C8A9]/70 hover:text-white hover:bg-[#A0C8A9]/10' : 'text-gray-600 hover:text-gray-900 hover:bg-gray-100'} rounded-lg transition-colors`}>
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
              <span>History</span>
            </a>
            <a href="/dashboard/request-master-ib" className={`flex items-center space-x-3 px-4 py-3 ${darkMode ? 'text-[#A0C8A9]/70 hover:text-white hover:bg-[#A0C8A9]/10' : 'text-gray-600 hover:text-gray-900 hover:bg-gray-100'} rounded-lg transition-colors`}>
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
              </svg>
              <span>Request Master IB</span>
            </a>
          </nav>
        </div>
        
        {/* Settings at bottom */}
        <div className={`p-4 border-t ${darkMode ? 'border-[#A0C8A9]/20' : 'border-gray-200'}`}>
          <a href="/dashboard/settings" className={`flex items-center space-x-3 px-4 py-3 ${darkMode ? 'text-white bg-[#A0C8A9]/10 border-[#A0C8A9]' : 'text-gray-900 bg-blue-50 border-blue-500'} rounded-lg border-l-4`}>
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z" />
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
            </svg>
            <span className="font-medium">Settings</span>
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

        {/* Settings Content */}
        <div className={`flex-1 p-6 space-y-6 overflow-y-auto ${darkMode ? 'bg-[#B8D4C1]' : 'bg-gray-50'}`}>
          {/* Settings Tabs */}
          <div className="flex space-x-1 bg-[#2D4A35] p-1 rounded-lg max-w-4xl border border-[#A0C8A9]/30">
            <button
              onClick={() => setActiveTab('profile')}
              className={`px-6 py-2 rounded-md text-sm font-medium transition-colors ${
                activeTab === 'profile'
                  ? 'bg-[#0A2E1D] text-white'
                  : 'text-[#A0C8A9] hover:text-white'
              }`}
            >
              Profile
            </button>
            <button
              onClick={() => setActiveTab('withdraw-accounts')}
              className={`px-6 py-2 rounded-md text-sm font-medium transition-colors ${
                activeTab === 'withdraw-accounts'
                  ? 'bg-[#0A2E1D] text-white'
                  : 'text-[#A0C8A9] hover:text-white'
              }`}
            >
              Withdraw Accounts
            </button>
            <button
              onClick={() => setActiveTab('security')}
              className={`px-6 py-2 rounded-md text-sm font-medium transition-colors ${
                activeTab === 'security'
                  ? 'bg-[#0A2E1D] text-white'
                  : 'text-[#A0C8A9] hover:text-white'
              }`}
            >
              Security
            </button>
            <button
              onClick={() => setActiveTab('kyc')}
              className={`px-6 py-2 rounded-md text-sm font-medium transition-colors ${
                activeTab === 'kyc'
                  ? 'bg-[#0A2E1D] text-white'
                  : 'text-[#A0C8A9] hover:text-white'
              }`}
            >
              KYC
            </button>
            <button
              onClick={() => setActiveTab('preference')}
              className={`px-6 py-2 rounded-md text-sm font-medium transition-colors ${
                activeTab === 'preference'
                  ? 'bg-[#0A2E1D] text-white'
                  : 'text-[#A0C8A9] hover:text-white'
              }`}
            >
              Preference
            </button>
            <button
              onClick={() => setActiveTab('agreements')}
              className={`px-6 py-2 rounded-md text-sm font-medium transition-colors ${
                activeTab === 'agreements'
                  ? 'bg-[#0A2E1D] text-white'
                  : 'text-[#A0C8A9] hover:text-white'
              }`}
            >
              Agreements
            </button>
            <button
              onClick={() => setActiveTab('tools')}
              className={`px-6 py-2 rounded-md text-sm font-medium transition-colors ${
                activeTab === 'tools'
                  ? 'bg-[#0A2E1D] text-white'
                  : 'text-[#A0C8A9] hover:text-white'
              }`}
            >
              Tools
            </button>
          </div>

          {/* Content based on active tab */}
          {activeTab === 'profile' && (
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
              {/* Left Column - Profile Summary */}
              <div className="lg:col-span-1">
                {/* Green Background Section */}
                <div className="bg-[#0A2E1D] rounded-t-lg p-6 text-center text-white">
                  <div className="relative inline-block mb-4">
                    <div className="w-32 h-32 bg-[#A0C8A9] rounded-full mx-auto flex items-center justify-center">
                      <div className="w-24 h-24 bg-[#B8D4C1] rounded-full flex items-center justify-center">
                        <span className="text-3xl">😊</span>
                      </div>
                    </div>
                    <button className="absolute bottom-0 right-0 bg-[#A0C8A9] p-2 rounded-lg shadow-lg hover:bg-[#8BBF9F] transition-colors">
                      <svg className="w-4 h-4 text-[#0A2E1D]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15.232 5.232l3.536 3.536m-2.036-5.036a2.5 2.5 0 113.536 3.536L6.5 21.036H3v-3.572L16.732 3.732z" />
                      </svg>
                    </button>
                  </div>
                </div>
                
                {/* White Content Section */}
                <div className="bg-white rounded-b-lg p-6 shadow">
                  <div className="text-center mb-4">
                    <h2 className="text-2xl font-bold text-gray-900 mb-2">RANITH KUMAR</h2>
                    <span className="inline-block bg-[#0A2E1D] text-white px-3 py-1 rounded-full text-sm mb-2">Unverified</span>
                    <p className="text-gray-600">India</p>
                  </div>
                  
                  <div className="space-y-3 text-sm text-gray-600">
                    <div className="flex justify-between">
                      <span>Member since:</span>
                      <span className="font-medium">Mon, Aug 11, 2025 5:24 AM</span>
                    </div>
                    <div className="flex justify-between">
                      <span>Customer Group:</span>
                      <span className="font-medium">N/A</span>
                    </div>
                    <div className="flex justify-between">
                      <span>Risk Profile:</span>
                      <span className="font-medium">N/A</span>
                    </div>
                    <div className="flex justify-between">
                      <span>KYC Level:</span>
                      <span className="font-medium">Level 1</span>
                    </div>
                    <div className="flex justify-between">
                      <span>IB Member:</span>
                      <span className="font-medium">Unprocessed</span>
                    </div>
                  </div>
                </div>
              </div>

              {/* Right Column - Account Information */}
              <div className="lg:col-span-2 space-y-6">
                {/* Account Balances */}
                <div className="grid grid-cols-3 gap-4">
                  <div className="bg-white rounded-lg p-4 shadow">
                    <h3 className="text-sm text-gray-600 mb-1">Balance</h3>
                    <p className="text-xl font-bold text-gray-900">$0</p>
                  </div>
                  <div className="bg-white rounded-lg p-4 shadow">
                    <h3 className="text-sm text-gray-600 mb-1">Equity</h3>
                    <p className="text-xl font-bold text-gray-900">$0</p>
                  </div>
                  <div className="bg-white rounded-lg p-4 shadow">
                    <h3 className="text-sm text-gray-600 mb-1">Wallet Balance</h3>
                    <p className="text-xl font-bold text-gray-900">0</p>
                  </div>
                </div>

                {/* Personal Information Form */}
                <div className="bg-white rounded-lg shadow p-6">
                  <h3 className="text-lg font-semibold text-gray-900 mb-4">Personal Information</h3>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">First Name</label>
                      <input 
                        type="text" 
                        defaultValue="RANITH"
                        className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-[#A0C8A9] focus:border-transparent"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">Last Name</label>
                      <input 
                        type="text" 
                        defaultValue="KUMAR"
                        className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-[#A0C8A9] focus:border-transparent"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">Username</label>
                      <input 
                        type="text" 
                        defaultValue="RANITHKUMAR5325"
                        className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-[#A0C8A9] focus:border-transparent"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">Gender</label>
                      <select className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-red-500 focus:border-transparent">
                        <option value="male">Male</option>
                        <option value="female">Female</option>
                        <option value="other">Other</option>
                      </select>
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">Date Of Birth</label>
                      <div className="relative">
                        <input 
                          type="text" 
                          placeholder="dd-mm-yyyy"
                          className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-[#A0C8A9] focus:border-transparent pr-10"
                        />
                        <svg className="absolute right-3 top-2.5 w-5 h-5 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                        </svg>
                      </div>
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">Email Address</label>
                      <input 
                        type="email" 
                        defaultValue="ranithkumar04@gmail.com"
                        className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-[#A0C8A9] focus:border-transparent"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">Phone</label>
                      <div className="flex">
                        <div className="flex items-center px-3 py-2 border border-r-0 border-gray-300 rounded-l-md bg-gray-50">
                          <span className="text-sm text-gray-500">🇮🇳 +91</span>
                        </div>
                        <input 
                          type="tel" 
                          defaultValue="095156 30782"
                          className="flex-1 px-3 py-2 border border-gray-300 rounded-r-md focus:outline-none focus:ring-2 focus:ring-[#A0C8A9] focus:border-transparent"
                        />
                      </div>
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">Country</label>
                      <input 
                        type="text" 
                        defaultValue="India"
                        className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-[#A0C8A9] focus:border-transparent"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">City</label>
                      <input 
                        type="text" 
                        placeholder="City"
                        className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-[#A0C8A9] focus:border-transparent"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">Zip</label>
                      <input 
                        type="text" 
                        placeholder="Zip Code"
                        className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-[#A0C8A9] focus:border-transparent"
                      />
                    </div>
                    <div className="md:col-span-2">
                      <label className="block text-sm font-medium text-gray-700 mb-1">Address</label>
                      <textarea 
                        placeholder="Enter your full address"
                        rows={3}
                        className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-[#A0C8A9] focus:border-transparent"
                      />
                    </div>
                  </div>
                  
                  {/* Save Button */}
                  <div className="flex justify-end pt-4">
                    <button 
                      type="submit"
                      className="px-8 py-3 bg-[#0A2E1D] text-white rounded-md hover:bg-[#1A3E2D] transition-colors font-medium text-lg"
                    >
                      Save Changes
                    </button>
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* Other tabs content */}
          {activeTab === 'withdraw-accounts' && (
            <div className="bg-white rounded-lg p-6">
              <h2 className="text-xl font-semibold text-gray-900 mb-4">Withdraw Accounts</h2>
              <p className="text-gray-600">Withdraw accounts settings will be displayed here.</p>
            </div>
          )}

          {activeTab === 'security' && (
            <div className="space-y-6">
              {/* Security Description */}
              <div className="bg-white rounded-lg shadow p-6 border border-[#A0C8A9]/20">
                <h2 className="text-xl font-semibold text-[#0A2E1D] mb-2">Strengthen Your Online Security</h2>
                <p className="text-gray-600">It&apos;s your primary defense.</p>
              </div>

              {/* Password Section */}
              <div className="bg-white rounded-lg shadow p-6 border border-[#A0C8A9]/20">
                <div className="flex items-center justify-between mb-4">
                  <h3 className="text-lg font-semibold text-[#0A2E1D]">Security</h3>
                </div>
                
                <div className="mb-6">
                  <h4 className="text-md font-medium text-[#0A2E1D] mb-2">Authorization</h4>
                  <p className="text-gray-600 mb-4">Information for logging in to Raz Capitals.</p>
                  <p className="text-gray-600 mb-4">Change your password whenever you think it might have been compromised.</p>
                  
                  <div className="space-y-4">
                    <div className="flex items-center justify-between p-4 bg-gray-50 rounded-lg">
                      <div>
                        <p className="font-medium text-gray-900">ranithkumar04@gmail.com</p>
                        <p className="text-sm text-gray-500">Email address</p>
                      </div>
                      <button className="px-4 py-2 bg-[#A0C8A9] text-[#0A2E1D] rounded-md hover:bg-[#8BBF9F] transition-colors font-medium">
                        Change
                      </button>
                    </div>
                    
                    <div className="flex items-center justify-between p-4 bg-gray-50 rounded-lg">
                      <div>
                        <p className="font-medium text-gray-900">••••••••</p>
                        <p className="text-sm text-gray-500">Current password</p>
                      </div>
                      <button className="px-4 py-2 bg-[#A0C8A9] text-[#0A2E1D] rounded-md hover:bg-[#8BBF9F] transition-colors font-medium">
                        Change
                      </button>
                    </div>
                  </div>
                  
                  <div className="mt-4">
                    <button className="px-6 py-2 bg-[#0A2E1D] text-white rounded-md hover:bg-[#1A3E2D] transition-colors font-medium">
                      Update
                    </button>
                  </div>
                </div>
              </div>

              {/* 2-Step Verification Section */}
              <div className="bg-white rounded-lg shadow p-6 border border-[#A0C8A9]/20">
                <div className="flex items-center justify-between mb-4">
                  <h3 className="text-lg font-semibold text-[#0A2E1D]">Security</h3>
                </div>
                
                <div>
                  <h4 className="text-md font-medium text-[#0A2E1D] mb-2">2-Step verification</h4>
                  <p className="text-gray-600 mb-4">2-step verification ensures that all sensitive transactions are authorized by you.</p>
                  <p className="text-gray-600 mb-4">We encourage you to enter verification codes to confirm these transactions.</p>
                  
                  <div className="space-y-4">
                    <div className="flex items-center justify-between p-4 bg-gray-50 rounded-lg">
                      <div>
                        <p className="font-medium text-gray-900">Security type</p>
                        <p className="text-sm text-gray-500">ranithkumar04@gmail.com</p>
                      </div>
                      <button className="px-4 py-2 bg-[#A0C8A9] text-[#0A2E1D] rounded-md hover:bg-[#8BBF9F] transition-colors font-medium">
                        Change
                      </button>
                    </div>
                  </div>
                  
                  <div className="mt-4">
                    <button className="px-6 py-2 bg-[#0A2E1D] text-white rounded-md hover:bg-[#1A3E2D] transition-colors font-medium">
                      Update
                    </button>
                  </div>
                </div>
              </div>
            </div>
          )}

          {activeTab === 'kyc' && (
            <div className="space-y-6">
              {/* KYC Description */}
              <div className="bg-white rounded-lg shadow p-6 border border-[#A0C8A9]/20">
                <p className="text-gray-600 mb-4">To maintain a secure and compliant trading environment, identity verification is required.</p>
                <p className="text-gray-600">Complete your KYC steps to unlock full access including deposits, trading, and withdrawals.</p>
              </div>

              {/* Step 1: Confirm Email */}
              <div className="bg-white rounded-lg shadow p-6 border border-[#A0C8A9]/20">
                <div className="flex items-center justify-between mb-4">
                  <div className="flex items-center space-x-3">
                    <div className="w-8 h-8 bg-[#A0C8A9] rounded-full flex items-center justify-center text-[#0A2E1D] font-bold">1</div>
                    <h3 className="text-lg font-semibold text-[#0A2E1D]">Confirm Email</h3>
                  </div>
                  <span className="px-3 py-1 bg-green-100 text-green-800 text-sm font-medium rounded-full">Verified</span>
                </div>
                
                <div className="mb-4">
                  <p className="text-gray-900 font-medium mb-2">ranithkumar04@gmail.com</p>
                </div>

                <div className="bg-gray-50 rounded-lg p-4 mb-4">
                  <h4 className="text-md font-medium text-[#0A2E1D] mb-3">Privileges of Account Verification</h4>
                  <ul className="space-y-2 text-sm text-gray-600">
                    <li className="flex items-start space-x-2">
                      <span className="text-green-500 mt-1">✓</span>
                      <span>Update your full profile securely.</span>
                    </li>
                    <li className="flex items-start space-x-2">
                      <span className="text-green-500 mt-1">✓</span>
                      <span>Deposit funds without restrictions.</span>
                    </li>
                    <li className="flex items-start space-x-2">
                      <span className="text-green-500 mt-1">✓</span>
                      <span>Open demo and real trading accounts.</span>
                    </li>
                    <li className="flex items-start space-x-2">
                      <span className="text-green-500 mt-1">✓</span>
                      <span>Transfer funds internally.</span>
                    </li>
                    <li className="flex items-start space-x-2">
                      <span className="text-green-500 mt-1">✓</span>
                      <span>Create support ticket for assistance.</span>
                    </li>
                  </ul>
                </div>

                <div className="flex items-center justify-between">
                  <span className="px-3 py-1 bg-green-100 text-green-800 text-sm font-medium rounded-full">Completed</span>
                  <span className="px-3 py-1 bg-blue-100 text-blue-800 text-sm font-medium rounded-full">Automated</span>
                </div>
              </div>

              {/* Step 2: Verify Identity */}
              <div className="bg-white rounded-lg shadow p-6 border border-[#A0C8A9]/20">
                <div className="flex items-center justify-between mb-4">
                  <div className="flex items-center space-x-3">
                    <div className="w-8 h-8 bg-[#A0C8A9] rounded-full flex items-center justify-center text-[#0A2E1D] font-bold">2</div>
                    <h3 className="text-lg font-semibold text-[#0A2E1D]">Verify your identity using Sumsub</h3>
                  </div>
                  <span className="px-3 py-1 bg-blue-100 text-blue-800 text-sm font-medium rounded-full">Automated</span>
                </div>
                
                <div className="mb-4">
                  <p className="text-gray-600 mb-2">Provide a document confirming your name</p>
                  <p className="text-gray-600">Verify your details please</p>
                </div>

                <div className="bg-gray-50 rounded-lg p-4 mb-4">
                  <h4 className="text-md font-medium text-[#0A2E1D] mb-3">Privileges of Profile Verification</h4>
                  <ul className="space-y-2 text-sm text-gray-600">
                    <li className="flex items-start space-x-2">
                      <span className="text-blue-500 mt-1">✓</span>
                      <span>Withdraw funds from verified accounts.</span>
                    </li>
                    <li className="flex items-start space-x-2">
                      <span className="text-blue-500 mt-1">✓</span>
                      <span>Make external transfers securely.</span>
                    </li>
                    <li className="flex items-start space-x-2">
                      <span className="text-blue-500 mt-1">✓</span>
                      <span>Get approved for higher trading limits.</span>
                    </li>
                    <li className="flex items-start space-x-2">
                      <span className="text-blue-500 mt-1">✓</span>
                      <span>Unlock advanced account features.</span>
                    </li>
                    <li className="flex items-start space-x-2">
                      <span className="text-blue-500 mt-1">✓</span>
                      <span>Faster processing of requests and reviews.</span>
                    </li>
                  </ul>
                </div>

                <div className="flex justify-end">
                  <button className="px-6 py-3 bg-[#0A2E1D] text-white rounded-md hover:bg-[#1A3E2D] transition-colors font-medium">
                    Go to Sumsub
                  </button>
                </div>
              </div>
            </div>
          )}

          {activeTab === 'preference' && (
            <div className="space-y-6">
              {/* Theme Section */}
              <div className="bg-white rounded-lg shadow p-6 border border-[#A0C8A9]/20">
                <h2 className="text-xl font-semibold text-[#0A2E1D] mb-2">Theme</h2>
                <p className="text-gray-600 mb-4">Select your preferred theme</p>
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {/* Light Mode */}
                  <div className="border-2 border-[#A0C8A9] rounded-lg p-4 bg-[#A0C8A9]/10">
                    <div className="flex items-center justify-between mb-2">
                      <h3 className="text-lg font-medium text-[#0A2E1D]">Light Mode</h3>
                      <span className="text-[#A0C8A9] font-medium">Selected</span>
                    </div>
                    <div className="flex items-center space-x-2">
                      <div className="w-4 h-4 bg-[#A0C8A9] rounded-full"></div>
                      <span className="text-sm text-gray-600">Default light theme</span>
                    </div>
                  </div>
                  
                  {/* Dark Mode */}
                  <div className="border-2 border-gray-200 rounded-lg p-4 hover:border-[#A0C8A9]/50 transition-colors cursor-pointer">
                    <div className="flex items-center justify-between mb-2">
                      <h3 className="text-lg font-medium text-gray-700">Dark Mode</h3>
                      <span className="text-gray-500 font-medium">Select</span>
                    </div>
                    <div className="flex items-center space-x-2">
                      <div className="w-4 h-4 bg-gray-300 rounded-full"></div>
                      <span className="text-sm text-gray-500">Dark theme option</span>
                    </div>
                  </div>
                </div>
              </div>

              {/* Communication Section */}
              <div className="bg-white rounded-lg shadow p-6 border border-[#A0C8A9]/20">
                <h2 className="text-xl font-semibold text-[#0A2E1D] mb-2">Communication</h2>
                <p className="text-gray-600 mb-4">Select your preferred language</p>
                
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                  {/* English */}
                  <div className="border-2 border-[#A0C8A9] rounded-lg p-4 bg-[#A0C8A9]/10">
                    <div className="flex items-center justify-between mb-2">
                      <h3 className="text-lg font-medium text-[#0A2E1D]">English</h3>
                      <span className="text-[#A0C8A9] font-medium">Selected</span>
                    </div>
                    <div className="flex items-center space-x-2">
                      <div className="w-4 h-4 bg-[#A0C8A9] rounded-full"></div>
                      <span className="text-sm text-gray-600">Primary language</span>
                    </div>
                  </div>
                  
                  {/* French */}
                  <div className="border-2 border-gray-200 rounded-lg p-4 hover:border-[#A0C8A9]/50 transition-colors cursor-pointer">
                    <div className="flex items-center justify-between mb-2">
                      <h3 className="text-lg font-medium text-gray-700">French</h3>
                      <span className="text-gray-500 font-medium">Select</span>
                    </div>
                    <div className="flex items-center space-x-2">
                      <div className="w-4 h-4 bg-gray-300 rounded-full"></div>
                      <span className="text-sm text-gray-500">Français</span>
                    </div>
                  </div>
                  
                  {/* Spanish */}
                  <div className="border-2 border-gray-200 rounded-lg p-4 hover:border-[#A0C8A9]/50 transition-colors cursor-pointer">
                    <div className="flex items-center justify-between mb-2">
                      <h3 className="text-lg font-medium text-gray-700">Spanish</h3>
                      <span className="text-gray-500 font-medium">Select</span>
                    </div>
                    <div className="flex items-center space-x-2">
                      <div className="w-4 h-4 bg-gray-300 rounded-full"></div>
                      <span className="text-sm text-gray-500">Español</span>
                    </div>
                  </div>
                  
                  {/* Chinese */}
                  <div className="border-2 border-gray-200 rounded-lg p-4 hover:border-[#A0C8A9]/50 transition-colors cursor-pointer">
                    <div className="flex items-center justify-between mb-2">
                      <h3 className="text-lg font-medium text-gray-700">Chinese</h3>
                      <span className="text-gray-500 font-medium">Select</span>
                    </div>
                    <div className="flex items-center space-x-2">
                      <div className="w-4 h-4 bg-gray-300 rounded-full"></div>
                      <span className="text-sm text-gray-500">中文</span>
                    </div>
                  </div>
                  
                  {/* Arabic */}
                  <div className="border-2 border-gray-200 rounded-lg p-4 hover:border-[#A0C8A9]/50 transition-colors cursor-pointer">
                    <div className="flex items-center justify-between mb-2">
                      <h3 className="text-lg font-medium text-gray-700">Arabic</h3>
                      <span className="text-gray-500 font-medium">Select</span>
                    </div>
                    <div className="flex items-center space-x-2">
                      <div className="w-4 h-4 bg-gray-300 rounded-full"></div>
                      <span className="text-sm text-gray-500">العربية</span>
                    </div>
                  </div>
                  
                  {/* Hindi */}
                  <div className="border-2 border-gray-200 rounded-lg p-4 hover:border-[#A0C8A9]/50 transition-colors cursor-pointer">
                    <div className="flex items-center justify-between mb-2">
                      <h3 className="text-lg font-medium text-gray-700">Hindi</h3>
                      <span className="text-gray-500 font-medium">Select</span>
                    </div>
                    <div className="flex items-center space-x-2">
                      <div className="w-4 h-4 bg-gray-300 rounded-full"></div>
                      <span className="text-sm text-gray-500">हिन्दी</span>
                    </div>
                  </div>
                  
                  {/* Urdu */}
                  <div className="border-2 border-gray-200 rounded-lg p-4 hover:border-[#A0C8A9]/50 transition-colors cursor-pointer">
                    <div className="flex items-center justify-between mb-2">
                      <h3 className="text-lg font-medium text-gray-700">Urdu</h3>
                      <span className="text-gray-500 font-medium">Select</span>
                    </div>
                    <div className="flex items-center space-x-2">
                      <div className="w-4 h-4 bg-gray-300 rounded-full"></div>
                      <span className="text-sm text-gray-500">اردو</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          )}

          {activeTab === 'agreements' && (
            <div className="space-y-6">
              {/* Agreements Description */}
              <div className="bg-white rounded-lg shadow p-6 border border-[#A0C8A9]/20">
                <p className="text-gray-600">Stay informed and compliant; review all legal agreements linked to your profile.</p>
              </div>

              {/* Agreements Grid */}
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                {/* Terms & Conditions */}
                <div className="bg-white rounded-lg shadow p-6 border border-[#A0C8A9]/20 hover:shadow-lg transition-shadow cursor-pointer group">
                  <div className="flex items-start justify-between mb-4">
                    <div className="w-12 h-12 bg-[#A0C8A9]/20 rounded-lg flex items-center justify-center">
                      <span className="text-2xl">📄</span>
                    </div>
                    <div className="text-[#A0C8A9] group-hover:translate-x-1 transition-transform">
                      <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                      </svg>
                    </div>
                  </div>
                  <h3 className="text-lg font-semibold text-[#0A2E1D] mb-2">Terms & Conditions</h3>
                  <p className="text-sm text-gray-500 font-medium">PDF</p>
                </div>

                {/* Cookies Policy */}
                <div className="bg-white rounded-lg shadow p-6 border border-[#A0C8A9]/20 hover:shadow-lg transition-shadow cursor-pointer group">
                  <div className="flex items-start justify-between mb-4">
                    <div className="w-12 h-12 bg-[#A0C8A9]/20 rounded-lg flex items-center justify-center">
                      <span className="text-2xl">🍪</span>
                    </div>
                    <div className="text-[#A0C8A9] group-hover:translate-x-1 transition-transform">
                      <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                      </svg>
                    </div>
                  </div>
                  <h3 className="text-lg font-semibold text-[#0A2E1D] mb-2">Cookies Policy</h3>
                  <p className="text-sm text-gray-500 font-medium">PDF</p>
                </div>

                {/* Order Execution Policy */}
                <div className="bg-white rounded-lg shadow p-6 border border-[#A0C8A9]/20 hover:shadow-lg transition-shadow cursor-pointer group">
                  <div className="flex items-start justify-between mb-4">
                    <div className="w-12 h-12 bg-[#A0C8A9]/20 rounded-lg flex items-center justify-center">
                      <span className="text-2xl">📋</span>
                    </div>
                    <div className="text-[#A0C8A9] group-hover:translate-x-1 transition-transform">
                      <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                      </svg>
                    </div>
                  </div>
                  <h3 className="text-lg font-semibold text-[#0A2E1D] mb-2">Order Execution Policy</h3>
                  <p className="text-sm text-gray-500 font-medium">PDF</p>
                </div>

                {/* Bonus Policy */}
                <div className="bg-white rounded-lg shadow p-6 border border-[#A0C8A9]/20 hover:shadow-lg transition-shadow cursor-pointer group">
                  <div className="flex items-start justify-between mb-4">
                    <div className="w-12 h-12 bg-[#A0C8A9]/20 rounded-lg flex items-center justify-center">
                      <span className="text-2xl">🎁</span>
                    </div>
                    <div className="text-[#A0C8A9] group-hover:translate-x-1 transition-transform">
                      <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                      </svg>
                    </div>
                  </div>
                  <h3 className="text-lg font-semibold text-[#0A2E1D] mb-2">Bonus Policy</h3>
                  <p className="text-sm text-gray-500 font-medium">PDF</p>
                </div>

                {/* Risk Disclosure */}
                <div className="bg-white rounded-lg shadow p-6 border border-[#A0C8A9]/20 hover:shadow-lg transition-shadow cursor-pointer group">
                  <div className="flex items-start justify-between mb-4">
                    <div className="w-12 h-12 bg-[#A0C8A9]/20 rounded-lg flex items-center justify-center">
                      <span className="text-2xl">⚠️</span>
                    </div>
                    <div className="text-[#A0C8A9] group-hover:translate-x-1 transition-transform">
                      <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                      </svg>
                    </div>
                  </div>
                  <h3 className="text-lg font-semibold text-[#0A2E1D] mb-2">Risk Disclosure</h3>
                  <p className="text-sm text-gray-500 font-medium">PDF</p>
                </div>
              </div>
            </div>
          )}

          {activeTab === 'tools' && (
            <div className="space-y-6">
              {/* Calculator Tools Grid */}
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
                {/* Exchange Rate */}
                <div className="bg-white rounded-lg shadow p-6 border border-[#A0C8A9]/20 hover:shadow-lg transition-shadow cursor-pointer group">
                  <div className="flex items-center justify-center w-16 h-16 bg-[#A0C8A9]/20 rounded-lg mb-4 mx-auto">
                    <span className="text-3xl text-[#0A2E1D]">💱</span>
                  </div>
                  <h3 className="text-lg font-semibold text-[#0A2E1D] mb-2 text-center">Exchange Rate</h3>
                  <p className="text-sm text-gray-600 text-center">Convert between different currencies using live exchange rates</p>
                </div>

                {/* Pip Value */}
                <div className="bg-white rounded-lg shadow p-6 border border-[#A0C8A9]/20 hover:shadow-lg transition-shadow cursor-pointer group">
                  <div className="flex items-center justify-center w-16 h-16 bg-[#A0C8A9]/20 rounded-lg mb-4 mx-auto">
                    <span className="text-3xl text-[#0A2E1D]">💰</span>
                  </div>
                  <h3 className="text-lg font-semibold text-[#0A2E1D] mb-2 text-center">Pip Value</h3>
                  <p className="text-sm text-gray-600 text-center">Calculate the monetary value of pips based on position size</p>
                </div>

                {/* Margin */}
                <div className="bg-white rounded-lg shadow p-6 border border-[#A0C8A9]/20 hover:shadow-lg transition-shadow cursor-pointer group">
                  <div className="flex items-center justify-center w-16 h-16 bg-[#A0C8A9]/20 rounded-lg mb-4 mx-auto">
                    <span className="text-3xl text-[#0A2E1D]">💻</span>
                  </div>
                  <h3 className="text-lg font-semibold text-[#0A2E1D] mb-2 text-center">Margin</h3>
                  <p className="text-sm text-gray-600 text-center">Determine required margin based on lot size and leverage</p>
                </div>

                {/* Position Size */}
                <div className="bg-white rounded-lg shadow p-6 border border-[#A0C8A9]/20 hover:shadow-lg transition-shadow cursor-pointer group">
                  <div className="flex items-center justify-center w-16 h-16 bg-[#A0C8A9]/20 rounded-lg mb-4 mx-auto">
                    <span className="text-3xl text-[#0A2E1D]">📊</span>
                  </div>
                  <h3 className="text-lg font-semibold text-[#0A2E1D] mb-2 text-center">Position Size</h3>
                  <p className="text-sm text-gray-600 text-center">Find the optimal position size based on your risk parameters</p>
                </div>

                {/* Profit/Loss */}
                <div className="bg-white rounded-lg shadow p-6 border border-[#A0C8A9]/20 hover:shadow-lg transition-shadow cursor-pointer group">
                  <div className="flex items-center justify-center w-16 h-16 bg-[#A0C8A9]/20 rounded-lg mb-4 mx-auto">
                    <span className="text-3xl text-[#0A2E1D]">📈</span>
                  </div>
                  <h3 className="text-lg font-semibold text-[#0A2E1D] mb-2 text-center">Profit/Loss</h3>
                  <p className="text-sm text-gray-600 text-center">Calculate potential profit or loss for a forex position</p>
                </div>

                {/* Swap */}
                <div className="bg-white rounded-lg shadow p-6 border border-[#A0C8A9]/20 hover:shadow-lg transition-shadow cursor-pointer group">
                  <div className="flex items-center justify-center w-16 h-16 bg-[#A0C8A9]/20 rounded-lg mb-4 mx-auto">
                    <span className="text-3xl text-[#0A2E1D]">🕒</span>
                  </div>
                  <h3 className="text-lg font-semibold text-[#0A2E1D] mb-2 text-center">Swap</h3>
                  <p className="text-sm text-gray-600 text-center">Determine overnight fees for holding positions</p>
                </div>

                {/* Risk/Reward */}
                <div className="bg-white rounded-lg shadow p-6 border border-[#A0C8A9]/20 hover:shadow-lg transition-shadow cursor-pointer group">
                  <div className="flex items-center justify-center w-16 h-16 bg-[#A0C8A9]/20 rounded-lg mb-4 mx-auto">
                    <span className="text-3xl text-[#0A2E1D]">⚖️</span>
                  </div>
                  <h3 className="text-lg font-semibold text-[#0A2E1D] mb-2 text-center">Risk/Reward</h3>
                  <p className="text-sm text-gray-600 text-center">Analyze the risk/reward ratio of your trade setups</p>
                </div>

                {/* Lot Size Converter */}
                <div className="bg-white rounded-lg shadow p-6 border border-[#A0C8A9]/20 hover:shadow-lg transition-shadow cursor-pointer group">
                  <div className="flex items-center justify-center w-16 h-16 bg-[#A0C8A9]/20 rounded-lg mb-4 mx-auto">
                    <span className="text-3xl text-[#0A2E1D]">🔄</span>
                  </div>
                  <h3 className="text-lg font-semibold text-[#0A2E1D] mb-2 text-center">Lot Size Converter</h3>
                  <p className="text-sm text-gray-600 text-center">Convert between standard, mini, and micro lots</p>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
