import { Metadata } from 'next';
import Image from 'next/image';

export const metadata: Metadata = {
  title: 'Accounts History - RAZ CAPITALS',
  description: 'View your account history and trading account details.',
};

export default function AccountsPage() {
  return (
    <div className="flex h-screen bg-[#0A2E1D] overflow-hidden">
      {/* Sidebar */}
      <div className="w-64 bg-[#0F1B14] border-r border-[#A0C8A9]/20 flex flex-col">
        <div className="p-6 border-b border-[#A0C8A9]/20">
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

        <div className="flex-1 overflow-y-auto">
          <nav className="px-4 py-6 space-y-2">
            <a href="/dashboard" className="flex items-center space-x-3 px-4 py-3 text-[#A0C8A9]/70 hover:text-white hover:bg-[#A0C8A9]/10 rounded-lg transition-colors">Dashboard</a>
            <a href="/dashboard/wallets" className="flex items-center space-x-3 px-4 py-3 text-[#A0C8A9]/70 hover:text-white hover:bg-[#A0C8A9]/10 rounded-lg transition-colors">Wallets</a>
            <a href="/dashboard/my-accounts" className="flex items-center space-x-3 px-4 py-3 text-[#A0C8A9]/70 hover:text-white hover:bg-[#A0C8A9]/10 rounded-lg transition-colors">My Accounts</a>
            <a href="/dashboard/new-account" className="flex items-center space-x-3 px-4 py-3 text-[#A0C8A9]/70 hover:text-white hover:bg-[#A0C8A9]/10 rounded-lg transition-colors">New Account</a>
            <a href="/dashboard/deposit" className="flex items-center space-x-3 px-4 py-3 text-[#A0C8A9]/70 hover:text-white hover:bg-[#A0C8A9]/10 rounded-lg transition-colors">Deposit</a>
            <a href="/dashboard/transfer" className="flex items-center space-x-3 px-4 py-3 text-[#A0C8A9]/70 hover:text-white hover:bg-[#A0C8A9]/10 rounded-lg transition-colors">Transfer</a>
            <a href="/dashboard/withdraw" className="flex items-center space-x-3 px-4 py-3 text-[#A0C8A9]/70 hover:text-white hover:bg-[#A0C8A9]/10 rounded-lg transition-colors">Withdraw</a>
            <a href="/dashboard/history" className="flex items-center space-x-3 px-4 py-3 text-white bg-[#A0C8A9]/10 rounded-lg border-l-4 border-[#A0C8A9]">
              <span className="font-medium">History</span>
            </a>
          </nav>
        </div>
        
        <div className="p-4 border-t border-[#A0C8A9]/20">
          <a href="/dashboard/settings" className="flex items-center space-x-3 px-4 py-3 text-[#A0C8A9]/70 hover:text-white hover:bg-[#A0C8A9]/10 rounded-lg transition-colors">Settings</a>
        </div>
      </div>

      {/* Main Content */}
      <div className="flex-1 flex flex-col overflow-hidden">
        <div className="bg-[#0A2E1D] border-b border-[#A0C8A9]/20 px-6 py-4 flex-shrink-0">
          <div className="flex justify-between items-center">
            <h1 className="text-white text-xl font-medium">Syed Anwar</h1>
            <div className="flex items-center space-x-4">
              <div className="w-8 h-8 bg-[#A0C8A9] rounded-full flex items-center justify-center">
                <span className="text-[#1E2E23] font-medium text-sm">S</span>
              </div>
            </div>
          </div>
        </div>

        {/* Accounts History Content */}
        <div className="flex-1 p-6 space-y-6 overflow-y-auto" style={{ backgroundColor: '#B8D4C1' }}>
          <div>
            <h2 className="text-2xl font-bold text-[#1E2E23] mb-2">Accounts History</h2>
            <p className="text-[#2D4A35]">View your account history and trading account details.</p>
          </div>

          {/* Filters */}
          <div className="bg-[#2D4A35] rounded-lg p-6">
            <h3 className="text-white text-lg font-medium mb-4">Filters</h3>
            <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
              <div>
                <label className="block text-[#A0C8A9] text-sm font-medium mb-2">Account Type</label>
                <select className="w-full px-3 py-2 bg-[#B8D4C1] text-[#1E2E23] rounded-lg border border-[#A0C8A9]/30 focus:border-[#A0C8A9] focus:outline-none">
                  <option>All Types</option>
                  <option>Trading Account</option>
                  <option>Wallet</option>
                  <option>Demo Account</option>
                </select>
              </div>
              <div>
                <label className="block text-[#A0C8A9] text-sm font-medium mb-2">Account</label>
                <select className="w-full px-3 py-2 bg-[#B8D4C1] text-[#1E2E23] rounded-lg border border-[#A0C8A9]/30 focus:border-[#A0C8A9] focus:outline-none">
                  <option>All Accounts</option>
                  <option>Standard Trading Account</option>
                  <option>Pro Trading Account</option>
                  <option>USD Wallet</option>
                </select>
              </div>
              <div>
                <label className="block text-[#A0C8A9] text-sm font-medium mb-2">Date From</label>
                <input 
                  type="date" 
                  className="w-full px-3 py-2 bg-[#B8D4C1] text-[#1E2E23] rounded-lg border border-[#A0C8A9]/30 focus:border-[#A0C8A9] focus:outline-none"
                />
              </div>
              <div>
                <label className="block text-[#A0C8A9] text-sm font-medium mb-2">Date To</label>
                <input 
                  type="date" 
                  className="w-full px-3 py-2 bg-[#B8D4C1] text-[#1E2E23] rounded-lg border border-[#A0C8A9]/30 focus:border-[#A0C8A9] focus:outline-none"
                />
              </div>
            </div>
            <div className="flex space-x-4 mt-4">
              <button className="bg-[#A0C8A9] text-[#1E2E23] px-6 py-2 rounded-lg font-medium hover:bg-[#8FB89A] transition-colors">
                Apply Filters
              </button>
              <button className="border border-[#A0C8A9] text-[#A0C8A9] px-6 py-2 rounded-lg hover:bg-[#A0C8A9]/10 transition-colors">
                Reset
              </button>
            </div>
          </div>

          {/* Accounts Table */}
          <div className="bg-[#2D4A35] rounded-lg p-6">
            <div className="flex justify-between items-center mb-4">
              <h3 className="text-white text-lg font-medium">All Accounts</h3>
              <button className="text-[#A0C8A9] text-sm hover:text-white transition-colors">
                Export CSV
              </button>
            </div>
            
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead>
                  <tr className="border-b border-[#A0C8A9]/20">
                    <th className="text-left text-[#A0C8A9] text-sm font-medium py-3">Account Number</th>
                    <th className="text-left text-[#A0C8A9] text-sm font-medium py-3">Account Type</th>
                    <th className="text-left text-[#A0C8A9] text-sm font-medium py-3">Balance</th>
                    <th className="text-left text-[#A0C8A9] text-sm font-medium py-3">Currency</th>
                    <th className="text-center text-[#A0C8A9] text-sm font-medium py-3">Status</th>
                    <th className="text-left text-[#A0C8A9] text-sm font-medium py-3">Last Activity</th>
                  </tr>
                </thead>
                <tbody className="text-white">
                  <tr className="border-b border-[#A0C8A9]/10">
                    <td className="py-3 text-sm">ACC-001</td>
                    <td className="py-3 text-sm">Standard Trading Account</td>
                    <td className="py-3 text-sm font-medium">$25,000.00</td>
                    <td className="py-3 text-sm">USD</td>
                    <td className="py-3 text-center">
                      <span className="bg-green-100 text-green-800 px-2 py-1 rounded text-xs font-medium">Active</span>
                    </td>
                    <td className="py-3 text-sm">Dec 18, 2024</td>
                  </tr>
                  <tr className="border-b border-[#A0C8A9]/10">
                    <td className="py-3 text-sm">ACC-002</td>
                    <td className="py-3 text-sm">Pro Trading Account</td>
                    <td className="py-3 text-sm font-medium">$50,000.00</td>
                    <td className="py-3 text-sm">USD</td>
                    <td className="py-3 text-center">
                      <span className="bg-green-100 text-green-800 px-2 py-1 rounded text-xs font-medium">Active</span>
                    </td>
                    <td className="py-3 text-sm">Dec 17, 2024</td>
                  </tr>
                  <tr className="border-b border-[#A0C8A9]/10">
                    <td className="py-3 text-sm">ACC-003</td>
                    <td className="py-3 text-sm">USD Wallet</td>
                    <td className="py-3 text-sm font-medium">$15,000.00</td>
                    <td className="py-3 text-sm">USD</td>
                    <td className="py-3 text-center">
                      <span className="bg-green-100 text-green-800 px-2 py-1 rounded text-xs font-medium">Active</span>
                    </td>
                    <td className="py-3 text-sm">Dec 16, 2024</td>
                  </tr>
                  <tr className="border-b border-[#A0C8A9]/10">
                    <td className="py-3 text-sm">ACC-004</td>
                    <td className="py-3 text-sm">Demo Trading Account</td>
                    <td className="py-3 text-sm font-medium">$10,000.00</td>
                    <td className="py-3 text-sm">USD</td>
                    <td className="py-3 text-center">
                      <span className="bg-blue-100 text-blue-800 px-2 py-1 rounded text-xs font-medium">Demo</span>
                    </td>
                    <td className="py-3 text-sm">Dec 15, 2024</td>
                  </tr>
                  <tr className="border-b border-[#A0C8A9]/10">
                    <td className="py-3 text-sm">ACC-005</td>
                    <td className="py-3 text-sm">EUR Wallet</td>
                    <td className="py-3 text-sm font-medium">€5,000.00</td>
                    <td className="py-3 text-sm">EUR</td>
                    <td className="py-3 text-center">
                      <span className="bg-green-100 text-green-800 px-2 py-1 rounded text-xs font-medium">Active</span>
                    </td>
                    <td className="py-3 text-sm">Dec 14, 2024</td>
                  </tr>
                </tbody>
              </table>
            </div>

            {/* Pagination */}
            <div className="flex justify-between items-center mt-6">
              <p className="text-[#A0C8A9]/70 text-sm">Showing 1-5 of 5 accounts</p>
              <div className="flex space-x-2">
                <button className="px-3 py-1 bg-[#A0C8A9] text-[#1E2E23] rounded">1</button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
