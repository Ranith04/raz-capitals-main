'use client';

import { useRouter } from 'next/navigation';
import { useEffect } from 'react';
import ProfileLayout from '../components/ProfileLayout';

export default function LogoutPage() {
  const router = useRouter();

  useEffect(() => {
    // Clear any stored authentication data
    if (typeof window !== 'undefined') {
      localStorage.removeItem('authToken');
      localStorage.removeItem('userData');
      sessionStorage.clear();
    }
    
    // Redirect to login page after a short delay
    const timer = setTimeout(() => {
      router.push('/signin');
    }, 2000);

    return () => clearTimeout(timer);
  }, [router]);

  return (
    <ProfileLayout 
      title="Logging Out..." 
      description="You are being logged out of your account. Please wait while we redirect you to the login page."
    >
      <div className="flex items-center justify-center">
        <div className="bg-[#2D4A35] rounded-lg p-8 text-center max-w-md">
          <div className="w-20 h-20 bg-[#A0C8A9] rounded-full flex items-center justify-center mx-auto mb-6">
            <svg className="w-10 h-10 text-[#1E2E23]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1" />
            </svg>
          </div>
          
          <h2 className="text-white text-2xl font-bold mb-4">Logging Out...</h2>
          <p className="text-[#A0C8A9] mb-6">You are being logged out of your account. Please wait while we redirect you to the login page.</p>
          
          <div className="flex items-center justify-center space-x-2">
            <div className="w-2 h-2 bg-[#A0C8A9] rounded-full animate-bounce"></div>
            <div className="w-2 h-2 bg-[#A0C8A9] rounded-full animate-bounce" style={{ animationDelay: '0.1s' }}></div>
            <div className="w-2 h-2 bg-[#A0C8A9] rounded-full animate-bounce" style={{ animationDelay: '0.2s' }}></div>
          </div>
          
          <p className="text-[#A0C8A9] text-sm mt-4">Redirecting to login page...</p>
        </div>
      </div>
    </ProfileLayout>
  );
}
