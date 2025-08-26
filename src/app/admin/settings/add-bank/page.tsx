'use client';

import AdminHeader from '@/components/AdminHeader';
import AdminSidebar from '@/components/AdminSidebar';
import ProtectedRoute from '@/components/ProtectedRoute';
import { useRouter } from 'next/navigation';
import { useEffect } from 'react';

function AddBankContent() {
  const router = useRouter();
  
  useEffect(() => {
    document.title = 'Add Bank - RAZ CAPITALS';
  }, []);

  return (
    <div className="flex h-screen bg-[#9BC5A2] overflow-hidden">
      {/* Sidebar */}
      <AdminSidebar currentPage="add-bank" />

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

        {/* Add Bank Content */}
        <div className="flex-1 p-8 overflow-y-auto">
          <div className="flex justify-between items-center mb-8">
            <h1 className="text-[#0A2E1D] text-3xl font-bold">Bank Account Management</h1>
            <button className="px-6 py-2 bg-[#2D4A32] text-white rounded-lg hover:bg-[#3A5A3F] transition-colors">
              Add New Bank
            </button>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-8">
            {/* Add New Bank Form */}
            <div className="bg-[#2D4A32] rounded-2xl p-6">
              <h2 className="text-white text-xl font-bold mb-6">Add New Bank Account</h2>
              
              <div className="space-y-4">
                <div>
                  <label className="text-[#9BC5A2] text-sm font-medium mb-2 block">Bank Name</label>
                  <input 
                    type="text" 
                    placeholder="e.g., Chase Bank, Bank of America"
                    className="w-full bg-[#4A6741] text-white px-4 py-2 rounded-lg border border-[#9BC5A2]/30 focus:border-[#9BC5A2] focus:outline-none placeholder-gray-400"
                  />
                </div>
                
                <div>
                  <label className="text-[#9BC5A2] text-sm font-medium mb-2 block">Account Holder Name</label>
                  <input 
                    type="text" 
                    placeholder="Company or individual name"
                    className="w-full bg-[#4A6741] text-white px-4 py-2 rounded-lg border border-[#9BC5A2]/30 focus:border-[#9BC5A2] focus:outline-none placeholder-gray-400"
                  />
                </div>
                
                <div>
                  <label className="text-[#9BC5A2] text-sm font-medium mb-2 block">Account Number</label>
                  <input 
                    type="text" 
                    placeholder="Bank account number"
                    className="w-full bg-[#4A6741] text-white px-4 py-2 rounded-lg border border-[#9BC5A2]/30 focus:border-[#9BC5A2] focus:outline-none placeholder-gray-400"
                  />
                </div>
                
                <div>
                  <label className="text-[#9BC5A2] text-sm font-medium mb-2 block">Routing Number / Sort Code</label>
                  <input 
                    type="text" 
                    placeholder="Bank routing number"
                    className="w-full bg-[#4A6741] text-white px-4 py-2 rounded-lg border border-[#9BC5A2]/30 focus:border-[#9BC5A2] focus:outline-none placeholder-gray-400"
                  />
                </div>
                
                <div>
                  <label className="text-[#9BC5A2] text-sm font-medium mb-2 block">SWIFT/BIC Code</label>
                  <input 
                    type="text" 
                    placeholder="For international transfers"
                    className="w-full bg-[#4A6741] text-white px-4 py-2 rounded-lg border border-[#9BC5A2]/30 focus:border-[#9BC5A2] focus:outline-none placeholder-gray-400"
                  />
                </div>
                
                <div>
                  <label className="text-[#9BC5A2] text-sm font-medium mb-2 block">Bank Address</label>
                  <textarea 
                    placeholder="Full bank address..."
                    rows={3}
                    className="w-full bg-[#4A6741] text-white px-4 py-2 rounded-lg border border-[#9BC5A2]/30 focus:border-[#9BC5A2] focus:outline-none placeholder-gray-400"
                  />
                </div>
                
                <div>
                  <label className="text-[#9BC5A2] text-sm font-medium mb-2 block">Currency</label>
                  <select className="w-full bg-[#4A6741] text-white px-4 py-2 rounded-lg border border-[#9BC5A2]/30 focus:border-[#9BC5A2] focus:outline-none">
                    <option>USD - US Dollar</option>
                    <option>EUR - Euro</option>
                    <option>GBP - British Pound</option>
                    <option>JPY - Japanese Yen</option>
                    <option>AUD - Australian Dollar</option>
                    <option>CAD - Canadian Dollar</option>
                  </select>
                </div>
                
                <div>
                  <label className="text-[#9BC5A2] text-sm font-medium mb-2 block">Bank Type</label>
                  <select className="w-full bg-[#4A6741] text-white px-4 py-2 rounded-lg border border-[#9BC5A2]/30 focus:border-[#9BC5A2] focus:outline-none">
                    <option>Commercial Bank</option>
                    <option>Investment Bank</option>
                    <option>Credit Union</option>
                    <option>Online Bank</option>
                    <option>Central Bank</option>
                  </select>
                </div>
                
                <div>
                  <label className="text-[#9BC5A2] text-sm font-medium mb-2 block">Usage Purpose</label>
                  <div className="space-y-2">
                    <label className="flex items-center space-x-2">
                      <input type="checkbox" className="text-[#9BC5A2] bg-[#4A6741] border-[#9BC5A2]/30 rounded" />
                      <span className="text-white">Client Deposits</span>
                    </label>
                    <label className="flex items-center space-x-2">
                      <input type="checkbox" className="text-[#9BC5A2] bg-[#4A6741] border-[#9BC5A2]/30 rounded" />
                      <span className="text-white">Client Withdrawals</span>
                    </label>
                    <label className="flex items-center space-x-2">
                      <input type="checkbox" className="text-[#9BC5A2] bg-[#4A6741] border-[#9BC5A2]/30 rounded" />
                      <span className="text-white">Company Operations</span>
                    </label>
                  </div>
                </div>
                
                <div className="flex items-center space-x-2">
                  <input type="checkbox" className="text-[#9BC5A2] bg-[#4A6741] border-[#9BC5A2]/30 rounded" />
                  <span className="text-white text-sm">Set as primary bank account</span>
                </div>
                
                <button className="w-full px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors">
                  Add Bank Account
                </button>
              </div>
            </div>

            {/* Bank Statistics */}
            <div className="bg-[#2D4A32] rounded-2xl p-6">
              <h2 className="text-white text-xl font-bold mb-6">Banking Statistics</h2>
              
              <div className="space-y-4">
                <div className="flex justify-between items-center p-3 bg-[#4A6741] rounded-lg">
                  <div>
                    <h3 className="text-white font-medium">Total Bank Accounts</h3>
                    <p className="text-[#9BC5A2] text-sm">Active accounts</p>
                  </div>
                  <span className="text-white text-2xl font-bold">8</span>
                </div>
                
                <div className="flex justify-between items-center p-3 bg-[#4A6741] rounded-lg">
                  <div>
                    <h3 className="text-white font-medium">Monthly Transactions</h3>
                    <p className="text-[#9BC5A2] text-sm">This month</p>
                  </div>
                  <span className="text-white text-2xl font-bold">1,247</span>
                </div>
                
                <div className="flex justify-between items-center p-3 bg-[#4A6741] rounded-lg">
                  <div>
                    <h3 className="text-white font-medium">Total Volume</h3>
                    <p className="text-[#9BC5A2] text-sm">This month</p>
                  </div>
                  <span className="text-green-400 text-2xl font-bold">$2.4M</span>
                </div>
                
                <div className="flex justify-between items-center p-3 bg-[#4A6741] rounded-lg">
                  <div>
                    <h3 className="text-white font-medium">Failed Transactions</h3>
                    <p className="text-[#9BC5A2] text-sm">This month</p>
                  </div>
                  <span className="text-red-400 text-2xl font-bold">12</span>
                </div>
              </div>
              
              <div className="mt-6 p-4 bg-[#4A6741] rounded-lg">
                <h3 className="text-white font-medium mb-3">Popular Banks</h3>
                <div className="space-y-2">
                  <div className="flex justify-between">
                    <span className="text-[#9BC5A2] text-sm">Chase Bank</span>
                    <span className="text-white text-sm">34%</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-[#9BC5A2] text-sm">Bank of America</span>
                    <span className="text-white text-sm">28%</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-[#9BC5A2] text-sm">Wells Fargo</span>
                    <span className="text-white text-sm">22%</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-[#9BC5A2] text-sm">Others</span>
                    <span className="text-white text-sm">16%</span>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Current Bank Accounts Table */}
          <div className="bg-[#2D4A32] rounded-2xl p-6">
            <h2 className="text-white text-xl font-bold mb-6">Current Bank Accounts</h2>
            
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead>
                  <tr className="border-b border-[#4A6741]">
                    <th className="text-left text-[#9BC5A2] font-medium py-3">Bank Name</th>
                    <th className="text-left text-[#9BC5A2] font-medium py-3">Account Holder</th>
                    <th className="text-left text-[#9BC5A2] font-medium py-3">Account Number</th>
                    <th className="text-left text-[#9BC5A2] font-medium py-3">Currency</th>
                    <th className="text-left text-[#9BC5A2] font-medium py-3">Usage</th>
                    <th className="text-left text-[#9BC5A2] font-medium py-3">Status</th>
                    <th className="text-left text-[#9BC5A2] font-medium py-3">Actions</th>
                  </tr>
                </thead>
                <tbody>
                  <tr className="border-b border-[#4A6741]/50">
                    <td className="text-white py-4">Chase Bank</td>
                    <td className="text-white py-4">RAZ CAPITALS LLC</td>
                    <td className="text-white py-4">****1234</td>
                    <td className="text-white py-4">USD</td>
                    <td className="text-white py-4">Primary Operations</td>
                    <td className="py-4">
                      <span className="bg-green-500/20 text-green-400 px-2 py-1 rounded-full text-sm">
                        Active
                      </span>
                    </td>
                    <td className="py-4">
                      <div className="flex space-x-2">
                        <button className="text-blue-400 hover:text-blue-300 transition-colors px-3 py-1 bg-blue-900/20 rounded hover:bg-blue-900/30 text-sm">
                          Edit
                        </button>
                        <button className="text-orange-400 hover:text-orange-300 transition-colors px-3 py-1 bg-orange-900/20 rounded hover:bg-orange-900/30 text-sm">
                          Test
                        </button>
                      </div>
                    </td>
                  </tr>
                  <tr className="border-b border-[#4A6741]/50">
                    <td className="text-white py-4">Bank of America</td>
                    <td className="text-white py-4">RAZ CAPITALS LLC</td>
                    <td className="text-white py-4">****5678</td>
                    <td className="text-white py-4">USD</td>
                    <td className="text-white py-4">Client Withdrawals</td>
                    <td className="py-4">
                      <span className="bg-green-500/20 text-green-400 px-2 py-1 rounded-full text-sm">
                        Active
                      </span>
                    </td>
                    <td className="py-4">
                      <div className="flex space-x-2">
                        <button className="text-blue-400 hover:text-blue-300 transition-colors px-3 py-1 bg-blue-900/20 rounded hover:bg-blue-900/30 text-sm">
                          Edit
                        </button>
                        <button className="text-red-400 hover:text-red-300 transition-colors px-3 py-1 bg-red-900/20 rounded hover:bg-red-900/30 text-sm">
                          Disable
                        </button>
                      </div>
                    </td>
                  </tr>
                  <tr className="border-b border-[#4A6741]/50">
                    <td className="text-white py-4">HSBC International</td>
                    <td className="text-white py-4">RAZ CAPITALS LTD</td>
                    <td className="text-white py-4">****9012</td>
                    <td className="text-white py-4">EUR</td>
                    <td className="text-white py-4">European Operations</td>
                    <td className="py-4">
                      <span className="bg-green-500/20 text-green-400 px-2 py-1 rounded-full text-sm">
                        Active
                      </span>
                    </td>
                    <td className="py-4">
                      <div className="flex space-x-2">
                        <button className="text-blue-400 hover:text-blue-300 transition-colors px-3 py-1 bg-blue-900/20 rounded hover:bg-blue-900/30 text-sm">
                          Edit
                        </button>
                        <button className="text-orange-400 hover:text-orange-300 transition-colors px-3 py-1 bg-orange-900/20 rounded hover:bg-orange-900/30 text-sm">
                          Test
                        </button>
                      </div>
                    </td>
                  </tr>
                  <tr>
                    <td className="text-white py-4">Wells Fargo</td>
                    <td className="text-white py-4">RAZ CAPITALS LLC</td>
                    <td className="text-white py-4">****3456</td>
                    <td className="text-white py-4">USD</td>
                    <td className="text-white py-4">Backup Account</td>
                    <td className="py-4">
                      <span className="bg-yellow-500/20 text-yellow-400 px-2 py-1 rounded-full text-sm">
                        Inactive
                      </span>
                    </td>
                    <td className="py-4">
                      <div className="flex space-x-2">
                        <button className="text-green-400 hover:text-green-300 transition-colors px-3 py-1 bg-green-900/20 rounded hover:bg-green-900/30 text-sm">
                          Activate
                        </button>
                        <button className="text-blue-400 hover:text-blue-300 transition-colors px-3 py-1 bg-blue-900/20 rounded hover:bg-blue-900/30 text-sm">
                          Edit
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

export default function AddBankPage() {
  return (
    <ProtectedRoute requiredRole="admin">
      <AddBankContent />
    </ProtectedRoute>
  );
}
