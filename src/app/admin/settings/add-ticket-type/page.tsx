'use client';

import AdminHeader from '@/components/AdminHeader';
import AdminSidebar from '@/components/AdminSidebar';
import ProtectedRoute from '@/components/ProtectedRoute';
import { useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';

function AddTicketTypeContent() {
  const router = useRouter();
  const [isMobileSidebarOpen, setIsMobileSidebarOpen] = useState(false);
  
  useEffect(() => {
    document.title = 'Add Ticket Type - RAZ CAPITALS';
  }, []);

  const toggleMobileSidebar = () => setIsMobileSidebarOpen(!isMobileSidebarOpen);
  const closeMobileSidebar = () => setIsMobileSidebarOpen(false);

  return (
    <div className="flex h-screen bg-[#9BC5A2] overflow-hidden">
      {/* Sidebar */}
      <AdminSidebar currentPage="add-ticket-type" isMobileOpen={isMobileSidebarOpen} onMobileClose={closeMobileSidebar} />

      {/* Main Content */}
      <div className="flex-1 flex flex-col">
        {/* Header */}
        <AdminHeader 
          title="Ticket Type Management"
          showRefreshButton={false}
          onMobileMenuToggle={toggleMobileSidebar}
        />

        {/* Add Ticket Type Content */}
        <div className="flex-1 p-2 xs:p-3 sm:p-4 md:p-6 lg:p-8 overflow-y-auto">
          {/* Page Title and Action Button */}
          <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-4 sm:mb-6 lg:mb-8 gap-3">
            <h1 className="text-[#0A2E1D] text-xl sm:text-2xl lg:text-3xl font-bold">Ticket Type Management</h1>
            <button className="w-full sm:w-auto px-4 sm:px-6 py-2 bg-[#2D4A32] text-white rounded-lg hover:bg-[#3A5A3F] transition-colors text-sm sm:text-base">
              Add New Type
            </button>
          </div>

          {/* Form and Statistics Grid */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 sm:gap-6 lg:gap-8 mb-6 sm:mb-8">
            {/* Add New Ticket Type Form */}
            <div className="bg-[#2D4A32] rounded-2xl p-3 sm:p-4 md:p-6">
              <h2 className="text-white text-base sm:text-lg lg:text-xl font-bold mb-4 sm:mb-6">Add New Ticket Type</h2>
              
              <div className="space-y-3 sm:space-y-4">
                <div>
                  <label className="text-[#9BC5A2] text-xs sm:text-sm font-medium mb-2 block">Type Name</label>
                  <input 
                    type="text" 
                    placeholder="e.g., Account Issues, Trading Problems"
                    className="w-full bg-[#4A6741] text-white px-3 sm:px-4 py-2 rounded-lg border border-[#9BC5A2]/30 focus:border-[#9BC5A2] focus:outline-none placeholder-gray-400 text-sm sm:text-base"
                  />
                </div>
                
                <div>
                  <label className="text-[#9BC5A2] text-xs sm:text-sm font-medium mb-2 block">Category</label>
                  <select className="w-full bg-[#4A6741] text-white px-3 sm:px-4 py-2 rounded-lg border border-[#9BC5A2]/30 focus:border-[#9BC5A2] focus:outline-none text-sm sm:text-base">
                    <option>Technical</option>
                    <option>Financial</option>
                    <option>Account Related</option>
                    <option>Trading Related</option>
                    <option>General Support</option>
                    <option>Complaints</option>
                  </select>
                </div>
                
                <div>
                  <label className="text-[#9BC5A2] text-xs sm:text-sm font-medium mb-2 block">Default Priority</label>
                  <select className="w-full bg-[#4A6741] text-white px-3 sm:px-4 py-2 rounded-lg border border-[#9BC5A2]/30 focus:border-[#9BC5A2] focus:outline-none text-sm sm:text-base">
                    <option>Low</option>
                    <option>Medium</option>
                    <option>High</option>
                    <option>Critical</option>
                  </select>
                </div>
                
                <div>
                  <label className="text-[#9BC5A2] text-xs sm:text-sm font-medium mb-2 block">SLA Response Time (Hours)</label>
                  <input 
                    type="number" 
                    placeholder="24"
                    className="w-full bg-[#4A6741] text-white px-3 sm:px-4 py-2 rounded-lg border border-[#9BC5A2]/30 focus:border-[#9BC5A2] focus:outline-none placeholder-gray-400 text-sm sm:text-base"
                  />
                </div>
                
                <div>
                  <label className="text-[#9BC5A2] text-xs sm:text-sm font-medium mb-2 block">Auto-Assignment Department</label>
                  <select className="w-full bg-[#4A6741] text-white px-3 sm:px-4 py-2 rounded-lg border border-[#9BC5A2]/30 focus:border-[#9BC5A2] focus:outline-none text-sm sm:text-base">
                    <option>Support Team</option>
                    <option>Technical Team</option>
                    <option>Accounts Team</option>
                    <option>Trading Desk</option>
                    <option>Management</option>
                  </select>
                </div>
                
                <div>
                  <label className="text-[#9BC5A2] text-xs sm:text-sm font-medium mb-2 block">Description</label>
                  <textarea 
                    placeholder="Describe when this ticket type should be used..."
                    rows={3}
                    className="w-full bg-[#4A6741] text-white px-3 sm:px-4 py-2 rounded-lg border border-[#9BC5A2]/30 focus:border-[#9BC5A2] focus:outline-none placeholder-gray-400 text-sm resize-none"
                  />
                </div>
                
                <div className="flex items-center space-x-2">
                  <input type="checkbox" className="text-[#9BC5A2] bg-[#4A6741] border-[#9BC5A2]/30 rounded" />
                  <span className="text-white text-sm">Available for customer creation</span>
                </div>
                
                <div className="flex items-center space-x-2">
                  <input type="checkbox" className="text-[#9BC5A2] bg-[#4A6741] border-[#9BC5A2]/30 rounded" />
                  <span className="text-white text-sm">Requires email notification</span>
                </div>
                
                <button className="w-full px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors text-sm sm:text-base font-medium">
                  Add Ticket Type
                </button>
              </div>
            </div>

            {/* Ticket Type Statistics */}
            <div className="bg-[#2D4A32] rounded-2xl p-3 sm:p-4 md:p-6">
              <h2 className="text-white text-base sm:text-lg lg:text-xl font-bold mb-4 sm:mb-6">Type Usage Statistics</h2>
              
              <div className="space-y-3 sm:space-y-4">
                <div className="flex justify-between items-center p-3 bg-[#4A6741] rounded-lg">
                  <div className="flex-1 min-w-0">
                    <h3 className="text-white font-medium text-sm sm:text-base truncate">Technical Issues</h3>
                    <p className="text-[#9BC5A2] text-xs sm:text-sm">Platform & trading issues</p>
                  </div>
                  <span className="text-white text-base sm:text-lg font-bold ml-2">34%</span>
                </div>
                
                <div className="flex justify-between items-center p-3 bg-[#4A6741] rounded-lg">
                  <div className="flex-1 min-w-0">
                    <h3 className="text-white font-medium text-sm sm:text-base truncate">Account Problems</h3>
                    <p className="text-[#9BC5A2] text-xs sm:text-sm">Login, verification, etc.</p>
                  </div>
                  <span className="text-white text-base sm:text-lg font-bold ml-2">28%</span>
                </div>
                
                <div className="flex justify-between items-center p-3 bg-[#4A6741] rounded-lg">
                  <div className="flex-1 min-w-0">
                    <h3 className="text-white font-medium text-sm sm:text-base truncate">Payment Issues</h3>
                    <p className="text-[#9BC5A2] text-xs sm:text-sm">Deposits & withdrawals</p>
                  </div>
                  <span className="text-white text-base sm:text-lg font-bold ml-2">23%</span>
                </div>
                
                <div className="flex justify-between items-center p-3 bg-[#4A6741] rounded-lg">
                  <div className="flex-1 min-w-0">
                    <h3 className="text-white font-medium text-sm sm:text-base truncate">General Inquiry</h3>
                    <p className="text-[#9BC5A2] text-xs sm:text-sm">Questions & information</p>
                  </div>
                  <span className="text-white text-base sm:text-lg font-bold ml-2">15%</span>
                </div>
              </div>
            </div>
          </div>

          {/* Current Ticket Types Table */}
          <div className="bg-[#2D4A32] rounded-2xl p-3 sm:p-4 md:p-6">
            <h2 className="text-white text-base sm:text-lg lg:text-xl font-bold mb-4 sm:mb-6">Current Ticket Types</h2>
            
            {/* Mobile Card View */}
            <div className="lg:hidden space-y-3">
              {/* Mobile Card 1 */}
              <div className="bg-[#4A6741] rounded-lg p-3 space-y-2">
                <div className="flex justify-between items-start">
                  <div className="flex-1">
                    <div className="text-white font-medium text-sm">Technical Issue</div>
                    <div className="text-[#9BC5A2] text-xs">Technical</div>
                  </div>
                  <span className="bg-orange-500/20 text-orange-400 px-2 py-1 rounded-full text-xs">
                    Medium
                  </span>
                </div>
                <div className="grid grid-cols-2 gap-2 text-xs">
                  <div>
                    <div className="text-[#9BC5A2]">SLA (Hours)</div>
                    <div className="text-white">24</div>
                  </div>
                  <div>
                    <div className="text-[#9BC5A2]">Department</div>
                    <div className="text-white">Technical Team</div>
                  </div>
                  <div>
                    <div className="text-[#9BC5A2]">Tickets</div>
                    <div className="text-white">89</div>
                  </div>
                  <div>
                    <div className="text-[#9BC5A2]">Status</div>
                    <span className="bg-green-500/20 text-green-400 px-2 py-1 rounded-full text-xs">
                      Active
                    </span>
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
                    <div className="text-white font-medium text-sm">Account Problem</div>
                    <div className="text-[#9BC5A2] text-xs">Account Related</div>
                  </div>
                  <span className="bg-red-500/20 text-red-400 px-2 py-1 rounded-full text-xs">
                    High
                  </span>
                </div>
                <div className="grid grid-cols-2 gap-2 text-xs">
                  <div>
                    <div className="text-[#9BC5A2]">SLA (Hours)</div>
                    <div className="text-white">12</div>
                  </div>
                  <div>
                    <div className="text-[#9BC5A2]">Department</div>
                    <div className="text-white">Accounts Team</div>
                  </div>
                  <div>
                    <div className="text-[#9BC5A2]">Tickets</div>
                    <div className="text-white">67</div>
                  </div>
                  <div>
                    <div className="text-[#9BC5A2]">Status</div>
                    <span className="bg-green-500/20 text-green-400 px-2 py-1 rounded-full text-xs">
                      Active
                    </span>
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
                    <div className="text-white font-medium text-sm">Payment Problem</div>
                    <div className="text-[#9BC5A2] text-xs">Financial</div>
                  </div>
                  <span className="bg-red-500/20 text-red-400 px-2 py-1 rounded-full text-xs">
                    High
                  </span>
                </div>
                <div className="grid grid-cols-2 gap-2 text-xs">
                  <div>
                    <div className="text-[#9BC5A2]">SLA (Hours)</div>
                    <div className="text-white">8</div>
                  </div>
                  <div>
                    <div className="text-[#9BC5A2]">Department</div>
                    <div className="text-white">Accounts Team</div>
                  </div>
                  <div>
                    <div className="text-[#9BC5A2]">Tickets</div>
                    <div className="text-white">54</div>
                  </div>
                  <div>
                    <div className="text-[#9BC5A2]">Status</div>
                    <span className="bg-green-500/20 text-green-400 px-2 py-1 rounded-full text-xs">
                      Active
                    </span>
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
                    <div className="text-white font-medium text-sm">General Inquiry</div>
                    <div className="text-[#9BC5A2] text-xs">General Support</div>
                  </div>
                  <span className="bg-blue-500/20 text-blue-400 px-2 py-1 rounded-full text-xs">
                    Low
                  </span>
                </div>
                <div className="grid grid-cols-2 gap-2 text-xs">
                  <div>
                    <div className="text-[#9BC5A2]">SLA (Hours)</div>
                    <div className="text-white">48</div>
                  </div>
                  <div>
                    <div className="text-[#9BC5A2]">Department</div>
                    <div className="text-white">Support Team</div>
                  </div>
                  <div>
                    <div className="text-[#9BC5A2]">Tickets</div>
                    <div className="text-white">36</div>
                  </div>
                  <div>
                    <div className="text-[#9BC5A2]">Status</div>
                    <span className="bg-green-500/20 text-green-400 px-2 py-1 rounded-full text-xs">
                      Active
                    </span>
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
            </div>

            {/* Desktop Table View */}
            <div className="hidden lg:block overflow-x-auto">
              <table className="w-full">
                <thead>
                  <tr className="border-b border-[#4A6741]">
                    <th className="text-left text-[#9BC5A2] font-medium py-3">Type Name</th>
                    <th className="text-left text-[#9BC5A2] font-medium py-3">Category</th>
                    <th className="text-left text-[#9BC5A2] font-medium py-3">Default Priority</th>
                    <th className="text-left text-[#9BC5A2] font-medium py-3">SLA (Hours)</th>
                    <th className="text-left text-[#9BC5A2] font-medium py-3">Department</th>
                    <th className="text-left text-[#9BC5A2] font-medium py-3">Tickets Count</th>
                    <th className="text-left text-[#9BC5A2] font-medium py-3">Status</th>
                    <th className="text-left text-[#9BC5A2] font-medium py-3">Actions</th>
                  </tr>
                </thead>
                <tbody>
                  <tr className="border-b border-[#4A6741]/50">
                    <td className="text-white py-4">Technical Issue</td>
                    <td className="text-white py-4">Technical</td>
                    <td className="py-4">
                      <span className="bg-orange-500/20 text-orange-400 px-2 py-1 rounded-full text-sm">
                        Medium
                      </span>
                    </td>
                    <td className="text-white py-4">24</td>
                    <td className="text-white py-4">Technical Team</td>
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
                    <td className="text-white py-4">Account Problem</td>
                    <td className="text-white py-4">Account Related</td>
                    <td className="py-4">
                      <span className="bg-red-500/20 text-red-400 px-2 py-1 rounded-full text-sm">
                        High
                      </span>
                    </td>
                    <td className="text-white py-4">12</td>
                    <td className="text-white py-4">Accounts Team</td>
                    <td className="text-white py-4">67</td>
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
                    <td className="text-white py-4">Payment Problem</td>
                    <td className="text-white py-4">Financial</td>
                    <td className="py-4">
                      <span className="bg-red-500/20 text-red-400 px-2 py-1 rounded-full text-sm">
                        High
                      </span>
                    </td>
                    <td className="text-white py-4">8</td>
                    <td className="text-white py-4">Accounts Team</td>
                    <td className="text-white py-4">54</td>
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
                    <td className="text-white py-4">General Inquiry</td>
                    <td className="text-white py-4">General Support</td>
                    <td className="py-4">
                      <span className="bg-blue-500/20 text-blue-400 px-2 py-1 rounded-full text-sm">
                        Low
                      </span>
                    </td>
                    <td className="text-white py-4">48</td>
                    <td className="text-white py-4">Support Team</td>
                    <td className="text-white py-4">36</td>
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
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default function AddTicketTypePage() {
  return (
    <ProtectedRoute requiredRole="admin">
      <AddTicketTypeContent />
    </ProtectedRoute>
  );
}
