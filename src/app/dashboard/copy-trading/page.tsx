import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Copy Trading - RAZ CAPITALS',
  description: 'Follow and copy successful traders to maximize your profits.',
};

export default function CopyTradingPage() {
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
            <a href="/dashboard/copy-trading" className="flex items-center space-x-3 px-4 py-3 text-white bg-[#A0C8A9]/10 rounded-lg border-l-4 border-[#A0C8A9]">
              <span className="font-medium">Copy Trading</span>
            </a>
            <a href="/dashboard/history" className="flex items-center space-x-3 px-4 py-3 text-[#A0C8A9]/70 hover:text-white hover:bg-[#A0C8A9]/10 rounded-lg transition-colors">History</a>
            <a href="/dashboard/request-master-ib" className="flex items-center space-x-3 px-4 py-3 text-[#A0C8A9]/70 hover:text-white hover:bg-[#A0C8A9]/10 rounded-lg transition-colors">Request Master IB</a>
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

        {/* Copy Trading Content */}
        <div className="flex-1 p-6 space-y-6 overflow-y-auto" style={{ backgroundColor: '#B8D4C1' }}>
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
                    <span className="text-[#2D4A35]">Return:</span>
                    <span className="text-green-600 font-medium">+28.5%</span>
                  </div>
                  <div className="flex justify-between text-sm">
                    <span className="text-[#2D4A35]">Followers:</span>
                    <span className="text-[#1E2E23]">1,247</span>
                  </div>
                  <div className="flex justify-between text-sm">
                    <span className="text-[#2D4A35]">Risk Level:</span>
                    <span className="text-yellow-600">Medium</span>
                  </div>
                </div>
                <button className="w-full bg-[#A0C8A9] text-[#1E2E23] py-2 rounded-lg font-medium hover:bg-[#8FB89A] transition-colors">
                  Follow
                </button>
              </div>

              {/* Trader 2 */}
              <div className="bg-[#B8D4C1] rounded-lg p-4 border border-[#A0C8A9]">
                <div className="flex items-center mb-3">
                  <div className="w-10 h-10 bg-[#A0C8A9] rounded-full flex items-center justify-center mr-3">
                    <span className="text-[#1E2E23] font-medium">SK</span>
                  </div>
                  <div>
                    <h4 className="text-[#1E2E23] font-medium">Sarah Kim</h4>
                    <p className="text-[#2D4A35] text-xs">Expert Trader</p>
                  </div>
                </div>
                <div className="space-y-2 mb-4">
                  <div className="flex justify-between text-sm">
                    <span className="text-[#2D4A35]">Return:</span>
                    <span className="text-green-600 font-medium">+34.2%</span>
                  </div>
                  <div className="flex justify-between text-sm">
                    <span className="text-[#2D4A35]">Followers:</span>
                    <span className="text-[#1E2E23]">892</span>
                  </div>
                  <div className="flex justify-between text-sm">
                    <span className="text-[#2D4A35]">Risk Level:</span>
                    <span className="text-red-600">High</span>
                  </div>
                </div>
                <button className="w-full bg-[#2D4A35] text-white py-2 rounded-lg font-medium">
                  Following
                </button>
              </div>

              {/* Trader 3 */}
              <div className="bg-[#B8D4C1] rounded-lg p-4">
                <div className="flex items-center mb-3">
                  <div className="w-10 h-10 bg-[#A0C8A9] rounded-full flex items-center justify-center mr-3">
                    <span className="text-[#1E2E23] font-medium">AD</span>
                  </div>
                  <div>
                    <h4 className="text-[#1E2E23] font-medium">Alex Davis</h4>
                    <p className="text-[#2D4A35] text-xs">Conservative Trader</p>
                  </div>
                </div>
                <div className="space-y-2 mb-4">
                  <div className="flex justify-between text-sm">
                    <span className="text-[#2D4A35]">Return:</span>
                    <span className="text-green-600 font-medium">+18.7%</span>
                  </div>
                  <div className="flex justify-between text-sm">
                    <span className="text-[#2D4A35]">Followers:</span>
                    <span className="text-[#1E2E23]">2,156</span>
                  </div>
                  <div className="flex justify-between text-sm">
                    <span className="text-[#2D4A35]">Risk Level:</span>
                    <span className="text-green-600">Low</span>
                  </div>
                </div>
                <button className="w-full bg-[#A0C8A9] text-[#1E2E23] py-2 rounded-lg font-medium hover:bg-[#8FB89A] transition-colors">
                  Follow
                </button>
              </div>
            </div>
          </div>

          {/* Your Copy Trades */}
          <div className="bg-[#2D4A35] rounded-lg p-6">
            <h3 className="text-white text-lg font-medium mb-4">Your Copy Trades</h3>
            <div className="space-y-3">
              <div className="bg-[#B8D4C1] rounded-lg p-4">
                <div className="flex justify-between items-start mb-2">
                  <div>
                    <h4 className="text-[#1E2E23] font-medium">Following Sarah Kim</h4>
                    <p className="text-[#2D4A35] text-sm">Copy Amount: $5,000 • Started: Dec 15, 2024</p>
                  </div>
                  <span className="bg-green-100 text-green-800 px-2 py-1 rounded text-xs font-medium">Active</span>
                </div>
                <div className="grid grid-cols-3 gap-4 mt-3">
                  <div>
                    <p className="text-[#2D4A35] text-xs">Copied Trades</p>
                    <p className="text-[#1E2E23] font-bold">12</p>
                  </div>
                  <div>
                    <p className="text-[#2D4A35] text-xs">Current P&L</p>
                    <p className="text-green-600 font-bold">+$850.00</p>
                  </div>
                  <div>
                    <p className="text-[#2D4A35] text-xs">Return</p>
                    <p className="text-green-600 font-bold">+17.0%</p>
                  </div>
                </div>
                <div className="flex space-x-2 mt-4">
                  <button className="flex-1 bg-[#2D4A35] text-white py-2 px-4 rounded text-sm hover:bg-[#3A5642] transition-colors">
                    View Details
                  </button>
                  <button className="px-4 py-2 border border-[#2D4A35] text-[#2D4A35] rounded text-sm hover:bg-[#2D4A35]/10 transition-colors">
                    Stop Copying
                  </button>
                </div>
              </div>

              <div className="bg-[#B8D4C1] rounded-lg p-4">
                <div className="flex justify-between items-start mb-2">
                  <div>
                    <h4 className="text-[#1E2E23] font-medium">Following Alex Davis</h4>
                    <p className="text-[#2D4A35] text-sm">Copy Amount: $3,000 • Started: Dec 10, 2024</p>
                  </div>
                  <span className="bg-green-100 text-green-800 px-2 py-1 rounded text-xs font-medium">Active</span>
                </div>
                <div className="grid grid-cols-3 gap-4 mt-3">
                  <div>
                    <p className="text-[#2D4A35] text-xs">Copied Trades</p>
                    <p className="text-[#1E2E23] font-bold">8</p>
                  </div>
                  <div>
                    <p className="text-[#2D4A35] text-xs">Current P&L</p>
                    <p className="text-green-600 font-bold">+$420.00</p>
                  </div>
                  <div>
                    <p className="text-[#2D4A35] text-xs">Return</p>
                    <p className="text-green-600 font-bold">+14.0%</p>
                  </div>
                </div>
                <div className="flex space-x-2 mt-4">
                  <button className="flex-1 bg-[#2D4A35] text-white py-2 px-4 rounded text-sm hover:bg-[#3A5642] transition-colors">
                    View Details
                  </button>
                  <button className="px-4 py-2 border border-[#2D4A35] text-[#2D4A35] rounded text-sm hover:bg-[#2D4A35]/10 transition-colors">
                    Stop Copying
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
