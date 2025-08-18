'use client';

import AdminSidebar from '@/components/AdminSidebar';
import ProtectedRoute from '@/components/ProtectedRoute';
import { useRouter } from 'next/navigation';
import { useEffect } from 'react';

function AdminDashboardContent() {
  const router = useRouter();
  
  useEffect(() => {
    document.title = 'Admin Dashboard - RAZ CAPITALS';
  }, []);

  const handleCardClick = (cardType: string) => {
    // Navigate to user profile page - using a sample user ID
    router.push('/admin/users/1/profile');
  };
  return (
    <div className="flex h-screen bg-[#9BC5A2] overflow-hidden">
      {/* Sidebar */}
      <AdminSidebar currentPage="dashboard" />

      {/* Main Content */}
      <div className="flex-1 flex flex-col">
        {/* Header */}
        <div className="bg-[#0A2E1D] p-4 flex justify-between items-center">
          {/* Blue Icon Box in Header */}
          <div 
            className="w-12 h-12 bg-[#2D4A32] rounded-lg flex items-center justify-center cursor-pointer hover:bg-[#3A5A3F] transition-all duration-300 hover:scale-110 hover:shadow-lg transform"
            onClick={() => router.push('/admin/users/1/profile')}
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

        {/* Statistics Grid */}
        <div className="flex-1 p-6 grid grid-cols-2 gap-x-6 gap-y-0 overflow-y-auto">
          {/* Today Registration */}
          <div 
            className="bg-[#2D4A32] rounded-2xl px-4 py-3 flex items-center justify-between h-16 -mb-2 cursor-pointer hover:bg-[#3A5A3F] transition-colors duration-200 hover:scale-105 transform"
            onClick={() => handleCardClick('registration')}
          >
            <span className="text-white font-medium text-base">Today Registration</span>
            <span className="text-white text-lg">:</span>
            <span className="text-white font-bold text-xl">0</span>
          </div>

          {/* Total Registration */}
          <div 
            className="bg-[#2D4A32] rounded-2xl px-4 py-3 flex items-center justify-between h-16 -mb-2 cursor-pointer hover:bg-[#3A5A3F] transition-colors duration-200 hover:scale-105 transform"
            onClick={() => handleCardClick('registration')}
          >
            <span className="text-white font-medium text-base">Total Registration</span>
            <span className="text-white text-lg">:</span>
            <span className="text-white font-bold text-xl">5</span>
          </div>

          {/* KYC Pending */}
          <div 
            className="bg-[#2D4A32] rounded-2xl px-4 py-3 flex items-center justify-between h-16 -mb-2 cursor-pointer hover:bg-[#3A5A3F] transition-colors duration-200 hover:scale-105 transform"
            onClick={() => handleCardClick('registration')}
          >
            <span className="text-white font-medium text-base">KYC Pending</span>
            <span className="text-white text-lg">:</span>
            <span className="text-white font-bold text-xl">1</span>
          </div>

          {/* Total Live Accounts */}
          <div 
            className="bg-[#2D4A32] rounded-2xl px-4 py-3 flex items-center justify-between h-16 -mb-2 cursor-pointer hover:bg-[#3A5A3F] transition-colors duration-200 hover:scale-105 transform"
            onClick={() => handleCardClick('registration')}
          >
            <span className="text-white font-medium text-base">Total Live Accounts</span>
            <span className="text-white text-lg">:</span>
            <span className="text-white font-bold text-xl">5</span>
          </div>

          {/* Total Demo Accounts */}
          <div 
            className="bg-[#2D4A32] rounded-2xl px-4 py-3 flex items-center justify-between h-16 -mb-2 cursor-pointer hover:bg-[#3A5A3F] transition-colors duration-200 hover:scale-105 transform"
            onClick={() => handleCardClick('registration')}
          >
            <span className="text-white font-medium text-base">Total Demo Accounts</span>
            <span className="text-white text-lg">:</span>
            <span className="text-white font-bold text-xl">1</span>
          </div>

          {/* Total Today Deposits */}
          <div 
            className="bg-[#2D4A32] rounded-2xl px-4 py-3 flex items-center justify-between h-16 -mb-2 cursor-pointer hover:bg-[#3A5A3F] transition-colors duration-200 hover:scale-105 transform"
            onClick={() => handleCardClick('registration')}
          >
            <span className="text-white font-medium text-base">Total Today Deposits</span>
            <span className="text-white text-lg">:</span>
            <span className="text-white font-bold text-xl">0</span>
          </div>

          {/* Total Today Withdrawal */}
          <div 
            className="bg-[#2D4A32] rounded-2xl px-4 py-3 flex items-center justify-between h-16 -mb-2 cursor-pointer hover:bg-[#3A5A3F] transition-colors duration-200 hover:scale-105 transform"
            onClick={() => handleCardClick('registration')}
          >
            <span className="text-white font-medium text-base">Total Today Withdrawal</span>
            <span className="text-white text-lg">:</span>
            <span className="text-white font-bold text-xl">0</span>
          </div>

          {/* This Month Deposit */}
          <div 
            className="bg-[#2D4A32] rounded-2xl px-4 py-3 flex items-center justify-between h-16 -mb-2 cursor-pointer hover:bg-[#3A5A3F] transition-colors duration-200 hover:scale-105 transform"
            onClick={() => handleCardClick('registration')}
          >
            <span className="text-white font-medium text-base">This Month Deposit</span>
            <span className="text-white text-lg">:</span>
            <span className="text-white font-bold text-xl">50862.00</span>
          </div>

          {/* This Month Withdrawal */}
          <div 
            className="bg-[#2D4A32] rounded-2xl px-4 py-3 flex items-center justify-between h-16 -mb-2 cursor-pointer hover:bg-[#3A5A3F] transition-colors duration-200 hover:scale-105 transform"
            onClick={() => handleCardClick('registration')}
          >
            <span className="text-white font-medium text-base">This Month Withdrawal</span>
            <span className="text-white text-lg">:</span>
            <span className="text-white font-bold text-xl">0</span>
          </div>

          {/* Total IB Clients */}
          <div 
            className="bg-[#2D4A32] rounded-2xl px-4 py-3 flex items-center justify-between h-16 -mb-2 cursor-pointer hover:bg-[#3A5A3F] transition-colors duration-200 hover:scale-105 transform"
            onClick={() => handleCardClick('registration')}
          >
            <span className="text-white font-medium text-base">Total IB Clients</span>
            <span className="text-white text-lg">:</span>
            <span className="text-white font-bold text-xl"></span>
          </div>
        </div>

        {/* Scroll to Top Button */}
        <div className="absolute bottom-6 right-6">
          <button 
            className="w-12 h-12 bg-[#0A2E1D] rounded-full flex items-center justify-center text-white hover:bg-[#1a3a28] transition-colors"
            onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
          >
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 10l7-7m0 0l7 7m-7-7v18" />
            </svg>
          </button>
        </div>
      </div>
    </div>
  );
}

export default function AdminDashboardPage() {
  return (
    <ProtectedRoute requiredRole="admin">
      <AdminDashboardContent />
    </ProtectedRoute>
  );
}
