'use client';

import AdminHeader from '@/components/AdminHeader';
import AdminSidebar from '@/components/AdminSidebar';
import ProtectedRoute from '@/components/ProtectedRoute';
import { useRouter } from 'next/navigation';
import { useEffect } from 'react';

function UserProfileContent() {
  const router = useRouter();
  
  useEffect(() => {
    // Redirect to profile tab by default
    router.push('/admin/users/1/profile');
  }, [router]);

  return (
    <div className="flex h-screen bg-[#9BC5A2] overflow-hidden">
      {/* Sidebar */}
      <AdminSidebar currentPage="user-detail" />

      {/* Main Content */}
      <div className="flex-1 flex flex-col">
        {/* Loading state while redirecting */}
        <div className="flex-1 flex items-center justify-center">
          <div className="text-[#0A2E1D] text-xl">Redirecting to profile...</div>
        </div>
      </div>
    </div>
  );
}

export default function UserProfilePage() {
  return (
    <ProtectedRoute requiredRole="admin">
      <UserProfileContent />
    </ProtectedRoute>
  );
}