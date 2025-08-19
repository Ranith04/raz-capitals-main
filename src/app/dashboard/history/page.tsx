'use client';

import { useState } from 'react';

export default function HistoryPage() {
  const [activeTab, setActiveTab] = useState('transactions');

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
    <div className="flex h-screen bg-[#0A2E1D] overflow-hidden">
      {/* Sidebar */}
      <div className="w-64 bg-[#0F1B14] border-r border-[#A0C8A9]/20 flex flex-col">
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
            <a href="/dashboard" className="flex items-center space-x-3 px-4 py-3 text-[#A0C8A9]/70 hover:text-white hover:bg-[#A0C8A9]/10 rounded-lg transition-colors">Dashboard</a>
            <a href="/dashboard/wallets" className="flex items-center space-x-3 px-4 py-3 text-[#A0C8A9]/70 hover:text-white hover:bg-[#A0C8A9]/10 rounded-lg transition-colors">Wallets</a>
            <a href="/dashboard/my-accounts" className="flex items-center space-x-3 px-4 py-3 text-[#A0C8A9]/70 hover:text-white hover:bg-[#A0C8A9]/10 rounded-lg transition-colors">My Accounts</a>
            <a href="/dashboard/new-account" className="flex items-center space-x-3 px-4 py-3 text-[#A0C8A9]/70 hover:text-white hover:bg-[#A0C8A9]/10 rounded-lg transition-colors">New Account</a>
            <a href="/dashboard/deposit" className="flex items-center space-x-3 px-4 py-3 text-[#A0C8A9]/70 hover:text-white hover:bg-[#A0C8A9]/10 rounded-lg transition-colors">Deposit</a>
            <a href="/dashboard/transfer" className="flex items-center space-x-3 px-4 py-3 text-[#A0C8A9]/70 hover:text-white hover:bg-[#A0C8A9]/10 rounded-lg transition-colors">Transfer</a>
            <a href="/dashboard/withdraw" className="flex items-center space-x-3 px-4 py-3 text-[#A0C8A9]/70 hover:text-white hover:bg-[#A0C8A9]/10 rounded-lg transition-colors">Withdraw</a>
            <a href="/dashboard/copy-trading" className="flex items-center space-x-3 px-4 py-3 text-[#A0C8A9]/70 hover:text-white hover:bg-[#A0C8A9]/10 rounded-lg transition-colors">Copy Trading</a>
            <a href="/dashboard/history" className="flex items-center space-x-3 px-4 py-3 text-white bg-[#A0C8A9]/10 rounded-lg border-l-4 border-[#A0C8A9]">
              <span className="font-medium">History</span>
            </a>
            <a href="/dashboard/request-master-ib" className="flex items-center space-x-3 px-4 py-3 text-[#A0C8A9]/70 hover:text-white hover:bg-[#A0C8A9]/10 rounded-lg transition-colors">Request Master IB</a>
          </nav>
        </div>
        
        <div className="p-4 border-t border-[#A0C8A9]/20">
          <a href="/dashboard/settings" className="flex items-center space-x-3 px-4 py-3 text-[#A0C8A9]/70 hover:text-white hover:bg-[#A0C8A9]/10 rounded-lg transition-colors">Settings</a>
        </div>
      </div>

      {/* Main Content */}
      <div className="flex-1 flex flex-col overflow-hidden">
        {/* Top Header */}
        <div className="bg-black px-6 py-4 flex-shrink-0">
          <div className="flex justify-between items-center">
            <h1 className="text-lg sm:text-xl font-medium text-white">Syed Anwar</h1>
            <div className="flex items-center space-x-4">
              {/* Dark/Light Mode Toggle */}
              <button className="text-white hover:text-gray-300 p-2 transition-colors">
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M20.354 15.354A9 9 0 018.646 3.646 9.003 9.003 0 0012 21a9.003 9.003 0 008.354-5.646z" />
                </svg>
              </button>

              {/* Language Selector */}
              <button className="text-white hover:text-gray-300 p-2 transition-colors">
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5h12M9 3v2m0 4v2m0 4v2M9 3a2 2 0 00-2 2v2a2 2 0 002 2h6a2 2 0 002-2V5a2 2 0 00-2-2M9 3a2 2 0 012 2v2a2 2 0 01-2 2H7a2 2 0 01-2-2V5a2 2 0 012-2z" />
                </svg>
              </button>

              {/* Full Screen Toggle */}
              <button className="text-white hover:text-gray-300 p-2 transition-colors">
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 8V4m0 0h4M4 4l5 5m11-1V4m0 0h-4m4 0l-5 5M4 16v4m0 0h4m-4 0l5-5m11 5l-5-5m5 5v-4m0 4h-4" />
                </svg>
              </button>

              {/* Notification Bell */}
              <button className="text-white hover:text-gray-300 p-2 transition-colors relative">
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 17h5l-5 5v-5z" />
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M18 8A6 6 0 006 8c0 7-3 9-3 9h18s-3-2-3-9" />
                </svg>
                <span className="absolute -top-1 -right-1 w-4 h-4 bg-red-500 rounded-full text-xs flex items-center justify-center text-white font-semibold">0</span>
              </button>

              {/* Profile Avatar */}
              <div className="w-8 h-8 bg-yellow-400 rounded-full flex items-center justify-center">
                <span className="text-black font-bold text-sm">S</span>
              </div>
            </div>
          </div>
        </div>

        {/* History Content */}
        <div className="flex-1 p-6 space-y-6 overflow-y-auto bg-[#B8D4C1]">
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
