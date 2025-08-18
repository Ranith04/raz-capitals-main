'use client';

import AdminSidebar from '@/components/AdminSidebar';
import ProtectedRoute from '@/components/ProtectedRoute';
import { useRouter } from 'next/navigation';
import { useEffect } from 'react';

function DocumentKYCContent() {
  const router = useRouter();
  
  useEffect(() => {
    document.title = 'Document KYC - RAZ CAPITALS';
  }, []);

  return (
    <div className="flex h-screen bg-[#9BC5A2] overflow-hidden">
      {/* Sidebar */}
      <AdminSidebar currentPage="document-kyc" />

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

        {/* Document KYC Content */}
        <div className="flex-1 p-8 overflow-y-auto">
          <h1 className="text-[#0A2E1D] text-3xl font-bold mb-8">Document KYC Verification</h1>

          {/* Document Status Cards */}
          <div className="grid grid-cols-3 gap-6 mb-8">
            <div className="bg-[#2D4A32] rounded-2xl p-6 text-center">
              <h3 className="text-[#9BC5A2] text-sm font-medium mb-2">Identity Document</h3>
              <p className="text-green-400 text-lg font-bold">Verified</p>
            </div>
            <div className="bg-[#2D4A32] rounded-2xl p-6 text-center">
              <h3 className="text-[#9BC5A2] text-sm font-medium mb-2">Address Proof</h3>
              <p className="text-yellow-400 text-lg font-bold">Pending</p>
            </div>
            <div className="bg-[#2D4A32] rounded-2xl p-6 text-center">
              <h3 className="text-[#9BC5A2] text-sm font-medium mb-2">Income Proof</h3>
              <p className="text-red-400 text-lg font-bold">Rejected</p>
            </div>
          </div>

          {/* Documents List */}
          <div className="bg-[#2D4A32] rounded-2xl p-6">
            <h2 className="text-white text-xl font-bold mb-6">Submitted Documents</h2>
            
            <div className="space-y-4">
              <div className="flex items-center justify-between p-4 bg-[#4A6741] rounded-lg">
                <div className="flex items-center space-x-4">
                  <div className="w-12 h-12 bg-[#9BC5A2] rounded-lg flex items-center justify-center">
                    <svg className="w-6 h-6 text-[#0A2E1D]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                    </svg>
                  </div>
                  <div>
                    <h3 className="text-white font-medium">Driver's License</h3>
                    <p className="text-[#9BC5A2] text-sm">Uploaded on Jan 5, 2025</p>
                  </div>
                </div>
                <div className="flex items-center space-x-3">
                  <span className="bg-green-500/20 text-green-400 px-3 py-1 rounded-full text-sm">
                    Verified
                  </span>
                  <button className="px-4 py-2 bg-[#2D4A32] text-white rounded-lg hover:bg-[#0A2E1D] transition-colors text-sm">
                    View
                  </button>
                </div>
              </div>

              <div className="flex items-center justify-between p-4 bg-[#4A6741] rounded-lg">
                <div className="flex items-center space-x-4">
                  <div className="w-12 h-12 bg-yellow-400 rounded-lg flex items-center justify-center">
                    <svg className="w-6 h-6 text-[#0A2E1D]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                    </svg>
                  </div>
                  <div>
                    <h3 className="text-white font-medium">Utility Bill</h3>
                    <p className="text-[#9BC5A2] text-sm">Uploaded on Jan 6, 2025</p>
                  </div>
                </div>
                <div className="flex items-center space-x-3">
                  <span className="bg-yellow-500/20 text-yellow-400 px-3 py-1 rounded-full text-sm">
                    Pending
                  </span>
                  <button className="px-4 py-2 bg-[#2D4A32] text-white rounded-lg hover:bg-[#0A2E1D] transition-colors text-sm">
                    Review
                  </button>
                </div>
              </div>

              <div className="flex items-center justify-between p-4 bg-[#4A6741] rounded-lg">
                <div className="flex items-center space-x-4">
                  <div className="w-12 h-12 bg-red-400 rounded-lg flex items-center justify-center">
                    <svg className="w-6 h-6 text-[#0A2E1D]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                    </svg>
                  </div>
                  <div>
                    <h3 className="text-white font-medium">Bank Statement</h3>
                    <p className="text-[#9BC5A2] text-sm">Uploaded on Jan 4, 2025</p>
                  </div>
                </div>
                <div className="flex items-center space-x-3">
                  <span className="bg-red-500/20 text-red-400 px-3 py-1 rounded-full text-sm">
                    Rejected
                  </span>
                  <button className="px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700 transition-colors text-sm">
                    Request Resubmit
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default function DocumentKYCPage() {
  return (
    <ProtectedRoute requiredRole="admin">
      <DocumentKYCContent />
    </ProtectedRoute>
  );
}