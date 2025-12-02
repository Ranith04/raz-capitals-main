'use client';

import { getCurrentUser } from '@/utils/auth';
import Image from 'next/image';
import { ReactNode, useEffect, useState } from 'react';

interface ProfileLayoutProps {
  children: ReactNode;
  title: string;
  description: string;
  /**
   * Optional explicit user name to display (e.g. for logout screen).
   * If not provided, falls back to the current authenticated user from session.
   */
  userName?: string;
}

export default function ProfileLayout({ children, title, description, userName: userNameProp }: ProfileLayoutProps) {
  // Always start with a consistent fallback for SSR to prevent hydration mismatch
  const [userName, setUserName] = useState<string>('User');

  useEffect(() => {
    // If a name is passed explicitly (e.g. from Logout page), respect it.
    if (userNameProp) {
      setUserName(userNameProp);
      return;
    }

    // Only access sessionStorage on client-side
    const currentUser = getCurrentUser();
    if (currentUser?.name) {
      setUserName(currentUser.name);
    }
  }, [userNameProp]);

  const userInitial = (userName || 'User').trim().charAt(0).toUpperCase() || 'U';

  return (
    <div className="flex h-screen bg-[#0A2E1D] overflow-hidden">
      {/* Sidebar */}
      <div className="w-64 bg-[#0F1B14] border-r border-[#A0C8A9]/20 flex flex-col">
        <div className="p-6 border-b border-[#A0C8A9]/20">
          <div className="flex items-center">
            <Image
              src="/logo/raz-capitals-logo.png"
              alt="RAZ CAPITALS"
              width={170}
              height={63}
              priority
              className="h-14 w-auto"
            />
          </div>
        </div>

        <div className="flex-1 overflow-y-auto">
          <nav className="px-4 py-6 space-y-2">
            <a href="/dashboard" className="flex items-center space-x-3 px-4 py-3 text-[#A0C8A9]/70 hover:text-white hover:bg-[#A0C8A9]/10 rounded-lg transition-colors">Dashboard</a>
            <a href="/dashboard/wallets" className="flex items-center space-x-3 px-4 py-3 text-[#A0C8A9]/70 hover:text-white hover:bg-[#A0C8A9]/10 rounded-lg transition-colors">Wallets</a>
            <a href="/dashboard/my-accounts" className="flex items-center space-x-3 px-4 py-3 text-[#A0C8A9]/70 hover:text-white hover:bg-[#A0C8A9]/10 rounded-lg transition-colors">My Accounts</a>
            <a href="/dashboard/new-account" className="flex items-center space-x-3 px-4 py-3 text-[#A0C8A9]/70 hover:text-white hover:bg-[#A0C8A9]/10 rounded-lg transition-colors">New Account</a>
            <a href="/dashboard/deposit" className="flex items-center space-x-3 px-4 py-3 text-[#A0C8A9]/70 hover:text-white hover:bg-[#A0C8A9]/10 rounded-lg transition-colors">Deposit</a>
            <a href="/dashboard/transfer" className="flex items-center space-x-3 px-4 py-3 text-[#A0C8A9]/70 hover:text-white hover:bg-[#A0C8A9]/10 rounded-lg transition-colors">Transfer</a>
            <a href="/dashboard/withdraw" className="flex items-center space-x-3 px-4 py-3 text-[#A0C8A9]/70 hover:text-white hover:bg-[#A0C8A9]/10 rounded-lg transition-colors">Withdraw</a>
            <a href="/dashboard/history" className="flex items-center space-x-3 px-4 py-3 text-[#A0C8A9]/70 hover:text-white hover:bg-[#A0C8A9]/10 rounded-lg transition-colors">History</a>
          </nav>
        </div>
        
        <div className="p-4 border-t border-[#A0C8A9]/20">
          <a href="/dashboard/profile/settings" className="flex items-center space-x-3 px-4 py-3 text-[#A0C8A9]/70 hover:text-white hover:bg-[#A0C8A9]/10 rounded-lg transition-colors">Settings</a>
        </div>
      </div>

      {/* Main Content */}
      <div className="flex-1 flex flex-col overflow-hidden">
        <div className="bg-[#0A2E1D] border-b border-[#A0C8A9]/20 px-6 py-4 flex-shrink-0">
          <div className="flex justify-between items-center">
            <h1 className="text-white text-xl font-medium">{userName}</h1>
            <div className="flex items-center space-x-4">
              <div className="w-8 h-8 bg-yellow-400 rounded-full flex items-center justify-center">
                <span className="text-black font-bold text-sm">{userInitial}</span>
              </div>
            </div>
          </div>
        </div>

        {/* Page Content */}
        <div className="flex-1 p-6 space-y-6 overflow-y-auto" style={{ backgroundColor: '#B8D4C1' }}>
          <div>
            <h2 className="text-2xl font-bold text-[#1E2E23] mb-2">{title}</h2>
            <p className="text-[#2D4A35]">{description}</p>
          </div>
          {children}
        </div>
      </div>
    </div>
  );
}
