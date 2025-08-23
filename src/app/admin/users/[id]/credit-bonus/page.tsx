'use client';

import AdminSidebar from '@/components/AdminSidebar';
import ProtectedRoute from '@/components/ProtectedRoute';
import { UserService } from '@/lib/userService';
import { EnhancedClientUser } from '@/types';
import { useParams, useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';

function CreditBonusContent() {
  const router = useRouter();
  const params = useParams();
  const userId = params.id as string;
  
  // State for user data
  const [user, setUser] = useState<EnhancedClientUser | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  
  useEffect(() => {
    document.title = 'Credit Bonus - RAZ CAPITALS';
    if (userId) {
      fetchUserData();
    }
  }, [userId]);

  // Fetch user data from database
  const fetchUserData = async () => {
    try {
      setLoading(true);
      setError(null);
      
      // Get enhanced user data including KYC documents
      const userData = await UserService.getEnhancedUserData(parseInt(userId));
      
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
        <AdminSidebar currentPage="credit-bonus" />
        <div className="flex-1 flex items-center justify-center">
          <div className="text-[#0A2E1D] text-xl">Loading user data...</div>
        </div>
      </div>
    );
  }

  if (error || !user) {
    return (
      <div className="flex h-screen bg-[#9BC5A2] overflow-hidden">
        <AdminSidebar currentPage="credit-bonus" />
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

  return (
    <div className="flex h-screen bg-[#9BC5A2] overflow-hidden">
      {/* Sidebar */}
      <AdminSidebar currentPage="credit-bonus" />

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

        {/* Credit Bonus Content */}
        <div className="flex-1 p-8 overflow-y-auto">
          {/* Navigation Tabs */}
          <div className="mb-8">
            <div className="flex space-x-1 bg-[#2D4A32] rounded-lg p-1">
              <button 
                className="px-6 py-3 text-[#9BC5A2] hover:text-white rounded-md font-medium transition-colors"
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
                className="px-6 py-3 bg-[#4A6741] text-white rounded-md font-medium transition-colors"
                onClick={() => router.push(`/admin/users/${userId}/credit-bonus`)}
              >
                Credit Bonus
              </button>
            </div>
          </div>

          {/* Main Title */}
          <h1 className="text-white text-4xl font-bold mb-8 text-center">Credit / Withdraw</h1>

          {/* Two Column Layout */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            {/* Left Section: Credit Deposit Type */}
            <div className="bg-[#2D4A32] rounded-2xl p-8">
              <h2 className="text-white text-2xl font-bold mb-6 text-center">Credit Deposit Type</h2>
              
              <div className="space-y-6">
                <div>
                  <label className="text-[#9BC5A2] text-lg font-medium mb-3 block">Account No</label>
                  <div className="relative">
                    <input 
                      type="text" 
                      placeholder="Enter account number"
                      className="w-full bg-black text-white px-4 py-3 rounded border border-white focus:border-[#9BC5A2] focus:outline-none text-lg placeholder-[#9BC5A2]"
                    />
                    <div className="absolute right-3 top-1/2 transform -translate-y-1/2">
                      <svg className="w-5 h-5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                      </svg>
                    </div>
                  </div>
                </div>

                <div>
                  <label className="text-[#9BC5A2] text-lg font-medium mb-3 block">Amount</label>
                  <input 
                    type="number" 
                    placeholder="Enter amount"
                    className="w-full bg-black text-white px-4 py-3 rounded border border-white focus:border-[#9BC5A2] focus:outline-none text-lg placeholder-[#9BC5A2]"
                  />
                </div>

                <div>
                  <label className="text-[#9BC5A2] text-lg font-medium mb-3 block">Comment</label>
                  <input 
                    type="text" 
                    placeholder="Enter comment"
                    className="w-full bg-black text-white px-4 py-3 rounded border border-white focus:border-[#9BC5A2] focus:outline-none text-lg placeholder-[#9BC5A2]"
                  />
                </div>

                <button className="w-full bg-red-600 text-white py-3 rounded-lg hover:bg-red-700 transition-colors text-lg font-medium">
                  Credit In
                </button>
              </div>
            </div>

            {/* Right Section: Credit Withdraw */}
            <div className="bg-[#2D4A32] rounded-2xl p-8">
              <h2 className="text-white text-2xl font-bold mb-6 text-center">Credit Withdraw</h2>
              
              <div className="space-y-6">
                <div>
                  <label className="text-[#9BC5A2] text-lg font-medium mb-3 block">Account No</label>
                  <input 
                    type="text" 
                    placeholder="Enter account number"
                    className="w-full bg-black text-white px-4 py-3 rounded border border-white focus:border-[#9BC5A2] focus:outline-none text-lg placeholder-[#9BC5A2]"
                  />
                </div>

                <div>
                  <label className="text-[#9BC5A2] text-lg font-medium mb-3 block">Amount</label>
                  <input 
                    type="number" 
                    placeholder="Enter amount"
                    className="w-full bg-black text-white px-4 py-3 rounded border border-white focus:border-[#9BC5A2] focus:outline-none text-lg placeholder-[#9BC5A2]"
                  />
                </div>

                <div>
                  <label className="text-[#9BC5A2] text-lg font-medium mb-3 block">Comment</label>
                  <input 
                    type="text" 
                    placeholder="Enter comment"
                    className="w-full bg-black text-white px-4 py-3 rounded border border-white focus:border-[#9BC5A2] focus:outline-none text-lg placeholder-[#9BC5A2]"
                  />
                </div>

                <button className="w-full bg-red-600 text-white py-3 rounded-lg hover:bg-red-700 transition-colors text-lg font-medium">
                  Credit Out
                </button>
              </div>
            </div>
          </div>

          {/* Transaction History */}
          <div className="mt-12 bg-[#2D4A32] rounded-2xl p-6">
            <h2 className="text-white text-xl font-bold mb-6">Recent Transactions</h2>
            
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead>
                  <tr className="border-b border-[#4A6741]">
                    <th className="text-left text-[#9BC5A2] font-medium py-3">Date</th>
                    <th className="text-left text-[#9BC5A2] font-medium py-3">Type</th>
                    <th className="text-left text-[#9BC5A2] font-medium py-3">Amount</th>
                    <th className="text-left text-[#9BC5A2] font-medium py-3">Status</th>
                  </tr>
                </thead>
                <tbody>
                  <tr className="border-b border-[#4A6741]/50">
                    <td className="text-white py-3">2025-01-06 14:30</td>
                    <td className="py-3">
                      <span className="bg-green-500/20 text-green-400 px-2 py-1 rounded-full text-sm">
                        Credit In
                      </span>
                    </td>
                    <td className="text-white py-3">+$1,000.00</td>
                    <td className="py-3">
                      <span className="bg-green-500/20 text-green-400 px-2 py-1 rounded-full text-sm">
                        Completed
                      </span>
                    </td>
                  </tr>
                  <tr className="border-b border-[#4A6741]/50">
                    <td className="text-white py-3">2025-01-05 09:15</td>
                    <td className="py-3">
                      <span className="bg-red-500/20 text-red-400 px-2 py-1 rounded-full text-sm">
                        Credit Out
                      </span>
                    </td>
                    <td className="text-white py-3">-$500.00</td>
                    <td className="py-3">
                      <span className="bg-green-500/20 text-green-400 px-2 py-1 rounded-full text-sm">
                        Completed
                      </span>
                    </td>
                  </tr>
                  <tr>
                    <td className="text-white py-3">2025-01-04 16:45</td>
                    <td className="py-3">
                      <span className="bg-green-500/20 text-green-400 px-2 py-1 rounded-full text-sm">
                        Credit In
                      </span>
                    </td>
                    <td className="text-white py-3">+$2,500.00</td>
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

export default function CreditBonusPage() {
  return (
    <ProtectedRoute requiredRole="admin">
      <CreditBonusContent />
    </ProtectedRoute>
  );
}