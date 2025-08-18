'use client';

import AdminSidebar from '@/components/AdminSidebar';
import ProtectedRoute from '@/components/ProtectedRoute';
import { useRouter } from 'next/navigation';
import { useEffect } from 'react';

function ProfileContent() {
  const router = useRouter();
  
  useEffect(() => {
    document.title = 'User Profile - RAZ CAPITALS';
  }, []);

  return (
    <div className="flex h-screen bg-[#9BC5A2] overflow-hidden">
      {/* Sidebar */}
      <AdminSidebar currentPage="user-profile" />

      {/* Main Content */}
      <div className="flex-1 flex flex-col">
        {/* Header */}
        <div className="bg-[#0A2E1D] p-4 flex justify-between items-center">
          <div 
            className="w-12 h-12 bg-[#2D4A32] rounded-lg flex items-center justify-center cursor-pointer hover:bg-[#3A5A3F] transition-all duration-300 hover:scale-110 hover:shadow-lg transform"
            onClick={() => router.push('/admin/dashboard')}
          >
            <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
            </svg>
          </div>
          
          <div className="flex items-center space-x-2">
            <div className="w-8 h-8 bg-white rounded-full flex items-center justify-center">
              <span className="text-[#0A2E1D] font-bold text-sm">A</span>
            </div>
            <span className="text-white font-medium">Admin</span>
            <svg className="w-4 h-4 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
            </svg>
          </div>
        </div>

        {/* Profile Content */}
        <div className="flex-1 p-8 overflow-y-auto">
          <div className="flex justify-between items-center mb-8">
            <h1 className="text-[#0A2E1D] text-3xl font-bold">User Profile</h1>
            <div className="flex space-x-3">
              <button className="px-6 py-2 bg-[#2D4A32] text-white rounded-lg hover:bg-[#3A5A3F] transition-colors">
                Edit Profile
              </button>
              <button className="px-6 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700 transition-colors">
                Suspend Account
              </button>
            </div>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {/* Profile Info Card */}
            <div className="lg:col-span-2 bg-[#2D4A32] rounded-2xl p-8">
              <h2 className="text-white text-xl font-bold mb-6">Personal Information</h2>
              
              <div className="grid grid-cols-2 gap-6">
                <div>
                  <label className="text-[#9BC5A2] text-sm font-medium mb-2 block">Full Name</label>
                  <p className="text-white text-lg">Abdul Khadar Ishak</p>
                </div>
                <div>
                  <label className="text-[#9BC5A2] text-sm font-medium mb-2 block">Email</label>
                  <p className="text-white text-lg">ishak@gmail.com</p>
                </div>
                <div>
                  <label className="text-[#9BC5A2] text-sm font-medium mb-2 block">Phone</label>
                  <p className="text-white text-lg">+1 234 567 8900</p>
                </div>
                <div>
                  <label className="text-[#9BC5A2] text-sm font-medium mb-2 block">Country</label>
                  <p className="text-white text-lg">United States</p>
                </div>
                <div>
                  <label className="text-[#9BC5A2] text-sm font-medium mb-2 block">Date of Birth</label>
                  <p className="text-white text-lg">January 15, 1990</p>
                </div>
                <div>
                  <label className="text-[#9BC5A2] text-sm font-medium mb-2 block">Registration Date</label>
                  <p className="text-white text-lg">May 6, 2025</p>
                </div>
              </div>

              {/* Account Status */}
              <div className="mt-8 pt-6 border-t border-[#4A6741]">
                <h3 className="text-white text-lg font-bold mb-4">Account Status</h3>
                <div className="grid grid-cols-3 gap-4">
                  <div>
                    <label className="text-[#9BC5A2] text-sm font-medium mb-2 block">KYC Status</label>
                    <span className="bg-[#9BC5A2]/20 text-[#9BC5A2] px-3 py-1 rounded-full text-sm">
                      Approved
                    </span>
                  </div>
                  <div>
                    <label className="text-[#9BC5A2] text-sm font-medium mb-2 block">Account Status</label>
                    <span className="bg-green-500/20 text-green-400 px-3 py-1 rounded-full text-sm">
                      Active
                    </span>
                  </div>
                  <div>
                    <label className="text-[#9BC5A2] text-sm font-medium mb-2 block">Risk Level</label>
                    <span className="bg-yellow-500/20 text-yellow-400 px-3 py-1 rounded-full text-sm">
                      Medium
                    </span>
                  </div>
                </div>
              </div>
            </div>

            {/* Quick Actions & Stats */}
            <div className="space-y-6">
              {/* Profile Picture */}
              <div className="bg-[#2D4A32] rounded-2xl p-6 text-center">
                <div className="w-24 h-24 bg-white rounded-full flex items-center justify-center mx-auto mb-4">
                  <span className="text-[#0A2E1D] font-bold text-2xl">AI</span>
                </div>
                <h3 className="text-white font-bold text-lg">Abdul Khadar Ishak</h3>
                <p className="text-[#9BC5A2] text-sm">#USER001</p>
                <button className="mt-4 px-4 py-2 bg-[#4A6741] text-white rounded-lg hover:bg-[#3A5A3F] transition-colors text-sm">
                  Change Photo
                </button>
              </div>

              {/* Quick Stats */}
              <div className="bg-[#2D4A32] rounded-2xl p-6">
                <h3 className="text-white font-bold text-lg mb-4">Account Overview</h3>
                <div className="space-y-4">
                  <div className="flex justify-between">
                    <span className="text-[#9BC5A2] text-sm">Total Deposits</span>
                    <span className="text-white font-medium">$25,000.00</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-[#9BC5A2] text-sm">Current Balance</span>
                    <span className="text-white font-medium">$18,450.00</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-[#9BC5A2] text-sm">Total Trades</span>
                    <span className="text-white font-medium">156</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-[#9BC5A2] text-sm">Win Rate</span>
                    <span className="text-green-400 font-medium">68.5%</span>
                  </div>
                </div>
              </div>

              {/* Quick Actions */}
              <div className="bg-[#2D4A32] rounded-2xl p-6">
                <h3 className="text-white font-bold text-lg mb-4">Quick Actions</h3>
                <div className="space-y-3">
                  <button 
                    className="w-full px-4 py-2 bg-[#4A6741] text-white rounded-lg hover:bg-[#3A5A3F] transition-colors text-sm"
                    onClick={() => router.push('/admin/users/1/document-kyc')}
                  >
                    View KYC Documents
                  </button>
                  <button 
                    className="w-full px-4 py-2 bg-[#4A6741] text-white rounded-lg hover:bg-[#3A5A3F] transition-colors text-sm"
                    onClick={() => router.push('/admin/users/1/credit-bonus')}
                  >
                    Manage Credit & Bonus
                  </button>
                  <button className="w-full px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors text-sm">
                    Send Message
                  </button>
                  <button className="w-full px-4 py-2 bg-orange-600 text-white rounded-lg hover:bg-orange-700 transition-colors text-sm">
                    Reset Password
                  </button>
                </div>
              </div>
            </div>
          </div>

          {/* Recent Activity */}
          <div className="mt-8 bg-[#2D4A32] rounded-2xl p-6">
            <h3 className="text-white text-xl font-bold mb-6">Recent Activity</h3>
            
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead>
                  <tr className="border-b border-[#4A6741]">
                    <th className="text-left text-[#9BC5A2] font-medium py-3">Date</th>
                    <th className="text-left text-[#9BC5A2] font-medium py-3">Activity</th>
                    <th className="text-left text-[#9BC5A2] font-medium py-3">Amount</th>
                    <th className="text-left text-[#9BC5A2] font-medium py-3">Status</th>
                  </tr>
                </thead>
                <tbody>
                  <tr className="border-b border-[#4A6741]/50">
                    <td className="text-white py-3">2025-01-06 14:30</td>
                    <td className="text-white py-3">Withdrawal Request</td>
                    <td className="text-white py-3">-$2,500.00</td>
                    <td className="py-3">
                      <span className="bg-yellow-500/20 text-yellow-400 px-2 py-1 rounded-full text-sm">
                        Pending
                      </span>
                    </td>
                  </tr>
                  <tr className="border-b border-[#4A6741]/50">
                    <td className="text-white py-3">2025-01-05 09:15</td>
                    <td className="text-white py-3">Trade Execution</td>
                    <td className="text-white py-3">+$450.00</td>
                    <td className="py-3">
                      <span className="bg-green-500/20 text-green-400 px-2 py-1 rounded-full text-sm">
                        Completed
                      </span>
                    </td>
                  </tr>
                  <tr>
                    <td className="text-white py-3">2025-01-04 16:45</td>
                    <td className="text-white py-3">Deposit</td>
                    <td className="text-white py-3">+$5,000.00</td>
                    <td className="py-3">
                      <span className="bg-green-500/20 text-green-400 px-2 py-1 rounded-full text-sm">
                        Completed
                      </span>
                    </td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default function ProfilePage() {
  return (
    <ProtectedRoute requiredRole="admin">
      <ProfileContent />
    </ProtectedRoute>
  );
}