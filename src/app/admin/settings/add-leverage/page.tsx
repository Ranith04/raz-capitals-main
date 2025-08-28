'use client';

import AdminHeader from '@/components/AdminHeader';
import AdminSidebar from '@/components/AdminSidebar';
import ProtectedRoute from '@/components/ProtectedRoute';
import { useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';

function AddLeverageContent() {
  const router = useRouter();
  const [isMobileSidebarOpen, setIsMobileSidebarOpen] = useState(false);
  
  useEffect(() => {
    document.title = 'Add Leverage - RAZ CAPITALS';
  }, []);

  const toggleMobileSidebar = () => setIsMobileSidebarOpen(!isMobileSidebarOpen);
  const closeMobileSidebar = () => setIsMobileSidebarOpen(false);

  return (
    <div className="flex h-screen bg-[#9BC5A2] overflow-hidden">
      {/* Sidebar */}
      <AdminSidebar currentPage="add-leverage" isMobileOpen={isMobileSidebarOpen} onMobileClose={closeMobileSidebar} />

      {/* Main Content */}
      <div className="flex-1 flex flex-col">
        {/* Header */}
        <AdminHeader 
          title="Leverage Management"
          showRefreshButton={false}
          onMobileMenuToggle={toggleMobileSidebar}
        />

        {/* Add Leverage Content */}
        <div className="flex-1 p-2 xs:p-3 sm:p-4 md:p-6 lg:p-8 overflow-y-auto">
          {/* Page Title and Action Button */}
          <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-4 sm:mb-6 lg:mb-8 gap-3">
            <h1 className="text-[#0A2E1D] text-xl sm:text-2xl lg:text-3xl font-bold">Leverage Management</h1>
            <button className="w-full sm:w-auto px-4 sm:px-6 py-2 bg-[#2D4A32] text-white rounded-lg hover:bg-[#3A5A3F] transition-colors text-sm sm:text-base">
              Add New Leverage
            </button>
          </div>

          {/* Form and Statistics Grid */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 sm:gap-6 lg:gap-8 mb-6 sm:mb-8">
            {/* Add New Leverage Form */}
            <div className="bg-[#2D4A32] rounded-2xl p-3 sm:p-4 md:p-6">
              <h2 className="text-white text-base sm:text-lg lg:text-xl font-bold mb-4 sm:mb-6">Add New Leverage Option</h2>
              
              <div className="space-y-3 sm:space-y-4">
                <div>
                  <label className="text-[#9BC5A2] text-xs sm:text-sm font-medium mb-2 block">Leverage Ratio</label>
                  <input 
                    type="text" 
                    placeholder="e.g., 1:100, 1:500"
                    className="w-full bg-[#4A6741] text-white px-3 sm:px-4 py-2 rounded-lg border border-[#9BC5A2]/30 focus:border-[#9BC5A2] focus:outline-none placeholder-gray-400 text-sm sm:text-base"
                  />
                </div>
                
                <div>
                  <label className="text-[#9BC5A2] text-xs sm:text-sm font-medium mb-2 block">Numeric Value</label>
                  <input 
                    type="number" 
                    placeholder="e.g., 100, 500"
                    className="w-full bg-[#4A6741] text-white px-3 sm:px-4 py-2 rounded-lg border border-[#9BC5A2]/30 focus:border-[#9BC5A2] focus:outline-none placeholder-gray-400 text-sm sm:text-base"
                  />
                </div>
                
                <div>
                  <label className="text-[#9BC5A2] text-xs sm:text-sm font-medium mb-2 block">Account Types</label>
                  <div className="space-y-2">
                    <label className="flex items-center space-x-2">
                      <input type="checkbox" className="text-[#9BC5A2] bg-[#4A6741] border-[#9BC5A2]/30 rounded" />
                      <span className="text-white text-sm">Standard Account</span>
                    </label>
                    <label className="flex items-center space-x-2">
                      <input type="checkbox" className="text-[#9BC5A2] bg-[#4A6741] border-[#9BC5A2]/30 rounded" />
                      <span className="text-white text-sm">Premium Account</span>
                    </label>
                    <label className="flex items-center space-x-2">
                      <input type="checkbox" className="text-[#9BC5A2] bg-[#4A6741] border-[#9BC5A2]/30 rounded" />
                      <span className="text-white text-sm">VIP Account</span>
                    </label>
                  </div>
                </div>
                
                <div>
                  <label className="text-[#9BC5A2] text-xs sm:text-sm font-medium mb-2 block">Minimum Balance Required</label>
                  <input 
                    type="number" 
                    placeholder="Minimum balance in USD"
                    className="w-full bg-[#4A6741] text-white px-3 sm:px-4 py-2 rounded-lg border border-[#9BC5A2]/30 focus:border-[#9BC5A2] focus:outline-none placeholder-gray-400 text-sm sm:text-base"
                  />
                </div>
                
                <div>
                  <label className="text-[#9BC5A2] text-xs sm:text-sm font-medium mb-2 block">Risk Warning</label>
                  <textarea 
                    placeholder="Risk warning message for this leverage..."
                    rows={3}
                    className="w-full bg-[#4A6741] text-white px-3 sm:px-4 py-2 rounded-lg border border-[#9BC5A2]/30 focus:border-[#9BC5A2] focus:outline-none placeholder-gray-400 text-sm resize-none"
                  />
                </div>
                
                <div className="flex items-center space-x-2">
                  <input type="checkbox" className="text-[#9BC5A2] bg-[#4A6741] border-[#9BC5A2]/30 rounded" />
                  <span className="text-white text-sm">Enable for new accounts</span>
                </div>
                
                <button className="w-full px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors text-sm sm:text-base font-medium">
                  Add Leverage Option
                </button>
              </div>
            </div>

            {/* Leverage Statistics */}
            <div className="bg-[#2D4A32] rounded-2xl p-3 sm:p-4 md:p-6">
              <h2 className="text-white text-base sm:text-lg lg:text-xl font-bold mb-4 sm:mb-6">Leverage Usage Statistics</h2>
              
              <div className="space-y-3 sm:space-y-4">
                <div className="flex justify-between items-center p-3 bg-[#4A6741] rounded-lg">
                  <div className="flex-1 min-w-0">
                    <h3 className="text-white font-medium text-sm sm:text-base truncate">1:50 Leverage</h3>
                    <p className="text-[#9BC5A2] text-xs sm:text-sm">Most conservative option</p>
                  </div>
                  <span className="text-white text-base sm:text-lg font-bold ml-2">23%</span>
                </div>
                
                <div className="flex justify-between items-center p-3 bg-[#4A6741] rounded-lg">
                  <div className="flex-1 min-w-0">
                    <h3 className="text-white font-medium text-sm sm:text-base truncate">1:100 Leverage</h3>
                    <p className="text-[#9BC5A2] text-xs sm:text-sm">Standard option</p>
                  </div>
                  <span className="text-white text-base sm:text-lg font-bold ml-2">45%</span>
                </div>
                
                <div className="flex justify-between items-center p-3 bg-[#4A6741] rounded-lg">
                  <div className="flex-1 min-w-0">
                    <h3 className="text-white font-medium text-sm sm:text-base truncate">1:200 Leverage</h3>
                    <p className="text-[#9BC5A2] text-xs sm:text-sm">Advanced option</p>
                  </div>
                  <span className="text-white text-base sm:text-lg font-bold ml-2">22%</span>
                </div>
                
                <div className="flex justify-between items-center p-3 bg-[#4A6741] rounded-lg">
                  <div className="flex-1 min-w-0">
                    <h3 className="text-white font-medium text-sm sm:text-base truncate">1:500 Leverage</h3>
                    <p className="text-[#9BC5A2] text-xs sm:text-sm">High risk option</p>
                  </div>
                  <span className="text-white text-base sm:text-lg font-bold ml-2">10%</span>
                </div>
              </div>
            </div>
          </div>

          {/* Current Leverage Options Table */}
          <div className="bg-[#2D4A32] rounded-2xl p-3 sm:p-4 md:p-6">
            <h2 className="text-white text-base sm:text-lg lg:text-xl font-bold mb-4 sm:mb-6">Current Leverage Options</h2>
            
            {/* Mobile Card View */}
            <div className="lg:hidden space-y-3">
              {/* Mobile Card 1 */}
              <div className="bg-[#4A6741] rounded-lg p-3 space-y-2">
                <div className="flex justify-between items-start">
                  <div className="flex-1">
                    <div className="text-white font-medium text-sm">1:50 Leverage</div>
                    <div className="text-[#9BC5A2] text-xs">Numeric: 50</div>
                  </div>
                  <span className="bg-green-500/20 text-green-400 px-2 py-1 rounded-full text-xs">
                    Active
                  </span>
                </div>
                <div className="grid grid-cols-2 gap-2 text-xs">
                  <div>
                    <div className="text-[#9BC5A2]">Account Types</div>
                    <div className="text-white">All Types</div>
                  </div>
                  <div>
                    <div className="text-[#9BC5A2]">Min Balance</div>
                    <div className="text-white">$100</div>
                  </div>
                  <div>
                    <div className="text-[#9BC5A2]">Users</div>
                    <div className="text-white">47</div>
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
                    <div className="text-white font-medium text-sm">1:100 Leverage</div>
                    <div className="text-[#9BC5A2] text-xs">Numeric: 100</div>
                  </div>
                  <span className="bg-green-500/20 text-green-400 px-2 py-1 rounded-full text-xs">
                    Active
                  </span>
                </div>
                <div className="grid grid-cols-2 gap-2 text-xs">
                  <div>
                    <div className="text-[#9BC5A2]">Account Types</div>
                    <div className="text-white">Standard, Premium</div>
                  </div>
                  <div>
                    <div className="text-[#9BC5A2]">Min Balance</div>
                    <div className="text-white">$500</div>
                  </div>
                  <div>
                    <div className="text-[#9BC5A2]">Users</div>
                    <div className="text-white">89</div>
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
                    <div className="text-white font-medium text-sm">1:200 Leverage</div>
                    <div className="text-[#9BC5A2] text-xs">Numeric: 200</div>
                  </div>
                  <span className="bg-green-500/20 text-green-400 px-2 py-1 rounded-full text-xs">
                    Active
                  </span>
                </div>
                <div className="grid grid-cols-2 gap-2 text-xs">
                  <div>
                    <div className="text-[#9BC5A2]">Account Types</div>
                    <div className="text-white">Premium, VIP</div>
                  </div>
                  <div>
                    <div className="text-[#9BC5A2]">Min Balance</div>
                    <div className="text-white">$1,000</div>
                  </div>
                  <div>
                    <div className="text-[#9BC5A2]">Users</div>
                    <div className="text-white">43</div>
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
                    <div className="text-white font-medium text-sm">1:500 Leverage</div>
                    <div className="text-[#9BC5A2] text-xs">Numeric: 500</div>
                  </div>
                  <span className="bg-yellow-500/20 text-yellow-400 px-2 py-1 rounded-full text-xs">
                    Restricted
                  </span>
                </div>
                <div className="grid grid-cols-2 gap-2 text-xs">
                  <div>
                    <div className="text-[#9BC5A2]">Account Types</div>
                    <div className="text-white">VIP Only</div>
                  </div>
                  <div>
                    <div className="text-[#9BC5A2]">Min Balance</div>
                    <div className="text-white">$5,000</div>
                  </div>
                  <div>
                    <div className="text-[#9BC5A2]">Users</div>
                    <div className="text-white">19</div>
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
                    <th className="text-left text-[#9BC5A2] font-medium py-3">Leverage Ratio</th>
                    <th className="text-left text-[#9BC5A2] font-medium py-3">Numeric Value</th>
                    <th className="text-left text-[#9BC5A2] font-medium py-3">Account Types</th>
                    <th className="text-left text-[#9BC5A2] font-medium py-3">Min Balance</th>
                    <th className="text-left text-[#9BC5A2] font-medium py-3">Users Count</th>
                    <th className="text-left text-[#9BC5A2] font-medium py-3">Status</th>
                    <th className="text-left text-[#9BC5A2] font-medium py-3">Actions</th>
                  </tr>
                </thead>
                <tbody>
                  <tr className="border-b border-[#4A6741]/50">
                    <td className="text-white py-4">1:50</td>
                    <td className="text-white py-4">50</td>
                    <td className="text-white py-4">All Types</td>
                    <td className="text-white py-4">$100</td>
                    <td className="text-white py-4">47</td>
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
                    <td className="text-white py-4">1:100</td>
                    <td className="text-white py-4">100</td>
                    <td className="text-white py-4">Standard, Premium</td>
                    <td className="text-white py-4">$500</td>
                    <td className="text-white py-4">89</td>
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
                    <td className="text-white py-4">1:200</td>
                    <td className="text-white py-4">200</td>
                    <td className="text-white py-4">Premium, VIP</td>
                    <td className="text-white py-4">$1,000</td>
                    <td className="text-white py-4">43</td>
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
                    <td className="text-white py-4">1:500</td>
                    <td className="text-white py-4">500</td>
                    <td className="text-white py-4">VIP Only</td>
                    <td className="text-white py-4">$5,000</td>
                    <td className="text-white py-4">19</td>
                    <td className="py-4">
                      <span className="bg-yellow-500/20 text-yellow-400 px-2 py-1 rounded-full text-sm">
                        Restricted
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

export default function AddLeveragePage() {
  return (
    <ProtectedRoute requiredRole="admin">
      <AddLeverageContent />
    </ProtectedRoute>
  );
}
