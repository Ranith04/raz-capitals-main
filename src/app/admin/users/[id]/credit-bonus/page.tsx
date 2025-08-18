'use client';

import AdminSidebar from '@/components/AdminSidebar';
import ProtectedRoute from '@/components/ProtectedRoute';
import { useRouter } from 'next/navigation';
import { useEffect } from 'react';

function CreditBonusContent() {
  const router = useRouter();
  
  useEffect(() => {
    document.title = 'Credit Bonus - RAZ CAPITALS';
  }, []);

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

        {/* Credit Bonus Content */}
        <div className="flex-1 p-8 overflow-y-auto">
          <div className="flex justify-between items-center mb-8">
            <h1 className="text-[#0A2E1D] text-3xl font-bold">Credit & Bonus Management</h1>
            <button className="px-6 py-2 bg-[#2D4A32] text-white rounded-lg hover:bg-[#3A5A3F] transition-colors">
              Add Credit/Bonus
            </button>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            {/* Account Balance */}
            <div className="bg-[#2D4A32] rounded-2xl p-6">
              <h2 className="text-white text-xl font-bold mb-6">Current Account Balance</h2>
              
              <div className="space-y-4">
                <div className="flex justify-between items-center">
                  <span className="text-[#9BC5A2]">Available Balance</span>
                  <span className="text-white text-2xl font-bold">$18,450.00</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-[#9BC5A2]">Credit Balance</span>
                  <span className="text-green-400 text-xl font-bold">$2,500.00</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-[#9BC5A2]">Bonus Balance</span>
                  <span className="text-blue-400 text-xl font-bold">$500.00</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-[#9BC5A2]">Trading Balance</span>
                  <span className="text-white text-xl font-bold">$15,450.00</span>
                </div>
              </div>
            </div>

            {/* Quick Actions */}
            <div className="bg-[#2D4A32] rounded-2xl p-6">
              <h2 className="text-white text-xl font-bold mb-6">Quick Actions</h2>
              
              <div className="space-y-4">
                <div className="p-4 bg-[#4A6741] rounded-lg">
                  <h3 className="text-white font-medium mb-2">Add Credit</h3>
                  <div className="flex space-x-2">
                    <input 
                      type="number" 
                      placeholder="Amount"
                      className="flex-1 bg-[#2D4A32] text-white px-3 py-2 rounded border border-[#9BC5A2]/30 focus:border-[#9BC5A2] focus:outline-none"
                    />
                    <button className="px-4 py-2 bg-green-600 text-white rounded hover:bg-green-700 transition-colors">
                      Add
                    </button>
                  </div>
                </div>

                <div className="p-4 bg-[#4A6741] rounded-lg">
                  <h3 className="text-white font-medium mb-2">Add Bonus</h3>
                  <div className="flex space-x-2">
                    <input 
                      type="number" 
                      placeholder="Amount"
                      className="flex-1 bg-[#2D4A32] text-white px-3 py-2 rounded border border-[#9BC5A2]/30 focus:border-[#9BC5A2] focus:outline-none"
                    />
                    <button className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700 transition-colors">
                      Add
                    </button>
                  </div>
                </div>

                <div className="p-4 bg-[#4A6741] rounded-lg">
                  <h3 className="text-white font-medium mb-2">Deduct Balance</h3>
                  <div className="flex space-x-2">
                    <input 
                      type="number" 
                      placeholder="Amount"
                      className="flex-1 bg-[#2D4A32] text-white px-3 py-2 rounded border border-[#9BC5A2]/30 focus:border-[#9BC5A2] focus:outline-none"
                    />
                    <button className="px-4 py-2 bg-red-600 text-white rounded hover:bg-red-700 transition-colors">
                      Deduct
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Transaction History */}
          <div className="mt-8 bg-[#2D4A32] rounded-2xl p-6">
            <h2 className="text-white text-xl font-bold mb-6">Credit & Bonus History</h2>
            
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead>
                  <tr className="border-b border-[#4A6741]">
                    <th className="text-left text-[#9BC5A2] font-medium py-3">Date</th>
                    <th className="text-left text-[#9BC5A2] font-medium py-3">Type</th>
                    <th className="text-left text-[#9BC5A2] font-medium py-3">Amount</th>
                    <th className="text-left text-[#9BC5A2] font-medium py-3">Reason</th>
                    <th className="text-left text-[#9BC5A2] font-medium py-3">Admin</th>
                  </tr>
                </thead>
                <tbody>
                  <tr className="border-b border-[#4A6741]/50">
                    <td className="text-white py-3">2025-01-06 14:30</td>
                    <td className="py-3">
                      <span className="bg-green-500/20 text-green-400 px-2 py-1 rounded-full text-sm">
                        Credit
                      </span>
                    </td>
                    <td className="text-white py-3">+$1,000.00</td>
                    <td className="text-white py-3">Deposit matching bonus</td>
                    <td className="text-white py-3">Admin</td>
                  </tr>
                  <tr className="border-b border-[#4A6741]/50">
                    <td className="text-white py-3">2025-01-05 09:15</td>
                    <td className="py-3">
                      <span className="bg-blue-500/20 text-blue-400 px-2 py-1 rounded-full text-sm">
                        Bonus
                      </span>
                    </td>
                    <td className="text-white py-3">+$500.00</td>
                    <td className="text-white py-3">Welcome bonus</td>
                    <td className="text-white py-3">Admin</td>
                  </tr>
                  <tr>
                    <td className="text-white py-3">2025-01-04 16:45</td>
                    <td className="py-3">
                      <span className="bg-red-500/20 text-red-400 px-2 py-1 rounded-full text-sm">
                        Deduction
                      </span>
                    </td>
                    <td className="text-white py-3">-$250.00</td>
                    <td className="text-white py-3">Policy violation penalty</td>
                    <td className="text-white py-3">Admin</td>
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