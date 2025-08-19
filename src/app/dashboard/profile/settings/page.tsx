import { Metadata } from 'next';
import ProfileLayout from '../components/ProfileLayout';

export const metadata: Metadata = {
  title: 'Settings - RAZ CAPITALS',
  description: 'Manage your account settings, security, and preferences.',
};

export default function SettingsPage() {
  return (
    <ProfileLayout 
      title="Account Settings" 
      description="Manage your account preferences, security, and personal information."
    >
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
    </ProfileLayout>
  );
}
