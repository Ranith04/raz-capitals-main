'use client';

import AdminSidebar from '@/components/AdminSidebar';
import ProtectedRoute from '@/components/ProtectedRoute';
import { useRouter } from 'next/navigation';
import { useEffect } from 'react';

function SupportTicketsContent() {
  const router = useRouter();
  
  useEffect(() => {
    document.title = 'Support Tickets - RAZ CAPITALS';
  }, []);

  return (
    <div className="flex h-screen bg-[#9BC5A2] overflow-hidden">
      {/* Sidebar */}
      <AdminSidebar currentPage="support-tickets" />

      {/* Main Content */}
      <div className="flex-1 flex flex-col">
        {/* Header */}
        <div className="bg-[#0A2E1D] p-4 flex justify-between items-start">
          {/* Left Side - Document Icon and Refresh Button */}
          <div className="flex flex-col space-y-2">
            {/* Document Icon Button */}
                      <div 
            className="w-12 h-12 bg-[#2D4A32] rounded-lg flex items-center justify-center cursor-pointer hover:bg-[#3A5A3F] transition-all duration-300 hover:scale-110 hover:shadow-lg transform"
            onClick={() => router.push('/admin/dashboard')}
          >
            <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
            </svg>
          </div>
            
            {/* Refresh Button */}
            <button className="bg-[#2D4A32] text-white px-4 py-2 rounded-lg hover:bg-[#3A5A3F] transition-colors flex items-center space-x-2">
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15" />
              </svg>
              <span>Refresh</span>
            </button>
          </div>

          {/* Right Side - Admin Section */}
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

        {/* Support Tickets Content */}
        <div className="flex-1 p-8 overflow-y-auto">
          <div className="flex justify-between items-center mb-8">
            <h1 className="text-[#0A2E1D] text-3xl font-bold">Support Tickets</h1>
            <button className="px-6 py-2 bg-[#2D4A32] text-white rounded-lg hover:bg-[#3A5A3F] transition-colors">
              Create New Ticket
            </button>
          </div>

          {/* Statistics Cards */}
          <div className="grid grid-cols-5 gap-6 mb-8">
            <div className="bg-[#2D4A32] rounded-2xl p-6 text-center">
              <h3 className="text-[#9BC5A2] text-sm font-medium mb-2">Total Tickets</h3>
              <p className="text-white text-2xl font-bold">234</p>
            </div>
            <div className="bg-[#2D4A32] rounded-2xl p-6 text-center">
              <h3 className="text-[#9BC5A2] text-sm font-medium mb-2">Open Tickets</h3>
              <p className="text-red-400 text-2xl font-bold">45</p>
            </div>
            <div className="bg-[#2D4A32] rounded-2xl p-6 text-center">
              <h3 className="text-[#9BC5A2] text-sm font-medium mb-2">In Progress</h3>
              <p className="text-yellow-400 text-2xl font-bold">28</p>
            </div>
            <div className="bg-[#2D4A32] rounded-2xl p-6 text-center">
              <h3 className="text-[#9BC5A2] text-sm font-medium mb-2">Resolved</h3>
              <p className="text-green-400 text-2xl font-bold">161</p>
            </div>
            <div className="bg-[#2D4A32] rounded-2xl p-6 text-center">
              <h3 className="text-[#9BC5A2] text-sm font-medium mb-2">Avg Response</h3>
              <p className="text-white text-2xl font-bold">2.4h</p>
            </div>
          </div>

          {/* Quick Actions */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-8">
            {/* Create New Ticket */}
            <div className="bg-[#2D4A32] rounded-2xl p-6">
              <h2 className="text-white text-xl font-bold mb-6">Create New Ticket</h2>
              
              <div className="space-y-4">
                <div>
                  <label className="text-[#9BC5A2] text-sm font-medium mb-2 block">User Account</label>
                  <select className="w-full bg-[#4A6741] text-white px-4 py-2 rounded-lg border border-[#9BC5A2]/30 focus:border-[#9BC5A2] focus:outline-none">
                    <option>Select User</option>
                    <option>Abdul Khadar Ishak (#LIVE001)</option>
                    <option>Sarah Johnson (#LIVE002)</option>
                    <option>Michael Chen (#LIVE003)</option>
                  </select>
                </div>
                
                <div>
                  <label className="text-[#9BC5A2] text-sm font-medium mb-2 block">Ticket Type</label>
                  <select className="w-full bg-[#4A6741] text-white px-4 py-2 rounded-lg border border-[#9BC5A2]/30 focus:border-[#9BC5A2] focus:outline-none">
                    <option>Technical Issue</option>
                    <option>Account Problem</option>
                    <option>Trading Issue</option>
                    <option>Payment Problem</option>
                    <option>General Inquiry</option>
                    <option>Complaint</option>
                  </select>
                </div>
                
                <div>
                  <label className="text-[#9BC5A2] text-sm font-medium mb-2 block">Priority</label>
                  <select className="w-full bg-[#4A6741] text-white px-4 py-2 rounded-lg border border-[#9BC5A2]/30 focus:border-[#9BC5A2] focus:outline-none">
                    <option>Low</option>
                    <option>Medium</option>
                    <option>High</option>
                    <option>Critical</option>
                  </select>
                </div>
                
                <div>
                  <label className="text-[#9BC5A2] text-sm font-medium mb-2 block">Subject</label>
                  <input 
                    type="text" 
                    placeholder="Ticket subject..."
                    className="w-full bg-[#4A6741] text-white px-4 py-2 rounded-lg border border-[#9BC5A2]/30 focus:border-[#9BC5A2] focus:outline-none placeholder-gray-400"
                  />
                </div>
                
                <div>
                  <label className="text-[#9BC5A2] text-sm font-medium mb-2 block">Description</label>
                  <textarea 
                    placeholder="Ticket description..."
                    rows={3}
                    className="w-full bg-[#4A6741] text-white px-4 py-2 rounded-lg border border-[#9BC5A2]/30 focus:border-[#9BC5A2] focus:outline-none placeholder-gray-400"
                  />
                </div>
                
                <button className="w-full px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors">
                  Create Ticket
                </button>
              </div>
            </div>

            {/* Ticket Status Overview */}
            <div className="bg-[#2D4A32] rounded-2xl p-6">
              <h2 className="text-white text-xl font-bold mb-6">Ticket Status Overview</h2>
              
              <div className="space-y-4">
                <div className="flex justify-between items-center p-3 bg-[#4A6741] rounded-lg">
                  <div>
                    <h3 className="text-white font-medium">High Priority</h3>
                    <p className="text-[#9BC5A2] text-sm">Needs immediate attention</p>
                  </div>
                  <span className="text-red-400 text-2xl font-bold">12</span>
                </div>
                
                <div className="flex justify-between items-center p-3 bg-[#4A6741] rounded-lg">
                  <div>
                    <h3 className="text-white font-medium">Overdue Tickets</h3>
                    <p className="text-[#9BC5A2] text-sm">Past response time</p>
                  </div>
                  <span className="text-orange-400 text-2xl font-bold">7</span>
                </div>
                
                <div className="flex justify-between items-center p-3 bg-[#4A6741] rounded-lg">
                  <div>
                    <h3 className="text-white font-medium">Awaiting Response</h3>
                    <p className="text-[#9BC5A2] text-sm">Customer reply needed</p>
                  </div>
                  <span className="text-yellow-400 text-2xl font-bold">19</span>
                </div>
                
                <div className="flex justify-between items-center p-3 bg-[#4A6741] rounded-lg">
                  <div>
                    <h3 className="text-white font-medium">Today&apos;s Resolved</h3>
                    <p className="text-[#9BC5A2] text-sm">Closed today</p>
                  </div>
                  <span className="text-green-400 text-2xl font-bold">15</span>
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
                  placeholder="Ticket ID, User, Subject..."
                  className="w-full bg-[#4A6741] text-white px-4 py-2 rounded-lg border border-[#9BC5A2]/30 focus:border-[#9BC5A2] focus:outline-none placeholder-gray-400"
                />
              </div>
              <div>
                <label className="text-white text-sm font-medium mb-2 block">Status</label>
                <select className="w-full bg-[#4A6741] text-white px-4 py-2 rounded-lg border border-[#9BC5A2]/30 focus:border-[#9BC5A2] focus:outline-none">
                  <option>All Status</option>
                  <option>Open</option>
                  <option>In Progress</option>
                  <option>Awaiting Response</option>
                  <option>Resolved</option>
                  <option>Closed</option>
                </select>
              </div>
              <div>
                <label className="text-white text-sm font-medium mb-2 block">Priority</label>
                <select className="w-full bg-[#4A6741] text-white px-4 py-2 rounded-lg border border-[#9BC5A2]/30 focus:border-[#9BC5A2] focus:outline-none">
                  <option>All Priorities</option>
                  <option>Critical</option>
                  <option>High</option>
                  <option>Medium</option>
                  <option>Low</option>
                </select>
              </div>
              <div>
                <label className="text-white text-sm font-medium mb-2 block">Type</label>
                <select className="w-full bg-[#4A6741] text-white px-4 py-2 rounded-lg border border-[#9BC5A2]/30 focus:border-[#9BC5A2] focus:outline-none">
                  <option>All Types</option>
                  <option>Technical Issue</option>
                  <option>Account Problem</option>
                  <option>Trading Issue</option>
                  <option>Payment Problem</option>
                </select>
              </div>
              <div>
                <label className="text-white text-sm font-medium mb-2 block">Date</label>
                <input 
                  type="date" 
                  className="w-full bg-[#4A6741] text-white px-4 py-2 rounded-lg border border-[#9BC5A2]/30 focus:border-[#9BC5A2] focus:outline-none"
                />
              </div>
            </div>
          </div>

          {/* Support Tickets Table */}
          <div className="bg-[#2D4A32] rounded-2xl p-6">
            <h2 className="text-white text-xl font-bold mb-6">Recent Support Tickets</h2>
            
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead>
                  <tr className="border-b border-[#4A6741]">
                    <th className="text-left text-[#9BC5A2] font-medium py-3">Ticket ID</th>
                    <th className="text-left text-[#9BC5A2] font-medium py-3">User</th>
                    <th className="text-left text-[#9BC5A2] font-medium py-3">Subject</th>
                    <th className="text-left text-[#9BC5A2] font-medium py-3">Type</th>
                    <th className="text-left text-[#9BC5A2] font-medium py-3">Priority</th>
                    <th className="text-left text-[#9BC5A2] font-medium py-3">Status</th>
                    <th className="text-left text-[#9BC5A2] font-medium py-3">Created</th>
                    <th className="text-left text-[#9BC5A2] font-medium py-3">Actions</th>
                  </tr>
                </thead>
                <tbody>
                  <tr className="border-b border-[#4A6741]/50">
                    <td className="text-white py-4">#TKT001</td>
                    <td className="text-white py-4">Abdul Khadar Ishak</td>
                    <td className="text-white py-4">Unable to withdraw funds</td>
                    <td className="text-white py-4">Payment Problem</td>
                    <td className="py-4">
                      <span className="bg-red-500/20 text-red-400 px-2 py-1 rounded-full text-sm">
                        High
                      </span>
                    </td>
                    <td className="py-4">
                      <span className="bg-yellow-500/20 text-yellow-400 px-2 py-1 rounded-full text-sm">
                        In Progress
                      </span>
                    </td>
                    <td className="text-white py-4">Jan 6, 2025</td>
                    <td className="py-4">
                      <div className="flex space-x-2">
                        <button className="text-[#9BC5A2] hover:text-white transition-colors px-3 py-1 bg-[#4A6741] rounded hover:bg-[#3A5A3F] text-sm">
                          View
                        </button>
                        <button className="text-blue-400 hover:text-blue-300 transition-colors px-3 py-1 bg-blue-900/20 rounded hover:bg-blue-900/30 text-sm">
                          Reply
                        </button>
                      </div>
                    </td>
                  </tr>
                  <tr className="border-b border-[#4A6741]/50">
                    <td className="text-white py-4">#TKT002</td>
                    <td className="text-white py-4">Sarah Johnson</td>
                    <td className="text-white py-4">Platform login issues</td>
                    <td className="text-white py-4">Technical Issue</td>
                    <td className="py-4">
                      <span className="bg-orange-500/20 text-orange-400 px-2 py-1 rounded-full text-sm">
                        Medium
                      </span>
                    </td>
                    <td className="py-4">
                      <span className="bg-red-500/20 text-red-400 px-2 py-1 rounded-full text-sm">
                        Open
                      </span>
                    </td>
                    <td className="text-white py-4">Jan 6, 2025</td>
                    <td className="py-4">
                      <div className="flex space-x-2">
                        <button className="text-green-400 hover:text-green-300 transition-colors px-3 py-1 bg-green-900/20 rounded hover:bg-green-900/30 text-sm">
                          Assign
                        </button>
                        <button className="text-[#9BC5A2] hover:text-white transition-colors px-3 py-1 bg-[#4A6741] rounded hover:bg-[#3A5A3F] text-sm">
                          View
                        </button>
                      </div>
                    </td>
                  </tr>
                  <tr className="border-b border-[#4A6741]/50">
                    <td className="text-white py-4">#TKT003</td>
                    <td className="text-white py-4">Michael Chen</td>
                    <td className="text-white py-4">Account verification help</td>
                    <td className="text-white py-4">Account Problem</td>
                    <td className="py-4">
                      <span className="bg-blue-500/20 text-blue-400 px-2 py-1 rounded-full text-sm">
                        Low
                      </span>
                    </td>
                    <td className="py-4">
                      <span className="bg-green-500/20 text-green-400 px-2 py-1 rounded-full text-sm">
                        Resolved
                      </span>
                    </td>
                    <td className="text-white py-4">Jan 5, 2025</td>
                    <td className="py-4">
                      <div className="flex space-x-2">
                        <button className="text-[#9BC5A2] hover:text-white transition-colors px-3 py-1 bg-[#4A6741] rounded hover:bg-[#3A5A3F] text-sm">
                          View
                        </button>
                      </div>
                    </td>
                  </tr>
                  <tr>
                    <td className="text-white py-4">#TKT004</td>
                    <td className="text-white py-4">Emma Davis</td>
                    <td className="text-white py-4">Trading platform error</td>
                    <td className="text-white py-4">Trading Issue</td>
                    <td className="py-4">
                      <span className="bg-red-500/20 text-red-400 px-2 py-1 rounded-full text-sm">
                        Critical
                      </span>
                    </td>
                    <td className="py-4">
                      <span className="bg-yellow-500/20 text-yellow-400 px-2 py-1 rounded-full text-sm">
                        Awaiting Response
                      </span>
                    </td>
                    <td className="text-white py-4">Jan 5, 2025</td>
                    <td className="py-4">
                      <div className="flex space-x-2">
                        <button className="text-orange-400 hover:text-orange-300 transition-colors px-3 py-1 bg-orange-900/20 rounded hover:bg-orange-900/30 text-sm">
                          Escalate
                        </button>
                        <button className="text-blue-400 hover:text-blue-300 transition-colors px-3 py-1 bg-blue-900/20 rounded hover:bg-blue-900/30 text-sm">
                          Reply
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

export default function SupportTicketsPage() {
  return (
    <ProtectedRoute requiredRole="admin">
      <SupportTicketsContent />
    </ProtectedRoute>
  );
}
