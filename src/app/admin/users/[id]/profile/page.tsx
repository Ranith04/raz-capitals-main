'use client';

import AdminHeader from '@/components/AdminHeader';
import AdminSidebar from '@/components/AdminSidebar';
import ProtectedRoute from '@/components/ProtectedRoute';
import { UserService } from '@/lib/userService';
import { EnhancedClientUser } from '@/types';
import { useParams, useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';

function ProfileContent() {
  const router = useRouter();
  const params = useParams();
  const userId = params.id as string;
  
  // State for user data
  const [user, setUser] = useState<EnhancedClientUser | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  

  
  useEffect(() => {
    document.title = 'User Profile - RAZ CAPITALS';
    if (userId) {
      fetchUserData();
    }
  }, [userId]);

  // Fetch user data from database
  const fetchUserData = async () => {
    try {
      setLoading(true);
      setError(null);
      
      console.log('🏠 [PROFILE PAGE] ==========================================');
      console.log('🏠 [PROFILE PAGE] Fetching user data for ID:', userId);
      
      // Get enhanced user data including KYC documents
      const userData = await UserService.getEnhancedUserData(parseInt(userId));
      
      console.log('🏠 [PROFILE PAGE] User data received from UserService');
      console.log('🏠 [PROFILE PAGE] KYC Status:', userData?.status);
      console.log('🏠 [PROFILE PAGE] Account Status:', userData?.account_status);
      console.log('🏠 [PROFILE PAGE] Account Type:', userData?.account_type);
      console.log('🏠 [PROFILE PAGE] Phone Number:', userData?.phone_number);
      console.log('🏠 [PROFILE PAGE] Country:', userData?.country_of_birth);
      console.log('🏠 [PROFILE PAGE] Residential Address:', userData?.residential_address);
      console.log('🏠 [PROFILE PAGE] Date of Birth:', userData?.dob);
      console.log('🏠 [PROFILE PAGE] Middle Name:', userData?.middle_name);
      console.log('🏠 [PROFILE PAGE] Complete user data:', userData);
      console.log('🏠 [PROFILE PAGE] ==========================================');
      
      if (userData) {
        setUser(userData);
      } else {
        setError('User not found');
      }
    } catch (error) {
      console.error('Failed to fetch user data:', error);
      setError('Failed to fetch user data');
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return (
      <div className="flex h-screen bg-[#9BC5A2] overflow-hidden">
        <AdminSidebar currentPage="user-profile" />
        <div className="flex-1 flex items-center justify-center">
          <div className="text-[#0A2E1D] text-xl">Loading user data...</div>
        </div>
      </div>
    );
  }

  if (error || !user) {
    return (
      <div className="flex h-screen bg-[#9BC5A2] overflow-hidden">
        <AdminSidebar currentPage="user-profile" />
        <div className="flex-1 flex items-center justify-center">
          <div className="text-center">
            <div className="text-[#0A2E1D] text-xl mb-4">{error || 'User not found'}</div>
            <button 
              onClick={() => router.push('/admin/client-operations/new-client-list')}
              className="px-4 py-2 bg-[#2D4A32] text-white rounded-lg hover:bg-[#3A5A3F] transition-colors"
            >
              Back to Client List
            </button>
          </div>
        </div>
      </div>
    );
  }

  // Use UserService formatDate method for consistent date formatting
  const formatDate = (dateString: string) => {
    return UserService.formatDate(dateString);
  };



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
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
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
          {/* Navigation Tabs */}
          <div className="mb-8">
            <div className="flex space-x-1 bg-[#2D4A32] rounded-lg p-1">
              <button 
                className="px-6 py-3 bg-[#4A6741] text-white rounded-md font-medium transition-colors"
                onClick={() => router.push(`/admin/users/${userId}/profile`)}
              >
                Profile
              </button>
              <button 
                className="px-6 py-3 text-[#9BC5A2] hover:text-white rounded-md font-medium transition-colors"
                onClick={() => router.push(`/admin/users/${userId}/document-kyc`)}
              >
                Document KYC
              </button>
              <button 
                className="px-6 py-3 text-[#9BC5A2] hover:text-white rounded-md font-medium transition-colors"
                onClick={() => router.push(`/admin/users/${userId}/credit-bonus`)}
              >
                Credit Bonus
              </button>
            </div>
          </div>

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
                  <p className="text-white text-lg">{`${user.first_name || ''} ${user.last_name || ''}`.trim() || 'N/A'}</p>
                </div>
                <div>
                  <label className="text-[#9BC5A2] text-sm font-medium mb-2 block">Email</label>
                  <p className="text-white text-lg">{user.email}</p>
                </div>
                <div>
                  <label className="text-[#9BC5A2] text-sm font-medium mb-2 block">Phone</label>
                  <p className="text-white text-lg">{user.phone_number || 'N/A'}</p>
                </div>
                <div>
                  <label className="text-[#9BC5A2] text-sm font-medium mb-2 block">Country</label>
                  <p className="text-white text-lg">{user.country_of_birth || 'N/A'}</p>
                </div>
                <div>
                  <label className="text-[#9BC5A2] text-sm font-medium mb-2 block">Residential Address</label>
                  <p className="text-white text-lg">{user.residential_address || 'N/A'}</p>
                </div>
                <div>
                  <label className="text-[#9BC5A2] text-sm font-medium mb-2 block">Date of Birth</label>
                  <p className="text-white text-lg">{formatDate(user.dob || '')}</p>
                </div>
                <div>
                  <label className="text-[#9BC5A2] text-sm font-medium mb-2 block">Registration Date</label>
                  <p className="text-white text-lg">{formatDate(user.created_at)}</p>
                </div>
              </div>

              {/* Account Status */}
              <div className="mt-8 pt-6 border-t border-[#4A6741]">
                <h3 className="text-white text-lg font-bold mb-4">Account Status</h3>
                <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
                  <div>
                    <label className="text-[#9BC5A2] text-sm font-medium mb-2 block">KYC Status</label>
                    <span className={`px-3 py-1 rounded-full text-sm ${
                      user.status === 'verified' 
                        ? 'bg-[#9BC5A2]/20 text-[#9BC5A2]'
                        : user.status === 'pending'
                        ? 'bg-yellow-500/20 text-yellow-400'
                        : user.status === 'rejected'
                        ? 'bg-red-500/20 text-red-400'
                        : 'bg-gray-500/20 text-gray-400'
                    }`}>
                      {user.status || 'pending'}
                    </span>
                  </div>
                  <div>
                    <label className="text-[#9BC5A2] text-sm font-medium mb-2 block">Account Status</label>
                    <span className={`px-3 py-1 rounded-full text-sm ${
                      user.account_status === 'Active' 
                        ? 'bg-green-500/20 text-green-400'
                        : user.account_status === 'Suspended'
                        ? 'bg-red-500/20 text-red-400'
                        : 'bg-yellow-500/20 text-yellow-400'
                    }`}>
                      {user.account_status || 'Active'}
                    </span>
                  </div>
                  <div>
                    <label className="text-[#9BC5A2] text-sm font-medium mb-2 block">Account Type</label>
                    <span className={`px-3 py-1 rounded-full text-sm ${
                      user.account_type === 'Live' 
                        ? 'bg-blue-500/20 text-blue-400'
                        : user.account_type === 'Demo'
                        ? 'bg-purple-500/20 text-purple-400'
                        : 'bg-gray-500/20 text-gray-400'
                    }`}>
                      {user.account_type || 'Demo'}
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
                  <span className="text-[#0A2E1D] font-bold text-2xl">
                    {`${user.first_name?.[0] || ''}${user.last_name?.[0] || ''}`.toUpperCase() || 'U'}
                  </span>
                </div>
                <h3 className="text-white font-bold text-lg">{`${user.first_name || ''} ${user.last_name || ''}`.trim() || 'N/A'}</h3>
                <p className="text-[#9BC5A2] text-sm">#{user.id}</p>
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
                    onClick={() => router.push(`/admin/users/${userId}/document-kyc`)}
                  >
                    View KYC Documents
                  </button>
                  <button 
                    className="w-full px-4 py-2 bg-[#4A6741] text-white rounded-lg hover:bg-[#3A5A3F] transition-colors text-sm"
                    onClick={() => router.push(`/admin/users/${userId}/credit-bonus`)}
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