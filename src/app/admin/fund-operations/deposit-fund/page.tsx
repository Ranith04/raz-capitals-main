'use client';

import AdminSidebar from '@/components/AdminSidebar';
import ProtectedRoute from '@/components/ProtectedRoute';
import { useRouter } from 'next/navigation';
import { useEffect } from 'react';

function DepositFundContent() {
  const router = useRouter();
  
  useEffect(() => {
    document.title = 'Deposit Fund - RAZ CAPITALS';
  }, []);

  return (
    <div className="flex h-screen bg-[#9BC5A2] overflow-hidden">
      {/* Sidebar */}
      <AdminSidebar currentPage="deposit-fund" />

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

        {/* Deposit Fund Content */}
        <div className="flex-1 p-8 overflow-y-auto">
          <div className="flex justify-between items-center mb-8">
            <h1 className="text-[#0A2E1D] text-3xl font-bold">Deposit Fund Management</h1>
            <button className="px-6 py-2 bg-[#2D4A32] text-white rounded-lg hover:bg-[#3A5A3F] transition-colors">
              Manual Deposit
            </button>
          </div>

          {/* Statistics Cards */}
          <div className="grid grid-cols-4 gap-6 mb-8">
            <div className="bg-[#2D4A32] rounded-2xl p-6 text-center">
              <h3 className="text-[#9BC5A2] text-sm font-medium mb-2">Today's Deposits</h3>
              <p className="text-green-400 text-2xl font-bold">$45,200</p>
            </div>
            <div className="bg-[#2D4A32] rounded-2xl p-6 text-center">
              <h3 className="text-[#9BC5A2] text-sm font-medium mb-2">This Month</h3>
              <p className="text-white text-2xl font-bold">$1.2M</p>
            </div>
            <div className="bg-[#2D4A32] rounded-2xl p-6 text-center">
              <h3 className="text-[#9BC5A2] text-sm font-medium mb-2">Pending Deposits</h3>
              <p className="text-yellow-400 text-2xl font-bold">12</p>
            </div>
            <div className="bg-[#2D4A32] rounded-2xl p-6 text-center">
              <h3 className="text-[#9BC5A2] text-sm font-medium mb-2">Failed Deposits</h3>
              <p className="text-red-400 text-2xl font-bold">3</p>
            </div>
          </div>

          {/* Quick Actions */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-8">
            {/* Manual Deposit Form */}
            <div className="bg-[#2D4A32] rounded-2xl p-6">
              <h2 className="text-white text-xl font-bold mb-6">Manual Deposit</h2>
              
              <div className="space-y-4">
                <div>
                  <label className="text-[#9BC5A2] text-sm font-medium mb-2 block">User Account</label>
                  <select className="w-full bg-[#4A6741] text-white px-4 py-2 rounded-lg border border-[#9BC5A2]/30 focus:border-[#9BC5A2] focus:outline-none">
                    <option>Select User Account</option>
                    <option>#LIVE001 - Abdul Khadar Ishak</option>
                    <option>#LIVE002 - Sarah Johnson</option>
                    <option>#LIVE003 - Michael Chen</option>
                  </select>
                </div>
                
                <div>
                  <label className="text-[#9BC5A2] text-sm font-medium mb-2 block">Deposit Amount</label>
                  <input 
                    type="number" 
                    placeholder="Enter amount"
                    className="w-full bg-[#4A6741] text-white px-4 py-2 rounded-lg border border-[#9BC5A2]/30 focus:border-[#9BC5A2] focus:outline-none placeholder-gray-400"
                  />
                </div>
                
                <div>
                  <label className="text-[#9BC5A2] text-sm font-medium mb-2 block">Payment Method</label>
                  <select className="w-full bg-[#4A6741] text-white px-4 py-2 rounded-lg border border-[#9BC5A2]/30 focus:border-[#9BC5A2] focus:outline-none">
                    <option>Bank Transfer</option>
                    <option>Credit Card</option>
                    <option>Crypto</option>
                    <option>PayPal</option>
                    <option>Wire Transfer</option>
                  </select>
                </div>
                
                <div>
                  <label className="text-[#9BC5A2] text-sm font-medium mb-2 block">Transaction Reference</label>
                  <input 
                    type="text" 
                    placeholder="Transaction ID or reference"
                    className="w-full bg-[#4A6741] text-white px-4 py-2 rounded-lg border border-[#9BC5A2]/30 focus:border-[#9BC5A2] focus:outline-none placeholder-gray-400"
                  />
                </div>
                
                <div>
                  <label className="text-[#9BC5A2] text-sm font-medium mb-2 block">Notes</label>
                  <textarea 
                    placeholder="Optional notes..."
                    rows={3}
                    className="w-full bg-[#4A6741] text-white px-4 py-2 rounded-lg border border-[#9BC5A2]/30 focus:border-[#9BC5A2] focus:outline-none placeholder-gray-400"
                  />
                </div>
                
                <button className="w-full px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors">
                  Process Deposit
                </button>
              </div>
            </div>

            {/* Deposit Status Summary */}
            <div className="bg-[#2D4A32] rounded-2xl p-6">
              <h2 className="text-white text-xl font-bold mb-6">Deposit Status Summary</h2>
              
              <div className="space-y-4">
                <div className="flex justify-between items-center p-3 bg-[#4A6741] rounded-lg">
                  <div>
                    <h3 className="text-white font-medium">Completed Deposits</h3>
                    <p className="text-[#9BC5A2] text-sm">Successfully processed</p>
                  </div>
                  <span className="text-green-400 text-2xl font-bold">847</span>
                </div>
                
                <div className="flex justify-between items-center p-3 bg-[#4A6741] rounded-lg">
                  <div>
                    <h3 className="text-white font-medium">Pending Review</h3>
                    <p className="text-[#9BC5A2] text-sm">Awaiting admin approval</p>
                  </div>
                  <span className="text-yellow-400 text-2xl font-bold">12</span>
                </div>
                
                <div className="flex justify-between items-center p-3 bg-[#4A6741] rounded-lg">
                  <div>
                    <h3 className="text-white font-medium">Failed Deposits</h3>
                    <p className="text-[#9BC5A2] text-sm">Payment failed or rejected</p>
                  </div>
                  <span className="text-red-400 text-2xl font-bold">3</span>
                </div>
                
                <div className="flex justify-between items-center p-3 bg-[#4A6741] rounded-lg">
                  <div>
                    <h3 className="text-white font-medium">Processing</h3>
                    <p className="text-[#9BC5A2] text-sm">Currently being processed</p>
                  </div>
                  <span className="text-blue-400 text-2xl font-bold">7</span>
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
                  <option>Failed</option>
                  <option>Processing</option>
                </select>
              </div>
              <div>
                <label className="text-white text-sm font-medium mb-2 block">Payment Method</label>
                <select className="w-full bg-[#4A6741] text-white px-4 py-2 rounded-lg border border-[#9BC5A2]/30 focus:border-[#9BC5A2] focus:outline-none">
                  <option>All Methods</option>
                  <option>Bank Transfer</option>
                  <option>Credit Card</option>
                  <option>Crypto</option>
                  <option>PayPal</option>
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

          {/* Deposits Table */}
          <div className="bg-[#2D4A32] rounded-2xl p-6">
            <h2 className="text-white text-xl font-bold mb-6">Recent Deposits</h2>
            
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead>
                  <tr className="border-b border-[#4A6741]">
                    <th className="text-left text-[#9BC5A2] font-medium py-3">Transaction ID</th>
                    <th className="text-left text-[#9BC5A2] font-medium py-3">User</th>
                    <th className="text-left text-[#9BC5A2] font-medium py-3">Amount</th>
                    <th className="text-left text-[#9BC5A2] font-medium py-3">Payment Method</th>
                    <th className="text-left text-[#9BC5A2] font-medium py-3">Date</th>
                    <th className="text-left text-[#9BC5A2] font-medium py-3">Status</th>
                    <th className="text-left text-[#9BC5A2] font-medium py-3">Actions</th>
                  </tr>
                </thead>
                <tbody>
                  <tr className="border-b border-[#4A6741]/50">
                    <td className="text-white py-4">#DEP001234</td>
                    <td className="text-white py-4">Abdul Khadar Ishak</td>
                    <td className="text-white py-4">$5,000.00</td>
                    <td className="text-white py-4">Bank Transfer</td>
                    <td className="text-white py-4">Jan 6, 2025 14:30</td>
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
                    <td className="text-white py-4">#DEP001235</td>
                    <td className="text-white py-4">Sarah Johnson</td>
                    <td className="text-white py-4">$2,500.00</td>
                    <td className="text-white py-4">Credit Card</td>
                    <td className="text-white py-4">Jan 6, 2025 12:15</td>
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
                    <td className="text-white py-4">#DEP001236</td>
                    <td className="text-white py-4">Michael Chen</td>
                    <td className="text-white py-4">$10,000.00</td>
                    <td className="text-white py-4">Wire Transfer</td>
                    <td className="text-white py-4">Jan 6, 2025 09:45</td>
                    <td className="py-4">
                      <span className="bg-blue-500/20 text-blue-400 px-2 py-1 rounded-full text-sm">
                        Processing
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
                  <tr>
                    <td className="text-white py-4">#DEP001237</td>
                    <td className="text-white py-4">Emma Davis</td>
                    <td className="text-white py-4">$1,200.00</td>
                    <td className="text-white py-4">PayPal</td>
                    <td className="text-white py-4">Jan 5, 2025 18:20</td>
                    <td className="py-4">
                      <span className="bg-red-500/20 text-red-400 px-2 py-1 rounded-full text-sm">
                        Failed
                      </span>
                    </td>
                    <td className="py-4">
                      <div className="flex space-x-2">
                        <button className="text-blue-400 hover:text-blue-300 transition-colors px-3 py-1 bg-blue-900/20 rounded hover:bg-blue-900/30 text-sm">
                          Retry
                        </button>
                        <button className="text-[#9BC5A2] hover:text-white transition-colors px-3 py-1 bg-[#4A6741] rounded hover:bg-[#3A5A3F] text-sm">
                          Details
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

export default function DepositFundPage() {
  return (
    <ProtectedRoute requiredRole="admin">
      <DepositFundContent />
    </ProtectedRoute>
  );
}
