 'use client';

import UserHeader from '@/components/UserHeader';
import { useState } from 'react';

export default function NotificationsPage() {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [darkMode, setDarkMode] = useState(true);

  const notifications = [
    {
      id: 1,
      title: 'Welcome to RAZ Capitals',
      description: 'Your account has been successfully created. Explore the dashboard to manage your trading and wallets.',
      time: 'Just now',
      type: 'info' as const,
    },
    {
      id: 2,
      title: 'Complete your verification',
      description: 'Upload your KYC documents to unlock withdrawals and higher deposit limits.',
      time: '10 min ago',
      type: 'warning' as const,
    },
    {
      id: 3,
      title: 'No recent trading activity',
      description: 'Create a live or demo trading account to start trading and tracking performance.',
      time: '1 day ago',
      type: 'neutral' as const,
    },
  ];

  return (
    <div className={`flex h-screen overflow-hidden ${darkMode ? 'bg-[#0A2E1D]' : 'bg-gray-100'}`}>
      {/* Mobile Sidebar Overlay */}
      {sidebarOpen && (
        <div
          className="fixed inset-0 bg-black bg-opacity-50 z-40 lg:hidden"
          onClick={() => setSidebarOpen(false)}
        />
      )}

      {/* Sidebar */}
      <div
        className={`fixed inset-y-0 left-0 z-50 w-64 ${
          darkMode ? 'bg-[#0F1B14] border-[#A0C8A9]/20' : 'bg-white border-gray-200'
        } border-r flex flex-col transform transition-transform duration-300 ease-in-out lg:translate-x-0 lg:static lg:inset-0 ${
          sidebarOpen ? 'translate-x-0' : '-translate-x-full'
        }`}
      >
        <div className={`p-6 border-b ${darkMode ? 'border-[#A0C8A9]/20' : 'border-gray-200'}`}>
          <div className="flex items-center space-x-3">
            <div className="w-8 h-8 bg-[#A0C8A9] rounded-lg flex items-center justify-center">
              <span className="text-[#1E2E23] font-bold text-lg">R</span>
            </div>
            <span className={`font-bold text-lg ${darkMode ? 'text-white' : 'text-gray-900'}`}>
              RAZ CAPITALS
            </span>
          </div>
        </div>

        {/* Navigation - Scrollable Area */}
        <div className="flex-1 overflow-y-auto">
          <nav className="px-4 py-6 space-y-2">
            <a
              href="/dashboard"
              className={`flex items-center space-x-3 px-4 py-3 ${
                darkMode
                  ? 'text-[#A0C8A9]/70 hover:text-white hover:bg-[#A0C8A9]/10'
                  : 'text-gray-600 hover:text-gray-900 hover:bg-gray-100'
              } rounded-lg transition-colors`}
            >
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M3 7v10a2 2 0 002 2h14a2 2 0 002-2V9a2 2 0 00-2-2H5a2 2 0 00-2-2z"
                />
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M8 5a2 2 0 012-2h4a2 2 0 012 2v4H8V5z"
                />
              </svg>
              <span>Dashboard</span>
            </a>
            <a
              href="/dashboard/wallets"
              className={`flex items-center space-x-3 px-4 py-3 ${
                darkMode
                  ? 'text-[#A0C8A9]/70 hover:text-white hover:bg-[#A0C8A9]/10'
                  : 'text-gray-600 hover:text-gray-900 hover:bg-gray-100'
              } rounded-lg transition-colors`}
            >
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M3 10h18M7 15h1m4 0h1m-7 4h12a3 3 0 003-3V8a3 3 0 00-3-3H6a3 3 0 00-3 3v8a3 3 0 003 3z"
                />
              </svg>
              <span>Wallets</span>
            </a>
            <a
              href="/dashboard/my-accounts"
              className={`flex items-center space-x-3 px-4 py-3 ${
                darkMode
                  ? 'text-[#A0C8A9]/70 hover:text-white hover:bg-[#A0C8A9]/10'
                  : 'text-gray-600 hover:text-gray-900 hover:bg-gray-100'
              } rounded-lg transition-colors`}
            >
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"
                />
              </svg>
              <span>My Accounts</span>
            </a>
            <a
              href="/dashboard/new-account"
              className={`flex items-center space-x-3 px-4 py-3 ${
                darkMode
                  ? 'text-[#A0C8A9]/70 hover:text-white hover:bg-[#A0C8A9]/10'
                  : 'text-gray-600 hover:text-gray-900 hover:bg-gray-100'
              } rounded-lg transition-colors`}
            >
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M18 9v3m0 0v3m0-3h3m-3 0h-3m-2-5a4 4 0 11-8 0 4 4 0 018 0zM3 20a6 6 0 0112 0v1H3v-1z"
                />
              </svg>
              <span>New Account</span>
            </a>
            <a
              href="/dashboard/deposit"
              className={`flex items-center space-x-3 px-4 py-3 ${
                darkMode
                  ? 'text-[#A0C8A9]/70 hover:text-white hover:bg-[#A0C8A9]/10'
                  : 'text-gray-600 hover:text-gray-900 hover:bg-gray-100'
              } rounded-lg transition-colors`}
            >
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M7 16a4 4 0 01-.88-7.903A5 5 0 1115.9 6L16 6a5 5 0 011 9.9M9 19l3 3m0 0l3-3m-3 3V10"
                />
              </svg>
              <span>Deposit</span>
            </a>
            <a
              href="/dashboard/transfer"
              className={`flex items-center space-x-3 px-4 py-3 ${
                darkMode
                  ? 'text-[#A0C8A9]/70 hover:text-white hover:bg-[#A0C8A9]/10'
                  : 'text-gray-600 hover:text-gray-900 hover:bg-gray-100'
              } rounded-lg transition-colors`}
            >
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M8 7h12m0 0l-4-4m4 4l-4 4m0 6H4m0 0l4 4m-4-4l4-4"
                />
              </svg>
              <span>Transfer</span>
            </a>
            <a
              href="/dashboard/withdraw"
              className={`flex items-center space-x-3 px-4 py-3 ${
                darkMode
                  ? 'text-[#A0C8A9]/70 hover:text-white hover:bg-[#A0C8A9]/10'
                  : 'text-gray-600 hover:text-gray-900 hover:bg-gray-100'
              } rounded-lg transition-colors`}
            >
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M7 16a4 4 0 01-.88-7.903A5 5 0 1115.9 6L16 6a5 5 0 011 9.9M15 13l-3-3m0 0l-3 3m3-3v12"
                />
              </svg>
              <span>Withdraw</span>
            </a>
            <a
              href="/dashboard/copy-trading"
              className={`flex items-center space-x-3 px-4 py-3 ${
                darkMode
                  ? 'text-[#A0C8A9]/70 hover:text-white hover:bg-[#A0C8A9]/10'
                  : 'text-gray-600 hover:text-gray-900 hover:bg-gray-100'
              } rounded-lg transition-colors`}
            >
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M8 16H6a2 2 0 01-2-2V6a2 2 0 012-2h8a2 2 0 012 2v2m-6 12h8a2 2 0 002-2v-8a2 2 0 00-2-2h-8a2 2 0 00-2 2v8a2 2 0 002 2z"
                />
              </svg>
              <span>Copy Trading</span>
            </a>
            <a
              href="/dashboard/history"
              className={`flex items-center space-x-3 px-4 py-3 ${
                darkMode
                  ? 'text-[#A0C8A9]/70 hover:text-white hover:bg-[#A0C8A9]/10'
                  : 'text-gray-600 hover:text-gray-900 hover:bg-gray-100'
              } rounded-lg transition-colors`}
            >
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"
                />
              </svg>
              <span>History</span>
            </a>
            <a
              href="/dashboard/request-master-ib"
              className={`flex items-center space-x-3 px-4 py-3 ${
                darkMode
                  ? 'text-[#A0C8A9]/70 hover:text-white hover:bg-[#A0C8A9]/10'
                  : 'text-gray-600 hover:text-gray-900 hover:bg-gray-100'
              } rounded-lg transition-colors`}
            >
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"
                />
              </svg>
              <span>Request Master IB</span>
            </a>
          </nav>
        </div>

        {/* Settings at bottom */}
        <div className={`p-4 border-t ${darkMode ? 'border-[#A0C8A9]/20' : 'border-gray-200'}`}>
          <a
            href="/dashboard/settings"
            className={`flex items-center space-x-3 px-4 py-3 ${
              darkMode
                ? 'text-[#A0C8A9]/70 hover:text-white hover:bg-[#A0C8A9]/10'
                : 'text-gray-600 hover:text-gray-900 hover:bg-gray-100'
            } rounded-lg transition-colors`}
          >
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z"
              />
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"
              />
            </svg>
            <span>Settings</span>
          </a>
        </div>
      </div>

      {/* Main Content */}
      <div className="flex-1 flex flex-col overflow-hidden">
        <UserHeader
          sidebarOpen={sidebarOpen}
          setSidebarOpen={setSidebarOpen}
          darkMode={darkMode}
          setDarkMode={setDarkMode}
        />

        <div
          className={`flex-1 p-4 sm:p-6 space-y-4 sm:space-y-6 overflow-y-auto ${
            darkMode ? 'bg-[#B8D4C1]' : 'bg-gray-50'
          }`}
        >
          <div className="flex items-center justify-between mb-2">
            <div>
              <h1 className="text-2xl font-bold text-[#1E2E23]">Notifications</h1>
              <p className="text-sm text-[#47574C]">
                View important updates about your accounts, verification, and trading activity.
              </p>
            </div>
            <button className="px-4 py-2 rounded-lg text-sm font-medium bg-[#0A2E1D] text-white hover:bg-[#0F1B14]">
              Mark all as read
            </button>
          </div>

          <div
            className={`rounded-lg border ${
              darkMode ? 'bg-[#2D4A35] border-[#A0C8A9]/30' : 'bg-white border-gray-200'
            }`}
          >
            <div className="divide-y divide-[#A0C8A9]/20">
              {notifications.map((notification) => (
                <div
                  key={notification.id}
                  className="flex items-start gap-4 px-4 sm:px-6 py-4 hover:bg-[#23392c]/40 transition-colors"
                >
                  <div
                    className={`mt-1 flex h-8 w-8 items-center justify-center rounded-full ${
                      notification.type === 'warning'
                        ? 'bg-yellow-100 text-yellow-800'
                        : notification.type === 'info'
                        ? 'bg-blue-100 text-blue-800'
                        : 'bg-gray-100 text-gray-800'
                    }`}
                  >
                    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M13 16h-1v-4h-1m1-4h.01M12 2a10 10 0 100 20 10 10 0 000-20z"
                      />
                    </svg>
                  </div>
                  <div className="flex-1">
                    <div className="flex items-center justify-between gap-2">
                      <h2
                        className={`text-sm font-semibold ${
                          darkMode ? 'text-white' : 'text-[#1E2E23]'
                        }`}
                      >
                        {notification.title}
                      </h2>
                      <span
                        className={`text-xs whitespace-nowrap ${
                          darkMode ? 'text-[#E2F1E7]' : 'text-[#6B7A6F]'
                        }`}
                      >
                        {notification.time}
                      </span>
                    </div>
                    <p
                      className={`mt-1 text-sm ${
                        darkMode ? 'text-[#E2F1E7]/80' : 'text-[#3D4A41]'
                      }`}
                    >
                      {notification.description}
                    </p>
                  </div>
                </div>
              ))}

              {notifications.length === 0 && (
                <div
                  className={`px-6 py-10 text-center text-sm ${
                    darkMode ? 'text-[#E2F1E7]/70' : 'text-[#6B7A6F]'
                  }`}
                >
                  You’re all caught up. No new notifications right now.
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}


