'use client';

import UserHeader from '@/components/UserHeader';
import Image from 'next/image';
import { useState } from 'react';

export default function RequestMasterIBPage() {
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

        {/* Request Master IB Content */}
        <div className={`flex-1 p-6 space-y-6 overflow-y-auto ${darkMode ? 'bg-[#B8D4C1]' : 'bg-gray-50'}`}>
          <div>
            <h2 className="text-2xl font-bold text-[#1E2E23] mb-2">Request Master IB Status</h2>
            <p className="text-[#2D4A35]">Apply to become a Master Introducing Broker and start earning commissions from referrals.</p>
          </div>

          {/* IB Benefits */}
          <div className="bg-[#2D4A35] rounded-lg p-6">
            <h3 className="text-white text-lg font-medium mb-4">Master IB Benefits</h3>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <div className="bg-[#B8D4C1] rounded-lg p-4 text-center">
                <svg className="w-12 h-12 mx-auto mb-3 text-[#1E2E23]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1" />
                </svg>
                <h4 className="text-[#1E2E23] font-medium mb-2">High Commissions</h4>
                <p className="text-[#2D4A35] text-sm">Earn up to 80% commission on spread from your referred clients</p>
              </div>
              <div className="bg-[#B8D4C1] rounded-lg p-4 text-center">
                <svg className="w-12 h-12 mx-auto mb-3 text-[#1E2E23]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
                </svg>
                <h4 className="text-[#1E2E23] font-medium mb-2">Multi-Level Structure</h4>
                <p className="text-[#2D4A35] text-sm">Build your network with sub-IBs and earn from their referrals too</p>
              </div>
              <div className="bg-[#B8D4C1] rounded-lg p-4 text-center">
                <svg className="w-12 h-12 mx-auto mb-3 text-[#1E2E23]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
                </svg>
                <h4 className="text-[#1E2E23] font-medium mb-2">Real-time Reports</h4>
                <p className="text-[#2D4A35] text-sm">Access detailed analytics and performance reports</p>
              </div>
            </div>
          </div>

          {/* Commission Structure */}
          <div className="bg-[#2D4A35] rounded-lg p-6">
            <h3 className="text-white text-lg font-medium mb-4">Commission Structure</h3>
            <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
              <div className="bg-[#B8D4C1] rounded-lg p-4 text-center">
                <h4 className="text-[#1E2E23] font-medium mb-2">Bronze</h4>
                <p className="text-[#2D4A35] text-sm mb-2">0-10 Active Clients</p>
                <p className="text-green-600 font-bold text-lg">40%</p>
                <p className="text-[#2D4A35] text-xs">Commission Rate</p>
              </div>
              <div className="bg-[#B8D4C1] rounded-lg p-4 text-center">
                <h4 className="text-[#1E2E23] font-medium mb-2">Silver</h4>
                <p className="text-[#2D4A35] text-sm mb-2">11-25 Active Clients</p>
                <p className="text-green-600 font-bold text-lg">55%</p>
                <p className="text-[#2D4A35] text-xs">Commission Rate</p>
              </div>
              <div className="bg-[#B8D4C1] rounded-lg p-4 text-center">
                <h4 className="text-[#1E2E23] font-medium mb-2">Gold</h4>
                <p className="text-[#2D4A35] text-sm mb-2">26-50 Active Clients</p>
                <p className="text-green-600 font-bold text-lg">70%</p>
                <p className="text-[#2D4A35] text-xs">Commission Rate</p>
              </div>
              <div className="bg-[#B8D4C1] rounded-lg p-4 text-center border border-[#A0C8A9]">
                <h4 className="text-[#1E2E23] font-medium mb-2">Platinum</h4>
                <p className="text-[#2D4A35] text-sm mb-2">50+ Active Clients</p>
                <p className="text-green-600 font-bold text-lg">80%</p>
                <p className="text-[#2D4A35] text-xs">Commission Rate</p>
              </div>
            </div>
          </div>

          {/* Application Form */}
          <div className="bg-[#2D4A35] rounded-lg p-6">
            <h3 className="text-white text-lg font-medium mb-6">Master IB Application</h3>
            <form className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-[#A0C8A9] text-sm font-medium mb-2">Company/Organization Name</label>
                  <input 
                    type="text" 
                    placeholder="Enter company name"
                    className="w-full px-3 py-2 bg-[#B8D4C1] text-[#1E2E23] rounded-lg border border-[#A0C8A9]/30 focus:border-[#A0C8A9] focus:outline-none placeholder-[#2D4A35]"
                  />
                </div>
                <div>
                  <label className="block text-[#A0C8A9] text-sm font-medium mb-2">Website URL</label>
                  <input 
                    type="url" 
                    placeholder="https://yourwebsite.com"
                    className="w-full px-3 py-2 bg-[#B8D4C1] text-[#1E2E23] rounded-lg border border-[#A0C8A9]/30 focus:border-[#A0C8A9] focus:outline-none placeholder-[#2D4A35]"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-[#A0C8A9] text-sm font-medium mb-2">Years of Experience in Trading</label>
                  <select className="w-full px-3 py-2 bg-[#B8D4C1] text-[#1E2E23] rounded-lg border border-[#A0C8A9]/30 focus:border-[#A0C8A9] focus:outline-none">
                    <option>Select experience level</option>
                    <option>Less than 1 year</option>
                    <option>1-3 years</option>
                    <option>3-5 years</option>
                    <option>5-10 years</option>
                    <option>More than 10 years</option>
                  </select>
                </div>
                <div>
                  <label className="block text-[#A0C8A9] text-sm font-medium mb-2">Expected Monthly Client Volume</label>
                  <select className="w-full px-3 py-2 bg-[#B8D4C1] text-[#1E2E23] rounded-lg border border-[#A0C8A9]/30 focus:border-[#A0C8A9] focus:outline-none">
                    <option>Select volume</option>
                    <option>1-10 clients</option>
                    <option>11-25 clients</option>
                    <option>26-50 clients</option>
                    <option>50+ clients</option>
                  </select>
                </div>
              </div>

              <div>
                <label className="block text-[#A0C8A9] text-sm font-medium mb-2">Marketing Strategy Description</label>
                <textarea 
                  rows={4}
                  placeholder="Describe your marketing strategy and how you plan to acquire clients"
                  className="w-full px-3 py-2 bg-[#B8D4C1] text-[#1E2E23] rounded-lg border border-[#A0C8A9]/30 focus:border-[#A0C8A9] focus:outline-none placeholder-[#2D4A35] resize-none"
                ></textarea>
              </div>

              <div>
                <label className="block text-[#A0C8A9] text-sm font-medium mb-2">Previous IB Experience</label>
                <textarea 
                  rows={3}
                  placeholder="Describe any previous experience as an Introducing Broker"
                  className="w-full px-3 py-2 bg-[#B8D4C1] text-[#1E2E23] rounded-lg border border-[#A0C8A9]/30 focus:border-[#A0C8A9] focus:outline-none placeholder-[#2D4A35] resize-none"
                ></textarea>
              </div>

              <div>
                <label className="flex items-center space-x-3">
                  <input type="checkbox" className="rounded" />
                  <span className="text-[#A0C8A9] text-sm">I agree to the Master IB Terms and Conditions</span>
                </label>
              </div>

              <div>
                <label className="flex items-center space-x-3">
                  <input type="checkbox" className="rounded" />
                  <span className="text-[#A0C8A9] text-sm">I confirm that all information provided is accurate and complete</span>
                </label>
              </div>

              <div className="flex space-x-4 pt-4">
                <button 
                  type="submit"
                  className="flex-1 bg-[#A0C8A9] text-[#1E2E23] py-3 px-6 rounded-lg font-medium hover:bg-[#8FB89A] transition-colors"
                >
                  Submit Application
                </button>
                <button 
                  type="button"
                  className="px-6 py-3 border border-[#A0C8A9] text-[#A0C8A9] rounded-lg hover:bg-[#A0C8A9]/10 transition-colors"
                >
                  Save Draft
                </button>
              </div>
            </form>
          </div>

          {/* Requirements */}
          <div className="bg-[#2D4A35] rounded-lg p-6">
            <h3 className="text-white text-lg font-medium mb-4">Requirements</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <h4 className="text-[#A0C8A9] font-medium mb-3">Minimum Requirements</h4>
                <ul className="space-y-2 text-white text-sm">
                  <li className="flex items-center">
                    <svg className="w-4 h-4 text-green-400 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                    </svg>
                    Minimum 1 year trading experience
                  </li>
                  <li className="flex items-center">
                    <svg className="w-4 h-4 text-green-400 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                    </svg>
                    Active trading account with RAZ CAPITALS
                  </li>
                  <li className="flex items-center">
                    <svg className="w-4 h-4 text-green-400 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                    </svg>
                    Completed KYC verification
                  </li>
                  <li className="flex items-center">
                    <svg className="w-4 h-4 text-green-400 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                    </svg>
                    Clean compliance record
                  </li>
                </ul>
              </div>
              <div>
                <h4 className="text-[#A0C8A9] font-medium mb-3">Application Process</h4>
                <ul className="space-y-2 text-white text-sm">
                  <li className="flex items-center">
                    <span className="w-6 h-6 bg-[#A0C8A9] text-[#1E2E23] rounded-full text-xs flex items-center justify-center mr-3 font-medium">1</span>
                    Submit application form
                  </li>
                  <li className="flex items-center">
                    <span className="w-6 h-6 bg-[#A0C8A9] text-[#1E2E23] rounded-full text-xs flex items-center justify-center mr-3 font-medium">2</span>
                    Review and verification (3-5 days)
                  </li>
                  <li className="flex items-center">
                    <span className="w-6 h-6 bg-[#A0C8A9] text-[#1E2E23] rounded-full text-xs flex items-center justify-center mr-3 font-medium">3</span>
                    Interview with IB team
                  </li>
                  <li className="flex items-center">
                    <span className="w-6 h-6 bg-[#A0C8A9] text-[#1E2E23] rounded-full text-xs flex items-center justify-center mr-3 font-medium">4</span>
                    Agreement signing and activation
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
