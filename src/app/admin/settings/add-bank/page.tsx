'use client';

import AdminHeader from '@/components/AdminHeader';
import AdminSidebar from '@/components/AdminSidebar';
import ProtectedRoute from '@/components/ProtectedRoute';
import { useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';

function AddBankContent() {
  const router = useRouter();
  const [isMobileSidebarOpen, setIsMobileSidebarOpen] = useState(false);
  
  useEffect(() => {
    document.title = 'Add Bank - RAZ CAPITALS';
  }, []);

  const toggleMobileSidebar = () => setIsMobileSidebarOpen(!isMobileSidebarOpen);
  const closeMobileSidebar = () => setIsMobileSidebarOpen(false);

  return (
    <div className="flex h-screen bg-[#9BC5A2] overflow-hidden">
      {/* Sidebar */}
      <AdminSidebar currentPage="add-bank" isMobileOpen={isMobileSidebarOpen} onMobileClose={closeMobileSidebar} />

      {/* Main Content */}
      <div className="flex-1 flex flex-col">
        {/* Header */}
        <AdminHeader 
          title="Bank Account Management"
          showRefreshButton={false}
          onMobileMenuToggle={toggleMobileSidebar}
        />

        {/* Add Bank Content */}
        <div className="flex-1 p-2 xs:p-3 sm:p-4 md:p-6 lg:p-8 overflow-y-auto">
          {/* Page Title and Action Button */}
          <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-4 sm:mb-6 lg:mb-8 gap-3">
            <h1 className="text-[#0A2E1D] text-xl sm:text-2xl lg:text-3xl font-bold">Bank Account Management</h1>
            <button className="w-full sm:w-auto px-4 sm:px-6 py-2 bg-[#2D4A32] text-white rounded-lg hover:bg-[#3A5A3F] transition-colors text-sm sm:text-base">
              Add New Bank
            </button>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 sm:gap-6 lg:gap-8 mb-6 sm:mb-8">
            {/* Add New Bank Form */}
            <div className="bg-[#2D4A32] rounded-2xl p-3 sm:p-4 md:p-6">
              <h2 className="text-white text-base sm:text-lg lg:text-xl font-bold mb-4 sm:mb-6">Add New Bank Account</h2>
              
              <div className="space-y-3 sm:space-y-4">
                <div>
                  <label className="text-[#9BC5A2] text-xs sm:text-sm font-medium mb-2 block">Bank Name</label>
                  <input 
                    type="text" 
                    placeholder="e.g., Chase Bank, Bank of America"
                    className="w-full bg-[#4A6741] text-white px-3 sm:px-4 py-2 rounded-lg border border-[#9BC5A2]/30 focus:border-[#9BC5A2] focus:outline-none placeholder-gray-400 text-sm sm:text-base"
                  />
                </div>
                
                <div>
                  <label className="text-[#9BC5A2] text-xs sm:text-sm font-medium mb-2 block">Account Holder Name</label>
                  <input 
                    type="text" 
                    placeholder="Company or individual name"
                    className="w-full bg-[#4A6741] text-white px-3 sm:px-4 py-2 rounded-lg border border-[#9BC5A2]/30 focus:border-[#9BC5A2] focus:outline-none placeholder-gray-400 text-sm sm:text-base"
                  />
                </div>
                
                <div>
                  <label className="text-[#9BC5A2] text-xs sm:text-sm font-medium mb-2 block">Account Number</label>
                  <input 
                    type="text" 
                    placeholder="Bank account number"
                    className="w-full bg-[#4A6741] text-white px-3 sm:px-4 py-2 rounded-lg border border-[#9BC5A2]/30 focus:border-[#9BC5A2] focus:outline-none placeholder-gray-400 text-sm sm:text-base"
                  />
                </div>
                
                <div>
                  <label className="text-[#9BC5A2] text-xs sm:text-sm font-medium mb-2 block">Routing Number / Sort Code</label>
                  <input 
                    type="text" 
                    placeholder="Bank routing number"
                    className="w-full bg-[#4A6741] text-white px-3 sm:px-4 py-2 rounded-lg border border-[#9BC5A2]/30 focus:border-[#9BC5A2] focus:outline-none placeholder-gray-400 text-sm sm:text-base"
                  />
                </div>
                
                <div>
                  <label className="text-[#9BC5A2] text-xs sm:text-sm font-medium mb-2 block">SWIFT/BIC Code</label>
                  <input 
                    type="text" 
                    placeholder="For international transfers"
                    className="w-full bg-[#4A6741] text-white px-3 sm:px-4 py-2 rounded-lg border border-[#9BC5A2]/30 focus:border-[#9BC5A2] focus:outline-none placeholder-gray-400 text-sm sm:text-base"
                  />
                </div>
                
                <div>
                  <label className="text-[#9BC5A2] text-xs sm:text-sm font-medium mb-2 block">Bank Address</label>
                  <textarea 
                    placeholder="Full bank address..."
                    rows={3}
                    className="w-full bg-[#4A6741] text-white px-3 sm:px-4 py-2 rounded-lg border border-[#9BC5A2]/30 focus:border-[#9BC5A2] focus:outline-none placeholder-gray-400 text-sm resize-none"
                  />
                </div>
                
                <div>
                  <label className="text-[#9BC5A2] text-xs sm:text-sm font-medium mb-2 block">Currency</label>
                  <select className="w-full bg-[#4A6741] text-white px-3 sm:px-4 py-2 rounded-lg border border-[#9BC5A2]/30 focus:border-[#9BC5A2] focus:outline-none text-sm sm:text-base">
                    <option>USD - US Dollar</option>
                    <option>EUR - Euro</option>
                    <option>GBP - British Pound</option>
                    <option>JPY - Japanese Yen</option>
                    <option>AUD - Australian Dollar</option>
                    <option>CAD - Canadian Dollar</option>
                  </select>
                </div>
                
                <div>
                  <label className="text-[#9BC5A2] text-xs sm:text-sm font-medium mb-2 block">Bank Type</label>
                  <select className="w-full bg-[#4A6741] text-white px-3 sm:px-4 py-2 rounded-lg border border-[#9BC5A2]/30 focus:border-[#9BC5A2] focus:outline-none text-sm sm:text-base">
                    <option>Commercial Bank</option>
                    <option>Investment Bank</option>
                    <option>Credit Union</option>
                    <option>Online Bank</option>
                    <option>Central Bank</option>
                  </select>
                </div>
                
                <div>
                  <label className="text-[#9BC5A2] text-xs sm:text-sm font-medium mb-2 block">Usage Purpose</label>
                  <div className="space-y-2">
                    <label className="flex items-center space-x-2">
                      <input type="checkbox" className="text-[#9BC5A2] bg-[#4A6741] border-[#9BC5A2]/30 rounded" />
                      <span className="text-white text-sm">Client Deposits</span>
                    </label>
                    <label className="flex items-center space-x-2">
                      <input type="checkbox" className="text-[#9BC5A2] bg-[#4A6741] border-[#9BC5A2]/30 rounded" />
                      <span className="text-white text-sm">Client Withdrawals</span>
                    </label>
                    <label className="flex items-center space-x-2">
                      <input type="checkbox" className="text-[#9BC5A2] bg-[#4A6741] border-[#9BC5A2]/30 rounded" />
                      <span className="text-white text-sm">Company Operations</span>
                    </label>
                  </div>
                </div>
                
                <div className="flex items-center space-x-2">
                  <input type="checkbox" className="text-[#9BC5A2] bg-[#4A6741] border-[#9BC5A2]/30 rounded" />
                  <span className="text-white text-sm">Set as primary bank account</span>
                </div>
                
                <button className="w-full px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors text-sm sm:text-base font-medium">
                  Add Bank Account
                </button>
              </div>
            </div>

            {/* Bank Statistics */}
            <div className="bg-[#2D4A32] rounded-2xl p-3 sm:p-4 md:p-6">
              <h2 className="text-white text-base sm:text-lg lg:text-xl font-bold mb-4 sm:mb-6">Banking Statistics</h2>
              
              <div className="space-y-3 sm:space-y-4">
                <div className="flex justify-between items-center p-3 bg-[#4A6741] rounded-lg">
                  <div className="flex-1 min-w-0">
                    <h3 className="text-white font-medium text-sm sm:text-base truncate">Total Bank Accounts</h3>
                    <p className="text-[#9BC5A2] text-xs sm:text-sm">Active accounts</p>
                  </div>
                  <span className="text-white text-xl sm:text-2xl font-bold ml-2">8</span>
                </div>
                
                <div className="flex justify-between items-center p-3 bg-[#4A6741] rounded-lg">
                  <div className="flex-1 min-w-0">
                    <h3 className="text-white font-medium text-sm sm:text-base truncate">Monthly Transactions</h3>
                    <p className="text-[#9BC5A2] text-xs sm:text-sm">This month</p>
                  </div>
                  <span className="text-white text-xl sm:text-2xl font-bold ml-2">1,247</span>
                </div>
                
                <div className="flex justify-between items-center p-3 bg-[#4A6741] rounded-lg">
                  <div className="flex-1 min-w-0">
                    <h3 className="text-white font-medium text-sm sm:text-base truncate">Total Volume</h3>
                    <p className="text-[#9BC5A2] text-xs sm:text-sm">This month</p>
                  </div>
                  <span className="text-green-400 text-xl sm:text-2xl font-bold ml-2">$2.4M</span>
                </div>
                
                <div className="flex justify-between items-center p-3 bg-[#4A6741] rounded-lg">
                  <div className="flex-1 min-w-0">
                    <h3 className="text-white font-medium text-sm sm:text-base truncate">Failed Transactions</h3>
                    <p className="text-[#9BC5A2] text-xs sm:text-sm">This month</p>
                  </div>
                  <span className="text-red-400 text-xl sm:text-2xl font-bold ml-2">12</span>
                </div>
              </div>
              
              <div className="mt-4 sm:mt-6 p-3 sm:p-4 bg-[#4A6741] rounded-lg">
                <h3 className="text-white font-medium mb-3 text-sm sm:text-base">Popular Banks</h3>
                <div className="space-y-2">
                  <div className="flex justify-between">
                    <span className="text-[#9BC5A2] text-xs sm:text-sm">Chase Bank</span>
                    <span className="text-white text-xs sm:text-sm">34%</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-[#9BC5A2] text-xs sm:text-sm">Bank of America</span>
                    <span className="text-white text-xs sm:text-sm">28%</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-[#9BC5A2] text-xs sm:text-sm">Wells Fargo</span>
                    <span className="text-white text-xs sm:text-sm">22%</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-[#9BC5A2] text-xs sm:text-sm">Others</span>
                    <span className="text-white text-xs sm:text-sm">16%</span>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Current Bank Accounts Table */}
          <div className="bg-[#2D4A32] rounded-2xl p-3 sm:p-4 md:p-6">
            <h2 className="text-white text-base sm:text-lg lg:text-xl font-bold mb-4 sm:mb-6">Current Bank Accounts</h2>
            
            {/* Mobile Card View */}
            <div className="lg:hidden space-y-3">
              {/* Mobile Card 1 */}
              <div className="bg-[#4A6741] rounded-lg p-3 space-y-2">
                <div className="flex justify-between items-start">
                  <div className="flex-1">
                    <div className="text-white font-medium text-sm">Chase Bank</div>
                    <div className="text-[#9BC5A2] text-xs">RAZ CAPITALS LLC</div>
                  </div>
                  <span className="bg-green-500/20 text-green-400 px-2 py-1 rounded-full text-xs">
                    Active
                  </span>
                </div>
                <div className="grid grid-cols-2 gap-2 text-xs">
                  <div>
                    <div className="text-[#9BC5A2]">Account</div>
                    <div className="text-white">****1234</div>
                  </div>
                  <div>
                    <div className="text-[#9BC5A2]">Currency</div>
                    <div className="text-white">USD</div>
                  </div>
                  <div>
                    <div className="text-[#9BC5A2]">Usage</div>
                    <div className="text-white">Primary Operations</div>
                  </div>
                </div>
                <div className="flex space-x-2 pt-2">
                  <button className="flex-1 text-blue-400 hover:text-blue-300 transition-colors px-2 py-1 bg-blue-900/20 rounded hover:bg-blue-900/30 text-xs">
                    Edit
                  </button>
                  <button className="flex-1 text-orange-400 hover:text-orange-300 transition-colors px-2 py-1 bg-orange-900/20 rounded hover:bg-orange-900/30 text-xs">
                    Test
                  </button>
                </div>
              </div>

              {/* Mobile Card 2 */}
              <div className="bg-[#4A6741] rounded-lg p-3 space-y-2">
                <div className="flex justify-between items-start">
                  <div className="flex-1">
                    <div className="text-white font-medium text-sm">Bank of America</div>
                    <div className="text-[#9BC5A2] text-xs">RAZ CAPITALS LLC</div>
                  </div>
                  <span className="bg-green-500/20 text-green-400 px-2 py-1 rounded-full text-xs">
                    Active
                  </span>
                </div>
                <div className="grid grid-cols-2 gap-2 text-xs">
                  <div>
                    <div className="text-[#9BC5A2]">Account</div>
                    <div className="text-white">****5678</div>
                  </div>
                  <div>
                    <div className="text-[#9BC5A2]">Currency</div>
                    <div className="text-white">USD</div>
                  </div>
                  <div>
                    <div className="text-[#9BC5A2]">Usage</div>
                    <div className="text-white">Client Withdrawals</div>
                  </div>
                </div>
                <div className="flex space-x-2 pt-2">
                  <button className="flex-1 text-blue-400 hover:text-blue-300 transition-colors px-2 py-1 bg-blue-900/20 rounded hover:bg-blue-900/30 text-xs">
                    Edit
                  </button>
                  <button className="flex-1 text-red-400 hover:text-red-300 transition-colors px-2 py-1 bg-red-900/20 rounded hover:bg-red-900/30 text-xs">
                    Disable
                  </button>
                </div>
              </div>

              {/* Mobile Card 3 */}
              <div className="bg-[#4A6741] rounded-lg p-3 space-y-2">
                <div className="flex justify-between items-start">
                  <div className="flex-1">
                    <div className="text-white font-medium text-sm">HSBC International</div>
                    <div className="text-[#9BC5A2] text-xs">RAZ CAPITALS LTD</div>
                  </div>
                  <span className="bg-green-500/20 text-green-400 px-2 py-1 rounded-full text-xs">
                    Active
                  </span>
                </div>
                <div className="grid grid-cols-2 gap-2 text-xs">
                  <div>
                    <div className="text-[#9BC5A2]">Account</div>
                    <div className="text-white">****9012</div>
                  </div>
                  <div>
                    <div className="text-[#9BC5A2]">Currency</div>
                    <div className="text-white">EUR</div>
                  </div>
                  <div>
                    <div className="text-[#9BC5A2]">Usage</div>
                    <div className="text-white">European Operations</div>
                  </div>
                </div>
                <div className="flex space-x-2 pt-2">
                  <button className="flex-1 text-blue-400 hover:text-blue-300 transition-colors px-2 py-1 bg-blue-900/20 rounded hover:bg-blue-900/30 text-xs">
                    Edit
                  </button>
                  <button className="flex-1 text-orange-400 hover:text-orange-300 transition-colors px-2 py-1 bg-orange-900/20 rounded hover:bg-orange-900/30 text-xs">
                    Test
                  </button>
                </div>
              </div>

              {/* Mobile Card 4 */}
              <div className="bg-[#4A6741] rounded-lg p-3 space-y-2">
                <div className="flex justify-between items-start">
                  <div className="flex-1">
                    <div className="text-white font-medium text-sm">Wells Fargo</div>
                    <div className="text-[#9BC5A2] text-xs">RAZ CAPITALS LLC</div>
                  </div>
                  <span className="bg-yellow-500/20 text-yellow-400 px-2 py-1 rounded-full text-xs">
                    Inactive
                  </span>
                </div>
                <div className="grid grid-cols-2 gap-2 text-xs">
                  <div>
                    <div className="text-[#9BC5A2]">Account</div>
                    <div className="text-white">****3456</div>
                  </div>
                  <div>
                    <div className="text-[#9BC5A2]">Currency</div>
                    <div className="text-white">USD</div>
                  </div>
                  <div>
                    <div className="text-[#9BC5A2]">Usage</div>
                    <div className="text-white">Backup Account</div>
                  </div>
                </div>
                <div className="flex space-x-2 pt-2">
                  <button className="flex-1 text-green-400 hover:text-green-300 transition-colors px-2 py-1 bg-green-900/20 rounded hover:bg-green-900/30 text-xs">
                    Activate
                  </button>
                  <button className="flex-1 text-blue-400 hover:text-blue-300 transition-colors px-2 py-1 bg-blue-900/20 rounded hover:bg-blue-900/30 text-xs">
                    Edit
                  </button>
                </div>
              </div>
            </div>

            {/* Desktop Table View */}
            <div className="hidden lg:block overflow-x-auto">
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
