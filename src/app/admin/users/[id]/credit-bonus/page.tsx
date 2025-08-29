'use client';

import AdminHeader from '@/components/AdminHeader';
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
  const [isMobileSidebarOpen, setIsMobileSidebarOpen] = useState(false);
  
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

  const toggleMobileSidebar = () => setIsMobileSidebarOpen(!isMobileSidebarOpen);
  const closeMobileSidebar = () => setIsMobileSidebarOpen(false);

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
        <AdminSidebar currentPage="credit-bonus" isMobileOpen={isMobileSidebarOpen} onMobileClose={closeMobileSidebar} />
        <div className="flex-1 flex items-center justify-center">
          <div className="text-[#0A2E1D] text-xl">Loading user data...</div>
        </div>
      </div>
    );
  }

  if (error || !user) {
    return (
      <div className="flex h-screen bg-[#9BC5A2] overflow-hidden">
        <AdminSidebar currentPage="credit-bonus" isMobileOpen={isMobileSidebarOpen} onMobileClose={closeMobileSidebar} />
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
      <AdminSidebar currentPage="credit-bonus" isMobileOpen={isMobileSidebarOpen} onMobileClose={closeMobileSidebar} />

      {/* Main Content */}
      <div className="flex-1 flex flex-col">
        {/* Header */}
        <AdminHeader 
          title="Credit Bonus"
          showRefreshButton={false}
          showBackButton={true}
          backUrl="/admin/client-operations/new-client-list"
          onMobileMenuToggle={toggleMobileSidebar}
        />

        {/* Credit Bonus Content */}
        <div className="flex-1 p-2 xs:p-3 sm:p-4 md:p-6 lg:p-8 overflow-y-auto">
          {/* Navigation Tabs */}
          <div className="mb-4 sm:mb-6 lg:mb-8">
            <div className="flex flex-col sm:flex-row space-y-2 sm:space-y-0 sm:space-x-1 bg-[#2D4A32] rounded-lg p-1">
              <button 
                className="px-4 sm:px-6 py-2 sm:py-3 text-[#9BC5A2] hover:text-white rounded-md font-medium transition-colors text-sm sm:text-base"
                onClick={() => router.push(`/admin/users/${userId}/profile`)}
              >
                Profile
              </button>
              <button 
                className="px-4 sm:px-6 py-2 sm:py-3 text-[#9BC5A2] hover:text-white rounded-md font-medium transition-colors text-sm sm:text-base"
                onClick={() => router.push(`/admin/users/${userId}/document-kyc`)}
              >
                Document KYC
              </button>
              <button 
                className="px-4 sm:px-6 py-2 sm:py-3 bg-[#4A6741] text-white rounded-md font-medium transition-colors text-sm sm:text-base"
                onClick={() => router.push(`/admin/users/${userId}/credit-bonus`)}
              >
                Credit Bonus
              </button>
            </div>
          </div>

          {/* Main Title */}
          <h1 className="text-white text-2xl sm:text-3xl lg:text-4xl font-bold mb-6 sm:mb-8 text-center">Credit / Withdraw</h1>

          {/* Two Column Layout */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 sm:gap-6 lg:gap-8">
            {/* Left Section: Credit Deposit Type */}
            <div className="bg-[#2D4A32] rounded-2xl p-3 sm:p-4 md:p-6 lg:p-8">
              <h2 className="text-white text-lg sm:text-xl lg:text-2xl font-bold mb-4 sm:mb-6 text-center">Credit Deposit Type</h2>
              
              <div className="space-y-4 sm:space-y-6">
                <div>
                  <label className="text-[#9BC5A2] text-sm sm:text-base lg:text-lg font-medium mb-2 sm:mb-3 block">Account No</label>
                  <div className="relative">
                    <input 
                      type="text" 
                      placeholder="Enter account number"
                      className="w-full bg-black text-white px-3 sm:px-4 py-2 sm:py-3 rounded border border-white focus:border-[#9BC5A2] focus:outline-none text-sm sm:text-base lg:text-lg placeholder-[#9BC5A2]"
                    />
                    <div className="absolute right-3 top-1/2 transform -translate-y-1/2">
                      <svg className="w-4 h-4 sm:w-5 sm:h-5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                      </svg>
                    </div>
                  </div>
                </div>

                <div>
                  <label className="text-[#9BC5A2] text-sm sm:text-base lg:text-lg font-medium mb-2 sm:mb-3 block">Amount</label>
                  <input 
                    type="number" 
                    placeholder="Enter amount"
                    className="w-full bg-black text-white px-3 sm:px-4 py-2 sm:py-3 rounded border border-white focus:border-[#9BC5A2] focus:outline-none text-sm sm:text-base lg:text-lg placeholder-[#9BC5A2]"
                  />
                </div>

                <div>
                  <label className="text-[#9BC5A2] text-sm sm:text-base lg:text-lg font-medium mb-2 sm:mb-3 block">Comment</label>
                  <input 
                    type="text" 
                    placeholder="Enter comment"
                    className="w-full bg-black text-white px-3 sm:px-4 py-2 sm:py-3 rounded border border-white focus:border-[#9BC5A2] focus:outline-none text-sm sm:text-base lg:text-lg placeholder-[#9BC5A2]"
                  />
                </div>

                <button className="w-full bg-red-600 text-white py-2 sm:py-3 rounded-lg hover:bg-red-700 transition-colors text-sm sm:text-base lg:text-lg font-medium">
                  Credit In
                </button>
              </div>
            </div>

            {/* Right Section: Credit Withdraw */}
            <div className="bg-[#2D4A32] rounded-2xl p-3 sm:p-4 md:p-6 lg:p-8">
              <h2 className="text-white text-lg sm:text-xl lg:text-2xl font-bold mb-4 sm:mb-6 text-center">Credit Withdraw</h2>
              
              <div className="space-y-4 sm:space-y-6">
                <div>
                  <label className="text-[#9BC5A2] text-sm sm:text-base lg:text-lg font-medium mb-2 sm:mb-3 block">Account No</label>
                  <input 
                    type="text" 
                    placeholder="Enter account number"
                    className="w-full bg-black text-white px-3 sm:px-4 py-2 sm:py-3 rounded border border-white focus:border-[#9BC5A2] focus:outline-none text-sm sm:text-base lg:text-lg placeholder-[#9BC5A2]"
                  />
                </div>

                <div>
                  <label className="text-[#9BC5A2] text-sm sm:text-base lg:text-lg font-medium mb-2 sm:mb-3 block">Amount</label>
                  <input 
                    type="number" 
                    placeholder="Enter amount"
                    className="w-full bg-black text-white px-3 sm:px-4 py-2 sm:py-3 rounded border border-white focus:border-[#9BC5A2] focus:outline-none text-sm sm:text-base lg:text-lg placeholder-[#9BC5A2]"
                  />
                </div>

                <div>
                  <label className="text-[#9BC5A2] text-sm sm:text-base lg:text-lg font-medium mb-2 sm:mb-3 block">Comment</label>
                  <input 
                    type="text" 
                    placeholder="Enter comment"
                    className="w-full bg-black text-white px-3 sm:px-4 py-2 sm:py-3 rounded border border-white focus:border-[#9BC5A2] focus:outline-none text-sm sm:text-base lg:text-lg placeholder-[#9BC5A2]"
                  />
                </div>

                <button className="w-full bg-red-600 text-white py-2 sm:py-3 rounded-lg hover:bg-red-700 transition-colors text-sm sm:text-base lg:text-lg font-medium">
                  Credit Out
                </button>
              </div>
            </div>
          </div>

          {/* Transaction History */}
          <div className="mt-8 sm:mt-12 bg-[#2D4A32] rounded-2xl p-3 sm:p-4 md:p-6">
            <h2 className="text-white text-lg sm:text-xl font-bold mb-4 sm:mb-6">Recent Transactions</h2>
            
            {/* Mobile Card View */}
            <div className="lg:hidden space-y-3">
              {/* Mobile Card 1 */}
              <div className="bg-[#4A6741] rounded-lg p-3 space-y-2">
                <div className="flex justify-between items-start">
                  <div className="flex-1">
                    <div className="text-white font-medium text-sm">Credit In</div>
                    <div className="text-[#9BC5A2] text-xs">2025-01-06 14:30</div>
                  </div>
                  <span className="bg-green-500/20 text-green-400 px-2 py-1 rounded-full text-xs">
                    Completed
                  </span>
                </div>
                <div className="text-white text-sm">+$1,000.00</div>
              </div>

              {/* Mobile Card 2 */}
              <div className="bg-[#4A6741] rounded-lg p-3 space-y-2">
                <div className="flex justify-between items-start">
                  <div className="flex-1">
                    <div className="text-white font-medium text-sm">Credit Out</div>
                    <div className="text-[#9BC5A2] text-xs">2025-01-05 09:15</div>
                  </div>
                  <span className="bg-green-500/20 text-green-400 px-2 py-1 rounded-full text-xs">
                    Completed
                  </span>
                </div>
                <div className="text-white text-sm">-$500.00</div>
              </div>

              {/* Mobile Card 3 */}
              <div className="bg-[#4A6741] rounded-lg p-3 space-y-2">
                <div className="flex justify-between items-start">
                  <div className="flex-1">
                    <div className="text-white font-medium text-sm">Credit In</div>
                    <div className="text-[#9BC5A2] text-xs">2025-01-04 16:45</div>
                  </div>
                  <span className="bg-green-500/20 text-green-400 px-2 py-1 rounded-full text-xs">
                    Completed
                  </span>
                </div>
                <div className="text-white text-sm">+$2,500.00</div>
              </div>
            </div>

            {/* Desktop Table View */}
            <div className="hidden lg:block overflow-x-auto">
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