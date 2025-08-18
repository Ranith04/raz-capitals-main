import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Withdraw - RAZ CAPITALS',
  description: 'Withdraw your funds securely from your trading account.',
};

export default function WithdrawPage() {
  return (
    <div className="flex h-screen bg-[#0A2E1D] overflow-hidden">
      {/* Sidebar - Same navigation structure */}
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
            <a href="/dashboard/withdraw" className="flex items-center space-x-3 px-4 py-3 text-white bg-[#A0C8A9]/10 rounded-lg border-l-4 border-[#A0C8A9]">
              <span className="font-medium">Withdraw</span>
            </a>
            <a href="/dashboard/copy-trading" className="flex items-center space-x-3 px-4 py-3 text-[#A0C8A9]/70 hover:text-white hover:bg-[#A0C8A9]/10 rounded-lg transition-colors">Copy Trading</a>
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

        {/* Withdraw Content */}
        <div className="flex-1 p-6 space-y-6 overflow-y-auto" style={{ backgroundColor: '#B8D4C1' }}>
          <div>
            <h2 className="text-2xl font-bold text-[#1E2E23] mb-2">Withdraw Funds</h2>
            <p className="text-[#2D4A35]">Securely withdraw your funds from your trading account.</p>
          </div>

          {/* Account Balance Overview */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="bg-[#2D4A35] rounded-lg p-6 text-white">
              <h3 className="text-sm text-[#A0C8A9] mb-2">Available Balance</h3>
              <p className="text-2xl font-bold">$45,230.00</p>
              <p className="text-xs text-[#A0C8A9]/70 mt-1">Ready for Withdrawal</p>
            </div>
            <div className="bg-[#2D4A35] rounded-lg p-6 text-white">
              <h3 className="text-sm text-[#A0C8A9] mb-2">Pending Withdrawals</h3>
              <p className="text-2xl font-bold">$2,500.00</p>
              <p className="text-xs text-[#A0C8A9]/70 mt-1">Processing</p>
            </div>
            <div className="bg-[#2D4A35] rounded-lg p-6 text-white">
              <h3 className="text-sm text-[#A0C8A9] mb-2">Total Withdrawn</h3>
              <p className="text-2xl font-bold">$12,450.00</p>
              <p className="text-xs text-[#A0C8A9]/70 mt-1">This Month</p>
            </div>
          </div>

          {/* Withdrawal Form */}
          <div className="bg-[#2D4A35] rounded-lg p-6">
            <h3 className="text-white text-lg font-medium mb-6">Withdrawal Request</h3>
            <form className="space-y-6">
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
                      <span className="text-[#1E2E23] font-medium">Bank Transfer</span>
                      <p className="text-[#2D4A35] text-xs">3-5 business days</p>
                    </div>
                  </label>
                  <label className="flex items-center p-3 bg-[#B8D4C1] rounded-lg cursor-pointer hover:bg-[#A0C8A9] transition-colors">
                    <input type="radio" name="method" value="paypal" className="mr-3" />
                    <div>
                      <span className="text-[#1E2E23] font-medium">PayPal</span>
                      <p className="text-[#2D4A35] text-xs">1-2 business days</p>
                    </div>
                  </label>
                  <label className="flex items-center p-3 bg-[#B8D4C1] rounded-lg cursor-pointer hover:bg-[#A0C8A9] transition-colors">
                    <input type="radio" name="method" value="crypto" className="mr-3" />
                    <div>
                      <span className="text-[#1E2E23] font-medium">Cryptocurrency</span>
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

              <div className="flex space-x-4 pt-4">
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
          <div className="bg-[#2D4A35] rounded-lg p-6">
            <h3 className="text-white text-lg font-medium mb-4">Recent Withdrawals</h3>
            <div className="space-y-3">
              <div className="flex justify-between items-center p-3 bg-[#B8D4C1] rounded-lg">
                <div>
                  <p className="font-medium text-[#1E2E23]">$2,500.00</p>
                  <p className="text-sm text-[#2D4A35]">Bank Transfer - Dec 18, 2024</p>
                </div>
                <span className="bg-yellow-100 text-yellow-800 px-2 py-1 rounded text-xs font-medium">Processing</span>
              </div>
              <div className="flex justify-between items-center p-3 bg-[#B8D4C1] rounded-lg">
                <div>
                  <p className="font-medium text-[#1E2E23]">$1,000.00</p>
                  <p className="text-sm text-[#2D4A35]">PayPal - Dec 15, 2024</p>
                </div>
                <span className="bg-green-100 text-green-800 px-2 py-1 rounded text-xs font-medium">Completed</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
