'use client';

import { useState } from 'react';

export default function WithdrawClient() {
  const [sidebarOpen, setSidebarOpen] = useState(false);

  return (
    <div className="flex h-screen bg-[#0A2E1D] overflow-hidden">
      {/* Mobile Sidebar Overlay */}
      {sidebarOpen && (
        <div 
          className="fixed inset-0 bg-black bg-opacity-50 z-40 lg:hidden"
          onClick={() => setSidebarOpen(false)}
        />
      )}

      {/* Sidebar */}
      <div className={`fixed inset-y-0 left-0 z-50 w-64 bg-[#0F1B14] border-r border-[#A0C8A9]/20 flex flex-col transform transition-transform duration-300 ease-in-out lg:translate-x-0 lg:static lg:inset-0 ${
        sidebarOpen ? 'translate-x-0' : '-translate-x-full'
      }`}>
        <div className="p-6 border-b border-[#A0C8A9]/20">
          <div className="flex items-center space-x-3">
            <div className="w-8 h-8 bg-[#A0C8A9] rounded-lg flex items-center justify-center">
              <span className="text-[#1E2E23] font-bold text-lg">R</span>
            </div>
            <span className="text-white font-bold text-lg">RAZ CAPITALS</span>
          </div>
        </div>

        <div className="flex-1 overflow-y-auto">
          <nav className="px-4 py-6 space-y-2">
            <a href="/dashboard" className="flex items-center space-x-3 px-4 py-3 text-[#A0C8A9]/70 hover:text-white hover:bg-[#A0C8A9]/10 rounded-lg transition-colors">
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 7v10a2 2 0 002 2h14a2 2 0 002-2V9a2 2 0 00-2-2H5a2 2 0 00-2-2z" />
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 5a2 2 0 012-2h4a2 2 0 012 2v4H8V5z" />
              </svg>
              <span>Dashboard</span>
            </a>
            <a href="/dashboard/wallets" className="flex items-center space-x-3 px-4 py-3 text-[#A0C8A9]/70 hover:text-white hover:bg-[#A0C8A9]/10 rounded-lg transition-colors">
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 10h18M7 15h1m4 0h1m-7 4h12a3 3 0 003-3V8a3 3 0 00-3-3H6a3 3 0 00-3 3v8a3 3 0 003 3z" />
              </svg>
              <span>Wallets</span>
            </a>
            <a href="/dashboard/my-accounts" className="flex items-center space-x-3 px-4 py-3 text-[#A0C8A9]/70 hover:text-white hover:bg-[#A0C8A9]/10 rounded-lg transition-colors">
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
              </svg>
              <span>My Accounts</span>
            </a>
            <a href="/dashboard/new-account" className="flex items-center space-x-3 px-4 py-3 text-[#A0C8A9]/70 hover:text-white hover:bg-[#A0C8A9]/10 rounded-lg transition-colors">
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M18 9v3m0 0v3m0-3h3m-3 0h-3m-2-5a4 4 0 11-8 0 4 4 0 018 0zM3 20a6 6 0 0112 0v1H3v-1z" />
              </svg>
              <span>New Account</span>
            </a>
            <a href="/dashboard/deposit" className="flex items-center space-x-3 px-4 py-3 text-[#A0C8A9]/70 hover:text-white hover:bg-[#A0C8A9]/10 rounded-lg transition-colors">
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 16a4 4 0 01-.88-7.903A5 5 0 1115.9 6L16 6a5 5 0 011 9.9M9 19l3 3m0 0l3-3m-3 3V10" />
              </svg>
              <span>Deposit</span>
            </a>
            <a href="/dashboard/transfer" className="flex items-center space-x-3 px-4 py-3 text-[#A0C8A9]/70 hover:text-white hover:bg-[#A0C8A9]/10 rounded-lg transition-colors">
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7h12m0 0l-4-4m4 4l-4 4m0 6H4m0 0l4 4m-4-4l4-4" />
              </svg>
              <span>Transfer</span>
            </a>
            <a href="/dashboard/withdraw" className="flex items-center space-x-3 px-4 py-3 text-white bg-[#A0C8A9]/10 rounded-lg border-l-4 border-[#A0C8A9]">
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 16a4 4 0 01-.88-7.903A5 5 0 1115.9 6L16 6a5 5 0 011 9.9M15 13l-3-3m0 0l-3 3m3-3v12" />
              </svg>
              <span className="font-medium">Withdraw</span>
            </a>
            <a href="/dashboard/copy-trading" className="flex items-center space-x-3 px-4 py-3 text-[#A0C8A9]/70 hover:text-white hover:bg-[#A0C8A9]/10 rounded-lg transition-colors">
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 16H6a2 2 0 01-2-2V6a2 2 0 012-2h8a2 2 0 012 2v2m-6 12h8a2 2 0 002-2v-8a2 2 0 00-2-2h-8a2 2 0 00-2 2v8a2 2 0 002 2z" />
              </svg>
              <span>Copy Trading</span>
            </a>
            <a href="/dashboard/history" className="flex items-center space-x-3 px-4 py-3 text-[#A0C8A9]/70 hover:text-white hover:bg-[#A0C8A9]/10 rounded-lg transition-colors">
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
              <span>History</span>
            </a>
            <a href="/dashboard/request-master-ib" className="flex items-center space-x-3 px-4 py-3 text-[#A0C8A9]/70 hover:text-white hover:bg-[#A0C8A9]/10 rounded-lg transition-colors">
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
              </svg>
              <span>Request Master IB</span>
            </a>
          </nav>
        </div>
        
        <div className="p-4 border-t border-[#A0C8A9]/20">
          <a href="/dashboard/settings" className="flex items-center space-x-3 px-4 py-3 text-[#A0C8A9]/70 hover:text-white hover:bg-[#A0C8A9]/10 rounded-lg transition-colors">
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
        <div className="bg-[#0A2E1D] border-b border-[#A0C8A9]/20 px-4 sm:px-6 py-4 flex-shrink-0">
          <div className="flex justify-between items-center">
            {/* Mobile Menu Button */}
            <button
              className="lg:hidden p-2 text-[#A0C8A9] hover:text-white transition-colors"
              onClick={() => setSidebarOpen(true)}
            >
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
              </svg>
            </button>
            
            <h1 className="text-white text-lg sm:text-xl font-medium">Syed Anwar</h1>
            <div className="flex items-center space-x-2 sm:space-x-4">
              <div className="w-8 h-8 bg-[#A0C8A9] rounded-full flex items-center justify-center">
                <span className="text-[#1E2E23] font-medium text-sm">S</span>
              </div>
            </div>
          </div>
        </div>

        {/* Withdraw Content */}
        <div className="flex-1 p-4 sm:p-6 space-y-4 sm:space-y-6 overflow-y-auto" style={{ backgroundColor: '#B8D4C1' }}>
          <div>
            <h2 className="text-xl sm:text-2xl font-bold text-[#1E2E23] mb-2">Withdraw Funds</h2>
            <p className="text-[#2D4A35] text-sm sm:text-base">Securely withdraw your funds from your trading account.</p>
          </div>

          {/* Account Balance Overview */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 sm:gap-6">
            <div className="bg-[#2D4A35] rounded-lg p-4 sm:p-6 text-white">
              <h3 className="text-sm text-[#A0C8A9] mb-2">Available Balance</h3>
              <p className="text-xl sm:text-2xl font-bold">$45,230.00</p>
              <p className="text-xs text-[#A0C8A9]/70 mt-1">Ready for Withdrawal</p>
            </div>
            <div className="bg-[#2D4A35] rounded-lg p-4 sm:p-6 text-white">
              <h3 className="text-sm text-[#A0C8A9] mb-2">Pending Withdrawals</h3>
              <p className="text-xl sm:text-2xl font-bold">$2,500.00</p>
              <p className="text-xs text-[#A0C8A9]/70 mt-1">Processing</p>
            </div>
            <div className="bg-[#2D4A35] rounded-lg p-4 sm:p-6 text-white">
              <h3 className="text-sm text-[#A0C8A9] mb-2">Total Withdrawn</h3>
              <p className="text-xl sm:text-2xl font-bold">$12,450.00</p>
              <p className="text-xs text-[#A0C8A9]/70 mt-1">This Month</p>
            </div>
          </div>

          {/* Withdrawal Form */}
          <div className="bg-[#2D4A35] rounded-lg p-4 sm:p-6">
            <h3 className="text-white text-base sm:text-lg font-medium mb-4 sm:mb-6">Withdrawal Request</h3>
            <form className="space-y-4 sm:space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-[#A0C8A9] text-sm font-medium mb-2">From Account</label>
                  <select className="w-full px-3 py-2 bg-[#B8D4C1] text-[#1E2E23] rounded-lg border border-[#A0C8A9]/30 focus:border-[#A0C8A9] focus:outline-none">
                    <option>Standard Trading Account - $25,000.00</option>
                    <option>Pro Trading Account - $50,000.00</option>
                  </select>
                </div>
                <div>
                  <label className="block text-[#A0C8A9] text-sm font-medium mb-2">Amount (USD)</label>
                  <input 
                    type="number" 
                    placeholder="Enter withdrawal amount"
                    className="w-full px-3 py-2 bg-[#B8D4C1] text-[#1E2E23] rounded-lg border border-[#A0C8A9]/30 focus:border-[#A0C8A9] focus:outline-none placeholder-[#2D4A35]"
                  />
                  <p className="text-[#A0C8A9]/70 text-xs mt-1">Minimum: $50, Maximum: $10,000 per day</p>
                </div>
              </div>

              <div>
                <label className="block text-[#A0C8A9] text-sm font-medium mb-2">Withdrawal Method</label>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
                  <label className="flex items-center p-3 bg-[#B8D4C1] rounded-lg cursor-pointer hover:bg-[#A0C8A9] transition-colors">
                    <input type="radio" name="method" value="bank" className="mr-3" />
                    <div>
                      <span className="text-[#1E2E23] font-medium text-sm">Bank Transfer</span>
                      <p className="text-[#2D4A35] text-xs">3-5 business days</p>
                    </div>
                  </label>
                  <label className="flex items-center p-3 bg-[#B8D4C1] rounded-lg cursor-pointer hover:bg-[#A0C8A9] transition-colors">
                    <input type="radio" name="method" value="paypal" className="mr-3" />
                    <div>
                      <span className="text-[#1E2E23] font-medium text-sm">PayPal</span>
                      <p className="text-[#2D4A35] text-xs">1-2 business days</p>
                    </div>
                  </label>
                  <label className="flex items-center p-3 bg-[#B8D4C1] rounded-lg cursor-pointer hover:bg-[#A0C8A9] transition-colors md:col-span-3 lg:col-span-1">
                    <input type="radio" name="method" value="crypto" className="mr-3" />
                    <div>
                      <span className="text-[#1E2E23] font-medium text-sm">Cryptocurrency</span>
                      <p className="text-[#2D4A35] text-xs">10-30 minutes</p>
                    </div>
                  </label>
                </div>
              </div>

              {/* Bank Details */}
              <div className="space-y-4 border-t border-[#A0C8A9]/20 pt-4">
                <h4 className="text-[#A0C8A9] font-medium">Bank Account Details</h4>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-[#A0C8A9] text-sm font-medium mb-2">Account Holder Name</label>
                    <input 
                      type="text" 
                      placeholder="Full name as on bank account"
                      className="w-full px-3 py-2 bg-[#B8D4C1] text-[#1E2E23] rounded-lg border border-[#A0C8A9]/30 focus:border-[#A0C8A9] focus:outline-none placeholder-[#2D4A35]"
                    />
                  </div>
                  <div>
                    <label className="block text-[#A0C8A9] text-sm font-medium mb-2">Bank Name</label>
                    <input 
                      type="text" 
                      placeholder="Name of the bank"
                      className="w-full px-3 py-2 bg-[#B8D4C1] text-[#1E2E23] rounded-lg border border-[#A0C8A9]/30 focus:border-[#A0C8A9] focus:outline-none placeholder-[#2D4A35]"
                    />
                  </div>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-[#A0C8A9] text-sm font-medium mb-2">Account Number</label>
                    <input 
                      type="text" 
                      placeholder="Bank account number"
                      className="w-full px-3 py-2 bg-[#B8D4C1] text-[#1E2E23] rounded-lg border border-[#A0C8A9]/30 focus:border-[#A0C8A9] focus:outline-none placeholder-[#2D4A35]"
                    />
                  </div>
                  <div>
                    <label className="block text-[#A0C8A9] text-sm font-medium mb-2">Routing Number</label>
                    <input 
                      type="text" 
                      placeholder="Bank routing number"
                      className="w-full px-3 py-2 bg-[#B8D4C1] text-[#1E2E23] rounded-lg border border-[#A0C8A9]/30 focus:border-[#A0C8A9] focus:outline-none placeholder-[#2D4A35]"
                    />
                  </div>
                </div>
              </div>

              <div className="flex flex-col sm:flex-row space-y-3 sm:space-y-0 sm:space-x-4 pt-4">
                <button 
                  type="submit"
                  className="flex-1 bg-[#A0C8A9] text-[#1E2E23] py-3 px-6 rounded-lg font-medium hover:bg-[#8FB89A] transition-colors"
                >
                  Submit Withdrawal Request
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

          {/* Recent Withdrawals */}
          <div className="bg-[#2D4A35] rounded-lg p-4 sm:p-6">
            <h3 className="text-white text-base sm:text-lg font-medium mb-4">Recent Withdrawals</h3>
            <div className="space-y-3">
              <div className="flex flex-col sm:flex-row sm:justify-between sm:items-center p-3 bg-[#B8D4C1] rounded-lg space-y-2 sm:space-y-0">
                <div>
                  <p className="font-medium text-[#1E2E23] text-sm sm:text-base">$2,500.00</p>
                  <p className="text-xs sm:text-sm text-[#2D4A35]">Bank Transfer - Dec 18, 2024</p>
                </div>
                <span className="bg-yellow-100 text-yellow-800 px-2 py-1 rounded text-xs font-medium self-start sm:self-auto">Processing</span>
              </div>
              <div className="flex flex-col sm:flex-row sm:justify-between sm:items-center p-3 bg-[#B8D4C1] rounded-lg space-y-2 sm:space-y-0">
                <div>
                  <p className="font-medium text-[#1E2E23] text-sm sm:text-base">$1,000.00</p>
                  <p className="text-xs sm:text-sm text-[#2D4A35]">PayPal - Dec 15, 2024</p>
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
