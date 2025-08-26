'use client';

import UserHeader from '@/components/UserHeader';
import { useState } from 'react';

export default function TransferClient() {
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
            <a href="/dashboard/transfer" className={`flex items-center space-x-3 px-4 py-3 ${darkMode ? 'text-white bg-[#A0C8A9]/10 border-[#A0C8A9]' : 'text-gray-900 bg-blue-50 border-blue-500'} rounded-lg border-l-4`}>
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7h12m0 0l-4-4m4 4l-4 4m0 6H4m0 0l4 4m-4-4l4-4" />
              </svg>
              <span className="font-medium">Transfer</span>
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

        {/* Transfer Content */}
        <div className={`flex-1 p-4 sm:p-6 space-y-4 sm:space-y-6 overflow-y-auto ${darkMode ? 'bg-[#B8D4C1]' : 'bg-gray-50'}`}>
          <div>
            <h2 className="text-xl sm:text-2xl font-bold text-[#1E2E23] mb-2">Transfer Funds</h2>
            <p className="text-[#2D4A35] text-sm sm:text-base">Move funds between your accounts or send to other users.</p>
          </div>

          {/* Transfer Types */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 sm:gap-6">
            <div className="bg-[#2D4A35] rounded-lg p-4 sm:p-6 text-white cursor-pointer hover:bg-[#3A5642] transition-colors border border-[#A0C8A9]">
              <h3 className="text-base sm:text-lg font-medium mb-2 text-[#A0C8A9]">Internal Transfer</h3>
              <p className="text-xs sm:text-sm mb-4">Transfer between your own accounts instantly with no fees.</p>
              <ul className="text-xs space-y-1 text-[#A0C8A9]/70">
                <li>• Instant transfer</li>
                <li>• No fees</li>
                <li>• Between your accounts</li>
              </ul>
            </div>

            <div className="bg-[#2D4A35] rounded-lg p-4 sm:p-6 text-white cursor-pointer hover:bg-[#3A5642] transition-colors">
              <h3 className="text-base sm:text-lg font-medium mb-2 text-[#A0C8A9]">External Transfer</h3>
              <p className="text-xs sm:text-sm mb-4">Send funds to other RAZ CAPITALS users securely.</p>
              <ul className="text-xs space-y-1 text-[#A0C8A9]/70">
                <li>• To other users</li>
                <li>• Small processing fee</li>
                <li>• Secure verification</li>
              </ul>
            </div>
          </div>

          {/* Transfer Form */}
          <div className="bg-[#2D4A35] rounded-lg p-4 sm:p-6">
            <h3 className="text-white text-base sm:text-lg font-medium mb-4 sm:mb-6">Transfer Details</h3>
            <form className="space-y-4 sm:space-y-6">
              <div>
                <label className="block text-[#A0C8A9] text-sm font-medium mb-2">Transfer Type</label>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                  <label className="flex items-center p-3 bg-[#B8D4C1] rounded-lg cursor-pointer hover:bg-[#A0C8A9] transition-colors">
                    <input type="radio" name="transferType" value="internal" className="mr-3" defaultChecked />
                    <span className="text-[#1E2E23] font-medium text-sm">Internal Transfer</span>
                  </label>
                  <label className="flex items-center p-3 bg-[#B8D4C1] rounded-lg cursor-pointer hover:bg-[#A0C8A9] transition-colors">
                    <input type="radio" name="transferType" value="external" className="mr-3" />
                    <span className="text-[#1E2E23] font-medium text-sm">External Transfer</span>
                  </label>
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-[#A0C8A9] text-sm font-medium mb-2">From Account</label>
                  <select className="w-full px-3 py-2 bg-[#B8D4C1] text-[#1E2E23] rounded-lg border border-[#A0C8A9]/30 focus:border-[#A0C8A9] focus:outline-none">
                    <option>Standard Trading Account - $25,000.00</option>
                    <option>Pro Trading Account - $50,000.00</option>
                    <option>USD Wallet - $52,648.00</option>
                  </select>
                </div>
                <div>
                  <label className="block text-[#A0C8A9] text-sm font-medium mb-2">To Account</label>
                  <select className="w-full px-3 py-2 bg-[#B8D4C1] text-[#1E2E23] rounded-lg border border-[#A0C8A9]/30 focus:border-[#A0C8A9] focus:outline-none">
                    <option>Select destination account</option>
                    <option>Pro Trading Account - $50,000.00</option>
                    <option>Demo Account - $10,000.00</option>
                    <option>EUR Wallet - €15,280.50</option>
                  </select>
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-[#A0C8A9] text-sm font-medium mb-2">Amount</label>
                  <input 
                    type="number" 
                    placeholder="Enter transfer amount"
                    className="w-full px-3 py-2 bg-[#B8D4C1] text-[#1E2E23] rounded-lg border border-[#A0C8A9]/30 focus:border-[#A0C8A9] focus:outline-none placeholder-[#2D4A35]"
                  />
                  <p className="text-[#A0C8A9]/70 text-xs mt-1">Available: $25,000.00</p>
                </div>
                <div>
                  <label className="block text-[#A0C8A9] text-sm font-medium mb-2">Currency</label>
                  <select className="w-full px-3 py-2 bg-[#B8D4C1] text-[#1E2E23] rounded-lg border border-[#A0C8A9]/30 focus:border-[#A0C8A9] focus:outline-none">
                    <option>USD</option>
                    <option>EUR</option>
                    <option>GBP</option>
                  </select>
                </div>
              </div>

              {/* External Transfer Fields */}
              <div className="space-y-4 border-t border-[#A0C8A9]/20 pt-4">
                <h4 className="text-[#A0C8A9] font-medium">Recipient Details (External Transfer)</h4>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-[#A0C8A9] text-sm font-medium mb-2">Recipient Email or Account ID</label>
                    <input 
                      type="text" 
                      placeholder="user@example.com or account ID"
                      className="w-full px-3 py-2 bg-[#B8D4C1] text-[#1E2E23] rounded-lg border border-[#A0C8A9]/30 focus:border-[#A0C8A9] focus:outline-none placeholder-[#2D4A35]"
                    />
                  </div>
                  <div>
                    <label className="block text-[#A0C8A9] text-sm font-medium mb-2">Recipient Name</label>
                    <input 
                      type="text" 
                      placeholder="Full name of recipient"
                      className="w-full px-3 py-2 bg-[#B8D4C1] text-[#1E2E23] rounded-lg border border-[#A0C8A9]/30 focus:border-[#A0C8A9] focus:outline-none placeholder-[#2D4A35]"
                    />
                  </div>
                </div>
              </div>

              <div>
                <label className="block text-[#A0C8A9] text-sm font-medium mb-2">Reference/Note (Optional)</label>
                <textarea 
                  rows={3}
                  placeholder="Add a note for this transfer"
                  className="w-full px-3 py-2 bg-[#B8D4C1] text-[#1E2E23] rounded-lg border border-[#A0C8A9]/30 focus:border-[#A0C8A9] focus:outline-none placeholder-[#2D4A35] resize-none"
                ></textarea>
              </div>

              {/* Transfer Summary */}
              <div className="bg-[#B8D4C1] rounded-lg p-4">
                <h4 className="text-[#1E2E23] font-medium mb-3">Transfer Summary</h4>
                <div className="space-y-2 text-sm">
                  <div className="flex justify-between">
                    <span className="text-[#2D4A35]">Transfer Amount:</span>
                    <span className="text-[#1E2E23] font-medium">$0.00</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-[#2D4A35]">Transfer Fee:</span>
                    <span className="text-[#1E2E23] font-medium">$0.00</span>
                  </div>
                  <div className="border-t border-[#2D4A35]/20 pt-2 flex justify-between">
                    <span className="text-[#1E2E23] font-medium">Total:</span>
                    <span className="text-[#1E2E23] font-bold">$0.00</span>
                  </div>
                </div>
              </div>

              <div className="flex flex-col sm:flex-row space-y-3 sm:space-y-0 sm:space-x-4 pt-4">
                <button 
                  type="submit"
                  className="flex-1 bg-[#A0C8A9] text-[#1E2E23] py-3 px-6 rounded-lg font-medium hover:bg-[#8FB89A] transition-colors"
                >
                  Execute Transfer
                </button>
                <button 
                  type="button"
                  className="px-6 py-3 border border-[#A0C8A9] text-[#A0C8A9] rounded-lg hover:bg-[#A0C8A9]/10 transition-colors"
                >
                  Cancel
                </button>
              </div>
            </form>
          </div>

          {/* Recent Transfers */}
          <div className="bg-[#2D4A35] rounded-lg p-4 sm:p-6">
            <h3 className="text-white text-base sm:text-lg font-medium mb-4">Recent Transfers</h3>
            <div className="space-y-3">
              <div className="flex flex-col sm:flex-row sm:justify-between sm:items-center p-3 bg-[#B8D4C1] rounded-lg space-y-2 sm:space-y-0">
                <div>
                  <p className="font-medium text-[#1E2E23] text-sm sm:text-base">$5,000.00 → Pro Trading Account</p>
                  <p className="text-xs sm:text-sm text-[#2D4A35]">Internal Transfer - Today, 2:30 PM</p>
                </div>
                <span className="bg-green-100 text-green-800 px-2 py-1 rounded text-xs font-medium self-start sm:self-auto">Completed</span>
              </div>
              <div className="flex flex-col sm:flex-row sm:justify-between sm:items-center p-3 bg-[#B8D4C1] rounded-lg space-y-2 sm:space-y-0">
                <div>
                  <p className="font-medium text-[#1E2E23] text-sm sm:text-base">$1,500.00 → john.doe@email.com</p>
                  <p className="text-xs sm:text-sm text-[#2D4A35]">External Transfer - Yesterday, 4:15 PM</p>
                </div>
                <span className="bg-green-100 text-green-800 px-2 py-1 rounded text-xs font-medium self-start sm:self-auto">Completed</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
