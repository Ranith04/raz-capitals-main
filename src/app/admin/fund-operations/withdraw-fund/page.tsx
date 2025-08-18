'use client';

import AdminSidebar from '@/components/AdminSidebar';
import ProtectedRoute from '@/components/ProtectedRoute';
import { useRouter } from 'next/navigation';
import { useEffect } from 'react';

function WithdrawFundContent() {
  const router = useRouter();
  
  useEffect(() => {
    document.title = 'Withdraw Fund - RAZ CAPITALS';
  }, []);

  return (
    <div className="flex h-screen bg-[#9BC5A2] overflow-hidden">
      {/* Sidebar */}
      <AdminSidebar currentPage="withdraw-fund" />

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

        {/* Withdraw Fund Content */}
        <div className="flex-1 p-8 overflow-y-auto">
          <div className="flex justify-between items-center mb-8">
            <h1 className="text-[#0A2E1D] text-3xl font-bold">Withdrawal Management</h1>
            <button className="px-6 py-2 bg-[#2D4A32] text-white rounded-lg hover:bg-[#3A5A3F] transition-colors">
              Process Withdrawal
            </button>
          </div>

          {/* Statistics Cards */}
          <div className="grid grid-cols-4 gap-6 mb-8">
            <div className="bg-[#2D4A32] rounded-2xl p-6 text-center">
              <h3 className="text-[#9BC5A2] text-sm font-medium mb-2">Today's Withdrawals</h3>
              <p className="text-red-400 text-2xl font-bold">$28,500</p>
            </div>
            <div className="bg-[#2D4A32] rounded-2xl p-6 text-center">
              <h3 className="text-[#9BC5A2] text-sm font-medium mb-2">This Month</h3>
              <p className="text-white text-2xl font-bold">$650K</p>
            </div>
            <div className="bg-[#2D4A32] rounded-2xl p-6 text-center">
              <h3 className="text-[#9BC5A2] text-sm font-medium mb-2">Pending Withdrawals</h3>
              <p className="text-yellow-400 text-2xl font-bold">8</p>
            </div>
            <div className="bg-[#2D4A32] rounded-2xl p-6 text-center">
              <h3 className="text-[#9BC5A2] text-sm font-medium mb-2">Rejected Withdrawals</h3>
              <p className="text-red-400 text-2xl font-bold">2</p>
            </div>
          </div>

          {/* Quick Actions */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-8">
            {/* Manual Withdrawal Form */}
            <div className="bg-[#2D4A32] rounded-2xl p-6">
              <h2 className="text-white text-xl font-bold mb-6">Process Manual Withdrawal</h2>
              
              <div className="space-y-4">
                <div>
                  <label className="text-[#9BC5A2] text-sm font-medium mb-2 block">User Account</label>
                  <select className="w-full bg-[#4A6741] text-white px-4 py-2 rounded-lg border border-[#9BC5A2]/30 focus:border-[#9BC5A2] focus:outline-none">
                    <option>Select User Account</option>
                    <option>#LIVE001 - Abdul Khadar Ishak ($25,450)</option>
                    <option>#LIVE002 - Sarah Johnson ($8,920)</option>
                    <option>#LIVE003 - Michael Chen ($156,750)</option>
                  </select>
                </div>
                
                <div>
                  <label className="text-[#9BC5A2] text-sm font-medium mb-2 block">Withdrawal Amount</label>
                  <input 
                    type="number" 
                    placeholder="Enter amount"
                    className="w-full bg-[#4A6741] text-white px-4 py-2 rounded-lg border border-[#9BC5A2]/30 focus:border-[#9BC5A2] focus:outline-none placeholder-gray-400"
                  />
                </div>
                
                <div>
                  <label className="text-[#9BC5A2] text-sm font-medium mb-2 block">Withdrawal Method</label>
                  <select className="w-full bg-[#4A6741] text-white px-4 py-2 rounded-lg border border-[#9BC5A2]/30 focus:border-[#9BC5A2] focus:outline-none">
                    <option>Bank Transfer</option>
                    <option>Wire Transfer</option>
                    <option>Crypto</option>
                    <option>PayPal</option>
                    <option>Check</option>
                  </select>
                </div>
                
                <div>
                  <label className="text-[#9BC5A2] text-sm font-medium mb-2 block">Bank Account / Details</label>
                  <textarea 
                    placeholder="Bank details or crypto address..."
                    rows={3}
                    className="w-full bg-[#4A6741] text-white px-4 py-2 rounded-lg border border-[#9BC5A2]/30 focus:border-[#9BC5A2] focus:outline-none placeholder-gray-400"
                  />
                </div>
                
                <div>
                  <label className="text-[#9BC5A2] text-sm font-medium mb-2 block">Admin Notes</label>
                  <textarea 
                    placeholder="Internal notes..."
                    rows={2}
                    className="w-full bg-[#4A6741] text-white px-4 py-2 rounded-lg border border-[#9BC5A2]/30 focus:border-[#9BC5A2] focus:outline-none placeholder-gray-400"
                  />
                </div>
                
                <button className="w-full px-4 py-2 bg-orange-600 text-white rounded-lg hover:bg-orange-700 transition-colors">
                  Process Withdrawal
                </button>
              </div>
            </div>

            {/* Withdrawal Status Summary */}
            <div className="bg-[#2D4A32] rounded-2xl p-6">
              <h2 className="text-white text-xl font-bold mb-6">Withdrawal Status Summary</h2>
              
              <div className="space-y-4">
                <div className="flex justify-between items-center p-3 bg-[#4A6741] rounded-lg">
                  <div>
                    <h3 className="text-white font-medium">Completed Withdrawals</h3>
                    <p className="text-[#9BC5A2] text-sm">Successfully processed</p>
                  </div>
                  <span className="text-green-400 text-2xl font-bold">324</span>
                </div>
                
                <div className="flex justify-between items-center p-3 bg-[#4A6741] rounded-lg">
                  <div>
                    <h3 className="text-white font-medium">Pending Review</h3>
                    <p className="text-[#9BC5A2] text-sm">Awaiting admin approval</p>
                  </div>
                  <span className="text-yellow-400 text-2xl font-bold">8</span>
                </div>
                
                <div className="flex justify-between items-center p-3 bg-[#4A6741] rounded-lg">
                  <div>
                    <h3 className="text-white font-medium">Rejected Withdrawals</h3>
                    <p className="text-[#9BC5A2] text-sm">Insufficient funds or issues</p>
                  </div>
                  <span className="text-red-400 text-2xl font-bold">2</span>
                </div>
                
                <div className="flex justify-between items-center p-3 bg-[#4A6741] rounded-lg">
                  <div>
                    <h3 className="text-white font-medium">Processing</h3>
                    <p className="text-[#9BC5A2] text-sm">Currently being processed</p>
                  </div>
                  <span className="text-blue-400 text-2xl font-bold">5</span>
                </div>
                
                <div className="mt-6 p-3 bg-red-900/20 border border-red-500/20 rounded-lg">
                  <h4 className="text-red-400 font-medium mb-2">High Risk Withdrawals</h4>
                  <p className="text-red-300 text-sm">2 withdrawals require additional verification</p>
                  <button className="mt-2 px-3 py-1 bg-red-600 text-white rounded text-sm hover:bg-red-700 transition-colors">
                    Review Now
                  </button>
                </div>
              </div>
            </div>
          </div>

          {/* Search and Filter Section */}
          <div className="bg-[#2D4A32] rounded-2xl p-6 mb-8">
            <div className="grid grid-cols-5 gap-4">
              <div>
                <label className="text-white text-sm font-medium mb-2 block">Search</label>
                <input 
                  type="text" 
                  placeholder="Transaction ID, User..."
                  className="w-full bg-[#4A6741] text-white px-4 py-2 rounded-lg border border-[#9BC5A2]/30 focus:border-[#9BC5A2] focus:outline-none placeholder-gray-400"
                />
              </div>
              <div>
                <label className="text-white text-sm font-medium mb-2 block">Status</label>
                <select className="w-full bg-[#4A6741] text-white px-4 py-2 rounded-lg border border-[#9BC5A2]/30 focus:border-[#9BC5A2] focus:outline-none">
                  <option>All Status</option>
                  <option>Completed</option>
                  <option>Pending</option>
                  <option>Rejected</option>
                  <option>Processing</option>
                  <option>High Risk</option>
                </select>
              </div>
              <div>
                <label className="text-white text-sm font-medium mb-2 block">Withdrawal Method</label>
                <select className="w-full bg-[#4A6741] text-white px-4 py-2 rounded-lg border border-[#9BC5A2]/30 focus:border-[#9BC5A2] focus:outline-none">
                  <option>All Methods</option>
                  <option>Bank Transfer</option>
                  <option>Wire Transfer</option>
                  <option>Crypto</option>
                  <option>PayPal</option>
                  <option>Check</option>
                </select>
              </div>
              <div>
                <label className="text-white text-sm font-medium mb-2 block">Date From</label>
                <input 
                  type="date" 
                  className="w-full bg-[#4A6741] text-white px-4 py-2 rounded-lg border border-[#9BC5A2]/30 focus:border-[#9BC5A2] focus:outline-none"
                />
              </div>
              <div>
                <label className="text-white text-sm font-medium mb-2 block">Date To</label>
                <input 
                  type="date" 
                  className="w-full bg-[#4A6741] text-white px-4 py-2 rounded-lg border border-[#9BC5A2]/30 focus:border-[#9BC5A2] focus:outline-none"
                />
              </div>
            </div>
          </div>

          {/* Withdrawals Table */}
          <div className="bg-[#2D4A32] rounded-2xl p-6">
            <h2 className="text-white text-xl font-bold mb-6">Recent Withdrawals</h2>
            
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead>
                  <tr className="border-b border-[#4A6741]">
                    <th className="text-left text-[#9BC5A2] font-medium py-3">Transaction ID</th>
                    <th className="text-left text-[#9BC5A2] font-medium py-3">User</th>
                    <th className="text-left text-[#9BC5A2] font-medium py-3">Amount</th>
                    <th className="text-left text-[#9BC5A2] font-medium py-3">Method</th>
                    <th className="text-left text-[#9BC5A2] font-medium py-3">Date</th>
                    <th className="text-left text-[#9BC5A2] font-medium py-3">Status</th>
                    <th className="text-left text-[#9BC5A2] font-medium py-3">Actions</th>
                  </tr>
                </thead>
                <tbody>
                  <tr className="border-b border-[#4A6741]/50">
                    <td className="text-white py-4">#WDR001045</td>
                    <td className="text-white py-4">Abdul Khadar Ishak</td>
                    <td className="text-white py-4">$2,500.00</td>
                    <td className="text-white py-4">Bank Transfer</td>
                    <td className="text-white py-4">Jan 6, 2025 15:30</td>
                    <td className="py-4">
                      <span className="bg-yellow-500/20 text-yellow-400 px-2 py-1 rounded-full text-sm">
                        Pending
                      </span>
                    </td>
                    <td className="py-4">
                      <div className="flex space-x-2">
                        <button className="text-green-400 hover:text-green-300 transition-colors px-3 py-1 bg-green-900/20 rounded hover:bg-green-900/30 text-sm">
                          Approve
                        </button>
                        <button className="text-red-400 hover:text-red-300 transition-colors px-3 py-1 bg-red-900/20 rounded hover:bg-red-900/30 text-sm">
                          Reject
                        </button>
                      </div>
                    </td>
                  </tr>
                  <tr className="border-b border-[#4A6741]/50">
                    <td className="text-white py-4">#WDR001046</td>
                    <td className="text-white py-4">Sarah Johnson</td>
                    <td className="text-white py-4">$1,200.00</td>
                    <td className="text-white py-4">PayPal</td>
                    <td className="text-white py-4">Jan 6, 2025 11:45</td>
                    <td className="py-4">
                      <span className="bg-green-500/20 text-green-400 px-2 py-1 rounded-full text-sm">
                        Completed
                      </span>
                    </td>
                    <td className="py-4">
                      <div className="flex space-x-2">
                        <button className="text-[#9BC5A2] hover:text-white transition-colors px-3 py-1 bg-[#4A6741] rounded hover:bg-[#3A5A3F] text-sm">
                          View
                        </button>
                      </div>
                    </td>
                  </tr>
                  <tr className="border-b border-[#4A6741]/50">
                    <td className="text-white py-4">#WDR001047</td>
                    <td className="text-white py-4">Michael Chen</td>
                    <td className="text-white py-4">$15,000.00</td>
                    <td className="text-white py-4">Wire Transfer</td>
                    <td className="text-white py-4">Jan 6, 2025 08:20</td>
                    <td className="py-4">
                      <span className="bg-red-500/20 text-red-400 px-2 py-1 rounded-full text-sm">
                        High Risk
                      </span>
                    </td>
                    <td className="py-4">
                      <div className="flex space-x-2">
                        <button className="text-orange-400 hover:text-orange-300 transition-colors px-3 py-1 bg-orange-900/20 rounded hover:bg-orange-900/30 text-sm">
                          Review
                        </button>
                        <button className="text-[#9BC5A2] hover:text-white transition-colors px-3 py-1 bg-[#4A6741] rounded hover:bg-[#3A5A3F] text-sm">
                          Details
                        </button>
                      </div>
                    </td>
                  </tr>
                  <tr>
                    <td className="text-white py-4">#WDR001048</td>
                    <td className="text-white py-4">Emma Davis</td>
                    <td className="text-white py-4">$800.00</td>
                    <td className="text-white py-4">Bank Transfer</td>
                    <td className="text-white py-4">Jan 5, 2025 16:10</td>
                    <td className="py-4">
                      <span className="bg-red-500/20 text-red-400 px-2 py-1 rounded-full text-sm">
                        Rejected
                      </span>
                    </td>
                    <td className="py-4">
                      <div className="flex space-x-2">
                        <button className="text-blue-400 hover:text-blue-300 transition-colors px-3 py-1 bg-blue-900/20 rounded hover:bg-blue-900/30 text-sm">
                          Reconsider
                        </button>
                        <button className="text-[#9BC5A2] hover:text-white transition-colors px-3 py-1 bg-[#4A6741] rounded hover:bg-[#3A5A3F] text-sm">
                          View
                        </button>
                      </div>
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

export default function WithdrawFundPage() {
  return (
    <ProtectedRoute requiredRole="admin">
      <WithdrawFundContent />
    </ProtectedRoute>
  );
}
