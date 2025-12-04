'use client';

import UserInitial from '@/components/UserInitial';
import UserName from '@/components/UserName';
import AccountSwitcher from '@/components/AccountSwitcher';
import { useRouter, usePathname } from 'next/navigation';
import { useEffect, useState } from 'react';
import { clearUserSession } from '@/utils/auth';
import { supabase } from '@/lib/supabaseClient';

interface UserHeaderProps {
  sidebarOpen: boolean;
  setSidebarOpen: (open: boolean) => void;
  darkMode?: boolean;
  setDarkMode?: (darkMode: boolean) => void;
}

export default function UserHeader({ 
  sidebarOpen, 
  setSidebarOpen, 
}: UserHeaderProps) {
  const router = useRouter();
  const pathname = usePathname();
  const [isFullscreen, setIsFullscreen] = useState(false);
  const [profileDropdownOpen, setProfileDropdownOpen] = useState(false);
  const [userName, setUserName] = useState<string>('User');

  // Fetch user name
  useEffect(() => {
    const fetchUserName = async () => {
      try {
        const { data: { user } } = await supabase.auth.getUser();
        if (user) {
          // Try to get user name from users table
          const { data: userData } = await supabase
            .from('users')
            .select('first_name, last_name, email')
            .eq('user_uuid', user.id)
            .single();
          
          if (userData) {
            const name = userData.first_name 
              ? `${userData.first_name}${userData.last_name ? ' ' + userData.last_name : ''}`
              : userData.email?.split('@')[0] || 'User';
            setUserName(name);
          } else {
            setUserName(user.email?.split('@')[0] || 'User');
          }
        }
      } catch (err) {
        console.error('Error fetching user name:', err);
      }
    };
    
    fetchUserName();
  }, []);

  // Check if fullscreen is supported
  useEffect(() => {
    const handleFullscreenChange = () => {
      setIsFullscreen(!!document.fullscreenElement);
    };

    document.addEventListener('fullscreenchange', handleFullscreenChange);
    return () => document.removeEventListener('fullscreenchange', handleFullscreenChange);
  }, []);

  // Toggle fullscreen
  const toggleFullscreen = () => {
    if (!document.fullscreenElement) {
      document.documentElement.requestFullscreen().catch(err => {
        console.log(`Error attempting to enable fullscreen: ${err.message}`);
      });
    } else {
      document.exitFullscreen();
    }
  };

  // Handle menu item clicks
  const handleMenuClick = async (optionName: string) => {
    setProfileDropdownOpen(false);
    
    switch (optionName) {
      case 'Settings':
        router.push('/dashboard/settings');
        break;
      
      case 'Change Password':
        // Navigate to settings page with security tab
        router.push('/dashboard/settings?tab=security');
        break;
      
      case 'Logout':
        await handleLogout();
        break;
      
      default:
        break;
    }
  };

  const handleLogout = async () => {
    try {
      // Sign out from Supabase
      await supabase.auth.signOut();
      
      // Clear session storage
      clearUserSession();
      
      // Redirect to login page
      router.push('/signin');
    } catch (error) {
      console.error('Error during logout:', error);
      // Still clear session and redirect even if there's an error
      clearUserSession();
      router.push('/signin');
    }
  };

  return (
    <div className="bg-black px-6 py-4 flex-shrink-0">
      <div className="flex justify-between items-center">
        {/* Mobile Menu Button */}
        <button
          className="lg:hidden p-2 text-white hover:text-gray-300 transition-colors"
          onClick={() => setSidebarOpen(true)}
        >
          <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
          </svg>
        </button>
        
        <h1 className="text-lg sm:text-xl font-medium text-white">
          <UserName fallback="User" />
        </h1>
        <div className="flex items-center space-x-4">
          {/* Account Switcher */}
          <AccountSwitcher />
          {/* Full Screen Toggle */}
          <button 
            onClick={toggleFullscreen}
            className="text-white hover:text-gray-300 p-2 transition-colors"
            title={isFullscreen ? 'Exit Full Screen' : 'Enter Full Screen'}
          >
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 8V4m0 0h4M4 4l5 5m11-1V4m0 0h-4m4 0l-5 5M4 16v4m0 0h4m-4 0l5-5m11 5l-5-5m5 5v-4m0 4h-4" />
            </svg>
          </button>

          {/* Notification Bell */}
          <button 
            onClick={() => router.push('/dashboard/notifications')}
            className="text-white hover:text-gray-300 p-2 transition-colors relative"
            title="View notifications"
          >
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 17h5l-1.405-1.405A2.032 2.032 0 0118 14.158V11a6.002 6.002 0 00-4-5.659V5a2 2 0 10-4 0v.341C7.67 6.165 6 8.388 6 11v3.159c0 .538-.214 1.055-.595 1.436L4 17h5m6 0v1a3 3 0 11-6 0v-1m6 0H9" />
            </svg>
          </button>

          {/* Profile Avatar with Dropdown */}
          <div className="relative">
            <button 
              onClick={() => setProfileDropdownOpen(!profileDropdownOpen)}
              className="w-8 h-8 bg-yellow-400 rounded-full flex items-center justify-center"
              title="Profile Menu"
            >
              <UserInitial className="text-black font-bold text-sm" fallback="U" />
            </button>
            
            {/* Profile Dropdown */}
            {profileDropdownOpen && (
              <div className="absolute right-0 mt-2 w-56 bg-white rounded-md shadow-lg py-1 z-50 border border-gray-200">
                {/* User Info Header */}
                <div className="px-4 py-3 border-b border-gray-100">
                  <p className="text-sm font-semibold text-gray-900 truncate">{userName}</p>
                </div>
                
                {/* Menu Items */}
                <button
                  onClick={() => handleMenuClick('Settings')}
                  className="w-full flex items-center px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 transition-colors"
                >
                  <span className="mr-3 w-4 h-4">
                    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z" />
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                    </svg>
                  </span>
                  Settings
                </button>
                
                <button
                  onClick={() => handleMenuClick('Change Password')}
                  className="w-full flex items-center px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 transition-colors"
                >
                  <span className="mr-3 w-4 h-4">
                    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
                    </svg>
                  </span>
                  Change Password
                </button>
                
                <div className="border-t border-gray-100 my-1"></div>
                
                <button
                  onClick={() => handleMenuClick('Logout')}
                  className="w-full flex items-center px-4 py-2 text-sm text-red-600 hover:bg-red-50 transition-colors"
                >
                  <span className="mr-3 w-4 h-4">
                    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1" />
                    </svg>
                  </span>
                  Logout
                </button>
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Click outside to close dropdowns */}
      {profileDropdownOpen && (
        <div 
          className="fixed inset-0 z-40" 
          onClick={() => {
            setProfileDropdownOpen(false);
          }}
        />
      )}
    </div>
  );
}
