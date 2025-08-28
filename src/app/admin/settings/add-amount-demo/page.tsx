'use client';

import AdminHeader from '@/components/AdminHeader';
import AdminSidebar from '@/components/AdminSidebar';
import ProtectedRoute from '@/components/ProtectedRoute';
import { useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';

function AddAmountDemoContent() {
  const router = useRouter();
  const [isMobileSidebarOpen, setIsMobileSidebarOpen] = useState(false);
  
  useEffect(() => {
    document.title = 'Add Amount in Demo - RAZ CAPITALS';
  }, []);

  const toggleMobileSidebar = () => setIsMobileSidebarOpen(!isMobileSidebarOpen);
  const closeMobileSidebar = () => setIsMobileSidebarOpen(false);

  return (
    <div className="flex h-screen bg-[#9BC5A2] overflow-hidden">
      {/* Sidebar */}
      <AdminSidebar currentPage="add-amount-demo" isMobileOpen={isMobileSidebarOpen} onMobileClose={closeMobileSidebar} />

      {/* Main Content */}
      <div className="flex-1 flex flex-col">
        {/* Header */}
        <AdminHeader 
          title="Demo Account Balance Settings"
          showRefreshButton={false}
          onMobileMenuToggle={toggleMobileSidebar}
        />

        {/* Demo Amount Settings Content */}
        <div className="flex-1 p-2 xs:p-3 sm:p-4 md:p-6 lg:p-8 overflow-y-auto">
          {/* Page Title and Action Button */}
          <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-4 sm:mb-6 lg:mb-8 gap-3">
            <h1 className="text-[#0A2E1D] text-xl sm:text-2xl lg:text-3xl font-bold">Demo Account Balance Settings</h1>
            <button className="w-full sm:w-auto px-4 sm:px-6 py-2 bg-[#2D4A32] text-white rounded-lg hover:bg-[#3A5A3F] transition-colors text-sm sm:text-base">
              Add New Amount Option
            </button>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 sm:gap-6 lg:gap-8 mb-6 sm:mb-8">
            {/* Add New Demo Amount Form */}
            <div className="bg-[#2D4A32] rounded-2xl p-3 sm:p-4 md:p-6">
              <h2 className="text-white text-base sm:text-lg lg:text-xl font-bold mb-4 sm:mb-6">Add Demo Balance Option</h2>
              
              <div className="space-y-3 sm:space-y-4">
                <div>
                  <label className="text-[#9BC5A2] text-xs sm:text-sm font-medium mb-2 block">Demo Amount (USD)</label>
                  <input 
                    type="number" 
                    placeholder="e.g., 10000, 50000, 100000"
                    className="w-full bg-[#4A6741] text-white px-3 sm:px-4 py-2 rounded-lg border border-[#9BC5A2]/30 focus:border-[#9BC5A2] focus:outline-none placeholder-gray-400 text-sm sm:text-base"
                  />
                </div>
                
                <div>
                  <label className="text-[#9BC5A2] text-xs sm:text-sm font-medium mb-2 block">Display Name</label>
                  <input 
                    type="text" 
                    placeholder="e.g., Basic Demo ($10,000), Premium Demo ($100,000)"
                    className="w-full bg-[#4A6741] text-white px-3 sm:px-4 py-2 rounded-lg border border-[#9BC5A2]/30 focus:border-[#9BC5A2] focus:outline-none placeholder-gray-400 text-sm sm:text-base"
                  />
                </div>
                
                <div>
                  <label className="text-[#9BC5A2] text-xs sm:text-sm font-medium mb-2 block">Demo Duration (Days)</label>
                  <select className="w-full bg-[#4A6741] text-white px-3 sm:px-4 py-2 rounded-lg border border-[#9BC5A2]/30 focus:border-[#9BC5A2] focus:outline-none text-sm sm:text-base">
                    <option>30 Days</option>
                    <option>60 Days</option>
                    <option>90 Days</option>
                    <option>Unlimited</option>
                  </select>
                </div>
                
                <div>
                  <label className="text-[#9BC5A2] text-xs sm:text-sm font-medium mb-2 block">Available For</label>
                  <div className="space-y-2">
                    <label className="flex items-center space-x-2">
                      <input type="checkbox" className="text-[#9BC5A2] bg-[#4A6741] border-[#9BC5A2]/30 rounded" />
                      <span className="text-white text-sm">New Users</span>
                    </label>
                    <label className="flex items-center space-x-2">
                      <input type="checkbox" className="text-[#9BC5A2] bg-[#4A6741] border-[#9BC5A2]/30 rounded" />
                      <span className="text-white text-sm">Existing Users</span>
                    </label>
                    <label className="flex items-center space-x-2">
                      <input type="checkbox" className="text-[#9BC5A2] bg-[#4A6741] border-[#9BC5A2]/30 rounded" />
                      <span className="text-white text-sm">VIP Users Only</span>
                    </label>
                  </div>
                </div>
                
                <div>
                  <label className="text-[#9BC5A2] text-xs sm:text-sm font-medium mb-2 block">Reset Conditions</label>
                  <div className="space-y-2">
                    <label className="flex items-center space-x-2">
                      <input type="checkbox" className="text-[#9BC5A2] bg-[#4A6741] border-[#9BC5A2]/30 rounded" />
                      <span className="text-white text-sm">Allow balance reset</span>
                    </label>
                    <label className="flex items-center space-x-2">
                      <input type="checkbox" className="text-[#9BC5A2] bg-[#4A6741] border-[#9BC5A2]/30 rounded" />
                      <span className="text-white text-sm">Auto-reset on expiry</span>
                    </label>
                  </div>
                </div>
                
                <div>
                  <label className="text-[#9BC5A2] text-xs sm:text-sm font-medium mb-2 block">Special Features</label>
                  <div className="space-y-2">
                    <label className="flex items-center space-x-2">
                      <input type="checkbox" className="text-[#9BC5A2] bg-[#4A6741] border-[#9BC5A2]/30 rounded" />
                      <span className="text-white text-sm">Enable all trading instruments</span>
                    </label>
                    <label className="flex items-center space-x-2">
                      <input type="checkbox" className="text-[#9BC5A2] bg-[#4A6741] border-[#9BC5A2]/30 rounded" />
                      <span className="text-white text-sm">Include premium features</span>
                    </label>
                    <label className="flex items-center space-x-2">
                      <input type="checkbox" className="text-[#9BC5A2] bg-[#4A6741] border-[#9BC5A2]/30 rounded" />
                      <span className="text-white text-sm">Allow multiple demo accounts</span>
                    </label>
                  </div>
                </div>
                
                <div>
                  <label className="text-[#9BC5A2] text-xs sm:text-sm font-medium mb-2 block">Description</label>
                  <textarea 
                    placeholder="Description for this demo amount option..."
                    rows={3}
                    className="w-full bg-[#4A6741] text-white px-3 sm:px-4 py-2 rounded-lg border border-[#9BC5A2]/30 focus:border-[#9BC5A2] focus:outline-none placeholder-gray-400 text-sm resize-none"
                  />
                </div>
                
                <button className="w-full px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors text-sm sm:text-base font-medium">
                  Add Demo Amount Option
                </button>
              </div>
            </div>

            {/* Demo Usage Statistics */}
            <div className="bg-[#2D4A32] rounded-2xl p-3 sm:p-4 md:p-6">
              <h2 className="text-white text-base sm:text-lg lg:text-xl font-bold mb-4 sm:mb-6">Demo Account Statistics</h2>
              
              <div className="space-y-3 sm:space-y-4">
                <div className="flex justify-between items-center p-3 bg-[#4A6741] rounded-lg">
                  <div className="flex-1 min-w-0">
                    <h3 className="text-white font-medium text-sm sm:text-base truncate">$10,000 Demo</h3>
                    <p className="text-[#9BC5A2] text-xs sm:text-sm">Basic starter option</p>
                  </div>
                  <span className="text-white text-base sm:text-lg font-bold ml-2">45%</span>
                </div>
                
                <div className="flex justify-between items-center p-3 bg-[#4A6741] rounded-lg">
                  <div className="flex-1 min-w-0">
                    <h3 className="text-white font-medium text-sm sm:text-base truncate">$50,000 Demo</h3>
                    <p className="text-[#9BC5A2] text-xs sm:text-sm">Popular choice</p>
                  </div>
                  <span className="text-white text-base sm:text-lg font-bold ml-2">35%</span>
                </div>
                
                <div className="flex justify-between items-center p-3 bg-[#4A6741] rounded-lg">
                  <div className="flex-1 min-w-0">
                    <h3 className="text-white font-medium text-sm sm:text-base truncate">$100,000 Demo</h3>
                    <p className="text-[#9BC5A2] text-xs sm:text-sm">Advanced trading</p>
                  </div>
                  <span className="text-white text-base sm:text-lg font-bold ml-2">15%</span>
                </div>
                
                <div className="flex justify-between items-center p-3 bg-[#4A6741] rounded-lg">
                  <div className="flex-1 min-w-0">
                    <h3 className="text-white font-medium text-sm sm:text-base truncate">$500,000 Demo</h3>
                    <p className="text-[#9BC5A2] text-xs sm:text-sm">VIP experience</p>
                  </div>
                  <span className="text-white text-base sm:text-lg font-bold ml-2">5%</span>
                </div>
              </div>
              
              <div className="mt-4 sm:mt-6 p-3 sm:p-4 bg-[#4A6741] rounded-lg">
                <h3 className="text-white font-medium mb-2 text-sm sm:text-base">Quick Stats</h3>
                <div className="grid grid-cols-2 gap-3 sm:gap-4 text-xs sm:text-sm">
                  <div>
                    <p className="text-[#9BC5A2]">Total Demo Accounts</p>
                    <p className="text-white font-bold">2,847</p>
                  </div>
                  <div>
                    <p className="text-[#9BC5A2]">Active This Month</p>
                    <p className="text-white font-bold">1,423</p>
                  </div>
                  <div>
                    <p className="text-[#9BC5A2]">Conversion Rate</p>
                    <p className="text-green-400 font-bold">23.4%</p>
                  </div>
                  <div>
                    <p className="text-[#9BC5A2]">Avg Usage Time</p>
                    <p className="text-white font-bold">18 days</p>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Current Demo Amount Options Table */}
          <div className="bg-[#2D4A32] rounded-2xl p-3 sm:p-4 md:p-6">
            <h2 className="text-white text-base sm:text-lg lg:text-xl font-bold mb-4 sm:mb-6">Current Demo Amount Options</h2>
            
            {/* Mobile Card View */}
            <div className="lg:hidden space-y-3">
              {/* Mobile Card 1 */}
              <div className="bg-[#4A6741] rounded-lg p-3 space-y-2">
                <div className="flex justify-between items-start">
                  <div className="flex-1">
                    <div className="text-white font-medium text-sm">$10,000 Demo</div>
                    <div className="text-[#9BC5A2] text-xs">Basic Demo</div>
                  </div>
                  <span className="bg-green-500/20 text-green-400 px-2 py-1 rounded-full text-xs">
                    Active
                  </span>
                </div>
                <div className="grid grid-cols-2 gap-2 text-xs">
                  <div>
                    <div className="text-[#9BC5A2]">Duration</div>
                    <div className="text-white">30 Days</div>
                  </div>
                  <div>
                    <div className="text-[#9BC5A2]">Users</div>
                    <div className="text-white">1,281</div>
                  </div>
                  <div>
                    <div className="text-[#9BC5A2]">Conversion</div>
                    <div className="text-green-400">28.5%</div>
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

              {/* Mobile Card 2 */}
              <div className="bg-[#4A6741] rounded-lg p-3 space-y-2">
                <div className="flex justify-between items-start">
                  <div className="flex-1">
                    <div className="text-white font-medium text-sm">$50,000 Demo</div>
                    <div className="text-[#9BC5A2] text-xs">Standard Demo</div>
                  </div>
                  <span className="bg-green-500/20 text-green-400 px-2 py-1 rounded-full text-xs">
                    Active
                  </span>
                </div>
                <div className="grid grid-cols-2 gap-2 text-xs">
                  <div>
                    <div className="text-[#9BC5A2]">Duration</div>
                    <div className="text-white">60 Days</div>
                  </div>
                  <div>
                    <div className="text-[#9BC5A2]">Users</div>
                    <div className="text-white">996</div>
                  </div>
                  <div>
                    <div className="text-[#9BC5A2]">Conversion</div>
                    <div className="text-green-400">24.2%</div>
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
                    <div className="text-white font-medium text-sm">$100,000 Demo</div>
                    <div className="text-[#9BC5A2] text-xs">Premium Demo</div>
                  </div>
                  <span className="bg-green-500/20 text-green-400 px-2 py-1 rounded-full text-xs">
                    Active
                  </span>
                </div>
                <div className="grid grid-cols-2 gap-2 text-xs">
                  <div>
                    <div className="text-[#9BC5A2]">Duration</div>
                    <div className="text-white">90 Days</div>
                  </div>
                  <div>
                    <div className="text-[#9BC5A2]">Users</div>
                    <div className="text-white">427</div>
                  </div>
                  <div>
                    <div className="text-[#9BC5A2]">Conversion</div>
                    <div className="text-green-400">18.9%</div>
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

              {/* Mobile Card 4 */}
              <div className="bg-[#4A6741] rounded-lg p-3 space-y-2">
                <div className="flex justify-between items-start">
                  <div className="flex-1">
                    <div className="text-white font-medium text-sm">$500,000 Demo</div>
                    <div className="text-[#9BC5A2] text-xs">VIP Demo</div>
                  </div>
                  <span className="bg-yellow-500/20 text-yellow-400 px-2 py-1 rounded-full text-xs">
                    Limited
                  </span>
                </div>
                <div className="grid grid-cols-2 gap-2 text-xs">
                  <div>
                    <div className="text-[#9BC5A2]">Duration</div>
                    <div className="text-white">Unlimited</div>
                  </div>
                  <div>
                    <div className="text-[#9BC5A2]">Users</div>
                    <div className="text-white">143</div>
                  </div>
                  <div>
                    <div className="text-[#9BC5A2]">Conversion</div>
                    <div className="text-green-400">31.2%</div>
                  </div>
                </div>
                <div className="flex space-x-2 pt-2">
                  <button className="flex-1 text-blue-400 hover:text-blue-300 transition-colors px-2 py-1 bg-blue-900/20 rounded hover:bg-blue-900/30 text-xs">
                    Edit
                  </button>
                  <button className="flex-1 text-green-400 hover:text-green-300 transition-colors px-2 py-1 bg-green-900/20 rounded hover:bg-green-900/30 text-xs">
                    Enable
                  </button>
                </div>
              </div>
            </div>

            {/* Desktop Table View */}
            <div className="hidden lg:block overflow-x-auto">
              <table className="w-full">
                <thead>
                  <tr className="border-b border-[#4A6741]">
                    <th className="text-left text-[#9BC5A2] font-medium py-3">Amount (USD)</th>
                    <th className="text-left text-[#9BC5A2] font-medium py-3">Display Name</th>
                    <th className="text-left text-[#9BC5A2] font-medium py-3">Duration</th>
                    <th className="text-left text-[#9BC5A2] font-medium py-3">Users Count</th>
                    <th className="text-left text-[#9BC5A2] font-medium py-3">Conversion Rate</th>
                    <th className="text-left text-[#9BC5A2] font-medium py-3">Status</th>
                    <th className="text-left text-[#9BC5A2] font-medium py-3">Actions</th>
                  </tr>
                </thead>
                <tbody>
                  <tr className="border-b border-[#4A6741]/50">
                    <td className="text-white py-4">$10,000</td>
                    <td className="text-white py-4">Basic Demo</td>
                    <td className="text-white py-4">30 Days</td>
                    <td className="text-white py-4">1,281</td>
                    <td className="text-green-400 py-4">28.5%</td>
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
                    <td className="text-white py-4">$50,000</td>
                    <td className="text-white py-4">Standard Demo</td>
                    <td className="text-white py-4">60 Days</td>
                    <td className="text-white py-4">996</td>
                    <td className="text-green-400 py-4">24.2%</td>
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
                    <td className="text-white py-4">$100,000</td>
                    <td className="text-white py-4">Premium Demo</td>
                    <td className="text-white py-4">90 Days</td>
                    <td className="text-white py-4">427</td>
                    <td className="text-green-400 py-4">18.9%</td>
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
                  <tr>
                    <td className="text-white py-4">$500,000</td>
                    <td className="text-white py-4">VIP Demo</td>
                    <td className="text-white py-4">Unlimited</td>
                    <td className="text-white py-4">143</td>
                    <td className="text-green-400 py-4">31.2%</td>
                    <td className="py-4">
                      <span className="bg-yellow-500/20 text-yellow-400 px-2 py-1 rounded-full text-sm">
                        Limited
                      </span>
                    </td>
                    <td className="py-4">
                      <div className="flex space-x-2">
                        <button className="text-blue-400 hover:text-blue-300 transition-colors px-3 py-1 bg-blue-900/20 rounded hover:bg-blue-900/30 text-sm">
                          Edit
                        </button>
                        <button className="text-green-400 hover:text-green-300 transition-colors px-3 py-1 bg-green-900/20 rounded hover:bg-green-900/30 text-sm">
                          Enable
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

export default function AddAmountDemoPage() {
  return (
    <ProtectedRoute requiredRole="admin">
      <AddAmountDemoContent />
    </ProtectedRoute>
  );
}
