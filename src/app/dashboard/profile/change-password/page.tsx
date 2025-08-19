import { Metadata } from 'next';
import ProfileLayout from '../components/ProfileLayout';

export const metadata: Metadata = {
  title: 'Change Password - RAZ CAPITALS',
  description: 'Change your password securely',
};

export default function ChangePasswordPage() {
  return (
    <ProfileLayout 
      title="Change Password" 
      description="Update your password to keep your account secure."
    >
      <div className="bg-[#2D4A35] rounded-lg p-6 max-w-2xl">
        <form className="space-y-6">
          <div>
            <label className="block text-[#A0C8A9] text-sm font-medium mb-2">Current Password</label>
            <input 
              type="password" 
              className="w-full px-3 py-2 bg-[#B8D4C1] text-[#1E2E23] rounded-lg border border-[#A0C8A9]/30 focus:border-[#A0C8A9] focus:outline-none"
              placeholder="Enter your current password"
            />
          </div>
          
          <div>
            <label className="block text-[#A0C8A9] text-sm font-medium mb-2">New Password</label>
            <input 
              type="password" 
              className="w-full px-3 py-2 bg-[#B8D4C1] text-[#1E2E23] rounded-lg border border-[#A0C8A9]/30 focus:border-[#A0C8A9] focus:outline-none"
              placeholder="Enter your new password"
            />
            <p className="text-[#A0C8A9] text-xs mt-1">Password must be at least 8 characters long</p>
          </div>
          
          <div>
            <label className="block text-[#A0C8A9] text-sm font-medium mb-2">Confirm New Password</label>
            <input 
              type="password" 
              className="w-full px-3 py-2 bg-[#B8D4C1] text-[#1E2E23] rounded-lg border border-[#A0C8A9]/30 focus:border-[#A0C8A9] focus:outline-none"
              placeholder="Confirm your new password"
            />
          </div>
          
          <div className="flex space-x-4 pt-4">
            <button 
              type="submit"
              className="bg-[#A0C8A9] text-[#1E2E23] py-2 px-6 rounded-lg font-medium hover:bg-[#8FB89A] transition-colors"
            >
              Update Password
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
    </ProfileLayout>
  );
}
