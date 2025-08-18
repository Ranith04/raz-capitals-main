import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Settings - RAZ CAPITALS',
  description: 'Manage your account settings, security, and preferences.',
};

export default function SettingsPage() {
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
            <a href="/dashboard/history" className="flex items-center space-x-3 px-4 py-3 text-[#A0C8A9]/70 hover:text-white hover:bg-[#A0C8A9]/10 rounded-lg transition-colors">History</a>
            <a href="/dashboard/request-master-ib" className="flex items-center space-x-3 px-4 py-3 text-[#A0C8A9]/70 hover:text-white hover:bg-[#A0C8A9]/10 rounded-lg transition-colors">Request Master IB</a>
          </nav>
        </div>
        
        <div className="p-4 border-t border-[#A0C8A9]/20">
          <a href="/dashboard/settings" className="flex items-center space-x-3 px-4 py-3 text-white bg-[#A0C8A9]/10 rounded-lg border-l-4 border-[#A0C8A9]">
            <span className="font-medium">Settings</span>
          </a>
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

        {/* Settings Content */}
        <div className="flex-1 p-6 space-y-6 overflow-y-auto" style={{ backgroundColor: '#B8D4C1' }}>
          <div>
            <h2 className="text-2xl font-bold text-[#1E2E23] mb-2">Account Settings</h2>
            <p className="text-[#2D4A35]">Manage your account preferences, security, and personal information.</p>
          </div>

          {/* Profile Settings */}
          <div className="bg-[#2D4A35] rounded-lg p-6">
            <h3 className="text-white text-lg font-medium mb-6">Profile Information</h3>
            <form className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-[#A0C8A9] text-sm font-medium mb-2">First Name</label>
                  <input 
                    type="text" 
                    defaultValue="Syed"
                    className="w-full px-3 py-2 bg-[#B8D4C1] text-[#1E2E23] rounded-lg border border-[#A0C8A9]/30 focus:border-[#A0C8A9] focus:outline-none"
                  />
                </div>
                <div>
                  <label className="block text-[#A0C8A9] text-sm font-medium mb-2">Last Name</label>
                  <input 
                    type="text" 
                    defaultValue="Anwar"
                    className="w-full px-3 py-2 bg-[#B8D4C1] text-[#1E2E23] rounded-lg border border-[#A0C8A9]/30 focus:border-[#A0C8A9] focus:outline-none"
                  />
                </div>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-[#A0C8A9] text-sm font-medium mb-2">Email</label>
                  <input 
                    type="email" 
                    defaultValue="syed.anwar@email.com"
                    className="w-full px-3 py-2 bg-[#B8D4C1] text-[#1E2E23] rounded-lg border border-[#A0C8A9]/30 focus:border-[#A0C8A9] focus:outline-none"
                  />
                </div>
                <div>
                  <label className="block text-[#A0C8A9] text-sm font-medium mb-2">Phone</label>
                  <input 
                    type="tel" 
                    defaultValue="+1 (555) 123-4567"
                    className="w-full px-3 py-2 bg-[#B8D4C1] text-[#1E2E23] rounded-lg border border-[#A0C8A9]/30 focus:border-[#A0C8A9] focus:outline-none"
                  />
                </div>
              </div>
              <div>
                <label className="block text-[#A0C8A9] text-sm font-medium mb-2">Address</label>
                <input 
                  type="text" 
                  defaultValue="123 Main Street, New York, NY 10001"
                  className="w-full px-3 py-2 bg-[#B8D4C1] text-[#1E2E23] rounded-lg border border-[#A0C8A9]/30 focus:border-[#A0C8A9] focus:outline-none"
                />
              </div>
              <div className="flex space-x-4 pt-4">
                <button 
                  type="submit"
                  className="bg-[#A0C8A9] text-[#1E2E23] py-2 px-6 rounded-lg font-medium hover:bg-[#8FB89A] transition-colors"
                >
                  Save Changes
                </button>
                <button 
                  type="button"
                  className="border border-[#A0C8A9] text-[#A0C8A9] py-2 px-6 rounded-lg hover:bg-[#A0C8A9]/10 transition-colors"
                >
                  Cancel
                </button>
              </div>
            </form>
          </div>

          {/* Security Settings */}
          <div className="bg-[#2D4A35] rounded-lg p-6">
            <h3 className="text-white text-lg font-medium mb-6">Security Settings</h3>
            <div className="space-y-6">
              {/* Change Password */}
              <div>
                <h4 className="text-[#A0C8A9] font-medium mb-4">Change Password</h4>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  <div>
                    <label className="block text-[#A0C8A9] text-sm font-medium mb-2">Current Password</label>
                    <input 
                      type="password" 
                      className="w-full px-3 py-2 bg-[#B8D4C1] text-[#1E2E23] rounded-lg border border-[#A0C8A9]/30 focus:border-[#A0C8A9] focus:outline-none"
                    />
                  </div>
                  <div>
                    <label className="block text-[#A0C8A9] text-sm font-medium mb-2">New Password</label>
                    <input 
                      type="password" 
                      className="w-full px-3 py-2 bg-[#B8D4C1] text-[#1E2E23] rounded-lg border border-[#A0C8A9]/30 focus:border-[#A0C8A9] focus:outline-none"
                    />
                  </div>
                  <div>
                    <label className="block text-[#A0C8A9] text-sm font-medium mb-2">Confirm Password</label>
                    <input 
                      type="password" 
                      className="w-full px-3 py-2 bg-[#B8D4C1] text-[#1E2E23] rounded-lg border border-[#A0C8A9]/30 focus:border-[#A0C8A9] focus:outline-none"
                    />
                  </div>
                </div>
                <button className="mt-4 bg-[#A0C8A9] text-[#1E2E23] py-2 px-4 rounded-lg font-medium hover:bg-[#8FB89A] transition-colors">
                  Update Password
                </button>
              </div>

              {/* Two-Factor Authentication */}
              <div className="border-t border-[#A0C8A9]/20 pt-6">
                <h4 className="text-[#A0C8A9] font-medium mb-4">Two-Factor Authentication</h4>
                <div className="flex items-center justify-between p-4 bg-[#B8D4C1] rounded-lg">
                  <div>
                    <h5 className="text-[#1E2E23] font-medium">SMS Authentication</h5>
                    <p className="text-[#2D4A35] text-sm">Receive verification codes via SMS</p>
                  </div>
                  <label className="flex items-center">
                    <input type="checkbox" className="sr-only" defaultChecked />
                    <div className="relative">
                      <div className="block bg-[#A0C8A9] w-14 h-8 rounded-full"></div>
                      <div className="dot absolute left-1 top-1 bg-white w-6 h-6 rounded-full transition"></div>
                    </div>
                  </label>
                </div>
                <div className="flex items-center justify-between p-4 bg-[#B8D4C1] rounded-lg mt-3">
                  <div>
                    <h5 className="text-[#1E2E23] font-medium">Email Authentication</h5>
                    <p className="text-[#2D4A35] text-sm">Receive verification codes via email</p>
                  </div>
                  <label className="flex items-center">
                    <input type="checkbox" className="sr-only" />
                    <div className="relative">
                      <div className="block bg-gray-300 w-14 h-8 rounded-full"></div>
                      <div className="dot absolute left-1 top-1 bg-white w-6 h-6 rounded-full transition"></div>
                    </div>
                  </label>
                </div>
              </div>
            </div>
          </div>

          {/* Notification Settings */}
          <div className="bg-[#2D4A35] rounded-lg p-6">
            <h3 className="text-white text-lg font-medium mb-6">Notification Preferences</h3>
            <div className="space-y-4">
              <div className="flex items-center justify-between p-4 bg-[#B8D4C1] rounded-lg">
                <div>
                  <h5 className="text-[#1E2E23] font-medium">Trade Notifications</h5>
                  <p className="text-[#2D4A35] text-sm">Get notified about trade executions and updates</p>
                </div>
                <label className="flex items-center">
                  <input type="checkbox" className="sr-only" defaultChecked />
                  <div className="relative">
                    <div className="block bg-[#A0C8A9] w-14 h-8 rounded-full"></div>
                    <div className="dot absolute left-1 top-1 bg-white w-6 h-6 rounded-full transition"></div>
                  </div>
                </label>
              </div>
              <div className="flex items-center justify-between p-4 bg-[#B8D4C1] rounded-lg">
                <div>
                  <h5 className="text-[#1E2E23] font-medium">Account Alerts</h5>
                  <p className="text-[#2D4A35] text-sm">Important account security and balance alerts</p>
                </div>
                <label className="flex items-center">
                  <input type="checkbox" className="sr-only" defaultChecked />
                  <div className="relative">
                    <div className="block bg-[#A0C8A9] w-14 h-8 rounded-full"></div>
                    <div className="dot absolute left-1 top-1 bg-white w-6 h-6 rounded-full transition"></div>
                  </div>
                </label>
              </div>
              <div className="flex items-center justify-between p-4 bg-[#B8D4C1] rounded-lg">
                <div>
                  <h5 className="text-[#1E2E23] font-medium">Marketing Emails</h5>
                  <p className="text-[#2D4A35] text-sm">Receive promotional offers and market updates</p>
                </div>
                <label className="flex items-center">
                  <input type="checkbox" className="sr-only" />
                  <div className="relative">
                    <div className="block bg-gray-300 w-14 h-8 rounded-full"></div>
                    <div className="dot absolute left-1 top-1 bg-white w-6 h-6 rounded-full transition"></div>
                  </div>
                </label>
              </div>
            </div>
          </div>

          {/* Account Actions */}
          <div className="bg-[#2D4A35] rounded-lg p-6">
            <h3 className="text-white text-lg font-medium mb-6">Account Actions</h3>
            <div className="space-y-4">
              <div className="flex items-center justify-between p-4 bg-[#B8D4C1] rounded-lg">
                <div>
                  <h5 className="text-[#1E2E23] font-medium">Download Account Data</h5>
                  <p className="text-[#2D4A35] text-sm">Export your account data and transaction history</p>
                </div>
                <button className="bg-[#2D4A35] text-white px-4 py-2 rounded-lg hover:bg-[#3A5642] transition-colors">
                  Download
                </button>
              </div>
              <div className="flex items-center justify-between p-4 bg-[#B8D4C1] rounded-lg">
                <div>
                  <h5 className="text-[#1E2E23] font-medium">Account Verification</h5>
                  <p className="text-[#2D4A35] text-sm">Complete your KYC verification for higher limits</p>
                </div>
                <span className="bg-green-100 text-green-800 px-3 py-1 rounded text-sm font-medium">Verified</span>
              </div>
              <div className="flex items-center justify-between p-4 bg-red-50 rounded-lg border border-red-200">
                <div>
                  <h5 className="text-red-800 font-medium">Delete Account</h5>
                  <p className="text-red-600 text-sm">Permanently delete your account and all data</p>
                </div>
                <button className="bg-red-600 text-white px-4 py-2 rounded-lg hover:bg-red-700 transition-colors">
                  Delete
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
