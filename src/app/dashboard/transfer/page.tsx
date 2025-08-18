import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Transfer - RAZ CAPITALS',
  description: 'Transfer funds between your accounts or to other users.',
};

export default function TransferPage() {
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
            <a href="/dashboard/transfer" className="flex items-center space-x-3 px-4 py-3 text-white bg-[#A0C8A9]/10 rounded-lg border-l-4 border-[#A0C8A9]">
              <span className="font-medium">Transfer</span>
            </a>
            <a href="/dashboard/withdraw" className="flex items-center space-x-3 px-4 py-3 text-[#A0C8A9]/70 hover:text-white hover:bg-[#A0C8A9]/10 rounded-lg transition-colors">Withdraw</a>
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

        {/* Transfer Content */}
        <div className="flex-1 p-6 space-y-6 overflow-y-auto" style={{ backgroundColor: '#B8D4C1' }}>
          <div>
            <h2 className="text-2xl font-bold text-[#1E2E23] mb-2">Transfer Funds</h2>
            <p className="text-[#2D4A35]">Move funds between your accounts or send to other users.</p>
          </div>

          {/* Transfer Types */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="bg-[#2D4A35] rounded-lg p-6 text-white cursor-pointer hover:bg-[#3A5642] transition-colors border border-[#A0C8A9]">
              <h3 className="text-lg font-medium mb-2 text-[#A0C8A9]">Internal Transfer</h3>
              <p className="text-sm mb-4">Transfer between your own accounts instantly with no fees.</p>
              <ul className="text-xs space-y-1 text-[#A0C8A9]/70">
                <li>• Instant transfer</li>
                <li>• No fees</li>
                <li>• Between your accounts</li>
              </ul>
            </div>

            <div className="bg-[#2D4A35] rounded-lg p-6 text-white cursor-pointer hover:bg-[#3A5642] transition-colors">
              <h3 className="text-lg font-medium mb-2 text-[#A0C8A9]">External Transfer</h3>
              <p className="text-sm mb-4">Send funds to other RAZ CAPITALS users securely.</p>
              <ul className="text-xs space-y-1 text-[#A0C8A9]/70">
                <li>• To other users</li>
                <li>• Small processing fee</li>
                <li>• Secure verification</li>
              </ul>
            </div>
          </div>

          {/* Transfer Form */}
          <div className="bg-[#2D4A35] rounded-lg p-6">
            <h3 className="text-white text-lg font-medium mb-6">Transfer Details</h3>
            <form className="space-y-6">
              <div>
                <label className="block text-[#A0C8A9] text-sm font-medium mb-2">Transfer Type</label>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                  <label className="flex items-center p-3 bg-[#B8D4C1] rounded-lg cursor-pointer hover:bg-[#A0C8A9] transition-colors">
                    <input type="radio" name="transferType" value="internal" className="mr-3" defaultChecked />
                    <span className="text-[#1E2E23] font-medium">Internal Transfer</span>
                  </label>
                  <label className="flex items-center p-3 bg-[#B8D4C1] rounded-lg cursor-pointer hover:bg-[#A0C8A9] transition-colors">
                    <input type="radio" name="transferType" value="external" className="mr-3" />
                    <span className="text-[#1E2E23] font-medium">External Transfer</span>
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

              <div className="flex space-x-4 pt-4">
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
          <div className="bg-[#2D4A35] rounded-lg p-6">
            <h3 className="text-white text-lg font-medium mb-4">Recent Transfers</h3>
            <div className="space-y-3">
              <div className="flex justify-between items-center p-3 bg-[#B8D4C1] rounded-lg">
                <div>
                  <p className="font-medium text-[#1E2E23]">$5,000.00 → Pro Trading Account</p>
                  <p className="text-sm text-[#2D4A35]">Internal Transfer - Today, 2:30 PM</p>
                </div>
                <span className="bg-green-100 text-green-800 px-2 py-1 rounded text-xs font-medium">Completed</span>
              </div>
              <div className="flex justify-between items-center p-3 bg-[#B8D4C1] rounded-lg">
                <div>
                  <p className="font-medium text-[#1E2E23]">$1,500.00 → john.doe@email.com</p>
                  <p className="text-sm text-[#2D4A35]">External Transfer - Yesterday, 4:15 PM</p>
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
