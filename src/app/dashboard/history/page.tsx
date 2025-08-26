'use client';

import UserHeader from '@/components/UserHeader';
import { useState } from 'react';

export default function HistoryPage() {
  const [activeTab, setActiveTab] = useState('transactions');
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [darkMode, setDarkMode] = useState(true);

  const transactions = [
    {
      date: 'Dec 18, 2024 2:30 PM',
      type: 'Deposit',
      description: 'Credit Card Deposit',
      account: 'Standard Account',
      amount: '+$5,000.00',
      status: 'Completed',
      amountType: 'positive'
    },
    {
      date: 'Dec 17, 2024 4:15 PM',
      type: 'Trade',
      description: 'Buy EUR/USD',
      account: 'Pro Account',
      amount: '+$1,250.00',
      status: 'Completed',
      amountType: 'positive'
    },
    {
      date: 'Dec 16, 2024 1:45 PM',
      type: 'Transfer',
      description: 'Internal Transfer',
      account: 'USD Wallet → Pro Account',
      amount: '$10,000.00',
      status: 'Completed',
      amountType: 'neutral'
    },
    {
      date: 'Dec 15, 2024 11:20 AM',
      type: 'Withdrawal',
      description: 'Bank Transfer',
      account: 'Standard Account',
      amount: '-$2,500.00',
      status: 'Processing',
      amountType: 'negative'
    },
    {
      date: 'Dec 14, 2024 3:30 PM',
      type: 'Trade',
      description: 'Sell GBP/USD',
      account: 'Pro Account',
      amount: '-$890.00',
      status: 'Completed',
      amountType: 'negative'
    },
    {
      date: 'Dec 13, 2024 9:15 AM',
      type: 'Copy Trade',
      description: 'Following Sarah Kim',
      account: 'Standard Account',
      amount: '+$420.00',
      status: 'Completed',
      amountType: 'positive'
    }
  ];

  const accounts = [
    {
      accountNumber: 'ACC-001',
      accountType: 'Standard Trading Account',
      balance: '$25,000.00',
      currency: 'USD',
      status: 'Active',
      lastActivity: 'Dec 18, 2024'
    },
    {
      accountNumber: 'ACC-002',
      accountType: 'Pro Trading Account',
      balance: '$50,000.00',
      currency: 'USD',
      status: 'Active',
      lastActivity: 'Dec 17, 2024'
    },
    {
      accountNumber: 'ACC-003',
      accountType: 'USD Wallet',
      balance: '$15,000.00',
      currency: 'USD',
      status: 'Active',
      lastActivity: 'Dec 16, 2024'
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
            <a href="/dashboard/history" className={`flex items-center space-x-3 px-4 py-3 ${darkMode ? 'text-white bg-[#A0C8A9]/10 border-[#A0C8A9]' : 'text-gray-900 bg-blue-50 border-blue-500'} rounded-lg border-l-4`}>
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
              <span className="font-medium">History</span>
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

        {/* History Content */}
        <div className={`flex-1 p-6 space-y-6 overflow-y-auto ${darkMode ? 'bg-[#B8D4C1]' : 'bg-gray-50'}`}>
          {/* Tabs */}
          <div className="flex space-x-1 bg-[#2D4A35] p-1 rounded-lg max-w-md border border-[#A0C8A9]/30">
            <button
              onClick={() => setActiveTab('transactions')}
              className={`flex-1 px-4 py-2 rounded-md text-sm font-medium transition-colors ${
                activeTab === 'transactions'
                  ? 'bg-[#0A2E1D] text-white'
                  : 'text-[#A0C8A9] hover:text-white'
              }`}
            >
              Transactions
            </button>
            <button
              onClick={() => setActiveTab('accounts')}
              className={`flex-1 px-4 py-2 rounded-md text-sm font-medium transition-colors ${
                activeTab === 'accounts'
                  ? 'bg-[#0A2E1D] text-white'
                  : 'text-[#A0C8A9] hover:text-white'
              }`}
            >
              Accounts
            </button>
          </div>

          {/* Content based on active tab */}
          {activeTab === 'transactions' ? (
            <div>
              <h1 className="text-2xl font-bold text-[#1E2E23] mb-6">Transaction History</h1>

          {/* Filters */}
              <div className="flex flex-wrap items-center gap-4 mb-6">
                <select className="px-4 py-2 bg-white/70 border border-[#A0C8A9]/30 rounded-lg text-sm text-[#1E2E23]">
                  <option>Select Days</option>
                  <option>Last 7 days</option>
                  <option>Last 30 days</option>
                  <option>Last 90 days</option>
                </select>
                <select className="px-4 py-2 bg-white/70 border border-[#A0C8A9]/30 rounded-lg text-sm text-[#1E2E23]">
                  <option>All transaction types</option>
                  <option>Deposits</option>
                  <option>Withdrawals</option>
                  <option>Transfers</option>
                  <option>Trades</option>
                </select>
                <select className="px-4 py-2 bg-white/70 border border-[#A0C8A9]/30 rounded-lg text-sm text-[#1E2E23]">
                  <option>All statuses</option>
                  <option>Completed</option>
                  <option>Processing</option>
                  <option>Pending</option>
                  <option>Failed</option>
                </select>
                <select className="px-4 py-2 bg-white/70 border border-[#A0C8A9]/30 rounded-lg text-sm text-[#1E2E23]">
                  <option>All accounts</option>
                  <option>Standard Account</option>
                  <option>Pro Account</option>
                  <option>USD Wallet</option>
                </select>
                <button className="px-4 py-2 bg-[#0A2E1D] text-white rounded-lg text-sm flex items-center space-x-2 hover:bg-[#0F1B14]">
                  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 10v6m0 0l-3-3m3 3l3-3m2 8H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                  </svg>
                  <span>Export</span>
                </button>
              </div>

              {/* Transactions Table */}
              <div className="bg-[#2D4A35] border border-[#A0C8A9]/20 rounded-lg overflow-hidden">
                <div className="overflow-x-auto">
                  <table className="w-full">
                    <thead className="bg-[#254031]">
                      <tr>
                        <th className="px-6 py-3 text-left text-xs font-medium text-[#A0C8A9] uppercase tracking-wider">Date</th>
                        <th className="px-6 py-3 text-left text-xs font-medium text-[#A0C8A9] uppercase tracking-wider">Type</th>
                        <th className="px-6 py-3 text-left text-xs font-medium text-[#A0C8A9] uppercase tracking-wider">Description</th>
                        <th className="px-6 py-3 text-left text-xs font-medium text-[#A0C8A9] uppercase tracking-wider">Account</th>
                        <th className="px-6 py-3 text-right text-xs font-medium text-[#A0C8A9] uppercase tracking-wider">Amount</th>
                        <th className="px-6 py-3 text-center text-xs font-medium text-[#A0C8A9] uppercase tracking-wider">Status</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-[#A0C8A9]/10">
                      {transactions.map((transaction, index) => (
                        <tr key={index} className="hover:bg-[#23392c]">
                          <td className="px-6 py-4 whitespace-nowrap text-sm text-white">{transaction.date}</td>
                          <td className="px-6 py-4 whitespace-nowrap text-sm text-white">{transaction.type}</td>
                          <td className="px-6 py-4 whitespace-nowrap text-sm text-white">{transaction.description}</td>
                          <td className="px-6 py-4 whitespace-nowrap text-sm text-white">{transaction.account}</td>
                          <td className={`px-6 py-4 whitespace-nowrap text-sm text-right font-medium ${
                            transaction.amountType === 'positive' ? 'text-green-400' :
                            transaction.amountType === 'negative' ? 'text-red-400' : 'text-white'
                          }`}>
                            {transaction.amount}
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap text-center">
                            <span className={`inline-flex px-2 py-1 text-xs font-semibold rounded-full ${
                              transaction.status === 'Completed' ? 'bg-green-100 text-green-800' :
                              transaction.status === 'Processing' ? 'bg-yellow-100 text-yellow-800' :
                              'bg-gray-100 text-gray-800'
                            }`}>
                              {transaction.status}
                            </span>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>
            </div>
          ) : (
              <div>
              <h1 className="text-2xl font-bold text-[#1E2E23] mb-6">Accounts History</h1>
              
              {/* Filters */}
              <div className="flex flex-wrap items-center gap-4 mb-6">
                <select className="px-4 py-2 bg-white/70 border border-[#A0C8A9]/30 rounded-lg text-sm text-[#1E2E23]">
                  <option>Select Type</option>
                  <option>Trading Account</option>
                  <option>Wallet</option>
                  <option>Demo Account</option>
                </select>
                <select className="px-4 py-2 bg-white/70 border border-[#A0C8A9]/30 rounded-lg text-sm text-[#1E2E23]">
                  <option>Select Account</option>
                  <option>Standard Trading Account</option>
                  <option>Pro Trading Account</option>
                  <option>USD Wallet</option>
                </select>
                <input type="date" className="px-4 py-2 bg-white/70 border border-[#A0C8A9]/30 rounded-lg text-sm text-[#1E2E23]" defaultValue="2025-08-19" />
                <input type="date" className="px-4 py-2 bg-white/70 border border-[#A0C8A9]/30 rounded-lg text-sm text-[#1E2E23]" defaultValue="2025-08-19" />
                <button className="px-4 py-2 bg-[#0A2E1D] text-white rounded-lg text-sm hover:bg-[#0F1B14]">Filter</button>
            </div>
            
              {/* Accounts Table */}
              <div className="bg-[#2D4A35] border border-[#A0C8A9]/20 rounded-lg overflow-hidden">
            <div className="overflow-x-auto">
              <table className="w-full">
                    <thead className="bg-[#254031]">
                      <tr>
                        <th className="px-6 py-3 text-left text-xs font-medium text-[#A0C8A9] uppercase tracking-wider">Account Number</th>
                        <th className="px-6 py-3 text-left text-xs font-medium text-[#A0C8A9] uppercase tracking-wider">Account Type</th>
                        <th className="px-6 py-3 text-left text-xs font-medium text-[#A0C8A9] uppercase tracking-wider">Balance</th>
                        <th className="px-6 py-3 text-left text-xs font-medium text-[#A0C8A9] uppercase tracking-wider">Currency</th>
                        <th className="px-6 py-3 text-center text-xs font-medium text-[#A0C8A9] uppercase tracking-wider">Status</th>
                        <th className="px-6 py-3 text-left text-xs font-medium text-[#A0C8A9] uppercase tracking-wider">Last Activity</th>
                  </tr>
                </thead>
                    <tbody className="divide-y divide-[#A0C8A9]/10">
                      {accounts.map((account, index) => (
                        <tr key={index} className="hover:bg-[#23392c]">
                          <td className="px-6 py-4 whitespace-nowrap text-sm text-white">{account.accountNumber}</td>
                          <td className="px-6 py-4 whitespace-nowrap text-sm text-white">{account.accountType}</td>
                          <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-white">{account.balance}</td>
                          <td className="px-6 py-4 whitespace-nowrap text-sm text-white">{account.currency}</td>
                          <td className="px-6 py-4 whitespace-nowrap text-center">
                            <span className="inline-flex px-2 py-1 text-xs font-semibold rounded-full bg-green-100 text-green-800">
                              {account.status}
                            </span>
                    </td>
                          <td className="px-6 py-4 whitespace-nowrap text-sm text-white">{account.lastActivity}</td>
                  </tr>
                      ))}
                </tbody>
              </table>
            </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
